"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [logoRotation, setLogoRotation] = useState(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setLogoRotation(((e.clientX / window.innerWidth) - 0.5) * 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        /* ── Keyframes ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes fadeUpScale {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes dotColor {
          from { color: #F9F200; }
          to   { color: #ffffff; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px);   }
          50%       { transform: translateY(-12px); }
        }

        /* ── Text animations ── */
        .hero-word {
          display: inline-block;
          opacity: 0;
          animation: fadeUp 0.8s ease-out forwards;
        }
        .hero-word-wir    { animation-delay: 0.1s;  }
        .hero-word-zunden { animation-delay: 0.25s; }

        .hero-line2 {
          display: inline-block;
          opacity: 0;
          animation: fadeUpScale 0.9s ease-out 0.5s forwards;
        }
        .hero-dot {
          display: inline-block;
          animation: dotColor 3s ease-in-out 1.5s infinite alternate;
        }
        .hero-sub {
          opacity: 0;
          animation: fadeIn 0.7s ease-out 0.8s forwards;
        }
        .hero-buttons-wrap {
          opacity: 0;
          animation: fadeIn 0.7s ease-out 1s forwards;
        }

        /* ── Logo float ── */
        .logo-float {
          animation: float 4s ease-in-out infinite;
        }

        /* ── Layout ── */
        .hero-section {
          position: relative;
          height: 100vh;
          background: #0A0A0A;
          display: flex;
          align-items: center;
          padding-left: 10vw;
          padding-right: 10vw;
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

        /* ── Buttons ── */
        .hero-buttons {
          display: flex;
          flex-direction: row;
          gap: 16px;
          margin-top: 48px;
        }
        .hero-btn {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 16px 32px;
          text-decoration: none;
          display: inline-block;
          text-align: center;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .hero-btn-primary {
          color: #0A0A0A;
          background: #F9F200;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px);
        }
        .hero-btn-secondary {
          color: #F2F2EE;
          background: transparent;
        }
        .hero-btn-secondary:hover {
          color: #F9F200;
        }
        .hero-arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .hero-btn-secondary:hover .hero-arrow {
          transform: translateX(4px);
        }

        /* ── Responsive ── */
        @media (max-width: 639px) {
          .hero-section    { padding-left: 24px; padding-right: 24px; }
          .hero-headline   { font-size: clamp(48px, 12vw, 80px); }
          .hero-buttons    { flex-direction: column; }
          .hero-btn        { width: 100%; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-section  { padding-left: 48px; padding-right: 48px; }
          .hero-headline { font-size: clamp(60px, 8vw, 100px); }
        }
      `}</style>


      <section className="hero-section">
        {/* Dot-grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(249,242,0,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            pointerEvents: "none",
          }}
        />

        {/* Line-grid background */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(249,242,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(249,242,0,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />

        {/* Grain overlay */}
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 0% 100%, #F9F200 0%, transparent 60%)",
            opacity: 0.15,
            pointerEvents: "none",
          }}
        />

        {/* Decorative logo — right side, float + cursor rotation */}
        <div
          style={{
            position: "absolute",
            right: "-10%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <div className="logo-float">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              aria-hidden
              src="/Logos/lemonlight_logo_yl.png"
              alt=""
              style={{
                width: "clamp(350px, 40vw, 580px)",
                opacity: 0.12,
                display: "block",
                userSelect: "none",
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <h1 className="hero-headline">
            {/* Line 1 — "WIR" + "ZÜNDEN" staggered */}
            <span style={{ display: "block" }}>
              <span className="hero-word hero-word-wir" style={{ color: "#F2F2EE", marginRight: "0.25em" }}>
                WIR
              </span>
              <span className="hero-word hero-word-zunden" style={{ color: "#F2F2EE" }}>
                {"Z\u00DCNDEN"}
              </span>
            </span>

            {/* Line 2 — "MARKEN." as one weighted unit */}
            <span style={{ display: "block" }}>
              <span className="hero-line2" style={{ color: "#F9F200" }}>
                MARKEN<span className="hero-dot">.</span>
              </span>
            </span>
          </h1>

          <p
            className="hero-sub"
            style={{
              margin: 0,
              marginTop: "32px",
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Webdesign · Branding · Marketing
          </p>

          <div className="hero-buttons hero-buttons-wrap">
            <a href="#work" className="hero-btn hero-btn-primary">
              Projekte ansehen
            </a>
            <a href="#contact" className="hero-btn hero-btn-secondary">
              Let&apos;s Talk <span className="hero-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
