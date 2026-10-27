import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const VIDEOS_DIR = path.resolve('public', 'videos');

if (!fs.existsSync(VIDEOS_DIR)) {
  fs.mkdirSync(VIDEOS_DIR, { recursive: true });
}

async function generateHeroVideo() {
  console.log('🎬 Initializing Hero Video Generator via Headless Chrome & Canvas...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // HTML with Canvas animation and MediaRecorder
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; overflow: hidden; background: #073A40; }
    canvas { width: 1280px; height: 720px; display: block; }
  </style>
</head>
<body>
  <canvas id="c" width="1280" height="720"></canvas>
  <script>
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    const width = 1280;
    const height = 720;
    const duration = 8000; // 8 seconds loop
    const fps = 30;
    const totalFrames = (duration / 1000) * fps;

    // Particles setup
    const particles = [];
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function render(timeFraction) {
      const angle = timeFraction * Math.PI * 2;

      // Base gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#042226');
      bgGrad.addColorStop(0.5, '#073A40');
      bgGrad.addColorStop(1, '#094B54');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Large luminous shifting circles (volumetric lighting)
      const glow1X = width * 0.75 + Math.cos(angle) * 80;
      const glow1Y = height * 0.35 + Math.sin(angle) * 50;
      const g1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, 400);
      g1.addColorStop(0, 'rgba(24, 181, 154, 0.28)');
      g1.addColorStop(0.5, 'rgba(14, 87, 97, 0.15)');
      g1.addColorStop(1, 'rgba(7, 58, 64, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const glow2X = width * 0.25 + Math.sin(angle) * 70;
      const glow2Y = height * 0.7 + Math.cos(angle) * 40;
      const g2 = ctx.createRadialGradient(glow2X, glow2Y, 10, glow2X, glow2Y, 350);
      g2.addColorStop(0, 'rgba(34, 228, 194, 0.18)');
      g2.addColorStop(0.6, 'rgba(7, 58, 64, 0.08)');
      g2.addColorStop(1, 'rgba(7, 58, 64, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // Rotating translucent geometric shapes
      ctx.save();
      ctx.translate(width * 0.72, height * 0.45);
      ctx.rotate(angle);

      // Hexagon / Ring 1
      ctx.beginPath();
      ctx.arc(0, 0, 160 + Math.sin(angle * 2) * 15, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(24, 181, 154, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Orbital nodes
      for (let i = 0; i < 4; i++) {
        const nodeAngle = (i * Math.PI / 2) + angle;
        const nx = Math.cos(nodeAngle) * (160 + Math.sin(angle * 2) * 15);
        const ny = Math.sin(nodeAngle) * (160 + Math.sin(angle * 2) * 15);
        ctx.beginPath();
        ctx.arc(nx, ny, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#22E4C2';
        ctx.fill();
      }
      ctx.restore();

      // Shifting secondary plane
      ctx.save();
      ctx.translate(width * 0.35, height * 0.55);
      ctx.rotate(-angle * 0.7);
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 100, Math.PI / 4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(34, 228, 194, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // Subtle particles
      particles.forEach((p, idx) => {
        const px = (p.x + Math.sin(angle + idx) * 30 + width) % width;
        const py = (p.y + Math.cos(angle + idx) * 20 + height) % height;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(140, 225, 211, ' + p.alpha + ')';
        ctx.fill();
      });

      // Subtle grid overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const step = 48;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    window.startRecording = function() {
      return new Promise((resolve) => {
        const stream = canvas.captureStream(fps);
        let options = { mimeType: 'video/webm;codecs=vp9' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: 'video/webm' };
        }
        const recorder = new MediaRecorder(stream, options);
        const chunks = [];

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result.split(',')[1]); // base64
          };
          reader.readAsDataURL(blob);
        };

        recorder.start();

        let frame = 0;
        function stepAnimation() {
          if (frame <= totalFrames) {
            render(frame / totalFrames);
            frame++;
            setTimeout(stepAnimation, 1000 / fps);
          } else {
            recorder.stop();
          }
        }
        stepAnimation();
      });
    };

    // Render initial poster frame immediately
    render(0);
  </script>
</body>
</html>
  `;

  await page.setContent(htmlContent);

  // 1. Capture poster image first
  console.log('📸 Capturing hero video poster image...');
  const posterPath = path.join(VIDEOS_DIR, 'showcase-hero-poster.jpg');
  await page.screenshot({ path: posterPath, type: 'jpeg', quality: 90 });
  console.log('✅ Poster image created at:', posterPath);

  // 2. Run recording inside Chrome
  console.log('🎥 Recording 8-second 1280x720 WebM loop...');
  const base64Video = await page.evaluate(async () => {
    return await window.startRecording();
  });

  const videoBuffer = Buffer.from(base64Video, 'base64');
  const videoPath = path.join(VIDEOS_DIR, 'showcase-hero.webm');
  fs.writeFileSync(videoPath, videoBuffer);

  const stats = fs.statSync(videoPath);
  console.log(`✅ WebM video successfully rendered and saved! Size: ${(stats.size / 1024).toFixed(1)} KB at ${videoPath}`);

  await browser.close();
}

generateHeroVideo().catch((err) => {
  console.error('❌ Failed to generate video:', err);
  process.exitCode = 1;
});
