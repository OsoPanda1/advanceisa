/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Radio, ShieldCheck, SkipForward, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

const NARRATION_TEXT = "Hola, qué alegría saludarte en este espacio. Bienvenido a este tu espacio digital. Yo soy Isabella Villaseñor AI, una inteligencia artificial orgullosamente latinoamericana. He nacido para ser guía, apoyo y, si tú aceptas, ser tu compañera en este viaje donde deseamos mostrarte y mostrar al mundo un internet más seguro, más transparente y más ético, pero sobre todo, un internet más humano. Préparate porque aquí comienza una nueva era digital, soberana, ética, transformadora y como tú, más humana.";

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const [motion, setMotion] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (audioElRef.current) {
      audioElRef.current.muted = !audioEnabled;
      if (isPlaying && audioEnabled) {
        audioElRef.current.play().catch(() => {});
      } else {
        audioElRef.current.pause();
      }
    }
  }, [audioEnabled, isPlaying]);

  useEffect(() => {
    setMotion(matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // 56 seconds total duration (56,000 ms)
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = 560; // 100 steps over 56 seconds (56000 / 100 = 560ms per 1%)
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 0);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [onComplete, isPlaying]);

  // Web Audio API Ambient Pad & Speech Synthesis
  useEffect(() => {
    if (!audioEnabled || motion) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 ambient drone
      gain.gain.setValueAtTime(0.05, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;

      // Speech Synthesis Narration
      if ('speechSynthesis' in window && audioEnabled) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(NARRATION_TEXT);
        utterance.lang = 'es-MX';
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn('Web Audio / Speech synthesis not supported or blocked:', e);
    }

    return () => {
      try {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        }
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch (err) {
        // cleanup ignore
      }
    };
  }, [audioEnabled, motion]);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (audioEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    if (motion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);

      ctx.fillStyle = '#020817';
      ctx.fillRect(0, 0, w, h);

      // Starfield / Supernova particles
      for (let i = 0; i < 200; i++) {
        const x = (Math.sin(i * 123.45 + t * 0.1) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 67.89 - t * 0.15) * 0.5 + 0.5) * h;
        const alpha = 0.2 + 0.6 * Math.sin(i + t);
        ctx.fillStyle = i % 3 === 0 ? `rgba(216,168,90,${alpha})` : `rgba(98,196,210,${alpha})`;
        ctx.fillRect(x, y, 2, 2);
      }

      // Central core rings
      const cx = w / 2;
      const cy = h / 2;
      const radius = 100 + Math.sin(t * 1.5) * 16;

      ctx.strokeStyle = 'rgba(98,196,210,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(216,168,90,0.3)';
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.7, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [motion]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#020817] p-6 text-[#f4f6f5] md:p-12" role="region" aria-label="Isabella Cinematic Trailer">
      <audio
        ref={audioElRef}
        src="/assets/background-audio.mp3"
        autoPlay
        loop
        preload="auto"
        aria-hidden="true"
      />
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-[#62c4d2]/40 bg-[#071426] font-serif text-lg text-[#d8a85a]">
            IV
          </div>
          <div>
            <p className="font-medium tracking-wide">Isabella Villaseñor AI</p>
            <p className="font-mono text-[9px] tracking-[.25em] text-[#bfcac8]/60">SOVEREIGN COGNITIVE INFRASTRUCTURE &middot; 56s INTRO</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 rounded-xl border border-[#bfcac8]/20 bg-[#071426]/80 px-3 py-2 text-xs text-[#f4f6f5] transition hover:border-[#62c4d2]"
          >
            {audioEnabled ? <Volume2 className="size-3.5 text-[#53c6a0]" /> : <VolumeX className="size-3.5 text-rose-400" />}
            {audioEnabled ? 'Audio Activo' : 'Silenciado'}
          </button>
          <span className="flex items-center gap-2 font-mono text-xs text-[#53c6a0]">
            <Radio className="size-3 animate-pulse" /> {step}% (56s)
          </span>
          <button
            onClick={onComplete}
            className="flex items-center gap-2 rounded-xl border border-[#bfcac8]/20 bg-[#071426]/80 px-4 py-2 text-xs text-[#f4f6f5] transition hover:border-[#d8a85a] hover:text-[#d8a85a]"
          >
            <SkipForward className="size-3" /> Omitir trailer <ChevronRight className="size-3" />
          </button>
        </div>
      </header>

      <canvas ref={canvasRef} className="absolute inset-0 size-full pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <p className="mb-4 font-mono text-xs tracking-[0.3em] text-[#62c4d2]">CROWN STERN GOVERNANCE &middot; NARRATIVA SOBERANA</p>
        <h1 className="font-serif text-3xl leading-tight tracking-tight md:text-5xl text-balance">
          &ldquo;Hola, qué alegría saludarte en este espacio digital...&rdquo;
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#bfcac8]/80 md:text-base">
          {NARRATION_TEXT}
        </p>

        <div className="mx-auto mt-10 h-1.5 w-80 overflow-hidden rounded-full bg-[#bfcac8]/20">
          <div className="h-full bg-gradient-to-r from-[#62c4d2] to-[#d8a85a] transition-all duration-300" style={{ width: `${step}%` }} />
        </div>
      </div>

      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#bfcac8]/15 pt-4 font-mono text-[10px] text-[#bfcac8]/50">
        <span className="flex items-center gap-2">
          <ShieldCheck className="size-3.5 text-[#53c6a0]" /> Audio Background &middot; Transcripción Verificada &middot; Duración 56s
        </span>
        <span>REAL DEL MONTE &middot; MÉXICO</span>
      </footer>
    </div>
  );
}
