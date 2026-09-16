import React, { useState } from 'react';

export interface CompanyMeta {
  id: string;
  name: string;
  domain: string;
  websiteUrl: string;
  logoUrl: string;
  faviconUrl: string;
  altFaviconUrl?: string;
  type: string;
}

export const COMPANY_ASSETS: Record<string, CompanyMeta> = {
  safaricom: {
    id: 'safaricom',
    name: 'Safaricom Foundation',
    domain: 'safaricom.co.ke',
    websiteUrl: 'https://www.safaricomfoundation.org',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Safaricom_logo.svg/500px-Safaricom_logo.svg.png',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=safaricom.co.ke&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/safaricom.co.ke.ico',
    type: 'Telecom & Digital Inclusion'
  },
  britishcouncil: {
    id: 'britishcouncil',
    name: 'British Council Kenya',
    domain: 'britishcouncil.org',
    websiteUrl: 'https://www.britishcouncil.or.ke',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/British_Council_logo_2020.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=britishcouncil.org&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/britishcouncil.org.ico',
    type: 'Creative Economy Partner'
  },
  goethe: {
    id: 'goethe',
    name: 'Goethe-Institut Nairobi',
    domain: 'goethe.de',
    websiteUrl: 'https://www.goethe.de/ins/ke/en/index.html',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Goethe-Institut_Logo.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=goethe.de&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/goethe.de.ico',
    type: 'Cultural Exchange'
  },
  kfc: {
    id: 'kfc',
    name: 'Kenya Film Commission',
    domain: 'kenyafilmcommission.go.ke',
    websiteUrl: 'https://kenyafilmcommission.go.ke',
    logoUrl: 'https://kenyafilmcommission.go.ke/wp-content/themes/_film/assets/images/logo.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=kenyafilmcommission.go.ke&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/kenyafilmcommission.go.ke.ico',
    type: 'Film & Media Partner'
  },
  ndw: {
    id: 'ndw',
    name: 'Nairobi Design Week',
    domain: 'nairobi.design',
    websiteUrl: 'https://nairobi.design',
    logoUrl: 'https://cdn.prod.website-files.com/6a21fba6fcb435ddecc48a37/6a22c084862e9f9cabaf3840_1%20N.png',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=nairobi.design&sz=128',
    altFaviconUrl: 'https://cdn.prod.website-files.com/6a21fba6fcb435ddecc48a37/6a22c084264e4697b1fc239c_1%20N.png',
    type: 'Industry Showcase'
  },
  heva: {
    id: 'heva',
    name: 'HEVA Fund',
    domain: 'hevafund.com',
    websiteUrl: 'https://hevafund.com',
    logoUrl: '',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=hevafund.com&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/hevafund.com.ico',
    type: 'Creative Enterprises'
  },
  coopbank: {
    id: 'coopbank',
    name: 'Co-operative Bank of Kenya',
    domain: 'co-opbank.co.ke',
    websiteUrl: 'https://www.co-opbank.co.ke',
    logoUrl: 'https://www.co-opbank.co.ke/wp-content/uploads/2026/05/Coop-Logo-02-1.png',
    faviconUrl: 'https://www.co-opbank.co.ke/wp-content/uploads/2026/06/cropped-Icon-192x192.jpeg',
    altFaviconUrl: 'https://www.google.com/s2/favicons?domain=co-opbank.co.ke&sz=128',
    type: 'Official Banking Partner'
  },
  mpesa: {
    id: 'mpesa',
    name: 'M-PESA (Safaricom)',
    domain: 'safaricom.co.ke',
    websiteUrl: 'https://www.safaricom.co.ke/personal/m-pesa',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=safaricom.co.ke&sz=128',
    altFaviconUrl: 'https://icons.duckduckgo.com/ip3/safaricom.co.ke.ico',
    type: 'Mobile Money Service'
  },
  paypal: {
    id: 'paypal',
    name: 'PayPal',
    domain: 'paypal.com',
    websiteUrl: 'https://www.paypal.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=paypal.com&sz=128',
    altFaviconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg',
    type: 'Global Online Payments'
  },
  visa: {
    id: 'visa',
    name: 'Visa',
    domain: 'visa.com',
    websiteUrl: 'https://www.visa.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=visa.com&sz=128',
    type: 'Digital Payment Network'
  },
  mastercard: {
    id: 'mastercard',
    name: 'Mastercard',
    domain: 'mastercard.com',
    websiteUrl: 'https://www.mastercard.com',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
    faviconUrl: 'https://www.google.com/s2/favicons?domain=mastercard.com&sz=128',
    type: 'Global Payment Solutions'
  }
};

