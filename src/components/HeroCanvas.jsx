import React, { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Metro Line Stations and Tracks
    const stations = [
      { name: 'Baiyappanahalli', x: 0.12, y: 0.45, color: '#10B981' },
      { name: 'KR Pura', x: 0.28, y: 0.48, color: '#10B981' },
      { name: 'Garudacharpalya', x: 0.45, y: 0.42, color: '#F59E0B' },
      { name: 'Hoodi', x: 0.62, y: 0.46, color: '#EF4444' },
      { name: 'ITPL Tech Park', x: 0.78, y: 0.40, color: '#06B6D4' },
      { name: 'Whitefield', x: 0.92, y: 0.44, color: '#10B981' },
    ];

    // Branch lines to tech parks
    const branches = [
      { from: 2, to: { x: 0.48, y: 0.22 }, label: 'Bagmane Tech Park' },
      { from: 3, to: { x: 0.66, y: 0.72 }, label: 'EPIP Industrial Zone' },
      { from: 4, to: { x: 0.82, y: 0.20 }, label: 'Prestige Shantiniketan' },
      { from: 4, to: { x: 0.76, y: 0.70 }, label: 'Vydehi Hospital Cluster' },
    ];

    // Commuter & Vehicle Flow Particles
    const particles = [];
    const PARTICLE_COUNT = 75;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isVehicle = Math.random() > 0.4;
      const startStationIdx = Math.floor(Math.random() * (stations.length - 1));
      particles.push({
        segIndex: startStationIdx,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.004,
        size: isVehicle ? 3.5 : 2,
        color: isVehicle
          ? Math.random() > 0.3
            ? '#10B981'
            : '#06B6D4'
          : 'rgba(245, 158, 11, 0.8)',
        isVehicle,
        trail: [],
        pulse: Math.random() * Math.PI * 2,
      });
    }

    // Floating ambient background particles
    const ambientNodes = [];
    for (let i = 0; i < 40; i++) {
      ambientNodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle ambient hex/grid glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Branch Lines (Last-Mile Feeder Corridors)
      branches.forEach((b) => {
        const fromStn = stations[b.from];
        const sx = fromStn.x * width;
        const sy = fromStn.y * height;
        const tx = b.to.x * width;
        const ty = b.to.y * height;

        ctx.strokeStyle = 'rgba(6, 182, 212, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);

        // Feeder Hub Node
        ctx.beginPath();
        ctx.arc(tx, ty, 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.fill();

        // Label
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.fillText(b.label, tx + 8, ty + 3);
      });

      // 3. Draw Metro Trunk Line
      ctx.beginPath();
      stations.forEach((s, i) => {
        const sx = s.x * width;
        const sy = s.y * height;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      // Outer track glow
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      ctx.lineWidth = 8;
      ctx.stroke();

      // Core track line
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 4. Draw Stations with LMSI Heat Rings
      stations.forEach((s, i) => {
        const sx = s.x * width;
        const sy = s.y * height;

        // Pulsing stress ring
        const ringScale = 1 + Math.sin(time * 2 + i) * 0.25;
        ctx.beginPath();
        ctx.arc(sx, sy, 14 * ringScale, 0, Math.PI * 2);
        ctx.fillStyle = s.color === '#EF4444' ? 'rgba(239, 68, 68, 0.15)' : s.color === '#F59E0B' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)';
        ctx.fill();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center station dot
        ctx.beginPath();
        ctx.arc(sx, sy, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Station name
        ctx.font = '11px "Inter", sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, sx, sy + 22);

        // Subtext (Stress indicator)
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = s.color;
        const statusText = s.color === '#EF4444' ? 'LMSI 2.9 (DEFICIT)' : s.color === '#F59E0B' ? 'LMSI 1.8 (SURGE)' : 'LMSI 0.7 (BALANCED)';
        ctx.fillText(statusText, sx, sy + 34);
      });

      // 5. Draw and update animated particles along track
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.segIndex = (p.segIndex + 1) % (stations.length - 1);
        }

        const s1 = stations[p.segIndex];
        const s2 = stations[p.segIndex + 1];

        const px = (s1.x + (s2.x - s1.x) * p.progress) * width;
        const py = (s1.y + (s2.y - s1.y) * p.progress) * height;

        // Particle trail
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 8) p.trail.shift();

        // Render Trail
        for (let t = 0; t < p.trail.length; t++) {
          const pt = p.trail[t];
          const alpha = (t / p.trail.length) * 0.4;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Particle Head
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // 6. Draw ambient floating nodes
      ambientNodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${node.alpha * 0.4})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      {/* Vignette gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-transparent to-[#0B0F19]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B0F19]/50 to-[#0B0F19]" />
    </div>
  );
}
