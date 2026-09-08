import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { ArrowRight, Heart } from 'lucide-react';

export default function ConversationOpening({ onStart }) {
  const [isExpanding, setIsExpanding] = useState(false);

  const handleStart = () => {
    setIsExpanding(true);
    setTimeout(() => {
      onStart();
    }, 2200);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col items-center justify-center px-6 overflow-hidden bg-noise select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 spotlight-glow pointer-events-none" />

      <AnimatePresence>
        {!isExpanding ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.6 } }}
            className="max-w-4xl w-full text-center space-y-8 relative z-10"
          >
            {/* Big Editorial Birthday Wish */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block"
              >
                SPECIAL EDITION // FOR MY SISTER
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-black text-[#C1121F] tracking-tight uppercase leading-none"
              >
                {siteConfig.opening.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-handwriting text-3xl sm:text-5xl text-[#FAF6F0]/90 italic"
              >
                "{siteConfig.opening.subtitle}"
              </motion.p>
            </div>

            {/* Let's Go Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6"
            >
              <button
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all duration-300 rounded-full shadow-2xl hover:shadow-[#C1121F]/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{siteConfig.opening.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

          </motion.div>
        ) : (
          /* Dot expands into circle photo transition */
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0A0A0C]">
            <motion.div
              initial={{ width: 6, height: 6, borderRadius: "50%" }}
              animate={{
                width: ["6px", "160px", "360px", "95vw"],
                height: ["6px", "160px", "360px", "95vh"],
                borderRadius: ["50%", "50%", "50%", "16px"]
              }}
              transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
              className="relative overflow-hidden border-2 border-[#C1121F] shadow-2xl bg-black"
            >
              <img
                src={siteConfig.opening.heroPhoto}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col items-center justify-end p-8 text-center">
                <span className="font-mono-tech text-xs text-[#E9C46A] tracking-widest uppercase mb-1">
                  CONVERSATION LOADING...
                </span>
                <h2 className="font-serif-editorial text-3xl sm:text-5xl font-bold text-white">
                  A Day That Belongs To You.
                </h2>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
