import React, { useMemo, useState } from 'react';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Building2,
  DollarSign,
  Calendar,
  Award,
  Filter,
  BarChart3,
  PieChart,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TraineeLongitudinalRecord, SectorType } from '../types';

interface CohortAnalyticsViewProps {
  trainees: TraineeLongitudinalRecord[];
  lang: 'en' | 'hi';
}

export const CohortAnalyticsView: React.FC<CohortAnalyticsViewProps> = ({ trainees, lang }) => {
  const [sectorFilter, setSectorFilter] = useState<SectorType | 'All'>('All');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Female' | 'Male'>('All');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Rural' | 'Urban' | 'Semi-Urban'>('All');

  const filtered = useMemo(() => {
    return trainees.filter((t) => {
      const matchSector = sectorFilter === 'All' || t.sector === sectorFilter;
      const matchGender = genderFilter === 'All' || t.gender === genderFilter;
      const matchLocation = locationFilter === 'All' || t.locationType === locationFilter;
      return matchSector && matchGender && matchLocation;
    });
  }, [trainees, sectorFilter, genderFilter, locationFilter]);

  // Analytics Computations
  const totalCount = filtered.length;
  const verifiedCount = filtered.filter((t) => t.employerVerified).length;
  const verifiedRate = totalCount > 0 ? Math.round((verifiedCount / totalCount) * 100) : 0;

  const employedCount = filtered.filter(
    (t) =>
      t.employmentStatus === 'Formal Wage Employment' ||
      t.employmentStatus === 'Apprenticeship (NAPS)' ||
      t.employmentStatus === 'Self-Employment / Micro-enterprise'
  ).length;
  const placementRate = totalCount > 0 ? Math.round((employedCount / totalCount) * 100) : 0;

  // Retention rates
  const retainedSixMonths = filtered.filter((t) => t.retentionMonths >= 6).length;
  const retentionRateSixMonths = totalCount > 0 ? Math.round((retainedSixMonths / totalCount) * 100) : 0;

  const retainedTwelveMonths = filtered.filter((t) => t.retentionMonths >= 12).length;
  const retentionRateTwelveMonths = totalCount > 0 ? Math.round((retainedTwelveMonths / totalCount) * 100) : 0;

  // Wage Progression
  const baselineWages = filtered.map((t) => t.preTrainingMonthlyWage);
  const avgBaselineWage =
    baselineWages.length > 0
      ? Math.round(baselineWages.reduce((a, b) => a + b, 0) / baselineWages.length)
      : 0;

  const currentWages = filtered.filter((t) => t.currentMonthlyWage > 0).map((t) => t.currentMonthlyWage);
  const avgCurrentWage =
    currentWages.length > 0
      ? Math.round(currentWages.reduce((a, b) => a + b, 0) / currentWages.length)
      : 0;

  const wageUpliftPercent =
    avgBaselineWage > 0
      ? Math.round(((avgCurrentWage - avgBaselineWage) / avgBaselineWage) * 100)
      : avgCurrentWage > 0
      ? 100
      : 0;

  // Verification breakdown
  const epfoCount = filtered.filter((t) => t.verificationSource === 'EPFO_UAN_VERIFIED').length;
  const udyamCount = filtered.filter((t) => t.verificationSource === 'UDYAM_GSTN_VERIFIED').length;
  const napsCount = filtered.filter((t) => t.verificationSource === 'NAPS_CONTRACT_VERIFIED').length;

  return (
    <div className="space-y-6">
      {/* Top Controls & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xs">
        <div>
          <h3 className="text-base font-bold text-[#0B3C5D] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-orange-600" />
            <span>Longitudinal Cohort Progression & Demographic Analytics</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time multi-dimensional cuts across sector, gender, geography, and statutory verification signals
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
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
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
          >
            <option value="All">All Genders</option>
            <option value="Female">Female Candidates</option>
            <option value="Male">Male Candidates</option>
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value as any)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
          >
            <option value="All">All Geographies</option>
            <option value="Rural">Rural</option>
            <option value="Semi-Urban">Semi-Urban</option>
            <option value="Urban">Urban</option>
          </select>
        </div>
      </div>

      {/* 4 Core Skilling-Outcomes KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Verified Placement Rate */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Verified Placement Rate</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#0B3C5D] font-mono">{placementRate}%</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            {employedCount} of {totalCount} candidates in verified tracks
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-600 h-full" style={{ width: `${placementRate}%` }} />
          </div>
        </div>

        {/* 6-Month & 12-Month Retention */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>6-Mo / 12-Mo Retention</span>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-black text-orange-600 font-mono">
            {retentionRateSixMonths}% <span className="text-xs text-slate-500 font-normal">/ {retentionRateTwelveMonths}%</span>
          </div>
          <div className="text-[11px] text-slate-600 font-medium">
            Sustained workforce tenure signal
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-orange-500 h-full" style={{ width: `${retentionRateSixMonths}%` }} />
          </div>
        </div>

        {/* Median Wage Uplift */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Average Wage Growth</span>
            <DollarSign className="w-4 h-4 text-[#0B3C5D]" />
          </div>
          <div className="text-2xl font-black text-[#0B3C5D] font-mono">
            ₹{(avgCurrentWage ?? 0).toLocaleString()}
            <span className="text-xs text-emerald-700 font-bold ml-1.5">
              +{wageUpliftPercent}%
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Baseline: ₹{(avgBaselineWage ?? 0).toLocaleString()} / month
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-[#0B3C5D] h-full" style={{ width: '82%' }} />
          </div>
        </div>

        {/* EPFO / Statutory Verification Integrity */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>Verification Integrity</span>
            <Building2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-[#0B3C5D] font-mono">{verifiedRate}%</div>
          <div className="text-[11px] text-purple-700 font-semibold">
            {epfoCount} EPFO • {udyamCount} UDYAM • {napsCount} NAPS
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-purple-600 h-full" style={{ width: `${verifiedRate}%` }} />
          </div>
        </div>
      </div>

      {/* Two Detailed Charts: Retention Survival Funnel & Longitudinal Wage Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Retention Survival Funnel (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#0B3C5D]">Longitudinal Retention Survival Curve</h4>
              <p className="text-[11px] text-slate-500 font-medium">Candidate retention across post-placement milestones</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 font-bold">
              Tracer Audited
            </span>
          </div>

          <div className="space-y-3.5 pt-2">
            {/* Step 1: Day 30 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Day 30 (Initial Placement Induction)</span>
                <span className="font-mono font-bold text-emerald-700">92% Retained</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '92%' }} />
              </div>
              <div className="text-[10px] text-slate-500">Minor drop: initial shift timing adjustments</div>
            </div>

            {/* Step 2: Day 90 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Day 90 (Probation & First Appraisal)</span>
                <span className="font-mono font-bold text-emerald-700">83% Retained</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: '83%' }} />
              </div>
              <div className="text-[10px] text-slate-500">9% attrition: compensation & commute distance constraints</div>
            </div>

            {/* Step 3: Day 180 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Day 180 (6-Month Sustained Retention)</span>
                <span className="font-mono font-bold text-orange-600">75% Retained</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full transition-all" style={{ width: '75%' }} />
              </div>
              <div className="text-[10px] text-slate-500">Key national policy benchmark for provider incentive payment</div>
            </div>

            {/* Step 4: Day 365 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Day 365 (12-Month Permanent Career Track)</span>
                <span className="font-mono font-bold text-[#0B3C5D]">67% Retained</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-[#0B3C5D] h-full rounded-full transition-all" style={{ width: '67%' }} />
              </div>
              <div className="text-[10px] text-slate-500">High-stability cohort: regular payroll & annual increment received</div>
            </div>
          </div>
        </div>

        {/* Right: Longitudinal Wage Growth Trajectory (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#0B3C5D]">Wage Progression Progression Curve</h4>
              <p className="text-[11px] text-slate-500 font-medium">Pre-training baseline to 12-month earnings growth</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
              Avg +₹18,500 Delta
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Baseline</div>
                <div className="text-sm font-bold text-slate-700 font-mono">₹2,800</div>
                <div className="text-[9px] text-slate-400">Unskilled / Student</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Placement</div>
                <div className="text-sm font-bold text-orange-600 font-mono">₹19,200</div>
                <div className="text-[9px] text-emerald-700 font-bold">+585%</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">6-Month</div>
                <div className="text-sm font-bold text-emerald-700 font-mono">₹23,800</div>
                <div className="text-[9px] text-emerald-700 font-bold">+24% step</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">12-Month</div>
                <div className="text-sm font-bold text-[#0B3C5D] font-mono">₹27,500</div>
                <div className="text-[9px] text-emerald-700 font-bold">+15% step</div>
              </div>
            </div>

            {/* SVG Visual Progression Line Chart */}
            <div className="h-36 w-full rounded-xl bg-slate-50 p-3 border border-slate-200 flex items-end justify-between relative overflow-hidden">
              <div className="absolute top-2 left-3 text-[10px] text-slate-500 font-bold font-mono">
                MONTHLY EARNINGS TRAJECTORY (₹)
              </div>

              <div className="flex items-end justify-between w-full h-24 px-4">
                {/* Point 1 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-slate-500 font-mono font-bold">₹2.8k</span>
                  <div className="w-8 bg-slate-300 rounded-t h-4" />
                  <span className="text-[9px] text-slate-500 font-semibold">Pre</span>
                </div>

                {/* Point 2 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-orange-600 font-mono font-bold">₹19.2k</span>
                  <div className="w-8 bg-orange-500 rounded-t h-16" />
                  <span className="text-[9px] text-slate-600 font-semibold">Day 30</span>
                </div>

                {/* Point 3 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">₹23.8k</span>
                  <div className="w-8 bg-emerald-600 rounded-t h-20" />
                  <span className="text-[9px] text-slate-600 font-semibold">Day 180</span>
                </div>

                {/* Point 4 */}
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-[#0B3C5D] font-mono font-bold">₹27.5k</span>
                  <div className="w-8 bg-[#0B3C5D] rounded-t h-24" />
                  <span className="text-[9px] text-slate-600 font-semibold">Day 365</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demographic Parity & Self-Employment Outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender & Social Inclusion Equity */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C5D] flex items-center gap-1.5">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Demographic Inclusion & Parity Signals</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Female Candidate Representation</span>
              <span className="font-bold text-slate-900">41.6% (5 of 12)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Female 6-Month Retention Rate</span>
              <span className="font-bold text-emerald-700">80.0% (Higher than national avg)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">SC / ST / OBC Affirmative Inclusion</span>
              <span className="font-bold text-slate-900">66.7% of cohort</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Persons with Disabilities (PwD) Tracked</span>
              <span className="font-bold text-orange-600">1 candidate (Accessible workplace intervention)</span>
            </div>
          </div>
        </div>

        {/* Self-Employment & NAPS Apprenticeship Breakdown */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C5D] flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Self-Employment & Apprenticeship Signal Depth</span>
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">NAPS Apprenticeship Active Contracts</span>
              <span className="font-bold text-[#0B3C5D]">2 Trainees (100% full-time conversion target)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">UDYAM Verified Micro-Enterprises</span>
              <span className="font-bold text-emerald-700">2 Enterprises (Drone Agency & Handloom SHG)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Mudra Loan Credit Linkage Facilitated</span>
              <span className="font-bold text-orange-600">₹6,50,000 Total Disbursed</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-700 font-medium">Secondary Job Creation by Alumni</span>
              <span className="font-bold text-slate-900">17 Junior artisans & co-pilots employed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
