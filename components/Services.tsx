"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    number: "01",
    title: "Webdesign",
    bgWord: "WEB",
    body: "Websites die nicht nur schön aussehen — sondern Besucher zu Kunden machen. Conversion-optimiert, schnell, und gebaut um zu wachsen.",
  },
  {
    number: "02",
    title: "Branding",
    bgWord: "BRAND",
    body: "Von Logo bis Brand Identity. Deine Marke bekommt ein Gesicht das bleibt — und einen Charakter der verkauft.",
  },
  {
    number: "03",
    title: "Marketing",
    bgWord: "MKT",
    body: "Social Media, Content & Strategie die tatsächlich funktioniert. Kein Bullshit — nur Ergebnisse.",
  },
];

export default function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip = stripRef.current;
    if (!wrapper || !strip) return;

    const ctx = gsap.context(() => {
      gsap.to(strip, {
        x: () => -(strip.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${strip.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden", background: "#0A0A0A" }}>
      <div
        ref={stripRef}
        style={{
          display: "flex",
          width: "400vw",
          height: "100vh",
          willChange: "transform",
        }}
      >
        {/* ── Panel 0: Intro ── */}
        <div
          style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "10vw",
            background: "#0A0A0A",
            overflow: "hidden",
          }}
        >
          {/* Giant decorative number */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 900,
              fontSize: "40vw",
              color: "#F9F200",
              opacity: 0.06,
              lineHeight: 1,
              pointerEvents: "none",
              userSelect: "none",
              whiteSpace: "nowrap",
            }}
          >
            03
          </span>

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "640px" }}>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 500,
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#F9F200",
                margin: 0,
                marginBottom: "32px",
              }}
            >
              — WAS WIR MACHEN
            </p>
            <h2
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Drei Dinge die wir besser machen als alle anderen.
            </h2>
          </div>

          {/* Scroll hint */}
          <div
            style={{
              position: "absolute",
              bottom: "48px",
              right: "10vw",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            scroll
            <span style={{ fontSize: "18px", color: "#F9F200" }}>→</span>
          </div>
        </div>

        {/* ── Service Panels 1–3 ── */}
        {SERVICES.map((s) => (
          <div
            key={s.number}
            style={{
              position: "relative",
              width: "100vw",
              height: "100vh",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              padding: "10vw",
              background: "#0A0A0A",
              overflow: "hidden",
            }}
          >
            {/* Giant background word */}
            <span
              aria-hidden
              style={{
                position: "absolute",
                bottom: "-5%",
                left: "-2%",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 900,
                fontSize: "28vw",
                color: "#F9F200",
                opacity: 0.06,
                lineHeight: 1,
                pointerEvents: "none",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {s.bgWord}
            </span>

            {/* Number — top left */}
            <span
              style={{
                position: "absolute",
                top: "10vw",
                left: "10vw",
                fontFamily: "monospace",
                fontSize: "12px",
                color: "#F9F200",
                letterSpacing: "0.1em",
              }}
            >
              {s.number}
            </span>

            {/* Content — right side */}
            <div
              style={{
                marginLeft: "auto",
                maxWidth: "48%",
                position: "relative",
                zIndex: 1,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  color: "#ffffff",
                  margin: 0,
                  marginBottom: "32px",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {s.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontWeight: 400,
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.55)",
                  margin: 0,
                  marginBottom: "48px",
                  lineHeight: 1.7,
                  maxWidth: "400px",
                }}
              >
                {s.body}
              </p>

              <span
                style={{
                  display: "inline-block",
                  fontSize: "48px",
                  color: "#F9F200",
                  lineHeight: 1,
                }}
              >
                →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
