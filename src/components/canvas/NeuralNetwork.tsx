'use client'

import { useMemo } from 'react'

import { useNeuralNetwork } from '@/hooks/useNeuralNetwork'
import { getBFSOrder } from '@/lib/pathfinding'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { Neuron } from './Neuron'
import { Particles } from './Particles'
import { Synapse } from './Synapse'

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

  const activeNodeIds = new Set(
    nodes.filter((n) => activeCategories.includes(n.category)).map((n) => n.id),
  )

  // Synapses only render between two active nodes
  const visibleLinks = links.filter(
    (link) => activeNodeIds.has(link.source.id) && activeNodeIds.has(link.target.id),
  )

  return (
    <group>
      {/* Synapses behind neurons */}
      {visibleLinks.map((link, i) => (
        <Synapse key={`${link.source.id}-${link.target.id}-${i}`} link={link} />
      ))}

      {/* Particles on active synapses */}
      <Particles links={visibleLinks} />

      {/* All neurons — each handles its own active/opacity state */}
      {nodes.map((node) => (
        <Neuron
          key={node.id}
          node={node}
          introDelay={introDelayMap.get(node.id) ?? 0}
        />
      ))}
    </group>
  )
}
