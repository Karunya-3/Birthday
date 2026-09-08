import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { MessageSquare, ArrowRight } from 'lucide-react';

export default function WeNeedToTalkPivot({ onContinue }) {
  const [step, setStep] = useState(0);
  // 0: WE NEED TO TALK.
  // 1: "Don't worry. Nothing bad happened."
  // 2: "I just realized there are a few things I've never properly told you." + Button

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1200);
    const t2 = setTimeout(() => setStep(2), 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const { mainHeader, line1, line2, buttonText } = siteConfig.weNeedToTalk;

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-[#FAF6F0] flex flex-col items-center justify-center px-6 overflow-hidden bg-noise border-b border-editorial select-none">
      
      <div className="max-w-3xl w-full text-center space-y-10 my-auto relative z-10">
        
        {/* WE NEED TO TALK. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <span className="font-mono-tech text-xs tracking-widest text-[#C1121F] uppercase font-bold block">
            PERSONAL CONVERSATION // PIVOT
          </span>
          <h1 className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-black text-[#FAF6F0] tracking-tight uppercase">
            {mainHeader}
          </h1>
        </motion.div>

        {/* Line 1: Don't worry. Nothing bad happened. */}
        {step >= 1 && (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-handwriting text-2xl sm:text-4xl text-[#E9C46A] italic"
          >
            "{line1}"
          </motion.p>
        )}

        {/* Line 2: I just realized there are a few things I've never properly told you. */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 pt-4"
          >
            <p className="font-mono-tech text-base sm:text-xl text-[#FAF6F0]/90 font-light max-w-xl mx-auto leading-relaxed">
              "{line2}"
            </p>

            <div>
              <button
                onClick={onContinue}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#C1121F] text-white font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0C] transition-all duration-300 rounded-full shadow-2xl shadow-[#C1121F]/30 cursor-pointer"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

      </div>

    </section>
  );
}
