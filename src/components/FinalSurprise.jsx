import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Volume2, VolumeX, RotateCcw, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/config';

export default function FinalSurprise({ onTriggerMusic }) {
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const handleOpenSurprise = () => {
    setIsOpen(true);
    setStepIndex(0);

    // Notify parent to start music if audio enabled
    if (onTriggerMusic) {
      onTriggerMusic();
    }

    // Trigger confetti explosion
    triggerConfetti();

    // Sequence timeline for revealing surprise lines
    const timer1 = setTimeout(() => setStepIndex(1), 2000);
    const timer2 = setTimeout(() => setStepIndex(2), 4500);
    const timer3 = setTimeout(() => {
      setStepIndex(3);
      triggerHeartsConfetti();
    }, 7000);
    const timer4 = setTimeout(() => setStepIndex(4), 9500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#c084fc', '#fb7185', '#fb923c'],
    });
  };

  const triggerHeartsConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ec4899', '#f43f5e', '#a855f7'],
      });
    }, 250);
  };

  const handleReset = () => {
    setIsOpen(false);
    setStepIndex(0);
  };

  return (
    <section id="surprise" className="py-24 px-4 bg-pastel-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {!isOpen ? (
          /* Initial Minimal Prompt */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 sm:p-16 shadow-xl border border-pink-100 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-pink-100 text-pink-600 mx-auto flex items-center justify-center mb-6 shadow-inner animate-pulse">
              <Gift className="w-10 h-10" />
            </div>

            <h3 className="font-handwriting text-3xl sm:text-4xl text-pink-600 font-bold mb-3">
              Wait... There's one last thing.
            </h3>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-8">
              I saved the best part for the end.
            </h2>

            <button
              onClick={handleOpenSurprise}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-xl shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
            >
              <Sparkles className="w-6 h-6 animate-spin-slow" />
              <span>Open the final surprise 🎁</span>
            </button>
          </motion.div>
        ) : (
          /* Full Night Sky Dark Mode Surprise Modal / Viewport */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 overflow-y-auto"
          >
            {/* Starry Sky Particle Field */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bg-white rounded-full animate-pulse"
                  style={{
                    width: `${Math.random() * 3 + 1}px`,
                    height: `${Math.random() * 3 + 1}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Glowing Central Heart */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
              className="w-24 h-24 rounded-full bg-pink-500/20 backdrop-blur-md border border-pink-500/40 flex items-center justify-center text-pink-400 mb-8 shadow-[0_0_50px_rgba(244,114,182,0.6)]"
            >
              <Heart className="w-12 h-12 fill-current text-pink-500" />
            </motion.div>

            {/* Framed Polaroid Photo Reveal */}
            {stepIndex >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white p-3 pb-5 rounded-md shadow-2xl rotate-[-2deg] max-w-xs mb-8"
              >
                <img
                  src="/images/photo1.jpg"
                  alt="Special Memory"
                  className="w-full h-48 object-cover rounded-sm"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <p className="font-handwriting text-slate-800 text-2xl font-bold mt-2 text-center">
                  Forever My Sister ❤️
                </p>
              </motion.div>
            )}

            {/* Sequential Animated Story Lines */}
            <div className="max-w-2xl mx-auto space-y-6 text-center z-10 px-4">
              {stepIndex >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-xl sm:text-2xl text-slate-300 font-light"
                >
                  "{siteConfig.surpriseLines[0]}"
                </motion.p>
              )}

              {stepIndex >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-xl sm:text-2xl text-slate-300 font-light"
                >
                  "{siteConfig.surpriseLines[1]}"
                </motion.p>
              )}

              {stepIndex >= 3 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="font-handwriting text-4xl sm:text-5xl text-pink-400 font-bold"
                >
                  "{siteConfig.surpriseLines[2]}"
                </motion.p>
              )}

              {stepIndex >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="pt-6"
                >
                  <h2 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 mb-8">
                    {siteConfig.surpriseLines[3]}
                  </h2>

                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={() => {
                        const bdayEl = document.getElementById('birthday');
                        if (bdayEl) bdayEl.scrollIntoView({ behavior: 'smooth' });
                        setIsOpen(false);
                      }}
                      className="px-8 py-3 rounded-full bg-pink-500 text-white font-bold text-lg hover:bg-pink-600 shadow-lg shadow-pink-500/30 transition-transform hover:scale-105 flex items-center gap-2"
                    >
                      <span>Continue Celebration 🎉</span>
                      <ArrowDown className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-full bg-white/10 text-slate-300 hover:bg-white/20 transition-colors text-sm font-medium flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" /> Replay Surprise
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
