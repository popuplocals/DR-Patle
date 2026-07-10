"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { DOCTOR, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/80 backdrop-blur-lg border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="font-serif text-lg md:text-xl font-bold text-white"
        >
          Dr. Sushil Kumar Patle
          <span className="block text-xs font-sans font-normal tracking-wide text-teal-light">
            Consultant Orthopaedic Surgeon
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="text-sm font-medium text-white/80 hover:text-teal-light transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${DOCTOR.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-teal-light transition-colors"
          >
            <Phone className="h-4 w-4" />
            {DOCTOR.phone}
          </a>
          <a
            href="#appointment"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#appointment");
            }}
            className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal/30 transition-transform hover:scale-105"
          >
            Book Appointment
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-navy/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="section-container flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-base font-medium text-white/90"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${DOCTOR.phoneRaw}`}
                className="flex items-center gap-2 text-base font-semibold text-teal-light"
              >
                <Phone className="h-4 w-4" />
                {DOCTOR.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
