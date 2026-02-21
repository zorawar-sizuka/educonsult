
"use client";

import { motion } from "framer-motion";

export default function HeroBanner({ data }) {
  if (!data) return null;

  const { title, subtitle, bgImage, heightClass, align } = data;
  if (!title || !bgImage) return null;

  const alignMap = {
    "bottom-left": "items-end justify-start text-left",
    center: "items-center justify-center text-center",
    "bottom-right": "items-end justify-end text-right",
  };

  return (
    <section className={`relative w-full ${heightClass ?? ""} overflow-hidden group`}>
      {/* Background motion layer */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover will-change-transform"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </motion.div>

      {/* Constant overlay (no flicker) */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Subtle grain texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:14px_14px]" />

      {/* Content */}
      <div className={`relative z-10 h-full flex ${alignMap[align] ?? ""} px-6 md:px-14`}>
        <div className="pb-8 md:pb-12">
          {subtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
              className="text-white/90 text-sm md:text-base tracking-wide uppercase"
            >
              {subtitle}
            </motion.p>
          ) : null}

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="text-white font-semibold leading-none text-5xl md:text-7xl"
          >
            {title}
          </motion.h1>

          {/* Accent line grows on hover */}
          <motion.div
            className="mt-4 h-px bg-white/60"
            initial={{ width: 40, opacity: 0.7 }}
            animate={{ width: 40, opacity: 0.7 }}
            whileHover={{ width: 80, opacity: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>
    </section>
  );
}
