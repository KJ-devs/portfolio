'use client'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function HeroSection() {
  const setActiveView = usePortfolioStore((s) => s.setActiveView)

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      {/* Subtle radial glow behind the name */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Eyebrow */}
      <p className="mb-4 font-mono text-xs tracking-[0.3em] text-white/30 uppercase">
        Portfolio — Développeur Fullstack
      </p>

      {/* Name */}
      <h1
        className="mb-3 font-mono text-7xl font-bold tracking-tight md:text-9xl"
        style={{
          background: 'linear-gradient(135deg, #F5E6CC 0%, #00D4FF 60%, #A855F7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Sunny
      </h1>

      {/* Title */}
      <p className="mb-2 text-lg font-medium text-white/70 md:text-xl">
        Développeur Fullstack
      </p>
      <p className="mb-8 font-mono text-sm text-white/40">
        Master IA &amp; Big Data · Alternance 2023 – Présent
      </p>

      {/* Bio */}
      <p className="mb-10 max-w-xl text-base leading-relaxed text-white/50">
        Passionné par les interfaces innovantes et l&apos;IA, je conçois des applications web
        full-stack robustes — du backend NestJS aux expériences front immersives en Three.js.
      </p>

      {/* CTA buttons */}
      <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-neural-skill/30 bg-neural-skill/10 px-5 py-2.5 font-mono text-sm text-neural-skill transition-all hover:border-neural-skill/60 hover:bg-neural-skill/20"
        >
          Télécharger CV ↓
        </a>
        <a
          href="https://github.com/KJ-devs"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-white/60 transition-all hover:border-white/20 hover:text-white/90"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jeremie-krebs/"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-white/60 transition-all hover:border-white/20 hover:text-white/90"
        >
          LinkedIn
        </a>
        <a
          href="mailto:contact@sunny.dev"
          className="rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 font-mono text-sm text-white/60 transition-all hover:border-white/20 hover:text-white/90"
        >
          Email
        </a>
      </div>

      {/* Neural network teaser */}
      <button
        onClick={() => setActiveView('neural')}
        className="group flex items-center gap-2 font-mono text-xs text-white/20 transition-colors hover:text-white/50"
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-neural-skill opacity-60 group-hover:opacity-100"
          style={{ boxShadow: '0 0 6px #00D4FF' }}
        />
        Explore the neural network
        <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20">
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}
