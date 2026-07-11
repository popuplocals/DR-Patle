"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { DOCTOR, NAV_LINKS, SERVICES } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "shadow-nav py-3" : "py-4"
      }`}
    >
      <nav className="section-container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal font-serif text-lg font-bold text-white">
            P
          </span>
          <span className="font-serif text-lg font-bold leading-tight text-heading md:text-xl">
            Dr. Sushil Kumar Patle
            <span className="block text-xs font-sans font-medium tracking-wide text-teal">
              Consultant Orthopaedic Surgeon
            </span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) =>
            link.label === "Services" ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-heading ${
                    isActive("/services")
                      ? "font-semibold text-teal"
                      : "text-muted"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      servicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-lift">
                        {SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-teal-pale hover:text-heading ${
                              pathname === `/services/${service.slug}`
                                ? "bg-teal-pale text-teal"
                                : "text-body"
                            }`}
                          >
                            {service.title}
                          </Link>
                        ))}
                        <div className="mt-1 border-t border-line-light pt-1">
                          <Link
                            href="/services"
                            className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-teal-pale"
                          >
                            View All Services →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-heading ${
                  isActive(link.href)
                    ? "font-semibold text-teal"
                    : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${DOCTOR.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-heading hover:text-teal transition-colors"
          >
            <Phone className="h-4 w-4" />
            {DOCTOR.phone}
          </a>
          <Link
            href="/book-appointment"
            className="rounded-full bg-teal px-5 py-2.5 text-sm font-semibold text-white shadow-hover transition-all hover:bg-teal-dark hover:scale-105"
          >
            Book Appointment
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="lg:hidden text-heading"
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
            className="lg:hidden overflow-hidden bg-cream/95 backdrop-blur-xl border-t border-line"
          >
            <div className="section-container flex flex-col gap-4 py-6">
              {NAV_LINKS.map((link) =>
                link.label === "Services" ? (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={`flex w-full items-center justify-between text-base font-medium ${
                        isActive("/services") ? "text-teal" : "text-body"
                      }`}
                    >
                      Services
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 flex flex-col gap-2.5 border-l-2 border-teal-lighter pl-4">
                            <Link
                              href="/services"
                              className="text-sm font-semibold text-teal"
                            >
                              All Services
                            </Link>
                            {SERVICES.map((service) => (
                              <Link
                                key={service.slug}
                                href={`/services/${service.slug}`}
                                className="text-sm font-medium text-muted"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium ${
                      isActive(link.href) ? "text-teal" : "text-body"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/book-appointment"
                className="mt-1 inline-flex w-fit items-center rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white"
              >
                Book Appointment
              </Link>
              <a
                href={`tel:${DOCTOR.phoneRaw}`}
                className="flex items-center gap-2 text-base font-semibold text-teal"
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
