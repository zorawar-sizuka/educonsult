


// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Lottie from "lottie-react";
// import {
//   Calculator, Search, Sparkles, FileText, History, GraduationCap,
//   ArrowRight
// } from 'lucide-react';

// // --- Tool Imports ---
// import EligibilityTool from '@/components/tools/EligibilityTool';
// import DiscoveryTool from '@/components/tools/DiscoveryTool';
// import CostTool from '@/components/tools/CostTool';
// import SOPBuilder from '@/components/tools/SOPBuilder';
// import GPACalculator from '@/components/tools/GPA';
// import HistoryDrawer from '@/components/tools/HistoryDrawer';
// import { useCountries } from '@/hooks/useCountries';

// const lottieUrl = "/lottie/tools.json";

// export default function ToolsPage() {
//   const [activeTab, setActiveTab] = useState('eligibility');
//   const [animationData, setAnimationData] = useState(null);

//   // Unified restore state across all tools
//   const [restorePayload, setRestorePayload] = useState(null); // { type: DB toolType, data: payload, ts: timestamp }

//   // History drawer
//   const [historyOpen, setHistoryOpen] = useState(false);

//   // Countries data
//   const { countryOptions, countryMap } = useCountries();

//   const fallbackCountryOptions = useMemo(() => ([
//     'USA', 'UK', 'AUS', 'CAN', 'DEU', 'JPN', 'NZL'
//   ]), []);
//   const effectiveCountryOptions = countryOptions?.length ? countryOptions : fallbackCountryOptions;

//   useEffect(() => {
//     fetch(lottieUrl)
//       .then(res => res.json())
//       .then(setAnimationData)
//       .catch(() => setAnimationData(null));
//   }, []);

//   // Robust restore handler – switches tab if needed and forces fresh payload
//   const handleRestore = (run) => {
//     if (!run?.toolType || !run?.payload) return;

//     // Map DB toolType → tab id
//     const toolMap = {
//       eligibility: 'eligibility',
//       cost: 'calculator',
//       sop: 'sop',
//       gpa: 'gpa',
//       finder: 'discovery',
//     };

//     const targetTab = toolMap[run.toolType];
//     if (!targetTab) {
//       console.warn('Unknown toolType for restore:', run.toolType);
//       return;
//     }

//     if (targetTab !== activeTab) {
//       setActiveTab(targetTab);
//     }

//     setRestorePayload({
//       type: run.toolType,
//       data: run.payload,
//       result: run.result || null,
//       ts: Date.now(),
//     });

//     setHistoryOpen(false);
//   };

//   const getRestoreForTool = (toolType) => {
//     return restorePayload?.type === toolType ? restorePayload : null;
//   };

//   // --- Navigation Tabs Config ---
//   const tabs = [
//     { id: 'eligibility', label: 'Eligibility', desc: 'Visa Chances', icon: Sparkles, activeColor: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
//     { id: 'discovery', label: 'Uni Finder', desc: 'Search DB', icon: Search, activeColor: 'bg-blue-50 border-blue-200 text-blue-900' },
//     { id: 'calculator', label: 'Budget', desc: 'Cost Est.', icon: Calculator, activeColor: 'bg-orange-50 border-orange-200 text-orange-900' },
//     { id: 'gpa', label: 'GPA', desc: 'Converter', icon: GraduationCap, activeColor: 'bg-purple-50 border-purple-200 text-purple-900' },
//     { id: 'sop', label: 'SOP Gen', desc: 'AI Writer', icon: FileText, activeColor: 'bg-rose-50 border-rose-200 text-rose-900' },
//   ];

//   return (
//     <div className="min-h-screen bg-white text-[#1a1a1a] font-sans selection:bg-black selection:text-white mt-20">
//       {/* Subtle Noise Texture */}
//       <div
//         className="fixed inset-0 pointer-events-none opacity-[0.015] z-0 mix-blend-multiply"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
//         {/* HERO SECTION */}
//         <header className="mb-12 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
//           <div className="lg:col-span-7 space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <h2 className="font text-sm md:text-sm text-black-500 mb-3">
//                 [ The Student Suite ]
//               </h2>

//               <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tighter leading-[0.95] text-black">
//                 Global Ambitions, <br />
//                 <span className="text-stone-400 transition-colors duration-500 hover:text-black cursor-default">
//                   Strategized.
//                 </span>
//               </h1>
//             </motion.div>

