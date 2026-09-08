import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, AlertTriangle, FileText, ChevronDown, ChevronUp, Scale } from 'lucide-react';
import { siteConfig } from '../data/config';
import { roastsData, caseSummaryConfig } from '../data/roasts';
import { playFolderClick, playStampSound } from '../utils/audio';

export default function CaseRoast({ onContinue }) {
  const [expandedCharge, setExpandedCharge] = useState(roastsData[0]?.id || null);

  const toggleCharge = (id) => {
    playFolderClick();
    setExpandedCharge(prev => prev === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-[#121316] text-[#EFECE6] p-4 sm:p-8 font-mono relative">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-lines opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        
        {/* Header docket */}
        <div className="bg-[#1A1C23] border border-[#333745] rounded-lg p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#333745] pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-red-500">
                <Scale className="w-4 h-4 text-red-500" />
                <span>OFFICIAL COURT DOCKET // SIBLING TRIBUNAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider">
                THE CASE AGAINST {siteConfig.sisterName.toUpperCase()}
              </h2>
            </div>

            <div className="stamp-guilty">
              {caseSummaryConfig.verdictStamp}
            </div>
          </div>

          {/* Evidence bar readout */}
          <div className="bg-[#121316] border border-[#333745] p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-zinc-500">DOCKET REF: </span>
              <span className="text-zinc-200 font-bold">{caseSummaryConfig.caseNumber}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-zinc-500">EVIDENCE LEVEL:</span>
              <span className="text-red-400 font-bold tracking-widest">{caseSummaryConfig.evidenceLevel}</span>
            </div>

            <div>
              <span className="text-zinc-500">VERDICT: </span>
              <span className="text-red-500 font-extrabold">GUILTY</span>
            </div>
          </div>

        </div>

        {/* List of Legal Charges */}
        <div className="space-y-4">
          <div className="text-xs text-zinc-400 font-mono tracking-wider flex items-center justify-between">
            <span>REGISTERED CHARGES ({roastsData.length})</span>
            <span>CLICK FILE TO EXPAND EVIDENCE</span>
          </div>

          {roastsData.map((charge) => {
            const isExpanded = expandedCharge === charge.id;
            return (
              <div
                key={charge.id}
                className="bg-[#1A1C23] border border-[#333745] rounded-lg overflow-hidden transition-colors shadow-lg"
              >
                {/* Charge Header Bar */}
                <button
                  onClick={() => toggleCharge(charge.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-[#22252F] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-red-950/70 border border-red-800/60 text-red-400 text-xs font-bold px-2.5 py-1 rounded">
                      {charge.chargeNumber}
                    </span>
                    <span className="font-sans font-bold text-sm sm:text-base text-zinc-100">
                      {charge.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-[11px] text-amber-500 font-mono bg-amber-950/30 border border-amber-900/40 px-2 py-0.5 rounded">
                      {charge.severity}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </div>
                </button>

                {/* Expanded Charge Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-[#333745] bg-[#121316] p-5 space-y-3 font-mono text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[10px] uppercase tracking-wider">OFFENSE SPECIFICATION:</span>
                        <p className="font-sans text-sm text-zinc-200 leading-relaxed bg-[#1A1C23] p-3 rounded border border-[#333745]">
                          "{charge.description}"
                        </p>
                      </div>

                      <div className="flex justify-between items-center text-[11px] text-zinc-400 border-t border-[#22252F] pt-2">
                        <span>SENTENCE PENALTY:</span>
                        <span className="text-amber-400 font-semibold">{charge.penalty}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Final Legal Verdict & Sentence Box */}
        <div className="bg-[#1A1C23] border-2 border-red-800/80 rounded-lg p-6 sm:p-8 text-center space-y-4 shadow-2xl relative overflow-hidden">
          <Gavel className="w-10 h-10 text-red-500 mx-auto" />
          
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 tracking-widest uppercase">FINAL JUDGMENT</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-red-400 tracking-wide font-sans">
              {caseSummaryConfig.finalVerdictText}
            </h3>
          </div>

          <div className="bg-red-950/40 border border-red-800/60 p-4 rounded max-w-md mx-auto text-amber-300 font-bold text-base sm:text-lg tracking-wide font-sans">
            "{caseSummaryConfig.sentenceText}"
          </div>

          <p className="text-xs text-zinc-500 font-mono italic">
            {caseSummaryConfig.closingNote}
          </p>

          {onContinue && (
            <div className="pt-4">
              <button
                onClick={() => {
                  playStampSound();
                  onContinue();
                }}
                className="bg-[#EFECE6] hover:bg-white text-[#121316] font-mono font-bold text-xs py-3.5 px-8 rounded shadow transition-all cursor-pointer"
              >
                PROCEED TO RECOVERED MESSAGES →
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
