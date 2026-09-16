import React from 'react';

// ============================================================================
// 1. OFFICIAL STATE EMBLEM OF INDIA (Ashoka Lion Capital with Satyameva Jayate)
// Standard official emblem used across Indian government ministries and portals
// ============================================================================
export const AshokaEmblem: React.FC<{ className?: string; color?: string }> = ({
  className = "w-10 h-12",
  color = "#1e293b"
}) => (
  <svg
    viewBox="0 0 100 135"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="State Emblem of India"
  >
    {/* Upper Lion Figures (Left, Center, Right) */}
    {/* Center Lion Head */}
    <path
      d="M50 8C43 8 39 13 39 20C39 25 42 29 44 32C42 35 40 40 40 46C40 50 43 54 50 54C57 54 60 50 60 46C60 40 58 35 56 32C58 29 61 25 61 20C61 13 57 8 50 8Z"
      fill={color}
    />
    {/* Center Lion Face details */}
    <circle cx="47" cy="22" r="1.5" fill="#ffffff" />
    <circle cx="53" cy="22" r="1.5" fill="#ffffff" />
    <path d="M49 26L50 28L51 26H49Z" fill="#ffffff" />
    <path d="M47 31C49 33 51 33 53 31" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    <path d="M43 18C45 15 48 13 50 13C52 13 55 15 57 18" stroke="#ffffff" strokeWidth="0.8" />
    {/* Mane curls */}
    <path d="M44 38C42 41 43 45 46 47M56 38C58 41 57 45 54 47M50 36V45" stroke="#ffffff" strokeWidth="0.8" />

    {/* Left Lion Profile */}
    <path
      d="M38 18C33 16 28 19 26 24C24 29 26 34 28 37C25 40 23 45 24 51C25 54 28 56 35 55C37 50 38 42 38 34C37 28 38 22 38 18Z"
      fill={color}
    />
    <circle cx="30" cy="26" r="1.2" fill="#ffffff" />
    <path d="M28 32C30 33 32 33 34 32" stroke="#ffffff" strokeWidth="0.8" />
    <path d="M28 42C31 43 33 42 35 40" stroke="#ffffff" strokeWidth="0.8" />

    {/* Right Lion Profile */}
    <path
      d="M62 18C67 16 72 19 74 24C76 29 74 34 72 37C75 40 77 45 76 51C75 54 72 56 65 55C63 50 62 42 62 34C63 28 62 22 62 18Z"
      fill={color}
    />
    <circle cx="70" cy="26" r="1.2" fill="#ffffff" />
    <path d="M72 32C70 33 68 33 66 32" stroke="#ffffff" strokeWidth="0.8" />
    <path d="M72 42C69 43 67 42 65 40" stroke="#ffffff" strokeWidth="0.8" />

    {/* Chests & Forepaws joining the pedestal */}
    <path d="M34 54C34 60 36 67 38 72H62C64 67 66 60 66 54H34Z" fill={color} />
    {/* Claws & muscles */}
    <path d="M42 58V69M50 56V69M58 58V69" stroke="#ffffff" strokeWidth="0.9" />

    {/* Abacus / Circular Pedestal Platform */}
    <rect x="20" y="73" width="60" height="5" rx="1.5" fill={color} />

    {/* Central Ashoka Chakra on Abacus */}
    <circle cx="50" cy="88" r="9" stroke={color} strokeWidth="1.8" fill="#ffffff" />
    <circle cx="50" cy="88" r="2.2" fill={color} />
    {/* 16 spokes visible for clarity */}
    {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((angle, i) => (
      <line
        key={i}
        x1="50"
        y1="79"
        x2="50"
        y2="97"
        stroke={color}
        strokeWidth="0.7"
        transform={`rotate(${angle} 50 88)`}
      />
    ))}

    {/* Galloping Horse (Left of Chakra) */}
    <g fill={color}>
      <path d="M26 84C27 82 29 80 32 81C33 82 32 84 34 85C36 86 38 86 39 88C38 89 36 89 34 88L33 93H31L32 89L29 93H27L29 88C27 87 25 86 26 84Z" />
    </g>

    {/* Standing Bull (Right of Chakra) */}
    <g fill={color}>
      <path d="M74 84C73 82 71 80 68 81C67 82 68 84 66 85C64 86 62 86 61 88C62 89 64 89 66 88L67 93H69L68 89L71 93H73L71 88C73 87 75 86 74 84Z" />
    </g>

    {/* Base Platform */}
    <path d="M16 97H84C84 97 80 102 75 103H25C20 102 16 97 16 97Z" fill={color} />
    <rect x="14" y="103" width="72" height="3" rx="1" fill={color} />

    {/* Inverted Lotus Bell Base */}
    <path
      d="M26 106C32 114 42 118 50 118C58 118 68 114 74 106H26Z"
      fill={color}
    />
    <path d="M38 106C42 111 46 113 50 113C54 113 58 111 62 106" stroke="#ffffff" strokeWidth="0.9" />

    {/* Motto: SATYAMEVA JAYATE in Devanagari */}
    <text
      x="50"
      y="130"
      textAnchor="middle"
      fill={color}
      fontSize="8"
      fontWeight="900"
      fontFamily="sans-serif"
      letterSpacing="0.8"
    >
      सत्यमेव जयते
    </text>
  </svg>
);

