"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const LEMON = "lemon".split("");
const LIGHT = "light.".split("");

export default function FooterWordMark() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];
    let timer: ReturnType<typeof setTimeout>;

    const dissolve = () => {
      const tl = gsap.timeline({
        onComplete: () => { timer = setTimeout(dissolve, 3000); },
      });

      // Phase 1: dissolve out
      tl.to(letters, {
        x: () => gsap.utils.random(-80, 80),
        y: () => gsap.utils.random(-60, 60),
        opacity: 0,
        rotation: () => gsap.utils.random(-25, 25),
        scale: () => gsap.utils.random(0.2, 0.6),
        duration: 0.7,
        ease: "power2.in",
        stagger: { each: 0.04, from: "random" },
      });

      // Phase 2: reassemble
      tl.to(letters, {
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: { each: 0.05, from: "random" },
      }, "+=0.2");
    };

    timer = setTimeout(dissolve, 3000);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(letters);
    };
  }, []);

  const letterStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter), Inter, sans-serif",
    fontWeight: 900,
    fontSize: "clamp(48px, 8vw, 120px)",
    letterSpacing: "-0.02em",
    display: "inline-block",
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginBottom: "48px",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {LEMON.map((char, i) => (
        <span
          key={`l${i}`}
          ref={(el) => { lettersRef.current[i] = el; }}
          style={{ ...letterStyle, color: "#F2F2EE" }}
        >
          {char}
        </span>
      ))}
      {LIGHT.map((char, i) => (
        <span
          key={`r${i}`}
          ref={(el) => { lettersRef.current[5 + i] = el; }}
          style={{ ...letterStyle, color: "#F9F200" }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
