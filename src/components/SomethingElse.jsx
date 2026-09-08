import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function SomethingElse({ onContinue }) {
  const [selectedOpt, setSelectedOpt] = useState(null);

  const { header, question, subQuestion, options, nextButton } = siteConfig.somethingElse;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      <div className="max-w-4xl w-full mx-auto space-y-10 relative z-10 my-auto text-center">
        
        <div className="space-y-3">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block"
          >
            CONFESSION 03
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif-editorial text-4xl sm:text-6xl font-black text-[#FAF6F0]"
          >
            "{header}"
          </motion.h2>

          <p className="font-mono-tech text-xs text-[#8E8D9A] uppercase tracking-widest pt-2">
            {question}
          </p>

          <h3 className="font-serif-editorial text-2xl sm:text-4xl font-bold text-[#E9C46A]">
            "{subQuestion}"
          </h3>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
          {options.map((opt) => {
            const isSelected = selectedOpt?.label === opt.label;
            return (
              <button
                key={opt.label}
                onClick={() => setSelectedOpt(opt)}
                className={`p-5 text-left border font-mono-tech text-sm transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C1121F] border-[#C1121F] text-white shadow-xl scale-105'
                    : 'bg-[#141417] border-editorial hover:border-[#C1121F] text-[#FAF6F0] hover:bg-[#1A1A1F]'
                }`}
              >
                <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#E9C46A]'}`}>
                  [{opt.label}]
                </span>
                <span className="font-sans text-base font-semibold leading-snug">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reaction & Next Button */}
        <AnimatePresence>
          {selectedOpt && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-xl mx-auto pt-6 space-y-6"
            >
              <div className="bg-[#141417] border border-[#C1121F] p-5 text-left space-y-2 relative shadow-2xl">
                <span className="font-mono-tech text-[10px] text-[#C1121F] font-bold uppercase tracking-widest block">
                  SIBLING VERDICT
                </span>
                <p className="font-handwriting text-2xl text-[#E9C46A]">
                  "{selectedOpt.verdict}"
                </p>
              </div>

              <div>
                <button
                  onClick={onContinue}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full cursor-pointer shadow-xl"
                >
                  <span>{nextButton}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}
