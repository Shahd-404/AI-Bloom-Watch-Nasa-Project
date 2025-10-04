import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  rounded?: "lg" | "xl" | "2xl";
};

export default function Button({
  variant = "solid",
  rounded = "xl",
  className = "",
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-4 ring-slate-200";
  const radius = rounded === "2xl" ? "rounded-2xl" : rounded === "lg" ? "rounded-lg" : "rounded-xl";
  const theme =
    variant === "outline"
      ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-black";

  return <button className={`${base} ${radius} ${theme} ${className}`} {...rest} />;
}
