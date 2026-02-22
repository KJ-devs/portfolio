'use client'

import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import type { ThemeId } from '@/lib/themes'

import { CosmosBackground } from './themes/cosmos/CosmosBackground'
import { CyberpunkBackground } from './themes/cyberpunk/CyberpunkBackground'
import { OceanBackground } from './themes/ocean/OceanBackground'
import { CrystalBackground } from './themes/crystal/CrystalBackground'

/** Distant colored nebula particles — deep space atmosphere */
function NebulaParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const theme = useTheme()
  const count = 400

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const cats = theme.colors.categories
    const palette: THREE.Color[] = Object.values(cats).map((c) => new THREE.Color(c))

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 70 + Math.random() * 130
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)] ?? new THREE.Color('#00D4FF')
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return { positions: pos, colors: col }
  }, [theme.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useMemo(() => {
    if (!geoRef.current) return
    geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geoRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [positions, colors])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.004
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry
        ref={geoRef}
        onUpdate={(geo) => {
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        }}
      />
      <pointsMaterial
        size={0.6}
        vertexColors
        transparent
        opacity={theme.background.nebulaOpacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Close-range micro-particles around the brain */
function BrainAmbientDust() {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const timeRef = useRef(0)
  const theme = useTheme()
  const count = 150

  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const basPos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const bgColor = new THREE.Color(theme.colors.ambientLight)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 18 + Math.random() * 15

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = (r * Math.cos(phi)) * 0.8
      const z = r * Math.sin(phi) * Math.sin(theta)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      basPos[i * 3] = x
      basPos[i * 3 + 1] = y
      basPos[i * 3 + 2] = z

      const brightness = 0.4 + Math.random() * 0.3
      col[i * 3] = brightness * (0.5 + bgColor.r * 0.5)
      col[i * 3 + 1] = brightness * (0.5 + bgColor.g * 0.5)
      col[i * 3 + 2] = brightness * (0.5 + bgColor.b * 0.5)
    }

    return { positions: pos, basePositions: basPos, colors: col }
  }, [theme.id]) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((_, delta) => {
    if (!geoRef.current) return
    timeRef.current += delta

    const attr = geoRef.current.getAttribute('position') as THREE.BufferAttribute | undefined
    if (!attr) return

    const t = timeRef.current
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const bx = basePositions[idx] ?? 0
      const by = basePositions[idx + 1] ?? 0
      const bz = basePositions[idx + 2] ?? 0

      const angle = t * 0.02 + i * 0.1
      const drift = Math.sin(t * 0.15 + i * 0.3) * 0.8

      positions[idx] = bx + Math.cos(angle) * drift
      positions[idx + 1] = by + Math.sin(t * 0.1 + i * 0.2) * 0.3
      positions[idx + 2] = bz + Math.sin(angle) * drift
    }

    attr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry
        ref={geoRef}
        onUpdate={(geo) => {
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        }}
      />
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={theme.background.dustOpacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Theme-specific shader backgrounds */
function ThemeBackground({ themeId }: { themeId: ThemeId }) {
  switch (themeId) {
    case 'cosmos':
      return <CosmosBackground />
    case 'cyberpunk':
      return <CyberpunkBackground />
    case 'ocean':
      return <OceanBackground />
    case 'crystal':
      return <CrystalBackground />
    default:
      return null
  }
}

export function BackgroundEffects() {
  const theme = useTheme()

  return (
    <>
      <Stars
        radius={180}
        depth={80}
        count={theme.background.starsCount}
        factor={4}
        saturation={theme.id === 'cyberpunk' ? 0.8 : 0.1}
        fade
        speed={0.3}
      />
      <NebulaParticles />
      <BrainAmbientDust />
      <ThemeBackground themeId={theme.id} />
    </>
  )
}
