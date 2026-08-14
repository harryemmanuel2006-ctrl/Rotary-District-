import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { GovernorSection } from './components/GovernorSection';
import { VisionMissionSection } from './components/VisionMissionSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ImpactSection } from './components/ImpactSection';
import { EventsSection } from './components/EventsSection';
import { ClubsSection } from './components/ClubsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { GoodwillSection } from './components/GoodwillSection';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { JoinModal } from './components/JoinModal';
import { DonateModal } from './components/DonateModal';
import { AdminDashboard } from './components/AdminDashboard';

export function AppContent() {
  const [activeTab, setActiveTabState] = useState('home');
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [donateDefaultCause, setDonateDefaultCause] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    if (tab === 'admin') {
      setIsAdminOpen(true);
      return;
    }
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openDonateModal = (cause?: string) => {
    setDonateDefaultCause(cause);
    setIsDonateOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openJoinModal={() => setIsJoinOpen(true)}
        openDonateModal={() => openDonateModal()}
      />

      <main>
        {/* Hero Banner Section */}
        <Hero
          setActiveTab={setActiveTab}
          openDonateModal={() => openDonateModal()}
          openJoinModal={() => setIsJoinOpen(true)}
        />

        {/* Meet the District Governor Section */}
        <section id="governor">
          <GovernorSection />
        </section>

        {/* Vision, Mission, 4-Way Test & Philosophy Section */}
        <section id="vision">
          <VisionMissionSection />
        </section>

        {/* Featured Humanitarian Projects (BRED Literacy Project) Section */}
        <section id="projects">
          <ProjectsSection openDonateModal={openDonateModal} />
        </section>

        {/* Our Impact & Human Stories Section */}
        <section id="impact">
          <ImpactSection openDonateModal={openDonateModal} />
        </section>

        {/* Upcoming District Calendar & Learning Seminars Section */}
        <section id="events">
          <EventsSection />
        </section>

        {/* Rotary Clubs Directory across Bayelsa, Delta, Edo, and Rivers States */}
        <section id="clubs">
          <ClubsSection />
        </section>

        {/* Profiles of Rotary Leadership (RI, District Executive, Committee Chairs) */}
        <section id="leadership">
          <LeadershipSection />
        </section>

        {/* Goodwill & Felicitation Messages */}
        <section id="goodwill">
          <GoodwillSection />
        </section>

        {/* Official Photo Archives Gallery */}
        <section id="gallery">
          <GallerySection />
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        openDonateModal={() => openDonateModal()}
        openJoinModal={() => setIsJoinOpen(true)}
      />

      {/* Application Modals */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultCause={donateDefaultCause}
      />

      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
