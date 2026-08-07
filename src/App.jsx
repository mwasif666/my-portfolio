import { useState } from "react";
import { ScrollProvider } from "./contexts/ScrollContext";
import PageLoader from "./components/PageLoader";
import Header from "./components/Header";
import KontourBanner from "./components/KontourBanner";
import AboutSection from "./components/AboutSection";
import NavMenu from "./components/NavMenu";
import RequestModal from "./components/RequestModal";

export default function App() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  return (
    <ScrollProvider>
      <a href="#main" className="skip">
        Skip to content
      </a>

      <PageLoader onDone={() => setReady(true)} />

      <Header
        ready={ready}
        onMenu={() => setMenuOpen(true)}
        onContact={openModal}
      />

      <main id="main">
        {/* Keep the banner static; smooth scrolling remains handled globally. */}
        <KontourBanner id="home" theme="blue" onContact={openModal} />
        <AboutSection />
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
