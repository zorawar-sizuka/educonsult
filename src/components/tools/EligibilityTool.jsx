'use client';

import React, { useEffect, useMemo, useState } from 'react';

import ToolShell from './TipsShell';
import PillButton from './ui/PillButton';
import { SelectField } from './ui/Fields';

import { checkEligibility, clamp } from '@/app/data/toolsData';
import { logToolRun } from '@/hooks/toolRunClient'; 

import { CheckCircle, Minus, Plus, Star } from 'lucide-react';

export default function EligibilityTool({ countryOptions = [], countryMap = new Map(), restore }) {
  const [formData, setFormData] = useState({
    gpa: 3.0,
    englishScore: 6.5,
    languageLevel: '', // For JLPT (e.g., 'N1')
    destination: 'USA', // Default to consistent code
    testType: 'IELTS'
  });

  const [result, setResult] = useState(null);

  // Detect if Japan for conditional rendering
  const isJapan = formData.destination === 'JPN';

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

  // keep destination valid when options change
  useEffect(() => {
    if (!displayOptions?.length) return;
    const validDest = displayOptions.find(opt => opt.value === formData.destination)?.value;
    if (!validDest) {
      setFormData((prev) => ({ ...prev, destination: displayOptions[0].value }));
    }
  }, [displayOptions]);

  // Step 8 restore
  useEffect(() => {
    const payload = restore?.data; // Access via unified structure
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

  const handleTestChange = (e) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      testType: newType,
      englishScore: newType === 'PTE' ? 58 : 6.0, // Reset to min viable
      languageLevel: '' // Clear if switching back
    }));
    setResult(null);
  };

  const handleLanguageLevelChange = (e) => {
    setFormData(prev => ({
      ...prev,
      languageLevel: e.target.value
    }));
    setResult(null);
  };

  const handleCheck = () => {
    // Map JLPT to equivalent score for eligibility logic (optional; adjust based on checkEligibility)
    const adjustedData = isJapan 
      ? { ...formData, englishScore: formData.languageLevel ? mapJLPTToScore(formData.languageLevel) : 0 }
      : formData;

    const response = checkEligibility(adjustedData);
    if (response?.success) setResult(response.result);
    else setResult({ status: "Needs work", message: "Please re-check your inputs.", color: "bg-red-50 border-red-200 text-red-700" });

    // Step 7 log (include languageLevel for Japan)
    logToolRun({ toolType: "eligibility", payload: formData, result: response });
  };

  // Helper: Map JLPT to IELTS equiv score (customize as needed for checkEligibility)
  const mapJLPTToScore = (level) => {
    const mappings = { 'N1': 7.5, 'N2': 6.5, 'N3': 5.5, 'N4': 4.5, 'N5': 4.0 };
    return mappings[level] || 0;
  };

  return (
    <ToolShell
      title="Check your eligibility in seconds."
      description="Enter your GPA and language score. We'll instantly show a screening result and save runs for later comparison."
      ctaLabel="How it works"
      onCta={() => {}}
      leftExtra={
        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          This tool gives a fast screening based on common entry thresholds.
          Requirements vary by university, course, and intake —
        </p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="Destination"
          value={formData.destination}
          onChange={(v) => setFormData({ ...formData, destination: v, testType: 'IELTS', englishScore: 6.5, languageLevel: '' })}
          options={displayOptions}
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

        {/* Language Proficiency - Conditional for Japan */}
        <div className="md:col-span-2">
          <div className="flex items-end justify-between gap-4">
            <div className="w-full">
              <div className="text-sm font-medium text-slate-700 mb-2">
                {isJapan ? 'Japanese Proficiency' : 'English Test'}
              </div>
              <div className="rounded-xl border border-slate-300 bg-slate-100/70 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  {isJapan ? (
                    // JLPT Select for Japan
                    <select
                      value={formData.languageLevel}
                      onChange={handleLanguageLevelChange}
                      className="bg-transparent font-semibold text-slate-700 outline-none flex-1"
                    >
                      <option value="">Select JLPT Level</option>
                      <option value="N1">N1 (Advanced)</option>
                      <option value="N2">N2 (Upper Intermediate)</option>
                      <option value="N3">N3 (Intermediate)</option>
                      <option value="N4">N4 (Basic)</option>
                      <option value="N5">N5 (Beginner)</option>
                    </select>
                  ) : (
                    // IELTS/PTE Select for Others
                    <select
                      value={formData.testType}
                      onChange={handleTestChange}
                      className="bg-transparent font-semibold text-slate-700 outline-none flex-1"
                    >
                      <option value="IELTS">IELTS</option>
                      <option value="PTE">PTE</option>
                    </select>
                  )}
                  <div className="font-semibold text-slate-900 flex items-center gap-2 min-w-[80px]">
                    <Star className="w-4 h-4 text-slate-500" />
                    {isJapan 
                      ? formData.languageLevel || 'Select Level'
                      : formData.englishScore
                    }
                  </div>
                </div>

                {/* +/- Buttons Only for Non-Japan */}
                {!isJapan && (
                  <div className="flex gap-2">
                    <button onClick={() => adjustScore(formData.testType === 'PTE' ? -1 : -0.5)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                      <Minus className="w-4 h-4" />
                    </button>
                    <button onClick={() => adjustScore(formData.testType === 'PTE' ? 1 : 0.5)} className="p-2 rounded-lg hover:bg-white/70 border border-transparent hover:border-slate-200">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              {isJapan && (
                <p className="mt-2 text-xs text-slate-500">
                  Japan programs often require JLPT N2+ for non-English tracks.
                </p>
              )}
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