'use client'

import { useMemo } from 'react'

import { CONNECTIONS } from '@/data/connections'
import { NEURONS } from '@/data/neurons'
import type { NeuronData } from '@/types/neuron'

/** Returns up to 8 neurons directly connected to the given neuron id. */
export function useConnectedNeurons(neuron: NeuronData | null): NeuronData[] {
  return useMemo<NeuronData[]>(() => {
    if (!neuron) return []

    const ids = CONNECTIONS.filter(
      (c) => c.source === neuron.id || c.target === neuron.id,
    ).map((c) => (c.source === neuron.id ? c.target : c.source))

    return ids
      .map((id) => NEURONS.find((n) => n.id === id))
      .filter((n): n is NeuronData => n !== undefined)
      .slice(0, 8)
  }, [neuron])
}
