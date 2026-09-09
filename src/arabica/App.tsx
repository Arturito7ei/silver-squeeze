import { CardIcon, KpiCard, LineChartCard } from '../components/DashboardUi'
import { DashboardHeader } from '../components/DashboardHeader'
import { CurveCard } from '../curve/CurveCard'
import { dashboardNav } from '../nav/navLinks'
import { dashboardData as d } from './data'
import '../App.css'

const nav = dashboardNav('arabica')

export default function ArabicaApp() {
  return (
    <div className="dashboard">
      <DashboardHeader
        markSrc={nav.markSrc}
        subtitle="Arabica · ICE Coffee C"
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
            title="Certified Stocks"
            primary={
              <>
                Certified <strong>{d.certifiedBags.toLocaleString()} bags</strong>
              </>
            }
            secondary={<>ICE Coffee C · {d.certifiedLowLabel}</>}
            chip={d.chips.certs.text}
            chipVariant={d.chips.certs.variant}
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
                Paper/physical <strong>{d.paperPhysicalRatio}:1</strong> · CFTC OI{' '}
                <strong>{d.openInterestContracts.toLocaleString()}</strong> × {d.contractBags} bags/contract
              </>
            }
            chip={d.chips.coverage.text}
            chipVariant={d.chips.coverage.variant}
          />
          <KpiCard
            icon="clock"
            title="Physical Mechanism"
            primary={
              <>
                Contract <strong>{d.contractSizeLb.toLocaleString()} lb</strong> (~{d.contractBags} bags)
              </>
            }
            secondary={<>{d.daysCoverBasis}</>}
            chip={d.chips.physical.text}
            chipVariant={d.chips.physical.variant}
          />
        </section>

        <section className="row chart-row-full">
          <CurveCard tab="arabica" />
        </section>

        <section className="row detail-row">
          <article className="card delivery-card">
            <header className="section-header">
              <CardIcon variant="truck" />
              <h2>Flow & Contrast</h2>
            </header>
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Brazil Exports</th>
                  <th>World Crop</th>
                  <th>Pending Grading</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {d.delivery.brazilExportsT.toLocaleString()} t (+{d.delivery.brazilExportsYoyPct}% y/y, Aug)
                  </td>
                  <td>Rabobank surplus ~{(d.delivery.rabobankSurplusBags / 1_000_000).toFixed(1)}M bags</td>
                  <td>Footnote only — see disclaimer</td>
                </tr>
              </tbody>
            </table>
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
            title="ICE Certified Arabica (3 Points)"
            data={d.certHistory}
            yDomain={d.certYDomain}
            yUnit=" bags"
            referenceLines={[
              { y: d.certAvg, label: 'Mid' },
              { y: d.certLowBand, label: 'Low band', stroke: '#c0392b', strokeWidth: 2, labelFill: '#c0392b' },
            ]}
            stroke="#2563eb"
            tooltipLabel="Certified bags"
          />
          <LineChartCard
            title="Paper/Physical Coverage"
            data={d.coverageHistory}
            yDomain={d.coverageYDomain}
            yUnit="%"
            referenceLines={[{ y: d.coverageAvg, label: 'Current' }]}
            stroke="#db2777"
            tooltipLabel="Coverage"
          />
        </section>

        <footer className="disclaimer">
          Public snapshot, not a live ICE feed. Certified stocks as of 2026-09-08; CFTC Coffee C OI 155,275 (report
          2026-09-01). Cert chart = three cited points only — no interpolation. Coverage = one sourced point (0.50% on
          8 Sep certs / 1 Sep OI). {d.footnotes.pendingGrading}. {d.footnotes.geography}. {d.footnotes.oiVintage}.{' '}
          {d.footnotes.robusta}. Not investment advice.{' '}
          <a href={d.sourceCerts} target="_blank" rel="noreferrer">
            Vietnam.vn / ICE certs
          </a>
          {' · '}
          <a href={d.sourceOi} target="_blank" rel="noreferrer">
            COT-Trader hub
          </a>
          {' · '}
          <a href={d.sourceIce} target="_blank" rel="noreferrer">
            ICE Coffee C specs
          </a>
        </footer>
      </main>
    </div>
  )
}