export const resolveCompanyMeta = (query: string): CompanyMeta | undefined => {
  const norm = query.toLowerCase().trim();
  if (COMPANY_ASSETS[norm]) return COMPANY_ASSETS[norm];
  if (norm.includes('safaricom')) return COMPANY_ASSETS.safaricom;
  if (norm.includes('british')) return COMPANY_ASSETS.britishcouncil;
  if (norm.includes('goethe')) return COMPANY_ASSETS.goethe;
  if (norm.includes('kfc') || norm.includes('film')) return COMPANY_ASSETS.kfc;
  if (norm.includes('ndw') || norm.includes('design week')) return COMPANY_ASSETS.ndw;
  if (norm.includes('heva')) return COMPANY_ASSETS.heva;
  if (norm.includes('coop') || norm.includes('co-op') || norm.includes('bank')) return COMPANY_ASSETS.coopbank;
  if (norm.includes('mpesa') || norm.includes('m-pesa')) return COMPANY_ASSETS.mpesa;
  if (norm.includes('paypal')) return COMPANY_ASSETS.paypal;
  if (norm.includes('visa')) return COMPANY_ASSETS.visa;
  if (norm.includes('mastercard') || norm.includes('mc')) return COMPANY_ASSETS.mastercard;
  return undefined;
};

// ==========================================
// TRUE FAVICON COMPONENT
// ==========================================
interface CompanyFaviconProps {
  company: string;
  size?: number;
  className?: string;
  title?: string;
  showBorder?: boolean;
}

