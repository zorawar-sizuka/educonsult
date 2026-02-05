'use client';

import React, { useState } from "react";
import { Mail, Loader2, CheckCircle } from "lucide-react";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  return (
    <section className="relative rounded-[2.5rem] bg-[#111] text-white overflow-hidden shadow-2xl w-[90%] mx-auto">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-900/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 py-20 px-6 md:px-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Text */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6 text-indigo-300">
            <Mail className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">
              Newsletter
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-none tracking-tight">
            Don&apos;t miss a beat.
          </h2>

          <p className="text-lg text-white/60 font-light leading-relaxed">
            Get early access to tickets, exclusive workshops, and industry insights
            delivered straight to your inbox.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubscribe}
          className="
            w-full max-w-md
            bg-white/5 backdrop-blur-sm
            p-2 rounded-3xl sm:rounded-full
            border border-white/10
            flex flex-col sm:flex-row gap-3 sm:gap-0
          "
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="
              w-full sm:flex-1
              bg-transparent
              px-6 py-4
              text-white placeholder-white/30
              focus:outline-none
              text-center sm:text-left
            "
          />

          <button
            disabled={status === "loading"}
            className="
              w-full sm:w-auto
              bg-white text-black
              px-8 py-4 rounded-full
              font-bold
              hover:bg-indigo-500 hover:text-white
              transition-all
              shadow-lg hover:shadow-indigo-500/25
              shrink-0
              flex items-center justify-center gap-2
            "
          >
            {status === "loading" ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : status === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              "Join List"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
