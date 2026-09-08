import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Opening({ onStartComplete }) {
  const [step, setStep] = useState(0); 
  // step 0: HAPPY
  // step 1: BIRTHDAY
  // step 2: Keeru
  // step 3: "Today is technically your day."
  // step 4: "So I made you something." -> START button
  // step 5: Clicked START -> Dot expands into circle -> photo -> zoom out transition!

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 700);
    const timer2 = setTimeout(() => setStep(2), 1500);
    const timer3 = setTimeout(() => setStep(3), 2400);
    const timer4 = setTimeout(() => setStep(4), 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleStartClick = () => {
    setStep(5);
    // After dot & circle expansion animation finishes, trigger main story transition
    setTimeout(() => {
      onStartComplete();
    }, 2400);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col items-center justify-center overflow-hidden px-6 select-none bg-noise">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 spotlight-glow pointer-events-none" />

      {/* Main Text Content (Visible before step 5) */}
      <AnimatePresence>
        {step < 5 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.8 } }}
            className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center justify-center space-y-8"
          >
            {/* Cinematic Big Editorial Typography */}
            <div className="space-y-1 md:space-y-3 font-serif-editorial tracking-tight text-left sm:text-center">
              
              {/* Word 1: HAPPY */}
              {step >= 0 && (
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase tracking-widest text-[#FAF6F0]"
                >
                  {siteConfig.opening.titleWords[0] || "HAPPY"}
                </motion.h1>
              )}

              {/* Word 2: BIRTHDAY */}
              {step >= 1 && (
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="text-6xl sm:text-8xl md:text-9xl font-extrabold uppercase tracking-widest text-[#C1121F]"
                >
                  {siteConfig.opening.titleWords[1] || "BIRTHDAY"}
                </motion.h1>
              )}

              {/* Word 3: Keeru / Target Name */}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="pt-2 font-handwriting text-5xl sm:text-7xl md:text-8xl text-[#E9C46A] italic transform -rotate-2"
                >
                  {siteConfig.opening.targetName || siteConfig.nickname}
                </motion.div>
              )}
            </div>

            {/* Subtext Lines */}
            <div className="min-h-[70px] flex flex-col items-center justify-center space-y-2 pt-6">
              {step >= 3 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-mono-tech text-base sm:text-xl text-[#8E8D9A] tracking-wider font-light"
                >
                  "{siteConfig.opening.subtextLine1}"
                </motion.p>
              )}

              {step >= 4 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="font-sans text-sm sm:text-base text-[#FAF6F0]/90 tracking-wide font-medium"
                >
                  "{siteConfig.opening.subtextLine2}"
                </motion.p>
              )}
            </div>

            {/* START Button */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="pt-6"
              >
                <button
                  onClick={handleStartClick}
                  className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#C1121F] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-[#C1121F]/30 hover:scale-105 active:scale-95"
                >
                  <span>{siteConfig.opening.startButtonText || "START"}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 5: Expanding Circle Photo Transition */}
      <AnimatePresence>
        {step === 5 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0A0A0C]">
            
            {/* 1. Tiny Dot that expands into a circle */}
            <motion.div
              initial={{ width: 6, height: 6, borderRadius: "50%", opacity: 1 }}
              animate={{
                width: ["6px", "140px", "320px", "90vw"],
                height: ["6px", "140px", "320px", "90vh"],
                borderRadius: ["50%", "50%", "50%", "24px"],
                opacity: 1
              }}
              transition={{ duration: 2.2, ease: [0.65, 0, 0.35, 1] }}
              className="relative overflow-hidden border-2 border-[#C1121F] shadow-2xl bg-black"
            >
              {/* Photo inside the expanding circle */}
              <motion.img
                src={siteConfig.opening.introHeroPhoto}
                alt="Keeru"
                initial={{ scale: 1.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="w-full h-full object-cover"
              />

              {/* Text overlay inside expanding photo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col items-center justify-end p-8 text-center"
              >
                <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase mb-1">
                  CORE MEMORY LOADED
                </span>
                <h2 className="font-serif-editorial text-3xl md:text-5xl font-bold text-white">
                  A Day That Belongs To You.
                </h2>
              </motion.div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
