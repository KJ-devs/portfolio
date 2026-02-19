'use client'

import { Stars } from '@react-three/drei'

export function BackgroundEffects() {
  return (
    <Stars
      radius={150}
      depth={60}
      count={4000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  )
}
