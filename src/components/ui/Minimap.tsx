import React from 'react';
import { useOffice } from '../../context/OfficeContext';
import { SceneId } from '../../types/office';
import { Map, ChevronDown, ChevronUp, Compass } from 'lucide-react';

interface RoomNode {
  id: SceneId;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

// Updated layout reflecting the reference image floor plan
const ROOM_NODES: RoomNode[] = [
  {
    id: 'ceo',
    name: 'Executive Cabin',
    x: 64,
    y: 6,
    width: 32,
    height: 22,
    color: '#829C86',
  },
  {
    id: 'education',
    name: 'HR & Education',
    x: 34,
    y: 6,
    width: 26,
    height: 22,
    color: '#829C86',
  },
  {
    id: 'skills',
    name: 'Skills Department',
    x: 4,
    y: 12,
    width: 28,
    height: 60,
    color: '#829C86',
  },
  {
    id: 'career',
    name: 'Career Trophies',
    x: 34,
    y: 34,
    width: 24,
    height: 24,
    color: '#B8860B',
  },
  {
    id: 'feedback',
    name: 'Feedback Wall',
    x: 62,
    y: 34,
    width: 24,
    height: 24,
    color: '#829C86',
  },
  {
    id: 'surprise',
    name: 'Surprise Alcove',
    x: 72,
    y: 62,
    width: 24,
    height: 22,
    color: '#7C3AED',
  },
  {
    id: 'reception',
    name: 'Reception & Lounge',
    x: 34,
    y: 64,
    width: 34,
    height: 28,
    color: '#4D6B53',
  },
];

export const Minimap: React.FC = () => {
  const {
    currentScene,
    targetScene,
    isTransitioning,
    navigateTo,
    minimapExpanded,
    toggleMinimap,
  } = useOffice();

  const activeScene = targetScene || currentScene;

  return (
    <aside
      aria-label="Office floorplan minimap"
      className="fixed top-18 right-6 z-30 flex flex-col items-end select-none"
    >
      {/* Mobile/Toggle Header Strip */}
      <div className="flex items-center gap-2 mb-1.5">
        <button
          onClick={toggleMinimap}
          className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-[#FAF7F2]/95 hover:bg-white border border-[#E7DFD3] rounded-lg shadow-sm backdrop-blur-md transition-colors cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-[#4D6B53]" />
          <span>Floorplan</span>
          {minimapExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
          )}
        </button>
      </div>

      {/* Main Floorplan Container */}
      <div
        className={`w-72 bg-[#FDFCF9]/95 backdrop-blur-xl border border-[#E7DFD3] rounded-2xl p-4 shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-all duration-300 origin-top-right ${
          minimapExpanded
            ? 'scale-100 opacity-100 pointer-events-auto block'
            : 'hidden md:block'
        }`}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#EBE3D7]">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
            <Map className="w-4 h-4 text-[#4D6B53]" />
            <span>Studio Floorplan</span>
          </div>
          <span className="text-[11px] text-stone-500">Direct Navigation</span>
        </div>

        {/* 2D Architectural Floorplan */}
        <div className="relative w-full h-52 bg-[#F6F2EB] rounded-xl border border-[#E2D9CC] overflow-hidden p-1.5">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, #D8CEBE 1px, transparent 1px), linear-gradient(to bottom, #D8CEBE 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Interactive Room Areas */}
          {ROOM_NODES.map((room) => {
            const isCurrent = activeScene === room.id;
            return (
              <button
                key={room.id}
                onClick={() => navigateTo(room.id)}
                disabled={isTransitioning}
                title={`Go to ${room.name}`}
                style={{
                  left: `${room.x}%`,
                  top: `${room.y}%`,
                  width: `${room.width}%`,
                  height: `${room.height}%`,
                }}
                className={`absolute rounded-md text-[10px] font-medium transition-all duration-200 flex flex-col items-center justify-center p-1 cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#4D6B53]/20 border-[#4D6B53] text-[#2D4532] font-semibold ring-2 ring-[#4D6B53]/30 shadow-xs'
                    : 'bg-white/80 border-[#DDD4C5] text-stone-600 hover:text-stone-900 hover:border-stone-400 hover:bg-white'
                }`}
              >
                <span className="leading-tight text-center line-clamp-2">
                  {room.name}
                </span>
                {isCurrent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4D6B53] mt-0.5 animate-ping" />
                )}
              </button>
            );
          })}

          {/* South entrance indicator */}
          <div className="absolute bottom-0.5 left-8 text-[9px] text-stone-500 font-mono tracking-wider">
            ▼ ENTRANCE
          </div>
        </div>

        {/* Current Location readout */}
        <div className="mt-3 pt-2.5 border-t border-[#EBE3D7] flex items-center justify-between text-xs">
          <span className="text-stone-500">Current Area:</span>
          <span className="font-semibold text-[#2D4532] capitalize">
            {activeScene === 'ceo'
              ? 'Executive Cabin'
              : activeScene === 'career'
              ? 'Career & Trophies'
              : activeScene === 'education'
              ? 'HR & Education'
              : activeScene}
          </span>
        </div>
      </div>
    </aside>
  );
};
