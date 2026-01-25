// 'use client';

// import React, { useEffect, useMemo, useState } from 'react';
// import { AnimatePresence } from 'framer-motion';
// import Lottie from "lottie-react";
// import {
//   Calculator, Search, CheckCircle, AlertCircle, FileText, History
// } from 'lucide-react';

// import { useCountries } from '@/hooks/useCountries';

// import EligibilityTool from '@/components/tools/EligibilityTool';
// import DiscoveryTool from '@/components/tools/DiscoveryTool';
// import CostTool from '@/components/tools/CostTool';
// import SOPBuilder from '@/components/tools/SOPBuilder';
// import HistoryDrawer from '@/components/tools/HistoryDrawer';

// const lottieUrl = "/lottie/tools.json";

// export default function ToolsPage() {
//   const [activeTab, setActiveTab] = useState('eligibility');
//   const [animationData, setAnimationData] = useState(null);

//   // History drawer + restore payloads (Step 8)
//   const [historyOpen, setHistoryOpen] = useState(false);
//   const [restoreEligibility, setRestoreEligibility] = useState(null);
//   const [restoreCost, setRestoreCost] = useState(null);
//   const [restoreSop, setRestoreSop] = useState(null);

//   // Step 5: Countries from DB (with safe fallback)
//   const { countryOptions, countryMap, loading: countriesLoading, error: countriesError } = useCountries();

//   const fallbackCountryOptions = useMemo(() => ([
//     'USA', 'UK', 'Australia', 'Japan', 'Canada'
//   ]), []);

//   const effectiveCountryOptions = countryOptions?.length ? countryOptions : fallbackCountryOptions;

//   useEffect(() => {
//     fetch(lottieUrl)
//       .then(res => res.json())
//       .then(setAnimationData)
//       .catch(() => setAnimationData(null));
//   }, []);

//   // Step 8 restore handler
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

//     setHistoryOpen(false);
//   };

//   const tabs = [
//     { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
//     { id: 'discovery', label: 'University Finder', icon: Search },
//     { id: 'calculator', label: 'Cost Estimator', icon: Calculator },
//     { id: 'sop', label: 'SOP Builder', icon: FileText },
//   ];

//   return (
//     <div className="min-h-screen bg-white px-5 md:px-10 py-12 font-sans">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="flex flex-col items-center text-center mb-10">
//           <div className="w-[220px] md:w-[260px] mt-20">
//             {animationData && <Lottie animationData={animationData} loop />}
//           </div>

//           <h1 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight -mt-6">
//             <span className="text-blue-600 italic">AI Toolkit</span>
//           </h1>

//           <p className="mt-3 text-slate-500 max-w-2xl">
//             SaaS-style tools for students: dynamic country data, cached exchange rates, history, saved runs, and exports.
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
import { AnimatePresence } from 'framer-motion';
import Lottie from "lottie-react";
import {
  Calculator, Search, CheckCircle, AlertCircle, FileText, History, GraduationCap
} from 'lucide-react';

import { useCountries } from '@/hooks/useCountries';

import EligibilityTool from '@/components/tools/EligibilityTool';
import DiscoveryTool from '@/components/tools/DiscoveryTool';
import CostTool from '@/components/tools/CostTool';
import SOPBuilder from '@/components/tools/SOPBuilder';
import GPACalculator from '@/components/tools/GPA'; // <--- Import the new component
import HistoryDrawer from '@/components/tools/HistoryDrawer';

const lottieUrl = "/lottie/tools.json";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState('eligibility');
  const [animationData, setAnimationData] = useState(null);

  // History drawer + restore payloads
  const [historyOpen, setHistoryOpen] = useState(false);
  const [restoreEligibility, setRestoreEligibility] = useState(null);
  const [restoreCost, setRestoreCost] = useState(null);
  const [restoreSop, setRestoreSop] = useState(null);

  const { countryOptions, countryMap, loading: countriesLoading, error: countriesError } = useCountries();

  const fallbackCountryOptions = useMemo(() => ([
    'USA', 'UK', 'Australia', 'New Zealand', 'Canada'
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

    if (run.toolType === "eligibility") {
      setActiveTab("eligibility");
      setRestoreEligibility({ payload: run.payload, ts: Date.now() });
    }

    if (run.toolType === "cost") {
      setActiveTab("calculator");
      setRestoreCost({ payload: run.payload, ts: Date.now() });
    }

    if (run.toolType === "sop") {
      setActiveTab("sop");
      setRestoreSop({ payload: run.payload, ts: Date.now() });
    }
    
    // Note: GPA Calculator currently doesn't have history integration in this request, 
    // but can be added similarly if needed.

    setHistoryOpen(false);
  };

  const tabs = [
    { id: 'eligibility', label: 'Eligibility', icon: CheckCircle },
    { id: 'discovery', label: 'University Finder', icon: Search },
    { id: 'calculator', label: 'Cost Estimator', icon: Calculator },
    { id: 'gpa', label: 'GPA Calculator', icon: GraduationCap }, // <--- New Tab
    { id: 'sop', label: 'SOP Builder', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-white px-5 md:px-10 py-12 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-[220px] md:w-[260px] mt-20">
            {animationData && <Lottie animationData={animationData} loop />}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight -mt-6">
            <span className="text-blue-600 italic">AI Toolkit</span>
          </h1>

          <p className="mt-3 text-slate-500 max-w-2xl">
            SaaS-style tools for students: dynamic country data, GPA conversion, cost estimation, and document generation.
          </p>

          {/* Status chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-600 font-bold">
              Countries: {countriesLoading ? 'Loading…' : (countryOptions?.length ? 'DB' : 'Fallback')}
            </span>
            {countriesError ? (
              <span className="px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 font-bold flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {countriesError}
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 font-bold">
                Data Ready
              </span>
            )}
          </div>
        </div>

        {/* Tabs row + History */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-full border text-sm font-bold flex items-center gap-2 transition
                  ${activeTab === t.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setHistoryOpen(true)}
            className="mx-auto md:mx-0 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 font-bold text-sm hover:bg-slate-50"
          >
            <History className="w-4 h-4" />
            History & Saved
          </button>
        </div>

        {/* Tool Area */}
        <div className="rounded-[28px] border border-slate-200 overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            {activeTab === 'eligibility' && (
              <EligibilityTool
                key="eligibility"
                countryOptions={effectiveCountryOptions}
                restore={restoreEligibility}
              />
            )}

            {activeTab === 'discovery' && <DiscoveryTool key="discovery" />}

            {activeTab === 'calculator' && (
              <CostTool
                key="calculator"
                countryOptions={effectiveCountryOptions}
                countryMap={countryMap}
                restore={restoreCost}
              />
            )}

            {activeTab === 'gpa' && (
              <GPACalculator key="gpa" /> // <--- Render the GPA Calculator
            )}

            {activeTab === 'sop' && (
              <SOPBuilder
                key="sop"
                restore={restoreSop}
              />
            )}
          </AnimatePresence>
        </div>
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