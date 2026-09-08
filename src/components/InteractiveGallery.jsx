import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { X, Maximize2, Calendar, MapPin, MessageCircle } from 'lucide-react';

export default function InteractiveGallery({ onContinue }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [step, setStep] = useState(1); // 1: "Some moments deserve proof" -> 2: "Unfortunately we have too much proof"

  const photos = siteConfig.photos;
  const heroPhoto = photos[0];
  const galleryPhotos = photos.slice(1);

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#8E8D9A] uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
        <span>04 // PHOTO EVIDENCE JOURNEY</span>
      </div>

      <div className="max-w-7xl mx-auto w-full space-y-16">
        
        {/* Narrative Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-serif-editorial text-4xl sm:text-6xl font-bold text-[#FAF6F0]"
          >
            "Some moments deserve proof."
          </motion.h2>

          {step >= 2 ? (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-handwriting text-2xl sm:text-4xl text-[#E9C46A] italic"
            >
              "Unfortunately, we have too much proof."
            </motion.p>
          ) : (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setStep(2)}
              className="font-mono-tech text-xs text-[#8E8D9A] hover:text-[#C1121F] underline tracking-widest uppercase cursor-pointer"
            >
              [ REVEAL FULL ARCHIVE → ]
            </motion.button>
          )}
        </div>

        {/* Visual Photo Journey Layout (Asymmetrical, overlapping, dynamic sizes) */}
        <div className="relative min-h-[600px] flex flex-col items-center justify-center">
          
          {/* Main Hero Photo (Always visible) */}
          <motion.div
            layoutId={heroPhoto.id}
            onClick={() => {
              if (step < 2) setStep(2);
              setSelectedPhoto(heroPhoto);
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative z-20 w-full max-w-xl cursor-pointer group"
          >
            <div className="relative bg-[#141417] p-3 sm:p-4 border border-editorial shadow-2xl transition-all duration-300 group-hover:border-[#C1121F] group-hover:shadow-[#C1121F]/20">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={heroPhoto.url}
                  alt={heroPhoto.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 bg-[#0A0A0C]/90 text-white font-mono-tech text-xs px-4 py-2 rounded-full border border-editorial">
                    <Maximize2 className="w-3.5 h-3.5" /> EXPAND MEMORY
                  </span>
                </div>
              </div>

              {/* Handwritten Style Caption */}
              <div className="pt-3 flex items-center justify-between">
                <span className="font-handwriting text-2xl text-[#E9C46A]">
                  "{heroPhoto.handwrittenCaption}"
                </span>
                <span className="font-mono-tech text-[10px] text-[#8E8D9A] uppercase tracking-wider">
                  {heroPhoto.date}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Staggered Floating Secondary Photos (Revealed on step 2) */}
          <AnimatePresence>
            {step >= 2 && (
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 relative z-10">
                {galleryPhotos.map((photo, idx) => {
                  const rotations = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
                  const rot = rotations[idx % rotations.length];

                  return (
                    <motion.div
                      key={photo.id}
                      layoutId={photo.id}
                      initial={{ opacity: 0, y: 40, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.6, delay: idx * 0.15 }}
                      onClick={() => setSelectedPhoto(photo)}
                      className={`cursor-pointer group relative ${rot} hover:rotate-0 transition-transform duration-300`}
                    >
                      <div className="bg-[#141417] p-3 border border-editorial shadow-xl hover:border-[#C1121F] hover:shadow-2xl transition-all">
                        
                        <div className="relative overflow-hidden aspect-square">
                          <img
                            src={photo.url}
                            alt={photo.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Handwritten Caption */}
                        <div className="pt-2">
                          <p className="font-handwriting text-xl text-[#FAF6F0] group-hover:text-[#E9C46A] transition-colors">
                            "{photo.handwrittenCaption}"
                          </p>
                          <p className="font-mono-tech text-[10px] text-[#8E8D9A] pt-1">
                            {photo.title}
                          </p>
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>

        </div>

        {/* Continue Button */}
        <div className="text-center pt-8">
          <button
            onClick={onContinue}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all duration-300 rounded-full"
          >
            <span>PROCEED TO TRUTH & QUIZ →</span>
          </button>
        </div>

      </div>

      {/* Full Screen Photo Memory Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0A0A0C]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={selectedPhoto.id}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141417] border border-editorial shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#0A0A0C]/80 text-white flex items-center justify-center border border-editorial hover:border-[#C1121F] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="md:col-span-7 bg-black flex items-center justify-center min-h-[300px]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh]"
                />
              </div>

              {/* Modal Detail Story */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <span className="font-mono-tech text-[10px] tracking-widest text-[#C1121F] uppercase font-bold">
                    EVIDENCE RECORD // MEMORY DETAILS
                  </span>
                  
                  <h3 className="font-serif-editorial text-2xl sm:text-3xl font-bold text-[#FAF6F0]">
                    {selectedPhoto.title}
                  </h3>

                  <div className="space-y-2 font-mono-tech text-xs text-[#8E8D9A]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#E9C46A]" />
                      <span>{selectedPhoto.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#E9C46A]" />
                      <span>{selectedPhoto.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-editorial">
                    <p className="font-handwriting text-2xl text-[#E9C46A] mb-2">
                      "{selectedPhoto.handwrittenCaption}"
                    </p>
                    <p className="font-sans text-sm text-[#FAF6F0]/90 leading-relaxed">
                      {selectedPhoto.story}
                    </p>
                  </div>
                </div>

                <div className="font-mono-tech text-[11px] text-[#8E8D9A] pt-4 border-t border-editorial">
                  STATUS: VERIFIED CORE MEMORY
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
