// import { useEffect, useRef } from "react";

// export function DnaCanvas({ className = "" }: { className?: string }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let W = 0;
//     let H = 0;
//     const mouse = { x: -9999, y: -9999 };
//     let burstT = 0;
//     let bursting = false;
//     let t = 0;
//     let pressT = 0;
//     let animationFrameId = 0;

//     const isMob = () => window.innerWidth <= 820;

//     const resize = () => {
//       const dpr = Math.min(window.devicePixelRatio, 2);
//       W = canvas.offsetWidth;
//       H = canvas.offsetHeight;
//       canvas.width = W * dpr;
//       canvas.height = H * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };

//     resize();
//     window.addEventListener("resize", resize);

//     const hero = canvas.closest(".hero") as HTMLElement | null;
//     const target: HTMLElement = hero ?? canvas;

//     const handlePointerMove = (e: PointerEvent) => {
//       const r = canvas.getBoundingClientRect();
//       mouse.x = e.clientX - r.left;
//       mouse.y = e.clientY - r.top;
//       if (hero) hero.classList.add("dna-hot");
//     };

//     const handlePointerLeave = () => {
//       mouse.x = -9999;
//       mouse.y = -9999;
//       if (hero) {
//         hero.classList.remove("dna-hot");
//         hero.classList.remove("dna-press");
//       }
//     };

//     const handlePointerDown = (e: PointerEvent) => {
//       // Don't burst when clicking interactive elements
//       const tgt = e.target as HTMLElement | null;
//       if (tgt && tgt.closest("a,button,input,textarea,select,label")) return;
//       bursting = true;
//       burstT = 0;
//       pressT = 0.55;
//       const r = canvas.getBoundingClientRect();
//       mouse.x = e.clientX - r.left;
//       mouse.y = e.clientY - r.top;
//       if (hero) {
//         hero.classList.add("dna-press");
//         setTimeout(() => {
//           hero.classList.remove("dna-press");
//         }, 260);
//       }
//     };

//     target.addEventListener("pointermove", handlePointerMove);
//     target.addEventListener("pointerleave", handlePointerLeave);
//     target.addEventListener("pointerdown", handlePointerDown);

//     const RUNGS = 32;
//     const FREQ = 2.4;
//     const RX = 0.052;
//     const RY = 0.5;

//     const getColors = () => {
//       const dk =
//         document.documentElement.classList.contains("dark") ||
//         document.documentElement.getAttribute("data-theme") === "dark";
//       return {
//         sA: dk ? "rgba(100,186,28,A)" : "rgba(60,120,10,A)",
//         sB: dk ? "rgba(70,70,196,A)" : "rgba(40,40,165,A)",
//         gA: dk ? "#6ab220" : "#4a8c12",
//         gB: dk ? "#5050c8" : "#3636a8",
//         rng: dk ? "rgba(175,198,160,A)" : "rgba(50,64,40,A)",
//       };
//     };

//     const ca = (s: string, a: number) => s.replace("A", a.toString());
//     const cx = () => (isMob() ? W * 0.5 : W * 0.72);

//     const pt = (s: number, fy: number, ti: number) => {
//       const ph = s === 0 ? 0 : Math.PI;
//       const ang = fy * Math.PI * 2 * FREQ + ti + ph;
//       const x = cx();
//       const y = H * 0.5;
//       const rx = W * RX;
//       const ry = H * RY;
//       const py = y + (fy - 0.5) * ry * 2;
//       const d = Math.hypot(mouse.x - x, mouse.y - py);
//       const push =
//         d < 140 ? (1 - d / 140) * (18 + pressT * 18) * (mouse.x > x ? 1 : -1) : 0;
//       const bAmp =
//         (bursting ? Math.sin(burstT * Math.PI) * (18 + pressT * 26) : 0) *
//         (s === 0 ? 1 : -1);
//       return {
//         x: x + Math.sin(ang) * rx + push + bAmp,
//         y: py,
//         z: Math.cos(ang),
//       };
//     };

//     const drawStrand = (s: number, ti: number, c: ReturnType<typeof getColors>) => {
//       const col = s === 0 ? c.sA : c.sB;
//       const glow = s === 0 ? c.gA : c.gB;
//       const pts = Array.from({ length: RUNGS }, (_, i) => pt(s, i / (RUNGS - 1), ti));

//       ctx.beginPath();
//       ctx.moveTo(pts[0].x, pts[0].y);
//       for (let i = 1; i < pts.length - 1; i++) {
//         ctx.quadraticCurveTo(
//           pts[i].x,
//           pts[i].y,
//           (pts[i].x + pts[i + 1].x) / 2,
//           (pts[i].y + pts[i + 1].y) / 2,
//         );
//       }
//       ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);

//       ctx.shadowColor = glow;
//       ctx.shadowBlur = 14;
//       ctx.strokeStyle = ca(col, 0.85);
//       ctx.lineWidth = 2.2;
//       ctx.stroke();

//       ctx.shadowBlur = 4;
//       ctx.strokeStyle = ca(col, 0.3);
//       ctx.lineWidth = 0.8;
//       ctx.stroke();
//       ctx.shadowBlur = 0;
//     };

//     type Rung = {
//       a: { x: number; y: number; z: number };
//       b: { x: number; y: number; z: number };
//       depth: number;
//     };

//     const drawRung = (r: Rung, c: ReturnType<typeof getColors>) => {
//       const { a, b, depth } = r;
//       const nd = (depth + 1) / 2;
//       const alpha = 0.06 + nd * 0.52;
//       const lw = 0.6 + nd * 1.8;
//       const mx = (a.x + b.x) / 2;
//       const my = (a.y + b.y) / 2;
//       const len = Math.hypot(b.x - a.x, b.y - a.y);
//       const bow = depth * len * 0.04;

