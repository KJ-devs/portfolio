'use client'

import { useEffect, useRef, useState } from 'react'

import { NEURONS_BY_ID } from '@/data/neurons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

// Key nodes to visit, in narrative order: identity → experience → projects → skills → contact
const TOUR_SEQUENCE = [
  'me',
  'alternance',
  'master-ia',
  'supporthelper',
  'tiktok-edu',
  'typescript',
  'machine-learning',
  'github',
]

const STEP_DURATION_MS = 3800

export function TourButton() {
  const [isActive, setIsActive] = useState(false)
  const [step, setStep] = useState(0)
  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)
  const closePanel = usePortfolioStore((s) => s.closePanel)
  const setTourActive = usePortfolioStore((s) => s.setTourActive)
  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isActive) return

    const nodeId = TOUR_SEQUENCE[step]
    const neuron = nodeId ? NEURONS_BY_ID[nodeId] : undefined
    if (neuron) setSelectedNeuron(neuron)

    timerRef.current = setTimeout(() => {
      if (step < TOUR_SEQUENCE.length - 1) {
        setStep((s) => s + 1)
      } else {
        setIsActive(false)
        setStep(0)
        setTourActive(false)
        closePanel()
      }
    }, STEP_DURATION_MS)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isActive, step, setSelectedNeuron, closePanel, setTourActive])

  const startTour = () => {
    setTourActive(true)
    setStep(0)
    setIsActive(true)
  }

  const stopTour = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsActive(false)
    setStep(0)
    setTourActive(false)
    closePanel()
  }

  if (!isIntroComplete) return null

  return (
    <div className="fixed bottom-6 left-1/2 z-[55] -translate-x-1/2">
      {isActive ? (
        <button
          onClick={stopTour}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-sm transition-all hover:border-white/20"
        >
          {/* Progress dots */}
          <div className="flex gap-1">
            {TOUR_SEQUENCE.map((_, i) => (
              <div
                key={i}
                className="h-1 w-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === step ? '#00D4FF' : i < step ? '#00D4FF40' : '#ffffff15',
                  boxShadow: i === step ? '0 0 6px #00D4FF' : 'none',
                }}
              />
            ))}
          </div>
          <span className="font-mono text-xs text-white/40">Stop</span>
        </button>
      ) : (
        <button
          onClick={startTour}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 font-mono text-xs text-white/30 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white/60"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: '#00D4FF', boxShadow: '0 0 6px #00D4FF' }}
          />
          Give me a tour
        </button>
      )}
    </div>
  )
}
