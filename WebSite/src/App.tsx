import React, { useState } from "react";
import WeatherGlassRow from "./components/metrics/WeatherGlassRow";

export default function App() {
  return (
    <div className="relative w-full h-screen">
      {/* الخلفية */}
      <img
        src="/BloomWatchHero.jpg"
        alt="Hero"
        className="block w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* طبقة تظليل خفيفة لتحسين قراءة النص */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/40 pointer-events-none" />

      {/* نص الهيرو + الكروت الزجاجية للطقس */}
      <HeroWithWeather />

      {/* زر التحليل الزجاجي أسفل الصفحة */}
      <BottomActionsGlass />

      {/* فقاعة الشات الزجاجية (أيقونة وردة) */}
      <ChatbotBubbleGlass />
    </div>
  );
}

/* ===================== Hero + Weather cards ===================== */
function HeroWithWeather() {
  return (
    <div className="absolute top-1/2 left-0 right-0 z-20 -translate-y-1/2 px-4">
      {/* النص */}
      <div className="mx-auto max-w-3xl text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.45)]">
          BloomWatch
        </h1>
        <p className="mt-3 text-white/90 md:text-lg">
          Live climate snapshots that power your bloom predictions. Explore trends,
          upload data, and chat with Bloomy for instant insights.
        </p>
      </div>

      {/* صف الكروت الزجاجية للطقس */}
      <div className="flex justify-center">
        <div className="bg-white/8 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_16px_48px_rgba(0,0,0,.35)] px-3 py-3">
          <WeatherGlassRow />
        </div>
      </div>
    </div>
  );
}

/* ===================== زرار Glass ===================== */
function BottomActionsGlass() {
  return (
    <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-4">
      {/* كبسولة زجاجية تحتضن الزر */}
      <div className="rounded-[18px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl px-3 py-3">
        <button
          onClick={() =>
            window.open("http://localhost:5174/", "_blank", "noopener,noreferrer")
          }
          className="inline-flex items-center justify-center gap-2
                     rounded-[14px] px-6 py-3
                     font-semibold tracking-wide
                     text-white/95
                     bg-white/5 hover:bg-white/10 active:bg-white/15
                     border border-white/20
                     backdrop-blur-md
                     shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                     transition-all duration-200
                     focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          {/* أيقونة تحليل */}
          <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90" fill="currentColor">
            <path d="M3 3h2v18H3V3zm16 0h2v18h-2V3zM8 13h2v8H8v-8zm5-6h2v14h-2V7z"/>
          </svg>
          Analyze Bloom Trends
        </button>
      </div>
    </div>
  );
}

/* ============== فقاعة الشات الزجاجية (وردة) ============== */
function ChatbotBubbleGlass() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* زر الفقاعة – أيقونة وردة بزجاج */}
      <button
        aria-label="Open Bloomy Chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 bottom-6 z-30
                   w-14 h-14 rounded-full
                   bg-white/10 border border-white/25
                   backdrop-blur-lg
                   shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                   text-white hover:bg-white/14 active:bg-white/18
                   transition-colors"
        title="Bloomy Chat"
      >
        {/* أيقونة وردة لطيفة */}
        <svg viewBox="0 0 24 24" className="w-7 h-7 mx-auto" fill="currentColor" aria-hidden="true">
          <path d="M12 4c1.9-2.1 5-2.1 6.9 0 1.2 1.3 1.6 3 1.3 4.6-.3 1.6-1.4 3.1-3.1 4.1 1 2.4.3 5.2-1.9 6.7-2.3 1.5-5.3 1.1-7.2-.9-1.8-1.9-2.1-4.8-.8-7-1.7-1-2.8-2.5-3.1-4.1-.3-1.6.1-3.3 1.3-4.6C7 1.9 10.1 1.9 12 4z"/>
        </svg>
      </button>

      {/* لوحة الشات الزجاجية */}
      {open && (
        <div
          className="fixed right-6 bottom-24 z-30
                     w-[380px] max-w-[92vw] h-[540px]
                     bg-white/10 border border-white/25
                     backdrop-blur-xl
                     rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.45)]
                     overflow-hidden"
        >
          {/* ترويسة */}
          <div className="flex items-center justify-between px-3 py-2
                          bg-white/15 border-b border-white/20 text-white">
            <div className="font-medium">Bloomy Chat</div>
            <button
              onClick={() => setOpen(false)}
              className="px-2 py-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close Bloomy Chat"
              title="Close"
            >
              ✕
            </button>
          </div>

          {/* iframe لواجهة البوت */}
          <iframe
            title="Bloomy Chat"
            src="http://127.0.0.1:8000/"
            className="w-full h-[calc(540px-40px)] border-0"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      )}
    </>
  );
}
