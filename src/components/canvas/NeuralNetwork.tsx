'use client'

import { useNeuralNetwork } from '@/hooks/useNeuralNetwork'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { Neuron } from './Neuron'

export function NeuralNetwork() {
  const { nodes, isReady } = useNeuralNetwork()
  const activeCategories = usePortfolioStore((s) => s.activeCategories)

  if (!isReady) return null

  const visibleNodes = nodes.filter((n) => activeCategories.includes(n.category))

  return (
    <group>
      {visibleNodes.map((node) => (
        <Neuron key={node.id} node={node} />
      ))}
    </group>
  )
}
