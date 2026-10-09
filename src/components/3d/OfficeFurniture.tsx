import React, { useMemo } from 'react';
import * as THREE from 'three';
import { createScreenTexture } from '../../utils/textureGenerator';

// =========================================================================
// 1. ARCHITECTURAL SAGE-GREEN PARTITION WALL WITH ROUNDED CORNERS & OAK CAP
// =========================================================================
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
  height = 1.65,
  thickness = 0.14,
  hasWoodCap = true,
}) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Contact Shadow strip underneath partition */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[length + 0.1, thickness + 0.2]} />
        <meshBasicMaterial color="#57534E" opacity={0.12} transparent />
      </mesh>

      {/* Main Sage-Green Panel (Acoustic Felt texture feel) */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, height, thickness]} />
        <meshStandardMaterial color="#829C86" roughness={0.75} />
      </mesh>

      {/* Rounded Corner End-Caps for Real Soft Architectural Curves */}
      <mesh position={[-length / 2, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[thickness / 2, thickness / 2, height, 16]} />
        <meshStandardMaterial color="#829C86" roughness={0.75} />
      </mesh>
      <mesh position={[length / 2, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[thickness / 2, thickness / 2, height, 16]} />
        <meshStandardMaterial color="#829C86" roughness={0.75} />
      </mesh>

      {/* Warm Natural Oak Top Cap with rounded bevel */}
      {hasWoodCap && (
        <group position={[0, height + 0.02, 0]}>
          <mesh castShadow>
            <boxGeometry args={[length + 0.04, 0.05, thickness + 0.04]} />
            <meshStandardMaterial color="#C19A6B" roughness={0.4} />
          </mesh>
          {/* Wood rounded ends */}
          <mesh position={[-length / 2 - 0.02, 0, 0]}>
            <cylinderGeometry args={[thickness / 2 + 0.02, thickness / 2 + 0.02, 0.05, 16]} />
            <meshStandardMaterial color="#A97D4F" roughness={0.4} />
          </mesh>
          <mesh position={[length / 2 + 0.02, 0, 0]}>
            <cylinderGeometry args={[thickness / 2 + 0.02, thickness / 2 + 0.02, 0.05, 16]} />
            <meshStandardMaterial color="#A97D4F" roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* Brushed Aluminum Base Kick Runner */}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[length + 0.02, 0.08, thickness + 0.02]} />
        <meshStandardMaterial color="#E8DEC8" roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  );
};

