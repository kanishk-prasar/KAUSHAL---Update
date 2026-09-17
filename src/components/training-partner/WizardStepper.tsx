import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { WizardStepId } from './types';

export interface StepDefinition {
  id: WizardStepId;
  title: string;
  category?: string;
}

export const WIZARD_STEPS: StepDefinition[] = [
  { id: 1, title: 'Organisation Details', category: 'Entity' },
  { id: 2, title: 'Legal & Registration', category: 'Entity' },
  { id: 3, title: 'Authorised Representative', category: 'Entity' },
  { id: 4, title: 'Training Centre Details', category: 'Operations' },
  { id: 5, title: 'Capacity & Operations', category: 'Operations' },
  { id: 6, title: 'Infrastructure & Facilities', category: 'Operations' },
  { id: 7, title: 'Courses & Programmes', category: 'Curriculum' },
  { id: 8, title: 'Curriculum & Assessment', category: 'Curriculum' },
  { id: 9, title: 'Trainers / Faculty', category: 'Faculty' },
  { id: 10, title: 'Accreditation & Recognition', category: 'Credibility' },
  { id: 11, title: 'Training Experience', category: 'Track Record' },
  { id: 12, title: 'Placement & Employment Outcomes', category: 'Track Record' },
  { id: 13, title: 'Employer Partnerships', category: 'Linkages' },
  { id: 14, title: 'Apprenticeship & Self-Employment', category: 'Linkages' },
  { id: 15, title: 'Data & Technology Capability', category: 'MIS / Tech' },
  { id: 16, title: 'Government Programme Association', category: 'Governance' },
  { id: 17, title: 'Financial & Bank Details', category: 'Finance' },
  { id: 18, title: 'Documents', category: 'Verification' },
  { id: 19, title: 'Compliance & Consent', category: 'Verification' },
  { id: 20, title: 'Review & Submit', category: 'Submission' },
];

interface WizardStepperProps {
  currentStep: WizardStepId;
  onSelectStep: (stepId: WizardStepId) => void;
  completedSteps: Set<number>;
}

export const WizardStepper: React.FC<WizardStepperProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  const progressPercent = Math.round((completedSteps.size / WIZARD_STEPS.length) * 100);

  return (
    <aside className="w-full">
      
      {/* Mobile Compact Progress Bar */}
      <div className="lg:hidden bg-white p-4 rounded-xl border border-slate-300 shadow-xs mb-4">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-[#0f2e5a]">
            Step {currentStep} of 20: <span className="text-slate-900 font-extrabold">{WIZARD_STEPS[currentStep - 1]?.title}</span>
          </span>
          <span className="text-[#b45309] bg-amber-50 px-2 py-0.5 rounded border border-amber-300 font-bold">
            {progressPercent}% completed
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#0f2e5a] h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.max(progressPercent, 5)}%` }}
          />
        </div>
      </div>

      {/* Desktop Vertical Stepper */}
      <div className="hidden lg:block bg-white rounded-xl border border-slate-300 shadow-xs p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
        <div className="px-2 pb-3 mb-3 border-b border-slate-200">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1">
            <span className="uppercase tracking-wider">Registration Progress</span>
            <span className="text-[#0f2e5a] font-black">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#0f2e5a] h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, 5)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-medium">
            Step {currentStep} of 20 &bull; {completedSteps.size} sections verified
          </p>
        </div>

        <nav aria-label="Registration Steps" className="space-y-1">
          {WIZARD_STEPS.map((step) => {
            const isCurrent = step.id === currentStep;
            const isCompleted = completedSteps.has(step.id);
            const stepNumberStr = step.id < 10 ? `0${step.id}` : `${step.id}`;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#0B3C5D] text-white font-bold shadow-xs shadow-slate-900/10'
                    : isCompleted
                    ? 'text-slate-700 hover:bg-slate-50 font-semibold'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  {/* Step Status Badge / Number */}
                  <span
                    className={`w-6 h-6 rounded-lg text-[11px] font-bold flex items-center justify-center shrink-0 ${
                      isCurrent
                        ? 'bg-orange-500 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {isCompleted && !isCurrent ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      stepNumberStr
                    )}
                  </span>
                  <span className="truncate leading-tight">{step.title}</span>
                </div>

                {isCurrent && (
                  <ChevronRight className="w-3.5 h-3.5 text-orange-400 shrink-0 ml-1" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

    </aside>
  );
};
