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

    // Mumbai Transit Key Stations along Metro 1 (Versova - Ghatkopar) & Railway Interchanges
    const stations = [
      { name: 'Versova', x: 0.10, y: 0.45, color: '#0284C7' },
      { name: 'D.N. Nagar (Line 2A)', x: 0.25, y: 0.47, color: '#EAB308' },
      { name: 'Andheri (WR Local)', x: 0.42, y: 0.43, color: '#10B981' },
      { name: 'Marol Naka (Line 3)', x: 0.60, y: 0.45, color: '#06B6D4' },
      { name: 'Saki Naka', x: 0.76, y: 0.42, color: '#3DB87E' },
      { name: 'Ghatkopar (CR Local)', x: 0.92, y: 0.44, color: '#C4829E' },
    ];

    // Mumbai Feeder corridors to employment clusters
    const branches = [
      { from: 1, to: { x: 0.22, y: 0.20 }, label: 'Lokhandwala Feeder' },
      { from: 2, to: { x: 0.40, y: 0.72 }, label: 'BKC Financial Connector' },
      { from: 3, to: { x: 0.62, y: 0.20 }, label: 'SEEPZ & MIDC IT Hub' },
      { from: 5, to: { x: 0.94, y: 0.70 }, label: 'R-City & LBS Marg' },
    ];

    // Commuter & Vehicle Flow Particles
    const particles = [];
    const PARTICLE_COUNT = 60;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isVehicle = Math.random() > 0.4;
      const startStationIdx = Math.floor(Math.random() * (stations.length - 1));
      particles.push({
        segIndex: startStationIdx,
        progress: Math.random(),
        speed: 0.002 + Math.random() * 0.0035,
        size: isVehicle ? 3.5 : 2,
        color: isVehicle
          ? Math.random() > 0.3
            ? '#3DB87E'
            : '#4EBA86'
          : 'rgba(196, 130, 158, 0.8)',
        isVehicle,
        trail: [],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Branch Lines (Feeder corridors)
      branches.forEach((b) => {
        const fromStn = stations[b.from];
        const sx = fromStn.x * width;
        const sy = fromStn.y * height;
        const tx = b.to.x * width;
        const ty = b.to.y * height;

        ctx.strokeStyle = 'rgba(61, 184, 126, 0.25)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(tx, ty, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(61, 184, 126, 0.7)';
        ctx.fill();

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.fillText(b.label, tx + 6, ty + 3);
      });

      // 3. Draw Metro Trunk Line
      ctx.beginPath();
      stations.forEach((s, i) => {
        const sx = s.x * width;
        const sy = s.y * height;
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.strokeStyle = 'rgba(61, 184, 126, 0.3)';
      ctx.lineWidth = 8;
      ctx.stroke();

      ctx.strokeStyle = '#3DB87E';
      ctx.lineWidth = 3;
      ctx.stroke();

      // 4. Draw Stations with LMSI Heat Rings
      stations.forEach((s, i) => {
        const sx = s.x * width;
        const sy = s.y * height;

        const ringScale = 1 + Math.sin(time * 2 + i) * 0.25;
        ctx.beginPath();
        ctx.arc(sx, sy, 12 * ringScale, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}20`;
        ctx.fill();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.font = '11px "Inter", sans-serif';
        ctx.fillStyle = '#E2E8F0';
        ctx.textAlign = 'center';
        ctx.fillText(s.name, sx, sy + 20);

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = s.color;
        ctx.fillText('MUMBAI TRANSIT', sx, sy + 32);
      });

      // 5. Draw particles along track
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

        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
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
      <canvas ref={canvasRef} className="w-full h-full block opacity-40" />
    </div>
  );
}
