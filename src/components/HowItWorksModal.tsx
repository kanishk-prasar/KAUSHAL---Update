import React from 'react';
import { X, GraduationCap, Users, TrendingUp, Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExplore: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  onExplore
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      step: '01',
      title: 'UPGRADE: Skills & Practical Training',
      subtitle: 'Trainees enroll in industry-aligned NSQF Level 3-7 vocational programs with verified biometric attendance and simulator hours.',
      icon: GraduationCap,
      color: 'text-orange-600 bg-orange-100 border-orange-200'
    },
    {
      step: '02',
      title: 'CONNECT: Talent with Verified Employers',
      subtitle: 'Automated skill matching connects certified apprentices and technicians with 8,700+ active employers across Maharashtra.',
      icon: Users,
      color: 'text-blue-600 bg-blue-100 border-blue-200'
    },
    {
      step: '03',
      title: 'TRACK: Longitudinal Employment & Retention',
      subtitle: 'Tracer signals verify 3, 6, and 12-month job retention, wage progression, and formal EPFO/ESIC registrations.',
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-100 border-emerald-200'
    },
    {
      step: '04',
      title: 'MEASURE: Data-Driven Livelihood Impact',
      subtitle: 'Government administrators and training institutes analyze longitudinal outcomes to dynamically allocate state skill budgets.',
      icon: Target,
      color: 'text-purple-600 bg-purple-100 border-purple-200'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="bg-[#102A43] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#E9531E]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
              Platform Workflow &amp; Architecture
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              How KAUSHAL Tracks Livelihoods
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            KAUSHAL connects every phase of the vocational skilling lifecycle into an integrated evidence engine.
          </p>

          <div className="space-y-3 pt-1">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black text-slate-400">STEP {item.step}</span>
                      <h4 className="text-xs sm:text-sm font-bold text-[#102A43]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              Fully compliant with Maharashtra State Skill Development Society (MSSDS) and National Council for Vocational Education and Training (NCVET) standards.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="px-5 py-2.5 rounded-full bg-[#E9531E] hover:bg-[#D44310] text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <span>Explore Skill Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
