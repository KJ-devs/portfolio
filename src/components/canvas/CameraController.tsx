'use client'

import { OrbitControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
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

// Distance the camera sits from the selected node
const NODE_ZOOM_DISTANCE = 12

// Live proxy values written by GSAP, read by the priority-1 useFrame
interface CameraProxy {
  cx: number; cy: number; cz: number
  ox: number; oy: number; oz: number
}

export function CameraController() {
  const controlsRef = useRef<OrbitControlsHandle | null>(null)
  const tweenRef    = useRef<gsap.core.Tween | null>(null)
  // Non-null while a tween is active — useFrame reads it to override OrbitControls
  const proxyRef    = useRef<CameraProxy | null>(null)
  const { camera }  = useThree()

  const selectedNeuron = usePortfolioStore((s) => s.selectedNeuron)

  // Priority 1 fires AFTER OrbitControls (priority 0) every frame.
  // While a GSAP tween is running, this is the sole source of truth for
  // camera.position — it overrides any position OrbitControls may have set.
  useFrame(() => {
    const p = proxyRef.current
    if (!p) return
    camera.position.set(p.cx, p.cy, p.cz)
    camera.lookAt(p.ox, p.oy, p.oz)
  }, 1)

  useEffect(() => {
    const ctrl = controlsRef.current
    if (!ctrl) return

    // Kill any in-flight tween and clear the override proxy
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
      proxyRef.current = null
    }

    if (!selectedNeuron) {
      // Return to overview
      ctrl.autoRotate = false

      const [tx, ty, tz] = CAMERA_CONFIG.initialPosition
      const proxy: CameraProxy = {
        cx: camera.position.x, cy: camera.position.y, cz: camera.position.z,
        ox: ctrl.target.x,     oy: ctrl.target.y,     oz: ctrl.target.z,
      }
      proxyRef.current = { ...proxy }

      tweenRef.current = gsap.to(proxy, {
        cx: tx, cy: ty, cz: tz,
        ox: 0,  oy: 0,  oz: 0,
        duration: ANIMATION_CONFIG.cameraZoom.duration,
        ease:     ANIMATION_CONFIG.cameraZoom.ease,
        onUpdate() {
          proxyRef.current = { cx: proxy.cx, cy: proxy.cy, cz: proxy.cz,
                               ox: proxy.ox, oy: proxy.oy, oz: proxy.oz }
        },
        onComplete() {
          // Sync OrbitControls internal state before releasing control
          ctrl.target.set(0, 0, 0)
          ctrl.update()
          proxyRef.current = null
          ctrl.autoRotate = true
        },
      })
      return
    }

    const node = getNodeById(selectedNeuron.id)
    if (!node) return

    const nodeX = node.x ?? 0
    const nodeY = node.y ?? 0
    const nodeZ = node.z ?? 0

    // Approach the node from the current camera direction so it stays centred
    const nodePos  = new THREE.Vector3(nodeX, nodeY, nodeZ)
    const toCamera = camera.position.clone().sub(nodePos)
    const dist     = toCamera.length()
    const direction = dist > 0.5
      ? toCamera.normalize()
      : new THREE.Vector3(0.7, 0.35, 0.7).normalize()

    const newCamPos = nodePos.clone().add(direction.multiplyScalar(NODE_ZOOM_DISTANCE))

    const proxy: CameraProxy = {
      cx: camera.position.x, cy: camera.position.y, cz: camera.position.z,
      ox: ctrl.target.x,     oy: ctrl.target.y,     oz: ctrl.target.z,
    }
    proxyRef.current = { ...proxy }
    ctrl.autoRotate  = false

    tweenRef.current = gsap.to(proxy, {
      cx: newCamPos.x, cy: newCamPos.y, cz: newCamPos.z,
      ox: nodeX,       oy: nodeY,       oz: nodeZ,
      duration: ANIMATION_CONFIG.cameraZoom.duration,
      ease:     ANIMATION_CONFIG.cameraZoom.ease,
      onUpdate() {
        proxyRef.current = { cx: proxy.cx, cy: proxy.cy, cz: proxy.cz,
                             ox: proxy.ox, oy: proxy.oy, oz: proxy.oz }
      },
      onComplete() {
        // Sync OrbitControls internal state before releasing control
        ctrl.target.set(nodeX, nodeY, nodeZ)
        ctrl.update()
        proxyRef.current = null
        ctrl.autoRotate  = false
      },
    })

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill()
        tweenRef.current = null
        proxyRef.current = null
      }
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
