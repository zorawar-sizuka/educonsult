
"use client";

import { motion } from "framer-motion";
import { Info, Star, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getSessionId, logToolRun } from "@/hooks/toolRunClient";

const safeArray = (v) => (Array.isArray(v) ? v : []);

export default function DiscoveryTool({ restore }) {
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

  // Restore logic: if restore prop has payload (filters), apply it
  useEffect(() => {
    if (restore?.data) {
      setFilters(restore.data.filters || { country: "All", maxTuition: 55000 });
      setMode("all"); // or restore mode if saved in payload
    }
  }, [restore?.ts]);

  // Fetch saved universities IDs
  const refreshSaved = async () => {
    setSavedLoading(true);
    try {
      const res = await fetch(`/api/universities/saved?sessionId=${encodeURIComponent(sessionId)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (json.ok && Array.isArray(json.universities)) {
        const ids = new Set(json.universities.map((u) => u.id));
        setSavedIds(ids);
      } else {
        setSavedIds(new Set());
      }
    } catch {
      setSavedIds(new Set());
    } finally {
      setSavedLoading(false);
    }
  };

  // Load universities (public filtered)
  const loadUniversities = async () => {
    setRowsLoading(true);
    setRowsError("");
    try {
      const qs = new URLSearchParams();
      if (filters.country !== "All") qs.set("country", filters.country);
      qs.set("maxTuition", String(filters.maxTuition));
      qs.set("take", "120");

      const endpoint = mode === "saved" 
        ? `/api/universities/saved?sessionId=${encodeURIComponent(sessionId)}&${qs.toString()}`
        : `/api/universities?${qs.toString()}`;

      const res = await fetch(endpoint, { cache: "no-store" });
      const json = await res.json();

      if (!json?.ok) {
        setRows([]);
        setRowsError(json?.error || "Failed to load universities");
      } else {
        const unis = safeArray(mode === "saved" ? json.universities : json.universities);
        setRows(unis);
        // Log search as "finder" run for history (only in "all" mode to avoid spam)
        if (mode === "all") {
          logToolRun({
            toolType: "finder",
            payload: { filters, mode: "search" },
            result: { count: unis.length },
          });
        }
      }
    } catch (err) {
      console.error(err);
      setRows([]);
      setRowsError("Network error");
    } finally {
      setRowsLoading(false);
    }
  };

  useEffect(() => {
    refreshSaved();
  }, [sessionId]);

  useEffect(() => {
    loadUniversities();
  }, [filters.country, filters.maxTuition, mode, sessionId]);

  const displayed = rows;

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
        const url = `/api/universities/save?sessionId=${encodeURIComponent(sessionId)}&universityId=${universityId}`;
        await fetch(url, { method: "DELETE" });
      }
      // Log save action as finder run
      await logToolRun({
        toolType: "finder",
        payload: { universityId, action: isSaved ? "unsave" : "save" },
        result: { success: true },
        saved: !isSaved,
      });
    } catch {
      await refreshSaved(); // Revert
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 md:p-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">University Finder</h2>
          <p className="text-slate-600 mt-2">
            Explore global universities, filter by budget & country, and build your shortlist.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-100 rounded-full p-1.5">
          <button
            onClick={() => setMode("all")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition ${
              mode === "all" ? "bg-white shadow-md text-slate-900" : "text-slate-600"
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setMode("saved")}
            className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition ${
              mode === "saved" ? "bg-white shadow-md text-slate-900" : "text-slate-600"
            }`}
          >
            My Shortlist
            <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold">
              {savedIds.size}
            </span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
          <select
            value={filters.country}
            onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white focus:ring-4 focus:ring-slate-900/10 focus:border-slate-900 transition"
          >
            <option value="All">All Countries</option>
            <option value="USA">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="AUS">Australia</option>
            <option value="CAN">Canada</option>
            <option value="DEU">Germany</option>
            <option value="JPN">Japan</option>
            <option value="NZL">New Zealand</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Max Annual Tuition: ${filters.maxTuition.toLocaleString()}
          </label>
          <input
            type="range"
            min="0"
            max="80000"
            step="5000"
            value={filters.maxTuition}
            onChange={(e) => setFilters(prev => ({ ...prev, maxTuition: Number(e.target.value) }))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="text-sm text-slate-600">
            {rowsLoading ? "Loading..." : `${displayed.length} universities`}
          </p>
          <button
            onClick={() => {
              refreshSaved();
              loadUniversities();
            }}
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Refresh
          </button>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {rowsLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400" />
            </div>
          ) : rowsError ? (
            <div className="p-12 text-center text-red-600">{rowsError}</div>
          ) : displayed.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <Info className="w-12 h-12 mx-auto mb-4 opacity-50" />
              {mode === "saved" ? "Your shortlist is empty. Star universities to save them." : "No universities match your filters."}
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {displayed.map((uni) => {
                const isSaved = savedIds.has(uni.id);
                const isBusy = togglingId === uni.id;

                return (
                  <div
                    key={uni.id}
                    className="p-6 hover:bg-slate-50/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-lg font-bold text-slate-900 truncate">{uni.name}</h4>
                        {uni.intake && (
                          <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700">
                            {uni.intake}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {uni.countryCode} {uni.ranking && `• Global Rank #${uni.ranking}`}
                      </p>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        <p className="text-xl font-bold text-slate-900">
                          ${Number(uni.tuitionYearUsd ?? 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">per year</p>
                      </div>

                      <button
                        onClick={() => toggleSave(uni.id)}
                        disabled={isBusy}
                        className={`p-3 rounded-xl border transition ${
                          isSaved
                            ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                            : "bg-white border-slate-300 text-slate-500 hover:text-slate-900"
                        } ${isBusy ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        {isBusy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Star className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}