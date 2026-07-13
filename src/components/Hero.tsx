"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, CalendarCheck, Star, Clock, BadgeCheck } from "lucide-react";
import ParticleCanvas from "./ui/ParticleCanvas";
import { DOCTOR } from "@/lib/constants";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-hero-gradient relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      <ParticleCanvas />

      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal/5 blur-3xl animate-float"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/4 h-64 w-64 rounded-full bg-teal-lighter/5 blur-3xl animate-float-slow"
      />

      {/* Full-bleed doctor photo, right-anchored, left edge dissolving into the page */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block"
      >
        <div
          className="relative h-full w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 28%, black 58%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 28%, black 58%)",
          }}
        >
          <Image
            src={DOCTOR.photo}
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 0px, 60vw"
            className="object-cover object-[68%_30%]"
          />
        </div>
        {/* soft blur where the photo dissolves */}
        <div className="absolute inset-y-0 left-0 w-[45%] backdrop-blur-[3px] [mask-image:linear-gradient(to_right,black_20%,transparent)]" />
        {/* cream blend so text stays readable over the fade zone */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cream/80 to-transparent" />
      </motion.div>

      {/* Floating info chips over the photo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-24 right-10 z-10 hidden lg:block"
      >
        <div className="glass animate-float-slow rounded-2xl px-5 py-4 shadow-lift">
          <p className="font-serif text-base font-bold text-heading">
            {DOCTOR.name}
          </p>
          <p className="text-xs font-semibold text-teal">{DOCTOR.title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {DOCTOR.rating}/5 · {DOCTOR.reviewCount} Google reviews
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="absolute right-[40%] top-32 z-10 hidden xl:block"
      >
        <div className="glass animate-float rounded-2xl px-4 py-3 shadow-lift">
          <p className="flex items-center gap-2 text-xs font-semibold text-heading">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <Clock className="h-3.5 w-3.5 text-teal" />
            OPD Mon–Sat · 12–4 &amp; 7–9 PM
          </p>
        </div>
      </motion.div>

      <div className="section-container relative z-10 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl lg:max-w-[48%]"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-teal-mint px-4 py-2"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-semibold text-heading">
              Accepting Appointments
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-4xl font-extrabold leading-tight text-heading sm:text-5xl lg:text-6xl"
          >
            <span className="gradient-text">Expert Bone &amp; Joint Care</span>
            <br />
            <span className="text-heading">in Jabalpur</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-body md:text-lg"
          >
            Fractures set right with same-visit X-ray. Arthritis diagnosed
            properly, not just medicated. Sports injuries rehabilitated until
            you trust the joint again. {DOCTOR.name} treats bone and joint
            problems end-to-end at {DOCTOR.clinicName}, Adhartal.
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
            {DOCTOR.qualifications.map((q) => (
              <span
                key={q}
                className="rounded-full border border-line bg-teal-pale/90 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-heading"
              >
                {q}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="/book-appointment"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-white shadow-hover transition-all hover:bg-teal-dark hover:scale-105"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Appointment
            </a>
            <a
              href={`tel:${DOCTOR.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-teal bg-cream/60 px-7 py-3.5 text-sm font-semibold text-teal backdrop-blur-sm transition-colors hover:bg-teal-pale"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-6 text-muted"
          >
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
            <div className="h-4 w-px bg-line" />
            <span className="flex items-center gap-1.5 text-sm font-medium">
              <BadgeCheck className="h-4 w-4 text-teal" />
              {DOCTOR.registrationShort}
            </span>
          </motion.div>

          {/* Mobile / tablet photo — no card, soft fade at the bottom */}
          <motion.div variants={item} className="relative mt-10 lg:hidden">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 78%, transparent 100%)",
              }}
            >
              <Image
                src={DOCTOR.photo}
                alt={`${DOCTOR.name}, ${DOCTOR.title} at ${DOCTOR.clinicName}, Adhartal, Jabalpur`}
                fill
                priority
                sizes="95vw"
                className="object-cover object-[62%_30%]"
              />
            </div>
            <div className="glass absolute bottom-3 left-3 rounded-2xl px-4 py-2.5">
              <p className="font-serif text-sm font-bold text-heading">
                {DOCTOR.name}
              </p>
              <p className="text-[11px] font-semibold text-teal">
                {DOCTOR.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