// ============================================================================
// 2. OFFICIAL MAHARASHTRA GOVERNMENT SEAL (Rajmudra & Shasan Seal)
// ============================================================================
export const MaharashtraGovtSeal: React.FC<{ className?: string }> = ({
  className = "w-11 h-11"
}) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Outer Maroon Rim */}
    <circle cx="50" cy="50" r="48" fill="#991B1B" stroke="#F59E0B" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="43" fill="#FFFBEB" stroke="#B45309" strokeWidth="1.2" />
    <circle cx="50" cy="50" r="37" fill="#FEF3C7" />
    
    {/* Sacred Flame / Diya */}
    <path
      d="M34 62C34 68 40 70 50 70C60 70 66 68 66 62C66 59 62 57 50 57C38 57 34 59 34 62Z"
      fill="#B45309"
    />
    <path
      d="M37 61C40 55 45 52 50 52C55 52 60 55 63 61H37Z"
      fill="#D97706"
    />
    <path
      d="M50 30C46 38 43 45 43 51C43 55 46 57 50 57C54 57 57 55 57 51C57 45 54 38 50 30Z"
      fill="#DC2626"
    />
    <path
      d="M50 36C48 42 46 47 46 50C46 53 48 55 50 55C52 55 54 53 54 50C54 47 52 42 50 36Z"
      fill="#FBBF24"
    />

    {/* Text Arc simulation */}
    <path d="M22 50A28 28 0 0 1 78 50" stroke="#991B1B" strokeWidth="1" strokeDasharray="2 2" fill="none" />
    <text x="50" y="24" textAnchor="middle" fill="#7F1D1D" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">
      महाराष्ट्र शासन
    </text>
    <text x="50" y="82" textAnchor="middle" fill="#7F1D1D" fontSize="5" fontWeight="800" fontFamily="sans-serif">
      GOVT. OF MAHARASHTRA
    </text>
  </svg>
);

// ============================================================================
// 3. SPECIALIZED MAHARASHTRA STATE AGENCY LOGOS
// ============================================================================

// DVET Logo (Directorate of Vocational Education & Training)
export const DVETLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#581C87" stroke="#E9D5FF" strokeWidth="2" />
    {/* Industrial Gear */}
    <circle cx="50" cy="50" r="28" stroke="#FBBF24" strokeWidth="5" strokeDasharray="7 5" />
    <circle cx="50" cy="50" r="18" fill="#7E22CE" />
    {/* Knowledge Flame */}
    <path d="M50 26C47 34 44 39 44 45C44 49 47 52 50 52C53 52 56 49 56 45C56 39 53 34 50 26Z" fill="#F59E0B" />
    <path d="M50 33C49 37 47 40 47 44C47 46 48 48 50 48C52 48 53 46 53 44C53 40 51 37 50 33Z" fill="#FEF08A" />
    {/* Book Base */}
    <path d="M38 58L50 63L62 58L60 67L50 71L40 67L38 58Z" fill="#FFFFFF" />
    <text x="50" y="86" textAnchor="middle" fill="#F3E8FF" fontSize="7" fontWeight="900">
      DVET ITI
    </text>
  </svg>
);

