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

    // Particles that spawn on the DNA surface and get flung outward by rotation
    const particles: { mesh: THREE.Mesh; vel: THREE.Vector3; life: number; maxLife: number }[] = [];
    const pGeoSmall = new THREE.SphereGeometry(0.1, 6, 6);
    const pGeoMed = new THREE.SphereGeometry(0.18, 8, 8);
    const pMatGreen = new THREE.MeshStandardMaterial({ color: 0x6ab220, emissive: 0x6ab220, emissiveIntensity: 1.0, transparent: true, depthWrite: false });
    const pMatBlue = new THREE.MeshStandardMaterial({ color: 0x3a3ab8, emissive: 0x6666dd, emissiveIntensity: 1.0, transparent: true, depthWrite: false });

    let spawnTimer = 0;
    const spawnInterval = 0.06;

    const clock = new THREE.Clock();

    const animate = () => {
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();
      const rotSpeed = 0.25;

      dna.rotation.y = t * rotSpeed;

      // Spawn particles from the DNA helix surface, transformed by tiltGroup
      spawnTimer += dt;
      if (spawnTimer > spawnInterval && particles.length < 160) {
        spawnTimer = 0;
        const spawnT = Math.random();
        const spawnAngle = spawnT * Math.PI * 2 * turns + dna.rotation.y;
        const isStrandA = Math.random() > 0.5;
        const offset = isStrandA ? 0 : Math.PI;
        const finalAngle = spawnAngle + offset;

        // Local position on the helix
        const localPos = new THREE.Vector3(
          Math.cos(finalAngle) * radius,
          (spawnT - 0.5) * height * 0.5,
          Math.sin(finalAngle) * radius
        );

        // Apply tiltGroup's rotation to get world position
        localPos.applyEuler(tiltGroup.rotation);
        localPos.add(tiltGroup.position);

        const geo = Math.random() > 0.5 ? pGeoMed : pGeoSmall;
        const mat = (isStrandA ? pMatGreen : pMatBlue).clone();
        const p = new THREE.Mesh(geo, mat);
        p.position.copy(localPos);

        // Velocity: outward from DNA center (in world space after rotation)
        const outDir = new THREE.Vector3(
          Math.cos(finalAngle) * (2 + Math.random() * 2.5),
          (Math.random() - 0.4) * 1.2,
          Math.sin(finalAngle) * (2 + Math.random() * 2.5)
        );
        outDir.applyEuler(tiltGroup.rotation);

        scene.add(p);
        particles.push({ mesh: p, vel: outDir, life: 0, maxLife: 2 + Math.random() * 1.5 });
      }

      // Update particles — fade + slow down
      for (let i = particles.length - 1; i >= 0; i--) {
        const pp = particles[i];
        pp.life += dt;
        const progress = pp.life / pp.maxLife;
        // Decelerate over time
        const damping = 1 - progress * 0.6;
        pp.mesh.position.add(pp.vel.clone().multiplyScalar(dt * damping));
        // Scale down as it fades
        const scale = 1 - progress * 0.5;
        pp.mesh.scale.setScalar(scale);
        (pp.mesh.material as THREE.MeshStandardMaterial).opacity = (1 - progress) * 0.7;
        if (pp.life >= pp.maxLife) {
          scene.remove(pp.mesh);
          (pp.mesh.material as THREE.MeshStandardMaterial).dispose();
          particles.splice(i, 1);
        }
      }

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
