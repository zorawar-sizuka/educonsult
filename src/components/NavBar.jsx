"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BookButton from "./FormButton/BookButton"; // IMPORT THE REAL LOGIC COMPONENT
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      {
        name: "Services",
        href: "/services",
        dropdown: [
          { name: "Services", href: "/services" },
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
          { name: "Global", href: "/countries" },
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
          { name: "About", href: "/about" },
          { name: "FAQs", href: "/appendix/faqs" },
          { name: "Privacy Policy", href: "/appendix/privacy-policy" },
          { name: "Terms & Condition", href: "/appendix/t&c" },
        ],
      },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <>
      {/* DESKTOP CAPSULE */}
      <nav
        className={[
          "fixed left-1/2 -translate-x-1/2 z-50",
          "w-[98%] max-w-[1400px]",
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          isScrolled ? "top-3" : "top-5",
        ].join(" ")}
      >
        <div
          className={[
            "relative rounded-full",
            // Glassmorphism: White with 40% opacity + High Blur + Saturation
            "bg-white/20 backdrop-blur-lg saturate-[1.2]",
            "border border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
            "px-5 sm:px-6",
            "py-2.5",
            "flex items-center justify-between",
          ].join(" ")}
        >
          {/* Logo */}
          <a href="/" className="relative z-10 flex items-center pl-1">
   <Image
    src="/logo.png" // Ensure logo.png is inside your public/ folder
    alt="ROSS Logo"
    width={120}     // Intrinsic width of your image (adjust as needed)
    height={40}     // Intrinsic height
    className="h-9 w-auto object-contain" // h-9 (36px) matches your previous circle size
    priority        // Loads image immediately as LCP
  />
</a>

          {/* Desktop Links */}
          <div className="relative z-10 hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <DesktopNavItem key={index} link={link} isActive={pathname === link.href} />
            ))}
          </div>

          {/* Right Action Area - USING THE REAL BOOK BUTTON */}
          <div className="relative z-10 hidden md:flex items-center gap-4">
            <BookButton 
              className="
                group relative flex items-center gap-3
                h-[50px] pl-2 pr-6 rounded-full
                bg-[#242e3c] hover:bg-[#E5E5E5] hover:text-black text-white
                border border-black/5
                overflow-hidden
                transition-all duration-300 ease-out
                shadow-sm hover:shadow-md cursor-pointer
              "
            >
              {/* This content is passed as 'children' to your BookButton component */}
              <span className="
                relative z-10 flex h-9 w-9 items-center justify-center
                rounded-full
                bg-white border border-black/10
                text-black shadow-sm
                transition-transform duration-300
                group-hover:scale-105
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
              <span className="relative z-10 text-[15px] font-light">
                Book Counselling
              </span>
            </BookButton>
          </div>

          {/* Mobile Toggle */}
          <button
            className="relative z-10 md:hidden p-3 rounded-full bg-white/50 border border-black/5 hover:bg-white transition-colors"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={[
          "fixed inset-0 z-[60] bg-[#FAFAFA]",
          "transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
          mobileMenuOpen ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 pt-8">
            <span className="text-2xl font-bold tracking-tight text-black">Menu</span>
            <button 
               onClick={() => setMobileMenuOpen(false)}
               className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-black"
            >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
               </svg>
            </button>
          </div>
          
          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-6 pb-12">
             <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <div key={i} className="border-b border-gray-100 last:border-0 py-4">
                    <div 
                      className="flex justify-between items-center group cursor-pointer"
                      onClick={() => link.dropdown && setActiveMobileDropdown(activeMobileDropdown === i ? null : i)}
                    >
                      <Link 
                        href={link.href} 
                        className="text-[22px] font-medium text-black"
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
                    
                    {/* Mobile Dropdown Animation */}
                    <div className={`grid transition-all duration-300 ease-in-out ${activeMobileDropdown === i ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
                       <div className="overflow-hidden">
                         <div className="flex flex-col gap-3 pl-2 border-l-2 border-gray-200 ml-1">
                            {link.dropdown?.map((sub, j) => (
                              <Link 
                                key={j} 
                                href={sub.href}
                                className="text-[16px] text-gray-500 hover:text-black font-medium"
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
             
             {/* Mobile CTA using Real BookButton */}
             <div className="mt-8">
                <BookButton className="w-full h-14 bg-black text-white rounded-2xl font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center">
                    Book Counselling
                </BookButton>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- 3. DESKTOP NAV ITEM (Black, Normal Weight, 16px) ---
function DesktopNavItem({ link, isActive }) {
  const isTools = link.isSpecial;

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
          ${isActive ? "text-black bg-black/5" : "text-black hover:bg-black/5 hover:text-black"}
        `}
      >
        <span>{link.name}</span>
        {link.dropdown && (
          <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Glass Dropdown */}
      {link.dropdown && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] w-[260px]">
          {/* Bridge */}
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