// =========================================================================
// 2. DETAILED NATURAL OAK WORKSTATION DESK WITH ACCESSORIES
// =========================================================================
export const DetailedWorkstationDesk: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  chairColor?: string;
  hasChair?: boolean;
  departmentType?: 'ba' | 'ai' | 'dev' | 'ux' | 'qa';
}> = ({
  position,
  rotation = [0, 0, 0],
  chairColor = '#2563EB',
  hasChair = true,
  departmentType = 'dev',
}) => {
  // Screen textures
  const screenTex = useMemo(() => {
    switch (departmentType) {
      case 'ba':
        return createScreenTexture('analyst');
      case 'ai':
        return createScreenTexture('ai');
      case 'ux':
        return createScreenTexture('design');
      case 'qa':
        return createScreenTexture('qa');
      default:
        return createScreenTexture('code');
    }
  }, [departmentType]);

  const secondaryScreenTex = useMemo(() => {
    return createScreenTexture('code');
  }, []);

  return (
    <group position={position} rotation={rotation}>
      {/* Contact Shadow beneath desk */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 1.4]} />
        <meshBasicMaterial color="#57534E" opacity={0.16} transparent />
      </mesh>

      {/* Light Natural Oak Desktop with Chamfered Edge */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 0.06, 1.15]} />
        <meshStandardMaterial color="#D8B589" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* Cable Grommet Cap */}
      <mesh position={[0.8, 0.785, -0.38]}>
        <cylinderGeometry args={[0.04, 0.04, 0.015, 16]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.7} />
      </mesh>

      {/* Modern Tubular Steel Desk Legs (Off-white / Warm Cream) */}
      <mesh position={[-1.02, 0.375, -0.45]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[1.02, 0.375, -0.45]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[-1.02, 0.375, 0.45]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[1.02, 0.375, 0.45]} castShadow>
        <boxGeometry args={[0.06, 0.75, 0.06]} />
        <meshStandardMaterial color="#F3EFE6" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Steel Bottom Stretcher Feet */}
      <mesh position={[-1.02, 0.02, 0]}>
        <boxGeometry args={[0.08, 0.04, 1.05]} />
        <meshStandardMaterial color="#E2D9CC" roughness={0.4} />
      </mesh>
      <mesh position={[1.02, 0.02, 0]}>
        <boxGeometry args={[0.08, 0.04, 1.05]} />
        <meshStandardMaterial color="#E2D9CC" roughness={0.4} />
      </mesh>

      {/* Oak Modesty / Privacy Panel */}
      <mesh position={[0, 0.48, -0.45]} castShadow>
        <boxGeometry args={[1.98, 0.36, 0.025]} />
        <meshStandardMaterial color="#C9A375" roughness={0.5} />
      </mesh>

      {/* Dual Curved Widescreen Monitors with Heavy Bases & Articulated Arms */}
      {/* Primary Left/Center Screen */}
      <group position={[-0.34, 0.78, -0.16]}>
        {/* Base */}
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.12, 0.025, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Arm */}
        <mesh position={[0, 0.18, -0.04]} castShadow>
          <boxGeometry args={[0.04, 0.36, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        {/* Display Enclosure */}
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.84, 0.48, 0.03]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Crisp Display Texture */}
        <mesh position={[0, 0.28, 0.018]}>
          <planeGeometry args={[0.8, 0.44]} />
          <meshBasicMaterial map={screenTex} />
        </mesh>
      </group>

      {/* Secondary Angled Screen */}
      <group position={[0.5, 0.78, -0.12]} rotation={[0, -0.24, 0]}>
        <mesh position={[0, 0.015, 0]} castShadow>
          <cylinderGeometry args={[0.11, 0.12, 0.025, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.18, -0.04]} castShadow>
          <boxGeometry args={[0.04, 0.36, 0.04]} />
          <meshStandardMaterial color="#334155" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.28, 0]} castShadow>
          <boxGeometry args={[0.76, 0.48, 0.03]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0, 0.28, 0.018]}>
          <planeGeometry args={[0.72, 0.44]} />
          <meshBasicMaterial map={secondaryScreenTex} />
        </mesh>
      </group>

      {/* Desktop Leather Mat */}
      <mesh position={[-0.04, 0.784, 0.2]}>
        <boxGeometry args={[0.88, 0.008, 0.38]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Mechanical Keyboard */}
      <mesh position={[-0.08, 0.792, 0.22]}>
        <boxGeometry args={[0.44, 0.014, 0.15]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.3} />
      </mesh>

      {/* Wireless Mouse */}
      <mesh position={[0.26, 0.792, 0.22]}>
        <boxGeometry args={[0.07, 0.018, 0.11]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} />
      </mesh>

      {/* Coffee Mug with Handle */}
      <group position={[0.7, 0.785, 0.18]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.11, 16]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        <mesh position={[0.05, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.03, 0.008, 8, 16]} />
          <meshStandardMaterial color="#FAF8F5" />
        </mesh>
      </group>

      {/* Notebook & Pen */}
      <group position={[-0.75, 0.784, 0.15]} rotation={[0, 0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.22, 0.012, 0.3]} />
          <meshStandardMaterial color="#D97706" roughness={0.7} />
        </mesh>
        <mesh position={[0.13, 0.008, 0]}>
          <boxGeometry args={[0.015, 0.012, 0.24]} />
          <meshStandardMaterial color="#0F172A" metalness={0.7} />
        </mesh>
      </group>

      {/* Modern Office Swivel Chair with 5-Star Caster Base & Mesh Back */}
      {hasChair && (
        <group position={[0, 0, 0.72]} rotation={[0, Math.PI, 0]}>
          {/* Contact shadow for chair */}
          <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.38, 16]} />
            <meshBasicMaterial color="#57534E" opacity={0.18} transparent />
          </mesh>

          {/* 5-Star Caster Base */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i * 2 * Math.PI) / 5;
            return (
              <group key={i} rotation={[0, angle, 0]}>
                <mesh position={[0.15, 0.08, 0]} castShadow>
                  <boxGeometry args={[0.28, 0.03, 0.04]} />
                  <meshStandardMaterial color="#334155" metalness={0.8} />
                </mesh>
                <mesh position={[0.28, 0.05, 0]}>
                  <sphereGeometry args={[0.03, 8, 8]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>
              </group>
            );
          })}

          {/* Pneumatic Cylinder */}
          <mesh position={[0, 0.26, 0]} castShadow>
            <cylinderGeometry args={[0.035, 0.035, 0.3, 12]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
          </mesh>

          {/* Ergonomic Seat Cushion */}
          <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.52, 0.09, 0.5]} />
            <meshStandardMaterial color={chairColor} roughness={0.7} />
          </mesh>

          {/* Mesh Backrest with Lumbar Curve */}
          <group position={[0, 0.82, -0.22]}>
            <mesh castShadow>
              <boxGeometry args={[0.46, 0.62, 0.05]} />
              <meshStandardMaterial color={chairColor} roughness={0.7} />
            </mesh>
            {/* Dark frame around mesh back */}
            <mesh position={[0, 0, -0.015]}>
              <boxGeometry args={[0.49, 0.65, 0.02]} />
              <meshStandardMaterial color="#1E293B" roughness={0.5} />
            </mesh>
          </group>

          {/* Adjustable Armrests */}
          <group position={[-0.26, 0.64, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.24, 0.04]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.07, 0.03, 0.26]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
          </group>
          <group position={[0.26, 0.64, 0]}>
            <mesh position={[0, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 0.24, 0.04]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            <mesh position={[0, 0.12, 0]}>
              <boxGeometry args={[0.07, 0.03, 0.26]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
          </group>
        </group>
      )}
    </group>
  );
};

