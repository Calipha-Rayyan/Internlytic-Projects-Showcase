import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Sparkles, Terminal, Activity, CheckCircle, Cpu } from 'lucide-react';

export default function Hero3DStage() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef(null);

  // Check prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (prefersReducedMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize coordinates from -1 to 1
    const normX = (x - centerX) / centerX;
    const normY = (y - centerY) / centerY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      // Rotate up to 10 deg on Y, -8 deg on X
      setTilt({
        y: normX * 12,
        x: -normY * 10
      });
    });
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // Smooth reset to neutral rest
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const transformStyle = prefersReducedMotion
    ? 'none'
    : `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

  return (
    <div
      ref={containerRef}
      className="hero-3d-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Interactive 3D demonstration preview of intern projects and layered architecture"
    >
      {/* 3D Scene Canvas */}
      <div
        className="hero-3d-scene"
        style={{
          transform: transformStyle,
          transition: isHovered ? 'transform 120ms ease-out' : 'transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Orbital Background Glow Sphere */}
        <div className="hero-3d-glow" aria-hidden="true" />

        {/* Outer Orbital Rings */}
        <div className="hero-3d-ring ring-1" aria-hidden="true" />
        <div className="hero-3d-ring ring-2" aria-hidden="true" />

        {/* Main Floating Project Window (Center) */}
        <div className="hero-3d-main-card">
          <div className="hero-card-header">
            <div className="window-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="window-title">
              <Cpu size={12} color="#18B59A" />
              <span>Project Matrix • Alpha Engine</span>
            </div>
            <span className="window-badge">DEMO STAGE</span>
          </div>

          <div className="hero-card-body">
            <div className="hero-card-metric-row">
              <div>
                <span className="hero-card-metric-label">Neural Scheduler</span>
                <h4 className="hero-card-metric-val">99.4% Latency SLA</h4>
              </div>
              <div className="pulse-indicator">
                <span className="pulse-dot" />
                <span>Simulated Online</span>
              </div>
            </div>

            {/* Simulated Dynamic Waveform */}
            <div className="simulated-chart">
              <svg viewBox="0 0 320 80" className="chart-svg" fill="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18B59A" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#18B59A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 60 Q 50 15, 100 45 T 200 25 T 320 35 L 320 80 L 0 80 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0 60 Q 50 15, 100 45 T 200 25 T 320 35"
                  stroke="#22E4C2"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="100" cy="45" r="4" fill="#FFFFFF" stroke="#18B59A" strokeWidth="2" />
                <circle cx="200" cy="25" r="4.5" fill="#22E4C2" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>

            {/* Quick Tech Pills */}
            <div className="hero-card-tech-chips">
              <span className="mini-chip">React 18</span>
              <span className="mini-chip">TypeScript</span>
              <span className="mini-chip">FastAPI</span>
              <span className="mini-chip">Docker</span>
            </div>
          </div>
        </div>

        {/* Floating Satellite Card 1 - Top Right (High Depth) */}
        <div className="hero-3d-floating-chip chip-top-right">
          <div className="chip-icon-box">
            <Sparkles size={16} color="#18B59A" />
          </div>
          <div>
            <div className="chip-title">AI &amp; ML Track</div>
            <div className="chip-sub">10 Showcase Demos</div>
          </div>
        </div>

        {/* Floating Satellite Card 2 - Bottom Left */}
        <div className="hero-3d-floating-chip chip-bottom-left">
          <div className="chip-icon-box" style={{ backgroundColor: 'rgba(34, 228, 194, 0.15)' }}>
            <Activity size={16} color="#22E4C2" />
          </div>
          <div>
            <div className="chip-title">Live Health Radar</div>
            <div className="chip-sub">Interactive 3D Stage</div>
          </div>
        </div>

        {/* Floating Satellite Card 3 - Bottom Right Code Snippet */}
        <div className="hero-3d-code-badge chip-bottom-right">
          <div className="code-header">
            <Terminal size={11} color="#8CE1D3" />
            <span>architecture.ts</span>
          </div>
          <code>deployShowcase({'{'} mode: 'interactive' {'}'})</code>
        </div>
      </div>
    </div>
  );
}
