'use client'

import { useMemo } from 'react'

import { useNeuralNetwork } from '@/hooks/useNeuralNetwork'
import { getBFSOrder } from '@/lib/pathfinding'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { ClusterLabels } from './ClusterLabels'
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

  const activeNodeIds = useMemo(
    () => new Set(nodes.filter((n) => activeCategories.includes(n.category)).map((n) => n.id)),
    [nodes, activeCategories],
  )

  // Synapses only render between two active nodes
  const visibleLinks = useMemo(
    () => links.filter((link) => activeNodeIds.has(link.source.id) && activeNodeIds.has(link.target.id)),
    [links, activeNodeIds],
  )

  if (!isReady) return null

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

      {/* Cluster orientation labels — fade based on distance and selection state */}
      <ClusterLabels />
    </group>
  )
}
