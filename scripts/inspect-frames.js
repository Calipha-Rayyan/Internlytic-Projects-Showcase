import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function inspectFrames() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  
  // Create an HTML page embedding the frames so we can inspect layout
  await page.setViewport({ width: 1920, height: 1080 });
  const frames = [2, 6, 12, 20, 30, 45];
  
  for (const t of frames) {
    const framePath = path.resolve('public', 'reference-frames', `frame-${t}s.png`);
    const fileUrl = 'file:///' + framePath.replace(/\\/g, '/');
    await page.goto(fileUrl);
    console.log(`Inspected frame at ${t}s: ${framePath}`);
  }

  await browser.close();
}

inspectFrames().catch(console.error);
