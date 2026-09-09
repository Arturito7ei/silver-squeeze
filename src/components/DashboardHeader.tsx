import { DASHBOARD_TITLE } from '../dashboard/constants'
import { DashboardNavGroup } from './DashboardUi'

export function DashboardHeader({
  markSrc,
  subtitle,
  links,
  subnav,
  subnavLabel,
}: {
  markSrc: string
  subtitle: string
  links: { href: string; label: string; active?: boolean }[]
  subnav?: { href: string; label: string; active?: boolean }[]
  subnavLabel: string
}) {
  return (
    <header className="dashboard-header">
      <img className="pcdd-mark" src={markSrc} alt="7Ei" height={36} />
      <div className="dashboard-title-block">
        <h1>{DASHBOARD_TITLE}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </div>
      <DashboardNavGroup links={links} subnav={subnav} subnavLabel={subnavLabel} />
    </header>
  )
}
