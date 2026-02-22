'use client'

import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useMemo } from 'react'
import * as THREE from 'three'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function PostProcessing() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  // Stronger bloom for brain glow effect
  const bloomIntensity = selectedNeuron ? 3.5 : 2.5
  const luminanceThreshold = selectedNeuron ? 0.35 : 0.45
  const vignetteDarkness = selectedNeuron ? 0.95 : 0.85

  const chromaticOffset = useMemo(
    () =>
      new THREE.Vector2(
        selectedNeuron ? 0.0008 : 0.0003,
        selectedNeuron ? 0.0012 : 0.0005,
      ),
    [selectedNeuron],
  )

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <ChromaticAberration offset={chromaticOffset} />
      <Vignette offset={0.2} darkness={vignetteDarkness} eskil={false} />
    </EffectComposer>
  )
}
