import { useState, useEffect } from "react";
import { NavBar, Ticker, NAV_LINKS } from "@/components/sections/NavBar";
import { HeroSection, AboutSection, CatalogSection } from "@/components/sections/HeroAboutCatalog";
import { PortfolioSection, ConditionsSection, DocumentsSection } from "@/components/sections/PortfolioConditionsDocs";
import { ContactsSection, Footer } from "@/components/sections/ContactsFooter";

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    NAV_LINKS.forEach(l => {
      const el = document.getElementById(l.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-ibm">
      <NavBar active={activeSection} onNavigate={setActiveSection} />
      <HeroSection />
      <Ticker />
      <AboutSection />
      <CatalogSection />
      <PortfolioSection />
      <ConditionsSection />
      <DocumentsSection />
      <ContactsSection />
      <Footer onNavigate={setActiveSection} />
    </div>
  );
}
