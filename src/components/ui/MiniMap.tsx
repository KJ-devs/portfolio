'use client'

import { useEffect, useMemo, useState } from 'react'

import { CATEGORY_COLORS } from '@/lib/constants'
import { getLayoutResult, type LayoutNode } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

const SIZE = 128
const PAD = 10

function toSVG(
  node: LayoutNode,
  minX: number, maxX: number,
  minY: number, maxY: number,
): { cx: number; cy: number } {
  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1
  const cx = ((node.x - minX) / rangeX) * (SIZE - PAD * 2) + PAD
  const cy = SIZE - (((node.y - minY) / rangeY) * (SIZE - PAD * 2) + PAD) // flip Y
  return { cx, cy }
}

export function MiniMap() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const activeCategories = usePortfolioStore((s) => s.activeCategories)

  const [nodes, setNodes] = useState<LayoutNode[]>(() => getLayoutResult()?.nodes ?? [])

  // Retry if layout wasn't ready on first render
  useEffect(() => {
    if (nodes.length > 0) return
    const id = setInterval(() => {
      const result = getLayoutResult()
      if (result) {
        setNodes(result.nodes)
        clearInterval(id)
      }
    }, 100)
    return () => clearInterval(id)
  }, [nodes.length])

  const bounds = useMemo(() => {
    if (nodes.length === 0) return { minX: -50, maxX: 50, minY: -50, maxY: 50 }
    const xs = nodes.map((n) => n.x)
    const ys = nodes.map((n) => n.y)
    return {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    }
  }, [nodes])

  if (nodes.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-md md:block">
      <p className="px-2 pt-1.5 text-center font-mono text-[9px] uppercase tracking-widest text-white/25">
        Map
      </p>
      <svg width={SIZE} height={SIZE}>
        {nodes.map((node) => {
          const { cx, cy } = toSVG(node, bounds.minX, bounds.maxX, bounds.minY, bounds.maxY)
          const isSelected = selectedNeuron?.id === node.id
          const isActive = activeCategories.includes(node.category)
          const r = isSelected ? 4.5 : Math.max(1.5, node.size * 1.2)
          return (
            <circle
              key={node.id}
              cx={cx}
              cy={cy}
              r={r}
              fill={node.color ?? CATEGORY_COLORS[node.category]}
              opacity={isActive ? (isSelected ? 1 : 0.55) : 0.15}
              style={isSelected ? { filter: `drop-shadow(0 0 4px ${node.color ?? '#fff'})` } : undefined}
            />
          )
        })}
      </svg>
    </div>
  )
}
