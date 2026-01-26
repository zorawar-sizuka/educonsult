



// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import { AnimatePresence } from 'framer-motion';
// import Lottie from "lottie-react";
// import {
//   Calculator, Search, CheckCircle, AlertCircle, FileText, History, GraduationCap
// } from 'lucide-react';

// import { useCountries } from '@/hooks/useCountries';

// import EligibilityTool from '@/components/tools/EligibilityTool';
// import DiscoveryTool from '@/components/tools/DiscoveryTool';
// import CostTool from '@/components/tools/CostTool';
// import SOPBuilder from '@/components/tools/SOPBuilder';
// import GPACalculator from '@/components/tools/GPA'; // <--- Import the new component
// import HistoryDrawer from '@/components/tools/HistoryDrawer';

// const lottieUrl = "/lottie/tools.json";

// export default function ToolsPage() {
//   const [activeTab, setActiveTab] = useState('eligibility');
//   const [animationData, setAnimationData] = useState(null);

//   // History drawer + restore payloads
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [restoreEligibility, setRestoreEligibility] = useState(null);
//   const [restoreCost, setRestoreCost] = useState(null);
//   const [restoreSop, setRestoreSop] = useState(null);

//   const { countryOptions, countryMap, loading: countriesLoading, error: countriesError } = useCountries();

//   const fallbackCountryOptions = useMemo(() => ([
//     'USA', 'UK', 'Australia', 'New Zealand', 'Canada'
//   ]), []);

//   const effectiveCountryOptions = countryOptions?.length ? countryOptions : fallbackCountryOptions;

//   useEffect(() => {
//     fetch(lottieUrl)
//       .then(res => res.json())
//       .then(setAnimationData)
//       .catch(() => setAnimationData(null));
//   }, []);

//   const handleRestore = (run) => {
//     if (!run?.toolType) return;

//     if (run.toolType === "eligibility") {
//       setActiveTab("eligibility");
//       setRestoreEligibility({ payload: run.payload, ts: Date.now() });
//     }

//     if (run.toolType === "cost") {
//       setActiveTab("calculator");
//       setRestoreCost({ payload: run.payload, ts: Date.now() });
//     }

//     if (run.toolType === "sop") {
//       setActiveTab("sop");
//       setRestoreSop({ payload: run.payload, ts: Date.now() });
//     }
    
//     // Note: GPA Calculator currently doesn't have history integration in this request, 
//     // but can be added similarly if needed.

//     setHistoryOpen(false);
//   };

//   const tabs = [
//     { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
//     { id: 'discovery', label: 'University Finder', icon: Search },
//     { id: 'calculator', label: 'Cost Estimator', icon: Calculator },
//     { id: 'gpa', label: 'GPA Calculator', icon: GraduationCap }, // <--- New Tab
//     { id: 'sop', label: 'SOP Builder', icon: FileText },
//   ];

//   return (
//     <div className="min-h-screen bg-white px-5 md:px-10 py-12 font-sans">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-10">
//           <div className="w-[220px] md:w-[260px] mt-20">
//             {animationData && <Lottie animationData={animationData} loop />}
//           </div>

//           <h1 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight -mt-6">
//             <span className="text-blue-600 italic">AI Toolkit</span>
//           </h1>

//           <p className="mt-3 text-slate-500 max-w-2xl">
//             SaaS-style tools for students: dynamic country data, GPA conversion, cost estimation, and document generation.
//           </p>

//           {/* Status chips */}
//           <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
//             <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 font-bold">
//               Countries: {countriesLoading ? 'Loading…' : (countryOptions?.length ? 'DB' : 'Fallback')}
//             </span>
//             {countriesError ? (
//               <span className="px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 font-bold flex items-center gap-1">
//                 <AlertCircle className="w-3 h-3" /> {countriesError}
//               </span>
//             ) : (
//               <span className="px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold">
//                 Data Ready
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Tabs row + History */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
//           <div className="flex flex-wrap gap-2 justify-center md:justify-start">
//             {tabs.map((t) => (
//               <button
//                 key={t.id}
//                 onClick={() => setActiveTab(t.id)}
//                 className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition
//                   ${activeTab === t.id
//                     ? 'bg-slate-900 text-white border-slate-900'
//                     : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
//                   }`}
//               >
//                 <t.icon className="w-4 h-4" />
//                 {t.label}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => setHistoryOpen(true)}
//             className="mx-auto md:mx-0 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50"
//           >
//             <History className="w-4 h-4" />
//             History & Saved
//           </button>
//         </div>

//         {/* Tool Area */}
//         <div className="rounded-[28px] border border-slate-200 overflow-hidden bg-white">
//           <AnimatePresence mode="wait">
//             {activeTab === 'eligibility' && (
//               <EligibilityTool
//                 key="eligibility"
//                 countryOptions={effectiveCountryOptions}
//                 restore={restoreEligibility}
//               />
//             )}

