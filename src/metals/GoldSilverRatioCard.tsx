import { LineChartCard } from '../components/DashboardUi'
import { useLatestSeriesContext } from '../data/useLatestData'
import { goldSilverMonthly as seedGoldSilver, goldSilverYDomain } from './goldSilverRatio'

export function GoldSilverRatioCard() {
  const series = useLatestSeriesContext()
  const data = series.goldSilverMonthly?.length ? series.goldSilverMonthly : seedGoldSilver
  return (
    <LineChartCard
      title="Gold / silver ratio"
      data={data}
      yDomain={goldSilverYDomain}
      yUnit=""
      referenceLines={[]}
      stroke="#2563eb"
      tooltipLabel="oz Ag / oz Au"
    />
  )
}
