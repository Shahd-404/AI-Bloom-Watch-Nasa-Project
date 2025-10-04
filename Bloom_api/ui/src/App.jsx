import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

/* ========= Config ========= */
const API_BASE = "http://127.0.0.1:8080";
const API_URL  = `${API_BASE}/predict_live?region=California&debug=true`;
// Fresno, CA center (season rule is California Mar–May)
const DEFAULT_CENTER = [36.77, -119.42];

/* ========= Helpers ========= */
function toFixedMaybe(x, n = 0) {
  if (x == null || Number.isNaN(+x)) return "-";
  return (+x).toFixed(n);
}
const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};
function timeoutFetch(url, ms = 15000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort("timeout"), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(t));
}
function dayLengthHours(latDeg, dateIso) {
  try {
    if (!dateIso) return null;
    const d = new Date(dateIso + "T12:00:00Z");
    const start = new Date(Date.UTC(d.getUTCFullYear(), 0, 0));
    const N = Math.floor((d - start) / 86400000);
    const rad = Math.PI/180, phi = latDeg*rad;
    const delta = 23.44*rad*Math.sin((2*Math.PI*(284+N))/365);
    const cosH = -Math.tan(phi)*Math.tan(delta);
    const H = Math.acos(Math.max(-1, Math.min(1, cosH)));
    return (2*H)*180/Math.PI/15;
  } catch { return null; }
}
const fmtDayLen = (h) => h==null ? "—" : `${Math.floor(h)} h ${String(Math.round((h-Math.floor(h))*60)).padStart(2,"0")} m`;

/* ========= Pro Icons (SVG) ========= */
const I = {
  thermo: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M10 14.5V6a2 2 0 1 1 4 0v8.5a4 4 0 1 1-4 0Z"/><path d="M10 10h4"/>
    </svg>
  ),
  humid: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 3s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10Z"/>
    </svg>
  ),
  rain: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M20 16.5A4.5 4.5 0 0 0 18 8a6 6 0 0 0-11-.9A4.5 4.5 0 0 0 4 16.5"/><path d="M8 19v2M12 19v2M16 19v2"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l-1-1M19 19l-1-1M19 5l1-1M5 19l-1 1"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  refresh: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-2.6-6.4L21 7"/><path d="M21 3v4h-4"/>
    </svg>
  ),
};

/* ========= Small UI bits ========= */
function Card({ icon, title, value, hint }) {
  return (
    <div className="card">
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
      <div className="value">{value}</div>
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}
const Chip = ({children}) => <span className="chip">{children}</span>;

/* ========= Season slider (Mar–May only) ========= */
function clamp01(x){ return Math.max(0, Math.min(1, x)); }
function stageFromPct(p){
  // 0..1 → SoB / MoB / PoB / LPoB / EoB
  if (p < 0.20) return { key:"SoB", label:"Start" };
  if (p < 0.40) return { key:"MoB", label:"Mid" };
  if (p < 0.60) return { key:"PoB", label:"Peak" };
  if (p < 0.80) return { key:"LPoB", label:"Late" };
  return { key:"EoB", label:"End" };
}

function SeasonSlider({value, onChange}) {
  // value: 0..100 across Mar 1 → May 31 (roughly 92 days)
  const pct = clamp01(value/100);
  const st = stageFromPct(pct);

  return (
    <div className="season">
      <div className="season-head">
        <h3>NDVI/EVI Timeline (Bloom Season)</h3>
        <div className="legend">
          <Chip>Start</Chip><Chip>Mid</Chip><Chip>Peak</Chip><Chip>Late</Chip><Chip>End</Chip>
        </div>
      </div>
      <input className="slider" type="range" min="0" max="100" value={value}
             onChange={(e)=>onChange(+e.target.value)} />
      <div className="season-foot">
        <span>Mar 1</span>
        <span className="stage-pill">{st.label}</span>
        <span>May 31</span>
      </div>
    </div>
  );
}

/* ========= Map (Leaflet via CDN) ========= */
function LeafletMap({center=DEFAULT_CENTER, zoom=5}) {
  const ref = useRef(null);
  useEffect(() => {
    // Ensure Leaflet is loaded (from CDN) and only init once
    if (!ref.current || !window.L) return;
    if (ref.current._map) return; // already inited

    const map = window.L.map(ref.current, {
      center, zoom, zoomControl: true,
      scrollWheelZoom: true
    });
    ref.current._map = map;

    // Dark basemap (Carto)
    window.L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      { attribution: '&copy; OpenStreetMap & Carto', maxZoom: 19 }
    ).addTo(map);

    // marker (California center)
    window.L.circleMarker(center, {
      radius: 6, color: "#4ade80", weight: 2, fillColor: "#22c55e", fillOpacity: 0.7
    }).addTo(map).bindTooltip("California Central Valley");
  }, [center, zoom]);

  return <div ref={ref} className="map" />;
}

