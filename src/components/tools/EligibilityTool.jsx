'use client';

import React, { useEffect, useState } from 'react';


import ToolShell from './ToolsShell';
import PillButton from './ui/PillButton';
import { SelectField } from './ui/Fields';

import { checkEligibility, clamp } from '@/app/data/toolsData';
import { logToolRun } from '@/hooks/toolRunClient'; 

import { CheckCircle, Minus, Plus, Star,  } from 'lucide-react';


export default function EligibilityTool({ countryOptions = [], restore }) {
  const [formData, setFormData] = useState({
    gpa: 3.0,
    englishScore: 6.5,
    jlpt: '',
    destination: countryOptions?.[0] || 'USA',
    testType: 'IELTS'
  });

  const [result, setResult] = useState(null);

  // keep destination valid when options change
  useEffect(() => {
    if (!countryOptions?.length) return;
    setFormData((prev) => countryOptions.includes(prev.destination)
      ? prev
      : { ...prev, destination: countryOptions[0] }
    );
  }, [countryOptions]);

  // Step 8 restore
  useEffect(() => {
    const payload = restore?.payload;
    if (!payload) return;
    setFormData((prev) => ({ ...prev, ...payload }));
    setResult(null);
  }, [restore?.ts]);

  const adjustGpa = (delta) => {
    setFormData(prev => ({
      ...prev,
      gpa: clamp(parseFloat((prev.gpa + delta).toFixed(1)), 0, 4.0)
    }));
    setResult(null);
  };

  const adjustScore = (delta) => {
    const max = formData.testType === 'PTE' ? 90 : 9.0;
    setFormData(prev => ({
      ...prev,
      englishScore: clamp(parseFloat((prev.englishScore + delta).toFixed(1)), 0, max)
    }));
    setResult(null);
  };

  const handleCheck = () => {
    const response = checkEligibility(formData);
    if (response?.success) setResult(response.result);
    else setResult({ status: "Needs work", message: "Please re-check your inputs.", color: "bg-red-50 border-red-200 text-red-700" });

    // Step 7 log
    logToolRun({ toolType: "eligibility", payload: formData, result: response });
  };

  return (
    <ToolShell
    title="Check your eligibility in seconds."
    description="Enter your GPA and language score. We’ll instantly show a screening result and save runs for later comparison."
    ctaLabel="How it works"
    onCta={() => {}}
    leftExtra={
      <p className="mt-4 text-sm text-slate-600 leading-relaxed">
        This tool gives a fast screening based on common entry thresholds (not a final admission decision).
        Requirements vary by university, course, and intake — use this as your starting point and refine with our team.
      </p>
    }
  >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Destination"
          value={formData.destination}
          onChange={(v) => setFormData({ ...formData, destination: v })}
          options={countryOptions.length ? countryOptions : ['USA', 'UK', 'Australia', 'Canada', 'New Zealand', 'Germany']}
        />

        {/* GPA */}
        <div>
          <div className="text-sm font-medium text-slate-700 mb-2">GPA (4.0 scale)</div>
          <div className="rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-slate-900">{formData.gpa.toFixed(1)}</div>
            <div className="flex gap-2">
              <button onClick={() => adjustGpa(-0.1)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                <Minus className="w-4 h-4" />
              </button>
              <button onClick={() => adjustGpa(0.1)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Language score */}
        <div className="md:col-span-2">
          <div className="flex items-end justify-between gap-4">
            <div className="w-full">
              <div className="text-sm font-medium text-slate-700 mb-2">English Test</div>
              <div className="rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <select
                    value={formData.testType}
                    onChange={(e) => setFormData({ ...formData, testType: e.target.value, englishScore: 6.0 })}
                    className="bg-transparent font-semibold text-slate-700 outline-none"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="PTE">PTE</option>
                  </select>
                  <div className="font-semibold text-slate-900 flex items-center gap-2">
                    <Star className="w-4 h-4 text-slate-500" />
                    {formData.englishScore}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button onClick={() => adjustScore(formData.testType === 'PTE' ? -1 : -0.5)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                    <Minus className="w-4 h-4" />
                  </button>
                  <button onClick={() => adjustScore(formData.testType === 'PTE' ? 1 : 0.5)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <PillButton onClick={handleCheck} className="w-full py-4">
            Analyze Profile
          </PillButton>
        </div>

        {result && (
          <div className={`md:col-span-2 rounded-2xl border p-5 flex gap-3 items-start ${
            result.color || "bg-slate-50 border-slate-200 text-slate-800"
          }`}>
            <CheckCircle className="w-5 h-5 mt-0.5" />
            <div>
              <div className="font-bold">{result.status}</div>
              <div className="text-sm opacity-90 mt-1">{result.message}</div>
            </div>
          </div>
        )}
      </div>
    </ToolShell>
  );
}
