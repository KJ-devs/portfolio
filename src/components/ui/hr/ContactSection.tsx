'use client'

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/KJ-devs',
    color: '#F5E6CC',
    description: 'Voir mes projets open source',
  },
  {
    label: 'LinkedIn',
    href: '#',
    color: '#00D4FF',
    description: 'Mon profil professionnel',
  },
  {
    label: 'Email',
    href: 'mailto:contact@sunny.dev',
    color: '#10B981',
    description: 'contact@sunny.dev',
  },
  {
    label: 'CV PDF',
    href: '/cv.pdf',
    color: '#A855F7',
    description: 'Télécharger mon CV',
  },
]

export function ContactSection() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 font-mono text-xs tracking-[0.3em] text-white/20 uppercase">
          Contact
        </p>
        <h2 className="text-3xl font-bold text-white/80">Me contacter</h2>
        <p className="mt-3 text-sm text-white/40">
          Ouvert aux opportunités — alternance, CDI, freelance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="group flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-6 text-center transition-all duration-200 hover:border-white/10 hover:bg-white/[0.06]"
          >
            <div
              className="h-2 w-2 rounded-full transition-all duration-200 group-hover:scale-110"
              style={{
                backgroundColor: link.color,
                boxShadow: `0 0 10px ${link.color}80`,
              }}
            />
            <span className="font-mono text-sm font-medium text-white/70 transition-colors group-hover:text-white/90">
              {link.label}
            </span>
            <span className="text-xs text-white/25 transition-colors group-hover:text-white/40">
              {link.description}
            </span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <p className="mt-16 text-center font-mono text-xs text-white/15">
        Built with Next.js · Three.js · React Three Fiber
      </p>
    </section>
  )
}
