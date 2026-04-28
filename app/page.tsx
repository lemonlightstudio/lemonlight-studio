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
      <Hero />
      <Statement />
      <Services />
      <Work />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
