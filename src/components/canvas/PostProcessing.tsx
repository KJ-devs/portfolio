'use client'

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

export function PostProcessing() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  // Intensify glow when a node is focused — makes selected node pop against dimmed scene
  const bloomIntensity = selectedNeuron ? 2.4 : 1.5
  const luminanceThreshold = selectedNeuron ? 0.45 : 0.6
  const vignetteDarkness = selectedNeuron ? 0.88 : 0.7

  return (
    <EffectComposer>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={0.9}
      />
      <Vignette offset={0.3} darkness={vignetteDarkness} eskil={false} />
    </EffectComposer>
  )
}
