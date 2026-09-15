export type TabKey =
  | 'silver'
  | 'gold'
  | 'copper'
  | 'platinum'
  | 'natgas'
  | 'wti'
  | 'brent'
  | 'arabica'

export type ChartPoint = { month: string; value: number }

export type DataSource = {
  id: string
  url: string
  asOf?: string
}

export type LatestSeries = {
  spreadDaily?: ChartPoint[]
  spreadMonthly?: ChartPoint[]
  copperGoldMonthly?: ChartPoint[]
  goldSilverMonthly?: ChartPoint[]
}

export type LatestDataFile = {
  pulledAt: string
  asOf: string
  sources: DataSource[]
  stale?: boolean
  tabs: Record<TabKey, Record<string, unknown>>
  series?: LatestSeries
}

export type LatestMeta = {
  pulledAt: string
  asOf: string
  sources: DataSource[]
  stale?: boolean
}
