import FooterWordMark from "@/components/FooterWordMark";

const NAV_LINKS = ["Work", "Studio", "Services", "Contact"];

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-nav-link {
          font-family: var(--font-inter), sans-serif;
          font-weight: 500;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.25s ease, opacity 0.25s ease;
        }
        .footer-nav-link:hover {
          color: #F9F200;
          opacity: 1;
        }
        .footer-legal-link {
          font-family: var(--font-inter), sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.3s ease, opacity 0.3s ease;
        }
        .footer-legal-link:hover {
          color: #F9F200;
          opacity: 1;
        }
      `}</style>

      <footer
        style={{
          background: "#0A0A0A",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "80px 10vw 48px",
        }}
      >
        {/* Word mark with dissolve */}
        <FooterWordMark />

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
            flexWrap: "wrap",
            marginBottom: "64px",
          }}
        >
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="footer-nav-link"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Legal links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "32px", marginTop: "32px", marginBottom: "48px" }}>
          <a href="/impressum" className="footer-legal-link">Impressum</a>
          <a href="/datenschutz" className="footer-legal-link">Datenschutz</a>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.04)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
            © 2026 lemonlight.studio
          </span>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontWeight: 400, fontSize: "11px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
            Made with ♥ in Zell am See
          </span>
        </div>
      </footer>
    </>
  );
}
