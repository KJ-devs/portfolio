'use client'

import { Html } from '@react-three/drei'
import { gsap } from 'gsap'
import { useEffect, useRef } from 'react'

interface TooltipProps {
  visible: boolean
  label: string
  description: string
  color: string
  radius: number
}

export function Tooltip({ visible, label, description, color, radius }: TooltipProps) {
  const divRef = useRef<HTMLDivElement>(null)

  // Animate in/out — always mounted, GSAP controls opacity/scale
  useEffect(() => {
    if (!divRef.current) return
    const el = divRef.current
    if (visible) {
      const tween = gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
      )
      return () => { tween.kill() }
    } else {
      const tween = gsap.to(el, {
        opacity: 0,
        scale: 0.8,
        duration: 0.15,
        ease: 'power2.in',
        delay: 0.1,
      })
      return () => { tween.kill() }
    }
  }, [visible])

  return (
    <Html
      center
      position={[0, radius + 1.8, 0]}
      style={{ pointerEvents: 'none', userSelect: 'none' }}
    >
      <div
        ref={divRef}
        style={{
          opacity: 0,
          transformOrigin: 'bottom center',
          transform: 'scale(0.8)',
        }}
      >
        <div
          style={{
            background: 'rgba(10, 10, 15, 0.85)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '6px 10px',
            backdropFilter: 'blur(8px)',
            maxWidth: '160px',
            textAlign: 'center',
            boxShadow: `0 0 12px ${color}33`,
          }}
        >
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '11px',
              fontWeight: 600,
              color: color,
              whiteSpace: 'nowrap',
              marginBottom: '2px',
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '9px',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </Html>
  )
}
