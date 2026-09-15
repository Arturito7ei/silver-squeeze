import { LineChartCard } from '../components/DashboardUi'
import { useLatestSeriesContext } from '../data/useLatestData'
import { copperGoldMonthly as seedCopperGold, copperGoldYDomain } from './copperGoldRatio'

export function CopperGoldRatioCard() {
  const series = useLatestSeriesContext()
  const data = series.copperGoldMonthly?.length ? series.copperGoldMonthly : seedCopperGold
  return (
    <LineChartCard
      title="Copper priced in gold"
      data={data}
      yDomain={copperGoldYDomain}
      yUnit=""
      referenceLines={[]}
      stroke="#2563eb"
      tooltipLabel="oz Au / t Cu"
    />
  )
}