// MSSDS Logo (Maharashtra State Skill Development Society)
export const MSSDSLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
    {/* Dynamic Skill Swooshes (Saffron, White, Green) */}
    <path d="M22 62C25 40 42 24 68 24C60 32 48 38 42 55Z" fill="#EA580C" />
    <path d="M30 68C35 48 50 34 76 34C68 42 56 48 50 65Z" fill="#0284C7" />
    <path d="M38 74C43 56 58 44 84 44C76 52 64 58 58 75Z" fill="#16A34A" />
    <circle cx="68" cy="24" r="5" fill="#F97316" />
    <text x="50" y="88" textAnchor="middle" fill="#9A3412" fontSize="6.5" fontWeight="900">
      MSSDS SKILL
    </text>
  </svg>
);

// MIDC Logo (Maharashtra Industrial Development Corp)
export const MIDCLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#0369A1" stroke="#BAE6FD" strokeWidth="2" />
    {/* Industrial Factory & Gear */}
    <path d="M26 68V48L40 56V48L54 56V34L74 44V68H26Z" fill="#FFFFFF" />
    <circle cx="50" cy="50" r="14" fill="#0284C7" stroke="#F0F9FF" strokeWidth="3" />
    <text x="50" y="85" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">
      MIDC
    </text>
  </svg>
);

// MSRLM Umeed Logo (Rural Livelihoods Mission)
export const UmeedLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
    {/* Banyan Tree of Livelihood */}
    <circle cx="50" cy="40" r="18" fill="#15803D" />
    <path d="M47 50H53V68H47V50Z" fill="#92400E" />
    <path d="M38 46C38 36 44 30 50 30C56 30 62 36 62 46H38Z" fill="#22C55E" />
    <circle cx="38" cy="42" r="8" fill="#16A34A" />
    <circle cx="62" cy="42" r="8" fill="#16A34A" />
    <text x="50" y="84" textAnchor="middle" fill="#B45309" fontSize="7" fontWeight="900">
      MSRLM UMEED
    </text>
  </svg>
);

// PWD Maharashtra Logo
export const PWDLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#1E293B" stroke="#94A3B8" strokeWidth="2" />
    {/* Bridge Arch & Pillar */}
    <path d="M22 64H78V58H22V64Z" fill="#E2E8F0" />
    <path d="M28 58C28 44 40 38 50 38C60 38 72 44 72 58H66C66 48 58 44 50 44C42 44 34 48 34 58H28Z" fill="#F8FAFC" />
    <rect x="46" y="58" width="8" height="12" fill="#F1F5F9" />
    <text x="50" y="85" textAnchor="middle" fill="#CBD5E1" fontSize="7.5" fontWeight="900">
      PWD INFRA
    </text>
  </svg>
);

// BARTI Logo (Dr. Babasaheb Ambedkar Research & Training Institute)
export const BARTILogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="50" cy="50" r="48" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="2" />
    {/* Torch of Enlightenment */}
    <path d="M50 24C46 32 43 37 43 42C43 46 46 48 50 48C54 48 57 46 57 42C57 37 54 32 50 24Z" fill="#F59E0B" />
    <path d="M46 48L44 66H56L54 48H46Z" fill="#E2E8F0" />
    <text x="50" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">
      BARTI
    </text>
  </svg>
);

// ============================================================================
// 4. AUTHENTIC PRIVATE SECTOR COMPANY LOGOS
// ============================================================================

// Tata Motors
export const TataMotorsLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#003366" />
    {/* Tata Iconic Oval T */}
    <ellipse cx="50" cy="46" rx="32" ry="22" stroke="#FFFFFF" strokeWidth="4.5" />
    <path d="M36 34H64M50 34V58" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" />
    <text x="50" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" letterSpacing="0.8">
      TATA MOTORS
    </text>
  </svg>
);

// Mahindra & Mahindra
export const MahindraLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#C00000" />
    {/* Twin Peaks Modern M Logo */}
    <path
      d="M26 62L44 32L50 44L56 32L74 62H64L56 46L50 56L44 46L36 62H26Z"
      fill="#FFFFFF"
    />
    <text x="50" y="83" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900" letterSpacing="0.5">
      MAHINDRA
    </text>
  </svg>
);

