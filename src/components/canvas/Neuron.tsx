'use client'

import { Float, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { NEURONS_BY_ID } from '@/data/neurons'
import { LOD_CONFIG, NEURON_DEFAULTS } from '@/lib/constants'
import type { LayoutNode } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { Tooltip } from './Tooltip'

interface NeuronProps {
  node: LayoutNode
  introDelay?: number
}

export function Neuron({ node, introDelay = 0 }: NeuronProps) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const scaleRef = useRef(0)
  const opacityRef = useRef(0)

  const setHoveredNeuron = usePortfolioStore((s) => s.setHoveredNeuron)
  const setSelectedNeuron = usePortfolioStore((s) => s.setSelectedNeuron)
  const hoveredNeuron = usePortfolioStore((s) => s.hoveredNeuron)
  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)
  const isIntroComplete = usePortfolioStore((s) => s.isIntroComplete)
  const activeCategories = usePortfolioStore((s) => s.activeCategories)

  const isPanelOpen = usePortfolioStore((s) => s.isPanelOpen)

  const isHovered = hoveredNeuron === node.id
  const isSelected = selectedNeuron?.id === node.id
  const isActive = activeCategories.includes(node.category)
  const color = node.color ?? '#ffffff'
  const radius = node.size * 0.8

  // Static LOD: fewer segments for small/peripheral nodes
  const segments =
    node.size >= LOD_CONFIG.high.minSize
      ? LOD_CONFIG.high.segments
      : node.size >= LOD_CONFIG.mid.minSize
        ? LOD_CONFIG.mid.segments
        : LOD_CONFIG.low.segments

  // Intro scale-in when intro completes
  useEffect(() => {
    if (!isIntroComplete) return
    const tween = gsap.to(scaleRef, {
      current: 1,
      duration: 0.6,
      ease: 'back.out(1.7)',
      delay: introDelay,
    })
    return () => { tween.kill() }
  }, [isIntroComplete, introDelay])

  // Opacity fade when category is toggled (only after intro)
  useEffect(() => {
    if (!isIntroComplete) return
    const tween = gsap.to(opacityRef, {
      current: isActive ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    })
    return () => { tween.kill() }
  }, [isActive, isIntroComplete])

  // Apply transforms and animate emissive glow each frame
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current)
    }
    if (meshRef.current) {
      // Disable pointer interaction when fully faded out
      meshRef.current.visible = opacityRef.current > 0.02
    }
    if (!materialRef.current) return
    materialRef.current.opacity = opacityRef.current
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
          ref={meshRef}
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
          <sphereGeometry args={[radius, segments, segments]} />
          <meshStandardMaterial
            ref={materialRef}
            color={color}
            emissive={color}
            emissiveIntensity={NEURON_DEFAULTS.emissiveIntensity.default}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0}
          />
        </mesh>

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

        {/* Tooltip: label + description, only when hovered and no panel open */}
        <Tooltip
          visible={isHovered && !isPanelOpen}
          label={node.label}
          description={NEURONS_BY_ID[node.id]?.description ?? ''}
          color={color}
          radius={radius}
        />
      </group>
    </Float>
  )
}
