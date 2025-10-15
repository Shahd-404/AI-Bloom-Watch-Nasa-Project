import React from "react";
import Button from "../ui/Button";

export default function BottomActions() {
  return (
    <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center">
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            rounded="2xl"
            className="min-w-[220px]"
            onClick={() => {
              // افتحي الـ Analysis في تبويب جديد
              window.open("http://localhost:5173/", "_blank", "noopener,noreferrer");
            }}
          >
            Analyze Bloom Trends
          </Button>
          {/* لو عايزة زرار تاني لاحقًا، زوّديه هنا */}
        </div>
      </div>
    </div>
  );
}
