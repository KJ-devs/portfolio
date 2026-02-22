'use client'

import { useCallback, useState } from 'react'

import type { ProjectMeta } from '@/types/neuron'

import { MediaLightbox } from './MediaLightbox'
import { MediaStrip } from './MediaStrip'

interface Props {
  meta: ProjectMeta
  description: string
}

export function ProjectPanel({ meta, description }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
  }, [])

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/70">{description}</p>

      {meta.media && meta.media.length > 0 && (
        <MediaStrip media={meta.media} onSelect={openLightbox} />
      )}

      <div className="flex flex-wrap gap-1.5">
        {meta.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-violet-500/30 bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300"
          >
            {tech}
          </span>
        ))}
      </div>
      {meta.highlights.length > 0 && (
        <ul className="space-y-1">
          {meta.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-white/60">
              <span className="mt-0.5 text-violet-400">▸</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-3">
        {meta.links.github && meta.links.github !== '#' && (
          <a
            href={meta.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/20"
          >
            GitHub ↗
          </a>
        )}
        {meta.links.live && meta.links.live !== '#' && (
          <a
            href={meta.links.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-violet-500/30 px-3 py-1.5 text-sm text-violet-200 transition-colors hover:bg-violet-500/50"
          >
            Live ↗
          </a>
        )}
      </div>

      {lightboxIndex !== null && meta.media && (
        <MediaLightbox
          media={meta.media}
          initialIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
