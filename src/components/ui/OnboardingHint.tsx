'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function OnboardingHint() {
  const divRef = useRef<HTMLDivElement>(null)
  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  // Fade in once intro is done, auto-dismiss after 5s
  useEffect(() => {
    if (!isIntroComplete || !divRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        divRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.8 },
      )
      gsap.to(divRef.current, {
        opacity: 0,
        y: -6,
        duration: 0.5,
        ease: 'power2.in',
        delay: 6,
      })
    })
    return () => ctx.revert()
  }, [isIntroComplete])

  // Dismiss immediately on first interaction
  useEffect(() => {
    if (selectedNeuron && divRef.current) {
      gsap.to(divRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [selectedNeuron])

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed bottom-24 left-1/2 z-20 -translate-x-1/2"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-black/50 px-5 py-2.5 backdrop-blur-sm">
        <div
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-neural-skill"
          style={{ boxShadow: '0 0 8px #00D4FF' }}
        />
        <span className="font-mono text-xs tracking-wide text-white/40">
          Click any node to explore
        </span>
      </div>
    </div>
  )
}
