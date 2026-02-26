'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import { translations } from '@/lib/i18n'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { MediaItem } from '@/types/neuron'

interface Props {
  media: MediaItem[]
  onSelect: (index: number) => void
}

export function MediaStrip({ media, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLButtonElement[]>([])
  const language = usePortfolioStore((s) => s.language)
  const t = translations[language]

  useEffect(() => {
    const items = itemsRef.current.filter(Boolean)
    if (items.length === 0) return

    gsap.fromTo(
      items,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
    )
  }, [media])

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {t.gallery}
        </span>
        <span className="font-mono text-[10px] text-white/30">
          {(t.media_count as (n: number) => string)(media.length)}
        </span>
      </div>

      <div
        ref={containerRef}
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 scrollbar-thin"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
      >
        {media.map((item, i) => (
          <button
            key={item.src}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
            }}
            onClick={() => onSelect(i)}
            className="group relative flex-shrink-0 overflow-hidden rounded-lg opacity-0"
            style={{ width: 140, height: 80 }}
          >
            {item.type === 'video' ? (
              <div className="flex h-full w-full items-center justify-center bg-white/5">
                {item.thumbnail ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={item.thumbnail}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-violet-500/20 to-violet-900/20" />
                )}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-transform duration-200 group-hover:scale-110">
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                      <path d="M1 1.5v11l10-5.5L1 1.5z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent) {
                    const fallback = document.createElement('div')
                    fallback.className = 'w-full h-full bg-gradient-to-br from-violet-500/20 to-cyan-500/10 flex items-center justify-center'
                    fallback.innerHTML = '<span class="text-white/30 text-xs">Preview</span>'
                    parent.appendChild(fallback)
                  }
                }}
              />
            )}

            <div
              className="absolute inset-0 rounded-lg border border-transparent transition-all duration-200 group-hover:border-violet-500/50"
              style={{ boxShadow: 'inset 0 0 0 0 rgba(168, 85, 247, 0)' }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { boxShadow: 'inset 0 0 20px rgba(168, 85, 247, 0.15)', duration: 0.2 })
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { boxShadow: 'inset 0 0 0 0 rgba(168, 85, 247, 0)', duration: 0.2 })
              }}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
