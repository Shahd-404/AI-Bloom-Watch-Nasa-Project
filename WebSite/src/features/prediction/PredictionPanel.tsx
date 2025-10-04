import React, { useEffect, useState } from "react";
import { fetchPrediction, PredictResponse } from "../../lib/api";
import WeatherGlassRow from "../../components/metrics/WeatherGlassRow";
import { RefreshCw } from "lucide-react";

export default function PredictionPanel() {
  const [data, setData] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setErr(null);
      const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) return reject(new Error("No geolocation"));
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 8000 });
      }).catch(() => null as any);

      const lat = pos?.coords.latitude ?? 30.0444;
      const lon = pos?.coords.longitude ?? 31.2357;

      const p = await fetchPrediction(lat, lon, "usa_11");
      setData(p);
    } catch (e: any) {
      setErr(e.message ?? "Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      {/* Row: الطقس المباشر من WeatherGlassRow (زي ما عملناه قبل كده) */}
      <div className="absolute left-0 right-0 bottom-40 flex justify-center px-4">
        <WeatherGlassRow />
      </div>

      {/* Cards: نتائج الموديل + أهم 5 مميزات */}
      <div className="absolute left-0 right-0 bottom-6 flex justify-center px-4">
        <div className="w-full max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloom Forecast */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 text-white p-5">
            <div className="text-lg font-semibold mb-3">Bloom Stage Forecast</div>
            {data ? (
              <>
                <div className="mb-3">
                  <div className="text-sm opacity-90">
                    Stage: <span className="font-semibold">{data.bloom_stage}</span>
                    <span className="ml-2 opacity-80">({Math.round(data.stage_prob*100)}%)</span>
                  </div>
                  <div className="text-sm opacity-90">
                    Bloom: <span className="font-semibold">{data.bloom_flag ? "Yes" : "No"}</span>
                    <span className="ml-2 opacity-80">({Math.round(data.bloom_prob*100)}%)</span>
                  </div>
                  <div className="text-sm opacity-90 mt-1">
                    Season: {data.season.in_season ? "In-season (Mar–May)" : "Off-season"} · Week {data.season.week}
                  </div>
                </div>

                <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${data.bloom_flag ? "bg-lime-400/80" : "bg-neutral-400/70"}`}
                    style={{ width: `${Math.max(10, Math.round(data.bloom_prob*100))}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="text-sm opacity-80">{loading ? "Loading..." : err || "No data"}</div>
            )}
          </div>

          {/* Top 5 Features */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15 text-white p-5">
            <div className="text-lg font-semibold mb-3">Top 5 Drivers</div>
            {data ? (
              <ul className="space-y-2">
                {data.top5.map((t, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 text-white/80">{i+1}.</span>
                    <span className="flex-1">{t.feature}</span>
                    <div className="w-40 h-2 bg-white/15 rounded">
                      <div className="h-full bg-white/70 rounded" style={{ width: `${100 * t.importance / (data.top5[0].importance || 1)}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-sm opacity-80">{loading ? "Loading..." : err || "No data"}</div>
            )}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <button
        onClick={load}
        className="absolute left-6 bottom-6 inline-flex items-center gap-2 rounded-xl px-4 py-2
                   bg-white/10 hover:bg-white/15 backdrop-blur-md ring-1 ring-white/15 text-white"
      >
        <RefreshCw className={loading ? "animate-spin" : ""} size={18} />
        Refresh
      </button>
    </>
  );
}
