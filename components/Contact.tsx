"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = [
  { text: "Lass uns etwas", color: "#ffffff" },
  { text: "Leuchtendes",    color: "#F9F200" },
  { text: "bauen.",         color: "#ffffff" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef   = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const words = wordsRef.current;
    if (words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Flatten all words across headline lines into a single indexed list
  let wordIndex = 0;

  return (
    <>
      <style>{`
        .contact-email {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 24px;
          color: #ffffff;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s ease;
        }
        .contact-email:hover {
          color: #F9F200;
        }
        .contact-email:hover .contact-arrow {
          transform: translateX(6px);
        }
        .contact-social {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.3s ease, opacity 0.3s ease;
        }
        .contact-social:hover {
          color: #F9F200;
          opacity: 1 !important;
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 10vw 0",
        }}
      >
        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#F9F200",
            margin: 0,
            marginBottom: "48px",
          }}
        >
          — KONTAKT
        </p>

        {/* Headline */}
        <h2 style={{ margin: 0, padding: 0 }}>
          {HEADLINE.map((line) => (
            <span
              key={line.text}
              style={{ display: "block", lineHeight: 0.9 }}
            >
              {line.text.split(" ").map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={idx}
                    ref={(el) => { if (el) wordsRef.current[idx] = el; }}
                    style={{
                      display: "inline-block",
                      marginRight: "0.25em",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(56px, 8vw, 120px)",
                      color: line.color,
                      letterSpacing: "-0.02em",
                      willChange: "opacity, transform",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </span>
          ))}
        </h2>

        {/* Body text */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
            margin: 0,
            marginTop: "48px",
            maxWidth: "480px",
          }}
        >
          Schreib mir — wir schauen was möglich ist.
        </p>

        {/* Pre-email CTA */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: "#F9F200",
            margin: 0,
            marginTop: "56px",
            marginBottom: "16px",
          }}
        >
          Interesse an einem Projekt?
        </p>

        {/* Email */}
        <div>
          <a href="mailto:hey@lemonlight.studio" className="contact-email">
            hey@lemonlight.studio
            <span className="contact-arrow" style={{ color: "#F9F200", fontSize: "28px", lineHeight: 1, display: "inline-block", transition: "transform 0.3s ease" }}>→</span>
          </a>
        </div>

        {/* Social links */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "24px",
            alignItems: "center",
          }}
        >
          <a href="https://www.instagram.com/chris.hollerx" target="_blank" rel="noopener noreferrer" className="contact-social">Instagram ↗</a>
          <a href="https://www.linkedin.com/in/christoph-h%C3%B6ller-737561401/" target="_blank" rel="noopener noreferrer" className="contact-social">LinkedIn ↗</a>
        </div>

        {/* Bottom-right watermark */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            bottom: "48px",
            right: "10vw",
            fontFamily: "monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.08em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          lemonlight.studio
        </span>
      </section>
    </>
  );
}
