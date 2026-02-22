'use client'

import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Scanline,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { type JSX, useMemo } from 'react'
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

  const effects: JSX.Element[] = [
    <Bloom
      key="bloom"
      intensity={bloomIntensity}
      luminanceThreshold={luminanceThreshold}
      luminanceSmoothing={0.9}
      mipmapBlur
    />,
    <ChromaticAberration key="chromatic" offset={chromaticOffset} />,
    <Vignette key="vignette" offset={0.2} darkness={vignetteDarkness} eskil={false} />,
  ]

  if (theme.id === 'cyberpunk') {
    effects.push(
      <Scanline key="scanline" blendFunction={BlendFunction.OVERLAY} density={1.5} opacity={0.08} />,
      <Noise key="noise" blendFunction={BlendFunction.SOFT_LIGHT} opacity={0.15} />,
    )
  }

  if (theme.id === 'ocean') {
    effects.push(
      <DepthOfField key="dof" focusDistance={0.02} focalLength={0.06} bokehScale={3} />,
    )
  }

  return (
    <EffectComposer key={theme.id}>
      {effects}
    </EffectComposer>
  )
}
