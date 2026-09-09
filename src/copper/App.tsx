import {
  CardIcon,
  Chip,
  CompassIcon,
  DashboardNav,
  KpiCard,
  LineChartCard,
} from '../components/DashboardUi'
import { dashboardData as d } from './data'
import '../App.css'

export default function CopperApp() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <CompassIcon />
        <h1>Copper Warehouse Early-Warning Dashboard</h1>
        <DashboardNav
          links={[
            { href: '../', label: 'Silver' },
            { href: '../natgas/', label: 'NatGas' },
            { href: '../gold/', label: 'Gold' },
            { href: './', label: 'Copper', active: true },
          ]}
        />
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
            title="Registered Tightness"
            primary={
              <>
                Registered <strong>{d.registeredKst}K st</strong>{' '}
                <span className="delta-positive">(+{d.registeredDelta30dPct}% 30d)</span>
              </>
            }
            secondary={
              <>
                Eligible <strong>{d.eligibleKst}K st</strong> · Total <strong>{d.totalKst}K st</strong> · Req/Total{' '}
                <strong>{d.reqTotalPct}%</strong>
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
                Vault Report <strong>{d.paperPhysicalRatio}:1</strong> → ~{d.impliedPaperKst.toLocaleString()}K st
                paper (CFTC OI {d.openInterestContracts.toLocaleString()} ≈ {d.openInterestKst.toLocaleString()}K st
                cross-check)
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
            secondary={<>{d.daysCoverBasis}</>}
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
                  <th>30d Stops</th>
                  <th>Sep 4 Stop</th>
                  <th>Delivery Month</th>
                  <th>Vault Flow</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {d.delivery.stops30dContracts.toLocaleString()} ({d.delivery.stops30dKst}K st, ~$
                    {d.delivery.stops30dValueB}B)
                  </td>
                  <td>
                    {d.delivery.sep4Contracts} ({d.delivery.sep4Kst}K st)
                  </td>
                  <td>{d.delivery.deliveryMonth}</td>
                  <td>{d.delivery.sep4VaultFlow}</td>
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
          <LineChartCard
            title="Historical Registered Copper"
            data={d.registeredHistory}
            yDomain={d.registeredYDomain}
            yUnit="K st"
            referenceLines={[
              { y: d.registeredAvg, label: 'Avg' },
              { y: d.registeredCritical, label: 'Low band', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#2563eb"
            tooltipLabel="Registered"
          />
          <LineChartCard
            title="Paper/Physical Coverage"
            data={d.coverageHistory}
            yDomain={d.coverageYDomain}
            yUnit="%"
            referenceLines={[
              { y: d.coverageAvg, label: 'Current' },
              { y: d.coverageTight, label: 'Tight', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#db2777"
            tooltipLabel="Coverage"
          />
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live CME feed. Figures as of 2026-09-04 from The Vault Report (CME COMEX warehouse
          reports). Units: short tons (st). HG = 12.5 st/contract. Coverage chart shows the current 7:1 / 14% print
          only — no interpolated history. Not investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            Copper
          </a>
          {' · '}
          <a href={d.sourceComex} target="_blank" rel="noreferrer">
            COMEX
          </a>
        </footer>
      </main>
    </div>
  )
}
