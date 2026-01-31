'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ToolShell from './TipsShell';
import PillButton from './ui/PillButton';
import { SelectField, Slider } from './ui/Fields';

import { livingCosts, tutionCosts } from '@/app/data/toolsData'; 
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { logToolRun } from '@/hooks/toolRunClient';

export default function CostTool({ countryOptions = [], countryMap = new Map(), restore }) {
  const [inputs, setInputs] = useState({
    country: countryOptions?.[0] || 'AUS',
    duration: 2
  });

  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // NEW: Detect if we have real DB data
  const hasDbData = countryOptions.length > 0;

  // Restore from history
  useEffect(() => {
    const payload = restore?.data;
    if (!payload) return;
    setInputs(prev => ({ ...prev, ...payload }));
    setSaveMsg("");
  }, [restore?.ts]);

  const { rate: usdToNpr, meta: rateMeta, loading: rateLoading } =
    useExchangeRate({ base: "USD", quote: "NPR" });

  // Fallback codes if no DB countries
  const fallbackCodes = ['USA', 'UK', 'AUS', 'CAN', 'DEU', 'JPN', 'NZL'];
  const effectiveCodes = hasDbData ? countryOptions : fallbackCodes;

  const displayOptions = useMemo(() => {
    return effectiveCodes.map(code => ({
      value: code,
      label: countryMap.get(code)?.name || code // Clean label (DB name > code)
    }));
  }, [effectiveCodes, countryMap]);

  // Auto-correct invalid country
  useEffect(() => {
    if (!displayOptions.length) return;
    const valid = displayOptions.some(opt => opt.value === inputs.country);
    if (!valid) {
      setInputs(prev => ({ ...prev, country: displayOptions[0].value }));
    }
  }, [displayOptions, inputs.country]);

  const selected = countryMap.get(inputs.country);

  // KEY CHANGE: Prefer DB if we have any DB data at all
  const livingMonthlyUsd = hasDbData
    ? (selected?.livingCostMonthlyUsd ?? 1200) // Trust DB (default if missing)
    : (livingCosts?.[inputs.country] ?? 1200);

  const tutionMonthlyUsd = hasDbData
    ? (selected?.tutionCostMonthlyUsd ?? 1200) // Trust DB (default if missing)
    : (tutionCosts?.[inputs.country] ?? 1200);

  // Costs calculations
  const livingYearUsd = livingMonthlyUsd * 12;
  const tuitionYearUsd = tutionMonthlyUsd * 2; // Keeping your placeholder logic

  const totalYearUsd = livingYearUsd + tuitionYearUsd;
  const durationYears = Number(inputs.duration) || 1;
  const programTotalUsd = totalYearUsd * durationYears;

  const safeRate = typeof usdToNpr === "number" ? usdToNpr : 134.5;
  const totalYearNpr = totalYearUsd * safeRate;
  const programTotalNpr = programTotalUsd * safeRate;

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
    livingMonthlyUsd, livingYearUsd, tutionMonthlyUsd, tuitionYearUsd,
    totalYearUsd, programTotalUsd, totalYearNpr, programTotalNpr,
    durationYears, safeRate, rateMeta?.fetchedAt
  ]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");

    const payload = { ...inputs };
    const result = { ...computed };

    const res = await logToolRun({
      toolType: "cost",
      payload,
      result,
      saved: true,
    });

    setSaveMsg(res?.ok ? "Saved! Check History → Saved." : "Save failed. Try again.");
    setSaving(false);
  };

  return (
    <ToolShell
      title="Estimate your study budget (USD → NPR)"
      description="Live DB costs when available • Cached exchange rate"
      leftExtra={
        <div className="text-xs text-slate-500">
          Rate: {rateLoading ? 'Loading…' : `1 USD ≈ ${safeRate.toFixed(2)} NPR`}
          {rateMeta?.fetchedAt && ` • Updated ${new Date(rateMeta.fetchedAt).toLocaleString()}`}
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Destination"
          value={inputs.country}
          onChange={(v) => setInputs(prev => ({ ...prev, country: v }))}
          options={displayOptions}
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="text-sm font-medium text-slate-700">Total estimate ({durationYears} years)</div>
          <div className="mt-2 text-2xl font-serif text-slate-900">
            NPR {programTotalNpr.toLocaleString()}
          </div>
          <div className="mt-1 text-sm text-slate-600">
            ≈ ${programTotalUsd.toLocaleString()} USD
          </div>
          <div className="mt-3 text-xs text-slate-500">
            Per year: NPR {totalYearNpr.toLocaleString()} (≈ ${totalYearUsd.toLocaleString()} USD)
          </div>
        </div>

        <div className="md:col-span-2">
          <Slider
            label={`Course Duration: ${inputs.duration} years`}
            value={inputs.duration}
            onChange={(v) => setInputs(prev => ({ ...prev, duration: v }))}
            min={1}
            max={5}
            step={0.5}
          />
        </div>

        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div><div className="text-slate-500">Living (monthly)</div><div className="font-bold">${livingMonthlyUsd.toLocaleString()}</div></div>
            <div><div className="text-slate-500">Living (yearly)</div><div className="font-bold">${livingYearUsd.toLocaleString()}</div></div>
            <div><div className="text-slate-500">Tuition (yearly)</div><div className="font-bold">${tuitionYearUsd.toLocaleString()}</div></div>
            <div><div className="text-slate-500">Total (yearly)</div><div className="font-bold">${totalYearUsd.toLocaleString()}</div></div>
          </div>
        </div>

        <div className="md:col-span-2">
          <PillButton onClick={handleSave} className="w-full py-4" disabled={saving}>
            {saving ? "Saving…" : "Looks good — save & compare"}
          </PillButton>
          {saveMsg && <div className="mt-3 text-sm text-slate-600">{saveMsg}</div>}
        </div>

        {/* Optional debug indicator (remove in prod if you want) */}
        {false && (
          <div className="md:col-span-2 text-xs text-slate-500">
            Costs source: {hasDbData ? "Database" : "Static fallback (DB unavailable)"}
            {hasDbData && selected?.livingCostMonthlyUsd == null && " (defaulted missing values)"}
          </div>
        )}
      </div>
    </ToolShell>
  );
}