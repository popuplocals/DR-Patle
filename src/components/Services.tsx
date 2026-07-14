"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import ServiceCard from "./ui/ServiceCard";
import { SERVICES } from "@/lib/constants";

const EASE = [0.23, 1, 0.32, 1] as const;

const rowVariants = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  },
});

const row3Container = {
  hidden: {},
  show: { transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};

const row3Item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Services() {
  // slugs: fracture, rheumatology, sports, xray, physio
  const [row1A, row1B, wide, row3A, row3B] = SERVICES;
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const toggle = (slug: string) =>
    setActiveCard((c) => (c === slug ? null : slug));

  return (
    <section id="services" className="bg-mist pb-16 pt-24">
      <div className="section-container">
        <SectionHeader
          eyebrow="What We Treat"
          title="What We Treat, and How"
          description="Fractures, arthritis, sports injuries — diagnosed with same-visit X-ray, treated honestly, and rehabilitated at the clinic's own physiotherapy centre."
        />

        {/* Row 1 — two landscape cards */}
        <motion.div
          variants={rowVariants(0)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        >
          {[row1A, row1B].map((service) => (
            <ServiceCard
              key={service.slug}
              service={service}
              aspect="aspect-[4/5] sm:aspect-[3/2]"
              sizes="(max-width: 640px) 100vw, 50vw"
              isActive={activeCard === service.slug}
              onToggle={() => toggle(service.slug)}
            />
          ))}
        </motion.div>

        {/* Row 2 — one cinematic wide card */}
        <motion.div
          variants={rowVariants(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-5"
        >
          <ServiceCard
            service={wide}
            aspect="aspect-[4/5] sm:aspect-[21/9]"
            sizes="100vw"
            isActive={activeCard === wide.slug}
            onToggle={() => toggle(wide.slug)}
          />
        </motion.div>

        {/* Row 3 — three portrait cards (2 services + booking CTA) */}
        <motion.div
          variants={row3Container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[row3A, row3B].map((service) => (
            <motion.div key={service.slug} variants={row3Item}>
              <ServiceCard
                service={service}
                aspect="aspect-[4/5]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                isActive={activeCard === service.slug}
                onToggle={() => toggle(service.slug)}
              />
            </motion.div>
          ))}

          <motion.div variants={row3Item}>
            <div className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#0D9488_0%,#064E4A_100%)] p-6 shadow-[0_8px_24px_rgba(13,148,136,0.06)]">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/15"
              />
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-[1.4px] text-teal-soft">
                Start Here
              </p>
              <h3 className="mt-2 text-[clamp(1.1rem,1.6vw,1.35rem)] font-bold leading-[1.2] text-white">
                Not sure which service you need?
              </h3>
              <p className="mt-2 text-[13px] leading-[1.55] text-white/85">
                Book a consultation — Dr. Patle will examine, explain what he
                finds, and point you down the right path.
              </p>
              <Link
                href="/book-appointment"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-teal transition-transform duration-300 hover:scale-105"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-teal px-7 py-3.5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
