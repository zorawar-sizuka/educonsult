// "use client";

// import { useEffect, useState } from "react";

// export function useExchangeRate({ base = "USD", quote = "NPR" } = {}) {
//   const [rate, setRate] = useState(null);
//   const [meta, setMeta] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let cancelled = false;

//     async function load() {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`/api/meta/rate?base=${base}&quote=${quote}`, { cache: "no-store" });
//         const json = await res.json();

//         if (cancelled) return;

//         if (json?.ok) {
//           setRate(json.rate);
//           setMeta(json);
//         } else {
//           setError(json?.error || "Failed to load rate");
//         }
//       } catch {
//         if (!cancelled) setError("Failed to load rate");
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     }

//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, [base, quote]);

//   return { rate, meta, loading, error };
// }






// hooks/useExchangeRates.js (Optimized: Retry + Stale Fallback)
"use client";

import { useEffect, useState } from "react";

const MAX_RETRIES = 2; // Opt: Retry on transient errors

export function useExchangeRate({ base = "USD", quote = "NPR" } = {}) {
  const [rate, setRate] = useState(null);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Stale fallback: Use last meta on error
  const loadWithRetry = async (retries = 0) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/meta/rate?base=${base}&quote=${quote}`, { 
        cache: "no-store", // Fresh rates
        next: { revalidate: 300 } // Reval every 5min (rates fluctuate)
      });
      const json = await res.json();

      if (json?.ok) {
        setRate(json.rate);
        setMeta(json);
      } else {
        throw new Error(json?.error || "Failed to load rate");
      }
    } catch (e) {
      if (retries < MAX_RETRIES) {
        // Retry delay (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (retries + 1)));
        return loadWithRetry(retries + 1);
      }
      setError(e.message);
      // Fallback: Use last meta (stale but available)
      if (meta?.rate) {
        setRate(meta.rate); // Optimistic stale
        console.warn("Using stale rate:", e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWithRetry();
  }, [base, quote]);

  return { rate, meta, loading, error };
}