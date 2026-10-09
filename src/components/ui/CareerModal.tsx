import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import {
  MAJOR_PROJECTS,
  OTHER_PROJECTS,
  CERTIFICATES,
  CAREER_KPIS,
} from '../../data/portfolioData';
import { Certificate, MajorProject, OtherProject } from '../../types/office';
import {
  X,
  Trophy,
  Award,
  ExternalLink,
} from 'lucide-react';

export const CareerModal: React.FC = () => {
  const {
    currentScene,
    isTransitioning,
    activeModal,
    selectedProject,
    selectedCertificate,
    openProjectDetail,
    openCertificateDetail,
    closeActiveModal,
    returnToReception,
  } = useOffice();

  if (currentScene !== 'career' || isTransitioning || !activeModal) {
    return null;
  }

  // CHILD MODAL 1: Major or Other Project Detail
  if (selectedProject) {
    const isMajor = 'responsibilities' in selectedProject;
    const majorProj = isMajor ? (selectedProject as MajorProject) : null;
    const otherProj = !isMajor ? (selectedProject as OtherProject) : null;

    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-detail-title"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none"
      >
        <div className="w-full max-w-2xl bg-[#FDFCF9] border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={closeActiveModal}
            aria-label="Close project details"
            className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>{isMajor ? 'Major Milestone Project · Top Shelf Trophy' : 'Project Trophy · Middle Shelf'}</span>
          </div>

          <h3 id="project-detail-title" className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mb-2">
            {selectedProject.name}
          </h3>

          <div className="flex items-center gap-3 text-xs text-stone-500 mb-6">
            <span className="font-medium text-stone-800">{selectedProject.role}</span>
            {otherProj && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#4D6B53] font-semibold">{otherProj.status}</span>
                <span aria-hidden="true">·</span>
                <span>{otherProj.category}</span>
              </>
            )}
          </div>

          {/* Major Project Breakdown */}
          {majorProj ? (
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Project Overview
                </h4>
                <p className="text-stone-800 leading-relaxed">{majorProj.overview}</p>
              </div>

              <div className="p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl">
                <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Role & Responsibilities
                </h4>
                <p className="text-stone-800 leading-relaxed">{majorProj.responsibilities}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 bg-rose-50/70 border border-rose-200/80 rounded-xl">
                  <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">
                    Problem Addressed
                  </h4>
                  <p className="text-stone-700 text-xs leading-relaxed">{majorProj.problem}</p>
                </div>
                <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    Outcome & Impact
                  </h4>
                  <p className="text-stone-700 text-xs leading-relaxed">{majorProj.outcome}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  Technologies & Architecture
                </h4>
                <div className="flex flex-wrap gap-2 text-xs text-stone-700">
                  {majorProj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white border border-[#DCD3C5] rounded-md font-mono text-stone-800 shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Project Summary
              </h4>
              <p className="text-sm text-stone-800 leading-relaxed">{otherProj?.description}</p>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
            <button
              onClick={closeActiveModal}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Career Shelf
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

  // CHILD MODAL 2: Certificate Detail
  if (selectedCertificate) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-detail-title"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm select-none"
      >
        <div className="w-full max-w-lg bg-[#FDFCF9] border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={closeActiveModal}
            aria-label="Close certificate details"
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#4D6B53] uppercase tracking-wider mb-3">
            <Award className="w-4 h-4" />
            <span>Framed Certificate · Bottom Shelf</span>
          </div>

          <h3 id="cert-detail-title" className="text-lg font-bold text-stone-900 tracking-tight mb-2">
            {selectedCertificate.name}
          </h3>

          <div className="p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl space-y-2 mb-5">
            <div className="flex justify-between text-xs">
              <span className="text-stone-500">Issuing Organization:</span>
              <span className="text-stone-800 font-semibold">{selectedCertificate.issuingOrg}</span>
            </div>
            {selectedCertificate.issueDate && (
              <div className="flex justify-between text-xs">
                <span className="text-stone-500">Issue Status:</span>
                <span className="text-emerald-700 font-medium">{selectedCertificate.issueDate}</span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
              Domain Competencies Covered
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-stone-700">
              {selectedCertificate.skillsCovered.map((skill) => (
                <span key={skill} className="px-2.5 py-1 bg-white border border-[#DCD3C5] rounded-md shadow-2xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {selectedCertificate.credentialUrl && (
            <a
              href={selectedCertificate.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4D6B53] hover:bg-[#3E5843] rounded-xl transition-colors w-full justify-center mb-4 shadow-xs"
            >
              <span>View Credential Authority</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          <div className="pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
            <button
              onClick={closeActiveModal}
              className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
            >
              Back to Career Shelf
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

  // PARENT MODAL: 3-Level Achievement Shelf & KPI Gallery
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="career-gallery-title"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/30 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-4xl bg-[#FDFCF9]/98 border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeActiveModal}
          aria-label="Close career gallery"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gallery Header & Career KPI Display */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#EBE3D7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Interactive Achievement Showcase</span>
            </div>
            <h2 id="career-gallery-title" className="text-2xl font-bold text-stone-900 tracking-tight">
              Career & Achievement Gallery
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Inspect trophies and framed certifications from Nauman&apos;s professional milestones.
            </p>
          </div>

          {/* TWO PRIMARY CAREER KPI BADGES */}
          <div className="flex items-center gap-4 bg-[#F5EFE6] p-3 rounded-2xl border border-[#E2D9CC] shrink-0">
            <div className="px-3 border-r border-[#DCD3C5]">
              <div className="text-2xl font-extrabold text-[#4D6B53] tabular-nums">
                {CAREER_KPIS.totalProjectsCompleted}
              </div>
              <div className="text-[11px] text-stone-600 font-medium">
                {CAREER_KPIS.projectsLabel}
              </div>
            </div>
            <div className="px-3">
              <div className="text-2xl font-extrabold text-amber-700 tabular-nums">
                {CAREER_KPIS.totalYearsExperience}
              </div>
              <div className="text-[11px] text-stone-600 font-medium">
                {CAREER_KPIS.experienceLabel}
              </div>
            </div>
          </div>
        </div>

        {/* SHELF 1: TOP SHELF - MAJOR PROJECTS */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Top Shelf · Major Flagship Projects
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MAJOR_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => openProjectDetail(proj)}
                className="p-3.5 rounded-xl bg-white hover:bg-[#F6F2EB] border border-[#E7DFD3] hover:border-amber-400 transition-all text-left group cursor-pointer flex items-start gap-3 shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-100/80 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                  <Trophy className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-stone-800 group-hover:text-stone-950 truncate">
                    {proj.name}
                  </h4>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{proj.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* SHELF 2: MIDDLE SHELF - OTHER PROJECTS */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4D6B53]" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Middle Shelf · Project Trophies
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {OTHER_PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => openProjectDetail(proj)}
                className="p-3 rounded-xl bg-white hover:bg-[#F6F2EB] border border-[#E7DFD3] hover:border-[#4D6B53]/50 transition-all text-left group cursor-pointer shadow-xs"
              >
                <div className="text-[10px] text-[#4D6B53] font-mono mb-1">{proj.category}</div>
                <h4 className="text-xs font-semibold text-stone-800 group-hover:text-stone-950 line-clamp-2">
                  {proj.name}
                </h4>
              </button>
            ))}
          </div>
        </div>

        {/* SHELF 3: BOTTOM SHELF - CERTIFICATES */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Bottom Shelf · Framed Certificates
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CERTIFICATES.map((cert) => (
              <button
                key={cert.id}
                onClick={() => openCertificateDetail(cert)}
                className="p-3.5 rounded-xl bg-white hover:bg-[#F6F2EB] border border-[#E7DFD3] hover:border-emerald-500/50 transition-all text-left group cursor-pointer flex items-center justify-between shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-xs font-semibold text-stone-800 group-hover:text-stone-950 truncate">
                      {cert.name}
                    </h4>
                    <span className="text-[11px] text-stone-500">{cert.issuingOrg}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
          <button
            onClick={closeActiveModal}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Close & View Shelves
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
