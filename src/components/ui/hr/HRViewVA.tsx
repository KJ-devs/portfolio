'use client'

/**
 * Version A — MONOLITH (Minimal Elegant)
 *
 * Creative Direction:
 *   - Ultra-editorial. One accent: warm gold #C4963C.
 *   - Typography is the hero. Huge name, generous whitespace.
 *   - Numbered sections (01–05) create structure without decoration.
 *   - Skills as a hover-expand list — no bars, no clutter.
 *   - Projects as large cards with oversized dimmed numbers.
 *
 * GSAP System:
 *   - Hero: yPercent line reveal (overflow:hidden wrappers)
 *   - Sections: scaleX line + section header line reveal on scroll
 *   - Cards: fade + y on scroll
 *   - Skills: fade + x slide on scroll
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCES } from '@/data/experiences'
import { PROJECTS } from '@/data/projects'
import { NEURONS } from '@/data/neurons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { SkillMeta } from '@/types/neuron'

gsap.registerPlugin(ScrollTrigger)

const GOLD = '#C4963C'
const GOLD_DIM = 'rgba(196,150,60,0.1)'

const SKILL_DOMAINS = [
  { domain: 'frontend', label: 'Frontend', color: '#00D4FF' },
  { domain: 'backend', label: 'Backend', color: '#10B981' },
  { domain: 'ai', label: 'IA / Data', color: '#A855F7' },
  { domain: 'devops', label: 'DevOps', color: '#F472B6' },
] as const

export function HRViewVA() {
  const setActiveView = usePortfolioStore((s) => s.setActiveView)
  const containerRef = useRef<HTMLDivElement>(null)

  const skills = NEURONS.filter(
    (n): n is typeof n & { metadata: SkillMeta } =>
      n.category === 'skill' && n.metadata.type === 'skill',
  )

  // Hero: line reveal (overflow-hidden wrappers + yPercent)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.va-line', {
        yPercent: 112,
        duration: 0.88,
        stagger: 0.11,
        delay: 0.15,
        ease: 'power3.out',
      })
      gsap.from('.va-fade', {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.08,
        delay: 0.65,
        ease: 'power2.out',
      })
    })
    return () => ctx.revert()
  }, [])

  // Scroll reveals
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      // Horizontal dividers: scaleX from left
      gsap.utils.toArray<Element>('.va-divider').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 88%' },
        })
      })
      // Section headers: line reveal
      gsap.utils.toArray<Element>('.va-header-line').forEach((el) => {
        gsap.from(el, {
          yPercent: 105,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 90%' },
        })
      })
      // Cards
      gsap.utils.toArray<Element>('.va-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 35,
          duration: 0.6,
          delay: (i % 3) * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 90%' },
        })
      })
      // Skill items: slide from left
      gsap.utils.toArray<Element>('.va-skill').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -20,
          duration: 0.4,
          delay: (i % 6) * 0.045,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 92%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 overflow-y-auto"
      style={{ background: '#080808' }}
    >
      {/* ── HERO ───────────────────────────────── */}
      <section className="flex min-h-screen flex-col justify-center px-8 py-24 md:px-16 lg:px-24">
        {/* Eyebrow */}
        <div className="mb-8 overflow-hidden">
          <p className="va-line font-mono text-xs uppercase tracking-[0.5em] text-white/25">
            Portfolio · Fullstack Developer
          </p>
        </div>

        {/* Name */}
        <div className="mb-3 overflow-hidden">
          <h1
            className="va-line font-bold leading-[0.88] text-white"
            style={{ fontSize: 'clamp(5rem, 13vw, 11.5rem)', letterSpacing: '-0.02em' }}
          >
            Sunny
          </h1>
        </div>

        {/* Gold tagline */}
        <div className="mb-10 overflow-hidden">
          <p
            className="va-line font-light"
            style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.8rem)', color: GOLD }}
          >
            Développeur Fullstack · Master IA &amp; Big Data · 2023–
          </p>
        </div>

        {/* Bio */}
        <div className="mb-12 overflow-hidden">
          <p className="va-line max-w-2xl text-base leading-relaxed text-white/40">
            Du backend NestJS aux expériences Three.js immersives. Passionné par les interfaces
            innovantes et l&apos;IA. Alternance 2023 – Présent.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Télécharger CV', href: '/cv.pdf', primary: true },
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: 'Contact', href: 'mailto:contact@sunny.dev' },
          ].map(({ label, href, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noreferrer"
              className="va-fade inline-block rounded px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
              style={
                primary
                  ? { background: GOLD, color: '#080808', fontWeight: 600 }
                  : { border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }
              }
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setActiveView('neural')}
            className="va-fade inline-block rounded px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
            style={{ border: `1px solid ${GOLD}45`, color: GOLD }}
          >
            Vue Neuronale →
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="va-fade absolute bottom-10 right-8 flex flex-col items-center gap-2 md:right-16 lg:right-24">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            Scroll
          </span>
          <div
            className="h-10 w-px"
            style={{ background: `linear-gradient(${GOLD}, transparent)` }}
          />
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24 md:px-16">
        <div className="va-divider mb-16 h-px bg-white/8" />
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <div className="mb-6 overflow-hidden">
              <div className="va-header-line flex items-baseline gap-3">
                <span className="font-mono text-xs" style={{ color: GOLD }}>
                  01
                </span>
                <h2 className="text-3xl font-bold text-white/90">À propos</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              Développeur fullstack en alternance, spécialisé dans la création d&apos;applications
              web modernes et performantes. Passionné par l&apos;IA, les interfaces 3D et les
              expériences utilisateur mémorables. Actuellement en Master IA &amp; Big Data.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '2+', label: "Ans d'XP" },
              { value: '5+', label: 'Projets' },
              { value: '20+', label: 'Technologies' },
            ].map(({ value, label }) => (
              <div key={label} className="va-card text-center">
                <div
                  className="mb-1 font-mono text-4xl font-bold"
                  style={{ color: GOLD }}
                >
                  {value}
                </div>
                <div className="font-mono text-xs uppercase tracking-wider text-white/30">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24 md:px-16">
        <div className="va-divider mb-16 h-px bg-white/8" />
        <div className="mb-12 overflow-hidden">
          <div className="va-header-line flex items-baseline gap-3">
            <span className="font-mono text-xs" style={{ color: GOLD }}>
              02
            </span>
            <h2 className="text-3xl font-bold text-white/90">Stack technique</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_DOMAINS.map(({ domain, label, color }) => {
            const domainSkills = skills.filter((s) => (s.metadata as SkillMeta).domain === domain)
            return (
              <div key={domain}>
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}` }}
                  />
                  <span className="font-mono text-xs uppercase tracking-widest text-white/35">
                    {label}
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {domainSkills.map((skill) => (
                    <div key={skill.id} className="va-skill group flex cursor-default items-center gap-2">
                      <span
                        className="h-px w-3 transition-all duration-250 group-hover:w-5"
                        style={{ background: color }}
                      />
                      <span className="text-sm text-white/55 transition-colors duration-200 group-hover:text-white/90">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24 md:px-16">
        <div className="va-divider mb-16 h-px bg-white/8" />
        <div className="mb-12 overflow-hidden">
          <div className="va-header-line flex items-baseline gap-3">
            <span className="font-mono text-xs" style={{ color: GOLD }}>
              03
            </span>
            <h2 className="text-3xl font-bold text-white/90">Projets</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className="va-card group relative flex flex-col rounded p-8 transition-all duration-300"
              style={{
                background: GOLD_DIM,
                border: `1px solid rgba(196,150,60,0.07)`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `rgba(196,150,60,0.22)`
                el.style.background = `rgba(196,150,60,0.06)`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = `rgba(196,150,60,0.07)`
                el.style.background = GOLD_DIM
              }}
            >
              <span
                className="mb-6 font-mono text-5xl font-black"
                style={{ color: `${GOLD}30` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white/90">{project.title}</h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-white/42">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="font-mono text-xs text-white/28">
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="font-mono text-xs text-white/20">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
              <div className="flex gap-4">
                {project.links.github && project.links.github !== '#' && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-white/30 transition-colors hover:text-white/70"
                  >
                    GitHub →
                  </a>
                )}
                {project.links.live && project.links.live !== '#' && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs transition-colors hover:opacity-80"
                    style={{ color: GOLD }}
                  >
                    Live →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── PARCOURS ───────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-24 md:px-16">
        <div className="va-divider mb-16 h-px bg-white/8" />
        <div className="mb-12 overflow-hidden">
          <div className="va-header-line flex items-baseline gap-3">
            <span className="font-mono text-xs" style={{ color: GOLD }}>
              04
            </span>
            <h2 className="text-3xl font-bold text-white/90">Expériences</h2>
          </div>
        </div>
        <div className="flex flex-col gap-10">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="va-card grid grid-cols-1 gap-5 md:grid-cols-[180px_1fr]"
            >
              <span className="font-mono text-xs" style={{ color: GOLD }}>
                {exp.period}
              </span>
              <div>
                <h3 className="mb-2 font-bold text-white/90">{exp.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/45">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((s) => (
                    <span key={s} className="font-mono text-xs text-white/28">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-24 md:px-16">
        <div className="va-divider mb-16 h-px bg-white/8" />
        <div className="mb-12 overflow-hidden">
          <div className="va-header-line flex items-baseline gap-3">
            <span className="font-mono text-xs" style={{ color: GOLD }}>
              05
            </span>
            <h2 className="text-3xl font-bold text-white/90">Contact</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: 'LinkedIn', href: '#' },
            { label: 'Email', href: 'mailto:contact@sunny.dev' },
            { label: 'CV PDF', href: '/cv.pdf' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={
                item.href.startsWith('mailto') || item.href === '/cv.pdf' ? undefined : '_blank'
              }
              rel="noreferrer"
              className="va-card group flex items-center gap-3 rounded px-6 py-4 transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${GOLD}55`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
              <span className="font-mono text-sm text-white/65 transition-colors group-hover:text-white/90">
                {item.label}
              </span>
            </a>
          ))}
        </div>
        <p className="mt-20 font-mono text-xs text-white/12">
          Built with Next.js · Three.js · React Three Fiber
        </p>
      </section>
    </div>
  )
}
