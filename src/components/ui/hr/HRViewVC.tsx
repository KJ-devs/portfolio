'use client'

/**
 * Version C — CINÉMA (Experimental / Immersive)
 *
 * Creative Direction:
 *   - Scroll storytelling. Each section is a scene.
 *   - Per-section accent colors: hero purple, projects cyan, skills green, contact yellow.
 *   - Giant display typography with tight negative letter-spacing.
 *   - Clip-path reveals from bottom: elements lift like a curtain.
 *   - Skills as a free-flowing tag cloud, color-coded by domain.
 *   - Contact: full emotional close — "Let's Talk."
 *   - Subtle noise texture overlay for premium feel.
 *
 * GSAP System:
 *   - Hero: clip-path left-to-right + bg text scale
 *   - Sections: clip-path lift (inset 100% 0 0 0) on ScrollTrigger
 *   - Projects: scale+opacity with scroll-based stagger
 *   - Skills: back.out bounce-in tags
 *   - Timeline: slide from left
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

const COLORS = {
  hero: '#C026D3',     // fuchsia
  projects: '#06B6D4', // cyan
  skills: '#22C55E',   // green
  experience: '#F97316', // orange
  contact: '#EAB308',  // yellow
}

const SKILL_COLOR_MAP: Record<string, string> = {
  frontend: COLORS.projects,
  backend: COLORS.skills,
  ai: '#A855F7',
  devops: '#F472B6',
}

export function HRViewVC() {
  const setActiveView = usePortfolioStore((s) => s.setActiveView)
  const containerRef = useRef<HTMLDivElement>(null)

  const skills = NEURONS.filter(
    (n): n is typeof n & { metadata: SkillMeta } =>
      n.category === 'skill' && n.metadata.type === 'skill',
  )

  // Hero entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.vc-bg-text', { opacity: 0, scale: 1.08, duration: 1.4, ease: 'power3.out' })
        .from(
          '.vc-hero-name',
          { clipPath: 'inset(0 100% 0 0)', duration: 1.0, ease: 'power3.out' },
          '-=1.1',
        )
        .from(
          '.vc-hero-tagline',
          { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' },
          '-=0.5',
        )
        .from(
          '.vc-hero-cta',
          { opacity: 0, y: 14, stagger: 0.09, duration: 0.45, ease: 'power2.out' },
          '-=0.35',
        )
    })
    return () => ctx.revert()
  }, [])

  // Scroll reveals
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      // Section title: lift from bottom
      gsap.utils.toArray<Element>('.vc-title').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 86%' },
        })
      })
      // Project cards: scale + y
      gsap.utils.toArray<Element>('.vc-project').forEach((el, i) => {
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
      // Skill tags: back.out bounce
      gsap.utils.toArray<Element>('.vc-tag').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.72,
          y: 10,
          duration: 0.35,
          delay: (i % 14) * 0.032,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 92%' },
        })
      })
      // Timeline: slide from left
      gsap.utils.toArray<Element>('.vc-exp').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -60,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 86%' },
        })
      })
      // Contact reveal
      gsap.utils.toArray<Element>('.vc-contact-title').forEach((el) => {
        gsap.from(el, {
          clipPath: 'inset(100% 0 0 0)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 82%' },
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
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '300px',
        }}
      />

      {/* ── HERO ───────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 text-center">
        {/* Ambient hero glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse 70% 50% at 50% 45%, ${COLORS.hero}12, transparent 70%)`,
          }}
        />

        {/* Background faded text */}
        <div
          className="vc-bg-text pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden
        >
          <p
            className="whitespace-nowrap font-black uppercase text-white/[0.022]"
            style={{ fontSize: 'clamp(5rem, 14vw, 14rem)', letterSpacing: '0.08em' }}
          >
            FULLSTACK DEV SUNNY FULLSTACK DEV SUNNY
          </p>
        </div>

        {/* Accent line */}
        <div
          className="mb-8 h-px w-20"
          style={{ background: COLORS.hero, boxShadow: `0 0 20px ${COLORS.hero}` }}
        />

        {/* Name — clip-path reveal */}
        <h1
          className="vc-hero-name mb-6 font-black text-white"
          style={{
            fontSize: 'clamp(5rem, 15vw, 13rem)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            clipPath: 'inset(0 0% 0 0)',
          }}
        >
          Sunny
        </h1>

        <p className="vc-hero-tagline mb-3 text-xl font-light text-white/58 md:text-2xl">
          Développeur Fullstack · Master IA &amp; Big Data
        </p>
        <p className="vc-hero-tagline mb-10 font-mono text-sm uppercase tracking-widest text-white/28">
          Alternance 2023 – Présent
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'CV ↓', href: '/cv.pdf', primary: true },
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: 'Contact', href: 'mailto:contact@sunny.dev' },
          ].map(({ label, href, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noreferrer"
              className="vc-hero-cta rounded-full px-7 py-3 font-mono text-sm transition-all duration-200 hover:scale-105"
              style={
                primary
                  ? { background: COLORS.hero, color: '#fff', fontWeight: 600 }
                  : { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.58)' }
              }
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setActiveView('neural')}
            className="vc-hero-cta rounded-full px-7 py-3 font-mono text-sm transition-all duration-200 hover:scale-105"
            style={{ border: `1px solid ${COLORS.hero}45`, color: COLORS.hero }}
          >
            ✦ Neural
          </button>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/18">
            Scroll
          </span>
          <div
            className="h-8 w-px"
            style={{ background: `linear-gradient(${COLORS.hero}55, transparent)` }}
          />
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-32">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div
              className="mb-4 h-px w-16"
              style={{ background: COLORS.projects, boxShadow: `0 0 12px ${COLORS.projects}80` }}
            />
            <div className="overflow-hidden">
              <h2
                className="vc-title font-black text-white"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                  letterSpacing: '-0.02em',
                  clipPath: 'inset(0 0% 0 0)',
                }}
              >
                Projets
              </h2>
            </div>
          </div>
          <span className="font-mono text-sm text-white/22">{PROJECTS.length} réalisations</span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className="vc-project group relative flex flex-col overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${COLORS.projects}45`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: COLORS.projects }}
              />
              <span
                className="mb-5 font-mono text-3xl font-black"
                style={{ color: `${COLORS.projects}30` }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mb-2 text-lg font-bold text-white/88">{project.title}</h3>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-white/42">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full px-2.5 py-0.5 font-mono text-xs text-white/48"
                    style={{
                      background: `${COLORS.projects}10`,
                      border: `1px solid ${COLORS.projects}22`,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.links.github && project.links.github !== '#' && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-white/28 transition-colors hover:text-white/70"
                >
                  GitHub →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* ── SKILLS ─────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-32">
        <div className="mb-16">
          <div
            className="mb-4 h-px w-16"
            style={{ background: COLORS.skills, boxShadow: `0 0 12px ${COLORS.skills}80` }}
          />
          <div className="overflow-hidden">
            <h2
              className="vc-title font-black text-white"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                clipPath: 'inset(0 0% 0 0)',
              }}
            >
              Stack
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => {
            const meta = skill.metadata as SkillMeta
            const color = SKILL_COLOR_MAP[meta.domain] ?? '#ffffff'
            return (
              <span
                key={skill.id}
                className="vc-tag cursor-default rounded-full px-4 py-2 text-sm font-medium text-white/68 transition-all duration-200 hover:scale-105 hover:text-white"
                style={{ background: `${color}10`, border: `1px solid ${color}28` }}
              >
                {skill.label}
              </span>
            )
          })}
        </div>
      </section>

      {/* ── PARCOURS ───────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-32">
        <div className="mb-16">
          <div
            className="mb-4 h-px w-16"
            style={{ background: COLORS.experience, boxShadow: `0 0 12px ${COLORS.experience}80` }}
          />
          <div className="overflow-hidden">
            <h2
              className="vc-title font-black text-white"
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                letterSpacing: '-0.02em',
                clipPath: 'inset(0 0% 0 0)',
              }}
            >
              Parcours
            </h2>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="vc-exp rounded-2xl border border-white/6 p-8 transition-all duration-300 hover:border-white/12"
              style={{ background: `${COLORS.experience}05` }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    backgroundColor: COLORS.experience,
                    boxShadow: `0 0 8px ${COLORS.experience}`,
                  }}
                />
                <span className="font-mono text-xs" style={{ color: COLORS.experience }}>
                  {exp.period}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white/90">{exp.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-white/48">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/8 px-3 py-0.5 font-mono text-xs text-white/33"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-8 py-32 text-center">
        <div className="mb-6 flex justify-center">
          <div
            className="h-px w-16"
            style={{ background: COLORS.contact, boxShadow: `0 0 12px ${COLORS.contact}80` }}
          />
        </div>

        <div className="mb-10 overflow-hidden">
          <h2
            className="vc-contact-title font-black text-white"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.04em',
              clipPath: 'inset(0 0% 0 0)',
            }}
          >
            Let&apos;s
            <br />
            <span style={{ color: COLORS.contact }}>Talk.</span>
          </h2>
        </div>

        <p className="mb-12 text-white/42">
          Ouvert aux opportunités — alternance, CDI, freelance.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { label: 'Email', href: 'mailto:contact@sunny.dev', primary: true },
            { label: 'GitHub', href: 'https://github.com/KJ-devs' },
            { label: 'LinkedIn', href: '#' },
            { label: 'CV PDF', href: '/cv.pdf' },
          ].map(({ label, href, primary }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noreferrer"
              className="rounded-full px-7 py-3 font-mono text-sm transition-all duration-200 hover:scale-105"
              style={
                primary
                  ? { background: COLORS.contact, color: '#050510', fontWeight: 700 }
                  : { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.58)' }
              }
            >
              {label}
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
