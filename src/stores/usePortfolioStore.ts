'use client'

import { create } from 'zustand'
import type { NeuronCategory, NeuronData } from '@/types/neuron'

interface PortfolioStore {
  // State
  selectedNeuron: NeuronData | null
  hoveredNeuron: string | null
  searchQuery: string
  activeCategories: NeuronCategory[]
  isIntroComplete: boolean
  isPanelOpen: boolean
  highlightedPath: string[] | null
  activeView: 'hr' | 'neural'

  // Actions
  setSelectedNeuron: (neuron: NeuronData | null) => void
  setHoveredNeuron: (id: string | null) => void
  setSearchQuery: (query: string) => void
  toggleCategory: (category: NeuronCategory) => void
  setIntroComplete: () => void
  setPanelOpen: (open: boolean) => void
  closePanel: () => void
  setHighlightedPath: (path: string[] | null) => void
  setActiveView: (view: 'hr' | 'neural') => void
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  // Initial state
  selectedNeuron: null,
  hoveredNeuron: null,
  searchQuery: '',
  activeCategories: ['core', 'skill', 'project', 'experience', 'contact'],
  isIntroComplete: false,
  isPanelOpen: false,
  highlightedPath: null,
  activeView: 'hr',

  // Actions
  setSelectedNeuron: (neuron) =>
    set({ selectedNeuron: neuron, isPanelOpen: neuron !== null }),

  setHoveredNeuron: (id) =>
    set({ hoveredNeuron: id }),

  setSearchQuery: (query) =>
    set({ searchQuery: query }),

  toggleCategory: (category) =>
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((c) => c !== category)
        : [...state.activeCategories, category],
    })),

  setIntroComplete: () =>
    set({ isIntroComplete: true }),

  setPanelOpen: (open) =>
    set({ isPanelOpen: open }),

  closePanel: () =>
    set({ selectedNeuron: null, isPanelOpen: false }),

  setHighlightedPath: (path) =>
    set({ highlightedPath: path }),

  setActiveView: (view) =>
    set({ activeView: view }),
}))
