import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useOffice } from '../../context/OfficeContext';
import { SURPRISE_CONFIG } from '../../data/portfolioData';
import { X, Sparkles, ExternalLink, Gift } from 'lucide-react';

export const SurpriseModal: React.FC = () => {
  const { currentScene, isTransitioning, returnToReception } = useOffice();

  useEffect(() => {
    if (currentScene === 'surprise' && !isTransitioning) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#7C3AED', '#F59E0B', '#10B981', '#38BDF8'],
          disableForReducedMotion: true,
        });
      } catch {
        // fallback
      }
    }
  }, [currentScene, isTransitioning]);

  if (currentScene !== 'surprise' || isTransitioning) {
    return null;
  }

  const handleOpenPortfolio = () => {
    window.open(SURPRISE_CONFIG.externalPortfolioUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-modal-title"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none"
    >
      <div className="w-full max-w-lg bg-[#FDFCF9] border border-purple-200 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative text-center animate-in fade-in zoom-in-95 duration-300">
        <button
          onClick={returnToReception}
          aria-label="Close surprise panel and return to reception"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <Gift className="w-8 h-8 text-purple-600" />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Surprise Unlocked</span>
        </div>

        <h2 id="surprise-modal-title" className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
          {SURPRISE_CONFIG.title}
        </h2>

        <p className="text-sm text-stone-600 leading-relaxed mb-6">
          {SURPRISE_CONFIG.description}
        </p>

        {/* EXACT SPEC BUTTON LABEL */}
        <button
          onClick={handleOpenPortfolio}
          className="w-full py-3.5 px-6 text-sm font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 active:from-purple-900 active:to-indigo-900 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>{SURPRISE_CONFIG.buttonLabel}</span>
          <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>

        <div className="mt-6 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
          <span className="text-xs text-stone-500">Opens external web showcase</span>
          <button
            onClick={returnToReception}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Return to Reception
          </button>
        </div>
      </div>
    </div>
  );
};
