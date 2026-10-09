import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { SKILL_DEPARTMENTS } from '../../data/portfolioData';
import { Department } from '../../types/office';
import {
  X,
  Briefcase,
  Cpu,
  Code2,
  Palette,
  ShieldCheck,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

const DEPARTMENT_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Briefcase: Briefcase,
  Cpu: Cpu,
  Code2: Code2,
  Palette: Palette,
  ShieldCheck: ShieldCheck,
};

export const SkillsModal: React.FC = () => {
  const {
    currentScene,
    isTransitioning,
    selectedDepartment,
    openDepartmentDetail,
    closeActiveModal,
    returnToReception,
  } = useOffice();

  if (currentScene !== 'skills' || isTransitioning) {
    return null;
  }

  // CHILD MODAL: Department Detailed-View Placeholder Panel
  if (selectedDepartment) {
    const IconComponent = DEPARTMENT_ICONS[selectedDepartment.iconName] || Layers;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dept-detail-title"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none"
      >
        <div className="w-full max-w-lg bg-[#FDFCF9] border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={closeActiveModal}
            aria-label="Close department details"
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5 mb-5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#4D6B53]/10 text-[#2D4532]"
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 id="dept-detail-title" className="text-lg font-bold text-stone-900 tracking-tight">
                {selectedDepartment.name}
              </h3>
              <p className="text-xs text-stone-500">Department Workstation Overview</p>
            </div>
          </div>

          <p className="text-sm text-stone-700 leading-relaxed mb-6">
            {selectedDepartment.description}
          </p>

          {/* REQUIRED MANDATORY PLACEHOLDER MESSAGE */}
          <div className="p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#4D6B53] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-stone-900">
                We&apos;re working on it. This department is being prepared for your next visit.
              </p>
              <p className="text-xs text-stone-600 mt-1">
                Case studies, tools, and technical delivery artifacts will be published soon.
              </p>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
            <button
              onClick={closeActiveModal}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Skills Hub
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

  // PARENT MODAL: Skills Department Hub View
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="skills-hub-title"
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-3xl bg-[#FDFCF9]/98 border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={returnToReception}
          aria-label="Close skills view and return to reception"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4D6B53] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Floor Section</span>
          </div>
          <h2 id="skills-hub-title" className="text-2xl font-bold text-stone-900 tracking-tight">
            Skills Department
          </h2>
          <p className="text-sm text-stone-600 mt-1">
            Select any department area below or click its 3D workstation in the office to inspect responsibilities.
          </p>
        </div>

        {/* 5 Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {SKILL_DEPARTMENTS.map((dept) => {
            const IconComponent = DEPARTMENT_ICONS[dept.iconName] || Layers;
            return (
              <button
                key={dept.id}
                onClick={() => openDepartmentDetail(dept)}
                className="p-4 rounded-xl bg-white hover:bg-[#F6F2EB] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-all text-left group cursor-pointer flex items-start gap-3.5 shadow-xs"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 bg-[#4D6B53]/10 text-[#2D4532]"
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-stone-800 group-hover:text-stone-950 truncate">
                      {dept.name}
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {dept.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between text-xs text-stone-500">
          <span>Click any 3D workstation or card to inspect</span>
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
