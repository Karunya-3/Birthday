import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../data/config';
import { RotateCcw, Heart, Sparkles } from 'lucide-react';

export default function FinalVisualMosaic({ onReplay }) {
  const [zoomOut, setZoomOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomOut(true);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const photos = siteConfig.photos;
  const { mosaicWord, subtext, finalHeading, replayButtonText } = siteConfig.finalVisual;

  return (
    <section className="relative w-full min-h-screen bg-[#050506] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise select-none">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 spotlight-glow pointer-events-none" />

      <div className="max-w-6xl w-full text-center space-y-12 relative z-10 my-auto">
        
        {/* Dynamic Photo Mosaic Container */}
        <motion.div
          animate={{ scale: zoomOut ? 0.9 : 1.05 }}
          transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto space-y-8"
        >
          {/* Photos Mosaic Assembly Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 max-w-3xl mx-auto p-4 bg-[#141417]/80 border border-editorial shadow-2xl">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.5, rotate: (idx % 2 === 0 ? -12 : 12) }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: idx * 0.2 }}
                className="aspect-square overflow-hidden border border-editorial group relative"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Giant Word Typography Overlaid */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1.4 }}
            className="font-serif-editorial text-6xl sm:text-8xl md:text-9xl font-black text-[#FAF6F0] tracking-tighter uppercase leading-none"
          >
            {mosaicWord}
          </motion.h1>
        </motion.div>

        {/* Story Concluding Text & Replay Button */}
        {zoomOut && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 pt-4 max-w-md mx-auto"
          >
            <p className="font-mono-tech text-xs sm:text-sm text-[#8E8D9A] tracking-widest uppercase font-light">
              "{subtext}"
            </p>

            <h2 className="font-serif-editorial text-3xl sm:text-5xl font-extrabold text-[#C1121F] tracking-wide">
              {finalHeading}
            </h2>

            <div className="pt-4">
              <button
                onClick={onReplay}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full shadow-2xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{replayButtonText}</span>
              </button>
            </div>

          </motion.div>
        )}

      </div>

    </section>
  );
}
