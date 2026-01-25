"use client";

import { useEffect, useMemo, useState } from "react";

const safeArray = (v) => (Array.isArray(v) ? v : []);

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/meta/countries", { cache: "no-store" });
        const json = await res.json();

        if (!cancelled) {
          if (json?.ok) setCountries(safeArray(json.countries));
          else setError(json?.error || "Failed to load countries");
        }
      } catch {
        if (!cancelled) setError("Failed to load countries");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const countryOptions = useMemo(
    () => countries.map((c) => c.code),
    [countries]
  );

  const countryMap = useMemo(() => {
    const m = new Map();
    for (const c of countries) m.set(c.code, c);
    return m;
  }, [countries]);

  return { countries, countryOptions, countryMap, loading, error };
}
