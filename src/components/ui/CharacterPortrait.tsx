import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

interface CharacterPortraitProps {
  avatarType: 'receptionist' | 'hr' | 'nauman' | 'analyst' | 'dev' | 'designer' | 'qa';
  name: string;
  role: string;
  isSpeaking?: boolean;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  avatarType,
  name,
  role,
  isSpeaking = true,
}) => {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  // Mouth flapping animation while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 140);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  // Periodic natural eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3200);
    return () => clearInterval(blinkInterval);
  }, []);

  // Subtle natural head movement while engaged in conversation
  useEffect(() => {
    if (!isSpeaking) return;
    const tiltInterval = setInterval(() => {
      setHeadTilt(Math.sin(Date.now() / 800) * 2.5);
    }, 200);
    return () => clearInterval(tiltInterval);
  }, [isSpeaking]);

  // Palette per character
  let suitColor = '#8B5CF6'; // purple blazer by default
  let hairColor = '#3B1E08';
  let skinColor = '#F2C9AC';
  let badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';

  if (avatarType === 'nauman') {
    suitColor = '#0F172A'; // navy suit
    hairColor = '#111827';
    skinColor = '#DEB887';
    badgeColor = 'bg-sky-100 text-sky-800 border-sky-200';
  } else if (avatarType === 'hr') {
    suitColor = '#9333EA';
    hairColor = '#4A2810';
    badgeColor = 'bg-purple-100 text-purple-800 border-purple-200';
  } else if (avatarType === 'analyst') {
    suitColor = '#EA580C';
    hairColor = '#1F2937';
    badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
  } else if (avatarType === 'designer') {
    suitColor = '#E11D48';
    hairColor = '#262626';
    badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
  } else if (avatarType === 'dev' || avatarType === 'qa') {
    suitColor = '#16A34A';
    hairColor = '#374151';
    badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  }

  return (
    <div className="flex items-center gap-3 pb-3.5 border-b border-[#EBE3D7]">
      {/* Animated Stylized Bust Avatar */}
      <div className="relative w-13 h-13 rounded-2xl overflow-hidden bg-gradient-to-b from-[#F5EFE6] to-[#EBE3D7] border-2 border-white shadow-xs shrink-0 flex items-center justify-center">
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-[#829C86]/10" />

        {/* Character SVG Bust */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `rotate(${headTilt}deg)` }}
        >
          {/* Hair behind head */}
          <path
            d="M 28 36 C 28 14, 72 14, 72 36 C 72 56, 75 70, 75 70 L 25 70 Z"
            fill={hairColor}
          />

          {/* Shoulders / Suit Jacket */}
          <path
            d="M 12 100 C 12 76, 32 70, 50 70 C 68 70, 88 76, 88 100 Z"
            fill={suitColor}
          />
          {/* Shirt V-neck collar */}
          <path d="M 42 70 L 50 86 L 58 70 Z" fill="#FFFFFF" />

          {/* Tie or Scarf */}
          {avatarType === 'nauman' && (
            <path d="M 48 74 L 52 74 L 53 92 L 50 96 L 47 92 Z" fill="#0284C7" />
          )}

          {/* Neck */}
          <rect x="44" y="60" width="12" height="14" rx="3" fill={skinColor} />

          {/* Head Base */}
          <ellipse cx="50" cy="46" rx="20" ry="22" fill={skinColor} />

          {/* Front Hair Style */}
          <path
            d="M 28 40 C 30 22, 70 20, 72 38 C 65 30, 48 28, 28 40 Z"
            fill={hairColor}
          />
          {avatarType === 'nauman' && (
            <path
              d="M 29 36 C 36 24, 66 22, 71 34 C 64 28, 44 26, 29 36 Z"
              fill={hairColor}
            />
          )}

          {/* Glasses for Nauman */}
          {avatarType === 'nauman' && (
            <g stroke="#0F172A" strokeWidth="2" fill="none">
              <rect x="34" y="42" width="12" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
              <rect x="54" y="42" width="12" height="8" rx="2" fill="rgba(255,255,255,0.2)" />
              <line x1="46" y1="46" x2="54" y2="46" />
            </g>
          )}

          {/* Eyes (Blinking Support) */}
          {isBlinking ? (
            <g stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round">
              <line x1="37" y1="46" x2="43" y2="46" />
              <line x1="57" y1="46" x2="63" y2="46" />
            </g>
          ) : (
            <g fill="#1E293B">
              <circle cx="40" cy="46" r="2.6" />
              <circle cx="60" cy="46" r="2.6" />
              {/* Eye sparkle highlights */}
              <circle cx="41" cy="45" r="0.9" fill="#FFFFFF" />
              <circle cx="61" cy="45" r="0.9" fill="#FFFFFF" />
            </g>
          )}

          {/* Smile / Mouth (Flaps while speaking) */}
          {mouthOpen && isSpeaking ? (
            <path
              d="M 44 58 Q 50 66 56 58 Z"
              fill="#881337"
              stroke="#BE123C"
              strokeWidth="0.8"
            />
          ) : (
            <path
              d="M 44 59 Q 50 64 56 59"
              stroke="#991B1B"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Cheerful Blush Cheek Accents */}
          <circle cx="34" cy="52" r="3" fill="#FDA4AF" opacity="0.45" />
          <circle cx="66" cy="52" r="3" fill="#FDA4AF" opacity="0.45" />
        </svg>

        {/* Live Audio / Speaking Wave Indicator on avatar badge */}
        {isSpeaking && (
          <div className="absolute bottom-1 right-1 flex items-center gap-0.5 bg-white/95 px-1 py-0.5 rounded-full shadow-2xs border border-emerald-200">
            <span className="w-0.5 h-2 bg-[#4D6B53] rounded-full animate-bounce" />
            <span
              className="w-0.5 h-3 bg-[#4D6B53] rounded-full animate-bounce"
              style={{ animationDelay: '0.15s' }}
            />
            <span
              className="w-0.5 h-1.5 bg-[#4D6B53] rounded-full animate-bounce"
              style={{ animationDelay: '0.3s' }}
            />
          </div>
        )}
      </div>

      {/* Name, Role & Voice Indicator */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold text-stone-900 tracking-tight truncate">
            {name}
          </h2>
          {isSpeaking && (
            <span className="flex items-center gap-1 text-[10px] text-[#4D6B53] font-semibold">
              <Volume2 className="w-3 h-3 animate-pulse" />
              <span>Speaking</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${badgeColor}`}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};
