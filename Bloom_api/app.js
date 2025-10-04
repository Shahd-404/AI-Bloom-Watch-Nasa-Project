const BASE = "http://127.0.0.1:8000";
const API  = BASE + "/predict_live?region=California&debug=true";
const HEALTH = BASE + "/health";

const cardsDiv  = document.getElementById("cards");
const stageBox  = document.getElementById("stage-box");

function makeCard(label, value, sub) {
  const c = document.createElement("div");
  c.className = "card";
  c.innerHTML = `
    <div class="value">${value}</div>
    <div class="label">${label}${sub ? " — " + sub : ""}</div>
  `;
  return c;
}

function timeoutFetch(url, ms = 10000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort("timeout"), ms);
  return fetch(url, { signal: ctrl.signal }).finally(() => clearTimeout(id));
}

async function main() {
  try {
    // 1) صحّة السيرفر أولاً
    const h = await timeoutFetch(HEALTH, 5000);
    if (!h.ok) throw new Error("Server health failed: HTTP " + h.status);
    const hj = await h.json();
    if (!hj.ok) throw new Error("Server health returned not-ok");

    // 2) طلب البيانات المباشرة مع مهلة 10 ثواني
    const r = await timeoutFetch(API, 10000);
    if (!r.ok) throw new Error("predict_live failed: HTTP " + r.status);
    const data = await r.json();

    // 3) عرض الكروت
    const f = data.final_payload || {};
    cardsDiv.innerHTML = "";
    cardsDiv.appendChild(makeCard("🌡 Temperature", (f.AirTemp_avg_final ?? "—") + " °C", "Now"));
    cardsDiv.appendChild(makeCard("💧 Humidity", (f.Humidity_rel_final ?? "—") + " %", "Relative"));
    cardsDiv.appendChild(makeCard("🌧 Rain", (f.Precipitation_final ?? "—") + " mm", "Current"));
    cardsDiv.appendChild(makeCard("☀️ Solar Radiation", (f.SolarRadiation_sw_final ?? "—") + " W/m²", "Shortwave"));
    cardsDiv.appendChild(makeCard("⏱ Pressure", (f.SurfacePressure_final ?? "—") + " kPa", "Surface"));

    // 4) حالة الإزهار
    if (data.bloom_flag === "Bloom") {
      stageBox.innerHTML = `<div class="stage-ok">✅ Blooming now — Stage: ${data.bloom_stage} (p=${(data.stage_prob ?? 0).toFixed(2)})</div>`;
    } else {
      stageBox.innerHTML = `<div class="stage-no">🚫 No Bloom — ${data.bloom_stage}</div>`;
    }
  } catch (e) {
    stageBox.textContent = "❌ Error: " + e;
  }
}

window.addEventListener("DOMContentLoaded", main);
