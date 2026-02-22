'use client'

import { useEffect, useRef, useState } from 'react'

import { NEURONS } from '@/data/neurons'
import { findPath } from '@/lib/pathfinding'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { NeuronData } from '@/types/neuron'
import { useTheme } from '@/hooks/useTheme'

// ─── Fuzzy filter ────────────────────────────────────────────────────────────

function matchesQuery(neuron: NeuronData, query: string): boolean {
  const q = query.toLowerCase()
  return (
    neuron.label.toLowerCase().includes(q) ||
    neuron.description.toLowerCase().includes(q)
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

const PATH_CLEAR_DELAY_MS = 4000

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const theme = useTheme()

  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)
  const setHighlightedPath = usePortfolioStore((s) => s.setHighlightedPath)

  // Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
    }
  }, [isOpen])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

  const results = query.length >= 1 ? NEURONS.filter((n) => matchesQuery(n, query)).slice(0, 8) : []

  function handleSelect(neuron: NeuronData) {
    setSelectedNeuron(neuron)

    // Compute BFS path from 'me' and highlight it temporarily
    const path = findPath('me', neuron.id)
    if (path && path.length > 1) {
      setHighlightedPath(path)
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
      clearTimerRef.current = setTimeout(() => setHighlightedPath(null), PATH_CLEAR_DELAY_MS)
    }

    setIsOpen(false)
  }

  return (
    <>
      {/* Trigger button (top center) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed left-1/2 top-14 z-50 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/50 backdrop-blur-md transition-colors hover:border-white/20 hover:text-white/80"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M9.5 9.5L12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span>Rechercher…</span>
          <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/30 md:inline">
            ⌘K
          </kbd>
        </button>
      )}

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} aria-hidden="true" />

          {/* Search box */}
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl">
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-white/40">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher un neurone…"
                className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
              <kbd
                onClick={() => setIsOpen(false)}
                className="cursor-pointer rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/30 hover:text-white/60"
              >
                Esc
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <ul className="max-h-64 overflow-y-auto py-1">
                {results.map((neuron) => (
                  <li key={neuron.id}>
                    <button
                      onClick={() => handleSelect(neuron)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-white/10"
                    >
                      {/* Category dot */}
                      <span
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: theme.colors.categories[neuron.category] }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-white">{neuron.label}</p>
                        <p className="truncate text-xs text-white/40">{neuron.description}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {query.length >= 1 && results.length === 0 && (
              <p className="px-4 py-4 text-sm text-white/30">Aucun résultat pour « {query} »</p>
            )}

            {query.length === 0 && (
              <p className="px-4 py-3 text-xs text-white/20">Tapez pour rechercher parmi {NEURONS.length} neurones</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
