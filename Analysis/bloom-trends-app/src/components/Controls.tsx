import React from 'react'

type Props = {
  allYears: number[]
  yearA: number
  yearB: number
  setYearA: (y:number)=>void
  setYearB: (y:number)=>void
  metric: string
  setMetric: (m:string)=>void
}

const METRICS = [
  ['T2M', 'Avg Temp (°C)'],
  ['T2M_MAX', 'Max Temp (°C)'],
  ['T2M_MIN', 'Min Temp (°C)'],
  ['RH2M', 'Humidity (%)'],
  ['PRECTOTCORR', 'Rainfall (mm/day)'],
  ['VPD', 'VPD (kPa)'],
  ['ET0', 'ET₀ (mm/day)'],
  ['ALLSKY_SFC_SW_DWN', 'Solar Radiation (MJ/m²/day)'],
]

export default function Controls(props: Props){
  const { allYears, yearA, yearB, setYearA, setYearB, metric, setMetric } = props
  return (
    <div className="card p-4 md:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-lg font-semibold">Analysis Controls</div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <label className="subtle">Year A</label>
          <select value={yearA} onChange={e=>setYearA(parseInt(e.target.value))}
                  className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900">
            {allYears.map(y=> <option key={y} value={y}>{y}</option>)}
          </select>

          <label className="subtle">Year B</label>
          <select value={yearB} onChange={e=>setYearB(parseInt(e.target.value))}
                  className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900">
            {allYears.map(y=> <option key={y} value={y}>{y}</option>)}
          </select>

          <label className="subtle">Metric</label>
          <select value={metric} onChange={e=>setMetric(e.target.value)}
                  className="px-3 py-2 rounded-xl border bg-white dark:bg-neutral-900">
            {METRICS.map(([k, label])=> <option key={k} value={k}>{label}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}
