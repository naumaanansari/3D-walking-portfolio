import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MAJOR_PROJECTS, OTHER_PROJECTS, CERTIFICATES, CAREER_KPIS } from '../../data/portfolioData';
import { useOffice } from '../../context/OfficeContext';

// Stylized Golden Trophy Model matching reference image
const TrophyMesh: React.FC<{
  position: [number, number, number];
  scale?: number;
  isHovered?: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}> = ({ position, scale = 1, isHovered = false, onClick, onPointerOver, onPointerOut }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current && isHovered) {
      meshRef.current.rotation.y += 0.035;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      scale={isHovered ? [scale * 1.18, scale * 1.18, scale * 1.18] : [scale, scale, scale]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={onPointerOut}
    >
      {/* Heavy Wood / Brass Base */}
      <mesh position={[0, 0.06, 0]} castShadow>
        <boxGeometry args={[0.26, 0.12, 0.26]} />
        <meshStandardMaterial color="#5C3D24" roughness={0.4} />
      </mesh>
      {/* Gold Stem */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.08, 0.18, 12]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Polished Gold Trophy Chalice */}
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.08, 0.28, 16]} />
        <meshStandardMaterial
          color="#FBBF24"
          metalness={0.92}
          roughness={0.15}
          emissive={isHovered ? '#FDE68A' : '#000000'}
          emissiveIntensity={isHovered ? 0.35 : 0}
        />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.19, 0.44, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.19, 0.44, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Framed Certificate Model
