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
} from 'lucide-react';

interface EntryScreenProps {
  onStartRegistration: () => void;
  onLogin: () => void;
  onLoadDemoData: () => void;
}

export const EntryScreen: React.FC<EntryScreenProps> = ({
  onStartRegistration,
  onLogin,
  onLoadDemoData,
}) => {
  const [trackRef, setTrackRef] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

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
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="font-semibold tracking-wide">
              Government of Maharashtra | महाराष्ट्र शासन
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-200">
              Department of Skills, Employment, Entrepreneurship & Innovation
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-orange-400" />
              <span>Toll-Free Helpline: <strong>1800-120-8040</strong> (Mon–Sat, 09:30 AM – 06:00 PM)</span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-700 pl-3">
              <span className="text-slate-300">Language:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded font-bold text-white text-[10px]">
                English
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official Department Masthead & Seal */}
      <div className="bg-white border-b border-slate-200 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Official Emblem & State Title */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            {/* National Seal Symbol */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-full border-2 border-[#b45309] bg-amber-50/60 p-1.5 flex flex-col items-center justify-center shadow-xs">
              <Building2 className="w-7 h-7 text-[#0f2e5a]" />
              <span className="text-[8px] font-black text-[#b45309] tracking-tighter uppercase mt-0.5">
                SATYAMEVA JAYATE
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-[#b45309] uppercase tracking-wider">
                Government of Maharashtra • Department of Skills & Employment
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-[#0f2e5a] tracking-tight leading-snug">
                KAUSHAL Training Partner Registration & Accreditation Portal
              </h1>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                Official Institutional Empanelment & Training Centre Accreditation System 2026–27
              </div>
            </div>
          </div>

          {/* Accreditation & Standardization Badges */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
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

      {/* 4. Public Notification Circular Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-hidden">
          <span className="bg-[#b45309] text-white px-2 py-0.5 rounded text-[10px] font-bold shrink-0 uppercase tracking-wide flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Official Notification
          </span>
          <p className="text-amber-950 font-medium truncate">
            <strong>G.R. No. KAUSH-2025/CR-84:</strong> Online applications are invited for Empanelment of Training Partners (TPs) and Accreditation of Training Centres (TCs) for FY 2026–27 under MSSDS, PMKVY 4.0, and CSPS schemes. Phase-1 desktop evaluation deadline: October 31, 2026.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-8">

        {/* 5. Primary Official Gateways (3 Clean Institutional Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Gateway 1: New Registration (Primary Action) */}
          <div className="bg-white rounded-xl border-2 border-[#b45309] shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="bg-[#b45309] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                New Applicant | Track A
              </span>
              <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Applications Open
              </span>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <h2 className="text-lg font-black text-[#0f2e5a]">
                New Training Partner Registration
                <span className="block text-xs font-semibold text-slate-600 mt-0.5">
                  Complete 20-Step Empanelment Dossier
                </span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                For Vocational Training Providers (VTPs), ITIs, Colleges, Universities, CSR Trusts, and Private Institutions seeking official accreditation under Maharashtra State skill schemes.
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Entity profile, PAN, GSTIN & Trust/Board details</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Centre infrastructure, lab blueprints & CCTV surveillance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>NSQF-aligned job roles & ToT-certified trainers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>CA-certified financial audits & industry placement MoUs</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 bg-slate-50 border-t border-slate-100">
              <button
                type="button"
                onClick={onStartRegistration}
                className="w-full bg-[#c2410c] hover:bg-[#9a3412] text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
              >
                <span>Start New Registration (20 Steps)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-slate-500 text-center block mt-2 font-medium">
                Estimated duration: 30 to 45 minutes (Auto-save draft enabled)
              </span>
            </div>
          </div>

          {/* Gateway 2: Existing Training Partner Login */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="bg-[#0f2e5a] text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Portal Access | Empanelled Providers
              </span>
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Login
              </span>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <h2 className="text-lg font-black text-[#0f2e5a]">
                Empanelled Partner Login
                <span className="block text-xs font-semibold text-slate-600 mt-0.5">
                  Operations & Batch Management Dashboard
                </span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated administrative access for approved Training Partners to manage enrolled batches, monitor biometric attendance, record apprenticeship placements, and submit subsidy claims.
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Daily AEBAS biometric attendance monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Training batch approval & assessment schedules</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Industry placement & employer wage records</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>DBT milestone subsidy billing & disbursement status</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 bg-slate-50 border-t border-slate-100">
              <button
                type="button"
                onClick={onLogin}
                className="w-full bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
              >
                <Lock className="w-4 h-4" />
                <span>Partner Login</span>
              </button>
              <span className="text-[10px] text-slate-500 text-center block mt-2 font-medium">
                Secure access via Registered Partner ID & Password
              </span>
            </div>
          </div>

          {/* Gateway 3: Departmental Inspection / Demo Test Application */}
          <div className="bg-white rounded-xl border border-slate-300 shadow-sm flex flex-col justify-between overflow-hidden">
            <div className="bg-slate-700 text-white px-5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">
                Evaluation & Review | Audit View
              </span>
              <span className="bg-slate-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                Sample
              </span>
            </div>

            <div className="p-5 flex-1 space-y-3">
              <h2 className="text-lg font-black text-[#0f2e5a]">
                Verified Sample Application
                <span className="block text-xs font-semibold text-slate-600 mt-0.5">
                  Inspection & Review Dossier
                </span>
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                For departmental inspectors, committee evaluators, and prospective institutes to explore a fully populated, pre-verified application dossier (Pune Institute of Advanced Skills).
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>All 20 sections pre-filled with compliant data</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>Document review notes & committee decision workflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>Official Acknowledgement Receipt & Verification Slip</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 bg-slate-50 border-t border-slate-100">
              <button
                type="button"
                onClick={onLoadDemoData}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
              >
                <FileCheck2 className="w-4 h-4 text-amber-400" />
                <span>Load Sample Dossier</span>
              </button>
              <span className="text-[10px] text-slate-500 text-center block mt-2 font-medium">
                Recommended for departmental review & applicant reference
              </span>
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
            <button type="button" onClick={onLogin} className="hover:text-[#b45309] underline cursor-pointer">
              Partner Login
            </button>
            <span>&bull;</span>
            <button type="button" onClick={onLoadDemoData} className="hover:text-[#b45309] underline cursor-pointer">
              Load Sample Dossier
            </button>
            <span>&bull;</span>
            <span className="text-slate-500">Guidelines Manual (PDF)</span>
            <span>&bull;</span>
            <span className="text-slate-500">Frequently Asked Questions (FAQ)</span>
          </div>

          <p className="text-[11px] text-slate-500">
            Official portal designed and hosted by National Informatics Centre (NIC) / MKCL for the Department of Skills, Employment, Entrepreneurship & Innovation, Government of Maharashtra.
          </p>
          <p className="text-[10px] text-slate-400">
            Portal Version 4.2.0 &bull; Last Updated: September 16, 2026 &bull; All Rights Reserved &copy; 2026 Government of Maharashtra.
          </p>
        </div>

      </div>

    </div>
  );
};
