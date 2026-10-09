import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOffice } from '../../context/OfficeContext';
import { StylizedCharacter } from './CharacterModel';
import {
  CurvedReceptionDesk,
  ReceptionLoungeArea,
  NaturalWoodDesk,
  ArchitecturalPlant,
  SagePartition,
} from './OfficeFurniture';
import { TrophyShelf3D } from './TrophyShelf3D';
import { FeedbackBoard3D } from './FeedbackBoard3D';
import { SkillsCluster3D } from './SkillsCluster3D';
import { SurpriseBox3D } from './SurpriseBox3D';

export const OfficeWorld3D: React.FC = () => {
  const { currentScene, hasEnteredOffice } = useOffice();
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  // Animate entrance sliding doors
  useFrame(() => {
    const doorsOpen = hasEnteredOffice || currentScene !== 'entrance';
    const targetOffset = doorsOpen ? 2.2 : 0;

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x = THREE.MathUtils.lerp(
        leftDoorRef.current.position.x,
        -targetOffset,
        0.06
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x = THREE.MathUtils.lerp(
        rightDoorRef.current.position.x,
        targetOffset,
        0.06
      );
    }
  });

  return (
    <group>
      {/* =========================================================================
          1. MAIN POLISHED STONE FLOOR & CURVED INLAYS
         ========================================================================= */}
      {/* Main Cream / Ivory Polished Floor */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[44, 0.1, 44]} />
        <meshStandardMaterial color="#F5EFE6" roughness={0.5} metalness={0.05} />
      </mesh>

      {/* Skills Area Curved Wood Inlay Floor Boundary (from reference image) */}
      <mesh position={[-11, 0.002, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 16]} />
        <meshStandardMaterial color="#EFE7DA" roughness={0.6} />
      </mesh>

      {/* =========================================================================
          2. ARCHITECTURAL EXTERIOR WALLS & PANORAMIC SUNLIT WINDOWS
         ========================================================================= */}
      {/* North Wall with Floor-to-Ceiling Panoramic Windows */}
      <group position={[0, 3.2, -18]}>
        {/* Upper Wall Header */}
        <mesh position={[0, 2.6, 0]} castShadow>
          <boxGeometry args={[40, 1.2, 0.3]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
        </mesh>
        {/* Window Pillars */}
        {[-16, -8, 0, 8, 16].map((x) => (
          <mesh key={x} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.5, 4.4, 0.28]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.5} />
          </mesh>
        ))}
        {/* Exterior Sunlit Foliage & Skyline Backdrop behind glass */}
        <mesh position={[0, 0, -0.6]}>
          <planeGeometry args={[42, 6]} />
          <meshBasicMaterial color="#C5E2CE" />
        </mesh>
        {/* Glass Panes */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[38, 4.2]} />
          <meshPhysicalMaterial
            color="#E0F2FE"
            transmission={0.9}
            opacity={0.3}
            transparent
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* East Wall with Large Windows (behind CEO Cabin & Surprise Area) */}
      <group position={[20, 3.2, 0]}>
        <mesh position={[0, 2.6, 0]} castShadow>
          <boxGeometry args={[0.3, 1.2, 38]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
        </mesh>
        {/* East Glass Panes */}
        <mesh position={[-0.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[36, 4.2]} />
          <meshPhysicalMaterial
            color="#E0F2FE"
            transmission={0.9}
            opacity={0.3}
            transparent
            roughness={0.1}
          />
        </mesh>
        {/* Exterior Green Trees Backdrop */}
        <mesh position={[0.6, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[38, 6]} />
          <meshBasicMaterial color="#BADCC4" />
        </mesh>
      </group>

      {/* West Low Wall & Planter Terrace */}
      <group position={[-19, 0, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 36]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
        </mesh>
      </group>

      {/* =========================================================================
          3. ENTRANCE TERRACE, PLANTER BOXES & SLIDING GLASS DOORS
         ========================================================================= */}
      <group position={[-3, 0, 14]}>
        {/* Outdoor Terracotta Planter Box with Colorful Flowers */}
        <group position={[-4.5, 0, 1]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.2, 0.8, 1.2]} />
            <meshStandardMaterial color="#D4AF8B" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[3.0, 0.05, 1.0]} />
            <meshStandardMaterial color="#3D2817" />
          </mesh>
          {/* Flower Clusters (Red & Yellow Blooms from reference image) */}
          {[-1.0, -0.4, 0.2, 0.8, 1.2].map((x, i) => (
            <mesh key={i} position={[x, 1.0, (i % 2 === 0 ? -0.2 : 0.2)]} castShadow>
              <sphereGeometry args={[0.24, 8, 8]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? '#EF4444' : '#F59E0B'}
                roughness={0.6}
              />
            </mesh>
          ))}
        </group>

        {/* Entrance Door Frame */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 2.4, 0]} castShadow>
            <boxGeometry args={[4.8, 0.16, 0.3]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[-2.3, 1.2, 0]} castShadow>
            <boxGeometry args={[0.16, 2.4, 0.3]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh position={[2.3, 1.2, 0]} castShadow>
            <boxGeometry args={[0.16, 2.4, 0.3]} />
            <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.7} />
          </mesh>

          {/* Left Sliding Door Leaf */}
          <group ref={leftDoorRef} position={[0, 1.2, 0]}>
            <mesh position={[-1.1, 0, 0]} castShadow>
              <boxGeometry args={[2.1, 2.3, 0.06]} />
              <meshPhysicalMaterial
                color="#E0F2FE"
                transmission={0.85}
                opacity={0.4}
                transparent
                roughness={0.1}
              />
            </mesh>
            <mesh position={[-0.15, 0, 0]} castShadow>
              <boxGeometry args={[0.06, 0.7, 0.12]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
            </mesh>
          </group>

          {/* Right Sliding Door Leaf */}
          <group ref={rightDoorRef} position={[0, 1.2, 0]}>
            <mesh position={[1.1, 0, 0]} castShadow>
              <boxGeometry args={[2.1, 2.3, 0.06]} />
              <meshPhysicalMaterial
                color="#E0F2FE"
                transmission={0.85}
                opacity={0.4}
                transparent
                roughness={0.1}
              />
            </mesh>
            <mesh position={[0.15, 0, 0]} castShadow>
              <boxGeometry args={[0.06, 0.7, 0.12]} />
              <meshStandardMaterial color="#CBD5E1" metalness={0.9} />
            </mesh>
          </group>
        </group>
      </group>

      {/* =========================================================================
          4. RECEPTION DESK, RECEPTIONIST & VISITOR
         ========================================================================= */}
      {/* Curved Wood-Slat Reception Counter */}
      <CurvedReceptionDesk position={[-3, 0, 7.5]} />

      {/* Elena · Friendly Receptionist sitting behind desk in vibrant purple suit */}
      <StylizedCharacter
        position={[-3, 0, 6.7]}
        role="receptionist"
        isSeated={true}
        isWaving={currentScene === 'reception'}
      />

      {/* Guest Visitor standing in front of reception desk in royal blue suit */}
      <StylizedCharacter
        position={[-1.6, 0, 9.2]}
        rotation={[0, -Math.PI / 4, 0]}
        role="visitor"
        isSeated={false}
        isWaving={false}
      />

      {/* Potted trees flanking the reception desk */}
      <ArchitecturalPlant position={[-5.8, 0, 7.8]} scale={1.25} planterType="brass" />
      <ArchitecturalPlant position={[-0.2, 0, 6.8]} scale={1.15} planterType="terracotta" />

      {/* =========================================================================
          5. RECEPTION LOUNGE AREA (Round Rug, Cream Sofa, 4 Armchairs, Coffee Table)
         ========================================================================= */}
      <ReceptionLoungeArea position={[5.2, 0, 8.2]} />
      {/* Large Potted Trees around the lounge circle */}
      <ArchitecturalPlant position={[9.2, 0, 8.5]} scale={1.3} planterType="terracotta" />
      <ArchitecturalPlant position={[5.2, 0, 12.2]} scale={1.1} planterType="brass" />

      {/* =========================================================================
          6. SKILLS DEPARTMENT (5 Sage-Green Pods in West Wing)
         ========================================================================= */}
      <SkillsCluster3D />

      {/* =========================================================================
          7. CAREER TROPHY DISPLAY (Built into Central Divider Wall)
         ========================================================================= */}
      <TrophyShelf3D position={[-0.5, 0, -3.2]} />

      {/* =========================================================================
          8. HR / EDUCATION WORKSTATION (North Center Behind Trophy Wall)
         ========================================================================= */}
      <group position={[1.5, 0, -8.8]}>
        {/* Sage-Green Wall with Overhead White Signboard */}
        <mesh position={[0, 1.85, -1.8]} castShadow receiveShadow>
          <boxGeometry args={[4.4, 3.2, 0.14]} />
          <meshStandardMaterial color="#829C86" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.48, -1.8]} castShadow>
          <boxGeometry args={[4.46, 0.06, 0.18]} />
          <meshStandardMaterial color="#C19A6B" roughness={0.4} />
        </mesh>

        {/* Overhead Signboard ("HR / Education") */}
        <group position={[0, 3.15, -1.72]}>
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.36, 0.04]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[2.12, 0.28]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>

        {/* Framed Diplomas on the Sage-Green Wall */}
        {[-1.2, 0, 1.2].map((x, i) => (
          <group key={i} position={[x, 2.2, -1.72]}>
            <mesh castShadow>
              <boxGeometry args={[0.5, 0.62, 0.03]} />
              <meshStandardMaterial color="#A07248" />
            </mesh>
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[0.44, 0.56]} />
              <meshStandardMaterial color="#FAF8F5" roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* HR Desk & Seated Characters (HR Officer in purple suit + Candidate in blue on yellow chair) */}
        <NaturalWoodDesk position={[0, 0, -0.6]} chairColor="#9333EA" />
        <StylizedCharacter
          position={[0, 0, 0.1]}
          role="hr"
          isSeated={true}
          isWaving={currentScene === 'education'}
        />

        {/* Tall Wooden Bookcase filled with colorful books (right behind desk) */}
        <group position={[2.6, 0, -0.6]}>
          <mesh position={[0, 1.6, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.7, 3.2, 1.6]} />
            <meshStandardMaterial color="#966F44" roughness={0.4} />
          </mesh>
          {/* Books on Shelves */}
          {[0.8, 1.5, 2.2, 2.9].map((y, idx) => (
            <mesh key={idx} position={[-0.2, y, 0]} castShadow>
              <boxGeometry args={[0.25, 0.32, 1.3]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#3B82F6' : '#10B981'}
                roughness={0.7}
              />
            </mesh>
          ))}
        </group>

        <ArchitecturalPlant position={[-2.4, 0, -0.5]} scale={1.1} planterType="brass" />
      </group>

      {/* =========================================================================
          9. FEEDBACK ROOM / WALL & SEATING NOOK
         ========================================================================= */}
      <FeedbackBoard3D position={[8.2, 0, -4.2]} />

      {/* =========================================================================
          10. SURPRISE ALCOVE & GLOWING GIFT BOX
         ========================================================================= */}
      <SurpriseBox3D position={[13.5, 0, 1.0]} />

      {/* =========================================================================
          11. CEO EXECUTIVE CABIN (North-East Private Glass Suite)
         ========================================================================= */}
      <group position={[13.0, 0, -11.0]}>
        {/* Glass Sliding Entrance Wall & Wood Frame */}
        <mesh position={[-4.5, 1.8, 0]} castShadow>
          <boxGeometry args={[0.1, 3.6, 6.0]} />
          <meshPhysicalMaterial
            color="#E0F2FE"
            transmission={0.88}
            opacity={0.35}
            transparent
            roughness={0.1}
          />
        </mesh>
        <mesh position={[-4.5, 1.8, 3.0]} castShadow>
          <boxGeometry args={[0.14, 3.6, 0.14]} />
          <meshStandardMaterial color="#B8860B" roughness={0.4} />
        </mesh>

        {/* Large Walnut Executive Desk (matching reference image) */}
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.78, 0]} castShadow receiveShadow>
            <boxGeometry args={[3.4, 0.1, 1.5]} />
            <meshStandardMaterial color="#6B4226" roughness={0.3} />
          </mesh>
          <mesh position={[-1.5, 0.38, 0]} castShadow>
            <boxGeometry args={[0.12, 0.76, 1.3]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
          </mesh>
          <mesh position={[1.5, 0.38, 0]} castShadow>
            <boxGeometry args={[0.12, 0.76, 1.3]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.4} />
          </mesh>

          {/* Laptop, Desk Lamp & Accessories */}
          <mesh position={[-0.1, 0.84, 0]} castShadow>
            <boxGeometry args={[0.55, 0.02, 0.38]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
        </group>

        {/* Executive High-Back Chair */}
        <group position={[0, 0, -0.9]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <boxGeometry args={[0.65, 0.12, 0.6]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
          <mesh position={[0, 1.05, -0.26]} castShadow>
            <boxGeometry args={[0.62, 1.0, 0.12]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
        </group>

        {/* Nauman Ansari (CEO) sitting behind executive desk in sharp tailored navy suit */}
        <StylizedCharacter
          position={[0, 0, -0.2]}
          role="nauman"
          isSeated={true}
          isWaving={currentScene === 'ceo'}
        />

        {/* Two Client Armchairs in front of executive desk */}
        <group position={[-0.9, 0, 1.2]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.28, 0.68]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.65, -0.26]} castShadow>
            <boxGeometry args={[0.68, 0.42, 0.14]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
        </group>
        <group position={[0.9, 0, 1.2]} rotation={[0, Math.PI, 0]}>
          <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.68, 0.28, 0.68]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.65, -0.26]} castShadow>
            <boxGeometry args={[0.68, 0.42, 0.14]} />
            <meshStandardMaterial color="#1E293B" roughness={0.7} />
          </mesh>
        </group>

        {/* Executive Credenza / Shelf Behind Desk */}
        <mesh position={[0, 1.2, -2.6]} castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.4, 0.6]} />
          <meshStandardMaterial color="#7A4E2D" roughness={0.4} />
        </mesh>

        <ArchitecturalPlant position={[-2.8, 0, 0]} scale={1.3} planterType="brass" />
        <ArchitecturalPlant position={[2.8, 0, 0]} scale={1.3} planterType="terracotta" />
      </group>
    </group>
  );
};
