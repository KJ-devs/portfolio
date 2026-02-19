'use client'

import { gsap } from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useConnectedNeurons } from '@/hooks/useConnectedNeurons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { NeuronData } from '@/types/neuron'

import { ChatPanel } from './panels/ChatPanel'
import { ContactPanel } from './panels/ContactPanel'
import { CorePanel } from './panels/CorePanel'
import { ExperiencePanel } from './panels/ExperiencePanel'
import { ProjectPanel } from './panels/ProjectPanel'
import { SkillPanel } from './panels/SkillPanel'

// ─── Dispatch content per neuron type ────────────────────────────────────────

function NeuronContent({ neuron }: { neuron: NeuronData }) {
  // Easter egg — brain neuron shows chatbot interface
  if (neuron.id === 'brain') {
    return <ChatPanel />
  }

  const { metadata } = neuron
  switch (metadata.type) {
    case 'skill':
      return <SkillPanel meta={metadata} description={neuron.description} />
    case 'project':
      return <ProjectPanel meta={metadata} description={neuron.description} />
    case 'experience':
      return <ExperiencePanel meta={metadata} description={neuron.description} />
    case 'contact':
      return <ContactPanel meta={metadata} label={neuron.label} />
    case 'core':
      return <CorePanel meta={metadata} description={neuron.description} />
  }
}

const CATEGORY_LABEL: Record<string, string> = {
  core: 'Core',
  skill: 'Compétence',
  project: 'Projet',
  experience: 'Expérience',
  contact: 'Contact',
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export function InfoPanel() {
  const panelRef = useRef<HTMLDivElement>(null)

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const isPanelOpen = usePortfolioStore((s) => s.isPanelOpen)
  const closePanel = usePortfolioStore((s) => s.closePanel)
  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)

  // Preserve content during exit animation
  const [displayedNeuron, setDisplayedNeuron] = useState<NeuronData | null>(null)
  useEffect(() => {
    if (selectedNeuron) setDisplayedNeuron(selectedNeuron)
  }, [selectedNeuron])

  const connectedNeurons = useConnectedNeurons(displayedNeuron)

  // Set initial off-screen position based on viewport (mobile = bottom, desktop = right)
  useLayoutEffect(() => {
    if (!panelRef.current) return
    if (window.innerWidth < 768) {
      gsap.set(panelRef.current, { y: '100%', x: 0 })
    } else {
      gsap.set(panelRef.current, { x: '100%', y: 0 })
    }
  }, [])

  // Slide in/out — direction depends on viewport
  useEffect(() => {
    if (!panelRef.current) return
    const el = panelRef.current
    const mobile = window.innerWidth < 768
    if (isPanelOpen) {
      const tween = mobile
        ? gsap.fromTo(el, { y: '100%' }, { y: '0%', duration: 0.4, ease: 'power2.out' })
        : gsap.fromTo(el, { x: '100%' }, { x: '0%', duration: 0.6, ease: 'power2.out' })
      return () => { tween.kill() }
    } else {
      const tween = mobile
        ? gsap.to(el, { y: '100%', duration: 0.3, ease: 'power2.in' })
        : gsap.to(el, { x: '100%', duration: 0.3, ease: 'power2.in' })
      return () => { tween.kill() }
    }
  }, [isPanelOpen])

  return (
    <>
      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[80vh] flex-col rounded-t-2xl border-t border-white/10 bg-black/40 backdrop-blur-xl md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-sm md:rounded-none md:border-l md:border-t-0 md:shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div className="min-w-0 flex-1">
            <span className="font-mono text-xs uppercase tracking-widest text-white/40">
              {displayedNeuron ? (CATEGORY_LABEL[displayedNeuron.category] ?? '') : ''}
            </span>
            <h2 className="mt-1 truncate text-xl font-semibold text-white">
              {displayedNeuron?.label}
            </h2>
          </div>
          <button
            onClick={closePanel}
            className="ml-4 flex-shrink-0 rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Fermer le panel"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-6">
          {displayedNeuron && <NeuronContent neuron={displayedNeuron} />}

          {connectedNeurons.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">
                Connexions ({connectedNeurons.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {connectedNeurons.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNeuron(n)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/60 transition-all hover:border-white/20 hover:bg-white/15 hover:text-white"
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
