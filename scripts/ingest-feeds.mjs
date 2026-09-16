/**
 * Pull EIA natgas + FRED oil CSVs + Vault Report COMEX warehouse HTML;
 * update public/data/latest.json and append log row.
 * Run: node scripts/ingest-feeds.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = join(root, 'public', 'data')
const logDir = join(dataDir, 'log')
const latestPath = join(dataDir, 'latest.json')

const EIA_URL = 'https://ir.eia.gov/ngs/wngsr.json'
const FRED_WTI = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DCOILWTICO'
const FRED_BRENT = 'https://fred.stlouisfed.org/graph/fredgraph.csv?id=DCOILBRENTEU'

const VAULT_BASE = 'https://thevaultreport.com/metals'
const VAULT_METALS = [
  { slug: 'silver', tab: 'silver', sourceId: 'vault-silver' },
  { slug: 'gold', tab: 'gold', sourceId: 'vault-gold' },
  { slug: 'copper', tab: 'copper', sourceId: 'vault-copper' },
  { slug: 'platinum', tab: 'platinum', sourceId: 'vault-platinum' },
]

function readLatest() {
  return JSON.parse(readFileSync(latestPath, 'utf8'))
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.text()
}

function decodeHtml(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .trim()
}

function parseLdJsonDataset(html) {
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try {
      const data = JSON.parse(m[1])
      if (data['@type'] === 'Dataset') return data
    } catch {
      /* skip malformed blocks */
    }
  }
  return null
}

function parseMetricCards(html) {
  const metrics = {}
  const re =
    /<div class="metric-label text-micro">([^<]+)<\/div>\s*<div class="metric-value[^>]*>([^<]+)<\/div>/g
  for (const m of html.matchAll(re)) {
    metrics[decodeHtml(m[1])] = decodeHtml(m[2])
  }
  return metrics
}

function parseEvItems(html) {
  const items = {}
  const re =
    /class="vr-d-ev-label"[^>]*>.*?<span[^>]*>([^<]+)<\/span>[\s\S]*?class="vr-d-ev-fig">([^<]+)<\/div>(?:\s*<div class="vr-d-ev-delta">([^<]*)<\/div>)?/g
  for (const m of html.matchAll(re)) {
    items[decodeHtml(m[1])] = {
      fig: decodeHtml(m[2]),
      delta: m[3] ? decodeHtml(m[3]) : '',
    }
  }
  return items
}

/** Parse "96.45M oz", "476.8K st", "180.4K oz" → numeric in display units (Moz, Kst, Koz). */
function parseDisplayQty(text) {
  const clean = decodeHtml(text).replace(/,/g, '')
  const m = clean.match(/^([\d.]+)\s*([KMG])?\s*(oz|st)?$/i)
  if (!m) return null
  const num = Number(m[1])
  if (!Number.isFinite(num)) return null
  const scale = m[2]?.toUpperCase()
  if (scale === 'K') return num
  if (scale === 'M') return num
  if (scale === 'G') return num
  return num
}

function parsePct(text) {
  const m = decodeHtml(text).match(/([+-]?[\d.]+)\s*%/)
  return m ? Number(m[1]) : null
}

function parseRange(text) {
  const clean = decodeHtml(text)
  const parts = clean.split(/[–-]/).map((s) => s.trim())
  if (parts.length !== 2) return null
  return { low: parseDisplayQty(parts[0]), high: parseDisplayQty(parts[1]) }
}

function parsePaperRatio(text) {
  const m = decodeHtml(text).match(/([\d.]+)\s*:\s*1/)
  return m ? Number(m[1]) : null
}

function parseReqTotalPct(html) {
  const m = html.match(/That is ([\d.]+)% of all COMEX/i)
  return m ? Number(m[1]) : null
}

function parseHouseAlertContracts(html) {
  const m = html.match(/today[^—]*—\s*([\d,]+)\s*contracts/i)
  return m ? Number(m[1].replace(/,/g, '')) : null
}

function parseDeliveryMoz(deltaText) {
  const m = decodeHtml(deltaText).match(/([\d.]+)\s*M\s*oz/i)
  return m ? Number(m[1]) : null
}

