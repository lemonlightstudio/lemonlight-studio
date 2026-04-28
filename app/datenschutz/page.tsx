"use client";

const SECTIONS = [
  {
    title: "Verantwortlicher",
    body: "Christoph Höller\nZell am See, Salzburg, Österreich\nhey@lemonlight.studio",
  },
  {
    title: "Allgemeines",
    body: "Der Schutz Ihrer Daten ist mir wichtig. Diese Website verarbeitet nur jene Daten, die technisch notwendig sind.",
  },
  {
    title: "Kontaktaufnahme",
    body: "Wenn Sie mich per E-Mail kontaktieren, werden Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.",
  },
  {
    title: "Cookies & Tracking",
    body: "Diese Website verwendet keine Tracking-Cookies, keine Analyse-Tools und kein Social-Media-Tracking.",
  },
  {
    title: "Hosting",
    body: "Diese Website wird über Vercel (Vercel Inc., San Francisco, USA) gehostet. Beim Aufruf der Website werden technisch notwendige Daten (z.B. IP-Adresse) temporär in Server-Logfiles gespeichert. Weitere Informationen: vercel.com/legal/privacy-policy",
  },
  {
    title: "Ihre Rechte",
    body: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Bei Fragen: hey@lemonlight.studio — Beschwerden können an die österreichische Datenschutzbehörde gerichtet werden: dsb.gv.at",
  },
];

export default function Datenschutz() {
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
          Datenschutz.
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