//       ctx.beginPath();
//       ctx.moveTo(a.x, a.y);
//       ctx.quadraticCurveTo(mx, my - bow, b.x, b.y);
//       ctx.strokeStyle = ca(c.rng, alpha);
//       ctx.lineWidth = lw;
//       ctx.stroke();

//       ([
//         [a, c.gA],
//         [b, c.gB],
//       ] as const).forEach(([p, g]) => {
//         const nr = 1.5 + nd * 3.2;
//         const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, nr * 2);
//         gr.addColorStop(0, g);
//         gr.addColorStop(1, "transparent");

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, nr, 0, Math.PI * 2);
//         ctx.globalAlpha = 0.18 + nd * 0.48;
//         ctx.fillStyle = gr;
//         ctx.fill();
//         ctx.globalAlpha = 1;
//       });
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, W, H);
//       t += 0.007;
//       pressT = Math.max(0, pressT - 0.02);
//       if (bursting) {
//         burstT += 0.06;
//         if (burstT >= 1) {
//           burstT = 0;
//           bursting = false;
//         }
//       }

//       const c = getColors();
//       const rungs: Rung[] = Array.from({ length: RUNGS }, (_, i) => {
//         const fy = i / (RUNGS - 1);
//         const a = pt(0, fy, t);
//         const b = pt(1, fy, t);
//         return { a, b, depth: (a.z + b.z) / 2 };
//       }).sort((x, y) => x.depth - y.depth);

//       rungs.filter((r) => r.depth < 0).forEach((r) => drawRung(r, c));
//       drawStrand(0, t, c);
//       drawStrand(1, t, c);
//       rungs.filter((r) => r.depth >= 0).forEach((r) => drawRung(r, c));

//       animationFrameId = requestAnimationFrame(draw);
//     };

//     draw();

//     return () => {
//       window.removeEventListener("resize", resize);
//       target.removeEventListener("pointermove", handlePointerMove);
//       target.removeEventListener("pointerleave", handlePointerLeave);
//       target.removeEventListener("pointerdown", handlePointerDown);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className={`absolute inset-0 w-full h-full block opacity-[0.18] md:opacity-100 pointer-events-none ${className}`}
//     />
//   );
// }

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function DnaCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = ref.current;
    if (!mount) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 55;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const light = new THREE.PointLight(0xffffff, 1.2);
    light.position.set(20, 20, 20);
    scene.add(light);

    // GROUPS
    const tiltGroup = new THREE.Group();
    scene.add(tiltGroup);

    const dna = new THREE.Group();
    tiltGroup.add(dna);

    // ✅ responsive positioning
    const applyResponsive = () => {
      const w = window.innerWidth;

      if (w < 640) {
        // mobile
        tiltGroup.position.x = 4;
        dna.scale.set(0.75, 0.75, 0.75);
        renderer.domElement.style.opacity = "0.35";
      } else if (w < 1024) {
        // tablet / iPad
        tiltGroup.position.x = 8;
        dna.scale.set(0.9, 0.9, 0.9);
        renderer.domElement.style.opacity = "0.6";
      } else {
        // desktop
        tiltGroup.position.x = 14;
        dna.scale.set(1, 1, 1);
        renderer.domElement.style.opacity = "1";
      }
    };

    applyResponsive();

    // FIXED TILT
    tiltGroup.rotation.z = -Math.PI / 6;
    tiltGroup.rotation.x = 0.15;

    const turns = 3;
    const height = 80;
    const radius = 2.5;
    const segments = 500;

    const createCurve = (offset: number) => {
      const pts = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const angle = t * Math.PI * 2 * turns + offset;

        pts.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            (t - 0.5) * height,
            Math.sin(angle) * radius
          )
        );
      }
      return new THREE.CatmullRomCurve3(pts);
    };

    const matA = new THREE.MeshStandardMaterial({
      color: 0x6ab220,
      emissive: 0x6ab220,
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.2,
    });

    const matB = new THREE.MeshStandardMaterial({
      color: 0x3a3ab8,
      emissive: 0x7272d8,
      emissiveIntensity: 1.2,
      roughness: 0.25,
      metalness: 0.2,
    });

    const tubeA = new THREE.Mesh(
      new THREE.TubeGeometry(createCurve(0), 300, 0.18, 16, false),
      matA
    );

    const tubeB = new THREE.Mesh(
      new THREE.TubeGeometry(createCurve(Math.PI), 300, 0.18, 16, false),
      matB
    );

    dna.add(tubeA, tubeB);

    const rungMat = new THREE.MeshStandardMaterial({
      color: 0xb0c6a0,
      emissive: 0x324028,
      emissiveIntensity: 0.4,
      roughness: 0.6,
    });

    for (let i = 0; i <= segments; i += 12) {
      const t = i / segments;
      const angle = t * Math.PI * 2 * turns;

      const a = new THREE.Vector3(
        Math.cos(angle) * radius,
        (t - 0.5) * height,
        Math.sin(angle) * radius
      );

      const b = new THREE.Vector3(
        Math.cos(angle + Math.PI) * radius,
        (t - 0.5) * height,
        Math.sin(angle + Math.PI) * radius
      );

      const dist = a.distanceTo(b);

      const geo = new THREE.CylinderGeometry(0.15, 0.08, dist, 8);
      const mesh = new THREE.Mesh(geo, rungMat);

      mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
      mesh.lookAt(b);
      mesh.rotateX(Math.PI / 2);

      dna.add(mesh);
    }

    const onResize = () => {
      applyResponsive();

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      dna.rotation.y = t * 0.25;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
