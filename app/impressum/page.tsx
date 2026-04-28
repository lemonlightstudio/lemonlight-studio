"use client";

const SECTIONS = [
  {
    title: "Angaben gemäß § 5 ECG & § 25 MedienG",
    body: "Christoph Höller\nZell am See, Salzburg, Österreich\nhey@lemonlight.studio\nlemonlight.studio",
  },
  {
    title: "Hinweis",
    body: "Diese Website dient ausschließlich als Portfolio-Präsentation. Es besteht derzeit kein eingetragenes Gewerbe. Es werden keine Leistungen gegen Entgelt angeboten.",
  },
  {
    title: "Haftungsausschluss",
    body: "Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird keine Gewähr übernommen.",
  },
  {
    title: "Urheberrecht",
    body: "Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem österreichischen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung von Christoph Höller.",
  },
];

export default function Impressum() {
  return (
    <>
      <style>{`
        .legal-back:hover { opacity: 0.7; }
      `}</style>
      <main style={{
        background: "#0A0A0A",
        minHeight: "100vh",
        padding: "140px 10vw 80px",
        fontFamily: "var(--font-inter), Inter, sans-serif",
      }}>
        <p style={{
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.25em",
          color: "#F9F200",
          margin: 0,
          marginBottom: "32px",
        }}>
          — RECHTLICHES
        </p>

        <h1 style={{
          fontWeight: 700,
          fontSize: "clamp(48px, 6vw, 80px)",
          color: "#ffffff",
          margin: 0,
          marginBottom: "80px",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}>
          Impressum.
        </h1>

        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 style={{
              fontWeight: 700,
              fontSize: "16px",
              color: "#ffffff",
              margin: 0,
              marginTop: "48px",
              marginBottom: "12px",
            }}>
              {s.title}
            </h2>
            <p style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              maxWidth: "640px",
              margin: 0,
              whiteSpace: "pre-line",
            }}>
              {s.body}
            </p>
          </div>
        ))}

        <a
          href="/"
          className="legal-back"
          style={{
            display: "block",
            marginTop: "80px",
            fontFamily: "var(--font-inter), Inter, sans-serif",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "#F9F200",
            textDecoration: "none",
            transition: "opacity 0.3s ease",
          }}
        >
          ← Zurück
        </a>
      </main>
    </>
  );
}
