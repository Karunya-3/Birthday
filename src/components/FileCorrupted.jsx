import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, AlertTriangle, RefreshCw, Cpu, Sparkles } from 'lucide-react';
import { playGlitchSound, playKeyClick, playAccessGranted } from '../utils/audio';

export default function FileCorrupted({ onTriggerFinalReveal }) {
  const [phase, setPhase] = useState('prompt'); // 'prompt' | 'initializing' | 'error' | 'recovering'
  const [progress, setProgress] = useState(0);

  const handleRunFile = () => {
    playKeyClick();
    setPhase('initializing');
    setProgress(0);

    let val = 0;
    const interval = setInterval(() => {
      val += 10;
      playKeyClick();
      if (val >= 100) {
        val = 100;
        clearInterval(interval);
        playGlitchSound();
        setPhase('error');
        
        // After 2.5s pause, attempt recovery transition
        setTimeout(() => {
          setPhase('recovering');
          playAccessGranted();
          
          setTimeout(() => {
            onTriggerFinalReveal();
          }, 2200);
        }, 2500);
      }
      setProgress(val);
    }, 150);
  };

  return (
    <section className="min-h-[85vh] bg-[#121316] text-[#EFECE6] p-4 sm:p-8 font-mono flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-2xl w-full z-10">
        <AnimatePresence mode="wait">
          
          {/* Prompt State */}
          {phase === 'prompt' && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#1A1C23] border border-[#333745] p-6 sm:p-10 rounded-lg shadow-2xl space-y-6 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950/40 border border-amber-800/50 rounded text-xs text-amber-400 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>SYSTEM MESSAGE // FINAL FILE DETECTED</span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                  There appears to be one final file remaining in the system.
                </h3>
                <div className="font-mono text-sm bg-[#121316] border border-[#333745] p-4 rounded text-emerald-400 font-bold tracking-wider inline-block">
                  birthday_final.exe
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleRunFile}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-extrabold text-sm py-3.5 px-8 rounded shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4" />
                  <span>[ RUN birthday_final.exe ]</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Initializing State */}
          {phase === 'initializing' && (
            <motion.div
              key="initializing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#1A1C23] border border-[#333745] p-8 rounded-lg shadow-2xl space-y-6 text-left"
            >
              <div className="flex justify-between items-center text-xs text-amber-400 font-bold">
                <span>INITIALIZING birthday_final.exe...</span>
                <span>{progress}%</span>
              </div>

              <div className="font-mono text-sm tracking-tighter text-emerald-400 bg-[#121316] p-4 rounded border border-[#333745]">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(progress / 5) ? "text-emerald-400" : "text-zinc-800"}>
                    █
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1, 1.02, 0.98, 1], opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-red-950/60 border-2 border-red-600 p-8 rounded-lg shadow-2xl space-y-4 text-center font-mono animate-glitch"
            >
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
              
              <h3 className="text-2xl font-black text-red-500 tracking-widest uppercase">
                SYSTEM ERROR
              </h3>

              <div className="bg-black/60 border border-red-800/80 p-4 rounded text-red-300 font-bold text-base sm:text-lg">
                "This file contains too many memories."
              </div>
            </motion.div>
          )}

          {/* Recovering State */}
          {phase === 'recovering' && (
            <motion.div
              key="recovering"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#1A1C23] border-2 border-amber-500 p-8 rounded-lg shadow-2xl text-center space-y-4"
            >
              <RefreshCw className="w-10 h-10 text-amber-400 mx-auto animate-spin" />
              <h3 className="text-xl font-bold text-amber-400 tracking-widest font-mono">
                Attempting recovery...
              </h3>
              <p className="text-xs text-zinc-400 font-sans">
                Deconstructing archive interface. Transforming digital file into core memory...
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