export const CompanyFavicon: React.FC<CompanyFaviconProps> = ({
  company,
  size = 24,
  className = '',
  title,
  showBorder = true
}) => {
  const meta = resolveCompanyMeta(company);
  const [srcIndex, setSrcIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  if (!meta) {
    return null;
  }

  const sources = [
    meta.faviconUrl,
    meta.altFaviconUrl,
    `https://www.google.com/s2/favicons?domain=${meta.domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${meta.domain}.ico`
  ].filter(Boolean) as string[];

  const currentSrc = sources[srcIndex];

  const handleImageError = () => {
    if (srcIndex + 1 < sources.length) {
      setSrcIndex(srcIndex + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <span 
        className={`inline-flex items-center justify-center font-['Poppins'] font-bold text-[10px] text-white bg-[#0F172A] rounded-full shrink-0 ${className}`}
        style={{ width: size, height: size }}
        title={title || meta.name}
      >
        {meta.name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={`${meta.name} Favicon`}
      title={title || meta.name}
      width={size}
      height={size}
      onError={handleImageError}
      className={`shrink-0 object-contain rounded-[6px] ${
        showBorder ? 'bg-white p-0.5 border border-[#E2E8F0] shadow-2xs' : ''
      } ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};

// ==========================================
// FALLBACK VECTOR SVGS (Pixel-perfect representations)
// ==========================================
export const SafaricomVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 180 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Safaricom Logo"
  >
    <g transform="translate(6, 4)">
      <path 
        d="M 22 2 C 11.5 2 3 10.5 3 21 C 3 31.5 11.5 40 22 40 C 29 40 35.1 36.2 38.4 30.6 C 36.8 30.9 35.1 31.1 33.4 31.1 C 24.3 31.1 16.9 23.7 16.9 14.6 C 16.9 9.8 19 5.5 22.4 2.6 C 22.3 2.4 22.1 2 22 2 Z" 
        fill="#00A651" 
      />
      <path 
        d="M 27 6.5 C 23.2 8.8 20.7 13 20.7 17.8 C 20.7 24.8 26.4 30.5 33.4 30.5 C 36.2 30.5 38.8 29.6 40.9 28 C 39.5 34.5 33.7 39.5 26.8 39.5 C 18.1 39.5 11 32.4 11 23.7 C 11 15.6 17.1 9 25 8.1 C 25.6 7.5 26.3 7 27 6.5 Z" 
        fill="#ED1C24" 
      />
      <circle cx="27" cy="19" r="4.5" fill="#00A651" />
    </g>
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

export const BritishCouncilVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="British Council Logo"
  >
    <g transform="translate(6, 9)">
      <circle cx="7" cy="7" r="6.2" fill="#002B49" />
      <circle cx="23" cy="7" r="6.2" fill="#002B49" />
      <circle cx="7" cy="23" r="6.2" fill="#002B49" />
      <circle cx="23" cy="23" r="6.2" fill="#002B49" />
    </g>
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

export const GoetheInstitutVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Goethe-Institut Logo"
  >
    <g transform="translate(6, 6)">
      <rect width="36" height="36" rx="8" fill="#82BC00" />
      <path 
        d="M 27 18 C 27 13.03 22.97 9 18 9 C 13.03 9 9 13.03 9 18 C 9 22.97 13.03 27 18 27 C 21.8 27 25 24.6 26.3 21.2 L 20.8 21.2 C 19.9 22.4 18.5 23.2 16.9 23.2 C 14 23.2 11.8 20.9 11.8 18 C 11.8 15.1 14 12.8 16.9 12.8 C 19 12.8 20.7 14 21.5 15.8 L 26.8 15.8 C 25.8 12.4 22.7 10 19 10" 
        fill="white" 
      />
    </g>
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

export const KenyaFilmCommissionVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Kenya Film Commission Logo"
  >
    <g transform="translate(6, 6)">
      <circle cx="18" cy="18" r="17" fill="#0F172A" />
      <circle cx="18" cy="18" r="13" fill="#1E293B" stroke="#00A651" strokeWidth="1.5" />
      <circle cx="18" cy="10" r="2.2" fill="#FFFFFF" />
      <circle cx="26" cy="18" r="2.2" fill="#FFFFFF" />
      <circle cx="18" cy="26" r="2.2" fill="#FFFFFF" />
      <circle cx="10" cy="18" r="2.2" fill="#FFFFFF" />
      <ellipse cx="18" cy="18" rx="4.5" ry="6.5" fill="#BB1E10" />
      <line x1="18" y1="11.5" x2="18" y2="24.5" stroke="#FFFFFF" strokeWidth="1" />
    </g>
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

export const NairobiDesignWeekVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 190 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Nairobi Design Week Logo"
  >
    <g transform="translate(6, 6)">
      <rect width="36" height="36" rx="6" fill="#0F172A" />
      <path d="M 8 28 L 8 10 L 14 20 L 14 10 L 16 10 L 16 28 L 10 18 L 10 28 Z" fill="#FF5A36" />
      <path d="M 18 10 L 22 10 C 25 10 26.5 12 26.5 19 C 26.5 26 25 28 22 28 L 18 28 Z M 20.2 12.2 L 20.2 25.8 L 21.8 25.8 C 23.8 25.8 24.5 24 24.5 19 C 24.5 14 23.8 12.2 21.8 12.2 Z" fill="#FFFFFF" />
      <path d="M 28 10 L 29.5 22 L 31 15 L 32.5 22 L 34 10 L 35.5 10 L 33.5 28 L 31.8 28 L 31 21 L 30.2 28 L 28.5 28 L 26.5 10 Z" fill="#FF5A36" />
    </g>
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

export const HevaFundVectorSvg: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
  <svg 
    viewBox="0 0 190 52" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="HEVA Fund Logo"
  >
    {/* Authentic HEVA 2x2 Brand Emblem */}
    <g transform="translate(6, 6)">
      <rect width="40" height="40" rx="7" fill="#0F172A" />
      <text x="13" y="18" fontFamily="'Poppins', sans-serif" fontSize="13.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle">H</text>
      <text x="27" y="18" fontFamily="'Poppins', sans-serif" fontSize="13.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle">E</text>
      <text x="13" y="33" fontFamily="'Poppins', sans-serif" fontSize="13.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle">V</text>
      <text x="27" y="33" fontFamily="'Poppins', sans-serif" fontSize="13.5" fontWeight="900" fill="#FFFFFF" textAnchor="middle">A</text>
    </g>
    <g transform="translate(56, 14)">
      <text 
        x="0" 
        y="15" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="19" 
        fontWeight="900" 
        fill="#0F172A" 
        letterSpacing="0.06em"
      >
        HEVA
      </text>
      <text 
        x="0" 
        y="28" 
        fontFamily="'Inter', sans-serif" 
        fontSize="9" 
        fontWeight="700" 
        fill="#64748B" 
        letterSpacing="0.16em"
      >
        CREATIVE FUND
      </text>
    </g>
  </svg>
);

export const CoopBankVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 180 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Co-operative Bank of Kenya Logo"
  >
    <g transform="translate(6, 8)">
      <rect width="32" height="32" rx="6" fill="#005B38" />
      <path d="M 22 13 C 20.8 11.8 19 11 16.5 11 C 12.3 11 9 14.5 9 19 C 9 23.5 12.3 27 16.5 27 C 19 27 20.8 26.2 22 25 L 20 22.8 C 19.2 23.6 18 24.2 16.5 24.2 C 13.8 24.2 11.8 22 11.8 19 C 11.8 16 13.8 13.8 16.5 13.8 C 18 13.8 19.2 14.4 20 15.2 L 22 13 Z" fill="#FFFFFF" />
      <circle cx="24" cy="14" r="2.5" fill="#84BD00" />
    </g>
    <g transform="translate(46, 12)">
      <text 
        x="0" 
        y="12" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="14" 
        fontWeight="800" 
        fill="#005B38" 
        letterSpacing="-0.01em"
      >
        CO-OP BANK
      </text>
      <text 
        x="0" 
        y="24" 
        fontFamily="'Inter', sans-serif" 
        fontSize="7.5" 
        fontWeight="700" 
        fill="#64748B" 
        letterSpacing="0.12em"
      >
        BANK OF KENYA
      </text>
    </g>
  </svg>
);

export const MpesaVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 160 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="M-PESA Logo"
  >
    <rect x="4" y="8" width="48" height="32" rx="6" fill="#00A651" />
    <text 
      x="28" 
      y="29" 
      fontFamily="'Poppins', sans-serif" 
      fontSize="16" 
      fontWeight="900" 
      fill="#FFFFFF" 
      textAnchor="middle"
    >
      M
    </text>
    <text 
      x="58" 
      y="30" 
      fontFamily="'Poppins', sans-serif" 
      fontSize="20" 
      fontWeight="800" 
      fill="#ED1C24" 
      letterSpacing="-0.02em"
    >
      PESA
    </text>
  </svg>
);

export const PayPalVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 160 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="PayPal Logo"
  >
    <g transform="translate(6, 8)">
      <path d="M 8 32 L 14 6 L 25 6 C 29.5 6 32.5 8 31.5 13 C 30.8 16.5 28 19 24.5 19 L 17.5 19 L 15 32 L 8 32 Z" fill="#003087" />
      <path d="M 16 32 L 20 14 L 29 14 C 33 14 35.5 16 34.5 20 C 33.8 23.5 31 26 27.5 26 L 22.5 26 L 21 32 L 16 32 Z" fill="#0079C1" fillOpacity="0.9" />
    </g>
    <g transform="translate(48, 14)">
      <text 
        x="0" 
        y="20" 
        fontFamily="'Poppins', sans-serif" 
        fontSize="21" 
        fontWeight="800" 
        letterSpacing="-0.03em"
      >
        <tspan fill="#003087">Pay</tspan>
        <tspan fill="#0079C1">Pal</tspan>
      </text>
    </g>
  </svg>
);

export const VisaVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Visa Logo"
  >
    <text 
      x="12" 
      y="34" 
      fontFamily="'Poppins', 'Arial', sans-serif" 
      fontSize="30" 
      fontWeight="900" 
      fontStyle="italic"
      fill="#1A1F71" 
      letterSpacing="-0.02em"
    >
      VISA
    </text>
  </svg>
);

export const MastercardVectorSvg: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <svg 
    viewBox="0 0 140 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    role="img"
    aria-label="Mastercard Logo"
  >
    <circle cx="26" cy="24" r="16" fill="#EB001B" />
    <circle cx="48" cy="24" r="16" fill="#F79E1B" fillOpacity="0.9" />
    <text 
      x="72" 
      y="29" 
      fontFamily="'Inter', sans-serif" 
      fontSize="12" 
      fontWeight="700" 
      fill="#1E293B"
      letterSpacing="-0.01em"
    >
      mastercard
    </text>
  </svg>
);

// ==========================================
// TRUE COMPANY LOGO WITH DYNAMIC INTERNET FETCH & FALLBACK
// ==========================================
interface TrueCompanyLogoProps {
  company: string;
  className?: string;
  alt?: string;
  showFaviconPill?: boolean;
}

export const TrueCompanyLogo: React.FC<TrueCompanyLogoProps> = ({
  company,
  className = "h-12 w-auto",
  alt,
  showFaviconPill = false
}) => {
  const meta = resolveCompanyMeta(company);
  const [imageFailed, setImageFailed] = useState(false);

  if (!meta) {
    return (
      <span className="font-['Poppins'] font-bold text-[14px] text-[#0F172A]">
        {company}
      </span>
    );
  }

  const renderFallbackSvg = () => {
    switch (meta.id) {
      case 'safaricom':
        return <SafaricomVectorSvg className={className} />;
      case 'britishcouncil':
        return <BritishCouncilVectorSvg className={className} />;
      case 'goethe':
        return <GoetheInstitutVectorSvg className={className} />;
      case 'kfc':
        return <KenyaFilmCommissionVectorSvg className={className} />;
      case 'ndw':
        return <NairobiDesignWeekVectorSvg className={className} />;
      case 'heva':
        return <HevaFundVectorSvg className={className} />;
      case 'coopbank':
        return <CoopBankVectorSvg className={className} />;
      case 'mpesa':
        return <MpesaVectorSvg className={className} />;
      case 'paypal':
        return <PayPalVectorSvg className={className} />;
      case 'visa':
        return <VisaVectorSvg className={className} />;
      case 'mastercard':
        return <MastercardVectorSvg className={className} />;
      default:
        return (
          <span className="font-['Poppins'] font-bold text-[14px] text-[#0F172A]">
            {meta.name}
          </span>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${showFaviconPill ? 'gap-2' : ''}`}>
      {showFaviconPill && (
        <CompanyFavicon company={meta.id} size={20} showBorder={true} />
      )}
      {!imageFailed && meta.logoUrl ? (
        <img
          src={meta.logoUrl}
          alt={alt || `${meta.name} Logo`}
          onError={() => setImageFailed(true)}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          className={`object-contain transition-all duration-200 ${className}`}
          style={{ maxWidth: '100%' }}
        />
      ) : (
        renderFallbackSvg()
      )}
    </div>
  );
};

// ==========================================
// BACKWARD-COMPATIBLE BRAND LOGOS
// ==========================================
export const SafaricomLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="safaricom" className={className} />
);

export const BritishCouncilLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="britishcouncil" className={className} />
);

export const GoetheInstitutLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="goethe" className={className} />
);

export const KenyaFilmCommissionLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="kfc" className={className} />
);

export const NairobiDesignWeekLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="ndw" className={className} />
);

export const HevaFundLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="heva" className={className} />
);

export const CoopBankLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="coopbank" className={className} />
);

export const MpesaLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="mpesa" className={className} />
);

export const PayPalLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="paypal" className={className} />
);

export const VisaLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="visa" className={className} />
);

export const MastercardLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => (
  <TrueCompanyLogo company="mastercard" className={className} />
);

// ==========================================
// MASTER PARTNER LOGO FACTORY
// ==========================================
export interface PartnerLogoProps {
  partnerId: string;
  className?: string;
  showFavicon?: boolean;
}

export const PartnerBrandLogo: React.FC<PartnerLogoProps> = ({ 
  partnerId, 
  className = "h-12 sm:h-14 md:h-16 w-auto",
  showFavicon = false
}) => {
  return (
    <TrueCompanyLogo 
      company={partnerId} 
      className={className} 
      showFaviconPill={showFavicon}
    />
  );
};
