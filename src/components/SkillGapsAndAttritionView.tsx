import React, { useState } from 'react';
import {
  AlertTriangle,
  HelpCircle,
  TrendingDown,
  Wrench,
  CheckCircle2,
  Cpu,
  Building2,
  FileSpreadsheet,
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { SKILL_GAPS_DATA, TRAINEE_OUTCOME_RECORDS } from '../data/longitudinalData';
import { SectorType } from '../types';

interface SkillGapsAndAttritionViewProps {
  onOpenRemedialModal: () => void;
  lang: 'en' | 'hi';
}

export const SkillGapsAndAttritionView: React.FC<SkillGapsAndAttritionViewProps> = ({
  onOpenRemedialModal,
  lang
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorType | 'All'>('All');

  // Filtered gaps
  const filteredGaps = SKILL_GAPS_DATA.filter(
    (g) => selectedSector === 'All' || g.sector === selectedSector
  );

  // Filtered attrition cases
  const nonPlacedCases = TRAINEE_OUTCOME_RECORDS.filter(
    (t) => t.nonPlacementReason || t.attritionReason
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Root-Cause Attrition & Competency Deficit Diagnostics</span>
          </div>
          <h3 className="text-xl font-bold text-[#0B3C5D] mt-2">
            Skill Gaps & Non-Placement Reason Taxonomy
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
            Empirically identifying why trained candidates leave employment or fail technical interviews,
            feeding directly into targeted syllabus revisions and provider performance audits.
          </p>
        </div>

        <button
          onClick={onOpenRemedialModal}
          className="px-4 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Formulate Remedial Action Plan</span>
        </button>
      </div>

      {/* Two Column Layout: Root Causes of Attrition & Employer Skill Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Why Candidates Leave or Fail Placement? (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#0B3C5D]">Non-Placement & Attrition Taxonomy</h4>
              <p className="text-[11px] text-slate-500 font-medium">Categorized from 30/90/180-day longitudinal tracer calls</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold">
              High Impact
            </span>
          </div>

          <div className="space-y-3">
            {/* Reason 1 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">1. Delayed Salary / Irregular Employer Payment</span>
                <span className="font-mono font-bold text-rose-600">33% of dropouts</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Micro-workshops and informal sub-contractors withholding wages beyond 45 days.
                Leads to immediate candidate resignation.
              </p>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Policy Remedy: Mandate pre-placement EPFO & bank account escrow check</span>
              </div>
            </div>

            {/* Reason 2 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">2. Commute & Unsafe Distant Industrial Belts</span>
                <span className="font-mono font-bold text-orange-600">25% of dropouts</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Factories located &gt;40km away without subsidized bus transit or female hostels.
                Disproportionately forces female and rural candidates to leave.
              </p>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Policy Remedy: Tie provider reimbursement to employer safe-commute compacts</span>
              </div>
            </div>

            {/* Reason 3 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">3. Syllabus & Modern Machine Tooling Gap</span>
                <span className="font-mono font-bold text-orange-600">20% of dropouts</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Candidate trained on basic legacy machinery cannot operate modern CNC 5-axis or
                LiDAR survey instruments on shop floor. Fails probation.
              </p>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Policy Remedy: Modernize ITI capital equipment via Industry CoE models</span>
              </div>
            </div>

            {/* Reason 4 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">4. Family & Caregiving Obligations</span>
                <span className="font-mono font-bold text-[#0B3C5D]">15% of dropouts</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Lack of flexible shifts and localized micro-enterprise opportunities in rural clusters.
              </p>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Policy Remedy: Support Women SHG cooperative micro-enterprises & local O&M</span>
              </div>
            </div>

            {/* Reason 5 */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">5. Inaccessible Physical Infrastructure for PwD</span>
                <span className="font-mono font-bold text-purple-700">7% of dropouts</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Shop floors lacking accessible wheelchair ramps or adapted workstations.
              </p>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Policy Remedy: Mandatory accessibility audit before employer listing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Employer-Reported Skill Gap Matrix (6 cols) */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h4 className="text-sm font-bold text-[#0B3C5D]">Employer-Audited Skill Gap Heatmap</h4>
              <p className="text-[11px] text-slate-500 font-medium">Gaps between training curricula and modern industry production</p>
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs text-slate-700 font-medium focus:outline-none focus:border-[#0B3C5D]"
            >
              <option value="All">All Sectors</option>
              <option value="EV & Automotive">EV & Automotive</option>
              <option value="Clean Energy & Solar">Clean Energy & Solar</option>
              <option value="Advanced Manufacturing & CNC">Advanced Manufacturing & CNC</option>
              <option value="Drone Tech & Robotics">Drone Tech & Robotics</option>
              <option value="Healthcare & Caregiving">Healthcare & Caregiving</option>
            </select>
          </div>

          <div className="space-y-3">
            {filteredGaps.map((gap, gIdx) => (
              <div
                key={gIdx}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[11px] font-bold text-orange-600 uppercase">
                      {gap.sector}
                    </div>
                    <div className="text-sm font-bold text-slate-900">{gap.competencyArea}</div>
                  </div>

                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      gap.gapSeverity === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border border-rose-200'
                        : 'bg-orange-50 text-orange-800 border border-orange-200'
                    }`}
                  >
                    {gap.gapSeverity} Gap
                  </span>
                </div>

                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-rose-700 font-bold">Curriculum Deficit:</strong>{' '}
                  {gap.trainingCurriculumDeficit}
                </div>

                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200">
                  <strong className="text-emerald-700 font-bold">Industry Recommendation:</strong>{' '}
                  {gap.industryRecommendedTooling}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 font-medium">
                  <span>
                    Reported by <strong className="text-slate-900 font-bold">{gap.percentEmployersReporting}%</strong> of partner employers
                  </span>
                  <span className="font-mono font-bold text-orange-600">Model Syllabus Revision Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Longitudinal Case Trace: Actual Trainee Separations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C5D] flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-rose-600" />
          <span>Active Flagged Non-Placement / Attrition Cases Under Remedial Review</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {nonPlacedCases.map((trainee) => (
            <div
              key={trainee.id}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{trainee.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                  {trainee.employmentStatus}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {trainee.courseName} • {trainee.district}
              </div>
              <div className="text-[11px] text-rose-900 bg-rose-50 p-2.5 rounded-lg border border-rose-200 font-medium">
                <strong>Reason:</strong> {trainee.nonPlacementReason || trainee.attritionReason}
              </div>
              {trainee.skillGapReportedByEmployer && (
                <div className="text-[10px] text-orange-700 font-semibold">
                  Tool Gap: {trainee.skillGapReportedByEmployer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
