"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",     label: "Start"    },
  { id: "services", label: "Services" },
  { id: "work",     label: "Projekte" },
  { id: "about",    label: "Studio"   },
  { id: "contact",  label: "Kontakt"  },
];

export default function SectionDots() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <style>{`
        .section-dots {
          position: fixed;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .section-dot-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .section-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(249,242,0,0.25);
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
          flex-shrink: 0;
        }
        .section-dot.active {
          background: #F9F200;
          transform: scale(1.4);
        }
        .section-dot:hover {
          background: rgba(249,242,0,0.6);
        }
        .section-dot-label {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          color: #F9F200;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .section-dot-wrap:hover .section-dot-label {
          opacity: 1;
        }
        @media (max-width: 768px) {
          .section-dots { display: none; }
        }
      `}</style>

      <nav className="section-dots" aria-label="Seitennavigation">
        {SECTIONS.map(({ id, label }) => (
          <div key={id} className="section-dot-wrap">
            <span className="section-dot-label">{label}</span>
            <div
              className={`section-dot${active === id ? " active" : ""}`}
              onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
              title={label}
            />
          </div>
        ))}
      </nav>
    </>
  );
}
