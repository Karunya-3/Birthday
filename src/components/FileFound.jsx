import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { siteConfig } from '../data/config';
import { playKeyClick, playAccessGranted } from '../utils/audio';

export default function FileFound({ onOpenComplete }) {
  const [stage, setStage] = useState('initial'); // 'initial' | 'accessing' | 'granted'
  const [progress, setProgress] = useState(0);

  const handleStartAccess = () => {
    playKeyClick();
    setStage('accessing');
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 8;
      playKeyClick();
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        playAccessGranted();
        setStage('granted');
        setTimeout(() => {
          onOpenComplete();
        }, 1400);
      }
      setProgress(current);
    }, 180);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#EFECE6] flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono selection:bg-red-600 selection:text-white">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-grid-lines opacity-40 pointer-events-none" />

      {/* CRT Scanline effect */}
      <div className="absolute inset-0 scanline-overlay z-10" />

      <div className="max-w-md w-full z-20">
        <AnimatePresence mode="wait">
          {stage === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-8"
            >
              {/* Terminal badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1C23] border border-[#333745] rounded-full text-xs text-zinc-400">
                <Terminal className="w-3.5 h-3.5 text-amber-500" />
                <span>TERMINAL_SESSION // 0x7F2A</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-widest text-white">
                  {siteConfig.openingText}
                </h1>
                <p className="text-zinc-400 text-sm font-sans tracking-wide">
                  {siteConfig.openingSubtext}
                </p>
              </div>

              {/* Classified Stamp Card */}
              <div className="bg-[#1A1C23]/80 border border-[#333745] p-6 rounded-lg shadow-2xl relative overflow-hidden text-left space-y-2">
                <div className="flex justify-between items-center text-xs text-zinc-500 border-b border-[#333745] pb-2">
                  <span>FILE_NAME: archive_01.dat</span>
                  <span className="text-red-400 font-semibold">ENCRYPTED</span>
                </div>
                <p className="text-xs text-zinc-400 font-sans pt-1">
                  Recipient: <span className="text-amber-400 font-mono font-semibold">{siteConfig.sisterName}</span>
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500">
                  <ShieldAlert className="w-4 h-4 text-amber-500" />
                  <span>Security Clearance Level 4 Required</span>
                </div>
              </div>

              {/* Action Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartAccess}
                className="w-full bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold tracking-widest py-3.5 px-6 rounded shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Lock className="w-4 h-4 text-zinc-700 group-hover:text-black transition-colors" />
                <span>[ {siteConfig.openButtonText} ]</span>
              </motion.button>
            </motion.div>
          )}

          {stage === 'accessing' && (
            <motion.div
              key="accessing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#1A1C23] border border-[#333745] p-6 sm:p-8 rounded-lg shadow-2xl space-y-6 text-left"
            >
              <div className="flex items-center justify-between border-b border-[#333745] pb-3">
                <span className="text-xs text-amber-400 font-semibold animate-pulse">ACCESSING FILE...</span>
                <span className="text-xs text-zinc-400 font-bold">{progress}%</span>
              </div>

              {/* Custom ASCII style progress bar */}
              <div className="font-mono text-xs sm:text-sm tracking-tighter overflow-hidden text-amber-400 bg-[#121316] p-3 rounded border border-[#333745]">
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className={i < Math.floor(progress / 5) ? "text-amber-400" : "text-zinc-700"}>
                    █
                  </span>
                ))}
              </div>

              <div className="space-y-2 text-xs font-mono border-t border-[#333745] pt-4">
                <div className="flex justify-between">
                  <span className="text-zinc-500">IDENTITY:</span>
                  <span className="text-zinc-200 font-bold">{siteConfig.sisterName.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">STATUS:</span>
                  <span className="text-red-400 font-bold tracking-wider">CLASSIFIED ARCHIVE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">DECRYPTION KEY:</span>
                  <span className="text-zinc-400">0x9F82A4</span>
                </div>
              </div>
            </motion.div>
          )}

          {stage === 'granted' && (
            <motion.div
              key="granted"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-[#1A1C23] border-2 border-emerald-500/80 p-8 rounded-lg shadow-2xl text-center space-y-4"
            >
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h2 className="text-2xl font-bold tracking-widest text-emerald-400">
                ACCESS GRANTED
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Unlocking Subject File: {siteConfig.sisterName}...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
