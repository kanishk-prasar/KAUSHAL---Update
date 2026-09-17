import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowLeft,
  ShieldCheck,
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
  onOpenTrainingPartnerDashboard?: () => void;
  onOpenEmployerDashboard?: () => void;
  onOpenTraineeDashboard?: () => void;
  initialRole?: RoleType;
  lang: 'en' | 'mr' | 'hi';
}

type RoleType = 'trainee' | 'partner' | 'employer';

export const SkillIndiaLoginModal: React.FC<SkillIndiaLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onOpenTrainingPartnerDashboard,
  onOpenEmployerDashboard,
  onOpenTraineeDashboard,
  initialRole = 'trainee',
  lang: _lang
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>(initialRole);
  const [step, setStep] = useState<'select' | 'auth'>('select');

  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
    }
  }, [initialRole, isOpen]);

  // Trainee Auth State
  const [traineeAuthMethod, setTraineeAuthMethod] = useState<'id_pass' | 'otp'>('id_pass');
  const [traineeId, setTraineeId] = useState('KID-8252678014');
  const [traineePassword, setTraineePassword] = useState('Venguard@2026');
  const [mobileNumber, setMobileNumber] = useState('8252678014');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Partner Auth State
  const [partnerId, setPartnerId] = useState('');
  const [partnerPass, setPartnerPass] = useState('');

  // Employer Auth State
  const [employerEmail, setEmployerEmail] = useState('');
  const [employerPass, setEmployerPass] = useState('');

  // Terms and Privacy Modals
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedRole('trainee');
      setStep('select');
      setOtpSent(false);
      setOtp('');
      setMobileNumber('');
    }
  }, [isOpen]);

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
      setOtp('482910'); // Simulated autofill for seamless testing
    }
  };

  const handleCompleteTraineeLogin = (isDemo = false) => {
    onLoginSuccess({
      name: 'Aditya Raut',
      hindiName: 'आदित्य राऊत',
      phone: '+91 76679 46913',
      role: 'Trainee'
    });
    handleResetAndClose();
    if (onOpenTraineeDashboard) {
      onOpenTraineeDashboard();
    }
  };

  const handleCompletePartnerLogin = (isDemo = false) => {
    const isVanguard =
      (partnerId.trim() === '8252678014' && partnerPass === 'Vanguard@2026') ||
      partnerId.trim() === '8252678014';

    if (isVanguard && onOpenTrainingPartnerDashboard) {
      handleResetAndClose();
      onOpenTrainingPartnerDashboard();
      return;
    }

    onLoginSuccess({
      name: isVanguard
        ? 'Pune Skill Development Centre (Sanjay More)'
        : isDemo
        ? 'Tata Motors EV Skill Hub'
        : partnerId || 'Affiliated Skill Training Partner',
      phone: isVanguard ? '8252678014' : undefined,
      role: 'Partner'
    });
    handleResetAndClose();
  };

  const handleCompleteEmployerLogin = () => {
    onLoginSuccess({
      name: 'TataTech Industries',
      phone: '8252678014',
      role: 'Employer'
    });
    handleResetAndClose();
    if (onOpenEmployerDashboard) {
      onOpenEmployerDashboard();
    }
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
            id="close-login-popup-btn"
            onClick={handleResetAndClose}
            className="text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: ROLE SELECTOR */}
        {step === 'select' && (
          <div className="mt-4">
            {/* Header Text */}
            <div className="text-center pb-2">
              <h2 className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight">
                Welcome to Skill India Digital Hub (SIDH)
              </h2>
              <p className="text-xs sm:text-[13px] text-gray-500 mt-1 mb-5 font-normal">
                Select your role to access your personalized vocational dashboard
              </p>
            </div>

            {/* 3 ROLES (Trainee, Partner, Employer) */}
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

            {/* Continue Action Button */}
            <div className="mt-6 flex justify-center">
              <button
                id="continue-role-btn"
                onClick={handleContinue}
                className="w-full sm:w-auto min-w-[260px] px-7 py-3 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer bg-[#103770] hover:bg-[#0b2955]"
              >
                <span>
                  {`Continue Login as ${
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

        {/* STEP 2: AUTHENTICATION FORM */}
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
                  Logging in as
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
              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-blue-100 text-blue-800">
                SIDH Gateway
              </span>
            </div>

            {/* FORM 1: TRAINEE LOGIN */}
            {selectedRole === 'trainee' && (
              <div className="space-y-4">
                {/* Auth Mode Toggle */}
                <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTraineeAuthMethod('id_pass')}
                    className={`flex-1 py-1.5 rounded-md transition cursor-pointer text-center ${
                      traineeAuthMethod === 'id_pass'
                        ? 'bg-white text-[#103770] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Trainee ID &amp; Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setTraineeAuthMethod('otp')}
                    className={`flex-1 py-1.5 rounded-md transition cursor-pointer text-center ${
                      traineeAuthMethod === 'otp'
                        ? 'bg-white text-[#103770] shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Mobile Number &amp; OTP
                  </button>
                </div>

                {traineeAuthMethod === 'id_pass' ? (
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-700">
                          Trainee ID (KID) / Registration No.
                        </label>
                        <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                          Official SIDH ID
                        </span>
                      </div>
                      <input
                        type="text"
                        value={traineeId}
                        onChange={(e) => setTraineeId(e.target.value)}
                        placeholder="e.g. KID-8252678014"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 font-mono focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-semibold text-slate-700">Password</label>
                        <span className="text-[10px] text-slate-500">Security Key</span>
                      </div>
                      <input
                        type="password"
                        value={traineePassword}
                        onChange={(e) => setTraineePassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    {/* Pre-filled credentials note */}
                    <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900 flex items-center justify-between">
                      <div>
                        <span>Credentials: </span>
                        <strong className="font-mono">KID-8252678014</strong> /{' '}
                        <strong className="font-mono">Venguard@2026</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setTraineeId('KID-8252678014');
                          setTraineePassword('Venguard@2026');
                        }}
                        className="text-[10px] font-bold text-blue-700 underline hover:text-blue-900 cursor-pointer"
                      >
                        Auto-fill
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCompleteTraineeLogin(false)}
                      disabled={!traineeId}
                      className="w-full py-2.5 rounded-xl font-bold text-sm shadow bg-[#103770] hover:bg-[#0b2955] text-white transition cursor-pointer mt-1"
                    >
                      Login to Trainee Dashboard
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
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

                    <button
                      type="button"
                      onClick={() => handleCompleteTraineeLogin(false)}
                      disabled={!otpSent || otp.length < 6}
                      className={`w-full py-2.5 rounded-xl font-bold text-sm shadow transition ${
                        otpSent && otp.length >= 6
                          ? 'bg-[#103770] text-white hover:bg-[#0b2955] cursor-pointer'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Verify &amp; Enter Dashboard
                    </button>
                  </div>
                )}

                <div className="relative my-2 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <span className="relative px-3 bg-white text-[11px] text-gray-500">or 1-click access</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCompleteTraineeLogin(true)}
                  className="w-full py-2 px-3 border border-blue-500/40 bg-blue-50/60 hover:bg-blue-100/70 rounded-xl text-xs font-bold text-blue-900 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-blue-600" />
                  <span>Instant Login as Aditya Raut (KID-8252678014)</span>
                </button>
              </div>
            )}

            {/* FORM 2: PARTNER LOGIN */}
            {selectedRole === 'partner' && (
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
                </div>
              </div>
            )}

            {/* FORM 3: EMPLOYER LOGIN */}
            {selectedRole === 'employer' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Corporate Registered Mobile / ID / CIN
                  </label>
                  <input
                    type="text"
                    value={employerEmail}
                    onChange={(e) => setEmployerEmail(e.target.value)}
                    placeholder="8252678014"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Demo Login: <code className="text-slate-600 font-bold">8252678014</code>
                  </span>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    value={employerPass}
                    onChange={(e) => setEmployerPass(e.target.value)}
                    placeholder="Vanguard@2026"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Default Password: <code className="text-slate-600 font-bold">Vanguard@2026</code>
                  </span>
                </div>
                <div className="pt-2 flex flex-col gap-2.5">
                  <button
                    onClick={handleCompleteEmployerLogin}
                    className="w-full py-2.5 bg-[#103770] hover:bg-[#0b2955] text-white rounded-xl font-semibold text-sm shadow transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <span>Login to Employer Dashboard</span>
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
                By accessing Skill India Digital Hub (SIDH), you agree to use the platform in compliance with national vocational guidelines, NSDC protocols, and statutory verification requirements.
              </p>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-full py-2 bg-[#103770] text-white rounded-lg text-xs font-semibold cursor-pointer"
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
                Your personal and demographic data is handled in strict compliance with the Digital Personal Data Protection (DPDP) Act 2023. Explicit consent is sought before performing statutory linkages such as EPFO UAN lookups or employer validation.
              </p>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="w-full py-2 bg-[#103770] text-white rounded-lg text-xs font-semibold cursor-pointer"
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
