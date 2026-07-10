"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeader from "./ui/SectionHeader";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const testimonial = TESTIMONIALS[active];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-navy py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-teal/10 blur-3xl"
      />
      <div className="section-container relative z-10">
        <SectionHeader
          eyebrow="Patient Experiences"
          title="What Our Patients Say"
          light
        />

        <div className="mx-auto max-w-2xl">
          <div className="glass relative rounded-3xl p-8 md:p-10 min-h-[260px] flex flex-col">
            <Quote className="h-9 w-9 text-teal-light/50" />

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="flex flex-1 flex-col justify-center"
              >
                <div className="mb-4 flex gap-1 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-lg leading-relaxed text-white/85 md:text-xl">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <p className="mt-6 font-serif text-base font-semibold text-teal-light">
                  {testimonial.name}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-8 bg-teal-light" : "w-2.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
