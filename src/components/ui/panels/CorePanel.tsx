'use client'

import type { CoreMeta } from '@/types/neuron'

interface Props {
  meta: CoreMeta
  description: string
}

export function CorePanel({ meta, description }: Props) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-sm text-white/50">{meta.title}</p>
      <p className="text-sm leading-relaxed text-white/70">{meta.bio || description}</p>
    </div>
  )
}
