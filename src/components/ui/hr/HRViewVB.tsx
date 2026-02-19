'use client'

/**
 * Version B — SURGE (Bold Modern)
 *
 * Creative Direction:
 *   - Raw energy. Bold uppercase type slammed on screen.
 *   - Two accent colors: electric yellow #FFD94A + electric blue #4466FF.
 *   - Marquee strip as kinetic dividers between sections.
 *   - Hero: title words arrive one by one from below (overflow:hidden).
 *   - Projects: horizontal row layout — number | title | stack | arrow.
 *   - Strong geometric feel. No rounded corners.
 *
 * GSAP System:
 *   - Hero: word-by-word yPercent reveal, badge + sub fade
 *   - Marquee: infinite xPercent tween repeat:-1
 *   - Sections: slide from left for headers, fade+y for cards
 *   - Skills: stagger cards with scale
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

const YELLOW = '#FFD94A'
const BLUE = '#4466FF'

const SKILL_DOMAINS = [
  { domain: 'frontend', label: 'FRONTEND', color: '#00D4FF' },
  { domain: 'backend', label: 'BACKEND', color: '#10B981' },
  { domain: 'ai', label: 'IA / DATA', color: '#A855F7' },
  { domain: 'devops', label: 'DEVOPS', color: '#F472B6' },
] as const

function MarqueeStrip({ text }: { text: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 22,
      ease: 'none',
      repeat: -1,
    })
    return () => {
      tween.kill()
    }
  }, [])

  const content = Array(16).fill(text).join(' · ')

  return (
    <div
      className="overflow-hidden py-3"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.015)',
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{ width: 'max-content' }}
        aria-hidden
      >
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/22 pr-8">
          {content}
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-white/22 pr-8">
          {content}
        </span>
      </div>
    </div>
  )
}

export function HRViewVB() {
  const setActiveView = usePortfolioStore((s) => s.setActiveView)
  const containerRef = useRef<HTMLDivElement>(null)

  const skills = NEURONS.filter(
    (n): n is typeof n & { metadata: SkillMeta } =>
      n.category === 'skill' && n.metadata.type === 'skill',
  )

  // Hero: word-by-word reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.from('.vb-badge', { opacity: 0, y: -12, duration: 0.4, ease: 'power2.out' })
        .from(
          '.vb-title-word',
          { yPercent: 115, duration: 0.72, stagger: 0.1, ease: 'power3.out' },
          '-=0.1',
        )
        .from(
          '.vb-hero-sub',
          { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' },
          '-=0.25',
        )
        .from(
          '.vb-cta',
          { opacity: 0, x: -18, duration: 0.4, stagger: 0.07, ease: 'power2.out' },
          '-=0.2',
        )
    })
    return () => ctx.revert()
  }, [])

  // Scroll animations
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.vb-section-header').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -55,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 85%' },
        })
      })
      gsap.utils.toArray<Element>('.vb-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.55,
          delay: (i % 4) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 88%' },
        })
      })
      gsap.utils.toArray<Element>('.vb-project-row').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          x: -30,
          duration: 0.5,
          delay: i * 0.07,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, scroller: container, start: 'top 90%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const titleWords = ['SUNNY', 'FULLSTACK', 'DEVELOPER']

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 overflow-y-auto"
      style={{ background: '#03030A' }}
    >
      {/* ── HERO ───────────────────────────────── */}
      <section className="relative flex min-h-screen flex-col justify-center px-8 py-24 md:px-16">
        {/* Decorative background text */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="block font-black leading-none text-white/[0.02]"
            style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', letterSpacing: '-0.05em' }}
          >
            DEV
          </span>
        </div>

        {/* Status badge */}
        <div className="vb-badge mb-8 inline-flex items-center gap-2 self-start border border-white/10 bg-white/5 px-4 py-1.5">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: '#10B981', boxShadow: '0 0 6px #10B981' }}
          />
          <span className="font-mono text-xs text-white/55">Disponible pour opportunités</span>
        </div>

        {/* Title: words animate in one by one */}
        <div className="mb-6">
          {titleWords.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <span
                className="vb-title-word block font-black leading-[0.88]"
                style={{
                  fontSize: 'clamp(3.5rem, 10vw, 9rem)',
                  letterSpacing: '-0.03em',
                  color: i === 0 ? YELLOW : i === 2 ? BLUE : '#ffffff',
                }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        <p className="vb-hero-sub mb-10 max-w-xl text-sm leading-relaxed text-white/42">
          Du backend NestJS aux expériences Three.js. Master IA &amp; Big Data.
          Alternance 2023 – Présent.
        </p>

        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Télécharger CV', href: '/cv.pdf', accent: 'yellow' },
            { label: 'GitHub →', href: 'https://github.com/KJ-devs' },
            { label: 'Email →', href: 'mailto:contact@sunny.dev' },
          ].map(({ label, href, accent }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') || href === '/cv.pdf' ? undefined : '_blank'}
              rel="noreferrer"
              className="vb-cta inline-block font-mono text-sm px-6 py-3 transition-all duration-200 hover:scale-[1.03]"
              style={
                accent === 'yellow'
                  ? { background: YELLOW, color: '#03030A', fontWeight: 700 }
                  : {
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: 'rgba(255,255,255,0.6)',
                    }
              }
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => setActiveView('neural')}
            className="vb-cta inline-block font-mono text-sm px-6 py-3 transition-all duration-200 hover:scale-[1.03]"
            style={{ border: `1px solid ${BLUE}45`, color: BLUE }}
          >
            Neural View
          </button>
        </div>
      </section>

      {/* ── MARQUEE ────────────────────────────── */}
      <MarqueeStrip text="FULLSTACK DEVELOPER · REACT · NEXT.JS · THREE.JS · NESTJS · TYPESCRIPT · IA & BIG DATA" />

      {/* ── SKILLS ─────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24 md:px-16">
        <div className="vb-section-header mb-12 flex items-baseline gap-5">
          <h2
            className="font-black uppercase text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            Stack
          </h2>
          <span className="font-mono text-sm text-white/28">/ 20+ technologies</span>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {SKILL_DOMAINS.map(({ domain, label, color }) => {
            const domainSkills = skills.filter((s) => (s.metadata as SkillMeta).domain === domain)
            return (
              <div
                key={domain}
                className="vb-card p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: `linear-gradient(135deg, ${color}10, transparent)`,
                  border: `1px solid ${color}20`,
                }}
              >
                <div className="mb-4 flex items-center gap-2">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                  />
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-widest"
                    style={{ color }}
                  >
                    {label}
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {domainSkills.map((skill) => (
                    <span key={skill.id} className="text-sm text-white/55">
                      {skill.label}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PROJECTS ───────────────────────────── */}
      <section className="mx-auto max-w-6xl px-8 py-24 md:px-16">
        <div className="vb-section-header mb-12 flex items-baseline gap-5">
          <h2
            className="font-black uppercase text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            Projets
          </h2>
          <span className="font-mono text-sm text-white/28">
            / {PROJECTS.length} réalisations
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {PROJECTS.map((project, i) => (
            <article
              key={project.id}
              className="vb-project-row group grid grid-cols-[56px_1fr_auto] items-center gap-6 border border-white/5 px-8 py-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.02]"
            >
              <span
                className="font-mono text-2xl font-black"
                style={{
                  color:
                    i === 0
                      ? YELLOW
                      : i === 1
                        ? BLUE
                        : 'rgba(255,255,255,0.15)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="mb-1 font-bold text-white/88 transition-colors group-hover:text-white">
                  {project.title}
                </h3>
                <p className="mb-2 text-sm text-white/38">
                  {project.description.substring(0, 80)}…
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="border border-white/8 px-2 py-0.5 font-mono text-xs text-white/28"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {project.links.github && project.links.github !== '#' && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-white/45 transition-colors hover:text-white"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── MARQUEE 2 ──────────────────────────── */}
      <MarqueeStrip text="EXPÉRIENCES · ALTERNANCE · MASTER IA · BIG DATA · NODE.JS · POSTGRESQL · DOCKER · GSAP · THREE.JS" />

      {/* ── PARCOURS ───────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-24 md:px-16">
        <div className="vb-section-header mb-12 flex items-baseline gap-5">
          <h2
            className="font-black uppercase text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}
          >
            Parcours
          </h2>
        </div>
        <div className="flex flex-col gap-5">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.id}
              className="vb-card grid grid-cols-[100px_1fr] gap-6 border border-white/5 p-7 transition-all duration-300 hover:border-white/12"
            >
              <div
                className="font-mono text-xs leading-relaxed"
                style={{ color: i === 0 ? YELLOW : BLUE }}
              >
                {exp.period}
              </div>
              <div>
                <h3 className="mb-2 font-bold text-white/90">{exp.title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-white/42">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.slice(0, 6).map((s) => (
                    <span
                      key={s}
                      className="border border-white/8 px-2 py-0.5 font-mono text-xs text-white/28"
                    >
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
        <div className="vb-section-header mb-12">
          <h2
            className="font-black uppercase"
            style={{
              fontSize: 'clamp(3rem, 9vw, 8.5rem)',
              letterSpacing: '-0.03em',
              color: YELLOW,
            }}
          >
            Contact
          </h2>
        </div>
        <p className="vb-card mb-10 max-w-lg text-sm leading-relaxed text-white/42">
          Ouvert aux opportunités — alternance, CDI, freelance.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            { label: 'GitHub', href: 'https://github.com/KJ-devs', color: YELLOW },
            { label: 'LinkedIn', href: '#', color: BLUE },
            { label: 'Email', href: 'mailto:contact@sunny.dev', color: '#10B981' },
            { label: 'CV PDF', href: '/cv.pdf', color: '#A855F7' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={
                item.href.startsWith('mailto') || item.href === '/cv.pdf' ? undefined : '_blank'
              }
              rel="noreferrer"
              className="vb-card group flex items-center justify-between border border-white/6 px-7 py-5 transition-all duration-200 hover:border-white/14 hover:bg-white/[0.02]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}90` }}
                />
                <span className="font-mono text-sm font-bold text-white/78 transition-colors group-hover:text-white">
                  {item.label}
                </span>
              </div>
              <span className="font-mono text-sm text-white/22 transition-colors group-hover:text-white/55">
                →
              </span>
            </a>
          ))}
        </div>
        <p className="mt-16 font-mono text-xs text-white/12">
          Built with Next.js · Three.js · React Three Fiber
        </p>
      </section>
    </div>
  )
}
