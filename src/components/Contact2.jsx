"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Loader2,
} from "lucide-react";

export default function ContactFormModern() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [feedback, setFeedback] = useState("");
  const [shake, setShake] = useState(false);

  const abortRef = useRef(null);

  const services = useMemo(
    () => [
      "Career Counseling",
      "University Shortlisting",
      "SOP / LOR Support",
      "Scholarship Guidance",
      "Visa Counseling",
      "Pre-Departure Briefing",
      "Language Preparation",
      "Other",
    ],
    []
  );

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validate.fullName || !validate.email || !validate.service) {
      setStatus("error");
      setFeedback("Please fill in your name, a valid email, and select a service.");
      triggerShake();
      return;
    }

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
      setFeedback("Message sent successfully. We will get back to you within 24 hours.");
      setForm({ fullName: "", email: "", service: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
        setFeedback("");
      }, 3500);
    } catch (err) {
      if (err?.name === "AbortError") return;
      setStatus("error");
      setFeedback("Network error. Please try again.");
      triggerShake();
    }
  };

  useEffect(() => {
    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const isLoading = status === "loading";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="lg:w-3/5"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[2px] w-8 bg-blue-600" />
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          Get in Touch
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl font-medium text-slate-900 mb-6 font-serif leading-tight">
        Let's start a conversation.
      </h2>

      <p className="text-slate-500 text-lg mb-8 max-w-lg">
        Whether you have a question about admissions, need assistance with visas,
        or just want to say hello, we are here to help.
      </p>

      {/* Feedback Banner */}
      <div
        className={[
          "mb-8 overflow-hidden rounded-2xl border px-5 py-4 text-sm transition-all duration-300",
          feedback ? "max-h-32 opacity-100" : "max-h-0 opacity-0 border-transparent px-0 py-0",
          status === "success"
            ? "border-emerald-200 bg-emerald-50 text-emerald-900"
            : status === "error"
            ? "border-red-200 bg-red-50 text-red-900"
            : "border-transparent bg-transparent",
        ].join(" ")}
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          {status === "success" && (
            <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
          )}
          {status === "error" && (
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          )}
          <p className="leading-relaxed">{feedback}</p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className={[
          "space-y-8",
          shake ? "animate-[wiggle_.42s_ease-in-out_1]" : "",
        ].join(" ")}
      >
        <style jsx global>{`
          @keyframes wiggle {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-6px); }
            40% { transform: translateX(6px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <FloatingInput
            label="Name"
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            disabled={isLoading}
          />

          {/* Email */}
          <FloatingInput
            label="Email Address"
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            disabled={isLoading}
          />
        </div>

        {/* Services */}
        <div className="relative">
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={onChange}
            disabled={isLoading}
            className="peer w-full border-b border-slate-300 bg-transparent py-3 text-slate-900 focus:border-blue-600 focus:outline-none transition-colors disabled:opacity-60"
          >
            <option value="" disabled>
              Select a service...
            </option>
            {services.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <label
            htmlFor="service"
            className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all peer-focus:text-blue-600"
          >
            Services
          </label>
        </div>

        {/* Message */}
        <FloatingTextarea
          label="Message"
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          disabled={isLoading}
        />

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            <span>{isLoading ? "Sending..." : "Send Message"}</span>

            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

/* ---------- Small Helpers ---------- */

function FloatingInput({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  disabled,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        disabled={disabled}
        className="peer w-full border-b border-slate-300 bg-transparent py-3 text-slate-900 placeholder-transparent focus:border-blue-600 focus:outline-none transition-colors disabled:opacity-60"
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  id,
  name,
  value,
  onChange,
  disabled,
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={4}
        value={value}
        onChange={onChange}
        placeholder=" "
        disabled={disabled}
        className="peer w-full border-b border-slate-300 bg-transparent py-3 text-slate-900 placeholder-transparent focus:border-blue-600 focus:outline-none transition-colors resize-none disabled:opacity-60"
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-3.5 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all
                   peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case
                   peer-focus:-top-3.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-blue-600"
      >
        {label}
      </label>
    </div>
  );
}
