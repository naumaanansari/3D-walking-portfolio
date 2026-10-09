import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOffice } from '../../context/OfficeContext';
import { ArchitecturalPlant } from './OfficeFurniture';

export const SurpriseBox3D: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  const { currentScene, isTransitioning, navigateTo } = useOffice();
  const boxGroupRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);

  const isSurpriseActive = currentScene === 'surprise' && !isTransitioning;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating animation
    if (boxGroupRef.current) {
      boxGroupRef.current.position.y = 1.1 + Math.sin(t * 2.2) * 0.04;
      boxGroupRef.current.rotation.y = Math.sin(t * 0.6) * 0.08;
    }

    // Lid opening
    if (lidRef.current) {
      const targetLidAngle = isSurpriseActive ? -Math.PI / 1.6 : 0;
      lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, targetLidAngle, 0.08);
    }

    // Glow intensity
    if (glowLightRef.current) {
      const targetIntensity = isSurpriseActive ? 3.0 + Math.sin(t * 4) * 0.6 : 0.6;
      glowLightRef.current.intensity = THREE.MathUtils.lerp(
        glowLightRef.current.intensity,
        targetIntensity,
        0.08
      );
    }
  });

  return (
    <group position={position}>
      {/* Curved Wood-Slatted Alcove Wall (Exact match to reference image right alcove) */}
      <group position={[0, 0, 0]}>
        {/* Curving wall background */}
        <mesh position={[0, 1.8, -1.8]} rotation={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 3.6, 0.15]} />
          <meshStandardMaterial color="#829C86" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.62, -1.8]} castShadow>
          <boxGeometry args={[4.24, 0.06, 0.18]} />
          <meshStandardMaterial color="#C19A6B" roughness={0.4} />
        </mesh>

        {/* Vertical Wood Slats on Curved Wall Accent */}
        <mesh position={[0, 1.8, -1.7]} castShadow>
          <boxGeometry args={[2.8, 3.2, 0.04]} />
          <meshStandardMaterial color="#C49A6C" roughness={0.4} />
        </mesh>

        {/* Framed Diploma on alcove partition */}
        <group position={[1.5, 2.2, -1.7]}>
          <mesh castShadow>
            <boxGeometry args={[0.42, 0.52, 0.03]} />
            <meshStandardMaterial color="#A07248" />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.36, 0.46]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Raised Multi-Tiered Circular Oak Pedestal (from reference image) */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.6, 1.7, 0.44, 32]} />
        <meshStandardMaterial color="#C89B6D" roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 0.1, 32]} />
        <meshStandardMaterial color="#E8DEC8" roughness={0.4} />
      </mesh>

      {/* Warm Golden Uplight Glow */}
      <mesh position={[0, 0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.25, 32]} />
        <meshBasicMaterial color="#FEF08A" />
      </mesh>

      {/* Interactive Glowing Purple Gift Box tied with Gold Ribbon */}
      <group
        ref={boxGroupRef}
        position={[0, 1.1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (currentScene !== 'surprise') {
            navigateTo('surprise');
          }
        }}
      >
        {/* Purple Gift Box Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.92, 0.8, 0.92]} />
          <meshStandardMaterial
            color="#7C3AED"
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>

        {/* Gold Ribbon Cross Strips */}
        <mesh position={[0, 0, 0.465]} castShadow>
          <planeGeometry args={[0.18, 0.8]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -0.465]} rotation={[0, Math.PI, 0]} castShadow>
          <planeGeometry args={[0.18, 0.8]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-0.465, 0, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow>
          <planeGeometry args={[0.18, 0.8]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.465, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <planeGeometry args={[0.18, 0.8]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.85} roughness={0.2} />
        </mesh>

        {/* Interior Light & Floating Crystal */}
        <pointLight ref={glowLightRef} position={[0, 0.35, 0]} color="#C084FC" distance={5} />
        <mesh position={[0, 0.28, 0]} rotation={[0.4, 0.5, 0]}>
          <octahedronGeometry args={[0.22, 0]} />
          <meshStandardMaterial
            color="#F472B6"
            emissive="#E879F9"
            emissiveIntensity={isSurpriseActive ? 1.0 : 0.3}
            roughness={0.1}
          />
        </mesh>

        {/* Animated Box Lid with Gold Bow */}
        <group ref={lidRef} position={[0, 0.42, -0.46]}>
          <mesh position={[0, 0.07, 0.46]} castShadow>
            <boxGeometry args={[0.98, 0.16, 0.98]} />
            <meshStandardMaterial color="#6D28D9" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.16, 0.46]} castShadow>
            <boxGeometry args={[0.2, 0.02, 0.99]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.85} />
          </mesh>
          <mesh position={[0, 0.16, 0.46]} castShadow>
            <boxGeometry args={[0.99, 0.02, 0.2]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.85} />
          </mesh>
          {/* Gold Ribbon Bow */}
          <mesh position={[0, 0.23, 0.46]} castShadow>
            <torusGeometry args={[0.14, 0.04, 12, 24]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>
      </group>

      {/* Surrounding Decorative Foliage in Terracotta Pots */}
      <ArchitecturalPlant position={[-1.6, 0, 0.8]} scale={0.9} planterType="terracotta" />
      <ArchitecturalPlant position={[1.7, 0, -0.6]} scale={1.05} planterType="brass" />
    </group>
  );
};
