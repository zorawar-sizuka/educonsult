"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, BadgeDollarSign, Sparkles, ArrowRight } from "lucide-react";
import BookButton from "../FormButton/BookButton";  //=> Booking Button//

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
          {/* LEFT: headline + CTA (more spacing like reference) */}
          <div className="lg:col-span-5">
          <motion.p
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  // Added 'flex', 'items-center', and 'gap-3' for alignment
  className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-emerald-700/80"
>
  {/* The Green Dash */}
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
              growth     <span className="font-bold">with key</span>
              <br />
              <span className="font-bold">features</span>
            </motion.h2>

           


      {/* CTA (smaller) */}
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

          {/* RIGHT: flush grid lines only (no outer border box) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative">
              {/* The two cross lines (no outer rectangle) */}
              <div className="pointer-events-none absolute inset-0">
                {/* vertical */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200/80" />
                {/* horizontal */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-200/80" />
              </div>

              {/* Cells */}
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <FeatureCell
                  Icon={Target}
                  eyebrow="Industry Standard"
                  titleTop="Generic"
                  titleBottom="Strategies"
                  desc="One-size-fits-all plans with limited personalization for your course, country, and profile."
                />
                <FeatureCell
                  Icon={Users}
                  eyebrow="Industry Standard"
                  titleTop="Limited"
                  titleBottom="Guidance"
                  desc="Support fades after basics. Students handle confusion, rework, and deadlines alone."
                  align="right"
                />
                <FeatureCell
                  Icon={Sparkles}
                  eyebrow="With ROSS Global"
                  titleTop="Tailored"
                  titleBottom="Consulting"
                  desc="A roadmap built around your academics, goals, budget, and realistic admit chances."
                />
                <FeatureCell
                  Icon={BadgeDollarSign}
                  eyebrow="With ROSS Global"
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

function FeatureCell({ Icon, eyebrow, titleTop, titleBottom, desc, align }) {
  return (
    <div className="px-10 py-12 sm:px-12 sm:py-14">
      <div className={`flex items-start justify-between gap-8 ${align === "right" ? "sm:pl-14" : "sm:pr-14"}`}>
        <div className="max-w-sm">
          {/* <p className="text-[11px] uppercase tracking-[0.24em] font-semibold text-slate-400">
            {eyebrow}
          </p> */}

          <h3 className="mt-6 text-[34px] sm:text-[38px] leading-[1.03] tracking-tight text-slate-900">
            <span className="font-light">{titleTop}</span>
            <br />
            <span className="font-bold">{titleBottom}</span>
          </h3>

          <p className="mt-5 text-[15px] leading-relaxed text-slate-500">
            {desc}
          </p>
        </div>

        <div className="shrink-0 mt-2 text-slate-900/80">
          <Icon className="h-11 w-11" strokeWidth={1.55} />
        </div>
      </div>
    </div>
  );
}
