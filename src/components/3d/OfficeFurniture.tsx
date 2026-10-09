import React from 'react';
import * as THREE from 'three';

// Sage-Green Architectural Rounded Partition Wall
export const SagePartition: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  height?: number;
  thickness?: number;
  hasWoodCap?: boolean;
}> = ({
  position,
  rotation = [0, 0, 0],
  length = 3,
  height = 1.7,
  thickness = 0.14,
  hasWoodCap = true,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Main Sage-Green Panel */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, height, thickness]} />
        <meshStandardMaterial color="#829C86" roughness={0.7} />
      </mesh>

      {/* Warm Natural Oak Top Cap */}
      {hasWoodCap && (
        <mesh position={[0, height + 0.02, 0]} castShadow>
          <boxGeometry args={[length + 0.04, 0.05, thickness + 0.04]} />
          <meshStandardMaterial color="#C19A6B" roughness={0.4} />
        </mesh>
      )}

      {/* Subtle Base Kick Runner */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[length + 0.02, 0.08, thickness + 0.02]} />
        <meshStandardMaterial color="#E8DEC8" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Rounded Warm Wood & White Reception Desk with LED Slats (Exact match to reference image)
export const CurvedReceptionDesk: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Desk Base Structure with warm vertical wood slats */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 1.1, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#C49A6C" roughness={0.5} />
      </mesh>

      {/* Slatted Wood Texture Elements */}
      {Array.from({ length: 18 }).map((_, idx) => {
        const angle = (idx / 17) * Math.PI;
        const x = Math.cos(angle) * 2.01;
        const z = Math.sin(angle) * 2.01;
        return (
          <mesh key={idx} position={[x, 0.55, z]} rotation={[0, -angle, 0]} castShadow>
            <boxGeometry args={[0.08, 1.06, 0.04]} />
            <meshStandardMaterial color="#A97D4F" roughness={0.4} />
          </mesh>
        );
      })}

      {/* Polished White Stone Countertop with Smooth Lip */}
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.15, 2.15, 0.08, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Warm Golden LED Kick Light underneath */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.96, 1.96, 0.04, 32, 1, false, 0, Math.PI]} />
        <meshBasicMaterial color="#FDE047" />
      </mesh>

      {/* Reception Terminal Screen */}
      <group position={[0, 1.18, 0.3]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.58, 0.38, 0.03]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        <mesh position={[0, 0.22, -0.016]}>
          <planeGeometry args={[0.52, 0.34]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
          <meshStandardMaterial color="#64748B" />
        </mesh>
      </group>

      {/* Desk Plant & Visitor Bell */}
      <group position={[-1.2, 1.16, 0.4]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.16, 12]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color="#22C55E" roughness={0.6} />
        </mesh>
      </group>
      <mesh position={[1.1, 1.18, 0.4]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.04, 12]} />
        <meshStandardMaterial color="#EAB308" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
};

