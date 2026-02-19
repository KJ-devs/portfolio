/**
 * GSAP Animation System — Neural Portfolio
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * DESIGN ANALYSIS (Step 3)
 *
 * V1 Classic  — Clean & functional but lacks personality. Animations are CSS-only.
 * V2 Signal   — Strong identity with monospace type but stiff, no scroll storytelling.
 * V3 Aura     — Beautiful bento layout, best 3D tilt feel, but lacks animation depth.
 *
 * V4 Monolith — [ Target ] Precision editorial, minimal color, char-by-char entry.
 * V5 Surge    — [ Target ] Bold energy, marquee kinetics, strong section rhythm.
 * V6 Cinéma   — [ Target ] Immersive scroll, clip-path drama, per-section identity.
 *
 * HIERARCHY:
 *   Page Load     → hero timeline (delay 0.2s, sequential)
 *   First scroll  → section reveals (ScrollTrigger, start 85-90%)
 *   Interactions  → hover (instant, < 300ms), click (< 150ms)
 *
 * EASING RULES:
 *   Entry          → power3.out  (fast start, slow stop — feels heavy/settled)
 *   Text           → power3.out  (same — legible motion)
 *   Exit           → power2.in   (slow start, fast stop)
 *   Camera / large → power3.inOut
 *   Bounce / pop   → back.out(1.5) or elastic.out(1, 0.5)
 *   Continuous     → none (marquee, loops)
 *
 * DURATIONS:
 *   Hero chars     → 0.7–0.9s stagger 0.05–0.1
 *   Section reveal → 0.6–0.8s
 *   Cards          → 0.5–0.65s stagger 0.08
 *   Hover          → 0.2–0.3s
 *   Magnetic       → 0.3s in / 0.5s out (elastic)
 *   Marquee        → 18–22s repeat:-1 ease:none
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ScrollRevealConfig {
  scroller: HTMLElement
  start?: string
  staggerPerItem?: number
}

// ── Hero Entrance ──────────────────────────────────────────────────────────────

/**
 * Reveal lines of text that are wrapped in `overflow-hidden` parents.
 * Each `.line` element slides up from yPercent: 110.
 * Usage: wrap each text line in <div style={{ overflow: 'hidden' }}><span class="line">...</span></div>
 */
export function heroLineReveal(selector: string, opts?: { delay?: number; stagger?: number }) {
  return gsap.from(selector, {
    yPercent: 112,
    duration: 0.85,
    stagger: opts?.stagger ?? 0.1,
    delay: opts?.delay ?? 0.2,
    ease: 'power3.out',
  })
}

/**
 * Clip-path reveal: text appears left-to-right like a curtain lift.
 */
export function heroClipReveal(selector: string, opts?: { delay?: number; stagger?: number }) {
  return gsap.from(selector, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 0.95,
    stagger: opts?.stagger ?? 0.12,
    delay: opts?.delay ?? 0.2,
    ease: 'power3.out',
  })
}

/**
 * Standard fade + translate-up for supporting elements (badges, CTAs, sub-text).
 */
export function heroFadeUp(selector: string, opts?: { delay?: number; stagger?: number }) {
  return gsap.from(selector, {
    opacity: 0,
    y: 20,
    duration: 0.55,
    stagger: opts?.stagger ?? 0.08,
    delay: opts?.delay ?? 0.6,
    ease: 'power2.out',
  })
}

// ── ScrollTrigger Reveals ─────────────────────────────────────────────────────

/**
 * Slide elements up from y:40 on scroll.
 * Pass class selector and scroller for custom scroll containers.
 */
export function scrollRevealUp(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.65,
      delay: (i % 4) * (cfg.staggerPerItem ?? 0.08),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 88%',
      },
    })
  })
}

/**
 * Clip-path reveal on scroll (bottom to top — panel lifts).
 */
export function scrollRevealClip(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(100% 0 0 0)',
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 88%',
      },
    })
  })
}

/**
 * Horizontal line scale from scaleX: 0 (left origin).
 */
export function scrollRevealLine(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 88%',
      },
    })
  })
}

/**
 * Slide from left on scroll.
 */
export function scrollRevealLeft(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      x: -50,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 85%',
      },
    })
  })
}

/**
 * Scale + fade for cards.
 */
