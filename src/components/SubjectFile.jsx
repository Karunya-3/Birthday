import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';
import { siteConfig } from '../data/config';
import { photosData } from '../data/photos';
import { playFolderClick } from '../utils/audio';

export default function SubjectFile({ onContinue }) {
  const mainPhoto = photosData[0] || { url: "/images/photo1.jpg" };

  return (
    <section className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8 bg-[#121316] relative font-mono">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-4xl w-full bg-[#1A1C23] border border-[#333745] rounded-lg shadow-2xl p-6 sm:p-10 relative overflow-hidden my-6">
        
        {/* Top Header docket bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333745] pb-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="bg-[#22252F] text-amber-400 border border-[#333745] px-3 py-1 text-xs font-bold rounded">
              FILE: SUBJECT_01
            </span>
            <span className="text-zinc-500 text-xs hidden sm:inline">REF_CODE: 2026-BDAY-ARCHIVE</span>
          </div>

          <div className="stamp-classified text-xs">
            CLASSIFIED
          </div>
        </div>

        {/* Main Grid: Subject Info + Archived Photo */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Dossier Details */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs text-zinc-500 tracking-widest uppercase">TARGET IDENTIFIER</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {siteConfig.sisterName.toUpperCase()}
              </h2>
            </div>

            {/* Known Aliases docket */}
            <div className="bg-[#121316] border border-[#333745] p-5 rounded space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 border-b border-[#333745] pb-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                <span>KNOWN ALIASES & BEHAVIORAL TRAITS:</span>
              </div>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {siteConfig.knownAliases.map((alias, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{alias}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Investigation notes */}
            <div className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed">
              <p>
                <strong className="text-zinc-200 font-mono">ASSESSMENT:</strong> High probability of chaos, unexpected laughter, snack confiscation, and endless argument loops.
              </p>
              <p className="text-zinc-500 text-[11px] font-mono">
                [LAST UPDATED: TODAY // AUTHOR CLEARANCE: SIBLING NO. 1]
              </p>
            </div>

            {/* Action button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playFolderClick();
                  onContinue();
                }}
                className="w-full sm:w-auto bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold text-xs tracking-wider py-3.5 px-6 rounded shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>CONTINUE INVESTIGATION</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right Column: Archived Polaroid/Document Photo */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative p-4 bg-[#F4F1EA] text-[#121316] rounded shadow-2xl transform rotate-2 max-w-xs w-full transition-transform hover:rotate-0 duration-300">
              
              {/* Tape corner simulation */}
              <div className="tape-corner tape-top-left" />
              <div className="tape-corner tape-top-right" />

              {/* Photo Frame */}
              <div className="aspect-[4/5] bg-zinc-900 overflow-hidden rounded mb-3 relative group">
                <img
                  src={mainPhoto.url}
                  alt={siteConfig.sisterName}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-2 right-2 bg-red-600/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow">
                  EXHIBIT_00
                </div>
              </div>

              {/* Handwritten annotation over the photo frame */}
              <div className="text-center relative">
                <span className="font-handwriting text-2xl font-bold text-red-600 tracking-wide block -rotate-3 select-none">
                  "Yep. That's her."
                </span>
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">
                  SUBJECT IDENTIFIED
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
