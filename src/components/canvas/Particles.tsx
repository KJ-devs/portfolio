'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { PARTICLE_CONFIG } from '@/lib/constants'
import { useParticleSystem } from '@/hooks/useParticleSystem'
import type { LayoutLink } from '@/lib/neuralLayout'

interface ParticlesProps {
  links: LayoutLink[]
}

export function Particles({ links }: ParticlesProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const setupDone = useRef(false)

  const { positionsRef, colorsRef, countRef, tick } = useParticleSystem(links)

  useFrame((_, delta) => {
    const count = countRef.current
    if (!geometryRef.current || count === 0) return

    // Lazy setup: create buffer attributes on first frame particles are ready
    if (!setupDone.current) {
      geometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(positionsRef.current, 3),
      )
      geometryRef.current.setAttribute(
        'color',
        new THREE.BufferAttribute(colorsRef.current, 3),
      )
      geometryRef.current.setDrawRange(0, count)
      setupDone.current = true
    }

    // Advance all particles in-place
    tick(delta)

    // Signal Three.js that position data changed
    const attr = geometryRef.current.getAttribute('position') as
      | THREE.BufferAttribute
      | undefined
    if (attr) attr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={PARTICLE_CONFIG.size}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
