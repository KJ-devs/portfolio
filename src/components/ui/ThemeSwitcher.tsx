'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { usePortfolioStore } from '@/stores/usePortfolioStore'
import { THEMES, THEME_ORDER } from '@/lib/themes'
import type { ThemeId } from '@/lib/themes'

const THEME_PREVIEW_COLORS: Record<ThemeId, string[]> = {
  cosmos: ['#F5E6CC', '#00D4FF', '#A855F7', '#10B981'],
  cyberpunk: ['#FFD700', '#FF0080', '#00FFFF', '#39FF14'],
  ocean: ['#E0F0FF', '#00E5CC', '#7B68EE', '#48D1CC'],
  crystal: ['#FFFFFF', '#88CCFF', '#CC88FF', '#88FFCC'],
}

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const activeTheme = usePortfolioStore((s) => s.activeTheme)
  const setActiveTheme = usePortfolioStore((s) => s.setActiveTheme)
  const panelRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLButtonElement[]>([])

  const currentTheme = THEMES[activeTheme]

  // Animate panel open/close
  useEffect(() => {
    if (!panelRef.current) return
    if (isOpen) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.9, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' },
      )
      // Stagger items
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.2, stagger: 0.05, ease: 'power2.out', delay: 0.1 },
      )
    }
  }, [isOpen])

  function handleSelect(themeId: ThemeId) {
    if (themeId === activeTheme) {
      setIsOpen(false)
      return
    }
    setActiveTheme(themeId)
    setIsOpen(false)
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-black/60"
      >
        {/* Theme color dots */}
        <div className="flex items-center gap-1">
          {THEME_PREVIEW_COLORS[activeTheme].map((color, i) => (
            <span
              key={i}
              className="block h-2 w-2 rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{
                background: color,
                boxShadow: `0 0 6px ${color}80`,
              }}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] tracking-wider text-white/60 transition-colors group-hover:text-white/90">
          {currentTheme.name}
        </span>
        <span
          className="text-white/30 transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          ▴
        </span>
      </button>

      {/* Theme selector panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur-2xl"
          style={{ minWidth: '240px' }}
        >
          {THEME_ORDER.map((themeId, index) => {
            const t = THEMES[themeId]
            const isActive = themeId === activeTheme
            const previewColors = THEME_PREVIEW_COLORS[themeId]

            return (
              <button
                key={themeId}
                ref={(el) => { if (el) itemsRef.current[index] = el }}
                onClick={() => handleSelect(themeId)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-white/10'
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Theme icon with glow */}
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm"
                  style={{
                    background: `${previewColors[0]}15`,
                    color: previewColors[0],
                    textShadow: isActive ? `0 0 8px ${previewColors[0]}` : 'none',
                  }}
                >
                  {t.icon}
                </span>

                {/* Theme info */}
                <div className="flex flex-1 flex-col items-start">
                  <span
                    className="font-mono text-xs font-medium"
                    style={{ color: isActive ? previewColors[0] : 'rgba(255,255,255,0.7)' }}
                  >
                    {t.name}
                  </span>
                  <span className="font-mono text-[10px] text-white/30">
                    {t.description}
                  </span>
                </div>

                {/* Color preview dots */}
                <div className="flex items-center gap-0.5">
                  {previewColors.map((color, i) => (
                    <span
                      key={i}
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: color,
                        boxShadow: isActive ? `0 0 4px ${color}` : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: previewColors[0],
                      boxShadow: `0 0 6px ${previewColors[0]}`,
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
