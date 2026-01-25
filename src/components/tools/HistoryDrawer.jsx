'use client';

import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, RotateCcw, Star, X } from 'lucide-react';

import { useToolHistory } from "@/hooks/useToolHistory";
import { getSessionId } from "@/hooks/toolRunClient";


export default function HistoryDrawer({ open, onClose, activeTab, onRestore }) {
  const toolType = useMemo(() => (
    activeTab === "eligibility" ? "eligibility" :
    activeTab === "calculator" ? "cost" :
    activeTab === "sop" ? "sop" :
    activeTab === "discovery" ? "finder" : ""
  ), [activeTab]);

  // Step 9 view
  const [view, setView] = useState("all"); // all | saved
  const savedOnly = view === "saved";

  const { runs, loading, error, refresh } = useToolHistory({
    toolType: toolType || "",
    take: 20,
    savedOnly,
  });

  const toggleSaved = async (run) => {
    if (!run?.id) return;
    const next = !run.saved;

    await fetch("/api/tools/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: run.id, saved: next }),
    }).catch(() => {});

    refresh();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          <motion.div
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 border-l border-slate-200 shadow-2xl flex flex-col"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">History</div>
                <div className="text-lg font-bold text-slate-900">
                  {savedOnly ? "Saved runs" : "Recent runs"}{toolType ? ` • ${toolType}` : ""}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={refresh} className="p-2 rounded-lg hover:bg-slate-100" title="Refresh">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100" title="Close">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="px-5 pt-4">
              <div className="bg-slate-50 border border-slate-200 rounded-full p-1 flex">
                <button
                  onClick={() => setView("all")}
                  className={`flex-1 py-2 rounded-full text-sm font-bold transition ${view === "all" ? "bg-white shadow-sm" : "text-slate-500"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setView("saved")}
                  className={`flex-1 py-2 rounded-full text-sm font-bold transition ${view === "saved" ? "bg-white shadow-sm" : "text-slate-500"}`}
                >
                  Saved
                </button>
              </div>
            </div>

            <div className="p-5 text-xs text-slate-500 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Session:</span>
              <span className="font-mono text-slate-700">{getSessionId()}</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                  Loading…
                </div>
              )}

              {!loading && error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600">
                  {error}
                </div>
              )}

              {!loading && !error && runs.length === 0 && (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center text-slate-500">
                  {savedOnly ? "No saved runs yet. Star something." : "No runs yet. Use a tool and it will show up here."}
                </div>
              )}

              {!loading && !error && runs.map((r) => (
                <div key={r.id} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-900 transition">
                  <div className="flex items-start gap-3">
                    <button onClick={() => onRestore(r)} className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-slate-400">{r.toolType}</span>
                        <span className="text-[11px] text-slate-500">{new Date(r.createdAt).toLocaleString()}</span>
                      </div>

                      <div className="mt-2 text-sm font-bold text-slate-900">
                        {r.toolType === "eligibility" && (
                          <>
                            {r.payload?.destination || "Destination"} • GPA {r.payload?.gpa ?? "-"} • {r.payload?.testType || "IELTS"}
                          </>
                        )}
                        {r.toolType === "cost" && (
                          <>
                            {r.payload?.country || "Country"} • {r.payload?.duration ?? "-"} yrs • ${r.result?.totalUSD?.toLocaleString?.() ?? "-"} USD/yr
                          </>
                        )}
                        {r.toolType === "sop" && (
                          <>
                            {r.payload?.name || "SOP"} • {r.payload?.course || "Course"} • {r.payload?.university || "University"}
                          </>
                        )}
                        {r.toolType === "finder" && <>University Finder run</>}
                      </div>

                      <div className="mt-2 text-xs text-slate-500">
                        Click to restore inputs
                      </div>
                    </button>

                    <button
                      onClick={() => toggleSaved(r)}
                      className={`p-2 rounded-lg border transition ${
                        r.saved
                          ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                          : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                      title={r.saved ? "Unsave" : "Save"}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={onClose}
                className="w-full py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