// Natural Oak Office Workstation Desk
export const NaturalWoodDesk: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  chairColor?: string;
  hasChair?: boolean;
}> = ({ position, rotation = [0, 0, 0], chairColor = '#2563EB', hasChair = true }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Light Natural Oak Desktop */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.06, 1.1]} />
        <meshStandardMaterial color="#D8B589" roughness={0.4} />
      </mesh>

      {/* Sturdy Modern Metal Desk Legs (Off-white / Warm Cream) */}
      <mesh position={[-1.0, 0.375, -0.42]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} />
      </mesh>
      <mesh position={[1.0, 0.375, -0.42]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} />
      </mesh>
      <mesh position={[-1.0, 0.375, 0.42]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} />
      </mesh>
      <mesh position={[1.0, 0.375, 0.42]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} />
      </mesh>

      {/* Under-desk Modesty Panel in Light Oak */}
      <mesh position={[0, 0.5, -0.42]} castShadow>
        <boxGeometry args={[1.9, 0.32, 0.03]} />
        <meshStandardMaterial color="#C9A375" roughness={0.5} />
      </mesh>

      {/* Dual Curved Widescreen Monitors on Articulated Arms */}
      <group position={[-0.32, 0.78, -0.16]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.82, 0.46, 0.03]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0, 0.22, 0.018]}>
          <planeGeometry args={[0.78, 0.42]} />
          <meshBasicMaterial color="#F0F9FF" />
        </mesh>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 12]} />
          <meshStandardMaterial color="#64748B" />
        </mesh>
      </group>

      <group position={[0.48, 0.78, -0.12]} rotation={[0, -0.22, 0]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.75, 0.46, 0.03]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0, 0.22, 0.018]}>
          <planeGeometry args={[0.71, 0.42]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
      </group>

      {/* Desk Mat & Keyboard */}
      <mesh position={[-0.05, 0.785, 0.2]}>
        <boxGeometry args={[0.8, 0.01, 0.35]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      <mesh position={[-0.1, 0.795, 0.22]}>
        <boxGeometry args={[0.42, 0.012, 0.14]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.3} />
      </mesh>

      {/* Modern Office Swivel Chair */}
      {hasChair && (
        <group position={[0, 0, 0.7]} rotation={[0, Math.PI, 0]}>
          {/* Base & Gas Lift */}
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.04, 5]} />
            <meshStandardMaterial color="#334155" metalness={0.7} />
          </mesh>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.28, 8]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.8} />
          </mesh>
          {/* Seat Cushion */}
          <mesh position={[0, 0.46, 0]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.48]} />
            <meshStandardMaterial color={chairColor} roughness={0.7} />
          </mesh>
          {/* Backrest with Ergonomic Lumbar Curve */}
          <mesh position={[0, 0.82, -0.22]} castShadow>
            <boxGeometry args={[0.46, 0.62, 0.06]} />
            <meshStandardMaterial color={chairColor} roughness={0.7} />
          </mesh>
        </group>
      )}
    </group>
  );
};

// Lush Architectural Indoor Plant (Ficus / Monstera in Terracotta or Brass Planter)
export const ArchitecturalPlant: React.FC<{
  position: [number, number, number];
  scale?: number;
  planterType?: 'terracotta' | 'brass' | 'ceramic';
}> = ({ position, scale = 1, planterType = 'terracotta' }) => {
  const potColor =
    planterType === 'brass'
      ? '#D4AF37'
      : planterType === 'ceramic'
      ? '#FAF8F5'
      : '#C86D48'; // Terracotta pot

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Planter Pot */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.26, 0.7, 24]} />
        <meshStandardMaterial
          color={potColor}
          roughness={planterType === 'brass' ? 0.3 : 0.6}
          metalness={planterType === 'brass' ? 0.6 : 0.05}
        />
      </mesh>

      {/* Rich Soil */}
      <mesh position={[0, 0.68, 0]}>
        <circleGeometry args={[0.32, 16]} />
        <meshStandardMaterial color="#3D2817" roughness={0.9} />
      </mesh>

      {/* Main Stems & Multi-layered Broad Tropical Foliage */}
      <group position={[0, 0.7, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.06, 0.8, 8]} />
          <meshStandardMaterial color="#4A3525" roughness={0.8} />
        </mesh>

        {/* Large Rounded Monstera & Ficus Leaves */}
        <mesh position={[0.2, 0.65, 0.15]} rotation={[0.4, 0.4, 0.3]} castShadow>
          <sphereGeometry args={[0.28, 12, 12]} />
          <meshStandardMaterial color="#2E6F40" roughness={0.5} />
        </mesh>
        <mesh position={[-0.2, 0.8, -0.15]} rotation={[-0.3, -0.4, -0.3]} castShadow>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshStandardMaterial color="#1E5E32" roughness={0.5} />
        </mesh>
        <mesh position={[0.15, 1.05, -0.1]} rotation={[-0.2, 0.6, 0.2]} castShadow>
          <sphereGeometry args={[0.32, 12, 12]} />
          <meshStandardMaterial color="#3B8246" roughness={0.5} />
        </mesh>
        <mesh position={[-0.15, 1.25, 0.12]} rotation={[0.4, -0.5, -0.2]} castShadow>
          <sphereGeometry args={[0.26, 12, 12]} />
          <meshStandardMaterial color="#2E6F40" roughness={0.5} />
        </mesh>
        <mesh position={[0, 1.45, 0]} rotation={[0, 0, 0]} castShadow>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#4ADE80" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// Reception Lounge Group: Round Woven Rug, Beige Sofa, Sage & Mustard Armchairs, Oak Coffee Table
