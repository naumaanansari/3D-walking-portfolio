import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface CharacterProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  role: 'receptionist' | 'hr' | 'nauman' | 'visitor' | 'dev' | 'designer' | 'analyst';
  isWaving?: boolean;
  isSeated?: boolean;
  scale?: number;
}

export const StylizedCharacter: React.FC<CharacterProps> = ({
  position,
  rotation = [0, 0, 0],
  role,
  isWaving = true,
  isSeated = false,
  scale = 1,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  // Character Color Schemes exactly matched to reference image
  let suitColor = '#1E293B';
  let shirtColor = '#F8FAFC';
  let skinTone = '#E6BA95';
  let hairColor = '#1E293B';

  switch (role) {
    case 'receptionist':
      suitColor = '#8B5CF6'; // Vibrant purple blazer from reference image
      shirtColor = '#FFFFFF';
      skinTone = '#F2C9AC';
      hairColor = '#3B1E08';
      break;
    case 'visitor':
      suitColor = '#2563EB'; // Royal blue suit from reference image
      shirtColor = '#FFFFFF';
      skinTone = '#DFB08D';
      hairColor = '#1F2937';
      break;
    case 'hr':
      suitColor = '#9333EA'; // Purple blazer
      shirtColor = '#FDF2F8';
      skinTone = '#EAC0A2';
      hairColor = '#4A2810';
      break;
    case 'nauman':
      suitColor = '#0F172A'; // Midnight navy tailored executive suit
      shirtColor = '#FFFFFF';
      skinTone = '#DEB887';
      hairColor = '#0F172A';
      break;
    case 'dev':
      suitColor = '#16A34A'; // Green top
      shirtColor = '#F0FDF4';
      skinTone = '#E2B895';
      hairColor = '#374151';
      break;
    case 'designer':
      suitColor = '#E11D48'; // Bright rose/pink sweater
      shirtColor = '#FFF1F2';
      skinTone = '#F5D0B5';
      hairColor = '#262626';
      break;
    case 'analyst':
      suitColor = '#EA580C'; // Warm orange shirt
      shirtColor = '#FFFFFF';
      skinTone = '#D4A373';
      hairColor = '#1E293B';
      break;
  }

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Natural breathing motion
    if (groupRef.current) {
      const breatheOffset = Math.sin(t * 2.2) * 0.015;
      groupRef.current.position.y = position[1] + breatheOffset;
    }

    // Arm gesture / waving / typing
    if (rightArmRef.current) {
      if (isWaving && (role === 'receptionist' || role === 'nauman')) {
        if (role === 'receptionist') {
          rightArmRef.current.rotation.z = Math.PI / 4 + Math.sin(t * 5.5) * 0.22;
          rightArmRef.current.rotation.x = -Math.PI / 5;
        } else {
          rightArmRef.current.rotation.z = Math.PI / 6 + Math.sin(t * 3) * 0.12;
          rightArmRef.current.rotation.y = Math.sin(t * 2) * 0.08;
        }
      } else if (isSeated) {
        // Typing motion
        rightArmRef.current.rotation.x = -Math.PI / 2.8 + Math.sin(t * 4) * 0.04;
        rightArmRef.current.rotation.z = -0.12;
      }
    }

    if (leftArmRef.current && isSeated) {
      leftArmRef.current.rotation.x = -Math.PI / 2.8 + Math.cos(t * 4) * 0.04;
      leftArmRef.current.rotation.z = 0.12;
    }

    // Subtle head tracking
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.4) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      {/* Soft Contact Shadow */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.38, 20]} />
        <meshBasicMaterial color="#57534E" opacity={0.25} transparent />
      </mesh>

      {/* Legs & Shoes */}
      {!isSeated ? (
        <group position={[0, 0, 0]}>
          <mesh position={[-0.11, 0.45, 0]} castShadow>
            <boxGeometry args={[0.13, 0.9, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[0.11, 0.45, 0]} castShadow>
            <boxGeometry args={[0.13, 0.9, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          {/* Polished Dress Shoes */}
          <mesh position={[-0.11, 0.05, 0.03]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.2]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh position={[0.11, 0.05, 0.03]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.2]} />
            <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.2} />
          </mesh>
        </group>
      ) : (
        // Seated thighs and bent shins
        <group position={[0, 0.45, 0]}>
          <mesh position={[-0.11, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <boxGeometry args={[0.13, 0.45, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[0.11, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <boxGeometry args={[0.13, 0.45, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[-0.11, -0.22, 0.38]} castShadow>
            <boxGeometry args={[0.13, 0.42, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
          <mesh position={[0.11, -0.22, 0.38]} castShadow>
            <boxGeometry args={[0.13, 0.42, 0.14]} />
            <meshStandardMaterial color="#334155" roughness={0.7} />
          </mesh>
        </group>
      )}

      {/* Torso & Suit Jacket / Top */}
      <group position={[0, isSeated ? 0.8 : 1.25, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.44, 0.68, 0.26]} />
          <meshStandardMaterial color={suitColor} roughness={0.6} />
        </mesh>

        {/* Inner Shirt Collar */}
        <mesh position={[0, 0.22, 0.12]}>
          <boxGeometry args={[0.18, 0.2, 0.06]} />
          <meshStandardMaterial color={shirtColor} roughness={0.5} />
        </mesh>

        {/* Tie or Accent */}
        {role === 'nauman' && (
          <mesh position={[0, 0.1, 0.14]}>
            <boxGeometry args={[0.07, 0.32, 0.04]} />
            <meshStandardMaterial color="#0284C7" metalness={0.3} />
          </mesh>
        )}
      </group>

      {/* Left Arm */}
      <group
        ref={leftArmRef}
        position={[-0.26, (isSeated ? 0.8 : 1.25) + 0.24, 0]}
      >
        <mesh
          position={[0, isSeated ? 0 : -0.25, isSeated ? 0.15 : 0]}
          rotation={isSeated ? [-Math.PI / 3, 0, 0.15] : [0, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.11, 0.52, 0.11]} />
          <meshStandardMaterial color={suitColor} roughness={0.6} />
        </mesh>
        {/* Modeled Left Hand */}
        <mesh position={[0, isSeated ? -0.25 : -0.54, isSeated ? 0.28 : 0]} castShadow>
          <boxGeometry args={[0.09, 0.08, 0.07]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group
        ref={rightArmRef}
        position={[0.26, (isSeated ? 0.8 : 1.25) + 0.24, 0]}
      >
        <mesh
          position={[0, isSeated ? 0 : -0.25, isSeated ? 0.15 : 0]}
          rotation={isSeated ? [-Math.PI / 3, 0, -0.15] : [0, 0, 0]}
          castShadow
        >
          <boxGeometry args={[0.11, 0.52, 0.11]} />
          <meshStandardMaterial color={suitColor} roughness={0.6} />
        </mesh>
        {/* Modeled Right Hand */}
        <mesh position={[0, isSeated ? -0.25 : -0.54, isSeated ? 0.28 : 0]} castShadow>
          <boxGeometry args={[0.09, 0.08, 0.07]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>

      {/* Head Group */}
      <group ref={headRef} position={[0, (isSeated ? 0.8 : 1.25) + 0.5, 0]}>
        {/* Neck */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.1, 10]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>

        {/* Head */}
        <mesh position={[0, 0.07, 0]} castShadow>
          <boxGeometry args={[0.28, 0.3, 0.26]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>

        {/* Hair with Stylized Volume */}
        <mesh position={[0, 0.2, -0.01]} castShadow>
          <boxGeometry args={[0.31, 0.16, 0.3]} />
          <meshStandardMaterial color={hairColor} roughness={0.9} />
        </mesh>
        {role === 'receptionist' && (
          // Bun hairstyle
          <mesh position={[0, 0.14, -0.18]} castShadow>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.9} />
          </mesh>
        )}

        {/* Facial Details: Eyes */}
        <group position={[0, 0.08, 0.134]}>
          <mesh position={[-0.07, 0, 0]}>
            <circleGeometry args={[0.025, 8]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
          <mesh position={[0.07, 0, 0]}>
            <circleGeometry args={[0.025, 8]} />
            <meshBasicMaterial color="#1E293B" />
          </mesh>
          {/* Friendly Smile */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[0.07, 0.016, 0.005]} />
            <meshBasicMaterial color="#BE123C" />
          </mesh>
        </group>

        {/* Glasses for Nauman */}
        {role === 'nauman' && (
          <group position={[0, 0.08, 0.145]}>
            <mesh position={[-0.07, 0, 0]}>
              <ringGeometry args={[0.035, 0.048, 16]} />
              <meshBasicMaterial color="#0F172A" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0.07, 0, 0]}>
              <ringGeometry args={[0.035, 0.048, 16]} />
              <meshBasicMaterial color="#0F172A" side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, 0.015, 0]}>
              <boxGeometry args={[0.05, 0.012, 0.01]} />
              <meshBasicMaterial color="#0F172A" />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
};
