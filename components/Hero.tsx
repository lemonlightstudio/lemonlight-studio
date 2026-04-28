"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["WEBDESIGN", "BRANDING", "SOCIAL MEDIA"];
const CHARS = '<>{}[]/=";:#!$';

const ANGLES_RAD = [0, 72, 144, 216, 288].map((d) => (d * Math.PI) / 180);

export default function Hero() {
  const [display, setDisplay] = useState(WORDS[0]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotRef         = useRef<HTMLSpanElement>(null);

  // Scroll progress
  useEffect(() => {
    const onScroll = () => {
      const bar   = progressBarRef.current;
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.height = total > 0 ? `${(window.scrollY / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Word cycling + scramble
  useEffect(() => {
    let currentIndex = 0;

    const runScramble = (target: string) => {
      let frame = 0;
      const total = 14;
      const id = setInterval(() => {
        if (frame >= total) {
          clearInterval(id);
          setDisplay(target);
          return;
        }
        const progress  = frame / total;
        const revealed  = Math.floor(progress * target.length);
        const scrambled = target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(scrambled);
        frame++;
      }, 40);
    };

    const main = setInterval(() => {
      currentIndex = (currentIndex + 1) % WORDS.length;
      runScramble(WORDS[currentIndex]);
    }, 2800);

    return () => clearInterval(main);
  }, []);

  // Magnetic pull + particle explosion
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const MAGNETIC_RADIUS = 120;
    const MAX_DISPLACEMENT = 14;
    let inField = false;

    // ── Particle burst ──────────────────────────────────────────
    const explode = () => {
      dot.animate(
        [
          { transform: dot.style.transform + " scale(1)"    },
          { transform: dot.style.transform + " scale(1.25)" },
          { transform: dot.style.transform + " scale(1)"    },
        ],
        { duration: 300, easing: "ease-in-out" }
      );

      ANGLES_RAD.forEach((angle) => {
        const dist = 14 + Math.random() * 6;
        const x    = Math.cos(angle) * dist;
        const y    = Math.sin(angle) * dist;

        const p = document.createElement("div");
        p.style.cssText =
          "position:absolute;width:3px;height:3px;border-radius:50%;" +
          "background:#F9F200;top:50%;left:50%;pointer-events:none;z-index:10;";
        dot.appendChild(p);

        p.animate(
          [
            { transform: "translate(-50%,-50%) scale(1)", opacity: "1" },
            { transform: `translate(calc(-50% + ${x}px),calc(-50% + ${y}px)) scale(0)`, opacity: "0" },
          ],
          { duration: 500, easing: "ease-out", fill: "forwards" }
        );

        setTimeout(() => p.remove(), 520);
      });
    };

    // ── Periodic explosion every 4s ─────────────────────────────
    const periodicId = setInterval(explode, 4000);

    // ── Magnetic mousemove ──────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect    = dot.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = e.clientX - centerX;
      const dy      = e.clientY - centerY;
      const dist    = Math.sqrt(dx * dx + dy * dy);

      if (dist < MAGNETIC_RADIUS) {
        // Pull toward cursor, clamped to MAX_DISPLACEMENT
        const strength = (1 - dist / MAGNETIC_RADIUS);
        const tx = dx * strength * (MAX_DISPLACEMENT / MAGNETIC_RADIUS) * 8;
        const ty = dy * strength * (MAX_DISPLACEMENT / MAGNETIC_RADIUS) * 8;
        const clampedX = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, tx));
        const clampedY = Math.max(-MAX_DISPLACEMENT, Math.min(MAX_DISPLACEMENT, ty));

        dot.style.transition = "transform 0.15s ease-out";
        dot.style.transform  = `translate(${clampedX}px, ${clampedY}px)`;

        // Fire explosion once on field entry
        if (!inField) {
          inField = true;
          explode();
        }
      } else {
        // Snap back with elastic easing
        dot.style.transition = "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)";
        dot.style.transform  = "translate(0px, 0px)";
        inField = false;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      clearInterval(periodicId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);  }
          50%      { transform: translateY(-12px); }
        }

        .hero-section {
          position: relative;
          height: 100vh;
          background: #0A0A0A;
          display: flex;
          align-items: center;
          padding-left: 6vw;
          padding-right: 6vw;
          overflow: hidden;
        }
        .hero-headline {
          margin: 0;
          padding: 0;
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: clamp(64px, 9vw, 130px);
          line-height: 0.95;
          text-transform: uppercase;
        }
        .hero-rotating-word {
          display: block;
          color: #F9F200;
          margin-bottom: 0.15em;
        }
        .hero-line2 {
          display: block;
          color: #F2F2EE;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 0.3s forwards;
        }
        .hero-dot {
          color: #F9F200;
        }
        .hero-sub {
          margin: 0;
          margin-top: 24px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: clamp(16px, 1.8vw, 20px);
          color: rgba(255,255,255,0.6);
          max-width: 540px;
          line-height: 1.55;
          opacity: 0;
          animation: fadeIn 0.7s ease-out 0.65s forwards;
        }
        .hero-trust {
          margin: 0;
          margin-top: 12px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 400;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.35);
          opacity: 0;
          animation: fadeIn 0.7s ease-out 0.85s forwards;
        }
        .hero-cta {
          display: inline-block;
          margin-top: 48px;
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #0A0A0A;
          background: #F9F200;
          padding: 18px 40px;
          text-decoration: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
          opacity: 0;
          animation: fadeIn 0.7s ease-out 1s forwards;
        }
        .hero-cta:hover {
          opacity: 0.88;
          transform: scale(1.01);
        }
        .logo-float {
          animation: float 4s ease-in-out infinite;
        }

        @media (max-width: 639px) {
          .hero-section  { padding-left: 24px; padding-right: 24px; }
          .hero-headline { font-size: clamp(40px, 11vw, 72px); }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-section  { padding-left: 6vw; padding-right: 6vw; }
          .hero-headline { font-size: clamp(56px, 8vw, 100px); }
        }
      `}</style>

      <section className="hero-section">

        {/* Dot-grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(249,242,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

        {/* Line-grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(249,242,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,242,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Grain */}
        <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <filter id="hero-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-noise)" />
          </svg>
        </div>

        {/* Yellow glow — bottom left */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 0% 100%, #F9F200 0%, transparent 60%)",
          opacity: 0.15,
        }} />

        {/* Decorative logo — right side */}
        <div style={{
          position: "absolute", right: "-10%", top: "50%",
          transform: "translateY(-50%)", zIndex: 0, pointerEvents: "none",
        }}>
          <div className="logo-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden src="/Logos/lemonlight_logo_yl.png" alt=""
              style={{ width: "clamp(350px, 40vw, 580px)", opacity: 0.12, display: "block", userSelect: "none" }}
            />
          </div>
        </div>

        {/* Scroll progress — left edge */}
        <div
          ref={progressBarRef}
          aria-hidden
          style={{
            position: "fixed", left: 0, top: 0,
            width: "3px", height: "0%",
            background: "#F9F200",
            zIndex: 999, pointerEvents: "none",
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 className="hero-headline">
            <span className="hero-rotating-word">{display}</span>
            <span className="hero-line2">
              DAS {"Z\u00DCNDET"}
              <span
                ref={dotRef}
                className="hero-dot"
                style={{ position: "relative", display: "inline-block" }}
              >.</span>
            </span>
          </h1>

          <p className="hero-sub">
            Webdesign, Branding &amp; Social Media – reduziert auf das, was zählt.
          </p>

          <p className="hero-trust">
            Direkt umgesetzt. Ein Ansprechpartner. Keine Agentur.
          </p>

          <a href="#contact" className="hero-cta">
            Projekt starten
          </a>
        </div>

      </section>
    </>
  );
}
