import React, { useState, useEffect } from 'react';
import { useOffice } from '../../context/OfficeContext';
import { CONTACT_CONFIG } from '../../data/portfolioData';
import {
  X,
  Mail,
  Phone,
  Instagram,
  MessageCircle,
  Linkedin,
  FileDown,
} from 'lucide-react';
import { CharacterPortrait } from './CharacterPortrait';

export const CeoCabinModal: React.FC = () => {
  const { currentScene, isTransitioning, closeActiveModal, returnToReception } = useOffice();
  const [isSpeaking, setIsSpeaking] = useState(true);

  useEffect(() => {
    setIsSpeaking(true);
    const timer = setTimeout(() => setIsSpeaking(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (currentScene !== 'ceo' || isTransitioning) {
    return null;
  }

  const handleActionClick = (url: string) => {
    if (!url) return;
    if (url.startsWith('mailto:') || url.startsWith('tel:')) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const actions = [
    {
      id: 'email',
      label: '1. Connect on email',
      icon: Mail,
      url: CONTACT_CONFIG.email ? `mailto:${CONTACT_CONFIG.email}` : '',
      color: '#0284C7',
      desc: 'Send an email inquiry directly',
    },
    {
      id: 'call',
      label: '2. Call now',
      icon: Phone,
      url: CONTACT_CONFIG.phone ? `tel:${CONTACT_CONFIG.phone}` : '',
      color: '#16A34A',
      desc: 'Initiate a direct phone call',
    },
    {
      id: 'instagram',
      label: '3. Instagram',
      icon: Instagram,
      url: CONTACT_CONFIG.instagram,
      color: '#E11D48',
      desc: 'Follow updates and engineering stories',
    },
    {
      id: 'whatsapp',
      label: '4. WhatsApp',
      icon: MessageCircle,
      url: CONTACT_CONFIG.whatsapp,
      color: '#15803D',
      desc: 'Quick chat messaging on WhatsApp',
    },
    {
      id: 'linkedin',
      label: '5. LinkedIn',
      icon: Linkedin,
      url: CONTACT_CONFIG.linkedin,
      color: '#0284C7',
      desc: 'Connect professionally on LinkedIn',
    },
    {
      id: 'cv',
      label: '6. Download CV',
      icon: FileDown,
      url: CONTACT_CONFIG.cvUrl,
      color: '#7C3AED',
      desc: 'Download verified curriculum vitae PDF',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ceo-cabin-title"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-stone-900/35 backdrop-blur-xs select-none"
    >
      <div className="w-full max-w-2xl bg-[#FDFCF9]/98 border border-[#E7DFD3] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.12)] p-6 sm:p-8 relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={closeActiveModal}
          aria-label="Close executive cabin dialog"
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Character Portrait of Nauman (CEO) */}
        <CharacterPortrait
          avatarType="nauman"
          name="Nauman Ansari"
          role="Founder & Solutions Architect"
          isSpeaking={isSpeaking}
        />

        {/* SPEC REQUIRED GREETING TEXT */}
        <div className="my-5 p-4 bg-[#F5EFE6] border border-[#E2D9CC] rounded-xl">
          <p className="text-sm text-stone-800 leading-relaxed font-semibold">
            &ldquo;Hi, I&apos;m Nauman. Nice to meet you! I hope you like the experience. Let&apos;s connect virtually.&rdquo;
          </p>
        </div>

        {/* 6 MANDATORY ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((act) => {
            const Icon = act.icon;
            const isConfigured = Boolean(act.url);

            return (
              <button
                key={act.id}
                onClick={() => isConfigured && handleActionClick(act.url)}
                disabled={!isConfigured}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  isConfigured
                    ? 'bg-white hover:bg-[#F6F2EB] border-[#E7DFD3] hover:border-[#4D6B53]/50 cursor-pointer group shadow-xs'
                    : 'bg-stone-50 border-stone-200 opacity-50 cursor-not-allowed'
                }`}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${act.color}15`, color: act.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-bold text-stone-900 group-hover:text-[#2D4532] transition-colors">
                    {act.label}
                  </h3>
                  <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                    {isConfigured ? act.desc : 'Not configured'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-4 border-t border-[#EBE3D7] flex items-center justify-between">
          <button
            onClick={closeActiveModal}
            className="px-4 py-2 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-xl transition-colors cursor-pointer"
          >
            Close & View Cabin
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
