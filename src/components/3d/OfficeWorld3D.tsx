import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOffice } from '../../context/OfficeContext';
import { StylizedCharacter } from './CharacterModel';
import {
  CurvedReceptionDesk,
  ReceptionLoungeArea,
  DetailedWorkstationDesk,
  ArchitecturalPlant,
  OverheadCeilingPendants,
  PlanterDividerBox,
} from './OfficeFurniture';
import { TrophyShelf3D } from './TrophyShelf3D';
import { FeedbackBoard3D } from './FeedbackBoard3D';
import { SkillsCluster3D } from './SkillsCluster3D';
import { SurpriseBox3D } from './SurpriseBox3D';
import {
  createFloorTileTexture,
  createWoodParquetTexture,
  createSignTexture,
  createDiplomaTexture,
  createScreenTexture,
} from '../../utils/textureGenerator';

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

  // Cached textures
  const floorTileTex = useMemo(() => createFloorTileTexture(), []);
  const woodParquetTex = useMemo(() => createWoodParquetTexture(), []);
  const hrSignTex = useMemo(
    () => createSignTexture('HR & EDUCATION', 'Academic Records & Dossier', '#FAF8F5', '#1E293B', '#9333EA'),
    []
  );
  const studioBrandTex = useMemo(
    () => createSignTexture('NAUMAN ANSARI', 'Solutions Architect · Tech Studio', '#FAF8F5', '#1E293B', '#4D6B53'),
    []
  );
  const ceoSuitSignTex = useMemo(
    () => createSignTexture('EXECUTIVE CABIN', 'Nauman Ansari · Solutions Architect', '#FAF8F5', '#1E293B', '#0F172A'),
    []
  );
  const laptopScreenTex = useMemo(() => createScreenTexture('laptop'), []);

  return (
    <group>
      {/* =========================================================================
          1. MAIN POLISHED STONE FLOOR & CURVED INLAYS
         ========================================================================= */}
      {/* Exterior Garden Patio Base */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[56, 0.2, 56]} />
        <meshStandardMaterial color="#E8E2D8" roughness={0.7} />
      </mesh>

      {/* Main Cream / Ivory Polished Floor with Tile Grid Grain */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[44, 0.08, 44]} />
        <meshStandardMaterial
          color="#FAF7F2"
          map={floorTileTex}
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Skills Area Curved Wood Parquet Floor Inlay (from reference image) */}
      <mesh position={[-11, 0.002, -1]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[13, 17]} />
        <meshStandardMaterial map={woodParquetTex} roughness={0.55} />
      </mesh>

      {/* CEO Cabin Luxury Parquet Inlay */}
      <mesh position={[13.0, 0.002, -11.0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[9, 10]} />
        <meshStandardMaterial map={woodParquetTex} roughness={0.5} />
      </mesh>

      {/* =========================================================================
          2. ARCHITECTURAL EXTERIOR WALLS & PANORAMIC SUNLIT WINDOWS
         ========================================================================= */}
      {/* North Wall with Floor-to-Ceiling Panoramic Windows */}
      <group position={[0, 3.2, -18]}>
        {/* Upper Wall Header */}
        <mesh position={[0, 2.6, 0]} castShadow>
          <boxGeometry args={[42, 1.2, 0.3]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
        </mesh>
        {/* Window Pillars */}
        {[-18, -12, -6, 0, 6, 12, 18].map((x) => (
          <mesh key={x} position={[x, 0, 0]} castShadow>
            <boxGeometry args={[0.45, 4.4, 0.28]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.5} />
          </mesh>
        ))}
        {/* Exterior Sunlit Foliage & Skyline Backdrop behind glass */}
        <mesh position={[0, 0, -0.6]}>
          <planeGeometry args={[44, 6]} />
          <meshBasicMaterial color="#C5E2CE" />
        </mesh>
        {/* Glass Panes */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[40, 4.2]} />
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
          <boxGeometry args={[0.3, 1.2, 40]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.6} />
        </mesh>
        {/* East Window Pillars */}
        {[-14, -7, 0, 7, 14].map((z) => (
          <mesh key={z} position={[0, 0, z]} castShadow>
            <boxGeometry args={[0.28, 4.4, 0.45]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.5} />
          </mesh>
        ))}
        {/* East Glass Panes */}
        <mesh position={[-0.05, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[38, 4.2]} />
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
          <planeGeometry args={[40, 6]} />
          <meshBasicMaterial color="#BADCC4" />
        </mesh>
      </group>

      {/* West Low Wall & Planter Terrace */}
      <group position={[-19, 0, 0]}>
        <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 1.2, 38]} />
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

        {/* Studio Brand Entrance Plaque */}
        <group position={[0, 3.2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[4.2, 0.5, 0.06]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[4.1, 0.44]} />
            <meshBasicMaterial map={studioBrandTex} />
          </mesh>
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

      {/* Potted plants flanking the reception desk */}
      <ArchitecturalPlant position={[-5.8, 0, 7.8]} scale={1.25} planterType="brass" plantType="monstera" />
      <ArchitecturalPlant position={[-0.2, 0, 6.8]} scale={1.15} planterType="terracotta" plantType="ficus" />

      {/* Planter Box Divider between reception walkway and skills area */}
      <PlanterDividerBox position={[-4.5, 0, 1.5]} rotation={[0, Math.PI / 2, 0]} length={4.5} />

      {/* =========================================================================
          5. RECEPTION LOUNGE AREA (Round Rug, Cream Sofa, 4 Armchairs, Coffee Table)
         ========================================================================= */}
      <ReceptionLoungeArea position={[5.2, 0, 8.2]} />
      {/* Large Potted Trees around the lounge circle */}
      <ArchitecturalPlant position={[9.2, 0, 8.5]} scale={1.3} planterType="terracotta" plantType="monstera" />
      <ArchitecturalPlant position={[5.2, 0, 12.2]} scale={1.1} planterType="brass" plantType="ficus" />

      {/* Overhead Minimalist Lighting Pendants */}
      <OverheadCeilingPendants position={[-3, 4.8, 7.5]} radius={0.8} />
      <OverheadCeilingPendants position={[5.2, 4.8, 8.2]} radius={1.0} />
      <OverheadCeilingPendants position={[-11, 4.8, -1]} radius={1.1} />

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

        {/* Overhead Signboard ("HR & EDUCATION") */}
        <group position={[0, 3.22, -1.72]}>
          <mesh castShadow>
            <boxGeometry args={[2.8, 0.42, 0.04]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[2.7, 0.38]} />
            <meshBasicMaterial map={hrSignTex} />
          </mesh>
        </group>

        {/* Framed Diplomas on the Sage-Green Wall */}
        {[-1.3, 0, 1.3].map((x, i) => {
          const qual = i === 0 ? 'B.S. Software Engineering' : i === 1 ? 'AWS Solutions Architect' : 'Scrum Master';
          const issuer = i === 0 ? 'University of Karachi' : i === 1 ? 'Amazon Web Services' : 'Scrum Alliance';
          const year = i === 0 ? '2019' : i === 1 ? '2023' : '2022';
          const certTex = createDiplomaTexture(qual, issuer, year);

          return (
            <group key={i} position={[x, 2.2, -1.72]}>
              <mesh castShadow>
                <boxGeometry args={[0.54, 0.68, 0.03]} />
                <meshStandardMaterial color="#A07248" />
              </mesh>
              <mesh position={[0, 0, 0.018]}>
                <planeGeometry args={[0.48, 0.62]} />
                <meshBasicMaterial map={certTex} />
              </mesh>
            </group>
          );
        })}

        {/* HR Desk & Seated Characters (HR Officer in purple suit + Candidate in blue on yellow chair) */}
        <DetailedWorkstationDesk position={[0, 0, -0.6]} chairColor="#9333EA" />
        <StylizedCharacter
          position={[0, 0, 0.1]}
          role="hr"
          isSeated={true}
          isWaving={currentScene === 'education'}
        />
        {/* Candidate / Employee in blue suit seated opposite HR desk on yellow chair */}
        <group position={[0, 0, -1.3]} rotation={[0, 0, 0]}>
          <mesh position={[0, 0.38, 0]} castShadow>
            <boxGeometry args={[0.5, 0.08, 0.48]} />
            <meshStandardMaterial color="#E5A93C" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.74, 0.22]} castShadow>
            <boxGeometry args={[0.46, 0.58, 0.05]} />
            <meshStandardMaterial color="#E5A93C" roughness={0.7} />
          </mesh>
          <StylizedCharacter
            position={[0, 0, 0]}
            role="visitor"
            isSeated={true}
            isWaving={false}
          />
        </group>

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

        <ArchitecturalPlant position={[-2.4, 0, -0.5]} scale={1.1} planterType="brass" plantType="snake" />
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

        {/* Executive Suite Frosted Sign Plaque */}
        <group position={[-4.42, 2.4, 1.5]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.8, 0.45, 0.04]} />
            <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[1.72, 0.4]} />
            <meshBasicMaterial map={ceoSuitSignTex} />
          </mesh>
        </group>

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

          {/* Open Laptop with illuminated screen & metrics */}
          <group position={[-0.1, 0.84, 0]}>
            <mesh position={[0, 0.01, 0]} castShadow>
              <boxGeometry args={[0.55, 0.02, 0.38]} />
              <meshStandardMaterial color="#94A3B8" metalness={0.8} />
            </mesh>
            <group position={[0, 0.02, -0.19]} rotation={[-0.2, 0, 0]}>
              <mesh position={[0, 0.18, 0]} castShadow>
                <boxGeometry args={[0.55, 0.36, 0.02]} />
                <meshStandardMaterial color="#1E293B" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.18, 0.012]}>
                <planeGeometry args={[0.52, 0.32]} />
                <meshBasicMaterial map={laptopScreenTex} />
              </mesh>
            </group>
          </group>
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

        <ArchitecturalPlant position={[-2.8, 0, 0]} scale={1.3} planterType="brass" plantType="monstera" />
        <ArchitecturalPlant position={[2.8, 0, 0]} scale={1.3} planterType="terracotta" plantType="ficus" />
      </group>
    </group>
  );
};
