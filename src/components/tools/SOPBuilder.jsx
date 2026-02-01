'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ToolShell from './TipsShell';
import PillButton from './ui/PillButton';
import { TextInput, TextArea } from './ui/Fields';
import { generateSOP } from '@/app/data/toolsData';
import { logToolRun } from "@/hooks/toolRunClient";
import { ChevronRight, Download, X, Loader2, Save } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { getSessionId } from "@/hooks/toolRunClient"; 


export default function SOPBuilder({ restore }) {
  // --- Tips Data ---
  const sopTips = useMemo(() => ([
    "Start with a sharp opening: who you are + what you’re applying for + why it matters.",
    "Show proof, not claims: 1 achievement + the skills it demonstrates.",
    "Avoid generic praise. Mention specifics: modules, labs, professors, research groups (if known).",
    "Keep it structured: Motivation → Evidence → Why program → Goals. No messy storytelling.",
    "End with clarity: what you’ll do after graduation and how it connects to your background."
  ]), []);

  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(prev => (prev + 1) % sopTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sopTips.length]);

  // --- Form Data State ---
  const [data, setData] = useState({
    name: '',
    university: '',
    course: '',
    country: '',
    passion: '',
    achievement: ''
  });

  // --- UI States ---
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);     // Main generate button spinner
  const [downloading, setDownloading] = useState(false); // Modal download button spinner
  const [saving, setSaving] = useState(false);       // Save button spinner
  const [saveMsg, setSaveMsg] = useState('');
  const [lastRunId, setLastRunId] = useState(null);
  const isFormValid = Object.values(data).every(v => String(v).trim() !== '');

 // Fixed restore: use restore.data instead of restore.payload
 useEffect(() => {
  if (restore?.data) {
    setData(prev => ({ ...prev, ...restore.data }));
  }
}, [restore?.ts]);

  // --- Handlers ---

  // 1. Generate: Opens modal ONLY (Does not download)
  const handleGenerate = async () => {
    if (!isFormValid) return;

    setLoading(true);
    setSaveMsg(''); // Clear previous messages
    
    // Log the request
    await logToolRun({ toolType: "sop", payload: data, result: { status: "requested" } }); 
    const logRes = await logToolRun({ 
      toolType: "sop", 
      payload: data, 
      result: { status: "requested" } 
    });
    if (logRes?.ok && logRes?.run?.id) {
      setLastRunId(logRes.run.id);
    }

    // Artificial delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    setShowModal(true);
    setLoading(false);
  };

  // 2. Save: Saves to history (Logic restored from reference)
  const handleSave = async () => {
    if (!lastRunId) {
      setSaveMsg("No SOP to save yet");
      return;
    }
    setSaving(true);
    setSaveMsg("");
  
    try {
      const sessionId = getSessionId();
      const res = await fetch("/api/tools/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          runId: lastRunId,
          action: "save",
          sessionId,
        }),
      });
      const json = await res.json();
      setSaveMsg(json.ok ? "Saved! Check History → Saved." : "Save failed");
    } catch {
      setSaveMsg("Save failed — try again");
    } finally {
      setSaving(false);
    }
  };

  // 3. Download: Triggers PDF generation (Only inside modal)
  const handleDownload = async () => {
    setDownloading(true);
    
    // Log the success
    logToolRun({ toolType: "sop", payload: data, result: { status: "generated" } });
    const logRes = await logToolRun({ 
      toolType: "sop", 
      payload: data, 
      result: { status: "generated" } 
    });
    if (logRes?.ok && logRes?.run?.id) {
      setLastRunId(logRes.run.id);
    }
    // Actual PDF Trigger
    const result = generateSOP(data);

    if (!result?.success) {
      setSaveMsg("Download failed. Please try again.");
    }

    setDownloading(false);
  };

  // --- Tips Component ---
  const TipsSwiper = () => (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">SOP Tips</div>
        <button onClick={() => setTipIndex(prev => (prev + 1) % sopTips.length)} className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1">
          Next <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tipIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-sm text-slate-700 leading-relaxed min-h-[56px]"
        >
          {sopTips[tipIndex]}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 text-xs text-slate-400 font-semibold">{tipIndex + 1}/{sopTips.length}</div>
    </div>
  );

  return (
    <>
      <ToolShell
        title="Generate a professional SOP draft"
        description="Fill essentials → Preview formatted SOP → Download branded PDF"
        leftExtra={<TipsSwiper />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput label="Full Name" placeholder="e.g. Jane Smith" value={data.name} onChange={v => setData(prev => ({ ...prev, name: v }))} />
          <TextInput label="Target Country" placeholder="e.g. United Kingdom" value={data.country} onChange={v => setData(prev => ({ ...prev, country: v }))} />

          <TextInput label="Target University" placeholder="e.g. University of Oxford" value={data.university} onChange={v => setData(prev => ({ ...prev, university: v }))} />
          <TextInput label="Target Course" placeholder="e.g. MSc Computer Science" value={data.course} onChange={v => setData(prev => ({ ...prev, course: v }))} />

          <div className="md:col-span-2">
            <TextArea label="Core Passion" placeholder="What drives you in this field? (2-4 sentences)" rows={4} value={data.passion} onChange={v => setData(prev => ({ ...prev, passion: v }))} />
          </div>

          <div className="md:col-span-2">
            <TextArea label="Key Achievement" placeholder="One strong example: project, award, internship (with impact)" rows={4} value={data.achievement} onChange={v => setData(prev => ({ ...prev, achievement: v }))} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <PillButton onClick={handleGenerate} disabled={!isFormValid || loading} className="w-full py-4">
              {loading ? <Loader2 className="mx-auto w-5 h-5 animate-spin" /> : "Generate & Preview SOP"}
            </PillButton>

            {!isFormValid && <p className="text-sm text-center text-slate-500">Fill all fields to generate</p>}
            {saveMsg && !showModal && <p className="text-sm text-center text-emerald-600 font-medium">{saveMsg}</p>}
          </div>
        </div>
      </ToolShell>

      {/* --- Premium Responsive Modal --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 md:p-6 overflow-hidden"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
              className="relative w-full max-w-5xl h-full max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              
              {/* 1. Modal Header */}
              <div className="flex-none bg-white border-b border-slate-100 p-4 md:p-5 flex justify-between items-center z-10">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">SOP Preview</h2>
                  <p className="text-xs md:text-sm text-slate-500 hidden md:block">Review content before downloading final PDF</p>
                </div>
                <button 
                  onClick={() => setShowModal(false)} 
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              {/* 2. Scrollable Content Area */}
              <div className="flex-1 overflow-y-auto bg-slate-100/50 p-4 md:p-8">
                {/* Paper Representation */}
                <div className="max-w-3xl mx-auto bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 rounded-sm min-h-[800px]">
                  
                  {/* Document Header */}
                  <div className="bg-slate-900 text-white p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                      <div>
                        <h1 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">Statement of Purpose</h1>
                        <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest font-semibold">{data.course}</p>
                      </div>
                      <div className="text-right hidden md:block">
                        <p className="text-slate-400 text-sm">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Document Body */}
                  <div className="p-8 md:p-12 space-y-8 text-slate-800 font-serif leading-relaxed">
                    
                    {/* Introduction Paragraph */}
                    <p className="text-lg">
                      My name is <strong className="font-sans text-slate-900">{data.name}</strong>, and I am writing to express my strong interest in the <strong className="font-sans text-slate-900">{data.course}</strong> program at <strong className="font-sans text-slate-900">{data.university}</strong>.
                    </p>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-100 font-sans">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant</span>
                        <p className="font-medium text-slate-900">{data.name}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location Target</span>
                        <p className="font-medium text-slate-900">{data.country}</p>
                      </div>
                    </div>

                    {/* Main Sections */}
                    <section>
                      <h3 className="font-sans text-sm font-bold uppercase text-slate-900 mb-3 tracking-wide">Motivation</h3>
                      <p className="text-slate-700">{data.passion ? `My motivation for pursuing this field comes from ${data.passion}. Over time, this interest has shaped the way I learn, the projects I choose, and the problems I want to solve.` : "..."}</p>
                    </section>

                    <section>
                      <h3 className="font-sans text-sm font-bold uppercase text-slate-900 mb-3 tracking-wide">Experience & Achievement</h3>
                      <p className="text-slate-700">{data.achievement ? `A defining achievement in my journey is ${data.achievement}. This experience strengthened my discipline, problem-solving ability, and confidence to perform at a higher academic standard.` : "..."}</p>
                    </section>

                    <section>
                      <h3 className="font-sans text-sm font-bold uppercase text-slate-900 mb-3 tracking-wide">Why {data.university || 'This University'}</h3>
                      <p className="text-slate-700">I am applying to this program because it aligns with my goals and provides the academic depth I need to grow. I am particularly excited to build stronger foundations and apply them to real-world challenges.</p>
                    </section>

                    <section>
                      <h3 className="font-sans text-sm font-bold uppercase text-slate-900 mb-3 tracking-wide">Future Goals</h3>
                      <p className="text-slate-700">My short-term goal is to excel in graduate studies and gain practical experience. My long-term goal is to contribute meaningfully through impactful work in my field, applying the skills and perspective I gain from this program.</p>
                    </section>

                    {/* Signature Area */}
                    <div className="pt-12 mt-12 border-t border-slate-100">
                      <p className="italic text-slate-600">Sincerely,</p>
                      <p className="text-xl font-bold mt-4 font-sans">{data.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Modal Footer (Restored Logic) */}
              <div className="flex-none bg-white border-t border-slate-100 p-4 md:p-6 flex flex-col md:flex-row gap-3">
                 {/* SAVE BUTTON */}
                 <PillButton 
                  onClick={handleSave} 
                  disabled={saving} 
                  variant="outline" // Optional: makes it distinct from download
                  className="flex-1 py-4 bg-black border-slate-200 text-white hover:bg-slate-700"
                >
                   {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                   {saving ? "Saving..." : "Save & Compare Later"}
                </PillButton>

                {/* DOWNLOAD BUTTON */}
                <PillButton 
                  onClick={handleDownload} 
                  disabled={downloading} 
                  className="flex-[2] py-4 shadow-lg shadow-blue-500/20"
                >
                  {downloading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Download className="w-5 h-5 mr-2" />
                  )}
                  {downloading ? "Generating PDF..." : "Download Final PDF"}
                </PillButton>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}