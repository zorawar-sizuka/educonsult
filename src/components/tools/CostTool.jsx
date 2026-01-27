'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ToolShell from './TipsShell';
import PillButton from './ui/PillButton';
import { SelectField, Slider } from './ui/Fields';

import { livingCosts } from '@/app/data/toolsData'; 
import { tutionCosts } from '@/app/data/toolsData';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { logToolRun } from '@/hooks/toolRunClient';

export default function CostTool({ countryOptions = [], countryMap = new Map(), restore }) {
  const [inputs, setInputs] = useState({
    country: countryOptions?.[0] || 'AUS', // Default to seeded code
    duration: 2
  });

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Restore from history
  useEffect(() => {
    const payload = restore?.data; // Access via unified structure
    if (!payload) return;
    setInputs(prev => ({ ...prev, ...payload }));
    setSaveMsg("");
  }, [restore?.ts]);

  // Live cached rate (USD->NPR)
  const { rate: usdToNpr, meta: rateMeta, loading: rateLoading } =
    useExchangeRate({ base: "USD", quote: "NPR" });

  // FIXED: Standardize fallback to codes only (no names to avoid dups)
  const fallbackCodes = ['USA', 'UK', 'AUS', 'CAN', 'DEU', 'JPN', 'NZL'];
  const effectiveCodes = countryOptions?.length ? countryOptions : fallbackCodes;

  // FIXED: Always transform to {value, label}—label from map, fallback to code if missing
  const displayOptions = useMemo(() => {
    return effectiveCodes.map(code => ({
      value: code,
      label: countryMap.get(code)?.name || code.toUpperCase() // Uppercase codes for fallback (e.g., "USA")
    }));
  }, [effectiveCodes, countryMap]);

  // Keep country valid
  useEffect(() => {
    if (!displayOptions?.length) return;
    const validCountry = displayOptions.find(opt => opt.value === inputs.country)?.value;
    if (!validCountry) {
      setInputs(prev => ({ ...prev, country: displayOptions[0].value }));
    }
  }, [displayOptions]);

  const selected = countryMap?.get(inputs.country);

  const livingMonthlyUsd =
    selected?.livingCostMonthlyUsd ??
    (livingCosts?.[inputs.country] ?? 1200);

  // ---- Per-year costs ----
  const livingYearUsd = livingMonthlyUsd * 12;


/////SONUS CHANGES APPLIED HERE////
const tutionMonthlyUsd =
selected?.tutionCostMonthlyUsd ??
(tutionCosts?.[inputs.country] ?? 1200); 

const tuitionYearUsd = tutionMonthlyUsd * 2 ; // placeholder for now


/////SONUS CHANGES APPLIED HERE////
  // ---- Program total (multiplies by duration) ---- 
  const totalYearUsd = livingYearUsd + tuitionYearUsd;
  const durationYears = Number(inputs.duration) || 1;
  const programTotalUsd = totalYearUsd * durationYears;

  const safeRate = typeof usdToNpr === "number" ? usdToNpr : 134.5;
  const totalYearNpr = totalYearUsd * safeRate;
  const programTotalNpr = programTotalUsd * safeRate;

  // Result object we will save on click
  const computed = useMemo(() => ({
    livingMonthlyUsd,
    livingYearUsd, 
    tutionMonthlyUsd,
    tuitionYearUsd,
    totalYearUsd,
    programTotalUsd,
    totalYearNpr,
    programTotalNpr,
    durationYears,
    rateUsed: safeRate,
    rateFetchedAt: rateMeta?.fetchedAt ?? null,
  }), [
    livingMonthlyUsd,
    livingYearUsd, 
    tutionMonthlyUsd,
    tuitionYearUsd,
    totalYearUsd,
    programTotalUsd,
    totalYearNpr,
    programTotalNpr,
    durationYears,
    safeRate,
    rateMeta?.fetchedAt,
  ]);

  // Save ONLY on button click (no auto logging spam)
  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");

    const payload = { ...inputs };
    const result = { ...computed };

    const res = await logToolRun({
      toolType: "cost",
      payload,
      result,
      saved: true, // ⭐ mark as saved
    });

    if (res?.ok) setSaveMsg("Saved! Open History → Saved to compare.");
    else setSaveMsg("Could not save. Try again.");

    setSaving(false);
  };

  return (
    <ToolShell
      title="Estimate your study budget (USD → NPR)."
      description="Uses DB living-cost baselines + a cached live exchange rate. Save your estimate to compare later."
      ctaLabel="Learn budgeting"
      onCta={() => {}}
      leftExtra={
        <div className="text-xs text-slate-500">
          Rate: {rateLoading ? 'Loading…' : `1 USD ≈ ${safeRate.toFixed(2)} NPR`}
          {rateMeta?.fetchedAt ? ` • Updated ${new Date(rateMeta.fetchedAt).toLocaleString()}` : ''}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Destination"
          value={inputs.country}
          onChange={(v) => setInputs({ ...inputs, country: v })}
          options={displayOptions} // FIXED: Uses value/label—no dups!
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-medium text-slate-700">Estimated (total for duration)</div>

          <div className="mt-2 text-2xl font-serif text-slate-900">
            NPR {programTotalNpr.toLocaleString()}
          </div>

          <div className="mt-1 text-sm text-slate-600">
            ≈ ${programTotalUsd.toLocaleString()} USD / {durationYears} years
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Per year: NPR {totalYearNpr.toLocaleString()} (≈ ${totalYearUsd.toLocaleString()} USD)
          </div>
        </div>

        <div className="md:col-span-2">
          <Slider
            label={`Course Duration: ${inputs.duration} years`}
            value={inputs.duration}
            onChange={(v) => setInputs({ ...inputs, duration: v })}
            min={1}
            max={5}
            step={0.5}
          />
        </div>

        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-slate-500">Living (monthly)</div>
              <div className="font-bold">${livingMonthlyUsd.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-500">Living (yearly)</div>
              <div className="font-bold">${livingYearUsd.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-500">Tuition (yearly)</div>
              <div className="font-bold">${tuitionYearUsd.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-slate-500">Total (yearly)</div>
              <div className="font-bold">${totalYearUsd.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <PillButton onClick={handleSave} className="w-full py-4" disabled={saving}>
            {saving ? "Saving…" : "Looks good — save & compare"}
          </PillButton>

          {saveMsg && (
            <div className="mt-3 text-sm text-slate-600">
              {saveMsg}
            </div>
          )}
        </div>
{/* 
        <div className="md:col-span-2 text-xs text-slate-500">
          Living cost is {selected?.livingCostMonthlyUsd ? "from DB" : "fallback"}.
          Tuition is a placeholder for now (we'll connect it to University DB later).
        </div> */}
      </div>
    </ToolShell>
  );
}