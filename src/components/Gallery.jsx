import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { photosData } from '../data/photos';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const openLightbox = (index) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === 0 ? photosData.length - 1 : prev - 1));
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev === photosData.length - 1 ? 0 : prev + 1));
  };

  const selectedPhoto = selectedPhotoIndex !== null ? photosData[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-24 px-4 bg-pastel-cream relative overflow-hidden">
      {/* Background Subtle Sparkle accents */}
      <div className="absolute top-10 left-10 text-pink-200 pointer-events-none text-4xl select-none">✨</div>
      <div className="absolute bottom-10 right-10 text-purple-200 pointer-events-none text-4xl select-none">🌸</div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 text-pink-700 text-sm font-semibold mb-4 border border-pink-200">
            <Camera className="w-4 h-4" />
            <span>Memories Scrapbook</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-4">
            A Few Moments We Somehow Managed to Capture 📸
          </h2>
          <p className="text-lg text-slate-600 font-normal">
            Some beautiful. Some questionable. All memorable.
          </p>
        </div>

        {/* Polaroid Scrapbook Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 items-center justify-center pt-4 px-2">
          {photosData.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              style={{ transform: `rotate(${photo.rotation})` }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.3 },
              }}
              onClick={() => openLightbox(index)}
              className="cursor-pointer group relative bg-white p-4 pb-6 rounded-sm polaroid-shadow border border-slate-100 flex flex-col items-center transition-all duration-300"
            >
              {/* Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-pink-100/70 border border-pink-200/50 backdrop-blur-sm rotate-[-2deg] shadow-sm z-10 pointer-events-none" />

              {/* Tag Badge */}
              <div className="absolute top-6 right-6 bg-slate-900/70 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10">
                {photo.tag}
              </div>

              {/* Photo Container */}
              <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden rounded-sm relative mb-4">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback placeholder if image path fails
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Polaroid Handwritten Caption */}
              <div className="w-full text-center px-2">
                <p className="font-handwriting text-2xl text-slate-800 font-semibold tracking-wide group-hover:text-pink-600 transition-colors">
                  "{photo.caption}"
                </p>
                <p className="text-xs text-slate-400 font-mono mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to expand 🔍
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/60 text-white hover:bg-pink-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg transition-transform hover:scale-110"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-lg transition-transform hover:scale-110 md:right-auto md:left-[calc(66.666%-3rem)]"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="w-full md:w-2/3 bg-slate-950 flex items-center justify-center min-h-[300px] md:min-h-[480px]">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-full object-contain"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>

              {/* Details Side Panel */}
              <div className="w-full md:w-1/3 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full mb-3">
                    {selectedPhoto.tag}
                  </div>
                  <h3 className="font-handwriting text-3xl sm:text-4xl text-slate-800 font-bold mb-4">
                    "{selectedPhoto.caption}"
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A captured moment in time. One of those priceless memories that will always bring a smile.
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Photo {selectedPhotoIndex + 1} of {photosData.length}</span>
                  <span className="flex items-center gap-1 text-pink-500 font-medium">
                    <Heart className="w-3.5 h-3.5 fill-current" /> Sibling memory
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
