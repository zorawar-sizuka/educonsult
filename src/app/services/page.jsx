// "use client";

// import React from "react";
// import Image from "next/image";
// import Link from "next/link"; 
// import { motion } from "framer-motion";
// import { 
//   GraduationCap, 
//   Plane, 
//   BookOpen, 
//   Award, 
//   ArrowRight, 
//   Plus 
// } from "lucide-react";
// import BookButton from "@/components/FormButton/BookButton";

// // --- Data: Service Offerings ---
// const serviceOfferings = [
//   {
//     id: 1,
//     title: "ADMISSION COUNSELLING",
//     desc: "Personalized guidance to navigate university applications, helping you select the right course and college for your profile.",
//     Icon: GraduationCap,
//     link: "/services/admission",
//   },
//   {
//     id: 2,
//     title: "VISA ASSISTANCE",
//     desc: "End-to-end support for visa documentation and interview preparation to ensure a smooth departure process.",
//     Icon: Plane, 
//     link: "/services/visa",
//   },
//   {
//     id: 3,
//     title: "TEST PREPARATION",
//     desc: "Comprehensive coaching for IELTS, TOEFL, SAT, and GRE with expert tutors to help you achieve your target scores.",
//     Icon: BookOpen, 
//     link: "/services/test-prep",
//   },
//   {
//     id: 4,
//     title: "SCHOLARSHIP GUIDANCE",
//     desc: "Strategic advice on finding and applying for financial aid and merit-based scholarships to fund your education.",
//     Icon: Award, 
//     link: "/services/scholarships",
//   },
// ];

// export default function ServicesPage() {
//   return (
//     <div className="w-full bg-white">
      
//       {/* -------------------------------------------------------
//           1. HERO SECTION
//       ------------------------------------------------------- */}
//       <div className="relative h-[60vh] w-full overflow-hidden">
//         <motion.div 
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//           className="absolute inset-0"
//         >
//           <Image
//             src="/services/service.png"
//             alt="Services Header"
//             fill
//             className="object-cover"
//             priority
//           />
//         </motion.div>
        
//         {/* Overlays */}
//         <div className="absolute inset-0 bg-black/50" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        
//         {/* Title */}
//         <div className="relative z-10 h-full flex items-center justify-center">
//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="text-6xl md:text-8xl font-medium tracking-tight text-white font-serif"
//           >
//             Services
//           </motion.h1>
//         </div>
//       </div>

//       {/* -------------------------------------------------------
//           2. INTRO SECTION (Normal Scrolling)
//       ------------------------------------------------------- */}
//       <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          
//           {/* Left Column: Tag + Description 
//               FIX: Removed 'sticky top-24' so this scrolls naturally with the rest of the page.
//           */}
//           <div className="flex flex-col gap-8">
//              {/* Green Label */}
//              <div className="inline-flex items-center gap-2 bg-[#D2F023] px-3 py-1.5 self-start">
//                 <Plus className="w-3 h-3 text-black" />
//                 <span className="text-xs font-bold uppercase tracking-widest text-black">
//                   Our Services
//                 </span>
//              </div>

//              {/* Description Text */}
//              <div className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-md">
//                <p className="mb-6">
//                  By combining our industry knowledge with student-centric methodologies, we develop pathways that drive academic success. Our team of experts is dedicated to understanding your unique profile.
//                </p>
//                <p>
//                  Whether you're looking for Ivy League admissions, visa clearance, or scholarship support, we have the expertise to guide you every step of the way.
//                </p>
//              </div>
//           </div>

//           {/* Right Column: Headline */}
//           <div className="lg:justify-self-end">
//             <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-slate-900 leading-[1.05] tracking-tight font-serif lg:text-right">
//               We offer a wide    <br />
//               range of services to help you<br />
//               study abroad.
//             </h2>
//           </div>

//         </div>
//       </section>

//       {/* -------------------------------------------------------
//           3. SERVICE OFFERINGS GRID
//       ------------------------------------------------------- */}
//       <section className="bg-[#F3F2F0] py-24 px-6 lg:px-12 rounded-t-[3rem] lg:rounded-t-[4rem]">
//         <div className="max-w-7xl mx-auto">
          
//           {/* Section Header */}
//           <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
//             <div className="max-w-2xl">
//               <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 block">
//                 Offerings
//               </span>
//               <h2 className="text-4xl md:text-5xl font-medium text-slate-900 leading-tight">
//                 Explore our service offerings
//               </h2>
//               <p className="mt-6 text-slate-600 max-w-xl leading-relaxed">
//                 Focused on your unique needs, our team delivers solutions that blend deep industry knowledge and cutting-edge strategies.
//               </p>
//             </div>

//             {/* Optional CTA */}
           

//             <BookButton 
//                 className="bg-[#D2F023] hover:bg-[#c2e015] text-slate-900 px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors duration-300 shadow-sm flex items-center justify-center gap-2"
//               >
//                 <span className="relative z-10 text-sm font-medium tracking-wide">
//                 Book Consultation
//                 </span>
//                 <span className="relative z-10 w-6 h-6 bg-white rounded-full flex items-center justify-center text-slate-900 transition-transform duration-300 group-hover:rotate-45">
//                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                   </svg>
//                 </span>
//                 <div className="absolute inset-0 bg-slate-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
//               </BookButton>



//           </div>

//           {/* The 4 Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {serviceOfferings.map((item, index) => (
//               <ServiceCard key={item.id} item={item} index={index} />
//             ))}
//           </div>

//         </div> 

  
//       </section>

//     </div>
//   );
// }

