import React from 'react';

interface PartnerLogoProps {
  partnerId: string;
  className?: string;
}

export const SafaricomLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 180 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Safaricom Logo"
  >
    {/* Safaricom Iconic Green & Red Arc/Swoosh */}
    <g transform="translate(6, 4)">
      {/* Green Outer Ring Arc */}
      <path 
        d="M 22 2 C 11.5 2 3 10.5 3 21 C 3 31.5 11.5 40 22 40 C 29 40 35.1 36.2 38.4 30.6 C 36.8 30.9 35.1 31.1 33.4 31.1 C 24.3 31.1 16.9 23.7 16.9 14.6 C 16.9 9.8 19 5.5 22.4 2.6 C 22.3 2.4 22.1 2 22 2 Z" 
        fill="#00A651" 
      />
      {/* Red Accent Inner Arc */}
      <path 
        d="M 27 6.5 C 23.2 8.8 20.7 13 20.7 17.8 C 20.7 24.8 26.4 30.5 33.4 30.5 C 36.2 30.5 38.8 29.6 40.9 28 C 39.5 34.5 33.7 39.5 26.8 39.5 C 18.1 39.5 11 32.4 11 23.7 C 11 15.6 17.1 9 25 8.1 C 25.6 7.5 26.3 7 27 6.5 Z" 
        fill="#ED1C24" 
      />
      {/* Center glowing focal circle */}
      <circle cx="27" cy="19" r="4.5" fill="#00A651" />
    </g>

    {/* Safaricom Typography */}
    <text 
      x="54" 
      y="26" 
      fontFamily="'Poppins', 'Inter', sans-serif" 
      fontSize="17" 
      fontWeight="700" 
      fill="#0F172A"
      letterSpacing="-0.02em"
    >
      Safaricom
    </text>
    <text 
      x="54" 
      y="38" 
      fontFamily="'Inter', sans-serif" 
      fontSize="8.5" 
      fontWeight="600" 
      fill="#00A651" 
      letterSpacing="0.12em"
    >
      FOUNDATION
    </text>
  </svg>
);

export const BritishCouncilLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="British Council Logo"
  >
    {/* British Council Iconic 4-Dot Grid */}
    <g transform="translate(6, 9)">
      <circle cx="7" cy="7" r="6.2" fill="#002B49" />
      <circle cx="23" cy="7" r="6.2" fill="#002B49" />
      <circle cx="7" cy="23" r="6.2" fill="#002B49" />
      <circle cx="23" cy="23" r="6.2" fill="#002B49" />
    </g>

    {/* British Council Typography */}
    <g transform="translate(45, 12)">
      <text 
        x="0" 
        y="12" 
        fontFamily="'Inter', 'Arial', sans-serif" 
        fontSize="13" 
        fontWeight="800" 
        fill="#002B49" 
        letterSpacing="0.08em"
      >
        BRITISH
      </text>
      <text 
        x="0" 
        y="25" 
        fontFamily="'Inter', 'Arial', sans-serif" 
        fontSize="13" 
        fontWeight="800" 
        fill="#002B49" 
        letterSpacing="0.08em"
      >
        COUNCIL
      </text>
    </g>
  </svg>
);

export const GoetheInstitutLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Goethe-Institut Logo"
  >
    {/* Goethe-Institut Bright Green Emblem with G cut */}
    <g transform="translate(6, 6)">
      <rect width="36" height="36" rx="8" fill="#82BC00" />
      <path 
        d="M 27 18 C 27 13.03 22.97 9 18 9 C 13.03 9 9 13.03 9 18 C 9 22.97 13.03 27 18 27 C 21.8 27 25 24.6 26.3 21.2 L 20.8 21.2 C 19.9 22.4 18.5 23.2 16.9 23.2 C 14 23.2 11.8 20.9 11.8 18 C 11.8 15.1 14 12.8 16.9 12.8 C 19 12.8 20.7 14 21.5 15.8 L 26.8 15.8 C 25.8 12.4 22.7 10 19 10" 
        fill="white" 
      />
    </g>

    {/* Goethe Typography */}
    <g transform="translate(50, 12)">
      <text 
        x="0" 
        y="12" 
        fontFamily="'Inter', sans-serif" 
        fontSize="12.5" 
        fontWeight="800" 
        fill="#1E293B" 
        letterSpacing="0.04em"
      >
        GOETHE
      </text>
      <text 
        x="0" 
        y="25" 
        fontFamily="'Inter', sans-serif" 
        fontSize="11" 
        fontWeight="700" 
        fill="#82BC00" 
        letterSpacing="0.06em"
      >
        INSTITUT
      </text>
    </g>
  </svg>
);

