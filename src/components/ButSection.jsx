import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Heart, ArrowRight, Maximize2, X } from 'lucide-react';

export default function ButSection({ onContinue }) {
  const [selectedMemory, setSelectedMemory] = useState(null);

  const { header, quote, subtext, memories, nextButton } = siteConfig.butSection;

  return (
    <section className="relative w-full min-h-screen bg-[#070708] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      <div className="max-w-5xl w-full mx-auto space-y-12 relative z-10 my-auto">
        
        {/* Header & Heartfelt Quote */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block"
          >
            CONFESSION 02
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif-editorial text-5xl sm:text-7xl font-black text-[#FAF6F0]"
          >
            "{header}"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif-editorial text-2xl sm:text-4xl text-[#E9C46A] font-bold italic"
          >
            "{quote}"
          </motion.p>

          <p className="font-mono-tech text-xs text-[#8E8D9A]">
            {subtext}
          </p>
        </div>

        {/* Memory Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto pt-4">
          {memories.map((mem, idx) => (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              onClick={() => setSelectedMemory(mem)}
              className="bg-[#141417] border border-editorial hover:border-[#E9C46A] p-4 cursor-pointer group transition-all hover:shadow-2xl space-y-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-editorial bg-black">
                <img
                  src={mem.url}
                  alt={mem.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-mono-tech text-xs text-white bg-black/80 px-4 py-2 rounded-full border border-editorial flex items-center gap-2">
                    <Maximize2 className="w-3.5 h-3.5" /> READ MEMORY STORY
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="font-handwriting text-2xl text-[#E9C46A]">
                  "{mem.caption}"
                </p>
                <p className="font-mono-tech text-xs text-[#8E8D9A]">
                  {mem.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center pt-8">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#C1121F] text-white font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0C] transition-all rounded-full cursor-pointer shadow-2xl shadow-[#C1121F]/30"
          >
            <span>{nextButton}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Memory Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#141417] border border-[#E9C46A] p-6 max-w-xl w-full relative space-y-4 shadow-2xl"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 text-[#8E8D9A] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-mono-tech text-xs text-[#E9C46A] uppercase font-bold block">
                CORE MEMORY // UNFILTERED STORY
              </span>
              <h3 className="font-serif-editorial text-3xl font-bold text-white">
                {selectedMemory.title}
              </h3>

              <div className="aspect-[4/3] overflow-hidden border border-editorial bg-black">
                <img
                  src={selectedMemory.url}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="font-handwriting text-2xl text-[#E9C46A]">
                "{selectedMemory.caption}"
              </p>
              <p className="font-sans text-sm text-[#FAF6F0]/90 leading-relaxed pt-2">
                {selectedMemory.story}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
