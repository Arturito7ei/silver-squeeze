/**
 * Snapshot compiled 2026-09-09 from public EIA weekly storage and CFTC COT
 * open interest. Not a live EIA socket.
 *
 * Sources:
 * - https://ir.eia.gov/ngs/ngs.html (week ending 2026-08-28, released 2026-09-03)
 * - https://ir.eia.gov/ngs/wngsr.json
 * - https://www.eia.gov/dnav/ng/ng_stor_wkly_s1_w.htm
 * - https://cotinsight.com/blog/cot-report-for-natural-gas-traders (OI 2026-08-25)
 * - EIA STEO dry-gas consumption ~90 Bcf/d (days-cover divisor)
 */
export const dashboardData = {
  lastUpdate: '2026-08-28 (EIA weekly storage, released 2026-09-03)',
  sourceUrl: 'https://ir.eia.gov/ngs/ngs.html',
  sourceJson: 'https://ir.eia.gov/ngs/wngsr.json',
  riskScore: 18,
  workingGasBcf: 3214,
  weeklyChangeBcf: 30,
  fiveYearAvgBcf: 3054,
  yearAgoBcf: 3264,
  vsFiveYearPct: 5.2,
  vsYearAgoPct: -1.5,
  coverageRatio: 18.2,
  paperPhysicalRatio: 5.5,
  openInterestContracts: 1_762_883,
  impliedPaperBcf: 17_629,
  daysCover: 36,
  daysCoverBasis: 'Working gas / ~90 Bcf/d US dry-gas use (EIA STEO)',
  flow: {
    netBcf: 30,
    regionalLeader: 'East +26 Bcf',
    reportWeek: '2026-08-28',
    vsFiveYearPct: 5.2,
  },
  regions: {
    east: 26,
    midwest: 24,
    southCentral: -10,
    pacific: -8,
    mountain: -2,
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    storage: { text: 'ABOVE 5-YR AVG', variant: 'ok' as const },
    coverage: { text: '5.5:1 PAPER', variant: 'ok' as const },
    cover: { text: '36D COVER', variant: 'ok' as const },
    flow: { text: 'INJECTION WEEK', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'info' as const,
      label: 'WITHIN 5-YR RANGE',
      text: 'EIA: Lower-48 working gas within the five-year historical range for this week',
    },
    {
      severity: 'info' as const,
      label: 'ABOVE 5-YR AVG',
      text: '3,214 Bcf working gas — +5.2% vs 5-yr avg (3,054 Bcf); −1.5% vs year-ago (3,264 Bcf)',
    },
    {
      severity: 'warning' as const,
      label: 'INJECTION WEEK',
      text: 'Net +30 Bcf injection — East +26, Midwest +24, South Central −10, Pacific −8, Mountain −2',
    },
    {
      severity: 'info' as const,
      label: 'PAPER COVERAGE',
      text: 'NYMEX NG OI 1,762,883 contracts (CFTC 2026-08-25) → ~17,629 Bcf paper vs 3,214 Bcf storage (~18.2%, 5.5:1)',
    },
    {
      severity: 'info' as const,
      label: 'NO SUPPLY STRESS',
      text: 'Risk Score 18/100 — not a squeeze analogue; stocks above 5-yr avg and within normal band',
    },
  ],
  storageHistory: [
    { month: '07/24', value: 3084 },
    { month: '07/31', value: 3117 },
    { month: '08/07', value: 3153 },
    { month: '08/14', value: 3169 },
    { month: '08/21', value: 3184 },
    { month: '08/28', value: 3214 },
  ],
  coverageHistory: [
    { month: '07/24', value: 17.5 },
    { month: '07/31', value: 17.7 },
    { month: '08/07', value: 17.9 },
    { month: '08/14', value: 18.0 },
    { month: '08/21', value: 18.1 },
    { month: '08/28', value: 18.2 },
  ],
  storageAvg: 3054,
  storageLowBand: 2800,
  coverageAvg: 18,
  coverageTight: 10,
  storageYDomain: [2800, 3400] as [number, number],
  coverageYDomain: [15, 22] as [number, number],
}
