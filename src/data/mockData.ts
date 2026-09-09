/**
 * Snapshot compiled 2026-09-09 from public secondary reports of CME
 * COMEX warehouse stocks. Not a CME DataMine feed. Thresholds from the
 * Figma mock remain unvalidated market science (nest RESEARCH/SILVER_SQUEEZE_DASHBOARD_INTAKE.md).
 *
 * Sources:
 * - https://thevaultreport.com/metals/silver  (as of 2026-09-04)
 * - https://thevaultreport.com/comex           (as of 2026-09-04)
 * - https://thevaultreport.com/research/september-silver-standing-vs-delivered-stoppers-2026
 */
export const dashboardData = {
  lastUpdate: '2026-09-04 (COMEX warehouse report via The Vault Report)',
  sourceUrl: 'https://thevaultreport.com/metals/silver',
  asOfExactOz: 99_386_946,
  riskScore: 22,
  registeredMoz: 99.39,
  registeredDelta: -0.32,
  reqTotalPct: 29.4,
  coverageRatio: 20,
  openInterestMoz: 497,
  percentileLabel: '8-mo percentile',
  percentile2y: 77,
  daysCover: 77,
  daysCoverBasis: 'Withdrawal cover (registered / avg daily withdrawal)',
  delivery: {
    mtdMoz: 25.2,
    dailyNotices: 24,
    deliveryMonth: '2026-09',
    intensityPct: 25.4,
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    tightness: { text: 'ABOVE 50 MOZ', variant: 'ok' as const },
    coverage: { text: '5:1 PAPER', variant: 'ok' as const },
    cover: { text: '77d COVER', variant: 'ok' as const },
    delivery: { text: 'SEP DELIVERIES', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'info' as const,
      label: 'REGISTERED ADEQUATE',
      text: 'COMEX registered silver 99.39 Moz (99,386,946 oz) — above the 50 Moz squeeze threshold from the Figma mock',
    },
    {
      severity: 'info' as const,
      label: 'COVERAGE',
      text: 'Paper/physical 5:1 (coverage 20%, implied OI ~497 Moz) — not the 4.84% squeeze print from Feb',
    },
    {
      severity: 'warning' as const,
      label: 'SEPTEMBER DELIVERIES',
      text: '25.2 Moz delivered in the first five September sessions (5,032 of 6,757 contracts standing 27 Aug) — 25.4% of registered',
    },
    {
      severity: 'info' as const,
      label: 'COVER',
      text: '77 days withdrawal cover — above the 20-day LOW threshold from the Figma mock',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 22/100 — 77th percentile of the 8-month registered record; Vault Report: nothing here demands attention today',
    },
  ],
  registeredHistory: [
    { month: 'Jun', value: 90 },
    { month: 'Jul', value: 95 },
    { month: 'Aug', value: 99.2 },
    { month: 'Sep', value: 99.39 },
  ],
  coverageHistory: [
    { month: 'Jun', value: 20 },
    { month: 'Jul', value: 20 },
    { month: 'Aug', value: 20 },
    { month: 'Sep', value: 20 },
  ],
  registeredAvg: 95,
  registeredCritical: 50,
  coverageAvg: 20,
  coverageSqueeze: 5,
  registeredYDomain: [50, 130] as [number, number],
  coverageYDomain: [0, 30] as [number, number],
}
