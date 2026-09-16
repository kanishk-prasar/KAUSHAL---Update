import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SkillCatalogue } from './components/SkillCatalogue';
import { JobMarketplace } from './components/JobMarketplace';
import { SkillAdvisorAI } from './components/SkillAdvisorAI';
import { PracticalSimulator } from './components/PracticalSimulator';
import { DigitalPassport } from './components/DigitalPassport';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SkillIndiaLoginModal } from './components/SkillIndiaLoginModal';
import { SkillIndiaRegisterModal } from './components/SkillIndiaRegisterModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { UpdatesModal } from './components/UpdatesModal';
import { OurPartnersSection } from './components/OurPartnersSection';
import { LandingStakeholdersSection } from './components/LandingStakeholdersSection';
import { TraineePage } from './components/TraineePage';
import { PartnerPage } from './components/PartnerPage';
import { CompaniesPage } from './components/CompaniesPage';
import { INITIAL_USER_PROFILE } from './data/mockData';
import { LearnerProfile, AppTab } from './types';
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [updatesModalOpen, setUpdatesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [landingStakeholderTab, setLandingStakeholderTab] = useState<'all' | 'trainee' | 'partner' | 'companies'>('all');

  const handleNavigateToStakeholder = (stakeholder: 'trainee' | 'partner' | 'companies') => {
    if (activeTab !== 'home') {
      setActiveTab('home');
    }
    setLandingStakeholderTab(stakeholder);
    setTimeout(() => {
      const el = document.getElementById(`${stakeholder}-landing-section`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Profile persistence in localStorage
  const [profile, setProfile] = useState<LearnerProfile>(() => {
    try {
      const saved = localStorage.getItem('kaushal_learner_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load profile from storage:', e);
    }
    return INITIAL_USER_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem('kaushal_learner_profile', JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to storage:', e);
    }
  }, [profile]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleEnrollCourse = (courseId: string) => {
    if (profile.enrolledCourses.includes(courseId)) return;

    setProfile((prev) => ({
      ...prev,
      enrolledCourses: [...prev.enrolledCourses, courseId],
      kaushalScore: prev.kaushalScore + 50
    }));
    showToast('Enrolled in track! +50 Kaushal Points credited to your Digital Passport.');
  };

  const handleApplyJob = (jobId: string) => {
    if (profile.appliedJobs.includes(jobId)) return;

    setProfile((prev) => ({
      ...prev,
      appliedJobs: [...prev.appliedJobs, jobId],
      kaushalScore: prev.kaushalScore + 25
    }));
    showToast('Application dispatched with your verified Kaushal Digital Passport.');
  };

  const handleToggleBookmark = (jobId: string) => {
    setProfile((prev) => {
      const isBookmarked = prev.bookmarkedJobs.includes(jobId);
      return {
        ...prev,
        bookmarkedJobs: isBookmarked
          ? prev.bookmarkedJobs.filter((id) => id !== jobId)
          : [...prev.bookmarkedJobs, jobId]
      };
    });
  };

  const handleLogPracticalHours = (hours: number) => {
    setProfile((prev) => ({
      ...prev,
      practicalHoursLogged: prev.practicalHoursLogged + hours,
      kaushalScore: prev.kaushalScore + 100,
      badges: [
        ...prev.badges,
        {
          id: `badge-ev-iso-${Date.now()}`,
          title: 'High Voltage Isolation & Fluke CAT-IV Verified',
          issuedDate: '14 September 2026',
          sector: 'EV & Automotive',
          certificateNumber: `KSHL-ASDC-${Math.floor(Math.random() * 90000 + 10000)}`
        }
      ]
    }));
    showToast(`+${hours} Practical Hours & High Voltage Safety Badge added to Passport!`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        profile={profile}
        onOpenArchModal={() => setArchModalOpen(true)}
        onOpenLoginModal={() => setLoginModalOpen(true)}
        onOpenRegisterModal={() => setRegisterModalOpen(true)}
        onOpenHowItWorksModal={() => setHowItWorksOpen(true)}
        onOpenUpdatesModal={() => setUpdatesModalOpen(true)}
        onNavigateToStakeholder={handleNavigateToStakeholder}
      />

      {/* Floating Global Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 p-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 max-w-md border border-emerald-600">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <span className="flex-1 leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Main Landing View (Matching official Mahaswayam Maharashtra Government Portal) */}
      {activeTab === 'home' && (
        <div className="w-full">
          <HeroBanner
            onExploreJobs={() => setActiveTab('jobs')}
            onExploreSkills={() => setActiveTab('courses')}
            onExploreOutcomes={() => setHowItWorksOpen(true)}
            onOpenHowItWorks={() => setHowItWorksOpen(true)}
            onExploreTrainee={() => handleNavigateToStakeholder('trainee')}
            onExplorePartner={() => handleNavigateToStakeholder('partner')}
            onExploreCompanies={() => handleNavigateToStakeholder('companies')}
            lang={lang}
          />

          {/* Trainee, Partner, and Companies Stakeholder Portals directly in Page Form on Landing Page */}
          <LandingStakeholdersSection
            profile={profile}
            lang={lang}
            onNavigateToCourses={() => setActiveTab('courses')}
            onNavigateToJobs={() => setActiveTab('jobs')}
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onOpenRegisterModal={() => setRegisterModalOpen(true)}
            onOpenLoginModal={() => setLoginModalOpen(true)}
            activeStakeholder={landingStakeholderTab}
            onStakeholderChange={(tab) => setLandingStakeholderTab(tab)}
          />
        </div>
      )}

      {/* Sub-pages (Accessible via nav items if selected) */}
      {activeTab !== 'home' && (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {activeTab === 'courses' && (
            <div id="courses-section">
              <SkillCatalogue
                profile={profile}
                onEnrollCourse={handleEnrollCourse}
                lang={lang}
              />
            </div>
          )}

          {activeTab === 'jobs' && (
            <JobMarketplace
              profile={profile}
              onApplyJob={handleApplyJob}
              onToggleBookmark={handleToggleBookmark}
              onNavigateToPassport={() => setActiveTab('passport')}
              lang={lang}
            />
          )}

          {activeTab === 'advisor' && (
            <SkillAdvisorAI
              profile={profile}
              onSelectCourse={(courseId) => {
                handleEnrollCourse(courseId);
                setActiveTab('courses');
              }}
              lang={lang}
            />
          )}

          {activeTab === 'simulator' && (
            <PracticalSimulator
              profile={profile}
              onLogPracticalHours={handleLogPracticalHours}
              lang={lang}
            />
          )}

          {activeTab === 'passport' && (
            <DigitalPassport profile={profile} lang={lang} />
          )}

          {activeTab === 'trainee' && (
            <TraineePage
              profile={profile}
              onNavigateToCourses={() => setActiveTab('courses')}
              onNavigateToJobs={() => setActiveTab('jobs')}
              onNavigateToSimulator={() => setActiveTab('simulator')}
              lang={lang}
            />
          )}

          {activeTab === 'partner' && (
            <PartnerPage
              onOpenRegisterModal={() => setRegisterModalOpen(true)}
              onOpenLoginModal={() => setLoginModalOpen(true)}
              lang={lang}
            />
          )}

          {activeTab === 'companies' && (
            <CompaniesPage
              onOpenRegisterModal={() => setRegisterModalOpen(true)}
              onOpenLoginModal={() => setLoginModalOpen(true)}
              lang={lang}
            />
          )}
        </main>
      )}

      {/* Architecture & Monorepo Inspector Modal */}
      <ArchitectureModal
        isOpen={archModalOpen}
        onClose={() => setArchModalOpen(false)}
      />

      {/* Skill India Digital Hub (SIDH) Separate Login Modal */}
      <SkillIndiaLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        lang={lang}
        onLoginSuccess={(userData) => {
          setProfile((prev) => ({
            ...prev,
            name: userData.name || prev.name,
            hindiName: userData.hindiName || prev.hindiName,
            phone: userData.phone || prev.phone
          }));
          showToast(`Logged in successfully to Skill India Digital Hub as ${userData.name || 'User'}!`);
        }}
      />

      {/* Skill India Digital Hub (SIDH) Separate Registration Modal */}
      <SkillIndiaRegisterModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        lang={lang}
        onRegisterSuccess={(userData) => {
          showToast(`Registration submitted successfully for ${userData.name || 'Organization'}! SIDH credentials dispatched.`);
        }}
      />

      {/* How It Works Modal */}
      <HowItWorksModal
        isOpen={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        onExplore={() => setActiveTab('courses')}
      />

      {/* Ticker Updates Modal */}
      <UpdatesModal
        isOpen={updatesModalOpen}
        onClose={() => setUpdatesModalOpen(false)}
        onNavigateToJobs={() => setActiveTab('jobs')}
        onNavigateToCourses={() => setActiveTab('courses')}
      />

      {/* Our Partners Marquee Section: Govt of Maharashtra (Right to Left) & Private Industry (Left to Right) */}
      <OurPartnersSection />

      {/* Official Government of Maharashtra KAUSHAL Portal Footer */}
      <footer id="contact-footer" className="bg-[#0B3C5D] text-slate-200 text-xs border-t-4 border-[#ea580c]">
        {/* Top Government Resource Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-sky-800/80">
            {/* 1. Department & Platform Identity (Aligned with Header Left & Right) */}
            <div className="space-y-3.5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 shrink-0 shadow-sm flex items-center justify-center">
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
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div>
                  <div className="font-black text-xs sm:text-[13px] text-white tracking-tight uppercase leading-snug">
                    DEPARTMENT OF SKILL DEVELOPMENT &amp; ENTREPRENEURSHIP
                  </div>
                  <div className="text-[11px] font-semibold text-sky-200 mt-0.5">
                    Government of Maharashtra
                  </div>
                </div>
              </div>

              {/* KAUSHAL Branding */}
              <div className="pt-1 flex items-center gap-2">
                <img
                  src="/images/kaushal-logo.png"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('/images/kaushal-logo.png')) {
                      target.src = '/kaushal-logo.png';
                    }
                  }}
                  alt="KAUSHAL Logo"
                  className="h-9 w-auto object-contain bg-white/10 rounded px-2 py-1"
                />
                <div className="text-[11px] text-sky-100 font-bold leading-tight">
                  KAUSHAL
                  <span className="block text-[10px] font-normal text-sky-300">
                    Knowledge &amp; Analytics for Upgrading Skills, Hiring, And Livelihoods
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-sky-100/80 leading-relaxed">
                A unified outcome-driven platform connecting trainees, training institutes, employers, and government to measure real-world skill-to-livelihood outcomes across Maharashtra.
              </p>
            </div>

            {/* 2. Navigation & Platform Sections (Aligned with Header Nav Menu) */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                Navigation &amp; Portals
              </div>
              <ul className="space-y-1.5 text-[11px] text-sky-100/90">
                <li>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Home</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setHowItWorksOpen(true)}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>About Us &amp; Platform Mandate</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('courses')}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Schemes &amp; Skill Courses (PMKUVA / NSQF)</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Jobs &amp; Apprenticeship Marketplace</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('passport')}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Digital Skill Passport</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setUpdatesModalOpen(true)}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>Media &amp; State Announcements</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setHowItWorksOpen(true)}
                    className="hover:text-white hover:underline cursor-pointer text-left flex items-center gap-1.5"
                  >
                    <span>FAQ &amp; Knowledge Base</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* 3. Frameworks & Standards (Aligned with KAUSHAL Mandate) */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                Frameworks &amp; Standards
              </div>
              <ul className="space-y-1.5 text-[11px] text-sky-100/90">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>National Skills Qualifications Framework (NSQF)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                  <span>DigiLocker-Verified Skill Passport</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  <span>Longitudinal Retention &amp; Wage Tracking</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                  <span>Industry-Aligned Apprenticeship (NAPS)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span>36 District Employment Exchanges (DEE)</span>
                </li>
              </ul>
            </div>

            {/* 4. Technical Helpdesk & Department Contact (Aligned with Header Contact Us) */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                Department Contact &amp; Helpdesk
              </div>
              <p className="text-[11px] text-sky-100/90 leading-relaxed">
                <span className="font-semibold text-white">Department of Skill Development &amp; Entrepreneurship</span><br />
                Government of Maharashtra, Mantralaya,<br />
                Mumbai, Maharashtra — 400 032
              </p>
              <p className="text-[11px] text-sky-100/90 pt-1">
                Toll-Free Helpline: <span className="font-bold text-white">1800-120-8040</span><br />
                Hours: 09:30 AM to 06:00 PM (Mon – Sat)<br />
                Email: <span className="text-sky-200">contact.kaushal@maharashtra.gov.in</span>
              </p>
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setArchModalOpen(true)}
                  className="px-2.5 py-1 rounded bg-sky-900 hover:bg-sky-800 text-[10px] text-sky-200 border border-sky-700 transition cursor-pointer"
                >
                  Portal Architecture
                </button>
                <div className="flex items-center gap-1 text-[10px] text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal, NIC Hosting & Compliance Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-sky-200/90">
            <div className="leading-snug text-center md:text-left">
              <div>
                Website Content Managed by: <span className="text-white font-semibold">Department of Skill Development &amp; Entrepreneurship, Government of Maharashtra</span>.
              </div>
              <div className="text-[10px] text-sky-300/80 mt-0.5">
                Designed, Developed &amp; Hosted by: <span className="text-white">National Informatics Centre (NIC)</span>, Maharashtra State Centre, Mumbai.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px]">
              <span className="hover:underline cursor-pointer">Terms of Use</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">Hyperlinking Policy</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">Accessibility Statement</span>
              <span>|</span>
              <span className="text-orange-300 font-semibold">© 2026 KAUSHAL, Govt. of Maharashtra</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
