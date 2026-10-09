import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { FastForward, Loader2 } from 'lucide-react';

export const TransitionControls: React.FC = () => {
  const {
    isTransitioning,
    targetScene,
    currentScene,
    skipAnimation,
    hasEnteredOffice,
  } = useOffice();

  if (!isTransitioning) {
    return null;
  }

  const destinationLabel =
    !hasEnteredOffice && currentScene === 'entrance'
      ? 'Entering Reception'
      : targetScene === 'ceo'
      ? 'Executive Cabin'
      : targetScene === 'career'
      ? 'Career & Trophies'
      : targetScene === 'education'
      ? 'HR & Education'
      : targetScene
      ? `Guiding to ${targetScene}`
      : 'Moving';

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[#FAF7F2]/95 backdrop-blur-xl border border-[#E7DFD3] py-2.5 px-5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.1)] animate-in fade-in slide-in-from-bottom-2 select-none">
      <div className="flex items-center gap-2 text-xs font-semibold text-stone-700">
        <Loader2 className="w-3.5 h-3.5 text-[#4D6B53] animate-spin" />
        <span className="capitalize">{destinationLabel}</span>
      </div>

      <div className="h-4 w-px bg-[#DCD3C5]" />

      {/* Mandatory Skip Animation Button */}
      <button
        onClick={skipAnimation}
        className="flex items-center gap-1.5 text-xs font-bold text-[#2D5A38] hover:text-[#1B3621] active:text-[#132717] transition-colors cursor-pointer"
      >
        <span>Skip Animation</span>
        <FastForward className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
