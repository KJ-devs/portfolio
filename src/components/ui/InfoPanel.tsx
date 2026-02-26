'use client'

import { gsap } from 'gsap'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import { useConnectedNeurons } from '@/hooks/useConnectedNeurons'
import { useTheme } from '@/hooks/useTheme'
import { translations } from '@/lib/i18n'
import { getTranslatedDescription, getTranslatedHighlights, getTranslatedLabel } from '@/lib/dataTranslations'
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
  const language = usePortfolioStore((s) => s.language)

  if (neuron.id === 'brain') {
    return <ChatPanel />
  }

  const description =
    getTranslatedDescription(neuron.id, neuron.category, language) ?? neuron.description
  const translatedTitle = getTranslatedLabel(neuron.id, neuron.category, language) ?? undefined

  const { metadata } = neuron
  switch (metadata.type) {
    case 'skill':
      return <SkillPanel meta={metadata} description={description} lang={language} />
    case 'project': {
      const highlights = getTranslatedHighlights(neuron.id, language) ?? metadata.highlights
      return <ProjectPanel meta={{ ...metadata, highlights }} description={description} />
    }
    case 'experience':
      return <ExperiencePanel meta={metadata} description={description} />
    case 'contact':
      return <ContactPanel meta={metadata} label={neuron.label} />
    case 'core':
      return <CorePanel meta={metadata} description={description} title={translatedTitle} />
  }
}

const CATEGORY_ICON: Record<string, string> = {
  core:       '◈',
  skill:      '◆',
  project:    '◉',
  experience: '◎',
  contact:    '◇',
}

// ─── Main Panel ──────────────────────────────────────────────────────────────

export function InfoPanel() {
  const panelRef = useRef<HTMLDivElement>(null)
  const accentBarRef = useRef<HTMLDivElement>(null)
  const theme = useTheme()

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const isPanelOpen = usePortfolioStore((s) => s.isPanelOpen)
  const closePanel = usePortfolioStore((s) => s.closePanel)
  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)
  const language = usePortfolioStore((s) => s.language)
  const t = translations[language]

  const CATEGORY_LABEL: Record<string, string> = {
    core:       t.category_core,
    skill:      t.category_skill,
    project:    t.category_project,
    experience: t.category_experience,
    contact:    t.category_contact,
  }

  const [displayedNeuron, setDisplayedNeuron] = useState<NeuronData | null>(null)
  useEffect(() => {
    if (selectedNeuron) setDisplayedNeuron(selectedNeuron)
  }, [selectedNeuron])

  const connectedNeurons = useConnectedNeurons(displayedNeuron)

  const accentColor = displayedNeuron
    ? theme.colors.categories[displayedNeuron.category]
    : theme.colors.categories.skill

  useLayoutEffect(() => {
    if (!panelRef.current) return
    if (window.innerWidth < 768) {
      gsap.set(panelRef.current, { y: '100%', x: 0 })
    } else {
      gsap.set(panelRef.current, { x: '100%', y: 0 })
    }
  }, [])

  // Animate accent bar width on open
  useEffect(() => {
    if (!accentBarRef.current) return
    if (isPanelOpen) {
      gsap.fromTo(accentBarRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 })
    }
  }, [isPanelOpen, displayedNeuron])

  useEffect(() => {
    if (!panelRef.current) return
    const el = panelRef.current
    const mobile = window.innerWidth < 768
    if (isPanelOpen) {
      // Enable pointer events when open
      el.style.pointerEvents = 'auto'
      const tween = mobile
        ? gsap.fromTo(el, { y: '100%' }, { y: '0%', duration: 0.45, ease: 'power3.out' })
        : gsap.fromTo(el, { x: '100%' }, { x: '0%', duration: 0.55, ease: 'power3.out' })
      return () => { tween.kill() }
    } else {
      const tween = mobile
        ? gsap.to(el, {
            y: '100%', duration: 0.3, ease: 'power2.in',
            onComplete: () => { el.style.pointerEvents = 'none' },
          })
        : gsap.to(el, {
            x: '100%', duration: 0.3, ease: 'power2.in',
            onComplete: () => { el.style.pointerEvents = 'none' },
          })
      return () => { tween.kill() }
    }
  }, [isPanelOpen])

  return (
    <div
      ref={panelRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[80vh] flex-col rounded-t-2xl bg-black/50 backdrop-blur-2xl md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-sm md:rounded-none"
      style={{
        pointerEvents: 'none',
        borderTop: `1px solid ${accentColor}25`,
        borderLeft: `1px solid ${accentColor}15`,
        boxShadow: `inset 0 0 80px ${accentColor}06, 0 0 60px rgba(0,0,0,0.7)`,
      }}
    >
      {/* Accent color top bar */}
      <div
        ref={accentBarRef}
        className="h-[2px] w-full origin-left"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60, transparent)`,
          transformOrigin: 'left center',
          transform: 'scaleX(0)',
        }}
      />

      {/* Header */}
      <div
        className="flex items-start justify-between p-6 pb-4"
        style={{ borderBottom: `1px solid ${accentColor}15` }}
      >
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <span
              className="font-mono text-xs"
              style={{ color: accentColor }}
            >
              {displayedNeuron ? (CATEGORY_ICON[displayedNeuron.category] ?? '◆') : '◆'}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: `${accentColor}90` }}
            >
              {displayedNeuron ? (CATEGORY_LABEL[displayedNeuron.category] ?? '') : ''}
            </span>
          </div>
          <h2 className="truncate text-xl font-semibold text-white/95 tracking-tight">
            {displayedNeuron?.label}
          </h2>
        </div>
        <button
          onClick={closePanel}
          className="ml-4 flex-shrink-0 rounded-lg p-2 text-white/40 transition-all hover:text-white/90"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          aria-label="Fermer le panel"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
      <div className="flex-1 space-y-6 overflow-y-auto p-6 pt-5">
        {displayedNeuron && <NeuronContent neuron={displayedNeuron} />}

        {connectedNeurons.length > 0 && (
          <div>
            <h3
              className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: `${accentColor}70` }}
            >
              {t.connections} ({connectedNeurons.length})
            </h3>
            <div className="flex flex-wrap gap-2">
              {connectedNeurons.map((n) => {
                const nColor = theme.colors.categories[n.category]
                return (
                  <button
                    key={n.id}
                    onClick={() => setSelectedNeuron(n)}
                    className="rounded-lg px-2.5 py-1 text-xs text-white/60 transition-all hover:text-white"
                    style={{
                      border: `1px solid ${nColor}30`,
                      background: `${nColor}08`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${nColor}18`
                      e.currentTarget.style.borderColor = `${nColor}60`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${nColor}08`
                      e.currentTarget.style.borderColor = `${nColor}30`
                    }}
                  >
                    {n.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
