/**
 * Brain-shaped 3D geometry generator for the Neural Portfolio.
 * Generates surface points and region classifications for brain visualization.
 */

export type BrainRegion =
  | 'frontal'
  | 'parietal'
  | 'temporal_left'
  | 'temporal_right'
  | 'occipital'
  | 'cerebellum'
  | 'brainstem'
  | 'central'

/** Colors for each brain region — creates the characteristic gradient effect */
export const BRAIN_REGION_COLORS: Record<BrainRegion, string> = {
  frontal:        '#00D4FF',
  parietal:       '#4ADE80',
  temporal_left:  '#A855F7',
  temporal_right: '#10B981',
  occipital:      '#818CF8',
  cerebellum:     '#F97316',
  brainstem:      '#F472B6',
  central:        '#F5E6CC',
}

/** Brain region label definitions for ClusterLabels */
export const BRAIN_REGION_LABELS: {
  label: string
  sublabel: string
  position: [number, number, number]
  color: string
}[] = [
  { label: 'FRONTAL',   sublabel: 'Frontend',   position: [0, 14, 14],   color: '#00D4FF' },
  { label: 'PARIETAL',  sublabel: 'Backend',    position: [0, 17, -2],   color: '#4ADE80' },
  { label: 'OCCIPITAL', sublabel: 'AI / Data',  position: [0, 10, -17],  color: '#818CF8' },
  { label: 'TEMPORAL',  sublabel: 'Projects',   position: [-17, 5, 0],   color: '#A855F7' },
  { label: 'TEMPORAL',  sublabel: 'Experience',  position: [17, 5, 0],   color: '#10B981' },
  { label: 'CEREBELLUM', sublabel: 'DevOps',    position: [0, -7, -14],  color: '#F97316' },
  { label: 'BRAIN STEM', sublabel: 'Contact',   position: [0, -15, 0],   color: '#F472B6' },
]

/** Determine which brain region a 3D point belongs to */
export function getBrainRegion(x: number, y: number, z: number): BrainRegion {
  const dist = Math.sqrt(x * x + y * y + z * z)
  if (dist < 5) return 'central'
  if (y < -8 && Math.abs(x) < 5 && z > -8) return 'brainstem'
  if (y < -3 && z < -6) return 'cerebellum'
  if (x < -10) return 'temporal_left'
  if (x > 10) return 'temporal_right'
  if (z > 6) return 'frontal'
  if (z < -8) return 'occipital'
  if (y > 6) return 'parietal'
  return z > 0 ? 'frontal' : 'occipital'
}

/**
 * Fixed neuron positions mapped to brain anatomy.
 * Each neuron is placed in a semantically appropriate brain region.
 */
export const BRAIN_NEURON_POSITIONS: Record<string, [number, number, number]> = {
  // ══ CORE — Central (thalamus) ══
  'me': [0, 0, 0],

  // ══ FRONTEND SKILLS → Frontal Lobe (front-top, z+) ══
  'typescript': [0, 10, 10],
  'nextjs':     [5, 8, 9],
  'react':      [-5, 7, 11],
  'tailwind':   [-7, 3, 12],
  'threejs':    [8, 3, 12],
  'gsap':       [0, 1, 14],

  // ══ BACKEND SKILLS → Parietal Lobe (top, z near 0) ══
  'python':     [-2, 13, -1],
  'nodejs':     [-6, 11, 1],
  'nestjs':     [5, 12, -2],
  'postgresql': [8, 10, -4],
  'rest-api':   [-5, 9, 3],

  // ══ AI/DATA SKILLS → Occipital Lobe (back, z-) ══
  'machine-learning': [0, 6, -13],
  'nlp':              [-3, 8, -14],
  'tensorflow':       [-5, 4, -12],
  'big-data':         [5, 5, -12],
  'pgvector':         [3, 2, -13],

  // ══ DEVOPS SKILLS → Cerebellum (bottom-back) ══
  'git':         [0, -6, -10],
  'docker':      [4, -7, -9],
  'ci-cd':       [-4, -7, -9],
  'claude-code': [2, -5, -12],
  'turborepo':   [-2, -5, -12],

  // ══ PROJECTS → Left Temporal Lobe ══
  'supporthelper':    [-13, -1, 3],
  'tiktok-edu':       [-12, 3, -2],
  'neural-portfolio': [-14, -4, 0],

  // ══ EXPERIENCE → Right Temporal Lobe ══
  'alternance': [13, -1, 2],
  'master-ia':  [12, 3, -3],

  // ══ CONTACT → Brain Stem (bottom-center) ══
  'github':   [-2, -11, 1],
  'linkedin': [2, -11, 1],
  'email':    [0, -12, 3],
  'cv':       [0, -12, -2],

  // ══ EASTER EGG → Hidden in cerebellum ══
  'brain': [6, -8, -11],
}

