export type PredictResponse = {
  region: string;
  date: string;
  season: { in_season: boolean; month: number; week: number; doy: number };
  bloom_flag: number;
  bloom_prob: number;
  bloom_stage: string;
  stage_prob: number;
  top5: { feature: string; importance: number }[];
  features_used: Record<string, number>;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export async function fetchPrediction(lat:number, lon:number, region:string) {
  const r = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type":"application/json" },
    body: JSON.stringify({ lat, lon, region, prob_threshold: 0.5 })
  });
  if (!r.ok) throw new Error("Prediction API error");
  return r.json() as Promise<PredictResponse>;
}
