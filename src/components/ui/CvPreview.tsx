'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function CvPreview() {
  const isOpen = usePortfolioStore((s) => s.isCvPreviewOpen)
  const close = usePortfolioStore((s) => s.setCvPreviewOpen)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, close])

  if (!isOpen) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === backdropRef.current) close(false)
      }}
    >
      <div className="relative flex h-[85vh] w-[90vw] max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0F]/95 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="font-mono text-sm text-white/60">CV — J.Krebs</span>
          <div className="flex items-center gap-3">
            <a
              href="/cv.pdf"
              download="CV_JKrebs.pdf"
              className="rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white/90"
            >
              Telecharger PDF
            </a>
            <button
              onClick={() => close(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/10 hover:text-white/80"
              aria-label="Fermer"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF embed */}
        <div className="flex-1 bg-white/5">
          <iframe
            src="/cv.pdf"
            className="h-full w-full"
            title="CV Preview"
          />
        </div>
      </div>
    </div>
  )
}
