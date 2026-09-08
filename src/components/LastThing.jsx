import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Heart, ArrowRight } from 'lucide-react';

export default function LastThing({ onContinue }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { header, quote, confession, personalNote, nextButton } = siteConfig.lastThing;

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      <div className="max-w-3xl w-full text-center space-y-10 my-auto relative z-10">
        
        {/* Header: Okay, last thing. */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block"
        >
          {header}
        </motion.span>

        {/* Quote: Out of all the people in the world... */}
        {step >= 1 && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="font-serif-editorial text-2xl sm:text-4xl text-[#8E8D9A] font-light italic"
          >
            "{quote}"
          </motion.h3>
        )}

        {/* Confession: I'm really glad I got you as my sister. */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-8 pt-4"
          >
            <h2 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#C1121F]">
              "{confession}"
            </h2>

            {/* Personal Note */}
            <div className="font-handwriting text-2xl sm:text-3xl text-[#E9C46A] leading-relaxed whitespace-pre-line text-left border-l-2 border-[#C1121F] pl-6 max-w-2xl mx-auto pt-4">
              {personalNote}
            </div>

            <div className="pt-8">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full cursor-pointer shadow-2xl"
              >
                <span>{nextButton}</span>
                <Heart className="w-4 h-4 text-[#C1121F] fill-current" />
              </button>
            </div>
          </motion.div>
        )}

      </div>

    </section>
  );
}
