import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, Quote, Star } from "lucide-react";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/ui/PageHero";
import { DOCTOR, TESTIMONIALS } from "@/lib/constants";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Patient Testimonials | ${DOCTOR.name}, Jabalpur`,
  description: `Patient experiences at ${DOCTOR.clinicName}, Adhartal, Jabalpur — rated ${DOCTOR.rating}/5 on Google. Read what patients say about consultations with ${DOCTOR.name}.`,
  alternates: { canonical: `${SITE_URL}/testimonials` },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Testimonials",
      item: `${SITE_URL}/testimonials`,
    },
  ],
};

export default function TestimonialsPage() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${DOCTOR.coordinates.lat},${DOCTOR.coordinates.lng}`;

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <PageHero
        title="What Our Patients Say"
        tagline="Real experiences from patients treated at Patle Health Care Center."
        crumbs={[{ label: "Home", href: "/" }, { label: "Testimonials" }]}
      />

      <section className="bg-mist py-16 md:py-24">
        <div className="section-container">
          <div className="mx-auto mb-12 flex max-w-md flex-col items-center gap-2 rounded-3xl border border-line bg-white p-8 text-center shadow-card">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400" strokeWidth={0} />
              ))}
            </div>
            <p className="font-serif text-3xl font-bold text-heading">
              {DOCTOR.rating}/5
            </p>
            <p className="text-sm text-muted">
              Google Rating · {DOCTOR.reviewCount} reviews
            </p>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm font-semibold text-teal hover:underline"
            >
              See us on Google Maps →
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-teal-lighter hover:shadow-lift"
              >
                <Quote className="h-7 w-7 text-teal/30" />
                <div className="mt-3 flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-body">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 font-serif text-sm font-bold text-heading">
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-faint">
            Testimonials reflect individual patient experiences shared with the
            clinic. Outcomes and experiences vary from patient to patient.
          </p>

          <div className="mt-10 text-center">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-white shadow-hover transition-all hover:bg-teal-dark hover:scale-105"
            >
              <CalendarCheck className="h-5 w-5" />
              Book Your Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
