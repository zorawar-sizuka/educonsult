"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, BadgeDollarSign, Sparkles } from "lucide-react";
import BookButton from "../FormButton/BookButton";

export default function Hero3() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft paper wash */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-stone-50/30 to-white" />
        <div className="absolute left-[-220px] top-[-220px] h-[520px] w-[520px] rounded-full bg-emerald-50/70 blur-3xl" />
        <div className="absolute right-[-260px] bottom-[-260px] h-[620px] w-[620px] rounded-full bg-slate-50 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: headline + CTA */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-emerald-700/80"
            >
              <span className="h-0.5 w-8 bg-emerald-700/80 rounded-full" />
              The Advantage
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.06, duration: 0.65 }}
              className="mt-6 text-[44px] sm:text-[56px] leading-[1.02] tracking-tight text-slate-900"
              style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}
            >
              Unlock your
              <br />
              growth <span className="font-bold">with key</span>
              <br />
              <span className="font-bold">features</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-8 pt-6 border-t border-slate-100"
            >
              <BookButton 
                className="group relative inline-flex items-center gap-3 px-6 py-4 bg-emerald-700 text-white rounded-full overflow-hidden hover:shadow-lg hover:shadow-emerald-200/20 transition-all duration-400"
              >
                <span className="relative z-10 text-sm font-medium tracking-wide">
                  Begin Your Journey
                </span>
                <span className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform duration-300 group-hover:rotate-45">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-slate-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </BookButton>
            </motion.div>
          </div>

          {/* RIGHT: Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative">
              
              {/* CROSS LINES: Hidden on Mobile (hidden), Visible on SM+ (block) */}
              <div className="pointer-events-none absolute inset-0 hidden sm:block">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200/80" />
                {/* Horizontal Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200/80" />
              </div>

              {/* GRID: 2 Columns on Mobile, 2 Columns on Desktop */}
              <div className="grid grid-cols-2">
                <FeatureCell
                  Icon={Target}
                  titleTop="Generic"
                  titleBottom="Strategies"
                  desc="One-size-fits-all plans with limited personalization for your course, country, and profile."
                />
                <FeatureCell
                  Icon={Users}
                  titleTop="Limited"
                  titleBottom="Guidance"
                  desc="Support fades after basics. Students handle confusion, rework, and deadlines alone."
                  align="right"
                />
                <FeatureCell
                  Icon={Sparkles}
                  titleTop="Tailored"
                  titleBottom="Consulting"
                  desc="A roadmap built around your academics, goals, budget, and realistic admit chances."
                />
                <FeatureCell
                  Icon={BadgeDollarSign}
                  titleTop="Transparent"
                  titleBottom="Excellence"
                  desc="Clear scope, clear fees, clear outcomes—no last-minute surprises or hidden charges."
                  align="right"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ Icon, titleTop, titleBottom, desc, align }) {
  return (
    <div className="px-4 py-6 sm:px-10 sm:py-12"> 
      
      {/* ALIGNMENT FIXES:
        1. items-center (Mobile) -> Centers the Flex column (Icon + Text) vertically 
        2. sm:items-start (Desktop) -> Aligns them to the left 
      */}
      <div className={`flex flex-col sm:flex-row items-center sm:items-start justify-between gap-3 sm:gap-8 ${align === "right" ? "sm:pl-14" : "sm:pr-14"}`}>
        
        {/* TEXT ALIGNMENT FIXES:
          1. text-center (Mobile) -> Centers the text
          2. sm:text-left (Desktop) -> Aligns text to left
        */}
        <div className="max-w-sm order-2 sm:order-1 text-center sm:text-left">
          <h3 className="text-[16px] sm:text-[34px] sm:leading-[1.03] tracking-tight text-slate-900 leading-tight">
            <span className="font-light">{titleTop}</span>
            <br />
            <span className="font-bold">{titleBottom}</span>
          </h3>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-500 hidden sm:block">
            {desc}
          </p>
        </div>

        <div className="shrink-0 text-emerald-700/80 sm:text-slate-900/80 order-1 sm:order-2 mb-2 sm:mb-0">
          <Icon className="h-8 w-8 sm:h-11 sm:w-11" strokeWidth={1.5} />
        </div>
        
      </div>
    </div>
  );
}