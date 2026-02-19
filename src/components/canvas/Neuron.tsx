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
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const ring2MatRef = useRef<THREE.MeshStandardMaterial>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const worldPosVec = useRef(new THREE.Vector3())
  const scaleRef = useRef(0)
  const opacityRef = useRef(0)
  const pulseTimeRef = useRef(0)
  const ringOpacityRef = useRef(0)

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

  // Opacity fade when category is toggled
  useEffect(() => {
    if (!isIntroComplete) return
    const tween = gsap.to(opacityRef, {
      current: isActive ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    })
    return () => { tween.kill() }
  }, [isActive, isIntroComplete])

  // Selection ring fade in/out
  useEffect(() => {
    const tween = gsap.to(ringOpacityRef, {
      current: isSelected ? 1 : 0,
      duration: 0.4,
      ease: 'power2.inOut',
    })
    return () => { tween.kill() }
  }, [isSelected])

  useFrame(({ camera }, delta) => {
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scaleRef.current)
    }
    if (meshRef.current) {
      meshRef.current.visible = opacityRef.current > 0.02
    }
    if (materialRef.current) {
      materialRef.current.opacity = opacityRef.current
      if (node.id === 'brain') {
        pulseTimeRef.current += delta
        materialRef.current.emissiveIntensity =
          0.6 + Math.sin(pulseTimeRef.current * 3) * 0.5
      } else {
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
      }
    }

    // Spin and fade selection rings
    const ringOpacity = ringOpacityRef.current
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6
      ringRef.current.rotation.x += delta * 0.2
      if (ringMatRef.current) {
        ringMatRef.current.opacity = THREE.MathUtils.lerp(
          ringMatRef.current.opacity,
          ringOpacity * 0.55,
          delta * 6,
        )
      }
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.4
      ring2Ref.current.rotation.y += delta * 0.3
      if (ring2MatRef.current) {
        ring2MatRef.current.opacity = THREE.MathUtils.lerp(
          ring2MatRef.current.opacity,
          ringOpacity * 0.3,
          delta * 6,
        )
      }
    }

    // Distance-based label opacity
    if (labelRef.current && groupRef.current) {
      groupRef.current.getWorldPosition(worldPosVec.current)
      const dist = camera.position.distanceTo(worldPosVec.current)
      const base = dist < 25 ? (isHovered || isSelected ? 1 : 0.7) : dist < 40 ? 0.35 : 0
      labelRef.current.style.opacity = String(base * opacityRef.current)
    }
  })

  return (
    <Float
      speed={isSelected ? 2.0 : 1.5}
      rotationIntensity={0}
      floatIntensity={isSelected ? 0.5 : 0.3}
      position={[node.x, node.y, node.z]}
    >
      <group ref={groupRef}>
        {/* Outer selection ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[radius * 2.4, 0.035, 6, 64]} />
          <meshStandardMaterial
            ref={ringMatRef}
            color={color}
            emissive={color}
            emissiveIntensity={2.0}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>

        {/* Inner selection ring */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
          <torusGeometry args={[radius * 1.8, 0.025, 6, 48]} />
          <meshStandardMaterial
            ref={ring2MatRef}
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>

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
            roughness={0.2}
            metalness={0.15}
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
            ref={labelRef}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              color: '#ffffff',
              opacity: 0,
              whiteSpace: 'nowrap',
              textShadow: `0 0 10px ${color}, 0 0 20px ${color}50`,
            }}
          >
            {node.label}
          </span>
        </Html>

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
