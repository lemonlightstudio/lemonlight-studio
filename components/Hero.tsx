"use client";

import { useEffect, useRef, useState } from "react";

const WORDS = ["WEBDESIGN", "BRANDING", "SOCIAL MEDIA"];
const CHARS = '<>{}[]/=";:#!$';


export default function Hero() {
  const [display, setDisplay] = useState(WORDS[0]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const dotRef         = useRef<HTMLSpanElement>(null);
  const canvasRef      = useRef<HTMLCanvasElement>(null);

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

  // Dot scroll reaction
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      if (dotRef.current) {
        dotRef.current.style.animation = "none";
        dotRef.current.style.color     = "#F9F200";
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (dotRef.current) {
          dotRef.current.style.color     = "";
          dotRef.current.style.animation = "dotPulse 2.5s ease-in-out infinite";
        }
      }, 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(timeout); };
  }, []);

  // Canvas grid point motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const TRAIL = 8;
    const pts = [
      { x: canvas.width * 0.20, y: canvas.height * 0.30, vx:  0.30, vy:  0.20, trail: [] as {x:number;y:number}[] },
      { x: canvas.width * 0.70, y: canvas.height * 0.60, vx: -0.20, vy: -0.15, trail: [] as {x:number;y:number}[] },
    ];

    let rafId: number;
    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        // store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL) p.trail.shift();

        // draw trail
        for (let i = 0; i < p.trail.length; i++) {
          const alpha = (i / p.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(p.trail[i].x, p.trail[i].y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(249,242,0,${alpha})`;
          ctx.fill();
        }

        // draw point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249,242,0,0.45)";
        ctx.fill();

        // update position + wrap
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)  p.x = w;
        if (p.x > w)  p.x = 0;
        if (p.y < 0)  p.y = h;
        if (p.y > h)  p.y = 0;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
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
        @keyframes dotPulse {
          0%, 100% { color: #ffffff; transform: scale(1);    }
          50%      { color: #F9F200; transform: scale(1.15); }
        }
        .hero-dot-pulse {
          display: inline-block;
          animation: dotPulse 2.2s ease-in-out infinite;
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
          border: none;
          outline: none;
          box-shadow: none;
          font-family: var(--font-inter), Inter, sans-serif;
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

        {/* Canvas grid point motion */}
        <canvas
          ref={canvasRef}
          aria-hidden
          style={{
            position: "absolute", top: 0, left: 0,
            width: "100%", height: "100%",
            pointerEvents: "none", zIndex: 0, opacity: 0.4,
          }}
        />

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
          position: "absolute", bottom: 0, left: 0,
          width: "70vw", height: "70vh",
          pointerEvents: "none",
          background: "radial-gradient(circle at 20% 80%, rgba(249,242,0,0.18) 0%, rgba(249,242,0,0.08) 25%, rgba(249,242,0,0.03) 40%, transparent 65%)",
        }} />

        {/* Coordinates — bottom right */}
        <div aria-hidden style={{
          position: "absolute", bottom: "48px", right: "6vw",
          pointerEvents: "none", zIndex: 0, userSelect: "none",
          textAlign: "right",
        }}>
          <div style={{
            fontFamily: "monospace", fontSize: "11px",
            color: "rgba(255,255,255,0.18)", letterSpacing: "0.15em",
          }}>
            47.3256° N / 12.7997° E
          </div>
          <div style={{
            fontFamily: "monospace", fontSize: "10px",
            color: "rgba(255,255,255,0.12)", letterSpacing: "0.15em",
            marginTop: "4px",
          }}>
            ZELL AM SEE, AUSTRIA
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
        <div style={{ position: "relative", zIndex: 1, width: "100%", fontFamily: "var(--font-inter), Inter, sans-serif" }}>
          <h1 className="hero-headline">
            <span className="hero-rotating-word">{display}</span>
            <span className="hero-line2">{`DAS Z\u00DCNDET`}<span ref={dotRef} className="hero-dot-pulse">.</span></span>
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

      {/* Film grain — fixed, covers entire page */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100vw", height: "100vh",
          pointerEvents: "none",
          zIndex: 999,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />
    </>
  );
}
