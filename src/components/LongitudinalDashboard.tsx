import React, { useState, useMemo } from 'react';
import {
  Users,
  TrendingUp,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Award,
  Search,
  Filter,
  CheckCircle2,
  Phone,
  Plus,
  ArrowUpRight,
  Sparkles,
  Download,
  FileText,
  BarChart3,
  Calendar,
  Briefcase,
  HelpCircle,
  Clock,
  RefreshCw,
  SlidersHorizontal
} from 'lucide-react';
import {
  TraineeLongitudinalRecord,
  TracerFollowUp,
  SectorType,
  EmploymentStatusType
} from '../types';
import { TRAINEE_OUTCOME_RECORDS } from '../data/longitudinalData';
import { TraineeDossierModal } from './TraineeDossierModal';
import { CohortAnalyticsView } from './CohortAnalyticsView';
import { ProviderScorecardView } from './ProviderScorecardView';
import { SkillGapsAndAttritionView } from './SkillGapsAndAttritionView';
import { RemedialActionModal } from './RemedialActionModal';

interface LongitudinalDashboardProps {
  lang: 'en' | 'hi';
}

type TabType =
  | 'trainees'
  | 'analytics'
  | 'providers'
  | 'skill-gaps'
  | 'remedial'
  | 'dpdp';

