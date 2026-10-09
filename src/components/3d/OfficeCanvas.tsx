import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { CameraController } from './CameraController';
import { OfficeWorld3D } from './OfficeWorld3D';

export const OfficeCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#FAF7F2]">
      <Canvas
        shadows
        camera={{ position: [3, 7.8, 16], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;

          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL Context Lost. Reloading scene...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.info('WebGL Context Restored.');
          });
        }}
      >
        {/* Sunny Architectural Sky & Atmospheric Depth */}
        <color attach="background" args={['#EDF4F9']} />
        <fog attach="fog" args={['#E5EEF5', 38, 92]} />

        {/* Hemisphere Light: Sky Blue overhead, Warm Stone Bounce from floor */}
        <hemisphereLight
          args={['#E6F2FC', '#EDE3D5', 1.25]}
        />

        {/* Ambient Fill Light */}
        <ambientLight intensity={0.85} color="#FFFDF8" />

        {/* Primary Warm Golden Sunlight (mimicking reference image natural sun angle) */}
        <directionalLight
          position={[-14, 28, 16]}
          intensity={2.6}
          color="#FFF2DC"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0002}
          shadow-camera-far={75}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        {/* Secondary Window Daylight Fill from East / Panoramic Glass */}
        <directionalLight
          position={[22, 18, -12]}
          intensity={1.15}
          color="#E0EEF8"
        />

        {/* Warm Architectural Accent Lights for Reception Counter & Executive Areas */}
        <pointLight position={[-3, 3.8, 7.5]} intensity={1.1} color="#FEF3C7" distance={11} />
        <pointLight position={[5.2, 3.5, 8.2]} intensity={0.9} color="#FFEDD5" distance={10} />
        <pointLight position={[13, 4.2, -11]} intensity={1.0} color="#FEF3C7" distance={12} />
        <pointLight position={[13.5, 3.5, 1]} intensity={1.2} color="#E9D5FF" distance={9} />

        {/* Camera Transition Choreographer */}
        <CameraController />

        {/* 3D Office World Geometry */}
        <Suspense fallback={null}>
          <OfficeWorld3D />
        </Suspense>
      </Canvas>
    </div>
  );
};
