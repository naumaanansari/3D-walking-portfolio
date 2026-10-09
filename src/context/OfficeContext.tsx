import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Certificate,
  Department,
  FeedbackItem,
  MajorProject,
  OtherProject,
  SceneId,
} from '../types/office';
import { SKILL_DEPARTMENTS } from '../data/portfolioData';

interface OfficeContextType {
  currentScene: SceneId;
  targetScene: SceneId | null;
  isTransitioning: boolean;
  transitionProgress: number;
  hasEnteredOffice: boolean;
  visitorName: string;
  namePromptState: 'initial' | 'asking-name' | 'name-submitted' | 'declined';
  activeModal: string | null;
  selectedDepartment: Department | null;
  selectedProject: MajorProject | OtherProject | null;
  selectedCertificate: Certificate | null;
  selectedFeedback: FeedbackItem | null;
  minimapExpanded: boolean;
  soundEnabled: boolean;
  
  // Actions
  setVisitorName: (name: string) => void;
  setNamePromptState: (state: 'initial' | 'asking-name' | 'name-submitted' | 'declined') => void;
  clearVisitorName: () => void;
  navigateTo: (scene: SceneId) => void;
  skipAnimation: () => void;
  returnToReception: () => void;
  closeActiveModal: () => void;
  openDepartmentDetail: (dept: Department) => void;
  openProjectDetail: (project: MajorProject | OtherProject) => void;
  openCertificateDetail: (cert: Certificate) => void;
  openFeedbackDetail: (fb: FeedbackItem) => void;
  toggleMinimap: () => void;
  toggleSound: () => void;
  completeEntranceAnimation: () => void;
  finishTransition: () => void;
}

const OfficeContext = createContext<OfficeContextType | null>(null);

const STORAGE_KEY = 'walking_office_visitor_name';

