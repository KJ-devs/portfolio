'use client'

import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import type { LayoutLink } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

interface SynapseProps {
  link: LayoutLink
}

export function Synapse({ link }: SynapseProps) {
  const lineRef = useRef<THREE.Object3D | null>(null)
  const targetOpacityRef = useRef(0.2)

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const highlightedPath = usePortfolioStore((s) => s.highlightedPath)
  const theme = useTheme()

  const { source: sourceNode, target: targetNode } = link

  const isOnPath =
    highlightedPath !== null &&
    highlightedPath.includes(sourceNode.id) &&
    highlightedPath.includes(targetNode.id)

  const targetOpacity = isOnPath
    ? 0.95
    : !selectedNeuron
      ? theme.synapse.baseOpacity * (0.6 + link.strength * 0.4)
      : selectedNeuron.id === sourceNode.id || selectedNeuron.id === targetNode.id
        ? theme.synapse.selectedOpacity
        : highlightedPath !== null
          ? 0.02
          : theme.synapse.dimmedOpacity

  targetOpacityRef.current = targetOpacity

  useFrame((_, delta) => {
    if (!lineRef.current) return
    const obj = lineRef.current as THREE.Object3D & {
      material?: THREE.Material & { opacity?: number }
    }
    if (obj.material && typeof obj.material.opacity === 'number') {
      obj.material.opacity = THREE.MathUtils.lerp(
        obj.material.opacity,
        targetOpacityRef.current,
        Math.min(delta * 6, 1),
      )
    }
  })

  const points = useMemo<[number, number, number][]>(
    () => [
      [sourceNode.x, sourceNode.y, sourceNode.z],
      [targetNode.x, targetNode.y, targetNode.z],
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const vertexColors = useMemo(() => {
    const srcColor = theme.colors.categories[sourceNode.category] ?? '#ffffff'
    const tgtColor = theme.colors.categories[targetNode.category] ?? '#ffffff'
    return [new THREE.Color(srcColor), new THREE.Color(tgtColor)]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.id])

  const lineWidth = (0.5 + link.strength * 2.5) * theme.synapse.widthMultiplier

  return (
    <Line
      ref={(instance) => {
        lineRef.current = instance
      }}
      points={points}
      vertexColors={vertexColors}
      lineWidth={lineWidth}
      transparent
      opacity={0.2}
    />
  )
}
