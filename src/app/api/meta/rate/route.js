import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const CACHE_HOURS = 12;

// Free provider (no key). If you want to swap providers later, you only edit fetchRateFromProvider().
async function fetchRateFromProvider(base, quote) {
  // Example provider: open.er-api.com
  // Returns JSON with { rates: { NPR: number, ... } }
  const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Provider failed: ${res.status}`);

  const json = await res.json();
  const rate = json?.rates?.[quote];

  if (!rate || typeof rate !== "number") throw new Error("Rate missing from provider response");
  return { rate, provider: "open.er-api.com" };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const base = (searchParams.get("base") || "USD").toUpperCase();
    const quote = (searchParams.get("quote") || "NPR").toUpperCase();

    // 1) Read cached rate
    const cached = await prisma.exchangeRate.findUnique({
      where: { base_quote: { base, quote } }, // uses @@unique([base, quote])
    });

    const now = Date.now();
    const freshMs = CACHE_HOURS * 60 * 60 * 1000;

    if (cached?.fetchedAt) {
      const age = now - new Date(cached.fetchedAt).getTime();
      if (age < freshMs) {
        return NextResponse.json({
          ok: true,
          base,
          quote,
          rate: cached.rate,
          fetchedAt: cached.fetchedAt,
          provider: cached.provider,
          cached: true,
        });
      }
    }

    // 2) Fetch new rate
    const { rate, provider } = await fetchRateFromProvider(base, quote);

    // 3) Upsert cache
    const saved = await prisma.exchangeRate.upsert({
      where: { base_quote: { base, quote } },
      update: { rate, fetchedAt: new Date(), provider },
      create: { base, quote, rate, provider },
    });

    return NextResponse.json({
      ok: true,
      base,
      quote,
      rate: saved.rate,
      fetchedAt: saved.fetchedAt,
      provider: saved.provider,
      cached: false,
    });
  } catch (e) {
    // 4) If provider fails, return last cached if available (graceful)
    try {
      const fallback = await prisma.exchangeRate.findUnique({
        where: { base_quote: { base: "USD", quote: "NPR" } },
      });

      if (fallback) {
        return NextResponse.json({
          ok: true,
          base: "USD",
          quote: "NPR",
          rate: fallback.rate,
          fetchedAt: fallback.fetchedAt,
          provider: fallback.provider,
          cached: true,
          warning: "Provider failed; served last cached rate",
        });
      }
    } catch (_) {}

    return NextResponse.json(
      { ok: false, error: "Failed to load exchange rate" },
      { status: 500 }
    );
  }
}
