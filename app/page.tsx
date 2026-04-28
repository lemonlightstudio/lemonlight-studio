import Hero from "@/components/Hero";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <section id="hero"><Hero /></section>
      <Statement />
      <section id="work"><Work /></section>
      <section id="services"><Services /></section>
      <section id="about"><About /></section>
      <section id="contact"><Contact /></section>
      <Footer />
    </main>
  );
}