// =========================================================================
// 3. CURVED SLATTED RECEPTION DESK WITH GOLDEN LED KICK & WHITE COUNTERTOP
// =========================================================================
export const CurvedReceptionDesk: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
}> = ({ position, rotation = [0, 0, 0] }) => {
  const terminalScreen = useMemo(() => createScreenTexture('laptop'), []);

  return (
    <group position={position} rotation={rotation}>
      {/* Contact Shadow on floor */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.3, 32]} />
        <meshBasicMaterial color="#57534E" opacity={0.18} transparent />
      </mesh>

      {/* Cylindrical Base with Vertical Warm Wood Slats */}
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.0, 2.0, 1.1, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#C49A6C" roughness={0.45} />
      </mesh>

      {/* 24 Modeled Oak Slats for crisp dimensional shadow detail */}
      {Array.from({ length: 24 }).map((_, idx) => {
        const angle = (idx / 23) * Math.PI;
        const x = Math.cos(angle) * 2.015;
        const z = Math.sin(angle) * 2.015;
        return (
          <mesh key={idx} position={[x, 0.55, z]} rotation={[0, -angle, 0]} castShadow>
            <boxGeometry args={[0.07, 1.06, 0.04]} />
            <meshStandardMaterial color="#A97D4F" roughness={0.4} />
          </mesh>
        );
      })}

      {/* Layered White Stone Countertop with Smooth Lip */}
      <mesh position={[0, 1.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.16, 2.16, 0.08, 36, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color="#FAF8F5" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Warm Golden LED Kick Line on the bottom edge */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[1.96, 1.96, 0.04, 32, 1, false, 0, Math.PI]} />
        <meshBasicMaterial color="#FDE047" />
      </mesh>

      {/* Receptionist Terminal Screen */}
      <group position={[0, 1.18, 0.35]}>
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.62, 0.4, 0.03]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0, 0.22, -0.018]}>
          <planeGeometry args={[0.56, 0.35]} />
          <meshBasicMaterial map={terminalScreen} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.08, 12]} />
          <meshStandardMaterial color="#64748B" metalness={0.8} />
        </mesh>
      </group>

      {/* Guest Bell & Desk Planter */}
      <group position={[-1.2, 1.16, 0.4]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.1, 0.08, 0.16, 16]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <sphereGeometry args={[0.11, 8, 8]} />
          <meshStandardMaterial color="#2E6F40" roughness={0.5} />
        </mesh>
      </group>
      <mesh position={[1.15, 1.18, 0.4]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.04, 16]} />
        <meshStandardMaterial color="#EAB308" metalness={0.85} roughness={0.2} />
      </mesh>
    </group>
  );
};

// =========================================================================
// 4. HANDCRAFTED STYLIZED PLANTS (LUSH BOTANICAL DETAILS)
// =========================================================================

// Single Sculpted Monstera Leaf Blade with stem
const MonsteraLeaf: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
  color?: string;
}> = ({ position, rotation, scale = 1, color = '#2E6F40' }) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Curved Petiole (Stem) */}
      <mesh position={[0, 0.18, 0]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.025, 0.42, 8]} />
        <meshStandardMaterial color="#1E5E32" roughness={0.6} />
      </mesh>
      {/* Broad Heart-Shaped Leaf Body */}
      <group position={[0, 0.42, 0.08]} rotation={[-0.4, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.34, 0.48, 0.015]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
        {/* Natural leaf tip */}
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.18, 0.18, 0.014]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

