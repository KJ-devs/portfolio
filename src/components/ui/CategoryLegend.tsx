'use client'

import { useTheme } from '@/hooks/useTheme'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { NeuronCategory } from '@/types/neuron'

const CATEGORIES: { id: NeuronCategory; label: string }[] = [
  { id: 'core',       label: 'Core'        },
  { id: 'skill',      label: 'Compétences' },
  { id: 'project',    label: 'Projets'     },
  { id: 'experience', label: 'Expériences' },
  { id: 'contact',    label: 'Contact'     },
]

export function CategoryLegend() {
  const activeCategories = usePortfolioStore((s) => s.activeCategories)
  const toggleCategory = usePortfolioStore((s) => s.toggleCategory)
  const theme = useTheme()

  return (
    <div className="fixed bottom-4 left-4 z-40 flex flex-col gap-1.5 rounded-xl border border-white/10 bg-black/30 p-3 backdrop-blur-md">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-white/30">
        Catégories
      </p>
      {CATEGORIES.map(({ id, label }) => {
        const isActive = activeCategories.includes(id)
        const color = theme.colors.categories[id]
        return (
          <button
            key={id}
            onClick={() => toggleCategory(id)}
            className="flex items-center gap-2 text-left transition-opacity"
            style={{ opacity: isActive ? 1 : 0.35 }}
          >
            <span
              className="h-2 w-2 flex-shrink-0 rounded-full transition-all"
              style={{
                backgroundColor: color,
                boxShadow: isActive ? `0 0 6px ${color}` : 'none',
              }}
            />
            <span className="font-mono text-xs text-white/70">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
