export type ConnectionStrength = number // 0.1 à 1.0

export interface ConnectionData {
  source: string
  target: string
  strength: ConnectionStrength
  label?: string
}
