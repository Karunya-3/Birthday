import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, PartyPopper, RefreshCw, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/config';

export default function Birthday() {
  const [candlesLit, setCandlesLit] = useState(true);

  const fireConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#f43f5e', '#a855f7', '#fb923c', '#eab308'],
    });
  };

  const toggleCandles = () => {
    if (candlesLit) {
      setCandlesLit(false);
      fireConfetti();
    } else {
      setCandlesLit(true);
    }
  };

  return (
    <section id="birthday" className="py-28 px-4 bg-gradient-to-b from-pastel-cream via-pink-100/60 to-pastel-cream relative overflow-hidden text-center">
      {/* Decorative Balloons */}
      <div className="absolute left-8 top-12 text-6xl animate-floating pointer-events-none select-none">🎈</div>
      <div className="absolute right-10 top-20 text-6xl animate-floating pointer-events-none select-none delay-1000">🎈</div>
      <div className="absolute left-1/4 bottom-12 text-5xl animate-floating pointer-events-none select-none delay-500">✨</div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top Celebration Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500 text-white font-bold text-sm shadow-md mb-8"
        >
          <PartyPopper className="w-5 h-5" />
          <span>The Grand Finale</span>
          <PartyPopper className="w-5 h-5" />
        </motion.div>

        {/* Large Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-4"
        >
          {siteConfig.birthdayTitle}
        </motion.h1>

        {/* Birthday Emojis */}
        <div className="text-4xl sm:text-5xl mb-8 space-x-3 select-none">
          {siteConfig.birthdayEmojis}
        </div>

        {/* Interactive Birthday Cake */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={toggleCandles}
          className="cursor-pointer inline-block bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-pink-200 mb-12 relative group"
        >
          <div className="text-7xl sm:text-8xl relative inline-block select-none">
            🎂
            {candlesLit && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-2 text-2xl text-amber-500 animate-pulse">
                <Flame className="w-6 h-6 fill-amber-400 text-orange-500" />
              </span>
            )}
          </div>
          <p className="text-xs font-bold text-pink-600 uppercase tracking-wider mt-3">
            {candlesLit ? 'Tap cake to blow out candles! 🕯️' : 'Candles blown! Tap to light again ✨'}
          </p>
        </motion.div>

        {/* Heartfelt Message Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-xl border border-pink-100 max-w-2xl mx-auto mb-10 text-slate-700 leading-relaxed"
        >
          <p className="text-lg sm:text-xl font-medium mb-6">
            "{siteConfig.birthdayMessageLine1}"
          </p>
          <p className="text-lg sm:text-xl font-medium mb-8">
            "{siteConfig.birthdayMessageLine2}"
          </p>

          <div className="pt-6 border-t border-pink-100 flex flex-col items-center justify-center">
            <p className="font-handwriting text-4xl sm:text-5xl text-pink-600 font-bold mb-2">
              {siteConfig.birthdaySignoff}
            </p>
          </div>
        </motion.div>

        {/* Confetti Trigger Button */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={fireConfetti}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            <span>Celebrate with Confetti! 🎉</span>
          </button>
        </div>
      </div>
    </section>
  );
}
