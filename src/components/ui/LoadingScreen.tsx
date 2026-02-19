'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

const INTRO_TEXT = 'Initializing Neural Network...'
const CHAR_INTERVAL_MS = 48
const POST_TYPE_PAUSE_MS = 600

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = useState('')
  const [mounted, setMounted] = useState(true)

  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const setIntroComplete = usePortfolioStore((s) => s.setIntroComplete)

  useEffect(() => {
    if (isIntroComplete) {
      setMounted(false)
      return
    }

    let charIndex = 0
    const typeTimer = setInterval(() => {
      charIndex++
      setDisplayText(INTRO_TEXT.slice(0, charIndex))

      if (charIndex >= INTRO_TEXT.length) {
        clearInterval(typeTimer)

        setTimeout(() => {
          setIntroComplete()

          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 1.4,
              ease: 'power2.inOut',
              onComplete: () => setMounted(false),
            })
          }
        }, POST_TYPE_PAUSE_MS)
      }
    }, CHAR_INTERVAL_MS)

    return () => clearInterval(typeTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0F]"
    >
      <style>{`
        @keyframes orbit-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-core {
          0%, 100% {
            box-shadow: 0 0 12px #00D4FF, 0 0 28px #00D4FF60, 0 0 50px #00D4FF20;
          }
          50% {
            box-shadow: 0 0 24px #00D4FF, 0 0 50px #00D4FF80, 0 0 90px #00D4FF30;
          }
        }
        @keyframes scan {
          0%   { top: -2px; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes ring-appear {
          from { opacity: 0; transform: rotate(0deg) scale(0.5); }
          to   { opacity: 1; transform: rotate(0deg) scale(1); }
        }
      `}</style>

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Scanning line */}
      <div
        className="pointer-events-none absolute left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.5) 30%, rgba(0,212,255,0.8) 50%, rgba(0,212,255,0.5) 70%, transparent 100%)',
          animation: 'scan 3.5s ease-in-out infinite',
        }}
      />

      {/* Neural orb */}
      <div className="relative mb-10 flex items-center justify-center" style={{ width: 160, height: 160 }}>
        {/* Outermost ring — slow clockwise */}
        <div
          className="absolute rounded-full border border-cyan-400/10"
          style={{
            width: 156,
            height: 156,
            animation: 'orbit-cw 8s linear infinite',
          }}
        >
          <div
            className="absolute rounded-full bg-cyan-400/80"
            style={{ width: 6, height: 6, top: -3, left: '50%', marginLeft: -3 }}
          />
        </div>

        {/* Outer ring — clockwise */}
        <div
          className="absolute rounded-full border border-cyan-400/20"
          style={{
            width: 130,
            height: 130,
            animation: 'orbit-cw 5s linear infinite',
          }}
        >
          <div
            className="absolute rounded-full bg-purple-400/90"
            style={{ width: 5, height: 5, top: -2.5, left: '50%', marginLeft: -2.5 }}
          />
        </div>

        {/* Middle ring — counter-clockwise */}
        <div
          className="absolute rounded-full border border-cyan-400/30"
          style={{
            width: 100,
            height: 100,
            animation: 'orbit-ccw 3.5s linear infinite',
          }}
        >
          <div
            className="absolute rounded-full bg-cyan-300"
            style={{ width: 4, height: 4, top: -2, left: '50%', marginLeft: -2 }}
          />
        </div>

        {/* Inner ring — clockwise fast */}
        <div
          className="absolute rounded-full border border-purple-400/25"
          style={{
            width: 70,
            height: 70,
            animation: 'orbit-cw 2.5s linear infinite',
          }}
        />

        {/* Core */}
        <div
          className="relative z-10 rounded-full bg-cyan-400"
          style={{
            width: 20,
            height: 20,
            animation: 'pulse-core 2s ease-in-out infinite',
          }}
        />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-cyan-400/40">
          Neural Portfolio
        </p>

        <div className="flex items-center gap-0.5 font-mono text-sm text-white/85 tracking-wide" style={{ minHeight: '1.5rem' }}>
          <span>{displayText}</span>
          <span
            className="inline-block w-[2px] bg-cyan-400/90 animate-pulse"
            style={{ height: '1em' }}
          />
        </div>

        {/* Progress dots */}
        <div className="flex gap-3 mt-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full bg-cyan-400/25 animate-pulse"
              style={{
                width: i === 1 || i === 2 ? 8 : 5,
                height: i === 1 || i === 2 ? 8 : 5,
                animationDelay: `${i * 0.25}s`,
                boxShadow: i === 1 || i === 2 ? '0 0 6px #00D4FF80' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
