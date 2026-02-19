'use client'

import { useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'

import { PARTICLE_CONFIG } from '@/lib/constants'
import type { LayoutLink } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

interface Particle {
  linkIndex: number
  progress: number // 0–1 along the synapse
  speed: number // current speed (may be boosted during burst)
  baseSpeed: number // normal cruising speed
  burstTimer: number // seconds remaining at burst speed (0 = normal)
}

export interface ParticleSystemResult {
  positionsRef: React.MutableRefObject<Float32Array>
  colorsRef: React.MutableRefObject<Float32Array>
  countRef: React.MutableRefObject<number>
  tick: (delta: number) => void
}

export function useParticleSystem(links: LayoutLink[]): ParticleSystemResult {
  const particles = useRef<Particle[]>([])
  const positionsRef = useRef<Float32Array>(new Float32Array(0))
  const colorsRef = useRef<Float32Array>(new Float32Array(0))
  const countRef = useRef(0)

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const prevSelectedId = useRef<string | null>(null)

  // Build particle pool when links become available (runs once)
  useEffect(() => {
    if (links.length === 0) return

    const newParticles: Particle[] = []
    const newColors: number[] = []

    links.forEach((link, i) => {
      const srcColor = new THREE.Color(link.source.color ?? '#00D4FF')

      for (let j = 0; j < PARTICLE_CONFIG.perSynapse; j++) {
        const baseSpeed =
          PARTICLE_CONFIG.speed.min +
          Math.random() * (PARTICLE_CONFIG.speed.max - PARTICLE_CONFIG.speed.min)

        newParticles.push({
          linkIndex: i,
          progress: Math.random(), // stagger initial positions along synapse
          speed: baseSpeed,
          baseSpeed,
          burstTimer: 0,
        })

        // Tint toward target color at second particle
        const blendFactor = j === 1 ? 0.6 : 0
        const tint = srcColor
          .clone()
          .lerp(new THREE.Color(link.target.color ?? '#ffffff'), blendFactor)
        newColors.push(tint.r, tint.g, tint.b)
      }
    })

    particles.current = newParticles
    countRef.current = newParticles.length
    positionsRef.current = new Float32Array(newParticles.length * 3)
    colorsRef.current = new Float32Array(newColors)
  }, [links])

  // Propagation wave: burst particles on selected neuron's connected synapses
  useEffect(() => {
    const selectedId = selectedNeuron?.id ?? null
    if (selectedId === prevSelectedId.current) return
    prevSelectedId.current = selectedId

    if (!selectedId || links.length === 0) return

    particles.current.forEach((p) => {
      const link = links[p.linkIndex]
      if (link?.source.id === selectedId || link?.target.id === selectedId) {
        p.progress = 0 // restart from source node
        p.speed = PARTICLE_CONFIG.speed.max * 4 // burst speed
        p.burstTimer = 1.2 // seconds at burst speed
      }
    })
  }, [selectedNeuron, links])

  // Called every frame from Particles.tsx — updates positions in-place
  const tick = useCallback(
    (delta: number) => {
      const pts = particles.current
      const pos = positionsRef.current
      if (pts.length === 0) return

      pts.forEach((p, i) => {
        // Decay burst timer and restore base speed
        if (p.burstTimer > 0) {
          p.burstTimer -= delta
          if (p.burstTimer <= 0) {
            p.speed = p.baseSpeed
            p.burstTimer = 0
          }
        }

        // Advance particle — speed is in progress-per-frame at 60fps
        p.progress += p.speed * delta * 60
        if (p.progress > 1) p.progress -= 1

        // Interpolate world position along the synapse
        const link = links[p.linkIndex]
        if (!link) return

        const t = p.progress
        pos[i * 3] = link.source.x + (link.target.x - link.source.x) * t
        pos[i * 3 + 1] = link.source.y + (link.target.y - link.source.y) * t
        pos[i * 3 + 2] = link.source.z + (link.target.z - link.source.z) * t
      })
    },
    [links],
  )

  return { positionsRef, colorsRef, countRef, tick }
}
