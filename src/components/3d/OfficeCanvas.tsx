import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './CameraController';
import { OfficeWorld3D } from './OfficeWorld3D';

export const OfficeCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-amber-50/20">
      <Canvas
        shadows
        camera={{ position: [3, 7.8, 16], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            console.warn('WebGL Context Lost. Reloading scene...');
          });
          gl.domElement.addEventListener('webglcontextrestored', () => {
            console.info('WebGL Context Restored.');
          });
        }}
      >
        {/* Bright, Sunlit Architectural Daylight Horizon */}
        <color attach="background" args={['#EDF4F9']} />
        <fog attach="fog" args={['#E5EEF5', 38, 90]} />

        {/* Hemisphere Light: Soft Sky Blue from above, Warm Stone Bounce from below */}
        <hemisphereLight
          args={['#E8F2FA', '#F3E8DB', 1.3]}
        />

        {/* Soft Ambient Fill */}
        <ambientLight intensity={1.1} color="#FFFDF7" />

        {/* Primary Warm Golden Sunlight (mimicking reference image shadow angle) */}
        <directionalLight
          position={[-14, 26, 18]}
          intensity={2.4}
          color="#FFF6E5"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0003}
          shadow-camera-far={70}
          shadow-camera-left={-28}
          shadow-camera-right={28}
          shadow-camera-top={28}
          shadow-camera-bottom={-28}
        />

        {/* Secondary Window Rim & Fill Light (simulating daylight through North & West windows) */}
        <directionalLight
          position={[20, 18, -14]}
          intensity={1.2}
          color="#E0F2FE"
        />

        {/* Warm Architectural Accent Lights for Reception & Ceiling */}
        <pointLight position={[-3, 4.2, 7]} intensity={0.9} color="#FFEDD5" distance={10} />
        <pointLight position={[13, 4.5, -11]} intensity={0.9} color="#FEF3C7" distance={12} />
        <pointLight position={[13.5, 3.8, 1]} intensity={1.1} color="#DDD6FE" distance={8} />

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
