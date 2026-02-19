'use client'

import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { useNeuralNetwork } from '@/hooks/useNeuralNetwork'
import { CATEGORY_COLORS } from '@/lib/constants'
import { usePortfolioStore } from '@/stores/usePortfolioStore'
import type { NeuronCategory } from '@/types/neuron'

const CLUSTER_DEFS: { category: NeuronCategory; label: string }[] = [
  { category: 'skill',      label: 'SKILLS'     },
  { category: 'project',    label: 'PROJECTS'   },
  { category: 'experience', label: 'EXPERIENCE' },
  { category: 'contact',    label: 'CONTACT'    },
]

function ClusterLabel({
  cx, cy, cz, label, color, visible,
}: {
  cx: number; cy: number; cz: number
  label: string; color: string; visible: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const worldPos = useRef(new THREE.Vector3())
  const divRef = useRef<HTMLDivElement>(null)

  // Fade opacity based on camera distance + visibility
  useFrame(({ camera }) => {
    if (!groupRef.current || !divRef.current) return
    groupRef.current.getWorldPosition(worldPos.current)
    const dist = camera.position.distanceTo(worldPos.current)
    // Fade out when very close (navigating inside cluster) or too far
    const base = dist > 15 && dist < 80 ? 1 : 0
    const targetOpacity = visible ? base * 0.3 : 0
    const current = parseFloat(divRef.current.style.opacity || '0')
    divRef.current.style.opacity = String(THREE.MathUtils.lerp(current, targetOpacity, 0.05))
  })

  return (
    <group ref={groupRef} position={[cx, cy + 10, cz]}>
      <Html center style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          ref={divRef}
          style={{
            opacity: 0,
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            fontWeight: 700,
            color,
            letterSpacing: '0.25em',
            whiteSpace: 'nowrap',
            textShadow: `0 0 16px ${color}`,
            borderBottom: `1px solid ${color}40`,
            paddingBottom: '3px',
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  )
}

export function ClusterLabels() {
  const { nodes, isReady } = useNeuralNetwork()
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const activeCategories = usePortfolioStore((s) => s.activeCategories)

  if (!isReady) return null

  return (
    <>
      {CLUSTER_DEFS.map(({ category, label }) => {
        const categoryNodes = nodes.filter((n) => n.category === category)
        if (categoryNodes.length === 0) return null

        const cx = categoryNodes.reduce((sum, n) => sum + n.x, 0) / categoryNodes.length
        const cy = categoryNodes.reduce((sum, n) => sum + n.y, 0) / categoryNodes.length
        const cz = categoryNodes.reduce((sum, n) => sum + n.z, 0) / categoryNodes.length

        const color = CATEGORY_COLORS[category]
        const visible = !selectedNeuron && activeCategories.includes(category)

        return (
          <ClusterLabel
            key={category}
            cx={cx} cy={cy} cz={cz}
            label={label}
            color={color}
            visible={visible}
          />
        )
      })}
    </>
  )
}
