'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { FRESNEL } from '@/components/shaders/common.glsl'
import { oceanNeuronVertex, oceanNeuronFragment } from './ocean.shaders'

interface OceanNeuronMaterialProps {
  color: string
  emissiveIntensity: number
  hover: number
  opacity: number
}

export function OceanNeuronMaterial({
  color,
  emissiveIntensity,
  hover,
  opacity,
}: OceanNeuronMaterialProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 0.15 },
      uColor: { value: new THREE.Color(color) },
      uEmissiveIntensity: { value: emissiveIntensity },
      uHover: { value: hover },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uColor.value.set(color)
    uniforms.uEmissiveIntensity.value = emissiveIntensity
    uniforms.uHover.value = hover
    uniforms.uOpacity.value = opacity

    // Jellyfish pulse amplitude: stronger on hover
    const targetAmplitude = hover > 0.5 ? 0.35 : 0.15
    uniforms.uAmplitude.value = THREE.MathUtils.lerp(
      uniforms.uAmplitude.value,
      targetAmplitude,
      0.05,
    )
  })

  const fragmentShader = useMemo(() => FRESNEL + oceanNeuronFragment, [])

  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={oceanNeuronVertex}
      fragmentShader={fragmentShader}
      transparent
      depthWrite={false}
      side={THREE.DoubleSide}
    />
  )
}
