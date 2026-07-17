"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Building2,
  Users,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { USPS, DOCTOR } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  Award,
  Building2,
  Users,
};

// where each card's "Learn more" points
const LINKS = [
  "/about",
  "/services/rheumatology-arthritis",
  "/contact",
  "/testimonials",
];

const SPRING = "ease-[cubic-bezier(0.23,1,0.32,1)]";

export default function About() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="About the Doctor"
          title={`Why Patients Choose ${DOCTOR.name}`}
          description="Qualifications matter — but so does how you're treated when you walk in worried."
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-body md:text-lg"
        >
          {DOCTOR.bio}
        </motion.p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {USPS.map((usp, i) => {
            const Icon = ICONS[usp.icon] ?? Award;
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileTap={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative min-h-[200px] overflow-hidden rounded-[20px] border border-line bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-500 ${SPRING} hover:-translate-y-1 hover:border-transparent hover:shadow-[0_20px_48px_rgba(13,148,136,0.2)]`}
              >
                {/* spotlight fill */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(135deg,#115E59,rgba(13,148,136,0.95))] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* shine sweep */}
                <span
                  aria-hidden="true"
                  className="absolute -left-3/4 top-0 h-full w-1/2 -skew-x-[20deg] bg-white/10 transition-transform delay-100 duration-700 ease-out group-hover:translate-x-[350%]"
                />
                {/* number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-2.5 right-3 select-none text-[100px] font-black leading-none text-teal/[0.04] transition-colors duration-500 group-hover:text-white/5"
                >
                  {num}
                </span>

                <div className="relative">
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] border border-line bg-mist transition-all duration-[400ms] ${SPRING} group-hover:scale-110 group-hover:border-white/10 group-hover:bg-white/10`}
                  >
                    <Icon className="h-6 w-6 text-teal transition-colors duration-[400ms] group-hover:text-white" />
                  </div>
                  <h3 className="mb-2 text-[17px] font-bold leading-[1.3] text-heading transition-colors duration-[400ms] group-hover:text-white">
                    {usp.title}
                  </h3>
                  <p className="text-[13px] leading-[1.65] text-muted transition-colors duration-[400ms] group-hover:text-white/85">
                    {usp.description}
                  </p>
                  <Link
                    href={LINKS[i] ?? "/about"}
                    className={`group/link mt-4 inline-flex translate-y-2 items-center gap-1.5 text-xs font-semibold text-teal opacity-0 transition-all delay-150 duration-[400ms] ${SPRING} hover:text-white group-hover:translate-y-0 group-hover:text-teal-mint group-hover:opacity-100`}
                  >
                    Learn more
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
