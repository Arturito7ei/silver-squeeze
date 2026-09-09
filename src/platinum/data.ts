/**
 * Snapshot compiled 2026-09-09 from public secondary reports of CME
 * COMEX/NYMEX platinum warehouse stocks. Not a CME DataMine feed.
 *
 * Sources:
 * - https://thevaultreport.com/metals/platinum (as of 2026-09-04)
 * - https://thevaultreport.com/charts/comex/platinum
 * - https://futuresbench.com/cot/platinum/ (CFTC OI cross-check)
 */
export const dashboardData = {
  lastUpdate: '2026-09-04 (COMEX/NYMEX warehouse report via The Vault Report)',
  sourceUrl: 'https://thevaultreport.com/metals/platinum',
  sourceComex: 'https://thevaultreport.com/charts/comex/platinum',
  sourceCot: 'https://futuresbench.com/cot/platinum/',
  riskScore: 32,
  registeredKoz: 190.8,
  eligibleKoz: 202.6,
  totalKoz: 393.4,
  reqTotalPct: 48.5,
  registeredDelta30dPct: -0.9,
  registeredDelta7dPct: 0.0,
  registeredRange30d: { low: 190.8, high: 192.5 },
  below200KozDate: '2026-07-02',
  coverageRatio: 5.6,
  paperPhysicalRatio: 18,
  impliedPaperMoz: 3.43,
  openInterestContracts: 68_059,
  openInterestMoz: 3.403,
  daysCover: 33,
  daysCoverBasis: 'Withdrawal cover (registered / avg daily withdrawal; arrivals not counted)',
  goldPlatinumSpotFootnote: '2.34 oz Au / oz Pt (Vault gold $4,450 / platinum $1,905, COMEX front-month, 2026-09-09)',
  delivery: {
    stops30dContracts: 89,
    stops30dKoz: 4.5,
    stops30dValueM: 8.5,
    sep4Contracts: 7,
    sep4Oz: 350,
    sep4VaultFlow: '0 oz',
    deliveryMonth: '2026-09',
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    tightness: { text: '8-MO LOW', variant: 'warning' as const },
    coverage: { text: '18:1 PAPER', variant: 'ok' as const },
    cover: { text: '33D COVER', variant: 'warning' as const },
    delivery: { text: 'THIN', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'warning' as const,
      label: '8-MO LOW',
      text: 'Registered 190.8 Koz at 6th percentile of 8-month record; fell below 200 Koz on 2026-07-02',
    },
    {
      severity: 'warning' as const,
      label: 'THIN PILE',
      text: '30d −0.9%, 7d +0.0%, range 190.8–192.5 Koz — level is thin though curve is contango',
    },
    {
      severity: 'info' as const,
      label: '90-REPORT BUILD',
      text: 'Vault desk: thin pile has lately been gaining on 90-report pace — build-side extreme on a small base',
    },
    {
      severity: 'info' as const,
      label: 'STOCKS MIX',
      text: 'Eligible 202.6 Koz · Total 393.4 Koz · Req/Total 48.5%',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 32/100 — WATCH / 8-MO LOW / THIN / contango 1.23%; not SQUEEZE_SETUP',
    },
  ],
  registeredHistory: [
    { month: '08/20', value: 192.5 },
    { month: '09/04', value: 190.8 },
  ],
  coverageHistory: [{ month: '09/04', value: 5.6 }],
  registeredAvg: 191.65,
  registeredCritical: 191,
  coverageAvg: 5.6,
  coverageTight: 8,
  registeredYDomain: [189, 194] as [number, number],
  coverageYDomain: [4, 8] as [number, number],
}