export interface BrainSurfacePoint {
  position: [number, number, number]
  region: BrainRegion
  color: string
}

/**
 * Generate points on a brain-shaped surface.
 * Uses Fibonacci sphere distribution with brain-specific deformations.
 */
export function generateBrainSurfacePoints(count: number): BrainSurfacePoint[] {
  const points: BrainSurfacePoint[] = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)

    let x = Math.sin(phi) * Math.cos(theta)
    let y = Math.cos(phi)
    let z = Math.sin(phi) * Math.sin(theta)

    // Brain proportions (ellipsoid base)
    const rx = 14
    const ry = 12
    const rz = 15

    x *= rx
    y *= ry
    z *= rz

    // ── Brain deformations ──

    // 1. Interhemispheric fissure (top midline groove)
    const fissure = 2.0 * Math.exp(-(x * x) / 5) * Math.max(0, y / ry)
    y -= fissure

    // 2. Frontal lobe bulge (front-top)
    const frontal = Math.max(0, z / rz) * Math.max(0, (y + 3) / (ry + 3))
    z += 3.5 * frontal
    x *= 1 + 0.08 * frontal

    // 3. Temporal lobe widening (sides, lower)
    const temporal = Math.max(0, -(y - 2) / ry) * Math.max(0, 1 - (Math.abs(z) / rz) * 0.5)
    x *= 1 + 0.22 * temporal

    // 4. Occipital lobe protrusion (back)
    const occipitalF = Math.max(0, -z / rz) * Math.max(0, (y + 4) / (ry + 4))
    z -= 2.5 * occipitalF

    // 5. Flatten bottom (brain base)
    if (y < -ry * 0.6) {
      y = -ry * 0.6 - (y + ry * 0.6) * 0.2
    }

    // 6. Cerebellum bulge (lower-back)
    const cbDist = Math.sqrt((x * x) / 40 + ((y + 7) * (y + 7)) / 16 + ((z + 9) * (z + 9)) / 25)
    if (cbDist < 1.3) {
      const bulge = (1.3 - cbDist) * 2
      y -= bulge * 0.4
      z -= bulge * 0.6
    }

    // 7. Organic noise (cortical wrinkles/gyri)
    x += 0.6 * Math.sin(theta * 5 + phi * 3)
    y += 0.6 * Math.sin(phi * 7 + theta * 2)
    z += 0.6 * Math.cos(theta * 4 + phi * 5)

    const region = getBrainRegion(x, y, z)
    const color = BRAIN_REGION_COLORS[region]

    points.push({ position: [x, y, z], region, color })
  }

  return points
}

/**
 * Generate inner brain structure points (fewer, scattered inside the brain).
 * Creates depth perception when the brain rotates.
 */
export function generateBrainInnerPoints(count: number): BrainSurfacePoint[] {
  const points: BrainSurfacePoint[] = []
  const goldenRatio = (1 + Math.sqrt(5)) / 2

  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    // Inner shell at 50-80% of brain radius
    const radiusScale = 0.5 + Math.random() * 0.3

    const x = Math.sin(phi) * Math.cos(theta) * 14 * radiusScale
    const baseY = Math.cos(phi) * 12 * radiusScale
    const z = Math.sin(phi) * Math.sin(theta) * 15 * radiusScale

    // Light fissure effect
    const fissure = 1.0 * Math.exp(-(x * x) / 8) * Math.max(0, baseY / 12)
    const y = baseY - fissure

    const region = getBrainRegion(x, y, z)
    const color = BRAIN_REGION_COLORS[region]

    points.push({ position: [x, y, z], region, color })
  }

  return points
}
