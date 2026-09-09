import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dashboardData as d } from './data/mockData'
import './App.css'

type ChipVariant = 'critical' | 'high' | 'warning' | 'neutral' | 'ok'
type CardIconVariant = 'bar' | 'cube' | 'zigzag' | 'clock' | 'truck' | 'bell'

function Chip({
  children,
  variant,
  showWarningIcon,
}: {
  children: React.ReactNode
  variant: ChipVariant
  showWarningIcon?: boolean
}) {
  return (
    <span className={`chip chip-${variant}`}>
      {showWarningIcon && (
        <svg className="chip-warn-icon" viewBox="0 0 16 16" aria-hidden="true">
          <path
            fill="currentColor"
            d="M8 1.5 1.5 13.5h13L8 1.5zm0 3.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 5zm0 7a.875.875 0 1 1 0-1.75A.875.875 0 0 1 8 12z"
          />
        </svg>
      )}
      {children}
    </span>
  )
}

function CardIcon({ variant }: { variant: CardIconVariant }) {
  const icons: Record<CardIconVariant, React.ReactNode> = {
    bar: (
      <>
        <rect x="3" y="12" width="3" height="6" rx="0.5" fill="#22c55e" />
        <rect x="8" y="8" width="3" height="10" rx="0.5" fill="#22c55e" />
        <rect x="13" y="4" width="3" height="14" rx="0.5" fill="#22c55e" />
      </>
    ),
    cube: (
      <>
        <path
          d="M12 6.5 8 4 4 6.5v7L8 20l4-2.5v-7Z"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M8 4v15.5M4 6.5 8 9l4-2.5" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" />
      </>
    ),
    zigzag: (
      <path
        d="M4 16 8 8l4 6 4-10"
        fill="none"
        stroke="#ec4899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8" fill="none" stroke="#f97316" strokeWidth="1.5" />
        <path d="M12 8v4.5l3 2" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
      </>
    ),
    truck: (
      <>
        <rect x="2" y="9" width="11" height="7" rx="1" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <path d="M13 11h3l2 3v2h-5v-5Z" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="6" cy="17" r="1.5" fill="#ef4444" />
        <circle cx="16" cy="17" r="1.5" fill="#ef4444" />
      </>
    ),
    bell: (
      <>
        <path
          d="M12 17H6c-1.1 0-2-.9-2-2v-.5c0-2.5 1.5-4.7 3.8-5.7V7.5a4.2 4.2 0 0 1 8.4 0v1.3c2.3 1 3.8 3.2 3.8 5.7V15c0 1.1-.9 2-2 2Z"
          fill="none"
          stroke="#666"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M10 4.2a2 2 0 0 0 4 0" fill="none" stroke="#666" strokeWidth="1.5" />
      </>
    ),
  }

  return (
    <svg className={`card-icon card-icon-${variant}`} viewBox="0 0 24 24" aria-hidden="true">
      {icons[variant]}
    </svg>
  )
}

function KpiCard({
  icon,
  title,
  primary,
  primaryClass,
  secondary,
  chip,
  chipVariant,
  showWarningIcon,
}: {
  icon: CardIconVariant
  title: string
  primary: React.ReactNode
  primaryClass?: string
  secondary: React.ReactNode
  chip: string
  chipVariant: ChipVariant
  showWarningIcon?: boolean
}) {
  return (
    <article className="card kpi-card">
      <header className="kpi-header">
        <CardIcon variant={icon} />
        <h2>{title}</h2>
      </header>
      <div className={`kpi-primary ${primaryClass ?? ''}`}>{primary}</div>
      <div className="kpi-secondary">{secondary}</div>
      <footer className="card-footer">
        <Chip variant={chipVariant} showWarningIcon={showWarningIcon}>
          {chip}
        </Chip>
      </footer>
    </article>
  )
}