// Larsen & Toubro (L&T)
export const LTLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#0A192F" stroke="#1E293B" strokeWidth="1" />
    <circle cx="50" cy="46" r="28" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2.5" />
    <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">
      L&T
    </text>
    <text x="50" y="84" textAnchor="middle" fill="#93C5FD" fontSize="6.5" fontWeight="800">
      LARSEN & TOUBRO
    </text>
  </svg>
);

// Tata Consultancy Services (TCS)
export const TCSLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#001F3F" />
    <path d="M22 36H42M32 36V64" stroke="#00B4D8" strokeWidth="5" strokeLinecap="square" />
    <path d="M46 50C46 41 52 36 60 36C68 36 74 41 74 50C74 59 68 64 60 64C52 64 46 59 46 50Z" stroke="#0077B6" strokeWidth="4.5" fill="none" />
    <text x="50" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900" letterSpacing="1">
      TCS
    </text>
  </svg>
);

// Infosys
export const InfosysLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#007CC3" />
    <text x="50" y="52" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="900" fontFamily="sans-serif" fontStyle="italic">
      Infosys
    </text>
    <path d="M24 64H76" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
    <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="6.5" fontWeight="700">
      Navigate your next
    </text>
  </svg>
);

// Serum Institute of India
export const SerumInstituteLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#064E3B" />
    {/* Bio Shield & Cross */}
    <circle cx="50" cy="45" r="24" fill="#047857" stroke="#A7F3D0" strokeWidth="2" />
    <path d="M50 30V60M35 45H65" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    <text x="50" y="82" textAnchor="middle" fill="#A7F3D0" fontSize="7" fontWeight="900">
      SERUM INSTITUTE
    </text>
  </svg>
);

// Reliance Industries
export const RelianceLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#002D62" />
    <circle cx="50" cy="44" r="22" fill="#E11D48" />
    <path d="M38 44H62M50 32V56" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="900">
      RELIANCE
    </text>
  </svg>
);

// Godrej & Boyce
export const GodrejLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#831843" />
    <text x="50" y="54" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="serif" fontStyle="italic">
      Godrej
    </text>
    <text x="50" y="78" textAnchor="middle" fill="#FBCFE8" fontSize="7" fontWeight="700">
      & BOYCE MFG
    </text>
  </svg>
);

// Bajaj Auto
export const BajajLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#00205B" />
    {/* Bajaj Flying Wings B */}
    <path d="M32 30H56C64 30 70 36 70 42C70 47 66 51 60 52C66 53 72 58 72 64C72 70 66 76 56 76H32V30Z" fill="none" stroke="#FFFFFF" strokeWidth="4.5" />
    <path d="M32 52H56" stroke="#FFFFFF" strokeWidth="4.5" />
    <text x="50" y="84" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900">
      BAJAJ AUTO
    </text>
  </svg>
);

// Bharat Forge
export const BharatForgeLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#1E293B" />
    {/* Forging Anvil & Sparks */}
    <path d="M26 40H74L68 56H48V66H34V56H26V40Z" fill="#F97316" />
    <text x="50" y="82" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900">
      BHARAT FORGE
    </text>
  </svg>
);

// Thermax
export const ThermaxLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#0F766E" />
    {/* Clean Energy Flame & Water */}
    <circle cx="50" cy="44" r="20" fill="#14B8A6" />
    <path d="M50 30C46 36 42 42 42 48C42 52 46 56 50 56C54 56 58 52 58 48C58 42 54 36 50 30Z" fill="#FFFFFF" />
    <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="900">
      THERMAX
    </text>
  </svg>
);

// Cipla
export const CiplaLogo: React.FC<{ className?: string }> = ({ className = "w-11 h-11" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="100" height="100" rx="14" fill="#BE123C" />
    {/* Pharma Caduceus / Ring */}
    <circle cx="50" cy="45" r="20" stroke="#FFFFFF" strokeWidth="4" />
    <path d="M50 32V58M38 45H62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    <text x="50" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="900">
      Cipla
    </text>
  </svg>
);
