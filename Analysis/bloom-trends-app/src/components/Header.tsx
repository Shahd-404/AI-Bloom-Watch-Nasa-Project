import React from 'react'

export default function Header() {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-r from-brand-500 via-orange-500 to-pink-500 text-white p-6 md:p-8">
      <div className="relative z-10 max-w-xl">
        <h1 className="h1">Analyze Bloom Trends</h1>
        <p className="mt-2 text-white/90">
          Compare bloom phases and climate metrics across years.
        </p>
      </div>

      {/* subtle glow only */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-black/10 blur-2xl" />
    </div>
  )
}
