import {
  CardIcon,
  Chip,
  CompassIcon,
  KpiCard,
  LineChartCard,
} from './components/DashboardUi'
import { DashboardHeader } from './components/DashboardHeader'
import { CurveCard } from './curve/CurveCard'
import { dashboardData as d } from './data/mockData'
import { GoldSilverRatioCard } from './metals/GoldSilverRatioCard'
import { goldSilverSources, goldSilverSpotFootnote } from './metals/goldSilverRatio'
import { dashboardNav } from './nav/navLinks'
import './App.css'

const nav = dashboardNav('silver')

export default function App() {
  return (
    <div className="dashboard">
      <DashboardHeader
        icon={<CompassIcon />}
        subtitle="Silver · COMEX registered"
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
            secondary={<>{d.daysCoverBasis}</>}
            chip={d.chips.cover.text}
            chipVariant={d.chips.cover.variant}
          />
        </section>

        <section className="row chart-row-full">
          <CurveCard tab="silver" />
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
          <LineChartCard
            title="Historical Registered Silver"
            data={d.registeredHistory}
            yDomain={d.registeredYDomain}
            yUnit=" Moz"
            referenceLines={[
              { y: d.registeredAvg, label: 'Avg' },
              { y: d.registeredCritical, label: 'Critical', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#2563eb"
            tooltipLabel="Registered"
          />
          <LineChartCard
            title="Coverage Ratio Trend"
            data={d.coverageHistory}
            yDomain={d.coverageYDomain}
            yUnit="%"
            referenceLines={[
              { y: d.coverageAvg, label: 'Avg' },
              { y: d.coverageSqueeze, label: 'Squeeze', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#db2777"
            tooltipLabel="Coverage"
          />
        </section>

        <section className="row chart-row-full">
          <GoldSilverRatioCard />
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live CME feed. Figures as of 2026-09-04 from The Vault Report
          (CME COMEX warehouse reports). Coverage history is the current 5:1 paper/physical print
          only — no public daily coverage series was cited. Gold/silver ratio from IMF monthly averages
          (PGOLD ÷ PSILVER, 2024-09→2026-08); Vault spot {goldSilverSpotFootnote} is a footnote only — not
          mixed onto the IMF line. Not investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            Source
          </a>
          {' · '}
          <a href={goldSilverSources.imf} target="_blank" rel="noreferrer">
            IMF commodity prices
          </a>
          {' · '}
          <a href={goldSilverSources.vaultSpot} target="_blank" rel="noreferrer">
            Vault gold/silver
          </a>
        </footer>
      </main>
    </div>
  )
}
