import React from 'react';
import {
  TrendingUp,
  Briefcase,
  Users,
  Building,
  MonitorCheck,
  Plus,
  Trash2,
  FileText,
} from 'lucide-react';
import { TrainingPartnerFormData, EmployerPartner } from './types';

interface StepFormsPart3Props {
  currentStep: number;
  formData: TrainingPartnerFormData;
  onChange: (updates: Partial<TrainingPartnerFormData>) => void;
  onAddEmployer: (emp: EmployerPartner) => void;
  onRemoveEmployer: (id: string) => void;
}

export const StepFormsPart3: React.FC<StepFormsPart3Props> = ({
  currentStep,
  formData,
  onChange,
  onAddEmployer,
  onRemoveEmployer,
}) => {
  // STEP 11 — TRAINING EXPERIENCE
  if (currentStep === 11) {
    const targetGroupOptions = ['Youth (18-29)', 'Women & Self-Help Groups', 'Rural Communities', 'SC / ST Candidates', 'Minority Communities', 'Persons with Disabilities (PwD)', 'Transgender Youth', 'Ex-Servicemen'];

    const toggleGroup = (grp: string) => {
      const exists = formData.targetGroupsTrained.includes(grp);
      const updated = exists
        ? formData.targetGroupsTrained.filter((g) => g !== grp)
        : [...formData.targetGroupsTrained, grp];
      onChange({ targetGroupsTrained: updated });
    };

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 11 &bull; Historical Track Record</span>
          <h2 className="text-2xl font-black text-[#102A43]">Training Experience</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Summary of prior skill training delivery and candidate demographics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Years in Skill Training *</label>
            <input
              type="number"
              min={0}
              max={50}
              required
              value={formData.yearsInSkillTraining}
              onChange={(e) => onChange({ yearsInSkillTraining: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Total Candidates Enrolled (Historical) *</label>
            <input
              type="number"
              min={0}
              required
              value={formData.historicalEnrolled}
              onChange={(e) => onChange({ historicalEnrolled: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Total Candidates Completed *</label>
            <input
              type="number"
              min={0}
              required
              value={formData.historicalCompleted}
              onChange={(e) => onChange({ historicalCompleted: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Total Certified *</label>
            <input
              type="number"
              min={0}
              required
              value={formData.historicalCertified}
              onChange={(e) => onChange({ historicalCertified: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Total Placed in Jobs *</label>
            <input
              type="number"
              min={0}
              required
              value={formData.historicalPlaced}
              onChange={(e) => onChange({ historicalPlaced: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Primary Sectors Delivered</label>
            <input
              type="text"
              value={formData.keySectorsDelivered.join(', ')}
              onChange={(e) => onChange({ keySectorsDelivered: e.target.value.split(',').map((s) => s.trim()) })}
              placeholder="Automotive, Healthcare, IT"
              className="w-full p-3 border rounded-xl"
            />
          </div>
        </div>

        {/* Target Groups Checkboxes */}
        <div className="pt-4 border-t border-slate-200">
          <label className="font-bold text-slate-800 text-xs block mb-2">Target Demographics Supported</label>
          <div className="flex flex-wrap gap-2">
            {targetGroupOptions.map((grp) => {
              const active = formData.targetGroupsTrained.includes(grp);
              return (
                <button
                  key={grp}
                  type="button"
                  onClick={() => toggleGroup(grp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    active
                      ? 'bg-[#0B3C5D] text-white border-[#0B3C5D]'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {grp}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // STEP 12 — PLACEMENT & EMPLOYMENT OUTCOMES
  if (currentStep === 12) {
    const enrolled = formData.historicalEnrolled || 1;
    const completed = formData.historicalCompleted || 0;
    const certified = formData.historicalCertified || 0;
    const placed = formData.historicalPlaced || 0;

    const completionRate = Math.min(100, Math.round((completed / enrolled) * 1000) / 10);
    const certificationRate = Math.min(100, Math.round((certified / Math.max(completed, 1)) * 1000) / 10);
    const placementRate = Math.min(100, Math.round((placed / Math.max(certified, 1)) * 1000) / 10);

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 12 &bull; Outcome Analytics</span>
          <h2 className="text-2xl font-black text-[#102A43]">Placement &amp; Employment Outcomes</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Official performance benchmarks calculated from candidate cohorts.
          </p>
        </div>

        {/* Live Calculated Outcome Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-slate-50 rounded-2xl border">
            <span className="text-2xl font-black text-[#0B3C5D]">{completionRate}%</span>
            <span className="text-xs font-bold text-slate-500 block">Completion Rate</span>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
            <span className="text-2xl font-black text-emerald-700">{certificationRate}%</span>
            <span className="text-xs font-bold text-emerald-800 block">Certification Rate</span>
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
            <span className="text-2xl font-black text-orange-700">{placementRate}%</span>
            <span className="text-xs font-bold text-orange-800 block">Placement Rate</span>
          </div>

          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
            <span className="text-2xl font-black text-blue-700">₹{(formData.avgMonthlySalary ?? 0).toLocaleString()}</span>
            <span className="text-xs font-bold text-blue-800 block">Avg Starting Salary</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Avg Starting Wage (₹/mo)</label>
            <input
              type="number"
              min={0}
              value={formData.avgMonthlySalary ?? 18500}
              onChange={(e) => onChange({ avgMonthlySalary: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">3-Month Retention Rate (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formData.retention3Month ?? 75}
              onChange={(e) => onChange({ retention3Month: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">6-Month Retention Rate (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formData.retention6Month ?? 70}
              onChange={(e) => onChange({ retention6Month: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">12-Month Retention Rate (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={formData.retention12Month ?? 65}
              onChange={(e) => onChange({ retention12Month: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>
        </div>
      </div>
    );
  }

  // STEP 13 — EMPLOYER PARTNERSHIPS
  if (currentStep === 13) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 13 &bull; Industry MoUs</span>
            <h2 className="text-2xl font-black text-[#102A43]">Employer Partnerships</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Industry hiring tie-ups and Memorandum of Understanding (MoU) records.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newEmp: EmployerPartner = {
                id: `emp-${Date.now()}`,
                companyName: 'Mahindra & Mahindra Ltd',
                industrySector: 'Automotive & Farm Equipment',
                partnershipType: 'Placement',
                contactPerson: 'Kavita Shinde',
                designation: 'Head HR - Talent Acquisition',
                mobile: '9822998811',
                email: 'shinde.kavita@mahindra.com',
                annualHiringCapacity: 80,
                mouDocument: 'mou_mahindra_2026.pdf',
              };
              onAddEmployer(newEmp);
            }}
            className="bg-[#0B3C5D] hover:bg-[#102A43] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Employer Partner</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.employerPartners.map((emp) => (
            <div key={emp.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-sm text-[#102A43]">{emp.companyName}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
                  {emp.partnershipType} MoU
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-600 font-medium">
                <div>Sector: <strong>{emp.industrySector}</strong></div>
                <div>Contact: <strong>{emp.contactPerson}</strong></div>
                <div>Annual Intake: <strong>{emp.annualHiringCapacity} Trainees</strong></div>
                <div>Email: <span className="font-mono">{emp.email}</span></div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => onRemoveEmployer(emp.id)}
                  className="text-red-600 hover:text-red-800 font-bold text-[11px]"
                >
                  Remove Partner
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 14 — APPRENTICESHIP & SELF-EMPLOYMENT
  if (currentStep === 14) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 14 &bull; Livelihood Pathways</span>
          <h2 className="text-2xl font-black text-[#102A43]">Apprenticeship &amp; Self-Employment</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            National Apprenticeship Promotion Scheme (NAPS) linkages and entrepreneurship support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <label className="font-bold text-slate-800 block text-sm">
              Registered on NAPS / NATS Apprenticeship Portal? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="napsRegistered"
                  checked={formData.napsRegistered}
                  onChange={() => onChange({ napsRegistered: true })}
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="napsRegistered"
                  checked={!formData.napsRegistered}
                  onChange={() => onChange({ napsRegistered: false })}
                />
                <span>No</span>
              </label>
            </div>

            {formData.napsRegistered && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">NAPS Establishment Code</label>
                  <input
                    type="text"
                    value={formData.napsEstablishmentCode || ''}
                    onChange={(e) => onChange({ napsEstablishmentCode: e.target.value })}
                    placeholder="e.g., E05202700184"
                    className="w-full p-2.5 bg-white border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designated Apprenticeship Seats</label>
                  <input
                    type="number"
                    value={formData.apprenticeshipSeatsCount || 0}
                    onChange={(e) => onChange({ apprenticeshipSeatsCount: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border rounded-xl font-mono font-bold"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border space-y-3">
            <label className="font-bold text-slate-800 block text-sm">
              Self-Employment &amp; Entrepreneurship Support Cell *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="selfEmploymentSupport"
                  checked={formData.selfEmploymentSupport}
                  onChange={() => onChange({ selfEmploymentSupport: true })}
                />
                <span>Yes, cell active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-bold">
                <input
                  type="radio"
                  name="selfEmploymentSupport"
                  checked={!formData.selfEmploymentSupport}
                  onChange={() => onChange({ selfEmploymentSupport: false })}
                />
                <span>No</span>
              </label>
            </div>

            {formData.selfEmploymentSupport && (
              <div className="pt-2">
                <label className="font-bold text-slate-700 block mb-1">MUDRA / Bank Loan Facilitation</label>
                <input
                  type="text"
                  value={formData.microEnterpriseSupport || ''}
                  onChange={(e) => onChange({ microEnterpriseSupport: e.target.value })}
                  placeholder="e.g., Tie-up with Bank of Maharashtra &amp; DIC Pune"
                  className="w-full p-2.5 bg-white border rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // STEP 15 — DATA & TECHNOLOGY CAPABILITY
  if (currentStep === 15) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 15 &bull; MIS Integration</span>
          <h2 className="text-2xl font-black text-[#102A43]">Data &amp; Technology Capability</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Readiness to synchronise attendance, batch marks and candidate credentials with KAUSHAL API.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Existing MIS / ERP Software in Use</label>
            <select
              value={formData.hasExistingMis ? 'Yes' : 'No'}
              onChange={(e) => onChange({ hasExistingMis: e.target.value === 'Yes' })}
              className="w-full p-3 border rounded-xl bg-white font-medium"
            >
              <option value="Yes">Yes, proprietary or commercial ERP</option>
              <option value="No">No, will use KAUSHAL Portal exclusively</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Attendance Capture Method *</label>
            <select
              value={formData.attendanceSystemType}
              onChange={(e) => onChange({ attendanceSystemType: e.target.value as any })}
              className="w-full p-3 border rounded-xl bg-white font-bold"
            >
              <option value="Biometric">Biometric (Fingerprint Terminal)</option>
              <option value="Facial Recognition">Facial Recognition (AI Camera / Tablet)</option>
              <option value="Manual">Manual Register (Subject to Phase-out)</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Dedicated Computer Lab Capacity (Workstations) *</label>
            <input
              type="number"
              min={0}
              required
              value={formData.computerLabCapacity}
              onChange={(e) => onChange({ computerLabCapacity: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Student Portal / Online LMS Availability</label>
            <select
              value={formData.studentPortalAvailable ? 'Yes' : 'No'}
              onChange={(e) => onChange({ studentPortalAvailable: e.target.value === 'Yes' })}
              className="w-full p-3 border rounded-xl bg-white"
            >
              <option value="Yes">Yes, Moodle / Custom LMS deployed</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
