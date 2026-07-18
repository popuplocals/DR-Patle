"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const SPRING = "cubic-bezier(0.23, 1, 0.32, 1)";

type Crumb = { label: string; href?: string };

export type PageHeroProps = {
  breadcrumbs: Crumb[];
  heading: string;
  /** words colored in accent teal (case-sensitive exact match) */
  highlightWords?: string[];
  subtitle?: string;
  showUnderline?: boolean;
  variant?: "light" | "dark";
  /** optional content below the subtitle (stats, badges, CTAs) */
  children?: React.ReactNode;
};

export default function PageHero({
  breadcrumbs,
  heading,
  highlightWords = [],
  subtitle,
  showUnderline = true,
  variant = "light",
  children,
}: PageHeroProps) {
  const [ref, isVisible] = useInView(0.15);

  const headingWords = heading.split(" ");
  const subtitleWords = subtitle ? subtitle.split(" ") : [];
  const headingDone = headingWords.length * 120;
  const dark = variant === "dark";

  const colors = dark
    ? {
        highlight: "#5EEAD4",
        base: "#FFFFFF",
        subtitle: "rgba(255,255,255,0.5)",
        crumb: "rgba(255,255,255,0.3)",
        crumbActive: "#5EEAD4",
        underline: "linear-gradient(90deg, #5EEAD4, #14B8A6, #0D9488)",
      }
    : {
        highlight: "#0D9488",
        base: "#115E59",
        subtitle: "#6B7C78",
        crumb: "#6B7C78",
        crumbActive: "#0D9488",
        underline: "linear-gradient(90deg, #0D9488, #14B8A6, #CCFBF1)",
      };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-16 pt-32 md:pt-36"
      style={
        dark
          ? { background: "linear-gradient(170deg, #0A1F1E 0%, #115E59 100%)" }
          : { background: "#FAF9F6" }
      }
    >
      {/* background pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={
          dark
            ? {
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }
            : {
                backgroundImage:
                  "radial-gradient(rgba(13,148,136,0.03) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }
        }
      />

      <div className="section-container relative">
        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="text-xs"
          style={{
            color: colors.crumb,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`}>
              {i > 0 && (
                <span className="mx-1.5" style={{ opacity: 0.3 }}>
                  ›
                </span>
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="transition-colors hover:text-teal"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="font-semibold"
                  style={{ color: colors.crumbActive }}
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* heading — word-by-word with micro-rotation */}
        <h1
          className="mt-5 font-serif"
          style={{
            fontSize: "clamp(36px, 5vw, 48px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.5px",
            marginBottom: subtitle ? 14 : 0,
          }}
        >
          {headingWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                marginRight: 12,
                color: highlightWords.includes(word)
                  ? colors.highlight
                  : colors.base,
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
        {subtitle && (
          <p
            className="flex max-w-2xl flex-wrap text-[15px] font-normal"
            style={{ gap: 6, color: colors.subtitle }}
          >
            {subtitleWords.map((word, i) => (
              <span
                key={`${word}-${i}`}
                style={{
                  display: "inline-block",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(10px)",
                  transition: `all 0.5s ${SPRING}`,
                  transitionDelay: `${headingDone + i * 50}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </p>
        )}

        {/* animated underline */}
        {showUnderline && (
          <div
            aria-hidden="true"
            className="mt-6 h-[3px] rounded-[2px]"
            style={{
              background: colors.underline,
              width: isVisible ? "40%" : "0%",
              transition: `width 1s ${SPRING}`,
              transitionDelay: `${headingDone + 300}ms`,
            }}
          />
        )}

        {/* optional extra content */}
        {children && (
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(16px)",
              transition: `all 0.6s ${SPRING}`,
              transitionDelay: `${headingDone + 500}ms`,
            }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