function parseDeliveryKoz(deltaText) {
  const m = decodeHtml(deltaText).match(/([\d.]+)\s*K\s*oz/i)
  return m ? Number(m[1]) : null
}

function parseDeliveryKst(deltaText) {
  const m = decodeHtml(deltaText).match(/([\d.]+)\s*K\s*st/i)
  return m ? Number(m[1]) : null
}

function parseDaysCover(fig) {
  const m = decodeHtml(fig).match(/([\d.]+)\s*days?/i)
  return m ? Math.round(Number(m[1])) : null
}

function parseEvContracts(fig) {
  return Number(decodeHtml(fig).replace(/,/g, '')) || null
}

function vaultLastUpdate(asOf) {
  return `${asOf} (COMEX warehouse report via The Vault Report)`
}

function patchSilverTab(tab, vault) {
  const { metrics, ev, asOf, url, reqTotalPct } = vault
  const registeredMoz = parseDisplayQty(metrics.Registered ?? '')
  const eligibleMoz = parseDisplayQty(metrics.Eligible ?? '')
  const totalMoz = parseDisplayQty(metrics['Total stocks'] ?? '')
  const delta30 = parsePct(metrics['30-day change'] ?? '')
  const range30 = parseRange(metrics['30d range'] ?? '')
  const daysCover = parseDaysCover(ev['Withdrawal cover']?.fig ?? '')
  const paperRatio = parsePaperRatio(ev['Paper-to-Physical Ratio']?.fig ?? '')
  const deliveries = ev['Deliveries (30d)']
  const mtdMoz = deliveries ? parseDeliveryMoz(deliveries.delta) : null
  const stops30dContracts = deliveries ? parseEvContracts(deliveries.fig) : null
  const dailyNotices = parseHouseAlertContracts(vault.html)

  const next = {
    ...tab,
    lastUpdate: vaultLastUpdate(asOf),
    sourceUrl: url,
  }
  if (registeredMoz !== null) {
    next.registeredMoz = registeredMoz
    next.asOfExactOz = Math.round(registeredMoz * 1_000_000)
  }
  if (reqTotalPct !== null) next.reqTotalPct = reqTotalPct
  else if (registeredMoz !== null && totalMoz !== null && totalMoz > 0) {
    next.reqTotalPct = Math.round((registeredMoz / totalMoz) * 1000) / 10
  }
  if (delta30 !== null) next.registeredDelta30dPct = delta30
  if (range30?.low !== null && range30?.high !== null) {
    next.registeredRange30d = { low: range30.low, high: range30.high }
  }
  if (daysCover !== null) next.daysCover = daysCover
  if (paperRatio !== null) {
    next.paperPhysicalRatio = paperRatio
    next.coverageRatio = Math.round((100 / paperRatio) * 10) / 10
  }
  if (mtdMoz !== null || stops30dContracts !== null || dailyNotices !== null) {
    next.delivery = {
      ...tab.delivery,
      ...(mtdMoz !== null ? { mtdMoz } : {}),
      ...(stops30dContracts !== null ? { stops30dContracts } : {}),
      ...(dailyNotices !== null ? { dailyNotices } : {}),
      ...(mtdMoz !== null && registeredMoz !== null
        ? { intensityPct: Math.round((mtdMoz / registeredMoz) * 1000) / 10 }
        : {}),
    }
  }
  return next
}

