"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Marquee from "../Marquee";
import BookButton from "../FormButton/BookButton";
import InquireButton from "../FormButton/InquireButton";

export default function Hero() {
  // 1. Remove useState. Use Refs to access DOM elements directly.
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollIndRef = useRef(null);

  // Inertia tracking
  const currentY = useRef(0);

  useEffect(() => {
    let rafId;

    const loop = () => {
      const targetY = window.scrollY || 0;
      
      // Smooth Inertia Math
      // If the difference is extremely small, stop calculating to save resources
      const diff = targetY - currentY.current;
      if (Math.abs(diff) > 0.05) {
        currentY.current += diff * 0.08;
      }

      // 2. Update styles directly via Refs (No Re-renders!)
      
      // Background Parallax
      if (bgRef.current) {
        const bgTranslate = Math.min(currentY.current * 0.22, 140);
        bgRef.current.style.transform = `translateY(${bgTranslate}px)`;
      }

      // Content Float & Fade
      if (contentRef.current) {
        const textTranslate = Math.min(currentY.current * 0.04, 26);
        const textOpacity = Math.max(0, 1 - currentY.current * 0.0013);
        
        contentRef.current.style.transform = `translateY(${textTranslate}px)`;
        contentRef.current.style.opacity = textOpacity;
      }

      // Scroll Indicator Fade
      if (scrollIndRef.current) {
        scrollIndRef.current.style.opacity = Math.max(0, 1 - currentY.current * 0.01);
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section id="#top" className="relative w-full min-h-screen overflow-hidden text-white">
      
      {/* Background Container */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {/* --- 1. MOBILE IMAGE (Visible up to 'md' breakpoint) --- */}
        <div className="block md:hidden relative w-full h-full">
            <Image
            src="/hero/hero1_mobile.jpg" // 👈 Add your mobile portrait image here
            alt="Atmospheric university campus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center" 
            />
        </div>

        {/* --- 2. DESKTOP IMAGE (Hidden on mobile, Visible on 'md' and up) --- */}
        <div className="hidden md:block relative w-full h-full">
            <Image
            src="/hero/hero1.jpg"
            alt="Atmospheric university campus"
            fill
            priority
            sizes="100vw"
            className="object-cover" 
            />
        </div>

        {/* Dark Overlay (Applies to whichever image is visible) */}
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="pt-32 sm:pt-36 lg:pt-40 pb-14 lg:pb-16 min-h-screen flex flex-col justify-between">
          
          {/* Left Content Block */}
          <div
            ref={contentRef} // Attached Ref
            className="max-w-[640px] will-change-transform"
          >
            <h1 className="mt-24 text-[52px] sm:text-[64px] lg:text-[78px] leading-[1.05] tracking-wide font-sans">
              Grow your
              <br />
              <span className="font-semibold font-sans">future faster</span>
            </h1>

            <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-white/70 max-w-[520px]">
              We simplify the complex process, from course selection to visa prep — so you can focus on
              landing at the right institution for your goals.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <BookButton/>
              <InquireButton/>
            </div>
          </div>

          {/* Marquee area */}
          <div className="opacity-[0.80] hover:opacity-[0.95] transition-opacity duration-300 hidden md:block ">
            <Marquee />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef} // Attached Ref
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="flex flex-col items-center">
          <span className="text-[11px] text-white/55 mb-2 tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/55 to-transparent" />
        </div>
      </div> 
    
    </section>
  );
};