//             <p className="text-lg text-stone-600 leading-relaxed max-w-xl border-l-2 border-stone-200 pl-6 mt-6">
//               Our AI-powered consultant tools help you assess visa eligibility,
//               estimate living costs, and draft the perfect SOP—all in one place.
//             </p>
//           </div>

//           <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
//             <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-6">
//               {animationData && <Lottie animationData={animationData} loop />}
//             </div>

//             <div className="flex items-center gap-6 text-xs font-mono text-stone-400 uppercase tracking-widest border-t border-stone-100 pt-4 w-full lg:w-auto justify-center lg:justify-end">
//               <div className="flex flex-col items-center lg:items-end">
//                 <span className="text-black font-bold text-sm">{effectiveCountryOptions.length} Countries</span>
//                 <span>Database Ready</span>
//               </div>
//               <div className="h-8 w-px bg-stone-200" />
//               <div className="flex flex-col items-center lg:items-end">
//                 <span className="text-blue-600 font-bold text-sm">v2.4</span>
//                 <span>Algorithm Updated</span>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* NAVIGATION DECK */}
//         <div className="sticky top-4 z-40 -mx-5 px-5 sm:mx-0 sm:px-0 mb-8">
//           <div className="
//             flex items-center gap-3 p-2.5
//             bg-stone-50/90 backdrop-blur-xl border border-stone-200/60
//             rounded-2xl shadow-sm overflow-x-auto no-scrollbar
//           ">
//             {/* Everything in one scrollable row, including History at the end */}
//             <div className="flex flex-nowrap items-center gap-2 min-w-max">
//               {tabs.map((tab) => {
//                 const isActive = activeTab === tab.id;
//                 return (
//                   <button
//                     key={tab.id}
//                     type="button"
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`
//                       relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group
//                       ${isActive
//                         ? `${tab.activeColor} shadow-sm ring-1 ring-black/5`
//                         : 'bg-transparent text-stone-800 hover:bg-white hover:text-stone-900 hover:shadow-sm'
//                       }
//                     `}
//                   >
//                     <tab.icon
//                       className={`w-5 h-5 transition-colors ${isActive ? 'text-current' : 'text-black group-hover:text-stone-600'}`}
//                       strokeWidth={isActive ? 2 : 1.5}
//                     />

//                     <div className="text-left leading-none">
//                       <span className="block text-sm font-bold tracking-tight">{tab.label}</span>
//                       <span className={`text-[10px] uppercase tracking-wider opacity-70 hidden sm:block ${isActive ? 'font-medium' : ''}`}>
//                         {tab.desc}
//                       </span>
//                     </div>

//                     {isActive && (
//                       <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-current opacity-40 ml-2" />
//                     )}
//                   </button>
//                 );
//               })}

//               {/* Divider before History */}
//               <div className="w-px h-8 bg-stone-300/80 mx-1 hidden sm:block" />

//               {/* ✅ History inside the same dock (always visible) */}
//               <button
//                 type="button"
//                 onClick={() => setHistoryOpen(true)}
//                 className="
//                   flex items-center gap-2.5 px-4 py-3
//                   rounded-xl bg-white border border-stone-200
//                   text-stone-700 font-medium
//                   hover:border-stone-400 hover:text-black
//                   transition-all duration-300 group
//                 "
//               >
//                 <History className="w-4 h-4 text-stone-400 group-hover:text-black transition-colors" />
//                 <span className="text-sm hidden sm:inline">History</span>
//                 <ArrowRight className="w-3 h-3 hidden sm:inline opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* MAIN TOOL CANVAS */}
//         <main className="min-h-[600px] mb-20">
//           <motion.div
//             layout
//             className="bg-white rounded-3xl shadow-xl shadow-stone-200/40 border border-stone-100 overflow-hidden relative"
//           >
//             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-stone-100 via-stone-400 to-stone-100 opacity-30" />

