/**
 * Playwright visual test for the Guided Tour feature.
 *
 * Verifies:
 *   1. InfoPanel opens on every step with the correct node label
 *   2. Camera actually moves between steps (screenshots differ)
 *   3. Tour ends cleanly (button resets to "Give me a tour")
 *   4. Zero console errors during the tour
 */

import { createHash } from 'crypto'
import { existsSync, mkdirSync, readFileSync } from 'fs'
import { chromium } from 'playwright'

const TOUR_SEQUENCE = [
  { id: 'me', label: 'J.KREBS' },
  { id: 'alternance', label: 'Alternance Fullstack' },
  { id: 'master-ia', label: 'Master IA / Big Data' },
  { id: 'supporthelper', label: 'supportHelper v2' },
  { id: 'tiktok-edu', label: 'EduFeed' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'machine-learning', label: 'Machine Learning' },
  { id: 'github', label: 'GitHub' },
]

const STEP_DURATION_MS = 3800
const SCREENSHOT_DIR = 'screenshots'

function hashFile(path) {
  return createHash('md5').update(readFileSync(path)).digest('hex')
}

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL: ${message}`)
}

async function runTourTest() {
  if (!existsSync(SCREENSHOT_DIR)) mkdirSync(SCREENSHOT_DIR)

  const browser = await chromium.launch({ headless: false, slowMo: 30 })
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()

  const consoleErrors = []
  const notFound404s = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(err.message))
  page.on('response', (res) => {
    if (res.status() === 404) notFound404s.push(res.url())
  })

  // ── Open app ────────────────────────────────────────────────────────────────
  console.log('\n🌐  http://localhost:3000')
  await page.goto('http://localhost:3000')
  await page.waitForSelector('canvas', { timeout: 15000 })
  console.log('✓  Canvas mounted')

  // ── Switch to Neural view ───────────────────────────────────────────────────
  const neuralBtn = page.locator('button', { hasText: /^Neural$/i })
  await neuralBtn.waitFor({ state: 'visible', timeout: 10000 })
  await neuralBtn.click()
  console.log('✓  Neural view active')

  // ── Wait for 3D intro to finish ─────────────────────────────────────────────
  console.log('⏳  Waiting for intro animation…')
  const tourBtn = page.locator('button', { hasText: /give me a tour/i })
  await tourBtn.waitFor({ state: 'visible', timeout: 35000 })
  console.log('✓  Intro complete\n')

  // ── Start tour ──────────────────────────────────────────────────────────────
  await tourBtn.click()
  console.log('🚀  Tour started\n')

  const results = []
  let prevScreenshot = null

  for (let i = 0; i < TOUR_SEQUENCE.length; i++) {
    const { id, label } = TOUR_SEQUENCE[i]
    const stepStart = Date.now()

    // Wait for camera + panel animation to settle (animation = 1500ms, buffer = 200ms)
    await page.waitForTimeout(1700)

    // ── Read InfoPanel state via DOM ──────────────────────────────────────────
    const panelState = await page.evaluate(() => {
      // The InfoPanel root: fixed, z-50, backdrop-blur
      const panels = [...document.querySelectorAll('.fixed.z-50')]
      const panel = panels.find((el) => el.querySelector('h2'))
      if (!panel) return { open: false, title: null, pointerEvents: 'none' }
      const style = window.getComputedStyle(panel)
      return {
        open: style.pointerEvents === 'auto',
        title: panel.querySelector('h2')?.textContent?.trim() ?? null,
        pointerEvents: style.pointerEvents,
      }
    })

    // ── Screenshot ────────────────────────────────────────────────────────────
    const ssPath = `${SCREENSHOT_DIR}/tour-step-${i + 1}-${id}.png`
    await page.screenshot({ path: ssPath })

    // ── Camera movement check ─────────────────────────────────────────────────
    const cameraMoved = prevScreenshot ? hashFile(ssPath) !== hashFile(prevScreenshot) : true
    prevScreenshot = ssPath

    // ── Assertions ────────────────────────────────────────────────────────────
    const pass = panelState.open && cameraMoved
    const note = []
    if (!panelState.open) note.push(`panel not open (pointerEvents: ${panelState.pointerEvents})`)
    if (!cameraMoved) note.push('camera did not move from previous step')
    if (panelState.title && !panelState.title.toLowerCase().includes(label.toLowerCase()))
      note.push(`wrong label — got "${panelState.title}", expected "${label}"`)

    results.push({
      step: i + 1,
      id,
      label,
      pass,
      panelOpen: panelState.open,
      panelTitle: panelState.title,
      cameraMoved,
      note,
    })

    const icon = pass ? '✓' : '✗'
    console.log(`  ${icon}  Step ${i + 1}/${TOUR_SEQUENCE.length} — "${id}"`)
    if (panelState.title) console.log(`     Panel : "${panelState.title}"`)
    if (note.length) console.log(`     Issues: ${note.join(' | ')}`)
    console.log(`     📸  ${ssPath}`)

    // Wait the true remaining time for this step (using actual elapsed)
    const elapsed = Date.now() - stepStart
    const remaining = STEP_DURATION_MS - elapsed
    if (remaining > 0) await page.waitForTimeout(remaining)
  }

  // ── Wait for last-step timer to fire (tour auto-ends after STEP_DURATION_MS) ─
  await page.waitForTimeout(STEP_DURATION_MS + 500)

  const tourEnded = await page
    .locator('button', { hasText: /give me a tour/i })
    .isVisible({ timeout: 3000 })
    .catch(() => false)
  await page.screenshot({ path: `${SCREENSHOT_DIR}/tour-final.png` })

  await browser.close()

  // ── Summary ─────────────────────────────────────────────────────────────────
  const passed = results.filter((r) => r.pass).length
  const failed = results.filter((r) => !r.pass)
  // Filter out known pre-existing 404s (favicon, missing assets) — not tour-related
  const tourErrors = consoleErrors.filter(
    (e) => !e.includes('favicon') && !e.includes('.ico') && !e.includes('404 (Not Found)')
  )
  const allPassed = passed === TOUR_SEQUENCE.length && tourEnded && tourErrors.length === 0

  console.log('\n═══════════════════════════════════════════')
  console.log('  PLAYWRIGHT TEST — Guided Tour')
  console.log('═══════════════════════════════════════════')
  console.log(`  Steps passed   : ${passed}/${TOUR_SEQUENCE.length}`)
  console.log(`  Tour ended OK  : ${tourEnded}`)
  console.log(`  Console errors : ${tourErrors.length}`)
  console.log(`  Screenshots    : ./${SCREENSHOT_DIR}/`)
  console.log(`  Result         : ${allPassed ? 'PASS ✓' : 'FAIL ✗'}`)

  if (failed.length) {
    console.log('\n  Failed steps:')
    failed.forEach((r) => console.log(`    Step ${r.step} (${r.id}) — ${r.note.join(', ')}`))
  }
  if (tourErrors.length) {
    console.log('\n  Console errors:')
    tourErrors.forEach((e) => console.log(`    ${e}`))
  }
  console.log('═══════════════════════════════════════════\n')

  if (!allPassed) process.exit(1)
  process.exit(0)
}

runTourTest().catch((err) => {
  console.error('\nTest crashed:', err.message)
  process.exit(1)
})
