import type { NeuronCategory } from '@/types/neuron'

export const CATEGORY_COLORS: Record<NeuronCategory, string> = {
  core:       '#F5E6CC',
  skill:      '#00D4FF',
  project:    '#A855F7',
  experience: '#10B981',
  contact:    '#F472B6',
}

export const NEURON_DEFAULTS = {
  segments: 32,
  minSize: 0.5,
  maxSize: 2.0,
  emissiveIntensity: {
    default: 0.5,
    hover: 1.4,
    selected: 2.0,
  },
} as const

export const FORCE_CONFIG = {
  manyBodyStrength: -80,
  linkDistance: 25,
  centerStrength: 0.1,
  categoryGroupStrength: 0.05,
  alphaDecay: 0.02,
  tickCount: 300,
} as const

export const CAMERA_CONFIG = {
  fov: 60,
  near: 0.1,
  far: 1000,
  initialPosition: [10, 8, 46] as [number, number, number],
  minDistance: 5,
  maxDistance: 200,
  autoRotateSpeed: 0.3,
} as const

export const ANIMATION_CONFIG = {
  cameraZoom: { duration: 1.5, ease: 'power3.inOut' },
  panelOpen:  { duration: 0.6, ease: 'power2.out' },
  panelClose: { duration: 0.4, ease: 'power2.in' },
  tooltip:    { duration: 0.2, ease: 'power2.out' },
  introStagger: 0.05,
} as const

export const PARTICLE_CONFIG = {
  perSynapse: 3,
  speed: { min: 0.004, max: 0.01 },
  size: 0.45,
} as const

// Level of Detail — segments per sphere based on node size (static LOD)
export const LOD_CONFIG = {
  high: { minSize: 1.5, segments: 32 }, // Core + large nodes
  mid:  { minSize: 1.0, segments: 16 }, // Medium nodes
  low:  { minSize: 0,   segments: 8  }, // Small peripheral nodes
} as const
