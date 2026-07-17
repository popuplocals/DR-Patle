"use client";

import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  PhoneCall,
  ScanLine,
} from "lucide-react";
import { DOCTOR } from "@/lib/constants";

const EASE = [0.23, 1, 0.32, 1] as const;

const card = (delay: number) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.65, ease: EASE, delay },
});

export default function ContactStory() {
  const { lat, lng } = DOCTOR.coordinates;
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=16&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <section className="relative overflow-hidden">
      {/* the map IS the page — everything else floats above it */}
      <iframe
        title={`${DOCTOR.clinicName} location map`}
        src={mapSrc}
        className="absolute inset-0 h-full w-full border-0 grayscale-[0.25]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      {/* readability wash — heavier on the left where the story lives */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/75 to-cream/10 lg:via-cream/45 lg:to-transparent"
      />

      <div className="section-container relative py-20 md:py-28">
        <div className="flex max-w-md flex-col gap-5">
          <motion.div {...card(0)}>
            <span className="inline-block rounded-full bg-teal-mint px-4 py-1.5 text-xs font-bold uppercase tracking-[3px] text-heading">
              Visit Us
            </span>
            <h2 className="mt-4 font-serif text-3xl font-extrabold leading-tight text-heading md:text-4xl">
              Finding us is the easy part
            </h2>
            <p className="mt-3 text-base leading-relaxed text-body">
              That&apos;s the clinic behind this card — right on Main Road,
              Adhartal. Here&apos;s everything you need for the visit.
            </p>
          </motion.div>

          <motion.div
            {...card(0.15)}
            className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lift backdrop-blur-md"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-heading">
                  {DOCTOR.clinicName}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  {DOCTOR.clinicAddress}
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-teal-dark"
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...card(0.3)}
            className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lift backdrop-blur-md"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-heading">
                  Come during OPD hours
                </p>
                <p className="mt-1 text-sm text-body">
                  Afternoon: {DOCTOR.opd.afternoon}
                </p>
                <p className="text-sm text-body">
                  Evening: {DOCTOR.opd.evening}
                </p>
                <p className="mt-1.5 text-xs text-muted">
                  {DOCTOR.opd.days} ·{" "}
                  <span className="font-semibold text-red-600">
                    {DOCTOR.opd.closed}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...card(0.45)}
            className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lift backdrop-blur-md"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-heading">
                  Rather talk to someone first?
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <a
                    href={`tel:${DOCTOR.phoneRaw}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" /> {DOCTOR.phone}
                  </a>
                  <a
                    href={`tel:${DOCTOR.landlineRaw}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-teal"
                  >
                    <PhoneCall className="h-3.5 w-3.5" /> {DOCTOR.landline}{" "}
                    (Landline)
                  </a>
                  <a
                    href={`https://wa.me/${DOCTOR.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-body hover:text-teal"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp us
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...card(0.6)}
            className="rounded-2xl border border-white/60 bg-white/85 p-6 shadow-lift backdrop-blur-md"
          >
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <ScanLine className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-heading">
                  Once you&apos;re here
                </p>
                <p className="mt-1 text-sm leading-relaxed text-body">
                  {DOCTOR.facilities.join(" and ")} are in-house — most visits
                  finish with a diagnosis and a plan, not a referral slip.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
