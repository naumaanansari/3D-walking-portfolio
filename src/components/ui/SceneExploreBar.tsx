import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { Eye, RotateCcw } from 'lucide-react';

export const SceneExploreBar: React.FC = () => {
  const {
    currentScene,
    isTransitioning,
    activeModal,
    reopenSceneModal,
    returnToReception,
  } = useOffice();

  if (isTransitioning || activeModal !== null || currentScene === 'entrance') {
    return null;
  }

  const getSceneActionLabel = () => {
    switch (currentScene) {
      case 'reception':
        return 'Open Reception Dialogue';
      case 'skills':
        return 'Open Skills Hub';
      case 'career':
        return 'Inspect Career Shelves';
      case 'education':
        return 'Open Education Dossier';
      case 'feedback':
        return 'Read Feedback Board';
      case 'ceo':
        return 'Talk to Nauman';
      case 'surprise':
        return 'Open Surprise Box';
      default:
        return 'Open Scene Info';
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 bg-[#FDFCF9]/95 backdrop-blur-xl border border-[#E7DFD3] py-2 px-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] select-none animate-in fade-in slide-in-from-bottom-2">
      <button
        onClick={reopenSceneModal}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] rounded-full transition-colors cursor-pointer shadow-xs"
      >
        <Eye className="w-3.5 h-3.5" />
        <span>{getSceneActionLabel()}</span>
      </button>

      {currentScene !== 'reception' && (
        <button
          onClick={returnToReception}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-full transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
          <span>Reception</span>
        </button>
      )}
    </div>
  );
};
