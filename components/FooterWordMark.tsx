"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORDS = [
  { prefix: "lemon", suffix: "light."       },
  { prefix: "lemon", suffix: "light.studio" },
  { prefix: "lemon", suffix: "light.web"    },
  { prefix: "lemon", suffix: "light.design" },
  { prefix: "lemon", suffix: "light.social" },
];

const LETTER_STYLE: React.CSSProperties = {
  fontFamily:    "var(--font-inter), Inter, sans-serif",
  fontWeight:    900,
  fontSize:      "clamp(40px, 6vw, 100px)",
  letterSpacing: "-0.02em",
  display:       "inline-block",
};

export default function FooterWordMark() {
  const [wordIdx, setWordIdx]   = useState(0);
  const lettersRef              = useRef<(HTMLSpanElement | null)[]>([]);
  const timerRef                = useRef<ReturnType<typeof setTimeout>>();
  const needsReassemble         = useRef(false);

  const word  = WORDS[wordIdx];
  const chars = (word.prefix + word.suffix).split("");

  // Reset ref array each render so new spans register correctly
  lettersRef.current = new Array(chars.length).fill(null);

  // ── PHASE: scatter new letters before paint ──────────────────
  useLayoutEffect(() => {
    if (!needsReassemble.current) return;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.set(letters, {
      x:        () => gsap.utils.random(-80, 80),
      y:        () => gsap.utils.random(-60, 60),
      opacity:  0,
      rotation: () => gsap.utils.random(-25, 25),
      scale:    () => gsap.utils.random(0.2, 0.6),
    });
  }, [wordIdx]);

  // ── PHASE: reassemble new letters ────────────────────────────
  useEffect(() => {
    if (!needsReassemble.current) return;
    needsReassemble.current = false;
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.to(letters, {
      x: 0, y: 0, opacity: 1, rotation: 0, scale: 1,
      duration: 0.9,
      ease:     "power3.out",
      stagger:  { each: 0.05, from: "random" },
      onComplete: () => {
        timerRef.current = setTimeout(startDissolve, 3000);
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordIdx]);

  // ── PHASE: dissolve out current letters ──────────────────────
  const startDissolve = () => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    gsap.to(letters, {
      x:        () => gsap.utils.random(-80, 80),
      y:        () => gsap.utils.random(-60, 60),
      opacity:  0,
      rotation: () => gsap.utils.random(-25, 25),
      scale:    () => gsap.utils.random(0.2, 0.6),
      duration: 0.7,
      ease:     "power2.in",
      stagger:  { each: 0.04, from: "random" },
      onComplete: () => {
        needsReassemble.current = true;
        setWordIdx((prev) => (prev + 1) % WORDS.length);
      },
    });
  };

  // ── MOUNT: kick off first dissolve after 3s ───────────────────
  useEffect(() => {
    timerRef.current = setTimeout(startDissolve, 3000);
    return () => {
      clearTimeout(timerRef.current);
      gsap.killTweensOf(lettersRef.current.filter(Boolean));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: "center", marginBottom: "48px", cursor: "default", userSelect: "none" }}>
      {chars.map((char, i) => (
        <span
          key={i}
          ref={(el) => { lettersRef.current[i] = el; }}
          style={{ ...LETTER_STYLE, color: i < word.prefix.length ? "#F2F2EE" : "#F9F200" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
