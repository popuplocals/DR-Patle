"use client";

import { motion } from "framer-motion";
import {
  Bone,
  Activity,
  Stethoscope,
  Zap,
  Microscope,
  Shield,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { SERVICES } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  Bone,
  Activity,
  Stethoscope,
  Zap,
  Microscope,
  Shield,
  HeartPulse,
};

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="What We Treat"
          title="Comprehensive Orthopaedic Services"
          description="From joint replacement to sports injury rehabilitation, every treatment plan is tailored to your specific condition and recovery goals."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon] ?? Stethoscope;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-navy/5 transition-all hover:-translate-y-1.5 hover:shadow-xl"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-teal to-teal-light transition-transform duration-300 group-hover:scale-x-100" />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="font-serif text-lg font-bold text-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/60">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
