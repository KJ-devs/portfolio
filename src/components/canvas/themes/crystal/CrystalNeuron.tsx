'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { FRESNEL } from '@/components/shaders/common.glsl'
import { crystalNeuronVertex, crystalNeuronFragment } from './crystal.shaders'

interface CrystalNeuronMaterialProps {
  color: string
  emissiveIntensity: number
  hover: number
  opacity: number
}

export function CrystalNeuronMaterial({
  color,
  emissiveIntensity,
  hover,
  opacity,
}: CrystalNeuronMaterialProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uEmissiveIntensity: { value: emissiveIntensity },
      uHover: { value: hover },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Prepend shared GLSL fresnel utility into the fragment source
  const fragmentShader = useMemo(
    () => FRESNEL + '\n' + crystalNeuronFragment,
    [],
  )

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uColor.value.set(color)
    uniforms.uEmissiveIntensity.value = emissiveIntensity
    uniforms.uHover.value = hover
    uniforms.uOpacity.value = opacity
  })

  return (
    <shaderMaterial
      ref={matRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={crystalNeuronVertex}
      fragmentShader={fragmentShader}
      transparent
      depthWrite
      side={THREE.FrontSide}
    />
  )
}