//             <div className="p-4 sm:p-8 lg:p-12 min-h-[500px]">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeTab}
//                   initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
//                   animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
//                   exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
//                   transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
//                 >
//                   {activeTab === 'eligibility' && (
//                     <EligibilityTool
//                       countryOptions={effectiveCountryOptions}
//                       countryMap={countryMap}
//                       restore={getRestoreForTool('eligibility')}
//                     />
//                   )}
//                   {activeTab === 'discovery' && (
//                     <DiscoveryTool
//                       restore={getRestoreForTool('finder')}
//                     />
//                   )}
//                   {activeTab === 'calculator' && (
//                     <CostTool
//                       countryOptions={effectiveCountryOptions}
//                       countryMap={countryMap}
//                       restore={getRestoreForTool('cost')}
//                     />
//                   )}
//                   {activeTab === 'gpa' && (
//                     <GPACalculator
//                       restore={getRestoreForTool('gpa')}
//                     />
//                   )}
//                   {activeTab === 'sop' && (
//                     <SOPBuilder
//                       restore={getRestoreForTool('sop')}
//                     />
//                   )}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </motion.div>
//         </main>
//       </div>

//       {/* History Drawer */}
//       <HistoryDrawer
//         open={historyOpen}
//         onClose={() => setHistoryOpen(false)}
//         activeTab={activeTab}
//         onTabChange={setActiveTab}
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
  ArrowRight
} from 'lucide-react';

// --- Tool Imports ---
import EligibilityTool from '@/components/tools/EligibilityTool';
import DiscoveryTool from '@/components/tools/DiscoveryTool';
import CostTool from '@/components/tools/CostTool';
import SOPBuilder from '@/components/tools/SOPBuilder';
import GPACalculator from '@/components/tools/GPA';
import HistoryDrawer from '@/components/tools/HistoryDrawer';
import { useCountries } from '@/hooks/useCountries';

