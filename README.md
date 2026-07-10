# Dr. Sushil Kumar Patle — Patle Health Care Center

Production-ready website for Dr. Sushil Kumar Patle, Consultant Orthopaedic Surgeon (M.B.B.S., D.Ortho, M.Ch. Ortho — USAIM, Fellowship in Rheumatology), Adhartal, Jabalpur.

Built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Features

- Dark navy hero with mouse-interactive particle network canvas
- Animated gradient shimmer headline, qualification pills, floating orbs + orbit ring
- Doctor card with OPD hours, Google rating, and MP Medical Council registration
- Animated stat counters, service cards with hover tag reveals
- Auto-rotating testimonial carousel on glassmorphism
- Appointment booking form → posts to Google Apps Script (Google Sheet backend)
- Google Maps embed, footer day-of-week OPD grid (Sunday closed)
- Floating WhatsApp button
- SEO: Open Graph, sitemap, robots, JSON-LD (Physician + MedicalClinic + LocalBusiness)
- NMC-compliant content, Lighthouse 95+ target, fully static prerender

## Local development

```bash
npm install
cp .env.example .env.local   # add the Apps Script /exec URL
npm run dev                  # http://localhost:3000
```

## Deploy

Ready for Vercel — import the repo, set `NEXT_PUBLIC_APPS_SCRIPT_URL`, deploy.

## Booking backend

The form POSTs JSON (`name, mobile, date, timeSlot, problem, visitType`) to the URL in `NEXT_PUBLIC_APPS_SCRIPT_URL`. Deploy a Google Apps Script web app that appends rows to the "Dr. Patle Appointments" Google Sheet (see project plan).

## Pending content

- Real doctor photo → drop at `public/images/doctor.jpg` and update `photo` in `src/lib/constants.ts`
- Final domain → update `SITE_URL` in `src/lib/schema.ts`
- Patient-approved testimonials

---

Website by [Pop Up Local](https://popuplocal.in)
