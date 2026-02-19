'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CAMERA_CONFIG } from '@/lib/constants'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { BackgroundEffects } from './BackgroundEffects'
import { CameraController } from './CameraController'
import { NeuralNetwork } from './NeuralNetwork'
import { PostProcessing } from './PostProcessing'

export function NeuralScene() {
  const closePanel = usePortfolioStore((s) => s.closePanel)
  const isPanelOpen = usePortfolioStore((s) => s.isPanelOpen)

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{
          fov: CAMERA_CONFIG.fov,
          near: CAMERA_CONFIG.near,
          far: CAMERA_CONFIG.far,
          position: CAMERA_CONFIG.initialPosition,
        }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ background: '#0A0A0F' }}
        onPointerMissed={() => { if (isPanelOpen) closePanel() }}
      >
        <Suspense fallback={null}>
          {/* Ambient light for base scene illumination */}
          <ambientLight intensity={0.3} color="#ffffff" />

          {/* Main point light from above */}
          <pointLight
            position={[0, 50, 0]}
            intensity={2.0}
            color="#ffffff"
            distance={200}
          />

          {/* Secondary accent light — blue-ish, from the side */}
          <pointLight
            position={[-50, 0, 30]}
            intensity={0.8}
            color="#00D4FF"
            distance={150}
          />

          <CameraController />
          <NeuralNetwork />
          <BackgroundEffects />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
