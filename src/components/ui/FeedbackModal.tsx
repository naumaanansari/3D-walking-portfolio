import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { FEEDBACK_ITEMS } from '../../data/portfolioData';
import { FeedbackItem } from '../../types/office';
import { X, Star, MessageSquareQuote } from 'lucide-react';

export const FeedbackModal: React.FC = () => {
  const {
    currentScene,
    isTransitioning,
    selectedFeedback,
    openFeedbackDetail,
    closeActiveModal,
    returnToReception,
  } = useOffice();

  if (currentScene !== 'feedback' || isTransitioning) {
    return null;
  }

  // CHILD MODAL: Full Review Detail View
  if (selectedFeedback) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-detail-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none"
      >
        <div className="w-full max-w-lg bg-[#FDFCF9] border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={closeActiveModal}
            aria-label="Close review details"
            className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#4D6B53] uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Colleague & Partner Feedback Note</span>
          </div>

          <h3 id="feedback-detail-title" className="text-xl font-bold text-stone-900 tracking-tight">
            {selectedFeedback.reviewerName}
          </h3>
          <p className="text-xs text-stone-500 mb-4">{selectedFeedback.reviewerRole}</p>

          {/* Star Rating Display */}
          <div className="flex items-center gap-1.5 mb-5 p-2.5 bg-[#F5EFE6] rounded-xl border border-[#E2D9CC] w-fit">
            <div className="flex items-center gap-1 text-amber-500">
              {Array.from({ length: selectedFeedback.starRating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-800 ml-1">
              {selectedFeedback.starRating}.0 Rating
            </span>
          </div>

          <div className="p-4 bg-white border border-[#E2D9CC] rounded-xl mb-6 shadow-2xs">
            <p className="text-sm text-stone-800 leading-relaxed italic">
              &ldquo;{selectedFeedback.fullReview}&rdquo;
            </p>
            {selectedFeedback.date && (
              <p className="text-xs text-stone-400 mt-3 text-right">
                Archived · {selectedFeedback.date}
              </p>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
            <button
              onClick={closeActiveModal}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Feedback Wall
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
  }

  // PARENT MODAL: Interactive Feedback Board
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-board-title"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-3xl bg-[#FDFCF9]/98 border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={returnToReception}
          aria-label="Close feedback room and return to reception"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4D6B53] uppercase tracking-wider mb-1">
            <MessageSquareQuote className="w-4 h-4" />
            <span>Interactive Wall Display</span>
          </div>
          <h2 id="feedback-board-title" className="text-2xl font-bold text-stone-900 tracking-tight">
            Client & Colleague Feedback
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Read testimonials from engineering leaders and product partners who worked alongside Nauman.
          </p>
        </div>

        {/* 4 Feedback Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEEDBACK_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => openFeedbackDetail(item)}
              className="p-4 rounded-xl bg-white hover:bg-[#F6F2EB] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-all text-left group cursor-pointer flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: item.starRating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  {item.date && (
                    <span className="text-[11px] text-stone-400 font-mono">{item.date}</span>
                  )}
                </div>
                <p className="text-xs text-stone-700 line-clamp-3 leading-relaxed mb-3 italic">
                  &ldquo;{item.shortReview}&rdquo;
                </p>
              </div>
              <div className="pt-2 border-t border-[#EBE3D7] flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-stone-900 group-hover:text-[#4D6B53] transition-colors">
                    {item.reviewerName}
                  </span>
                  <p className="text-[11px] text-stone-500 truncate max-w-[200px]">
                    {item.reviewerRole}
                  </p>
                </div>
                <span className="text-[11px] text-[#4D6B53] font-medium shrink-0">
                  Read full →
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
          <span className="text-xs text-stone-500">Click any card or 3D pin note to view full text</span>
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
