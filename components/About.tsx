"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROOF = [
  {
    num: "01",
    title: "Direkt mit dir",
    desc: "Kein Projektmanager dazwischen. Du redest mit der Person, die auch baut.",
  },
  {
    num: "02",
    title: "Von Briefing bis Launch",
    desc: "Strategie, Design, Code — alles aus einer Hand. Kein Übergabe-Chaos.",
  },
  {
    num: "03",
    title: "Volle Aufmerksamkeit",
    desc: "Ich nehme wenige Projekte an. Dafür bekommt deins 100%.",
  },
];

export default function About() {
  const imgRef   = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const headRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image subtle scale on scroll
      gsap.fromTo(
        imgRef.current,
        { scale: 1 },
        {
          scale: 1.03,
          ease: "none",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Headline fade in
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Proof items stagger
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: itemsRef.current[0],
            start: "top 82%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 58fr 42fr;
          min-height: 100vh;
        }
        .about-img-wrap {
          position: relative;
          overflow: hidden;
          clip-path: polygon(0 0, 95% 0, 100% 100%, 0% 100%);
        }
        .about-right {
          background: transparent;
          padding: 80px 8% 80px 6%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .about-right-inner {
          margin-top: 15%;
        }
        .proof-item {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 16px;
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          align-items: start;
        }
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .about-img-wrap {
            height: 60vw;
            clip-path: none;
          }
          .about-right {
            padding: 48px 6vw;
          }
          .about-right-inner {
            margin-top: 0;
          }
        }
      `}</style>

      <section className="about-grid section-grid">

        {/* ── Left — Image ─────────────────────────────────────── */}
        <div className="about-img-wrap">
          <div
            ref={imgRef}
            style={{ width: "100%", height: "100%", willChange: "transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Christoph/christoph_edit.png"
              alt="Christoph Höller"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
                filter: "grayscale(25%) contrast(1.15) brightness(0.82)",
              }}
            />
          </div>

          {/* Gradient overlay bottom */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />

          {/* Name label bottom-left */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              padding: "40px",
            }}
          >
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 700,
                fontSize: "14px",
                color: "#ffffff",
                letterSpacing: "0.01em",
              }}
            >
              Christoph Höller
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-inter), sans-serif",
                fontWeight: 400,
                fontSize: "11px",
                color: "#F9F200",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                marginTop: "6px",
              }}
            >
              Founder &amp; Designer
            </span>
          </div>
        </div>

        {/* ── Right — Text ─────────────────────────────────────── */}
        <div className="about-right">
          <div className="about-right-inner">

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
                marginBottom: "40px",
              }}
            >
              — WER ICH BIN
            </p>

            {/* Headline */}
            <div ref={headRef}>
              <h2 style={{ margin: 0, padding: 0, lineHeight: 0.95 }}>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 4vw, 64px)",
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Ich arbeite
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 4vw, 64px)",
                    color: "#F9F200",
                    letterSpacing: "-0.02em",
                  }}
                >
                  anders.
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-inter), sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(40px, 4vw, 64px)",
                    color: "rgba(255,255,255,0.85)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Direkt. Ohne{"\u00A0"}Umwege.
                </span>
              </h2>
            </div>

            {/* Proof items */}
            <div style={{ marginTop: "56px" }}>
              {PROOF.map((item, i) => (
                <div
                  key={item.num}
                  ref={(el) => { if (el) itemsRef.current[i] = el; }}
                  className="proof-item"
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "11px",
                      color: "#F9F200",
                      letterSpacing: "0.12em",
                      paddingTop: "2px",
                    }}
                  >
                    {item.num}
                  </span>
                  <div>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontWeight: 700,
                        fontSize: "16px",
                        color: "#ffffff",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontWeight: 400,
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </section>
    </>
  );
}
