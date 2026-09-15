import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building2,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  FileText,
  UserCheck,
  Sparkles,
  Briefcase,
  Plus
} from 'lucide-react';
import { TraineeLongitudinalRecord, TracerFollowUp } from '../types';

interface TraineeDossierModalProps {
  trainee: TraineeLongitudinalRecord | null;
  onClose: () => void;
  onAddFollowUp: (traineeId: string, followUp: TracerFollowUp) => void;
  lang: 'en' | 'hi';
}

export const TraineeDossierModal: React.FC<TraineeDossierModalProps> = ({
  trainee,
  onClose,
  onAddFollowUp,
  lang
}) => {
  const [showAddLog, setShowAddLog] = useState(false);
  const [newMilestone, setNewMilestone] = useState<'Day-30' | 'Day-90' | 'Day-180' | 'Day-365'>('Day-180');
  const [newChannel, setNewChannel] = useState<'Automated WhatsApp Bot' | 'Automated IVR' | 'Assisted Counselor Call' | 'In-Person Field Tracer'>('Assisted Counselor Call');
  const [isEmployed, setIsEmployed] = useState(true);
  const [monthlyWage, setMonthlyWage] = useState(25000);
  const [employerName, setEmployerName] = useState('');
  const [skillRelevance, setSkillRelevance] = useState(5);
  const [jobSatisfaction, setJobSatisfaction] = useState(5);
  const [counselorName, setCounselorName] = useState('District Skill Officer');
  const [notes, setNotes] = useState('');

  if (!trainee) return null;

  const handleSaveFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    const followUp: TracerFollowUp = {
      id: `TRC-${Date.now()}`,
      milestone: newMilestone,
      conductedDate: new Date().toISOString().split('T')[0],
      channel: newChannel,
      status: 'Completed',
      isEmployed,
      monthlyWage: Number(monthlyWage),
      employerOrEnterprise: employerName || trainee.employerName || 'Self-Reported Employer',
      skillRelevanceScore: Number(skillRelevance),
      jobSatisfactionScore: Number(jobSatisfaction),
      verifiedByCounselor: counselorName,
      notes: notes || 'Tracer record logged via Assisted Follow-up Desk.'
    };

    onAddFollowUp(trainee.id, followUp);
    setShowAddLog(false);
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-slate-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-lg">
              {trainee.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {lang === 'hi' && trainee.hindiName ? trainee.hindiName : trainee.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {trainee.id}
                </span>
                {trainee.consent.granted && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>DPDP Consent Verified</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>{trainee.district}, {trainee.state}</span>
                <span>•</span>
                <span>{trainee.gender} ({trainee.age} yrs)</span>
                <span>•</span>
                <span>Category: {trainee.socialCategory}</span>
                {trainee.isPwD && (
                  <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    PwD
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowAddLog(!showAddLog)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Record Tracer Follow-up</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Follow-Up Form Drawer */}
        {showAddLog && (
          <form
            onSubmit={handleSaveFollowUp}
            className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-amber-500/40 space-y-4 animate-in fade-in slide-in-from-top-2"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Log Longitudinal Tracer Follow-up (Assisted / Automated)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowAddLog(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tracer Milestone</label>
                <select
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="Day-30">Day-30 (1 Month)</option>
                  <option value="Day-90">Day-90 (3 Months)</option>
                  <option value="Day-180">Day-180 (6 Months)</option>
                  <option value="Day-365">Day-365 (12 Months / 1 Year)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Tracer Channel</label>
                <select
                  value={newChannel}
                  onChange={(e) => setNewChannel(e.target.value as any)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="Assisted Counselor Call">Assisted Counselor Call</option>
                  <option value="Automated WhatsApp Bot">Automated WhatsApp Bot</option>
                  <option value="Automated IVR">Automated IVR</option>
                  <option value="In-Person Field Tracer">In-Person Field Tracer</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Employment Status</label>
                <select
                  value={isEmployed ? 'yes' : 'no'}
                  onChange={(e) => setIsEmployed(e.target.value === 'yes')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                >
                  <option value="yes">Currently Employed / Self-Employed</option>
                  <option value="no">Unemployed / Dropped Out</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Verified Monthly Wage (₹)</label>
                <input
                  type="number"
                  value={monthlyWage}
                  onChange={(e) => setMonthlyWage(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  placeholder="e.g. 24000"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Employer / Enterprise Name</label>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                  placeholder={trainee.employerName || 'Employer company name'}
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">Skill Relevance (1 - 5 Stars)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={skillRelevance}
                  onChange={(e) => setSkillRelevance(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-300 font-semibold block mb-1">Counselor / Field Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Confirmed salary payslip, shift timing, job duties match training..."
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm"
              >
                Submit Verified Tracer Record
              </button>
            </div>
          </form>
        )}

        {/* 3 High-Level Metric Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Baseline vs Current Wage */}
          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-1">
            <div className="text-[11px] text-slate-400 font-medium">Pre-Training vs Current Wage</div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-white">
                ₹{trainee.currentMonthlyWage.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{trainee.preTrainingMonthlyWage.toLocaleString()}
              </span>
              {trainee.wageGrowthPercent > 0 && (
                <span className="text-xs font-bold text-emerald-400">
                  +{trainee.wageGrowthPercent}%
                </span>
              )}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>Retention: {trainee.retentionMonths} Months in workforce</span>
            </div>
          </div>

          {/* Verification Source Signal */}
          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-1">
            <div className="text-[11px] text-slate-400 font-medium">Employment Signal Verification</div>
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2.5 py-1 rounded-lg font-bold ${
                  trainee.employerVerified
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                {trainee.verificationSource.replace(/_/g, ' ')}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              {trainee.uanNumber && <span>UAN: {trainee.uanNumber}</span>}
              {trainee.udyamNumber && <span>UDYAM: {trainee.udyamNumber}</span>}
              {trainee.napsContractId && <span>NAPS: {trainee.napsContractId}</span>}
            </div>
          </div>

          {/* Training Provider & Batch */}
          <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700/80 space-y-1">
            <div className="text-[11px] text-slate-400 font-medium">Training Center & NSQF Level</div>
            <div className="text-xs font-bold text-slate-100 truncate">
              {trainee.providerName}
            </div>
            <div className="text-[10px] text-amber-400 font-semibold flex items-center gap-2">
              <span>NSQF Level {trainee.nsqfLevel}</span>
              <span>•</span>
              <span>Score: {trainee.assessmentScore}%</span>
              <span>•</span>
              <span>Batch: {trainee.batchId}</span>
            </div>
          </div>
        </div>

        {/* Consent & DPDP Compliance Details */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">Digital Personal Data Protection (DPDP) Consent Mandate</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Granted: {trainee.consent.consentDate}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-[11px]">
            {trainee.consent.scopes.map((scope, sIdx) => (
              <span
                key={sIdx}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{scope.replace(/_/g, ' ').toUpperCase()}</span>
              </span>
            ))}
          </div>

          <div className="text-[10px] font-mono text-slate-500 truncate pt-1">
            Verification: {trainee.consent.verificationMethod} • Audit Hash: {trainee.consent.dpdpActComplianceHash}
          </div>
        </div>

        {/* Current Placement / Non-Placement Situation */}
        {trainee.employmentStatus === 'Unemployed & Seeking' ||
        trainee.employmentStatus === 'Not Seeking / Inactive' ? (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-rose-300">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Root Cause Diagnosis: Non-Placement / Attrition Flagged</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-rose-200">
              <div>
                <span className="text-slate-400 block text-[11px]">Primary Reason:</span>
                <span className="font-semibold">{trainee.nonPlacementReason || trainee.attritionReason}</span>
              </div>
              {trainee.skillGapReportedByEmployer && (
                <div>
                  <span className="text-slate-400 block text-[11px]">Reported Skill Gap by Employer:</span>
                  <span className="font-semibold">{trainee.skillGapReportedByEmployer}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Active Verified Employment Record</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-300">
              <div>
                <span className="text-slate-400 text-[11px] block">Employer / Enterprise:</span>
                <span className="font-bold text-white">{trainee.employerName}</span>
              </div>
              {trainee.employerCinOrGst && (
                <div>
                  <span className="text-slate-400 text-[11px] block">CIN / GSTIN:</span>
                  <span className="font-mono text-[11px] text-slate-300">{trainee.employerCinOrGst}</span>
                </div>
              )}
              {trainee.selfEmploymentType && (
                <div>
                  <span className="text-slate-400 text-[11px] block">Enterprise Type:</span>
                  <span className="text-amber-400 font-semibold">{trainee.selfEmploymentType}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Longitudinal Tracer Study Timeline */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Longitudinal Tracer Follow-up Logs ({trainee.tracerLogs.length} Milestones)</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              Cadence: Day 30, Day 90, Day 180, Day 365
            </span>
          </h4>

          <div className="space-y-2.5">
            {trainee.tracerLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[11px]">
                      {log.milestone}
                    </span>
                    <span className="text-slate-300 font-semibold">{log.channel}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-mono text-[11px]">{log.conductedDate}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-400">
                      ₹{log.monthlyWage.toLocaleString()}/mo
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.isEmployed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {log.isEmployed ? 'Retained' : 'Separated / Out'}
                    </span>
                  </div>
                </div>

                <div className="text-slate-300 leading-relaxed text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  {log.notes}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 pt-1">
                  <div className="flex items-center gap-3">
                    <span>
                      Skill Relevance: <strong className="text-amber-400">{log.skillRelevanceScore} / 5</strong>
                    </span>
                    <span>
                      Job Satisfaction: <strong className="text-amber-400">{log.jobSatisfactionScore} / 5</strong>
                    </span>
                  </div>
                  {log.verifiedByCounselor && (
                    <span className="text-slate-400">Verified by: {log.verifiedByCounselor}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Trainee Record Hash: SHA256-TRN-{trainee.id.replace(/-/g, '')}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
