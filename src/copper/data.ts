/**
 * Snapshot compiled 2026-09-09 from public secondary reports of CME
 * COMEX copper warehouse stocks. Not a CME DataMine feed.
 *
 * Sources:
 * - https://thevaultreport.com/metals/copper (as of 2026-09-04)
 * - https://thevaultreport.com/comex (as of 2026-09-04)
 * - https://thevaultreport.com/charts/comex/copper
 * - https://www.tradingster.com/cot/legacy-futures/085692 (CFTC OI cross-check)
 */
export const dashboardData = {
  lastUpdate: '2026-09-04 (COMEX warehouse report via The Vault Report)',
  sourceUrl: 'https://thevaultreport.com/metals/copper',
  sourceComex: 'https://thevaultreport.com/comex',
  riskScore: 16,
  registeredKst: 477.7,
  eligibleKst: 289.6,
  totalKst: 767.3,
  reqTotalPct: 62.3,
  registeredDelta30dPct: 3.7,
  registeredRange30d: { low: 447.3, high: 477.7 },
  registeredDelta7dPct: 0.1,
  crossed450KstDate: '2026-08-25',
  coverageRatio: 14,
  paperPhysicalRatio: 7,
  impliedPaperKst: 3344,
  openInterestContracts: 282_640,
  openInterestKst: 3533,
  daysCover: 469,
  daysCoverBasis: 'Withdrawal cover (registered / avg daily withdrawal; arrivals not counted)',
  delivery: {
    stops30dContracts: 15_044,
    stops30dKst: 188.1,
    stops30dValueB: 2.6,
    stops30dPctRegistered: 39,
    sep4Contracts: 40,
    sep4Kst: 0.5,
    sep4VaultFlow: '+480 st FILLING (received +1.6K, withdrawn −1.1K; eligible +480, registered 0)',
    deliveryMonth: '2026-09',
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    tightness: { text: '8-MO HIGH', variant: 'warning' as const },
    coverage: { text: '7:1 PAPER', variant: 'ok' as const },
    cover: { text: '469D COVER', variant: 'ok' as const },
    delivery: { text: 'BUILDING', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'info' as const,
      label: '8-MONTH HIGH',
      text: 'Vault Report: registered inventory at 8-month high (100th percentile of 8-mo record) — amply stocked and still building',
    },
    {
      severity: 'info' as const,
      label: 'REGISTERED BUILDING',
      text: '477.7K st registered (+3.7% over 30d, range 447.3–477.7K st); crossed 450K st on 2026-08-25',
    },
    {
      severity: 'info' as const,
      label: 'STOCKS MIX',
      text: 'Eligible 289.6K st · Total 767.3K st · Req/Total 62.3%',
    },
    {
      severity: 'warning' as const,
      label: '30D STOPS',
      text: '15,044 contracts stopped (188.1K st, ~$2.6B) ≈ 39% of registered; Sep 4 house stop 40 contracts (500 st)',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 16/100 — WATCH / 8-MO HIGH / BUILDING; 7:1 paper shown but pile is ample (469d cover)',
    },
  ],
  registeredHistory: [
    { month: '08/17', value: 449.6 },
    { month: '08/20', value: 448.5 },
    { month: '09/04', value: 477.7 },
  ],
  coverageHistory: [{ month: '09/04', value: 14 }],
  registeredAvg: 460,
  registeredCritical: 400,
  coverageAvg: 14,
  coverageTight: 15,
  registeredYDomain: [440, 490] as [number, number],
  coverageYDomain: [10, 20] as [number, number],
}