export const ReceptionLoungeArea: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  return (
    <group position={position}>
      {/* Round Natural Woven Jute Rug */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#DECBB5" roughness={0.9} />
      </mesh>

      {/* Light Cream / Beige 3-Seater Sofa (North side of lounge circle) */}
      <group position={[0, 0, -1.2]} rotation={[0, 0, 0]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.32, 0.85]} />
          <meshStandardMaterial color="#ECE4D8" roughness={0.8} />
        </mesh>
        {/* Back Cushion */}
        <mesh position={[0, 0.72, -0.35]} castShadow>
          <boxGeometry args={[2.2, 0.48, 0.22]} />
          <meshStandardMaterial color="#ECE4D8" roughness={0.8} />
        </mesh>
        {/* Left Armrest */}
        <mesh position={[-1.15, 0.52, 0]} castShadow>
          <boxGeometry args={[0.18, 0.42, 0.85]} />
          <meshStandardMaterial color="#E3DACB" roughness={0.8} />
        </mesh>
        {/* Right Armrest */}
        <mesh position={[1.15, 0.52, 0]} castShadow>
          <boxGeometry args={[0.18, 0.42, 0.85]} />
          <meshStandardMaterial color="#E3DACB" roughness={0.8} />
        </mesh>
        {/* Oak Wooden Tapered Legs */}
        {[-0.95, 0.95].map((x) =>
          [-0.32, 0.32].map((z) => (
            <mesh key={`${x}-${z}`} position={[x, 0.12, z]} castShadow>
              <cylinderGeometry args={[0.03, 0.02, 0.24, 8]} />
              <meshStandardMaterial color="#A07248" roughness={0.4} />
            </mesh>
          ))
        )}
      </group>

      {/* Two Sage-Teal Armchairs */}
      <group position={[-1.6, 0, 0.3]} rotation={[0, Math.PI / 3, 0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.3, 0.8]} />
          <meshStandardMaterial color="#4E7C77" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.68, -0.32]} castShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#4E7C77" roughness={0.7} />
        </mesh>
      </group>
      <group position={[-0.8, 0, 1.8]} rotation={[0, (2 * Math.PI) / 3, 0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.3, 0.8]} />
          <meshStandardMaterial color="#4E7C77" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.68, -0.32]} castShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#4E7C77" roughness={0.7} />
        </mesh>
      </group>

      {/* Two Mustard-Yellow Accent Armchairs */}
      <group position={[1.6, 0, 0.3]} rotation={[0, -Math.PI / 3, 0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.3, 0.8]} />
          <meshStandardMaterial color="#E5A93C" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.68, -0.32]} castShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#E5A93C" roughness={0.7} />
        </mesh>
      </group>
      <group position={[0.8, 0, 1.8]} rotation={[0, -(2 * Math.PI) / 3, 0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.82, 0.3, 0.8]} />
          <meshStandardMaterial color="#E5A93C" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.68, -0.32]} castShadow>
          <boxGeometry args={[0.82, 0.44, 0.18]} />
          <meshStandardMaterial color="#E5A93C" roughness={0.7} />
        </mesh>
      </group>

      {/* Round Solid Oak Coffee Table with Tabletop Plant */}
      <group position={[0, 0, 0.2]}>
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.06, 32]} />
          <meshStandardMaterial color="#C89B6D" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.14, 0.26, 12]} />
          <meshStandardMaterial color="#A07248" roughness={0.5} />
        </mesh>
        {/* Tabletop Succulent / Bowl */}
        <mesh position={[0, 0.33, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.08, 0.08, 16]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color="#16A34A" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};
