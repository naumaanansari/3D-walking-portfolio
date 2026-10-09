import React, { useState, useEffect } from 'react';
import { useOffice } from '../../context/OfficeContext';
import { EDUCATION_ITEMS } from '../../data/portfolioData';
import {
  X,
  GraduationCap,
  BookOpen,
  Award,
  TrendingUp,
  School,
  ExternalLink,
} from 'lucide-react';
import { CharacterPortrait } from './CharacterPortrait';

export const EducationModal: React.FC = () => {
  const { currentScene, isTransitioning, closeActiveModal, returnToReception } = useOffice();
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    setIsSpeaking(true);
    const timer = setTimeout(() => setIsSpeaking(false), 4500);
    return () => clearTimeout(timer);
  }, []);

  if (currentScene !== 'education' || isTransitioning) {
    return null;
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'college':
        return GraduationCap;
      case 'school':
        return School;
      case 'certification':
        return Award;
      case 'training':
        return TrendingUp;
      default:
        return BookOpen;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="education-modal-title"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/35 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-3xl bg-[#FDFCF9]/98 border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeActiveModal}
          aria-label="Close education dossier"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Character Portrait of Marcus (HR Specialist) */}
        <CharacterPortrait
          avatarType="hr"
          name="Marcus Vance"
          role="Talent & Engineering Lead"
          isSpeaking={isSpeaking}
        />

        <div className="my-5">
          <h2 id="education-modal-title" className="text-xl font-bold text-stone-900 tracking-tight">
            Academic Background & Engineering Credentials
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            &ldquo;Here is the verified curriculum, academic foundation, and ongoing continuous learning achievements for Nauman Ansari.&rdquo;
          </p>
        </div>

        {/* Interactive Timeline */}
        <div className="space-y-3.5">
          {EDUCATION_ITEMS.map((item) => {
            const Icon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-white border border-[#E7DFD3] hover:border-purple-300 transition-all flex items-start gap-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                      {item.qualification}
                    </h3>
                    <span className="text-xs font-mono text-purple-700 font-semibold shrink-0">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 font-medium mb-1.5">
                    {item.institution}
                  </p>
                  {item.description && (
                    <p className="text-xs text-stone-500 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 mt-2 font-medium"
                    >
                      <span>Verification Record</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
          <button
            onClick={closeActiveModal}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Close & Explore Room
          </button>
          <button
            onClick={returnToReception}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Return to Reception
          </button>
        </div>
      </div>
    </div>
  );
};
