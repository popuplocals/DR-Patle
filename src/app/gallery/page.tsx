import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHero from "@/components/ui/PageHero";
import { DOCTOR } from "@/lib/constants";
import { SITE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Gallery | ${DOCTOR.clinicName}, Adhartal Jabalpur`,
  description: `Inside ${DOCTOR.clinicName}, Adhartal, Jabalpur — the consultation room, digital X-ray facility, and physiotherapy centre where ${DOCTOR.name} treats patients.`,
  alternates: { canonical: `${SITE_URL}/gallery` },
};

const SPACES = [
  {
    src: "/images/gallery/clinic-exterior.svg",
    label: "The Clinic on Main Road",
    note: "Right on Main Road, Adhartal — look for the board, you can't miss it.",
  },
  {
    src: "/images/gallery/reception.svg",
    label: "Reception & Waiting Area",
    note: "Tell the front desk you've arrived; OPD runs in order, and waits are honest.",
  },
  {
    src: "/images/gallery/consultation.svg",
    label: "Consultation Room",
    note: "Where you sit down with Dr. Patle — history first, examination second, verdict explained.",
  },
  {
    src: "/images/gallery/xray.svg",
    label: "Digital X-Ray Room",
    note: "Imaging happens here, mid-consultation — you see your own films on screen.",
  },
  {
    src: "/images/gallery/physio.svg",
    label: "Physiotherapy Centre",
    note: "Parallel bars, mats, and a plan — where fractures and knees finish their recovery.",
  },
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
        title="Inside the Clinic"
        tagline="A walk through Patle Health Care Center before you visit — the rooms you'll sit in, the equipment that will look after you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />

      <section className="bg-mist py-16 md:py-24">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <figure className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                <Image
                  src={DOCTOR.photo}
                  alt={`${DOCTOR.name} at ${DOCTOR.clinicName}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-4">
                <p className="text-sm font-semibold text-heading">
                  Dr. Patle, at his desk
                </p>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  The spine models behind him aren&apos;t decoration — they get
                  used in nearly every consultation to show you what&apos;s
                  going on.
                </p>
              </figcaption>
            </figure>

            {SPACES.map((space) => (
              <figure
                key={space.label}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={space.src}
                    alt={`Illustration: ${space.label} at ${DOCTOR.clinicName}`}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-sm font-semibold text-heading">
                    {space.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {space.note}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm leading-relaxed text-faint">
            These illustrations are stand-ins while we photograph the clinic
            properly — real photos of each room are on their way. The doctor,
            thankfully, is already real.
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
