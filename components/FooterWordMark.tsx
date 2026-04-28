"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = [
  { prefix: "lemon", suffix: "light."       },
  { prefix: "lemon", suffix: "light.studio" },
  { prefix: "lemon", suffix: "light.web"    },
  { prefix: "lemon", suffix: "light.design" },
  { prefix: "lemon", suffix: "light.social" },
];

export default function FooterWordMark() {
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase]         = useState<"visible" | "dissolved">("visible");
  const containerRef              = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (phase === "visible") {
      const timer = setTimeout(() => {
        gsap.to(container.querySelectorAll(".letter"), {
          x:        () => gsap.utils.random(-80, 80),
          y:        () => gsap.utils.random(-60, 60),
          opacity:  0,
          rotation: () => gsap.utils.random(-25, 25),
          scale:    () => gsap.utils.random(0.2, 0.5),
          duration: 0.7,
          ease:     "power2.in",
          stagger:  { each: 0.04, from: "random" },
          onComplete: () => {
            setWordIndex((i) => (i + 1) % WORDS.length);
            setPhase("dissolved");
          },
        });
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === "dissolved") {
      gsap.set(container.querySelectorAll(".letter"), {
        x: 0, y: 0, opacity: 0, rotation: 0, scale: 1,
      });
      const timer = setTimeout(() => {
        gsap.fromTo(
          container.querySelectorAll(".letter"),
          {
            x:        () => gsap.utils.random(-80, 80),
            y:        () => gsap.utils.random(-60, 60),
            opacity:  0,
            rotation: () => gsap.utils.random(-25, 25),
            scale:    0.3,
          },
          {
            x: 0, y: 0, opacity: 1, rotation: 0, scale: 1,
            duration: 0.9,
            ease:     "power3.out",
            stagger:  { each: 0.05, from: "random" },
            onComplete: () => setPhase("visible"),
          }
        );
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [wordIndex, phase]);

  const currentWord  = WORDS[wordIndex];
  const allChars     = (currentWord.prefix + currentWord.suffix).split("");
  const prefixLength = currentWord.prefix.length;

  return (
    <div
      ref={containerRef}
      style={{
        textAlign:     "center",
        marginBottom:  "48px",
        fontSize:      "clamp(36px, 5.5vw, 96px)",
        fontWeight:    900,
        fontFamily:    "var(--font-inter), Inter, sans-serif",
        letterSpacing: "-0.02em",
        userSelect:    "none",
        cursor:        "default",
      }}
    >
      {allChars.map((char, i) => (
        <span
          key={`${wordIndex}-${i}`}
          className="letter"
          style={{
            display: "inline-block",
            color:   i < prefixLength ? "#F2F2EE" : "#F9F200",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
