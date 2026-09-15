import React from 'react';
import { X, Megaphone, Briefcase, Award, Calendar, ExternalLink } from 'lucide-react';

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToJobs: () => void;
  onNavigateToCourses: () => void;
}

export const UpdatesModal: React.FC<UpdatesModalProps> = ({
  isOpen,
  onClose,
  onNavigateToJobs,
  onNavigateToCourses
}) => {
  if (!isOpen) return null;

  const updates = [
    {
      id: 'up-01',
      type: 'Admission & Batches',
      title: 'New PMKVY Batches: IT, EV & Solar registrations open at recognized ITIs across Maharashtra',
      date: '15 September 2026',
      icon: Megaphone,
      color: 'text-sky-600 bg-sky-100',
      action: onNavigateToCourses,
      actionText: 'View Batches'
    },
    {
      id: 'up-02',
      type: 'Employment Drive',
      title: '5,200+ Active Vacancies: Automotive, Manufacturing, IT & Healthcare sectors hiring now in Pune, Mumbai, Nagpur & Aurangabad',
      date: '14 September 2026',
      icon: Briefcase,
      color: 'text-amber-600 bg-amber-100',
      action: onNavigateToJobs,
      actionText: 'Apply to Jobs'
    },
    {
      id: 'up-03',
      type: 'Apprenticeship Mission',
      title: '42,000+ apprentices onboarded under National Apprenticeship Promotion Scheme (NAPS) in Maharashtra state',
      date: '12 September 2026',
      icon: Award,
      color: 'text-emerald-600 bg-emerald-100',
      action: onNavigateToJobs,
      actionText: 'Browse Openings'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        
        {/* Header */}
        <div className="bg-[#0B2E4F] text-white px-6 py-5 flex items-center justify-between border-b-4 border-[#F05A28]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F05A28] text-white flex items-center justify-center shadow-md">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
                Official Department Bulletin
              </div>
              <h3 className="text-lg font-black text-white tracking-tight mt-0.5">
                KAUSHAL Latest Notifications &amp; Updates
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {updates.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-bold text-[#102A43] leading-snug">
                  {item.title}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="px-3 py-1.5 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
