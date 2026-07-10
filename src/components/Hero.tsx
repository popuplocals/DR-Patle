"use client";

import { motion } from "framer-motion";
import { Phone, CalendarCheck, Star, Stethoscope } from "lucide-react";
import ParticleCanvas from "./ui/ParticleCanvas";
import { DOCTOR } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-navy pt-28 pb-16"
    >
      <ParticleCanvas />

      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal/20 blur-3xl animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-16 h-[28rem] w-[28rem] rounded-full bg-teal-light/10 blur-3xl animate-float-slow"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-teal-lighter/10 blur-3xl animate-float"
      />

      <div className="section-container relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-white/90">
              Now Accepting Appointments
            </span>
          </div>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            <span className="gradient-text">Expert Bone &amp; Joint Care</span>
            <br />
            <span className="text-white/90">in Jabalpur</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            {DOCTOR.name}, {DOCTOR.degree}, brings {DOCTOR.experienceYears}+
            years of orthopaedic expertise to Adhartal — offering joint
            replacement, trauma care, sports medicine, and rehabilitation
            under one roof at {DOCTOR.hospital}.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#appointment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition-transform hover:scale-105"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={`tel:${DOCTOR.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-amber-400"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">
                {DOCTOR.rating}/5 ({DOCTOR.reviewCount} reviews)
              </span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="text-sm font-medium">
              {DOCTOR.surgeriesCount}+ Surgeries Performed
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="glass relative rounded-3xl p-6 shadow-2xl">
            <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-navy-lighter to-navy-light">
              <Stethoscope className="h-24 w-24 text-teal-light/40" />
              <span className="absolute bottom-3 text-xs font-medium text-white/40">
                Doctor Photo
              </span>
            </div>

            <div className="mt-5">
              <h3 className="font-serif text-xl font-bold text-white">
                {DOCTOR.name}
              </h3>
              <p className="text-sm font-medium text-teal-light">
                {DOCTOR.title}
              </p>
              <p className="mt-1 text-xs text-white/50">{DOCTOR.degree}</p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-white/10 pt-5">
              <div>
                <p className="font-serif text-2xl font-bold text-teal-light">
                  {DOCTOR.experienceYears}+
                </p>
                <p className="text-xs text-white/50">Years Experience</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-teal-light">
                  {DOCTOR.surgeriesCount}+
                </p>
                <p className="text-xs text-white/50">Surgeries Done</p>
              </div>
            </div>
          </div>

          <div className="glass absolute -left-6 -bottom-6 hidden rounded-2xl px-5 py-3 sm:block">
            <p className="text-xs text-white/50">Google Rating</p>
            <p className="flex items-center gap-1 font-serif text-lg font-bold text-white">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              {DOCTOR.rating}/5
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
