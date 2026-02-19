'use client'

import { ContactSection } from '@/components/ui/hr/ContactSection'
import { HeroSection } from '@/components/ui/hr/HeroSection'
import { ProjectsSection } from '@/components/ui/hr/ProjectsSection'
import { SkillsSection } from '@/components/ui/hr/SkillsSection'
import { TimelineSection } from '@/components/ui/hr/TimelineSection'

export function HRView() {
  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-neural-bg">
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <HeroSection />

      {/* Divider */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <SkillsSection />

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <TimelineSection />

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <ProjectsSection />

      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <ContactSection />
    </div>
  )
}
