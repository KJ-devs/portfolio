'use client'

import { usePortfolioStore } from '@/stores/usePortfolioStore'

/**
 * Dark veil that descends over the 3D canvas when a neuron is selected.
 * The selected node's emissive glow + bloom punches through, creating
 * a natural spotlight effect without any WebGL magic.
 */
export function FocusOverlay() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 bg-neural-bg transition-opacity duration-700"
      style={{ opacity: selectedNeuron ? 0.45 : 0 }}
    />
  )
}