//             {activeTab === 'discovery' && <DiscoveryTool key="discovery" />}

//             {activeTab === 'calculator' && (
//               <CostTool
//                 key="calculator"
//                 countryOptions={effectiveCountryOptions}
//                 countryMap={countryMap}
//                 restore={restoreCost}
//               />
//             )}

//             {activeTab === 'gpa' && (
//               <GPACalculator key="gpa" /> // <--- Render the GPA Calculator
//             )}

//             {activeTab === 'sop' && (
//               <SOPBuilder
//                 key="sop"
//                 restore={restoreSop}
//               />
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <HistoryDrawer
//         open={historyOpen}
//         onClose={() => setHistoryOpen(false)}
//         activeTab={activeTab}
//         onRestore={handleRestore}
//       />
//     </div>
//   );
// }











'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import {
  Calculator, Search, Sparkles, FileText, History, GraduationCap,
  ArrowRight, Globe, CheckCircle2
} from 'lucide-react';

import { useCountries } from '@/hooks/useCountries';

// --- Tool Imports ---
import EligibilityTool from '@/components/tools/EligibilityTool';
import DiscoveryTool from '@/components/tools/DiscoveryTool';
import CostTool from '@/components/tools/CostTool';
import SOPBuilder from '@/components/tools/SOPBuilder';
import GPACalculator from '@/components/tools/GPA';
import HistoryDrawer from '@/components/tools/HistoryDrawer'; 



const lottieUrl = "/lottie/tools.json";

