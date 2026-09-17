import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  UploadCloud,
  ChevronRight,
  ShieldCheck,
  Building2,
  ArrowRight,
  ExternalLink,
  Eye,
  Check,
  RefreshCw,
} from 'lucide-react';
import { TrainingPartnerFormData, CorrectionItem } from './types';

interface PostSubmissionViewProps {
  formData: TrainingPartnerFormData;
  onOpenGovernmentReview: () => void;
  onOpenApprovedDashboard: () => void;
  onUpdateCorrections: (corrections: CorrectionItem[]) => void;
}

export const PostSubmissionView: React.FC<PostSubmissionViewProps> = ({
  formData,
  onOpenGovernmentReview,
  onOpenApprovedDashboard,
  onUpdateCorrections,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'corrections'>('timeline');
  const [correctionsList, setCorrectionsList] = useState<CorrectionItem[]>(formData.corrections);
  const [uploadedReplacements, setUploadedReplacements] = useState<Record<string, string>>({});
  const [resubmittedSuccess, setResubmittedSuccess] = useState(false);

  const pendingCorrectionsCount = correctionsList.filter((c) => c.status === 'Pending Action').length;

  const handleFileUpload = (id: string, name: string) => {
    setUploadedReplacements((prev) => ({ ...prev, [id]: name }));
  };

  const handleResubmitCorrection = (id: string) => {
    const updated = correctionsList.map((c) =>
      c.id === id ? { ...c, status: 'Resubmitted' as const } : c
    );
    setCorrectionsList(updated);
    onUpdateCorrections(updated);
    setResubmittedSuccess(true);
    setTimeout(() => setResubmittedSuccess(false), 4000);
  };

  const timelineSteps = [
    {
      title: 'Application Submitted',
      description: 'Submitted successfully with digital declaration',
      date: '16 September 2026, 11:45 AM',
      status: 'completed',
    },
    {
      title: 'Document Verification',
      description: 'PAN, GSTIN & ROC online cross-check',
      date: 'In Progress (Desk of Joint Director, DVET Pune)',
      status: 'active',
    },
    {
      title: 'Organisation Verification',
      description: 'Track record, Darpan & NGO/Corporate credential check',
      date: 'Scheduled within 48 hours',
      status: 'pending',
    },
    {
      title: 'Training Centre Verification',
      description: 'Geo-tagged physical premises & classroom inspection',
      date: 'Pending District Skill Committee Inspection',
      status: 'pending',
    },
    {
      title: 'Course / Capability Review',
      description: 'NSQF alignment and trainer TOT verification',
      date: 'Pending Sector Skill Council evaluation',
      status: 'pending',
    },
    {
      title: 'Government Decision',
      description: 'Issuance of official Training Partner ID (KTP-MH-XXXX)',
      date: 'Awaiting Competent Authority Signature',
      status: 'pending',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* Top Banner: Application Submitted Successfully */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200 mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Under Government Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#102A43]">
              Application Submitted Successfully
            </h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Organisation: <strong className="text-slate-900">{formData.orgName || 'ABC Skill Development Pvt Ltd'}</strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 text-right md:min-w-[240px]">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Application ID</div>
            <div className="text-lg sm:text-xl font-mono font-black text-[#0B3C5D] mt-0.5">
              {formData.applicationId}
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium">
              Submitted: 16 Sep 2026
            </div>
          </div>
        </div>

        {/* Demo Reviewer Testing Shortcut Bar */}
        <div className="mt-4 p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50/80 rounded-2xl border border-blue-200/90 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#0B3C5D] font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Demonstration Actions: Test Government Reviewer & Approval flows</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenGovernmentReview}
              className="bg-[#0B3C5D] hover:bg-[#102A43] text-white px-3.5 py-1.5 rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Inspect Govt Review Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onOpenApprovedDashboard}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-1.5 rounded-lg font-bold shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Simulate Instant Approval</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs: Timeline vs Action Required (Corrections) */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'bg-[#0B3C5D] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Verification Timeline</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('corrections')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer flex items-center gap-2 ${
            activeTab === 'corrections'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Action Required (Correction Workflow)</span>
          {pendingCorrectionsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[11px] font-black flex items-center justify-center">
              {pendingCorrectionsCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: Visual Tracking Timeline */}
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
          <h2 className="text-lg font-black text-[#102A43] mb-1">
            Official Multi-Stage Verification Timeline
          </h2>
          <p className="text-xs text-slate-500 mb-6 font-medium">
            Track real-time progress through Maharashtra Directorate of Vocational Education &amp; Training (DVET)
          </p>

          <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-slate-200 ml-3">
            {timelineSteps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';

              return (
                <div key={idx} className="relative">
                  {/* Step Bullet */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs ${
                      isCompleted
                        ? 'bg-emerald-600 text-white'
                        : isActive
                        ? 'bg-orange-600 text-white ring-4 ring-orange-100 animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                  </div>

                  {/* Content */}
                  <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/70">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-extrabold text-[#102A43]">
                        {step.title}
                      </h3>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-100 text-emerald-800'
                            : isActive
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-slate-200/70 text-slate-600'
                        }`}
                      >
                        {step.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 font-medium">{step.description}</p>
                    <div className="text-[11px] text-slate-500 mt-2 font-mono flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{step.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Correction Workflow Simulation */}
      {activeTab === 'corrections' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Action Required: Discrepancies Noted During Desk Review</span>
              </div>
              <h2 className="text-xl font-black text-[#102A43]">
                Government Reviewer Clarification Requests
              </h2>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                The government verification officer has reviewed your documents and flagged the following items for correction. Upload revised valid documentation to proceed with physical centre inspection.
              </p>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold shrink-0">
              {pendingCorrectionsCount} items requiring action
            </div>
          </div>

          {resubmittedSuccess && (
            <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Correction resubmitted successfully for government verification! Desk Officer will review within 24 hours.</span>
            </div>
          )}

          <div className="space-y-4">
            {correctionsList.map((item) => {
              const isResolved = item.status === 'Resolved';
              const isResubmitted = item.status === 'Resubmitted';
              const replacementUploaded = uploadedReplacements[item.id];

              return (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isResolved
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : isResubmitted
                      ? 'bg-blue-50/50 border-blue-200'
                      : 'bg-amber-50/40 border-amber-300'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-extrabold text-sm text-[#102A43] flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-600" />
                      {item.field}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isResubmitted
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Reviewer Comment */}
                  <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-950 font-medium mb-3">
                    <strong>Reviewer Remark:</strong> "{item.reviewerComment}"
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="bg-slate-100 p-2.5 rounded-xl">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Submitted File</span>
                      <span className="font-mono font-semibold text-slate-800">{item.currentValue}</span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="truncate pr-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase block">Replacement Document</span>
                        <span className="font-mono text-emerald-700 font-bold truncate">
                          {replacementUploaded || 'No file selected yet'}
                        </span>
                      </div>
                      <label className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-lg font-bold text-xs cursor-pointer shrink-0 border border-slate-300 flex items-center gap-1.5">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(item.id, e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Resubmit Button */}
                  {!isResolved && (
                    <div className="mt-3 flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleResubmitCorrection(item.id)}
                        disabled={!replacementUploaded && !isResubmitted}
                        className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                          replacementUploaded || isResubmitted
                            ? 'bg-[#0B3C5D] hover:bg-[#102A43] text-white shadow-xs'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Submit Correction</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
