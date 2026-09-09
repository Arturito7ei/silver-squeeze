/** IMF PGOLD ÷ PSILVER monthly averages — snapshot, not fetched at runtime. */

export const goldSilverMonthly = [
  { month: '09/24', value: 85.61 },
  { month: '10/24', value: 82.96 },
  { month: '11/24', value: 85.19 },
  { month: '12/24', value: 86.95 },
  { month: '01/25', value: 89.35 },
  { month: '02/25', value: 89.93 },
  { month: '03/25', value: 89.99 },
  { month: '04/25', value: 99.85 },
  { month: '05/25', value: 100.53 },
  { month: '06/25', value: 93.25 },
  { month: '07/25', value: 88.71 },
  { month: '08/25', value: 88.76 },
  { month: '09/25', value: 86.19 },
  { month: '10/25', value: 81.99 },
  { month: '11/25', value: 80.53 },
  { month: '12/25', value: 66.64 },
  { month: '01/26', value: 51.74 },
  { month: '02/26', value: 60.75 },
  { month: '03/26', value: 61.97 },
  { month: '04/26', value: 62.67 },
  { month: '05/26', value: 59.22 },
  { month: '06/26', value: 63.5 },
  { month: '07/26', value: 69.54 },
  { month: '08/26', value: 67.81 },
]

export const goldSilverYDomain: [number, number] = [45, 110]

export const goldSilverSources = {
  imf: 'https://www.imf.org/en/research/commodity-prices',
  vaultSpot: 'https://thevaultreport.com/ratios/gold-silver',
}

/** Vault Report COMEX spot footnote — not a chart point. */
export const goldSilverSpotFootnote = '65.3:1 as of 2026-09-09 (gold $4,451 / silver $68)'
