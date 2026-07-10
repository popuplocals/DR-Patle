import { Phone, MapPin } from "lucide-react";
import { DOCTOR, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 text-white">
      <div className="section-container grid grid-cols-1 gap-10 border-b border-white/10 pb-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-bold">{DOCTOR.name}</p>
          <p className="mt-1 text-sm text-teal-light">{DOCTOR.title}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/50">
            {DOCTOR.degree}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/50 transition-colors hover:text-teal-light"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
            Contact
          </p>
          <div className="mt-4 space-y-3">
            <a
              href={`tel:${DOCTOR.phoneRaw}`}
              className="flex items-start gap-2 text-sm text-white/50 transition-colors hover:text-teal-light"
            >
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              {DOCTOR.phone}
            </a>
            <p className="flex items-start gap-2 text-sm text-white/50">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              {DOCTOR.clinicAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="section-container mt-6 flex flex-col items-center justify-between gap-3 text-xs text-white/40 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {DOCTOR.name}. All rights reserved.
        </p>
        <p>Designed by Pop Up Local</p>
      </div>
    </footer>
  );
}
