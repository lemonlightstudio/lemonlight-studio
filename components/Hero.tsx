"use client";

import { useEffect, useRef } from "react";

const WORDS        = ["WEBDESIGN", "BRANDING", "SOCIAL MEDIA"];
const ALPHA        = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DISPLAY_MS   = 2200; // how long each word is shown
const OUT_MS       = 250;  // outgoing slide duration
const IN_MS        = 250;  // incoming slide duration
const SCRAMBLE_ITER = 8;
const SCRAMBLE_TICK = 35;

// "SOCIAL MEDIA" is longer — scale it down so it never exceeds the width of "DAS ZÜNDET."
function wordFontSize(word: string): string {
  return word === "SOCIAL MEDIA" ? "85%" : "";
}

function runScramble(target: string, el: HTMLElement): ReturnType<typeof setInterval> {
  let step = 0;
  const iv = setInterval(() => {
    const resolved = target.slice(0, step);
    const noise    = Array.from(
      { length: target.length - step },
      () => ALPHA[Math.floor(Math.random() * ALPHA.length)]
    ).join("");
    el.textContent = resolved + noise;
    step++;
    if (step > SCRAMBLE_ITER) {
      clearInterval(iv);
      el.textContent = target;
    }
  }, SCRAMBLE_TICK);
  return iv;
}

