'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { NOISE_3D, FBM } from '@/components/shaders/common.glsl'
import { useTheme } from '@/hooks/useTheme'
import { cosmosNebulaVertex, cosmosNebulaFragment } from './cosmos.shaders'

export function CosmosBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const theme = useTheme()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: {
        value: new THREE.Color(theme.colors.categories.skill),
      },
      uColor2: {
        value: new THREE.Color(theme.colors.categories.project),
      },
      uColor3: {
        value: new THREE.Color(theme.colors.categories.experience),
      },
      uOpacity: { value: theme.background.nebulaOpacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const fragmentShader = useMemo(
    () => NOISE_3D + FBM + cosmosNebulaFragment,
    []
  )

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    mesh.rotation.z += delta * 0.01

    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uColor1.value.set(theme.colors.categories.skill)
    uniforms.uColor2.value.set(theme.colors.categories.project)
    uniforms.uColor3.value.set(theme.colors.categories.experience)
    uniforms.uOpacity.value = theme.background.nebulaOpacity
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -80]}>
      <planeGeometry args={[200, 200]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={cosmosNebulaVertex}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
