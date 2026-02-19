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
    <section id="top" className="relative w-full min-h-screen overflow-hidden text-white">
      
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
        <div className=" hidden md:block relative w-full h-full">
            <Image
            src="/hero/qwqw.jpeg"
            alt="Atmospheric university campus"
            fill
            priority 
            sizes="100vw"
            className="object-cover aspect-[16:9]" 
            />
        </div>

        {/* Dark Overlay (Applies to whichever image is visible) */}
        {/* <div className="absolute inset-0 bg-black/20 z-10" /> */}
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
             <span className="font-semibold font-sans text-[#f06925] whitespace-nowrap">E-spot Int'l </span> 
              <br />
              <span className="font-semibold font-sans"><span className="text-[#2d61f0]">Education</span><br/>Consultancy</span>
            </h1>

            <p className="mt-6 text-[15px] sm:text-[16px] leading-relaxed text-white/70 max-w-[520px]">
  From course selection to SOP and visa prep — we guide you end-to-end so you can reach the right university for your goals.
</p>


            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
     {/* LEFT Action - Book Button */}
<div className="relative z-10 flex items-center gap-4 ">
  <BookButton 
    className={`
      group relative flex items-center justify-center gap-3 w-full
      pl-2 pr-6 rounded-full
      bg-[#E5E5E5] text-black hover:bg-[#242e3c] hover:text-white
      border border-black/5
      overflow-hidden
      transition-all duration-300 ease-out
      shadow-md hover:shadow-sm cursor-pointer
      h-[50px]
    `}
  >
    <span className="
      relative z-10 flex h-9 w-9 items-center justify-center
      rounded-full
      bg-[#f06625] border border-black/10
      text-black shadow-sm
      transition-transform duration-300
      group-hover:scale-110
    ">
      <svg 
        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    </span>
    <span className="relative z-10 text-[15px] font-light tracking-wide">
      Book Counselling
    </span>
  </BookButton>
</div>
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