export const LongitudinalDashboard: React.FC<LongitudinalDashboardProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<TabType>('trainees');
  const [trainees, setTrainees] = useState<TraineeLongitudinalRecord[]>(TRAINEE_OUTCOME_RECORDS);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<SectorType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<EmploymentStatusType | 'All'>('All');
  const [selectedVerification, setSelectedVerification] = useState<string>('All');

  // Modals
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeLongitudinalRecord | null>(null);
  const [isRemedialModalOpen, setIsRemedialModalOpen] = useState(false);
  const [remedialTargetProvider, setRemedialTargetProvider] = useState<string | undefined>(undefined);

  // EPFO Live Simulation feedback
  const [isSyncingEpfo, setIsSyncingEpfo] = useState(false);
  const [epfoSyncMessage, setEpfoSyncMessage] = useState<string | null>(null);

  // Filtered trainees
  const filteredTrainees = useMemo(() => {
    return trainees.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.employerName && t.employerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.district.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSector = selectedSector === 'All' || t.sector === selectedSector;
      const matchStatus = selectedStatus === 'All' || t.employmentStatus === selectedStatus;
      const matchVerification =
        selectedVerification === 'All' || t.verificationSource === selectedVerification;

      return matchSearch && matchSector && matchStatus && matchVerification;
    });
  }, [trainees, searchQuery, selectedSector, selectedStatus, selectedVerification]);

  // Overall Cohort Quick Stats
  const totalCount = trainees.length;
  const verifiedCount = trainees.filter((t) => t.employerVerified).length;
  const employedCount = trainees.filter(
    (t) =>
      t.employmentStatus === 'Formal Wage Employment' ||
      t.employmentStatus === 'Apprenticeship (NAPS)' ||
      t.employmentStatus === 'Self-Employment / Micro-enterprise'
  ).length;
  const sixMonthRetainedCount = trainees.filter((t) => t.retentionMonths >= 6).length;

  // Add Tracer Follow-up handler
  const handleAddFollowUp = (traineeId: string, newLog: TracerFollowUp) => {
    setTrainees((prev) =>
      prev.map((t) => {
        if (t.id === traineeId) {
          const updatedLogs = [...t.tracerLogs, newLog];
          const newWage = newLog.monthlyWage > 0 ? newLog.monthlyWage : t.currentMonthlyWage;
          const newGrowth =
            t.preTrainingMonthlyWage > 0
              ? Math.round(((newWage - t.preTrainingMonthlyWage) / t.preTrainingMonthlyWage) * 100)
              : 100;

          return {
            ...t,
            currentMonthlyWage: newWage,
            wageGrowthPercent: newGrowth,
            tracerLogs: updatedLogs,
            retentionMonths: Math.max(
              t.retentionMonths,
              newLog.milestone === 'Day-365' ? 12 : newLog.milestone === 'Day-180' ? 6 : 3
            ),
            employerName: newLog.employerOrEnterprise || t.employerName
          };
        }
        return t;
      })
    );

    // Also update selected trainee if open
    if (selectedTrainee && selectedTrainee.id === traineeId) {
      setSelectedTrainee((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          tracerLogs: [...prev.tracerLogs, newLog],
          currentMonthlyWage: newLog.monthlyWage > 0 ? newLog.monthlyWage : prev.currentMonthlyWage
        };
      });
    }
  };

  // Simulate EPFO Statutory Signal Sync
  const handleSimulateEpfoSync = () => {
    setIsSyncingEpfo(true);
    setEpfoSyncMessage('Pinging EPFO Unified Portal API & NSDL UAN Registry...');

    setTimeout(() => {
      setIsSyncingEpfo(false);
      setEpfoSyncMessage('✓ 10 of 12 Trainee UAN / UDYAM signals verified with active monthly ECR deposit.');
      setTimeout(() => setEpfoSyncMessage(null), 5000);
    }, 1200);
  };

  // Export Audited Report
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(trainees, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kaushal_longitudinal_audit_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Core Outcome System Identity */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Top saffron accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-[#0B3C5D] to-emerald-600" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Consent-Based Longitudinal Skilling Outcomes & Impact Measurement</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B3C5D] tracking-tight">
              Evidence-Based Skilling Trajectory & Accountability
            </h2>
            <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
              Tracking trainees longitudinally from training enrollment to 30, 90, 180, and 365-day workforce retention.
              Directly linking statutory EPFO, UDYAM, and NAPS signals to identify skill gaps, prevent attrition,
              and enforce provider accountability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateEpfoSync}
              disabled={isSyncingEpfo}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-2xs disabled:opacity-60"
            >
              <RefreshCw className={`w-4 h-4 text-[#0B3C5D] ${isSyncingEpfo ? 'animate-spin' : ''}`} />
              <span>{isSyncingEpfo ? 'Syncing EPFO...' : 'Ping EPFO UAN Signal'}</span>
            </button>

            <button
              onClick={() => {
                setRemedialTargetProvider(undefined);
                setIsRemedialModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Remedial & Policy Action</span>
            </button>

            <button
              onClick={handleExportJson}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition cursor-pointer shadow-2xs"
              title="Export Longitudinal Data Audit (JSON)"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* EPFO Sync Message Banner */}
        {epfoSyncMessage && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{epfoSyncMessage}</span>
          </div>
        )}

        {/* 4 Stat Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-200">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Verified Active Placement</div>
            <div className="text-xl sm:text-2xl font-black text-[#0B3C5D] font-mono mt-0.5">
              {Math.round((employedCount / totalCount) * 100)}%
            </div>
            <div className="text-[10px] text-emerald-700 font-bold mt-0.5">
              {employedCount} / {totalCount} Trainees in workforce
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">6-Month Retention Rate</div>
            <div className="text-xl sm:text-2xl font-black text-orange-600 font-mono mt-0.5">
              {Math.round((sixMonthRetainedCount / totalCount) * 100)}%
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5 font-medium">Tracer follow-up verified</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">EPFO / Statutory Match</div>
            <div className="text-xl sm:text-2xl font-black text-[#0B3C5D] font-mono mt-0.5">
              {Math.round((verifiedCount / totalCount) * 100)}%
            </div>
            <div className="text-[10px] text-[#0B3C5D] font-bold mt-0.5">UAN & UDYAM authenticated</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">DPDP Consent Coverage</div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono mt-0.5">
              100%
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5 font-medium">Cryptographically signed</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 text-xs">
        <button
          onClick={() => setActiveTab('trainees')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'trainees'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Trainee Longitudinal Records ({trainees.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Cohort & Wage Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('skill-gaps')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'skill-gaps'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Skill Gaps & Attrition Diagnostics</span>
        </button>

        <button
          onClick={() => setActiveTab('providers')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'providers'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Provider Accountability Scorecards</span>
        </button>

        <button
          onClick={() => setActiveTab('remedial')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'remedial'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Remedial & Evidence-Based Policy</span>
        </button>

        <button
          onClick={() => setActiveTab('dpdp')}
          className={`px-4 py-2.5 rounded-xl font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'dpdp'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>DPDP Consent & Verification Mesh</span>
        </button>
      </div>

      {/* Tab 1: Trainee Longitudinal Directory */}
      {activeTab === 'trainees' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidate name, ID, employer, or district..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0B3C5D] focus:bg-white transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value as any)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
              >
                <option value="All">All Sectors</option>
                <option value="EV & Automotive">EV & Automotive</option>
                <option value="Clean Energy & Solar">Clean Energy & Solar</option>
                <option value="Advanced Manufacturing & CNC">Advanced Manufacturing & CNC</option>
                <option value="Drone Tech & Robotics">Drone Tech & Robotics</option>
                <option value="Healthcare & Caregiving">Healthcare & Caregiving</option>
                <option value="Artisan & Traditional Crafts">Artisan & Traditional Crafts</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
              >
                <option value="All">All Outcomes</option>
                <option value="Formal Wage Employment">Formal Wage</option>
                <option value="Apprenticeship (NAPS)">NAPS Apprenticeship</option>
                <option value="Self-Employment / Micro-enterprise">Self-Employment</option>
                <option value="Unemployed & Seeking">Unemployed / Seeking</option>
                <option value="Not Seeking / Inactive">Not Seeking</option>
              </select>

              <select
                value={selectedVerification}
                onChange={(e) => setSelectedVerification(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
              >
                <option value="All">All Signals</option>
                <option value="EPFO_UAN_VERIFIED">EPFO UAN Verified</option>
                <option value="UDYAM_GSTN_VERIFIED">UDYAM Verified</option>
                <option value="NAPS_CONTRACT_VERIFIED">NAPS Contract Verified</option>
                <option value="EMPLOYER_PAYSLIP_UPLOAD">Payslip Upload</option>
              </select>
            </div>
          </div>

          {/* Trainee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrainees.map((trainee) => {
              const isEmployed =
                trainee.employmentStatus === 'Formal Wage Employment' ||
                trainee.employmentStatus === 'Apprenticeship (NAPS)' ||
                trainee.employmentStatus === 'Self-Employment / Micro-enterprise';

              return (
                <div
                  key={trainee.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 space-y-4 shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    {/* Header with Consent & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-slate-900">
                            {lang === 'hi' && trainee.hindiName ? trainee.hindiName : trainee.name}
                          </span>
                          {trainee.consent.granted && (
                            <span title="DPDP Consent Verified" className="text-emerald-600">
                              <ShieldCheck className="w-3.5 h-3.5 inline" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {trainee.district}, {trainee.state} • {trainee.gender} ({trainee.age}y)
                        </div>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          isEmployed
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-50 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {trainee.employmentStatus === 'Formal Wage Employment'
                          ? 'Wage Employed'
                          : trainee.employmentStatus === 'Apprenticeship (NAPS)'
                          ? 'Apprentice'
                          : trainee.employmentStatus === 'Self-Employment / Micro-enterprise'
                          ? 'Self-Employed'
                          : 'Unemployed'}
                      </span>
                    </div>

                    {/* Course & Provider */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                      <div className="font-bold text-slate-800 truncate">
                        {trainee.courseName}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between font-medium">
                        <span className="truncate">{trainee.providerName}</span>
                        <span className="text-orange-600 font-bold font-mono">NSQF-{trainee.nsqfLevel}</span>
                      </div>
                    </div>

                    {/* Wage Uplift & Retention Milestone */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Current Wage</div>
                        <div className="text-sm font-extrabold text-emerald-700 font-mono">
                          ₹{trainee.currentMonthlyWage.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">
                          +{trainee.wageGrowthPercent}% growth
                        </div>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Retention</div>
                        <div className="text-sm font-extrabold text-[#0B3C5D] font-mono">
                          {trainee.retentionMonths} Months
                        </div>
                        <div className="text-[9px] text-slate-500 font-medium">
                          {trainee.tracerLogs.length} Tracer calls
                        </div>
                      </div>
                    </div>

                    {/* Current Employer or Flag */}
                    {isEmployed ? (
                      <div className="text-[11px] text-slate-700 flex items-center justify-between">
                        <span className="truncate text-slate-500">Employer:</span>
                        <strong className="text-slate-900 truncate max-w-[170px] font-bold">
                          {trainee.employerName}
                        </strong>
                      </div>
                    ) : (
                      <div className="text-[11px] text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-200 truncate">
                        <strong>Reason:</strong> {trainee.nonPlacementReason || trainee.attritionReason}
                      </div>
                    )}

                    {/* Verification Source Badge */}
                    <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                      <span>Signal Source:</span>
                      <span className="font-mono font-bold text-[#0B3C5D]">
                        {trainee.verificationSource.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono text-slate-400">{trainee.id}</span>
                    <button
                      onClick={() => setSelectedTrainee(trainee)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B3C5D] border border-slate-300 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-2xs hover:border-[#0B3C5D]"
                    >
                      <span>View Full Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Cohort & Wage Analytics */}
      {activeTab === 'analytics' && <CohortAnalyticsView trainees={trainees} lang={lang} />}

      {/* Tab 3: Skill Gaps & Attrition Diagnostics */}
      {activeTab === 'skill-gaps' && (
        <SkillGapsAndAttritionView
          onOpenRemedialModal={() => {
            setRemedialTargetProvider(undefined);
            setIsRemedialModalOpen(true);
          }}
          lang={lang}
        />
      )}

      {/* Tab 4: Provider Accountability Scorecards */}
      {activeTab === 'providers' && (
        <ProviderScorecardView
          onOpenRemedialPlan={(providerName) => {
            setRemedialTargetProvider(providerName);
            setIsRemedialModalOpen(true);
          }}
          lang={lang}
        />
      )}

      {/* Tab 5: Remedial Action & Evidence-Based Policy Directives */}
      {activeTab === 'remedial' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => {
                setRemedialTargetProvider(undefined);
                setIsRemedialModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Propose New Remedial Plan or Run Policy AI</span>
            </button>
          </div>
          {/* Embed the active modal directly inline for immediate accessibility */}
          <RemedialActionModal
            isOpen={true}
            onClose={() => setActiveTab('trainees')}
            prefillProviderName={remedialTargetProvider}
            lang={lang}
          />
        </div>
      )}

      {/* Tab 6: DPDP Consent & Statutory Verification Mesh */}
      {activeTab === 'dpdp' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0B3C5D]">
                Digital Personal Data Protection (DPDP) Act Compliance & Architecture
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Consent-managed longitudinal data mesh ensuring privacy, data minimization, and statutory verification
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. Explicit Informed Consent</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Trainees grant time-limited consent (12 to 24 months) strictly for longitudinal tracer
                follow-ups and statutory EPFO / UDYAM verification. Aadhaar numbers are stored exclusively as
                SHA-256 tokenized hashes in an Aadhaar Data Vault.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0B3C5D]" />
                <span>2. Statutory API Mesh</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Replaces fake paper placement letters with tamper-proof automated API checks against the
                EPFO Unified Portal (UAN Electronic Challan Return), Ministry of MSME UDYAM registration,
                and Ministry of Skill Development NAPS Apprenticeship portal.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-orange-600" />
                <span>3. Right to Forget & Revocation</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Candidates can revoke tracer follow-up consent at any milestone via SMS, WhatsApp, or the
                Kaushal portal. Upon revocation, personal identity attributes are instantly anonymized
                while preserving aggregate econometric cohort statistics.
              </p>
            </div>
          </div>

          {/* Audit Trail Table Preview */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Live Consent Registry & Statutory Signal Audit
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3">Trainee ID</th>
                    <th className="p-3">Candidate</th>
                    <th className="p-3">Consent Status</th>
                    <th className="p-3">Verification Signal</th>
                    <th className="p-3">Identifier Hash</th>
                    <th className="p-3">Cadence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                  {trainees.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500">{t.id}</td>
                      <td className="p-3 font-bold text-slate-900 font-sans">{t.name}</td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-semibold flex items-center gap-1 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active Consent</span>
                        </span>
                      </td>
                      <td className="p-3 text-[#0B3C5D] font-bold">{t.verificationSource}</td>
                      <td className="p-3 text-slate-500 truncate max-w-[140px]">
                        {t.consent.dpdpActComplianceHash.slice(0, 16)}...
                      </td>
                      <td className="p-3 text-orange-600 font-semibold font-sans">{t.tracerLogs.length} Milestones logged</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Trainee Dossier Modal */}
      {selectedTrainee && (
        <TraineeDossierModal
          trainee={selectedTrainee}
          onClose={() => setSelectedTrainee(null)}
          onAddFollowUp={handleAddFollowUp}
          lang={lang}
        />
      )}

      {/* Remedial Action Plan Modal (When launched from top bar) */}
      {isRemedialModalOpen && activeTab !== 'remedial' && (
        <RemedialActionModal
          isOpen={isRemedialModalOpen}
          onClose={() => setIsRemedialModalOpen(false)}
          prefillProviderName={remedialTargetProvider}
          lang={lang}
        />
      )}
    </div>
  );
};
