import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, MapPin, AlertCircle, Maximize2 } from 'lucide-react';
import { photosData } from '../data/photos';
import { playFolderClick, playKeyClick } from '../utils/audio';

export default function EvidenceBoard({ onContinue }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="min-h-screen bg-[#121316] text-[#EFECE6] p-4 sm:p-8 font-mono relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Section Header */}
        <div className="border-b border-[#333745] pb-6 flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1C23] border border-[#333745] rounded text-xs text-amber-400 font-bold">
              <span>SECTION 03 // EVIDENCE LOGS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              EVIDENCE BOARD
            </h2>
            <p className="text-zinc-400 font-sans text-sm italic">
              "Exhibit A through whatever happened after that."
            </p>
          </div>

          <div className="text-xs text-zinc-500 font-mono text-right hidden sm:block">
            TOTAL EXHIBITS: {photosData.length} <br />
            STATUS: CATALOGUED
          </div>
        </div>

        {/* Scattered Evidence Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {photosData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 20 }}
              style={{ transform: `rotate(${item.rotation || '0deg'})` }}
              onClick={() => {
                playFolderClick();
                setSelectedPhoto(item);
              }}
              className="bg-[#F4F1EA] text-[#121316] p-4 rounded shadow-xl cursor-pointer relative transition-all duration-300 group border border-[#E2D9CF]"
            >
              {/* Exhibit badge stamp */}
              <div className="flex justify-between items-center mb-3 text-xs font-mono font-bold border-b border-zinc-300 pb-2">
                <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded border border-red-300">
                  {item.exhibitNumber}
                </span>
                <span className="text-zinc-500 font-sans text-[11px]">
                  {item.tag}
                </span>
              </div>

              {/* Photo Image Container */}
              <div className="aspect-[4/3] bg-zinc-900 overflow-hidden rounded relative mb-3">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                
                {/* Zoom indicator overlay */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Caption & Title */}
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-zinc-900 line-clamp-1 font-sans">
                  {item.title}
                </h4>
                <p className="font-handwriting text-lg text-zinc-700 leading-tight">
                  "{item.situation}"
                </p>
              </div>

              <div className="mt-3 text-[10px] font-mono text-zinc-500 text-right">
                [CLICK TO INSPECT FILE]
              </div>
            </motion.div>
          ))}
        </div>

        {/* Section completion button */}
        {onContinue && (
          <div className="pt-8 text-center">
            <button
              onClick={() => {
                playKeyClick();
                onContinue();
              }}
              className="bg-[#1A1C23] hover:bg-[#22252F] border border-[#333745] text-amber-400 font-mono font-bold text-xs py-3 px-8 rounded shadow transition-colors cursor-pointer"
            >
              PROCEED TO INTERROGATION →
            </button>
          </div>
        )}

      </div>

      {/* Interactive Photo Zoom Inspection Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1A1C23] border border-[#333745] max-w-2xl w-full rounded-lg shadow-2xl p-6 relative overflow-hidden font-mono text-zinc-200"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  playKeyClick();
                  setSelectedPhoto(null);
                }}
                className="absolute top-4 right-4 p-2 bg-[#22252F] hover:bg-red-900/40 text-zinc-400 hover:text-white rounded border border-[#333745] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 border-b border-[#333745] pb-3 mb-4">
                <span className="bg-red-900/60 text-red-400 border border-red-700/50 px-2.5 py-0.5 text-xs font-bold rounded">
                  {selectedPhoto.exhibitNumber}
                </span>
                <h3 className="text-lg font-bold text-white font-sans">
                  {selectedPhoto.title}
                </h3>
              </div>

              {/* Photo Display */}
              <div className="max-h-[350px] overflow-hidden rounded border border-[#333745] mb-5 bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[350px] w-auto object-contain"
                />
              </div>

              {/* Detailed Evidence Log Specs */}
              <div className="bg-[#121316] border border-[#333745] p-4 rounded space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" /> DATE:
                  </span>
                  <span className="text-zinc-300 font-semibold">{selectedPhoto.date}</span>
                </div>

                <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" /> LOCATION:
                  </span>
                  <span className="text-zinc-300 font-semibold">{selectedPhoto.location}</span>
                </div>

                <div className="pt-1 space-y-1">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> SITUATION RECORDED:
                  </span>
                  <p className="text-zinc-300 font-sans text-sm pl-5">
                    {selectedPhoto.situation}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#333745] mt-2">
                  <span className="text-amber-400 font-bold block mb-1">
                    INVESTIGATION CONCLUSION:
                  </span>
                  <p className="text-emerald-400 font-sans font-semibold text-sm bg-emerald-950/30 p-2 rounded border border-emerald-800/40">
                    "{selectedPhoto.conclusion}"
                  </p>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
