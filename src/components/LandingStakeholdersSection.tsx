import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Handshake,
  Building2,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Award
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { TraineePage } from './TraineePage';
import { PartnerPage } from './PartnerPage';
import { CompaniesPage } from './CompaniesPage';

interface LandingStakeholdersSectionProps {
  profile: LearnerProfile;
  lang: 'en' | 'mr' | 'hi';
  onNavigateToCourses: () => void;
  onNavigateToJobs: () => void;
  onNavigateToSimulator: () => void;
  onOpenRegisterModal: () => void;
  onOpenLoginModal: () => void;
  activeStakeholder?: 'all' | 'trainee' | 'partner' | 'companies';
  onStakeholderChange?: (tab: 'all' | 'trainee' | 'partner' | 'companies') => void;
}

export const LandingStakeholdersSection: React.FC<LandingStakeholdersSectionProps> = ({
  profile,
  lang,
  onNavigateToCourses,
  onNavigateToJobs,
  onNavigateToSimulator,
  onOpenRegisterModal,
  onOpenLoginModal,
  activeStakeholder: externalActiveStakeholder,
  onStakeholderChange
}) => {
  const [internalActiveStakeholder, setInternalActiveStakeholder] = useState<'all' | 'trainee' | 'partner' | 'companies'>('all');

  const activeTab = externalActiveStakeholder !== undefined ? externalActiveStakeholder : internalActiveStakeholder;

  const setActiveTab = (tab: 'all' | 'trainee' | 'partner' | 'companies') => {
    if (onStakeholderChange) {
      onStakeholderChange(tab);
    } else {
      setInternalActiveStakeholder(tab);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="stakeholder-portals-section" className="bg-slate-50/70 border-t border-slate-200/80 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-[#ea580c] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Three Pillars of KAUSHAL Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B3C5D] tracking-tight">
            Integrated Stakeholder Portals
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-medium mt-2.5 leading-relaxed">
            Direct access to dedicated platforms for Maharashtra's trainees, accredited training institutes, and hiring industry partners.
          </p>
        </div>

        {/* Stakeholder Switcher / Segmented Control Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200/90 mb-10 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            {/* Tab 1: Trainee */}
            <button
              id="landing-trainee-tab-btn"
              onClick={() => {
                setActiveTab('trainee');
                scrollToSection('trainee-landing-section');
              }}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'trainee'
                  ? 'bg-[#0B3C5D] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <GraduationCap className={`w-4 h-4 shrink-0 ${activeTab === 'trainee' ? 'text-orange-400' : 'text-[#ea580c]'}`} />
              <span>Trainee Portal</span>
            </button>

            {/* Tab 2: Partners */}
            <button
              id="landing-partner-tab-btn"
              onClick={() => {
                setActiveTab('partner');
                scrollToSection('partner-landing-section');
              }}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-[#0B3C5D] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Handshake className={`w-4 h-4 shrink-0 ${activeTab === 'partner' ? 'text-sky-300' : 'text-blue-600]'}`} />
              <span>Partner Ecosystem</span>
            </button>

            {/* Tab 3: Companies */}
            <button
              id="landing-companies-tab-btn"
              onClick={() => {
                setActiveTab('companies');
                scrollToSection('companies-landing-section');
              }}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'companies'
                  ? 'bg-[#0B3C5D] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Building2 className={`w-4 h-4 shrink-0 ${activeTab === 'companies' ? 'text-amber-300' : 'text-emerald-600'}`} />
              <span>Companies &amp; Employers</span>
            </button>

            {/* Tab 4: View All */}
            <button
              id="landing-all-tab-btn"
              onClick={() => setActiveTab('all')}
              className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#ea580c] text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0 text-white" />
              <span>View All 3 Pages</span>
            </button>

          </div>
        </div>

        {/* Quick-Jump In-Page Anchor Bar when "View All 3 Pages" is active */}
        {activeTab === 'all' && (
          <div className="sticky top-20 z-30 mb-8 bg-white/95 backdrop-blur border border-slate-200 shadow-sm rounded-xl p-2.5 flex items-center justify-between gap-2 overflow-x-auto max-w-3xl mx-auto">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2 shrink-0">
              Quick Jump:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollToSection('trainee-landing-section')}
                className="px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#ea580c] text-xs font-bold flex items-center gap-1.5 transition"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>1. Trainee Portal</span>
              </button>
              <button
                onClick={() => scrollToSection('partner-landing-section')}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1e40af] text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Handshake className="w-3.5 h-3.5" />
                <span>2. Partner Ecosystem</span>
              </button>
              <button
                onClick={() => scrollToSection('companies-landing-section')}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>3. Companies Portal</span>
              </button>
            </div>
          </div>
        )}

        {/* PORTAL CONTENT: In Page Form directly on the Landing Page */}
        <div className="space-y-16">

          {/* 1. TRAINEE PAGE (Rendered when 'all' or 'trainee' is active) */}
          {(activeTab === 'all' || activeTab === 'trainee') && (
            <div id="trainee-landing-section" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B3C5D] to-[#164e63] px-6 sm:px-8 py-5 border-b border-sky-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-400/30 flex items-center justify-center text-orange-300">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block">
                      Section 1 &bull; Landing Page View
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Trainee Development Hub &amp; Skills Passport
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onNavigateToCourses}
                    className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Browse Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <TraineePage
                  profile={profile}
                  onNavigateToCourses={onNavigateToCourses}
                  onNavigateToJobs={onNavigateToJobs}
                  onNavigateToSimulator={onNavigateToSimulator}
                  lang={lang}
                />
              </div>
            </div>
          )}

          {/* 2. PARTNERS PAGE (Rendered when 'all' or 'partner' is active) */}
          {(activeTab === 'all' || activeTab === 'partner') && (
            <div id="partner-landing-section" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B3C5D] to-[#1e3a8a] px-6 sm:px-8 py-5 border-b border-sky-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-sky-300 uppercase tracking-wider block">
                      Section 2 &bull; Landing Page View
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Institutional Partners &amp; Training Ecosystem
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenRegisterModal}
                    className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Empanel Institute</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <PartnerPage
                  onOpenRegisterModal={onOpenRegisterModal}
                  onOpenLoginModal={onOpenLoginModal}
                  lang={lang}
                />
              </div>
            </div>
          )}

          {/* 3. COMPANIES PAGE (Rendered when 'all' or 'companies' is active) */}
          {(activeTab === 'all' || activeTab === 'companies') && (
            <div id="companies-landing-section" className="scroll-mt-28 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-[#0B3C5D] to-[#065f46] px-6 sm:px-8 py-5 border-b border-sky-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                      Section 3 &bull; Landing Page View
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      Corporate Companies &amp; Employer Opportunities
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onOpenRegisterModal}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <span>Post Apprenticeship</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <CompaniesPage
                  onOpenRegisterModal={onOpenRegisterModal}
                  onOpenLoginModal={onOpenLoginModal}
                  lang={lang}
                />
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
