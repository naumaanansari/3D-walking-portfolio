import React, { useState } from 'react';
import { FEEDBACK_ITEMS } from '../../data/portfolioData';
import { useOffice } from '../../context/OfficeContext';
import { FeedbackItem } from '../../types/office';
import { ArchitecturalPlant } from './OfficeFurniture';

// Interactive Feedback Sticky Card on Sage-Green Wall
const FeedbackCardMesh: React.FC<{
  position: [number, number, number];
  item: FeedbackItem;
  color?: string;
  isHovered: boolean;
  onClick: () => void;
  onPointerOver: () => void;
  onPointerOut: () => void;
}> = ({ position, item, color = '#FEF08A', isHovered, onClick, onPointerOver, onPointerOut }) => {
  return (
    <group
      position={position}
      scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
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
      {/* Note Card Paper */}
      <mesh position={[0, 0, 0.02]} castShadow>
        <boxGeometry args={[1.5, 0.85, 0.02]} />
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          emissive={isHovered ? '#FFFFFF' : '#000000'}
          emissiveIntensity={isHovered ? 0.25 : 0}
        />
      </mesh>

      {/* Top Push Pin */}
      <mesh position={[0, 0.36, 0.035]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.03, 12]} />
        <meshStandardMaterial color="#EF4444" roughness={0.3} />
      </mesh>

      {/* Reviewer Badge Avatar Placeholder */}
      <mesh position={[-0.52, 0.12, 0.035]}>
        <circleGeometry args={[0.12, 16]} />
        <meshBasicMaterial color="#94A3B8" />
      </mesh>

      {/* 5-Star Row Representation */}
      <group position={[-0.15, 0.16, 0.035]}>
        {[0, 1, 2, 3, 4].map((starIdx) => (
          <mesh key={starIdx} position={[starIdx * 0.12, 0, 0]}>
            <circleGeometry args={[0.032, 5]} />
            <meshBasicMaterial color="#F59E0B" />
          </mesh>
        ))}
      </group>

      {/* Clean text lines on paper */}
      <mesh position={[0.1, -0.06, 0.035]}>
        <planeGeometry args={[1.05, 0.04]} />
        <meshBasicMaterial color="#475569" />
      </mesh>
      <mesh position={[0.0, -0.18, 0.035]}>
        <planeGeometry args={[0.85, 0.04]} />
        <meshBasicMaterial color="#64748B" />
      </mesh>
    </group>
  );
};

export const FeedbackBoard3D: React.FC<{
  position: [number, number, number];
}> = ({ position }) => {
  const { openFeedbackDetail } = useOffice();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const stickyColors = ['#FEF08A', '#BBF7D0', '#BAE6FD', '#FBCFE8'];

  return (
    <group position={position}>
      {/* Sage-Green Multi-Panel Acoustic Wall with Rounded Top & Oak Trim */}
      <mesh position={[0, 1.85, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 3.1, 0.14]} />
        <meshStandardMaterial color="#829C86" roughness={0.7} />
      </mesh>

      {/* Natural Oak Top Cap */}
      <mesh position={[0, 3.42, 0]} castShadow>
        <boxGeometry args={[4.86, 0.06, 0.18]} />
        <meshStandardMaterial color="#C19A6B" roughness={0.4} />
      </mesh>

      {/* White Overhead Signboard Plaque ("Feedback") */}
      <group position={[0, 3.15, 0.08]}>
        <mesh castShadow>
          <boxGeometry args={[2.0, 0.36, 0.04]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.92, 0.28]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* 4 Interactive Testimonial Cards on Wall */}
      {FEEDBACK_ITEMS.map((item, idx) => {
        const row = Math.floor(idx / 2);
        const col = idx % 2;
        const xPos = col === 0 ? -1.15 : 1.15;
        const yPos = row === 0 ? 2.3 : 1.25;

        return (
          <FeedbackCardMesh
            key={item.id}
            position={[xPos, yPos, 0.06]}
            item={item}
            color={stickyColors[idx % stickyColors.length]}
            isHovered={hoveredId === item.id}
            onClick={() => openFeedbackDetail(item)}
            onPointerOver={() => setHoveredId(item.id)}
            onPointerOut={() => setHoveredId(null)}
          />
        );
      })}

      {/* Discussion Nook in Front of Feedback Wall (Teal & Mustard Armchairs + Round Table) */}
      <group position={[0, 0, 1.8]}>
        {/* Teal Armchair */}
        <group position={[-1.1, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.78, 0.28, 0.74]} />
            <meshStandardMaterial color="#3A6B68" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.65, -0.28]} castShadow>
            <boxGeometry args={[0.78, 0.42, 0.18]} />
            <meshStandardMaterial color="#3A6B68" roughness={0.7} />
          </mesh>
        </group>

        {/* Mustard-Yellow Armchair */}
        <group position={[1.1, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
          <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.78, 0.28, 0.74]} />
            <meshStandardMaterial color="#E5A93C" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.65, -0.28]} castShadow>
            <boxGeometry args={[0.78, 0.42, 0.18]} />
            <meshStandardMaterial color="#E5A93C" roughness={0.7} />
          </mesh>
        </group>

        {/* Round Natural Oak Drinks Table */}
        <group position={[0, 0, 0.1]}>
          <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.38, 0.38, 0.04, 24]} />
            <meshStandardMaterial color="#C89B6D" roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.14, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.06, 0.26, 12]} />
            <meshStandardMaterial color="#A07248" />
          </mesh>
        </group>
      </group>

      {/* Architectural Potted Plant beside Wall */}
      <ArchitecturalPlant position={[2.8, 0, 0.5]} scale={1.15} planterType="terracotta" />
    </group>
  );
};
