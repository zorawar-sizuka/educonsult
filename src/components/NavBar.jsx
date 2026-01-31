"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookButton from "./FormButton/BookButton"; 
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const pathname = usePathname();

  // 1. Scroll Effect: Compaction logic
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Lock Body Scroll: Prevents background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      {
        name: "Services",
        href: "/services",
        dropdown: [
          { name: "All Services", href: "/services" },
          { name: "Admission Counseling", href: "/services/admission" },
          { name: "Visa Assistance", href: "/services/visa" },
          { name: "Scholarship Guidance", href: "/services/scholarships" }, 
          { name: "Language Preparation", href: "/services/test-prep" },
        ],
      },
      {
        name: "Countries",
        href: "/countries",
        dropdown: [
          { name: "Explore All", href: "/countries" },
          { name: "USA", href: "/countries/usa" },
          { name: "UK", href: "/countries/uk" },
          { name: "Canada", href: "/countries/canada" },
          { name: "Australia", href: "/countries/australia" },
          { name: "Germany", href: "/countries/germany" },
          { name: "Japan", href: "/countries/japan" },
          { name: "New Zealand", href: "/countries/new-zealand" },
        ],
      }, 
      {
        name: "Test-Prep",
        href: "/services/test-prep",
        dropdown: [
          { name: "IELTS", href: "/services/test-prep/ielts" },
          { name: "PTE", href: "/services/test-prep/pte" },
        ],
      },
      { name: "Tools", href: "/tools", isSpecial: true },
      { name: "Resources", href: "/resources" },
      { name: "Events", href: "/events" },
      {
        name: "About",
        href: "/about",
        dropdown: [
          { name: "Our Story", href: "/about" }, 
          { name: "Vision", href: "/vision" },
          { name: "FAQs", href: "/appendix/faqs" },
          { name: "Privacy Policy", href: "/appendix/privacy-policy" },
          { name: "Terms & Conditions", href: "/appendix/t&c" },
        ],
      },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <>
      {/* --- DESKTOP NAV WRAPPER ---
          - pointer-events-none lets clicks pass through the empty space.
      */}
      <nav
        className={[
          "fixed left-1/2 -translate-x-1/2 z-50",
          "w-[98%] max-w-[1400px]",
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "flex items-center justify-between pointer-events-none",
          isScrolled ? "top-2" : "top-5",
        ].join(" ")}
      >
        
        {/* 1. LOGO AREA (Restored Original Size & Props) */}
        <div className="pointer-events-auto pl-2">
            <Link href="/" className="relative flex items-center group">
                <Image
                    src="/logos/eeic.png"
                    alt="EEIC Logo"
                    width={120}     // Original Width
                    height={80}     // Original Height
                    // 'h-full' depends on parent, but here we let it scale naturally with w-auto.
                    // Added max-h constraint to prevent layout shifts if image is huge.
                    className="w-auto h-auto max-h-[60px] object-contain transition-transform duration-500 group-hover:scale-105"
                    priority
                />
            </Link>
        </div>

        {/* 2. NAVIGATION CAPSULE (Restored Original Glass Styling) */}
        <div
          className={[
            "relative rounded-full pointer-events-auto",
            
            // --- YOUR PREFERRED ORIGINAL STYLING RESTORED HERE ---
            "md:bg-white/20 md:backdrop-blur-lg md:saturate-[1.2]",
            "md:border md:border-white/40 md:shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
            // -----------------------------------------------------

            "px-2 pl-4 pr-2 sm:px-6", 
            // Dynamic padding:
            isScrolled ? "py-2" : "py-2.5",
            "flex items-center gap-6",
            "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
          ].join(" ")}
        >

          {/* Desktop Links */}
          <div className="relative z-10 hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <DesktopNavItem 
                key={index} 
                link={link} 
                currentPath={pathname} 
              />
            ))}
          </div>

          {/* Right Action - Book Button */}
          <div className="relative z-10 hidden md:flex items-center gap-4">
            <BookButton 
              className={`
                group relative flex items-center gap-3
                pl-2 pr-6 rounded-full
                bg-[#242e3c] hover:bg-[#E5E5E5] hover:text-black text-white
                border border-black/5
                overflow-hidden
                transition-all duration-300 ease-out
                shadow-sm hover:shadow-md cursor-pointer
                ${isScrolled ? "h-[44px]" : "h-[50px]"} 
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

          {/* Mobile Toggle Button */}
          <button
            className="relative z-10 md:hidden p-3 rounded-full bg-white/50 border border-black/5 hover:bg-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-[#FAFAFA]",
          "transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          mobileMenuOpen ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 pt-8 border-b border-gray-100">
            <span className="text-2xl font-bold tracking-tight text-slate-900">Menu</span>
            <button 
               onClick={() => setMobileMenuOpen(false)}
               className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-black"
               aria-label="Close Menu"
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
               </svg>
            </button>
          </div>
          
          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-6 pb-12">
             <div className="flex flex-col gap-2 mt-4">
                {navLinks.map((link, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 py-4">
                    <div 
                      className="flex justify-between items-center group cursor-pointer"
                      onClick={() => link.dropdown && setActiveMobileDropdown(activeMobileDropdown === i ? null : i)}
                    >
                      <Link 
                        href={link.href} 
                        className="text-[22px] font-medium text-slate-900"
                        onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                         <span className={`transform transition-transform duration-300 text-black/40 ${activeMobileDropdown === i ? 'rotate-180' : ''}`}>
                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                         </span>
                      )}
                    </div>
                    
                    {/* Mobile Dropdown */}
                    <div className={`grid transition-all duration-300 ease-in-out ${activeMobileDropdown === i ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                       <div className="overflow-hidden">
                         <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-200 ml-1">
                            {link.dropdown?.map((sub, j) => (
                              <Link 
                                key={j} 
                                href={sub.href}
                                className="text-[16px] text-slate-500 hover:text-blue-600 font-medium transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </Link>
                            ))}
                         </div>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
             
             {/* Mobile CTA */}
             <div className="mt-8">
                <BookButton className="w-full h-14 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-xl">
                    <span>Book Counselling</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </BookButton>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- DESKTOP NAV ITEM COMPONENT (Smart Logic) ---
function DesktopNavItem({ link, currentPath }) {
  const isTools = link.isSpecial;

  // Active if current path starts with link href (e.g. /services/visa -> Services active)
  // Exception: Home "/" only active if exact match
  const isActive = link.href === "/" 
    ? currentPath === "/" 
    : currentPath.startsWith(link.href);

  if (isTools) {
    return (
      <Link
        href={link.href}
        className="
          relative px-4 py-2 rounded-full mx-1
          text-[16px] font-medium text-transparent bg-clip-text 
          bg-gradient-to-r from-violet-600 to-fuchsia-600
          hover:bg-violet-50/50 transition-all duration-300
        "
      >
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4 text-violet-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z"/></svg>
          {link.name}
        </span>
      </Link>
    );
  }

  return (
    <div className="relative group px-1">
      <Link
        href={link.href}
        className={`
          relative inline-flex items-center gap-1
          px-3.5 py-2 rounded-full
          text-[16px] font-normal
          transition-all duration-300 ease-out
          ${isActive 
            ? "text-black bg-black/5" 
            : "text-black hover:bg-black/5 hover:text-black"
          }
        `}
      >
        <span>{link.name}</span>
        {link.dropdown && (
          <svg 
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100 group-hover:rotate-180"}`} 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Glass Dropdown */}
      {link.dropdown && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] w-[260px]">
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
          <div className="bg-white/80 backdrop-blur-2xl rounded-2xl p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white/50 ring-1 ring-black/5 overflow-hidden">
            {link.dropdown.map((subLink, idx) => (
              <Link
                key={idx}
                href={subLink.href}
                className="block px-4 py-3 text-[15px] font-normal text-gray-600 hover:text-black hover:bg-white/80 rounded-xl transition-all"
              >
                {subLink.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;