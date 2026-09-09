import { LineChartCard } from '../components/DashboardUi'
import { copperGoldMonthly, copperGoldYDomain } from './copperGoldRatio'

export function CopperGoldRatioCard() {
  return (
    <LineChartCard
      title="Copper priced in gold"
      data={copperGoldMonthly}
      yDomain={copperGoldYDomain}
      yUnit=""
      referenceLines={[]}
      stroke="#2563eb"
      tooltipLabel="oz Au / t Cu"
    />
  )
}