export default function ToolsPage() { 
  const { refresh: refreshCountries } = useCountries();

  const [activeTab, setActiveTab] = useState('eligibility');
  const [animationData, setAnimationData] = useState(null);
  
  // History & Restore State (Unified)
  const [historyOpen, setHistoryOpen] = useState(false);
  const [restorePayload, setRestorePayload] = useState(null); // Single state for all

  // Data Hooks
  const { countryOptions, countryMap } = useCountries();

  const fallbackCountryOptions = useMemo(() => ([
    'USA', 'UK', 'AUS', 'CAN', 'DEU', 'JPN', 'NZL' 
  ]), []);
  const effectiveCountryOptions = countryOptions?.length ? countryOptions : fallbackCountryOptions;

  useEffect(() => {
    fetch(lottieUrl)
      .then(res => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  const handleRestore = (run) => {
    if (!run?.toolType) return;
    const toolMap = {
      'eligibility': 'eligibility',
      'cost': 'calculator',
      'sop': 'sop',
      'gpa': 'gpa'
    };
    if (toolMap[run.toolType]) {
      setActiveTab(toolMap[run.toolType]);
      setRestorePayload({ type: run.toolType, data: run.payload, ts: Date.now() });
    }
    setHistoryOpen(false);
  };

  // --- Configuration: Navigation Deck ---
  // Adjusted colors to pop against a pure white background
  const tabs = [
    { id: 'eligibility', label: 'Eligibility', desc: 'Visa Chances', icon: Sparkles, activeColor: 'bg-emerald-50 border-emerald-200 text-emerald-900', iconColor: 'text-emerald-600' },
    { id: 'discovery', label: 'Uni Finder', desc: 'Search DB', icon: Search, activeColor: 'bg-blue-50 border-blue-200 text-blue-900', iconColor: 'text-blue-600' },
    { id: 'calculator', label: 'Budget', desc: 'Cost Est.', icon: Calculator, activeColor: 'bg-orange-50 border-orange-200 text-orange-900', iconColor: 'text-orange-600' },
    { id: 'gpa', label: 'GPA', desc: 'Converter', icon: GraduationCap, activeColor: 'bg-purple-50 border-purple-200 text-purple-900', iconColor: 'text-purple-600' },
    { id: 'sop', label: 'SOP Gen', desc: 'AI Writer', icon: FileText, activeColor: 'bg-rose-50 border-rose-200 text-rose-900', iconColor: 'text-rose-600' },
  ];

  // Helper: Get restore for specific tool
  const getRestoreForTool = (toolType) => restorePayload?.type === toolType ? restorePayload : null;

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-black selection:text-white  mt-20">
      
      {/* Subtle Noise Texture for Premium Feel (Optional, can remove for pure flat white) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0 mix-blend-multiply" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">

        {/* --- 1. HERO SECTION --- */}
        <header className="mb-12 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font  text-sm md:text-sm text-black-500 mb-3">
                [ The Student Suite ]
              </h2>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tighter leading-[0.95] text-black">
                Global Ambitions, <br />
                <span className="text-stone-400 transition-colors duration-500 hover:text-black cursor-default">
                  Strategized.
                </span>
              </h1>
            </motion.div>

            <p className="text-lg text-stone-600 leading-relaxed max-w-xl border-l-2 border-stone-200 pl-6 mt-6">
              Our AI-powered consultant tools help you assess visa eligibility, 
              estimate living costs, and draft the perfect SOP—all in one place.
            </p>
          </div>

          {/* Animation & Data Block (Right Side) */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            
            {/* The Lottie */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-6">
               {animationData && <Lottie animationData={animationData} loop />}
               
             
            </div>

            {/* The "Technical Text" Block (Inspired by image) */}
            <div className="flex items-center gap-6 text-xs font-mono text-stone-400 uppercase tracking-widest border-t border-stone-100 pt-4 w-full lg:w-auto justify-center lg:justify-end">
               <div className="flex flex-col items-center lg:items-end">
                  <span className="text-black font-bold text-sm">{effectiveCountryOptions.length} Regions</span>
                  <span>Database Ready</span>
               </div>
               <div className="h-8 w-px bg-stone-200" />
               <div className="flex flex-col items-center lg:items-end">
                  <span className="text-blue-600 font-bold text-sm">v2.4</span>
                  <span>Algorithm Updated</span>
               </div>
            </div>

          </div>
        </header>


        {/* --- 2. NAVIGATION DECK (Responsive) --- */}
        {/* 'sticky' keeps it pinned. 'overflow-x-auto' handles mobile scrolling. */}
        <div className="sticky top-4 z-40 -mx-5 px-5 sm:mx-0 sm:px-0 mb-8">
          <div className="
            flex items-center gap-3 p-2.5 
            bg-stone-50/90 backdrop-blur-xl border border-stone-200/60 
            rounded-2xl shadow-sm overflow-x-auto no-scrollbar
          ">
            
            {/* Scrollable Tabs Container */}
            <div className="flex flex-nowrap items-center gap-2 min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? `${tab.activeColor} shadow-sm ring-1 ring-black/5` 
                        : 'bg-transparent text-stone-800 hover:bg-white hover:text-stone-900 hover:shadow-sm'
                      }
                    `}
                  >
                    <tab.icon 
                      className={`w-5 h-5 transition-colors ${isActive ? 'text-current' : 'text-black group-hover:text-stone-600'}`} 
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    
                    <div className="text-left leading-none">
                      <span className="block text-sm font-bold tracking-tight">{tab.label}</span>
                      <span className={`text-[10px] uppercase tracking-wider opacity-70 hidden sm:block ${isActive ? 'font-medium' : ''}`}>
                        {tab.desc}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-current opacity-40 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Vertical Divider (Desktop Only) */}
            <div className="hidden md:block w-px h-8 bg-stone-300 mx-2" />

            {/* Archives Button (Pushed Right) */}
            <button
              onClick={() => setHistoryOpen(true)}
              className="
                hidden md:flex ml-auto items-center gap-2.5 px-5 py-3 
                rounded-xl bg-white border border-stone-200 
                text-stone-600 font-medium hover:border-stone-400 hover:text-black 
                transition-all duration-300 group min-w-[130px] justify-between
              "
            >
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
                <span className="text-sm">History</span>
              </div>
              <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </button> 

            <button 
  onClick={refreshCountries}
  className="px-4 py-2 rounded-full bg-slate-900 text-white font-bold text-sm hover:bg-black transition"
>
  Refresh Countries
</button>
          </div>
        </div>


        {/* --- 3. MAIN TOOL CANVAS --- */}
        <main className="min-h-[600px] mb-20">
           <motion.div 
              layout
              className="bg-white rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-100 overflow-hidden relative"
           >
              {/* Premium Gradient Top Border */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-stone-100 via-stone-400 to-stone-100 opacity-30" />
              
              <div className="p-4 sm:p-8 lg:p-12 min-h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    {activeTab === 'eligibility' && (
                      <EligibilityTool
                        key="eligibility"
                        countryOptions={effectiveCountryOptions}
                        countryMap={countryMap}
                        restore={getRestoreForTool('eligibility')} // Unified via helper
                      />
                    )}
                    {activeTab === 'discovery' && <DiscoveryTool />}
                    {activeTab === 'calculator' && (
                      <CostTool
                        key="calculator"
                        countryOptions={effectiveCountryOptions}
                        countryMap={countryMap}
                        restore={getRestoreForTool('cost')} // Unified
                      />
                    )}
                    {activeTab === 'gpa' && (
                      <GPACalculator 
                        key="gpa" 
                        restore={getRestoreForTool('gpa')} // Add if GPA supports restore
                      />
                    )}
                    {activeTab === 'sop' && (
                      <SOPBuilder 
                        key="sop"
                        restore={getRestoreForTool('sop')} // Unified
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
           </motion.div>
        </main>

        {/* Mobile Floating History Button (Visible only on small screens) */}
        <button
          onClick={() => setHistoryOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          <History className="w-6 h-6" />
        </button>

      </div>

      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        activeTab={activeTab}
        onRestore={handleRestore}
      />
    </div>
  );
}