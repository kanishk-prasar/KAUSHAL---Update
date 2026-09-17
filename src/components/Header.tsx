import React from 'react';
import {
  ChevronDown,
  Home,
  Globe,
  Briefcase,
  Megaphone,
  Award,
  ArrowRight,
  Sparkles,
  BookOpen,
  Wrench,
  Compass,
  Building2,
  FileText,
  SunMedium,
  Moon,
  GraduationCap,
  Handshake
} from 'lucide-react';
import { LearnerProfile, AppTab } from '../types';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  lang: 'en' | 'mr' | 'hi';
  setLang: (lang: 'en' | 'mr') => void;
  profile?: LearnerProfile;
  onOpenArchModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenRegisterModal?: () => void;
  onOpenHowItWorksModal?: () => void;
  onOpenUpdatesModal?: () => void;
  onNavigateToStakeholder?: (stakeholder: 'trainee' | 'partner' | 'companies') => void;
}

const TICKER_UPDATES = [
  {
    icon: Megaphone,
    iconColor: "text-teal-200",
    text: "New PMKVY Batches: IT, EV & Solar registrations open at recognized ITIs across Maharashtra",
    tag: "Admissions 2026",
    tagColor: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  },
  {
    icon: Briefcase,
    iconColor: "text-amber-300",
    text: "5,200+ Active Vacancies: Automotive, Manufacturing, IT & Healthcare sectors hiring now in Pune, Mumbai, Nagpur",
    tag: "Jobs",
    tagColor: "bg-amber-500/20 text-amber-200 border-amber-400/30",
  },
  {
    icon: Award,
    iconColor: "text-amber-200",
    text: "42,000+ apprentices onboarded under National Apprenticeship Promotion Scheme (NAPS) in Maharashtra",
    tag: "Apprenticeship",
    tagColor: "bg-sky-500/20 text-sky-200 border-sky-400/30",
  },
  {
    icon: Sparkles,
    iconColor: "text-rose-300",
    text: "MahaJobs Mega Rozgar Melava scheduled across Chhatrapati Sambhagad / Sambhajinagar, Nashik & Kolhapur",
    tag: "Job Fair",
    tagColor: "bg-rose-500/20 text-rose-200 border-rose-400/30",
  },
  {
    icon: Award,
    iconColor: "text-purple-200",
    text: "Drone Technology & Precision Agriculture specialized training centers launched at 12 District ITIs",
    tag: "New Tech",
    tagColor: "bg-purple-500/20 text-purple-200 border-purple-400/30",
  },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenArchModal,
  onOpenLoginModal,
  onOpenRegisterModal,
  onOpenHowItWorksModal,
  onOpenUpdatesModal,
  onNavigateToStakeholder
}) => {
  const [fontSizeLevel, setFontSizeLevel] = React.useState<number>(1); // 0: A-, 1: A, 2: A+
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  // Clean uniform class helper for navigation buttons
  const getNavBtnClass = (isActive: boolean) =>
    `h-12 px-3.5 flex items-center gap-1.5 text-[13px] font-semibold transition cursor-pointer whitespace-nowrap ${
      isActive
        ? 'text-white border-b-2 border-white font-bold'
        : 'text-slate-200 hover:text-white hover:bg-white/5 border-b-2 border-transparent'
    }`;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  const handleFontSize = (level: number) => {
    setFontSizeLevel(level);
    const root = document.documentElement;
    if (level === 0) {
      root.style.fontSize = '93%';
    } else if (level === 2) {
      root.style.fontSize = '107%';
    } else {
      root.style.fontSize = '100%';
    }
  };

  const toggleContrast = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleSkipToMain = (e: React.MouseEvent) => {
    e.preventDefault();
    const main = document.querySelector('main') || document.getElementById('main-content');
    if (main) {
      main.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* UNPINNED TOP HEADER (Scrolls away with page content) */}
      <div className="w-full bg-white select-none">
        {/* 1. UTILITY TOP BAR (Light Gray Background) */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Text "GOVERNMENT OF MAHARASHTRA" */}
          <div className="font-extrabold text-[#102A43] text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-2">
            <span>GOVERNMENT OF MAHARASHTRA</span>
            <span className="hidden sm:inline-block text-slate-300">|</span>
            <span className="hidden sm:inline-block text-slate-500 font-semibold text-[11px]">महाराष्ट्र शासन</span>
          </div>

          {/* Right: Links for "Skip to main content", Font size adjusters (A-, A, A+), Dark/Light mode toggles (moon/sun icons), and a Language selector dropdown (Default: English) */}
          <div className="flex items-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700">
            {/* Skip to main content */}
            <a
              href="#main-content"
              onClick={handleSkipToMain}
              className="text-slate-600 hover:text-slate-950 hover:underline text-[11px] font-medium transition cursor-pointer hidden md:inline-block"
            >
              Skip to main content
            </a>

            <span className="text-slate-300 hidden md:inline-block">|</span>

            {/* Font size adjusters (A-, A, A+) */}
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <button
                onClick={() => handleFontSize(0)}
                className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-bold transition cursor-pointer ${
                  fontSizeLevel === 0 ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
                title="Decrease Font Size (A-)"
              >
                A-
              </button>
              <button
                onClick={() => handleFontSize(1)}
                className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-bold transition cursor-pointer ${
                  fontSizeLevel === 1 ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
                title="Default Font Size (A)"
              >
                A
              </button>
              <button
                onClick={() => handleFontSize(2)}
                className={`w-6 h-6 rounded border flex items-center justify-center text-[10px] font-bold transition cursor-pointer ${
                  fontSizeLevel === 2 ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-200'
                }`}
                title="Increase Font Size (A+)"
              >
                A+
              </button>
            </div>

            {/* Dark/Light mode toggles (moon/sun icons) */}
            <div className="flex items-center gap-1 text-slate-600">
              {/* Light Mode Sun icon */}
              <button
                onClick={() => {
                  setIsDarkMode(false);
                  document.documentElement.classList.remove('dark');
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer ${
                  !isDarkMode ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:bg-slate-200'
                }`}
                title="Light Mode"
              >
                <SunMedium className="w-3.5 h-3.5" />
              </button>

              {/* Dark Mode Moon icon */}
              <button
                onClick={() => {
                  setIsDarkMode(true);
                  document.documentElement.classList.add('dark');
                }}
                className={`w-6 h-6 rounded-full flex items-center justify-center transition cursor-pointer ${
                  isDarkMode ? 'bg-indigo-900 text-indigo-100' : 'text-slate-500 hover:bg-slate-200'
                }`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-slate-300">|</span>

            {/* Language selector dropdown (Default: English) */}
            <div className="relative nav-dropdown-container">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'lang' ? null : 'lang')}
                className="flex items-center gap-1.5 text-slate-700 hover:text-slate-950 font-medium cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-[11px] font-bold">{lang === 'en' ? 'English' : 'मराठी'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {openDropdown === 'lang' && (
                <div className="absolute right-0 mt-1.5 w-32 bg-white border border-slate-200 rounded-lg shadow-xl py-1.5 z-50 text-xs">
                  <button
                    onClick={() => {
                      setLang('en');
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 font-medium flex items-center justify-between ${
                      lang === 'en' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <span className="text-xs text-orange-600">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      setLang('mr');
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 hover:bg-slate-50 font-medium flex items-center justify-between ${
                      lang === 'mr' || lang === 'hi' ? 'text-orange-600 font-bold bg-orange-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>मराठी (Marathi)</span>
                    {(lang === 'mr' || lang === 'hi') && <span className="text-xs text-orange-600">✓</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRANDING HEADER - Seal, Title & 4 Circular Badges */}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: Official Maharashtra Seal + Department Name */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer"
            title="Department of Skill Development & Entrepreneurship"
          >
            {/* Official Maharashtra Government Circular Seal (Permanently fixed) */}
            <div
              title="Government of Maharashtra Official Seal"
              className="relative w-13 h-13 sm:w-15 sm:h-15 shrink-0 rounded-full flex items-center justify-center group/seal transition-transform group-hover:scale-105"
            >
              <img
                src="/images/govt-maharashtra.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/images/govt-maharashtra.png')) {
                    target.src = '/govt-maharashtra.png';
                  } else if (target.src.endsWith('/govt-maharashtra.png')) {
                    target.src = '/images/govt-maharashtra.svg';
                  }
                }}
                alt="Government of Maharashtra Official Seal"
                className="w-full h-full object-contain rounded-full select-none drop-shadow-xs"
              />
            </div>

            {/* Department Title */}
            <div>
              <h1 className="text-base sm:text-lg lg:text-xl font-black text-[#102A43] tracking-tight uppercase leading-tight group-hover:text-[#0B3C5D] transition">
                DEPARTMENT OF SKILL DEVELOPMENT & ENTREPRENEURSHIP
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-[#1E3A5F] tracking-normal mt-0.5">
                Government of Maharashtra
              </p>
            </div>
          </button>

          {/* Right: KAUSHAL Logo (Permanently fixed top right header logo) */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              onClick={() => setActiveTab('home')}
              title="KAUSHAL - Knowledge & Analytics for Upgrading Skills, Hiring, And Livelihoods"
              className="group relative flex items-center justify-end cursor-pointer transition-transform hover:scale-[1.02]"
            >
              <img
                src="/images/kaushal-logo.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/images/kaushal-logo.png')) {
                    target.src = '/kaushal-logo.png';
                  } else if (target.src.endsWith('/kaushal-logo.png')) {
                    target.src = '/images/kaushal-logo.svg';
                  }
                }}
                alt="KAUSHAL - Knowledge & Analytics for Upgrading Skills, Hiring, And Livelihoods"
                className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain max-w-[200px] sm:max-w-[260px] lg:max-w-[320px] select-none"
              />
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* 3. PINNED NAVIGATION HEADER (Sticky top bar with non-responsive navigation buttons) */}
      <header className="sticky top-0 z-50 shadow-md select-none w-full bg-[#2c1444]">
        {/* PRIMARY NAVIGATION BAR (Non-responsive, clean desktop structure) */}
        <nav className="bg-[#2c1444] text-white w-full overflow-x-auto scrollbar-none">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-12 gap-2 min-w-max">
            {/* Navigation Menu Buttons matching user's reference */}
            <div className="flex items-center gap-0.5 text-[13px] font-semibold shrink-0">
              {/* 1. Home */}
              <button
                onClick={() => setActiveTab('home')}
                className={getNavBtnClass(activeTab === 'home')}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              {/* 2. About Us */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                  className={getNavBtnClass(openDropdown === 'about')}
                >
                  <span>About Us</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'about' && (
                  <div className="absolute left-0 mt-0.5 w-64 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('home');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-[#2A0845]"
                    >
                      <Building2 className="w-4 h-4 text-[#2A0845]" />
                      <span>About Department & Mandate</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenArchModal?.();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-[#2A0845]"
                    >
                      <FileText className="w-4 h-4 text-[#2A0845]" />
                      <span>Portal Architecture & Specs</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 3. Schemes */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'schemes' ? null : 'schemes')}
                  className={getNavBtnClass(openDropdown === 'schemes')}
                >
                  <span>Schemes</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'schemes' && (
                  <div className="absolute left-0 mt-0.5 w-72 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-[#2A0845]"
                    >
                      <BookOpen className="w-4 h-4 text-[#2A0845]" />
                      <span>Pramod Mahajan Skill Mission (PMKUVA)</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('jobs');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium text-slate-700 hover:text-[#2A0845]"
                    >
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span>NAPS National Apprenticeship</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 4. Skills */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'skills' ? null : 'skills')}
                  className={getNavBtnClass(
                    openDropdown === 'skills' ||
                    activeTab === 'courses' ||
                    activeTab === 'simulator' ||
                    activeTab === 'advisor'
                  )}
                >
                  <span>Skills</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'skills' && (
                  <div className="absolute left-0 mt-0.5 w-64 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-[#2A0845]"
                    >
                      <BookOpen className="w-4 h-4 text-[#2A0845]" />
                      <span>NSQF Skill Courses</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('simulator');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-orange-600"
                    >
                      <Wrench className="w-4 h-4 text-orange-600" />
                      <span>Practical Lab Simulator</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('advisor');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 hover:text-blue-600"
                    >
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>AI Career Advisor</span>
                    </button>
                  </div>
                )}
              </div>

              {/* 5. Trainee */}
              <button
                onClick={() => {
                  if (onNavigateToStakeholder) {
                    onNavigateToStakeholder('trainee');
                  } else {
                    setActiveTab('trainee');
                  }
                }}
                className={getNavBtnClass(activeTab === 'trainee')}
              >
                <span>Trainee</span>
              </button>

              {/* 6. Partners */}
              <button
                onClick={() => {
                  if (onNavigateToStakeholder) {
                    onNavigateToStakeholder('partner');
                  } else {
                    setActiveTab('partner');
                  }
                }}
                className={getNavBtnClass(activeTab === 'partner')}
              >
                <span>Partners</span>
              </button>

              {/* 7. Companies */}
              <button
                onClick={() => {
                  if (onNavigateToStakeholder) {
                    onNavigateToStakeholder('companies');
                  } else {
                    setActiveTab('companies');
                  }
                }}
                className={getNavBtnClass(activeTab === 'companies' || activeTab === 'employer-dashboard')}
              >
                <span>Companies</span>
              </button>

              {/* 8. Contact Us */}
              <button
                onClick={() => {
                  const el = document.getElementById('contact-footer') || document.querySelector('footer');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={getNavBtnClass(false)}
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Right Buttons: "+ Register" and "-> Login" (Always present, non-responsive) */}
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <button
                onClick={() => onOpenRegisterModal?.()}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2 rounded-full font-bold text-[13px] flex items-center gap-1.5 shadow-md shadow-orange-950/20 transition cursor-pointer whitespace-nowrap"
              >
                <span className="text-base leading-none font-bold">+</span>
                <span>Register</span>
              </button>

              <button
                onClick={() => onOpenLoginModal?.()}
                className="bg-transparent hover:bg-white/10 text-white border border-white px-5 py-2 rounded-full font-bold text-[13px] flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap"
              >
                <span className="text-sm font-bold">→</span>
                <span>Login</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

    {/* 4. NEWS TICKER (Sliding Marquee Mode) */}
    <div className="bg-[#0f4a54] text-white text-xs flex items-center overflow-hidden border-b border-teal-950/60 shadow-inner relative select-none">
      {/* Left Label: A solid orange block with white text "KAUSHAL UPDATES" and a notification dot */}
      <div className="bg-[#ea580c] text-white px-3.5 sm:px-5 py-2 font-black uppercase text-[11px] sm:text-xs flex items-center gap-2 shrink-0 z-20 shadow-md">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="tracking-wide">KAUSHAL UPDATES</span>
      </div>

      {/* Left subtle fade vignette */}
      <div className="pointer-events-none absolute left-[138px] sm:left-[172px] inset-y-0 w-8 bg-gradient-to-r from-[#0f4a54] to-transparent z-10" />

      {/* Sliding Marquee Track */}
      <div className="flex-1 overflow-hidden relative group/ticker py-2">
        <div
          onClick={onOpenUpdatesModal}
          className="animate-ticker-left flex items-center gap-6 cursor-pointer group-hover/ticker:[animation-play-state:paused]"
          title="Click to view all updates (Hover to pause)"
        >
          {/* Loop 1 */}
          {TICKER_UPDATES.map((item, idx) => (
            <div key={`u1-${idx}`} className="flex items-center gap-3 shrink-0 text-[11.5px] sm:text-xs font-medium text-teal-50">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.tagColor}`}>
                  {item.tag}
                </span>
                <item.icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                <span>{item.text}</span>
              </div>
              <span className="text-teal-400/40 font-normal shrink-0">|</span>
            </div>
          ))}
          {/* Loop 2 for seamless continuous infinite slide */}
          {TICKER_UPDATES.map((item, idx) => (
            <div key={`u2-${idx}`} className="flex items-center gap-3 shrink-0 text-[11.5px] sm:text-xs font-medium text-teal-50">
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${item.tagColor}`}>
                  {item.tag}
                </span>
                <item.icon className={`w-3.5 h-3.5 ${item.iconColor} shrink-0`} />
                <span>{item.text}</span>
              </div>
              <span className="text-teal-400/40 font-normal shrink-0">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right subtle fade vignette */}
      <div className="pointer-events-none absolute right-[88px] sm:right-[96px] inset-y-0 w-8 bg-gradient-to-l from-[#0f4a54] to-transparent z-10" />

      {/* View All -> Link pinned on the right */}
      <div className="bg-[#0f4a54] pl-2 pr-3 sm:pr-4 py-1.5 flex items-center shrink-0 z-20 border-l border-teal-800/40">
        <button
          onClick={onOpenUpdatesModal}
          className="flex items-center gap-1 text-white hover:text-amber-300 font-bold text-[11px] sm:text-xs transition cursor-pointer whitespace-nowrap bg-teal-900/60 hover:bg-teal-900 px-2.5 py-1 rounded"
          title="Click to view all notices and updates"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </>
  );
};
