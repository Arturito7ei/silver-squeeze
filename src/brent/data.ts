/**
 * Snapshot compiled 2026-09-09 from public Vault Report WTI–Brent spread and CFTC COT
 * open interest. Not a live ICE socket.
 *
 * Sources:
 * - https://thevaultreport.com/oil/wti-brent-spread (WTI/Brent/spread as of 2026-09-01)
 * - https://fred.stlouisfed.org/series/DCOILWTICO · https://fred.stlouisfed.org/series/DCOILBRENTEU
 * - https://www.tradingster.com/cot/legacy-futures/06765T (NYMEX Brent Last Day OI 2026-09-01)
 * - https://www.ice.com/products/219/Brent-Crude-Futures · https://www.ice.com/futures-europe/brent
 */
export const dashboardData = {
  lastUpdate: '2026-09-01 (Vault Report / CFTC COT)',
  sourceSpread: 'https://thevaultreport.com/oil/wti-brent-spread',
  sourceOi: 'https://www.tradingster.com/cot/legacy-futures/06765T',
  sourceIce: 'https://www.ice.com/products/219/Brent-Crude-Futures',
  riskScore: 24,
  wtiUsd: 91.48,
  brentUsd: 96.02,
  spreadUsd: -4.54,
  spreadRangeLow: -12.24,
  spreadRangeHigh: 2.45,
  spreadRangeLabel: 'Jun 2–Sep 1 observed range on Vault Report',
  openInterestContracts: 253_258,
  openInterestWow: -16_886,
  impliedPaperMbbl: 253.3,
  cargoSizeKb: 700,
  chips: {
    status: { text: 'WATCH', variant: 'neutral' as const },
    spread: { text: 'BRENT PREMIUM', variant: 'ok' as const },
    paper: { text: 'NOT ICE BRENT', variant: 'neutral' as const },
    physical: { text: 'CASH-SETTLED', variant: 'neutral' as const },
    delivery: { text: 'NO WAREHOUSE', variant: 'neutral' as const },
  },
  delivery: {
    mechanism: 'EFP delivery or cash settle vs ICE Brent Index',
    indexBasis: 'BFOET cargoes — full cargo size 700,000 bbl (Index methodology)',
    tightnessProxy: 'WTI–Brent spread — no public warehouse series',
  },
  alerts: [
    {
      severity: 'info' as const,
      label: 'WTI–BRENT SPREAD',
      text: 'Spread −$4.54/bbl (WTI $91.48 / Brent $96.02, 2026-09-01) — typical WTI discount; Jun 2–Sep 1 range −$12.24 to +$2.45',
    },
    {
      severity: 'info' as const,
      label: 'NO WAREHOUSE SERIES',
      text: 'ICE Brent is EFP + cash-settle vs the ICE Brent Index — no Cushing-style tank series. Do not clone tank stocks.',
    },
    {
      severity: 'info' as const,
      label: 'PAPER (NYMEX LD)',
      text: 'NYMEX Brent Last Day OI 253,258 contracts (CFTC 06765T, 2026-09-01, −16,886 WoW) — not ICE Brent futures',
    },
    {
      severity: 'info' as const,
      label: 'PHYSICAL MECHANISM',
      text: 'EFP or cash settle vs ICE Brent Index (700 kb cargo). No days-cover KPI — no tank farm.',
    },
    {
      severity: 'info' as const,
      label: 'NO SQUEEZE SETUP',
      text: 'Risk Score 24/100 — WATCH / CASH-SETTLED / NO WAREHOUSE; −$4.54 is mid-range, not a squeeze flag',
    },
  ],
  spreadHistory: [{ month: '09/01', value: -4.54 }],
  oiHistory: [{ month: '09/01', value: 253.3 }],
  spreadYDomain: [-14, 4] as [number, number],
  oiYDomain: [200, 280] as [number, number],
  spreadZero: 0,
  oiCurrent: 253.3,
}
