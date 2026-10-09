import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Certificate,
  Department,
  FeedbackItem,
  MajorProject,
  OtherProject,
  SceneId,
} from '../types/office';

export interface DialogueSpeaker {
  name: string;
  role: string;
  avatarType: 'receptionist' | 'hr' | 'nauman' | 'analyst' | 'dev' | 'designer' | 'qa';
}

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
  minimapCollapsed: boolean;
  soundEnabled: boolean;
  activeSpeaker: DialogueSpeaker | null;
  
  // Actions
  setVisitorName: (name: string) => void;
  setNamePromptState: (state: 'initial' | 'asking-name' | 'name-submitted' | 'declined') => void;
  clearVisitorName: () => void;
  navigateTo: (scene: SceneId) => void;
  skipAnimation: () => void;
  returnToReception: () => void;
  closeActiveModal: () => void;
  reopenSceneModal: () => void;
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
  const [minimapCollapsed, setMinimapCollapsed] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active dialogue speaker tracking
  const activeSpeaker: DialogueSpeaker | null = (() => {
    if (currentScene === 'reception' && activeModal === 'reception-menu') {
      return {
        name: 'Elena',
        role: 'Office Receptionist',
        avatarType: 'receptionist',
      };
    }
    if (currentScene === 'education' && activeModal === 'education-main') {
      return {
        name: 'Marcus Vance',
        role: 'People & Talent Lead',
        avatarType: 'hr',
      };
    }
    if (currentScene === 'ceo' && activeModal === 'ceo-main') {
      return {
        name: 'Nauman Ansari',
        role: 'Founder & Solutions Architect',
        avatarType: 'nauman',
      };
    }
    if (currentScene === 'skills' && selectedDepartment) {
      return {
        name: selectedDepartment.name,
        role: 'Department Workstation',
        avatarType: (selectedDepartment.id === 'ux' ? 'designer' : selectedDepartment.id === 'ba' ? 'analyst' : 'dev'),
      };
    }
    return null;
  })();

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
      return;
    }
    if (currentScene === scene) {
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

  // Re-open current scene modal if closed for 3D exploration
  const reopenSceneModal = useCallback(() => {
    openSceneModal(currentScene);
  }, [currentScene, openSceneModal]);

  // Hierarchical parent-child modal close handling (Preserves 3D room location!)
  const closeActiveModal = useCallback(() => {
    // 1. Child modal: Department detail returns to Skills main
    if (selectedDepartment) {
      setSelectedDepartment(null);
      setActiveModal('skills-main');
      return;
    }
    // 2. Child modal: Project detail returns to Career main
    if (selectedProject) {
      setSelectedProject(null);
      setActiveModal('career-main');
      return;
    }
    // 3. Child modal: Certificate detail returns to Career main
    if (selectedCertificate) {
      setSelectedCertificate(null);
      setActiveModal('career-main');
      return;
    }
    // 4. Child modal: Feedback detail returns to Feedback main
    if (selectedFeedback) {
      setSelectedFeedback(null);
      setActiveModal('feedback-main');
      return;
    }

    // 5. Parent modal: Closing parent modal dismisses overlay to let user look around 3D scene!
    // Does NOT abruptly jerk the camera back to reception!
    setActiveModal(null);
  }, [
    selectedDepartment,
    selectedProject,
    selectedCertificate,
    selectedFeedback,
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
    setMinimapCollapsed(prev => !prev);
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => !prev);
  }, []);

  // Keyboard shortcut: Escape to close eligible modal hierarchy
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedDepartment || selectedProject || selectedCertificate || selectedFeedback) {
          closeActiveModal();
        } else if (activeModal) {
          setActiveModal(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedDepartment, selectedProject, selectedCertificate, selectedFeedback, activeModal, closeActiveModal]);

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
        minimapCollapsed,
        soundEnabled,
        activeSpeaker,
        setVisitorName,
        setNamePromptState,
        clearVisitorName,
        navigateTo,
        skipAnimation,
        returnToReception,
        closeActiveModal,
        reopenSceneModal,
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
