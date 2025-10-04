import React from 'react'
import StageBadge from './StageBadge'

type TP = {
  active?: boolean
  payload?: any[]
  label?: any
}

export default function ChartTooltip({ active, payload, label }: TP) {
  if (!active || !payload || payload.length === 0) return null

  // صف الداتا الحالي
  const row = payload[0]?.payload ?? {}

  // نلاقي الـ series حسب اسم الـ dataKey
  const A = payload.find(p => p?.dataKey === 'A')
  const B = payload.find(p => p?.dataKey === 'B')

  const stageA = row?.stageA
  const stageB = row?.stageB

  return (
    <div className="rounded-xl border bg-white/95 backdrop-blur px-3 py-2 shadow-lg text-sm dark:bg-neutral-900/95 dark:border-neutral-800">
      <div className="font-semibold">Week {label}</div>

      <div className="mt-1 space-y-1">
        {A && (
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: A.stroke }} />
            <span>Year A:</span>
            <span className="font-semibold">{A.value ?? '—'}</span>
            {stageA ? <StageBadge value={stageA} /> : null}
          </div>
        )}

        {B && (
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: B.stroke }} />
            <span>Year B:</span>
            <span className="font-semibold">{B.value ?? '—'}</span>
            {stageB ? <StageBadge value={stageB} /> : null}
          </div>
        )}
      </div>
    </div>
  )
}
