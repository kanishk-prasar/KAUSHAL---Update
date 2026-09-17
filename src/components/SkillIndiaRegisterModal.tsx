import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ChevronRight,
  Briefcase,
  Users
} from 'lucide-react';
import { LearnerProfile } from '../types';

interface SkillIndiaRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (user: Partial<LearnerProfile> & { role?: string }) => void;
  onOpenTrainingPartnerWizard?: () => void;
  lang: 'en' | 'mr' | 'hi';
}

type RegisterRoleType = 'partner' | 'employer';

export const SkillIndiaRegisterModal: React.FC<SkillIndiaRegisterModalProps> = ({
  isOpen,
  onClose,
  onRegisterSuccess,
  onOpenTrainingPartnerWizard,
  lang: _lang
}) => {
  const [selectedRole, setSelectedRole] = useState<RegisterRoleType>('partner');
  const [step, setStep] = useState<'select' | 'form'>('select');

  // Partner Registration State
  const [partnerOrgName, setPartnerOrgName] = useState('');
  const [partnerType, setPartnerType] = useState('Training Institute / ITI');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerMobile, setPartnerMobile] = useState('');
  const [partnerPass, setPartnerPass] = useState('');

  // Employer Registration State
  const [companyName, setCompanyName] = useState('');
  const [industrySector, setIndustrySector] = useState('Automotive & EV Technology');
  const [employerEmail, setEmployerEmail] = useState('');
  const [companyCinGst, setCompanyCinGst] = useState('');
  const [employerMobile, setEmployerMobile] = useState('');
  const [employerPass, setEmployerPass] = useState('');

  // Terms and Privacy Modals
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole('partner');
      setStep('select');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (selectedRole === 'partner' && onOpenTrainingPartnerWizard) {
      handleResetAndClose();
      onOpenTrainingPartnerWizard();
      return;
    }
    setStep('form');
  };

  const handleCardClick = (role: RegisterRoleType) => {
    setSelectedRole(role);
  };

  const handleCardDoubleClick = (role: RegisterRoleType) => {
    setSelectedRole(role);
    if (role === 'partner' && onOpenTrainingPartnerWizard) {
      handleResetAndClose();
      onOpenTrainingPartnerWizard();
      return;
    }
    setStep('form');
  };

  const handleCompletePartnerRegister = () => {
    onRegisterSuccess({
      name: partnerOrgName || 'Registered Skill Partner',
      role: 'Partner'
    });
    handleResetAndClose();
  };

  const handleCompleteEmployerRegister = () => {
    onRegisterSuccess({
      name: companyName || 'Registered Enterprise Employer',
      role: 'Employer'
    });
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setStep('select');
    setPartnerOrgName('');
    setPartnerEmail('');
    setPartnerMobile('');
    setPartnerPass('');
    setCompanyName('');
    setEmployerEmail('');
    setCompanyCinGst('');
    setEmployerMobile('');
    setEmployerPass('');
    onClose();
  };

  return (
    <div
      id="skill-india-register-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        id="skill-india-register-card"
        className="relative w-full max-w-[760px] bg-white rounded-2xl shadow-2xl p-5 sm:p-7 border border-gray-100 text-slate-800 my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Skill India Emblem & Close Button (No switch button) */}
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          {/* Authentic Skill India Emblem */}
          <div className="flex items-center gap-2.5">
            <svg
              className="w-10 h-10 shrink-0"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Blue Computer Monitor Frame */}
              <rect x="6" y="8" width="52" height="38" rx="5" stroke="#103770" strokeWidth="4" fill="#f8fafc" />
              <path d="M24 46L20 54H44L40 46" stroke="#103770" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16" y1="54" x2="48" y2="54" stroke="#103770" strokeWidth="4" strokeLinecap="round" />
              {/* Orange/Saffron Rising Sun & Human Silhouette */}
              <path
                d="M32 16C34.2 16 36 17.8 36 20C36 22.2 34.2 24 32 24C29.8 24 28 22.2 28 20C28 17.8 29.8 16 32 16Z"
                fill="#ea580c"
              />
              <path
                d="M22 36C22 30 26 26 32 26C38 26 42 30 42 36"
                stroke="#ea580c"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M19 28L25 32M45 28L39 32"
                stroke="#ea580c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            <div>
              <div className="text-[17px] font-extrabold tracking-tight text-[#103770] leading-none font-sans">
                Skill India Digital Hub
              </div>
              <div className="text-[10px] sm:text-[11px] font-semibold text-slate-600 mt-0.5 tracking-normal">
                कौशल भारत - कुशल भारत • Government of Maharashtra
              </div>
            </div>
          </div>

          {/* Close Button Only */}
          <button
            id="close-register-popup-btn"
            onClick={handleResetAndClose}
            className="text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: REGISTRATION ENTITY SELECTOR */}
        {step === 'select' && (
          <div className="mt-4">
            {/* Header Text */}
            <div className="text-center pb-2">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
                Register on Skill India Digital Hub (SIDH)
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 mb-5 font-normal">
                Select your entity type to complete official organization registration
              </p>
            </div>

            {/* ONLY 2 REGISTRATION ROLES: Partner & Employer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {/* 1. Partner Registration */}
              <div
                id="role-card-register-partner"
                onClick={() => handleCardClick('partner')}
                onDoubleClick={() => handleCardDoubleClick('partner')}
                className={`relative flex items-center gap-3.5 p-4 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${
                  selectedRole === 'partner'
                    ? 'border-orange-600 bg-orange-50/20 shadow-sm ring-2 ring-orange-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Radio selection circle */}
                <div className="absolute top-3.5 left-3.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedRole === 'partner' ? 'border-orange-600 bg-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {selectedRole === 'partner' && (
                      <div className="w-2 h-2 rounded-full bg-orange-600 transition-transform scale-100" />
                    )}
                  </div>
                </div>

                {/* Illustration Badge */}
                <div className="w-16 h-16 rounded-full bg-[#fff4ed] border border-orange-100 flex items-center justify-center shrink-0 ml-4">
                  <svg className="w-11 h-11" viewBox="0 0 48 48" fill="none">
                    <circle cx="16" cy="16" r="4.5" fill="#fed7aa" />
                    <path d="M10 32C10 25 22 25 22 32" fill="#ea580c" />
                    <circle cx="32" cy="16" r="4.5" fill="#fed7aa" />
                    <path d="M26 32C26 25 38 25 38 32" fill="#1e40af" />
                    <path d="M18 28L24 25L30 28" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="24" cy="11" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="24" y="14" textAnchor="middle" fill="#854d0e" fontSize="7" fontWeight="bold">₹</text>
                  </svg>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-[16px] leading-tight">
                      Partner
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold uppercase">
                      Institute
                    </span>
                  </div>
                  <p className="text-[11.5px] sm:text-[12px] text-gray-500 mt-1 leading-snug">
                    Register as Training Partner, Affiliated ITI, Skill Center, or Curriculum Assessment Body.
                  </p>
                </div>
              </div>

              {/* 2. Employer Registration */}
              <div
                id="role-card-register-employer"
                onClick={() => handleCardClick('employer')}
                onDoubleClick={() => handleCardDoubleClick('employer')}
                className={`relative flex items-center gap-3.5 p-4 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${
                  selectedRole === 'employer'
                    ? 'border-orange-600 bg-orange-50/20 shadow-sm ring-2 ring-orange-500/20'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                }`}
              >
                {/* Radio selection circle */}
                <div className="absolute top-3.5 left-3.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                      selectedRole === 'employer' ? 'border-orange-600 bg-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {selectedRole === 'employer' && (
                      <div className="w-2 h-2 rounded-full bg-orange-600 transition-transform scale-100" />
                    )}
                  </div>
                </div>

                {/* Illustration Badge */}
                <div className="w-16 h-16 rounded-full bg-[#edf3fc] border border-blue-100 flex items-center justify-center shrink-0 ml-4">
                  <svg className="w-11 h-11" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="14" width="16" height="26" rx="2" fill="#3b82f6" />
                    <rect x="22" y="10" width="18" height="30" rx="2" fill="#1e40af" />
                    <rect x="11" y="18" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="17" y="18" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="11" y="24" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="17" y="24" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="11" y="30" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="17" y="30" width="3" height="3" rx="0.5" fill="#eff6ff" />
                    <rect x="26" y="14" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="33" y="14" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="26" y="20" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="33" y="20" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="26" y="26" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="33" y="26" width="3" height="3" rx="0.5" fill="#93c5fd" />
                    <rect x="25" y="32" width="16" height="10" rx="1.5" fill="#ea580c" stroke="#c2410c" strokeWidth="1" />
                    <path d="M30 32V30C30 29 31 28 32 28H34C35 28 36 29 36 30V32" stroke="#ffffff" strokeWidth="1.2" />
                    <line x1="25" y1="36" x2="41" y2="36" stroke="#c2410c" strokeWidth="1" />
                  </svg>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-[16px] leading-tight">
                      Employer
                    </h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold uppercase">
                      Enterprise
                    </span>
                  </div>
                  <p className="text-[11.5px] sm:text-[12px] text-gray-500 mt-1 leading-snug">
                    Register your enterprise to post apprenticeships, recruit certified youth &amp; access wage subsidies.
                  </p>
                </div>
              </div>
            </div>

            {/* Continue Action Button */}
            <div className="mt-6 flex justify-center">
              <button
                id="continue-register-btn"
                onClick={handleContinue}
                className="w-full sm:w-auto min-w-[260px] px-7 py-3 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer bg-[#ea580c] hover:bg-[#c2410c]"
              >
                <span>
                  {`Continue Registration as ${selectedRole === 'partner' ? 'Partner' : 'Employer'}`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Legal Links (No switcher link) */}
            <div className="mt-6 text-center border-t border-gray-100 pt-4">
              <p className="text-[11.5px] sm:text-xs text-gray-500 leading-normal">
                By choosing to continue, you agree to accept all applicable{' '}
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-[#dc5a28] hover:underline font-medium cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>{' '}
                and{' '}
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-[#dc5a28] hover:underline font-medium cursor-pointer"
                >
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: REGISTRATION FORM */}
        {step === 'form' && (
          <div className="mt-3 space-y-5">
            {/* Back button */}
            <button
              onClick={() => setStep('select')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Entity Selection</span>
            </button>

            {/* Header Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Registering Organization as
                </span>
                <div className="text-sm font-bold text-[#ea580c] flex items-center gap-1.5 mt-0.5">
                  {selectedRole === 'partner' ? (
                    <>
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>Industry / Learning Partner</span>
                    </>
                  ) : (
                    <>
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>Enterprise Employer &amp; Recruiter</span>
                    </>
                  )}
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-orange-100 text-orange-800">
                SIDH Registration
              </span>
            </div>

            {/* FORM 1: PARTNER REGISTRATION */}
            {selectedRole === 'partner' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Organization / Institute Name
                    </label>
                    <input
                      type="text"
                      value={partnerOrgName}
                      onChange={(e) => setPartnerOrgName(e.target.value)}
                      placeholder="e.g. Pune Regional Skill Development Academy"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Partner Classification
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 bg-white"
                    >
                      <option value="Training Institute / ITI">Training Institute / ITI</option>
                      <option value="Center of Excellence (CoE)">Center of Excellence (CoE)</option>
                      <option value="Assessment Agency">Assessment Agency</option>
                      <option value="Industry Skill Academy">Industry Skill Academy</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Official Corporate Email
                    </label>
                    <input
                      type="email"
                      value={partnerEmail}
                      onChange={(e) => setPartnerEmail(e.target.value)}
                      placeholder="admin@institute.ac.in"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Authorized Contact Mobile
                    </label>
                    <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                      <span className="px-2.5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold border-r border-gray-300 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={partnerMobile}
                        onChange={(e) => setPartnerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        className="flex-1 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Set Security Password
                  </label>
                  <input
                    type="password"
                    value={partnerPass}
                    onChange={(e) => setPartnerPass(e.target.value)}
                    placeholder="Create a strong password (min 8 chars)"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCompletePartnerRegister}
                    className="w-full py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl font-bold text-sm shadow transition cursor-pointer"
                  >
                    Submit Partner Registration
                  </button>
                </div>
              </div>
            )}

            {/* FORM 2: EMPLOYER REGISTRATION */}
            {selectedRole === 'employer' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Legal Entity Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Bharat EV Mobility Ltd"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Industry Sector
                    </label>
                    <select
                      value={industrySector}
                      onChange={(e) => setIndustrySector(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 bg-white"
                    >
                      <option value="Automotive & EV Technology">Automotive &amp; EV Technology</option>
                      <option value="IT, Software & Electronics">IT, Software &amp; Electronics</option>
                      <option value="Solar, Wind & Clean Energy">Solar, Wind &amp; Clean Energy</option>
                      <option value="Healthcare & Nursing Apprenticeships">Healthcare &amp; Nursing</option>
                      <option value="Precision Engineering & Manufacturing">Precision Engineering</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      HR / Talent Acquisition Email
                    </label>
                    <input
                      type="email"
                      value={employerEmail}
                      onChange={(e) => setEmployerEmail(e.target.value)}
                      placeholder="hr@bharatev.in"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company Registration (GSTIN / CIN)
                    </label>
                    <input
                      type="text"
                      value={companyCinGst}
                      onChange={(e) => setCompanyCinGst(e.target.value)}
                      placeholder="27AABCU9603R1ZM"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100 uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      HR Contact Mobile
                    </label>
                    <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                      <span className="px-2.5 py-2 bg-gray-100 text-gray-600 text-xs font-semibold border-r border-gray-300 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={employerMobile}
                        onChange={(e) => setEmployerMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="98765 43210"
                        className="flex-1 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Set Portal Password
                    </label>
                    <input
                      type="password"
                      value={employerPass}
                      onChange={(e) => setEmployerPass(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-orange-600 focus:ring-2 focus:ring-orange-100"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleCompleteEmployerRegister}
                    className="w-full py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl font-bold text-sm shadow transition cursor-pointer"
                  >
                    Submit Employer Registration
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-bold text-slate-800">Terms &amp; Conditions</h3>
                <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                By registering on Skill India Digital Hub (SIDH), you confirm that your organization has valid statutory authority, affiliation, or enterprise registration to conduct vocational training or apprentice hiring under National Skill Qualification Framework (NSQF).
              </p>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-2 bg-[#ea580c] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        )}

        {/* Privacy Policy Modal */}
        {showPrivacyModal && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-base font-bold text-slate-800">Privacy Policy (DPDP 2023 Aligned)</h3>
                <button onClick={() => setShowPrivacyModal(false)} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Enterprise and institutional credential data is encrypted at rest and in transit in adherence with the Digital Personal Data Protection (DPDP) Act 2023 and MeitY cloud security standards.
              </p>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2 bg-[#ea580c] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Accept Privacy Policy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
