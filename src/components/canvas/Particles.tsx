'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import { useParticleSystem } from '@/hooks/useParticleSystem'
import type { LayoutLink } from '@/lib/neuralLayout'

interface ParticlesProps {
  links: LayoutLink[]
}

export function Particles({ links }: ParticlesProps) {
  const geometryRef = useRef<THREE.BufferGeometry>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)
  const setupDone = useRef(false)
  const prevThemeId = useRef('')
  const theme = useTheme()

  const { positionsRef, colorsRef, countRef, tick } = useParticleSystem(links)

  useFrame((_, delta) => {
    const count = countRef.current
    if (!geometryRef.current || count === 0) return

    // Lazy setup or theme change: recreate buffer attributes
    if (!setupDone.current || prevThemeId.current !== theme.id) {
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
      prevThemeId.current = theme.id
    }

    tick(delta)

    const attr = geometryRef.current.getAttribute('position') as
      | THREE.BufferAttribute
      | undefined
    if (attr) attr.needsUpdate = true

    // Update material properties from theme
    if (materialRef.current) {
      materialRef.current.size = theme.particles.size
      materialRef.current.opacity = theme.particles.opacity
    }
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        ref={materialRef}
        size={theme.particles.size}
        vertexColors
        transparent
        opacity={theme.particles.opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
