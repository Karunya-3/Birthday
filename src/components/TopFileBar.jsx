import React, { useState } from 'react';
import { Shield, Volume2, VolumeX, Folder, Lock, AlertCircle } from 'lucide-react';
import { toggleAudio, getAudioState, playFolderClick } from '../utils/audio';

export default function TopFileBar({ activePhase, onSelectPhase, unlockedPhases }) {
  const [isMuted, setIsMuted] = useState(!getAudioState());

  const handleAudioToggle = () => {
    const newState = toggleAudio();
    setIsMuted(!newState);
  };

  const tabs = [
    { id: 'dossier', label: 'DOSSIER', code: 'FILE_01' },
    { id: 'evidence', label: 'EVIDENCE', code: 'EXHIBITS' },
    { id: 'interrogation', label: 'INTERROGATION', code: 'LOGS' },
    { id: 'roast', label: 'CASE NO. 001', code: 'CHARGES' },
    { id: 'cards', label: 'RECOVERED_MSGS', code: 'TEXT_FILES' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#121316]/95 backdrop-blur-md border-b border-[#333745] px-4 py-2 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left: Case classification badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1A1C23] border border-[#333745] px-2.5 py-1 rounded text-[#DC2626]">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-bold tracking-widest">STATUS: CLASSIFIED</span>
          </div>
          <span className="hidden sm:inline text-zinc-500">|</span>
          <span className="hidden sm:inline text-zinc-400">ID: CASE_FILE_01 // ARCHIVE_KEERU</span>
        </div>

        {/* Center: Interactive folder tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {tabs.map((tab) => {
            const isUnlocked = unlockedPhases[tab.id];
            const isActive = activePhase === tab.id;
            
            return (
              <button
                key={tab.id}
                disabled={!isUnlocked}
                onClick={() => {
                  if (isUnlocked) {
                    playFolderClick();
                    onSelectPhase(tab.id);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t text-xs font-mono transition-all border-t border-x ${
                  isActive
                    ? 'bg-[#1A1C23] border-[#333745] text-amber-400 font-semibold border-b-2 border-b-amber-500 shadow-sm'
                    : isUnlocked
                    ? 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-[#1A1C23]/60'
                    : 'opacity-40 cursor-not-allowed border-transparent text-zinc-600'
                }`}
              >
                {isUnlocked ? (
                  <Folder className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                ) : (
                  <Lock className="w-3 h-3 text-zinc-600" />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Audio control toggle & status indicator */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioToggle}
            className="flex items-center gap-1.5 bg-[#1A1C23] hover:bg-[#22252F] border border-[#333745] px-2.5 py-1 rounded text-zinc-300 transition-colors"
            title={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />}
            <span className="hidden md:inline text-[11px]">{isMuted ? 'AUDIO: OFF' : 'AUDIO: ON'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
