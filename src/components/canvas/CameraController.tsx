'use client'

import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { ANIMATION_CONFIG, CAMERA_CONFIG } from '@/lib/constants'
import { getNodeById } from '@/lib/neuralLayout'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

// Duck-typed interface for OrbitControls — avoids importing the class directly
interface OrbitControlsHandle {
  target: THREE.Vector3
  update(): void
  enabled: boolean
  autoRotate: boolean
}

export function CameraController() {
  const controlsRef = useRef<OrbitControlsHandle | null>(null)
  const { camera } = useThree()

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  useEffect(() => {
    const ctrl = controlsRef.current
    if (!ctrl) return

    if (!selectedNeuron) {
      // Return to overview
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(ctrl.target)
      ctrl.enabled = false
      ctrl.autoRotate = false

      const [x, y, z] = CAMERA_CONFIG.initialPosition
      gsap.to(camera.position, {
        x,
        y,
        z,
        duration: ANIMATION_CONFIG.cameraZoom.duration,
        ease: ANIMATION_CONFIG.cameraZoom.ease,
        onUpdate: () => ctrl.update(),
        onComplete: () => {
          ctrl.enabled = true
          ctrl.autoRotate = true
        },
      })
      gsap.to(ctrl.target, {
        x: 0,
        y: 0,
        z: 0,
        duration: ANIMATION_CONFIG.cameraZoom.duration,
        ease: ANIMATION_CONFIG.cameraZoom.ease,
      })
      return
    }

    const node = getNodeById(selectedNeuron.id)
    if (!node) return

    const nodeX = node.x ?? 0
    const nodeY = node.y ?? 0
    const nodeZ = node.z ?? 0

    // Kill any in-progress camera tweens before starting new ones
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(ctrl.target)

    // Offset camera slightly so the neuron is not dead-center
    const offset = 12
    ctrl.enabled = false
    ctrl.autoRotate = false

    gsap.to(camera.position, {
      x: nodeX + offset,
      y: nodeY + offset * 0.5,
      z: nodeZ + offset,
      duration: ANIMATION_CONFIG.cameraZoom.duration,
      ease: ANIMATION_CONFIG.cameraZoom.ease,
      onUpdate: () => ctrl.update(),
      onComplete: () => {
        ctrl.enabled = true
      },
    })
    gsap.to(ctrl.target, {
      x: nodeX,
      y: nodeY,
      z: nodeZ,
      duration: ANIMATION_CONFIG.cameraZoom.duration,
      ease: ANIMATION_CONFIG.cameraZoom.ease,
    })
    return () => {
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(ctrl.target)
    }
  }, [selectedNeuron, camera])

  return (
    <OrbitControls
      ref={(instance) => {
        controlsRef.current = instance as unknown as OrbitControlsHandle | null
      }}
      autoRotate
      autoRotateSpeed={CAMERA_CONFIG.autoRotateSpeed}
      minDistance={CAMERA_CONFIG.minDistance}
      maxDistance={CAMERA_CONFIG.maxDistance}
      enableDamping
      dampingFactor={0.08}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_ROTATE,
      }}
    />
  )
}