/* ========= Main App ========= */
export default function App() {
  const [data, setData] = useState({
    region: "California",
    date: todayISO(),
    bloom_flag: "NoBloom",
    bloom_stage: "OutOfSeason",
    stage_prob: 0,
    final_payload: {},
    lat: DEFAULT_CENTER[0],
    lon: DEFAULT_CENTER[1],
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [slider, setSlider] = useState(50);  // 0..100 (Mar..May)

  async function load() {
    setBusy(true); setErr("");
    try {
      const r = await timeoutFetch(API_URL, 15000);
      if (!r.ok) {
        let detail = ""; try { detail = await r.text(); } catch {}
        throw new Error(`HTTP ${r.status} ${detail}`);
      }
      const j = await r.json();
      setData(prev => ({ ...prev, ...j, date: j.date || todayISO() }));
    } catch (e) { setErr(String(e)); }
    finally { setBusy(false); }
  }
  useEffect(()=>{ load(); }, []);

  const cards = useMemo(()=>{
    const fp = data.final_payload || {};
    const lat = typeof data.lat === "number" ? data.lat : DEFAULT_CENTER[0];
    return [
      { icon: I.thermo, title: "Temperature", value: `${toFixedMaybe(fp.AirTemp_avg_final,0)} °C`, hint: "Now" },
      { icon: I.humid,  title: "Humidity",    value: `${toFixedMaybe(fp.Humidity_rel_final,0)} %`, hint: "Relative" },
      { icon: I.rain,   title: "Rain",        value: `${toFixedMaybe(fp.Precipitation_final,1)} mm`, hint: "Current" },
      { icon: I.sun,    title: "Solar Radiation", value: `${toFixedMaybe(fp.SolarRadiation_sw_final,0)} W/m²`, hint: "Shortwave" },
      { icon: I.clock,  title: "Day Length",  value: fmtDayLen(dayLengthHours(lat, data.date)), hint: "Today" },
    ];
  }, [data]);

  // Derived stage from slider (visual only)
  const pct = Math.max(0, Math.min(100, slider))/100;
  const sliderStage = stageFromPct(pct);

  return (
    <div className="page">
      <div className="bg" />
      <header>
        <h1>BloomWatch — Climate & Flowering</h1>
      </header>

      <div className="chips">
        <Chip>Today: {todayISO()}</Chip>
        <Chip>Region: {data.region}</Chip>
        <Chip>Lat: {toFixedMaybe(data.lat,2)} / Lon: {toFixedMaybe(data.lon,2)}</Chip>
      </div>

      <section className="cards">
        {cards.map((c,i)=>(
          <Card key={i} icon={c.icon} title={c.title} value={c.value} hint={c.hint}/>
        ))}
      </section>

      <section className="panel">
        <div className={`stage ${data.bloom_flag === "Bloom" ? "ok" : "no"}`}>
          {data.bloom_flag === "Bloom"
            ? `Blooming now — Stage: ${data.bloom_stage} (p=${toFixedMaybe(data.stage_prob,2)})`
            : `No Bloom — ${data.bloom_stage}`}
        </div>

        {/* Season-only slider (Mar–May) */}
        <SeasonSlider value={slider} onChange={setSlider}/>
        <div className="subchips">
          <Chip>Predicted Duration: 3 months</Chip>
          <Chip>Start: 85%</Chip>
          <Chip>Peak: 92%</Chip>
          <Chip>End: 78%</Chip>
          <Chip>Slider Stage: {sliderStage.key}</Chip>
        </div>

        <button className="refresh" onClick={load} disabled={busy}>
          {I.refresh} {busy ? "Loading…" : "Refresh"}
        </button>
      </section>

      <section className="map-panel">
        <h2>Interactive Bloom Map</h2>
        <LeafletMap center={DEFAULT_CENTER} zoom={5}/>
      </section>
    </div>
  );
}
