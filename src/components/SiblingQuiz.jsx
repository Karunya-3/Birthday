import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../data/config';
import { Sparkles, MessageSquare, ArrowRight, RotateCcw } from 'lucide-react';

export default function SiblingQuiz({ onContinue }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = siteConfig.questions;
  const currentQ = questions[currentIdx];

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsCompleted(false);
  };

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0C] text-[#FAF6F0] flex flex-col items-center justify-center px-4 sm:px-8 py-20 overflow-hidden bg-noise border-b border-editorial select-none">
      
      {/* Background Section Tag */}
      <div className="absolute top-8 left-6 sm:left-12 font-mono-tech text-xs tracking-widest text-[#8E8D9A] uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C1121F]" />
        <span>05 // HOW WELL DO YOU KNOW YOURSELF?</span>
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center justify-center min-h-[60vh]">
        
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            /* Active Question Screen (Single Question Full Screen) */
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center space-y-10"
            >
              {/* Question Progress Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141417] border border-editorial font-mono-tech text-xs text-[#E9C46A]">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>QUESTION {currentIdx + 1} OF {questions.length}</span>
              </div>

              {/* Big Question Typography */}
              <h2 className="font-serif-editorial text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF6F0] leading-tight max-w-3xl mx-auto">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto pt-4">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption?.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-5 text-left border font-mono-tech text-sm transition-all duration-300 flex flex-col justify-between space-y-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#C1121F] border-[#C1121F] text-white shadow-xl scale-105'
                          : 'bg-[#141417] border-editorial hover:border-[#C1121F] text-[#FAF6F0] hover:bg-[#1A1A1F]'
                      }`}
                    >
                      <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#E9C46A]'}`}>
                        [{opt.label}]
                      </span>
                      <span className="font-sans text-base font-semibold leading-snug">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Immediate Sibling Reaction Banner */}
              <AnimatePresence>
                {selectedOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="max-w-xl mx-auto pt-6 space-y-6"
                  >
                    <div className="bg-[#141417] border border-[#C1121F] p-5 text-left space-y-2 relative shadow-2xl">
                      <span className="font-mono-tech text-[10px] text-[#C1121F] font-bold uppercase tracking-widest block">
                        SIBLING VERDICT // REACTION
                      </span>
                      <p className="font-handwriting text-2xl text-[#E9C46A]">
                        "{selectedOption.response}"
                      </p>
                    </div>

                    {/* Next Question Button */}
                    <button
                      onClick={handleNextQuestion}
                      className="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FAF6F0] text-[#0A0A0C] font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-[#C1121F] hover:text-white transition-all rounded-full"
                    >
                      <span>{currentIdx + 1 === questions.length ? "VIEW RESULT" : "NEXT QUESTION"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          ) : (
            /* Result Screen */
            <motion.div
              key="quiz-result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-center space-y-8 max-w-xl mx-auto"
            >
              <span className="font-mono-tech text-xs tracking-widest text-[#E9C46A] uppercase font-bold">
                {siteConfig.quizResult.header}
              </span>

              <div className="space-y-2">
                <h2 className="font-serif-editorial text-5xl sm:text-7xl font-extrabold text-[#FAF6F0]">
                  {siteConfig.quizResult.title}
                </h2>
                <p className="font-handwriting text-3xl text-[#C1121F] italic">
                  "{siteConfig.quizResult.subtitle}"
                </p>
              </div>

              <p className="font-mono-tech text-xs text-[#8E8D9A] max-w-md mx-auto">
                All 5 questions answered. Your self-awareness score is shockingly high, though your innocence score remains zero.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={onContinue}
                  className="px-8 py-3.5 bg-[#C1121F] text-white font-mono-tech text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-[#0A0A0C] transition-all rounded-full shadow-xl"
                >
                  {siteConfig.quizResult.continueButton} →
                </button>
                <button
                  onClick={handleRestart}
                  className="px-6 py-3.5 border border-editorial text-[#8E8D9A] hover:text-white font-mono-tech text-xs tracking-widest uppercase transition-all rounded-full flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> RE-TAKE QUIZ
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}
