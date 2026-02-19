'use client'

import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'

export function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.9}
      />
      <Vignette offset={0.3} darkness={0.7} eskil={false} />
    </EffectComposer>
  )
}
