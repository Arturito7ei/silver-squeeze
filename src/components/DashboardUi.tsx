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

export type ChipVariant = 'critical' | 'high' | 'warning' | 'neutral' | 'ok'
export type CardIconVariant = 'bar' | 'cube' | 'zigzag' | 'clock' | 'truck' | 'bell' | 'flame'

export function Chip({
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

export function CardIcon({ variant }: { variant: CardIconVariant }) {
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
    flame: (
      <path
        d="M12 22c4-2.5 6-6 6-10.5C18 6.5 14.5 4 12 2S6 6.5 6 11.5C6 16 8 19.5 12 22Z"
        fill="none"
        stroke="#f97316"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    ),
  }

  return (
    <svg className={`card-icon card-icon-${variant}`} viewBox="0 0 24 24" aria-hidden="true">
      {icons[variant]}
    </svg>
  )
}

export function KpiCard({
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

export function HeaderIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      className="compass-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

export function CompassIcon() {
  return (
    <HeaderIcon>
      <circle cx="12" cy="12" r="9" />
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="5.6" y1="5.6" x2="18.4" y2="18.4" />
      <line x1="18.4" y1="5.6" x2="5.6" y2="18.4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </HeaderIcon>
  )
}

export function FlameIcon() {
  return (
    <HeaderIcon>
      <path
        d="M12 22c4-2.5 6-6 6-10.5C18 6.5 14.5 4 12 2S6 6.5 6 11.5C6 16 8 19.5 12 22Z"
        strokeLinejoin="round"
      />
    </HeaderIcon>
  )
}

export function DashboardNav({ links }: { links: { href: string; label: string; active?: boolean }[] }) {
  return (
    <nav className="dashboard-nav" aria-label="Dashboards">
      {links.map((link) => (
        <a key={link.href} href={link.href} className={link.active ? 'nav-link active' : 'nav-link'}>
          {link.label}
        </a>
      ))}
    </nav>
  )
}

export function monthTickFormatter(value: string, index: number, ticks: readonly { value: string }[]) {
  if (index === 0) return value
  if (value === ticks[index - 1]?.value) return ''
  return value
}

export function LineChartCard({
  title,
  data,
  dataKey,
  yDomain,
  yUnit,
  referenceLines,
  stroke,
  tooltipLabel,
}: {
  title: string
  data: { month: string; value: number }[]
  dataKey?: string
  yDomain: [number, number]
  yUnit: string
  referenceLines: { y: number; stroke?: string; strokeWidth?: number; label: string; labelFill?: string }[]
  stroke: string
  tooltipLabel: string
}) {
  const key = dataKey ?? 'value'
  return (
    <article className="card chart-card">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            stroke="#888"
            tickFormatter={(value, index) => monthTickFormatter(value, index, data.map((p) => ({ value: p.month })))}
          />
          <YAxis domain={yDomain} tick={{ fontSize: 12 }} stroke="#888" unit={yUnit} />
          <Tooltip formatter={(v) => [`${v ?? ''}${yUnit.trim()}`, tooltipLabel]} />
          {referenceLines.map((line) => (
            <ReferenceLine
              key={line.label}
              y={line.y}
              stroke={line.stroke ?? '#888'}
              strokeWidth={line.strokeWidth}
              strokeDasharray={line.strokeWidth ? undefined : '6 4'}
              label={{
                value: line.label,
                position: line.strokeWidth ? 'insideBottomRight' : 'insideTopRight',
                fill: line.labelFill ?? '#666',
                fontSize: 11,
              }}
            />
          ))}
          <Line
            type="linear"
            dataKey={key}
            stroke={stroke}
            strokeWidth={2.5}
            dot={{ r: 3, fill: stroke }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </article>
  )
}
