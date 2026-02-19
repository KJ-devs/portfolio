'use client'

import { useState } from 'react'
import { HRViewVA } from '@/components/ui/hr/HRViewVA'
import { HRViewVB } from '@/components/ui/hr/HRViewVB'
import { HRViewVC } from '@/components/ui/hr/HRViewVC'
import { HRViewV2 } from '@/components/ui/hr/HRViewV2'
import { HRViewV3 } from '@/components/ui/hr/HRViewV3'
import { ContactSection } from '@/components/ui/hr/ContactSection'
import { HeroSection } from '@/components/ui/hr/HeroSection'
import { ProjectsSection } from '@/components/ui/hr/ProjectsSection'
import { SkillsSection } from '@/components/ui/hr/SkillsSection'
import { TimelineSection } from '@/components/ui/hr/TimelineSection'

type DesignVersion = 'v1' | 'v2' | 'v3' | 'va' | 'vb' | 'vc'

const VERSIONS: { id: DesignVersion; label: string; accent: string }[] = [
  { id: 'v1', label: 'Classic', accent: '#ffffff' },
  { id: 'v2', label: 'Signal', accent: '#00D4FF' },
  { id: 'v3', label: 'Aura', accent: '#A855F7' },
  { id: 'va', label: 'Monolith', accent: '#C4963C' },
  { id: 'vb', label: 'Surge', accent: '#FFD94A' },
  { id: 'vc', label: 'Cinéma', accent: '#C026D3' },
]

function VersionSwitcher({
  current,
  onChange,
}: {
  current: DesignVersion
  onChange: (v: DesignVersion) => void
}) {
  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-1.5 backdrop-blur-xl"
      style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
    >
      {VERSIONS.map((v) => {
        const active = current === v.id
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            title={v.label}
            className="rounded-full px-3.5 py-1.5 font-mono text-xs transition-all duration-200"
            style={
              active
                ? {
                    background: `${v.accent}22`,
                    border: `1px solid ${v.accent}55`,
                    color: v.accent,
                  }
                : {
                    background: 'transparent',
                    border: '1px solid transparent',
                    color: 'rgba(255,255,255,0.35)',
                  }
            }
          >
            {v.label}
          </button>
        )
      })}
    </div>
  )
}

function HRViewV1() {
  return (
    <div className="fixed inset-0 z-30 overflow-y-auto bg-neural-bg">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <HeroSection />
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

export function HRView() {
  const [version, setVersion] = useState<DesignVersion>('v1')

  return (
    <>
      {version === 'v1' && <HRViewV1 />}
      {version === 'v2' && <HRViewV2 />}
      {version === 'v3' && <HRViewV3 />}
      {version === 'va' && <HRViewVA />}
      {version === 'vb' && <HRViewVB />}
      {version === 'vc' && <HRViewVC />}
      <VersionSwitcher current={version} onChange={setVersion} />
    </>
  )
}
