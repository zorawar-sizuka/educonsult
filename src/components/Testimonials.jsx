"use client";

import React from "react";
import Image from "next/image";

// --- DATA: Real Stories with Ratings ---
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Head of Marketing, NovaSkin",
    image: "/testimonials/sarah.avif",
    quote: "Working with this team felt like adding a full creative department to our company overnight. They're fast, responsive, and ridiculously talented.",
    rating: 5,
  },
  {
    id: 2,
    name: "Max Voshchilo",
    role: "Founder, Craft & Code",
    image: "/testimonials/max.avif",
    quote: "The website they built for us wasn't just beautiful - it actually performs. We saw a 60% increase in bookings within the first month.",
    rating: 4.5, // Half Star Example
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Director, GreenLeaf",
    image: "/testimonials/eleana.jpg",
    quote: "Honestly one of the smoothest collaborations we've had. They understood our brand voice immediately and translated it into a visual language.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Chen",
    role: "CTO, TechFlow",
    image: "/testimonials/david.avif",
    quote: "Exceptional attention to detail. The animation work is subtle but adds a level of polish that sets us apart from competitors.",
    rating: 4.5,
  },
];

// --- Sub-Component: Star Rating Logic ---
const StarRating = ({ rating }) => {
  // Create an array of 5 elements to map through
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starIndex = index + 1;

    // If current index is less than or equal to rating -> Full Star
    if (starIndex <= Math.floor(rating)) {
      return (
        <svg key={index} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } 
    // If rating is a decimal and this is the next star -> Half Star
    else if (starIndex === Math.ceil(rating) && !Number.isInteger(rating)) {
      return (
        <div key={index} className="relative w-4 h-4">
          {/* Grey background star */}
          <svg className="absolute inset-0 w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {/* Half Gold star overlay */}
          <svg className="absolute inset-0 w-4 h-4 text-amber-400 overflow-hidden" fill="currentColor" viewBox="0 0 20 20" style={{ clipPath: 'inset(0 50% 0 0)' }}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      );
    } 
    // Otherwise -> Empty Star (Gray)
    else {
      return (
        <svg key={index} className="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  });

  return <div className="flex gap-1">{stars}</div>;
};

export default function TestimonialMarquee() {
  return (
    <section className="bg-[#F2F2F2] py-24 w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        {/* HEADER TAG */}
        <span className="flex items-center gap-3 text-sm font-bold tracking-widest text-[#1a1a1a] uppercase mb-4 font-sans">
          <span className="h-0.5 w-8 bg-[#1a1a1a] rounded-full flex-shrink-0" />
          Testimonials
        </span>
        
        {/* MAIN HEADLINE */}
        <h2 className="text-3xl md:text-5xl font-serif text-[#1a1a1a] mb-2 tracking-tight">
          Real stories. Real winners.
        </h2>
        <h2 className="text-3xl md:text-5xl font-serif text-gray-400 tracking-tight italic">
          Straight from our clients.
        </h2>
      </div>

      {/* --- MARQUEE CONTAINER --- */}
      <div className="relative w-full group">
        
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#F2F2F2] via-[#F2F2F2]/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#F2F2F2] via-[#F2F2F2]/80 to-transparent pointer-events-none" />

        {/* MARQUEE TRACK */}
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {/* We triple the data to ensure smooth infinite loop */}
          {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
            // ADDED: h-full here to ensure the wrapper respects the flex height
            <div
              key={`${item.id}-${idx}`}
              className="px-4 h-full"
            >
              <div className="
                relative 
                /* CHANGED: Fixed width for mobile to standard 300px, 450px for desktop. */
                w-[300px] md:w-[450px]
                /* ADDED: h-full to make all cards stretch to the height of the tallest one */
                h-full flex flex-col
                bg-white p-8 md:p-10 rounded-2xl 
                border border-gray-100/50
                shadow-sm hover:shadow-xl 
                hover:-translate-y-1 
                transition-all duration-300 ease-out
                cursor-default
              ">
                {/* Card Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-4 items-center">
                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-[#1a1a1a] font-sans">
                        {item.name}
                      </h4>
                      <p className="text-xs md:text-sm text-gray-400 font-medium font-sans">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  
                  {/* Rating Component */}
                  <StarRating rating={item.rating} />
                </div>

                {/* Quote */}
                <p className="text-lg md:text-[1.35rem] leading-[1.4] font-medium text-[#1a1a1a] font-serif tracking-tight">
                  &quot;{item.quote}&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />
    </section>
  );
}