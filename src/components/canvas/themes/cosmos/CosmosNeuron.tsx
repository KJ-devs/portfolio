'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { NOISE_3D, FRESNEL } from '@/components/shaders/common.glsl'
import { cosmosNeuronVertex, cosmosNeuronFragment } from './cosmos.shaders'

interface CosmosNeuronMaterialProps {
  color: string
  emissiveIntensity: number
  hover: number
  opacity: number
}

export function CosmosNeuronMaterial({
  color,
  emissiveIntensity,
  hover,
  opacity,
}: CosmosNeuronMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uEmissiveIntensity: { value: emissiveIntensity },
      uHover: { value: hover },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uColor.value.set(color)
    uniforms.uEmissiveIntensity.value = emissiveIntensity
    uniforms.uHover.value = hover
    uniforms.uOpacity.value = opacity
  })

  const fragmentShader = useMemo(
    () => NOISE_3D + FRESNEL + cosmosNeuronFragment,
    []
  )

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={cosmosNeuronVertex}
      fragmentShader={fragmentShader}
      transparent
      depthWrite
      side={THREE.FrontSide}
    />
  )
}
