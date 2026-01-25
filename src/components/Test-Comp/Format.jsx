// src/components/Test-Comp/Format.jsx
"use client";

import { useMemo, useState } from "react";
import { Headphones, BookOpen, Pencil, Mic, Plus, Minus } from "lucide-react";

const ICONS = {
  headphones: Headphones,
  book: BookOpen,
  pencil: Pencil,
  mic: Mic,
};

export default function Format({ data }) {
  if (!data || !data.title || !Array.isArray(data.steps)) return null;

  const { title, intro, steps } = data;

  const safeSteps = useMemo(() => {
    return steps.filter(
      (s) =>
        s?.id &&
        s?.label &&
        s?.meta &&
        s?.description &&
        s?.iconKey &&
        s?.color &&
        ICONS[s.iconKey]
    );
  }, [steps]);

  if (safeSteps.length === 0) return null;

  const [openId, setOpenId] = useState(safeSteps[0].id);

  return (
    <section className="w-full px-6 md:px-14 py-16 relative">
      {/* Tag — LEFT */}
      <div className="absolute top-0 left-6 md:left-14">
        <span className="inline-flex items-center rounded-md bg-lime-200/70 px-3 py-1 text-sm font-medium text-black">
          Format
        </span>
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        {/* Title */}
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 text-black/70 text-base md:text-lg">
              {intro}
            </p>
          ) : null}
        </div>

        {/* ─────────────────────────────────────────────
            STEP CARDS — SUBTLE / PREMIUM
        ───────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 hidden md:block">
          {safeSteps.map((s, idx) => {
            const Icon = ICONS[s.iconKey];
            const active = openId === s.id;

            return (
              <button
                key={s.id}
                onClick={() => setOpenId(s.id)}
                className={[
                  "group rounded-2xl border p-6 text-left transition-all",
                  "bg-white hover:shadow-md",
                  active ? "border-black/20" : "border-black/10",
                ].join(" ")}
              >
                {/* Top accent line */}
                <div
                  className="h-1 rounded-full"
                  style={{
                    backgroundColor: active
                      ? s.color
                      : "rgba(0,0,0,0.06)",
                  }}
                />

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className="w-11 h-11 rounded-xl border border-black/10 bg-black/[0.02] flex items-center justify-center">
                        <Icon
                          className="w-6 h-6"
                          style={{ color: s.color }}
                        />
                      </div>

                      {/* Number */}
                      <span className="text-xs font-semibold tracking-wider text-black/50">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-black truncate">
                      {s.label}
                    </h3>
                    <p className="mt-1 text-sm text-black/60">
                      {s.meta}
                    </p>
                  </div>

                  {/* Active dot */}
                  <span
                    className="mt-1 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: active
                        ? s.color
                        : "rgba(0,0,0,0.15)",
                    }}
                  />
                </div>

                {/* Hover hint */}
                <div
                  className="mt-5 h-px w-10 group-hover:w-16 transition-all duration-300"
                  style={{
                    backgroundColor: active
                      ? s.color
                      : "rgba(0,0,0,0.15)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────
            ACCORDION — RICH / DESCRIPTIVE (OLD STYLE)
        ───────────────────────────────────────────── */}
        <div className="mt-12 rounded-3xl border border-black/10 bg-white overflow-hidden">
          {safeSteps.map((s) => {
            const isOpen = openId === s.id;

            return (
              <div
                key={s.id}
                className="border-b border-black/10 last:border-b-0"
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-black/[0.02] transition"
                >
                  <div>
                    <p className="text-lg font-semibold text-black">
                      {s.label}
                    </p>
                    <p className="text-sm text-black/60">{s.meta}</p>
                  </div>

                  {/* Colored chip like old design */}
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${s.color}15` }}
                  >
                    {isOpen ? (
                      <Minus
                        className="w-5 h-5"
                        style={{ color: s.color }}
                      />
                    ) : (
                      <Plus
                        className="w-5 h-5"
                        style={{ color: s.color }}
                      />
                    )}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div
                      className="rounded-2xl p-5"
                      style={{ backgroundColor: `${s.color}10` }}
                    >
                      <p className="text-black/80 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
