import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import YearCompare from './components/YearCompare'
// import StageTimeline from './components/StageTimeline' // not needed now
import EarthPanel from './components/EarthPanel'
import { loadBloomData, years, byYear } from './lib/data'
import type { BloomRow } from './types'

export default function App() {
  const [rows, setRows] = useState<BloomRow[] | null>(null)
  const [metric, setMetric] = useState<string>('T2M')
  const [error, setError] = useState<string | null>(null)
  const [yearA, setYearA] = useState<number | null>(null)
  const [yearB, setYearB] = useState<number | null>(null)

  useEffect(() => {
    loadBloomData().then(setRows).catch(e => setError(String(e)))
  }, [])

  const allYears = useMemo(() => (rows ? years(rows) : []), [rows])

  useEffect(() => {
    if (allYears.length > 0 && (yearA == null || yearB == null)) {
      const first = allYears[0]
      const last = allYears[allYears.length - 1]
      if (first !== undefined && last !== undefined) {
        setYearA(first)
        setYearB(last)
      }
    }
  }, [allYears, yearA, yearB])

  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!rows || yearA == null || yearB == null) return <div className="p-6">Loading...</div>

  const yearAData = byYear(rows, yearA)
  const yearBData = byYear(rows, yearB)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50/40 dark:from-neutral-950 dark:to-neutral-900">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Header />
        <Controls
          allYears={allYears}
          yearA={yearA}
          yearB={yearB}
          setYearA={setYearA}
          setYearB={setYearB}
          metric={metric}
          setMetric={setMetric}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <YearCompare
            yearAData={yearAData}
            yearBData={yearBData}
            metric={metric as keyof BloomRow}
            yearA={yearA}
            yearB={yearB}
          />

          {/* Right column: Earth image panel */}
          <EarthPanel />
          {/* If you ever want the timeline back, swap this with <StageTimeline ... /> */}
        </div>

        {/* Footer removed as requested */}
      </div>
    </div>
  )
}
