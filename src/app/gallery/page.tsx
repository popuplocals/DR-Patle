import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  Stethoscope,
  ScanLine,
  HeartPulse,
  Armchair,
  Camera,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/ui/PageHero";
import { DOCTOR } from "@/lib/constants";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Gallery | ${DOCTOR.clinicName}, Adhartal Jabalpur`,
  description: `Photo gallery of ${DOCTOR.clinicName}, Adhartal, Jabalpur — consultation room, digital X-ray facility, and physiotherapy centre of ${DOCTOR.name}.`,
  alternates: { canonical: `${SITE_URL}/gallery` },
};

const PLACEHOLDERS: { label: string; icon: LucideIcon }[] = [
  { label: "Clinic Exterior", icon: Building2 },
  { label: "Reception & Waiting Area", icon: Armchair },
  { label: "Consultation Room", icon: Stethoscope },
  { label: "Digital X-Ray Facility", icon: ScanLine },
  { label: "Physiotherapy Centre", icon: HeartPulse },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Gallery", item: `${SITE_URL}/gallery` },
  ],
};

export default function GalleryPage() {
  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Navbar />
      <PageHero
        title="Clinic Gallery"
        tagline={`A look inside ${DOCTOR.clinicName} — the consultation room, in-house digital X-ray, and dedicated physiotherapy centre.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-mist py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <figure className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                <Image
                  src={DOCTOR.photo}
                  alt={`${DOCTOR.name} at ${DOCTOR.clinicName}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4 text-sm font-semibold text-heading">
                {DOCTOR.name} — Consultation Room
              </figcaption>
            </figure>

            {PLACEHOLDERS.map(({ label, icon: Icon }) => (
              <figure
                key={label}
                className="overflow-hidden rounded-2xl border border-line bg-white shadow-card"
              >
                <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-teal-pale">
                  <Icon className="h-10 w-10 text-teal/40" />
                  <span className="flex items-center gap-1.5 text-xs font-medium text-faint">
                    <Camera className="h-3.5 w-3.5" />
                    Photo coming soon
                  </span>
                </div>
                <figcaption className="p-4 text-sm font-semibold text-heading">
                  {label}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-faint">
            More photographs of the clinic and facilities will be added here
            shortly.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
