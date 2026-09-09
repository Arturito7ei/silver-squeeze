/**
 * Locked nearby/next curve prints — one row per tab, no interpolation.
 * Sources: RESEARCH/PCDD_ENERGY_SOFTS_CURVE_INTAKE.md
 */
export type CurveKind = 'contango' | 'backwardation' | 'not_in_snapshot'

export type CurveSnapshot = {
  kind: CurveKind
  /** Chip label */
  label: string
  /** Primary one-line print */
  print: string
  asOf: string
  citeLabel: string
  citeUrl: string
  /** Brent-only body when kind === not_in_snapshot */
  body?: string
}

export const curveSnapshots = {
  silver: {
    kind: 'contango',
    label: 'CONTANGO',
    print: 'Next month 1.15% over front',
    asOf: '2026-09-09 (inventory 2026-09-04)',
    citeLabel: 'Vault Report silver',
    citeUrl: 'https://thevaultreport.com/metals/silver',
  },
  gold: {
    kind: 'contango',
    label: 'CONTANGO',
    print: 'Next month 0.43% over front',
    asOf: '2026-09-09 (inventory 2026-09-04)',
    citeLabel: 'Vault Report gold',
    citeUrl: 'https://thevaultreport.com/metals/gold',
  },
  copper: {
    kind: 'contango',
    label: 'CONTANGO',
    print: '+$0.0195 / +0.30% (next over front)',
    asOf: 'Forward curve 2026-09-07',
    citeLabel: 'COT-Trader hub',
    citeUrl: 'https://www.cot-trader.com/commodity-intelligence-hub',
  },
  natgas: {
    kind: 'contango',
    label: 'CONTANGO',
    print: '+$0.12 / +4.03% (next over front)',
    asOf: 'Forward curve 2026-09-07',
    citeLabel: 'COT-Trader hub',
    citeUrl: 'https://www.cot-trader.com/commodity-intelligence-hub',
  },
  wti: {
    kind: 'backwardation',
    label: 'BACKWARDATION',
    print: '−$2.91 / −3.18% (front over next)',
    asOf: 'Forward curve 2026-09-07',
    citeLabel: 'COT-Trader hub',
    citeUrl: 'https://www.cot-trader.com/commodity-intelligence-hub',
  },
  brent: {
    kind: 'not_in_snapshot',
    label: 'NOT IN SNAPSHOT',
    print: 'Nearby vs next not in this snapshot',
    asOf: '—',
    citeLabel: 'Tightness = WTI–Brent spread card',
    citeUrl: 'https://thevaultreport.com/oil/wti-brent',
    body: 'Nearby vs next not in this snapshot. Tightness = WTI–Brent. Do not infer ICE backwardation from NYMEX CL.',
  },
  arabica: {
    kind: 'backwardation',
    label: 'BACKWARDATION',
    print: 'Sep 318.45 ¢/lb vs Dec 291.30 ¢/lb → front 27.15 ¢ / 8.53% over next',
    asOf: '2026-09-09 session',
    citeLabel: 'Vietnam.vn (NY ICE Arabica)',
    citeUrl: 'https://www.vietnam.vn/en/gia-ca-phe-hom-nay-9-9-robusta-hoi-phuc-arabica-thap-nhat-2-thang',
  },
} as const satisfies Record<string, CurveSnapshot>

export type CurveTab = keyof typeof curveSnapshots
