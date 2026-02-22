'use client'

import { Bloom, ChromaticAberration, EffectComposer, Vignette } from '@react-three/postprocessing'
import { useMemo } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function PostProcessing() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const theme = useTheme()

  const bloomIntensity = selectedNeuron
    ? theme.postProcessing.bloomIntensity * 1.3
    : theme.postProcessing.bloomIntensity
  const luminanceThreshold = selectedNeuron
    ? theme.postProcessing.bloomThreshold * 0.8
    : theme.postProcessing.bloomThreshold
  const vignetteDarkness = selectedNeuron
    ? Math.min(theme.postProcessing.vignetteDarkness + 0.1, 1.0)
    : theme.postProcessing.vignetteDarkness

  const chromaticOffset = useMemo(
    () =>
      new THREE.Vector2(
        selectedNeuron
          ? theme.postProcessing.chromaticOffset * 2.5
          : theme.postProcessing.chromaticOffset,
        selectedNeuron
          ? theme.postProcessing.chromaticOffset * 4
          : theme.postProcessing.chromaticOffset * 1.6,
      ),
    [selectedNeuron, theme.postProcessing.chromaticOffset],
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
