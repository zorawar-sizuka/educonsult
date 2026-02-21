
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Notifier from "./Hero-Comp/Notifier";


const destinations = [
  {
    key: "aus",
    country: "Australia",
    city: "Melbourne",
    flag: "🇦🇺",
    tag: "Post-Study Work Rights",
    intake: "Feb / July",
    tuition: "$25k - $45k",
    rating: "4.9",
    href: "/countries/australia",
    image: "/cluster/australia.avif",
    config: { dir: "up", align: "right" } 
  },
  {
    key: "usa",
    country: "United States",
    city: "New York",
    flag: "🇺🇸",
    tag: "STEM OPT Available",
    intake: "Aug / Jan",
    tuition: "$30k - $60k",
    rating: "4.8",
    href: "/countries/usa",
    image: "/cluster/usa.avif",
    config: { dir: "down", align: "center" }
  },
  {
    key: "uk",
    country: "United Kingdom",
    city: "London",
    flag: "🇬🇧",
    tag: "1-Year Masters",
    intake: "Sep / Jan",
    tuition: "£15k - £35k",
    rating: "4.7",
    href: "/countries/uk",
    image: "/cluster/uk.avif",
    config: { dir: "down", align: "center" }
  },
  {
    key: "can",
    country: "Canada",
    city: "Toronto",
    flag: "🇨🇦",
    tag: "PR Pathways",
    intake: "Sep / Jan",
    tuition: "CAD 20k+",
    rating: "4.8",
    href: "/countries/canada",
    image: "/cluster/canada.avif",
    config: { dir: "down", align: "left" }
  },
  {
    key: "europe",
    country: "Germany",
    city: "Berlin",
    flag: "🇩🇪",
    tag: "Low/No Tuition",
    intake: "Oct / Apr",
    tuition: "€0 - €3k",
    rating: "4.6",
    href: "/countries/germany",
    image: "/cluster/germany.avif",
    config: { dir: "down", align: "center" }
  },
  {
    key: "jpn",
    country: "Japan",
    city: "Tokyo",
    flag: "🇯🇵",
    tag: "Tech & Innovation",
    intake: "Apr / Oct",
    tuition: "¥800k+",
    rating: "4.7",
    href: "/countries/japan",
    image: "/cluster/japan.avif",
    config: { dir: "down", align: "right" }
  }, 
  {
    key: "nzl",
    country: "New Zealand",
    city: "Auckland", 
    flag: "🇳🇿",
    tag: "Quality of Life",
    intake: "Feb / Jul",
    tuition: "NZ$25k+",
    rating: "4.8",
    href: "/countries/new-zealand",
    image: "/cluster/new-zealand.avif",
    config: { dir: "up", align: "right" }
  },
];

// --- Animations ---
const cardAnim = {
  hidden: { opacity: 0, y: 15, scale: 0.95, filter: "blur(4px)" },
  show: { 
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 15 } 
  },
  exit: { opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)", transition: { duration: 0.2 } },
};

// --- SEO Schema Helper ---
function generateSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Global Study Destinations",
    "itemListElement": destinations.map((d, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "EducationalOccupationalProgram",
        "name": `Study in ${d.country}`,
        "description": `Study opportunities in ${d.city}, ${d.country}. ${d.tag}.`,
        "provider": { "@type": "Organization", "name": "Global Education" },
        "url": `https://yourdomain.com${d.href}`
      }
    }))
  };
  return JSON.stringify(schema);
}

// --- Component: Destination Card ---
function DestinationCard({ d, isMobile = false }) {
  return (
    <article className={`${isMobile ? 'w-full max-w-[320px]' : 'w-[320px]'} bg-white rounded-2xl shadow-2xl shadow-stone-900/20 overflow-hidden ring-1 ring-stone-900/5`}>
      
      {/* Visual Header */}
      <div className="relative h-32 w-full">
        <Image src={d.image} alt={`Study in ${d.city}, ${d.country}`} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        <div className="absolute bottom-3 left-4 text-white">
          <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">{d.country}</p>
          <h3 className="text-xl font-serif font-medium leading-none">{d.city}</h3>
        </div>
        
        <div className="absolute top-3 right-3 text-2xl drop-shadow-md" role="img" aria-label={`Flag of ${d.country}`}>
          {d.flag}
        </div>
      </div>

      {/* Details Body */}
      <div className="p-5">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded-md border border-amber-100">
            {d.tag}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-5">
          <div>
            <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-0.5">Next Intake</p>
            <p className="font-semibold text-stone-800">{d.intake}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-stone-400 font-bold tracking-wider mb-0.5">Est. Tuition</p>
            <p className="font-semibold text-stone-800">{d.tuition}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-1" title={`${d.rating} out of 5 student rating`}>
             <span className="text-amber-500 text-sm">★</span>
             <span className="text-xs font-bold text-stone-700">{d.rating}</span>
             <span className="text-[10px] text-stone-400">Student Rating</span>
          </div>
          <a href={d.href} className="text-xs font-bold text-stone-900 hover:text-amber-600 transition-colors flex items-center gap-1 group">
            Details <span className="text-base leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </article>
  );
}

