'use client';

import React from 'react';

export function Label({ children }) {
  return (
    <div className="text-sm font-medium text-slate-700 mb-2">
      {children}
    </div>
  );
}

export function TextInput({ label, placeholder, value, onChange, className = "" }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none
          focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition ${className}`}
      />
    </div>
  );
}

export function SelectField({ label, value, onChange, options = [] }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 text-slate-900 outline-none
          focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function TextArea({ label, placeholder, value, onChange, rows = 6 }) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none
          focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition resize-none"
      />
    </div>
  );
}

export function Slider({ label, value, onChange, min, max, step }) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-slate-900"
      />
    </div>
  );
}
