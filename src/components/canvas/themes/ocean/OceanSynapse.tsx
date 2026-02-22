'use client'

import { useRef, useMemo } from 'react'
import { Line } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface OceanSynapseProps {
  start: [number, number, number]
  end: [number, number, number]
  color: THREE.Color
  opacity: number
  lineWidth: number
  isSelected: boolean
}

const POINT_COUNT = 24
const BASE_FREQUENCY = 2.5
const BASE_AMPLITUDE = 0.6

export function OceanSynapse({
  start,
  end,
  color,
  opacity,
  lineWidth,
  isSelected,
}: OceanSynapseProps) {
  const pointsRef = useRef<[number, number, number][]>([])
  const lineRef = useRef<THREE.Object3D | null>(null)
  const timeRef = useRef(0)

  // Compute a perpendicular basis for wave displacement
  const { perpA, perpB, length: segmentLength } = useMemo(() => {
    const dir = new THREE.Vector3(
      end[0] - start[0],
      end[1] - start[1],
      end[2] - start[2],
    )
    const len = dir.length()
    dir.normalize()

    // Find two perpendicular vectors to the main axis
    const up = Math.abs(dir.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0)
    const pA = new THREE.Vector3().crossVectors(dir, up).normalize()
    const pB = new THREE.Vector3().crossVectors(dir, pA).normalize()

    return { perpA: pA, perpB: pB, length: len }
  }, [start, end])

  // Initialize points array
  useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / (POINT_COUNT - 1)
      pts.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t,
      ])
    }
    pointsRef.current = pts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame((_, delta) => {
    timeRef.current += delta

    const speed = isSelected ? 3.5 : 1.5
    const freq = isSelected ? BASE_FREQUENCY * 1.8 : BASE_FREQUENCY
    const amp = isSelected ? BASE_AMPLITUDE * 1.4 : BASE_AMPLITUDE
    const time = timeRef.current * speed

    // Scale amplitude relative to segment length
    const scaledAmp = amp * Math.min(segmentLength * 0.04, 1.0)

    const pts = pointsRef.current
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / (POINT_COUNT - 1)

      // Bell curve envelope: maximum displacement at middle, zero at endpoints
      const envelope = Math.sin(t * Math.PI)
      const envelopeSq = envelope * envelope

      // Two perpendicular sine waves for tentacle-like motion
      const waveA = Math.sin(t * freq * Math.PI + time + i * 0.3) * scaledAmp * envelopeSq
      const waveB = Math.cos(t * freq * Math.PI * 0.7 + time * 1.3 + i * 0.5) * scaledAmp * envelopeSq * 0.6

      // Base linear interpolation
      const baseX = start[0] + (end[0] - start[0]) * t
      const baseY = start[1] + (end[1] - start[1]) * t
      const baseZ = start[2] + (end[2] - start[2]) * t

      pts[i] = [
        baseX + perpA.x * waveA + perpB.x * waveB,
        baseY + perpA.y * waveA + perpB.y * waveB,
        baseZ + perpA.z * waveA + perpB.z * waveB,
      ]
    }

    // Update line opacity
    if (lineRef.current) {
      const obj = lineRef.current as THREE.Object3D & {
        material?: THREE.Material & { opacity?: number }
      }
      if (obj.material && typeof obj.material.opacity === 'number') {
        obj.material.opacity = THREE.MathUtils.lerp(
          obj.material.opacity,
          opacity,
          Math.min(delta * 6, 1),
        )
      }
    }
  })

  // Vertex colors: start and end tinted with slight transparency feel
  const vertexColors = useMemo(() => {
    const colors: THREE.Color[] = []
    const tealTint = new THREE.Color('#00E5CC')
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / (POINT_COUNT - 1)
      const envelope = Math.sin(t * Math.PI)
      // Blend toward teal at the middle for underwater feel
      const c = color.clone().lerp(tealTint, envelope * 0.2)
      colors.push(c)
    }
    return colors
  }, [color])

  // Initial straight-line points for first render
  const initialPoints = useMemo<[number, number, number][]>(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < POINT_COUNT; i++) {
      const t = i / (POINT_COUNT - 1)
      pts.push([
        start[0] + (end[0] - start[0]) * t,
        start[1] + (end[1] - start[1]) * t,
        start[2] + (end[2] - start[2]) * t,
      ])
    }
    return pts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Line
      ref={(instance) => {
        lineRef.current = instance
      }}
      points={pointsRef.current.length > 0 ? pointsRef.current : initialPoints}
      vertexColors={vertexColors}
      lineWidth={lineWidth}
      transparent
      opacity={opacity}
    />
  )
}