export default function Hero() {
  const slotsRef        = useRef<(HTMLDivElement | null)[]>([null, null]);
  const activeSlotRef   = useRef(0);
  const wordIdxRef      = useRef([0, 1]);
  const timersRef       = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scrambleRef     = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressBarRef  = useRef<HTMLDivElement>(null);

  // Scroll progress line
  useEffect(() => {
    const onScroll = () => {
      const bar = progressBarRef.current;
      if (!bar) return;
      const scrolled = window.scrollY;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.height = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const slots = slotsRef.current;

    // ── Initial state ───────────────────────────────────────────
    const s0 = slots[0]!;
    const s1 = slots[1]!;
    s0.textContent = WORDS[0];
    s0.style.fontSize  = wordFontSize(WORDS[0]);
    s0.style.transform = "translateY(0)";
    s0.style.opacity   = "1";
    s0.style.filter    = "blur(0px)";
    s1.textContent = WORDS[1];
    s1.style.fontSize  = wordFontSize(WORDS[1]);
    s1.style.transform = "translateY(110%)";
    s1.style.opacity   = "0";
    s1.style.filter    = "blur(4px)";

    function later(fn: () => void, ms: number) {
      const t = setTimeout(fn, ms);
      timersRef.current.push(t);
    }

    function cycle() {
      const active      = activeSlotRef.current;
      const curEl       = slots[active]!;
      const nxtEl       = slots[1 - active]!;
      const nextWordIdx = (wordIdxRef.current[active] + 1) % WORDS.length;

      // 1. Slide outgoing word up + fade + blur
      curEl.style.transition = `transform ${OUT_MS}ms ease, opacity ${OUT_MS}ms ease, filter ${OUT_MS}ms ease`;
      curEl.style.transform  = "translateY(-110%)";
      curEl.style.opacity    = "0";
      curEl.style.filter     = "blur(4px)";

      later(() => {
        // 2. Pre-position incoming slot at bottom (snap, no transition)
        nxtEl.textContent  = WORDS[nextWordIdx];
        nxtEl.style.fontSize   = wordFontSize(WORDS[nextWordIdx]);
        nxtEl.style.transition = "none";
        nxtEl.style.transform  = "translateY(110%)";
        nxtEl.style.opacity    = "0";
        nxtEl.style.filter     = "blur(4px)";
        void nxtEl.offsetWidth; // force reflow

        // Kick off scramble on incoming element
        if (scrambleRef.current) clearInterval(scrambleRef.current);
        scrambleRef.current = runScramble(WORDS[nextWordIdx], nxtEl);

        // 3. Slide incoming word in + unblur
        nxtEl.style.transition = `transform ${IN_MS}ms ease, opacity ${IN_MS}ms ease, filter ${IN_MS}ms ease`;
        nxtEl.style.transform  = "translateY(0)";
        nxtEl.style.opacity    = "1";
        nxtEl.style.filter     = "blur(0px)";

        later(() => {
          // 4. Swap active slot
          const newActive = 1 - active;
          activeSlotRef.current        = newActive;
          wordIdxRef.current[newActive] = nextWordIdx;

          // Reset old current to standby position (snap)
          const futureWordIdx = (nextWordIdx + 1) % WORDS.length;
          curEl.style.transition = "none";
          curEl.style.transform  = "translateY(110%)";
          curEl.style.opacity    = "0";
          curEl.style.filter     = "blur(4px)";
          curEl.textContent      = WORDS[futureWordIdx];
          curEl.style.fontSize   = wordFontSize(WORDS[futureWordIdx]);
          wordIdxRef.current[active] = futureWordIdx;

          later(cycle, DISPLAY_MS);
        }, IN_MS);
      }, OUT_MS);
    }

    later(cycle, DISPLAY_MS);

    return () => {
      timersRef.current.forEach(clearTimeout);
      if (scrambleRef.current) clearInterval(scrambleRef.current);
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
          0%, 100% { transform: translateY(0px);   }
          50%      { transform: translateY(-12px); }
        }

        .hero-section {
          position: relative;
          height: 100vh;
          background: #0A0A0A;
          display: flex;
          align-items: center;
          padding-left: 12vw;
          padding-right: 12vw;
          overflow: hidden;
        }
        .hero-headline {
          margin: 0;
          padding: 0;
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: clamp(72px, 10vw, 140px);
          line-height: 0.95;
          text-transform: uppercase;
        }

        /* Slot container: clips the sliding words */
        .hero-word-container {
          display: block;
          overflow: hidden;
          position: relative;
          height: 1em;
        }

        /* Individual word slots */
        .hero-slot {
          position: absolute;
          top: 0;
          left: 0;
          color: #F9F200;
          will-change: transform, opacity, filter;
        }

        /* Line 2 */
        .hero-line2 {
          display: block;
          color: #F2F2EE;
          opacity: 0;
          animation: fadeUp 0.8s ease-out 0.3s forwards;
        }

        /* Subline */
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

        /* Trust line */
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

        /* CTA */
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

        /* Logo float */
        .logo-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Responsive */
        @media (max-width: 639px) {
          .hero-section  { padding-left: 24px; padding-right: 24px; }
          .hero-headline { font-size: clamp(48px, 12vw, 80px); }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-section  { padding-left: 10vw; padding-right: 10vw; }
          .hero-headline { font-size: clamp(60px, 8vw, 100px); }
        }
      `}</style>

      <section className="hero-section">

        {/* Dot-grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle, rgba(249,242,0,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          pointerEvents: "none",
        }} />

        {/* Line-grid */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(rgba(249,242,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,242,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
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
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 0% 100%, #F9F200 0%, transparent 60%)",
          opacity: 0.15,
          pointerEvents: "none",
        }} />

        {/* Decorative logo — right side */}
        <div style={{
          position: "absolute", right: "-10%", top: "50%",
          transform: "translateY(-50%)",
          zIndex: 0, pointerEvents: "none",
        }}>
          <div className="logo-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              src="/Logos/lemonlight_logo_yl.png"
              alt=""
              style={{ width: "clamp(350px, 40vw, 580px)", opacity: 0.12, display: "block", userSelect: "none" }}
            />
          </div>
        </div>

        {/* Scroll progress — left edge */}
        <div aria-hidden style={{
          position: "fixed", left: 0, top: 0, bottom: 0,
          width: "2px", zIndex: 50, pointerEvents: "none",
          background: "rgba(255,255,255,0.04)",
        }}>
          <div
            ref={progressBarRef}
            style={{
              width: "100%",
              height: "0%",
              background: "#F9F200",
              transition: "height 0.1s linear",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 className="hero-headline">

            {/* Line 1 — rotating word (overflow hidden clip) */}
            <span className="hero-word-container">
              <div
                ref={(el) => { slotsRef.current[0] = el; }}
                className="hero-slot"
              />
              <div
                ref={(el) => { slotsRef.current[1] = el; }}
                className="hero-slot"
              />
            </span>

            {/* Line 2 */}
            <span className="hero-line2">
              DAS {"Z\u00DCNDET."}
            </span>

          </h1>

          {/* Subline */}
          <p className="hero-sub">
            Webdesign, Branding &amp; Social Media – reduziert auf das, was zählt.
          </p>

          {/* Trust line */}
          <p className="hero-trust">
            Direkt umgesetzt. Ein Ansprechpartner. Keine Agentur.
          </p>

          {/* CTA */}
          <a href="#contact" className="hero-cta">
            Projekt starten
          </a>
        </div>

      </section>
    </>
  );
}
