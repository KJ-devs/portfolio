'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

const INTRO_TEXT = 'Initializing Neural Network...'
const CHAR_INTERVAL_MS = 48 // ~1.5s for full text
const POST_TYPE_PAUSE_MS = 700

export function LoadingScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [displayText, setDisplayText] = useState('')
  const [mounted, setMounted] = useState(true)

  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const setIntroComplete = usePortfolioStore((s) => s.setIntroComplete)

  useEffect(() => {
    // Skip if intro already played (route re-render, HMR, etc.)
    if (isIntroComplete) {
      setMounted(false)
      return
    }

    let charIndex = 0
    // Phase 1: typewriter
    const typeTimer = setInterval(() => {
      charIndex++
      setDisplayText(INTRO_TEXT.slice(0, charIndex))

      if (charIndex >= INTRO_TEXT.length) {
        clearInterval(typeTimer)

        // Phase 2: pause → trigger neuron scale-in + dissolve overlay
        setTimeout(() => {
          setIntroComplete() // neurons begin scaling in (BFS staggered)

          if (overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 1.2,
              ease: 'power2.inOut',
              onComplete: () => setMounted(false),
            })
          }
        }, POST_TYPE_PAUSE_MS)
      }
    }, CHAR_INTERVAL_MS)

    return () => clearInterval(typeTimer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0F]"
    >
      {/* Decorative grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Subtitle */}
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400/50">
          Neural Portfolio
        </p>

        {/* Typewriter line */}
        <div className="flex items-center gap-0.5 font-mono text-lg text-white/90 tracking-wide min-h-[1.75rem]">
          <span>{displayText}</span>
          <span className="inline-block h-5 w-[2px] bg-cyan-400/80 animate-pulse" />
        </div>

        {/* Animated dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-cyan-400/30 animate-pulse"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
