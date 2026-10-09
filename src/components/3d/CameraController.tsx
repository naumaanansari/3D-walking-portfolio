import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useOffice } from '../../context/OfficeContext';
import { CAMERA_VIEWPOINTS } from '../../data/portfolioData';

export const CameraController: React.FC = () => {
  const {
    currentScene,
    targetScene,
    isTransitioning,
    hasEnteredOffice,
    completeEntranceAnimation,
    finishTransition,
  } = useOffice();

  const { camera } = useThree();

  const currentCamPos = useRef(new THREE.Vector3(0, 4.5, 20));
  const currentCamTarget = useRef(new THREE.Vector3(0, 1.8, 10));

  const startCamPos = useRef(new THREE.Vector3(0, 4.5, 20));
  const startCamTarget = useRef(new THREE.Vector3(0, 1.8, 10));

  const destCamPos = useRef(new THREE.Vector3(0, 9.5, 13));
  const destCamTarget = useRef(new THREE.Vector3(0, 1.2, 1.5));

  const transitionStartTime = useRef<number>(0);
  const transitionDuration = useRef<number>(2.2);

  // Initialize camera position on mount
  useEffect(() => {
    const vp = CAMERA_VIEWPOINTS[currentScene];
    if (vp) {
      camera.position.set(vp.position[0], vp.position[1], vp.position[2]);
      currentCamPos.current.set(vp.position[0], vp.position[1], vp.position[2]);
      currentCamTarget.current.set(vp.target[0], vp.target[1], vp.target[2]);
      camera.lookAt(currentCamTarget.current);
    }
  }, [camera, currentScene]);

  // Handle new target scene transitions
  useEffect(() => {
    if (isTransitioning) {
      transitionStartTime.current = performance.now();

      // Current starting point is where the camera currently is
      startCamPos.current.copy(camera.position);
      startCamTarget.current.copy(currentCamTarget.current);

      if (!hasEnteredOffice && currentScene === 'entrance') {
        // Entrance sequence to reception
        const receptionVP = CAMERA_VIEWPOINTS.reception;
        destCamPos.current.set(receptionVP.position[0], receptionVP.position[1], receptionVP.position[2]);
        destCamTarget.current.set(receptionVP.target[0], receptionVP.target[1], receptionVP.target[2]);
        transitionDuration.current = 2.8; // Cinematic entrance
      } else if (targetScene) {
        const destVP = CAMERA_VIEWPOINTS[targetScene];
        destCamPos.current.set(destVP.position[0], destVP.position[1], destVP.position[2]);
        destCamTarget.current.set(destVP.target[0], destVP.target[1], destVP.target[2]);
        transitionDuration.current = 1.9; // Normal smooth transition
      }
    }
  }, [targetScene, isTransitioning, currentScene, hasEnteredOffice, camera]);

  // Cubic smooth in-out easing
  const easeInOutCubic = (x: number): number => {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  };

  useFrame(() => {
    if (isTransitioning) {
      const now = performance.now();
      const elapsed = (now - transitionStartTime.current) / 1000;
      const progress = Math.min(1, elapsed / transitionDuration.current);
      const eased = easeInOutCubic(progress);

      // Arc curve for cinematic feel: lift camera slightly mid-flight
      const arcLift = Math.sin(progress * Math.PI) * 0.8;

      camera.position.x = THREE.MathUtils.lerp(startCamPos.current.x, destCamPos.current.x, eased);
      camera.position.y = THREE.MathUtils.lerp(startCamPos.current.y, destCamPos.current.y, eased) + arcLift;
      camera.position.z = THREE.MathUtils.lerp(startCamPos.current.z, destCamPos.current.z, eased);

      currentCamTarget.current.x = THREE.MathUtils.lerp(startCamTarget.current.x, destCamTarget.current.x, eased);
      currentCamTarget.current.y = THREE.MathUtils.lerp(startCamTarget.current.y, destCamTarget.current.y, eased);
      currentCamTarget.current.z = THREE.MathUtils.lerp(startCamTarget.current.z, destCamTarget.current.z, eased);

      camera.lookAt(currentCamTarget.current);

      if (progress >= 1) {
        if (!hasEnteredOffice && currentScene === 'entrance') {
          completeEntranceAnimation();
        } else if (targetScene) {
          finishTransition();
        }
      }
    } else {
      // Gentle subtle breathing drift when stationary
      const currentVP = CAMERA_VIEWPOINTS[currentScene];
      if (currentVP) {
        currentCamPos.current.set(currentVP.position[0], currentVP.position[1], currentVP.position[2]);
        currentCamTarget.current.set(currentVP.target[0], currentVP.target[1], currentVP.target[2]);
        camera.position.lerp(currentCamPos.current, 0.05);
        camera.lookAt(currentCamTarget.current);
      }
    }
  });

  return null;
};
