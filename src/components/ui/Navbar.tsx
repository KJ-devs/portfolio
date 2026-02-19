'use client'

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between border-b border-white/5 bg-black/20 px-6 py-3 backdrop-blur-md">
      {/* Name */}
      <span className="font-mono text-sm font-semibold tracking-widest text-white/80">
        SUNNY
      </span>

      {/* Links */}
      <div className="flex items-center gap-4">
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
    </nav>
  )
}
