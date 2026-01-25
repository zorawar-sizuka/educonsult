import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FooterCTA = () => {
  return (
    <section className="w-full py-12 px-4 lg:px-6 bg-[#white]">
      
      {/* 1. The Card Container */}
      <div className="relative w-full max-w-[1200px] mx-auto bg-white rounded-[3rem]  border border-white/50 overflow-hidden min-h-[350px] lg:h-[400px] flex items-center justify-center">
        
        {/* --- VISUALS: LEFT (Man + Circles) --- */}
        <div className="absolute top-0 left-0 h-full w-1/3 hidden md:block pointer-events-none">
          {/* Concentric Circles clipped inside card */}
          <div className="absolute -left-20 bottom-0 w-[400px] h-[400px] translate-y-1/3">
             <div className="absolute inset-0 rounded-full border border-gray-100/80"></div>
             <div className="absolute inset-[30px] rounded-full border border-gray-100/80"></div>
             <div className="absolute inset-[60px] rounded-full border border-gray-100/80"></div>
             {/* The Orange Accent Dot */}
             <div className="absolute right-[80px] top-[40px] w-12 h-12 bg-orange-500 rounded-full shadow-lg"></div>
          </div>

          {/* Man Image (Semi-Circle Mask) */}
          <div className="absolute top-0 left-0 w-48 h-48 bg-gray-100 rounded-br-[100px] overflow-hidden z-10">
             <Image
               src="/cta/cta1.avif"
               alt="Mentor"
               fill
               className="object-cover opacity-90 hover:scale-110 transition-transform duration-700"
             />
          </div>
        </div>

        {/* --- VISUALS: RIGHT (Woman + Circles) --- */}
        <div className="absolute top-0 right-0 h-full w-1/3 hidden md:block pointer-events-none">
          {/* Concentric Circles */}
          <div className="absolute -right-20 top-0 w-[350px] h-[350px] -translate-y-1/3">
             <div className="absolute inset-0 rounded-full border border-gray-100/80"></div>
             <div className="absolute inset-[40px] rounded-full border border-gray-100/80"></div>
             <div className="absolute inset-[80px] rounded-full border border-gray-100/80"></div>
          </div>

          {/* Woman Image (Semi-Circle Mask) */}
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-gray-100 rounded-tl-[120px] overflow-hidden z-10 shadow-sm">
             <Image
               src="/cta/cta2.avif"
               alt="Student"
               fill
               className="object-cover opacity-90 hover:scale-110 transition-transform duration-700"
             />
          </div>
        </div>

        {/* --- CENTER CONTENT --- */}
        <div className="relative z-20 text-center max-w-lg px-6 py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-4">
            Build better <br />
            <span className="text-gray-900">futures.</span>
          </h2>
          
          <p className="text-base text-gray-500 mb-8 font-medium leading-relaxed">
            Connect with us to meet your dedicated team of academic mentors.
          </p>

          <Link 
            href="/contact" 
            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide hover:bg-gray-800 transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_30px_-10px_rgba(0,0,0,0.6)] hover:-translate-y-0.5"
          >
            <span>Work with us</span>
            <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FooterCTA;