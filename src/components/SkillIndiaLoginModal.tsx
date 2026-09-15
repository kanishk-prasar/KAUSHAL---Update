import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  Smartphone,
  Lock,
  Building2,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Users
} from 'lucide-react';
import { LearnerProfile } from '../types';

interface SkillIndiaLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: Partial<LearnerProfile> & { role?: string }) => void;
  lang: 'en' | 'mr' | 'hi';
  initialMode?: 'login' | 'register';
}

type RoleType = 'trainee' | 'partner' | 'employer';

export const SkillIndiaLoginModal: React.FC<SkillIndiaLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  lang: _lang,
  initialMode = 'login'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<RoleType>('trainee');
  const [step, setStep] = useState<'select' | 'auth'>('select');

  // Trainee Auth State
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Partner Auth State
  const [partnerId, setPartnerId] = useState('');
  const [partnerPass, setPartnerPass] = useState('');
  const [partnerOrgName, setPartnerOrgName] = useState('');
  const [partnerType, setPartnerType] = useState('Training Institute / ITI');
  const [partnerMobile, setPartnerMobile] = useState('');

  // Employer Auth State
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPass, setEmployerPass] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industrySector, setIndustrySector] = useState('Automotive & EV Technology');
  const [companyCinGst, setCompanyCinGst] = useState('');
  const [employerMobile, setEmployerMobile] = useState('');

  // Terms and Privacy Modals
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Synchronize initial mode when modal is opened
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialMode === 'register' ? 'partner' : 'trainee');
      setStep('select');
      setOtpSent(false);
      setOtp('');
    }
  }, [isOpen, initialMode]);

  // When switching between Login and Register in the UI
  const handleSwitchMode = (newMode: 'login' | 'register') => {
    setMode(newMode);
    setStep('select');
    if (newMode === 'register') {
      // In register mode, only Partner and Employer are allowed
      if (selectedRole === 'trainee') {
        setSelectedRole('partner');
      }
    }
  };

  if (!isOpen) return null;

  const handleContinue = () => {
    setStep('auth');
  };

  const handleCardClick = (role: RoleType) => {
    setSelectedRole(role);
  };

  const handleCardDoubleClick = (role: RoleType) => {
    setSelectedRole(role);
    setStep('auth');
  };

  const handleSendOtp = () => {
    if (mobileNumber.length >= 10) {
      setOtpSent(true);
      setOtp('482910'); // Simulated autofill for seamless user testing
    }
  };

  const handleCompleteTraineeLogin = (isDemo = false) => {
    onLoginSuccess({
      name: isDemo ? 'Kavita Sharma' : 'Verified Trainee',
      hindiName: isDemo ? 'कविता शर्मा' : 'प्रमाणित शिकाऊ',
      phone: mobileNumber ? `+91 ${mobileNumber}` : '+91 98765 43210',
      role: 'Trainee'
    });
    handleResetAndClose();
  };

  const handleCompletePartnerLogin = (isDemo = false) => {
    onLoginSuccess({
      name: isDemo
        ? 'Tata Motors EV Skill Hub'
        : partnerId || 'Affiliated Skill Training Partner',
      role: 'Partner'
    });
    handleResetAndClose();
  };

  const handleCompletePartnerRegister = () => {
    onLoginSuccess({
      name: partnerOrgName || 'Registered Skill Partner',
      role: 'Partner'
    });
    handleResetAndClose();
  };

  const handleCompleteEmployerLogin = (isDemo = false) => {
    onLoginSuccess({
      name: isDemo
        ? 'Mahindra Electric Mobility (Employer)'
        : employerEmail || 'Verified Employer',
      role: 'Employer'
    });
    handleResetAndClose();
  };

  const handleCompleteEmployerRegister = () => {
    onLoginSuccess({
      name: companyName || 'Registered Enterprise Employer',
      role: 'Employer'
    });
    handleResetAndClose();
  };

  const handleResetAndClose = () => {
    setStep('select');
    setOtpSent(false);
    setOtp('');
    setMobileNumber('');
    onClose();
  };

  return (
    <div
      id="skill-india-login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleResetAndClose();
      }}
    >
      <div
        id="skill-india-login-card"
        className="relative w-full max-w-[760px] bg-white rounded-2xl shadow-2xl p-5 sm:p-7 border border-gray-100 text-slate-800 my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar: Skill India Logo, Mode Selector & Close 'X' */}
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

          {/* Mode Switcher Tabs (Login vs Register) & Close Button */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#103770] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className={`px-3.5 sm:px-4 py-1.5 rounded-lg transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#ea580c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register
              </button>
            </div>

            <button
              id="close-login-popup-btn"
              onClick={handleResetAndClose}
              className="text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: ROLE SELECTOR */}
        {step === 'select' && (
          <div className="mt-4">
            {/* Header Text */}
            <div className="text-center pb-2">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
                {mode === 'login' ? 'Welcome to Skill India Digital Hub (SIDH)' : 'Register on Skill India Digital Hub (SIDH)'}
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 mb-5 font-normal">
                {mode === 'login'
                  ? 'Select your role to access your personalized vocational dashboard'
                  : 'Select your entity type to complete official organization registration'}
              </p>
            </div>

            {/* LOGIN MODE: 3 ROLES (Trainee, Partner, Employer) */}
            {mode === 'login' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {/* 1. Trainee */}
                <div
                  id="role-card-trainee"
                  onClick={() => handleCardClick('trainee')}
                  onDoubleClick={() => handleCardDoubleClick('trainee')}
                  className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${
                    selectedRole === 'trainee'
                      ? 'border-blue-600 bg-blue-50/20 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {/* Radio selection circle */}
                  <div className="absolute top-3.5 left-3.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        selectedRole === 'trainee' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {selectedRole === 'trainee' && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 transition-transform scale-100" />
                      )}
                    </div>
                  </div>

                  {/* Illustration Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#edf3fc] flex items-center justify-center shrink-0 ml-3 sm:ml-4 mt-0.5">
                    <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                      <path d="M6 38H42" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M12 28V42M18 28V42" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="21" cy="18" r="5" fill="#fbcfe8" />
                      <path d="M14 34C14 26 28 26 28 34" fill="#2563eb" />
                      <rect x="25" y="24" width="16" height="11" rx="1.5" fill="#3b82f6" />
                      <path d="M23 35H43" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" />
                      <rect x="27" y="26" width="12" height="7" rx="1" fill="#eff6ff" />
                      <circle cx="33" cy="29.5" r="1.5" fill="#3b82f6" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight">
                      Trainee
                    </h3>
                    <p className="text-[11px] sm:text-[11.5px] text-gray-500 mt-1 leading-snug">
                      Learn from courses, practice simulators, track practical hours &amp; job applications.
                    </p>
                  </div>
                </div>

                {/* 2. Partner */}
                <div
                  id="role-card-partner"
                  onClick={() => handleCardClick('partner')}
                  onDoubleClick={() => handleCardDoubleClick('partner')}
                  className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${
                    selectedRole === 'partner'
                      ? 'border-blue-600 bg-blue-50/20 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {/* Radio selection circle */}
                  <div className="absolute top-3.5 left-3.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        selectedRole === 'partner' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {selectedRole === 'partner' && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 transition-transform scale-100" />
                      )}
                    </div>
                  </div>

                  {/* Illustration Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#edf3fc] flex items-center justify-center shrink-0 ml-3 sm:ml-4 mt-0.5">
                    <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
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
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight">
                      Partner
                    </h3>
                    <p className="text-[11px] sm:text-[11.5px] text-gray-500 mt-1 leading-snug">
                      Learning partner, ITI, Skill Academy, content provider &amp; training center.
                    </p>
                  </div>
                </div>

                {/* 3. Employer */}
                <div
                  id="role-card-employer"
                  onClick={() => handleCardClick('employer')}
                  onDoubleClick={() => handleCardDoubleClick('employer')}
                  className={`relative flex flex-col sm:flex-row items-center sm:items-start gap-3 p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${
                    selectedRole === 'employer'
                      ? 'border-blue-600 bg-blue-50/20 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  {/* Radio selection circle */}
                  <div className="absolute top-3.5 left-3.5">
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                        selectedRole === 'employer' ? 'border-blue-600 bg-white' : 'border-gray-300 bg-white'
                      }`}
                    >
                      {selectedRole === 'employer' && (
                        <div className="w-2 h-2 rounded-full bg-blue-600 transition-transform scale-100" />
                      )}
                    </div>
                  </div>

                  {/* Illustration Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#edf3fc] flex items-center justify-center shrink-0 ml-3 sm:ml-4 mt-0.5">
                    <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
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
                  <div className="flex-1 min-w-0 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900 text-[15px] leading-tight">
                      Employer
                    </h3>
                    <p className="text-[11px] sm:text-[11.5px] text-gray-500 mt-1 leading-snug">
                      Post vacancies &amp; apprenticeships, hire verified talent, trace career outcomes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* REGISTRATION MODE: ONLY PARTNER & EMPLOYER (REST REMOVED) */}
            {mode === 'register' && (
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
            )}

            {/* Continue Action Button */}
            <div className="mt-6 flex justify-center">
              <button
                id="continue-role-btn"
                onClick={handleContinue}
                className={`w-full sm:w-auto min-w-[260px] px-7 py-3 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                  mode === 'register'
                    ? 'bg-[#ea580c] hover:bg-[#c2410c]'
                    : 'bg-[#103770] hover:bg-[#0b2955]'
                }`}
              >
                <span>
                  {mode === 'register'
                    ? `Continue Registration as ${selectedRole === 'partner' ? 'Partner' : 'Employer'}`
                    : `Continue Login as ${
                        selectedRole === 'trainee'
                          ? 'Trainee'
                          : selectedRole === 'partner'
                          ? 'Partner'
                          : 'Employer'
                      }`}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Footer Switcher & Legal Links */}
            <div className="mt-6 text-center space-y-2 border-t border-gray-100 pt-4">
              <div className="text-xs text-slate-600">
                {mode === 'login' ? (
                  <span>
                    New Partner or Employer organization?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('register')}
                      className="text-[#ea580c] hover:underline font-bold cursor-pointer"
                    >
                      Register here →
                    </button>
                  </span>
                ) : (
                  <span>
                    Already registered with Skill India?{' '}
                    <button
                      type="button"
                      onClick={() => handleSwitchMode('login')}
                      className="text-[#103770] hover:underline font-bold cursor-pointer"
                    >
                      Login here →
                    </button>
                  </span>
                )}
              </div>

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

        {/* STEP 2: AUTHENTICATION / REGISTRATION FORM */}
        {step === 'auth' && (
          <div className="mt-3 space-y-5">
            {/* Back button */}
            <button
              onClick={() => setStep('select')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Role Selection</span>
            </button>

            {/* Header Badge */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {mode === 'register' ? 'Registering Organization as' : 'Logging in as'}
                </span>
                <div className="text-sm font-bold text-[#103770] flex items-center gap-1.5 mt-0.5">
                  {selectedRole === 'trainee' && <GraduationCap className="w-4 h-4 text-blue-600" />}
                  {selectedRole === 'partner' && <Users className="w-4 h-4 text-orange-600" />}
                  {selectedRole === 'employer' && <Briefcase className="w-4 h-4 text-emerald-600" />}
                  <span>
                    {selectedRole === 'trainee' && 'Trainee (Learner)'}
                    {selectedRole === 'partner' && 'Industry / Learning Partner'}
                    {selectedRole === 'employer' && 'Enterprise Employer & Recruiter'}
                  </span>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                mode === 'register' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {mode === 'register' ? 'SIDH Registration' : 'SIDH Gateway'}
              </span>
            </div>

            {/* FORM 1: TRAINEE LOGIN */}
            {mode === 'login' && selectedRole === 'trainee' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number (Registered with SIDH or Aadhaar)
                  </label>
                  <div className="relative flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                    <span className="px-3 py-2 bg-gray-100 text-gray-600 text-xs font-semibold border-r border-gray-300 flex items-center">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter 10-digit mobile number"
                      className="flex-1 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={mobileNumber.length < 10}
                      className={`px-4 text-xs font-semibold transition ${
                        mobileNumber.length >= 10
                          ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {otpSent ? 'Resend' : 'Get OTP'}
                    </button>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-700">Enter 6-Digit OTP</label>
                      <span className="text-[11px] text-emerald-600 font-medium">Auto-detected (Demo OTP: 482910)</span>
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="• • • • • •"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-center font-mono tracking-widest text-lg font-bold text-slate-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                )}

                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleCompleteTraineeLogin(false)}
                    disabled={!otpSent || otp.length < 6}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm shadow transition ${
                      otpSent && otp.length >= 6
                        ? 'bg-[#103770] text-white hover:bg-[#0b2955] cursor-pointer'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Verify &amp; Login
                  </button>

                  <div className="relative my-2 text-center">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <span className="relative px-3 bg-white text-[11px] text-gray-500">or express prototype access</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCompleteTraineeLogin(true)}
                    className="w-full py-2 px-3 border border-amber-500/40 bg-amber-50/50 hover:bg-amber-100/60 rounded-xl text-xs font-semibold text-amber-900 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-amber-600" />
                    <span>Instant Demo Login as Kavita Sharma (Trainee)</span>
                  </button>
                </div>
              </div>
            )}

            {/* FORM 2: PARTNER LOGIN */}
            {mode === 'login' && selectedRole === 'partner' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Partner ID / Registered Corporate Email
                  </label>
                  <input
                    type="text"
                    value={partnerId}
                    onChange={(e) => setPartnerId(e.target.value)}
                    placeholder="e.g. partner@tatamotors.com or PRT-94821"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password / Security Key</label>
                  <input
                    type="password"
                    value={partnerPass}
                    onChange={(e) => setPartnerPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleCompletePartnerLogin(false)}
                    className="w-full py-2.5 bg-[#103770] hover:bg-[#0b2955] text-white rounded-xl font-semibold text-sm shadow transition cursor-pointer"
                  >
                    Partner Console Login
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompletePartnerLogin(true)}
                    className="w-full py-2 px-3 border border-blue-200 bg-blue-50/50 hover:bg-blue-100/60 rounded-xl text-xs font-semibold text-blue-900 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>Instant Demo Login as Tata Motors EV Skill Hub (Partner)</span>
                  </button>
                </div>
              </div>
            )}

            {/* FORM 3: EMPLOYER LOGIN */}
            {mode === 'login' && selectedRole === 'employer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Email / CIN / TAN
                  </label>
                  <input
                    type="text"
                    value={employerEmail}
                    onChange={(e) => setEmployerEmail(e.target.value)}
                    placeholder="e.g. careers@mahindra.com or L28920MH1945PLC004594"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={employerPass}
                    onChange={(e) => setEmployerPass(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={() => handleCompleteEmployerLogin(false)}
                    className="w-full py-2.5 bg-[#103770] hover:bg-[#0b2955] text-white rounded-xl font-semibold text-sm shadow transition cursor-pointer"
                  >
                    Employer Portal Login
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCompleteEmployerLogin(true)}
                    className="w-full py-2 px-3 border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 rounded-xl text-xs font-semibold text-emerald-900 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-emerald-600" />
                    <span>Instant Demo Login as Mahindra Electric Mobility (Employer)</span>
                  </button>
                </div>
              </div>
            )}

            {/* FORM 4: PARTNER REGISTRATION */}
            {mode === 'register' && selectedRole === 'partner' && (
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
                      value={partnerId}
                      onChange={(e) => setPartnerId(e.target.value)}
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

            {/* FORM 5: EMPLOYER REGISTRATION */}
            {mode === 'register' && selectedRole === 'employer' && (
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
                <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                By accessing Skill India Digital Hub (SIDH), you agree to use the platform in compliance with national vocational guidelines, NSDC protocols, and statutory verification requirements.
              </p>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-2 bg-[#103770] text-white rounded-lg text-xs font-semibold"
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
                <button onClick={() => setShowPrivacyModal(false)} className="text-gray-400 hover:text-gray-700">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Your personal and demographic data is handled in strict compliance with the Digital Personal Data Protection (DPDP) Act 2023. Explicit consent is sought before performing statutory linkages such as EPFO UAN lookups or employer validation.
              </p>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2 bg-[#103770] text-white rounded-lg text-xs font-semibold"
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
