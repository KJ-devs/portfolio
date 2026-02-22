'use client'

import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'

import {
  cyberpunkDataRainVertex,
  cyberpunkDataRainFragment,
} from './cyberpunk.shaders'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const RAIN_COUNT = 500
const COLUMNS = 25       // grid columns on X
const ROWS = 20          // grid rows on Z
const Y_RANGE = 100      // total vertical span
const Y_OFFSET = -50     // bottom of the rain volume
const FALL_SPEED = 18    // units per second

// ---------------------------------------------------------------------------
// Data Rain
// ---------------------------------------------------------------------------

function CyberpunkDataRain() {
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const timeRef = useRef(0)

  const { positions, seeds } = useMemo(() => {
    const pos = new Float32Array(RAIN_COUNT * 3)
    const sd = new Float32Array(RAIN_COUNT)

    const colSpacing = 6
    const rowSpacing = 6

    for (let i = 0; i < RAIN_COUNT; i++) {
      // Distribute into a grid on X/Z, randomised Y
      const col = i % COLUMNS
      const row = Math.floor(i / COLUMNS) % ROWS
      const x = (col - COLUMNS / 2) * colSpacing + (Math.random() - 0.5) * 2
      const z = (row - ROWS / 2) * rowSpacing + (Math.random() - 0.5) * 2
      const y = Math.random() * Y_RANGE + Y_OFFSET

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z

      sd[i] = Math.random() // per-particle phase seed
    }

    return { positions: pos, seeds: sd }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointSize: { value: 3.0 },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (!geoRef.current) return
    timeRef.current += delta

    const attr = geoRef.current.getAttribute('position') as THREE.BufferAttribute | undefined
    if (!attr) return

    for (let i = 0; i < RAIN_COUNT; i++) {
      const idx = i * 3 + 1 // Y component
      const seed = seeds[i] ?? 0
      positions[idx]! -= FALL_SPEED * delta * (0.6 + seed * 0.8)

      // Wrap around when below threshold
      if ((positions[idx] ?? 0) < Y_OFFSET) {
        positions[idx] = Y_OFFSET + Y_RANGE
      }
    }

    attr.needsUpdate = true

    if (matRef.current) {
      matRef.current.uniforms.uTime!.value = timeRef.current
    }
  })

  return (
    <points>
      <bufferGeometry
        ref={geoRef}
        onUpdate={(geo) => {
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        }}
      />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={cyberpunkDataRainVertex}
        fragmentShader={cyberpunkDataRainFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// Pulsing Grid
// ---------------------------------------------------------------------------

function CyberpunkPulsingGrid() {
  const gridRef = useRef<THREE.Group>(null)
  const fineMatRef = useRef<THREE.Material>(null)
  const coarseMatRef = useRef<THREE.Material>(null)
  const timeRef = useRef(0)
  const theme = useTheme()

  const gridColor = useMemo(
    () => new THREE.Color(theme.colors.categories.project),
    [theme.colors.categories.project],
  )

  useFrame((_, delta) => {
    timeRef.current += delta

    // Subtle scroll
    if (gridRef.current) {
      gridRef.current.position.z = (timeRef.current * 0.5) % 2
    }

    // Opacity pulse
    const pulse = Math.sin(timeRef.current * 2.0) * 0.03

    if (fineMatRef.current && 'opacity' in fineMatRef.current) {
      ;(fineMatRef.current as THREE.Material & { opacity: number }).opacity = 0.08 + pulse
    }
    if (coarseMatRef.current && 'opacity' in coarseMatRef.current) {
      ;(coarseMatRef.current as THREE.Material & { opacity: number }).opacity = 0.15 + pulse
    }
  })

  return (
    <group ref={gridRef} position={[0, -25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper
        args={[400, 80, gridColor, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent
        material-opacity={0.08}
        ref={(mesh) => {
          if (mesh) {
            const m = (mesh as unknown as { material?: THREE.Material }).material
            if (m) fineMatRef.current = m
          }
        }}
      />
      <gridHelper
        args={[400, 20, gridColor, gridColor]}
        rotation={[Math.PI / 2, 0, 0]}
        material-transparent
        material-opacity={0.15}
        ref={(mesh) => {
          if (mesh) {
            const m = (mesh as unknown as { material?: THREE.Material }).material
            if (m) coarseMatRef.current = m
          }
        }}
      />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Composite background
// ---------------------------------------------------------------------------

export function CyberpunkBackground() {
  return (
    <>
      <CyberpunkDataRain />
      <CyberpunkPulsingGrid />
    </>
  )
}
