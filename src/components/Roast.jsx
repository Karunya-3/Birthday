import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Heart, Sparkles, FlameKindling } from 'lucide-react';
import { roastsData, roastFinalPayoff } from '../data/roasts';

export default function Roast() {
  const [revealedCount, setRevealedCount] = useState(1);

  const revealNext = () => {
    if (revealedCount < roastsData.length + 1) {
      setRevealedCount(revealedCount + 1);
    }
  };

  const isAllRevealed = revealedCount > roastsData.length;

  return (
    <section id="roast" className="py-24 px-4 bg-pastel-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-4 border border-orange-200">
            <Flame className="w-4 h-4 text-orange-500 fill-current" />
            <span>Sibling Teasing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
            Now For The Part You Can't Skip... 🔥
          </h2>
          <p className="text-lg text-slate-600 font-normal">
            Don't worry. It's all love.
          </p>
        </div>

        {/* Revealed Cards List */}
        <div className="space-y-6 mb-12">
          {roastsData.slice(0, Math.min(revealedCount, roastsData.length)).map((roast, index) => (
            <motion.div
              key={roast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border-l-8 border-l-orange-400 border-y border-r border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-xl font-bold">
                  #{index + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-1">
                    {roast.title}
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                    "{roast.content}"
                  </p>
                </div>
              </div>

              <div className="text-2xl opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all self-end sm:self-center">
                🔥
              </div>
            </motion.div>
          ))}

          {/* Final Affectionate Payoff Card */}
          {isAllRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center text-white mb-4">
                  <Heart className="w-8 h-8 fill-current text-white animate-bounce" />
                </div>
                <h3 className="font-handwriting text-3xl sm:text-4xl font-bold tracking-wide">
                  "{roastFinalPayoff}"
                </h3>
              </div>

              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-white/10 opacity-30 blur-xl pointer-events-none" />
            </motion.div>
          )}
        </div>

        {/* Reveal Next Button */}
        {!isAllRevealed && (
          <div className="text-center">
            <button
              onClick={revealNext}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 text-white font-bold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <FlameKindling className="w-6 h-6 animate-pulse" />
              <span>Reveal the next roast 🔥 ({revealedCount} / {roastsData.length})</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
