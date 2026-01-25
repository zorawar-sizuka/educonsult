'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import Link from 'next/link';

// --- Sub-Component: Physics-Based Counter ---
const SmoothCounter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const springValue = useSpring(0, {
    damping: 30,
    stiffness: 100,
    mass: 1
  });

  React.useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toLocaleString()
  );

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{displayValue}</motion.span>{suffix}
    </span>
  );
};

// --- Sub-Component: Text Reveal Animation ---
const RevealText = ({ children, delay = 0 }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// --- Sub-Component: Rotating Badge ---
const RotatingBadge = () => (
  <motion.div
    className="absolute -top-12 -right-12 z-20 w-32 h-32 md:w-40 md:h-40 hidden lg:flex items-center justify-center bg-white rounded-full shadow-xl border border-stone-100"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full p-2">
      <path
        id="curve"
        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
        fill="transparent"
      />
      <text className="text-[11px] font-bold uppercase tracking-[0.2em]" fill="#44403c">
        <textPath href="#curve">
          • Est. 2012 • The Scholar Standard • Global •
        </textPath>
      </text>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-2xl">✦</span>
    </div>
  </motion.div>
);

// --- Main Component ---
const AboutEditorial = () => {
  const containerRef = useRef(null);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const stats = [
    { number: 12, suffix: "+", label: "Years Experience" },
    { number: 1200, suffix: "+", label: "University Partners" },
    { number: 95, suffix: "%", label: "Visa Success Rate" },
    { number: 5, suffix: "M", label: "Scholarships Secured" },
  ];

  // ✅ Bento images data (swap freely)

  const bentoImages = [

    {

      id: "a",

      src: "/collage/collage1.avif",

      alt: "Student success",

      className: "col-span-7 row-span-2", // BIG tile

      overlayQuote: true,

    },

    {

      id: "b",

      src: "/collage/collage2.avif",

      alt: "Counseling session",

      className: "col-span-5 row-span-1",

    },

    {

      id: "c",

      src: "/collage/collage3.avif",

      alt: "Documentation and planning",

      className: "col-span-3 row-span-1",

    },

    {

      id: "d",

      src: "/collage/collage4.avif",

      alt: "Global network map",

      className: "col-span-2 row-span-1",

    },

  ];



  return (
    <section ref={containerRef} className="relative w-full bg-[#FAFAF9] text-stone-900 py-24 lg:py-40 overflow-hidden">
      {/* Background Decor (Grid) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* --- MAIN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-start mb-20 lg:mb-32">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full pt-6 lg:pt-10">
            <div className="space-y-2 mb-6 lg:mb-8">
              <RevealText>
                <span className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-amber-600 uppercase mb-3 lg:mb-4">
                  {/* The Amber Dash */}
                  <span className="h-0.5 w-8 bg-amber-600 rounded-full flex-shrink-0" />
                  About Us
                </span>
              </RevealText>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tighter text-stone-900 leading-[0.95]">
                <RevealText delay={0.1}>
                  The <span className="font-serif italic text-stone-400">Scholar</span>
                </RevealText>
                <RevealText delay={0.2}>Standard.</RevealText>
              </h2>
            </div>

            <div className="w-full h-px bg-stone-200 mb-6 lg:mb-8 origin-left transform scale-x-100 transition-transform duration-1000" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg text-stone-600 font-light leading-relaxed mb-8 lg:mb-10"
            >
              Founded with a vision to democratize global education, we bridge the gap between potential and opportunity. We don't just process applications; we architect careers through radical transparency and precision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }} 
              className="mb-8 lg:mb-0"
            >
              <Link 
                href="/about"
                className="group relative inline-flex items-center gap-4 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-full overflow-hidden transition-all hover:pr-6"
              >
                <span className="relative z-10 text-sm font-medium tracking-wide">Read Our Vision</span>
                
                <div className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center text-stone-900 group-hover:bg-amber-400 transition-colors">
                  <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>

                <div className="absolute inset-0 bg-stone-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Bento Grid */}
          <div className="lg:col-span-7 relative mt-8 lg:mt-0">
            <RotatingBadge />

            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-xl lg:shadow-2xl bg-stone-100">
              <div className="grid grid-cols-12 grid-rows-2 gap-3 lg:gap-4 h-full p-3 lg:p-4">
                {bentoImages.map((img, idx) => (
                  <div
                    key={img.id}
                    className={`group relative overflow-hidden rounded-2xl lg:rounded-[2.2rem] ${img.className}`}
                  >
                    <motion.div
                      style={{ y }}
                      className="absolute -top-[10%] left-0 w-full h-[120%]"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        priority={idx === 0}
                      />
                    </motion.div>

                    <div className="absolute inset-0 bg-black/10" />

                    {img.overlayQuote ? (
                      <div className="absolute bottom-0 left-0 p-4 lg:p-6 w-full bg-gradient-to-t from-black/60 to-transparent text-white">
                        <p className="font-serif italic text-sm sm:text-base lg:text-xl xl:text-2xl">
                          "Education is the passport to the future."
                        </p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute -top-12 -right-12 sm:-top-16 sm:-right-16 lg:-top-24 lg:-right-24 h-48 w-48 sm:h-56 sm:w-56 lg:h-72 lg:w-72 rounded-full bg-amber-400/10 blur-2xl lg:blur-3xl" />
            </div>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        {/* CHANGED: grid-cols-2 ensures 2 cards per row on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12 border-t border-stone-200 pt-12 lg:pt-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              // CHANGED: Added bg-white/50 and shadow-sm for mobile default.
              // Used lg: to revert to transparent/no-shadow until hover on desktop.
              className="
                flex flex-col items-center justify-center text-center group cursor-default 
                p-4 sm:p-6 md:p-8 rounded-2xl 
                bg-white/50 lg:bg-transparent lg:hover:bg-white/50 
                shadow-sm lg:shadow-none lg:hover:shadow-sm
                transition-all duration-300 
                min-h-[160px] sm:min-h-[200px]
              "
            >
              {/* Centered Numeric Value */}
              {/* CHANGED: scale-105 default on mobile, reset to scale-100 on desktop */}
              <div className="
                text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif text-stone-900 
                flex items-baseline justify-center gap-1 mb-2 sm:mb-3 
                scale-105 lg:scale-100 lg:group-hover:scale-105 
                transition-transform duration-500 ease-out
              ">
                <SmoothCounter value={stat.number} />
                <span className="text-xl sm:text-2xl lg:text-4xl text-stone-400 font-sans font-light">{stat.suffix}</span>
              </div>
              
              {/* Centered Label */}
              {/* CHANGED: text-amber-600 default on mobile, reset to stone-500 on desktop */}
              <span className="
                text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest 
                text-amber-600 lg:text-stone-500 lg:group-hover:text-amber-600 
                transition-colors
              ">
                {stat.label}
              </span>
              
              {/* Optional subtle centered indicator */}
              {/* CHANGED: w-16 and amber bg default on mobile, reset on desktop */}
              <div className="
                mt-4 sm:mt-6 md:mt-8 h-0.5 transition-all duration-300
                w-16 bg-amber-400 
                lg:w-12 lg:bg-stone-200 lg:group-hover:bg-amber-400 lg:group-hover:w-16
              " />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutEditorial;