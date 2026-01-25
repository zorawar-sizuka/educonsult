'use client';

import React from 'react';

export default function PillButton({ children, onClick, disabled, variant = "black", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";
  const styles =
    variant === "lime"
      ? "bg-lime-300 text-slate-900 hover:bg-lime-200"
      : "bg-slate-900 text-white hover:bg-black";

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:bg-slate-900" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}
