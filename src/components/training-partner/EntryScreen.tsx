import React, { useState } from 'react';
import {
  Building2,
  FileCheck2,
  FileText,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Phone,
  Mail,
  Download,
  Search,
  Lock,
  ExternalLink,
  BookOpen,
  MapPin,
  Clock,
  Printer,
  Scale,
  Award,
  Users,
  Check,
  ChevronRight,
  Info,
  X,
} from 'lucide-react';

interface EntryScreenProps {
  onStartRegistration: () => void;
  onOpenPartnerLogin?: () => void;
  onClose?: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({
  onStartRegistration,
  onOpenPartnerLogin,
  onClose,
}) => {
  const [trackRef, setTrackRef] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginMobile.trim() === '8252678014' && loginPassword === 'Vanguard@2026') {
      setShowLoginModal(false);
      if (onOpenPartnerLogin) {
        onOpenPartnerLogin();
      }
    } else {
      setLoginError('Invalid credentials. Please enter mobile 8252678014 and password Vanguard@2026');
    }
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackRef.trim()) return;
    setTrackResult(
      `Application Ref. ${trackRef.trim().toUpperCase()}: Current Status is 'Technical Desktop Evaluation Underway'. Pending verification with MSSDS Divisional Committee.`
    );
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-900 pb-16 font-sans">
      
      {/* 1. Official National Tricolor Accent Bar */}
      <div className="h-1.5 w-full grid grid-cols-3">
        <div className="bg-[#ea580c]" />
        <div className="bg-white" />
        <div className="bg-[#15803d]" />
      </div>

      {/* 2. Top Government Utility & Accessibility Bar */}
      <div className="bg-[#0f2e5a] text-white text-xs px-4 sm:px-8 py-2 border-b border-slate-700">
        <div className="w-full flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="font-semibold tracking-wide">
              Government of Maharashtra | महाराष्ट्र शासन
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-200 font-medium">
              Department of Skill Development &amp; Entrepreneurship
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <div className="hidden lg:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-orange-400" />
              <span>Toll-Free Helpline: <strong>1800-120-8040</strong> (Mon–Sat, 09:30 AM – 06:00 PM)</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 border-l border-slate-700 pl-3">
              <span className="text-slate-300">Language:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold text-white text-[10px]">
                English
              </span>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white px-3 py-1 rounded text-xs font-bold transition-colors cursor-pointer shadow-sm ml-2 border border-red-500"
                title="Close Portal"
              >
                <span>Close Portal</span>
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Official Department Masthead & Seal */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* KAUSHAL Logo & Portal Title */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* KAUSHAL Logo */}
            <div className="shrink-0 flex items-center justify-center">
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
                alt="KAUSHAL Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain select-none"
              />
            </div>

            <div>
              <h1 className="text-lg sm:text-2xl font-black text-[#0f2e5a] tracking-tight leading-snug">
                KAUSHAL Training Partner Registration &amp; Accreditation Portal
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                Official Institutional Empanelment &amp; Training Centre Accreditation System 2026–27
              </div>
            </div>
          </div>

            {/* Accreditation & Standardization Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 text-center min-w-[95px]">
              <span className="text-[10px] font-extrabold uppercase text-[#b45309] block">
                EMPANELLED BY
              </span>
              <span className="text-xs font-black text-[#0f2e5a]">
                MSSDS
              </span>
              <span className="text-[9px] text-slate-500 block">Maharashtra</span>
            </div>

            <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 text-center min-w-[95px]">
              <span className="text-[10px] font-extrabold uppercase text-emerald-700 block">
                COMPLIANT WITH
              </span>
              <span className="text-xs font-black text-[#0f2e5a]">
                NCVET / NSQF
              </span>
              <span className="text-[9px] text-slate-500 block">Quality Norms</span>
            </div>

            <div className="border border-slate-200 rounded-lg p-2 bg-slate-50 text-center min-w-[95px]">
              <span className="text-[10px] font-extrabold uppercase text-blue-700 block">
                INTEGRATED
              </span>
              <span className="text-xs font-black text-[#0f2e5a]">
                SIDH / SMART
              </span>
              <span className="text-[9px] text-slate-500 block">National MIS</span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Public Notification Circular Banner - In Motion Ticker */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs overflow-hidden flex items-center gap-3">
        <span className="bg-[#b45309] text-white px-2.5 py-1 rounded text-[10px] font-bold shrink-0 uppercase tracking-wide flex items-center gap-1.5 shadow-2xs z-10">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-200" />
          <span>Official Notification</span>
        </span>
        <div className="relative flex-1 overflow-hidden group">
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] cursor-pointer">
            <span className="text-amber-950 font-medium px-4 inline-flex items-center gap-2">
              <span className="font-bold text-[#b45309]">G.R. No. KAUSH-2025/CR-84:</span> Online applications are invited for Empanelment of Training Partners (TPs) and Accreditation of Training Centres (TCs) for FY 2026–27 under MSSDS, PMKVY 4.0, and CSPS schemes. Phase-1 desktop evaluation deadline: October 31, 2026.
              <span className="mx-4 text-amber-400 font-bold">•</span>
              <span className="font-bold text-[#b45309]">Advisory Notice:</span> TPs must ensure all biometric Aadhaar-enabled attendance systems (AEBAS) &amp; CCTV live feeds comply with MSSDS mandate.
              <span className="mx-4 text-amber-400 font-bold">•</span>
              <span className="font-bold text-[#b45309]">Toll-Free Helpline:</span> Call 1800-120-8040 for registration assistance.
            </span>
            <span className="text-amber-950 font-medium px-4 inline-flex items-center gap-2">
              <span className="font-bold text-[#b45309]">G.R. No. KAUSH-2025/CR-84:</span> Online applications are invited for Empanelment of Training Partners (TPs) and Accreditation of Training Centres (TCs) for FY 2026–27 under MSSDS, PMKVY 4.0, and CSPS schemes. Phase-1 desktop evaluation deadline: October 31, 2026.
              <span className="mx-4 text-amber-400 font-bold">•</span>
              <span className="font-bold text-[#b45309]">Advisory Notice:</span> TPs must ensure all biometric Aadhaar-enabled attendance systems (AEBAS) &amp; CCTV live feeds comply with MSSDS mandate.
              <span className="mx-4 text-amber-400 font-bold">•</span>
              <span className="font-bold text-[#b45309]">Toll-Free Helpline:</span> Call 1800-120-8040 for registration assistance.
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">

        {/* 5. Primary Official Registration Form Gateway (Focused solely on registration) */}
        <div className="bg-white rounded-xl border-2 border-[#b45309] shadow-sm overflow-hidden">
          <div className="bg-[#0f2e5a] text-white px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#b45309]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 block">
                  Official Online Application • FY 2026–27
                </span>
                <h2 className="text-base sm:text-lg font-black text-white">
                  Training Partner Registration & Centre Accreditation Form
                </h2>
              </div>
            </div>
            <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-2xs">
              Applications Active
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl space-y-2.5">
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  Comprehensive 20-step digitized application for Vocational Training Providers (VTPs), Industrial Training Institutes (ITIs), Colleges, Universities, CSR Trusts, and Private Skill Institutions seeking institutional empanelment under the Maharashtra State Skill Development Society (MSSDS).
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The application covers institutional credentials, infrastructure blueprints, Fire Safety NOC compliance, NSQF-aligned curriculum mapping, certified ToT trainers, financial audit statements, and industry placement partnerships.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:min-w-[280px]">
                <button
                  type="button"
                  onClick={onStartRegistration}
                  className="bg-[#c2410c] hover:bg-[#9a3412] text-white font-bold py-3.5 px-6 rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm hover:shadow"
                >
                  <span>Start Registration Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-slate-200 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">100% Digitized</strong>
                  <span className="text-[11px] text-slate-500">No physical submission needed</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">20 Structured Steps</strong>
                  <span className="text-[11px] text-slate-500">Comprehensive verification</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">Instant Ref Tracking</strong>
                  <span className="text-[11px] text-slate-500">Real-time status updates</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <strong className="block text-slate-900 font-bold">NCVET / NSQF Aligned</strong>
                  <span className="text-[11px] text-slate-500">Standardized quality framework</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Application Status Tracker Bar */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#b45309] uppercase tracking-wider">
                <Search className="w-3.5 h-3.5" />
                Application Status Tracking
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#0f2e5a] mt-0.5">
                Enter your Application Reference Number or Entity PAN to verify real-time status
              </h3>
            </div>

            <form onSubmit={handleTrack} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={trackRef}
                onChange={(e) => setTrackRef(e.target.value)}
                placeholder="e.g. KTP-MH-2026-8491 or PAN"
                className="px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-medium focus:bg-white focus:outline-none focus:border-[#0f2e5a] min-w-[260px]"
              />
              <button
                type="submit"
                className="bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition cursor-pointer shrink-0"
              >
                Track Status
              </button>
            </form>
          </div>

          {trackResult && (
            <div className="mt-4 p-3.5 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>{trackResult}</div>
            </div>
          )}
        </div>

        {/* 7. Institutional Eligibility Criteria Table */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#b45309] uppercase tracking-wide block">
                Statutory Guidelines
              </span>
              <h3 className="text-base font-black text-[#0f2e5a]">
                Institutional Eligibility Criteria for Empanelment
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Ref: MSSDS-2025/GUIDELINES-09
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70">
                <div className="w-8 h-8 rounded-md bg-blue-100 text-[#0f2e5a] flex items-center justify-center font-black mb-2">
                  1
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Legal Incorporation</h4>
                <p className="text-slate-600 leading-relaxed">
                  Entity must be registered for a minimum of 3 continuous financial years under Societies Registration Act 1860, Indian Trusts Act 1882, or Companies Act 2013 (Section 8 or Pvt Ltd).
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70">
                <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center font-black mb-2">
                  2
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Financial Solvency</h4>
                <p className="text-slate-600 leading-relaxed">
                  Audited Balance Sheets for the last 3 financial years certified by a Chartered Accountant with UDIN, positive net worth, and regular IT/GST returns.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70">
                <div className="w-8 h-8 rounded-md bg-amber-100 text-[#b45309] flex items-center justify-center font-black mb-2">
                  3
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Centre Infrastructure</h4>
                <p className="text-slate-600 leading-relaxed">
                  Minimum 1,500 sq.ft. carpet area (owned or minimum 3-year registered lease deed), dedicated computer lab, Fire Safety NOC, and continuous CCTV surveillance.
                </p>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50/70">
                <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-900 flex items-center justify-center font-black mb-2">
                  4
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Faculty & Biometric Integration</h4>
                <p className="text-slate-600 leading-relaxed">
                  All master trainers must hold SSC / NCVET Training of Trainer (ToT) certification. Centre must be equipped with Aadhaar-Enabled Biometric Attendance (AEBAS).
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 8. The 20-Step Empanelment Process Architecture */}
        <div className="bg-white rounded-xl border border-slate-300 shadow-xs overflow-hidden">
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#b45309] uppercase tracking-wide block">
                Workflow Architecture
              </span>
              <h3 className="text-base font-black text-[#0f2e5a]">
                20-Step Empanelment & Accreditation Workflow Architecture
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              20 Total Sections • 4 Structured Phases
            </span>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              
              {/* Stage 1 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-[#0f2e5a] bg-blue-100 px-2 py-0.5 rounded inline-block mb-2">
                  Phase 1: Entity Profile
                </span>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Steps 1–3: Legal & Governance</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li>• Step 1: Legal Name & Registration Type</li>
                  <li>• Step 2: PAN, TAN, GSTIN & Statutory Documents</li>
                  <li>• Step 3: Authorized Representative & Signatory</li>
                </ul>
              </div>

              {/* Stage 2 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mb-2">
                  Phase 2: Centre Infrastructure
                </span>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Steps 4–6: Physical Facilities</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li>• Step 4: Centre Address & Geo-Coordinates</li>
                  <li>• Step 5: Batch Capacity & Classroom Dimensions</li>
                  <li>• Step 6: Lab Hardware, Power Backup & Safety</li>
                </ul>
              </div>

              {/* Stage 3 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-[#b45309] bg-amber-100 px-2 py-0.5 rounded inline-block mb-2">
                  Phase 3: Curriculum & Faculty
                </span>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Steps 7–10: Academic Quality</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li>• Step 7: NSQF-Aligned Job Role Selection</li>
                  <li>• Step 8: Modular Assessment & Exam Pattern</li>
                  <li>• Step 9: ToT-Certified Trainers & CVs</li>
                  <li>• Step 10: NCVET / SSC Accreditation Proofs</li>
                </ul>
              </div>

              {/* Stage 4 */}
              <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <span className="text-[10px] font-bold uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded inline-block mb-2">
                  Phase 4: Placement & Final Review
                </span>
                <h4 className="text-xs font-bold text-slate-900 mb-2">Steps 11–20: Verification & Submission</h4>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  <li>• Steps 11–14: Prior Experience & Industry MoUs</li>
                  <li>• Steps 15–16: MIS Technology & Scheme Mapping</li>
                  <li>• Step 17: Bank Account & Audited Financials</li>
                  <li>• Steps 18–20: Document Upload, Affidavit & Submit</li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* 9. Mandatory Documents Checklist */}
        <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-[#b45309] uppercase tracking-wide block">
                Document Checklist
              </span>
              <h3 className="text-base font-black text-[#0f2e5a]">
                Mandatory Documents Required with Online Application
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              (All uploads must be in PDF format, maximum size 5 MB per file)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">1.</span>
              <span className="text-slate-800 font-medium">
                Entity PAN Card & Authorized Signatory PAN / Aadhaar Card
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">2.</span>
              <span className="text-slate-800 font-medium">
                GSTIN Registration Certificate (State of Maharashtra - 27 Series)
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">3.</span>
              <span className="text-slate-800 font-medium">
                Certificate of Incorporation (COI) / Trust Deed / Society Registration Certificate
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">4.</span>
              <span className="text-slate-800 font-medium">
                Premises Ownership Title Deed or Registered Lease Agreement (Minimum 3 Years)
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">5.</span>
              <span className="text-slate-800 font-medium">
                Fire Safety NOC from Municipal Corporation & Structural Stability Certificate
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">6.</span>
              <span className="text-slate-800 font-medium">
                CA-Certified Audited Balance Sheets for Last 3 Years with Net Worth Certificate
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">7.</span>
              <span className="text-slate-800 font-medium">
                Approved Architectural Blueprint Layout & Geo-Tagged Centre Photographs
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">8.</span>
              <span className="text-slate-800 font-medium">
                Trainer Qualification Certificates & SSC / NCVET Training of Trainer (ToT) Cards
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">9.</span>
              <span className="text-slate-800 font-medium">
                Cancelled Bank Cheque or Bank Passbook First Page with IFSC and Account Name
              </span>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#0f2e5a]">10.</span>
              <span className="text-slate-800 font-medium">
                Notarized Statutory Undertaking & Affidavit on ₹100 Non-Judicial Stamp Paper
              </span>
            </div>
          </div>
        </div>

        {/* 10. Official Statutory Penal Notice */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-5 text-xs text-red-950">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-black text-red-900 uppercase tracking-wide">
                Statutory Warning under the Indian Penal Code (IPC)
              </h4>
              <p className="leading-relaxed font-medium">
                Submission of forged certificates, false faculty credentials, fictitious infrastructure claims, or fraudulent documentation constitutes a cognizable criminal offence under Indian Penal Code (IPC) Sections 415, 420, 468, and 471. Defaulting institutions shall be immediately disqualified, <strong>permanently blacklisted</strong> from all Maharashtra State (MSSDS) and Central Government skill development programs, and subjected to criminal prosecution.
              </p>
            </div>
          </div>
        </div>

        {/* 11. Regional Helpdesk & Facilitation Desks */}
        <div className="bg-white rounded-xl border border-slate-300 p-6 shadow-xs text-xs">
          <h3 className="text-sm font-bold text-[#0f2e5a] mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#b45309]" />
            Regional Facilitation Desks & Contact Information (MSSDS)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-700">
            <div className="border-l-2 border-[#0f2e5a] pl-3 py-1">
              <strong className="block text-slate-900">Headquarters (Mumbai)</strong>
              <span>Maharashtra State Skill Development Society, 4th Floor, MTNL Building, Cuffe Parade, Mumbai - 400005.</span>
              <span className="block text-slate-500 font-mono mt-1">Phone: 022-22620601</span>
            </div>

            <div className="border-l-2 border-[#b45309] pl-3 py-1">
              <strong className="block text-slate-900">Pune & Western Maharashtra</strong>
              <span>Divisional Skill Development Centre, Government Polytechnic Campus, Shivajinagar, Pune - 411016.</span>
              <span className="block text-slate-500 font-mono mt-1">Phone: 020-25534567</span>
            </div>

            <div className="border-l-2 border-emerald-700 pl-3 py-1">
              <strong className="block text-slate-900">Nagpur & Vidarbha Division</strong>
              <span>Kaushalya Bhavan, Administrative Building Complex, Civil Lines, Nagpur - 440001.</span>
              <span className="block text-slate-500 font-mono mt-1">Phone: 0712-2561823</span>
            </div>
          </div>
        </div>

        {/* 12. Official Government Footer */}
        <div className="border-t border-slate-300 pt-6 text-center text-xs text-slate-600 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-4 font-semibold text-slate-700">
            <button type="button" onClick={onStartRegistration} className="hover:text-[#b45309] underline cursor-pointer">
              Start New Registration
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => {
                setLoginMobile('8252678014');
                setLoginPassword('Vanguard@2026');
                setShowLoginModal(true);
              }}
              className="text-[#0f2e5a] hover:underline font-bold cursor-pointer"
            >
              Training Partner Dashboard Login
            </button>
            <span>&bull;</span>
            <span className="text-slate-500">Guidelines Manual (PDF)</span>
            <span>&bull;</span>
            <span className="text-slate-500">Frequently Asked Questions (FAQ)</span>
          </div>

          <p className="text-[11px] text-slate-500">
            Official portal designed and hosted by National Informatics Centre (NIC) / MKCL for the Department of Skill Development &amp; Entrepreneurship, Government of Maharashtra.
          </p>
          <p className="text-[10px] text-slate-400">
            Portal Version 4.2.0 &bull; Last Updated: September 16, 2026 &bull; All Rights Reserved &copy; 2026 Government of Maharashtra.
          </p>
        </div>

      </div>

      {/* TRAINING PARTNER LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#0f2e5a] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 border border-white/20">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Training Partner Portal Login</h3>
                  <p className="text-[11px] text-slate-300">Department of Skill Development &amp; Entrepreneurship</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handlePartnerSubmit} className="p-6 space-y-4">
              
              {/* Credentials reminder badge */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Authorized Empanelled Partner Access</span>
                </div>
                <div className="text-[11px] text-blue-800 flex items-center justify-between">
                  <span>Mobile: <strong className="font-mono">8252678014</strong></span>
                  <span>Password: <strong className="font-mono">Vanguard@2026</strong></span>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registered Mobile Number
                </label>
                <input
                  type="text"
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value)}
                  placeholder="8252678014"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0f2e5a] focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0f2e5a] focus:border-transparent transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Sign In to Training Partner Dashboard</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