function patchGoldTab(tab, vault) {
  const { metrics, ev, asOf, url, reqTotalPct } = vault
  const registeredMoz = parseDisplayQty(metrics.Registered ?? '')
  const eligibleMoz = parseDisplayQty(metrics.Eligible ?? '')
  const totalMoz = parseDisplayQty(metrics['Total stocks'] ?? '')
  const delta30 = parsePct(metrics['30-day change'] ?? '')
  const delta7 = parsePct(metrics['7-day change'] ?? '')
  const range30 = parseRange(metrics['30d range'] ?? '')
  const daysCover = parseDaysCover(ev['Withdrawal cover']?.fig ?? '')
  const paperRatio = parsePaperRatio(ev['Paper-to-Physical Ratio']?.fig ?? '')
  const deliveries = ev['Deliveries (30d)']
  const stops30dContracts = deliveries ? parseEvContracts(deliveries.fig) : null
  const stops30dKoz = deliveries ? parseDeliveryKoz(deliveries.delta) : null

  const next = {
    ...tab,
    lastUpdate: vaultLastUpdate(asOf),
    sourceUrl: url,
  }
  if (registeredMoz !== null) next.registeredMoz = registeredMoz
  if (eligibleMoz !== null) next.eligibleMoz = eligibleMoz
  if (totalMoz !== null) next.totalMoz = totalMoz
  if (reqTotalPct !== null) next.reqTotalPct = reqTotalPct
  else if (registeredMoz !== null && totalMoz !== null && totalMoz > 0) {
    next.reqTotalPct = Math.round((registeredMoz / totalMoz) * 1000) / 10
  }
  if (delta30 !== null) next.registeredDelta30dPct = delta30
  if (delta7 !== null) next.registeredDelta7dPct = delta7
  if (range30?.low !== null && range30?.high !== null) {
    next.registeredRange30d = { low: range30.low, high: range30.high }
  }
  if (daysCover !== null) next.daysCover = daysCover
  if (paperRatio !== null) {
    next.paperPhysicalRatio = paperRatio
    next.coverageRatio = Math.round((100 / paperRatio) * 10) / 10
  }
  if (stops30dContracts !== null || stops30dKoz !== null) {
    next.delivery = {
      ...tab.delivery,
      ...(stops30dContracts !== null ? { stops30dContracts } : {}),
      ...(stops30dKoz !== null ? { stops30dKoz } : {}),
      ...(stops30dKoz !== null && registeredMoz !== null
        ? { stops30dPctRegistered: Math.round((stops30dKoz / (registeredMoz * 1000)) * 1000) / 10 }
        : {}),
    }
  }
  return next
}

function patchCopperTab(tab, vault) {
  const { metrics, ev, asOf, url, reqTotalPct } = vault
  const registeredKst = parseDisplayQty(metrics.Registered ?? '')
  const eligibleKst = parseDisplayQty(metrics.Eligible ?? '')
  const totalKst = parseDisplayQty(metrics['Total stocks'] ?? '')
  const delta30 = parsePct(metrics['30-day change'] ?? '')
  const delta7 = parsePct(metrics['7-day change'] ?? '')
  const range30 = parseRange(metrics['30d range'] ?? '')
  const daysCover = parseDaysCover(ev['Withdrawal cover']?.fig ?? '')
  const paperRatio = parsePaperRatio(ev['Paper-to-Physical Ratio']?.fig ?? '')
  const deliveries = ev['Deliveries (30d)']
  const stops30dContracts = deliveries ? parseEvContracts(deliveries.fig) : null
  const stops30dKst = deliveries ? parseDeliveryKst(deliveries.delta) : null

  const next = {
    ...tab,
    lastUpdate: vaultLastUpdate(asOf),
    sourceUrl: url,
  }
  if (registeredKst !== null) next.registeredKst = registeredKst
  if (eligibleKst !== null) next.eligibleKst = eligibleKst
  if (totalKst !== null) next.totalKst = totalKst
  if (reqTotalPct !== null) next.reqTotalPct = reqTotalPct
  else if (registeredKst !== null && totalKst !== null && totalKst > 0) {
    next.reqTotalPct = Math.round((registeredKst / totalKst) * 1000) / 10
  }
  if (delta30 !== null) next.registeredDelta30dPct = delta30
  if (delta7 !== null) next.registeredDelta7dPct = delta7
  if (range30?.low !== null && range30?.high !== null) {
    next.registeredRange30d = { low: range30.low, high: range30.high }
  }
  if (daysCover !== null) next.daysCover = daysCover
  if (paperRatio !== null) {
    next.paperPhysicalRatio = paperRatio
    next.coverageRatio = Math.round((100 / paperRatio) * 10) / 10
  }
  if (stops30dContracts !== null || stops30dKst !== null) {
    next.delivery = {
      ...tab.delivery,
      ...(stops30dContracts !== null ? { stops30dContracts } : {}),
      ...(stops30dKst !== null ? { stops30dKst } : {}),
      ...(stops30dKst !== null && registeredKst !== null
        ? { stops30dPctRegistered: Math.round((stops30dKst / registeredKst) * 1000) / 10 }
        : {}),
    }
  }
  return next
}

