"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    num: "01",
    title: "Projekt Alpha",
    tags: ["Webdesign", "Branding"],
    gradient: "linear-gradient(135deg, #111100, #1a1a00)",
  },
  {
    num: "02",
    title: "Projekt Beta",
    tags: ["Branding", "Social Media"],
    gradient: "linear-gradient(135deg, #0d0d00, #181800)",
  },
  {
    num: "03",
    title: "Projekt Gamma",
    tags: ["Webdesign", "Marketing"],
    gradient: "linear-gradient(135deg, #0a0a1a, #12122a)",
  },
];

const TOTAL = PROJECTS.length;

export default function Work() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const rows = rowsRef.current;
    if (rows.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(wrapRef.current, { perspective: 1000 });

      gsap.fromTo(
        rows,
        { opacity: 0, y: 30, rotateX: 8, transformPerspective: 1000 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: rows[0],
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
        /* Row hover — warm background shift */
        .work-row {
          transition: background 0.5s ease;
        }
        .work-row:hover {
          background: rgba(249,242,0,0.02);
        }

        /* Title — letter-spacing on hover, stays white */
        .work-title {
          transition: letter-spacing 0.4s ease;
          letter-spacing: -0.02em;
        }
        .work-row:hover .work-title {
          letter-spacing: 0.02em;
        }

        /* Vertical line — height 0 → 40px on row hover */
        .work-vline {
          width: 1px;
          height: 0;
          background: #F9F200;
          opacity: 0.3;
          flex-shrink: 0;
          align-self: center;
          margin-right: 24px;
          transition: height 0.4s ease;
        }
        .work-row:hover .work-vline {
          height: 40px;
        }

        /* Image placeholder */
        .work-image {
          position: relative;
          flex-shrink: 0;
          width: 480px;
          height: 320px;
          border-radius: 2px;
          overflow: hidden;
          background: #0A0A0A;
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.4s ease;
        }
        .work-image:hover {
          border-color: rgba(249,242,0,0.2);
        }
        .work-image:hover .work-img-arrow {
          opacity: 1;
          color: #F9F200;
        }
        .work-img-arrow {
          transition: opacity 0.3s ease, color 0.3s ease;
        }
        @keyframes squarePulse {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }
        .work-image:hover .work-img-dot {
          animation: squarePulse 0.4s ease forwards;
        }

        /* CTA */
        .work-cta {
          display: inline-block;
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #F2F2EE;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.15);
          padding: 16px 48px;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .work-cta:hover {
          color: #F9F200;
          border-color: #F9F200;
        }

        @media (max-width: 767px) {
          .work-row {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .work-image {
            width: 100% !important;
            height: 240px !important;
          }
          .work-vline {
            display: none;
          }
        }
      `}</style>

      <section style={{ background: "#0A0A0A", padding: "120px 10vw" }}>

        {/* Header */}
        <p
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 500,
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.25em",
            color: "#F9F200",
            margin: 0,
            marginBottom: "24px",
          }}
        >
          — AUSGEWÄHLTE PROJEKTE
        </p>
        <h2
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 700,
            fontSize: "clamp(56px, 7vw, 96px)",
            color: "#ffffff",
            margin: 0,
            marginBottom: "80px",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          Unsere Arbeit.
        </h2>

        {/* Rows wrapper — perspective target */}
        <div ref={wrapRef}>
          {PROJECTS.map((p, i) => {
            const isLast = i === PROJECTS.length - 1;
            return (
              <div
                key={p.num}
                ref={(el) => { if (el) rowsRef.current[i] = el; }}
                className="work-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "40px",
                  padding: "48px 0",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: isLast ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                {/* Vertical accent line */}
                <div className="work-vline" />

                {/* Left — number + title + tags */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      color: "#F9F200",
                      letterSpacing: "0.12em",
                      marginBottom: "16px",
                    }}
                  >
                    {p.num}
                  </span>
                  <h3
                    className="work-title"
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(40px, 4vw, 64px)",
                      color: "#ffffff",
                      margin: 0,
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </h3>
                  {/* Tags with dot separator */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >
                    {p.tags.map((tag, ti) => (
                      <span key={tag} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-inter), sans-serif",
                            fontWeight: 500,
                            fontSize: "11px",
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "#F9F200",
                          }}
                        >
                          {tag}
                        </span>
                        {ti < p.tags.length - 1 && (
                          <span
                            style={{
                              display: "inline-block",
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              background: "#F9F200",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Counter — "01 / 03" */}
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.num} / {String(TOTAL).padStart(2, "0")}
                </span>

                {/* Right — image placeholder */}
                <div className="work-image">
                  {/* Mirrored title — huge, faint */}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scaleX(-1)",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(56px, 6vw, 80px)",
                      color: "rgba(255,255,255,0.04)",
                      whiteSpace: "nowrap",
                      pointerEvents: "none",
                      userSelect: "none",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    {p.title}
                  </span>

                  {/* Bottom-left yellow square */}
                  <span
                    className="work-img-dot"
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      width: "8px",
                      height: "8px",
                      background: "#F9F200",
                      display: "block",
                      flexShrink: 0,
                    }}
                  />

                  {/* Top-right arrow */}
                  <span
                    className="work-img-arrow"
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "16px",
                      fontSize: "24px",
                      color: "rgba(255,255,255,0.2)",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    ↗
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <a href="#" className="work-cta">
            Alle Projekte ansehen →
          </a>
        </div>
      </section>
    </>
  );
}
