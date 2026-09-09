/**
 * Snapshot compiled 2026-09-09 from public EIA weekly petroleum storage and CFTC COT
 * open interest. Not a live EIA socket.
 *
 * Sources:
 * - https://www.eia.gov/dnav/pet/pet_stoc_wstk_dcu_YCUOK_w.htm (week ending 2026-08-28, released 2026-09-02)
 * - https://thevaultreport.com/oil/cushing
 * - https://www.eia.gov/petroleum/supply/weekly/ (US commercial + SPR)
 * - https://www.tradingster.com/cot/legacy-futures/067651 (WTI-Physical OI 2026-09-01)
 */
export const dashboardData = {
  lastUpdate: '2026-08-28 (EIA WPSR, released 2026-09-02)',
  sourceUrl: 'https://www.eia.gov/dnav/pet/pet_stoc_wstk_dcu_YCUOK_w.htm',
  sourceVault: 'https://thevaultreport.com/oil/cushing',
  riskScore: 32,
  cushingMbbl: 22.508,
  weeklyChangeMbbl: 0.08,
  weeklyChangePct: 0.36,
  fiveYearAvgMbbl: 27.8,
  vsFiveYearPct: -19.2,
  vsFiveYearMbbl: -5.3,
  workingCapacityMbbl: 76,
  capacityPct: 30,
  percentile22yr: 21,
  percentileSince2015: 7,
  tankBottomMbbl: 20,
  coverageRatio: 1.2,
  paperPhysicalRatio: 85,
  openInterestContracts: 1_921_085,
  impliedPaperMbbl: 1921.1,
  daysCover: 24.3,
  daysCoverBasis: 'US commercial excl SPR / refinery inputs (EIA national method)',
  usCommercialMbbl: 424.5,
  usCommercialWowMbbl: -4.5,
  sprMbbl: 286.6,
  sprWowMbbl: -3.1,
  refineryInputsMmbblD: 17.5,
  flow: {
    cushingWowMbbl: 0.08,
    usCommercialMbbl: 424.5,
    usCommercialWowMbbl: -4.5,
    reportWeek: '2026-08-28',
    vsFiveYearPct: -19.2,
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    storage: { text: 'BELOW 5-YR', variant: 'warning' as const },
    coverage: { text: '85:1 PAPER', variant: 'ok' as const },
    cover: { text: '24D COVER', variant: 'ok' as const },
    flow: { text: 'ABOVE TANK BOTTOMS', variant: 'warning' as const },
  },
  alerts: [
    {
      severity: 'warning' as const,
      label: 'BELOW 5-YR AVG',
      text: 'Cushing 22.508 Mbbl — −19.2% vs same-week 5-yr avg (27.8 Mbbl); 21st %ile of 22-yr record, 7th %ile since 2015',
    },
    {
      severity: 'info' as const,
      label: 'ABOVE TANK BOTTOMS',
      text: 'Recrossed ~20 Mbbl tank-bottom floor week ending 2026-07-31 after Jul 24 low of 18.599 Mbbl; stocks rebuilding',
    },
    {
      severity: 'info' as const,
      label: '~30% CAPACITY',
      text: 'Cushing ~30% of ~76 Mbbl working capacity — lean hub, not empty tanks',
    },
    {
      severity: 'info' as const,
      label: 'PAPER COVERAGE',
      text: 'NYMEX CL WTI-Physical OI 1,921,085 contracts (CFTC 067651, 2026-09-01) → ~1,921 Mbbl paper vs 22.5 Mbbl Cushing (~1.2%, 85:1)',
    },
    {
      severity: 'info' as const,
      label: 'NATIONAL COVER',
      text: 'US commercial 424.5 Mbbl / 17.5 MMbbl/d refinery inputs ≈ 24.3 days — national EIA method, not Cushing-only',
    },
    {
      severity: 'info' as const,
      label: 'SPR FOOTNOTE',
      text: 'SPR 286.6 Mbbl (−3.1 WoW, 1st %ile of 44-yr record) — not deliverable against CL at Cushing',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 32/100 — WATCH / BELOW 5-YR / ABOVE TANK BOTTOMS; lean vs history but rebuilding above floor',
    },
  ],
  storageHistory: [
    { month: '07/24', value: 18.599 },
    { month: '07/31', value: 20.955 },
    { month: '08/07', value: 22.566 },
    { month: '08/14', value: 21.252 },
    { month: '08/21', value: 22.428 },
    { month: '08/28', value: 22.508 },
  ],
  coverageHistory: [{ month: '09/01', value: 1.2 }],
  storageAvg: 27.8,
  storageLowBand: 20,
  coverageAvg: 1.2,
  coverageTight: 2,
  storageYDomain: [17, 25] as [number, number],
  coverageYDomain: [0, 5] as [number, number],
}
