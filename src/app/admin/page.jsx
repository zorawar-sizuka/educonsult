// app/admin/page.jsx (unchanged from last version)
"use client";
 
import React, { useState, useEffect } from "react"; 
import { useSession, signOut } from "next-auth/react";
import Lottie from "lottie-react";
import LeadsSection from "@/components/Dashboard-Comp/LeadSection";
import EventsSection from "@/components/Dashboard-Comp/EventsSection";

export default function AdminPage() { 
  const { data: session, status } = useSession(); 
  
  const [activeTab, setActiveTab] = useState("leads");
  const [animationData, setAnimationData] = useState(null);
  const [lottieError, setLottieError] = useState(false);

  useEffect(() => {
    // Load Lottie animation for hero
    fetch("/lottie/dashboard.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load animation");
        return res.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => {
        console.error("Lottie Load Error:", err);
        setLottieError(true);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* LOTTIE HERO SECTION */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center justify-center text-center my-18">
            <div className="w-[60%] max-w-xs mx-auto">
              {!lottieError && animationData ? (
                <Lottie className="aspect-square w-full" animationData={animationData} loop={true} />
              ) : (
                <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-slate-500 text-sm">Dashboard</span>
                </div>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mt-4 tracking-tight">
              <span className="text-blue-600 italic">Dashboard</span>
            </h1>
            <p className="text-slate-500 max-w-xl">
              Smart tools for smart students. Real-time data, instant validation, and PDF generation.
            </p>
          </div>

          {/* TABS */} 
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-serif text-slate-900">Admin Dashboard</h1>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  activeTab === "leads"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Leads & Data
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${
                  activeTab === "events"
                    ? "bg-slate-900 text-white shadow"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Events CMS
              </button> 
          
<button
  onClick={() => signOut({ callbackUrl: "/" })}
  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
>
  Logout
</button>
            </div> 
          </div>

          {/* === TAB 1: LEADS & DATA === */}
          {activeTab === "leads" && <LeadsSection />}

          {/* === TAB 2: EVENTS CMS === */}
          {activeTab === "events" && <EventsSection />}
        </div>
      </div>
    </div>
  );
}