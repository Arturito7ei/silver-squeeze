import { CardIcon, Chip, type ChipVariant } from '../components/DashboardUi'
import { curveSnapshots, type CurveTab } from './snapshots'

function chipVariant(kind: (typeof curveSnapshots)[CurveTab]['kind']): ChipVariant {
  switch (kind) {
    case 'backwardation':
      return 'warning'
    case 'contango':
      return 'ok'
    case 'not_in_snapshot':
      return 'neutral'
  }
}

export function CurveCard({ tab }: { tab: CurveTab }) {
  const snap = curveSnapshots[tab]
  return (
    <article className="card curve-card">
      <header className="section-header">
        <CardIcon variant="zigzag" />
        <h2>Futures Curve (Nearby vs Next)</h2>
      </header>
      <div className="curve-body">
        <p className="curve-print">{snap.print}</p>
        {'body' in snap && snap.body && <p className="curve-note">{snap.body}</p>}
        <p className="curve-asof">As of {snap.asOf}</p>
      </div>
      <footer className="card-footer">
        <Chip variant={chipVariant(snap.kind)}>{snap.label}</Chip>
        <span className="curve-cite">
          Source:{' '}
          <a href={snap.citeUrl} target="_blank" rel="noreferrer">
            {snap.citeLabel}
          </a>
        </span>
      </footer>
    </article>
  )
}
