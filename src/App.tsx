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

function Chip({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'critical' | 'high' | 'warning' | 'neutral'
}) {
  return <span className={`chip chip-${variant}`}>{children}</span>
}

function KpiCard({
  title,
  primary,
  primaryClass,
  secondary,
  chip,
  chipVariant,
}: {
  title: string
  primary: React.ReactNode
  primaryClass?: string
  secondary: React.ReactNode
  chip: string
  chipVariant: 'critical' | 'high' | 'warning' | 'neutral'
}) {
  return (
    <article className="card kpi-card">
      <header className="kpi-header">
        <h2>{title}</h2>
        <Chip variant={chipVariant}>{chip}</Chip>
      </header>
      <div className={`kpi-primary ${primaryClass ?? ''}`}>{primary}</div>
      <div className="kpi-secondary">{secondary}</div>
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
            title="System Status"
            primary={
              <>
                Risk Score <strong>{d.riskScore}/100</strong>
              </>
            }
            secondary={<>Last Update {d.lastUpdate}</>}
            chip="SQUEEZE_SETUP"
            chipVariant="critical"
          />
          <KpiCard
            title="Deliverable Tightness"
            primary={
              <>
                Registered <strong>{d.registeredMoz} Moz</strong>{' '}
                <span className="delta">({d.registeredDelta} Moz)</span>
              </>
            }
            primaryClass="text-danger"
            secondary={
              <>
                Req/Total <strong>{d.reqTotalPct}%</strong>
              </>
            }
            chip="SQUEEZE RISK"
            chipVariant="critical"
          />
          <KpiCard
            title="Paper/Physical Coverage"
            primary={
              <>
                Coverage Ratio <strong>{d.coverageRatio}%</strong>
              </>
            }
            secondary={
              <>
                Open Interest <strong>{d.openInterestMoz} Moz</strong>; 2y percentile{' '}
                <strong>{d.percentile2y}th %ile</strong>
              </>
            }
            chip="SQUEEZE CONDITIONS"
            chipVariant="high"
          />
          <KpiCard
            title="Days of Cover"
            primary={
              <>
                Days Cover <strong>{d.daysCover} days</strong>
              </>
            }
            secondary={
              <>
                Global Demand <strong>{d.globalDemandMozDay} Moz/day</strong>
              </>
            }
            chip="LOW"
            chipVariant="warning"
          />
        </section>

        <section className="row detail-row">
          <article className="card delivery-card">
            <header className="section-header">
              <h2>Delivery Activity</h2>
              <Chip variant="high">EXTREME PRESSURE</Chip>
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
                  <td className="text-danger">{d.delivery.intensityPct}%</td>
                </tr>
              </tbody>
            </table>
          </article>

          <article className="card alerts-card">
            <header className="section-header">
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
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#888" />
                <YAxis domain={[30, 90]} tick={{ fontSize: 12 }} stroke="#888" unit=" Moz" />
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
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
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
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#888" />
                <YAxis domain={[4, 15]} tick={{ fontSize: 12 }} stroke="#888" unit="%" />
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
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </article>
        </section>

        <footer className="disclaimer">
          Mock data for prototype purposes only. Not investment advice.
        </footer>
      </main>
    </div>
  )
}
