'use client'

import type { ContactMeta } from '@/types/neuron'

interface Props {
  meta: ContactMeta
  label: string
}

export function ContactPanel({ meta, label }: Props) {
  return (
    <div className="pt-2">
      <a
        href={meta.link}
        target={meta.action === 'url' ? '_blank' : undefined}
        rel={meta.action === 'url' ? 'noreferrer' : undefined}
        className="inline-flex items-center gap-2 rounded-xl border border-pink-500/30 bg-pink-500/20 px-4 py-2.5 text-sm font-medium text-pink-300 transition-colors hover:bg-pink-500/30"
      >
        {label} ↗
      </a>
    </div>
  )
}
