'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PillButton from './ui/PillButton';

export default function ToolShell({
  title,
  description,
  ctaLabel = "View details",
  onCta,
  children,
  leftExtra,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12 }}
      transition={{ duration: 0.25 }}
      className="grid lg:grid-cols-12 gap-10 p-8 md:p-12 bg-white"
    >
      {/* Left content (reference-like) */}
      <div className="lg:col-span-5">
        <h2 className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-slate-600 leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex items-center gap-3">
          <PillButton variant="lime" onClick={onCta} className="whitespace-nowrap">
            {ctaLabel}
          </PillButton>
          {leftExtra}
        </div>
      </div>

      {/* Right panel (form area) */}
      <div className="lg:col-span-7">
        <div className="rounded-3xl bg-white">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
