import { CONNECTIONS } from '@/data/connections'

/**
 * BFS shortest path between two neuron ids.
 * Returns an ordered array of node ids (start → … → target), or null if unreachable.
 */
export function findPath(startId: string, targetId: string): string[] | null {
  if (startId === targetId) return [startId]

  const queue: string[][] = [[startId]]
  const visited = new Set<string>([startId])

  while (queue.length > 0) {
    const path = queue.shift()
    if (!path) break
    const current = path[path.length - 1]
    if (!current) continue

    const neighbors = CONNECTIONS.filter(
      (c) => c.source === current || c.target === current,
    ).map((c) => (c.source === current ? c.target : c.source))

    for (const neighbor of neighbors) {
      if (visited.has(neighbor)) continue
      const newPath = [...path, neighbor]
      if (neighbor === targetId) return newPath
      visited.add(neighbor)
      queue.push(newPath)
    }
  }

  return null
}
