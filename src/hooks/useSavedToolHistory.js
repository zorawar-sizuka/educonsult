"use client";

import { useEffect, useState } from "react";
import { getSessionId } from "@/hooks/toolRunClient";

const safeArray = (v) => (Array.isArray(v) ? v : []);

export function useSavedToolHistory({ toolType = "", take = 25 } = {}) {
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

      const res = await fetch(`/api/tools/saved/history?${qs.toString()}`, { cache: "no-store" });
      const json = await res.json();

      if (json?.ok) setRuns(safeArray(json.runs));
      else setError(json?.error || "Failed");
    } catch {
      setError("Failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, [toolType, take]);

  return { runs, loading, error, refresh };
}