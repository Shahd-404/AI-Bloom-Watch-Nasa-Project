import React from 'react'

const map: Record<string, string> = {
  NoBloom: 'bg-gray-100 text-gray-700',
  SoB: 'bg-emerald-100 text-emerald-700',
  MoB: 'bg-blue-100 text-blue-700',
  PoB: 'bg-fuchsia-100 text-fuchsia-700',
  LPoB: 'bg-indigo-100 text-indigo-700',
  EoB: 'bg-amber-100 text-amber-800',
  Super: 'bg-rose-100 text-rose-700',
  super: 'bg-rose-100 text-rose-700',
}

export default function StageBadge({ value }: { value: string }) {
  const cls = map[value] ?? 'bg-gray-100 text-gray-700'
  return <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cls}`}>{value}</span>
}
