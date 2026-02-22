import type { NeuronCategory } from '@/types/neuron'

export type ThemeId = 'cosmos' | 'cyberpunk' | 'ocean' | 'crystal'

export type NeuronShape = 'sphere' | 'octahedron' | 'icosahedron'

export interface ThemeLightConfig {
  position: [number, number, number]
  intensity: number
  color: string
  distance: number
}

export interface NetworkTheme {
  id: ThemeId
  name: string
  description: string
  icon: string

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
    shape: NeuronShape
    wireframe: boolean
    roughness: number
    metalness: number
    emissiveIntensity: { default: number; hover: number; selected: number }
    opacity: number
    ringColor: 'category' | 'fixed'
    ringFixedColor?: string
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

export const THEMES: Record<ThemeId, NetworkTheme> = {
  cosmos: {
    id: 'cosmos',
    name: 'Cosmos',
    description: 'Deep space neural constellation',
    icon: '✦',

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
      shape: 'sphere',
      wireframe: false,
      roughness: 0.2,
      metalness: 0.15,
      emissiveIntensity: { default: 0.5, hover: 1.4, selected: 2.0 },
      opacity: 1.0,
      ringColor: 'category',
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
  },

  cyberpunk: {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon grid data network',
    icon: '◆',

    colors: {
      categories: {
        core: '#FFD700',
        skill: '#FF0080',
        project: '#00FFFF',
        experience: '#39FF14',
        contact: '#FF6600',
      },
      background: '#0a0014',
      fog: '#0a0014',
      fogDensity: 0.003,
      ambientLight: '#1a0033',
      ambientIntensity: 0.2,
    },

    lights: [
      { position: [0, 50, 0], intensity: 1.5, color: '#FF0080', distance: 200 },
      { position: [0, 10, 40], intensity: 2.0, color: '#00FFFF', distance: 150 },
      { position: [-40, 5, 0], intensity: 1.5, color: '#FF0080', distance: 130 },
      { position: [40, 5, 0], intensity: 1.2, color: '#39FF14', distance: 130 },
      { position: [0, -20, -30], intensity: 0.8, color: '#8B00FF', distance: 120 },
    ],

    neuron: {
      shape: 'octahedron',
      wireframe: true,
      roughness: 0.1,
      metalness: 0.8,
      emissiveIntensity: { default: 0.8, hover: 2.0, selected: 3.0 },
      opacity: 0.9,
      ringColor: 'fixed',
      ringFixedColor: '#FF0080',
    },

    synapse: {
      baseOpacity: 0.35,
      selectedOpacity: 0.95,
      dimmedOpacity: 0.08,
      widthMultiplier: 1.3,
    },

    particles: {
      size: 0.35,
      opacity: 0.95,
      speedMultiplier: 1.8,
      perSynapse: 3,
    },

    postProcessing: {
      bloomIntensity: 4.0,
      bloomThreshold: 0.3,
      chromaticOffset: 0.0015,
      vignetteDarkness: 0.92,
    },

    background: {
      starsCount: 2000,
      starsOpacity: 0.3,
      nebulaOpacity: 0.1,
      dustOpacity: 0.05,
      showBrainOutline: false,
    },

    camera: {
      autoRotateSpeed: 0.15,
      initialPosition: [12, 8, 38],
    },
  },

  ocean: {
    id: 'ocean',
    name: 'Deep Ocean',
    description: 'Bioluminescent abyss',
    icon: '◯',

    colors: {
      categories: {
        core: '#E0F0FF',
        skill: '#00E5CC',
        project: '#7B68EE',
        experience: '#48D1CC',
        contact: '#FF69B4',
      },
      background: '#020B18',
      fog: '#020B18',
      fogDensity: 0.006,
      ambientLight: '#0A2540',
      ambientIntensity: 0.3,
    },

    lights: [
      { position: [0, 60, 0], intensity: 0.8, color: '#0A4466', distance: 200 },
      { position: [0, 10, 40], intensity: 1.2, color: '#00E5CC', distance: 120 },
      { position: [-30, -10, -20], intensity: 0.9, color: '#7B68EE', distance: 100 },
      { position: [30, -10, 20], intensity: 0.7, color: '#48D1CC', distance: 100 },
      { position: [0, -40, 0], intensity: 0.5, color: '#000033', distance: 150 },
    ],

    neuron: {
      shape: 'sphere',
      wireframe: false,
      roughness: 0.05,
      metalness: 0.1,
      emissiveIntensity: { default: 0.6, hover: 1.6, selected: 2.5 },
      opacity: 0.75,
      ringColor: 'category',
    },

    synapse: {
      baseOpacity: 0.18,
      selectedOpacity: 0.7,
      dimmedOpacity: 0.03,
      widthMultiplier: 0.8,
    },

    particles: {
      size: 0.3,
      opacity: 0.7,
      speedMultiplier: 0.6,
      perSynapse: 3,
    },

    postProcessing: {
      bloomIntensity: 3.0,
      bloomThreshold: 0.35,
      chromaticOffset: 0.0004,
      vignetteDarkness: 0.95,
    },

    background: {
      starsCount: 800,
      starsOpacity: 0.15,
      nebulaOpacity: 0.3,
      dustOpacity: 0.2,
      showBrainOutline: true,
    },

    camera: {
      autoRotateSpeed: 0.12,
      initialPosition: [12, 8, 38],
    },
  },

  crystal: {
    id: 'crystal',
    name: 'Crystal',
    description: 'Prismatic frost network',
    icon: '◇',

    colors: {
      categories: {
        core: '#FFFFFF',
        skill: '#88CCFF',
        project: '#CC88FF',
        experience: '#88FFCC',
        contact: '#FFAACC',
      },
      background: '#08080F',
      fog: '#08080F',
      fogDensity: 0.003,
      ambientLight: '#334466',
      ambientIntensity: 0.4,
    },

    lights: [
      { position: [0, 50, 10], intensity: 2.5, color: '#FFFFFF', distance: 200 },
      { position: [30, 20, 30], intensity: 1.2, color: '#88CCFF', distance: 130 },
      { position: [-30, 20, -30], intensity: 1.0, color: '#CC88FF', distance: 130 },
      { position: [0, -20, 30], intensity: 0.8, color: '#88FFCC', distance: 100 },
      { position: [0, 30, -30], intensity: 0.6, color: '#AABBFF', distance: 120 },
    ],

    neuron: {
      shape: 'icosahedron',
      wireframe: false,
      roughness: 0.05,
      metalness: 0.6,
      emissiveIntensity: { default: 0.4, hover: 1.2, selected: 1.8 },
      opacity: 0.85,
      ringColor: 'category',
    },

    synapse: {
      baseOpacity: 0.2,
      selectedOpacity: 0.75,
      dimmedOpacity: 0.04,
      widthMultiplier: 0.7,
    },

    particles: {
      size: 0.25,
      opacity: 0.85,
      speedMultiplier: 0.8,
      perSynapse: 3,
    },

    postProcessing: {
      bloomIntensity: 3.5,
      bloomThreshold: 0.4,
      chromaticOffset: 0.0006,
      vignetteDarkness: 0.8,
    },

    background: {
      starsCount: 3000,
      starsOpacity: 0.6,
      nebulaOpacity: 0.2,
      dustOpacity: 0.12,
      showBrainOutline: false,
    },

    camera: {
      autoRotateSpeed: 0.18,
      initialPosition: [12, 8, 38],
    },
  },
}

export const THEME_ORDER: ThemeId[] = ['cosmos', 'cyberpunk', 'ocean', 'crystal']

export function getTheme(id: ThemeId): NetworkTheme {
  return THEMES[id]
}

export function getCategoryColorForTheme(theme: NetworkTheme, category: NeuronCategory): string {
  return theme.colors.categories[category]
}
