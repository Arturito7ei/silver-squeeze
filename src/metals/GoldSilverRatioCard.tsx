import { LineChartCard } from '../components/DashboardUi'
import { goldSilverMonthly, goldSilverYDomain } from './goldSilverRatio'

export function GoldSilverRatioCard() {
  return (
    <LineChartCard
      title="Gold / silver ratio"
      data={goldSilverMonthly}
      yDomain={goldSilverYDomain}
      yUnit=""
      referenceLines={[]}
      stroke="#2563eb"
      tooltipLabel="oz Ag / oz Au"
    />
  )
}
