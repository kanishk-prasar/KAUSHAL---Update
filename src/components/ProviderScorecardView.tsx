import React, { useState } from 'react';
import {
  Building2,
  ShieldCheck,
  AlertTriangle,
  Award,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { PROVIDER_SCORECARDS } from '../data/longitudinalData';
import { ProviderScorecard } from '../types';

interface ProviderScorecardViewProps {
  onOpenRemedialPlan: (providerName: string) => void;
  lang: 'en' | 'hi';
}

export const ProviderScorecardView: React.FC<ProviderScorecardViewProps> = ({
  onOpenRemedialPlan,
  lang
}) => {
  const [filterRating, setFilterRating] = useState<'All' | 'A+' | 'A' | 'B' | 'C'>('All');

  const filtered = PROVIDER_SCORECARDS.filter((p) => {
    if (filterRating === 'All') return true;
    return p.rating.startsWith(filterRating);
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Outcomes-Based Provider Accountability Framework</span>
          </div>
          <h3 className="text-xl font-bold text-[#0B3C5D] mt-2">
            Training Provider Performance & Retention Scorecards
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
            Shifting funding from enrollment counts to audited longitudinal metrics: verified statutory
            EPFO placement, 6-month & 12-month retention, and median wage benchmarks.
          </p>
        </div>

        {/* Rating Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs shrink-0">
          {(['All', 'A+', 'A', 'B', 'C'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setFilterRating(r)}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                filterRating === r
                  ? 'bg-[#0B3C5D] text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {r === 'All' ? 'All Providers' : `Grade ${r}`}
            </button>
          ))}
        </div>
      </div>

      {/* Provider Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((provider) => {
          const isExemplary = provider.rating.startsWith('A+');
          const isStandard = provider.rating.startsWith('A') && !isExemplary;
          const isWatchlist = provider.rating.startsWith('B');
          const isCritical = provider.rating.startsWith('C');

          return (
            <div
              key={provider.id}
              className={`bg-white border rounded-2xl p-5 space-y-4 shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all ${
                isCritical
                  ? 'border-rose-300 bg-rose-50/20'
                  : isWatchlist
                  ? 'border-orange-300 bg-orange-50/20'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Header with Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold font-mono text-slate-400">
                      {provider.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {provider.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {provider.district}, {provider.state}
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-lg font-bold shrink-0 ${
                      isExemplary
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : isStandard
                        ? 'bg-sky-50 text-sky-800 border border-sky-300'
                        : isWatchlist
                        ? 'bg-orange-50 text-orange-800 border border-orange-300'
                        : 'bg-rose-50 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {provider.rating}
                  </span>
                </div>

                {/* Quantitative Metric Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Verified Placement</div>
                    <div className="text-sm font-black text-[#0B3C5D] font-mono">
                      {provider.verifiedPlacementRate}%
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">
                      EPFO / UDYAM Validated
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">6M / 12M Retention</div>
                    <div className="text-sm font-black text-emerald-700 font-mono">
                      {provider.sixMonthRetentionRate}% / {provider.twelveMonthRetentionRate}%
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">Longitudinal Tenure</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Median Monthly Wage</div>
                    <div className="text-sm font-black text-orange-600 font-mono">
                      ₹{provider.medianWage.toLocaleString()}
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">Certified Alumni</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">EPFO Match Rate</div>
                    <div className="text-sm font-black text-purple-700 font-mono">
                      {provider.epfoVerificationRate}%
                    </div>
                    <div className="text-[9px] text-slate-500 font-medium">Statutory Audit</div>
                  </div>
                </div>

                {/* Identified Deficiencies / Audit Observations */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Audited Observations:
                  </div>
                  {provider.identifiedDeficiencies.map((def, dIdx) => (
                    <div
                      key={dIdx}
                      className={`text-[11px] p-2 rounded-lg leading-relaxed flex items-start gap-1.5 font-medium ${
                        isCritical
                          ? 'bg-rose-50 text-rose-900 border border-rose-200'
                          : 'bg-slate-50 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {isCritical ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      )}
                      <span>{def}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">
                  Trained: {provider.certifiedCount} / {provider.totalTrained}
                </span>

                <button
                  onClick={() => onOpenRemedialPlan(provider.name)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 shadow-2xs ${
                    isCritical
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-white hover:bg-slate-50 text-[#0B3C5D] border border-slate-300'
                  }`}
                >
                  <span>{isCritical ? 'Remedial Intervention' : 'View Audit File'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
