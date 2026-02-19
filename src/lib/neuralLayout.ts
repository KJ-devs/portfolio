import {
  forceCenter,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  forceZ,
  type SimLink,
  type SimNode,
} from 'd3-force-3d'

import { CONNECTIONS } from '@/data/connections'
import { NEURONS } from '@/data/neurons'
import { FORCE_CONFIG } from '@/lib/constants'
import type { NeuronCategory } from '@/types/neuron'

// Target positions per category to group similar neurons spatially
const CATEGORY_TARGETS: Record<NeuronCategory, [number, number, number]> = {
  core:       [0,    0,    0],
  skill:      [35,   5,    5],
  project:    [-25,  18,   10],
  experience: [-25, -18,   10],
  contact:    [0,   -5,  -30],
}

// Specific pinned positions for guided tour nodes.
// These guarantee deterministic positions so CameraController can always navigate correctly.
const PINNED_POSITIONS: Partial<Record<string, [number, number, number]>> = {
  'me':              [0,    0,    0],
  'alternance':      [-28, -15,   5],
  'master-ia':       [-22, -25,  -8],
  'supporthelper':   [-28,  18,   5],
  'tiktok-edu':      [-18,  22, -10],
  'typescript':      [ 32,  12,   5],
  'machine-learning':[ 28,  -8,  12],
  'github':          [  5,  -8, -32],
}

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
  // Build nodes — use pinned positions for tour nodes, scatter others near category targets
  const nodes: LayoutNode[] = NEURONS.map((neuron) => {
    const pin = PINNED_POSITIONS[neuron.id]
    const [cx, cy, cz] = CATEGORY_TARGETS[neuron.category]
    return {
      id: neuron.id,
      label: neuron.label,
      category: neuron.category,
      size: neuron.size,
      color: neuron.color,
      // Pinned nodes start at their exact position; others scatter near category target
      x: pin ? pin[0] : cx + (Math.random() - 0.5) * 15,
      y: pin ? pin[1] : cy + (Math.random() - 0.5) * 15,
      z: pin ? pin[2] : cz + (Math.random() - 0.5) * 15,
      vx: 0,
      vy: 0,
      vz: 0,
      // Pinned nodes are locked in place — d3-force cannot move them
      fx: pin ? pin[0] : null,
      fy: pin ? pin[1] : null,
      fz: pin ? pin[2] : null,
    }
  })

  // Build links — d3-force-3d will resolve string IDs to node references during tick
  const rawLinks: RawLink[] = CONNECTIONS.map((conn) => ({
    source: conn.source,
    target: conn.target,
    strength: conn.strength,
  }))

  // Configure 3D force simulation
  const simulation = forceSimulation<LayoutNode, RawLink>(nodes, 3)
    .force(
      'charge',
      forceManyBody<LayoutNode>().strength(FORCE_CONFIG.manyBodyStrength),
    )
    .force(
      'link',
      forceLink<LayoutNode, RawLink>(rawLinks)
        .id((d) => d.id)
        .distance(FORCE_CONFIG.linkDistance)
        .strength((d) => d.strength),
    )
    .force('center', forceCenter<LayoutNode>(0, 0, 0))
    .force(
      'forceX',
      forceX<LayoutNode>((d) => CATEGORY_TARGETS[d.category][0]).strength(
        FORCE_CONFIG.categoryGroupStrength,
      ),
    )
    .force(
      'forceY',
      forceY<LayoutNode>((d) => CATEGORY_TARGETS[d.category][1]).strength(
        FORCE_CONFIG.categoryGroupStrength,
      ),
    )
    .force(
      'forceZ',
      forceZ<LayoutNode>((d) => CATEGORY_TARGETS[d.category][2]).strength(
        FORCE_CONFIG.categoryGroupStrength,
      ),
    )
    .alphaDecay(FORCE_CONFIG.alphaDecay)
    .stop()

  // Run synchronously — 300 ticks is sufficient for convergence on ~30 nodes
  simulation.tick(FORCE_CONFIG.tickCount)

  // Guarantee all pinned nodes are at their exact positions (numerical precision)
  for (const node of nodes) {
    const pin = PINNED_POSITIONS[node.id]
    if (pin) {
      node.x = pin[0]
      node.y = pin[1]
      node.z = pin[2]
    }
  }

  // After tick(), d3-force has resolved link source/target strings → node refs
  const links = rawLinks as unknown as LayoutLink[]

  layoutCache = { nodes, links }

  return layoutCache
}
