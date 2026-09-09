import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { photosData } from '../data/photos';
import { RotateCcw, Sparkles, Heart, Gift, PartyPopper, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinaleVisual({ onReplay }) {
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Continuous Confetti Generator when full screen surprise is active
  useEffect(() => {
    if (!showSurpriseModal) return;

    // Big initial burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#C1121F', '#E9C46A', '#ffffff', '#2a9d8f', '#f4a261'],
    });

    // Side cannons firing periodically
    const interval = setInterval(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors: ['#C1121F', '#E9C46A', '#ffffff'],
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors: ['#C1121F', '#E9C46A', '#ffffff'],
      });
    }, 700);

    return () => clearInterval(interval);
  }, [showSurpriseModal]);

  const handleOpenSurprise = () => {
    setShowSurpriseModal(true);
  };

  const triggerExtraConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.6 },
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 spotlight-glow pointer-events-none" />

      <div className="max-w-6xl w-full text-center space-y-10 relative z-10 my-auto">
        
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase">
            THE FINAL CHAPTER
          </span>
          <h1 className="font-serif-editorial text-4xl sm:text-7xl font-extrabold text-[#C1121F] tracking-tight uppercase">
            HAPPY BIRTHDAY AKKA
          </h1>
        </motion.div>

        {/* Photo Mosaic Grid */}
        <motion.div
          animate={{ scale: zoomOut ? 0.95 : 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-[#141417]/90 border border-editorial shadow-2xl rounded-2xl">
            {photosData.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative aspect-square overflow-hidden rounded-lg border border-editorial bg-black"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  style={{ objectPosition: item.objectPosition || 'center 35%' }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 text-left">
                  <span className="font-mono-tech text-[11px] text-[#E9C46A] font-bold line-clamp-1">
                    {item.title}
                  </span>
                  <span className="font-handwriting text-[10px] text-white line-clamp-1">
                    "{item.situation}"
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Surprise Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleOpenSurprise}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 bg-gradient-to-r from-[#C1121F] to-[#e63946] text-white font-mono-tech text-sm sm:text-base font-extrabold tracking-widest uppercase rounded-full shadow-[0_0_35px_rgba(193,18,31,0.7)] hover:shadow-[0_0_50px_rgba(193,18,31,0.9)] hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20"
          >
            <Gift className="w-5 h-5 animate-bounce" />
            <span>OPEN LAST SURPRISE 🎁</span>
            <Sparkles className="w-5 h-5 text-[#E9C46A]" />
          </button>

          <button
            onClick={onReplay}
            className="inline-flex items-center gap-2 px-6 py-4 bg-[#141417] text-[#FAF6F0]/80 border border-editorial font-mono-tech text-xs font-semibold tracking-wider uppercase rounded-full hover:text-white hover:border-[#C1121F] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>REPLAY STORY</span>
          </button>
        </div>

      </div>

      {/* Full-Screen Surprise Overlay Modal */}
      <AnimatePresence>
        {showSurpriseModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-between p-4 sm:p-8 overflow-y-auto bg-noise"
          >
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 spotlight-glow pointer-events-none" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#C1121F]/25 rounded-full blur-[140px] pointer-events-none animate-pulse" />

            {/* Header Controls */}
            <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#E9C46A]">
                <Sparkles className="w-4 h-4 animate-spin" />
                <span className="tracking-widest uppercase font-semibold">
                  LAST SURPRISE // FULL GALLERY
                </span>
              </div>
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="p-2.5 rounded-full bg-[#141417] text-[#FAF6F0]/70 hover:text-white border border-editorial hover:border-[#C1121F] transition-all cursor-pointer shadow-lg"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Full-Screen Content */}
            <div className="relative z-10 max-w-7xl mx-auto w-full text-center my-auto py-8 space-y-10">
              
              {/* Animated Text */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C1121F]/20 border border-[#C1121F]/50 text-xs font-mono-tech text-[#E9C46A] uppercase tracking-widest">
                  <Heart className="w-3.5 h-3.5 fill-[#C1121F] text-[#C1121F] animate-pulse" />
                  <span>FOR THE BEST SISTER IN THE WORLD</span>
                </div>

                <h1 className="font-serif-editorial text-5xl sm:text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FAF6F0] to-[#C1121F] tracking-tight uppercase leading-tight drop-shadow-2xl">
                  HAPPY BIRTHDAY AKKA
                </h1>

                <p className="font-handwriting text-2xl sm:text-4xl text-[#E9C46A] italic">
                  "Every single photo tells our crazy story!" ❤️
                </p>
              </motion.div>

              {/* Full Gallery of All Images */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-left"
              >
                {photosData.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30, rotate: (idx % 2 === 0 ? -2 : 2) }}
                    animate={{ opacity: 1, y: 0, rotate: item.rotation || '0deg' }}
                    transition={{ duration: 0.7, delay: 0.1 * idx }}
                    className="group bg-[#141417] p-4 rounded-2xl border border-editorial shadow-2xl hover:border-[#C1121F]/60 transition-all duration-300 hover:scale-[1.03]"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-black mb-4 relative">
                      <img
                        src={item.url}
                        alt={item.title}
                        style={{ objectPosition: item.objectPosition || 'center 35%' }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-[#0A0A0C]/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono-tech text-[#E9C46A] border border-editorial">
                        {item.exhibitNumber}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif-editorial text-lg font-bold text-white group-hover:text-[#C1121F] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-mono-tech text-xs text-[#8E8D9A]">
                        {item.situation}
                      </p>
                      <p className="font-handwriting text-sm text-[#E9C46A] italic pt-1">
                        "{item.conclusion}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Extra Confetti Blast Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <button
                  onClick={triggerExtraConfetti}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase rounded-full hover:bg-[#C1121F] hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4 text-[#C1121F] group-hover:text-white" />
                  <span>MORE CONFETTI! 🎉</span>
                </button>
              </motion.div>

            </div>

            {/* Footer */}
            <div className="relative z-10 text-center font-mono-tech text-xs text-[#8E8D9A]/60 py-2">
              HAPPY BIRTHDAY AKKA ❤️ PERSONAL CELEBRATION EXPERIENCE
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
