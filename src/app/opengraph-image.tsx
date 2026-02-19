import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Neural Portfolio — Sunny'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Neurons to draw on the OG image (simplified network)
const DOTS = [
  { x: 600, y: 315, r: 22, color: '#F5E6CC' }, // core — center
  { x: 360, y: 200, r: 13, color: '#00D4FF' },  // skill
  { x: 480, y: 160, r: 11, color: '#00D4FF' },
  { x: 700, y: 180, r: 14, color: '#00D4FF' },
  { x: 820, y: 220, r: 12, color: '#00D4FF' },
  { x: 340, y: 380, r: 15, color: '#A855F7' }, // project
  { x: 810, y: 400, r: 14, color: '#A855F7' },
  { x: 460, y: 460, r: 13, color: '#10B981' }, // experience
  { x: 740, y: 460, r: 12, color: '#10B981' },
  { x: 580, y: 490, r: 9,  color: '#F472B6' }, // contact
  { x: 650, y: 490, r: 9,  color: '#F472B6' },
]

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [0, 5], [0, 6], [0, 7], [0, 8],
  [0, 9], [0, 10],
  [1, 2], [3, 4], [5, 7], [6, 8],
]

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0F',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Neural network SVG background */}
        <svg
          width="1200"
          height="630"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Edges */}
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={DOTS[a]!.x}
              y1={DOTS[a]!.y}
              x2={DOTS[b]!.x}
              y2={DOTS[b]!.y}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
            />
          ))}
          {/* Nodes */}
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill={d.color}
              opacity={i === 0 ? 1 : 0.7}
            />
          ))}
        </svg>

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '6px',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Neural Portfolio
          </p>
          <h1
            style={{
              fontFamily: 'monospace',
              fontSize: '96px',
              fontWeight: 700,
              color: '#F5E6CC',
              letterSpacing: '12px',
              margin: 0,
            }}
          >
            SUNNY
          </h1>
          <p
            style={{
              fontFamily: 'monospace',
              fontSize: '22px',
              color: '#00D4FF',
              margin: 0,
              letterSpacing: '2px',
            }}
          >
            Développeur Fullstack · Master IA &amp; Big Data
          </p>
        </div>
      </div>
    ),
    { ...size },
  )
}
