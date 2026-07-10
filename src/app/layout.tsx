import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { DOCTOR } from "@/lib/constants";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.drsushilpatle.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${DOCTOR.name} | ${DOCTOR.title} in Adhartal, Jabalpur`,
  description: `${DOCTOR.name}, ${DOCTOR.degree} — ${DOCTOR.title} in Adhartal, Jabalpur with ${DOCTOR.experienceYears}+ years of experience and ${DOCTOR.surgeriesCount}+ surgeries. Specializing in knee & hip replacement, fracture care, sports injuries, and arthroscopy. Book an appointment today.`,
  keywords: [
    "orthopaedic surgeon Jabalpur",
    "knee replacement Jabalpur",
    "hip replacement Jabalpur",
    "bone specialist Adhartal",
    "fracture doctor Jabalpur",
    "sports injury doctor Jabalpur",
    "Dr Sushil Kumar Patle",
    "orthopaedic clinic Adhartal",
  ],
  authors: [{ name: DOCTOR.name }],
  openGraph: {
    title: `${DOCTOR.name} | ${DOCTOR.title} in Jabalpur`,
    description: `Expert bone & joint care in Adhartal, Jabalpur. ${DOCTOR.experienceYears}+ years of experience, ${DOCTOR.surgeriesCount}+ successful surgeries.`,
    url: SITE_URL,
    siteName: DOCTOR.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${DOCTOR.name} | ${DOCTOR.title} in Jabalpur`,
    description: `Expert bone & joint care in Adhartal, Jabalpur. ${DOCTOR.experienceYears}+ years of experience, ${DOCTOR.surgeriesCount}+ successful surgeries.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Physician",
      "@id": `${SITE_URL}/#physician`,
      name: DOCTOR.name,
      honorificSuffix: DOCTOR.degree,
      jobTitle: DOCTOR.title,
      medicalSpecialty: "Orthopaedic",
      telephone: DOCTOR.phoneRaw,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ravindra Nagar, Tapti Nagar, Adhartal",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        postalCode: "482004",
        addressCountry: "IN",
      },
      worksFor: {
        "@type": "Hospital",
        name: DOCTOR.hospital,
      },
    },
    {
      "@type": "MedicalClinic",
      "@id": `${SITE_URL}/#clinic`,
      name: `${DOCTOR.name} - Orthopaedic Clinic`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: DOCTOR.phoneRaw,
      priceRange: "₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ravindra Nagar, Tapti Nagar, Adhartal",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        postalCode: "482004",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: DOCTOR.coordinates.lat,
        longitude: DOCTOR.coordinates.lng,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "13:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "17:00",
          closes: "20:00",
        },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: DOCTOR.rating,
        reviewCount: DOCTOR.reviewCount,
      },
      medicalSpecialty: "Orthopaedic",
      physician: { "@id": `${SITE_URL}/#physician` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
