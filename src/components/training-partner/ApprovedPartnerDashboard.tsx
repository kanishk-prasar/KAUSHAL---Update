import React, { useState } from 'react';
import {
  Building2,
  GraduationCap,
  Users,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Award,
  Briefcase,
  Layers,
  FileCheck2,
  Clock,
  History,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  PlusCircle,
  QrCode,
} from 'lucide-react';
import { TrainingPartnerFormData, AuditLogEntry } from './types';

interface ApprovedPartnerDashboardProps {
  formData: TrainingPartnerFormData;
  onResetToLanding?: () => void;
}

export const ApprovedPartnerDashboard: React.FC<ApprovedPartnerDashboardProps> = ({
  formData,
  onResetToLanding,
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [changeType, setChangeType] = useState('Add Centre');
  const [changeReason, setChangeReason] = useState('');
  const [changeSuccessMessage, setChangeSuccessMessage] = useState('');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(formData.auditLogs || []);

  const partnerId = 'KTP-MH-2026-000184';

  const navItems = [
    'Dashboard',
    'Organisation Profile',
    'Training Centres',
    'Courses',
    'Trainees',
    'Batches',
    'Trainers',
    'Attendance',
    'Assessment',
    'Certification',
    'Employment Outcomes',
    'Employer Partnerships',
    'Data Model Hierarchy',
    'Audit Log',
    'Settings',
  ];

  const handleRequestChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeReason.trim()) return;

    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      user: formData.repFullName || 'Suhas Kulkarni (MD)',
      role: 'Training Partner Admin',
      action: `Profile Change Request: ${changeType}`,
      timestamp: 'Just now',
      previousValue: 'Master Record v1.0',
      newValue: `Requested Change: ${changeType}`,
      reason: changeReason,
      ipAddress: '103.112.44.18 (Pune, Maharashtra)',
    };

    setAuditLogs([newLog, ...auditLogs]);
    setChangeSuccessMessage(`Change Request "${changeType}" submitted for Directorate verification!`);
    setShowChangeModal(false);
    setChangeReason('');
    setTimeout(() => setChangeSuccessMessage(''), 5000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Top Banner: Welcome to KAUSHAL & Approved Partner ID */}
      <div className="bg-gradient-to-r from-[#0B3C5D] via-[#102A43] to-[#2A0845] rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-slate-700 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>VERIFIED TRAINING PARTNER &bull; ACTIVE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-orange-300 text-xs font-bold border border-white/15">
                Govt of Maharashtra Empanelled
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome to KAUSHAL
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-1 font-medium">
              {formData.orgName || 'ABC Skill Development & Vocational Institute Pvt Ltd'}
            </p>

            {/* Generated Government Partner ID */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="bg-white/10 backdrop-blur-xs px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2.5">
                <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">Training Partner ID:</span>
                <span className="font-mono font-black text-amber-300 text-sm sm:text-base">{partnerId}</span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/20 text-xs font-semibold text-slate-200">
                Centres: <span className="font-mono text-emerald-300 font-bold">KTP-MH-C001, C002, C003</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setShowChangeModal(true)}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer transition active:scale-98"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Profile Change Request</span>
            </button>

            {onResetToLanding && (
              <button
                type="button"
                onClick={onResetToLanding}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-4 py-2 rounded-xl font-bold text-xs cursor-pointer transition text-center"
              >
                Back to KAUSHAL Home
              </button>
            )}
          </div>
        </div>
      </div>

      {changeSuccessMessage && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{changeSuccessMessage}</span>
        </div>
      )}

      {/* 8 Post-Approval Metrics Dashboard Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Active Centres */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>ACTIVE CENTRES</span>
            <Building2 className="w-4 h-4 text-[#0B3C5D]" />
          </div>
          <div className="text-3xl font-black text-[#102A43]">
            {formData.centres.length || 3}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Pune, Mumbai Suburban, Nagpur
          </p>
        </div>

        {/* Card 2: Active Courses */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>ACTIVE COURSES</span>
            <GraduationCap className="w-4 h-4 text-[#ea580c]" />
          </div>
          <div className="text-3xl font-black text-[#102A43]">
            {formData.courses.length || 4}
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            NSQF Level 4 &amp; Level 5 Aligned
          </p>
        </div>

        {/* Card 3: Active Trainers */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>ACTIVE TRAINERS</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-[#102A43]">
            {formData.trainers.length || 12}
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            100% SSC Master Trainer Certified
          </p>
        </div>

        {/* Card 4: Active Trainees */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>ACTIVE TRAINEES</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-[#102A43]">
            480
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Across 16 ongoing batches
          </p>
        </div>

        {/* Card 5: Completion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>COMPLETION RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-700">
            92.8%
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Target benchmark: &ge; 85%
          </p>
        </div>

        {/* Card 6: Certification Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>CERTIFICATION RATE</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">
            86.4%
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            NCVET third-party assessed
          </p>
        </div>

        {/* Card 7: Employment Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>EMPLOYMENT RATE</span>
            <Briefcase className="w-4 h-4 text-[#ea580c]" />
          </div>
          <div className="text-3xl font-black text-[#ea580c]">
            79.2%
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Avg monthly wage: ₹21,500
          </p>
        </div>

        {/* Card 8: Retention Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold mb-1">
            <span>RETENTION RATE</span>
            <History className="w-4 h-4 text-[#0B3C5D]" />
          </div>
          <div className="text-3xl font-black text-[#0B3C5D]">
            88.5%
          </div>
          <p className="text-[11px] text-slate-500 font-semibold mt-1">
            Tracked at 6 months post-placement
          </p>
        </div>

      </div>

      {/* Main Content Layout with Side Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side Navigation Menu */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-3 h-fit">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
            Provider Management Portal
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveNav(item)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                  activeNav === item
                    ? 'bg-[#0B3C5D] text-white shadow-xs'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item}</span>
                {activeNav === item && <ChevronRight className="w-3.5 h-3.5 text-orange-400" />}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* VIEW: Data Model Relationship Visualization */}
          {activeNav === 'Data Model Hierarchy' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#ea580c]">
                  KAUSHAL Ecosystem Architecture (Section 38 / 45)
                </span>
                <h2 className="text-xl font-black text-[#102A43]">
                  End-to-End Data Model Relationship Hierarchy
                </h2>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Every level maintains immutable verified identifier keys connecting skills to sustainable livelihoods.
                </p>
              </div>

              {/* Visual Relationship Chain */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
                {[
                  { title: 'TRAINING PARTNER', id: 'KTP-MH-2026-000184', desc: 'Accredited legal entity & compliance holder', color: 'border-orange-500 bg-orange-50/50' },
                  { title: 'TRAINING CENTRE', id: 'KTP-MH-C001 (Pune Bhosari)', desc: 'Geo-tagged infrastructure, biometric terminals & labs', color: 'border-blue-500 bg-blue-50/50' },
                  { title: 'COURSE', id: 'KC-EV-001 (EV Service Specialist)', desc: 'NSQF Level 4 curriculum, syllabus & learning outcomes', color: 'border-purple-500 bg-purple-50/50' },
                  { title: 'BATCH', id: 'BATCH-2026-PUN-04', desc: '30 enrolled candidates with shift schedule', color: 'border-emerald-500 bg-emerald-50/50' },
                  { title: 'TRAINEE', id: 'KID-MH-2026-849102 (Pooja Jadhav)', desc: 'Aadhaar-authenticated digital skill passport holder', color: 'border-amber-500 bg-amber-50/50' },
                  { title: 'ATTENDANCE & PRACTICAL LAB', id: '88.5% Biometric Verified', desc: 'Automated facial/fingerprint MIS logs', color: 'border-slate-400 bg-white' },
                  { title: 'ASSESSMENT & CERTIFICATION', id: 'NCVET-CERT-MH-849102', desc: 'DigiLocker verifiable QR credential', color: 'border-teal-500 bg-teal-50/50' },
                  { title: 'JOB & HIRING', id: 'Tata Motors EV Service Centre', desc: 'Direct employment placement with Offer Letter', color: 'border-indigo-500 bg-indigo-50/50' },
                  { title: 'LONG-TERM OUTCOME', id: '12-Month Retention @ ₹22,000/mo', desc: 'Longitudinal wage tracking & career progression', color: 'border-emerald-600 bg-emerald-100/50' },
                ].map((step, idx, arr) => (
                  <div key={step.title} className="flex flex-col items-center">
                    <div className={`w-full p-4 rounded-xl border-2 ${step.color} flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs`}>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Level 0{idx + 1}</span>
                        <h4 className="text-sm font-black text-[#102A43]">{step.title}</h4>
                        <p className="text-xs text-slate-600">{step.desc}</p>
                      </div>
                      <div className="font-mono text-xs font-bold px-3 py-1.5 rounded-lg bg-white border text-[#0B3C5D] shadow-2xs shrink-0">
                        {step.id}
                      </div>
                    </div>
                    {idx < arr.length - 1 && (
                      <div className="w-0.5 h-4 bg-slate-300 my-0.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: Audit Log (Section 37) */}
          {activeNav === 'Audit Log' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-[#102A43]">
                    Immutable Audit Log &amp; Governance Trail
                  </h2>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Every modification, verification step, and profile alteration is recorded with cryptographic timestamps.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border">
                  {auditLogs.length} Records Logged
                </span>
              </div>

              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-sm text-[#102A43]">{log.action}</span>
                      <span className="font-mono text-[11px] text-slate-500">{log.timestamp}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-slate-600">
                      <span>User: <strong>{log.user}</strong> ({log.role})</span>
                      <span>&bull;</span>
                      <span>IP: <code className="text-slate-800">{log.ipAddress || '103.112.44.18'}</code></span>
                    </div>
                    {log.reason && (
                      <p className="text-slate-700 pt-1 border-t border-slate-200/80">
                        <strong>Reason / Justification:</strong> {log.reason}
                      </p>
                    )}
                    {log.newValue && (
                      <p className="text-emerald-700 font-mono text-[11px]">
                        Result: {log.newValue}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: Default Dashboard Overview */}
          {activeNav !== 'Data Model Hierarchy' && activeNav !== 'Audit Log' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-black text-[#102A43]">
                    {activeNav} Management
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Training Partner ID: <strong className="font-mono text-[#0B3C5D]">{partnerId}</strong>
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full border border-emerald-300">
                  Active &bull; State Approved
                </span>
              </div>

              {/* Centres Summary */}
              <div>
                <h3 className="text-sm font-bold text-[#102A43] mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#ea580c]" />
                  <span>Approved Training Centres</span>
                </h3>
                <div className="space-y-3">
                  {formData.centres.map((c, i) => (
                    <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#102A43]">{c.centreName}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
                            KTP-MH-C00{i + 1}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{c.addressLine1}, {c.city}, Dist. {c.district}</p>
                      </div>
                      <div className="flex items-center gap-4 text-slate-700 shrink-0 font-medium">
                        <span>Capacity: <strong>{c.maxConcurrentTrainees} Trainees</strong></span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                          Operational
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courses Summary */}
              <div>
                <h3 className="text-sm font-bold text-[#102A43] mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#0B3C5D]" />
                  <span>Approved Vocational Courses</span>
                </h3>
                <div className="space-y-3">
                  {formData.courses.map((crs, i) => (
                    <div key={crs.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-sm text-[#102A43]">{crs.courseName}</span>
                        <p className="text-slate-600 mt-0.5">Role: {crs.jobRole} &bull; Sector: {crs.sector}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-slate-700">{crs.durationHours} Hours</span>
                        <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-bold text-[11px]">
                          NSQF Level 4
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Modal: Profile Change Request (Section 36) */}
      {showChangeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border">
            <h3 className="text-lg font-black text-[#102A43] mb-1">
              Submit Profile Change Request
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-medium">
              As per Section 36 of KAUSHAL guidelines, sensitive changes require verification and government approval before master records are updated.
            </p>

            <form onSubmit={handleRequestChange} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Change Category *</label>
                <select
                  value={changeType}
                  onChange={(e) => setChangeType(e.target.value)}
                  className="w-full p-2.5 border rounded-xl bg-white font-medium"
                >
                  <option value="Change Registered Address">Change Registered Address</option>
                  <option value="Add Training Centre">Add Training Centre</option>
                  <option value="Remove Training Centre">Remove Training Centre</option>
                  <option value="Add Course">Add Course</option>
                  <option value="Update Course Curriculum">Update Course Curriculum</option>
                  <option value="Add Certified Trainer">Add Certified Trainer</option>
                  <option value="Remove Trainer">Remove Trainer</option>
                  <option value="Update Contact / Representative">Update Contact / Representative</option>
                  <option value="Update Bank Details">Update Bank Details</option>
                  <option value="Upload Renewed Accreditation">Upload Renewed Accreditation</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Justification &amp; Proposed Details *</label>
                <textarea
                  rows={4}
                  required
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  placeholder="State reason for change and attach official approval reference..."
                  className="w-full p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangeModal(false)}
                  className="px-4 py-2 border rounded-xl font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-xl font-bold cursor-pointer"
                >
                  Submit Change for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
