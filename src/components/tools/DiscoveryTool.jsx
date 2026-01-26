"use client";

import { motion } from "framer-motion";
import { Info, Star, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getSessionId } from "@/hooks/toolRunClient";

const safeArray = (v) => (Array.isArray(v) ? v : []);

export default function DiscoveryTool() {
  const sessionId = useMemo(() => getSessionId(), []);

  const [filters, setFilters] = useState({
    country: "All",
    maxTuition: 55000,
  });

  const [mode, setMode] = useState("all"); // "all" | "saved"

  const [rows, setRows] = useState([]);
  const [rowsLoading, setRowsLoading] = useState(false);
  const [rowsError, setRowsError] = useState("");

  const [savedIds, setSavedIds] = useState(new Set());
  const [savedLoading, setSavedLoading] = useState(false);

  const [togglingId, setTogglingId] = useState(null);

  // Fetch saved universities (to render stars correctly)
  const refreshSaved = async () => {
    setSavedLoading(true);
    try {
      const res = await fetch(`/api/universities/saved?sessionId=${encodeURIComponent(sessionId)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      const saved = safeArray(json?.saved);

      const ids = new Set(saved.map((s) => s?.university?.id).filter(Boolean));
      setSavedIds(ids);
    } catch {
      setSavedIds(new Set());
    } finally {
      setSavedLoading(false);
    }
  };

  // Load universities list from DB
  const loadUniversities = async () => {
    setRowsLoading(true);
    setRowsError("");
    try {
      const qs = new URLSearchParams();
      qs.set("country", filters.country);
      qs.set("maxTuition", String(filters.maxTuition));
      qs.set("take", "120");

      const res = await fetch(`/api/universities?${qs.toString()}`, { cache: "no-store" });
      const json = await res.json();

      if (!json?.ok) {
        setRows([]);
        setRowsError(json?.error || "Failed to load universities");
      } else {
        setRows(safeArray(json.universities));
      }
    } catch {
      setRows([]);
      setRowsError("Failed to load universities");
    } finally {
      setRowsLoading(false);
    }
  };

  useEffect(() => {
    refreshSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUniversities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.country, filters.maxTuition]);

  const displayed = useMemo(() => {
    if (mode === "saved") {
      return rows.filter((u) => savedIds.has(u.id));
    }
    return rows;
  }, [mode, rows, savedIds]);

  const toggleSave = async (universityId) => {
    if (!universityId || togglingId) return;

    const isSaved = savedIds.has(universityId);
    setTogglingId(universityId);

    // Optimistic UI
    const next = new Set(savedIds);
    if (isSaved) next.delete(universityId);
    else next.add(universityId);
    setSavedIds(next);

    try {
      if (!isSaved) {
        await fetch("/api/universities/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, universityId }),
        });
      } else {
        const url = `/api/universities/save?sessionId=${encodeURIComponent(sessionId)}&universityId=${encodeURIComponent(
          String(universityId)
        )}`;
        await fetch(url, { method: "DELETE" });
      }
    } catch {
      // Revert on failure
      await refreshSaved();
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-8 md:p-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-7">
        <div>
          <h2 className="text-2xl font-serif text-slate-900">University Finder</h2>
          <p className="text-slate-500 text-sm mt-1">
            Browse  universities, filter by tuition, and save your shortlist.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full p-1">
          <button
            onClick={() => setMode("all")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              mode === "all" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setMode("saved")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${
              mode === "saved" ? "bg-white shadow-sm text-slate-900" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Saved
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
              {savedIds.size}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-2 gap-5 mb-7">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-2">Country</label>
          <select
            value={filters.country}
            onChange={(e) => setFilters({ ...filters, country: e.target.value })}
            className="w-full rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 text-slate-900 outline-none
              focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition"
          >
            <option value="All">Global</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option> 
            <option value="NZL">New Zealand</option>
          </select>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-700">Max Tuition (USD)</label>
            <span className="text-sm font-bold text-slate-900">${filters.maxTuition.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={80000}
            step={1000}
            value={filters.maxTuition}
            onChange={(e) => setFilters({ ...filters, maxTuition: Number(e.target.value) })}
            className="w-full accent-slate-900"
          />
          <div className="mt-2 text-xs text-slate-500">Tip: set lower to find budget-friendly options.</div>
        </div>
      </div>

      {/* Results */}
      <div className="rounded-3xl border border-slate-200 bg-white p-3">
        {/* Top status row */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="text-xs text-slate-500">
            {rowsLoading ? "Loading…" : `${displayed.length} results`}
            {mode === "saved" && !savedLoading ? " (saved only)" : ""}
          </div>
          <button
            onClick={() => {
              refreshSaved();
              loadUniversities();
            }}
            className="text-xs font-bold px-3 py-2 rounded-full border border-slate-200 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-3 pb-3 space-y-2">
          {rowsLoading ? (
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading universities…
            </div>
          ) : rowsError ? (
            <div className="p-5 rounded-2xl bg-red-50 border border-red-100 text-red-700">
              {rowsError}
            </div>
          ) : displayed.length ? (
            displayed.map((uni) => {
              const isSaved = savedIds.has(uni.id);
              const isBusy = togglingId === uni.id;

              return (
                <div
                  key={uni.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-slate-900 transition flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 truncate">{uni.name}</h4>
                      {uni.intake ? (
                        <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                          {uni.intake}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-xs text-slate-500 mt-1">
                      {uni.countryCode}
                      {uni.ranking ? ` • Rank #${uni.ranking}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        ${Number(uni.tuitionYearUsd ?? 0).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase">per year</div>
                    </div>

                    <button
                      onClick={() => toggleSave(uni.id)}
                      className={`p-2 rounded-xl border transition ${
                        isSaved
                          ? "bg-yellow-50 border-yellow-200 text-yellow-700 hover:bg-yellow-100"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                      } ${isBusy ? "opacity-60 cursor-not-allowed" : ""}`}
                      title={isSaved ? "Unsave" : "Save"}
                      disabled={isBusy}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-slate-500 py-12">
              <Info className="mx-auto mb-2 opacity-60" />
              {mode === "saved"
                ? "No saved universities yet. Star some from 'All'."
                : "No universities match your criteria."}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
