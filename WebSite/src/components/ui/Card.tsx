import React from "react";

export function Card({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-white rounded-2xl border border-slate-200 ${className}`} {...rest} />;
}

export function CardContent({ className = "", ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`p-4 ${className}`} {...rest} />;
}
