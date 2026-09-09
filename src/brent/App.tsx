import {
  CardIcon,
  Chip,
  DashboardNavGroup,
  FlameIcon,
  KpiCard,
  LineChartCard,
} from '../components/DashboardUi'
import { dashboardData as d } from './data'
import '../App.css'

export default function BrentApp() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <FlameIcon />
        <h1>Brent Early-Warning Dashboard</h1>
        <DashboardNavGroup
          links={[
            { href: '../', label: 'Silver' },
            { href: '../natgas/', label: 'NatGas' },
            { href: '../gold/', label: 'Gold' },
            { href: '../copper/', label: 'Copper' },
            { href: './', label: 'Oil', active: true },
          ]}
          oilSubnav={[
            { href: '../wti/', label: 'WTI' },
            { href: './', label: 'Brent', active: true },
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
            title="WTI–Brent Spread"
            primary={
              <>
                Spread <strong>${d.spreadUsd.toFixed(2)}/bbl</strong>
              </>
            }
            secondary={
              <>
                WTI <strong>${d.wtiUsd.toFixed(2)}</strong> / Brent <strong>${d.brentUsd.toFixed(2)}</strong> (
                2026-09-01)
              </>
            }
            chip={d.chips.spread.text}
            chipVariant={d.chips.spread.variant}
          />
          <KpiCard
            icon="zigzag"
            title="Paper (NYMEX LD)"
            primary={
              <>
                Open Interest <strong>{d.openInterestContracts.toLocaleString()}</strong> contracts
              </>
            }
            secondary={
              <>
                CFTC 06765T · {d.openInterestWow.toLocaleString()} WoW → ~{d.impliedPaperMbbl} Mbbl paper (1,000 bbl
                contract)
              </>
            }
            chip={d.chips.paper.text}
            chipVariant={d.chips.paper.variant}
          />
          <KpiCard
            icon="clock"
            title="Physical Mechanism"
            primary={
              <>
                Cargo size <strong>{d.cargoSizeKb} kb</strong>
              </>
            }
            secondary={<>{d.delivery.mechanism}</>}
            chip={d.chips.physical.text}
            chipVariant={d.chips.physical.variant}
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
                  <th>Mechanism</th>
                  <th>Index Basis</th>
                  <th>Tightness Proxy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{d.delivery.mechanism}</td>
                  <td>{d.delivery.indexBasis}</td>
                  <td>{d.delivery.tightnessProxy}</td>
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
            title="WTI–Brent Spread"
            data={d.spreadHistory}
            yDomain={d.spreadYDomain}
            yUnit=" $/bbl"
            referenceLines={[{ y: d.spreadZero, label: 'Parity' }]}
            stroke="#2563eb"
            tooltipLabel="Spread"
          />
          <LineChartCard
            title="NYMEX Brent Last Day OI"
            data={d.oiHistory}
            yDomain={d.oiYDomain}
            yUnit="k"
            referenceLines={[{ y: d.oiCurrent, label: 'Current' }]}
            stroke="#db2777"
            tooltipLabel="OI (000s)"
          />
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live ICE feed. Spread as of 2026-09-01 from Vault Report WTI–Brent page. OI from CFTC
          NYMEX Brent Last Day (06765T, 2026-09-01) — not ICE Brent futures. No warehouse series; no interpolated
          history. Not investment advice.{' '}
          <a href={d.sourceSpread} target="_blank" rel="noreferrer">
            Vault Report WTI–Brent
          </a>
          {' · '}
          <a href={d.sourceOi} target="_blank" rel="noreferrer">
            Tradingster 06765T
          </a>
          {' · '}
          <a href={d.sourceIce} target="_blank" rel="noreferrer">
            ICE Brent
          </a>
        </footer>
      </main>
    </div>
  )
}
