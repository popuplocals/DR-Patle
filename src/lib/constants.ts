export const DOCTOR = {
  name: "Dr. Sushil Kumar Patle",
  degree: "MBBS, MS (Orthopaedics)",
  title: "Senior Orthopaedic Surgeon",
  tagline: "Expert Bone & Joint Care",
  clinicName: "Dr. Patle's Orthopaedic Clinic",
  clinicAddress: "Ravindra Nagar, Tapti Nagar, Adhartal, Jabalpur, MP 482004",
  hospital: "Sanjeevani Hospital & Research Center, Jabalpur",
  phone: "+91 93039 44402",
  phoneRaw: "+919303944402",
  whatsappNumber: "919303944402",
  opd: {
    morning: "9:00 AM – 1:00 PM",
    evening: "5:00 PM – 8:00 PM",
    days: "Monday – Saturday",
  },
  rating: 4.8,
  reviewCount: 9,
  experienceYears: 15,
  surgeriesCount: 5000,
  coordinates: {
    lat: 23.198766,
    lng: 79.9466939,
  },
};

export const STATS = [
  { label: "Years of Experience", value: 15, suffix: "+" },
  { label: "Successful Surgeries", value: 5000, suffix: "+" },
  { label: "Google Rating", value: 4.8, suffix: "/5", decimals: 1 },
  { label: "Emergency Support", value: 24, suffix: "/7" },
];

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const SERVICES: Service[] = [
  {
    title: "Total Knee Replacement",
    description:
      "Advanced knee replacement surgery to relieve chronic joint pain and restore mobility, tailored to each patient's anatomy and lifestyle.",
    icon: "Bone",
  },
  {
    title: "Total Hip Replacement",
    description:
      "Precision hip replacement procedures aimed at reducing pain and improving range of motion for a more active, independent life.",
    icon: "Activity",
  },
  {
    title: "Fracture & Trauma Surgery",
    description:
      "Comprehensive management of simple to complex fractures and trauma injuries, from emergency stabilization through complete recovery.",
    icon: "Stethoscope",
  },
  {
    title: "Sports Medicine (ACL/Meniscus)",
    description:
      "Specialized care for sports-related injuries including ACL tears and meniscus damage, helping athletes and active individuals return to their routine.",
    icon: "Zap",
  },
  {
    title: "Arthroscopy (Knee/Shoulder)",
    description:
      "Minimally invasive arthroscopic techniques for diagnosing and treating knee and shoulder joint conditions with faster recovery times.",
    icon: "Microscope",
  },
  {
    title: "Spine Care",
    description:
      "Evaluation and management of spinal conditions and back pain using a structured, evidence-based treatment approach.",
    icon: "Shield",
  },
  {
    title: "Physiotherapy & Rehabilitation",
    description:
      "Guided post-operative and injury rehabilitation programs designed to support long-term strength, flexibility, and function.",
    icon: "HeartPulse",
  },
];

export type USP = {
  title: string;
  description: string;
  icon: string;
};

export const USPS: USP[] = [
  {
    title: "Qualified Expertise",
    description:
      "MBBS, MS (Orthopaedics) with over 15 years of dedicated practice in bone and joint care across Jabalpur.",
    icon: "GraduationCap",
  },
  {
    title: "Extensive Experience",
    description:
      "5000+ orthopaedic surgeries performed, spanning joint replacements, trauma care, and sports injury management.",
    icon: "Award",
  },
  {
    title: "Modern Technique",
    description:
      "Treatment plans informed by current orthopaedic practices, with an emphasis on minimally invasive options where appropriate.",
    icon: "Sparkles",
  },
  {
    title: "Patient-First Approach",
    description:
      "Every treatment plan is discussed clearly with patients and families, focusing on informed decisions and realistic recovery timelines.",
    icon: "Users",
  },
];

export type Testimonial = {
  name: string;
  text: string;
  rating: number;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Rakesh Sahu",
    text: "Very attentive and explained my fracture treatment in detail before proceeding. The clinic staff were courteous and the OPD wait time was reasonable.",
    rating: 5,
  },
  {
    name: "Meena Tiwari",
    text: "Consulted for persistent knee pain. Dr. Patle took time to explain the condition and the available options clearly. Felt heard throughout.",
    rating: 5,
  },
  {
    name: "Vikram Chourasia",
    text: "Good experience overall. The clinic is well organized and appointment timings are followed properly, which I appreciated.",
    rating: 4,
  },
  {
    name: "Anita Dubey",
    text: "Consulted regarding a sports injury. The explanation of the rehabilitation process was clear and easy to follow.",
    rating: 5,
  },
  {
    name: "Sanjay Verma",
    text: "Professional and approachable. Appreciated the honest discussion about treatment options for my shoulder issue.",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Appointment", href: "#appointment" },
  { label: "Location", href: "#location" },
];

export const APPS_SCRIPT_URL =
  process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";
