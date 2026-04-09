'use client'

/**
 * Version X — ULTIME
 *
 * Skills  : Bandes horizontales compactes — label inline + skills en taille lisible.
 * Parcours: Cards cinématiques avec filigrane numéro géant.
 * Contact : Scène finale plein-écran avec email comme centre visuel.
 * i18n    : FR / DE via Zustand store + translations.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { EXPERIENCES } from '@/data/experiences'
import { PROJECTS } from '@/data/projects'
import { NEURONS } from '@/data/neurons'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import { translations } from '@/lib/i18n'
import {
  PROJECT_DESCRIPTIONS,
  EXPERIENCE_DESCRIPTIONS,
  EXPERIENCE_TITLES,
} from '@/lib/dataTranslations'
import type { SkillMeta } from '@/types/neuron'
import { ProjectImageSlider } from './ProjectImageSlider'

gsap.registerPlugin(ScrollTrigger)

const COLORS = {
  hero: '#C026D3',
  projects: '#06B6D4',
  experience: '#C026D3',
  contact: '#06B6D4',
}

type Domain = 'frontend' | 'backend' | 'ai' | 'devops'

type ProjectFilter = 'all' | 'frontend' | 'ia' | 'iot'

const PROJECT_FILTERS: { id: ProjectFilter; label: string; color: string; matchTechs: string[] }[] =
  [
    { id: 'all', label: 'Tous', color: '#ffffff', matchTechs: [] },
    {
      id: 'frontend',
      label: 'Web',
      color: '#06B6D4',
      matchTechs: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'HTML/CSS',
        'JavaScript',
        'Three.js',
        'GSAP',
        'React Three Fiber',
      ],
    },
    {
      id: 'ia',
      label: 'IA',
      color: '#A855F7',
      matchTechs: ['AI APIs', 'pgvector', 'Machine Learning', 'TensorFlow', 'NLP'],
    },
    { id: 'iot', label: 'IoT', color: '#22C55E', matchTechs: ['API REST', 'IoT'] },
  ]

const BANDS: { key: Domain; label: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', color: '#06B6D4' },
  { key: 'backend', label: 'Backend', color: '#22C55E' },
  { key: 'ai', label: 'IA & Data', color: '#A855F7' },
  { key: 'devops', label: 'DevOps', color: '#F472B6' },
]

export function HRViewVX() {
  const setActiveView = usePortfolioStore((s) => s.setActiveView)
  const language = usePortfolioStore((s) => s.language)
  const openCv = usePortfolioStore((s) => s.setCvPreviewOpen)
  const containerRef = useRef<HTMLDivElement>(null)
  const projectGridRef = useRef<HTMLDivElement>(null)
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all')

  const t = translations[language]

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => {
          const filterDef = PROJECT_FILTERS.find((f) => f.id === activeFilter)
          if (!filterDef) return true
          return p.stack.some((tech) => filterDef.matchTechs.includes(tech))
        })

  const getProjectTags = useCallback((stack: string[]): { label: string; color: string }[] => {
    const tags: { label: string; color: string }[] = []
    const iaFilter = PROJECT_FILTERS.find((f) => f.id === 'ia')
    const iotFilter = PROJECT_FILTERS.find((f) => f.id === 'iot')
    if (iaFilter && stack.some((t) => iaFilter.matchTechs.includes(t))) {
      tags.push({ label: 'IA', color: iaFilter.color })
    }
    if (iotFilter && stack.some((t) => iotFilter.matchTechs.includes(t))) {
      tags.push({ label: 'IoT', color: iotFilter.color })
    }
    const webFilter = PROJECT_FILTERS.find((f) => f.id === 'frontend')
    if (webFilter && stack.some((t) => webFilter.matchTechs.includes(t))) {
      tags.push({ label: 'Web', color: webFilter.color })
    }
    return tags
  }, [])

  const handleFilterChange = useCallback(
    (filter: ProjectFilter) => {
      if (filter === activeFilter) return
      const grid = projectGridRef.current
      if (grid) {
        const tl = gsap.timeline()
        tl.to(grid.children, {
          opacity: 0,
          y: -15,
          scale: 0.97,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power2.inOut',
        })
        tl.call(() => {
          setActiveFilter(filter)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (projectGridRef.current) {
                gsap.fromTo(
                  projectGridRef.current.children,
                  { opacity: 0, y: 40, scale: 0.92 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    clearProps: 'transform',
                  }
                )
              }
            })
          })
        })
      } else {
        setActiveFilter(filter)
      }
    },
    [activeFilter]
  )

  const skills = NEURONS.filter(
    (n): n is typeof n & { metadata: SkillMeta } =>
      n.category === 'skill' && n.metadata.type === 'skill'
  )

  // ── Hero entrance ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.vx-bg-text', { opacity: 0, scale: 1.08, duration: 1.4, ease: 'power3.out' })
        .from(
          '.vx-hero-name',
          { clipPath: 'inset(0 100% 0 0)', duration: 1.0, ease: 'power3.out' },
          '-=1.1'
        )
        .from('.vx-hero-tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
        .from(
          '.vx-hero-cta',
          { opacity: 0, y: 14, stagger: 0.09, duration: 0.45, ease: 'power2.out' },
          '-=0.35'
        )
    })
    return () => ctx.revert()
  }, [])

  // ── Scroll reveals ─────────────────────────────────
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.vx-title').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 86%' },
        })
      })
      gsap.utils.toArray<Element>('.vx-project').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.93,
          y: 55,
          duration: 0.7,
          delay: i * 0.11,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 88%' },
        })
      })
      gsap.utils.toArray<Element>('.vx-band').forEach((el, i) => {
        gsap.from(el, {
          clipPath: 'inset(0 100% 0 0)',
          duration: 0.85,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 90%' },
        })
      })
      gsap.utils.toArray<Element>('.vx-exp').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 60,
          rotateX: 4,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          transformOrigin: 'top center',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 88%' },
        })
      })
      gsap.utils.toArray<Element>('.vx-closing').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 84%' },
        })
      })
      gsap.utils.toArray<Element>('.vx-email').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.88,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 85%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 overflow-y-auto"
      style={{ background: '#050510' }}
    >
      {/* Noise texture */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px',
        }}
      />

      {/* ── SCÈNE I — HERO ─────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 45%, ${COLORS.hero}14, transparent 70%)`,
          }}
        />
        <div
          className="vx-bg-text pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <p
            className="whitespace-nowrap font-black uppercase text-white/[0.022]"
            style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', letterSpacing: '0.08em' }}
          >
            FULLSTACK
          </p>
        </div>

        <div
          className="mb-8 h-px w-20"
          style={{ background: COLORS.hero, boxShadow: `0 0 24px ${COLORS.hero}` }}
        />

        <h1
          className="vx-hero-name mb-6 font-black text-white"
          style={{
            fontSize: 'clamp(5rem, 15vw, 13rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            clipPath: 'inset(0 0% 0 0)',
          }}
        >
          J.Krebs
        </h1>
        <p className="vx-hero-tagline mb-3 text-xl font-light text-white/58 md:text-2xl">
          {t.tagline}
        </p>
        <p className="vx-hero-tagline mb-10 font-mono text-sm uppercase tracking-widest text-white/28">
          {t.period}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => openCv(true)}
            className="vx-hero-cta rounded-full px-7 py-3 font-mono text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{ background: COLORS.hero, color: '#fff' }}
          >
            {t.cta_cv}
          </button>
          {[
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: t.cta_contact, href: 'mailto:jeremiekrebs9@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="vx-hero-cta rounded-full px-7 py-3 font-mono text-sm transition-all duration-200 hover:scale-105"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.58)' }}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setActiveView('neural')}
            className="vx-hero-cta rounded-full px-7 py-3 font-mono text-sm transition-all duration-200 hover:scale-105"
            style={{ border: `1px solid ${COLORS.hero}45`, color: COLORS.hero }}
          >
            ✦ Neural
          </button>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/18">
            {t.scroll}
          </span>
          <div
            className="h-8 w-px"
            style={{ background: `linear-gradient(${COLORS.hero}55, transparent)` }}
          />
        </div>
      </section>

      {/* ── SCÈNE II — PROJETS ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-32">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div
              className="mb-4 h-px w-16"
              style={{ background: COLORS.projects, boxShadow: `0 0 12px ${COLORS.projects}80` }}
            />
            <div className="overflow-hidden">
              <h2
                className="vx-title font-black text-white"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.02em',
                  clipPath: 'inset(0 0% 0 0)',
                }}
              >
                {t.projects}
              </h2>
            </div>
          </div>
          <span className="font-mono text-sm text-white/22">
            {(t.realizations as (n: number) => string)(filteredProjects.length)}
          </span>
        </div>

        {/* Filtres projets */}
        <div className="mb-12 flex flex-wrap gap-2">
          {PROJECT_FILTERS.map((f) => {
            const isActive = activeFilter === f.id
            return (
              <button
                key={f.id}
                onClick={() => handleFilterChange(f.id)}
                className="relative overflow-hidden rounded-full px-5 py-2 font-mono text-xs font-medium transition-all duration-300 hover:scale-[1.04]"
                style={
                  isActive
                    ? {
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}45`,
                        color: f.color,
                        boxShadow: `0 0 20px ${f.color}12`,
                      }
                    : {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.4)',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${f.color}30`
                    ;(e.currentTarget as HTMLElement).style.color = `${f.color}cc`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)'
                  }
                }}
              >
                {isActive && (
                  <span
                    className="absolute left-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
                    style={{ background: f.color, boxShadow: `0 0 8px ${f.color}` }}
                  />
                )}
                <span className={isActive ? 'pl-3' : ''}>{f.label}</span>
              </button>
            )
          })}
        </div>

        <div ref={projectGridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, i) => {
            const tags = getProjectTags(project.stack)
            const mainTag = tags[0]
            const accentColor = mainTag?.color ?? COLORS.projects
            return (
              <article
                key={project.id}
                className="vx-project group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.025)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${accentColor}40`
                  el.style.boxShadow = `0 8px 40px ${accentColor}12, 0 0 0 1px ${accentColor}15`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Top accent bar */}
                <div
                  className="h-[2px] w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}40, transparent)`,
                  }}
                />

                {/* Gradient glow background on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accentColor}08, transparent 70%)`,
                  }}
                />

                <div className="relative flex flex-1 flex-col p-7">
                  {/* Header: number + tags */}
                  <div className="mb-5 flex items-start justify-between">
                    <span
                      className="font-mono text-3xl font-black transition-colors duration-300"
                      style={{ color: `${accentColor}25` }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex gap-1.5">
                      {tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            background: `${tag.color}15`,
                            border: `1px solid ${tag.color}30`,
                            color: tag.color,
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: tag.color, boxShadow: `0 0 6px ${tag.color}80` }}
                          />
                          {tag.label}
                        </span>
                      ))}
                      {project.wip && (
                        <span
                          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            background: 'rgba(234,179,8,0.15)',
                            border: '1px solid rgba(234,179,8,0.3)',
                            color: '#EAB308',
                          }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: '#EAB308', boxShadow: '0 0 6px rgba(234,179,8,0.8)' }}
                          />
                          WIP
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-white/90 transition-colors duration-300 group-hover:text-white">
                    {project.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/40 transition-colors duration-300 group-hover:text-white/55">
                    {PROJECT_DESCRIPTIONS[project.id]?.[language] ?? project.description}
                  </p>

                  {/* Image slider */}
                  {project.media && project.media.length > 0 && (
                    <ProjectImageSlider media={project.media} accentColor={accentColor} />
                  )}

                  {/* Stack badges */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-2.5 py-0.5 font-mono text-[11px] text-white/40 transition-colors duration-300 group-hover:text-white/55"
                        style={{
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.07)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Footer: links */}
                  <div className="flex items-center gap-3">
                    {project.links.github && project.links.github !== '#' && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs text-white/30 transition-all duration-200 hover:text-white/70"
                        style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.borderColor = `${accentColor}40`
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.borderColor =
                            'rgba(255,255,255,0.08)'
                        }}
                      >
                        {t.github_link}
                      </a>
                    )}
                    {project.links.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs transition-all duration-200"
                        style={{
                          background: `${accentColor}15`,
                          border: `1px solid ${accentColor}30`,
                          color: `${accentColor}cc`,
                        }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.background = `${accentColor}25`
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.background = `${accentColor}15`
                        }}
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* ── SCÈNE III — STACK ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-12">
          <div
            className="mb-4 h-px w-16"
            style={{ background: '#A855F7', boxShadow: `0 0 12px #A855F780` }}
          />
          <div className="overflow-hidden">
            <h2
              className="vx-title font-black text-white"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                clipPath: 'inset(0 0% 0 0)',
              }}
            >
              {t.stack}
            </h2>
          </div>
        </div>

        <div className="flex flex-col">
          {BANDS.map(({ key, label, color }) => {
            const bandSkills = skills.filter((s) => (s.metadata as SkillMeta).domain === key)
            if (bandSkills.length === 0) return null
            return (
              <div
                key={key}
                className="vx-band group flex items-center gap-4 border-t py-5 transition-all duration-300 md:gap-8 md:py-6"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${color}30`
                  ;(e.currentTarget as HTMLElement).style.background = `${color}04`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.05)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }}
              >
                {/* Domain label */}
                <div className="flex w-28 shrink-0 items-center gap-2 md:w-36">
                  <div
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                  />
                  <span
                    className="font-mono text-xs font-semibold uppercase tracking-widest"
                    style={{ color: `${color}90` }}
                  >
                    {label}
                  </span>
                </div>

                {/* Separator */}
                <div
                  className="h-4 w-px shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />

                {/* Skills */}
                <p
                  className="flex-1 font-medium leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/85"
                  style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)', letterSpacing: '-0.01em' }}
                >
                  {bandSkills.map((s, idx) => (
                    <span key={s.id}>
                      <span className="transition-colors duration-150 hover:text-white">
                        {s.label}
                      </span>
                      {idx < bandSkills.length - 1 && (
                        <span className="mx-2 font-light opacity-20"> ·</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>
            )
          })}
          <div className="h-px" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
      </section>

      {/* ── SCÈNE IV — PARCOURS ────────────────────── */}
      <section className="mx-auto max-w-5xl px-8 py-32">
        <div className="mb-16">
          <div
            className="mb-4 h-px w-16"
            style={{ background: COLORS.experience, boxShadow: `0 0 12px ${COLORS.experience}80` }}
          />
          <div className="overflow-hidden">
            <h2
              className="vx-title font-black text-white"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                clipPath: 'inset(0 0% 0 0)',
              }}
            >
              {t.parcours}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-5" style={{ perspective: '1000px' }}>
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.id}
              className="vx-exp group relative min-h-[260px] overflow-hidden rounded-2xl p-10 transition-all duration-300"
              style={{
                background: `linear-gradient(120deg, ${COLORS.experience}09 0%, rgba(255,255,255,0.018) 50%)`,
                border: '1px solid rgba(255,255,255,0.07)',
                borderLeft: `3px solid ${COLORS.experience}55`,
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderLeftColor = COLORS.experience
                ;(e.currentTarget as HTMLElement).style.boxShadow =
                  `0 0 60px ${COLORS.experience}0a`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderLeftColor = `${COLORS.experience}55`
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-40"
                style={{
                  background: `linear-gradient(90deg, ${COLORS.experience}0c, transparent)`,
                }}
              />

              <span
                className="pointer-events-none absolute bottom-4 right-8 select-none font-black text-white"
                aria-hidden
                style={{
                  fontSize: 'clamp(6rem, 14vw, 11rem)',
                  opacity: 0.038,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1"
                style={{
                  background: `${COLORS.experience}14`,
                  border: `1px solid ${COLORS.experience}30`,
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    backgroundColor: COLORS.experience,
                    boxShadow: `0 0 8px ${COLORS.experience}`,
                  }}
                />
                <span className="font-mono text-xs" style={{ color: COLORS.experience }}>
                  {exp.period}
                </span>
              </div>

              <h3
                className="mb-4 font-black text-white/92"
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                }}
              >
                {EXPERIENCE_TITLES[exp.id]?.[language] ?? exp.title}
              </h3>

              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-white/45">
                {EXPERIENCE_DESCRIPTIONS[exp.id]?.[language] ?? exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full px-3 py-0.5 font-mono text-xs text-white/30"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SCÈNE V — CONTACT ──────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 py-32 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 65% 60% at 50% 55%, ${COLORS.contact}0d, transparent 70%)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 40% 40% at 50% 65%, ${COLORS.hero}07, transparent 60%)`,
          }}
        />

        <span className="mb-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/18">
          {t.contact}
        </span>

        <div className="overflow-hidden">
          <p
            className="vx-closing font-black text-white/88"
            style={{
              fontSize: 'clamp(2.2rem, 6.5vw, 5.5rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              clipPath: 'inset(0 0% 0 0)',
            }}
          >
            {t.statement_1}
            <br />
            <span style={{ color: COLORS.contact }}>{t.statement_2}</span>
          </p>
        </div>

        <div className="my-14 flex items-center gap-4">
          <div
            className="h-px w-16"
            style={{ background: `linear-gradient(90deg, transparent, ${COLORS.contact}80)` }}
          />
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: COLORS.contact, boxShadow: `0 0 12px ${COLORS.contact}` }}
          />
          <div
            className="h-px w-16"
            style={{ background: `linear-gradient(90deg, ${COLORS.contact}80, transparent)` }}
          />
        </div>

        <a
          href="mailto:jeremiekrebs9@gmail.com"
          className="vx-email block font-black transition-all duration-300"
          style={{
            fontSize: 'clamp(1.6rem, 4.5vw, 4rem)',
            letterSpacing: '-0.03em',
            color: COLORS.contact,
            textShadow: `0 0 50px ${COLORS.contact}50`,
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLElement).style.textShadow = `0 0 80px ${COLORS.contact}90`
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLElement).style.textShadow = `0 0 50px ${COLORS.contact}50`
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
          }}
        >
          jeremiekrebs9@gmail.com
        </a>

        <p className="mt-5 font-mono text-sm text-white/32">{t.available}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jeremie-krebs/' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="rounded-full px-5 py-2 font-mono text-xs text-white/35 transition-all duration-200 hover:text-white/70"
              style={{ border: '1px solid rgba(255,255,255,0.09)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${COLORS.contact}45`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'
              }}
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => openCv(true)}
            className="rounded-full px-5 py-2 font-mono text-xs text-white/35 transition-all duration-200 hover:text-white/70"
            style={{ border: '1px solid rgba(255,255,255,0.09)' }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = `${COLORS.contact}45`
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.09)'
            }}
          >
            CV.pdf
          </button>
        </div>

        <button
          onClick={() => setActiveView('neural')}
          className="mt-16 font-mono text-xs text-white/18 transition-all duration-200 hover:text-white/50"
        >
          {t.back_neural}
        </button>

        <p className="mt-8 font-mono text-[10px] text-white/10">{t.built_with}</p>
      </section>
    </div>
  )
}
