import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, ArrowRight, RotateCcw, Award, Sparkles } from 'lucide-react';
import { questionsData, quizResultConfig } from '../data/questions';

export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questionsData[currentQuestionIndex];
  const isSelected = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectOption = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  return (
    <section id="questions" className="py-24 px-4 bg-gradient-to-b from-pastel-cream via-pink-50/50 to-pastel-cream relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4 border border-purple-200">
            <HelpCircle className="w-4 h-4" />
            <span>Interactive Quiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
            Okay... Let's See How Well You Know Yourself 😂
          </h2>
          <p className="text-slate-600 text-lg">
            Answer honestly. I already know the correct answers.
          </p>
        </div>

        {/* Main Quiz Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100 relative min-h-[420px] flex flex-col justify-between overflow-hidden">
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-bold tracking-wider text-pink-600 uppercase">
                  Question {currentQuestionIndex + 1} of {questionsData.length}
                </span>
                <div className="w-36 h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-300 rounded-full"
                    style={{
                      width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Question Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-8 leading-snug">
                    {currentQuestion.question}
                  </h3>

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {currentQuestion.options.map((option, idx) => {
                      const active = selectedAnswers[currentQuestionIndex] === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(idx)}
                          className={`p-4 rounded-2xl text-left font-medium text-base sm:text-lg transition-all duration-200 flex items-center justify-between border ${
                            active
                              ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-500/20 scale-[1.02]'
                              : 'bg-slate-50/80 text-slate-700 border-slate-200/80 hover:bg-pink-50 hover:border-pink-300'
                          }`}
                        >
                          <span>{option.text}</span>
                          {active && <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <div className="flex justify-end pt-4 border-t border-slate-100">
                <button
                  onClick={handleNext}
                  disabled={!isSelected}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    isSelected
                      ? 'bg-slate-900 text-white hover:bg-pink-600 shadow-md cursor-pointer hover:scale-105 active:scale-95'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentQuestionIndex === questionsData.length - 1 ? 'See Results 🎉' : 'Next →'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Final Result Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8 flex flex-col items-center justify-center my-auto"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-300 to-pink-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/20 animate-bounce">
                <Award className="w-10 h-10" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mb-2">
                {quizResultConfig.scoreText}
              </h3>

              <div className="text-5xl font-black text-pink-600 my-4 tracking-tight">
                {quizResultConfig.summaryScore}
              </div>

              <p className="font-handwriting text-3xl text-slate-700 max-w-md mx-auto mb-8 font-semibold">
                "{quizResultConfig.commentary}"
              </p>

              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pink-100 text-pink-700 font-semibold hover:bg-pink-200 transition-all hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{quizResultConfig.restartText}</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
