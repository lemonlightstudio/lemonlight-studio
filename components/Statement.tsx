"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "Gutes Design verkauft. Schlechtes Design erklärt.";

// Per-word target color when activated. All others default to #ffffff.
const WORD_COLORS: Record<number, string> = {
  2: "#F9F200",               // "verkauft."
  5: "rgba(255,255,255,0.4)", // "erklärt."
};

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  const words = STATEMENT.split(" ");

  useEffect(() => {
    const section = sectionRef.current;
    const wordEls = wordsRef.current;
    if (!section || wordEls.length === 0) return;

    gsap.set(wordEls, { opacity: 0.15, color: "#F2F2EE" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${words.length * 80}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
      },
    });

    wordEls.forEach((el, i) => {
      tl.to(
        el,
        {
          opacity: 1,
          color: WORD_COLORS[i] ?? "#ffffff",
          ease: "none",
          duration: 1,
        },
        i * 1
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [words.length]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "0 10vw",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(28px, 4vw, 56px)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          margin: 0,
          maxWidth: "900px",
          textAlign: "center",
        }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => { if (el) wordsRef.current[i] = el; }}
            style={{ display: "inline-block", marginRight: "0.3em", opacity: 0.15, color: "#F2F2EE" }}
          >
            {word}
          </span>
        ))}
      </p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/Logos/L_yellow.png" alt="" style={{ position: "absolute", bottom: "48px", right: "6vw", width: "100px", opacity: 0.05, pointerEvents: "none" }} />
    </section>
  );
}
