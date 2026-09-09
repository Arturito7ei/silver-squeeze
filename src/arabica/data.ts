/**
 * Snapshot compiled 2026-09-09 from public secondary reports of ICE Coffee C
 * certified stocks. Not a live ICE feed.
 *
 * Sources:
 * - https://www.vietnam.vn/en/gia-ca-phe-hom-nay-9-9-robusta-hoi-phuc-arabica-thap-nhat-2-thang (certs 2026-09-08)
 * - https://www.straitstimes.com/business/arabica-coffee-stocks-hit-26-year-low-supporting-prices (224,011 2026-08-28)
 * - https://www.comunicaffe.com/coffee-markets-open-the-month-on-a-weaker-note-as-certified-stocks-hit-new-lows-and-brazils-harvest-wraps-up/ (223,911 2026-09-01)
 * - https://www.cot-trader.com/commodity-intelligence-hub (OI 155,275, report 2026-09-01)
 */
export const dashboardData = {
  lastUpdate: '2026-09-08 (ICE certified stocks via Vietnam.vn)',
  sourceCerts: 'https://www.vietnam.vn/en/gia-ca-phe-hom-nay-9-9-robusta-hoi-phuc-arabica-thap-nhat-2-thang',
  sourceOi: 'https://www.cot-trader.com/commodity-intelligence-hub',
  sourceIce: 'https://www.ice.com/products/15/Coffee-C-Futures/specs',
  riskScore: 38,
  certifiedBags: 218_838,
  certifiedLowLabel: '27-year low',
  openInterestContracts: 155_275,
  contractBags: 283.5,
  impliedPaperBags: 44_020_462.5,
  coverageRatio: 0.5,
  paperPhysicalRatio: 201,
  daysCover: 'N/A',
  daysCoverBasis: 'No cited divisor — do not divide certified bags by world grind',
  contractSizeLb: 37_500,
  delivery: {
    brazilExportsT: 206_618,
    brazilExportsYoyPct: 44.6,
    exportNote: 'Brazil Aug exports — contrast, not a tightness KPI',
    rabobankSurplusBags: 8_900_000,
    rabobankNote: 'Rabobank 2026/27 surplus ~8.9M bags — empty ICE sheds ≠ empty world crop',
  },
  footnotes: {
    pendingGrading: 'I&M Smith ~3,205 bags pending around 2 Sep — do not subtract from 218,838',
    geography: 'I&M Smith ~74% Europe / 26% US around 2 Sep on 223,762 bags — do not apply to 218,838',
    oiVintage: 'CFTC OI 2026-09-01 vs certs 2026-09-08 — footnote, no interpolated path',
    robusta: 'Robusta ICE certs ~5,004 lots (~9-month high) — different contract; footnote only',
  },
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    certs: { text: 'CERTS THIN', variant: 'warning' as const },
    coverage: { text: '201:1 PAPER', variant: 'ok' as const },
    physical: { text: 'N/A COVER', variant: 'neutral' as const },
  },
  alerts: [
    {
      severity: 'warning' as const,
      label: 'CERTS DRAIN',
      text: 'ICE certified arabica 224,011 (28 Aug) → 223,911 (1 Sep) → 218,838 (8 Sep) — lowest in 27 years',
    },
    {
      severity: 'info' as const,
      label: 'BACKWARDATION',
      text: 'Sep 318.45 ¢/lb vs Dec 291.30 ¢/lb — front 27.15 ¢ / 8.53% over next (Vietnam.vn 9 Sep)',
    },
    {
      severity: 'info' as const,
      label: 'WORLD CROP CONTRAST',
      text: 'Rabobank 2026/27 surplus ~8.9M bags — very abundant crop tape coexists with thin ICE sheds',
    },
    {
      severity: 'info' as const,
      label: 'BRAZIL EXPORTS',
      text: 'Brazil Aug exports 206,618 t (+44.6% y/y) — contrast footnote, not deliverable tightness',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 38/100 — WATCH / CERTS THIN / BACKWARDATION; surplus crop tape below squeeze call',
    },
  ],
  certHistory: [
    { month: '08/28', value: 224_011 },
    { month: '09/01', value: 223_911 },
    { month: '09/08', value: 218_838 },
  ],
  coverageHistory: [{ month: '09/08', value: 0.5 }],
  certAvg: 222_000,
  certLowBand: 220_000,
  coverageAvg: 0.5,
  coverageTight: 1,
  certYDomain: [215_000, 230_000] as [number, number],
  coverageYDomain: [0, 2] as [number, number],
}
