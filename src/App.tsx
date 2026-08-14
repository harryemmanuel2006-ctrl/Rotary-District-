import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ImpactCounter } from './components/ImpactCounter';
import { EventCountdown } from './components/EventCountdown';
import { ProjectOfTheMonth } from './components/ProjectOfTheMonth';
import { StoriesOfImpact } from './components/StoriesOfImpact';
import { YouthImpactSection } from './components/YouthImpactSection';
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
import { QuickDonateModal } from './components/QuickDonateModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Heart, Zap } from 'lucide-react';

export function AppContent() {
  const [activeTab, setActiveTabState] = useState('home');
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isQuickDonateOpen, setIsQuickDonateOpen] = useState(false);
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

  const openQuickDonate = (cause?: string) => {
    setDonateDefaultCause(cause);
    setIsQuickDonateOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openJoinModal={() => setIsJoinOpen(true)}
        openDonateModal={() => openQuickDonate()}
      />

      <main>
        {/* Hero Banner Section */}
        <Hero
          setActiveTab={setActiveTab}
          openDonateModal={() => openQuickDonate()}
          openJoinModal={() => setIsJoinOpen(true)}
        />

        {/* 1. Live Impact Counter (Live verified statistics) */}
        <ImpactCounter />

        {/* 2. District Event Live Countdown (Days, Hours, Minutes, Seconds) */}
        <EventCountdown onRegisterClick={() => setActiveTab('events')} />

        {/* 3. Featured Project of the Month (Flagship with visual progress bar) */}
        <section id="featured-project">
          <ProjectOfTheMonth openDonateModal={openQuickDonate} />
        </section>

        {/* Meet the District Governor Section */}
        <section id="governor">
          <GovernorSection />
        </section>

        {/* 4. Children & Youth Initiatives Impact Hub */}
        <section id="youth">
          <YouthImpactSection openDonateModal={openQuickDonate} />
        </section>

        {/* 5. Stories of Impact (Short stories, photographs, locations, quotes, Read More) */}
        <section id="stories">
          <StoriesOfImpact openDonateModal={openQuickDonate} />
        </section>

        {/* Vision, Mission, 4-Way Test & Philosophy Section */}
        <section id="vision">
          <VisionMissionSection />
        </section>

        {/* All Active Humanitarian Projects with Progress Bars */}
        <section id="projects">
          <ProjectsSection openDonateModal={openQuickDonate} />
        </section>

        {/* Our Impact & Areas of Focus Section */}
        <section id="impact">
          <ImpactSection openDonateModal={openQuickDonate} />
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

      {/* Floating Quick Donate Action Button for Mobile/Desktop */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => openQuickDonate()}
          className="group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs sm:text-sm shadow-2xl hover:from-amber-400 hover:to-yellow-400 transform hover:-translate-y-1 transition-all border-2 border-white/60"
          title="Make an Instant Donation to District 9141 Projects"
        >
          <Zap className="w-4 h-4 fill-slate-950 text-slate-950 animate-pulse" />
          <span>Quick Donate</span>
          <span className="bg-slate-950 text-amber-400 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold">
            ₦
          </span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        openDonateModal={() => openQuickDonate()}
        openJoinModal={() => setIsJoinOpen(true)}
      />

      {/* Application Modals */}
      <JoinModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
      />

      {/* Standard Comprehensive Donation Modal */}
      <DonateModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
        defaultCause={donateDefaultCause}
      />

      {/* Quick Fast-Track Donation Modal */}
      <QuickDonateModal
        isOpen={isQuickDonateOpen}
        onClose={() => setIsQuickDonateOpen(false)}
        defaultCause={donateDefaultCause}
      />

      {/* Admin Dashboard CMS */}
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
