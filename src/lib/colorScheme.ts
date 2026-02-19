import { CATEGORY_COLORS } from './constants'
import type { NeuronCategory } from '@/types/neuron'

export function getCategoryColor(category: NeuronCategory): string {
  return CATEGORY_COLORS[category]
}

export function hexToThreeColor(hex: string): string {
  return hex
}

export function interpolateColors(colorA: string, colorB: string, t: number): string {
  const parseHex = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  })
  const a = parseHex(colorA)
  const b = parseHex(colorB)
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bv = Math.round(a.b + (b.b - a.b) * t)
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${bv.toString(16).padStart(2, '0')}`
}
