export type BloomRow = {
  region: string
  Year: number
  week: number
  date: string // YYYY-MM-DD
  bloom_stage: string
  T2M?: number
  T2M_MAX?: number
  T2M_MIN?: number
  PRECTOTCORR?: number
  RH2M?: number
  VPD?: number
  ET0?: number
  QV2M?: number
  ALLSKY_SFC_SW_DWN?: number
  PS?: number
  [k: string]: any
}
