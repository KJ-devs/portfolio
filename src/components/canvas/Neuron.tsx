'use client'

import { Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { NEURONS_BY_ID } from '@/data/neurons'
import { NEURON_DEFAULTS } from '@/lib/constants'
import type { LayoutNode } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

interface NeuronProps {
  node: LayoutNode
  introDelay?: number
}

export function Neuron({ node, introDelay = 0 }: NeuronProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef(0)

  const setHoveredNeuron = usePortfolioStore((s) => s.setHoveredNeuron)
  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)
  const hoveredNeuron = usePortfolioStore((s) => s.hoveredNeuron)
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)

  const isHovered = hoveredNeuron === node.id
  const isSelected = selectedNeuron?.id === node.id
  const color = node.color ?? '#ffffff'
  const radius = node.size * 0.8

  // Scale-in animation when intro completes (or immediately if already done)
  useEffect(() => {
    if (isIntroComplete) {
      const tween = gsap.to(scaleRef, {
        current: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: introDelay,
      })
      return () => { tween.kill() }
    }
  }, [isIntroComplete, introDelay])

  // Apply scaleRef to group each frame + lerp emissive glow
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current)
    }
    if (!materialRef.current) return
    const target = isSelected
      ? NEURON_DEFAULTS.emissiveIntensity.selected
      : isHovered
        ? NEURON_DEFAULTS.emissiveIntensity.hover
        : NEURON_DEFAULTS.emissiveIntensity.default
    materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
      materialRef.current.emissiveIntensity,
      target,
      delta * 8,
    )
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0}
      floatIntensity={0.3}
      position={[node.x, node.y, node.z]}
    >
      <group ref={groupRef}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            setHoveredNeuron(node.id)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHoveredNeuron(null)
            document.body.style.cursor = 'default'
          }}
          onClick={(e) => {
            e.stopPropagation()
            const neuronData = NEURONS_BY_ID[node.id]
            if (neuronData) setSelectedNeuron(neuronData)
          }}
        >
          <sphereGeometry args={[radius, NEURON_DEFAULTS.segments, NEURON_DEFAULTS.segments]} />
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            emissive={color}
            emissiveIntensity={NEURON_DEFAULTS.emissiveIntensity.default}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>

        {/* Label centré sous la sphère */}
        <Html
          center
          position={[0, -(radius + 0.6), 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              color: '#ffffff',
              opacity: isHovered || isSelected ? 1 : 0.7,
              whiteSpace: 'nowrap',
              textShadow: `0 0 8px ${color}`,
              transition: 'opacity 0.2s ease',
            }}
          >
            {node.label}
          </span>
        </Html>
      </group>
    </Float>
  )
}
