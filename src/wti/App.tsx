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

export default function WtiApp() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FlameIcon />
        <h1>WTI Cushing Early-Warning Dashboard</h1>
        <DashboardNav
          links={[
            { href: '../', label: 'Silver' },
            { href: '../natgas/', label: 'NatGas' },
            { href: '../gold/', label: 'Gold' },
            { href: '../copper/', label: 'Copper' },
            { href: './', label: 'WTI', active: true },
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
            title="Cushing Stocks"
            primary={
              <>
                Cushing <strong>{d.cushingMbbl} Mbbl</strong>{' '}
                <span className="delta-positive">(+{d.weeklyChangeMbbl} Mbbl)</span>
              </>
            }
            secondary={
              <>
                vs 5-yr avg <strong>{d.vsFiveYearPct}%</strong> ({d.fiveYearAvgMbbl} Mbbl); ~{d.capacityPct}% of{' '}
                {d.workingCapacityMbbl} Mbbl capacity
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
                NYMEX CL OI <strong>{d.openInterestContracts.toLocaleString()}</strong> contracts → ~
                {d.impliedPaperMbbl.toLocaleString()} Mbbl paper at {d.paperPhysicalRatio}:1
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
                  <th>Cushing WoW</th>
                  <th>US Commercial</th>
                  <th>Report Week</th>
                  <th>vs 5-Yr Avg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>+{d.flow.cushingWowMbbl} Mbbl</td>
                  <td>
                    {d.flow.usCommercialMbbl} Mbbl ({d.flow.usCommercialWowMbbl} WoW)
                  </td>
                  <td>{d.flow.reportWeek}</td>
                  <td>{d.flow.vsFiveYearPct}%</td>
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
            title="Cushing Commercial Crude (6 Weeks)"
            data={d.storageHistory}
            yDomain={d.storageYDomain}
            yUnit=" Mbbl"
            referenceLines={[
              { y: d.storageAvg, label: '5-yr avg' },
              { y: d.storageLowBand, label: 'Tank bottoms', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#2563eb"
            tooltipLabel="Cushing"
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
          Public snapshot, not a live EIA feed. Cushing figures as of week ending 2026-08-28 from EIA WPSR. OI from
          CFTC WTI-Physical (067651, 2026-09-01) — not WTI Financial (06765A). Days cover uses US commercial /
          refinery inputs (national). SPR is footnote only. Coverage chart shows the current 1.2% print only — no
          interpolated history. Not investment advice.{' '}
          <a href={d.sourceUrl} target="_blank" rel="noreferrer">
            EIA Cushing
          </a>
          {' · '}
          <a href={d.sourceVault} target="_blank" rel="noreferrer">
            Vault Report
          </a>
        </footer>
      </main>
    </div>
  )
}
