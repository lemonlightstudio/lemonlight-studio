"use client";

import { useState } from "react";

const links = ["Work", "Studio", "Services", "Contact"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        .nav-links {
          display: flex;
          align-items: center;
          gap: 36px;
          list-style: none;
          margin: 0;
          padding: 0;
          margin-right: 36px;
        }
        .nav-cta {
          display: inline-block;
        }
        .nav-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: #F9F200;
          line-height: 1;
        }
        .nav-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.25s ease;
        }
        .nav-link:hover {
          color: #F9F200;
        }
        .nav-cta-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #F9F200;
          text-decoration: none;
          transition: text-decoration 0.25s ease;
        }
        .nav-cta-link:hover {
          text-decoration: underline;
        }

        /* Overlay links */
        .overlay-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 700;
          font-size: clamp(32px, 8vw, 64px);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .overlay-link:hover {
          color: #F9F200;
        }

        @media (max-width: 639px) {
          .nav-links {
            display: none;
          }
          .nav-cta {
            display: none;
          }
          .nav-hamburger {
            display: block;
          }
        }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          height: "64px",
          padding: "0 48px",
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(249,242,0,0.08)",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline" }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.02em", color: "#F2F2EE" }}>lemon</span>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.02em", color: "#F9F200" }}>light.</span>
        </a>

        <div style={{ flex: 1 }} />

        {/* Desktop nav links */}
        <ul className="nav-links">
          {links.map((label) => (
            <li key={label}>
              <a href={`#${label.toLowerCase()}`} className="nav-link">
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <span className="nav-cta">
          <a href="#contact" className="nav-cta-link">
            let&apos;s talk →
          </a>
        </span>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "#0A0A0A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#F9F200",
              padding: 0,
              lineHeight: 1,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>

          {/* Links */}
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="overlay-link"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}

          {/* CTA */}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "#F9F200",
              textDecoration: "none",
              marginTop: "16px",
            }}
          >
            let&apos;s talk →
          </a>
        </div>
      )}
    </>
  );
}
