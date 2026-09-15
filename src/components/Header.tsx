import React from 'react';
import {
  ChevronDown,
  Home,
  LogIn,
  Menu,
  X,
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
  Phone,
  HelpCircle,
  FileText,
  Users,
  SunMedium,
  Moon
} from 'lucide-react';
import { LearnerProfile } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'outcomes' | 'courses' | 'jobs' | 'advisor' | 'simulator' | 'passport';
  setActiveTab: (tab: 'home' | 'outcomes' | 'courses' | 'jobs' | 'advisor' | 'simulator' | 'passport') => void;
  lang: 'en' | 'mr' | 'hi';
  setLang: (lang: 'en' | 'mr') => void;
  profile?: LearnerProfile;
  onOpenArchModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenRegisterModal?: () => void;
  onOpenHowItWorksModal?: () => void;
  onOpenUpdatesModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lang,
  setLang,
  onOpenArchModal,
  onOpenLoginModal,
  onOpenRegisterModal,
  onOpenHowItWorksModal,
  onOpenUpdatesModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [fontSizeLevel, setFontSizeLevel] = React.useState<number>(1); // 0: A-, 1: A, 2: A+
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

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
            {/* Maharashtra Government Official Round Seal (Maroon with Gold Rim) */}
            <div className="w-13 h-13 sm:w-14 sm:h-14 shrink-0 rounded-full bg-[#8A151B] border-2 border-[#D4AF37] p-0.5 flex items-center justify-center shadow-xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-200" fill="currentColor">
                {/* Outer ring */}
                <circle cx="50" cy="50" r="47" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="43" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Text Path */}
                <path id="sealHeaderArc" d="M 17,50 A 33,33 0 1,1 83,50" fill="none" />
                <text fontSize="7.5" fontWeight="bold" fill="#FFFBEB">
                  <textPath href="#sealHeaderArc" startOffset="50%" textAnchor="middle">
                    महाराष्ट्र शासन
                  </textPath>
                </text>

                {/* Central Diya / Samai Lamp */}
                <path d="M48 27 C48 24 52 24 52 27 C52 30 48 30 48 27 Z" fill="#FBBF24" />
                <ellipse cx="50" cy="32" rx="6" ry="2" fill="#FDE68A" />
                <path d="M49 32 L49 42 L47 45 L47 62 L53 62 L53 45 L51 42 L51 32 Z" fill="#FDE68A" />
                <path d="M40 45 Q50 50 60 45 Q50 48 40 45 Z" fill="#FDE68A" />
                <path d="M42 54 Q50 59 58 54 Q50 57 42 54 Z" fill="#FDE68A" />
                <rect x="42" y="62" width="16" height="4" rx="1" fill="#FDE68A" />
                <rect x="36" y="66" width="28" height="5" rx="1.5" fill="#FDE68A" />
                <rect x="32" y="71" width="36" height="3" rx="1" fill="#FDE68A" />
                
                {/* Bottom text */}
                <text x="50" y="87" fontSize="5.5" fontWeight="bold" textAnchor="middle" fill="#FDE68A">
                  GOVT. OF MAHARASHTRA
                </text>
              </svg>
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

      {/* 3. PINNED NAVIGATION & UPDATES HEADER (Goes upward and pins to the top when scrolling) */}
      <header className="sticky top-0 z-50 shadow-md select-none w-full">
        {/* PRIMARY NAVIGATION BAR (Dark Purple/Navy Background) */}
        <nav className="bg-[#2c1444] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left Nav Menu Items matching image */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-semibold">
              {/* Home with Icon and Active Underline */}
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-3 flex items-center gap-1.5 transition cursor-pointer ${
                  activeTab === 'home'
                    ? 'text-white border-b-2 border-white font-bold'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              {/* About Us Dropdown */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'about' ? null : 'about')}
                  className="px-3 py-1.5 rounded hover:bg-white/10 transition flex items-center gap-1 text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>About Us</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'about' && (
                  <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('home');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium"
                    >
                      <Building2 className="w-4 h-4 text-[#2A0845]" />
                      <span>About Department & Mandate</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenArchModal?.();
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium"
                    >
                      <FileText className="w-4 h-4 text-[#2A0845]" />
                      <span>Portal Architecture & Specs</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Schemes Dropdown */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'schemes' ? null : 'schemes')}
                  className="px-3 py-1.5 rounded hover:bg-white/10 transition flex items-center gap-1 text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>Schemes</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'schemes' && (
                  <div className="absolute left-0 mt-1 w-72 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium"
                    >
                      <BookOpen className="w-4 h-4 text-[#2A0845]" />
                      <span>Pramod Mahajan Skill Mission (PMKUVA)</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('jobs');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-medium"
                    >
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span>NAPS National Apprenticeship</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Jobs */}
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-3 py-1.5 rounded hover:bg-white/10 transition cursor-pointer ${
                  activeTab === 'jobs' ? 'bg-white/15 text-white font-bold' : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>Jobs</span>
              </button>

              {/* Skills Dropdown */}
              <div className="relative nav-dropdown-container">
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'skills' ? null : 'skills')}
                  className={`px-3 py-1.5 rounded hover:bg-white/10 transition flex items-center gap-1 cursor-pointer ${
                    activeTab === 'courses' || activeTab === 'simulator' || activeTab === 'advisor'
                      ? 'bg-white/15 text-white font-bold'
                      : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>Skills</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-80" />
                </button>

                {openDropdown === 'skills' && (
                  <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <button
                      onClick={() => {
                        setActiveTab('courses');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold"
                    >
                      <BookOpen className="w-4 h-4 text-[#2A0845]" />
                      <span>NSQF Skill Courses</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('simulator');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold"
                    >
                      <Wrench className="w-4 h-4 text-orange-600" />
                      <span>Practical Lab Simulator</span>
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('advisor');
                        setOpenDropdown(null);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2.5 text-xs font-semibold"
                    >
                      <Compass className="w-4 h-4 text-blue-600" />
                      <span>AI Career Advisor</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Forum */}
              <button
                onClick={() => onOpenHowItWorksModal?.()}
                className="px-3 py-1.5 rounded hover:bg-white/10 transition text-slate-200 hover:text-white cursor-pointer"
              >
                <span>Forum</span>
              </button>

              {/* Media */}
              <button
                onClick={() => onOpenUpdatesModal?.()}
                className="px-3 py-1.5 rounded hover:bg-white/10 transition text-slate-200 hover:text-white cursor-pointer"
              >
                <span>Media</span>
              </button>

              {/* FAQ */}
              <button
                onClick={() => onOpenHowItWorksModal?.()}
                className="px-3 py-1.5 rounded hover:bg-white/10 transition text-slate-200 hover:text-white cursor-pointer"
              >
                <span>FAQ</span>
              </button>

              {/* Contact Us */}
              <button
                onClick={() => {
                  const el = document.getElementById('contact-footer') || document.querySelector('footer');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3 py-1.5 rounded hover:bg-white/10 transition text-slate-200 hover:text-white cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Buttons (Right): "+ Register" (Solid Orange button with white text) and "-> Login" (Transparent button with white border and white text) */}
            <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
              {/* + Register Button */}
              <button
                onClick={() => onOpenRegisterModal?.()}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-[13px] flex items-center gap-1.5 shadow-md shadow-orange-950/20 transition cursor-pointer"
              >
                <span className="text-base leading-none font-bold">+</span>
                <span>Register</span>
              </button>

              {/* -> Login Button */}
              <button
                onClick={() => onOpenLoginModal?.()}
                className="bg-transparent hover:bg-white/10 text-white border border-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-[13px] flex items-center gap-1.5 transition cursor-pointer"
              >
                <span className="text-sm font-bold">→</span>
                <span>Login</span>
              </button>

              {/* Mobile Hamburger Menu Toggle */}
              <div className="lg:hidden ml-1">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-1.5 rounded text-white hover:bg-white/15 cursor-pointer"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. NEWS TICKER (Split Background) */}
      <div className="bg-[#0f4a54] text-white text-xs flex items-center overflow-hidden border-b border-teal-950/60 shadow-inner">
        {/* Left Label: A solid orange block with white text "KAUSHAL UPDATES" and a notification dot */}
        <div className="bg-[#ea580c] text-white px-3.5 sm:px-5 py-2 font-black uppercase text-[11px] sm:text-xs flex items-center gap-2 shrink-0 z-10 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>KAUSHAL UPDATES</span>
        </div>

        {/* Marquee/Ticker: A dark teal block containing horizontally scrolling news items separated by vertical pipes |, ending with a "View All ->" link */}
        <div className="flex-1 px-3 sm:px-4 py-2 flex items-center gap-3 sm:gap-4 text-[11.5px] sm:text-xs font-medium text-teal-50 overflow-x-auto whitespace-nowrap scrollbar-none">
          {/* Item 1 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Megaphone className="w-3.5 h-3.5 text-teal-200 shrink-0" />
            <span>New PMKVY Batches: IT, EV &amp; Solar registrations open at recognized ITIs across Maharashtra</span>
          </div>

          <span className="text-teal-400/60 font-normal shrink-0">|</span>

          {/* Item 2 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Briefcase className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span>5,200+ Active Vacancies: Automotive, Manufacturing, IT &amp; Healthcare sectors hiring now in Pune, Mumbai, Nagpur</span>
          </div>

          <span className="text-teal-400/60 font-normal shrink-0">|</span>

          {/* Item 3 */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span>42,000+ apprentices onboarded under National Apprenticeship Promotion Scheme (NAPS) in Maharashtra</span>
          </div>

          <span className="text-teal-400/60 font-normal shrink-0">|</span>

          {/* View All -> Link */}
          <button
            onClick={onOpenUpdatesModal}
            className="flex items-center gap-1 text-white hover:text-amber-300 font-bold ml-auto shrink-0 transition cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2A0845] text-white px-4 py-3 space-y-2 border-t border-white/10 shadow-xl animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 ${
              activeTab === 'home' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('jobs');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 ${
              activeTab === 'jobs' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Jobs</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('courses');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 ${
              activeTab === 'courses' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Skills & Courses</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('simulator');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 ${
              activeTab === 'simulator' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Practical Simulator</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('advisor');
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 ${
              activeTab === 'advisor' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Career Advisor</span>
          </button>
          <div className="pt-2 border-t border-white/15 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onOpenRegisterModal?.();
                setMobileMenuOpen(false);
              }}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 shadow-xs cursor-pointer"
            >
              <span>+ Register</span>
            </button>
            <button
              onClick={() => {
                onOpenLoginModal?.();
                setMobileMenuOpen(false);
              }}
              className="border border-white/60 hover:bg-white/10 text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>→ Login</span>
            </button>
          </div>
          <div className="pt-1 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                onOpenArchModal?.();
                setMobileMenuOpen(false);
              }}
              className="text-white/80 hover:text-white"
            >
              System Specs
            </button>
            <button
              onClick={() => {
                setLang(lang === 'en' ? 'mr' : 'en');
                setMobileMenuOpen(false);
              }}
              className="text-amber-300 font-bold"
            >
              {lang === 'en' ? 'मराठीत पहा' : 'View in English'}
            </button>
          </div>
        </div>
      )}
    </header>
  </>
  );
};
