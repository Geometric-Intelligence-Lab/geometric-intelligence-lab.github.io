"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const palette = [0x3c62f3, 0x8252e8, 0xd64ba8, 0x4f8cff, 0xa55bea, 0x5d55d8];

export default function GeometryPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 14);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x7b6ee7, 2.4));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(3, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0xb544ff, 35, 22);
    rim.position.set(-5, -2, 5);
    scene.add(rim);

    const geometries = [
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.TorusKnotGeometry(.72, .24, 96, 12),
      new THREE.BoxGeometry(1.45, 1.45, 1.45, 2, 2, 2),
      new THREE.SphereGeometry(.92, 32, 24),
      new THREE.ConeGeometry(.95, 1.75, 5),
      new THREE.OctahedronGeometry(1, 0),
    ];
    const starts = [
      [-.78, .63, .3], [-.48, -.58, -.5], [-.16, .32, .2],
      [.18, -.24, -.4], [.52, .58, .1], [.8, -.66, -.2],
    ];
    const objects = geometries.map((geometry, index) => {
      const material = new THREE.MeshPhysicalMaterial({
        color: palette[index],
        roughness: .2,
        metalness: .12,
        clearcoat: 1,
        clearcoatRoughness: .16,
        transmission: index === 3 ? .15 : 0,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(.72);
      mesh.position.set(0, 0, starts[index][2]);
      mesh.rotation.set(index * .37, index * .21, index * .13);
      mesh.userData.velocity = new THREE.Vector3(
        (index % 2 ? 1 : -1) * (.006 + index * .0004),
        (index % 3 - 1) * .005,
        0
      );
      mesh.userData.spin = new THREE.Vector3(.002 + index * .0004, .004 + index * .0003, .0015);
      scene.add(mesh);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry, 25),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: .38 })
      );
      edges.scale.setScalar(1.004);
      mesh.add(edges);
      return mesh;
    });

    const mouse = new THREE.Vector2(4, 4);
    const raycaster = new THREE.Raycaster();
    let hover: THREE.Object3D | null = null;
    let frame = 0;
    let halfWidth = 6;
    let halfHeight = 3.5;
    let laidOut = false;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      halfWidth = halfHeight * camera.aspect;
      objects.forEach((mesh, index) => {
        if (!laidOut) mesh.position.set(starts[index][0] * halfWidth, starts[index][1] * halfHeight, starts[index][2]);
        else {
          mesh.position.x = THREE.MathUtils.clamp(mesh.position.x, -halfWidth + 1, halfWidth - 1);
          mesh.position.y = THREE.MathUtils.clamp(mesh.position.y, -halfHeight + 1, halfHeight - 1);
        }
      });
      laidOut = true;
    };
    const pointer = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const leave = () => mouse.set(4, 4);
    const impulse = () => {
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(objects)[0]?.object;
      if (!hit) return;
      const velocity = hit.userData.velocity as THREE.Vector3;
      velocity.x += mouse.x * .035;
      velocity.y += mouse.y * .035 + .025;
      hit.userData.pulse = 1;
    };
    window.addEventListener("pointermove", pointer);
    window.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", impulse);
    window.addEventListener("resize", resize);
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      const time = clock.getElapsedTime();
      raycaster.setFromCamera(mouse, camera);
      const hit = raycaster.intersectObjects(objects)[0]?.object ?? null;
      if (hit !== hover) {
        hover = hit;
        canvas.style.cursor = hover ? "pointer" : "crosshair";
      }
      objects.forEach((mesh, index) => {
        const velocity = mesh.userData.velocity as THREE.Vector3;
        const spin = mesh.userData.spin as THREE.Vector3;
        mesh.position.add(velocity);
        mesh.rotation.x += spin.x;
        mesh.rotation.y += spin.y;
        mesh.rotation.z += spin.z;
        mesh.position.y += Math.sin(time * 1.1 + index * 1.4) * .0018;
        if (mesh.position.x > halfWidth - .9 || mesh.position.x < -halfWidth + .9) velocity.x *= -1;
        if (mesh.position.y > halfHeight - .9 || mesh.position.y < -halfHeight + .9) velocity.y *= -1;
        velocity.multiplyScalar(.997);
        if (velocity.length() < .004) velocity.multiplyScalar(1.003);
        const targetScale = hit === mesh ? .84 : .72;
        const pulse = mesh.userData.pulse ?? 0;
        mesh.userData.pulse = Math.max(0, pulse - .045);
        const scale = targetScale + Math.sin(pulse * Math.PI) * .14;
        mesh.scale.lerp(new THREE.Vector3(scale, scale, scale), .1);
      });
      camera.position.x += (mouse.x * .22 - camera.position.x) * .018;
      camera.position.y += (mouse.y * .14 - camera.position.y) * .018;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", impulse);
      window.removeEventListener("resize", resize);
      objects.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="geometry-playground" aria-hidden="true"><canvas ref={canvasRef}/></div>
  );
}
