import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { SceneId } from '../../types/office';
import { Compass } from 'lucide-react';

export const FallbackView: React.FC = () => {
  const { currentScene, navigateTo } = useOffice();

  const scenes: { id: SceneId; title: string; desc: string }[] = [
    { id: 'reception', title: 'Reception Desk', desc: 'Welcome desk and guest registration' },
    { id: 'skills', title: 'Skills Department', desc: 'Workstations for 5 core technical disciplines' },
    { id: 'career', title: 'Career & Trophies', desc: 'Major milestones, projects and credentials' },
    { id: 'education', title: 'HR & Education', desc: 'Academic background and certifications' },
    { id: 'feedback', title: 'Feedback Room', desc: 'Reviews from partners and peers' },
    { id: 'ceo', title: 'Meet Nauman', desc: 'Executive cabin and direct contact actions' },
    { id: 'surprise', title: 'Surprise Area', desc: 'Special digital portfolio portal' },
  ];

  return (
    <div className="absolute inset-0 bg-[#F6F2EB] flex flex-col items-center justify-center p-6 text-center select-none overflow-y-auto">
      <div className="w-12 h-12 rounded-2xl bg-[#4D6B53]/10 border border-[#4D6B53]/20 text-[#2D4532] flex items-center justify-center mb-4">
        <Compass className="w-6 h-6" />
      </div>
      <h2 className="text-xl font-bold text-stone-900 mb-2">
        2D Isometric Navigation Mode
      </h2>
      <p className="text-xs text-stone-600 max-w-md mb-8">
        WebGL 3D canvas is disabled or unsupported on this device. You can navigate through all rooms and portfolio content using the direct links below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-2xl text-left">
        {scenes.map((s) => (
          <button
            key={s.id}
            onClick={() => navigateTo(s.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              currentScene === s.id
                ? 'bg-[#4D6B53]/15 border-[#4D6B53] text-[#2D4532] font-semibold'
                : 'bg-white border-[#E2D9CC] text-stone-700 hover:border-[#4D6B53]/50 hover:bg-[#FAF8F5]'
            }`}
          >
            <h3 className="text-sm font-bold">{s.title}</h3>
            <p className="text-xs text-stone-500 mt-1">{s.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