export const KenyaFilmCommissionLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Kenya Film Commission Logo"
  >
    {/* Film Reel / Clapperboard Emblem in Kenya Flag Colors */}
    <g transform="translate(6, 6)">
      {/* Outer Film Reel */}
      <circle cx="18" cy="18" r="17" fill="#0F172A" />
      <circle cx="18" cy="18" r="13" fill="#1E293B" stroke="#00A651" strokeWidth="1.5" />
      
      {/* 4 Film Sprocket Holes */}
      <circle cx="18" cy="10" r="2.2" fill="#FFFFFF" />
      <circle cx="26" cy="18" r="2.2" fill="#FFFFFF" />
      <circle cx="18" cy="26" r="2.2" fill="#FFFFFF" />
      <circle cx="10" cy="18" r="2.2" fill="#FFFFFF" />

      {/* Kenya Center Shield in Red */}
      <ellipse cx="18" cy="18" rx="4.5" ry="6.5" fill="#BB1E10" />
      <line x1="18" y1="11.5" x2="18" y2="24.5" stroke="#FFFFFF" strokeWidth="1" />
    </g>

    {/* KFC Typography */}
    <g transform="translate(48, 11)">
      <text 
        x="0" 
        y="12" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="14" 
        fontWeight="800" 
        fill="#0F172A" 
        letterSpacing="0.04em"
      >
        KENYA FILM
      </text>
      <text 
        x="0" 
        y="25" 
        fontFamily="'Inter', sans-serif" 
        fontSize="8.5" 
        fontWeight="700" 
        fill="#BB1E10" 
        letterSpacing="0.1em"
      >
        COMMISSION
      </text>
    </g>
  </svg>
);

export const NairobiDesignWeekLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Nairobi Design Week Logo"
  >
    {/* Geometric NDW Monogram */}
    <g transform="translate(6, 6)">
      <rect width="36" height="36" rx="6" fill="#0F172A" />
      
      {/* Angular N D W geometry */}
      <path d="M 8 28 L 8 10 L 14 20 L 14 10 L 16 10 L 16 28 L 10 18 L 10 28 Z" fill="#FF5A36" />
      <path d="M 18 10 L 22 10 C 25 10 26.5 12 26.5 19 C 26.5 26 25 28 22 28 L 18 28 Z M 20.2 12.2 L 20.2 25.8 L 21.8 25.8 C 23.8 25.8 24.5 24 24.5 19 C 24.5 14 23.8 12.2 21.8 12.2 Z" fill="#FFFFFF" />
      <path d="M 28 10 L 29.5 22 L 31 15 L 32.5 22 L 34 10 L 35.5 10 L 33.5 28 L 31.8 28 L 31 21 L 30.2 28 L 28.5 28 L 26.5 10 Z" fill="#FF5A36" />
    </g>

    {/* NDW Typography */}
    <g transform="translate(50, 11)">
      <text 
        x="0" 
        y="12" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="13.5" 
        fontWeight="800" 
        fill="#0F172A" 
        letterSpacing="-0.01em"
      >
        NAIROBI
      </text>
      <text 
        x="0" 
        y="25" 
        fontFamily="'Inter', sans-serif" 
        fontSize="9" 
        fontWeight="700" 
        fill="#FF5A36" 
        letterSpacing="0.08em"
      >
        DESIGN WEEK
      </text>
    </g>
  </svg>
);

export const HevaFundLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 180 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="HEVA Fund Logo"
  >
    {/* Geometric African Creative Prism Mark */}
    <g transform="translate(6, 7)">
      <path d="M 17 2 L 32 17 L 17 32 L 2 17 Z" fill="#E05A47" />
      <path d="M 17 8 L 26 17 L 17 26 L 8 17 Z" fill="#F8FAFC" />
      <circle cx="17" cy="17" r="4" fill="#2563EB" />
    </g>

    {/* HEVA Wordmark */}
    <g transform="translate(48, 12)">
      <text 
        x="0" 
        y="13" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="17" 
        fontWeight="900" 
        fill="#0F172A" 
        letterSpacing="0.05em"
      >
        HEVA
      </text>
      <text 
        x="0" 
        y="25" 
        fontFamily="'Inter', sans-serif" 
        fontSize="8" 
        fontWeight="700" 
        fill="#64748B" 
        letterSpacing="0.16em"
      >
        CREATIVE FUND
      </text>
    </g>
  </svg>
);

export const PartnerBrandLogo: React.FC<PartnerLogoProps> = ({ partnerId, className = "h-9 w-auto" }) => {
  const normalized = partnerId.toLowerCase();

  if (normalized.includes('safaricom')) {
    return <SafaricomLogo className={className} />;
  }
  if (normalized.includes('british')) {
    return <BritishCouncilLogo className={className} />;
  }
  if (normalized.includes('goethe')) {
    return <GoetheInstitutLogo className={className} />;
  }
  if (normalized.includes('kfc') || normalized.includes('film')) {
    return <KenyaFilmCommissionLogo className={className} />;
  }
  if (normalized.includes('ndw') || normalized.includes('design week')) {
    return <NairobiDesignWeekLogo className={className} />;
  }
  if (normalized.includes('heva')) {
    return <HevaFundLogo className={className} />;
  }

  return (
    <span className="font-['Poppins'] font-bold text-[15px] text-[#0F172A]">
      {partnerId}
    </span>
  );
};
