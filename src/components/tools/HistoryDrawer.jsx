

'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, RotateCcw, Star, X, Trash2, Info } from 'lucide-react';

import { useToolHistory } from "@/hooks/useToolHistory";
import { useSavedToolHistory } from "@/hooks/useSavedToolHistory";
import { getSessionId } from "@/hooks/toolRunClient";

export default function HistoryDrawer({ open, onClose, activeTab, onRestore }) {
  const toolType = useMemo(() => (
    activeTab === "eligibility" ? "eligibility" :
    activeTab === "calculator" ? "cost" :
    activeTab === "sop" ? "sop" :
    activeTab === "discovery" ? "finder" :
    activeTab === "gpa" ? "gpa" :
    ""
  ), [activeTab]);

  const isFinder = toolType === "finder";

  const [view, setView] = useState("all"); // "all" = recent, "saved" = pinned

  // Tool runs (recent & saved) – used for all tools except finder saved
  const { runs: recentRuns, loading: recentLoading, error: recentError, refresh: refreshRecent } = useToolHistory({
    toolType: isFinder ? "finder" : toolType || "",
    take: 10,
    savedOnly: false,
  });

  const { runs: savedToolRuns, loading: savedToolLoading, error: savedToolError, refresh: refreshSavedTool } = useSavedToolHistory({
    toolType: isFinder ? "finder" : toolType || "",
    take: 25,
  });

  // Finder-specific saved universities
  const [savedUniversities, setSavedUniversities] = useState([]);
  const [savedUniLoading, setSavedUniLoading] = useState(false);
  const [savedUniError, setSavedUniError] = useState("");

  const sessionId = getSessionId();

  const fetchSavedUniversities = async () => {
    if (!isFinder || view !== "saved") return;
    setSavedUniLoading(true);
    setSavedUniError("");
    try {
      const res = await fetch(`/api/universities/saved?sessionId=${encodeURIComponent(sessionId)}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) {
        setSavedUniversities(json.universities || []);
      } else {
        setSavedUniError(json.error || "Failed to load saved universities");
      }
    } catch {
      setSavedUniError("Failed to load saved universities");
    } finally {
      setSavedUniLoading(false);
    }
  };

  useEffect(() => {
    if (isFinder && view === "saved") {
      fetchSavedUniversities();
    }
  }, [isFinder, view, sessionId]);

  const refresh = () => {
    refreshRecent();
    refreshSavedTool();
    if (isFinder && view === "saved") fetchSavedUniversities();
  };

  // Toggle for tool runs (all tools including finder recent runs)
  const toggleToolSaved = async (run) => {
    if (!run?.id) return;

    const isCurrentlySaved = savedToolRuns.some(s => s.originalRunId === run.id || s.id === run.id);
    const action = isCurrentlySaved ? "unsave" : "save";
    const runId = run.originalRunId || run.id;

    try {
      const res = await fetch("/api/tools/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ runId, action, sessionId }),
      });

      if (res.ok) {
        refresh();
      }
    } catch (e) {
      console.error("Tool save toggle failed:", e);
    }
  };

  // Toggle for saved universities (only in finder saved view)
  const toggleUniversitySave = async (universityId) => {
    try {
      const url = `/api/universities/save?sessionId=${encodeURIComponent(sessionId)}&universityId=${universityId}`;
      await fetch(url, { method: "DELETE" });
      fetchSavedUniversities(); // refresh list
      refresh(); // in case recent needs update
    } catch (e) {
      console.error("University unsave failed:", e);
    }
  };

  const clearRecentHistory = async () => {
    if (!confirm("Clear all recent history? Your saved items will remain untouched.")) return;

    try {
      await fetch("/api/tools/clear", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      refreshRecent();
    } catch (e) {
      console.error("Clear history failed:", e);
    }
  };

  // Determine what to display
  const isSavedView = view === "saved";
  const useFinderSaved = isFinder && isSavedView;

  const displayedRuns = useFinderSaved ? savedUniversities : (isSavedView ? savedToolRuns : recentRuns);
  const displayedLoading = useFinderSaved ? savedUniLoading : (isSavedView ? savedToolLoading : recentLoading);
  const displayedError = useFinderSaved ? savedUniError : (isSavedView ? savedToolError : recentError);

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
                  {view === "saved" ? (isFinder ? "Saved Universities" : "Saved 25") : "Recent 10"} Tool Runs
                  {toolType && ` • ${toolType.toUpperCase()}`}
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
                  Recent
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
              <span className="font-mono text-slate-700">{sessionId}</span>
              {view === "all" && <span className="text-slate-400 ml-auto">(Latest 10)</span>}
              {view === "saved" && <span className="text-slate-400 ml-auto">(Up to 25)</span>}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {displayedLoading && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                  Loading…
                </div>
              )}

              {displayedError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-600">
                  {displayedError}
                </div>
              )}

              {!displayedLoading && !displayedError && displayedRuns.length === 0 && (
                <div className="p-6 rounded-xl bg-slate-50 border border-slate-100 text-center text-slate-500">
                  {view === "saved" 
                    ? (isFinder ? "No saved universities yet. Star some in Finder." : "No saved runs yet. Star a run to pin it here.")
                    : "No recent runs yet. Use a tool and it will appear here."
                  }
                </div>
              )}

              {!displayedLoading && !displayedError && displayedRuns.map((item) => {
                // Tool run item
                if ("toolType" in item) {
                  const r = item;
                  const isSaved = savedToolRuns.some(s => s.originalRunId === r.id || s.id === r.id);

                  return (
                    <div key={r.id} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-900 transition">
                      <div className="flex items-start gap-3">
                        <button onClick={() => onRestore(r)} className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase text-slate-400">{r.toolType}</span>
                            <span className="text-[11px] text-slate-500">
                              {new Date(r.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="mt-2 text-sm font-bold text-slate-900">
                            {r.toolType === "eligibility" && (
                              <>GPA {r.payload?.gpa ?? "-"} • {r.payload?.testType || "Test"} • {r.payload?.destination || "Destination"}</>
                            )}
                            {r.toolType === "cost" && (
                              <>{r.payload?.country || "Country"} • {r.payload?.duration ?? "-"} yrs • ${r.result?.totalUSD?.toLocaleString?.() ?? "-"} USD/yr</>
                            )}
                            {r.toolType === "sop" && (
                              <>{r.payload?.name || "SOP"} • {r.payload?.course || "Course"} • {r.payload?.university || "University"}</>
                            )}
                            {r.toolType === "gpa" && (
                              <>Mode: {r.payload?.mode || "Unknown"} • GPA: {r.result?.gpa ?? "-"}</>
                            )}
                            {r.toolType === "finder" && (
                              <>University Finder • Country: {r.payload?.country || "All"} • Max Tuition: ${r.payload?.maxTuition || "80k"}</>
                            )}
                          </div>

                          <div className="mt-2 text-xs text-slate-500">
                            Click to restore inputs
                          </div>
                        </button>

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleToolSaved(r)}
                          className={`p-2 rounded-lg border transition ${
                            isSaved
                              ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                              : "bg-white border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                          }`}
                          title={isSaved ? "Unsave" : "Save"}
                        >
                          <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                        </motion.button>
                      </div>
                    </div>
                  );
                }

                // Finder saved university item
                const uni = item;
                return (
                  <div key={uni.id} className="rounded-2xl border border-slate-200 p-4 hover:border-slate-900 transition">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-bold text-slate-900">{uni.name}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {uni.countryCode} {uni.ranking && `• Rank #${uni.ranking}`}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Tuition: ${uni.tuitionYearUsd?.toLocaleString() || "N/A"}/year
                          {uni.intake && ` • Intake: ${uni.intake}`}
                        </p>
                        <div className="mt-2 text-xs text-slate-500">
                          Saved university shortlist
                        </div>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleUniversitySave(uni.id)}
                        className="p-2 rounded-lg border bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                        title="Unsave"
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </motion.button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-slate-100 flex gap-2">
              {view === "all" && (
                <button
                  onClick={clearRecentHistory}
                  className="flex-1 py-3 rounded-full bg-red-100 text-red-700 font-semibold hover:bg-red-200 transition flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Recent
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-black transition"
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