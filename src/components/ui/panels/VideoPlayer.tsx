'use client'

import { gsap } from 'gsap'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  src: string
  poster?: string
}

export function VideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const controlsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [isMuted, setIsMuted] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)

  const formatTime = useCallback((seconds: number): string => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, '0')}`
  }, [])

  const showControls = useCallback(() => {
    setControlsVisible(true)
    if (controlsRef.current) {
      gsap.to(controlsRef.current, { opacity: 1, duration: 0.2 })
    }
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => {
        setControlsVisible(false)
        if (controlsRef.current) {
          gsap.to(controlsRef.current, { opacity: 0, duration: 0.3 })
        }
      }, 2000)
    }
  }, [isPlaying])

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    const pct = (video.currentTime / video.duration) * 100
    setProgress(pct)
    setCurrentTime(formatTime(video.currentTime))
  }, [formatTime])

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    setDuration(formatTime(video.duration))
  }, [formatTime])

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const bar = progressRef.current
    if (!video || !bar) return
    const rect = bar.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    video.currentTime = pct * video.duration
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg bg-black"
      onMouseMove={showControls}
      onMouseLeave={() => {
        if (isPlaying && controlsRef.current) {
          gsap.to(controlsRef.current, { opacity: 0, duration: 0.3, delay: 1 })
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="w-full cursor-pointer"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/20"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-110">
            <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
              <path d="M2 1v26l20-13L2 1z" fill="white" />
            </svg>
          </div>
        </button>
      )}

      <div
        ref={controlsRef}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-3 pt-8"
        style={{ opacity: controlsVisible ? 1 : 0 }}
      >
        <div
          ref={progressRef}
          className="mb-2 h-1 cursor-pointer rounded-full bg-white/20"
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full bg-violet-400 transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white/80 hover:text-white">
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <rect x="1" y="1" width="4" height="12" rx="1" />
                  <rect x="9" y="1" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                  <path d="M2 0.5v13l11-6.5L2 0.5z" />
                </svg>
              )}
            </button>
            <span className="font-mono text-[11px] text-white/60">
              {currentTime} / {duration}
            </span>
          </div>

          <button onClick={toggleMute} className="text-white/60 hover:text-white">
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5.5h2.5l3.5-3v11l-3.5-3H2v-5z" />
                <path d="M11 5l4 6M15 5l-4 6" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 5.5h2.5l3.5-3v11l-3.5-3H2v-5z" />
                <path d="M11 4.5c.8.8 1.2 2 1.2 3.5s-.4 2.7-1.2 3.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
