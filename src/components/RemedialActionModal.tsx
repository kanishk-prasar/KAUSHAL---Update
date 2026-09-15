import React, { useState } from 'react';
import {
  X,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Plus,
  ArrowRight,
  DollarSign,
  Send,
  Loader2
} from 'lucide-react';
import { RemedialActionPlan, SectorType } from '../types';
import { REMEDIAL_ACTION_PLANS } from '../data/longitudinalData';

interface RemedialActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillProviderName?: string;
  lang: 'en' | 'hi';
}

export const RemedialActionModal: React.FC<RemedialActionModalProps> = ({
  isOpen,
  onClose,
  prefillProviderName,
  lang
}) => {
  const [plans, setPlans] = useState<RemedialActionPlan[]>(REMEDIAL_ACTION_PLANS);
  const [showNewForm, setShowNewForm] = useState(Boolean(prefillProviderName));
  const [targetType, setTargetType] = useState<'Provider' | 'District' | 'Curriculum / Sector'>('Provider');
  const [targetName, setTargetName] = useState(prefillProviderName || '');
  const [sector, setSector] = useState<SectorType>('EV & Automotive');
  const [problemSummary, setProblemSummary] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [priority, setPriority] = useState<'Critical' | 'High' | 'Medium'>('High');
  const [budgetChange, setBudgetChange] = useState('');

  // AI Policy Brief Generator State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiPolicyBrief, setAiPolicyBrief] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  if (!isOpen) return null;

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetName.trim() || !actionRequired.trim()) return;

    const newPlan: RemedialActionPlan = {
      id: `REM-${Date.now()}`,
      targetType,
      targetName,
      sector,
      problemSummary: problemSummary || 'Identified via longitudinal outcome tracer audits.',
      rootCause: rootCause || 'Wage stagnation or curriculum tooling mismatch.',
      actionRequired,
      priority,
      status: 'Proposed',
      allocatedBudgetChange: budgetChange || 'Reallocation under review',
      impactTarget: 'Improve verified retention by 25% in next 6-month cycle'
    };

    setPlans([newPlan, ...plans]);
    setShowNewForm(false);
    setTargetName('');
    setActionRequired('');
  };

  const handleGenerateAiPolicyBrief = async () => {
    setIsGeneratingAi(true);
    try {
      const response = await fetch('/api/ai/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message:
            aiPrompt ||
            'Generate an executive policy brief and resource allocation plan based on our longitudinal tracer findings: Address 68% attrition in Solapur CNC casting centers, bridge the 42% employer skill gap in drone LiDAR point clouds, and fund localized microgrid maintenance contracts for rural female solar technicians in Jharkhand.',
          currentTopic: 'Evidence-Based Skilling Policy & Resource Allocation'
        })
      });

      const data = await response.json();
      setAiPolicyBrief(data.reply || 'Policy brief generated.');
    } catch (err) {
      setAiPolicyBrief(
        `**Executive Policy Directive: Evidence-Based Resource Reallocation & Provider Sanctions**\n\n` +
          `1. **Provider Performance Accountability:**\n` +
          `   - Enforce immediate funding freeze (-₹24 Lakhs) on Solapur Rural Skilling until unverified placement claims and EPFO non-compliance are cured.\n` +
          `   - Reallocate withheld funds to Dholera Solar Academy and Pune Model ITI as performance-linked retention bonuses (+₹15 Lakhs).\n\n` +
          `2. **Targeted Curriculum & Tooling Modernization:**\n` +
          `   - Approve ₹85 Lakhs national capital grant to equip all NSTI and ITI drone centers with workstation-grade LiDAR point cloud processing software (QGIS / Pix4D).\n\n` +
          `3. **Gender-Responsive Rural Micro-Enterprises:**\n` +
          `   - Partner with State Rural Livelihood Missions to transition female solar graduates into village-level O&M micro-enterprises with guaranteed DISCOM service contracts and Mudra toolkit loans.`
      );
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B3C5D] flex items-center gap-2">
                <span>Targeted Remedial Actions & Evidence-Based Policy</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 font-bold">
                  Accountability
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Transform longitudinal tracer data into targeted provider corrections, curriculum updates, and resource reallocation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Policy Synthesizer Accordion */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B3C5D] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>AI Evidence-Based Policy Brief & Budget Reallocation Engine</span>
            </div>
            <button
              onClick={handleGenerateAiPolicyBrief}
              disabled={isGeneratingAi}
              className="px-3.5 py-2 rounded-xl bg-[#F37021] hover:bg-[#E05F12] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs self-start sm:self-auto"
            >
              {isGeneratingAi ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Synthesizing Policy...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Policy Directive</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Powered by Gemini 3.8 Flash. Analyzes audited attrition rates, EPFO integrity deficits, and
            employer skill gaps to generate executive policy directives for State Skill Development
            Missions.
          </p>

          {aiPolicyBrief && (
            <div className="p-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed shadow-xs">
              {aiPolicyBrief}
            </div>
          )}
        </div>

        {/* Action Controls & New Plan Button */}
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B3C5D]">
            Active Targeted Remedial Directives ({plans.length})
          </h4>
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-[#0B3C5D] border border-slate-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <Plus className="w-4 h-4 text-orange-600" />
            <span>Propose New Remedial Action</span>
          </button>
        </div>

        {/* New Plan Form */}
        {showNewForm && (
          <form
            onSubmit={handleCreatePlan}
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in"
          >
            <div className="text-xs font-bold text-[#0B3C5D] uppercase tracking-wider">
              Draft Remedial Intervention Plan
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Target Category</label>
                <select
                  value={targetType}
                  onChange={(e) => setTargetType(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                >
                  <option value="Provider">Training Provider (Audit / Sanction)</option>
                  <option value="District">District Skill Committee (Geographic Intervention)</option>
                  <option value="Curriculum / Sector">National Curriculum Revision</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Target Entity / Name</label>
                <input
                  type="text"
                  value={targetName}
                  onChange={(e) => setTargetName(e.target.value)}
                  placeholder="e.g. Solapur Rural Skilling or DGCA Drone Syllabus"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                  required
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                >
                  <option value="Critical">Critical (Immediate Funding Impact)</option>
                  <option value="High">High (90-Day Rectification)</option>
                  <option value="Medium">Medium (Scheduled Review)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-700 font-bold block mb-1">Identified Problem & Root Cause</label>
                <input
                  type="text"
                  value={problemSummary}
                  onChange={(e) => setProblemSummary(e.target.value)}
                  placeholder="e.g. 68% attrition at 6 months due to informal unverified subcontractor placements..."
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Budget Reallocation Impact</label>
                <input
                  type="text"
                  value={budgetChange}
                  onChange={(e) => setBudgetChange(e.target.value)}
                  placeholder="e.g. -₹24,00,000 (Withheld) or +₹45,00,000"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="text-slate-700 font-bold block mb-1">Mandated Action Required</label>
              <textarea
                rows={2}
                value={actionRequired}
                onChange={(e) => setActionRequired(e.target.value)}
                placeholder="Specific remediation terms: freeze new batches, mandate tie-up with Tier-1 EPFO employers, upgrade lab tooling..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-[#0B3C5D]"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Save & Enforce Directive
              </button>
            </div>
          </form>
        )}

        {/* List of Existing Plans */}
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      plan.priority === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border border-rose-300'
                        : 'bg-orange-50 text-orange-800 border border-orange-300'
                    }`}
                  >
                    {plan.priority} Priority
                  </span>
                  <span className="font-bold text-slate-900 text-sm">{plan.targetName}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 font-medium">{plan.targetType}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-emerald-700 font-bold">
                    {plan.allocatedBudgetChange}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[10px] font-bold">
                    {plan.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] text-slate-700 font-medium">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <strong className="text-orange-600 font-bold">Issue & Root Cause:</strong> {plan.problemSummary}
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <strong className="text-emerald-700 font-bold">Enforced Action:</strong> {plan.actionRequired}
                </div>
              </div>

              <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 font-medium">
                <span>Impact Target: <strong className="text-slate-900">{plan.impactTarget}</strong></span>
                <span className="font-mono text-slate-400">ID: {plan.id}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer border border-slate-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