// // -------------------------------------------------------
// // Sub-component: Service Card
// // -------------------------------------------------------
// function ServiceCard({ item, index }) {
//   const { Icon, link } = item; 

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       className="bg-white rounded-3xl p-8 flex flex-col h-full hover:shadow-xl hover:shadow-stone-200/50 hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-stone-100"
//     >
//       {/* Icon Box */}
//       <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center mb-8 text-stone-900">
//         <Icon size={24} strokeWidth={1.5} />
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4 leading-relaxed">
//           {item.title}
//         </h3>
//         <p className="text-slate-500 text-sm leading-relaxed">
//           {item.desc}
//         </p>
//       </div>

//       {/* Bottom Arrow / Link */}
//       <div className="mt-8 pt-6 border-t border-stone-100">
//         {link ? (
//           <Link href={link} className="flex justify-between items-center group cursor-pointer">
//             <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
//               Learn more
//             </span>
//             <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors transform group-hover:translate-x-1 duration-300" />
//           </Link>
//         ) : (
//           <div className="flex justify-between items-center group cursor-default">
//             <span className="text-xs font-semibold text-slate-300">Coming Soon</span>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }





"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Plane,
  BookOpen,
  Award,
  ArrowRight,
  Plus,
} from "lucide-react";
import BookButton from "@/components/FormButton/BookButton";

const serviceOfferings = [
  {
    id: 1,
    title: "ADMISSION COUNSELLING",
    desc: "Personalized guidance to navigate university applications, helping you select the right course and college for your profile.",
    Icon: GraduationCap,
    link: "/services/admission",
  },
  {
    id: 2,
    title: "VISA ASSISTANCE",
    desc: "End-to-end support for visa documentation and interview preparation to ensure a smooth departure process.",
    Icon: Plane,
    link: "/services/visa",
  },
  {
    id: 3,
    title: "TEST PREPARATION",
    desc: "Comprehensive coaching for IELTS, TOEFL, SAT, and GRE with expert tutors to help you achieve your target scores.",
    Icon: BookOpen,
    link: "/services/test-prep",
  },
  {
    id: 4,
    title: "SCHOLARSHIP GUIDANCE",
    desc: "Strategic advice on finding and applying for financial aid and merit-based scholarships to fund your education.",
    Icon: Award,
    link: "/services/scholarships",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative">
        <div className="relative w-full overflow-hidden">
          <div className="relative min-h-[44svh] sm:min-h-[52svh] md:min-h-[56svh] lg:min-h-[60svh]">
            <motion.div
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/services/service.png"
                alt="Services Header"
                fill
                priority
                sizes="100vw"
                className="object-cover brightness-[0.9]"
              />
            </motion.div>

            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent" />

            <div className="relative z-10 flex items-center justify-center min-h-[34svh] sm:min-h-[42svh] md:min-h-[46svh] lg:min-h-[50svh] px-5">
              <h1 className="text-white font-serif font-medium tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-lg">
                Services
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#D2F023] px-5 py-2.5">
              <Plus className="w-4 h-4 text-black" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-black">
                Our Services
              </span>
            </div>

            <div className="mt-10 space-y-10 text-slate-600 text-lg leading-relaxed max-w-xl">
              <p>
                By combining our industry knowledge with student-centric
                methodologies, we develop pathways that drive academic success.
                Our team of experts is dedicated to understanding your unique
                profile.
              </p>
              <p>
                Whether you're looking for Ivy League admissions, visa clearance,
                or scholarship support, we have the expertise to guide you every
                step of the way.
              </p>
            </div>
          </div>

          <div className="lg:text-right">
            <h2 className="font-serif text-slate-900 font-medium tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              We offer a wide
              <br />
              range of services
              <br />
              to help you
              <br />
              study abroad.
            </h2>
          </div>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3F2F0] rounded-[3rem] px-6 sm:px-10 lg:px-14 py-14 sm:py-16 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-10">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                  Offerings
                </p>

                <h3 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
                  Explore our service offerings
                </h3>

                <p className="mt-5 text-slate-600 text-lg leading-relaxed max-w-xl">
                  Focused on your unique needs, our team delivers solutions that
                  blend deep industry knowledge and cutting-edge strategies.
                </p>
              </div>

              <div className="lg:pt-10">
                <BookButton className="group inline-flex items-center justify-center gap-4 bg-[#D2F023] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-sm transition hover:brightness-[0.98]">
                  Book Consultation
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center border border-black/10 transition-transform duration-300 group-hover:rotate-90">
                    <Plus className="w-4 h-4" />
                  </span>
                </BookButton>
              </div>
            </div>

            {/* CARDS */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceOfferings.map((item) => (
                <OfferingCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function OfferingCard({ item }) {
  const { Icon, link } = item;

  return (
    <div className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-black/[0.03] flex flex-col transition hover:shadow-lg hover:-translate-y-1 duration-300">
      
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#F3F2F0] flex items-center justify-center text-slate-900">
        <Icon className="w-5 h-5" strokeWidth={1.6} />
      </div>

      {/* Title */}
      <h4 className="mt-6 text-sm font-extrabold uppercase tracking-[0.22em] text-slate-900">
        {item.title}
      </h4>

      {/* Description */}
      <p className="mt-3 text-slate-600 leading-relaxed text-sm line-clamp-4">
        {item.desc}
      </p>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-slate-100">
        {link ? (
          <Link
            href={link}
            className="flex items-center justify-between text-slate-500 hover:text-slate-900 transition-colors"
          >
            <span className="text-sm font-semibold">Learn more</span>
            <ArrowRight className="w-4 h-4 opacity-40" />
          </Link>
        ) : (
          <span className="text-sm font-semibold text-slate-400">
            Coming soon
          </span>
        )}
      </div>
    </div>
  );
}
