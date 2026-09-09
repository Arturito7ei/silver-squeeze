/** IMF PCOPP ÷ PGOLD monthly averages — snapshot, not fetched at runtime. */

export const copperGoldMonthly = [
  { month: '09/24', value: 3.6 },
  { month: '10/24', value: 3.55 },
  { month: '11/24', value: 3.42 },
  { month: '12/24', value: 3.37 },
  { month: '01/25', value: 3.32 },
  { month: '02/25', value: 3.22 },
  { month: '03/25', value: 3.26 },
  { month: '04/25', value: 2.85 },
  { month: '05/25', value: 2.9 },
  { month: '06/25', value: 2.93 },
  { month: '07/25', value: 2.92 },
  { month: '08/25', value: 2.87 },
  { month: '09/25', value: 2.73 },
  { month: '10/25', value: 2.65 },
  { month: '11/25', value: 2.65 },
  { month: '12/25', value: 2.73 },
  { month: '01/26', value: 2.75 },
  { month: '02/26', value: 2.58 },
  { month: '03/26', value: 2.58 },
  { month: '04/26', value: 2.73 },
  { month: '05/26', value: 2.94 },
  { month: '06/26', value: 3.2 },
  { month: '07/26', value: 3.32 },
  { month: '08/26', value: 3.24 },
]

export const copperGoldYDomain: [number, number] = [2.4, 3.8]

export const copperGoldSources = {
  imf: 'https://www.imf.org/en/research/commodity-prices',
  fredCopper: 'https://fred.stlouisfed.org/series/PCOPPUSDM',
}
