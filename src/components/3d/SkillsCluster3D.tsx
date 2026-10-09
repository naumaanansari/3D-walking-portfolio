import React, { useState } from 'react';
import { SKILL_DEPARTMENTS } from '../../data/portfolioData';
import { useOffice } from '../../context/OfficeContext';
import { Department } from '../../types/office';
import { NaturalWoodDesk, SagePartition, ArchitecturalPlant } from './OfficeFurniture';
import { StylizedCharacter } from './CharacterModel';

// Individual Department Cubicle Pod with Sage-Green Partitions & Overhead Signboard
const DepartmentPod: React.FC<{
  dept: Department;
  isHovered: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}> = ({ dept, isHovered, onClick, onPointerOver, onPointerOut }) => {
  // Map department to character role and chair color
  let charRole: 'analyst' | 'dev' | 'designer' | 'visitor' = 'dev';
  let chairColor = '#2563EB';

  switch (dept.id) {
    case 'ba':
      charRole = 'analyst';
      chairColor = '#1D4ED8';
      break;
    case 'ai':
      charRole = 'analyst';
      chairColor = '#EA580C';
      break;
    case 'dev':
      charRole = 'dev';
      chairColor = '#15803D';
      break;
    case 'ux':
      charRole = 'designer';
      chairColor = '#06B6D4'; // Cyan chair from reference image
      break;
    case 'qa':
      charRole = 'dev';
      chairColor = '#2563EB';
      break;
  }

  return (
    <group
      position={dept.gridPos}
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
      {/* Soft Hover Floor Highlight */}
      {isHovered && (
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.4, 3.4]} />
          <meshBasicMaterial color="#86EFAC" opacity={0.25} transparent />
        </mesh>
      )}

      {/* Surrounding Sage-Green Rounded Partitions */}
      {/* North / Back partition */}
      <SagePartition position={[0, 0, -1.35]} length={3.2} height={1.65} />
      {/* West / Left partition */}
      <SagePartition
        position={[-1.6, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        length={2.6}
        height={1.65}
      />

      {/* White Overhead Signboard Plaque on Partition with department name */}
      <group position={[0, 1.82, -1.34]}>
        <mesh castShadow>
          <boxGeometry args={[2.0, 0.38, 0.05]} />
          <meshStandardMaterial
            color="#FAF8F5"
            roughness={0.2}
            emissive={isHovered ? '#86EFAC' : '#000000'}
            emissiveIntensity={isHovered ? 0.35 : 0}
          />
        </mesh>
        {/* Signboard Border Ring */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.92, 0.3]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Natural Oak Desk & Monitors */}
      <NaturalWoodDesk position={[0, 0, -0.4]} chairColor={chairColor} />

      {/* Seated Developer / Specialist Character */}
      <StylizedCharacter
        position={[0, 0, 0.3]}
        rotation={[0, Math.PI, 0]}
        role={charRole}
        isSeated={true}
        isWaving={false}
      />

      {/* Pinboard Notes / Architecture Diagrams on Back Partition */}
      <group position={[0.7, 1.1, -1.27]}>
        <mesh>
          <planeGeometry args={[0.9, 0.55]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
        </mesh>
        {/* Sticky note accents */}
        <mesh position={[-0.25, 0.1, 0.01]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#FEF08A" />
        </mesh>
        <mesh position={[0.1, 0.1, 0.01]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#86EFAC" />
        </mesh>
        <mesh position={[-0.1, -0.12, 0.01]}>
          <planeGeometry args={[0.35, 0.16]} />
          <meshBasicMaterial color="#93C5FD" />
        </mesh>
      </group>

      {/* Small Book / Filing Rack beside desk */}
      <group position={[-1.25, 0, 0.7]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[0.35, 0.9, 0.7]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
        </mesh>
        <mesh position={[0.02, 0.6, 0]}>
          <boxGeometry args={[0.26, 0.24, 0.58]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
      </group>
    </group>
  );
};

export const SkillsCluster3D: React.FC = () => {
  const { openDepartmentDetail } = useOffice();
  const [hoveredDeptId, setHoveredDeptId] = useState<string | null>(null);

  return (
    <group>
      {/* 5 Distinct Department Workstations exactly positioned per reference image */}
      {SKILL_DEPARTMENTS.map((dept) => (
        <DepartmentPod
          key={dept.id}
          dept={dept}
          isHovered={hoveredDeptId === dept.id}
          onClick={() => openDepartmentDetail(dept)}
          onPointerOver={() => setHoveredDeptId(dept.id)}
          onPointerOut={() => setHoveredDeptId(null)}
        />
      ))}

      {/* Architectural Potted Plants around Skills Perimeter */}
      <ArchitecturalPlant position={[-16.5, 0, -1]} scale={1.2} planterType="terracotta" />
      <ArchitecturalPlant position={[-5.8, 0, -6.5]} scale={1.0} planterType="brass" />
      <ArchitecturalPlant position={[-5.8, 0, 4.5]} scale={1.0} planterType="terracotta" />
      <ArchitecturalPlant position={[-11, 0, 6.2]} scale={1.1} planterType="ceramic" />
    </group>
  );
};
