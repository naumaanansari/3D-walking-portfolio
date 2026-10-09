/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OfficeProvider } from './context/OfficeContext';
import { OfficeCanvas } from './components/3d/OfficeCanvas';
import { HeaderBar } from './components/ui/HeaderBar';
import { ReceptionDialogue } from './components/ui/ReceptionDialogue';
import { Minimap } from './components/ui/Minimap';
import { SkillsModal } from './components/ui/SkillsModal';
import { CareerModal } from './components/ui/CareerModal';
import { EducationModal } from './components/ui/EducationModal';
import { FeedbackModal } from './components/ui/FeedbackModal';
import { CeoCabinModal } from './components/ui/CeoCabinModal';
import { SurpriseModal } from './components/ui/SurpriseModal';
import { TransitionControls } from './components/ui/TransitionControls';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

function OfficeExperience() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#F8F5EE] select-none">
      {/* 3D Isometric Canvas Layer with Error Boundary */}
      <ErrorBoundary>
        <OfficeCanvas />
      </ErrorBoundary>

      {/* Persistent Top Navigation Bar */}
      <HeaderBar />

      {/* Guided Transition Controls (Skip Animation) */}
      <TransitionControls />

      {/* Scene 1: Welcome & Reception Dialogue */}
      <ReceptionDialogue />

      {/* Persistent Studio Floorplan Minimap */}
      <Minimap />

      {/* Scene 2: Skills Department & Placeholder Panels */}
      <SkillsModal />

      {/* Scene 3: Career Trophies & Framed Certificates */}
      <CareerModal />

      {/* Scene 4: Education & HR Credentials */}
      <EducationModal />

      {/* Scene 5: Feedback Wall & Testimonials */}
      <FeedbackModal />

      {/* Scene 6: Executive Cabin & Meet Nauman */}
      <CeoCabinModal />

      {/* Scene 7: Surprise Experience Portal */}
      <SurpriseModal />
    </div>
  );
}

export default function App() {
  return (
    <OfficeProvider>
      <OfficeExperience />
    </OfficeProvider>
  );
}
