import React from 'react';
import { Music } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function NarrativeBar({ activeSection, totalSections, onSectionClick }) {
  const sections = [
    { id: 1, label: "01 // BIRTHDAY" },
    { id: 2, label: "02 // TALK" },
    { id: 3, label: "03 // FIRST OF ALL" },
    { id: 4, label: "04 // BUT..." },
    { id: 5, label: "05 // FLASHBACK" },
    { id: 6, label: "06 // QUESTION" },
    { id: 7, label: "07 // LAST THING" },
    { id: 8, label: "08 // FINALE" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0A0A0C]/80 backdrop-blur-md border-b border-editorial px-4 md:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand / Header */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#C1121F] animate-pulse" />
          <span className="font-mono-tech text-xs tracking-widest text-[#FAF6F0]/80 uppercase">
            A DAY THAT BELONGS TO YOU • <span className="text-[#C1121F] font-bold">{siteConfig.nickname}</span>
          </span>
        </div>

        {/* Section Dots / Progress Indicator */}
        <div className="hidden lg:flex items-center gap-1.5">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            const isPassed = activeSection > sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSectionClick(sec.id)}
                title={sec.label}
                className={`group relative flex items-center h-6 px-2 text-[10px] font-mono-tech transition-all duration-200 rounded ${
                  isActive
                    ? 'bg-[#C1121F] text-white font-bold'
                    : isPassed
                    ? 'text-[#FAF6F0]/60 hover:text-white'
                    : 'text-[#FAF6F0]/30 hover:text-white/70'
                }`}
              >
                {sec.id.toString().padStart(2, '0')}
              </button>
            );
          })}
        </div>

        {/* Playing Status Badge (Non-interactive) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C1121F] bg-[#141417] px-3 py-1.5 rounded-full border border-[#C1121F]/30">
            <Music className="w-3.5 h-3.5 text-[#C1121F] animate-bounce" />
            <span className="hidden sm:inline text-[11px] font-medium tracking-wider text-[#C1121F]">MUSIC PLAYING</span>
          </div>
        </div>

      </div>
    </header>
  );
}
