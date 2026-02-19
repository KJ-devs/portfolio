'use client'

import { EXPERIENCES } from '@/data/experiences'

export function TimelineSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/20 uppercase">
          Parcours
        </p>
        <h2 className="text-3xl font-bold text-white/80">Expériences &amp; Formation</h2>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-neural-experience/40 via-neural-experience/20 to-transparent md:left-1/2" />

        <div className="flex flex-col gap-10">
          {EXPERIENCES.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex gap-6 md:gap-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-4 top-5 z-10 -translate-x-1/2 md:left-1/2">
                <div
                  className="h-3 w-3 rounded-full border-2 border-neural-experience bg-neural-bg"
                  style={{ boxShadow: '0 0 10px #10B981' }}
                />
              </div>

              {/* Content card */}
              <div
                className={`ml-10 w-full rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/10 md:ml-0 md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                {/* Period badge */}
                <span className="mb-3 inline-block rounded-full border border-neural-experience/20 bg-neural-experience/10 px-3 py-0.5 font-mono text-xs text-neural-experience">
                  {exp.period}
                </span>

                <h3 className="mb-2 text-base font-semibold text-white/90">{exp.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/50">{exp.description}</p>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
