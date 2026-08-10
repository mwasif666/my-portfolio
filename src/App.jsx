import { useState } from "react";
import { ScrollProvider } from "./contexts/ScrollContext";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import KontourBanner from "./components/KontourBanner";
import StoktSections from "./components/stokt/StoktSections";
import ProjectsSection from "./components/ProjectsSection";
import WhySection from "./components/why/WhySection";
import NavMenu from "./components/NavMenu";
import RequestModal from "./components/RequestModal";

export default function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

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
        onContact={openModal}
      />

      <main id="main">
        <KontourBanner id="home" theme="blue" onContact={openModal} />
        <StoktSections onContact={openModal} />
        <ProjectsSection />
        <WhySection />
      </main>

      <NavMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onContact={openModal}
      />
      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </ScrollProvider>
  );
}
