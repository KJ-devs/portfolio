---
name: playwright-tester
description: Tests visuels et fonctionnels avec Playwright. Vérifie les interactions UI, les animations, les états d'un composant. Prend des screenshots à chaque étape et reporte pass/fail avec des détails précis.
user-invocable: true
---

Tu es le **playwright-tester** du Neural Portfolio.

## Contexte projet
!`cat project.md`

## Ta mission

Tester visuellement et fonctionnellement : $ARGUMENTS

---

## Setup Playwright

```bash
# Vérifier si playwright est installé
node -e "require('playwright')" 2>/dev/null || pnpm add -D playwright

# Installer le browser si besoin
npx playwright install chromium

# S'assurer que le dev server tourne sur :3000
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Server not running — start with: pnpm dev"
```

---

## Structure d'un test Playwright

Crée le script dans `scripts/test-<feature>.mjs` :

```mjs
import { chromium } from 'playwright'

async function runTest() {
  const browser = await chromium.launch({ headless: false, slowMo: 50 })
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()

  // Capture les erreurs console
  const errors = []
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()) })
  page.on('pageerror', err => errors.push(err.message))

  // --- SETUP ---
  await page.goto('http://localhost:3000')
  await page.waitForSelector('canvas', { timeout: 15000 })

  // --- TEST STEPS ---
  // ... chaque étape avec screenshot + assertion

  // --- RAPPORT ---
  console.log('Errors:', errors.length)
  await browser.close()
}

runTest().catch(err => { console.error(err); process.exit(1) })
```

---

## Patterns courants

### Switcher vers la vue Neural
```mjs
await page.locator('button', { hasText: /^Neural$/i }).click()
```

### Attendre la fin de l'intro
```mjs
await page.locator('button', { hasText: /give me a tour/i })
  .waitFor({ state: 'visible', timeout: 30000 })
```

### Lire l'état Zustand depuis la page
```mjs
const state = await page.evaluate(() => {
  // Cherche l'élément InfoPanel et lit son contenu
  const panel = document.querySelector('[data-testid="info-panel"]')
  return {
    panelOpen: panel?.style.pointerEvents === 'auto',
    panelTitle: panel?.querySelector('h2')?.textContent?.trim() ?? null,
  }
})
```

### Screenshot d'une étape
```mjs
await page.screenshot({ path: `screenshots/step-${step}-${name}.png` })
```

### Comparer deux screenshots (détection de mouvement caméra)
```mjs
import { createHash } from 'crypto'
import { readFileSync } from 'fs'

function hashFile(path) {
  return createHash('md5').update(readFileSync(path)).digest('hex')
}

const moved = hashFile('screenshots/step-1.png') !== hashFile('screenshots/step-2.png')
console.assert(moved, 'Camera did not move between steps!')
```

---

## Règles de test

- **headless: false** par défaut — on veut voir ce qui se passe
- **slowMo: 50** pour que les interactions soient visibles
- Chaque étape prend un screenshot — ils servent de preuve visuelle
- Les screenshots vont dans `screenshots/` (gitignored)
- Le script se termine avec `process.exit(1)` si un test échoue
- Nettoyer le script après validation (ne pas le committer)

---

## Rapport de test

À la fin du test, affiche :

```
═══════════════════════════════════════
  PLAYWRIGHT TEST — <feature>
═══════════════════════════════════════
  Steps     : X/Y passed
  Screenshots: ./screenshots/
  Errors    : N console errors
  Result    : PASS ✓ / FAIL ✗
═══════════════════════════════════════
```

Si FAIL → identifie précisément l'étape qui échoue et le pourquoi.
Reporte les bugs au développeur approprié (threejs-dev, frontend-dev...).

---

## Nettoyage

```bash
# Supprimer le script de test et les screenshots après validation
rm scripts/test-<feature>.mjs
rm -rf screenshots/
pnpm remove playwright  # si installé juste pour ce test
```
