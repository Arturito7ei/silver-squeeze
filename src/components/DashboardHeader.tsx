import { DASHBOARD_TITLE } from '../dashboard/constants'
import type { LatestMeta } from '../data/latestSchema'
import { DashboardNavGroup } from './DashboardUi'

function formatTimestamp(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export function DashboardHeader({
  markSrc,
  subtitle,
  links,
  subnav,
  subnavLabel,
  meta,
  onRefresh,
  refreshing,
}: {
  markSrc: string
  subtitle: string
  links: { href: string; label: string; active?: boolean }[]
  subnav?: { href: string; label: string; active?: boolean }[]
  subnavLabel: string
  meta?: LatestMeta | null
  onRefresh?: () => void
  refreshing?: boolean
}) {
  return (
    <header className="dashboard-header">
      <img className="pcdd-mark" src={markSrc} alt="7Ei" height={36} />
      <div className="dashboard-title-block">
        <h1>{DASHBOARD_TITLE}</h1>
        <p className="dashboard-subtitle">{subtitle}</p>
      </div>
      <div className="dashboard-header-actions">
        {meta ? (
          <div className="data-meta" aria-live="polite">
            <span className="data-meta-line">
              Pulled {formatTimestamp(meta.pulledAt)}
              {meta.asOf ? ` · as of ${meta.asOf}` : ''}
              {meta.stale ? ' · stale' : ''}
            </span>
            {meta.sources.length > 0 ? (
              <span className="data-meta-sources">
                {meta.sources.slice(0, 3).map((s) => (
                  <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                    {s.id}
                  </a>
                ))}
                {meta.sources.length > 3 ? ` +${meta.sources.length - 3}` : ''}
              </span>
            ) : null}
          </div>
        ) : null}
        {onRefresh ? (
          <button
            type="button"
            className="refresh-button"
            onClick={() => void onRefresh()}
            disabled={refreshing}
            aria-busy={refreshing}
          >
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        ) : null}
      </div>
      <DashboardNavGroup links={links} subnav={subnav} subnavLabel={subnavLabel} />
    </header>
  )
}
