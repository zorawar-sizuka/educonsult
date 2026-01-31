"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import FooterCTA from "./CTA";  //=>Footer CTA//

export default function ContactSection({ imageSrc = "/footer/form_footer.jpg" }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    service: "",
    message: "",
  });

  // UX state
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState(""); // success/error message
  const [shake, setShake] = useState(false);

  const abortRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return {
      fullName: form.fullName.trim().length > 1,
      email: emailOk,
      service: form.service.trim().length > 0,
    };
  }, [form]);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 420);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation (fast feedback)
    if (!validate.fullName || !validate.email || !validate.service) {
      setStatus("error");
      setFeedback("Please fill Full Name, a valid Email, and select a Service.");
      triggerShake();
      return;
    }

    // Cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setFeedback(data?.error || "Submission failed. Please try again.");
        triggerShake();
        return;
      }

      setStatus("success");
      setFeedback("Submitted! Our team will get back to you within 24 hours.");
      setForm({ fullName: "", email: "", service: "", message: "" });

      // auto-clear success
      setTimeout(() => {
        setStatus("idle");
        setFeedback("");
      }, 3500);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setStatus("error");
      setFeedback("Network error. Check your connection and try again.");
      triggerShake();
    }
  };

  // Cleanup abort on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const isLoading = status === "loading";

  return (
    <section className="bg-[#3c55a5] py-14 lg:py-20"> 
    {/* FOOTER CTA */}
      <FooterCTA /> 
       {/* FOOTER CTA */} 
       
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          {/* LEFT: Form panel */}
          <div className="lg:col-span-7 rounded-[2.5rem] bg-[#3c55a5] p-8 text-white sm:p-10">
            <div className="flex items-center gap-3 text-white/85">
              <span className="h-2 w-2 rounded-full bg-white/90" />
              <p className="text-sm font-medium">Contact us</p>
            </div>

            <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl">
              Get in touch with our <br className="hidden sm:block" />
              experts team
            </h2>

            {/* Feedback banner (smooth) */}
            <div
              className={[
                "mt-6 overflow-hidden rounded-2xl border px-5 py-4 text-sm transition-all duration-300",
                feedback ? "max-h-32 opacity-100" : "max-h-0 opacity-0 border-transparent px-0 py-0",
                status === "success"
                  ? "border-white/20 bg-white/10 text-white"
                  : status === "error"
                  ? "border-red-200/20 bg-red-500/10 text-red-50"
                  : "border-transparent bg-transparent text-white",
              ].join(" ")}
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5">
                  {status === "success" ? "✅" : status === "error" ? "⚠️" : ""}
                </span>
                <p className="leading-relaxed">{feedback}</p>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className={[
                "mt-8 space-y-5",
                shake ? "animate-[shake_420ms_ease-in-out]" : "",
              ].join(" ")}
            >
              {/* Row 1 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={onChange}
                  placeholder="Full Name"
                  disabled={isLoading}
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email Address"
                  disabled={isLoading}
                />
              </div>

              {/* Row 2 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <Select
                  label="Service"
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  placeholder="Service..."
                  options={[
                    "Career Counseling",
                    "University Shortlisting",
                    "SOP / LOR Support",
                    "Scholarship Guidance",
                    "Visa Counseling",
                    "Pre-Departure Briefing",
                    "Language Preparation",
                    "Other",
                  ]}
                  disabled={isLoading}
                />
              </div>

              {/* Message */}
              <Textarea
                label="How can we help?"
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="How can we help?"
                disabled={isLoading}
              />

              {/* Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={[
                    "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold backdrop-blur transition",
                    "bg-white/15 text-white hover:bg-white/20",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                    "active:scale-[0.99]",
                  ].join(" ")}
                >
                  {isLoading ? (
                    <>
                      Submitting
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#1F5A53]">
                        <Spinner />
                      </span>
                    </>
                  ) : (
                    <>
                      Submit your form
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#1F5A53] transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </>
                  )}
                </button>

                <p className="mt-4 text-xs text-white/70">
                  We’ll respond within 24 hours. No spam, only guidance.
                </p>
              </div>
            </form>

            {/* Local keyframes (no extra libs) */}
            <style jsx>{`
              @keyframes shake {
                0%,
                100% {
                  transform: translateX(0);
                }
                20% {
                  transform: translateX(-6px);
                }
                40% {
                  transform: translateX(6px);
                }
                60% {
                  transform: translateX(-4px);
                }
                80% {
                  transform: translateX(4px);
                }
              }
            `}</style>
          </div>

          {/* RIGHT: Image card */}
          <div className="lg:col-span-5">
            <div className="relative h-[420px] overflow-hidden rounded-[2.5rem] bg-slate-100 shadow-[0_28px_90px_rgba(15,23,42,0.12)] sm:h-[520px] lg:h-full">
              <Image
                src={imageSrc}
                alt="Support team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small UI helpers ---------- */

function FieldShell({ label, children }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      {children}
    </label>
  );
}

function baseFieldClass(disabled) {
  return [
    "w-full rounded-2xl",
    "bg-white/10 text-white placeholder:text-white/65",
    "border border-white/10",
    "px-5 py-4 text-sm",
    "outline-none transition",
    "focus:border-white/30 focus:bg-white/12",
    disabled ? "opacity-70 cursor-not-allowed" : "",
  ].join(" ");
}

function Input({ label, name, value, onChange, placeholder, type = "text", disabled }) {
  return (
    <FieldShell label={label}>
      <input
        className={baseFieldClass(disabled)}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
      />
    </FieldShell>
  );
}

function Select({ label, name, value, onChange, placeholder, options, disabled }) {
  return (
    <FieldShell label={label}>
      <select
        className={baseFieldClass(disabled)}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-slate-900">
            {opt}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

function Textarea({ label, name, value, onChange, placeholder, disabled }) {
  return (
    <FieldShell label={label}>
      <textarea
        className={[baseFieldClass(disabled), "min-h-[140px] resize-none"].join(" ")}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </FieldShell>
  );
}

function Spinner() {
  return (
    <span className="inline-block h-4 w-4 rounded-full border-2 border-[#1F5A53] border-t-transparent animate-spin" />
  );
}
