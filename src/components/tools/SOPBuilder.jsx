'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ToolShell from './TipsShell';
import PillButton from './ui/PillButton';
import { TextInput, TextArea } from './ui/Fields';

import { generateSOP } from '@/app/data/toolsData';
import { getSessionId, logToolRun } from "@/hooks/toolRunClient"; 
import { ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';



export default function SOPBuilder({ restore }) {  

   

    const sopTips = useMemo(() => ([
        "Start with a sharp opening: who you are + what you’re applying for + why it matters.",
        "Show proof, not claims: 1 achievement + the skills it demonstrates.",
        "Avoid generic praise. Mention specifics: modules, labs, professors, research groups (if known).",
        "Keep it structured: Motivation → Evidence → Why program → Goals. No messy storytelling.",
        "End with clarity: what you’ll do after graduation and how it connects to your background."
      ]), []);
      
      const [tipIndex, setTipIndex] = useState(0);
      
      useEffect(() => {
        const t = setInterval(() => {
          setTipIndex((i) => (i + 1) % sopTips.length);
        }, 4500);
        return () => clearInterval(t);
      }, [sopTips.length]);
      


    const [template, setTemplate] = useState(null);
    const [draftId, setDraftId] = useState(null);
    const [tplLoading, setTplLoading] = useState(true);

  const [data, setData] = useState({
    name: '',
    university: '',
    course: '',
    country: '',
    passion: '',
    achievement: ''
  });
  function TipsSwiper({ title, tips, index, onNext }) {
    return (
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {title}
          </div>
          <button
            type="button"
            onClick={onNext}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1"
          >
            Next <ChevronRight className="w-3 h-3" />
          </button>
        </div>
  
        <div className="mt-2 min-h-[56px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-slate-700 leading-relaxed"
            >
              {tips[index]}
            </motion.div>
          </AnimatePresence>
        </div>
  
        <div className="mt-3 text-xs text-slate-400 font-semibold">
          {index + 1}/{tips.length}
        </div>
      </div>
    );
  }
  
  const isFormValid = Object.values(data).every(v => String(v).trim() !== '');

  // Step 8 restore
  useEffect(() => {
    const payload = restore?.payload;
    if (!payload) return;
    setData(prev => ({ ...prev, ...payload }));
  }, [restore?.ts]);

  useEffect(() => {
    let cancelled = false;
  
    (async () => {
      setTplLoading(true);
      try {
        const res = await fetch("/api/sop/template", { cache: "no-store" });
        const text = await res.text();
const json = text ? JSON.parse(text) : null;

        if (!cancelled && json?.ok) setTemplate(json.template);
      } finally {
        if (!cancelled) setTplLoading(false);
      }
    })();
  
    return () => { cancelled = true; };
  }, []);
  
  const saveDraft = async (generatedText = null) => {
    if (!template?.id) return;
  
    const payload = {
      templateId: template.id,
      draftId,
      sessionId: getSessionId(),
      inputs: data,
      generated: generatedText,
    };
  
    const res = await fetch("/api/sop/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (json?.ok && json?.draft?.id) setDraftId(json.draft.id);
  };

  const handleGenerate = async () => {
    // log request + save input draft first
    logToolRun({ toolType: "sop", payload: data, result: { status: "requested" } });
    await saveDraft(null);
  
    // your existing PDF generation
    const gen = generateSOP(data); // keep your existing function
  
    // save "generated" status
    await saveDraft("Generated via PDF export"); // later we’ll store full text
    logToolRun({ toolType: "sop", payload: data, result: { status: "generated" } });
  
    return gen;
  };

  return (
    <ToolShell
    title="Generate a professional SOP draft."
    description="Fill the essentials. We’ll build a clean narrative and generate a downloadable document. Every run is saved to History."
    ctaLabel="SOP Tips"
    onCta={() => setTipIndex((i) => (i + 1) % sopTips.length)}
    leftExtra={
      <TipsSwiper
        title="SOP Tips"
        tips={sopTips}
        index={tipIndex}
        onNext={() => setTipIndex((i) => (i + 1) % sopTips.length)}
      />
    }
  >
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextInput label="Full Name" placeholder="Jane Smith" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <TextInput label="Target Country" placeholder="United Kingdom" value={data.country} onChange={(v) => setData({ ...data, country: v })} />

        <TextInput label="Target University" placeholder="University of XYZ" value={data.university} onChange={(v) => setData({ ...data, university: v })} />
        <TextInput label="Target Course" placeholder="MSc Data Science" value={data.course} onChange={(v) => setData({ ...data, course: v })} />

        <div className="md:col-span-2">
          <TextArea label="Core Passion" placeholder="What excites you about the field?" value={data.passion} onChange={(v) => setData({ ...data, passion: v })} rows={4} />
        </div>

        <div className="md:col-span-2">
          <TextArea label="Key Achievement" placeholder="A project / award / internship that proves you’re serious." value={data.achievement} onChange={(v) => setData({ ...data, achievement: v })} rows={4} />
        </div>

        <div className="md:col-span-2">
        <PillButton onClick={handleGenerate} disabled={!isFormValid || tplLoading} className="w-full py-4">
  {tplLoading ? "Loading template…" : "Generate & Download SOP"}
</PillButton>

        </div>
      </div>
    </ToolShell>
  );
}
