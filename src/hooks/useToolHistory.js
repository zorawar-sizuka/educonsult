// "use client";

// import { useEffect, useState } from "react";
// import { getSessionId } from "@/hooks/toolRunClient";

// const safeArray = (v) => (Array.isArray(v) ? v : []);

// export function useToolHistory({ toolType = "", take = 10, savedOnly = false }) {
//   const [runs, setRuns] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const refresh = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const sessionId = getSessionId();
//       const qs = new URLSearchParams();
//       qs.set("sessionId", sessionId);
//       if (toolType) qs.set("toolType", toolType);
//       qs.set("take", String(take)); 
//       qs.set("savedOnly", savedOnly ? "1" : "0");

//       const res = await fetch(`/api/tools/history?${qs.toString()}`, { cache: "no-store" });
//       const json = await res.json();

//       if (json?.ok) setRuns(safeArray(json.runs));
//       else setError(json?.error || "Failed to load history");
//     } catch {
//       setError("Failed to load history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refresh();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [toolType, take, savedOnly]);
// }






"use client";

import { useEffect, useState } from "react";
import { getSessionId } from "@/hooks/toolRunClient";

const safeArray = (v) => (Array.isArray(v) ? v : []);

export function useToolHistory({ toolType = "", take = 10, savedOnly = false } = {}) {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");

    try {
      const sessionId = getSessionId();
      const qs = new URLSearchParams();
      qs.set("sessionId", sessionId);
      if (toolType) qs.set("toolType", toolType);
      qs.set("take", String(take));
      qs.set("savedOnly", savedOnly ? "1" : "0");

      const res = await fetch(`/api/tools/history?${qs.toString()}`, { cache: "no-store" });
      const json = await res.json();

      if (json?.ok) setRuns(safeArray(json.runs));
      else setError(json?.error || "Failed to load history");
    } catch {
      setError("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toolType, take, savedOnly]);

  // ✅ Always return an object, never undefined
  return { runs, loading, error, refresh };
}
