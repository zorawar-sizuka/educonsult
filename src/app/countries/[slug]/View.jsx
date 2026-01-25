'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  // UI Icons
  ArrowRight, 
  CheckCircle2, 
  ScrollText, 
  ChevronRight,
  // Feature Icons (Must match strings in data)
  GraduationCap, 
  Clock,
  Landmark,
  Briefcase,
  Globe,
  TrendingUp,
  ShieldCheck,
  Sun,
  DollarSign , 
  Cpu,
  PieChart,
  Cog,
  HeartPulse,
  Gavel,
  Palette
} from 'lucide-react';

// --- 1. The Registry: Maps data strings to actual Components ---
const iconRegistry = {
  GraduationCap,
  Clock,
  Landmark,
  Briefcase,
  Globe,
  TrendingUp,
  ShieldCheck,
  Sun,
  DollarSign, 
  Cpu,
  PieChart,
  Cog,
  HeartPulse,
  Gavel,
  Palette
};

// --- Helper: Scroller ---
const UniversityScroller = ({ universities }) => {
  return (
    <div className="w-full relative group">
      <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide">
        {universities.map((uni, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="snap-center shrink-0 w-[200px] h-[220px] bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="relative w-24 h-24 mb-4">
              <Image src={uni.logo} alt={uni.name} fill className="object-contain" />
            </div>
            <p className="text-sm font-bold text-center text-slate-800 leading-tight">{uni.name}</p>
          </motion.div>
        ))}
        <div className="snap-center shrink-0 w-[200px] h-[220px] bg-slate-50 rounded-3xl flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200">
            <span className="text-sm font-bold text-slate-400">Viewed All</span>
            <ChevronRight className="w-6 h-6 text-slate-300 mt-2" />
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none lg:block hidden" />
    </div>
  );
};

// --- Main Component ---
export default function CountryView({ country }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      
      {/* HERO */}
      <div className="relative h-[70vh] w-full">
        <Image src={country.heroImage} alt={country.name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end pb-24">
           <motion.span 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className={`inline-block px-4 py-1.5 rounded-full ${country.themeColor} text-white text-xs font-bold uppercase tracking-widest w-fit mb-6`}
           >
             Study Destination
           </motion.span>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-8xl font-serif text-white mb-6"
           >
             {country.name}
           </motion.h1>
           <p className="text-xl text-slate-200 max-w-2xl font-light">
             {country.tagline}
           </p>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-32 space-y-12">
              <div className="bg-[#F6F5F2] p-8 rounded-3xl">
                <h3 className="text-lg font-bold text-slate-900 mb-6 font-serif">Quick Overview</h3>
                <div className="space-y-6">
                  {country.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                      <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
                      <span className="text-slate-900 font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <nav className="flex flex-col gap-4">
                 {['Top Universities', 'Why Study Here', 'Entry Requirements'].map((item, i) => (
                   <a key={i} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-slate-500 hover:text-black transition-colors text-lg font-medium flex items-center gap-2 group">
                     <span className={`w-2 h-2 rounded-full ${country.themeColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
                     {item}
                   </a>
                 ))}
              </nav>

              <button className={`w-full py-4 rounded-xl ${country.themeColor} text-white font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                Start Application <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </aside>

          {/* MAIN COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-32">

            {/* UNIVERSITIES */}
            <section id="top-universities">
               <div className="flex items-end justify-between mb-8">
                  <h2 className="text-4xl font-medium font-serif text-slate-900">Top Universities</h2>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden md:block">Scroll to explore</span>
               </div>
               <UniversityScroller universities={country.universities} />
            </section>

            {/* WHY FEATURES (Bento Grid) */}
            <section id="why-study-here">
              <h2 className="text-4xl font-medium font-serif text-slate-900 mb-12">Why {country.name}?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {country.whyFeatures.map((feature, i) => {
                  
                  // 2. Lookup Icon from Registry
                  const IconComponent = iconRegistry[feature.icon];

                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`${feature.span} p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors group`}
                    >
                      <div className={`w-12 h-12 rounded-full ${country.lightThemeColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        {/* 3. Render Safely */}
                        {IconComponent ? (
                          <IconComponent className={`w-6 h-6 ${country.textColor}`} />
                        ) : (
                          <div className="w-4 h-4 bg-slate-200 rounded-full" /> // Fallback if icon missing
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </section>  
            
            {/* --- NEW SECTION: POPULAR COURSES --- */}
            <section id="popular-courses">
               <div className="flex items-end justify-between mb-10">
                  <h2 className="text-4xl font-medium font-serif text-slate-900">Popular Courses</h2>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest hidden md:block">Top Fields</span>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                 {country.courses && country.courses.map((course, i) => {
                   const IconComponent = iconRegistry[course.icon];
                   
                   return (
                     <motion.div
                       key={i}
                       initial={{ opacity: 0, y: 15 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.05 }}
                       className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-slate-200 transition-all duration-300"
                     >
                       <div className="flex items-start justify-between mb-4">
                         <div className={`p-3 rounded-xl ${country.lightThemeColor} group-hover:scale-110 transition-transform`}>
                           {IconComponent && <IconComponent className={`w-6 h-6 ${country.textColor}`} />}
                         </div>
                       </div>
                       
                       <h3 className="text-lg font-bold text-slate-900 mb-2">{course.title}</h3>
                       <p className="text-sm text-slate-500 leading-relaxed">{course.desc}</p>
                     </motion.div>
                   )
                 })}
               </div>
            </section>

            {/* REQUIREMENTS */}
            <section id="entry-requirements">
               <h2 className="text-4xl font-medium font-serif text-slate-900 mb-12">Entry Requirements</h2>
               
               <div className="border border-slate-200 rounded-[2rem] p-8 md:p-12">
                  <div className="flex flex-wrap gap-4 mb-12 border-b border-slate-100 pb-4">
                    {country.requirements.map((req, i) => (
                      <button 
                        key={i}
                        onClick={() => setActiveTab(i)}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                          activeTab === i 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-white text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {req.title}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[200px]">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <ScrollText className={`w-6 h-6 ${country.textColor}`} />
                      {country.requirements[activeTab].title} Criteria
                    </h3>
                    <ul className="space-y-4">
                      {country.requirements[activeTab].details.map((detail, k) => (
                        <li key={k} className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-lg text-slate-600 font-light leading-relaxed">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
               </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}