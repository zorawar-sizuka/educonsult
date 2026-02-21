
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import Link from 'next/link';

// --- Utility Hook for Mobile Detection ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return isMobile;
};

// --- Sub-Component: Physics-Based Counter ---
const SmoothCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    mass: 1
  });

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString()
  );

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span className="text-[#0c38b0]">{displayValue}</motion.span>{suffix}
    </span>
  );
};

// --- Sub-Component: Text Reveal Animation (Optimized) ---
const RevealText = ({ children, delay = 0 }) => {
  const isMobile = useIsMobile();

  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: isMobile ? 20 : "100%", opacity: isMobile ? 0 : 1 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: isMobile ? "-10%" : "0px" }}
        transition={{ 
          duration: isMobile ? 0.5 : 0.8, 
          delay: isMobile ? 0 : delay,
          ease: isMobile ? "easeOut" : [0.33, 1, 0.68, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Rotating Badge ---
const RotatingBadge = () => (
  <motion.div
    className="absolute -top-10 -right-10 md:-top-12 md:-right-12 z-20 w-28 h-28 md:w-36 md:h-36 hidden lg:flex items-center justify-center bg-white rounded-full shadow-xl border border-[#0c38b0]/10"
    animate={{ rotate: 360 }}
    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
      <path
        id="curve"
        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
        fill="transparent"
      />
      <text className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em]" fill="#0c38b0">
        <textPath href="#curve">
          • Est. 2012 • The Scholar Standard • Global •
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl md:text-3xl text-[#ef6926]">✦</span>
    </div>
  </motion.div>
);

// --- Main Component ---
const AboutEditorial = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", isMobile ? "0%" : "20%"] 
  );

  const stats = [
    { number: 12, suffix: "+", label: "Years Experience" },
    { number: 1200, suffix: "+", label: "University Partners" },
    { number: 95, suffix: "%", label: "Visa Success Rate" },
    { number: 5, suffix: "M", label: "Scholarships Secured" },
  ];

  const bentoImages = [
    {
      id: "a",
      src: "/collage/collage2.jpg",
      alt: "Student success",
      className: "col-span-7 row-span-2", 
      overlayQuote: true,
    },
    {
      id: "b",
      src: "/collage/collage5.png",
      alt: "Counseling session",
      className: "col-span-5 row-span-1",
    },
    {
      id: "c",
      src: "/collage/collage3.jpg",
      alt: "Documentation and planning",
      className: "col-span-3 row-span-1",
    },
    {
      id: "d",
      src: "/collage/collage4.png",
      alt: "Global network map",
      className: "col-span-2 row-span-1",
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-gradient-to-b from-gray-50/50 to-white text-stone-900 py-20 lg:py-40 overflow-hidden">
      {/* Background Decor – subtle grid with brand tint */}
      <div
        className="absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(#0c38b0 1px, transparent 1px), linear-gradient(90deg, #0c38b0 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 xl:px-12">
        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-start mb-16 lg:mb-32">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pt-4 lg:pt-10">
            <div className="space-y-2 mb-6 lg:mb-8">
              <RevealText>
                <span className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-[#ef6926] uppercase mb-3 lg:mb-4">
                  <span className="h-0.5 w-8 bg-[#ef6926] rounded-full flex-shrink-0" />
                  About Us
                </span>
              </RevealText>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter text-[#0c38b0] leading-[0.95]">
                <RevealText delay={0.1}>
                  The <span className="font-serif italic text-[#ef6926]/90">Scholar</span>
                </RevealText>
                <RevealText delay={0.2}>Standard.</RevealText>
              </h2>
            </div>

            <div className="w-full h-px bg-gray-200 mb-6 lg:mb-8 origin-left" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0 : 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-gray-700 font-light leading-relaxed mb-8 lg:mb-10 max-w-prose"
            >
              Founded with a vision to democratize global education, we bridge the gap between potential and opportunity. We don't just process applications; we architect careers through radical transparency and precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: isMobile ? 0.2 : 0.6 }} 
              className="mb-8 lg:mb-0"
            >
              <Link 
                href="/vision"
                className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-[#0c38b0] text-white rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-[#0c38b0]/20 hover:pr-8 active:scale-[0.98]"
              >
                <span className="relative z-10 text-sm font-medium tracking-wide">Read Our Vision</span>
                <div className="relative z-10 w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-transform duration-300 group-hover:rotate-45 group-hover:bg-white/30">
                  <svg className="w-3 h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-[#0c38b0]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Bento Grid */}
          <div className="lg:col-span-7 relative mt-10 lg:mt-0">
            <RotatingBadge />

            <div className="relative w-full h-[420px] sm:h-[520px] lg:h-[620px] xl:h-[680px] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100">
              <div className="grid grid-cols-12 grid-rows-2 gap-3 lg:gap-4 h-full p-3 lg:p-4">
                {bentoImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className={`group relative overflow-hidden rounded-2xl lg:rounded-[2.2rem] shadow-inner ${img.className}`}
                  >
                    <motion.div
                      style={{ y }}
                      className="absolute -top-[10%] left-0 w-full h-[120%] will-change-transform"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                        priority={idx === 0}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {img.overlayQuote ? (
                      <div className="absolute bottom-0 left-0 p-5 lg:p-8 w-full bg-gradient-to-t from-black/70 to-transparent text-white">
                        <p className="font-serif italic text-sm sm:text-base lg:text-xl xl:text-2xl leading-tight">
                          "Education is the passport to the future."
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute -top-10 -right-10 sm:-top-14 sm:-right-14 lg:-top-20 lg:-right-20 h-40 w-40 sm:h-48 sm:w-48 lg:h-64 lg:w-64 rounded-full bg-[#ef6926]/10 blur-2xl lg:blur-3xl" />
            </div>
          </div>
        </div>

        {/* STATS GRID – brand colored */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 lg:gap-12 border-t border-gray-200 pt-12 lg:pt-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="
                flex flex-col items-center justify-center text-center group cursor-default 
                p-5 sm:p-6 md:p-8 rounded-2xl 
                bg-white/60 lg:bg-transparent lg:hover:bg-white/60 
                shadow-sm lg:shadow-none lg:hover:shadow-md
                transition-all duration-400 
                min-h-[140px] sm:min-h-[180px] lg:min-h-[220px]
                border border-gray-100 lg:hover:border-[#0c38b0]/20
              "
            >
              <div className="
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#0c38b0] 
                flex items-baseline justify-center gap-1 mb-2 sm:mb-3 
                scale-100 lg:group-hover:scale-105 
                transition-transform duration-500 ease-out
              ">
                <SmoothCounter value={stat.number} />
                <span className="text-xl sm:text-2xl lg:text-3xl text-[#ef6926] font-sans font-light">{stat.suffix}</span>
              </div>
              
              <span className="
                text-[10px] sm:text-xs md:text-sm lg:text-base font-bold uppercase tracking-widest 
                text-gray-600 lg:group-hover:text-[#ef6926] 
                transition-colors duration-400
              ">
                {stat.label}
              </span>
              
              <div className="
                mt-4 sm:mt-5 md:mt-6 lg:mt-8 h-0.5 transition-all duration-400
                w-12 bg-[#ef6926]/40 
                lg:w-10 lg:bg-gray-200 lg:group-hover:bg-[#ef6926]/60 lg:group-hover:w-16
              " />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutEditorial;