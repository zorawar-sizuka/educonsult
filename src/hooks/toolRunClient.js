"use client";

const KEY = "edu_soft_session_id";

function makeId() {
  // Simple, good enough (not security-sensitive)
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getSessionId() {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = makeId();
    localStorage.setItem(KEY, id);
  }
  return id;
}

export async function logToolRun({ toolType, payload, result, saved = false }) {
    try {
      const sessionId = getSessionId();
  
      const res = await fetch("/api/tools/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType, sessionId, payload, result, saved }),
      });
  
      return await res.json();
    } catch {
      return { ok: false };
    }
  }
  
