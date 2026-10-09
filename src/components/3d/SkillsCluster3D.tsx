import React, { useState, useMemo } from 'react';
import { SKILL_DEPARTMENTS } from '../../data/portfolioData';
import { useOffice } from '../../context/OfficeContext';
import { Department } from '../../types/office';
import { DetailedWorkstationDesk, SagePartition, ArchitecturalPlant } from './OfficeFurniture';
import { StylizedCharacter } from './CharacterModel';
import { createSignTexture } from '../../utils/textureGenerator';

// Individual Department Cubicle Pod with Department Storytelling Props
const DepartmentPod: React.FC<{
  dept: Department;
  isHovered: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}> = ({ dept, isHovered, onClick, onPointerOver, onPointerOut }) => {
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

  // Crisp Signboard Texture
  const signTexture = useMemo(() => {
    return createSignTexture(
      dept.shortName.toUpperCase(),
      'Station · Click to View',
      '#FAF8F5',
      '#1E293B',
      dept.color
    );
  }, [dept]);

  return (
    <group
      position={dept.gridPos}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onPointerOver();
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        onPointerOut();
      }}
    >
      {/* Soft Contact Floor Area */}
      {isHovered && (
        <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial color="#86EFAC" opacity={0.25} transparent />
        </mesh>
      )}

      {/* Surrounding Sage-Green Rounded Partitions */}
      <SagePartition position={[0, 0, -1.35]} length={3.2} height={1.65} />
      <SagePartition
        position={[-1.6, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        length={2.6}
        height={1.65}
      />

      {/* White Overhead Signboard Plaque on Partition with Legible Typography */}
      <group position={[0, 1.84, -1.34]}>
        <mesh castShadow>
          <boxGeometry args={[2.0, 0.42, 0.05]} />
          <meshStandardMaterial
            color="#FAF8F5"
            roughness={0.25}
            emissive={isHovered ? '#86EFAC' : '#000000'}
            emissiveIntensity={isHovered ? 0.35 : 0}
          />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.92, 0.38]} />
          <meshBasicMaterial map={signTexture} />
        </mesh>
      </group>

      {/* Detailed Workstation Desk & Dual Glowing Monitors */}
      <DetailedWorkstationDesk
        position={[0, 0, -0.4]}
        chairColor={chairColor}
        departmentType={dept.id as 'ba' | 'ai' | 'dev' | 'ux' | 'qa'}
      />

      {/* Seated Specialist Character */}
      <StylizedCharacter
        position={[0, 0, 0.32]}
        rotation={[0, Math.PI, 0]}
        role={charRole}
        isSeated={true}
        isWaving={false}
      />

      {/* Department-Specific Storytelling Wall & Prop Elements */}
      {dept.id === 'ba' && (
        // Business Analyst: Requirements Board, Flowchart Diagram, Sticky Notes
        <group position={[0.7, 1.1, -1.27]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.65, 0.02]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.7} />
          </mesh>
          {/* Kanban / Flowchart Rows */}
          <mesh position={[-0.3, 0.14, 0.015]}>
            <planeGeometry args={[0.24, 0.22]} />
            <meshBasicMaterial color="#FEF08A" />
          </mesh>
          <mesh position={[0.0, 0.14, 0.015]}>
            <planeGeometry args={[0.24, 0.22]} />
            <meshBasicMaterial color="#BAE6FD" />
          </mesh>
          <mesh position={[0.3, 0.14, 0.015]}>
            <planeGeometry args={[0.24, 0.22]} />
            <meshBasicMaterial color="#BBF7D0" />
          </mesh>
          {/* Workflow Connector Line */}
          <mesh position={[0, -0.15, 0.015]}>
            <planeGeometry args={[0.85, 0.08]} />
            <meshBasicMaterial color="#94A3B8" />
          </mesh>
        </group>
      )}

      {dept.id === 'ai' && (
        // AI & Automation: Server Rack Tower & Neural Network Diagram
        <group>
          <group position={[0.7, 1.1, -1.27]}>
            <mesh castShadow>
              <boxGeometry args={[1.0, 0.6, 0.02]} />
              <meshStandardMaterial color="#0F172A" />
            </mesh>
            {/* Glowing Neural Network Node Dots */}
            {[-0.3, 0, 0.3].map((x, i) =>
              [-0.15, 0.15].map((y, j) => (
                <mesh key={`${i}-${j}`} position={[x, y, 0.015]}>
                  <circleGeometry args={[0.035, 8]} />
                  <meshBasicMaterial color="#38BDF8" />
                </mesh>
              ))
            )}
          </group>
          {/* Mini Server Tower Beside Desk */}
          <group position={[-1.25, 0, 0.6]}>
            <mesh position={[0, 0.35, 0]} castShadow>
              <boxGeometry args={[0.28, 0.7, 0.5]} />
              <meshStandardMaterial color="#1E293B" metalness={0.7} />
            </mesh>
            <mesh position={[0.145, 0.5, 0]}>
              <boxGeometry args={[0.01, 0.04, 0.3]} />
              <meshBasicMaterial color="#10B981" />
            </mesh>
          </group>
        </group>
      )}

      {dept.id === 'dev' && (
        // Development: Technical Reference Books & Git Architecture Board
        <group>
          <group position={[0.7, 1.1, -1.27]}>
            <mesh castShadow>
              <boxGeometry args={[1.0, 0.6, 0.02]} />
              <meshStandardMaterial color="#1E293B" />
            </mesh>
            <mesh position={[0, 0, 0.015]}>
              <planeGeometry args={[0.9, 0.5]} />
              <meshBasicMaterial color="#0284C7" />
            </mesh>
          </group>
          {/* Stack of Technical Books on Filing Shelf */}
          <group position={[-1.25, 0, 0.6]}>
            <mesh position={[0, 0.4, 0]} castShadow>
              <boxGeometry args={[0.34, 0.8, 0.65]} />
              <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
            </mesh>
            {[0.5, 0.6, 0.7].map((y, idx) => (
              <mesh key={idx} position={[0, y, 0]} castShadow>
                <boxGeometry args={[0.26, 0.08, 0.5]} />
                <meshStandardMaterial color={idx === 0 ? '#DC2626' : idx === 1 ? '#2563EB' : '#16A34A'} />
              </mesh>
            ))}
          </group>
        </group>
      )}

      {dept.id === 'ux' && (
        // UI/UX: Design Canvas with Wireframe Mockups & Color Swatch Cards
        <group position={[0.7, 1.1, -1.27]}>
          <mesh castShadow>
            <boxGeometry args={[1.1, 0.65, 0.02]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.8} />
          </mesh>
          {/* UI Mobile Mockups */}
          <mesh position={[-0.3, 0.05, 0.015]}>
            <planeGeometry args={[0.26, 0.44]} />
            <meshBasicMaterial color="#F43F5E" />
          </mesh>
          <mesh position={[0.02, 0.05, 0.015]}>
            <planeGeometry args={[0.26, 0.44]} />
            <meshBasicMaterial color="#8B5CF6" />
          </mesh>
          {/* Color Swatch Strips */}
          <mesh position={[0.34, 0.16, 0.015]}>
            <planeGeometry args={[0.18, 0.12]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
          <mesh position={[0.34, 0.0, 0.015]}>
            <planeGeometry args={[0.18, 0.12]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      )}

      {dept.id === 'qa' && (
        // QA: Automated Testing Checklist & Bug Triage Card
        <group position={[0.7, 1.1, -1.27]}>
          <mesh castShadow>
            <boxGeometry args={[1.05, 0.62, 0.02]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.8} />
          </mesh>
          <mesh position={[-0.2, 0.12, 0.015]}>
            <planeGeometry args={[0.4, 0.16]} />
            <meshBasicMaterial color="#22C55E" />
          </mesh>
          <mesh position={[0.25, 0.12, 0.015]}>
            <planeGeometry args={[0.3, 0.16]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <mesh position={[0, -0.12, 0.015]}>
            <planeGeometry args={[0.85, 0.18]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>
        </group>
      )}

      {/* Side Filing Unit */}
      <group position={[-1.25, 0, 0.7]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[0.34, 0.8, 0.65]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
        </mesh>
        <mesh position={[0.02, 0.55, 0]}>
          <boxGeometry args={[0.24, 0.22, 0.54]} />
          <meshStandardMaterial color="#0284C7" />
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
      {/* 5 Distinct Department Workstations with Storytelling */}
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

      {/* Varied Sculpted Plants around Skills Perimeter */}
      <ArchitecturalPlant position={[-16.5, 0, -1]} scale={1.25} planterType="terracotta" plantType="monstera" />
      <ArchitecturalPlant position={[-5.8, 0, -6.5]} scale={1.05} planterType="brass" plantType="ficus" />
      <ArchitecturalPlant position={[-5.8, 0, 4.5]} scale={1.05} planterType="terracotta" plantType="snake" />
      <ArchitecturalPlant position={[-11, 0, 6.2]} scale={1.15} planterType="ceramic" plantType="monstera" />
    </group>
  );
};
