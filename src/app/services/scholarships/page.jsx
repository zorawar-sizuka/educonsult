"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Coins, FileText, Globe, School, Speech, TrendingUp } from "lucide-react";

// Data specific to Scholarship Guidance
const scholarshipData = [
  {
    id: 1,
    title: "Profile Assessment",
    icon: Award,
    description: "We analyze your academic achievements, leadership roles, and community service to identify high-value merit scholarships that align with your unique profile.",
  },
  {
    id: 2,
    title: "Global Grant Database",
    icon: Globe,
    description: "Access our proprietary database of external grants, university-specific bursaries, and government fellowships (like Fulbright & Chevening) that often go unnoticed.",
  },
  {
    id: 3,
    title: "Essay Strategy",
    icon: FileText,
    description: "Scholarship essays differ from admission SOPs. We help you craft a compelling narrative that demonstrates 'impact' and 'future potential'—key triggers for scholarship committees.",
  },
  {
    id: 4,
    title: "Financial Aid Applications",
    icon: Coins,
    description: "Navigating the CSS Profile or university financial aid forms can be daunting. We assist with the meticulous documentation required to prove financial need without errors.",
  },
  {
    id: 5,
    title: "Aid Negotiation",
    icon: TrendingUp,
    description: "Did you know financial aid packages can often be appealed? We guide you on how to professionally request a reconsideration of your award letter to secure more funding.",
  },
];

export default function Scholarship() {
  return (
    <div className="w-full bg-white pb-32">
      
      {/* -------------------------------------------------------
          1. HERO SECTION
          - Consistent "Rounded Beige Card"
          - Focus on Financial Freedom / Achievement
      ------------------------------------------------------- */}
      <div className="pt-6 px-4 md:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-[white] rounded-[3rem] overflow-hidden min-h-[85vh] flex flex-col items-center pt-24 pb-0"
        >
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-6 mb-16">
            
             {/* Tag */}
        <span className="px-4 py-1.5 rounded-full bg-[#D2F023] text-xs font-bold uppercase tracking-widest text-slate-900 mb-8 flex items-center justify-between gap-2">
              <School className="w-4 h-4 text-slate-900"/> 
              Services
            </span>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-slate-900 mb-6 font-serif tracking-tight">
              Scholarship Guidance
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed">
              We believe a world-class education should be accessible. Let us help you unlock the funding you deserve.
            </p>
          </div>

          {/* Hero Image - Celebration / Graduation / Achievement */}
          <div className="relative w-full flex-grow mt-auto">
             <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[65vh] w-[90%] mx-auto rounded-t-[3rem] overflow-hidden shadow-2xl">
                <Image
                src="/services/scholarship.avif"
                  alt="Student graduating with honors"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             </div>
          </div>

        </motion.div>
      </div>

      {/* -------------------------------------------------------
          2. CONTENT LIST
      ------------------------------------------------------- */}
      <section className="mt-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-20">
           <h2 className="text-3xl font-medium tracking-tight text-slate-900">
             Maximizing Your Funding
           </h2>
        </div>

        <div className="border-t border-slate-200">
          {scholarshipData.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group py-16 border-b border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-8 items-start hover:bg-slate-50 transition-colors duration-500 px-4 -mx-4 rounded-xl"
            >
              
              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Icon */}
              <div className="md:col-span-2 flex justify-start md:justify-center">
                <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                   <service.icon strokeWidth={1} className="w-8 h-8 text-slate-700" />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <p className="text-slate-600 leading-relaxed text-lg font-light">
                  {service.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------
          3. CTA
      ------------------------------------------------------- */}
      <section className="py-24 flex justify-center">
        <button className="group relative px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 font-medium tracking-wide flex items-center gap-2">
            Check Your Eligibility
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </button>
      </section>

    </div>
  );
}