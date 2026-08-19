import { useState } from "react";
import { ScrollProvider } from "./contexts/ScrollContext";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import KontourBanner from "./components/KontourBanner";
import StoktSections from "./components/stokt/StoktSections";
import ProjectsSection from "./components/ProjectsSection";
import WhySection from "./components/why/WhySection";
import JourneySection from "./components/journey/JourneySection";
import DeveloperSystemsSection from "./components/developerSystems/DeveloperSystemsSection";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import { CONTACT } from "./lib/contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const openContact = () => {
    window.open(CONTACT.whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleLoaderDone = () => {
    window.scrollTo(0, 0);
    setReady(true);
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  return (
    <ScrollProvider>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <PageLoader onDone={handleLoaderDone} />

      <Header
        ready={ready}
        onMenu={() => setMenuOpen(true)}
        onContact={openContact}
      />

      <main id="main">
        <KontourBanner id="home" theme="blue" onContact={openContact} />
        <StoktSections onContact={openContact} />
        <ProjectsSection />
        <WhySection />
        <JourneySection />
        <DeveloperSystemsSection />
      </main>

      <Footer />

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onContact={openContact}
      />
    </ScrollProvider>
  );
}
