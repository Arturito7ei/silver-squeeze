import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { LatestDataFile, LatestMeta, LatestSeries, TabKey } from './latestSchema'

export type LatestDataState<T> = {
  data: T
  meta: LatestMeta | null
  series: LatestSeries
  refresh: () => Promise<void>
  refreshing: boolean
  error: string | null
}

const LatestDataContext = createContext<LatestDataState<unknown> | null>(null)

async function fetchLatest(): Promise<LatestDataFile> {
  const res = await fetch(`./data/latest.json?t=${Date.now()}`)
  if (!res.ok) throw new Error(`latest.json ${res.status}`)
  return res.json() as Promise<LatestDataFile>
}

function mergeTab<T extends Record<string, unknown>>(seed: T, patch?: Record<string, unknown>): T {
  if (!patch) return seed
  return { ...seed, ...patch } as T
}

export function useLatestTab<T extends Record<string, unknown>>(tab: TabKey, seed: T): LatestDataState<T> {
  const [data, setData] = useState<T>(seed)
  const [meta, setMeta] = useState<LatestMeta | null>(null)
  const [series, setSeries] = useState<LatestSeries>({})
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setRefreshing(true)
    setError(null)
    try {
      const latest = await fetchLatest()
      setMeta({
        pulledAt: latest.pulledAt,
        asOf: latest.asOf,
        sources: latest.sources,
        stale: latest.stale,
      })
      setData(mergeTab(seed, latest.tabs[tab] as Record<string, unknown> | undefined))
      setSeries(latest.series ?? {})
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Refresh failed')
    } finally {
      setRefreshing(false)
    }
  }, [tab, seed])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return useMemo(
    () => ({ data, meta, series, refresh, refreshing, error }),
    [data, meta, series, refresh, refreshing, error],
  )
}

export function LatestDataProvider<T extends Record<string, unknown>>({
  tab,
  seed,
  children,
}: {
  tab: TabKey
  seed: T
  children: (state: LatestDataState<T>) => ReactNode
}) {
  const state = useLatestTab(tab, seed)
  return (
    <LatestDataContext.Provider value={state as LatestDataState<unknown>}>
      {children(state)}
    </LatestDataContext.Provider>
  )
}

export function useLatestSeriesContext(): LatestSeries {
  const ctx = useContext(LatestDataContext)
  return ctx?.series ?? {}
}
