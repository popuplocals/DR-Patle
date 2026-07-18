"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const SPRING = "cubic-bezier(0.23, 1, 0.32, 1)";

/** Fires once when `threshold` of the element enters the viewport. */
function useInView(threshold: number) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

const HEADING = "About Dr. Sushil Kumar Patle";
const SUBTITLE =
  "M.B.B.S., D.Ortho, M.Ch. Ortho (USAIM) · Fellowship in Rheumatology";

export default function AboutHero() {
  const [ref, isVisible] = useInView(0.15);

  const headingWords = HEADING.split(" ");
  const subtitleWords = SUBTITLE.split(" ");

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cream pb-16 pt-32 md:pt-36"
    >
      {/* dot pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(13,148,136,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="section-container relative">
        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-muted"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <Link href="/" className="hover:text-teal">
            Home
          </Link>
          <span className="mx-1.5 opacity-30">›</span>
          <span className="font-semibold text-teal">About</span>
        </nav>

        {/* heading — word-by-word with micro-rotation */}
        <h1
          className="mt-5 font-serif"
          style={{
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            marginBottom: 14,
          }}
        >
          {headingWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                marginRight: 12,
                color: i === 0 ? "#115E59" : "#0D9488",
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                  ? "translateY(0) rotate(0deg)"
                  : "translateY(20px) rotate(2deg)",
                transition: `all 0.6s ${SPRING}`,
                transitionDelay: `${i * 120}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* subtitle — subtler word-by-word */}
        <p
          className="flex flex-wrap text-[15px] font-normal text-muted"
          style={{ gap: 6 }}
        >
          {subtitleWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ${SPRING}`,
                transitionDelay: `${600 + i * 50}ms`,
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* animated underline */}
        <div
          aria-hidden="true"
          className="mt-6 h-[3px] rounded-[2px]"
          style={{
            background:
              "linear-gradient(90deg, #0D9488, #14B8A6, #CCFBF1)",
            width: isVisible ? "40%" : "0%",
            transition: `width 1s ${SPRING}`,
            transitionDelay: "800ms",
          }}
        />
      </div>
    </section>
  );
}
