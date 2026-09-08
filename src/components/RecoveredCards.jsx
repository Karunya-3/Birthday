import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Lock, Unlock, X, Heart, ShieldAlert, Sparkles } from 'lucide-react';
import { openWhenCards } from '../data/cards';
import { playFolderClick, playKeyClick } from '../utils/audio';

export default function RecoveredCards({ onContinue }) {
  const [activeMessage, setActiveMessage] = useState(null);
  const [unlockedIds, setUnlockedIds] = useState([]);

  const handleOpenMessage = (card) => {
    playFolderClick();
    if (!unlockedIds.includes(card.id)) {
      setUnlockedIds(prev => [...prev, card.id]);
    }
    setActiveMessage(card);
  };

  return (
    <section className="min-h-screen bg-[#121316] text-[#EFECE6] p-4 sm:p-8 font-mono relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <div className="border-b border-[#333745] pb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1C23] border border-[#333745] rounded text-xs text-amber-400 font-bold">
              <span>SECTION 06 // ENCRYPTED ARCHIVE LOGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              RECOVERED MESSAGES
            </h2>
            <p className="text-zinc-400 font-sans text-sm italic">
              "Restricted personal text files discovered deep inside the archive."
            </p>
          </div>

          <div className="text-xs text-zinc-500 font-mono">
            UNLOCKED: {unlockedIds.length} / {openWhenCards.length}
          </div>
        </div>

        {/* Message Files Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {openWhenCards.map((card) => {
            const isUnlocked = unlockedIds.includes(card.id);
            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOpenMessage(card)}
                className={`border rounded-lg p-5 transition-all cursor-pointer relative overflow-hidden shadow-lg ${
                  isUnlocked
                    ? 'bg-[#1A1C23] border-amber-500/60 shadow-amber-950/20'
                    : 'bg-[#1A1C23] hover:bg-[#22252F] border-[#333745] text-zinc-300'
                }`}
              >
                {/* File Header Line */}
                <div className="flex items-center justify-between border-b border-[#333745] pb-3 mb-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-amber-400 font-bold">
                    <FileText className="w-4 h-4 text-amber-500" />
                    <span>{card.filename}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isUnlocked ? (
                      <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/50">
                        <Unlock className="w-3 h-3" /> DECRYPTED
                      </span>
                    ) : (
                      <span className="text-amber-500 text-[10px] font-bold flex items-center gap-1 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">
                        <Lock className="w-3 h-3" /> [LOCKED]
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Title Label */}
                <div className="space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                    TARGET CONDITION:
                  </span>
                  <h4 className="font-sans font-bold text-base text-white tracking-wide">
                    {card.label}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans line-clamp-2 pt-1">
                    {card.previewText}
                  </p>
                </div>

                {/* Footer action trigger */}
                <div className="mt-4 pt-3 border-t border-[#333745] flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>{card.timestamp}</span>
                  <span className="text-amber-400 font-bold hover:underline">
                    {isUnlocked ? '[ VIEW LETTER ]' : '[ DECRYPT & READ ]'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section completion trigger */}
        {onContinue && (
          <div className="pt-8 text-center">
            <button
              onClick={() => {
                playKeyClick();
                onContinue();
              }}
              className="bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold text-xs py-3.5 px-8 rounded shadow transition-all cursor-pointer"
            >
              RUN FINAL CORRUPTED FILE (birthday_final.exe) →
            </button>
          </div>
        )}

      </div>

      {/* Full-Screen Handwritten Letter Modal */}
      <AnimatePresence>
        {activeMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="paper-note max-w-2xl w-full rounded-lg shadow-2xl p-6 sm:p-10 relative overflow-hidden font-sans border-2 border-[#E2D9CF] text-[#27272A]"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playKeyClick();
                  setActiveMessage(null);
                }}
                className="absolute top-4 right-4 p-2 bg-[#1A1C23] hover:bg-red-600 text-white rounded-full transition-colors shadow cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Archive stamp header inside note */}
              <div className="flex items-center justify-between border-b border-[#D4C9BD] pb-4 mb-6 font-mono text-xs text-zinc-600">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-600 fill-red-600" />
                  <span className="font-bold tracking-wider">{activeMessage.filename}</span>
                </div>
                <span className="stamp-classified text-[10px] text-red-700 border-red-700">
                  {activeMessage.stampTag}
                </span>
              </div>

              {/* Category Subtitle */}
              <h3 className="font-bold text-lg text-zinc-900 mb-4 font-mono tracking-tight text-amber-800">
                {activeMessage.label}
              </h3>

              {/* Personal Letter Text */}
              <div className="space-y-4 my-6">
                <p className="font-handwriting text-2xl sm:text-3xl text-zinc-800 leading-relaxed tracking-wide">
                  "{activeMessage.message}"
                </p>
              </div>

              {/* Footer signoff */}
              <div className="border-t border-[#D4C9BD] pt-4 flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>ARCHIVE LOG RECORDED // SIBLING NOTE</span>
                <span className="font-handwriting text-xl text-red-600 font-bold">Always in your corner. ❤️</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