const FramedCertificateMesh: React.FC<{
  position: [number, number, number];
  isHovered?: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}> = ({ position, isHovered = false, onClick, onPointerOver, onPointerOut }) => {
  return (
    <group
      position={position}
      scale={isHovered ? [1.12, 1.12, 1.12] : [1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onPointerOver();
      }}
      onPointerOut={onPointerOut}
    >
      {/* Warm Oak Frame */}
      <mesh position={[0, 0.22, 0]} rotation={[-0.12, 0, 0]} castShadow>
        <boxGeometry args={[0.44, 0.34, 0.03]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.4} />
      </mesh>
      {/* Parchment Inner */}
      <mesh position={[0, 0.22, 0.02]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[0.38, 0.28]} />
        <meshStandardMaterial
          color="#FAF8F5"
          roughness={0.8}
          emissive={isHovered ? '#86EFAC' : '#000000'}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>
      {/* Gold Seal */}
      <mesh position={[0.11, 0.14, 0.022]} rotation={[-0.12, 0, 0]}>
        <circleGeometry args={[0.038, 16]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

export const TrophyShelf3D: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  const { openProjectDetail, openCertificateDetail } = useOffice();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <group position={position}>
      {/* Walnut Cabinet Built-in Shell */}
      {/* Back Panel */}
      <mesh position={[0, 2.0, -0.25]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3.2, 0.12]} />
        <meshStandardMaterial color="#7A4E2D" roughness={0.5} />
      </mesh>

      {/* Side Walls */}
      <mesh position={[-1.76, 2.0, 0.1]} castShadow>
        <boxGeometry args={[0.1, 3.2, 0.6]} />
        <meshStandardMaterial color="#6B4226" roughness={0.4} />
      </mesh>
      <mesh position={[1.76, 2.0, 0.1]} castShadow>
        <boxGeometry args={[0.1, 3.2, 0.6]} />
        <meshStandardMaterial color="#6B4226" roughness={0.4} />
      </mesh>
      {/* Top Header */}
      <mesh position={[0, 3.55, 0.1]} castShadow>
        <boxGeometry args={[3.64, 0.12, 0.62]} />
        <meshStandardMaterial color="#6B4226" roughness={0.4} />
      </mesh>
      {/* Base Pedestal */}
      <mesh position={[0, 0.45, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[3.64, 0.15, 0.62]} />
        <meshStandardMaterial color="#6B4226" roughness={0.4} />
      </mesh>

      {/* Shelf 1 (Bottom - Certificates) */}
      <mesh position={[0, 1.25, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.06, 0.55]} />
        <meshStandardMaterial color="#A07248" roughness={0.3} />
      </mesh>

      {/* Shelf 2 (Middle - Other Projects) */}
      <mesh position={[0, 2.15, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.06, 0.55]} />
        <meshStandardMaterial color="#A07248" roughness={0.3} />
      </mesh>

      {/* Shelf 3 (Top - Major Projects) */}
      <mesh position={[0, 3.05, 0.08]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 0.06, 0.55]} />
        <meshStandardMaterial color="#A07248" roughness={0.3} />
      </mesh>

      {/* Soft Warm LED Strip in Shelf */}
      <mesh position={[0, 3.02, 0.32]}>
        <boxGeometry args={[3.3, 0.015, 0.02]} />
        <meshBasicMaterial color="#FEF08A" />
      </mesh>
      <mesh position={[0, 2.12, 0.32]}>
        <boxGeometry args={[3.3, 0.015, 0.02]} />
        <meshBasicMaterial color="#FEF08A" />
      </mesh>
      <mesh position={[0, 1.22, 0.32]}>
        <boxGeometry args={[3.3, 0.015, 0.02]} />
        <meshBasicMaterial color="#FEF08A" />
      </mesh>

      {/* TOP SHELF: 4 Large Golden Trophies (Major Projects) */}
      {MAJOR_PROJECTS.map((proj, idx) => {
        const xPos = -1.2 + idx * 0.8;
        return (
          <TrophyMesh
            key={proj.id}
            position={[xPos, 3.08, 0.1]}
            scale={0.78}
            isHovered={hoveredId === proj.id}
            onClick={() => openProjectDetail(proj)}
            onPointerOver={() => setHoveredId(proj.id)}
            onPointerOut={() => setHoveredId(null)}
          />
        );
      })}

      {/* MIDDLE SHELF: 4 Medium Golden Trophies (Other Projects) */}
      {OTHER_PROJECTS.slice(0, 4).map((proj, idx) => {
        const xPos = -1.15 + idx * 0.76;
        return (
          <TrophyMesh
            key={proj.id}
            position={[xPos, 2.18, 0.1]}
            scale={0.62}
            isHovered={hoveredId === proj.id}
            onClick={() => openProjectDetail(proj)}
            onPointerOver={() => setHoveredId(proj.id)}
            onPointerOut={() => setHoveredId(null)}
          />
        );
      })}

      {/* BOTTOM SHELF: Framed Certificates */}
      {CERTIFICATES.slice(0, 3).map((cert, idx) => {
        const xPos = -1.0 + idx * 1.0;
        return (
          <FramedCertificateMesh
            key={cert.id}
            position={[xPos, 1.28, 0.12]}
            isHovered={hoveredId === cert.id}
            onClick={() => openCertificateDetail(cert)}
            onPointerOver={() => setHoveredId(cert.id)}
            onPointerOut={() => setHoveredId(null)}
          />
        );
      })}

      {/* ADJACENT SAGE-GREEN PANEL WITH GOLD KPI BADGES (Exact match to reference image) */}
      <group position={[2.4, 0, 0]}>
        {/* Sage-Green Wall Column */}
        <mesh position={[0, 1.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.1, 3.4, 0.2]} />
          <meshStandardMaterial color="#829C86" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.65, 0]} castShadow>
          <boxGeometry args={[1.14, 0.08, 0.24]} />
          <meshStandardMaterial color="#C19A6B" roughness={0.4} />
        </mesh>

        {/* Top Plaque: Golden Trophy Icon Badge */}
        <group position={[0, 2.65, 0.11]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.75, 0.03]} />
            <meshStandardMaterial color="#2B3A2E" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <circleGeometry args={[0.22, 16]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Bottom Plaque: Golden Star Icon Badge */}
        <group position={[0, 1.45, 0.11]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.75, 0.03]} />
            <meshStandardMaterial color="#2B3A2E" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <circleGeometry args={[0.22, 16]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
