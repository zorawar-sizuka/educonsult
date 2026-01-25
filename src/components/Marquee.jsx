"use client";

import Marquee from "react-fast-marquee";
import Image from "next/image"; 
import marqueeLogos from "../data/marquee";

export default function LogoMarquee({
  speed = 40,
  pauseOnHover = true,
  className = "",
}) {
  return (
    <div className={`w-full ${className}`}>
      
      <div className="text-center mb-8 lg:mb-12">
        {/* Optional header */}
      </div>

      <Marquee
        gradient={false}
        speed={speed}
        pauseOnHover={pauseOnHover}
        autoFill
        className="overflow-hidden"
      >
        {marqueeLogos.map((l, i) => (
          <div
            key={l.alt + i}
            className="mx-8 lg:mx-14 flex items-center justify-center relative group"
          >
            {/* Premium white effect container */}
            <div className="relative h-8 md:h-10 lg:h-12 w-auto">
              {/* Original image with transparency mask */}
              <div className="relative h-full w-auto">
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={160}
                  height={50}
                  className="h-full w-auto object-contain opacity-100 grayscale brightness-0 invert group-hover:grayscale-0 group-hover:invert-0 group-hover:brightness-100 transition-all duration-500 cursor-pointer"
                  priority={false} 
                  placeholder="blur" 
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9jkHLUw2QzGpEnb0STETSlGYb4kXq6CWWKv/9k="
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
}