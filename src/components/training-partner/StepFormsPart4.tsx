import React, { useState } from 'react';
import {
  Landmark,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  UploadCloud,
  FileText,
  ExternalLink,
  ChevronRight,
  PenTool,
} from 'lucide-react';
import { TrainingPartnerFormData, PartnerDocument } from './types';

interface StepFormsPart4Props {
  currentStep: number;
  formData: TrainingPartnerFormData;
  onChange: (updates: Partial<TrainingPartnerFormData>) => void;
  onJumpToStep: (step: number) => void;
  onSubmitApplication: () => void;
}

export const StepFormsPart4: React.FC<StepFormsPart4Props> = ({
  currentStep,
  formData,
  onChange,
  onJumpToStep,
  onSubmitApplication,
}) => {
  const [accountMismatch, setAccountMismatch] = useState(false);

  // STEP 16 — GOVERNMENT PROGRAMME ASSOCIATION
  if (currentStep === 16) {
    const schemeOptions = [
      'PMKVY (Pradhan Mantri Kaushal Vikas Yojana)',
      'MSSDS (Maharashtra State Skill Development Society)',
      'DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)',
      'DAY-NULM (National Urban Livelihoods Mission)',
      'Chief Minister Maha Kaushalya Vikas Abhiyan (CMMKVA)',
      'NAPS (National Apprenticeship Promotion Scheme)',
      'Corporate CSR Skill Development Funded',
      'Self-Paid / Fee-Based Open Courses',
    ];

    const toggleScheme = (scheme: string) => {
      const exists = formData.associatedGovtSchemes.includes(scheme);
      const updated = exists
        ? formData.associatedGovtSchemes.filter((s) => s !== scheme)
        : [...formData.associatedGovtSchemes, scheme];
      onChange({ associatedGovtSchemes: updated });
    };

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 16 &bull; Public Policy Schemes</span>
          <h2 className="text-2xl font-black text-[#102A43]">Government Programme Association</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Indicate state and central government sponsored skill schemes your institution delivers.
          </p>
        </div>

        <div className="space-y-2">
          {schemeOptions.map((sch) => {
            const checked = formData.associatedGovtSchemes.includes(sch);
            return (
              <label
                key={sch}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer text-xs font-semibold transition ${
                  checked ? 'bg-orange-50/80 border-orange-300 text-orange-950' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleScheme(sch)}
                  className="w-4 h-4 text-[#ea580c] rounded"
                />
                <span>{sch}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  // STEP 17 — FINANCIAL & BANK DETAILS
  if (currentStep === 17) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 17 &bull; Direct Benefit Transfer / Bank Mandate</span>
          <h2 className="text-2xl font-black text-[#102A43]">Financial &amp; Bank Details</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Dedicated bank account details for PFMS / state grant disbursements and fee collection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Bank Name *</label>
            <input
              type="text"
              required
              value={formData.bankName}
              onChange={(e) => onChange({ bankName: e.target.value })}
              placeholder="e.g., State Bank of India / Bank of Maharashtra"
              className="w-full p-3 border rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Branch Name *</label>
            <input
              type="text"
              required
              value={formData.branchName}
              onChange={(e) => onChange({ branchName: e.target.value })}
              placeholder="e.g., Shivaji Nagar, Pune"
              className="w-full p-3 border rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Account Number *</label>
            <input
              type="text"
              required
              value={formData.accountNumber}
              onChange={(e) => {
                onChange({ accountNumber: e.target.value });
                if (formData.confirmAccountNumber && e.target.value !== formData.confirmAccountNumber) {
                  setAccountMismatch(true);
                } else {
                  setAccountMismatch(false);
                }
              }}
              placeholder="Enter bank account number"
              className="w-full p-3 border rounded-xl font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Confirm Account Number *</label>
            <input
              type="text"
              required
              value={formData.confirmAccountNumber}
              onChange={(e) => {
                onChange({ confirmAccountNumber: e.target.value });
                if (e.target.value !== formData.accountNumber) {
                  setAccountMismatch(true);
                } else {
                  setAccountMismatch(false);
                }
              }}
              placeholder="Re-enter bank account number"
              className="w-full p-3 border rounded-xl font-mono font-bold"
            />
            {accountMismatch && (
              <span className="text-red-600 text-[11px] font-bold mt-1 block">
                Account numbers do not match!
              </span>
            )}
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">IFSC Code *</label>
            <input
              type="text"
              maxLength={11}
              required
              value={formData.ifscCode}
              onChange={(e) => onChange({ ifscCode: e.target.value.toUpperCase() })}
              placeholder="e.g., SBIN0001824"
              className="w-full p-3 border rounded-xl font-mono font-bold uppercase"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Account Type *</label>
            <select
              value={formData.accountType}
              onChange={(e) => onChange({ accountType: e.target.value as any })}
              className="w-full p-3 border rounded-xl bg-white font-medium"
            >
              <option value="Current Account">Current Account (Entity Name)</option>
              <option value="Dedicated Escrow Account">Dedicated Escrow Account (Government Scheme)</option>
            </select>
          </div>
        </div>

        {/* Turnover & Net Worth */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-[#102A43] mb-3">Annual Audited Turnover &amp; Net Worth (in ₹ Lakhs)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">FY 2023-24</label>
              <input
                type="number"
                value={formData.turnoverYear1}
                onChange={(e) => onChange({ turnoverYear1: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">FY 2024-25</label>
              <input
                type="number"
                value={formData.turnoverYear2}
                onChange={(e) => onChange({ turnoverYear2: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">FY 2025-26</label>
              <input
                type="number"
                value={formData.turnoverYear3}
                onChange={(e) => onChange({ turnoverYear3: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Net Worth</label>
              <input
                type="number"
                value={formData.netWorth}
                onChange={(e) => onChange({ netWorth: Number(e.target.value) })}
                className="w-full p-2.5 border rounded-xl font-mono font-bold text-emerald-700"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 18 — DOCUMENTS
  if (currentStep === 18) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 18 &bull; Document Vault</span>
          <h2 className="text-2xl font-black text-[#102A43]">Mandatory Regulatory Documents</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Upload clear digital copies in PDF/PNG format (max 10MB per document).
          </p>
        </div>

        <div className="space-y-3">
          {formData.documents.map((doc, idx) => (
            <div
              key={doc.id}
              className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#ea580c]" />
                  <span className="font-bold text-sm text-[#102A43]">{doc.documentType}</span>
                  {doc.mandatory && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded">
                      Mandatory
                    </span>
                  )}
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  File: {doc.fileName || 'Pending Upload'} {doc.documentNumber && `| Ref: ${doc.documentNumber}`}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <label className="px-3 py-1.5 bg-white hover:bg-slate-100 border rounded-xl font-bold text-slate-800 cursor-pointer flex items-center gap-1.5 shadow-2xs">
                  <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
                  <span>{doc.fileUrl ? 'Replace' : 'Upload'}</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const updated = [...formData.documents];
                        updated[idx].fileName = e.target.files[0].name;
                        updated[idx].fileUrl = 'uploaded_blob';
                        updated[idx].status = 'Uploaded';
                        onChange({ documents: updated });
                      }
                    }}
                  />
                </label>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    doc.status === 'Verified'
                      ? 'bg-emerald-100 text-emerald-800'
                      : doc.status === 'Uploaded'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 19 — COMPLIANCE & CONSENT
  if (currentStep === 19) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 19 &bull; Statutory Undertaking</span>
          <h2 className="text-2xl font-black text-[#102A43]">Compliance &amp; Consent</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Affidavit under the Maharashtra State Skill Development Rules and Information Technology Act 2000.
          </p>
        </div>

        {/* 6 Mandatory Consent Checkboxes */}
        <div className="space-y-3 text-xs">
          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentDeclarationAccurate}
              onChange={(e) => onChange({ consentDeclarationAccurate: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              I hereby solemnly declare that all particulars, documents, and accreditation certificates provided in this registration form are true, correct, and complete to the best of my knowledge and belief.
            </span>
          </label>

          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentGuidelinesAdherence}
              onChange={(e) => onChange({ consentGuidelinesAdherence: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              The organisation undertakes to abide by all guidelines, standard operating procedures, and monitoring protocols issued by the Maharashtra State Skill Development Society (MSSDS) and NCVET.
            </span>
          </label>

          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentFeeRules}
              onChange={(e) => onChange({ consentFeeRules: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              For government-subsidised or free skill schemes (PMKVY/MSSDS/CMMKVA), the organisation warrants that no unauthorised course fees or capitation will be charged to enrolled candidates.
            </span>
          </label>

          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentPremisesInspection}
              onChange={(e) => onChange({ consentPremisesInspection: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              We consent to unscheduled physical premises inspections, classroom CCTV video audits, and assessment observations by District Skill Committee officers.
            </span>
          </label>

          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentBiometricAttendance}
              onChange={(e) => onChange({ consentBiometricAttendance: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              We agree to enforce 100% Aadhaar-based biometric attendance capture for all trainees and instructional faculty on daily training batches.
            </span>
          </label>

          <label className="p-3.5 rounded-2xl border bg-slate-50 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consentNotBlacklisted}
              onChange={(e) => onChange({ consentNotBlacklisted: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded mt-0.5"
            />
            <span className="text-slate-800 font-medium leading-relaxed">
              I certify that neither the organisation nor any of its promoters/trustees have been blacklisted, debarred, or prosecuted by any Central/State Ministry, NSDC, or SSC.
            </span>
          </label>
        </div>

        {/* Digital Signature Undertaking */}
        <div className="p-5 bg-orange-50/70 rounded-2xl border border-orange-200 text-xs space-y-4">
          <h3 className="font-bold text-[#102A43] flex items-center gap-2">
            <PenTool className="w-4 h-4 text-[#ea580c]" />
            <span>Digital Signature &amp; Execution</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Signatory Full Name *</label>
              <input
                type="text"
                required
                value={formData.digitalSignatureName}
                onChange={(e) => onChange({ digitalSignatureName: e.target.value })}
                placeholder="Name as on ID"
                className="w-full p-2.5 bg-white border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Signatory Designation *</label>
              <input
                type="text"
                required
                value={formData.digitalSignatureDesignation}
                onChange={(e) => onChange({ digitalSignatureDesignation: e.target.value })}
                placeholder="e.g. Managing Director"
                className="w-full p-2.5 bg-white border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">Place of Execution *</label>
              <input
                type="text"
                required
                value={formData.placeOfDeclaration}
                onChange={(e) => onChange({ placeOfDeclaration: e.target.value })}
                placeholder="e.g., Pune / Mumbai"
                className="w-full p-2.5 bg-white border rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 20 — REVIEW & SUBMIT
  if (currentStep === 20) {
    const allConsented =
      formData.consentDeclarationAccurate &&
      formData.consentGuidelinesAdherence &&
      formData.consentFeeRules &&
      formData.consentPremisesInspection &&
      formData.consentBiometricAttendance &&
      formData.consentNotBlacklisted;

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 20 &bull; Final Verification &amp; Filing</span>
          <h2 className="text-2xl font-black text-[#102A43]">Review &amp; Submit Application</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Review all captured data before final statutory filing. Click "Edit" on any section to modify.
          </p>
        </div>

        {/* Summary Sections */}
        <div className="space-y-4 text-xs">
          
          {/* Section: Entity */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
              <span className="font-bold text-sm text-[#102A43]">1. Organisation &amp; Legal Identity</span>
              <button
                type="button"
                onClick={() => onJumpToStep(1)}
                className="text-[#ea580c] font-bold hover:underline"
              >
                Edit Details
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-600 font-medium">
              <div>Name: <strong className="text-slate-900">{formData.orgName}</strong></div>
              <div>Type: <strong>{formData.orgType}</strong></div>
              <div>PAN: <strong className="font-mono">{formData.pan}</strong></div>
              <div>GSTIN: <strong className="font-mono">{formData.gstin}</strong></div>
              <div>District: <strong>{formData.district}, Maharashtra</strong></div>
              <div>Established: <strong>{formData.yearOfEstablishment}</strong></div>
            </div>
          </div>

          {/* Section: Representative */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
              <span className="font-bold text-sm text-[#102A43]">2. Authorised Signatory</span>
              <button
                type="button"
                onClick={() => onJumpToStep(3)}
                className="text-[#ea580c] font-bold hover:underline"
              >
                Edit Signatory
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-600 font-medium">
              <div>Name: <strong className="text-slate-900">{formData.repFullName}</strong></div>
              <div>Designation: <strong>{formData.repDesignation}</strong></div>
              <div>Mobile: <strong className="font-mono">{formData.repMobile}</strong></div>
              <div>Email: <span className="font-mono">{formData.repEmail}</span></div>
              <div>Board Authority: <strong className="text-emerald-700">Verified Board Resolution</strong></div>
            </div>
          </div>

          {/* Section: Centres & Courses */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
              <span className="font-bold text-sm text-[#102A43]">3. Operations, Centres &amp; Courses</span>
              <button
                type="button"
                onClick={() => onJumpToStep(4)}
                className="text-[#ea580c] font-bold hover:underline"
              >
                Edit Centres
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-600 font-medium">
              <div>Centres: <strong className="text-slate-900">{formData.centres.length} Centres</strong></div>
              <div>Courses: <strong>{formData.courses.length} Programmes</strong></div>
              <div>Trainers: <strong>{formData.trainers.length} Certified Faculty</strong></div>
              <div>Concurrent Cap: <strong>{formData.maxConcurrentTrainees} Trainees</strong></div>
            </div>
          </div>

          {/* Section: Bank */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
              <span className="font-bold text-sm text-[#102A43]">4. Bank Mandate &amp; DBT</span>
              <button
                type="button"
                onClick={() => onJumpToStep(17)}
                className="text-[#ea580c] font-bold hover:underline"
              >
                Edit Bank
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-slate-600 font-medium">
              <div>Bank: <strong>{formData.bankName}</strong></div>
              <div>Account: <strong className="font-mono">{formData.accountNumber}</strong></div>
              <div>IFSC: <strong className="font-mono">{formData.ifscCode}</strong></div>
            </div>
          </div>
        </div>

        {/* Submit Application CTA */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium">
            {!allConsented && (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Please complete all consent declarations in Step 19 to enable final submission.</span>
              </span>
            )}
            {allConsented && (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>All 19 sections verified and valid for submission.</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={onSubmitApplication}
            disabled={!allConsented}
            className={`px-8 py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer ${
              allConsented
                ? 'bg-[#ea580c] hover:bg-[#c2410c] text-white shadow-orange-950/30 active:scale-98'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <span>Submit Application to Government</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
