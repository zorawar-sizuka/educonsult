
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, BadgeDollarSign, Sparkles } from "lucide-react";
import BookButton from "../FormButton/BookButton";

export default function Hero3() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Soft ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/30 to-white" />
        <div className="absolute left-[-180px] top-[-180px] h-[480px] w-[480px] rounded-full bg-[#0c38b0]/5 blur-3xl" />
        <div className="absolute right-[-220px] bottom-[-220px] h-[580px] w-[580px] rounded-full bg-[#ef6926]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-10 py-16 sm:py-20 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* LEFT: headline + CTA */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.26em] uppercase text-[#0c38b0]/80"
            >
              <span className="h-0.5 w-8 bg-gradient-to-r from-[#0c38b0]/60 to-[#ef6926]/40 rounded-full" />
              The Advantage
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 0.06, duration: 0.65 }}
              className="mt-6 text-[44px] sm:text-[56px] leading-[1.02] tracking-tight text-gray-900"
              style={{
                fontFamily:
                  "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto",
              }}
            >
              Unlock your
              <br />
              growth <span className="font-bold text-[#ef6926]">with key</span>
              <br />
              <span className="font-bold text-[#0c38b0]">features</span>
            </motion.h2>

            {/* Removed border line above CTA */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-8"
            >
              <BookButton className="group relative inline-flex items-center gap-3 px-6 py-4 bg-[#0c38b0] text-white rounded-full overflow-hidden hover:shadow-lg hover:shadow-[#0c38b0]/20 transition-all duration-400 hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 text-sm font-medium tracking-wide">
                  Begin Your Journey
                </span>
                <span className="relative z-10 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45">
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
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
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <FeatureCell
                Icon={Target}
                titleTop="Strategic"
                titleBottom="Precision"
                desc="We use data-driven insights to target the universities where your specific profile has the highest success rate."
              />

              <FeatureCell
                Icon={Users}
                titleTop="Dedicated"
                titleBottom="Mentors"
                desc="You get a personal counselor—not a generic support team—guiding you from the first form to your final visa."
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
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureCell({ Icon, titleTop, titleBottom, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="group relative h-full min-h-[220px] sm:min-h-[260px] px-4 py-6 sm:px-7 sm:py-8 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#0c38b0]/30 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
    >
      <div className="flex flex-col items-start gap-4">
        {/* Icon container */}
        <div className="shrink-0 p-3 sm:p-4 bg-gradient-to-br from-[#0c38b0]/10 to-[#ef6926]/10 rounded-2xl text-[#0c38b0] group-hover:text-[#ef6926] transition-colors duration-400 shadow-sm">
          <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={1.6} />
        </div>

        {/* Text content — no overflow */}
        <div className="w-full min-w-0">
          <h3 className="text-[16px] sm:text-[28px] sm:leading-[1.05] tracking-tight text-gray-900 leading-tight break-words">
            <span className="font-light">{titleTop}</span>
            <br />
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#0c38b0] to-[#ef6926]">
              {titleBottom}
            </span>
          </h3>

          {/* Clamp description so it never spills */}
          <p className="mt-3 text-[13px] sm:text-[15px] leading-relaxed text-gray-600 line-clamp-3 sm:line-clamp-4">
            {desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
