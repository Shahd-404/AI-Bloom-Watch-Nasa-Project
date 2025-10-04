import type { BloomRow } from '../types'

export const STAGE_ORDER: Record<string, number> = {
  NoBloom: 0,
  SoB: 1,
  MoB: 2,
  PoB: 3,
  LPoB: 4,
  EoB: 5,
  Super: 6,   // allow a 'Super Bloom' stage if present
  super: 6
}

export const STAGE_LABELS: Record<string, string> = {
  NoBloom: 'No Bloom',
  SoB: 'Start of Bloom',
  MoB: 'Mid Bloom',
  PoB: 'Peak of Bloom',
  LPoB: 'Late Peak of Bloom',
  EoB: 'End of Bloom',
  Super: 'Super Bloom',
  super: 'Super Bloom'
}

export async function loadBloomData(url = '/bloom_data.json'): Promise<BloomRow[]> {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to load bloom_data.json')
  const data = await res.json()
  // Some inputs could be strings; coerce Year/week
  return (data as BloomRow[]).map(r => ({
    ...r,
    Year: typeof r.Year === 'string' ? parseInt(r.Year) : r.Year,
    week: typeof r.week === 'string' ? parseInt(r.week) : r.week,
  }))
}

export function years(rows: BloomRow[]): number[] {
  return Array.from(new Set(rows.map(r => r.Year))).sort((a,b)=>a-b)
}

export function byYear(rows: BloomRow[], year: number): BloomRow[] {
  return rows.filter(r => r.Year === year).sort((a,b)=>a.week - b.week)
}

export function mergeByWeekMetric(a: BloomRow[], b: BloomRow[], metric: keyof BloomRow) {
  const map = new Map<number, any>()
  for (const r of a) {
    const w = r.week
    const o = map.get(w) ?? { week: w }
    o['A'] = (r as any)[metric] ?? null
    o['stageA'] = r.bloom_stage
    map.set(w, o)
  }
  for (const r of b) {
    const w = r.week
    const o = map.get(w) ?? { week: w }
    o['B'] = (r as any)[metric] ?? null
    o['stageB'] = r.bloom_stage
    map.set(w, o)
  }
  return Array.from(map.values()).sort((x:any,y:any)=>x.week - y.week)
}
