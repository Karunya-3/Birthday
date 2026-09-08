import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Sparkles, Info, X } from 'lucide-react';

export default function ThisIsYou({ onContinue }) {
  const [activeTrait, setActiveTrait] = useState(null);

  const { largeName, heroImage, traits } = siteConfig.thisIsYou;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#8E8D9A] uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
        <span>03 // THIS IS YOU</span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
        
        {/* Left Column: Oversized Editorial Typography & Trait Tags */}
        <div className="lg:col-span-7 space-y-8 order-2 lg:order-1 relative z-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold">
              SUBJECT DOSSIER // NO. 01
            </span>
            
            {/* Massive Overlapping Editorial Name */}
            <h1 className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-[#FAF6F0] leading-none uppercase select-none">
              {largeName}
            </h1>
          </motion.div>

          <p className="font-mono-tech text-sm text-[#8E8D9A] max-w-md">
            Hover or tap any description below to reveal the official sibling verdict.
          </p>

          {/* Interactive Trait Pills / Tags floating around composition */}
          <div className="flex flex-wrap gap-3 pt-2">
            {traits.map((trait, idx) => {
              const isSelected = activeTrait?.id === trait.id;
              return (
                <motion.button
                  key={trait.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveTrait(isSelected ? null : trait)}
                  className={`group relative px-4 py-2.5 rounded-none border text-xs sm:text-sm font-mono-tech transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#C1121F] text-white border-[#C1121F] shadow-lg shadow-[#C1121F]/20 scale-105'
                      : 'bg-[#141417] text-[#FAF6F0]/90 border-editorial hover:border-[#C1121F] hover:text-white'
                  }`}
                >
                  <span className="text-[#E9C46A] group-hover:text-white transition-colors">⚡</span>
                  <span className="font-medium tracking-wide">{trait.label}</span>
                  <Info className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              );
            })}
          </div>

          {/* Trait Popover Explanation Banner */}
          <AnimatePresence mode="wait">
            {activeTrait && (
              <motion.div
                key={activeTrait.id}
                initial={{ opacity: 0, y: 10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-[#141417] border border-[#C1121F] p-5 relative rounded-none shadow-2xl space-y-2">
                  <button
                    onClick={() => setActiveTrait(null)}
                    className="absolute top-3 right-3 text-[#8E8D9A] hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#C1121F] uppercase font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>EXPLANATION // {activeTrait.label}</span>
                  </div>
                  <p className="font-sans text-sm text-[#FAF6F0] leading-relaxed pt-1">
                    "{activeTrait.detail}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-6">
            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#FAF6F0]/80 hover:text-[#C1121F] transition-colors border-b border-editorial hover:border-[#C1121F] pb-1 uppercase tracking-widest"
            >
              <span>CONTINUE TO PHOTO EVIDENCE →</span>
            </button>
          </div>

        </div>

        {/* Right Column: Unexpected Editorial Photo Composition */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative w-full aspect-[3/4] max-w-md mx-auto"
          >
            {/* Decorative background sharp border frames (No rounded cards!) */}
            <div className="absolute -inset-4 border border-editorial z-0 pointer-events-none" />
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#C1121F] z-20 pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#C1121F] z-20 pointer-events-none" />

            {/* High fashion photograph composition */}
            <div className="relative w-full h-full overflow-hidden shadow-2xl z-10">
              <img
                src={heroImage}
                alt={largeName}
                className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
              
              {/* Overlapping Typography on top of image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none">
                <span className="font-mono-tech text-[11px] tracking-widest text-[#E9C46A] uppercase">
                  UNFILTERED / UNEDITED
                </span>
                <span className="font-serif-editorial text-2xl font-bold text-white tracking-wide">
                  {largeName} • 2026
                </span>
              </div>
            </div>

            {/* Editorial Caption Tag */}
            <div className="absolute -bottom-6 -left-4 bg-[#141417] border border-editorial px-4 py-2 text-[11px] font-mono-tech text-[#8E8D9A] shadow-xl z-30 hidden sm:block">
              FIG 01.0 — THE MAIN CHARACTER
            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}
