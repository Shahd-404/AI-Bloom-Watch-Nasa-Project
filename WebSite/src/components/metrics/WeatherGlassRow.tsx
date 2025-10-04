// src/components/metrics/WeatherGlassRow.tsx
import React, { useEffect, useState } from "react";
import { Thermometer, Droplets, CloudRain, Sun, Clock } from "lucide-react";
import { fetchWeather, getPosition, WeatherNow } from "../../lib/useWeather";

type CardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
};

const GlassCard = ({ icon, label, value, sub }: CardProps) => (
  <div className="flex flex-col items-center gap-1 min-w-[160px] px-5 py-4
                  rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/15
                  text-white shadow-[0_8px_30px_rgba(0,0,0,.25)]">
    <div className="opacity-90">{icon}</div>
    <div className="text-sm opacity-90">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
    {sub && <div className="text-xs opacity-80">{sub}</div>}
  </div>
);

export default function WeatherGlassRow() {
  const [w, setW] = useState<WeatherNow>({
    temperatureC: null,
    humidityPct: null,
    precipitationMm: null,
    shortwaveWm2: null,
    dayLength: null,
    location: { lat: 0, lon: 0, label: "…" },
    loading: true,
  });
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const pos = await getPosition();
        const data = await fetchWeather(pos.lat, pos.lon);
        setW(data);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load weather");
        setW((prev) => ({ ...prev, loading: false }));
      }
    })();
  }, []);

  if (error) {
    return (
      <div className="text-white/90 bg-black/40 rounded-xl px-4 py-2">
        {error}
      </div>
    );
  }

  const loading = w.loading;

  const temp = loading || w.temperatureC == null ? "—" : `${Math.round(w.temperatureC)} °C`;
  const hum  = loading || w.humidityPct == null ? "—" : `${Math.round(w.humidityPct)}%`;
  const rain = loading || w.precipitationMm == null ? "—" : `${w.precipitationMm} mm`;
  const sw   = loading || w.shortwaveWm2 == null ? "—" : `${Math.round(w.shortwaveWm2)} W/m²`;
  const dayl = loading || !w.dayLength ? "—" : `${w.dayLength.hours}h ${w.dayLength.minutes}m`;

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <GlassCard icon={<Thermometer size={22} />} label="Temperature" value={temp} sub="Now" />
      <GlassCard icon={<Droplets size={22} />}    label="Humidity"    value={hum}  sub="Relative" />
      <GlassCard icon={<CloudRain size={22} />}   label="Rain"        value={rain} sub="Current" />
      <GlassCard icon={<Sun size={22} />}         label="Solar Radiation" value={sw} sub="Shortwave" />
      <GlassCard icon={<Clock size={22} />}       label="Day Length"  value={dayl} sub="Today" />
    </div>
  );
}
