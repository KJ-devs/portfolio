'use client'

import type { ExperienceMeta } from '@/types/neuron'

interface Props {
  meta: ExperienceMeta
  description: string
}

export function ExperiencePanel({ meta, description }: Props) {
  return (
    <div className="space-y-4">
      <div className="font-mono text-sm text-emerald-400">{meta.period}</div>
      <p className="text-sm text-white/70">{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {meta.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