const lottieUrl = "/lottie/tools.json";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('eligibility');
  const [animationData, setAnimationData] = useState(null);

  // Unified restore state across all tools
  const [restorePayload, setRestorePayload] = useState(null);

  // History drawer
  const [historyOpen, setHistoryOpen] = useState(false);

  // Countries data
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
    if (!run?.toolType || !run?.payload) return;

    const toolMap = {
      eligibility: 'eligibility',
      cost: 'calculator',
      sop: 'sop',
      gpa: 'gpa',
      finder: 'discovery',
    };

    const targetTab = toolMap[run.toolType];
    if (!targetTab) return;

    if (targetTab !== activeTab) {
      setActiveTab(targetTab);
    }

    setRestorePayload({
      type: run.toolType,
      data: run.payload,
      result: run.result || null,
      ts: Date.now(),
    });

    setHistoryOpen(false);
  };

  const getRestoreForTool = (toolType) => {
    return restorePayload?.type === toolType ? restorePayload : null;
  };

  // ──────────────────────────────────────────────
  //  Navigation Tabs Config – brand color family
  // ──────────────────────────────────────────────
  const tabs = [
    { 
      id: 'eligibility', 
      label: 'Eligibility', 
      desc: 'Visa Chances', 
      icon: Sparkles, 
      activeColor: 'bg-[#0c38b0]/10 border-[#0c38b0]/30 text-[#0c38b0]' 
    },
    { 
      id: 'discovery', 
      label: 'Uni Finder', 
      desc: 'Search DB', 
      icon: Search, 
      activeColor: 'bg-[#ef6926]/10 border-[#ef6926]/30 text-[#ef6926]' 
    },
    { 
      id: 'calculator', 
      label: 'Budget', 
      desc: 'Cost Est.', 
      icon: Calculator, 
      activeColor: 'bg-[#0c38b0]/10 border-[#0c38b0]/30 text-[#0c38b0]' 
    },
    { 
      id: 'gpa', 
      label: 'GPA', 
      desc: 'Converter', 
      icon: GraduationCap, 
      activeColor: 'bg-[#ef6926]/10 border-[#ef6926]/30 text-[#ef6926]' 
    },
    { 
      id: 'sop', 
      label: 'SOP Gen', 
      desc: 'AI Writer', 
      icon: FileText, 
      activeColor: 'bg-[#0c38b0]/10 border-[#0c38b0]/30 text-[#0c38b0]' 
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans selection:bg-[#0c38b0]/20 selection:text-white mt-20">
      {/* Subtle Noise Texture */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.008] z-0 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 lg:py-16">
        {/* HERO SECTION */}
        <header className="mb-12 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-sm md:text-base font-semibold text-[black] tracking-wide mb-3">
                [ The Student Suite ]
              </h2>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[0.92] text-[#0c38b0]">
                Global Ambitions, <br />
                <span className="text-[#ef6926] transition-colors duration-500">
                  Strategized.
                </span>
              </h1>
            </motion.div>

            <p className="text-lg text-gray-700 leading-relaxed max-w-xl border-l-4 border-[#0c38b0]/30 pl-6 mt-6">
              Our AI-powered consultant tools help you assess visa eligibility,
              estimate living costs, and draft the perfect SOP—all in one place.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 mb-6">
              {animationData && (
                <div className="relative">
                  <Lottie 
                    animationData={animationData} 
                    loop 
                    className="w-full h-full"
                  />
                  {/* subtle brand overlay on lottie */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0c38b0]/8 to-[#ef6926]/6 pointer-events-none rounded-full mix-blend-soft-light" />
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-gray-500 uppercase tracking-widest border-t border-gray-200 pt-4 w-full lg:w-auto justify-center lg:justify-end">
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[#0c38b0] font-bold text-sm">{effectiveCountryOptions.length} Countries</span>
                {/* <span>Database Ready</span> */}
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[#ef6926] font-bold text-sm">v2.4</span>
                {/* <span>Algorithm Updated</span> */}
              </div>
            </div>
          </div>
        </header>

        {/* NAVIGATION DECK */}
        <div className="sticky top-4 z-40 -mx-5 px-5 sm:mx-0 sm:px-0 mb-8">
          <div className="
            flex items-center gap-3 p-2.5
            bg-white/80 backdrop-blur-xl border border-gray-200/70
            rounded-2xl shadow-sm overflow-x-auto no-scrollbar
          ">
            <div className="flex flex-nowrap items-center gap-2 min-w-max">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 group
                      ${isActive
                        ? `${tab.activeColor} shadow-md ring-1 ring-gray-200/70`
                        : 'bg-transparent text-gray-700 hover:bg-gray-50/80 hover:text-gray-900 hover:shadow-sm'
                      }
                    `}
                  >
                    <tab.icon
                      className={`w-5 h-5 transition-colors ${isActive ? 'text-current' : 'text-gray-600 group-hover:text-[#0c38b0]'}`}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />

                    <div className="text-left leading-none">
                      <span className="block text-sm font-bold tracking-tight">{tab.label}</span>
                      <span className={`text-[10px] uppercase tracking-wider opacity-70 hidden sm:block ${isActive ? 'font-medium' : ''}`}>
                        {tab.desc}
                      </span>
                    </div>

                    {isActive && (
                      <motion.div layoutId="active-dot" className="w-1.5 h-1.5 rounded-full bg-current opacity-60 ml-2" />
                    )}
                  </button>
                );
              })}

              <div className="w-px h-8 bg-gray-300/70 mx-1 hidden sm:block" />

              <button
                type="button"
                onClick={() => setHistoryOpen(true)}
                className="
                  flex items-center gap-2.5 px-4 py-3
                  rounded-xl bg-white border border-gray-200
                  text-gray-700 font-medium
                  hover:border-[#0c38b0]/40 hover:text-[#0c38b0]
                  transition-all duration-300 group
                "
              >
                <History className="w-4 h-4 text-gray-500 group-hover:text-[#0c38b0] transition-colors" />
                <span className="text-sm hidden sm:inline">History</span>
                <ArrowRight className="w-3 h-3 hidden sm:inline opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN TOOL CANVAS */}
        <main className="min-h-[600px] mb-20">
          <motion.div
            layout
            className="bg-white rounded-3xl shadow-xl shadow-gray-200/30 border border-gray-200/60 overflow-hidden relative"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0c38b0]/20 via-[#ef6926]/30 to-[#0c38b0]/20 opacity-40" />

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
                      countryOptions={effectiveCountryOptions}
                      countryMap={countryMap}
                      restore={getRestoreForTool('eligibility')}
                    />
                  )}
                  {activeTab === 'discovery' && (
                    <DiscoveryTool
                      restore={getRestoreForTool('finder')}
                    />
                  )}
                  {activeTab === 'calculator' && (
                    <CostTool
                      countryOptions={effectiveCountryOptions}
                      countryMap={countryMap}
                      restore={getRestoreForTool('cost')}
                    />
                  )}
                  {activeTab === 'gpa' && (
                    <GPACalculator
                      restore={getRestoreForTool('gpa')}
                    />
                  )}
                  {activeTab === 'sop' && (
                    <SOPBuilder
                      restore={getRestoreForTool('sop')}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>

      {/* History Drawer */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onRestore={handleRestore}
      />
    </div>
  );
}