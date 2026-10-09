import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { SceneId } from '../../types/office';

export const HeaderBar: React.FC = () => {
  const {
    currentScene,
    targetScene,
    isTransitioning,
    visitorName,
    navigateTo,
    returnToReception,
    soundEnabled,
    toggleSound,
    clearVisitorName,
  } = useOffice();

  const active = targetScene || currentScene;

  const navItems: { id: SceneId; label: string }[] = [
    { id: 'reception', label: 'Reception' },
    { id: 'skills', label: 'Skills' },
    { id: 'career', label: 'Career' },
    { id: 'education', label: 'Education' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'ceo', label: 'Meet Nauman' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7DFD3] select-none shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Zone 1: Single text element wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={returnToReception}
          className="text-base font-bold tracking-tight text-stone-900 hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Nauman Ansari
        </button>
        {visitorName && visitorName !== 'Visitor' && (
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500">
            <span aria-hidden="true">·</span>
            <span className="text-stone-700 font-medium truncate max-w-[140px]">
              Guest: {visitorName}
            </span>
            <button
              onClick={clearVisitorName}
              title="Reset name"
              className="text-stone-400 hover:text-stone-600 transition-colors p-0.5 rounded cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Zone 2: 4–6 concise single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
        {navItems.map((item) => {
          const isCurrent = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              disabled={isTransitioning}
              className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isCurrent
                  ? 'text-emerald-800 font-semibold'
                  : 'hover:text-stone-900 disabled:opacity-50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary action + sound controls */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Mute audio' : 'Unmute audio'}
          aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
          className="p-2 text-stone-600 hover:text-stone-900 bg-white/80 hover:bg-white border border-[#E7DFD3] rounded-lg transition-colors cursor-pointer shadow-xs"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {currentScene !== 'reception' && (
          <button
            onClick={returnToReception}
            disabled={isTransitioning}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] active:bg-[#344C39] disabled:opacity-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            Return to Reception
          </button>
        )}
      </div>
    </header>
  );
};
