import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Heart, X, ArrowLeft, Sparkles } from 'lucide-react';

export default function OpenWhenCards({ onContinue }) {
  const [activeCard, setActiveCard] = useState(null);

  const cards = siteConfig.openCards;

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#8E8D9A] uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
        <span>07 // OPEN WHEN...</span>
      </div>

      <AnimatePresence mode="wait">
        {!activeCard ? (
          /* Main Cards Grid View */
          <motion.div
            key="cards-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl w-full mx-auto space-y-12 relative z-10"
          >
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold">
                INTIMATE TRANSMISSIONS
              </span>
              <h2 className="font-serif-editorial text-4xl sm:text-6xl font-bold text-[#FAF6F0]">
                "If You Ever..."
              </h2>
              <p className="font-mono-tech text-xs sm:text-sm text-[#8E8D9A]">
                Click any phrase below. The screen will transform to deliver a message just for that moment.
              </p>
            </div>

            {/* Floating Interactive Phrase Capsules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {cards.map((card, idx) => (
                <motion.button
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  onClick={() => setActiveCard(card)}
                  className="group relative p-8 bg-[#141417] border border-editorial hover:border-[#C1121F] text-left transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-2xl hover:shadow-[#C1121F]/10 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-tech text-[10px] text-[#E9C46A] uppercase tracking-widest font-bold">
                      LETTER 0{idx + 1}
                    </span>
                    <Heart className="w-4 h-4 text-[#8E8D9A] group-hover:text-[#C1121F] transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif-editorial text-2xl font-bold text-[#FAF6F0] group-hover:text-[#E9C46A] transition-colors">
                      {card.title}
                    </h3>
                    <p className="font-mono-tech text-xs text-[#8E8D9A]">
                      {card.tagline}
                    </p>
                  </div>

                  <div className="pt-2 font-mono-tech text-[11px] text-[#C1121F] font-bold uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>READ MESSAGE →</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navigation Button */}
            <div className="text-center pt-8">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full"
              >
                <span>CONTINUE TO SURPRISE MOMENT →</span>
              </button>
            </div>

          </motion.div>
        ) : (
          /* Full Screen Transformed View (Everything fades away, pure message remains) */
          <motion.div
            key="card-detail"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-[#070708] text-[#FAF6F0] flex flex-col items-center justify-center p-6 sm:p-12 overflow-y-auto bg-noise"
          >
            {/* Back / Close Trigger */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 font-mono-tech text-xs text-[#8E8D9A] hover:text-white uppercase tracking-widest bg-[#141417] px-4 py-2 rounded-full border border-editorial hover:border-[#C1121F] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>RETURN TO PHRASES</span>
            </button>

            {/* Pure Intimate Message Layout */}
            <div className="max-w-2xl w-full text-center space-y-8 my-auto py-12">
              
              <div className="space-y-2">
                <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold block">
                  {activeCard.tagline}
                </span>
                <h2 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-[#FAF6F0]">
                  {activeCard.title}
                </h2>
              </div>

              <div className="w-16 h-[1px] bg-[#C1121F] mx-auto" />

              {/* Message Body */}
              <div className="font-sans text-base sm:text-xl text-[#FAF6F0]/90 leading-relaxed font-light whitespace-pre-line text-left bg-[#141417]/80 border border-editorial p-6 sm:p-10 shadow-2xl space-y-4">
                {activeCard.message}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setActiveCard(null)}
                  className="px-8 py-3 bg-[#141417] border border-editorial text-[#FAF6F0] font-mono-tech text-xs tracking-widest uppercase hover:border-[#C1121F] rounded-full transition-all"
                >
                  CLOSE MESSAGE
                </button>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
