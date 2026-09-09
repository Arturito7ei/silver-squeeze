import { CardIcon, Chip, KpiCard, LineChartCard } from '../components/DashboardUi'
import { DashboardHeader } from '../components/DashboardHeader'
import { CurveCard } from '../curve/CurveCard'
import { dashboardNav } from '../nav/navLinks'
import { dashboardData as d } from './data'
import '../App.css'

const nav = dashboardNav('platinum')

export default function PlatinumApp() {
  const deltaClass = d.registeredDelta30dPct >= 0 ? 'delta-positive' : 'delta-negative'
  const deltaSign = d.registeredDelta30dPct > 0 ? '+' : ''

  return (
    <div className="dashboard">
      <DashboardHeader
        markSrc={nav.markSrc}
        subtitle="Platinum · NYMEX registered"
        links={nav.links}
        subnav={nav.subnav}
        subnavLabel={nav.subnavLabel}
      />

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
                Registered <strong>{d.registeredKoz} Koz</strong>{' '}
                <span className={deltaClass}>
                  ({deltaSign}
                  {d.registeredDelta30dPct}% 30d)
                </span>
              </>
            }
            secondary={
              <>
                Eligible <strong>{d.eligibleKoz} Koz</strong> · Total <strong>{d.totalKoz} Koz</strong> · Req/Total{' '}
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
                Vault Report <strong>{d.paperPhysicalRatio}:1</strong> → ~{d.impliedPaperMoz} Moz paper (CFTC OI{' '}
                {d.openInterestContracts.toLocaleString()} ≈ {d.openInterestMoz} Moz cross-check)
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

        <section className="row chart-row-full">
          <CurveCard tab="platinum" />
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
                    {d.delivery.stops30dContracts.toLocaleString()} ({d.delivery.stops30dKoz} Koz, ~$
                    {d.delivery.stops30dValueM}M)
                  </td>
                  <td>
                    {d.delivery.sep4Contracts} ({d.delivery.sep4Oz} oz)
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
            title="Historical Registered Platinum"
            data={d.registeredHistory}
            yDomain={d.registeredYDomain}
            yUnit=" Koz"
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
          Public snapshot, not a live CME feed. Figures as of 2026-09-04 from The Vault Report (CME COMEX/NYMEX
          warehouse reports). Registered chart = two cited points only (Aug 20 → Sep 4) — no interpolation. Coverage
          chart shows the current 18:1 / 5.6% print only. Vault spot gold/platinum {d.goldPlatinumSpotFootnote} — footnote
          only, no IMF history chart this release. Not investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            Platinum
          </a>
          {' · '}
          <a href={d.sourceComex} target="_blank" rel="noreferrer">
            COMEX
          </a>
          {' · '}
          <a href={d.sourceCot} target="_blank" rel="noreferrer">
            CFTC OI
          </a>
        </footer>
      </main>
    </div>
  )
}
