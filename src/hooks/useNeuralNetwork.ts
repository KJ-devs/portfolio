'use client'

import { useCallback, useEffect, useState } from 'react'

import { createNeuralLayout } from '@/lib/neuralLayout'
import type { LayoutLink, LayoutNode } from '@/lib/neuralLayout'

export interface NeuralNetworkState {
  nodes: LayoutNode[]
  links: LayoutLink[]
  isReady: boolean
  recalculate: () => void
}

export function useNeuralNetwork(): NeuralNetworkState {
  const [nodes, setNodes] = useState<LayoutNode[]>([])
  const [links, setLinks] = useState<LayoutLink[]>([])
  const [isReady, setIsReady] = useState(false)

  const recalculate = useCallback(() => {
    setIsReady(false)
    const result = createNeuralLayout()
    setNodes(result.nodes)
    setLinks(result.links)
    setIsReady(true)
  }, [])

  useEffect(() => {
    recalculate()
  }, [recalculate])

  return { nodes, links, isReady, recalculate }
}
