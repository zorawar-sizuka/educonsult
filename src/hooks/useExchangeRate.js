"use client";

import { useEffect, useState } from "react";

export function useExchangeRate({ base = "USD", quote = "NPR" } = {}) {
  const [rate, setRate] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(`/api/meta/rate?base=${base}&quote=${quote}`, { cache: "no-store" });
        const json = await res.json();

        if (cancelled) return;

        if (json?.ok) {
          setRate(json.rate);
          setMeta(json);
        } else {
          setError(json?.error || "Failed to load rate");
        }
      } catch {
        if (!cancelled) setError("Failed to load rate");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [base, quote]);

  return { rate, meta, loading, error };
}
