export default function Datenschutz() {
  return (
    <main style={{
      background: "#0A0A0A",
      minHeight: "100vh",
      padding: "120px 10vw 80px",
      fontFamily: "var(--font-inter), Inter, sans-serif",
      color: "#F2F2EE",
    }}>
      <a href="/" style={{ fontFamily: "var(--font-inter), Inter, sans-serif", fontSize: "13px", color: "#F9F200", textDecoration: "none", letterSpacing: "0.1em", textTransform: "uppercase" }}>← Zurück</a>

      <h1 style={{ fontWeight: 700, fontSize: "clamp(32px, 5vw, 56px)", marginTop: "48px", marginBottom: "56px", letterSpacing: "-0.02em" }}>Datenschutz</h1>

      <p style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#F9F200", marginBottom: "40px" }}>Datenschutzerklärung gemäß DSGVO</p>

      <div style={{ maxWidth: "640px", lineHeight: 1.8, fontSize: "16px", color: "rgba(255,255,255,0.7)" }}>
        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginBottom: "12px" }}>Verantwortlicher</h2>
        <p>Christoph Höller<br />Zell am See, Salzburg, Österreich<br /><a href="mailto:hey@lemonlight.studio" style={{ color: "#F9F200", textDecoration: "none" }}>hey@lemonlight.studio</a></p>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.08)", margin: "40px 0" }} />

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginBottom: "12px" }}>1. Allgemeines</h2>
        <p>Der Schutz Ihrer Daten ist mir wichtig. Diese Website verarbeitet nur jene Daten, die technisch notwendig sind.</p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>2. Kontaktaufnahme</h2>
        <p>Wenn Sie mich per E-Mail kontaktieren, werden Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage verwendet und nicht an Dritte weitergegeben.</p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>3. Cookies &amp; Tracking</h2>
        <p>Diese Website verwendet keine Tracking-Cookies, keine Analyse-Tools und kein Social-Media-Tracking.</p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>4. Hosting</h2>
        <p>Diese Website wird über Vercel (Vercel Inc., San Francisco, USA) gehostet. Beim Aufruf der Website werden technisch notwendige Daten (z.B. IP-Adresse) temporär in Server-Logfiles gespeichert. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" style={{ color: "#F9F200", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a></p>

        <h2 style={{ color: "#F2F2EE", fontWeight: 700, fontSize: "18px", marginTop: "32px", marginBottom: "12px" }}>5. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer Daten. Bei Fragen: <a href="mailto:hey@lemonlight.studio" style={{ color: "#F9F200", textDecoration: "none" }}>hey@lemonlight.studio</a><br />Beschwerden können an die österreichische Datenschutzbehörde gerichtet werden: <a href="https://www.dsb.gv.at" style={{ color: "#F9F200", textDecoration: "none" }} target="_blank" rel="noopener noreferrer">dsb.gv.at</a></p>
      </div>
    </main>
  );
}
