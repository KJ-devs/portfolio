'use client'

import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface CyberpunkSynapseProps {
  start: [number, number, number]
  end: [number, number, number]
  color: THREE.Color
  opacity: number
  lineWidth: number
  isSelected: boolean
}

const SEGMENT_COUNT = 12
const JITTER_INTERVAL = 0.08 // seconds between re-randomisation

/**
 * Build a perpendicular basis for a given direction vector.
 * Returns two orthonormal vectors to `dir`.
 */
function perpendicularBasis(dir: THREE.Vector3): [THREE.Vector3, THREE.Vector3] {
  const up = Math.abs(dir.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)
  const perp1 = new THREE.Vector3().crossVectors(dir, up).normalize()
  const perp2 = new THREE.Vector3().crossVectors(dir, perp1).normalize()
  return [perp1, perp2]
}

export function CyberpunkSynapse({
  start,
  end,
  color,
  opacity,
  lineWidth,
  isSelected,
}: CyberpunkSynapseProps) {
  const accumulatedTime = useRef(0)

  const startVec = useMemo(() => new THREE.Vector3(...start), [start])
  const endVec = useMemo(() => new THREE.Vector3(...end), [end])

  const direction = useMemo(() => {
    return new THREE.Vector3().subVectors(endVec, startVec).normalize()
  }, [startVec, endVec])

  const [perp1, perp2] = useMemo(() => perpendicularBasis(direction), [direction])

  // Pre-allocate the points array via useMemo, stored in a ref for mutation
  const initialPoints = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= SEGMENT_COUNT; i++) {
      const t = i / SEGMENT_COUNT
      const x = startVec.x + (endVec.x - startVec.x) * t
      const y = startVec.y + (endVec.y - startVec.y) * t
      const z = startVec.z + (endVec.z - startVec.z) * t
      pts.push([x, y, z])
    }
    return pts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pointsRef = useRef<[number, number, number][]>(initialPoints)
  const renderPoints = useRef<[number, number, number][]>(initialPoints)

  // Neon boost when selected
  const displayColor = useMemo(() => {
    const c = color.clone()
    if (isSelected) {
      c.multiplyScalar(1.6)
    }
    return c
  }, [color, isSelected])

  useFrame((_, delta) => {
    accumulatedTime.current += delta

    if (accumulatedTime.current < JITTER_INTERVAL) return
    accumulatedTime.current = 0

    const displacement = isSelected ? 1.8 : 0.6
    const pts = pointsRef.current

    for (let i = 1; i < SEGMENT_COUNT; i++) {
      const t = i / SEGMENT_COUNT
      // Base interpolated position
      const bx = startVec.x + (endVec.x - startVec.x) * t
      const by = startVec.y + (endVec.y - startVec.y) * t
      const bz = startVec.z + (endVec.z - startVec.z) * t

      // Random perpendicular offset (electric arc jitter)
      const r1 = (Math.random() - 0.5) * 2 * displacement
      const r2 = (Math.random() - 0.5) * 2 * displacement

      // Taper displacement toward endpoints for natural look
      const taper = Math.sin(t * Math.PI)
      const ox = (perp1.x * r1 + perp2.x * r2) * taper
      const oy = (perp1.y * r1 + perp2.y * r2) * taper
      const oz = (perp1.z * r1 + perp2.z * r2) * taper

      pts[i] = [bx + ox, by + oy, bz + oz]
    }

    // Shallow-copy so React picks up the change on next render
    renderPoints.current = [...pts]
  })

  return (
    <Line
      points={renderPoints.current}
      color={displayColor}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
      depthWrite={false}
    />
  )
}