// --- Component: Map Marker ---
function MapMarker({ d, isActive, onClick, style }) {
  const isUp = d.config.dir === 'up';
  
  const alignClass = {
    left: 'left-0 -translate-x-2',
    right: 'right-0 translate-x-8',
    center: 'left-1/2 -translate-x-1/2'
  }[d.config.align];

  const arrowClass = {
    left: 'left-6',
    right: 'right-10',
    center: 'left-1/2 -translate-x-1/2'
  }[d.config.align];

  return (
    <div className={`absolute ${style} z-10`}>
      <div 
        className="relative flex items-center justify-center w-12 h-12"
        onMouseEnter={() => onClick(d.key)} 
        onMouseLeave={() => onClick(null)} 
      >
        
        {/* --- 1. The Pulsating Ring (Behind) --- */}
        {/* Only pulsate when NOT active to keep it clean */}
        {!isActive && (
           <span className="absolute inset-0 rounded-full animate-ping bg-sky-500/80 duration-1000 -z-10" />
        )}

        {/* --- 2. The Static White Dot + Flag (Foreground) --- */}
        <div 
          className={`
            relative flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full border border-white/40 shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer z-20
            ${isActive ? 'bg-white ring-4 ring-black/5 scale-110' : 'bg-white/90 hover:bg-white hover:scale-110'}
          `}
        >
          <span className="text-lg md:text-2xl filter drop-shadow-sm">{d.flag}</span>
        </div>

        {/* --- 3. The Popover Card (Desktop Only) --- */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={cardAnim}
              initial="hidden"
              animate="show"
              exit="exit"
              className={`absolute z-50 pointer-events-none md:pointer-events-auto w-[320px]
                ${isUp ? 'bottom-full mb-4' : 'top-full mt-4'} 
                ${alignClass}
              `}
            >
              <DestinationCard d={d} />
              
              {/* Pointing Arrow */}
              <div className={`absolute w-4 h-4 bg-white rotate-45 border-stone-50
                ${isUp ? '-bottom-2 border-r border-b' : '-top-2 border-l border-t'}
                ${arrowClass}
              `} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// --- Main Layout ---
export default function DestinationsCluster() {
  const [openKey, setOpenKey] = useState("usa"); // Default open on load

  const positions = [ 
    "right-[18%] top-[75%]", // Australia
    "left-[22%] top-[30%]",  // USA
    "left-[44%] top-[24%]",  // UK
    "left-[15%] top-[20%]",  // Canada
    "left-[52%] top-[28%]",  // Germany
    "right-[13%] top-[32%]", // Japan
    "right-[8%] bottom-[8%]", // New Zealand
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-[white] overflow-hidden">
      
      {/* SEO Injection */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateSchema() }}
      />

      <div className="max-w-[1440px] px-6">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24 px-6 md:px-0">
          <div className="mb-8 md:mb-10">
            <Notifier content="Global Opportunities" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-stone-900 mb-6 md:mb-8 leading-tight md:leading-[0.95] tracking-tight">
            The world is your <br className="hidden md:block" />
            <span className="italic text-stone-400">campus.</span>
          </h2>

          <p className="text-base md:text-xl text-stone-500 font-light leading-relaxed max-w-lg md:max-w-2xl mx-auto">
            We've built partnerships with top universities in the world's most innovative cities. Hover over the map to explore.
          </p>
        </div>

        {/* --- Map Interface --- */}
        <div className="relative w-full h-[500px] md:h-[650px] rounded-[2.5rem] overflow-hidden ">
          
          {/* Background Map */}
          <div className="absolute inset-0 w-full h-full">
             <Image 
               src="/worldmap/worldmap.svg" 
               alt="Interactive Map of Study Abroad Destinations" 
               fill 
               className="object-cover md:object-contain opacity-90"
               priority
             />
          </div>

          {/* DESKTOP MARKERS */}
          <div className="hidden md:block absolute inset-0">
             {destinations.map((d, i) => (
               <MapMarker 
                 key={d.key} 
                 d={d} 
                 style={positions[i]} 
                 isActive={openKey === d.key}
                 onClick={setOpenKey}
               />
             ))}
          </div>

          {/* MOBILE LIST VIEW */}
          <div className="md:hidden absolute inset-0 overflow-y-auto bg-stone-50/90 backdrop-blur-sm p-6">
             <p className="text-center text-xs font-bold uppercase tracking-widest text-stone-400 mb-6">Select a Destination</p>
             <div className="flex flex-col gap-4 pb-20">
                {destinations.map((d) => (
                   <div 
                      key={d.key} 
                      className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex items-center gap-4 active:scale-95 transition-transform" 
                      onClick={() => setOpenKey(d.key)}
                   >
                      <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center text-2xl border border-stone-100 shadow-inner">
                        {d.flag}
                      </div>
                      <div>
                         <h3 className="font-bold text-stone-900 text-sm">{d.city}, {d.country}</h3>
                         <p className="text-[10px] text-stone-500 font-medium uppercase tracking-wide">{d.tag}</p>
                      </div>
                      <div className="ml-auto text-stone-300">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* MOBILE MODAL OVERLAY */}
          <AnimatePresence>
            {openKey && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:hidden absolute inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpenKey(null)}
                >
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-[320px]"
                  >
                      <button 
                        onClick={() => setOpenKey(null)}
                        className="absolute -top-12 right-0 text-white p-2 bg-white/10 rounded-full backdrop-blur-md"
                        aria-label="Close"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                      
                      {destinations.find(x => x.key === openKey) && (
                        <DestinationCard d={destinations.find(x => x.key === openKey)} isMobile={true} />
                      )}
                  </motion.div>
                </motion.div>
            )}
          </AnimatePresence>

        </div>
        
      </div>
    </section>
  );
}