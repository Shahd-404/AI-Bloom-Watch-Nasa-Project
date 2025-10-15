import React, { useState } from "react";

export default function ChatbotBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open chatbot"
        onClick={() => setOpen((v) => !v)}
        className="fixed right-6 bottom-6 z-30 w-14 h-14 rounded-full shadow-lg
                   bg-slate-900 text-white hover:bg-black transition-colors
                   flex items-center justify-center"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
        </svg>
      </button>

      {open && (
        <div
          className="fixed right-6 bottom-24 z-30 w-[380px] max-w-[92vw] h-[540px]
                     bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/60"
        >
          <div className="flex items-center justify-between px-3 py-2 bg-white/70">
            <div className="font-medium">Bloomy Chat</div>
            <button onClick={() => setOpen(false)} className="text-slate-600 hover:text-black">✕</button>
          </div>

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
