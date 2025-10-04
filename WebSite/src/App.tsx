import React, { useEffect, useState } from "react";
import HeaderTabs from "./components/layout/HeaderTabs";
import WeatherGlassRow from "./components/metrics/WeatherGlassRow";

type TabId = "explore" | "analysis" | "uploads" | "reports";

function getInitialTab(): TabId {
  const h = window.location.hash.replace("#", "");
  return (["explore", "analysis", "uploads", "reports"].includes(h) ? h : "explore") as TabId;
}

export default function App() {
  const [active, setActive] = useState<TabId>(getInitialTab);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "") as TabId;
      if (["explore", "analysis", "uploads", "reports"].includes(h)) setActive(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setTab = (id: TabId) => {
    setActive(id);
    window.location.hash = id;
  };

  return (
    <div className="relative w-full h-screen">
      {/* الخلفية (الصورة) */}
      <img
        src="/BloomWatchHero.jpg"
        alt="Hero"
        className="block w-full h-full object-cover select-none"
        draggable={false}
      />

      {/* شريط التبويبات */}
      <div className="absolute top-3 left-0 right-0 z-20 flex justify-center">
        <HeaderTabs active={active} onChange={setTab} />
      </div>

      {/* الكروت الزجاجية في منتصف الصورة */}
      <div className="absolute top-1/2 left-0 right-0 z-20 flex justify-center px-4 -translate-y-1/2">
        <WeatherGlassRow />
      </div>
    </div>
  );
}