// Fiddle Leaf Fig Oval Leaf
const FicusLeaf: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: number;
}> = ({ position, rotation, scale = 1 }) => {
  return (
    <group position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.02, 0.4, 6]} />
        <meshStandardMaterial color="#1D4E2B" />
      </mesh>
      <mesh position={[0, 0.4, 0.06]} rotation={[-0.3, 0, 0]} castShadow>
        <sphereGeometry args={[0.22, 12, 8]} />
        <meshStandardMaterial color="#2E6F40" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Snake plant upright sword blade
const SnakeBlade: React.FC<{
  position: [number, number, number];
  rotation: [number, number, number];
  height?: number;
}> = ({ position, rotation, height = 0.8 }) => {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={[0.08, height, 0.02]} />
      <meshStandardMaterial color="#2E6F40" roughness={0.7} />
    </mesh>
  );
};

// Architectural Potted Plant with Multiple Species Options
export const ArchitecturalPlant: React.FC<{
  position: [number, number, number];
  scale?: number;
  planterType?: 'terracotta' | 'brass' | 'ceramic';
  plantType?: 'monstera' | 'ficus' | 'snake';
}> = ({
  position,
  scale = 1,
  planterType = 'terracotta',
  plantType = 'monstera',
}) => {
  const potColor =
    planterType === 'brass'
      ? '#D4AF37'
      : planterType === 'ceramic'
      ? '#FAF8F5'
      : '#C86D48';

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Soft Contact Shadow beneath planter */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.48, 20]} />
        <meshBasicMaterial color="#57534E" opacity={0.2} transparent />
      </mesh>

      {/* Planter Pot with Rim */}
      <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.36, 0.26, 0.76, 24]} />
        <meshStandardMaterial
          color={potColor}
          roughness={planterType === 'brass' ? 0.25 : 0.6}
          metalness={planterType === 'brass' ? 0.75 : 0.05}
        />
      </mesh>
      {/* Pot Lip */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.36, 0.06, 24]} />
        <meshStandardMaterial color={potColor} roughness={0.5} />
      </mesh>

      {/* Soil Bed */}
      <mesh position={[0, 0.74, 0]}>
        <circleGeometry args={[0.34, 16]} />
        <meshStandardMaterial color="#3D2817" roughness={0.9} />
      </mesh>

      {/* Leaves according to plant type */}
      {plantType === 'monstera' && (
        <group position={[0, 0.75, 0]}>
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.05, 0.6, 8]} />
            <meshStandardMaterial color="#4A3525" roughness={0.8} />
          </mesh>
          <MonsteraLeaf position={[0.14, 0.1, 0.12]} rotation={[0.3, 0.4, 0.3]} scale={1.05} color="#2E6F40" />
          <MonsteraLeaf position={[-0.16, 0.15, -0.1]} rotation={[-0.2, -0.6, -0.3]} scale={1.1} color="#1E5E32" />
          <MonsteraLeaf position={[0.1, 0.35, -0.15]} rotation={[-0.3, 0.8, 0.2]} scale={1.15} color="#3B8246" />
          <MonsteraLeaf position={[-0.12, 0.45, 0.14]} rotation={[0.4, -0.4, -0.2]} scale={1.0} color="#2E6F40" />
          <MonsteraLeaf position={[0.02, 0.6, -0.02]} rotation={[0.1, 0.2, 0.1]} scale={0.9} color="#4ADE80" />
          <MonsteraLeaf position={[-0.05, 0.3, -0.18]} rotation={[-0.4, -0.2, 0.4]} scale={0.95} color="#2E6F40" />
        </group>
      )}

      {plantType === 'ficus' && (
        <group position={[0, 0.75, 0]}>
          {/* Main trunk */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.07, 1.2, 8]} />
            <meshStandardMaterial color="#5C4033" roughness={0.8} />
          </mesh>
          <FicusLeaf position={[0.12, 0.3, 0.1]} rotation={[0.2, 0.5, 0.2]} scale={1.1} />
          <FicusLeaf position={[-0.15, 0.45, -0.1]} rotation={[-0.2, -0.8, -0.2]} scale={1.15} />
          <FicusLeaf position={[0.1, 0.7, -0.12]} rotation={[-0.3, 0.4, 0.2]} scale={1.2} />
          <FicusLeaf position={[-0.12, 0.85, 0.12]} rotation={[0.3, -0.5, -0.1]} scale={1.1} />
          <FicusLeaf position={[0.0, 1.15, 0.0]} rotation={[0.1, 0.1, 0]} scale={1.05} />
        </group>
      )}

      {plantType === 'snake' && (
        <group position={[0, 0.75, 0]}>
          <SnakeBlade position={[0, 0.45, 0]} rotation={[0, 0.1, 0]} height={0.9} />
          <SnakeBlade position={[0.08, 0.35, 0.06]} rotation={[0.1, 0.4, -0.1]} height={0.7} />
          <SnakeBlade position={[-0.08, 0.38, -0.05]} rotation={[-0.1, -0.3, 0.1]} height={0.75} />
          <SnakeBlade position={[-0.07, 0.4, 0.07]} rotation={[0.1, -0.5, 0.15]} height={0.8} />
          <SnakeBlade position={[0.07, 0.42, -0.07]} rotation={[-0.1, 0.6, -0.15]} height={0.82} />
        </group>
      )}
    </group>
  );
};

