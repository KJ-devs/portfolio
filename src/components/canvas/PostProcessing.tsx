'use client'

import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useMemo } from 'react'
import * as THREE from 'three'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function PostProcessing() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  const bloomIntensity = selectedNeuron ? 3.0 : 2.0
  const luminanceThreshold = selectedNeuron ? 0.38 : 0.52
  const vignetteDarkness = selectedNeuron ? 0.92 : 0.78

  const chromaticOffset = useMemo(
    () =>
      new THREE.Vector2(
        selectedNeuron ? 0.0007 : 0.00025,
        selectedNeuron ? 0.001 : 0.0004,
      ),
    [selectedNeuron],
  )

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.85}
        mipmapBlur
      />
      <ChromaticAberration offset={chromaticOffset} />
      <Vignette offset={0.22} darkness={vignetteDarkness} eskil={false} />
    </EffectComposer>
  )
}
