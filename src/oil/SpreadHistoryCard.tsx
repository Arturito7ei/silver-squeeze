import { useState } from 'react'
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
import { monthTickFormatter } from '../components/DashboardUi'
import {
  spreadDaily,
  spreadDailyYDomain,
  spreadMonthly,
  spreadMonthlyYDomain,
} from './wtiBrentSpread'

type Timeframe = 'monthly' | 'daily'

function spreadTickFormatter(value: string, index: number, ticks: readonly { value: string }[], daily: boolean) {
  if (!daily) return monthTickFormatter(value, index, ticks)
  if (index === 0 || index === ticks.length - 1) return value
  if (index % 7 !== 0) return ''
  return value
}

function formatSpread(v: number) {
  const sign = v < 0 ? '−' : ''
  return `${sign}$${Math.abs(v).toFixed(2)}/bbl`
}

export function SpreadHistoryCard() {
  const [timeframe, setTimeframe] = useState<Timeframe>('monthly')
  const daily = timeframe === 'daily'
  const data = daily ? spreadDaily : spreadMonthly
  const yDomain = daily ? spreadDailyYDomain : spreadMonthlyYDomain
  const ticks = data.map((p) => ({ value: p.month }))

  return (
    <article className="card chart-card spread-history-card">
      <header className="spread-chart-header">
        <h2>WTI–Brent Spread</h2>
        <nav className="spread-timeframe-toggle" aria-label="Spread timeframe">
          <button
            type="button"
            className={timeframe === 'monthly' ? 'spread-toggle active' : 'spread-toggle'}
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={timeframe === 'daily' ? 'spread-toggle active' : 'spread-toggle'}
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </button>
        </nav>
      </header>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            stroke="#888"
            tickFormatter={(value, index) => spreadTickFormatter(value, index, ticks, daily)}
          />
          <YAxis domain={yDomain} tick={{ fontSize: 12 }} stroke="#888" unit=" $/bbl" />
          <Tooltip formatter={(v) => [formatSpread(Number(v)), 'Spread']} />
          <ReferenceLine
            y={0}
            stroke="#888"
            strokeDasharray="6 4"
            label={{ value: 'Parity', position: 'insideTopRight', fill: '#666', fontSize: 11 }}
          />
          <Line
            type="linear"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            dot={{ r: daily ? 2 : 3, fill: '#2563eb' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </article>
  )
}
