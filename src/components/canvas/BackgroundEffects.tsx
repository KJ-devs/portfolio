'use client'

import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function NebulaParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const geoRef = useRef<THREE.BufferGeometry>(null)
  const count = 300

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const palette: THREE.Color[] = [
      new THREE.Color('#00D4FF'),
      new THREE.Color('#A855F7'),
      new THREE.Color('#10B981'),
      new THREE.Color('#F472B6'),
    ]

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 80 + Math.random() * 120
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)] ?? new THREE.Color('#00D4FF')
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return { positions: pos, colors: col }
  }, [])

  // Set geometry attributes once
  useMemo(() => {
    if (!geoRef.current) return
    geoRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geoRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [positions, colors])

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.006
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry
        ref={geoRef}
        onUpdate={(geo) => {
          geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
          geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        }}
      />
      <pointsMaterial
        size={0.7}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function BackgroundEffects() {
  return (
    <>
      <Stars
        radius={160}
        depth={80}
        count={7000}
        factor={5}
        saturation={0.15}
        fade
        speed={0.4}
      />
      <NebulaParticles />
    </>
  )
}
