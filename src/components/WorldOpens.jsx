import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { ChevronDown, Compass } from 'lucide-react';

export default function WorldOpens({ onContinue }) {
  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col items-center justify-center px-6 py-20 select-none bg-noise border-b border-editorial">
      
      <div className="max-w-3xl w-full text-center space-y-12">
        
        {/* Top Minimal Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-editorial bg-[#141417] text-xs font-mono-tech text-[#E9C46A]"
        >
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
          <span>PHASE 02 // DISCOVERY</span>
        </motion.div>

        {/* Narrative Sentences */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FAF6F0]"
          >
            "{siteConfig.worldOpens.line1}"
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="font-mono-tech text-lg sm:text-2xl text-[#8E8D9A] max-w-xl mx-auto font-light leading-relaxed"
          >
            "{siteConfig.worldOpens.line2}"
          </motion.p>
        </div>

        {/* Interactive Discovery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="pt-8 flex flex-col items-center gap-4"
        >
          <button
            onClick={onContinue}
            className="group flex flex-col items-center gap-3 text-xs font-mono-tech text-[#FAF6F0]/70 hover:text-[#C1121F] transition-colors"
          >
            <span className="uppercase tracking-widest text-xs font-bold text-[#FAF6F0] group-hover:text-[#C1121F] transition-colors">
              [ ENTER HER WORLD ]
            </span>
            <div className="w-10 h-10 rounded-full border border-editorial group-hover:border-[#C1121F] flex items-center justify-center bg-[#141417] transition-all group-hover:scale-110">
              <ChevronDown className="w-5 h-5 text-[#FAF6F0] group-hover:text-[#C1121F] animate-bounce" />
            </div>
          </button>
        </motion.div>

      </div>

    </section>
  );
}
