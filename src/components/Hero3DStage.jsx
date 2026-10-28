import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Layers, Terminal, Cpu, Layout, Sparkles, Code2 } from 'lucide-react';

export default function Hero3DStage() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
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
      // Damped perspective tilt (smooth and controlled: max 10 deg Y, -8 deg X)
      setTilt({
        y: Math.max(-10, Math.min(10, normX * 10)),
        x: Math.max(-8, Math.min(8, -normY * 8)),
        glareX: (x / rect.width) * 100,
        glareY: (y / rect.height) * 100
      });
    });
  }, [prefersReducedMotion]);

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    // Smooth reset to neutral rest
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
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
      {/* 3D Scene Stage */}
      <div
        className="hero-3d-scene"
        style={{
          transform: transformStyle,
          transition: isHovered
            ? 'transform 100ms ease-out'
            : 'transform 650ms cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
      >
        {/* Orbital Background Glow Sphere */}
        <div className="hero-3d-glow" aria-hidden="true" />

        {/* Outer Orbital Dimensional Rings */}
        <div className="hero-3d-ring ring-1" aria-hidden="true" />
        <div className="hero-3d-ring ring-2" aria-hidden="true" />

        {/* Main Floating Project Window (Center Layer at translateZ 35px) */}
        <div className="hero-3d-main-card">
          {/* Surface Glare Highlight */}
          {isHovered && !prefersReducedMotion && (
            <div
              className="hero-3d-card-glare"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(34, 228, 194, 0.18) 0%, transparent 65%)`
              }}
              aria-hidden="true"
            />
          )}

          <div className="hero-card-header">
            <div className="window-dots" aria-hidden="true">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="window-title">
              <Cpu size={13} color="#18B59A" aria-hidden="true" />
              <span>Project Matrix • Architecture Hub</span>
            </div>
            <span className="window-domain-label">SHOWCASE</span>
          </div>

          <div className="hero-card-body">
            {/* Abstract Topology Visualizer (No fake latency or health statistics) */}
            <div className="hero-card-canvas-preview" aria-hidden="true">
              <svg viewBox="0 0 320 100" className="canvas-svg" fill="none">
                <defs>
                  <linearGradient id="gridNodeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#18B59A" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22E4C2" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="areaFillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18B59A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#18B59A" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Background grid lines */}
                <line x1="20" y1="25" x2="300" y2="25" stroke="rgba(24, 181, 154, 0.15)" strokeDasharray="3 3" />
                <line x1="20" y1="50" x2="300" y2="50" stroke="rgba(24, 181, 154, 0.15)" strokeDasharray="3 3" />
                <line x1="20" y1="75" x2="300" y2="75" stroke="rgba(24, 181, 154, 0.15)" strokeDasharray="3 3" />

                {/* Layered Architectural Area Path */}
                <path
                  d="M20 75 Q 70 25, 120 45 T 220 30 T 300 55 L 300 90 L 20 90 Z"
                  fill="url(#areaFillGrad)"
                />
                <path
                  d="M20 75 Q 70 25, 120 45 T 220 30 T 300 55"
                  stroke="url(#gridNodeGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Interactive Node Connectors */}
                <circle cx="70" cy="25" r="5" fill="#18B59A" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="120" cy="45" r="4.5" fill="#22E4C2" stroke="#073A40" strokeWidth="2" />
                <circle cx="220" cy="30" r="5" fill="#18B59A" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="300" cy="55" r="4.5" fill="#22E4C2" stroke="#073A40" strokeWidth="2" />
              </svg>
            </div>

            {/* Genuine Showcase Architecture Info */}
            <div className="hero-card-info-row">
              <div className="info-badge-item">
                <span className="info-label">Specialization Tracks</span>
                <span className="info-value">6 Disciplines</span>
              </div>
              <div className="info-badge-item">
                <span className="info-label">Showcase Components</span>
                <span className="info-value">10 Projects</span>
              </div>
            </div>

            {/* Quick Tech Architecture Chips */}
            <div className="hero-card-tech-chips" aria-label="Component technologies">
              <span className="mini-chip">React 18</span>
              <span className="mini-chip">TypeScript</span>
              <span className="mini-chip">FastAPI</span>
              <span className="mini-chip">Tailwind</span>
              <span className="mini-chip">Docker</span>
            </div>
          </div>
        </div>

        {/* Floating Satellite Card 1 - Top Right (translateZ: 75px) */}
        <div className="hero-3d-floating-chip chip-top-right">
          <div className="chip-icon-box">
            <Sparkles size={16} color="#18B59A" aria-hidden="true" />
          </div>
          <div>
            <div className="chip-title">AI &amp; Machine Learning</div>
            <div className="chip-sub">Specialized Track</div>
          </div>
        </div>

        {/* Floating Satellite Card 2 - Bottom Left (translateZ: 60px) */}
        <div className="hero-3d-floating-chip chip-bottom-left">
          <div className="chip-icon-box ui-accent">
            <Layout size={16} color="#22E4C2" aria-hidden="true" />
          </div>
          <div>
            <div className="chip-title">UI/UX Architecture</div>
            <div className="chip-sub">Interactive 3D Stage</div>
          </div>
        </div>

        {/* Floating Satellite Card 3 - Bottom Right Code Snippet (translateZ: 85px) */}
        <div className="hero-3d-code-badge chip-bottom-right">
          <div className="code-header">
            <Terminal size={11} color="#8CE1D3" aria-hidden="true" />
            <span>showcase.config.ts</span>
          </div>
          <code>filterShowcase({'{'} track: 'All Tracks' {'}'})</code>
        </div>
      </div>
    </div>
  );
}
