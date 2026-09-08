import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { siteConfig } from '../data/config';

export default function MusicPlayer({ isAutoTriggered }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioContextRef = useRef(null);
  const intervalRef = useRef(null);

  // Soft piano synthesizer generator using Web Audio API (ensures audio works reliably without missing external file assets!)
  const playSynthesizedMelody = () => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Happy Birthday notes frequencies (G4, G4, A4, G4, C5, B4...)
      const notes = [
        { note: 392.00, duration: 0.4 }, // G4
        { note: 392.00, duration: 0.4 }, // G4
        { note: 440.00, duration: 0.8 }, // A4
        { note: 392.00, duration: 0.8 }, // G4
        { note: 523.25, duration: 0.8 }, // C5
        { note: 493.88, duration: 1.2 }, // B4
        
        { note: 392.00, duration: 0.4 }, // G4
        { note: 392.00, duration: 0.4 }, // G4
        { note: 440.00, duration: 0.8 }, // A4
        { note: 392.00, duration: 0.8 }, // G4
        { note: 587.33, duration: 0.8 }, // D5
        { note: 523.25, duration: 1.2 }, // C5
      ];

      let currentNoteIndex = 0;

      const playNextNote = () => {
        if (!isPlaying && !isAutoTriggered) return;

        const { note, duration } = notes[currentNoteIndex];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine'; // Soft sine wave piano sound
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        const volume = muted ? 0 : 0.12;
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration - 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);

        currentNoteIndex = (currentNoteIndex + 1) % notes.length;
      };

      playNextNote();
      intervalRef.current = setInterval(playNextNote, 800);
    } catch (err) {
      console.warn('Audio playback error:', err);
    }
  };

  const stopMelody = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopMelody();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playSynthesizedMelody();
    }
  };

  useEffect(() => {
    if (isAutoTriggered && !isPlaying) {
      setIsPlaying(true);
      playSynthesizedMelody();
    }
  }, [isAutoTriggered]);

  useEffect(() => {
    return () => stopMelody();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 pl-4 rounded-full shadow-lg border border-pink-200 text-slate-700 hover:shadow-xl transition-all">
        <div className="flex items-center gap-2 text-xs font-semibold text-pink-600">
          <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="hidden sm:inline">{siteConfig.musicTitle}</span>
        </div>

        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors shadow-sm"
          aria-label="Toggle music"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={() => setMuted(!muted)}
          className="p-2 rounded-full text-slate-500 hover:text-pink-600 transition-colors"
          aria-label="Toggle mute"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
