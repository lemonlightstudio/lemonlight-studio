export default function Impressum() {
  return (
    <main style={{
      background: "#0A0A0A",
      minHeight: "100vh",
      padding: "120px 10vw 80px",
      fontFamily: "var(--font-inter), Inter, sans-serif",
      color: "#F2F2EE",
    }}>
      <a href="/" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13px", color: "#F9F200", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Zurück</a>

      <h1 style={{ fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)", marginTop: "48px", marginBottom: "56px", letterSpacing: "-0.02em" }}>Impressum</h1>

      <p style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F9F200", marginBottom: "40px" }}>Angaben gemäß § 5 ECG &amp; § 25 MedienG</p>

      <div style={{ maxWidth: "640px", lineHeight: 1.8, fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>
        <p><strong style={{ color: "#F2F2EE" }}>Name:</strong> Christoph Höller</p>
        <p><strong style={{ color: "#F2F2EE" }}>Adresse:</strong> Zell am See, Salzburg, Österreich</p>
        <p><strong style={{ color: "#F2F2EE" }}>E-Mail:</strong> <a href="mailto:hey@lemonlight.studio" style={{ color: "#F9F200", textDecoration: "none" }}>hey@lemonlight.studio</a></p>
        <p><strong style={{ color: "#F2F2EE" }}>Website:</strong> lemonlight.studio</p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "40px 0" }} />

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginBottom: "12px" }}>Hinweis</h2>
        <p>Diese Website dient ausschließlich als Portfolio-Präsentation. Es besteht derzeit kein eingetragenes Gewerbe. Es werden keine Leistungen gegen Entgelt angeboten.</p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>Haftungsausschluss</h2>
        <p>Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird keine Gewähr übernommen.</p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>Urheberrecht</h2>
        <p>Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem österreichischen Urheberrecht. Jede Vervielfältigung, Bearbeitung oder Verbreitung bedarf der schriftlichen Zustimmung von Christoph Höller.</p>
      </div>
    </main>
  );
}
