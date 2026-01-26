// "use client";

// import { useEffect, useMemo, useState } from "react";

// const safeArray = (v) => (Array.isArray(v) ? v : []);

// export function useCountries() {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await fetch("/api/meta/countries", { cache: "no-store" });
//         const json = await res.json();

//         if (!cancelled) {
//           if (json?.ok) setCountries(safeArray(json.countries));
//           else setError(json?.error || "Failed to load countries");
//         }
//       } catch {
//         if (!cancelled) setError("Failed to load countries");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const countryOptions = useMemo(
//     () => countries.map((c) => c.code),
//     [countries]
//   );

//   const countryMap = useMemo(() => {
//     const m = new Map();
//     for (const c of countries) m.set(c.code, c);
//     return m;
//   }, [countries]);

//   return { countries, countryOptions, countryMap, loading, error };
// }




// hooks/useCountries.js (Optimized: Global Cache + Offline Fallback)
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

const safeArray = (v) => (Array.isArray(v) ? v : []);
const COUNTRIES_CACHE_KEY = "countries_cache_v1"; // Version for invalidation

// Helper: Get cached countries (with TTL, e.g., 24h)
const getCachedCountries = () => {
  try {
    const cached = localStorage.getItem(COUNTRIES_CACHE_KEY);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    const ttl = 24 * 60 * 60 * 1000; // 24h
    return Date.now() - timestamp < ttl ? data : null;
  } catch {
    return null;
  }
};

// Helper: Set cache
const setCachedCountries = (data) => {
  try {
    localStorage.setItem(COUNTRIES_CACHE_KEY, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  } catch {}
};

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load from cache first (optimistic)
  useEffect(() => {
    const cached = getCachedCountries();
    if (cached) {
      setCountries(safeArray(cached));
      setLoading(false); // Still fetch fresh in bg
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/meta/countries", { 
        cache: "no-store", // Fresh always
        next: { revalidate: 3600 } // ISR: Reval every hour (prod opt)
      });
      const json = await res.json();

      if (json?.ok) {
        const data = safeArray(json.countries);
        setCountries(data);
        setCachedCountries(data); // Cache for offline
      } else {
        setError(json?.error || "Failed to load countries");
        // Fallback to cache on error
        const cached = getCachedCountries();
        if (cached) setCountries(cached);
      }
    } catch (e) {
      setError("Failed to load countries");
      // Fallback to cache
      const cached = getCachedCountries();
      if (cached) setCountries(cached);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const countryOptions = useMemo(
    () => countries.map((c) => c.code),
    [countries]
  );

  const countryMap = useMemo(() => {
    const m = new Map();
    for (const c of countries) m.set(c.code, c);
    return m;
  }, [countries]);

  return { countries, countryOptions, countryMap, loading, error, refresh };
} 






