'use client'

import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import type { ThemeId } from '@/lib/themes'

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

    // Use theme accent colors for dust tint
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

/** Cyberpunk infinite grid plane */
function CyberpunkGrid() {
  const gridRef = useRef<THREE.Group>(null)
  const timeRef = useRef(0)
  const theme = useTheme()

  const gridColor = new THREE.Color(theme.colors.categories.project)

  useFrame((_, delta) => {
    timeRef.current += delta
    if (gridRef.current) {
      // Subtle scroll effect
      gridRef.current.position.z = (timeRef.current * 0.5) % 2
    }
  })

  return (
    <group ref={gridRef} position={[0, -25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[400, 80, gridColor, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent
        material-opacity={0.08}
      />
      <gridHelper
        args={[400, 20, gridColor, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent
        material-opacity={0.15}
      />
    </group>
  )
}

/** Ocean caustic light columns */
function OceanCaustics() {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const timeRef = useRef(0)
  const count = 200

  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const basPos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Scattered throughout the scene — rising like bubbles
      const x = (Math.random() - 0.5) * 120
      const y = (Math.random() - 0.5) * 80
      const z = (Math.random() - 0.5) * 120

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      basPos[i * 3] = x
      basPos[i * 3 + 1] = y
      basPos[i * 3 + 2] = z

      // Bioluminescent teal/green tints
      const r = 0.0 + Math.random() * 0.1
      const g = 0.4 + Math.random() * 0.4
      const b = 0.5 + Math.random() * 0.3
      col[i * 3] = r
      col[i * 3 + 1] = g
      col[i * 3 + 2] = b
    }

    return { positions: pos, basePositions: basPos, colors: col }
  }, [])

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

      // Slow upward drift (bubbles)
      const rise = (t * 0.3 + i * 0.7) % 80 - 40
      // Horizontal wobble
      const wobX = Math.sin(t * 0.2 + i * 0.4) * 1.5
      const wobZ = Math.cos(t * 0.15 + i * 0.3) * 1.5

      positions[idx] = bx + wobX
      positions[idx + 1] = by + rise
      positions[idx + 2] = bz + wobZ
    }

    attr.needsUpdate = true
  })

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.002
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
        size={0.4}
        vertexColors
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Crystal aurora borealis light curtains */
function CrystalAurora() {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const timeRef = useRef(0)
  const count = 500

  const { positions, basePositions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const basPos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const palette: THREE.Color[] = [
      new THREE.Color('#88CCFF'),
      new THREE.Color('#CC88FF'),
      new THREE.Color('#88FFCC'),
      new THREE.Color('#AABBFF'),
      new THREE.Color('#FFFFFF'),
    ]

    for (let i = 0; i < count; i++) {
      // Curtain-like — spread wide on X, vertical on Y, thin on Z
      const x = (Math.random() - 0.5) * 200
      const y = 30 + Math.random() * 60
      const z = -40 + (Math.random() - 0.5) * 30

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      basPos[i * 3] = x
      basPos[i * 3 + 1] = y
      basPos[i * 3 + 2] = z

      const c = palette[Math.floor(Math.random() * palette.length)] ?? palette[0]!
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return { positions: pos, basePositions: basPos, colors: col }
  }, [])

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

      // Gentle wave motion
      const wave = Math.sin(t * 0.3 + bx * 0.02) * 3
      const shimmer = Math.sin(t * 0.8 + i * 0.1) * 0.5

      positions[idx] = bx + shimmer
      positions[idx + 1] = by + wave
      positions[idx + 2] = bz + Math.cos(t * 0.2 + bx * 0.01) * 2
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
        size={0.8}
        vertexColors
        transparent
        opacity={0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Theme-specific background helper */
function ThemeBackground({ themeId }: { themeId: ThemeId }) {
  switch (themeId) {
    case 'cyberpunk':
      return <CyberpunkGrid />
    case 'ocean':
      return <OceanCaustics />
    case 'crystal':
      return <CrystalAurora />
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
