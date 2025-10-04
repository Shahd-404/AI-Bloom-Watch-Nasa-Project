// src/lib/useWeather.ts
export type WeatherNow = {
  temperatureC: number | null;
  humidityPct: number | null;
  precipitationMm: number | null;
  shortwaveWm2: number | null;
  dayLength: { hours: number; minutes: number } | null;
  location: { lat: number; lon: number; label: string };
  loading: boolean;
  error?: string;
};

const formatDayLength = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return { hours: h, minutes: m };
};

// افتراضي (لو اتمنعت الـ Geolocation)
const FALLBACK = { lat: 30.0444, lon: 31.2357, label: "Cairo, EG" };

export async function fetchWeather(lat: number, lon: number): Promise<WeatherNow> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "current",
    [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "shortwave_radiation"
    ].join(",")
  );
  url.searchParams.set("daily", ["daylight_duration", "sunrise", "sunset"].join(","));
  url.searchParams.set("timezone", "auto");

  const r = await fetch(url.toString());
  if (!r.ok) throw new Error("Weather API error");
  const data = await r.json();

  const daylightSec = Array.isArray(data?.daily?.daylight_duration)
    ? Number(data.daily.daylight_duration[0])
    : null;

  return {
    temperatureC: data?.current?.temperature_2m ?? null,
    humidityPct: data?.current?.relative_humidity_2m ?? null,
    precipitationMm: data?.current?.precipitation ?? null,
    shortwaveWm2: data?.current?.shortwave_radiation ?? null,
    dayLength: daylightSec != null ? formatDayLength(daylightSec) : null,
    location: { lat, lon, label: "Your Location" },
    loading: false,
  };
}

export function getPosition(): Promise<{lat:number; lon:number; label:string}> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(FALLBACK);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          label: "Your Location",
        });
      },
      () => resolve(FALLBACK),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}
