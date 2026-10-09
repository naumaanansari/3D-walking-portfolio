import React, { useState } from 'react';
import { useOffice } from '../../context/OfficeContext';
import { SceneId } from '../../types/office';
import { MessageSquare, ArrowRight, User } from 'lucide-react';

export const ReceptionDialogue: React.FC = () => {
  const {
    currentScene,
    isTransitioning,
    visitorName,
    namePromptState,
    setVisitorName,
    setNamePromptState,
    navigateTo,
  } = useOffice();

  const [inputName, setInputName] = useState('');
  const [errorText, setErrorText] = useState('');

  // Only display when at reception and not actively in a submodal
  if (currentScene !== 'reception' || isTransitioning) {
    return null;
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      setErrorText('Please enter a name or choose "No, thanks" to proceed.');
      return;
    }
    if (trimmed.length > 30) {
      setErrorText('Name must be 30 characters or fewer.');
      return;
    }
    setErrorText('');
    setVisitorName(trimmed);
  };

  const handleDeclineName = () => {
    setErrorText('');
    setNamePromptState('declined');
  };

  const handleChooseDestination = (destination: SceneId) => {
    navigateTo(destination);
  };

  const isAskingOrInitial = namePromptState === 'initial' || namePromptState === 'asking-name';

  return (
    <aside
      aria-label="Receptionist dialogue panel"
      className="fixed bottom-6 left-6 z-30 w-[calc(100vw-3rem)] max-w-lg bg-[#FDFCF9]/95 backdrop-blur-xl border border-[#E7DFD3] rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] p-6 text-stone-800 select-none transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      {/* Receptionist Header Bar */}
      <div className="flex items-center gap-3 pb-4 border-b border-[#EBE3D7]">
        <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200/80 flex items-center justify-center text-purple-700">
          <MessageSquare className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-stone-900 tracking-tight">Elena · Office Receptionist</h2>
          <p className="text-xs text-stone-500">Nauman Ansari Tech Studio</p>
        </div>
      </div>

      {/* STEP 1: INITIAL NAME INQUIRY */}
      {namePromptState === 'initial' && (
        <div className="pt-4 space-y-4">
          <p className="text-sm text-stone-700 leading-relaxed font-medium">
            &ldquo;Hello, visitor! Glad to see you. May I know your name?&rdquo;
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              onClick={() => setNamePromptState('asking-name')}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] active:bg-[#344C39] rounded-xl transition-colors cursor-pointer text-center shadow-xs"
            >
              Yes, of course.
            </button>
            <button
              onClick={handleDeclineName}
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 active:bg-stone-250 border border-stone-200 rounded-xl transition-colors cursor-pointer text-center"
            >
              No, thanks.
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: NAME INPUT FORM */}
      {namePromptState === 'asking-name' && (
        <form onSubmit={handleNameSubmit} className="pt-4 space-y-3.5">
          <p className="text-sm text-stone-700">
            &ldquo;Wonderful! How would you like me to address you?&rdquo;
          </p>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              autoFocus
              value={inputName}
              onChange={(e) => {
                setInputName(e.target.value);
                if (errorText) setErrorText('');
              }}
              placeholder="Enter your name"
              maxLength={30}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DCD3C5] focus:border-[#4D6B53] rounded-xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#4D6B53]"
            />
          </div>
          {errorText && <p className="text-xs text-rose-600">{errorText}</p>}
          <div className="flex gap-2.5 pt-1">
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              Continue
            </button>
            <button
              type="button"
              onClick={handleDeclineName}
              className="py-2.5 px-4 text-xs font-semibold text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Skip
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: PERSONALIZED WELCOME & 6 CHOICES */}
      {!isAskingOrInitial && (
        <div className="pt-4 space-y-4">
          <p className="text-sm text-stone-800 leading-relaxed font-semibold">
            &ldquo;Hello, {visitorName}! What can I help you with?&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {/* Choice 1 */}
            <button
              onClick={() => handleChooseDestination('skills')}
              className="p-3 text-left rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900">
                  1. I want to explore skills.
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4D6B53] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Choice 2 */}
            <button
              onClick={() => handleChooseDestination('career')}
              className="p-3 text-left rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900">
                  2. How was Nauman&apos;s career?
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4D6B53] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Choice 3 */}
            <button
              onClick={() => handleChooseDestination('education')}
              className="p-3 text-left rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900">
                  3. What is his education?
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4D6B53] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Choice 4 */}
            <button
              onClick={() => handleChooseDestination('feedback')}
              className="p-3 text-left rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900">
                  4. Feedback Room.
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4D6B53] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Choice 5 */}
            <button
              onClick={() => handleChooseDestination('ceo')}
              className="p-3 text-left rounded-xl bg-white hover:bg-[#F5EFE6] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-800 group-hover:text-stone-900">
                  5. I want to meet him.
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#4D6B53] transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>

            {/* Choice 6 */}
            <button
              onClick={() => handleChooseDestination('surprise')}
              className="p-3 text-left rounded-xl bg-gradient-to-r from-purple-50 to-amber-50 hover:from-purple-100 hover:to-amber-100 border border-purple-200/80 hover:border-purple-300 transition-colors group cursor-pointer shadow-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-purple-900 group-hover:text-purple-950">
                  6. Surprise me with something unique.
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:text-purple-700 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
