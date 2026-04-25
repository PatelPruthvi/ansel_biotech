import { useEffect, useRef } from "react";

export function MoleculeCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let mouse = { x: -999, y: -999 };
    const N = 30;
    const nodes = Array.from({ length: N }, (_, i) => ({
      x: 0.05 + Math.random() * 0.9,
      y: 0.05 + Math.random() * 0.9,
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
      r: 2.5 + Math.random() * 3,
      kind: i % 3
    }));

    let animationFrameId: number;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const p = canvas.parentElement;
      if (!p) return;
      W = p.offsetWidth;
      H = p.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) / W;
      mouse.y = (e.clientY - r.top) / H;
    };

    const handleMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const getColors = () => {
      const dk = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
      return { 
        g: dk ? 'rgba(106,178,32,A)' : 'rgba(64,128,10,A)', 
        i: dk ? 'rgba(90,90,210,A)' : 'rgba(50,50,170,A)', 
        n: dk ? 'rgba(160,185,150,A)' : 'rgba(60,80,50,A)' 
      };
    };

    const ca = (s: string, a: number) => s.replace('A', a.toString());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const col = getColors();
      
      nodes.forEach(n => {
        n.x += n.vx; 
        n.y += n.vy;
        if (n.x < 0.04 || n.x > 0.96) n.vx *= -1;
        if (n.y < 0.04 || n.y > 0.96) n.vy *= -1;
        
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const d = Math.hypot(dx, dy);
        if (d < 0.25) { 
          n.x += dx * 0.004; 
          n.y += dy * 0.004; 
        }
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 0.3) continue;
          
          const al = (1 - d / 0.3) * 0.32;
          const col_ = a.kind === 0 ? col.g : a.kind === 1 ? col.i : col.n;
          
          ctx.beginPath();
          ctx.moveTo(a.x * W, a.y * H);
          ctx.lineTo(b.x * W, b.y * H);
          ctx.strokeStyle = ca(col_, al);
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }

      nodes.forEach(n => {
        const px = n.x * W;
        const py = n.y * H;
        const col_ = n.kind === 0 ? col.g : n.kind === 1 ? col.i : col.n;
        const gr = ctx.createRadialGradient(px, py, 0, px, py, n.r * 2.8);
        
        gr.addColorStop(0, ca(col_, 0.85));
        gr.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(px, py, n.r * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full z-10 pointer-events-auto ${className}`}
    />
  );
}
