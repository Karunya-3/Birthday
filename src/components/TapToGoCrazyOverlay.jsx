import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Music, Flame } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function TapToGoCrazyOverlay({ isUnlocked, onUnlock }) {
  if (isUnlocked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.6, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A0A0C] text-[#FAF6F0] px-6 select-none"
      >
        {/* Background Ambient Glows */}
        <div className="absolute inset-0 spotlight-glow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#C1121F]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center space-y-8">

          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141417] border border-[#C1121F]/40 text-xs font-mono-tech text-[#E9C46A] uppercase tracking-widest shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E9C46A] animate-spin" />
            <span>EXCLUSIVE SIBLING EXPERIENCE</span>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-serif-editorial text-4xl sm:text-6xl font-extrabold tracking-tight uppercase text-white">
              HAPPY BIRTHDAY <br />
              <span className="text-[#C1121F] italic font-handwriting text-5xl sm:text-7xl">
                {siteConfig.nickname}!
              </span>
            </h1>
            <p className="font-mono-tech text-xs sm:text-sm text-[#8E8D9A] tracking-wider pt-2">

            </p>
          </motion.div>

          {/* TAP TO GO CRAZY Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-4"
          >
            <button
              onClick={onUnlock}
              className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#C1121F] to-[#e63946] text-white font-mono-tech text-base sm:text-lg font-extrabold tracking-widest uppercase rounded-full shadow-[0_0_40px_rgba(193,18,31,0.6)] hover:shadow-[0_0_60px_rgba(193,18,31,0.9)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 cursor-pointer"
            >
              <Music className="w-5 h-5 text-white animate-bounce" />
              <span>TAP TO GO CRAZY</span>
              <Flame className="w-5 h-5 text-[#E9C46A] transition-transform group-hover:scale-125" />
            </button>
          </motion.div>

          {/* Subtle footer hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[11px] font-mono-tech text-[#8E8D9A]/60 pt-4"
          >
            WARNING: Unfiltered sibling nostalgia & non-stop music ahead.
          </motion.p>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
