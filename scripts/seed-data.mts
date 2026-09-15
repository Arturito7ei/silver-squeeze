/**
 * Seed public/data/latest.json and log/2026-09-09.json from compiled TS snapshots.
 * Run: npx tsx scripts/seed-data.mts
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { dashboardData as silver } from '../src/data/mockData.ts'
import { dashboardData as gold } from '../src/gold/data.ts'
import { dashboardData as copper } from '../src/copper/data.ts'
import { dashboardData as platinum } from '../src/platinum/data.ts'
import { dashboardData as natgas } from '../src/natgas/data.ts'
import { dashboardData as wti } from '../src/wti/data.ts'
import { dashboardData as brent } from '../src/brent/data.ts'
import { dashboardData as arabica } from '../src/arabica/data.ts'
import { spreadDaily, spreadMonthly } from '../src/oil/wtiBrentSpread.ts'
import { copperGoldMonthly } from '../src/metals/copperGoldRatio.ts'
import { goldSilverMonthly } from '../src/metals/goldSilverRatio.ts'
import type { LatestDataFile } from '../src/data/latestSchema.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pulledAt = '2026-09-09T00:00:00.000Z'
const asOf = '2026-09-09'

const payload: LatestDataFile = {
  pulledAt,
  asOf,
  sources: [
    { id: 'vault-silver', url: silver.sourceUrl, asOf: '2026-09-04' },
    { id: 'vault-gold', url: gold.sourceUrl, asOf: '2026-09-04' },
    { id: 'vault-copper', url: copper.sourceUrl, asOf: '2026-09-04' },
    { id: 'vault-platinum', url: platinum.sourceUrl, asOf: '2026-09-04' },
    { id: 'eia-natgas', url: natgas.sourceJson, asOf: '2026-08-28' },
    { id: 'eia-wti', url: wti.sourceUrl, asOf: '2026-08-28' },
    { id: 'vault-brent', url: brent.sourceSpread, asOf: '2026-09-01' },
    { id: 'ice-arabica', url: arabica.sourceCerts, asOf: '2026-09-08' },
    {
      id: 'fred-wti',
      url: 'https://fred.stlouisfed.org/series/DCOILWTICO',
      asOf: '2026-09-09',
    },
    {
      id: 'fred-brent',
      url: 'https://fred.stlouisfed.org/series/DCOILBRENTEU',
      asOf: '2026-09-09',
    },
  ],
  tabs: {
    silver,
    gold,
    copper,
    platinum,
    natgas,
    wti,
    brent,
    arabica,
  },
  series: {
    spreadDaily,
    spreadMonthly,
    copperGoldMonthly,
    goldSilverMonthly,
  },
}

const outDir = join(root, 'public', 'data')
const logDir = join(outDir, 'log')
mkdirSync(logDir, { recursive: true })

const latestPath = join(outDir, 'latest.json')
const seedLogPath = join(logDir, '2026-09-09.json')

writeFileSync(latestPath, `${JSON.stringify(payload, null, 2)}\n`)
writeFileSync(seedLogPath, `${JSON.stringify(payload, null, 2)}\n`)

console.log(`Wrote ${latestPath}`)
console.log(`Wrote ${seedLogPath}`)
