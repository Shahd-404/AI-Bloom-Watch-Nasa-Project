import React from 'react'

export default function EarthPanel() {
  return (
    <div className="card p-0 overflow-hidden h-80 md:h-[22rem] rounded-[40px]">
      <img
        src="/earth.png"          // put your image in /public/earth.png
        alt="Earth"
        className="h-full w-full object-cover"
      />
    </div>
  )
}
