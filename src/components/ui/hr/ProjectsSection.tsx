'use client'

import { PROJECTS } from '@/data/projects'

export function ProjectsSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/20 uppercase">
          Réalisations
        </p>
        <h2 className="text-3xl font-bold text-white/80">Projets</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-neural-project/20 hover:bg-white/[0.05]"
          >
            {/* Top glow on hover */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: 'linear-gradient(90deg, transparent, #A855F7, transparent)' }}
            />

            {/* Project number */}
            <span className="mb-4 font-mono text-xs text-white/15">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Title */}
            <h3 className="mb-2 text-base font-semibold text-white/90 transition-colors group-hover:text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mb-5 flex-1 text-sm leading-relaxed text-white/45">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="mb-5 flex flex-col gap-1.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-xs text-white/40">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-neural-project/60" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Stack badges */}
            <div className="mb-5 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-neural-project/15 bg-neural-project/5 px-2 py-0.5 font-mono text-xs text-neural-project/70"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-3">
              {project.links.github && project.links.github !== '#' && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-white/30 transition-colors hover:text-white/70"
                >
                  GitHub →
                </a>
              )}
              {project.links.live && project.links.live !== '#' && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-neural-skill/50 transition-colors hover:text-neural-skill"
                >
                  Live →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
