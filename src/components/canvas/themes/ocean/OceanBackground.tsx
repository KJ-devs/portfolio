'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import { useTheme } from '@/hooks/useTheme'
import { oceanCausticVertex, oceanCausticFragment } from './ocean.shaders'

const BUBBLE_COUNT = 150
const MARINE_SNOW_COUNT = 200
const BUBBLE_BOUNDS = { x: 80, y: 60, z: 80 }
const SNOW_BOUNDS = { x: 100, y: 80, z: 100 }

// -- Caustic Plane -----------------------------------------------------------

function CausticPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const theme = useTheme()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(theme.colors.categories.skill) },
      uOpacity: { value: 0.12 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame(({ clock }) => {
    if (!materialRef.current) return
    uniforms.uTime.value = clock.getElapsedTime() * 0.4
    uniforms.uColor.value.set(theme.colors.categories.skill)
  })

  return (
    <mesh position={[0, 30, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[150, 150, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={oceanCausticVertex}
        fragmentShader={oceanCausticFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// -- Bubbles -----------------------------------------------------------------

function Bubbles() {
  const pointsRef = useRef<THREE.Points>(null)
  const theme = useTheme()

  const { positions, velocities, wobbleOffsets } = useMemo(() => {
    const pos = new Float32Array(BUBBLE_COUNT * 3)
    const vel = new Float32Array(BUBBLE_COUNT)
    const wobble = new Float32Array(BUBBLE_COUNT)

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * BUBBLE_BOUNDS.x
      pos[i3 + 1] = (Math.random() - 0.5) * BUBBLE_BOUNDS.y
      pos[i3 + 2] = (Math.random() - 0.5) * BUBBLE_BOUNDS.z
      vel[i] = 0.3 + Math.random() * 0.7
      wobble[i] = Math.random() * Math.PI * 2
    }

    return { positions: pos, velocities: vel, wobbleOffsets: wobble }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const material = useMemo(() => {
    const tealColor = new THREE.Color(theme.colors.categories.skill)
    const whiteBlend = new THREE.Color('#ffffff')
    const bubbleColor = tealColor.clone().lerp(whiteBlend, 0.5)

    return new THREE.PointsMaterial({
      color: bubbleColor,
      size: 0.25,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme.id])

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const time = clock.getElapsedTime()

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const i3 = i * 3
      const vel = velocities[i] ?? 0.5
      const wobble = wobbleOffsets[i] ?? 0

      // Rise upward
      arr[i3 + 1] = (arr[i3 + 1] ?? 0) + vel * delta * 2.0

      // Horizontal wobble
      arr[i3] = (arr[i3] ?? 0) + Math.sin(time * 1.2 + wobble) * delta * 0.3
      arr[i3 + 2] = (arr[i3 + 2] ?? 0) + Math.cos(time * 0.9 + wobble * 1.5) * delta * 0.2

      // Wrap around when above threshold
      if ((arr[i3 + 1] ?? 0) > BUBBLE_BOUNDS.y * 0.5) {
        arr[i3 + 1] = -BUBBLE_BOUNDS.y * 0.5
        arr[i3] = (Math.random() - 0.5) * BUBBLE_BOUNDS.x
        arr[i3 + 2] = (Math.random() - 0.5) * BUBBLE_BOUNDS.z
      }
    }

    posAttr.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// -- Marine Snow -------------------------------------------------------------

function MarineSnow() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities, driftOffsets } = useMemo(() => {
    const pos = new Float32Array(MARINE_SNOW_COUNT * 3)
    const vel = new Float32Array(MARINE_SNOW_COUNT)
    const drift = new Float32Array(MARINE_SNOW_COUNT)

    for (let i = 0; i < MARINE_SNOW_COUNT; i++) {
      const i3 = i * 3
      pos[i3] = (Math.random() - 0.5) * SNOW_BOUNDS.x
      pos[i3 + 1] = (Math.random() - 0.5) * SNOW_BOUNDS.y
      pos[i3 + 2] = (Math.random() - 0.5) * SNOW_BOUNDS.z
      vel[i] = 0.1 + Math.random() * 0.2
      drift[i] = Math.random() * Math.PI * 2
    }

    return { positions: pos, velocities: vel, driftOffsets: drift }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: '#ffffff',
        size: 0.08,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    [],
  )

  useFrame(({ clock }, delta) => {
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    const time = clock.getElapsedTime()

    for (let i = 0; i < MARINE_SNOW_COUNT; i++) {
      const i3 = i * 3
      const vel = velocities[i] ?? 0.15
      const drift = driftOffsets[i] ?? 0

      // Slowly descend
      arr[i3 + 1] = (arr[i3 + 1] ?? 0) - vel * delta * 1.5

      // Gentle horizontal drift
      arr[i3] = (arr[i3] ?? 0) + Math.sin(time * 0.3 + drift) * delta * 0.08
      arr[i3 + 2] = (arr[i3 + 2] ?? 0) + Math.cos(time * 0.25 + drift * 1.3) * delta * 0.06

      // Wrap around when below threshold
      if ((arr[i3 + 1] ?? 0) < -SNOW_BOUNDS.y * 0.5) {
        arr[i3 + 1] = SNOW_BOUNDS.y * 0.5
        arr[i3] = (Math.random() - 0.5) * SNOW_BOUNDS.x
        arr[i3 + 2] = (Math.random() - 0.5) * SNOW_BOUNDS.z
      }
    }

    posAttr.needsUpdate = true
  })

  return <points ref={pointsRef} geometry={geometry} material={material} />
}

// -- Composite Background ----------------------------------------------------

export function OceanBackground() {
  const theme = useTheme()

  if (theme.id !== 'ocean') return null

  return (
    <group>
      <CausticPlane />
      <Bubbles />
      <MarineSnow />
    </group>
  )
}
