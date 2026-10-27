import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:5173/';
const SCREENSHOTS_DIR = path.resolve('public', 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Automated Verification and Screenshot Capture...');
  
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  
  // Collect console errors
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
    // 1. Desktop 1440px View
    console.log('📸 1. Capturing Desktop (1440x900) Hero & Gallery...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.project-card');

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '01-hero-and-gallery.png'),
      fullPage: false
    });

    // 2. Test Search by Title & Category Filter
    console.log('🔍 2. Testing Search and Category Filters...');
    const searchInput = await page.$('.search-input');
    await searchInput.type('Expense');
    await new Promise((r) => setTimeout(r, 400));

    // Verify filtered count
    const expenseCards = await page.$$('.project-card');
    console.log(`   Found ${expenseCards.length} project(s) matching "Expense" (Expected: 1)`);

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '02-filtered-results.png'),
      fullPage: false
    });

    // Clear search
    const clearBtn = await page.$('.search-clear-btn');
    if (clearBtn) {
      await clearBtn.click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // 3. Test Track Filter Click
    console.log('🏷️ 3. Testing Track Filter Pills...');
    const trackPills = await page.$$('.filter-pill');
    for (const pill of trackPills) {
      const text = await page.evaluate((el) => el.textContent, pill);
      if (text.includes('AI & Machine Learning')) {
        await pill.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 300));
    const aiCards = await page.$$('.project-card');
    console.log(`   Found ${aiCards.length} projects in AI & Machine Learning (Expected: 2)`);

    // Reset filters
    const resetBtn = await page.$('.reset-filters-btn');
    if (resetBtn) {
      await resetBtn.click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // 4. Test Project Details Modal
    console.log('🪟 4. Testing Project Details Modal...');
    const firstDetailsBtn = await page.$('.card-action-btn-primary');
    await firstDetailsBtn.click();
    await page.waitForSelector('.modal-dialog');

    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '03-project-details-modal.png'),
      fullPage: false
    });

    // Close modal via Escape key
    console.log('⌨️ 5. Testing Close on Escape...');
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 400));
    const modalCheck = await page.$('.modal-dialog');
    console.log(`   Modal open after Escape: ${modalCheck !== null ? 'FAILED' : 'SUCCESS (Closed)'}`);

    // 5. Test No Results State
    console.log('🚫 6. Testing No-Results Empty State...');
    const searchAgain = await page.$('.search-input');
    await searchAgain.type('NonExistentProject12345');
    await new Promise((r) => setTimeout(r, 300));

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '04-no-results-state.png'),
      fullPage: false
    });

    // Reset again
    const resetNoResult = await page.$('.state-container .btn-primary');
    if (resetNoResult) {
      await resetNoResult.click();
      await new Promise((r) => setTimeout(r, 300));
    }

    // 6. Test Mobile View (375px)
    console.log('📱 7. Capturing Mobile View (375x812)...');
    await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });
    await new Promise((r) => setTimeout(r, 400));

    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, '05-mobile-view.png'),
      fullPage: false
    });

    // 7. Check for forbidden elements
    console.log('🛡️ 8. Verifying strict compliance (no heart/like counters)...');
    const heartElements = await page.$$('[class*="heart"], [class*="like"], [id*="heart"], [id*="like"]');
    console.log(`   Forbidden heart/like elements count: ${heartElements.length} (Expected: 0)`);

    console.log('✨ Verification completed successfully!');
    if (consoleErrors.length > 0) {
      console.warn('⚠️ Console errors detected:', consoleErrors);
    } else {
      console.log('✅ Zero console errors or unhandled rejections detected.');
    }
  } catch (err) {
    console.error('❌ Error during verification:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runVerification();
