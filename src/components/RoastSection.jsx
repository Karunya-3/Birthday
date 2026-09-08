import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { ShieldAlert, Flame, ArrowRight } from 'lucide-react';

export default function RoastSection({ onContinue }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [showFullRoasts, setShowFullRoasts] = useState(false);

  const { header, subtitle, dramaticLines, additionalRoasts, breakSeriousnessText, continueButtonText } = siteConfig.roast;

  const handleNextLine = () => {
    if (lineIdx + 1 < dramaticLines.length) {
      setLineIdx((prev) => prev + 1);
    } else {
      setShowFullRoasts(true);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#070708] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#C1121F] uppercase flex items-center gap-2 font-bold">
        <Flame className="w-4 h-4 text-[#C1121F] animate-pulse" />
        <span>06 // WE NEED TO TALK</span>
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 relative z-10 my-auto">
        
        {/* Stark Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <span className="font-mono-tech text-xs tracking-widest text-[#8E8D9A] uppercase">
            WARNING // UNFILTERED TRUTH AHEAD
          </span>

          <h1 className="font-serif-editorial text-5xl sm:text-7xl md:text-8xl font-black text-[#FAF6F0] uppercase tracking-tight">
            {header}
          </h1>

          <p className="font-mono-tech text-sm sm:text-base text-[#8E8D9A] max-w-lg mx-auto font-light">
            "{subtitle}"
          </p>
        </motion.div>

        {/* Dramatic Line-By-Line Stagger Reveal */}
        <div className="min-h-[220px] flex flex-col items-center justify-center space-y-4">
          {dramaticLines.slice(0, lineIdx + 1).map((line, idx) => (
            <motion.h2
              key={idx}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
              className={`font-serif-editorial font-bold tracking-wide ${
                idx === 3
                  ? 'text-4xl sm:text-6xl text-[#C1121F] font-black uppercase'
                  : 'text-2xl sm:text-4xl text-[#FAF6F0]/90'
              }`}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        {/* Line Progression Trigger */}
        {!showFullRoasts ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="pt-4"
          >
            <button
              onClick={handleNextLine}
              className="px-8 py-3.5 bg-[#141417] text-[#FAF6F0] border border-editorial hover:border-[#C1121F] font-mono-tech text-xs tracking-widest uppercase transition-all rounded-full cursor-pointer hover:bg-[#1A1A1F]"
            >
              {lineIdx + 1 < dramaticLines.length ? "[ PRESS TO REVEAL NEXT LINE ]" : "[ VIEW FULL CHARGES ]"}
            </button>
          </motion.div>
        ) : (
          /* Additional Roasts & Break Seriousness Button */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10 pt-4"
          >
            {/* Additional Charge Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              {additionalRoasts.map((r, i) => (
                <div key={i} className="bg-[#141417] border border-editorial p-4 space-y-2">
                  <span className="font-mono-tech text-[10px] text-[#C1121F] uppercase font-bold">
                    CHARGE 0{i + 1}
                  </span>
                  <h4 className="font-sans text-sm font-bold text-white">{r.title}</h4>
                  <p className="font-mono-tech text-xs text-[#8E8D9A] leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Break Seriousness Statement */}
            <div className="space-y-4 pt-6">
              <p className="font-handwriting text-3xl sm:text-4xl text-[#E9C46A] italic">
                "{breakSeriousnessText}"
              </p>

              <div>
                <button
                  onClick={onContinue}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#C1121F] text-white font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0C] transition-all rounded-full shadow-2xl shadow-[#C1121F]/30"
                >
                  <span>{continueButtonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>

    </section>
  );
}