export function scrollRevealCards(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      duration: 0.65,
      delay: (i % 3) * (cfg.staggerPerItem ?? 0.1),
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 90%',
      },
    })
  })
}

/**
 * Pop in for tags / pills — back.out for a bouncy feel.
 */
export function scrollRevealTags(selector: string, cfg: ScrollRevealConfig) {
  gsap.utils.toArray<Element>(selector).forEach((el, i) => {
    gsap.from(el, {
      opacity: 0,
      scale: 0.75,
      y: 12,
      duration: 0.35,
      delay: (i % 12) * 0.035,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: el,
        scroller: cfg.scroller,
        start: cfg.start ?? 'top 92%',
      },
    })
  })
}

// ── Continuous Animations ─────────────────────────────────────────────────────

/**
 * Infinite horizontal marquee (requires two duplicated track elements for seamless loop).
 * Target: the wrapper with `width: max-content` that contains 2× the content.
 */
export function startMarquee(
  trackEl: HTMLElement,
  opts?: { duration?: number; direction?: 1 | -1 },
): gsap.core.Tween {
  const dir = opts?.direction ?? 1
  return gsap.to(trackEl, {
    xPercent: -50 * dir,
    duration: opts?.duration ?? 20,
    ease: 'none',
    repeat: -1,
  })
}

// ── Micro-interactions ────────────────────────────────────────────────────────

/**
 * Magnetic button effect — attach to button/link with onMouseMove / onMouseLeave.
 * Returns cleanup function.
 */
export function attachMagnetic(el: HTMLElement, strength = 0.3): () => void {
  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.3, ease: 'power2.out' })
  }
  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' })
  }
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
  }
}

/**
 * 3D card tilt on mouse move.
 * Returns { onMouseMove, onMouseLeave } handlers for use in JSX.
 */
export function createCardTilt(strength = 12) {
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(el, {
      rotateY: x * strength,
      rotateX: -y * strength,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    })
  }
  const onMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.65,
      ease: 'elastic.out(1, 0.6)',
    })
  }
  return { onMouseMove, onMouseLeave }
}

/**
 * Animate a number counter from 0 to `to`.
 */
export function animateCounter(
  el: HTMLElement,
  to: number,
  opts?: { duration?: number; suffix?: string; delay?: number },
): gsap.core.Tween {
  const obj = { value: 0 }
  return gsap.to(obj, {
    value: to,
    duration: opts?.duration ?? 1.5,
    delay: opts?.delay ?? 0,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(obj.value) + (opts?.suffix ?? '')
    },
  })
}

// ── Page Load Sequence ────────────────────────────────────────────────────────

/**
 * Standard page load timeline.
 * 1. Eyebrow badge (fade + slide)
 * 2. Title lines (line reveal or clip-path)
 * 3. Supporting text (fade up)
 * 4. CTAs (fade + stagger)
 * 5. Scroll indicator (fade)
 */
export function buildHeroTimeline(selectors: {
  eyebrow?: string
  titleLines: string
  sub?: string
  ctas?: string
  scrollHint?: string
  mode?: 'line' | 'clip'
}): gsap.core.Timeline {
  const tl = gsap.timeline({ delay: 0.15 })

  if (selectors.eyebrow) {
    tl.from(selectors.eyebrow, { opacity: 0, x: -25, duration: 0.45, ease: 'power2.out' })
  }

  if (selectors.mode === 'clip') {
    tl.from(
      selectors.titleLines,
      { clipPath: 'inset(0 100% 0 0)', duration: 0.9, stagger: 0.12, ease: 'power3.out' },
      selectors.eyebrow ? '-=0.2' : '+=0',
    )
  } else {
    tl.from(
      selectors.titleLines,
      { yPercent: 112, duration: 0.85, stagger: 0.1, ease: 'power3.out' },
      selectors.eyebrow ? '-=0.2' : '+=0',
    )
  }

  if (selectors.sub) {
    tl.from(selectors.sub, { opacity: 0, y: 18, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  }

  if (selectors.ctas) {
    tl.from(
      selectors.ctas,
      { opacity: 0, y: 14, duration: 0.4, stagger: 0.07, ease: 'power2.out' },
      '-=0.2',
    )
  }

  if (selectors.scrollHint) {
    tl.from(selectors.scrollHint, { opacity: 0, duration: 0.4 }, '-=0.1')
  }

  return tl
}
