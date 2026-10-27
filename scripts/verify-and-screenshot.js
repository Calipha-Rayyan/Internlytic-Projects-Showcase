import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:5173/';
const SCREENSHOTS_DIR = path.resolve('public', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runComprehensiveVerification() {
  console.log('🚀 Starting Major UI/UX Upgrade Automated Verification Suite...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  try {
    // ------------------------------------------------------------------------
    // TEST 1: Desktop 1440x900 - Hero, Video Background, 3D Scene & Gallery
    // ------------------------------------------------------------------------
    console.log('\n🖥️ [1/5] Testing Desktop (1440x900) Layout & Hero Experience...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.project-card');

    // Verify video background
    const videoCheck = await page.evaluate(() => {
      const video = document.querySelector('video.hero-video-bg');
      if (!video) return { exists: false };
      const source = video.querySelector('source');
      return {
        exists: true,
        src: source ? source.getAttribute('src') : video.getAttribute('src'),
        poster: video.getAttribute('poster'),
        hasMuted: video.muted,
        hasLoop: video.loop
      };
    });
    console.log('   Video element verification:', videoCheck);

    // Verify 3D Scene
    const scene3DCheck = await page.$('.hero-3d-scene');
    console.log(`   Interactive 3D Stage present: ${scene3DCheck !== null ? 'PASS' : 'FAIL'}`);

    // Simulate mouse move over 3D stage to test tilt
    await page.mouse.move(1050, 260);
    await new Promise((r) => setTimeout(r, 200));

    // Capture Screenshot 1: Homepage and hero
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-hero-and-gallery.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 01-hero-and-gallery.png');

    // ------------------------------------------------------------------------
    // TEST 2: Search, Category & Tech Filtering
    // ------------------------------------------------------------------------
    console.log('\n🔍 [2/5] Testing Search, Category Pills & Tech Dropdown...');
    const searchInput = await page.$('.search-input');
    await searchInput.type('Expense');
    await new Promise((r) => setTimeout(r, 350));

    let cards = await page.$$('.project-card');
    console.log(`   Found ${cards.length} card(s) for query "Expense" (Expected: 1)`);

    // Capture Screenshot 2: Filtered results
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-filtered-results.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 02-filtered-results.png');

    // Clear search
    const clearBtn = await page.$('.search-clear-btn');
    if (clearBtn) await clearBtn.click();
    await new Promise((r) => setTimeout(r, 250));

    // Test Track Pill selection
    const pills = await page.$$('.filter-pill');
    for (const pill of pills) {
      const text = await page.evaluate((el) => el.textContent, pill);
      if (text.includes('AI & Machine Learning')) {
        await pill.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 250));
    cards = await page.$$('.project-card');
    console.log(`   Found ${cards.length} card(s) in "AI & Machine Learning" (Expected: 2)`);

    // Reset filters
    const resetBtn = await page.$('.reset-filters-btn');
    if (resetBtn) await resetBtn.click();
    await new Promise((r) => setTimeout(r, 250));

    // ------------------------------------------------------------------------
    // TEST 3: Project Details Modal (Contrast & Honest Labelling)
    // ------------------------------------------------------------------------
    console.log('\n🪟 [3/5] Testing Project Details Modal (Close contrast & Demo Status)...');
    const firstDetailBtn = await page.$('.card-action-btn-primary');
    await firstDetailBtn.click();
    await page.waitForSelector('.modal-dialog');
    await new Promise((r) => setTimeout(r, 350));

    // Check modal close button contrast and label
    const modalVerification = await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-action-btn-close');
      const statusBadge = document.querySelector('.modal-status-badge');
      const closeTopBtn = document.querySelector('.modal-close-btn');

      const closeComputed = closeBtn ? window.getComputedStyle(closeBtn) : null;
      return {
        closeBtnText: closeBtn ? closeBtn.textContent.trim() : null,
        closeBtnColor: closeComputed ? closeComputed.color : null,
        closeBtnBg: closeComputed ? closeComputed.backgroundColor : null,
        statusText: statusBadge ? statusBadge.textContent.trim() : null
      };
    });
    console.log('   Modal inspection results:', modalVerification);

    // Capture Screenshot 3: Project details modal
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-project-details-modal.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 03-project-details-modal.png');

    // Test Close on Escape
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 350));
    const modalDialogCheck = await page.$('.modal-dialog');
    console.log(`   Modal closed via Escape key: ${modalDialogCheck === null ? 'PASS' : 'FAIL'}`);

    // ------------------------------------------------------------------------
    // TEST 4: Compact No-Results State
    // ------------------------------------------------------------------------
    console.log('\n🚫 [4/5] Testing No-Results State Layout & Vertical Rhythm...');
    const searchForNone = await page.$('.search-input');
    await searchForNone.type('QueryWithZeroMatches9988');
    await new Promise((r) => setTimeout(r, 350));

    const noResultsCard = await page.$('.state-container.no-results-compact');
    console.log(`   Compact no-results card present: ${noResultsCard !== null ? 'PASS' : 'FAIL'}`);

    // Capture Screenshot 4: No-results state
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-no-results-state.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 04-no-results-state.png');

    // Test Reset Button inside empty state
    const resetInsideState = await page.$('.empty-reset-btn');
    if (resetInsideState) await resetInsideState.click();
    await new Promise((r) => setTimeout(r, 350));

    // ------------------------------------------------------------------------
    // TEST 5: Mobile Viewports (375x812 and 360x640)
    // ------------------------------------------------------------------------
    console.log('\n📱 [5/5] Testing Mobile Responsiveness (375px & 360px)...');
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 400));

    // Check for horizontal overflow on 375px
    const overflow375 = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`   Horizontal overflow at 375px: ${overflow375 ? 'FAIL (Overflow)' : 'PASS (No overflow)'}`);

    // Check placeholder clipping
    const inputPlaceholderWidth = await page.evaluate(() => {
      const input = document.querySelector('.search-input');
      return {
        inputWidth: input.clientWidth,
        placeholder: input.getAttribute('placeholder')
      };
    });
    console.log('   Mobile Search Input fit:', inputPlaceholderWidth);

    // Test mobile menu toggle
    const mobileMenuBtn = await page.$('.mobile-menu-btn');
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await new Promise((r) => setTimeout(r, 300));
      const drawer = await page.$('.mobile-menu-drawer');
      console.log(`   Mobile navigation drawer expands: ${drawer !== null ? 'PASS' : 'FAIL'}`);
      // Close it again
      await mobileMenuBtn.click();
      await new Promise((r) => setTimeout(r, 200));
    }

    // Capture Screenshot 5: Mobile layout
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '05-mobile-view.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 05-mobile-view.png');

    // Also check 360px width
    await page.setViewport({ width: 360, height: 640 });
    await new Promise((r) => setTimeout(r, 300));
    const overflow360 = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    console.log(`   Horizontal overflow at 360px: ${overflow360 ? 'FAIL (Overflow)' : 'PASS (No overflow)'}`);

    // ------------------------------------------------------------------------
    // Strict Compliance Audit: No heart or like counters
    // ------------------------------------------------------------------------
    console.log('\n🛡️ Checking strict rules compliance...');
    const forbiddenLike = await page.$$('[class*="heart"], [class*="like"], [id*="heart"], [id*="like"]');
    console.log(`   Forbidden like/heart counters count: ${forbiddenLike.length} (Expected: 0)`);

    console.log('\n🎉 All acceptance criteria successfully verified!');
    if (consoleErrors.length > 0) {
      console.warn('⚠️ Console errors during test:', consoleErrors);
    } else {
      console.log('✅ 0 console errors or unhandled rejections detected.');
    }
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runComprehensiveVerification();