function patchPlatinumTab(tab, vault) {
  const { metrics, ev, asOf, url, reqTotalPct } = vault
  const registeredKoz = parseDisplayQty(metrics.Registered ?? '')
  const eligibleKoz = parseDisplayQty(metrics.Eligible ?? '')
  const totalKoz = parseDisplayQty(metrics['Total stocks'] ?? '')
  const delta30 = parsePct(metrics['30-day change'] ?? '')
  const delta7 = parsePct(metrics['7-day change'] ?? '')
  const range30 = parseRange(metrics['30d range'] ?? '')
  const daysCover = parseDaysCover(ev['Withdrawal cover']?.fig ?? '')
  const paperRatio = parsePaperRatio(ev['Paper-to-Physical Ratio']?.fig ?? '')
  const deliveries = ev['Deliveries (30d)']
  const stops30dContracts = deliveries ? parseEvContracts(deliveries.fig) : null
  const stops30dKoz = deliveries ? parseDeliveryKoz(deliveries.delta) : null

  const next = {
    ...tab,
    lastUpdate: vaultLastUpdate(asOf),
    sourceUrl: url,
  }
  if (registeredKoz !== null) next.registeredKoz = registeredKoz
  if (eligibleKoz !== null) next.eligibleKoz = eligibleKoz
  if (totalKoz !== null) next.totalKoz = totalKoz
  if (reqTotalPct !== null) next.reqTotalPct = reqTotalPct
  else if (registeredKoz !== null && totalKoz !== null && totalKoz > 0) {
    next.reqTotalPct = Math.round((registeredKoz / totalKoz) * 1000) / 10
  }
  if (delta30 !== null) next.registeredDelta30dPct = delta30
  if (delta7 !== null) next.registeredDelta7dPct = delta7
  if (range30?.low !== null && range30?.high !== null) {
    next.registeredRange30d = { low: range30.low, high: range30.high }
  }
  if (daysCover !== null) next.daysCover = daysCover
  if (paperRatio !== null) {
    next.paperPhysicalRatio = paperRatio
    next.coverageRatio = Math.round((100 / paperRatio) * 10) / 10
  }
  if (stops30dContracts !== null || stops30dKoz !== null) {
    next.delivery = {
      ...tab.delivery,
      ...(stops30dContracts !== null ? { stops30dContracts } : {}),
      ...(stops30dKoz !== null ? { stops30dKoz } : {}),
    }
  }
  return next
}

const VAULT_PATCHERS = {
  silver: patchSilverTab,
  gold: patchGoldTab,
  copper: patchCopperTab,
  platinum: patchPlatinumTab,
}

async function fetchVaultMetal(slug) {
  const url = `${VAULT_BASE}/${slug}`
  const html = await fetchText(url)
  const dataset = parseLdJsonDataset(html)
  if (!dataset?.dateModified) {
    throw new Error(`Vault Report ${url}: missing Dataset dateModified`)
  }
  const metrics = parseMetricCards(html)
  if (!metrics.Registered) {
    throw new Error(`Vault Report ${url}: Registered metric not found`)
  }
  return {
    slug,
    url,
    asOf: dataset.dateModified,
    metrics,
    ev: parseEvItems(html),
    reqTotalPct: parseReqTotalPct(html),
    html,
  }
}

async function ingestVaultMetals(latest) {
  const vaultRows = await Promise.all(VAULT_METALS.map(({ slug }) => fetchVaultMetal(slug)))
  const sourceUpdates = []
  let metalsAsOf = latest.asOf

  for (const row of vaultRows) {
    const meta = VAULT_METALS.find((m) => m.slug === row.slug)
    sourceUpdates.push({ id: meta.sourceId, url: row.url, asOf: row.asOf })
    const patcher = VAULT_PATCHERS[row.slug]
    latest.tabs[row.slug] = patcher(latest.tabs[row.slug], row)
    if (row.asOf > metalsAsOf) metalsAsOf = row.asOf
  }

  latest.asOf = metalsAsOf
  latest.sources = [
    ...sourceUpdates,
    ...latest.sources.filter((s) => !s.id.startsWith('vault-')),
  ]

  return vaultRows
}

