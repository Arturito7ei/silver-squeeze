/**
 * Snapshot compiled 2026-09-09 from public secondary reports of CME
 * COMEX gold warehouse stocks. Not a CME DataMine feed.
 *
 * Sources:
 * - https://thevaultreport.com/metals/gold (as of 2026-09-04)
 * - https://thevaultreport.com/comex (as of 2026-09-04)
 * - https://thevaultreport.com/research/comex-gold-inventory-drawdown
 * - https://thevaultreport.com/charts/comex/gold
 * - https://thevaultreport.com/research/comex-gold-registered-stocks-hold-near-14-78m-oz-9
 * - https://www.tradingster.com/cot/legacy-futures/088691 (CFTC OI cross-check)
 */
export const dashboardData = {
  lastUpdate: '2026-09-04 (COMEX warehouse report via The Vault Report)',
  sourceUrl: 'https://thevaultreport.com/metals/gold',
  sourceComex: 'https://thevaultreport.com/comex',
  riskScore: 18,
  registeredMoz: 15.11,
  eligibleMoz: 12.27,
  totalMoz: 27.38,
  reqTotalPct: 55.2,
  registeredDelta30dPct: 5.2,
  registeredRange30d: { low: 14.36, high: 15.11 },
  registeredDelta7dPct: 0.0,
  crossed15MozDate: '2026-09-01',
  coverageRatio: 33,
  paperPhysicalRatio: 3,
  impliedPaperMoz: 45.3,
  openInterestContracts: 415_196,
  openInterestMoz: 41.52,
  daysCover: 172,
  daysCoverBasis: 'Withdrawal cover (registered / avg daily withdrawal; arrivals not counted)',
  delivery: {
    stops30dContracts: 7_644,
    stops30dKoz: 764.4,
    stops30dValueB: 3.4,
    stops30dPctRegistered: 5.1,
    sep4Contracts: 62,
    sep4Koz: 6.2,
    sep4VaultFlow: '+64 oz FILLING (eligible +64, registered 0)',
    deliveryMonth: '2026-09',
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    tightness: { text: 'WITHIN RANGE', variant: 'ok' as const },
    coverage: { text: '3:1 PAPER', variant: 'ok' as const },
    cover: { text: '172D COVER', variant: 'ok' as const },
    delivery: { text: 'BUILDING', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'info' as const,
      label: 'WITHIN NORMAL RANGE',
      text: 'Vault Report: registered inventory sits within its normal range — 36th percentile of 8-month record',
    },
    {
      severity: 'info' as const,
      label: 'REGISTERED BUILDING',
      text: '15.11 Moz registered (+5.2% over 30d, range 14.36–15.11 Moz); crossed 15 Moz on 2026-09-01',
    },
    {
      severity: 'info' as const,
      label: 'STOCKS MIX',
      text: 'Eligible 12.27 Moz · Total 27.38 Moz · Req/Total 55.2%',
    },
    {
      severity: 'warning' as const,
      label: '30D STOPS',
      text: '7,644 contracts stopped (764.4 Koz, ~$3.4B) ≈ 5.1% of registered; Sep 4 house stop 62 contracts (6.2 Koz)',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 18/100 — WATCH / WITHIN RANGE / BUILDING; not SQUEEZE_SETUP',
    },
  ],
  registeredHistory: [
    { month: '01/08', value: 19.18 },
    { month: '06/15', value: 15.42 },
    { month: '07/28', value: 14.75 },
    { month: '08/24', value: 14.78 },
    { month: '09/04', value: 15.11 },
  ],
  coverageHistory: [{ month: '09/04', value: 33 }],
  registeredAvg: 15.5,
  registeredCritical: 12,
  coverageAvg: 33,
  coverageTight: 15,
  registeredYDomain: [14, 20] as [number, number],
  coverageYDomain: [25, 40] as [number, number],
}