export const OfficeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScene, setCurrentScene] = useState<SceneId>('entrance');
  const [targetScene, setTargetScene] = useState<SceneId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [hasEnteredOffice, setHasEnteredOffice] = useState<boolean>(false);
  
  const [visitorName, setVisitorNameState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? saved.trim() : 'Visitor';
    } catch {
      return 'Visitor';
    }
  });

  const [namePromptState, setNamePromptState] = useState<'initial' | 'asking-name' | 'name-submitted' | 'declined'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved && saved.trim() && saved.trim() !== 'Visitor' ? 'name-submitted' : 'initial';
    } catch {
      return 'initial';
    }
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedProject, setSelectedProject] = useState<MajorProject | OtherProject | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [minimapExpanded, setMinimapExpanded] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const setVisitorName = useCallback((name: string) => {
    const clean = name.trim();
    if (clean) {
      setVisitorNameState(clean);
      try {
        localStorage.setItem(STORAGE_KEY, clean);
      } catch {
        // fallback
      }
      setNamePromptState('name-submitted');
    }
  }, []);

  const clearVisitorName = useCallback(() => {
    setVisitorNameState('Visitor');
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // fallback
    }
    setNamePromptState('initial');
  }, []);

  const openSceneModal = useCallback((scene: SceneId) => {
    switch (scene) {
      case 'reception':
        setActiveModal('reception-menu');
        break;
      case 'skills':
        setActiveModal('skills-main');
        break;
      case 'career':
        setActiveModal('career-main');
        break;
      case 'education':
        setActiveModal('education-main');
        break;
      case 'feedback':
        setActiveModal('feedback-main');
        break;
      case 'ceo':
        setActiveModal('ceo-main');
        break;
      case 'surprise':
        setActiveModal('surprise-main');
        break;
      default:
        setActiveModal(null);
    }
  }, []);

  // Main navigation transition
  const navigateTo = useCallback((scene: SceneId) => {
    if (isTransitioning) {
      // Transition lock active to prevent inconsistent state
      return;
    }
    if (currentScene === scene) {
      // Already at scene, open main view if closed
      openSceneModal(scene);
      return;
    }

    // Close any open child modals cleanly
    setSelectedDepartment(null);
    setSelectedProject(null);
    setSelectedCertificate(null);
    setSelectedFeedback(null);
    setActiveModal(null);

    setTargetScene(scene);
    setIsTransitioning(true);
    setTransitionProgress(0);
  }, [currentScene, isTransitioning, openSceneModal]);

  const finishTransition = useCallback(() => {
    if (targetScene) {
      setCurrentScene(targetScene);
      openSceneModal(targetScene);
      setTargetScene(null);
    }
    setIsTransitioning(false);
    setTransitionProgress(1);
  }, [targetScene, openSceneModal]);

  const skipAnimation = useCallback(() => {
    if (targetScene) {
      setCurrentScene(targetScene);
      openSceneModal(targetScene);
      setTargetScene(null);
    } else if (currentScene === 'entrance') {
      setCurrentScene('reception');
      setHasEnteredOffice(true);
      setActiveModal('reception-menu');
    }
    setIsTransitioning(false);
    setTransitionProgress(1);
  }, [targetScene, currentScene, openSceneModal]);

  const returnToReception = useCallback(() => {
    setSelectedDepartment(null);
    setSelectedProject(null);
    setSelectedCertificate(null);
    setSelectedFeedback(null);

    if (currentScene === 'reception') {
      setActiveModal('reception-menu');
      return;
    }

    navigateTo('reception');
  }, [currentScene, navigateTo]);

  const completeEntranceAnimation = useCallback(() => {
    setHasEnteredOffice(true);
    setCurrentScene('reception');
    setIsTransitioning(false);
    setTransitionProgress(1);
    setActiveModal('reception-menu');
  }, []);

  // Hierarchical parent-child modal close handling
  const closeActiveModal = useCallback(() => {
    if (selectedDepartment) {
      setSelectedDepartment(null);
      setActiveModal('skills-main');
      return;
    }
    if (selectedProject) {
      setSelectedProject(null);
      setActiveModal('career-main');
      return;
    }
    if (selectedCertificate) {
      setSelectedCertificate(null);
      setActiveModal('career-main');
      return;
    }
    if (selectedFeedback) {
      setSelectedFeedback(null);
      setActiveModal('feedback-main');
      return;
    }

    // If closing a primary scene modal, return to reception
    if (currentScene !== 'reception') {
      returnToReception();
    } else {
      // At reception, keep reception menu visible or allow closing/re-opening
      setActiveModal('reception-menu');
    }
  }, [
    selectedDepartment,
    selectedProject,
    selectedCertificate,
    selectedFeedback,
    currentScene,
    returnToReception,
  ]);

  const openDepartmentDetail = useCallback((dept: Department) => {
    setSelectedDepartment(dept);
    setActiveModal('department-detail');
  }, []);

  const openProjectDetail = useCallback((project: MajorProject | OtherProject) => {
    setSelectedProject(project);
    setActiveModal('project-detail');
  }, []);

  const openCertificateDetail = useCallback((cert: Certificate) => {
    setSelectedCertificate(cert);
    setActiveModal('certificate-detail');
  }, []);

  const openFeedbackDetail = useCallback((fb: FeedbackItem) => {
    setSelectedFeedback(fb);
    setActiveModal('feedback-detail');
  }, []);

  const toggleMinimap = useCallback(() => {
    setMinimapExpanded(prev => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Keyboard shortcut: Escape to close eligible modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDepartment || selectedProject || selectedCertificate || selectedFeedback) {
          closeActiveModal();
        } else if (currentScene !== 'reception' && activeModal) {
          returnToReception();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDepartment, selectedProject, selectedCertificate, selectedFeedback, currentScene, activeModal, closeActiveModal, returnToReception]);

  return (
    <OfficeContext.Provider
      value={{
        currentScene,
        targetScene,
        isTransitioning,
        transitionProgress,
        hasEnteredOffice,
        visitorName,
        namePromptState,
        activeModal,
        selectedDepartment,
        selectedProject,
        selectedCertificate,
        selectedFeedback,
        minimapExpanded,
        soundEnabled,
        setVisitorName,
        setNamePromptState,
        clearVisitorName,
        navigateTo,
        skipAnimation,
        returnToReception,
        closeActiveModal,
        openDepartmentDetail,
        openProjectDetail,
        openCertificateDetail,
        openFeedbackDetail,
        toggleMinimap,
        toggleSound,
        completeEntranceAnimation,
        finishTransition,
      }}
    >
      {children}
    </OfficeContext.Provider>
  );
};

export const useOffice = () => {
  const context = useContext(OfficeContext);
  if (!context) {
    throw new Error('useOffice must be used within an OfficeProvider');
  }
  return context;
};