function parseFredCsv(text) {
  const rows = []
  for (const line of text.trim().split('\n').slice(1)) {
    const [date, raw] = line.split(',')
    if (!date || !raw || raw.trim() === '.') continue
    const value = Number(raw)
    if (Number.isFinite(value)) rows.push({ date, value })
  }
  return rows
}

function fmtMmDd(isoDate) {
  const [, m, d] = isoDate.split('-')
  return `${m}/${d}`
}

function buildSpreadSeries(wtiRows, brentRows) {
  const brentByDate = new Map(brentRows.map((r) => [r.date, r.value]))
  const daily = []
  for (const w of wtiRows) {
    const b = brentByDate.get(w.date)
    if (b === undefined) continue
    daily.push({ month: fmtMmDd(w.date), value: Math.round((w.value - b) * 100) / 100 })
  }

  const monthly = new Map()
  for (const w of wtiRows) {
    const b = brentByDate.get(w.date)
    if (b === undefined) continue
    const [y, m] = w.date.split('-')
    const key = `${m}/${y.slice(2)}`
    if (!monthly.has(key)) monthly.set(key, [])
    monthly.get(key).push(w.value - b)
  }
  const spreadMonthly = [...monthly.entries()].map(([month, vals]) => ({
    month,
    value: Math.round((vals.reduce((a, v) => a + v, 0) / vals.length) * 100) / 100,
  }))

  return { spreadDaily: daily.slice(-120), spreadMonthly: spreadMonthly.slice(-24) }
}

function findL48Series(eia) {
  const hit = eia.series?.find((s) => s.name === 'total lower 48 states')
  if (!hit) throw new Error('EIA L48 series not found')
  return hit
}

function regionFlow(eia, name) {
  const hit = eia.series?.find((s) => s.name === name)
  if (!hit) return 0
  return hit.calculated?.net_change ?? 0
}

function patchNatgas(tab, eia, l48) {
  const calc = l48.calculated ?? {}
  const data = l48.data ?? []
  const current = data[0]
  const weekEnding = current?.[0] ?? eia.current_week
  const workingGasBcf = current?.[1] ?? tab.workingGasBcf
  const weeklyChangeBcf = calc.net_change ?? tab.weeklyChangeBcf
  const fiveYearAvgBcf = calc['5yr-avg'] ?? tab.fiveYearAvgBcf
  const vsFiveYearPct = calc['pct-chg_5yr-avg'] ?? tab.vsFiveYearPct
  const yearAgoBcf = data[2]?.[1]
  const vsYearAgoPct =
    yearAgoBcf && workingGasBcf
      ? Math.round(((workingGasBcf - yearAgoBcf) / yearAgoBcf) * 1000) / 10
      : tab.vsYearAgoPct

  const east = regionFlow(eia, 'east region')
  const midwest = regionFlow(eia, 'midwest region')
  const southCentral = regionFlow(eia, 'south central region')
  const pacific = regionFlow(eia, 'pacific region')
  const mountain = regionFlow(eia, 'mountain region')

  const storageHistory = data
    .slice(0, 6)
    .reverse()
    .map(([date, value]) => ({ month: fmtMmDd(date), value }))

  const releaseDate = (eia.release_date ?? '').slice(0, 10)

  return {
    ...tab,
    lastUpdate: `${weekEnding} (EIA weekly storage, released ${releaseDate || 'latest'})`,
    workingGasBcf,
    weeklyChangeBcf,
    fiveYearAvgBcf,
    vsFiveYearPct,
    yearAgoBcf: yearAgoBcf ?? tab.yearAgoBcf,
    vsYearAgoPct,
    flow: {
      ...tab.flow,
      netBcf: weeklyChangeBcf,
      regionalLeader: [
        east ? `East ${east >= 0 ? '+' : ''}${east} Bcf` : null,
        midwest ? `Midwest ${midwest >= 0 ? '+' : ''}${midwest} Bcf` : null,
      ]
        .filter(Boolean)
        .join(', ') || tab.flow.regionalLeader,
      reportWeek: weekEnding,
      vsFiveYearPct,
    },
    regions: { east, midwest, southCentral, pacific, mountain },
    storageHistory: storageHistory.length ? storageHistory : tab.storageHistory,
    storageAvg: fiveYearAvgBcf,
    alerts: [
      {
        severity: 'info',
        label: 'WITHIN 5-YR RANGE',
        text: `EIA: Lower-48 working gas within the five-year historical range for week ending ${weekEnding}`,
      },
      {
        severity: 'info',
        label: 'ABOVE 5-YR AVG',
        text: `${workingGasBcf.toLocaleString()} Bcf working gas — +${vsFiveYearPct}% vs 5-yr avg (${fiveYearAvgBcf.toLocaleString()} Bcf)`,
      },
      {
        severity: weeklyChangeBcf >= 0 ? 'warning' : 'info',
        label: weeklyChangeBcf >= 0 ? 'INJECTION WEEK' : 'WITHDRAWAL WEEK',
        text: `Net ${weeklyChangeBcf >= 0 ? '+' : ''}${weeklyChangeBcf} Bcf — East ${east >= 0 ? '+' : ''}${east}, Midwest ${midwest >= 0 ? '+' : ''}${midwest}, South Central ${southCentral >= 0 ? '+' : ''}${southCentral}, Pacific ${pacific >= 0 ? '+' : ''}${pacific}, Mountain ${mountain >= 0 ? '+' : ''}${mountain}`,
      },
      tab.alerts[3],
      tab.alerts[4],
    ].filter(Boolean),
  }
}

