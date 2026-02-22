'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CAMERA_CONFIG } from '@/lib/constants'
import { useTheme } from '@/hooks/useTheme'
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
  const theme = useTheme()

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{
          fov: CAMERA_CONFIG.fov,
          near: CAMERA_CONFIG.near,
          far: CAMERA_CONFIG.far,
          position: theme.camera.initialPosition,
        }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ background: theme.colors.background }}
        onPointerMissed={() => { if (isPanelOpen && !isTourActive) closePanel() }}
      >
        <Suspense fallback={null}>
          <fogExp2 attach="fog" args={[theme.colors.fog, theme.colors.fogDensity]} />

          <ambientLight
            intensity={theme.colors.ambientIntensity}
            color={theme.colors.ambientLight}
          />

          {theme.lights.map((light, i) => (
            <pointLight
              key={`${theme.id}-light-${i}`}
              position={light.position}
              intensity={light.intensity}
              color={light.color}
              distance={light.distance}
            />
          ))}

          <CameraController />
          {theme.background.showBrainOutline && <BrainOutline />}
          <NeuralNetwork />
          <BackgroundEffects />
          <PostProcessing />
        </Suspense>
      </Canvas>
    </div>
  )
}
