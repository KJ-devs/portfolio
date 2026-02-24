import type { NeuronCategory } from '@/types/neuron'

export interface ThemeLightConfig {
  position: [number, number, number]
  intensity: number
  color: string
  distance: number
}

export interface NetworkTheme {
  id: string
  name: string

  colors: {
    categories: Record<NeuronCategory, string>
    background: string
    fog: string
    fogDensity: number
    ambientLight: string
    ambientIntensity: number
  }

  lights: ThemeLightConfig[]

  neuron: {
    roughness: number
    metalness: number
    emissiveIntensity: { default: number; hover: number; selected: number }
    opacity: number
  }

  synapse: {
    baseOpacity: number
    selectedOpacity: number
    dimmedOpacity: number
    widthMultiplier: number
  }

  particles: {
    size: number
    opacity: number
    speedMultiplier: number
    perSynapse: number
  }

  postProcessing: {
    bloomIntensity: number
    bloomThreshold: number
    chromaticOffset: number
    vignetteDarkness: number
  }

  background: {
    starsCount: number
    starsOpacity: number
    nebulaOpacity: number
    dustOpacity: number
    showBrainOutline: boolean
  }

  camera: {
    autoRotateSpeed: number
    initialPosition: [number, number, number]
  }
}

export const COSMOS_THEME: NetworkTheme = {
  id: 'cosmos',
  name: 'Cosmos',

  colors: {
    categories: {
      core: '#F5E6CC',
      skill: '#00D4FF',
      project: '#A855F7',
      experience: '#10B981',
      contact: '#F472B6',
    },
    background: '#050510',
    fog: '#050510',
    fogDensity: 0.004,
    ambientLight: '#6677cc',
    ambientIntensity: 0.35,
  },

  lights: [
    { position: [0, 40, 10], intensity: 2.0, color: '#ffffff', distance: 200 },
    { position: [0, 10, 40], intensity: 1.5, color: '#00D4FF', distance: 120 },
    { position: [-40, -5, 0], intensity: 0.8, color: '#A855F7', distance: 120 },
    { position: [40, -5, 0], intensity: 0.6, color: '#10B981', distance: 120 },
    { position: [0, 5, -35], intensity: 1.0, color: '#818CF8', distance: 100 },
    { position: [0, -30, 0], intensity: 0.4, color: '#F472B6', distance: 100 },
  ],

  neuron: {
    roughness: 0.2,
    metalness: 0.15,
    emissiveIntensity: { default: 0.5, hover: 1.4, selected: 2.0 },
    opacity: 1.0,
  },

  synapse: {
    baseOpacity: 0.25,
    selectedOpacity: 0.8,
    dimmedOpacity: 0.05,
    widthMultiplier: 1.0,
  },

  particles: {
    size: 0.45,
    opacity: 0.9,
    speedMultiplier: 1.0,
    perSynapse: 3,
  },

  postProcessing: {
    bloomIntensity: 2.5,
    bloomThreshold: 0.45,
    chromaticOffset: 0.0003,
    vignetteDarkness: 0.85,
  },

  background: {
    starsCount: 5000,
    starsOpacity: 1.0,
    nebulaOpacity: 0.25,
    dustOpacity: 0.15,
    showBrainOutline: true,
  },

  camera: {
    autoRotateSpeed: 0.2,
    initialPosition: [12, 8, 38],
  },
}

export function getCategoryColor(category: NeuronCategory): string {
  return COSMOS_THEME.colors.categories[category]
}
