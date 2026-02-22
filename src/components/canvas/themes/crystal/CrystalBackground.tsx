'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { NOISE_3D, FBM } from '@/components/shaders/common.glsl'
import { useTheme } from '@/hooks/useTheme'
import {
  crystalAuroraVertex,
  crystalAuroraFragment,
  crystalSparkleVertex,
  crystalSparkleFragment,
} from './crystal.shaders'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const SPARKLE_COUNT = 400
const AURORA_WIDTH = 250
const AURORA_HEIGHT = 100

// ---------------------------------------------------------------------------
// CrystalAurora -- aurora borealis curtain
// ---------------------------------------------------------------------------

function CrystalAurora() {
  const meshRef = useRef<THREE.Mesh>(null)
  const theme = useTheme()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: theme.background.nebulaOpacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const fragmentShader = useMemo(
    () => NOISE_3D + FBM + crystalAuroraFragment,
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uOpacity.value = theme.background.nebulaOpacity
  })

  return (
    <mesh ref={meshRef} position={[0, 50, -60]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[AURORA_WIDTH, AURORA_HEIGHT, 32, 16]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={crystalAuroraVertex}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// ---------------------------------------------------------------------------
// CrystalFrostSparkles -- scattered twinkling frost particles
// ---------------------------------------------------------------------------

function CrystalFrostSparkles() {
  const pointsRef = useRef<THREE.Points>(null)
  const theme = useTheme()

  const { positions, phases } = useMemo(() => {
    const posArr = new Float32Array(SPARKLE_COUNT * 3)
    const phaseArr = new Float32Array(SPARKLE_COUNT)

    for (let i = 0; i < SPARKLE_COUNT; i++) {
      const i3 = i * 3
      // Scatter in a large volume around the scene
      posArr[i3] = (Math.random() - 0.5) * 180
      posArr[i3 + 1] = (Math.random() - 0.5) * 120
      posArr[i3 + 2] = (Math.random() - 0.5) * 140

      // Unique phase for twinkling offset
      phaseArr[i] = Math.random()
    }

    return { positions: posArr, phases: phaseArr }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointSize: { value: 3.0 },
      uTint: { value: new THREE.Color('#88CCFF') },
    }),
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uTint.value.set(theme.colors.categories.skill)
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry
        onUpdate={(geo) => {
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          geo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))
        }}
      />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={crystalSparkleVertex}
        fragmentShader={crystalSparkleFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ---------------------------------------------------------------------------
// CrystalBackground -- combined aurora + frost sparkles
// ---------------------------------------------------------------------------

export function CrystalBackground() {
  return (
    <>
      <CrystalAurora />
      <CrystalFrostSparkles />
    </>
  )
}
