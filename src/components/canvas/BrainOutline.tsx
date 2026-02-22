'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import {
  generateBrainInnerPoints,
  generateBrainSurfacePoints,
} from '@/lib/brainGeometry'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const SURFACE_COUNT = 300
const INNER_COUNT = 80

export function BrainOutline() {
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const innerGeoRef = useRef<THREE.BufferGeometry>(null)
  const timeRef = useRef(0)
  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const fadeRef = useRef(0)

  const surface = useMemo(() => {
    const pts = generateBrainSurfacePoints(SURFACE_COUNT)
    const positions = new Float32Array(SURFACE_COUNT * 3)
    const basePositions = new Float32Array(SURFACE_COUNT * 3)
    const colors = new Float32Array(SURFACE_COUNT * 3)

    pts.forEach((pt, i) => {
      positions[i * 3] = pt.position[0]
      positions[i * 3 + 1] = pt.position[1]
      positions[i * 3 + 2] = pt.position[2]
      basePositions[i * 3] = pt.position[0]
      basePositions[i * 3 + 1] = pt.position[1]
      basePositions[i * 3 + 2] = pt.position[2]

      const c = new THREE.Color(pt.color)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    })

    return { positions, basePositions, colors }
  }, [])

  const inner = useMemo(() => {
    const pts = generateBrainInnerPoints(INNER_COUNT)
    const positions = new Float32Array(INNER_COUNT * 3)
    const basePositions = new Float32Array(INNER_COUNT * 3)
    const colors = new Float32Array(INNER_COUNT * 3)

    pts.forEach((pt, i) => {
      positions[i * 3] = pt.position[0]
      positions[i * 3 + 1] = pt.position[1]
      positions[i * 3 + 2] = pt.position[2]
      basePositions[i * 3] = pt.position[0]
      basePositions[i * 3 + 1] = pt.position[1]
      basePositions[i * 3 + 2] = pt.position[2]

      const c = new THREE.Color(pt.color)
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    })

    return { positions, basePositions, colors }
  }, [])

  // Subtle breathing animation + fade in after intro
  useFrame((_, delta) => {
    if (!isIntroComplete) return

    // Fade in
    fadeRef.current = Math.min(fadeRef.current + delta * 0.5, 1)
    timeRef.current += delta

    const t = timeRef.current

    // Surface points breathing
    if (geoRef.current) {
      const attr = geoRef.current.getAttribute('position') as THREE.BufferAttribute | undefined
      if (attr) {
        for (let i = 0; i < SURFACE_COUNT; i++) {
          const idx = i * 3
          const bx = surface.basePositions[idx] ?? 0
          const by = surface.basePositions[idx + 1] ?? 0
          const bz = surface.basePositions[idx + 2] ?? 0

          const breathe = Math.sin(t * 0.4 + bx * 0.08 + by * 0.12 + bz * 0.06) * 0.03
          const scale = 1 + breathe

          surface.positions[idx] = bx * scale
          surface.positions[idx + 1] = by * scale
          surface.positions[idx + 2] = bz * scale
        }
        attr.needsUpdate = true
      }
    }

    // Inner points gentle drift
    if (innerGeoRef.current) {
      const attr = innerGeoRef.current.getAttribute('position') as THREE.BufferAttribute | undefined
      if (attr) {
        for (let i = 0; i < INNER_COUNT; i++) {
          const idx = i * 3
          const bx = inner.basePositions[idx] ?? 0
          const by = inner.basePositions[idx + 1] ?? 0
          const bz = inner.basePositions[idx + 2] ?? 0

          const drift = Math.sin(t * 0.3 + i * 0.5) * 0.4
          inner.positions[idx] = bx + drift * 0.3
          inner.positions[idx + 1] = by + drift * 0.2
          inner.positions[idx + 2] = bz + drift * 0.15
        }
        attr.needsUpdate = true
      }
    }
  })

  const opacity = isIntroComplete ? 0.18 : 0

  return (
    <group>
      {/* Surface outline points */}
      <points>
        <bufferGeometry
          ref={geoRef}
          onUpdate={(geo) => {
            geo.setAttribute('position', new THREE.BufferAttribute(surface.positions, 3))
            geo.setAttribute('color', new THREE.BufferAttribute(surface.colors, 3))
          }}
        />
        <pointsMaterial
          size={0.22}
          vertexColors
          transparent
          opacity={opacity}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner structure points */}
      <points>
        <bufferGeometry
          ref={innerGeoRef}
          onUpdate={(geo) => {
            geo.setAttribute('position', new THREE.BufferAttribute(inner.positions, 3))
            geo.setAttribute('color', new THREE.BufferAttribute(inner.colors, 3))
          }}
        />
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={opacity * 0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
}
