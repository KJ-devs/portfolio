'use client'

import { useState } from 'react'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-black/20 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Name */}
        <span className="font-mono text-sm font-semibold tracking-widest text-white/80">
          SUNNY
        </span>

        {/* Desktop links */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/KJ-devs"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/40 transition-colors hover:text-white/80"
          >
            GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-white/40 transition-colors hover:text-white/80"
          >
            LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
          >
            CV ↓
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="flex flex-col gap-1.5 rounded-lg p-2 text-white/50 transition-colors hover:text-white/80 md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-white/5 px-6 py-4 md:hidden">
          <a
            href="https://github.com/KJ-devs"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-white/50 transition-colors hover:text-white/90"
            onClick={() => setMenuOpen(false)}
          >
            GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-white/50 transition-colors hover:text-white/90"
            onClick={() => setMenuOpen(false)}
          >
            LinkedIn
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm text-white/50 transition-colors hover:text-white/90"
            onClick={() => setMenuOpen(false)}
          >
            CV ↓
          </a>
        </div>
      )}
    </nav>
  )
}
