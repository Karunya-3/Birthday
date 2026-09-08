import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Heart, Sparkles, Feather } from 'lucide-react';
import { openWhenCards } from '../data/cards';

export default function OpenCards() {
  const [activeCardId, setActiveCardId] = useState(null);

  const activeCard = openWhenCards.find((c) => c.id === activeCardId);

  return (
    <section id="cards" className="py-24 px-4 bg-gradient-to-b from-pastel-cream via-purple-50/40 to-pastel-cream relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4 border border-pink-200">
            <Mail className="w-4 h-4" />
            <span>Open When Letters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
            For Different Versions of You 💌
          </h2>
          <p className="text-lg text-slate-600 font-normal">
            Open one whenever you need it.
          </p>
        </div>

        {/* Envelope Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {openWhenCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCardId(card.id)}
              className="cursor-pointer group relative bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-pink-100 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Gradient */}
              <div className={`absolute top-0 inset-x-0 h-3 bg-gradient-to-r ${card.accentBg}`} />

              {/* Envelope flap visual line */}
              <div className="w-full h-12 border-b-2 border-dashed border-pink-100 mb-4 flex items-center justify-between">
                <span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                  {card.icon}
                </span>
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                  Envelope
                </span>
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-2 ${card.themeColor} group-hover:translate-x-1 transition-transform`}>
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 font-normal leading-relaxed mb-6">
                  {card.previewText}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-pink-600 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Feather className="w-3.5 h-3.5" /> Read letter
                </span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Letter Modal */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCardId(null)}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.85, y: 30, rotateX: 15 }}
              animate={{ scale: 1, y: 0, rotateX: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#fffdfa] rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-white ring-1 ring-pink-200 overflow-hidden text-slate-800"
            >
              {/* Paper Background Stamp Pattern */}
              <div className="absolute top-6 right-6 opacity-15 pointer-events-none text-6xl">
                💌
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveCardId(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-pink-50 text-slate-600 hover:bg-pink-500 hover:text-white transition-colors"
                aria-label="Close letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Envelope Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{activeCard.icon}</span>
                <div>
                  <h3 className={`text-2xl sm:text-3xl font-extrabold ${activeCard.themeColor}`}>
                    {activeCard.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Special letter for you</span>
                </div>
              </div>

              {/* Letter Body in Handwritten Style */}
              <div className="my-6 p-6 sm:p-8 rounded-2xl bg-amber-50/50 border border-amber-100/80 shadow-inner">
                <p className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed font-semibold">
                  "{activeCard.message}"
                </p>
              </div>

              {/* Bottom Sign-off */}
              <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-pink-100">
                <span className="font-handwriting text-2xl text-pink-600 font-bold">
                  With all my love ❤️
                </span>
                <button
                  onClick={() => setActiveCardId(null)}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white font-semibold text-xs hover:bg-pink-600 transition-colors"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
