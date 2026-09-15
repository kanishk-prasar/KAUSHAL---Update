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
import { HowItWorksModal } from './components/HowItWorksModal';
import { UpdatesModal } from './components/UpdatesModal';
import { INITIAL_USER_PROFILE } from './data/mockData';
import { LearnerProfile } from './types';
import { CheckCircle2, ShieldCheck, Heart, Sparkles, Building2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'outcomes' | 'courses' | 'jobs' | 'advisor' | 'simulator' | 'passport'>('home');
  const [lang, setLang] = useState<'en' | 'mr'>('en');
  const [archModalOpen, setArchModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [updatesModalOpen, setUpdatesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
        onOpenLoginModal={(mode = 'login') => {
          setAuthModalMode(mode);
          setLoginModalOpen(true);
        }}
        onOpenHowItWorksModal={() => setHowItWorksOpen(true)}
        onOpenUpdatesModal={() => setUpdatesModalOpen(true)}
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
        <HeroBanner
          onExploreJobs={() => setActiveTab('jobs')}
          onExploreSkills={() => setActiveTab('courses')}
          onExploreOutcomes={() => setHowItWorksOpen(true)}
          onOpenHowItWorks={() => setHowItWorksOpen(true)}
          lang={lang}
        />
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
        </main>
      )}

      {/* Architecture & Monorepo Inspector Modal */}
      <ArchitectureModal
        isOpen={archModalOpen}
        onClose={() => setArchModalOpen(false)}
      />

      {/* Skill India Digital Hub (SIDH) Login / Register Modal */}
      <SkillIndiaLoginModal
        isOpen={loginModalOpen}
        initialMode={authModalMode}
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

      {/* Official Indian Government Portal Footer */}
      <footer className="bg-[#0B3C5D] text-slate-200 text-xs mt-16 border-t-4 border-[#FF9933]">
        {/* Top Government Resource Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-sky-800/80">
            {/* Ministry & Emblem Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white text-[#9A1B1E] flex items-center justify-center font-bold text-xs border border-red-200">
                  <span className="font-bold text-xs">महाराष्ट्र</span>
                </div>
                <div>
                  <div className="font-extrabold text-sm text-white tracking-tight">
                    महास्वयं • महाराष्ट्र शासन रोजगार पोर्टल
                  </div>
                  <div className="text-[11px] text-sky-200">
                    कौशल्य विकास, रोजगार आणि उद्योजकता विभाग, महाराष्ट्र शासन
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-sky-100/80 leading-relaxed">
                महाराष्ट्र शासनाच्या तरुणांचे कौशल्य संवर्धन, रोजगार मार्गदर्शन आणि विविध सरकारी नोकऱ्यांची एकात्मिक माहिती उपलब्ध करून देणारे अधिकृत पोर्टल.
              </p>
            </div>

            {/* Skilling & Career Portals */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                प्रमुख सेवा आणि दुवे
              </div>
              <ul className="space-y-1.5 text-[11px] text-sky-100/90">
                <li>
                  <button
                    onClick={() => {
                      setAuthModalMode('register');
                      setLoginModalOpen(true);
                    }}
                    className="hover:text-white hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>महास्वयं नोंदणी / Skill India Digital Hub</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('jobs')} className="hover:text-white hover:underline cursor-pointer">
                    सरकारी नोकऱ्या आणि अप्रेंटिसशिप पोर्टल
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('courses')} className="hover:text-white hover:underline cursor-pointer">
                    प्रमोद महाजन कौशल्य विकास अभियान (PMKUVA)
                  </button>
                </li>
                <li>
                  <a href="https://maharashtra.gov.in" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
                    महाराष्ट्र शासन अधिकृत पोर्टल (maharashtra.gov.in)
                  </a>
                </li>
              </ul>
            </div>

            {/* Framework & Statutory Alignments */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                योजना आणि मानके
              </div>
              <ul className="space-y-1.5 text-[11px] text-sky-100/90">
                <li>महाराष्ट्र राज्य कौशल्य विकास सोसायटी (MSSDS)</li>
                <li>महास्वयं वेब पोर्टल (Mahaswayam)</li>
                <li>डिजिलॉकर प्रमाणित डिजिटल कौशल्य पासपोर्ट</li>
                <li>छत्रपती राजाराम महाराज उद्योजकता अभियान</li>
                <li>राष्ट्रीय कौशल्य पात्रता आराखडा (NSQF)</li>
              </ul>
            </div>

            {/* Technical Helpdesk & Access */}
            <div className="space-y-2.5">
              <div className="font-bold text-white text-xs uppercase tracking-wider text-orange-400">
                मदत आणि संपर्क
              </div>
              <p className="text-[11px] text-sky-100/90">
                टोल फ्री हेल्पलाईन: <span className="font-bold text-white">1800-120-8040</span><br />
                कार्यालयीन वेळ: सकाळी 09:30 ते संध्याकाळी 06:00 (सोमवार - शनिवार)<br />
                ईमेल: support.mahaswayam@maharashtra.gov.in
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => setArchModalOpen(true)}
                  className="px-2.5 py-1 rounded bg-sky-900 hover:bg-sky-800 text-[10px] text-sky-200 border border-sky-700 transition cursor-pointer"
                >
                  पोर्टल आर्किटेक्चर
                </button>
                <div className="flex items-center gap-1 text-[10px] text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ISO 27001 प्रमाणित</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Legal, NIC Hosting & GIGW Compliance Bar */}
          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-sky-200/90">
            <div className="leading-snug text-center md:text-left">
              <div>
                वेबसाईट सामग्री व्यवस्थापन: <span className="text-white font-semibold">कौशल्य विकास, रोजगार आणि उद्योजकता विभाग, महाराष्ट्र शासन</span>.
              </div>
              <div className="text-[10px] text-sky-300/80 mt-0.5">
                डिझाइन, विकास आणि होस्टिंग: <span className="text-white">राष्ट्रीय सूचना विज्ञान केंद्र (NIC)</span>, महाराष्ट्र राज्य केंद्र, मुंबई.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px]">
              <span className="hover:underline cursor-pointer">अटी व शर्ती</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">गोपनीयता धोरण</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">हायपरलिंक धोरण</span>
              <span>|</span>
              <span className="hover:underline cursor-pointer">सुलभता विधान</span>
              <span>|</span>
              <span className="text-orange-300 font-semibold">शेवटचे अद्यतन: 14 सप्टेंबर 2026</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
