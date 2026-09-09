import {
  CardIcon,
  Chip,
  DashboardNav,
  FlameIcon,
  KpiCard,
  LineChartCard,
} from '../components/DashboardUi'
import { dashboardData as d } from './data'
import '../App.css'

export default function NatGasApp() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FlameIcon />
        <h1>NatGas Storage Early-Warning Dashboard</h1>
        <DashboardNav
          links={[
            { href: '../', label: 'Silver' },
            { href: './', label: 'NatGas', active: true },
            { href: '../gold/', label: 'Gold' },
            { href: '../copper/', label: 'Copper' },
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
            title="L48 Working Gas"
            primary={
              <>
                Storage <strong>{d.workingGasBcf.toLocaleString()} Bcf</strong>{' '}
                <span className="delta-positive">(+{d.weeklyChangeBcf} Bcf)</span>
              </>
            }
            secondary={
              <>
                vs 5-yr avg <strong>+{d.vsFiveYearPct}%</strong> ({d.fiveYearAvgBcf.toLocaleString()} Bcf); vs
                year-ago <strong>{d.vsYearAgoPct}%</strong>
              </>
            }
            chip={d.chips.storage.text}
            chipVariant={d.chips.storage.variant}
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
                NYMEX OI <strong>{d.openInterestContracts.toLocaleString()}</strong> contracts → ~
                {d.impliedPaperBcf.toLocaleString()} Bcf paper at {d.paperPhysicalRatio}:1
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
              <h2>Weekly Flow Activity</h2>
            </header>
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Net Injection</th>
                  <th>Regional Leader</th>
                  <th>Report Week</th>
                  <th>vs 5-Yr Avg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>+{d.flow.netBcf} Bcf</td>
                  <td>{d.flow.regionalLeader}</td>
                  <td>{d.flow.reportWeek}</td>
                  <td>+{d.flow.vsFiveYearPct}%</td>
                </tr>
              </tbody>
            </table>
            <footer className="card-footer">
              <Chip variant={d.chips.flow.variant}>{d.chips.flow.text}</Chip>
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
            title="L48 Working Gas (6 Weeks)"
            data={d.storageHistory}
            yDomain={d.storageYDomain}
            yUnit=" Bcf"
            referenceLines={[
              { y: d.storageAvg, label: '5-yr avg' },
              { y: d.storageLowBand, label: 'Low band', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#2563eb"
            tooltipLabel="Working gas"
          />
          <LineChartCard
            title="Paper/Physical Coverage Trend"
            data={d.coverageHistory}
            yDomain={d.coverageYDomain}
            yUnit="%"
            referenceLines={[
              { y: d.coverageAvg, label: 'Avg' },
              { y: d.coverageTight, label: 'Tight', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#db2777"
            tooltipLabel="Coverage"
          />
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live EIA feed. Figures as of week ending 2026-08-28 from EIA Weekly Natural Gas
          Storage Report. OI from CFTC COT (2026-08-25). Days cover uses ~90 Bcf/d STEO consumption divisor. Not
          investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            EIA WNGSR
          </a>
          {' · '}
          <a href={d.sourceJson} target="_blank" rel="noreferrer">
            JSON
          </a>
        </footer>
      </main>
    </div>
  )
}
