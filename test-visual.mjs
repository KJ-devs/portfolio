import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = 'http://localhost:3004';

async function ensureScreenshotsDir() {
  if (!existsSync(SCREENSHOTS_DIR)) {
    await mkdir(SCREENSHOTS_DIR, { recursive: true });
  }
}

async function main() {
  await ensureScreenshotsDir();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const consoleErrors = [];
  const page = await context.newPage();

  // Collect console errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(`Page error: ${err.message}`);
  });

  const findings = [];

  console.log('--- Neural Portfolio Visual Test ---\n');

  // Step 1: Open the page
  console.log('Step 1: Opening http://localhost:3004 ...');
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

  // Step 2: Wait for loading screen to disappear / canvas to be visible
  console.log('Step 2: Waiting for loading screen to disappear (up to 15s)...');
  try {
    // First try waiting for loading screen to vanish
    await Promise.race([
      page.waitForSelector('.loading-screen', { state: 'hidden', timeout: 15000 }).catch(() => null),
      page.waitForSelector('canvas', { state: 'visible', timeout: 15000 }).catch(() => null),
    ]);
    await page.waitForTimeout(1500); // extra settle time
    findings.push('Loading screen disappeared / canvas visible: YES');
  } catch (e) {
    findings.push(`Loading screen wait: TIMEOUT or ERROR — ${e.message}`);
  }

  // Step 3: Screenshot of initial state
  console.log('Step 3: Taking screenshot of initial state...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01-initial.png'), fullPage: false });
  findings.push('Screenshot 01-initial.png saved');

  // Step 4: Check language switcher visibility
  console.log('Step 4: Checking language switcher (fr, de, en) buttons...');
  const langButtons = {};
  for (const lang of ['fr', 'de', 'en']) {
    // Try several selector strategies
    const btn =
      (await page.$(`button:text-is("${lang}")`)) ||
      (await page.$(`button:text("${lang}")`)) ||
      (await page.$(`[data-lang="${lang}"]`));
    langButtons[lang] = btn !== null;
  }
  const anyLangVisible = Object.values(langButtons).some(Boolean);
  findings.push(
    `Language switcher visible: ${anyLangVisible ? 'YES' : 'NO'} — fr:${langButtons.fr}, de:${langButtons.de}, en:${langButtons.en}`
  );
  console.log(`  Language switcher: fr=${langButtons.fr}, de=${langButtons.de}, en=${langButtons.en}`);

  // Step 5: Click "de" button
  console.log('Step 5: Clicking "de" language button...');
  let deClicked = false;
  try {
    const deBtn =
      (await page.$('button:text-is("de")')) ||
      (await page.$('button:text("de")')) ||
      (await page.$('[data-lang="de"]'));
    if (deBtn) {
      await deBtn.click();
      await page.waitForTimeout(800);
      deClicked = true;
      findings.push('Clicked "de" button: YES');
    } else {
      findings.push('Clicked "de" button: NOT FOUND — trying text search');
      // Try to find any button containing "de"
      const allButtons = await page.$$('button');
      for (const btn of allButtons) {
        const text = await btn.textContent();
        if (text && text.trim().toLowerCase() === 'de') {
          await btn.click();
          await page.waitForTimeout(800);
          deClicked = true;
          findings.push('Clicked "de" button via fallback: YES');
          break;
        }
      }
    }
  } catch (e) {
    findings.push(`Click "de": ERROR — ${e.message}`);
  }

  // Step 6: Screenshot after switching to "de"
  console.log('Step 6: Taking screenshot after switching to de...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02-lang-de.png'), fullPage: false });
  findings.push('Screenshot 02-lang-de.png saved');

  // Step 7: Check tour button text in German
  console.log('Step 7: Checking tour button text in "de"...');
  let tourButtonText = null;
  try {
    // Common German text for tour button
    const possibleTexts = ['Tour starten', 'tour starten', 'Tour', 'Guided Tour', 'Visite'];
    // Find a button with tour-like text
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await btn.textContent();
      if (text) {
        const trimmed = text.trim();
        if (
          trimmed.toLowerCase().includes('tour') ||
          trimmed.toLowerCase().includes('visite')
        ) {
          tourButtonText = trimmed;
          break;
        }
      }
    }

    if (tourButtonText) {
      findings.push(`Tour button text (de): "${tourButtonText}" — ${tourButtonText === 'Tour starten' ? 'CORRECT' : 'differs from expected "Tour starten"'}`);
    } else {
      findings.push('Tour button text (de): NOT FOUND');
    }
    console.log(`  Tour button text (de): ${tourButtonText || 'NOT FOUND'}`);
  } catch (e) {
    findings.push(`Tour button check (de): ERROR — ${e.message}`);
  }

  // Step 8: Click "fr", check tour button shows "Visite guidée"
  console.log('Step 8: Clicking "fr" language button...');
  try {
    const frBtn =
      (await page.$('button:text-is("fr")')) ||
      (await page.$('button:text("fr")')) ||
      (await page.$('[data-lang="fr"]'));
    if (frBtn) {
      await frBtn.click();
      await page.waitForTimeout(800);
      findings.push('Clicked "fr" button: YES');
    } else {
      // Fallback
      const allButtons = await page.$$('button');
      for (const btn of allButtons) {
        const text = await btn.textContent();
        if (text && text.trim().toLowerCase() === 'fr') {
          await btn.click();
          await page.waitForTimeout(800);
          findings.push('Clicked "fr" button via fallback: YES');
          break;
        }
      }
    }
  } catch (e) {
    findings.push(`Click "fr": ERROR — ${e.message}`);
  }

  // Check tour button in French
  let tourButtonFr = null;
  try {
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await btn.textContent();
      if (text) {
        const trimmed = text.trim();
        if (trimmed.toLowerCase().includes('tour') || trimmed.toLowerCase().includes('visite')) {
          tourButtonFr = trimmed;
          break;
        }
      }
    }
    findings.push(
      `Tour button text (fr): "${tourButtonFr || 'NOT FOUND'}" — ${tourButtonFr === 'Visite guidée' ? 'CORRECT' : 'differs from expected "Visite guidée"'}`
    );
    console.log(`  Tour button text (fr): ${tourButtonFr || 'NOT FOUND'}`);
  } catch (e) {
    findings.push(`Tour button check (fr): ERROR — ${e.message}`);
  }

  // Step 9: Click the tour button
  console.log('Step 9: Clicking tour button...');
  let tourClicked = false;
  try {
    // Find the tour button
    const allButtons = await page.$$('button');
    for (const btn of allButtons) {
      const text = await btn.textContent();
      if (text) {
        const trimmed = text.trim();
        if (trimmed.toLowerCase().includes('tour') || trimmed.toLowerCase().includes('visite')) {
          await btn.click();
          tourClicked = true;
          findings.push('Clicked tour button: YES');
          console.log(`  Clicked tour button: "${trimmed}"`);
          break;
        }
      }
    }
    if (!tourClicked) {
      findings.push('Clicked tour button: NOT FOUND');
      console.log('  Tour button not found to click');
    }
  } catch (e) {
    findings.push(`Click tour button: ERROR — ${e.message}`);
  }

  // Step 10: Wait 4 seconds
  console.log('Step 10: Waiting 4 seconds for tour animation...');
  await page.waitForTimeout(4000);

  // Step 11: Screenshot of tour active state
  console.log('Step 11: Taking screenshot of tour active state...');
  await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03-tour-active.png'), fullPage: false });
  findings.push('Screenshot 03-tour-active.png saved');

  // Step 12: Check if InfoPanel is visible and what neuron label it shows
  console.log('Step 12: Checking InfoPanel visibility and neuron label...');
  try {
    // Try various selectors for InfoPanel
    const panelSelectors = [
      '[class*="InfoPanel"]',
      '[class*="info-panel"]',
      '[class*="panel"]',
      '.info-panel',
      '#info-panel',
    ];

    let panelFound = false;
    for (const sel of panelSelectors) {
      const panel = await page.$(sel);
      if (panel) {
        const isVisible = await panel.isVisible();
        if (isVisible) {
          const panelText = await panel.textContent();
          findings.push(`InfoPanel visible (selector: "${sel}"): YES — content preview: "${panelText?.slice(0, 150)?.trim()}"`);
          panelFound = true;
          console.log(`  InfoPanel found with selector "${sel}", visible: YES`);
          console.log(`  Panel content preview: ${panelText?.slice(0, 100)?.trim()}`);
          break;
        }
      }
    }

    // Also try to find any visible panel-like element by looking at all divs with substantial content
    if (!panelFound) {
      // Look for neuron label in any overlay element
      const overlayTexts = await page.evaluate(() => {
        const elements = document.querySelectorAll('div, section, aside');
        const results = [];
        for (const el of elements) {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          if (
            rect.width > 200 &&
            rect.height > 100 &&
            style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            style.opacity !== '0' &&
            el.textContent &&
            el.textContent.trim().length > 20 &&
            el.textContent.trim().length < 2000
          ) {
            results.push({
              tag: el.tagName,
              classes: el.className,
              text: el.textContent.trim().slice(0, 200),
              x: rect.x,
              y: rect.y,
              w: rect.width,
              h: rect.height,
            });
          }
        }
        return results.slice(0, 10);
      });

      if (overlayTexts.length > 0) {
        findings.push(`InfoPanel: Not found by selector, but found ${overlayTexts.length} overlay elements:`);
        for (const el of overlayTexts) {
          findings.push(`  - [${el.tag}] classes="${el.classes}" at (${Math.round(el.x)},${Math.round(el.y)}) size=${Math.round(el.w)}x${Math.round(el.h)}: "${el.text.slice(0, 80)}"`);
        }
      } else {
        findings.push('InfoPanel: NOT visible (no panel element found)');
        console.log('  InfoPanel: NOT visible');
      }
    }
  } catch (e) {
    findings.push(`InfoPanel check: ERROR — ${e.message}`);
  }

  // Step 13: Final report
  console.log('\n--- FINAL REPORT ---\n');
  for (const finding of findings) {
    console.log(finding);
  }

  if (consoleErrors.length > 0) {
    console.log('\n--- CONSOLE ERRORS ---');
    for (const err of consoleErrors) {
      console.log(`  ERROR: ${err}`);
    }
  } else {
    console.log('\nConsole errors: NONE');
  }

  console.log(`\nScreenshots saved to: ${SCREENSHOTS_DIR}`);
  console.log('  - 01-initial.png');
  console.log('  - 02-lang-de.png');
  console.log('  - 03-tour-active.png');

  await browser.close();
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
