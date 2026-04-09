'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { MediaItem } from '@/types/neuron'

interface Props {
  media: MediaItem[]
  accentColor: string
}

export function ProjectImageSlider({ media, accentColor }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const current = media[currentIndex]

  const navigateTo = useCallback(
    (newIndex: number) => {
      if (isAnimating.current || newIndex === currentIndex) return
      if (newIndex < 0 || newIndex >= media.length) return

      isAnimating.current = true
      const direction = newIndex > currentIndex ? 1 : -1

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false
        },
      })
      tl.to(imageRef.current, { opacity: 0, x: -20 * direction, duration: 0.2, ease: 'power2.in' })
      tl.call(() => setCurrentIndex(newIndex))
      tl.set(imageRef.current, { x: 20 * direction })
      tl.to(imageRef.current, { opacity: 1, x: 0, duration: 0.3, ease: 'power3.out' })
    },
    [currentIndex, media.length],
  )

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      navigateTo(currentIndex + 1)
    },
    [navigateTo, currentIndex],
  )
  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      navigateTo(currentIndex - 1)
    },
    [navigateTo, currentIndex],
  )

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
        if (diff > 0) navigateTo(currentIndex + 1)
        else navigateTo(currentIndex - 1)
      }
    },
    [navigateTo, currentIndex],
  )

  return (
    <>
      <div
        className="group/slider mb-5 overflow-hidden rounded-lg"
        style={{ border: `1px solid ${accentColor}15` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <div
          ref={imageRef}
          className="cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          {current && current.type === 'video' ? (
            <div className="flex aspect-video w-full items-center justify-center bg-black/40">
              <svg width="24" height="24" viewBox="0 0 12 14" fill="none">
                <path d="M1 1.5v11l10-5.5L1 1.5z" fill="white" fillOpacity="0.5" />
              </svg>
            </div>
          ) : current ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={current.src}
              alt={current.alt}
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover/slider:scale-[1.03]"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  const fallback = document.createElement('div')
                  fallback.className = 'aspect-video w-full bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center'
                  fallback.innerHTML = '<span class="text-white/20 text-xs">Preview</span>'
                  parent.appendChild(fallback)
                }
              }}
            />
          ) : null}
        </div>

        {/* Bottom bar: dots + arrows */}
        {media.length > 1 && (
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{ background: 'rgba(0,0,0,0.3)' }}
          >
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex gap-1">
              {media.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateTo(i)
                  }}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 16 : 6,
                    background: i === currentIndex ? accentColor : 'rgba(255,255,255,0.2)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={currentIndex === media.length - 1}
              className="rounded-full p-1 text-white/40 transition-colors hover:text-white/80 disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <SliderLightbox
          media={media}
          initialIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}

/* ── Lightbox plein écran ── */

interface LightboxProps {
  media: MediaItem[]
  initialIndex: number
  onClose: () => void
}

function SliderLightbox({ media, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [mounted, setMounted] = useState(false)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const current = media[currentIndex]

  const animateClose = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        onClose()
      },
    })
    tl.to(contentRef.current, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' })
    tl.to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
  }, [onClose])

  const navigateTo = useCallback(
    (newIndex: number) => {
      if (isAnimating.current || newIndex < 0 || newIndex >= media.length || newIndex === currentIndex) return
      isAnimating.current = true
      const direction = newIndex > currentIndex ? 1 : -1
      const tl = gsap.timeline({ onComplete: () => { isAnimating.current = false } })
      tl.to(contentRef.current, { opacity: 0, x: -40 * direction, duration: 0.25, ease: 'power2.in' })
      tl.call(() => setCurrentIndex(newIndex))
      tl.set(contentRef.current, { x: 40 * direction })
      tl.to(contentRef.current, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' })
    },
    [currentIndex, media.length],
  )

  // Mount + open animation
  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  // Animate in after mount
  useEffect(() => {
    if (!mounted) return
    const tl = gsap.timeline()
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    tl.fromTo(contentRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, '-=0.15')
  }, [mounted])

  // Keyboard
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') animateClose()
      else if (e.key === 'ArrowRight') navigateTo(currentIndex + 1)
      else if (e.key === 'ArrowLeft') navigateTo(currentIndex - 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [animateClose, navigateTo, currentIndex])

  // Touch
  const touchStartX = useRef(0)

  if (!mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={animateClose}
        style={{ opacity: 0 }}
      />

      {/* Close */}
      <button
        onClick={animateClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/60 backdrop-blur-sm">
        {currentIndex + 1} / {media.length}
      </div>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          onClick={() => navigateTo(currentIndex - 1)}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Next */}
      {currentIndex < media.length - 1 && (
        <button
          onClick={() => navigateTo(currentIndex + 1)}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-[1] flex max-h-[85vh] max-w-[90vw] flex-col items-center"
        style={{ opacity: 0 }}
        onTouchStart={(e) => {
          const touch = e.touches[0]
          if (touch) touchStartX.current = touch.clientX
        }}
        onTouchEnd={(e) => {
          const touch = e.changedTouches[0]
          if (!touch) return
          const diff = touchStartX.current - touch.clientX
          if (Math.abs(diff) > 50) {
            if (diff > 0) navigateTo(currentIndex + 1)
            else navigateTo(currentIndex - 1)
          }
        }}
      >
        {current ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
          />
        ) : null}

        {current?.caption && (
          <div className="mt-4 rounded-lg bg-white/5 px-4 py-2 text-center text-sm text-white/70 backdrop-blur-sm">
            {current.caption}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
