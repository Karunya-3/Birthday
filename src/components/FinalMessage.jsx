import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Heart, ArrowRight } from 'lucide-react';

export default function FinalMessage({ onContinue }) {
  const [step, setStep] = useState(0);
  // 0: ONE LAST THING.
  // 1: Out of all the people in the world...
  // 2: I'm really glad I got you as my sister.
  // 3: HAPPY BIRTHDAY, AKKKKAAAAAA + Wishes + Personal Message

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2600);
    const t3 = setTimeout(() => setStep(3), 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const { openingLine, line1, line2, bigTitle, wishes, personalMessage } = siteConfig.finalMessage;

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden select-none bg-noise border-b border-editorial">
      
      {/* Extremely Minimal Layout (No cards, no gradients) */}
      <div className="max-w-3xl w-full text-center space-y-10 my-auto relative z-10">
        
        {/* Step 0: ONE LAST THING. */}
        {step >= 0 && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block"
          >
            {openingLine}
          </motion.span>
        )}

        {/* Step 1: Out of all the people in the world... */}
        {step >= 1 && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-serif-editorial text-2xl sm:text-4xl text-[#8E8D9A] font-light italic"
          >
            "{line1}"
          </motion.h3>
        )}

        {/* Step 2: Pause -> I'm really glad I got you as my sister. */}
        {step >= 2 && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-serif-editorial text-3xl sm:text-5xl font-bold text-[#FAF6F0]"
          >
            "{line2}"
          </motion.h2>
        )}

        {/* Step 3: Big Reveal - HAPPY BIRTHDAY, AKKKKAAAAAA */}
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 pt-6 border-t border-editorial max-w-2xl mx-auto"
          >
            <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#C1121F] tracking-tight uppercase">
              {bigTitle}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#FAF6F0]/90 leading-relaxed font-light">
              "{wishes}"
            </p>

            {/* Personalized Sibling Note [PERSONAL_FINAL_MESSAGE] */}
            {personalMessage && (
              <div className="pt-4 text-left font-handwriting text-2xl sm:text-3xl text-[#E9C46A] leading-relaxed whitespace-pre-line border-l-2 border-[#C1121F] pl-6">
                {personalMessage}
              </div>
            )}

            <div className="pt-6">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full shadow-2xl"
              >
                <span>SEE FINAL VISUAL MOMENT →</span>
                <Heart className="w-4 h-4 text-[#C1121F] fill-current" />
              </button>
            </div>

          </motion.div>
        )}

      </div>

    </section>
  );
}
