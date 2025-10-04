import React from "react";

type TabId = "explore" | "analysis" | "uploads" | "reports";

const TABS: { id: TabId; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "analysis", label: "Analysis" },
  { id: "uploads", label: "Uploads" },
  { id: "reports", label: "Reports" },
];

export default function HeaderTabs({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (t: TabId) => void;
}) {
  return (
    <nav className="rounded-full bg-white/10 backdrop-blur-md shadow-lg px-6 py-2">
      <ul className="flex items-center gap-10 text-white text-lg font-custom">
        {TABS.map(({ id, label }) => (
          <li key={id}>
            <button
              role="tab"
              aria-selected={active === id}
              onClick={() => onChange(id)}
              className={[
                "px-1 transition-colors",
                active === id
                  ? "text-white font-bold"
                  : "text-white/80 hover:text-white",
              ].join(" ")}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
