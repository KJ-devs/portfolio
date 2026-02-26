'use client'

import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

import { translations } from '@/lib/i18n'
import type { Lang } from '@/lib/i18n'
import type { SkillMeta } from '@/types/neuron'

const DOMAIN_LABEL: Record<SkillMeta['domain'], Record<Lang, string>> = {
  frontend: { fr: 'Frontend',  de: 'Frontend',  en: 'Frontend' },
  backend:  { fr: 'Backend',   de: 'Backend',   en: 'Backend' },
  ai:       { fr: 'IA / Data', de: 'KI / Data', en: 'AI / Data' },
  devops:   { fr: 'DevOps',    de: 'DevOps',    en: 'DevOps' },
}

interface Props {
  meta: SkillMeta
  description: string
  lang: Lang
}

export function SkillPanel({ meta, description, lang }: Props) {
  const t = translations[lang]
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    const tween = gsap.fromTo(
      barRef.current,
      { width: '0%' },
      { width: `${meta.level}%`, duration: 0.8, ease: 'power2.out', delay: 0.3 },
    )
    return () => { tween.kill() }
  }, [meta.level])

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/70">{description}</p>
      <div>
        <div className="mb-1 flex justify-between text-xs text-white/50">
          <span>{t.skill_mastery}</span>
          <span>{meta.level}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            style={{ width: 0 }}
          />
        </div>
      </div>
      <span className="inline-block rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/60">
        {DOMAIN_LABEL[meta.domain][lang]}
      </span>
    </div>
  )
}
