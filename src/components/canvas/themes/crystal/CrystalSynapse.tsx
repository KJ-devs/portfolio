'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { FRESNEL } from '@/components/shaders/common.glsl'
import { crystalSynapseVertex, crystalSynapseFragment } from './crystal.shaders'

interface CrystalSynapseProps {
  start: [number, number, number]
  end: [number, number, number]
  color: THREE.Color
  opacity: number
  lineWidth: number
  isSelected: boolean
}

const _startVec = new THREE.Vector3()
const _endVec = new THREE.Vector3()
const _direction = new THREE.Vector3()
const _midpoint = new THREE.Vector3()
const _up = new THREE.Vector3(0, 1, 0)
const _quaternion = new THREE.Quaternion()

export function CrystalSynapse({
  start,
  end,
  color,
  opacity,
  lineWidth,
  isSelected,
}: CrystalSynapseProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: color.clone() },
      uOpacity: { value: opacity },
      uSelected: { value: isSelected ? 1.0 : 0.0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const fragmentShader = useMemo(
    () => FRESNEL + '\n' + crystalSynapseFragment,
    [],
  )

  // Compute cylinder transform: position, orientation, and height
  const { position, quaternion, height } = useMemo(() => {
    _startVec.set(start[0], start[1], start[2])
    _endVec.set(end[0], end[1], end[2])

    const len = _startVec.distanceTo(_endVec)
    _midpoint.addVectors(_startVec, _endVec).multiplyScalar(0.5)

    _direction.subVectors(_endVec, _startVec).normalize()
    _quaternion.setFromUnitVectors(_up, _direction)

    return {
      position: _midpoint.toArray() as [number, number, number],
      quaternion: _quaternion.clone(),
      height: len,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start[0], start[1], start[2], end[0], end[1], end[2]])

  // Radius scales with lineWidth (thin beam)
  const radius = 0.02 + lineWidth * 0.005

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime()
    uniforms.uColor.value.copy(color)
    uniforms.uOpacity.value = opacity
    uniforms.uSelected.value = isSelected ? 1.0 : 0.0
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      quaternion={quaternion}
    >
      <cylinderGeometry args={[radius, radius, height, 6, 1, true]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={crystalSynapseVertex}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}
