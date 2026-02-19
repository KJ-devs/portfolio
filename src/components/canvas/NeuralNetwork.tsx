'use client'

import { useMemo } from 'react'

import { useNeuralNetwork } from '@/hooks/useNeuralNetwork'
import { getBFSOrder } from '@/lib/pathfinding'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { Neuron } from './Neuron'
import { Particles } from './Particles'
import { Synapse } from './Synapse'

/** Delay between each neuron's scale-in during intro (seconds) */
const INTRO_STAGGER = 0.05

export function NeuralNetwork() {
  const { nodes, links, isReady } = useNeuralNetwork()
  const activeCategories = usePortfolioStore((s) => s.activeCategories)

  // BFS order from 'me' — determines intro reveal order (center → periphery)
  const introDelayMap = useMemo<Map<string, number>>(() => {
    const order = getBFSOrder('me')
    const map = new Map<string, number>()
    order.forEach((id, i) => { map.set(id, i * INTRO_STAGGER) })
    return map
  }, [])

  if (!isReady) return null

  const visibleNodeIds = new Set(
    nodes.filter((n) => activeCategories.includes(n.category)).map((n) => n.id),
  )

  const visibleNodes = nodes.filter((n) => visibleNodeIds.has(n.id))

  // Only render synapses where both endpoints are visible
  const visibleLinks = links.filter(
    (link) => visibleNodeIds.has(link.source.id) && visibleNodeIds.has(link.target.id),
  )

  return (
    <group>
      {/* Render synapses first (behind neurons) */}
      {visibleLinks.map((link, i) => (
        <Synapse key={`${link.source.id}-${link.target.id}-${i}`} link={link} />
      ))}

      {/* Particles travel along synapses */}
      <Particles links={visibleLinks} />

      {/* Render neurons on top */}
      {visibleNodes.map((node) => (
        <Neuron
          key={node.id}
          node={node}
          introDelay={introDelayMap.get(node.id) ?? 0}
        />
      ))}
    </group>
  )
}
