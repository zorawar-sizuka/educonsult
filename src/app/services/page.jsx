


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
            <div className="inline-flex items-center gap-2 bg-[#FF7700] px-5 py-2.5">
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
                <BookButton className="group inline-flex items-center justify-center gap-4 bg-[#f07841] text-black px-10 py-4 rounded-xl font-bold uppercase tracking-wider text-sm shadow-sm transition hover:brightness-[0.98]">
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
