





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
      {/* --- DESKTOP NAV WRAPPER --- */}
      <nav
        className={[
          "fixed left-1/2 -translate-x-1/2 z-50",
          "w-[98%] max-w-[1400px]",
          "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          "flex items-center justify-between pointer-events-none",
          isScrolled ? "top-2" : "top-5",
        ].join(" ")}
      >
        {/* 1. LOGO AREA */}
        {/* <div className="pointer-events-auto pl-1 mr-2">
          <Link href="/" className="relative flex items-center group">
            <div className="rounded-xl bg-white/90 backdrop-blur border border-black/10 dark:border-white/10 shadow-md overflow-hidden">
              <Image
                src="/logos/logo.png"
                alt="EEIC Logo"
                width={200}
                height={200}
                className="
                  w-28 h-28
                  sm:w-36 sm:h-36
                  md:w-34 md:h-24
                  object-contain 
                  scale-125 
                  p-1
                  transition-transform duration-500 
                  
                "
                priority
              />
            </div>
          </Link>
        </div> */}
{/* 1. LOGO AREA – responsive magic */}
<div className="pointer-events-auto pl-1.5 pr-2 md:pr-3 flex-shrink-0">
  <Link href="/" className="relative flex items-center group">
    <div className="
      rounded-xl bg-white/90 backdrop-blur 
      border border-black/10 dark:border-white/10 
      shadow-md overflow-hidden
      transition-all duration-300
      w-[6rem] h-[6rem]          /* mobile base – ~72px */
      xs:w-20 xs:h-20                 /* small phones landscape ~80px */
      sm:w-28 sm:h-28                 /* tablet / larger phones ~112px */
      md:w-34 md:h-24                 /* your perfect desktop size */
    ">
      <Image
        src="/logos/logo.png"
        alt="EEIC Logo"
        width={340}                     // high-res source for sharpness
        height={240}
        className="
          w-full h-full
          object-contain
          scale-125                     // your preferred enlargement
          p-1.5                         // inner breathing room
          transition-transform duration-500 
          group-hover:scale-135         // slightly more dramatic hover
        "
        priority
      />
    </div>
  </Link>
</div>
        {/* 2. NAVIGATION CAPSULE */}
        <div
          className={[
            "relative rounded-full pointer-events-auto ",
            "md:bg-white/20 md:backdrop-blur-lg md:saturate-[1.2]",
            "md:border md:border-white/40 md:shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]",
            "px-2 pl-4 pr-2 sm:px-6",
            isScrolled ? "py-2" : "py-2.5",
            "flex items-center gap-6",
            "transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
          ].join(" ")}
        >
          {/* Desktop Links */}
          <div className="relative z-10 hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <DesktopNavItem key={index} link={link} currentPath={pathname} />
            ))}
          </div>

          {/* Right Action - Book Button */}
          <div className="relative z-10 hidden md:flex items-center gap-4">
            <BookButton
              className={`
                group relative flex items-center gap-3 whitespace-nowrap
                pl-2 pr-6 rounded-full
                bg-[#242e3c] hover:bg-[#E5E5E5] hover:text-black text-white
                border border-black/5
                overflow-hidden
                transition-all duration-300 ease-out
                shadow-sm hover:shadow-md cursor-pointer
                ${isScrolled ? "h-[44px]" : "h-[50px]"} 
              `}
            >
              <span
                className="
                relative z-10 flex h-9 w-9 items-center justify-center
                rounded-full
                bg-[#f06625] border border-black/10
                text-black shadow-sm
                transition-transform duration-300
                group-hover:scale-110
              "
              >
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
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
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
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              Menu
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-black"
              aria-label="Close Menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex-1 overflow-y-auto px-6 pb-12">
            <div className="flex flex-col gap-2 mt-4">
              {navLinks.map((link, i) => (
                <div
                  key={i}
                  className="border-b border-gray-100 last:border-0 py-4"
                >
                  <div
                    className="flex justify-between items-center group cursor-pointer"
                    onClick={() =>
                      link.dropdown &&
                      setActiveMobileDropdown(
                        activeMobileDropdown === i ? null : i
                      )
                    }
                  >
                    {/* MOBILE: Tools special now ORANGE+BLUE (no other mobile changes) */}
                    <Link
                      href={link.href}
                      className={[
                        "text-[22px] font-medium transition-all duration-300",
                        link.isSpecial
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e01] to-[#2563eb]"
                          : "text-slate-900",
                      ].join(" ")}
                      onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                    >
                      {link.isSpecial ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5 text-[#ff5e01]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
                          </svg>
                          {link.name}
                          <span className="ml-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff5e01] to-[#2563eb] text-white">
                            Premium
                          </span>
                        </span>
                      ) : (
                        link.name
                      )}
                    </Link>

                    {link.dropdown && (
                      <span
                        className={`transform transition-transform duration-300 text-black/40 ${
                          activeMobileDropdown === i ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Mobile Dropdown (UNCHANGED) */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      activeMobileDropdown === i
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
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
              <BookButton className="w-full h-14 bg-[#ff5e01] text-white rounded-2xl font-semibold text-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-xl">
                <span>Book Counselling</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
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

  const isActive =
    link.href === "/" ? currentPath === "/" : currentPath.startsWith(link.href);

  // DESKTOP: Tools special now ORANGE+BLUE
  if (isTools) {
    return (
      <Link
        href={link.href}
        className={[
          "group relative mx-1 inline-flex items-center rounded-full",
          "px-3.5 py-2 sm:px-4 sm:py-2",
          "bg-gradient-to-r from-orange-50/80 to-blue-50/80",
          "ring-1 ring-orange-200/70",
          "hover:ring-blue-300 hover:shadow-sm transition-all duration-300",
        ].join(" ")}
      >
        <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-orange-200/20 to-blue-200/20" />

        <span className="relative flex items-center gap-2">
          <svg
            className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#ff5e01]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5z" />
          </svg>

          <span
            className={[
              "text-[15px] sm:text-[16px] font-medium",
              "text-transparent bg-clip-text bg-gradient-to-r from-[#ff5e01] to-[#2563eb]",
            ].join(" ")}
          >
            {link.name}
          </span>

          <span className="hidden xl:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#ff5e01] to-[#2563eb] text-white">
            Premium
          </span>
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
          ${
            isActive
              ? "text-black bg-black/5"
              : "text-black hover:bg-black/5 hover:text-black"
          }
        `}
      >
        <span>{link.name}</span>
        {link.dropdown && (
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isActive
                ? "opacity-100"
                : "opacity-40 group-hover:opacity-100 group-hover:rotate-180"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </Link>

      {/* Dropdown (DESKTOP ONLY): PURE WHITE background now */}
      {link.dropdown && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] w-[260px]">
          <div className="absolute -top-4 left-0 w-full h-4 bg-transparent" />
          <div className="bg-white rounded-2xl p-2 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-black/10 ring-1 ring-black/5 overflow-hidden">
            {link.dropdown.map((subLink, idx) => (
              <Link
                key={idx}
                href={subLink.href}
                className="block px-4 py-3 text-[15px] font-normal text-gray-700 hover:text-black hover:bg-gray-50 rounded-xl transition-all"
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
