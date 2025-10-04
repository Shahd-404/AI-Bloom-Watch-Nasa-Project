import React from 'react'
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend, ReferenceDot
} from 'recharts'
import { mergeByWeekMetric } from '../lib/data'
import type { BloomRow } from '../types'
import { STAGE_ORDER } from '../lib/data'
import ChartTooltip from './ChartTooltip'

type Props = {
  yearAData: BloomRow[]
  yearBData: BloomRow[]
  metric: keyof BloomRow
  yearA: number
  yearB: number
}

const COLORS = { A: '#2563eb', B: '#f97316' } // blue-600, orange-500

export default function YearCompare({ yearAData, yearBData, metric, yearA, yearB }: Props) {
  const data = mergeByWeekMetric(yearAData, yearBData, metric)

  function markers(rows: BloomRow[]) {
    const start = rows.find(r => r.bloom_stage && r.bloom_stage !== 'NoBloom')
    const peakIdx = rows.reduce((best, r, idx) => {
      const score = STAGE_ORDER[r.bloom_stage] ?? 0
      return score > best.score ? { idx, score } : best
    }, { idx: -1, score: -1 }).idx
    const end = [...rows].reverse().find(r => r.bloom_stage && r.bloom_stage !== 'NoBloom')
    return { start, peak: peakIdx >= 0 ? rows[peakIdx] : undefined, end }
  }
  const mA = markers(yearAData)
  const mB = markers(yearBData)

  return (
    <div className="card p-4 md:p-5">
      <div className="text-sm subtle mb-1">{String(metric)} comparison</div>
      <div className="text-lg font-semibold mb-3">{yearA} vs {yearB}</div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
            <Line
              dot={false}
              strokeWidth={2.8}
              type="monotone"
              dataKey="A"
              name={`${String(metric)} • Year A (${yearA})`}
              stroke={COLORS.A}
            />
            <Line
              dot={false}
              strokeWidth={2.8}
              type="monotone"
              dataKey="B"
              name={`${String(metric)} • Year B (${yearB})`}
              stroke={COLORS.B}
            />

            {mA.start && <ReferenceDot x={mA.start.week} y={data.find(d => d.week === mA.start!.week)?.A} r={5} fill={COLORS.A} stroke="white" label="Start A" />}
            {mA.peak  && <ReferenceDot x={mA.peak.week}  y={data.find(d => d.week === mA.peak!.week)?.A}  r={5} fill={COLORS.A} stroke="white" label="Peak A" />}
            {mA.end   && <ReferenceDot x={mA.end.week}   y={data.find(d => d.week === mA.end!.week)?.A}   r={5} fill={COLORS.A} stroke="white" label="End A" />}

            {mB.start && <ReferenceDot x={mB.start.week} y={data.find(d => d.week === mB.start!.week)?.B} r={5} fill={COLORS.B} stroke="white" label="Start B" />}
            {mB.peak  && <ReferenceDot x={mB.peak.week}  y={data.find(d => d.week === mB.peak!.week)?.B}  r={5} fill={COLORS.B} stroke="white" label="Peak B" />}
            {mB.end   && <ReferenceDot x={mB.end.week}   y={data.find(d => d.week === mB.end!.week)?.B}   r={5} fill={COLORS.B} stroke="white" label="End B" />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