async function main() {
  mkdirSync(logDir, { recursive: true })
  const latest = readLatest()
  const pulledAt = new Date().toISOString()

  const [eiaText, wtiCsv, brentCsv] = await Promise.all([
    fetchText(EIA_URL),
    fetchText(FRED_WTI),
    fetchText(FRED_BRENT),
  ])

  const eia = JSON.parse(eiaText.replace(/^\uFEFF/, ''))
  const l48 = findL48Series(eia)
  const wtiRows = parseFredCsv(wtiCsv)
  const brentRows = parseFredCsv(brentCsv)
  const spread = buildSpreadSeries(wtiRows, brentRows)

  const lastWti = wtiRows.at(-1)
  const lastBrent = brentRows.at(-1)
  const lastSpread =
    lastWti && lastBrent ? Math.round((lastWti.value - lastBrent.value) * 100) / 100 : null

  latest.pulledAt = pulledAt
  latest.stale = false

  const vaultRows = await ingestVaultMetals(latest)

  latest.sources = [
    ...latest.sources.filter((s) => !['eia-natgas', 'fred-wti', 'fred-brent'].includes(s.id)),
    { id: 'eia-natgas', url: EIA_URL, asOf: eia.current_week },
    { id: 'fred-wti', url: 'https://fred.stlouisfed.org/series/DCOILWTICO', asOf: lastWti?.date },
    { id: 'fred-brent', url: 'https://fred.stlouisfed.org/series/DCOILBRENTEU', asOf: lastBrent?.date },
  ]
  latest.tabs.natgas = patchNatgas(latest.tabs.natgas, eia, l48)
  latest.series = { ...latest.series, ...spread }

  if (lastSpread !== null && latest.tabs.brent) {
    latest.tabs.brent = {
      ...latest.tabs.brent,
      wtiUsd: lastWti.value,
      brentUsd: lastBrent.value,
      spreadUsd: lastSpread,
      lastUpdate: `${lastWti.date} (FRED DCOILWTICO / DCOILBRENTEU)`,
    }
  }

  writeFileSync(latestPath, `${JSON.stringify(latest, null, 2)}\n`)

  const logName = `${pulledAt.replace(/[:.]/g, '-').slice(0, 16)}.json`
  writeFileSync(join(logDir, logName), `${JSON.stringify(latest, null, 2)}\n`)

  console.log(`Updated ${latestPath}`)
  console.log(`Metals asOf: ${latest.asOf} (Vault Report)`)
  for (const row of vaultRows) {
    const tab = latest.tabs[row.slug]
    const reg =
      tab.registeredMoz ?? tab.registeredKst ?? tab.registeredKoz ?? '?'
    console.log(`  ${row.slug}: registered ${reg} (${row.asOf})`)
  }
  console.log(`NatGas L48: ${latest.tabs.natgas.workingGasBcf} Bcf (week ${eia.current_week})`)
  if (lastSpread !== null) console.log(`WTI–Brent spread: ${lastSpread} $/bbl (${lastWti.date})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
