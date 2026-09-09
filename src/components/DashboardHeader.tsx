import { DASHBOARD_TITLE } from '../dashboard/constants'
import { DashboardNavGroup } from './DashboardUi'

export function DashboardHeader({
  icon,
  subtitle,
  links,
  subnav,
  subnavLabel,
}: {
  icon: React.ReactNode
  subtitle: string
  links: { href: string; label: string; active?: boolean }[]
  subnav?: { href: string; label: string; active?: boolean }[]
  subnavLabel: string
}) {
  return (
    <header className="dashboard-header">
      {icon}
      <div className="dashboard-title-block">
        <h1>{DASHBOARD_TITLE}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </div>
      <DashboardNavGroup links={links} subnav={subnav} subnavLabel={subnavLabel} />
    </header>
  )
}
