'use client'

import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import type { LayoutLink } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

interface SynapseProps {
  link: LayoutLink
}

export function Synapse({ link }: SynapseProps) {
  // Callback ref pattern: Line2 extends Object3D, safely storable as Object3D
  const lineRef = useRef<THREE.Object3D | null>(null)
  const targetOpacityRef = useRef(0.2)

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  const { source: sourceNode, target: targetNode } = link

  // Compute target opacity from current selection state
  const targetOpacity = !selectedNeuron
    ? 0.15 + link.strength * 0.25 // 0.15–0.40 proportional to strength
    : selectedNeuron.id === sourceNode.id || selectedNeuron.id === targetNode.id
      ? 0.8 // highlight connected synapses
      : 0.05 // dim unrelated synapses

  targetOpacityRef.current = targetOpacity

  // Lerp material opacity toward target on every frame
  useFrame((_, delta) => {
    if (!lineRef.current) return
    // Line2 extends Mesh — access material safely via duck typing
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

  const vertexColors = useMemo(
    () => [
      new THREE.Color(sourceNode.color ?? '#ffffff'),
      new THREE.Color(targetNode.color ?? '#ffffff'),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // Line width in world units: 0.5px for weak connections, up to 3px for strong
  const lineWidth = 0.5 + link.strength * 2.5

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
