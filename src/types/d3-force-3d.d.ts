declare module 'd3-force-3d' {
  export interface SimNode {
    index?: number
    x: number
    y: number
    z: number
    vx: number
    vy: number
    vz: number
    fx?: number | null
    fy?: number | null
    fz?: number | null
  }

  export interface SimLink<N extends SimNode = SimNode> {
    source: N | string
    target: N | string
    index?: number
  }

  export interface SimForce<N extends SimNode> {
    (alpha: number): void
    initialize?: (nodes: N[], random: () => number) => void
  }

  export interface ManyBodyForce<N extends SimNode> extends SimForce<N> {
    strength(strength: number | ((d: N) => number)): this
    strength(): number | ((d: N) => number)
  }

  export interface LinkForce<N extends SimNode, L extends SimLink<N>> extends SimForce<N> {
    links(): L[]
    links(links: L[]): this
    id(id: (d: N) => string): this
    distance(distance: number | ((d: L) => number)): this
    strength(strength: number | ((d: L) => number)): this
  }

  export type CenterForce<N extends SimNode> = SimForce<N>

  export interface AxisForce<N extends SimNode> extends SimForce<N> {
    strength(strength: number | ((d: N) => number)): this
    strength(): number | ((d: N) => number)
  }

  export interface ForceSimulation<N extends SimNode, L extends SimLink<N> = SimLink<N>> {
    force(name: string, force: SimForce<N> | null): this
    alphaDecay(value: number): this
    stop(): this
    tick(iterations?: number): this
    nodes(): N[]
    nodes(nodes: N[]): this
    numDimensions(n: number): this
    alpha(): number
    alpha(alpha: number): this
    restart(): this
    on(typenames: string, listener: (this: ForceSimulation<N, L>) => void): this
  }

  export function forceSimulation<N extends SimNode, L extends SimLink<N> = SimLink<N>>(
    nodes?: N[],
    numDimensions?: number,
  ): ForceSimulation<N, L>

  export function forceManyBody<N extends SimNode>(): ManyBodyForce<N>

  export function forceLink<N extends SimNode, L extends SimLink<N> = SimLink<N>>(
    links?: L[],
  ): LinkForce<N, L>

  export function forceCenter<N extends SimNode>(
    x?: number,
    y?: number,
    z?: number,
  ): CenterForce<N>

  export function forceX<N extends SimNode>(
    x?: number | ((d: N) => number),
  ): AxisForce<N>

  export function forceY<N extends SimNode>(
    y?: number | ((d: N) => number),
  ): AxisForce<N>

  export function forceZ<N extends SimNode>(
    z?: number | ((d: N) => number),
  ): AxisForce<N>
}
