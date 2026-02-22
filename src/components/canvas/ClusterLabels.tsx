'use client'

import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

import { BRAIN_REGION_LABELS } from '@/lib/brainGeometry'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

function BrainRegionLabel({
  position, label, sublabel, color, visible,
}: {
  position: [number, number, number]
  label: string
  sublabel: string
  color: string
  visible: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const worldPos = useRef(new THREE.Vector3())
  const divRef = useRef<HTMLDivElement>(null)

  useFrame(({ camera }) => {
    if (!groupRef.current || !divRef.current) return
    groupRef.current.getWorldPosition(worldPos.current)
    const dist = camera.position.distanceTo(worldPos.current)
    const base = dist > 15 && dist < 80 ? 1 : 0
    const targetOpacity = visible ? base * 0.35 : 0
    const current = parseFloat(divRef.current.style.opacity || '0')
    divRef.current.style.opacity = String(THREE.MathUtils.lerp(current, targetOpacity, 0.05))
  })

  return (
    <group ref={groupRef} position={position}>
      <Html center style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div
          ref={divRef}
          style={{
            opacity: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '8px',
              fontWeight: 700,
              color,
              letterSpacing: '0.3em',
              whiteSpace: 'nowrap',
              textShadow: `0 0 12px ${color}, 0 0 24px ${color}40`,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '7px',
              fontWeight: 400,
              color: `${color}90`,
              letterSpacing: '0.15em',
              whiteSpace: 'nowrap',
            }}
          >
            {sublabel}
          </span>
        </div>
      </Html>
    </group>
  )
}

export function ClusterLabels() {
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  return (
    <>
      {BRAIN_REGION_LABELS.map(({ label, sublabel, position, color }) => (
        <BrainRegionLabel
          key={`${label}-${sublabel}`}
          position={position}
          label={label}
          sublabel={sublabel}
          color={color}
          visible={!selectedNeuron}
        />
      ))}
    </>
  )
}
