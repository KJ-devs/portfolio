'use client'

import { useEffect, useRef, useState } from 'react'
import { NEURONS } from '@/data/neurons'
import type { SkillMeta } from '@/types/neuron'

type Domain = 'frontend' | 'backend' | 'ai' | 'devops' | 'ai-tools'

const DOMAIN_CONFIG: Record<Domain, { label: string; color: string; glow: string }> = {
  frontend:  { label: 'Frontend',   color: '#00D4FF', glow: 'rgba(0,212,255,0.15)' },
  backend:   { label: 'Backend',    color: '#10B981', glow: 'rgba(16,185,129,0.15)' },
  ai:        { label: 'IA / Data',  color: '#A855F7', glow: 'rgba(168,85,247,0.15)' },
  'ai-tools': { label: 'AI Tools',  color: '#F59E0B', glow: 'rgba(245,158,11,0.15)' },
  devops:    { label: 'DevOps',     color: '#F472B6', glow: 'rgba(244,114,182,0.15)' },
}

const DOMAIN_ORDER: Domain[] = ['frontend', 'backend', 'ai', 'ai-tools', 'devops']

interface SkillItem {
  id: string
  label: string
  level: number
  domain: Domain
}

const skills: SkillItem[] = NEURONS.filter(
  (n): n is typeof n & { metadata: SkillMeta } =>
    n.category === 'skill' && n.metadata.type === 'skill',
).map((n) => ({
  id: n.id,
  label: n.label,
  level: (n.metadata as SkillMeta).level,
  domain: (n.metadata as SkillMeta).domain,
}))

function SkillBar({ skill, color, animate }: { skill: SkillItem; color: string; animate: boolean }) {
  return (
    <div className="group">
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-sm text-white/70 transition-colors group-hover:text-white/90">
          {skill.label}
        </span>
        <span className="font-mono text-xs text-white/30">{skill.level}%</span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: animate ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}80, ${color})`,
            boxShadow: animate ? `0 0 8px ${color}60` : 'none',
          }}
        />
      </div>
    </div>
  )
}

function DomainGroup({ domain, animate }: { domain: Domain; animate: boolean }) {
  const config = DOMAIN_CONFIG[domain]
  const domainSkills = skills.filter((s) => s.domain === domain)

  return (
    <div
      className="rounded-xl border border-white/5 p-6 transition-all duration-300 hover:border-white/10"
      style={{ background: `radial-gradient(ellipse at top left, ${config.glow}, transparent 60%)` }}
    >
      <div className="mb-5 flex items-center gap-2">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}` }}
        />
        <h3 className="font-mono text-xs font-semibold tracking-widest uppercase text-white/40">
          {config.label}
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        {domainSkills.map((skill) => (
          <SkillBar key={skill.id} skill={skill} color={config.color} animate={animate} />
        ))}
      </div>
    </div>
  )
}

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/20 uppercase">
          Compétences
        </p>
        <h2 className="text-3xl font-bold text-white/80">Stack technique</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {DOMAIN_ORDER.map((domain) => (
          <DomainGroup key={domain} domain={domain} animate={animate} />
        ))}
      </div>
    </section>
  )
}
