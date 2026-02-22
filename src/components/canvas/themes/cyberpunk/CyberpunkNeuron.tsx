'use client'

import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

import { FRESNEL } from '@/components/shaders/common.glsl'

import {
  cyberpunkNeuronVertex,
  cyberpunkNeuronFragment,
} from './cyberpunk.shaders'

interface CyberpunkNeuronMaterialProps {
  color: string
  emissiveIntensity: number
  hover: number
  opacity: number
}

export function CyberpunkNeuronMaterial({
  color,
  emissiveIntensity,
  hover,
  opacity,
}: CyberpunkNeuronMaterialProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uEmissiveIntensity: { value: emissiveIntensity },
      uHover: { value: hover },
      uOpacity: { value: opacity },
    }),
    // Only rebuild uniforms object when the material is first created.
    // Per-frame values are patched in useFrame below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Prepend shared GLSL fresnel utility into the fragment source
  const fragmentShader = useMemo(
    () => FRESNEL + '\n' + cyberpunkNeuronFragment,
    [],
  )

  useFrame((_, delta) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime!.value += delta
    matRef.current.uniforms.uColor!.value.set(color)
    matRef.current.uniforms.uEmissiveIntensity!.value = emissiveIntensity
    matRef.current.uniforms.uHover!.value = hover
    matRef.current.uniforms.uOpacity!.value = opacity
  })

  return (
    <shaderMaterial
      ref={matRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={cyberpunkNeuronVertex}
      fragmentShader={fragmentShader}
      transparent
      side={THREE.FrontSide}
      depthWrite={false}
    />
  )
}
