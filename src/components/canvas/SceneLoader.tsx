'use client'

import dynamic from 'next/dynamic'

// Dynamic import with ssr: false must be inside a Client Component
const NeuralScene = dynamic(
  () => import('@/components/canvas/NeuralScene').then((mod) => mod.NeuralScene),
  { ssr: false, loading: () => null },
)

export function SceneLoader() {
  return <NeuralScene />
}
