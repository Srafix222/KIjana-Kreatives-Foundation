import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'stacked' | 'icon-only' | 'monogram' | 'white';
  textClassName?: string;
  tagline?: boolean;
}

/**
 * Official Kijana Kreatives Foundation Logo Components
 * Faithfully matches the Brand Guidelines Sheet:
 * - Option 1: Primary Horizontal Logo (Icon + Kijana Kreatives Foundation + Slogan)
 * - Option 2: Stacked Logo (Centered)
 * - Option 3: Icon-Only Mark (Ideal for Favicon, Avatar, App Icon)
 * - Option 4: Monogram "KKF"
 */

export const KKFIconMark: React.FC<{ className?: string; size?: number | string; inverted?: boolean }> = ({
  className = "w-10 h-10",
  size,
  inverted = false
}) => {
  const navyColor = inverted ? "#FFFFFF" : "#0F172A";
  const blueColor = "#2563EB";
  const amberColor = "#F59E0B";

  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      role="img"
      aria-label="Kijana Kreatives Foundation Mark"
    >
      {/* 1. Left Arc Embracing Shape */}
      <path 
        d="M 60 14 C 42 14 27 24 20 40 C 18 44 20 46 24 46 C 28 46 29 44 31 39 C 36 27 47 20 60 20 C 63 20 65 17 65 14 C 65 11 63 14 60 14 Z" 
        fill={navyColor}
      />
      <path 
        d="M 19 46 C 15 54 14 62 16 71 C 21 89 36 103 55 106 C 70 108 84 102 93 92 C 95 89 93 86 89 87 C 82 93 72 98 60 98 C 41 98 25 84 22 66 C 21 60 22 53 24 48 C 25 45 22 43 19 46 Z" 
        fill={navyColor}
      />

      {/* 2. Orange/Amber Community Dot */}
      <circle cx="21" cy="62" r="7.5" fill={amberColor} />

      {/* 3. Blue Top Head / Identity Circle */}
      <circle cx="49" cy="18" r="8" fill={blueColor} />

      {/* 4. Amber Sparkle Star */}
      <path 
        d="M 97 12 Q 97 19 104 19 Q 97 19 97 26 Q 97 19 90 19 Q 97 19 97 12 Z" 
        fill={amberColor}
      />

      {/* 5. Royal Blue Vertical Pillar */}
      <rect x="42" y="32" width="14" height="48" rx="2" fill={blueColor} />

      {/* 6. Amber Upward Growth Arrow */}
      <path 
        d="M 46 80 L 89 31 L 81 29 L 98 23 L 95 40 L 89 34 L 54 75 Z" 
        fill={amberColor}
      />

      {/* 7. Royal Blue Lower Dynamic Leg */}
      <path 
        d="M 64 56 L 93 90 L 76 90 L 52 64 Z" 
        fill={blueColor}
      />

      {/* 8. Amber Play Triangle (Media/Creativity symbol) */}
      <path 
        d="M 64 78 L 74 84 L 64 90 Z" 
        fill="none" 
        stroke={amberColor} 
        strokeWidth="3" 
        strokeLinejoin="round"
      />

      {/* 9. Blue Digital Pixels */}
      <rect x="85" y="94" width="5.5" height="5.5" fill={blueColor} />
      <rect x="92" y="94" width="5.5" height="5.5" fill={blueColor} />
      <rect x="92" y="87" width="5.5" height="5.5" fill={blueColor} />
    </svg>
  );
};

export const BrandLogo: React.FC<LogoProps> = ({
  className = "flex items-center gap-3",
  size = 42,
  variant = 'full',
  textClassName = "text-white",
  tagline = false
}) => {
  if (variant === 'icon-only') {
    return <KKFIconMark size={size} />;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <KKFIconMark size={size} className="mb-2" />
        <div className="flex flex-col items-center">
          <span className="font-['Poppins'] font-bold text-2xl tracking-tight text-[#2563EB] leading-none">
            Kijana
          </span>
          <span className="font-['Poppins'] font-bold text-base tracking-tight text-[#0F172A] leading-tight mt-0.5">
            Kreatives Foundation
          </span>
          {tagline && (
            <span className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase mt-1 font-['Poppins']">
              Creative & Digital Training
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'monogram') {
    return (
      <div className="flex items-center gap-1 font-['Poppins'] font-black text-2xl tracking-tight">
        <span className="text-[#2563EB]">K</span>
        <span className="text-[#F59E0B]">K</span>
        <span className="text-[#0F172A]">F</span>
      </div>
    );
  }

  // Default Primary Horizontal Logo
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        <KKFIconMark className="w-full h-full" />
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-baseline gap-1.5 leading-none">
          <span className="font-['Poppins'] font-bold text-[18px] sm:text-[20px] text-[#2563EB] tracking-tight">
            Kijana
          </span>
          <span className={`font-['Poppins'] font-bold text-[15px] sm:text-[17px] tracking-tight ${textClassName}`}>
            Kreatives
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[10px] sm:text-[10.5px] font-semibold text-slate-400 uppercase tracking-widest leading-none font-['Poppins']">
            Foundation
          </span>
          {tagline && (
            <span className="text-[8.5px] font-medium text-slate-400 tracking-wider uppercase ml-2 hidden lg:inline">
              Creative & Digital Training
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
