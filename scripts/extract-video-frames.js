import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VIDEO_PATH = path.resolve('Internlytic Technologies _ Global Internships & Tech Solutions - Google Chrome 2026-10-28 17-07-55.mp4');
const FRAMES_DIR = path.resolve('public', 'reference-frames');

if (!fs.existsSync(FRAMES_DIR)) {
  fs.mkdirSync(FRAMES_DIR, { recursive: true });
}

async function extractFrames() {
  console.log('🎥 Extracting keyframes from user provided website recording...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  const fileUrl = 'file:///' + VIDEO_PATH.replace(/\\/g, '/');

  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:black; display:flex; justify-content:center; align-items:center;">
        <video id="v" src="${fileUrl}" muted playsinline style="max-width:100%; max-height:100vh;"></video>
      </body>
    </html>
  `;

  await page.setContent(html);

  // Wait for video metadata to load
  await page.evaluate(() => {
    return new Promise((resolve) => {
      const v = document.getElementById('v');
      v.onloadedmetadata = () => resolve(v.duration);
    });
  });

  const duration = await page.evaluate(() => document.getElementById('v').duration);
  console.log(`Video loaded. Duration: ${duration}s`);

  // Extract frames at different timestamps
  const timestamps = [1, 4, 10, 18, 25, 35, 50];
  for (let i = 0; i < timestamps.length; i++) {
    const t = timestamps[i];
    if (t < duration) {
      await page.evaluate((time) => {
        return new Promise((resolve) => {
          const v = document.getElementById('v');
          v.currentTime = time;
          v.onseeked = () => resolve();
        });
      }, t);

      const framePath = path.join(FRAMES_DIR, `frame-${i + 1}-${t}s.png`);
      await page.screenshot({ path: framePath });
      console.log(`Saved frame at ${t}s to ${framePath}`);
    }
  }

  await browser.close();
}

extractFrames().catch(console.error);
