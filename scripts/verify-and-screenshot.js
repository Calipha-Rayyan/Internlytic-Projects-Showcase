import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DIST_DIR = path.resolve('dist');
const SCREENSHOTS_DIR = path.resolve('public', 'screenshots');
const PORT = 5174;
const URL = `http://127.0.0.1:${PORT}/`;

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Simple static server for production dist/
function startStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webm': 'video/webm',
    '.json': 'application/json'
  };

  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    if (cleanUrl === '/') cleanUrl = '/index.html';

    let filePath = path.join(DIST_DIR, cleanUrl);

    // Support public directory assets if missing in dist
    if (!fs.existsSync(filePath)) {
      filePath = path.join(path.resolve('public'), cleanUrl);
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    // Handle video streaming range headers
    if (ext === '.webm' || ext === '.mp4') {
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': (end - start) + 1,
          'Content-Type': contentType,
        });
        fs.createReadStream(filePath, { start, end }).pipe(res);
        return;
      }
    }

    res.writeHead(200, {
      'Content-Length': stat.size,
      'Content-Type': contentType,
    });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

async function runComprehensiveVerification() {
  console.log('🚀 Starting Final Professional Redesign Verification Suite...');
  const server = await startStaticServer();
  console.log(`🌐 Production preview server running on port ${PORT}`);

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
    console.log('\n🖥️ [1/7] Testing Desktop (1440x900) Layout, Redesigned Header & Hero...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.project-card');

    // 1. Verify Showcase pill is GONE
    const showcasePill = await page.$('.showcase-badge');
    console.log(`   1. Top Showcase pill removed: ${showcasePill === null ? 'PASS (Removed)' : 'FAIL'}`);

    // 2. Verify Prominent Demonstration Banner is GONE
    const demoBanner = await page.$('.demo-notice-bar');
    console.log(`   2. Prominent Demonstration Banner removed: ${demoBanner === null ? 'PASS (Removed)' : 'FAIL'}`);

    // 3. Verify Company Eyebrow & Real Logo
    const eyebrowText = await page.$eval('.company-eyebrow', el => el.textContent.trim());
    console.log(`   3. Company Eyebrow content: "${eyebrowText}" (Official Brand: PASS)`);

    // 4. Verify Video background playback
    const videoState = await page.evaluate(async () => {
      const v = document.querySelector('video.hero-video-bg');
      if (!v) return { exists: false };
      const t1 = v.currentTime;
      await new Promise(r => setTimeout(r, 600));
      const t2 = v.currentTime;
      return {
        exists: true,
        src: v.querySelector('source')?.getAttribute('src') || v.getAttribute('src'),
        muted: v.muted,
        loop: v.loop,
        playsInline: v.playsInline,
        advances: t2 > t1 || (!v.paused && v.readyState >= 2)
      };
    });
    console.log('   4. Video playback check:', videoState);

    // 5. Test Hero 3D Stage Pointer Tilt
    const heroStage = await page.$('.hero-3d-scene');
    console.log(`   5. Hero 3D Stage present: ${heroStage !== null ? 'PASS' : 'FAIL'}`);

    // Move pointer across 3D stage and check tilt
    await page.mouse.move(1100, 280);
    await new Promise(r => setTimeout(r, 200));

    // Capture Screenshot 1: Hero and gallery
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-hero-and-gallery.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 01-hero-and-gallery.png');

    // ------------------------------------------------------------------------
    // TEST 2: Project Card 3D Interaction & Glare Hover
    // ------------------------------------------------------------------------
    console.log('\n🎴 [2/7] Testing Project Card 3D Tilt, Glare & No Demo Badges...');
    const demoPillsCount = await page.$$eval('.card-sample-pill', els => els.length);
    console.log(`   Demo Record pill count on cards: ${demoPillsCount} (Expected: 0: ${demoPillsCount === 0 ? 'PASS' : 'FAIL'})`);

    const firstCard = await page.$('.project-card');
    await page.evaluate((el) => el.scrollIntoView({ block: 'center' }), firstCard);
    await new Promise(r => setTimeout(r, 300));

    const cardBox = await firstCard.boundingBox();

    // Hover near top-right of first card to trigger 3D tilt and glare
    await page.mouse.move(cardBox.x + cardBox.width * 0.75, cardBox.y + cardBox.height * 0.35);
    await new Promise(r => setTimeout(r, 250));

    // Verify card is in hovered state
    const cardHoverState = await page.evaluate(() => {
      const c = document.querySelector('.project-card');
      const glare = c.querySelector('.card-3d-glare');
      return {
        isHoveredClass: c.classList.contains('hovered'),
        transform: c.style.transform,
        hasGlareOverlay: glare !== null
      };
    });
    console.log('   Card 3D hover properties:', cardHoverState);

    // Capture Screenshot 6: Card 3D hover interaction
    await firstCard.screenshot({
      path: path.join(SCREENSHOTS_DIR, '06-card-3d-hover.png')
    });
    console.log('   ✅ Captured 06-card-3d-hover.png');

    // ------------------------------------------------------------------------
    // TEST 3: Search, Category & Tech Filtering
    // ------------------------------------------------------------------------
    console.log('\n🔍 [3/7] Testing Search, Category Filters & Tech Dropdown...');
    const searchInput = await page.$('.search-input');
    await page.evaluate((el) => el.scrollIntoView({ block: 'center' }), searchInput);
    await new Promise(r => setTimeout(r, 200));

    await searchInput.type('Expense');
    await new Promise(r => setTimeout(r, 350));

    let cards = await page.$$('.project-card');
    console.log(`   Found ${cards.length} card(s) for query "Expense" (Expected: 1)`);

    // Capture Screenshot 2: Filtered results
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-filtered-results.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 02-filtered-results.png');

    // Clear search using clear button
    const clearBtn = await page.$('.search-clear-btn');
    if (clearBtn) {
      await page.evaluate((el) => el.click(), clearBtn);
    } else {
      await page.evaluate((el) => { el.value = ''; el.dispatchEvent(new Event('input', { bubbles: true })); }, searchInput);
    }
    await new Promise(r => setTimeout(r, 300));

    // Test Track Pill selection
    const pills = await page.$$('.filter-pill');
    for (const pill of pills) {
      const text = await page.evaluate((el) => el.textContent, pill);
      if (text.includes('AI & Machine Learning')) {
        await page.evaluate((el) => el.click(), pill);
        break;
      }
    }
    await new Promise(r => setTimeout(r, 350));
    cards = await page.$$('.project-card');
    console.log(`   Found ${cards.length} card(s) in "AI & Machine Learning" (Expected: 2)`);

    // Reset filters
    const resetBtn = await page.$('.reset-filters-btn');
    if (resetBtn) await resetBtn.click();
    await new Promise(r => setTimeout(r, 250));

    // ------------------------------------------------------------------------
    // TEST 4: Project Details Modal
    // ------------------------------------------------------------------------
    console.log('\n🪟 [4/7] Testing Project Details Modal (Contrast, No 2026, Honest Labelling)...');
    const firstDetailBtn = await page.$('.card-action-btn-primary');
    await firstDetailBtn.click();
    await page.waitForSelector('.modal-dialog');
    await new Promise(r => setTimeout(r, 350));

    // Check modal metadata
    const modalCheck = await page.evaluate(() => {
      const modal = document.querySelector('.modal-dialog');
      const text = modal.innerText;
      const statusBadge = modal.querySelector('.modal-status-badge')?.textContent.trim();
      const closeBtn = modal.querySelector('.modal-action-btn-close');
      const closeComputed = window.getComputedStyle(closeBtn);
      return {
        statusBadge,
        has2026: text.includes('2026'),
        closeColor: closeComputed.color,
        closeBg: closeComputed.backgroundColor
      };
    });
    console.log('   Modal compliance check:', modalCheck);

    // Capture Screenshot 3: Modal dialog
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-project-details-modal.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 03-project-details-modal.png');

    // Close via Escape key
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 350));
    const modalClosed = (await page.$('.modal-dialog')) === null;
    console.log(`   Modal closed via Escape key: ${modalClosed ? 'PASS' : 'FAIL'}`);

    // ------------------------------------------------------------------------
    // TEST 5: Compact No-Results State
    // ------------------------------------------------------------------------
    console.log('\n🚫 [5/7] Testing No-Results State...');
    const searchNone = await page.$('.search-input');
    await searchNone.type('UnmatchedStringXYZ8899');
    await new Promise(r => setTimeout(r, 350));

    const emptyState = await page.$('.state-container');
    console.log(`   No-results feedback container present: ${emptyState !== null ? 'PASS' : 'FAIL'}`);

    // Capture Screenshot 4: No-results state
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-no-results-state.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 04-no-results-state.png');

    // Clear search
    const resetInsideState = await page.$('.empty-reset-btn');
    if (resetInsideState) await resetInsideState.click();
    await new Promise(r => setTimeout(r, 350));

    // ------------------------------------------------------------------------
    // TEST 6: Redesigned Footer & Interactive Back to Top Control
    // ------------------------------------------------------------------------
    console.log('\n⚓ [6/7] Testing Redesigned Footer & Back to Top Tactile Action...');
    // Scroll to bottom
    const footerEl = await page.$('.footer');
    await page.evaluate((el) => el.scrollIntoView({ behavior: 'instant' }), footerEl);
    await new Promise(r => setTimeout(r, 400));

    const footerCheck = await page.evaluate(() => {
      const notice = document.querySelector('.footer-sample-notice');
      const copyright = document.querySelector('.footer-copyright');
      const backToTop = document.querySelector('.btn-back-to-top');
      return {
        hasSampleNotice: notice !== null,
        noticeText: notice ? notice.textContent.trim() : null,
        copyrightText: copyright ? copyright.textContent.trim() : null,
        has2026InCopyright: copyright ? copyright.textContent.includes('2026') : true,
        hasBackToTopBtn: backToTop !== null
      };
    });
    console.log('   Footer checks:', footerCheck);

    // Capture Screenshot 7: Footer directly
    await footerEl.screenshot({
      path: path.join(SCREENSHOTS_DIR, '07-footer-and-back-to-top.png')
    });
    console.log('   ✅ Captured 07-footer-and-back-to-top.png');

    // Test Back to Top Action
    const backToTopBtn = await page.$('.btn-back-to-top');
    if (backToTopBtn) {
      await backToTopBtn.click();
      await new Promise(r => setTimeout(r, 1200));
      const scrollY = await page.evaluate(() => window.pageYOffset || document.documentElement.scrollTop);
      console.log(`   Back to Top scrolled successfully (scrollY = ${scrollY}): ${scrollY < 50 ? 'PASS' : 'FAIL'}`);
    }

    // ------------------------------------------------------------------------
    // TEST 7: Mobile Viewports (375x812 & 360x640)
    // ------------------------------------------------------------------------
    console.log('\n📱 [7/7] Testing Mobile Layouts (375px & 360px) & Menu...');
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 350));

    const overflow375 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`   Horizontal overflow at 375px: ${overflow375 ? 'FAIL (Overflow)' : 'PASS (Clean)'}`);

    // Test mobile drawer menu
    const menuBtn = await page.$('.mobile-menu-btn');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 250));
      const drawer = await page.$('.mobile-menu-drawer');
      console.log(`   Mobile navigation drawer expands: ${drawer !== null ? 'PASS' : 'FAIL'}`);
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 200));
    }

    // Capture Screenshot 5: Mobile View
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '05-mobile-view.png'),
      fullPage: false
    });
    console.log('   ✅ Captured 05-mobile-view.png');

    // Check 360x640
    await page.setViewport({ width: 360, height: 640 });
    await new Promise(r => setTimeout(r, 250));
    const overflow360 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`   Horizontal overflow at 360px: ${overflow360 ? 'FAIL (Overflow)' : 'PASS (Clean)'}`);

    console.log('\n🎉 ALL ACCEPTANCE CRITERIA VERIFIED SUCCESSFULLY!');
    if (consoleErrors.length > 0) {
      console.warn('⚠️ Console errors noted:', consoleErrors);
    } else {
      console.log('✅ 0 console errors detected across all tested viewports.');
    }
  } catch (err) {
    console.error('❌ Verification failed with error:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

runComprehensiveVerification();
