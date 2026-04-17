'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

import { translations } from '@/lib/i18n'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { MediaItem } from '@/types/neuron'

interface Props {
  media: MediaItem[]
  onSelect: (index: number) => void
}

export function MediaStrip({ media, onSelect }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)
  const language = usePortfolioStore((s) => s.language)
  const t = translations[language]

  const current = media[currentIndex]

  useEffect(() => {
    if (!containerRef.current) return
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    )
  }, [])

  const navigateTo = useCallback(
    (newIndex: number) => {
      if (isAnimating.current || newIndex === currentIndex) return
      if (newIndex < 0 || newIndex >= media.length) return

      isAnimating.current = true

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false
        },
      })
      tl.to(imageRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' })
      tl.call(() => setCurrentIndex(newIndex))
      tl.to(imageRef.current, { opacity: 1, duration: 0.25, ease: 'power3.out' })
    },
    [currentIndex, media.length]
  )

  const goNext = useCallback(() => navigateTo(currentIndex + 1), [navigateTo, currentIndex])
  const goPrev = useCallback(() => navigateTo(currentIndex - 1), [navigateTo, currentIndex])

  // Touch/swipe support
  const touchStartX = useRef(0)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (touch) touchStartX.current = touch.clientX
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.changedTouches[0]
      if (!touch) return
      const diff = touchStartX.current - touch.clientX
      if (Math.abs(diff) > 40) {
        if (diff > 0) goNext()
        else goPrev()
      }
    },
    [goNext, goPrev]
  )

  return (
    <div ref={containerRef} className="space-y-2" style={{ opacity: 0 }}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          {t.gallery}
        </span>
        <span className="font-mono text-[10px] text-white/30">
          {currentIndex + 1} / {media.length}
        </span>
      </div>

      {/* Main image slider */}
      <div
        className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={imageRef} className="cursor-pointer" onClick={() => onSelect(currentIndex)}>
          {current && current.type === 'video' ? (
            <div className="flex aspect-video w-full items-center justify-center bg-black/40">
              {current.thumbnail ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={current.thumbnail}
                  alt={current.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-linear-to-br from-violet-500/20 to-violet-900/20" />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm">
                  <svg width="16" height="18" viewBox="0 0 12 14" fill="none">
                    <path d="M1 1.5v11l10-5.5L1 1.5z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          ) : current ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.src}
              alt={current.alt}
              className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className =
                    'aspect-video w-full bg-linear-to-br from-violet-500/20 to-cyan-500/10 flex items-center justify-center'
                  fallback.innerHTML = '<span class="text-white/30 text-xs">Preview</span>'
                  parent.appendChild(fallback)
                }
              }}
            />
          ) : null}
        </div>

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 4l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        {currentIndex < media.length - 1 && (
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-1.5 text-white/70 opacity-0 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white group-hover:opacity-100"
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Caption */}
      {current?.caption && <p className="text-center text-xs text-white/50">{current.caption}</p>}

      {/* Dot indicators */}
      {media.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => navigateTo(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-4 bg-violet-400' : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
