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

        tiltGroup.position.x = 6; // slightly right (increase a bit from 4)
        tiltGroup.position.y = -2; // optional: helps visual centering

        dna.scale.set(0.7, 0.7, 0.7);

        // ✅ REMOVE tilt
        tiltGroup.rotation.z = 0;
        tiltGroup.rotation.x = 0;

        renderer.domElement.style.opacity = "0.25";
      } else if (w < 1024) {
        // tablet / iPad
        tiltGroup.position.x = 8;
        dna.scale.set(0.9, 0.9, 0.9);
        renderer.domElement.style.opacity = "0.6";
      } else {
        // desktop
        tiltGroup.position.x = 14;
        tiltGroup.rotation.z = -Math.PI / 6;
        tiltGroup.rotation.x = 0.15;
        dna.scale.set(1, 1, 1);
        renderer.domElement.style.opacity = "1";

      }
    };

    applyResponsive();

    // FIXED TILT
    // tiltGroup.rotation.z = -Math.PI / 6;
    // tiltGroup.rotation.x = 0.15;

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
