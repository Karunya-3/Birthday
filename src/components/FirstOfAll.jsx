import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Flame, ArrowRight, X } from 'lucide-react';

export default function FirstOfAll({ onContinue }) {
  const [selectedHabit, setSelectedHabit] = useState(null);

  const { header, quote, subtext, annoyingHabits, nextButton } = siteConfig.firstOfAll;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      <div className="max-w-6xl w-full mx-auto space-y-12 relative z-10 my-auto">
        
        {/* Header & Conversational Quote */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono-tech text-xs tracking-widest text-[#C1121F] uppercase font-bold block"
          >
            CONFESSION 01
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

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-handwriting text-3xl sm:text-5xl text-[#C1121F] italic"
          >
            "{quote}"
          </motion.p>

          <p className="font-mono-tech text-xs text-[#8E8D9A]">
            {subtext}
          </p>
        </div>

        {/* Interactive Annoying Habit Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {annoyingHabits.map((habit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
              onClick={() => setSelectedHabit(habit)}
              className="bg-[#141417] border border-editorial hover:border-[#C1121F] p-5 space-y-4 cursor-pointer group transition-all hover:shadow-2xl hover:shadow-[#C1121F]/10 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-tech text-[10px] text-[#E9C46A] font-bold uppercase tracking-widest">
                    EXHIBIT 0{idx + 1}
                  </span>
                  <Flame className="w-4 h-4 text-[#8E8D9A] group-hover:text-[#C1121F] transition-colors" />
                </div>
                <h3 className="font-sans text-lg font-bold text-white group-hover:text-[#C1121F] transition-colors">
                  {habit.title}
                </h3>
                <p className="font-mono-tech text-xs text-[#8E8D9A] leading-relaxed">
                  "{habit.detail}"
                </p>
              </div>

              <div className="aspect-video overflow-hidden border border-editorial relative">
                <img
                  src={habit.photo}
                  alt={habit.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono-tech text-[10px] text-white bg-black/80 px-3 py-1 rounded-full border border-editorial">
                    VIEW EVIDENCE
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center pt-8">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full cursor-pointer shadow-xl"
          >
            <span>{nextButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Habit Photo Detail Modal */}
      <AnimatePresence>
        {selectedHabit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedHabit(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141417] border border-[#C1121F] p-6 max-w-lg w-full relative space-y-4 shadow-2xl"
            >
              <button
                onClick={() => setSelectedHabit(null)}
                className="absolute top-4 right-4 text-[#8E8D9A] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-mono-tech text-xs text-[#C1121F] uppercase font-bold block">
                SIBLING EVIDENCE // PHOTO REVEAL
              </span>
              <h3 className="font-serif-editorial text-2xl font-bold text-white">
                {selectedHabit.title}
              </h3>

              <div className="aspect-[4/3] overflow-hidden border border-editorial bg-black">
                <img
                  src={selectedHabit.photo}
                  alt={selectedHabit.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-handwriting text-2xl text-[#E9C46A]">
                "{selectedHabit.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
