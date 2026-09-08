import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';

export default function UnexpectedFlashback({ onContinue }) {
  const [phase, setPhase] = useState('idle'); 
  // 'idle' -> prompt & WAIT WHAT button
  // 'flashing' -> rapid photo memory flashing sequence
  // 'stopped' -> sudden silence with single spotlight photo

  const [flashIndex, setFlashIndex] = useState(0);

  const memories = siteConfig.unexpected.rapidMemories;

  const triggerFlashback = () => {
    setPhase('flashing');
    let idx = 0;
    
    // Increased duration per photo to 2000ms (2 seconds) so each memory can be appreciated!
    const interval = setInterval(() => {
      idx++;
      if (idx < memories.length) {
        setFlashIndex(idx);
      } else {
        clearInterval(interval);
        // Sudden stop into spotlight photo after completion!
        setTimeout(() => {
          setPhase('stopped');
        }, 1000);
      }
    }, 2200);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#070708] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase flex items-center gap-2">
        <HelpCircle className="w-4 h-4 text-[#E9C46A]" />
        <span>08 // UNEXPECTED SURPRISE</span>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          /* Initial Prompt */
          <motion.div
            key="idle-prompt"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8 max-w-xl mx-auto my-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif-editorial text-4xl sm:text-6xl font-extrabold text-[#FAF6F0]"
            >
              "{siteConfig.unexpected.triggerText}"
            </motion.h2>

            <p className="font-mono-tech text-xs text-[#8E8D9A] max-w-md mx-auto">
              Before we reach the end, there is one last unscripted system event queued up.
            </p>

            <div>
              <button
                onClick={triggerFlashback}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#C1121F] text-white font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0C] transition-all rounded-full shadow-2xl shadow-[#C1121F]/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{siteConfig.unexpected.buttonText}</span>
                <HelpCircle className="w-4 h-4 transition-transform group-hover:rotate-45" />
              </button>
            </div>
          </motion.div>
        )}

        {phase === 'flashing' && (
          /* Memory Flash Reel */
          <motion.div
            key="flashing-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 space-y-6"
          >
            {/* Top Memory Counter Progress */}
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#E9C46A] tracking-widest uppercase">
              <span>MEMORY {flashIndex + 1} OF {memories.length}</span>
            </div>

            <motion.div
              key={flashIndex}
              initial={{ opacity: 0, scale: 1.08, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full text-center space-y-6"
            >
              <div className="relative aspect-[4/3] border-2 border-[#C1121F] shadow-2xl overflow-hidden bg-black max-w-xl mx-auto">
                <img
                  src={memories[flashIndex].image}
                  alt="Flash memory"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#E9C46A] tracking-wide uppercase">
                "{memories[flashIndex].text}"
              </h3>
            </motion.div>
          </motion.div>
        )}

        {phase === 'stopped' && (
          /* Sudden Silence with Single Spotlight Photo */
          <motion.div
            key="stopped-spotlight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center space-y-8 max-w-xl mx-auto my-auto relative z-10"
          >
            {/* Spotlight Glow */}
            <div className="absolute -inset-20 spotlight-glow pointer-events-none" />

            <div className="space-y-2">
              <span className="font-mono-tech text-[10px] text-[#C1121F] tracking-widest uppercase font-bold">
                SYSTEM PAUSE // UNFILTERED MEMORY
              </span>
              <h2 className="font-serif-editorial text-3xl sm:text-4xl font-bold text-white">
                "{siteConfig.unexpected.silenceCaption}"
              </h2>
            </div>

            {/* Single Centered Photo */}
            <div className="relative aspect-[4/3] border border-editorial shadow-2xl overflow-hidden bg-black max-w-lg mx-auto">
              <img
                src={siteConfig.unexpected.silencePhoto}
                alt="Silence photo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Continue to Final Message Button */}
            <div className="pt-4">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full"
              >
                <span>PROCEED TO FINAL MESSAGE →</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
