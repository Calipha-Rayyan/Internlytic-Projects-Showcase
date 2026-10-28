import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VIDEO_PATH = path.resolve('Internlytic Technologies _ Global Internships & Tech Solutions - Google Chrome 2026-10-28 17-07-55.mp4');
const FRAMES_DIR = path.resolve('public', 'reference-frames');

const server = http.createServer((req, res) => {
  if (req.url === '/video.mp4') {
    const stat = fs.statSync(VIDEO_PATH);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(VIDEO_PATH, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      });
      file.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      });
      fs.createReadStream(VIDEO_PATH).pipe(res);
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(8090, async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    const html = `
      <!DOCTYPE html>
      <html>
        <body style="margin:0; background:#000;">
          <video id="v" src="http://127.0.0.1:8090/video.mp4" autoplay muted playsinline style="width:100vw; height:100vh; object-fit:contain;"></video>
        </body>
      </html>
    `;

    await page.setContent(html);

    const times = [60, 90, 120, 150, 180, 210];
    for (const t of times) {
      await page.evaluate((seekTime) => {
        const v = document.getElementById('v');
        v.currentTime = seekTime;
      }, t);
      await new Promise(r => setTimeout(r, 1200));
      const framePath = path.join(FRAMES_DIR, `frame-${t}s.png`);
      await page.screenshot({ path: framePath });
      console.log(`Captured frame-${t}s.png`);
    }

    await browser.close();
  } catch (err) {
    console.error(err);
  } finally {
    server.close();
  }
});