function CompassIcon() {
  return (
    <svg
      className="compass-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function monthTickFormatter(value: string, index: number, ticks: readonly { value: string }[]) {
  if (index === 0) return value
  if (value === ticks[index - 1]?.value) return ''
  return value
}

export default function App() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <CompassIcon />
        <h1>Silver Squeeze Early-Warning Dashboard</h1>
      </header>

      <main className="dashboard-body">
        <section className="row kpi-row">
          <KpiCard
            icon="bar"
            title="System Status"
            primary={
              <>
                Risk Score <strong>{d.riskScore}/100</strong>
              </>
            }
            secondary={<>Last Update {d.lastUpdate}</>}
            chip={d.chips.status.text}
            chipVariant={d.chips.status.variant}
          />
          <KpiCard
            icon="cube"
            title="Deliverable Tightness"
            primary={
              <>
                Registered <strong>{d.registeredMoz} Moz</strong>{' '}
                <span className="delta">({d.registeredDelta} Moz)</span>
              </>
            }
            secondary={
              <>
                Req/Total <strong>{d.reqTotalPct}%</strong> (registered / total stocks)
              </>
            }
            chip={d.chips.tightness.text}
            chipVariant={d.chips.tightness.variant}
          />
          <KpiCard
            icon="zigzag"
            title="Paper/Physical Coverage"
            primary={
              <>
                Coverage Ratio <strong>{d.coverageRatio}%</strong>
              </>
            }
            secondary={
              <>
                Implied OI <strong>{d.openInterestMoz} Moz</strong> at 5:1; {d.percentileLabel}{' '}
                <strong>{d.percentile2y}th %ile</strong>
              </>
            }
            chip={d.chips.coverage.text}
            chipVariant={d.chips.coverage.variant}
          />
          <KpiCard
            icon="clock"
            title="Days of Cover"
            primary={
              <>
                Days Cover <strong>{d.daysCover} days</strong>
              </>
            }
            secondary={
              <>
                {d.daysCoverBasis}
              </>
            }
            chip={d.chips.cover.text}
            chipVariant={d.chips.cover.variant}
          />
        </section>

        <section className="row detail-row">
          <article className="card delivery-card">
            <header className="section-header">
              <CardIcon variant="truck" />
              <h2>Delivery Activity</h2>
            </header>
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>MTD Deliveries</th>
                  <th>Daily Notices</th>
                  <th>Delivery Month</th>
                  <th>Intensity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{d.delivery.mtdMoz} Moz</td>
                  <td>{d.delivery.dailyNotices}</td>
                  <td>{d.delivery.deliveryMonth}</td>
                  <td>{d.delivery.intensityPct}%</td>
                </tr>
              </tbody>
            </table>
            <footer className="card-footer">
              <Chip variant={d.chips.delivery.variant}>{d.chips.delivery.text}</Chip>
            </footer>
          </article>

          <article className="card alerts-card">
            <header className="section-header">
              <CardIcon variant="bell" />
              <h2>Active Alerts</h2>
            </header>
            <ul className="alerts-list">
              {d.alerts.map((alert) => (
                <li key={alert.label} className={`alert alert-${alert.severity}`}>
                  <span className="alert-label">{alert.label}:</span> {alert.text}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="row chart-row">
          <article className="card chart-card">
            <h2>Historical Registered Silver</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={d.registeredHistory} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                  tickFormatter={(value, index) =>
                    monthTickFormatter(value, index, d.registeredHistory.map((p) => ({ value: p.month })))
                  }
                />
                <YAxis domain={d.registeredYDomain} tick={{ fontSize: 12 }} stroke="#888" unit=" Moz" />
                <Tooltip formatter={(v) => [`${v ?? ''} Moz`, 'Registered']} />
                <ReferenceLine
                  y={d.registeredAvg}
                  stroke="#888"
                  strokeDasharray="6 4"
                  label={{ value: 'Avg', position: 'insideTopRight', fill: '#666', fontSize: 11 }}
                />
                <ReferenceLine
                  y={d.registeredCritical}
                  stroke="#c0392b"
                  strokeWidth={2}
                  label={{ value: 'Critical', position: 'insideBottomRight', fill: '#c0392b', fontSize: 11 }}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#2563eb' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </article>

          <article className="card chart-card">
            <h2>Coverage Ratio Trend</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={d.coverageHistory} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                  tickFormatter={(value, index) =>
                    monthTickFormatter(value, index, d.coverageHistory.map((p) => ({ value: p.month })))
                  }
                />
                <YAxis domain={d.coverageYDomain} tick={{ fontSize: 12 }} stroke="#888" unit="%" />
                <Tooltip formatter={(v) => [`${v ?? ''}%`, 'Coverage']} />
                <ReferenceLine
                  y={d.coverageAvg}
                  stroke="#888"
                  strokeDasharray="6 4"
                  label={{ value: 'Avg', position: 'insideTopRight', fill: '#666', fontSize: 11 }}
                />
                <ReferenceLine
                  y={d.coverageSqueeze}
                  stroke="#c0392b"
                  strokeWidth={2}
                  label={{ value: 'Squeeze', position: 'insideBottomRight', fill: '#c0392b', fontSize: 11 }}
                />
                <Line
                  type="linear"
                  dataKey="value"
                  stroke="#db2777"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#db2777' }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </article>
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live CME feed. Figures as of 2026-09-04 from The Vault Report
          (CME COMEX warehouse reports). Coverage history is the current 5:1 paper/physical print
          only — no public daily coverage series was cited. Not investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            Source
          </a>
        </footer>
      </main>
    </div>
  )
}
