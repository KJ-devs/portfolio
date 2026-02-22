'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CAMERA_CONFIG } from '@/lib/constants'
import { usePortfolioStore } from '@/stores/usePortfolioStore'

import { BackgroundEffects } from './BackgroundEffects'
import { BrainOutline } from './BrainOutline'
import { CameraController } from './CameraController'
import { NeuralNetwork } from './NeuralNetwork'
import { PostProcessing } from './PostProcessing'

export function NeuralScene() {
  const closePanel = usePortfolioStore((s) => s.closePanel)
  const isPanelOpen = usePortfolioStore((s) => s.isPanelOpen)
  const isTourActive = usePortfolioStore((s) => s.isTourActive)

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
        style={{ background: '#050510' }}
        onPointerMissed={() => { if (isPanelOpen && !isTourActive) closePanel() }}
      >
        <Suspense fallback={null}>
          {/* Deep space fog — slightly denser for brain depth */}
          <fogExp2 attach="fog" args={['#050510', 0.004]} />

          {/* Ambient base illumination — cool blue */}
          <ambientLight intensity={0.35} color="#6677cc" />

          {/* Main overhead light — brain highlight */}
          <pointLight
            position={[0, 40, 10]}
            intensity={2.0}
            color="#ffffff"
            distance={200}
          />

          {/* Cyan accent — frontal lobe area */}
          <pointLight
            position={[0, 10, 40]}
            intensity={1.5}
            color="#00D4FF"
            distance={120}
          />

          {/* Purple accent — temporal/project area */}
          <pointLight
            position={[-40, -5, 0]}
            intensity={0.8}
            color="#A855F7"
            distance={120}
          />

          {/* Emerald accent — experience area */}
          <pointLight
            position={[40, -5, 0]}
            intensity={0.6}
            color="#10B981"
            distance={120}
          />

          {/* Indigo backlight — occipital lobe depth */}
          <pointLight
            position={[0, 5, -35]}
            intensity={1.0}
            color="#818CF8"
            distance={100}
          />

          {/* Warm underlight — brain stem warmth */}
          <pointLight
            position={[0, -30, 0]}
            intensity={0.4}
            color="#F472B6"
            distance={100}
          />

          <CameraController />
          <BrainOutline />
          <NeuralNetwork />
          <BackgroundEffects />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