// =========================================================================
// 5. RECEPTION LOUNGE AREA WITH JUTE RUG, SOFA, ARMCHAIRS & OAK TABLE
// =========================================================================
export const ReceptionLoungeArea: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  return (
    <group position={position}>
      {/* Round Natural Woven Jute Rug with Concentric Texture Rings */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.2, 48]} />
        <meshStandardMaterial color="#DECBB5" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.05, 48]} />
        <meshBasicMaterial color="#C5B198" />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.0, 1.05, 48]} />
        <meshBasicMaterial color="#C5B198" />
      </mesh>

      {/* Light Cream / Beige 3-Seater Sofa (North side of lounge circle) */}
      <group position={[0, 0, -1.2]} rotation={[0, 0, 0]}>
        {/* Soft shadow */}
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 1.1]} />
          <meshBasicMaterial color="#57534E" opacity={0.16} transparent />
        </mesh>

        {/* Seat Base Cushion */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.32, 0.85]} />
          <meshStandardMaterial color="#ECE4D8" roughness={0.8} />
        </mesh>
        {/* Backrest Cushion */}
        <mesh position={[0, 0.74, -0.35]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.22]} />
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
              <cylinderGeometry args={[0.03, 0.02, 0.24, 12]} />
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

      {/* Round Solid Oak Coffee Table with Tabletop Succulent */}
      <group position={[0, 0, 0.2]}>
        <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.06, 32]} />
          <meshStandardMaterial color="#C89B6D" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.14, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.14, 0.26, 16]} />
          <meshStandardMaterial color="#A07248" roughness={0.5} />
        </mesh>
        {/* Tabletop Ceramic Planter */}
        <mesh position={[0, 0.33, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.09, 0.08, 16]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
        </mesh>
        {/* Succulent Petal Rosettes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.04, 0.38, Math.sin(angle) * 0.04]}
              rotation={[0.3, angle, 0]}
            >
              <boxGeometry args={[0.04, 0.015, 0.06]} />
              <meshStandardMaterial color="#22C55E" roughness={0.6} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// =========================================================================
// 6. MINIMALIST OVERHEAD CEILING PENDANTS & TRACK LIGHTING
// =========================================================================
export const OverheadCeilingPendants: React.FC<{
  position: [number, number, number];
  radius?: number;
}> = ({ position, radius = 0.7 }) => {
  return (
    <group position={position}>
      {/* Ceiling canopy disc */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.03, 16]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      {/* Slender cord */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.2, 8]} />
        <meshStandardMaterial color="#0F172A" />
      </mesh>
      {/* Warm Golden Ring Pendant (Nordic modern lighting) */}
      <mesh position={[0, -1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.025, 12, 32]} />
        <meshStandardMaterial
          color="#FEF08A"
          emissive="#FDE047"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <pointLight position={[0, -1.25, 0]} intensity={0.65} color="#FEF3C7" distance={6} />
    </group>
  );
};

// =========================================================================
// 7. PLANTER DIVIDER BOX WITH LOW DENSE GREENERY
// =========================================================================
export const PlanterDividerBox: React.FC<{
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
}> = ({ position, rotation = [0, 0, 0], length = 3.2 }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Oak trough container */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[length, 0.6, 0.44]} />
        <meshStandardMaterial color="#C19A6B" roughness={0.4} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.58, 0]}>
        <boxGeometry args={[length - 0.08, 0.04, 0.36]} />
        <meshStandardMaterial color="#3D2817" roughness={0.9} />
      </mesh>
      {/* Foliage mounds */}
      {Array.from({ length: Math.round(length / 0.55) }).map((_, i) => {
        const x = -length / 2 + 0.3 + i * 0.55;
        return (
          <group key={i} position={[x, 0.68, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.22, 10, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#2E6F40' : '#3B8246'} roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};
