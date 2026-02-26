'use client'

import type { CoreMeta } from '@/types/neuron'

interface Props {
  meta: CoreMeta
  description: string
  title?: string
}

export function CorePanel({ meta, description, title }: Props) {
  return (
    <div className="space-y-3">
      <p className="font-mono text-sm text-white/50">{title ?? meta.title}</p>
      <p className="text-sm leading-relaxed text-white/70">{description}</p>
    </div>
  )
}
