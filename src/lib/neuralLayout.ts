import {
  forceLink,
  forceSimulation,
  type SimLink,
  type SimNode,
} from 'd3-force-3d'

import { CONNECTIONS } from '@/data/connections'
import { NEURONS } from '@/data/neurons'
import { BRAIN_NEURON_POSITIONS } from '@/lib/brainGeometry'
import type { NeuronCategory } from '@/types/neuron'

export interface LayoutNode extends SimNode {
  id: string
  label: string
  category: NeuronCategory
  size: number
  color?: string
}

// Before simulation: source/target are string IDs
interface RawLink extends SimLink<LayoutNode> {
  strength: number
}

// After simulation: source/target are resolved LayoutNode references
export interface LayoutLink {
  source: LayoutNode
  target: LayoutNode
  strength: number
}

export interface LayoutResult {
  nodes: LayoutNode[]
  links: LayoutLink[]
}

// Module-level cache — populated after the first call to createNeuralLayout()
let layoutCache: LayoutResult | null = null

/** Fast lookup of a node by id after the layout has been computed. */
export function getNodeById(id: string): LayoutNode | undefined {
  return layoutCache?.nodes.find((n) => n.id === id)
}

/** Returns the full layout result after the first createNeuralLayout() call. */
export function getLayoutResult(): LayoutResult | null {
  return layoutCache
}

export function createNeuralLayout(): LayoutResult {
  // Build nodes — all pinned to brain-shaped positions
  const nodes: LayoutNode[] = NEURONS.map((neuron) => {
    const brainPos = BRAIN_NEURON_POSITIONS[neuron.id]
    const [x, y, z] = brainPos ?? [0, 0, 0]

    return {
      id: neuron.id,
      label: neuron.label,
      category: neuron.category,
      size: neuron.size,
      color: neuron.color,
      x,
      y,
      z,
      vx: 0,
      vy: 0,
      vz: 0,
      // All nodes pinned to brain positions
      fx: x,
      fy: y,
      fz: z,
    }
  })

  // Build links — d3-force-3d resolves string IDs to node references during tick
  const rawLinks: RawLink[] = CONNECTIONS.map((conn) => ({
    source: conn.source,
    target: conn.target,
    strength: conn.strength,
  }))

  // Minimal simulation — just to resolve link source/target from string IDs to node refs
  const simulation = forceSimulation<LayoutNode, RawLink>(nodes, 3)
    .force(
      'link',
      forceLink<LayoutNode, RawLink>(rawLinks).id((d) => d.id),
    )
    .stop()

  // Single tick to resolve references
  simulation.tick(1)

  // Guarantee exact brain positions (numerical precision)
  for (const node of nodes) {
    const pos = BRAIN_NEURON_POSITIONS[node.id]
    if (pos) {
      node.x = pos[0]
      node.y = pos[1]
      node.z = pos[2]
    }
  }

  // After tick(), d3-force has resolved link source/target strings → node refs
  const links = rawLinks as unknown as LayoutLink[]

  layoutCache = { nodes, links }

  return layoutCache
}
