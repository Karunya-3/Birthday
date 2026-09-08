import React, { useState, useEffect, useRef } from 'react';
import NarrativeBar from './components/NarrativeBar';
import Opening from './components/Opening';
import WeNeedToTalkPivot from './components/WeNeedToTalkPivot';
import FirstOfAll from './components/FirstOfAll';
import ButSection from './components/ButSection';
import UnexpectedFlashback from './components/UnexpectedFlashback';
import SomethingElse from './components/SomethingElse';
import LastThing from './components/LastThing';
import FinaleVisual from './components/FinaleVisual';
import AudioPlayer from './components/AudioPlayer';
import TapToGoCrazyOverlay from './components/TapToGoCrazyOverlay';

export default function App() {
  const [activeSection, setActiveSection] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    if (typeof window !== 'undefined' && typeof window.playBirthdayMusic === 'function') {
      window.playBirthdayMusic();
    }
    setIsUnlocked(true);
  };

  const scrollToSection = (secId) => {
    setActiveSection(secId);
    const el = document.getElementById(`section-${secId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextSection = (nextSecId) => {
    scrollToSection(nextSecId);
  };

  const handleReplay = () => {
    setActiveSection(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = 1; i <= 8; i++) {
        const el = document.getElementById(`section-${i}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-[#FAF6F0] font-sans selection:bg-[#C1121F] selection:text-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Initial Entry Screen Gate */}
      <TapToGoCrazyOverlay isUnlocked={isUnlocked} onUnlock={handleUnlock} />

      {/* Narrative Progress Bar */}
      <NarrativeBar
        activeSection={activeSection}
        totalSections={8}
        onSectionClick={(secId) => scrollToSection(secId)}
      />

      <AudioPlayer />

      {/* Main Conversational Sibling Story */}
      <main className="flex-1 w-full pt-10">
        
        {/* Step 1: Celebration Opening (Previous Minimal Dot/Circle Reveal) */}
        <div id="section-1" className="min-h-screen">
          <Opening onStartComplete={() => handleNextSection(2)} />
        </div>

        {/* Step 2: WE NEED TO TALK Pivot */}
        <div id="section-2" className="min-h-screen">
          <WeNeedToTalkPivot onContinue={() => handleNextSection(3)} />
        </div>

        {/* Step 3: First of all... */}
        <div id="section-3" className="min-h-screen">
          <FirstOfAll onContinue={() => handleNextSection(4)} />
        </div>

        {/* Step 4: But... */}
        <div id="section-4" className="min-h-screen">
          <ButSection onContinue={() => handleNextSection(5)} />
        </div>

        {/* Step 5: Unexpected Rapid Photo Flashback */}
        <div id="section-5" className="min-h-screen">
          <UnexpectedFlashback onContinue={() => handleNextSection(6)} />
        </div>

        {/* Step 6: And there's something else... */}
        <div id="section-6" className="min-h-screen">
          <SomethingElse onContinue={() => handleNextSection(7)} />
        </div>

        {/* Step 7: Okay, last thing. */}
        <div id="section-7" className="min-h-screen">
          <LastThing onContinue={() => handleNextSection(8)} />
        </div>

        {/* Step 8: HAPPY BIRTHDAY AKKAAAAA ❤️ Finale */}
        <div id="section-8" className="min-h-screen">
          <FinaleVisual onReplay={handleReplay} />
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-editorial bg-[#050506] py-6 px-4 text-center font-mono-tech text-xs text-[#8E8D9A]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <span>A DAY THAT BELONGS TO YOU // KEERTANA</span>
          <span>PERSONAL CONVERSATION SIBLING EXPERIENCE</span>
          <span>HAPPY BIRTHDAY ❤️</span>
        </div>
      </footer>

    </div>
  );
}
