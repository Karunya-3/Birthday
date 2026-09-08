import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Star, ArrowDown, Gift } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function Welcome() {
  const scrollToGallery = () => {
    const galleryEl = document.getElementById('gallery');
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Floating background elements
  const floatingElements = [
    { icon: '💖', left: '10%', top: '20%', delay: 0, size: 'text-2xl' },
    { icon: '✨', left: '85%', top: '15%', delay: 1, size: 'text-3xl' },
    { icon: '🎈', left: '15%', top: '75%', delay: 2, size: 'text-4xl' },
    { icon: '⭐', left: '80%', top: '70%', delay: 1.5, size: 'text-2xl' },
    { icon: '🌸', left: '75%', top: '35%', delay: 0.5, size: 'text-3xl' },
    { icon: '💕', left: '20%', top: '45%', delay: 2.5, size: 'text-2xl' },
    { icon: '🎂', left: '88%', top: '85%', delay: 3, size: 'text-3xl' },
    { icon: '✨', left: '8%', top: '85%', delay: 1.2, size: 'text-2xl' },
  ];

  return (
    <section
      id="welcome"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20 pb-16 animated-gradient"
    >
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.4, 0.9, 0.4],
              y: [0, -20, 0],
              scale: [1, 1.15, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + (index % 3),
              repeat: Infinity,
              delay: item.delay,
              ease: 'easeInOut',
            }}
            style={{ left: item.left, top: item.top }}
            className={`absolute ${item.size} select-none filter drop-shadow-sm`}
          >
            {item.icon}
          </motion.div>
        ))}

        {/* Subtle Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-300/30 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Decorative Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-sm font-medium shadow-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
          <span>A Special Digital Gift</span>
          <Sparkles className="w-4 h-4 text-pink-500 animate-spin-slow" />
        </motion.div>

        {/* 3. Her Name Appears */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mb-4"
        >
          <h2 className="font-handwriting text-4xl sm:text-5xl md:text-6xl text-pink-600 font-bold tracking-wide">
            {siteConfig.greeting}
          </h2>
        </motion.div>

        {/* 4. Main Heading Fades & Slides Upward */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight leading-[1.15] mb-6"
        >
          {siteConfig.heroHeading}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-10 font-normal"
        >
          {siteConfig.heroSubtitle}
        </motion.p>

        {/* 5. Button Appears Last */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={scrollToGallery}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-semibold text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Let's begin
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <p className="text-xs text-slate-500 flex items-center gap-1 font-handwriting text-lg">
            <span>Scroll down or tap button to explore</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-current inline" />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
