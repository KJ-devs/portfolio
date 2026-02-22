'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import type { MediaItem } from '@/types/neuron'

import { VideoPlayer } from './VideoPlayer'

interface Props {
  media: MediaItem[]
  initialIndex: number
  onClose: () => void
}

function LightboxContent({ media, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const backdropRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const current = media[currentIndex] as MediaItem | undefined

  const animateOpen = useCallback(() => {
    const tl = gsap.timeline()
    tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    tl.fromTo(contentRef.current, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, '-=0.15')
    if (captionRef.current) {
      tl.fromTo(captionRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
    }
  }, [])

  const animateClose = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false
        onClose()
      },
    })
    tl.to(contentRef.current, { opacity: 0, scale: 0.9, duration: 0.4, ease: 'power2.in' })
    tl.to(backdropRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.15')
  }, [onClose])

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
      tl.to(contentRef.current, { opacity: 0, x: -40 * direction, duration: 0.35, ease: 'power2.in' })
      tl.call(() => setCurrentIndex(newIndex))
      tl.set(contentRef.current, { x: 40 * direction })
      tl.to(contentRef.current, { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' })
      if (captionRef.current) {
        tl.fromTo(captionRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.25')
      }
    },
    [currentIndex, media.length],
  )

  const goNext = useCallback(() => navigateTo(currentIndex + 1), [navigateTo, currentIndex])
  const goPrev = useCallback(() => navigateTo(currentIndex - 1), [navigateTo, currentIndex])

  useEffect(() => {
    animateOpen()
  }, [animateOpen])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') animateClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [animateClose, goNext, goPrev])

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
      if (Math.abs(diff) > 50) {
        if (diff > 0) goNext()
        else goPrev()
      }
    },
    [goNext, goPrev],
  )

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={animateClose}
        style={{ opacity: 0 }}
      />

      <button
        onClick={animateClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/60 backdrop-blur-sm">
        {currentIndex + 1} / {media.length}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={goPrev}
          className="absolute left-4 z-10 hidden rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:block"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {currentIndex < media.length - 1 && (
        <button
          onClick={goNext}
          className="absolute right-4 z-10 hidden rounded-full bg-white/10 p-3 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white md:block"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      <div
        ref={contentRef}
        className="relative z-[1] flex max-h-[85vh] max-w-[90vw] flex-col items-center"
        style={{ opacity: 0 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {current && current.type === 'video' ? (
          <div className="w-full max-w-4xl">
            <VideoPlayer src={current.src} poster={current.thumbnail} />
          </div>
        ) : current ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent) {
                const fallback = document.createElement('div')
                fallback.className = 'flex items-center justify-center rounded-lg bg-white/5 border border-white/10'
                fallback.style.width = '600px'
                fallback.style.height = '400px'
                fallback.innerHTML = '<div class="text-center"><div class="text-white/30 text-lg mb-2">Preview</div></div>'
                parent.appendChild(fallback)
              }
            }}
          />
        ) : null}

        {current?.caption && (
          <div
            ref={captionRef}
            className="mt-4 rounded-lg bg-white/5 px-4 py-2 text-center text-sm text-white/70 backdrop-blur-sm"
          >
            {current.caption}
          </div>
        )}
      </div>
    </div>
  )
}

export function MediaLightbox({ media, initialIndex, onClose }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!mounted) return null

  return createPortal(
    <LightboxContent media={media} initialIndex={initialIndex} onClose={onClose} />,
    document.body,
  )
}
