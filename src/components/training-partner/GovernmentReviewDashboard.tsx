import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Building2,
  Users,
  GraduationCap,
  Award,
  BarChart3,
  Landmark,
  Layers,
  ChevronRight,
  Search,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { TrainingPartnerFormData } from './types';

interface GovernmentReviewDashboardProps {
  formData: TrainingPartnerFormData;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onRequestCorrection: (remarks: string) => void;
  onBackToPostSubmission: () => void;
}

export const GovernmentReviewDashboard: React.FC<GovernmentReviewDashboardProps> = ({
  formData,
  onApprove,
  onReject,
  onRequestCorrection,
  onBackToPostSubmission,
}) => {
  const [activeTab, setActiveTab] = useState<string>('Organisation');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);
  const [remarksText, setRemarksText] = useState('');
  const [rejectReason, setRejectReason] = useState('');

  const tabs = [
    'Organisation',
    'Legal',
    'Representative',
    'Centres',
    'Courses',
    'Trainers',
    'Infrastructure',
    'Accreditation',
    'Experience',
    'Outcomes',
    'Employers',
    'Apprenticeship',
    'Technology',
    'Govt Programmes',
    'Bank Details',
    'Documents',
    'Compliance',
    'Audit Log',
  ];

  const handleConfirmApproval = () => {
    onApprove();
  };

  const handleConfirmCorrection = () => {
    if (!remarksText.trim()) return;
    onRequestCorrection(remarksText);
    setShowCorrectionModal(false);
  };

  const handleConfirmRejection = () => {
    if (!rejectReason.trim()) return;
    onReject(rejectReason);
    setShowRejectModal(false);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      
      {/* Official State Government Officer Banner */}
      <div className="bg-[#102A43] text-white p-6 rounded-3xl border border-slate-700 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 text-[11px] font-black uppercase tracking-wider border border-orange-400/30">
                Government Officer Portal &bull; Verification Authority
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-bold border border-amber-400/30">
                Desk of Joint Director (Technical), DVET Maharashtra
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Training Partner Verification
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1 font-medium">
              <span>Application ID: <strong className="text-white font-mono">{formData.applicationId}</strong></span>
              <span>&bull;</span>
              <span>Organisation: <strong className="text-white">{formData.orgName || 'ABC Skill Development Pvt Ltd'}</strong></span>
              <span>&bull;</span>
              <span>Submitted: <strong className="text-white">16 September 2026</strong></span>
            </div>
          </div>

          {/* Action Buttons for Officer */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleConfirmApproval}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Approve Partner</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCorrectionModal(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Request Correction</span>
            </button>

            <button
              type="button"
              onClick={() => setShowRejectModal(true)}
              className="bg-red-700 hover:bg-red-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>

            <button
              type="button"
              onClick={onBackToPostSubmission}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition"
            >
              Return to User View
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-2 overflow-x-auto shadow-xs">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#0B3C5D] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Display */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
        
        {/* TAB: Organisation */}
        {activeTab === 'Organisation' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">Organisation Credentials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Legal Name</span>
                <span className="font-bold text-slate-900 text-sm">{formData.orgName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Short Name / Brand</span>
                <span className="font-bold text-slate-900 text-sm">{formData.orgShortName || 'N/A'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Provider Type</span>
                <span className="font-bold text-slate-900 text-sm">{formData.orgType}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Year Established</span>
                <span className="font-bold text-slate-900 text-sm">{formData.yearOfEstablishment}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Official Website</span>
                <span className="font-bold text-slate-900 text-sm truncate">{formData.officialWebsite}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Official Email</span>
                <span className="font-bold text-slate-900 text-sm">{formData.officialEmail}</span>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#102A43] pt-2">Registered Office Address</h3>
            <div className="p-4 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-700">
              <p className="font-semibold">{formData.registeredAddressLine1}, {formData.registeredAddressLine2}</p>
              <p>{formData.cityTown}, {formData.blockTehsil}, Dist. {formData.district}, {formData.state} - {formData.pinCode}</p>
              <p className="font-mono text-slate-500">Geo-coordinates: Lat {formData.headOfficeLat}, Lng {formData.headOfficeLng}</p>
            </div>
          </div>
        )}

        {/* TAB: Legal */}
        {activeTab === 'Legal' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">Statutory &amp; Tax Registration Numbers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Entity Type</span>
                <span className="font-bold text-slate-900 text-sm">{formData.legalEntityType}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">PAN (Verified by NSDL)</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{formData.pan} &bull; ACTIVE</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">GSTIN (State 27)</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{formData.gstin} &bull; REGULAR</span>
              </div>
              {formData.cin && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">Corporate CIN</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{formData.cin}</span>
                </div>
              )}
              {formData.udyamNumber && (
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-400 block font-bold uppercase text-[10px]">MSME Udyam Registration</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{formData.udyamNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: Representative */}
        {activeTab === 'Representative' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">Authorised Signatory &amp; Board Delegation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Full Name</span>
                <span className="font-bold text-slate-900 text-sm">{formData.repFullName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Designation</span>
                <span className="font-bold text-slate-900 text-sm">{formData.repDesignation}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Official Mobile</span>
                <span className="font-bold text-slate-900 text-sm">{formData.repMobile}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block font-bold uppercase text-[10px]">Official Email</span>
                <span className="font-bold text-slate-900 text-sm">{formData.repEmail}</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
              ✓ Authorisation Declaration Confirmed: Board Resolution Ref #{formData.authorisationRefNumber || 'ABC/BOD/RES/2026/08'} attached and verified.
            </div>
          </div>
        )}

        {/* TAB: Centres */}
        {activeTab === 'Centres' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">
              Registered Training Centres ({formData.centres.length})
            </h2>
            <div className="space-y-3">
              {formData.centres.map((c, i) => (
                <div key={c.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-sm text-[#102A43]">
                      #{i + 1}. {c.centreName} ({c.centreCode})
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md">
                      {c.verificationStatus}
                    </span>
                  </div>
                  <p className="text-slate-600">{c.addressLine1}, {c.city}, Dist. {c.district} - {c.pinCode}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200 font-medium text-slate-700">
                    <span>Type: <strong>{c.centreType}</strong></span>
                    <span>Capacity: <strong>{c.maxConcurrentTrainees} Concurrent</strong></span>
                    <span>Classrooms: <strong>{c.classroomsCount}</strong></span>
                    <span>Head: <strong>{c.managerName}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Courses */}
        {activeTab === 'Courses' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">
              Courses &amp; Training Programmes ({formData.courses.length})
            </h2>
            <div className="space-y-3">
              {formData.courses.map((crs, i) => (
                <div key={crs.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-sm text-[#102A43]">
                      {crs.courseName} ({crs.courseCode})
                    </span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded-md">
                      {crs.durationHours} Hours &bull; {crs.trainingMode}
                    </span>
                  </div>
                  <p className="text-slate-600">Sector: <strong>{crs.sector}</strong> | Role: <strong>{crs.jobRole}</strong></p>
                  <p className="text-slate-600 mt-1">Objectives: {crs.learningObjectives}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {crs.skillsCovered.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Trainers */}
        {activeTab === 'Trainers' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">
              Faculty / Certified Trainers ({formData.trainers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {formData.trainers.map((tr) => (
                <div key={tr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{tr.fullName}</span>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                      {tr.status}
                    </span>
                  </div>
                  <p className="text-slate-500 font-mono text-[11px]">{tr.trainerId}</p>
                  <p className="text-slate-700">Qualification: <strong>{tr.highestQualification}</strong></p>
                  <p className="text-slate-700">Specialisation: <strong>{tr.specialisation}</strong></p>
                  <p className="text-slate-700">Experience: <strong>{tr.yearsOfExperience} years</strong></p>
                  <p className="text-emerald-700 font-bold">{tr.trainerCertification}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Outcomes */}
        {activeTab === 'Outcomes' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">
              Historical Training &amp; Employment Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-slate-50 rounded-2xl border">
                <span className="text-2xl font-black text-[#0B3C5D]">{(formData.historicalEnrolled ?? 0).toLocaleString()}</span>
                <span className="text-xs text-slate-500 block font-bold">Total Enrolled</span>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-2xl font-black text-emerald-700">{(formData.historicalCompleted ?? 0).toLocaleString()}</span>
                <span className="text-xs text-emerald-800 block font-bold">Completed (93%)</span>
              </div>
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
                <span className="text-2xl font-black text-blue-700">{(formData.historicalCertified ?? 0).toLocaleString()}</span>
                <span className="text-xs text-blue-800 block font-bold">Certified (86%)</span>
              </div>
              <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200">
                <span className="text-2xl font-black text-orange-700">{(formData.historicalPlaced ?? 0).toLocaleString()}</span>
                <span className="text-xs text-orange-800 block font-bold">Placed (79%)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Documents */}
        {activeTab === 'Documents' && (
          <div className="space-y-4">
            <h2 className="text-lg font-black text-[#102A43] border-b pb-2">Uploaded Regulatory Documents</h2>
            <div className="space-y-2">
              {formData.documents.map((doc) => (
                <div key={doc.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{doc.documentType}</span>
                    <span className="font-mono text-slate-500 text-[11px]">Doc No: {doc.documentNumber || 'VERIFIED-ONLINE'} | File: {doc.fileName || 'document_scan.pdf'}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Default fallback for other tabs */}
        {!['Organisation', 'Legal', 'Representative', 'Centres', 'Courses', 'Trainers', 'Outcomes', 'Documents'].includes(activeTab) && (
          <div className="p-6 bg-slate-50 rounded-2xl border text-xs text-slate-700 space-y-2">
            <h3 className="text-sm font-bold text-[#102A43]">Verified Section: {activeTab}</h3>
            <p>All mandatory statutory criteria for {activeTab} have passed automated platform pre-checks and meet Maharashtra Kaushalya guidelines.</p>
          </div>
        )}

      </div>

      {/* Modal: Request Correction */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border">
            <h3 className="text-lg font-black text-[#102A43] mb-2">Request Correction from Training Partner</h3>
            <p className="text-xs text-slate-600 mb-4">
              Enter specific discrepancy remarks. The training partner will receive an "Action Required" notification and must re-upload compliant documentation.
            </p>
            <textarea
              rows={4}
              value={remarksText}
              onChange={(e) => setRemarksText(e.target.value)}
              placeholder="e.g., Address proof electricity bill submitted is dated 2024. Please re-upload utility bill issued within the last 3 months."
              className="w-full text-xs p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-hidden"
            />
            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowCorrectionModal(false)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCorrection}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold cursor-pointer"
              >
                Send Correction Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reject Application */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border">
            <h3 className="text-lg font-black text-red-800 mb-2">Reject Training Partner Application</h3>
            <p className="text-xs text-slate-600 mb-4">
              Rejection requires a mandatory statutory ground as per Maharashtra Skill Development Rules 2022.
            </p>
            <textarea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter statutory reason for rejection..."
              className="w-full text-xs p-3 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-hidden"
            />
            <div className="mt-4 flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRejection}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
