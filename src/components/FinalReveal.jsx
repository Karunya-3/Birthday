import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/config';
import { playAccessGranted, playKeyClick } from '../utils/audio';

export default function FinalReveal({ onResetArchive }) {
  const [step, setStep] = useState(0); // 0: file closed, 1: but before you go, 2: no investigation, 3: reveal final birthday message

  useEffect(() => {
    // Sequence timing for fourth-wall break messages
    const timer1 = setTimeout(() => setStep(1), 1800);
    const timer2 = setTimeout(() => setStep(2), 3800);
    const timer3 = setTimeout(() => {
      setStep(3);
      playAccessGranted();
      
      // Fire grand finale celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#F59E0B', '#10B981', '#6366F1', '#EC4899']
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#F59E0B', '#DC2626']
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#F59E0B', '#DC2626']
          });
        }, 400);
      } catch (e) {
        // Fallback if confetti fails
      }
    }, 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <section className="min-h-screen bg-[#0E0F12] text-[#EFECE6] p-6 sm:p-12 flex flex-col items-center justify-center font-mono relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121316] via-[#1A1C23] to-[#0E0F12] pointer-events-none" />

      {/* Decorative subtle warm particles/dots */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10 space-y-8">
        
        <AnimatePresence mode="wait">
          {step < 3 ? (
            <motion.div
              key={`intro-step-${step}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 py-12"
            >
              {step === 0 && (
                <div className="space-y-3 font-mono">
                  <span className="text-xs text-zinc-500 tracking-widest">[ SYSTEM NOTIFICATION ]</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-500 tracking-widest">
                    FILE CLOSED.
                  </h2>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-2 font-mono">
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-300">
                    But before you go...
                  </h3>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 font-mono">
                  <h3 className="text-xl sm:text-2xl font-semibold text-zinc-400">
                    There was never really an investigation.
                  </h3>
                  <p className="text-lg text-amber-400 font-sans italic">
                    There was just someone who wanted to remind you how much you mean to them.
                  </p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="final-birthday-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="space-y-8 py-6"
            >
              {/* Top stamp badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-950/40 border border-amber-500/50 rounded-full text-xs text-amber-400 font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>DECRYPTION COMPLETE // PERSONAL ARCHIVE</span>
              </div>

              {/* Main Birthday Heading */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white font-sans uppercase">
                  {siteConfig.finalBirthdayTitle}
                </h1>
                <p className="text-xs font-mono text-zinc-400 tracking-widest">
                  CASE NO. 001 CLOSED WITH LOVE
                </p>
              </div>

              {/* Emotional Sister Letter Box */}
              <div className="bg-[#1A1C23] border border-[#333745] p-6 sm:p-10 rounded-lg shadow-2xl space-y-6 text-left max-w-lg mx-auto relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500" />
                
                <p className="font-handwriting text-2xl sm:text-3xl text-amber-100 leading-relaxed whitespace-pre-line tracking-wide">
                  {siteConfig.finalEmotionalNote}
                </p>

                <div className="border-t border-[#333745] pt-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-red-500 font-bold">
                    <Heart className="w-4 h-4 fill-red-500" /> {siteConfig.signoff}
                  </span>
                  <span>CONFIDENTIAL ARCHIVE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playKeyClick();
                    onResetArchive();
                  }}
                  className="bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold text-xs py-3.5 px-8 rounded shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-zinc-800" />
                  <span>[ {siteConfig.replayButtonText} ]</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
