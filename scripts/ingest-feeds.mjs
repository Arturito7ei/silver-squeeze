/**
 * Pull EIA natgas + FRED WTI/Brent CSVs; update public/data/latest.json and append log row.
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

function readLatest() {
  return JSON.parse(readFileSync(latestPath, 'utf8'))
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`${url} → ${res.status}`)
  return res.text()
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
  latest.asOf = eia.current_week ?? pulledAt.slice(0, 10)
  latest.stale = false
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
  console.log(`NatGas L48: ${latest.tabs.natgas.workingGasBcf} Bcf (week ${eia.current_week})`)
  if (lastSpread !== null) console.log(`WTI–Brent spread: ${lastSpread} $/bbl (${lastWti.date})`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
