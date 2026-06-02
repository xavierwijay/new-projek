"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
} from "@react-three/drei";
import { useTheme } from "next-themes";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

function Orb({
  color,
  position,
  scale,
}: {
  color: string;
  position: [number, number, number];
  scale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [targetColor] = useState(() => new THREE.Color());

  // Subtle mouse parallax & color transition
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Slowly rotate
    meshRef.current.rotation.x = Math.sin(t / 4);
    meshRef.current.rotation.y = Math.sin(t / 2);

    // Parallax based on pointer
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      position[0] + state.pointer.x * 2,
      0.05,
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      position[1] + state.pointer.y * 2,
      0.05,
    );

    // Smooth color transition
    if (materialRef.current) {
      targetColor.set(color);
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {/* Reduce segments for mobile performance */}
        <sphereGeometry args={[1, 32, 32]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          backside
          backsideThickness={1}
          thickness={2.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.1}
          anisotropy={0.3}
          color={color}
          /* --- Optimizations for 120fps mobile --- */
          resolution={128} // Lower resolution for the transmission buffer
          samples={4} // Limit multi-sampling for roughness
        />
      </mesh>
    </Float>
  );
}

export function Background3D() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dark mode: ruby tint. Light mode: clear/glassy white with slight maroon tint
  const orbColor = resolvedTheme === "dark" ? "#a5273f" : "#ffffff";
  const ambientIntensity = resolvedTheme === "dark" ? 0.5 : 1;

  return (
    <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[
          1, 1.5,
        ]} /* Batasi pixel-ratio agar mobile tidak merender 3x lipat pixel */
      >
        <ambientLight intensity={ambientIntensity} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.5}
          color={orbColor}
        />

        {/* Environment map for realistic glass reflection */}
        <Environment preset="city" />

        <Orb color={orbColor} position={[-3, 2, -2]} scale={1.8} />
        <Orb color={orbColor} position={[3, -2, -1]} scale={1.5} />
        <Orb color={orbColor} position={[0, 0, -4]} scale={2.5} />
        <Orb color={orbColor} position={[-2, -3, 1]} scale={1.2} />
        <Orb color={orbColor} position={[4, 3, -3]} scale={2} />
      </Canvas>
    </div>
  );
}
