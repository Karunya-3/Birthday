import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckSquare, AlertOctagon, RotateCcw, ArrowRight } from 'lucide-react';
import { questionsData, quizResultConfig } from '../data/questions';
import { playKeyClick, playStampSound } from '../utils/audio';

export default function Interrogation({ onContinue }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [verdictRevealed, setVerdictRevealed] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questionsData[currentIndex];

  const handleSelectOption = (opt) => {
    if (verdictRevealed) return;
    playKeyClick();
    setSelectedOption(opt);
    setVerdictRevealed(true);
    playStampSound();

    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: opt.key
    }));
  };

  const handleNextQuestion = () => {
    playKeyClick();
    if (currentIndex < questionsData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setVerdictRevealed(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    playKeyClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setVerdictRevealed(false);
    setUserAnswers({});
    setIsComplete(false);
  };

  return (
    <section className="min-h-screen bg-[#121316] text-[#EFECE6] p-4 sm:p-8 font-mono flex items-center justify-center relative">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-3xl w-full bg-[#1A1C23] border border-[#333745] rounded-lg shadow-2xl p-6 sm:p-10 relative overflow-hidden z-10">
        
        {/* Header docket */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333745] pb-4 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold">
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>TERMINAL // INTERROGATION_MODULE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
              INTERROGATION ROOM
            </h2>
            <p className="text-zinc-400 font-sans text-xs italic">
              "We have a few questions for the subject."
            </p>
          </div>

          <div className="stamp-classified text-xs">
            DEPT_OF_SIBLINGS
          </div>
        </div>

        {!isComplete ? (
          <div className="space-y-6">
            
            {/* Progress tracker */}
            <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-[#333745] pb-2">
              <span className="text-amber-400 font-bold">{currentQ.code}</span>
              <span>QUESTIONS REMAINING: {questionsData.length - currentIndex}</span>
            </div>

            {/* Question Prompt Card */}
            <div className="bg-[#121316] border border-[#333745] p-5 rounded space-y-2">
              <span className="text-[11px] text-zinc-500 tracking-wider">[ INQUIRY PROMPT ]</span>
              <h3 className="text-lg sm:text-xl font-bold text-white font-sans leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOption?.key === opt.key;
                return (
                  <motion.button
                    key={opt.key}
                    whileHover={!verdictRevealed ? { x: 4 } : {}}
                    whileTap={!verdictRevealed ? { scale: 0.99 } : {}}
                    onClick={() => handleSelectOption(opt)}
                    disabled={verdictRevealed}
                    className={`w-full text-left p-4 rounded border transition-all font-mono text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-500 text-amber-200 font-semibold'
                        : verdictRevealed
                        ? 'bg-[#121316]/50 border-[#333745]/50 text-zinc-500 cursor-not-allowed'
                        : 'bg-[#121316] hover:bg-[#22252F] border-[#333745] text-zinc-200 hover:border-zinc-500'
                    }`}
                  >
                    <span className="font-bold text-amber-500 shrink-0">
                      [ {opt.key} ]
                    </span>
                    <span className="font-sans text-sm">{opt.label}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* System Analysis & Verdict Box */}
            <AnimatePresence>
              {verdictRevealed && selectedOption && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#121316] border-2 border-red-800/80 p-5 rounded space-y-3 font-mono text-xs text-left"
                >
                  <div className="flex items-center gap-2 text-red-400 font-bold border-b border-red-900/50 pb-2">
                    <AlertOctagon className="w-4 h-4 text-red-500 animate-pulse" />
                    <span>SYSTEM ANALYSIS RESULT:</span>
                  </div>

                  <p className="text-zinc-400">ANSWER RECORDED: [{selectedOption.key}] {selectedOption.label}</p>

                  <div className="bg-red-950/40 border border-red-800/50 p-3 rounded text-red-300 font-bold text-sm tracking-wide">
                    {selectedOption.verdict}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold py-2.5 px-6 rounded transition-all flex items-center gap-2 text-xs cursor-pointer shadow"
                    >
                      <span>
                        {currentIndex < questionsData.length - 1 ? 'NEXT QUESTION' : 'VIEW FINAL REPORT'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          /* Completion State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 text-center py-4"
          >
            <CheckSquare className="w-12 h-12 text-emerald-400 mx-auto" />
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-wider text-emerald-400">
                {quizResultConfig.header}
              </h3>
              <p className="text-zinc-300 font-sans text-lg">
                {quizResultConfig.subtext}
              </p>
            </div>

            <div className="bg-[#121316] border border-[#333745] p-4 rounded text-xs font-mono text-zinc-400 max-w-md mx-auto">
              "{quizResultConfig.note}"
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="bg-[#22252F] hover:bg-[#2A2E3B] border border-[#333745] text-zinc-300 text-xs font-bold py-3 px-6 rounded transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{quizResultConfig.restartText}</span>
              </button>

              {onContinue && (
                <button
                  onClick={() => {
                    playKeyClick();
                    onContinue();
                  }}
                  className="bg-[#EFECE6] hover:bg-white text-[#121316] text-xs font-bold py-3 px-6 rounded shadow transition-all cursor-pointer"
                >
                  PROCEED TO LEGAL CASE NO. 001 →
                </button>
              )}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
