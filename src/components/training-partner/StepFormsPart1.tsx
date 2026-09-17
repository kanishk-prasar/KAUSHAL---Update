import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  FileCheck,
  UserCheck,
  Layers,
  Clock,
  Plus,
  Trash2,
  HelpCircle,
  AlertCircle,
  Eye,
  Lock,
  Navigation,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TrainingPartnerFormData, TrainingCentre } from './types';
import { MAHARASHTRA_DISTRICTS } from './maharashtraDistricts';
import { LocationPicker } from './LocationPicker';

interface StepFormsPart1Props {
  currentStep: number;
  formData: TrainingPartnerFormData;
  onChange: (updates: Partial<TrainingPartnerFormData>) => void;
  onAddCentre: (centre: TrainingCentre) => void;
  onRemoveCentre: (id: string) => void;
}

export const StepFormsPart1: React.FC<StepFormsPart1Props> = ({
  currentStep,
  formData,
  onChange,
  onAddCentre,
  onRemoveCentre,
}) => {
  const [expandedCentreId, setExpandedCentreId] = useState<string | null>(null);

  // STEP 01 — ORGANISATION DETAILS
  if (currentStep === 1) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 01 &bull; Entity Foundation</span>
          <h2 className="text-2xl font-black text-[#102A43]">Organisation Details</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Enter the registered details of the training partner / vocational training institute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Org Name */}
          <div className="md:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">
              Organisation / Training Partner Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.orgName}
              onChange={(e) => onChange({ orgName: e.target.value })}
              placeholder="e.g., ABC Skill Development & Vocational Institute Pvt Ltd"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-orange-500 font-medium"
            />
          </div>

          {/* Org Short Name */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Organisation Short Name <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.orgShortName}
              onChange={(e) => onChange({ orgShortName: e.target.value })}
              placeholder="e.g., ABC Skills"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* Org Type */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Organisation Type <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.orgType}
              onChange={(e) => onChange({ orgType: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white font-medium"
            >
              <option value="">Select Organisation Type</option>
              <option value="Private Training Provider">Private Training Provider</option>
              <option value="Government Training Institution">Government Training Institution</option>
              <option value="NGO / Non-Profit">NGO / Non-Profit</option>
              <option value="Educational Institution">Educational Institution</option>
              <option value="University / College">University / College</option>
              <option value="Industry / Corporate Training Centre">Industry / Corporate Training Centre</option>
              <option value="Apprenticeship Training Organisation">Apprenticeship Training Organisation</option>
              <option value="Community Training Centre">Community Training Centre</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.orgType === 'Other' && (
            <div className="md:col-span-2">
              <label className="font-bold text-slate-800 block mb-1">
                Specify Organisation Type <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.otherOrgType || ''}
                onChange={(e) => onChange({ otherOrgType: e.target.value })}
                placeholder="Specify your organisation category"
                className="w-full p-3 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          )}

          {/* Year of Establishment */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Year of Establishment <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              min={1950}
              max={2026}
              required
              value={formData.yearOfEstablishment}
              onChange={(e) => onChange({ yearOfEstablishment: e.target.value })}
              placeholder="e.g., 2016"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* Official Website */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Official Website <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="url"
              value={formData.officialWebsite}
              onChange={(e) => onChange({ officialWebsite: e.target.value })}
              placeholder="https://www.example.org"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* Official Email */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Official Email ID <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.officialEmail}
              onChange={(e) => onChange({ officialEmail: e.target.value })}
              placeholder="admin@organisation.org"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* Official Mobile */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Official Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={formData.officialMobile}
              onChange={(e) => onChange({ officialMobile: e.target.value })}
              placeholder="10-digit mobile number"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium font-mono"
            />
          </div>

          {/* Alternate Contact */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Alternate Contact Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              value={formData.altMobile}
              onChange={(e) => onChange({ altMobile: e.target.value })}
              placeholder="Landline with STD code or secondary mobile"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium font-mono"
            />
          </div>
        </div>

        {/* Registered Office Address */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-600" />
            <span>Registered Office Address *</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Address Line 1 *</label>
              <input
                type="text"
                required
                value={formData.registeredAddressLine1}
                onChange={(e) => onChange({ registeredAddressLine1: e.target.value })}
                placeholder="Plot/Building Number, Industrial Estate / Road"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-bold text-slate-700 block mb-1">Address Line 2 (Optional)</label>
              <input
                type="text"
                value={formData.registeredAddressLine2}
                onChange={(e) => onChange({ registeredAddressLine2: e.target.value })}
                placeholder="Landmark, Area"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">State *</label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  disabled
                  value={formData.state || 'Maharashtra'}
                  className="w-full p-3 border border-slate-300 rounded-xl bg-slate-100 text-slate-800 font-bold cursor-not-allowed select-none pl-3 pr-10"
                />
                <div className="absolute right-3 top-3.5 text-xs text-slate-400 font-medium flex items-center gap-1 pointer-events-none">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">District *</label>
              <select
                required
                value={formData.district}
                onChange={(e) => onChange({ district: e.target.value })}
                className="w-full p-3 border border-slate-300 rounded-xl bg-white text-slate-800 font-medium focus:outline-none focus:border-[#0f2e5a] focus:ring-1 focus:ring-[#0f2e5a] cursor-pointer"
              >
                <option value="">-- Select District --</option>
                {MAHARASHTRA_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">City / Town *</label>
              <input
                type="text"
                required
                value={formData.cityTown}
                onChange={(e) => onChange({ cityTown: e.target.value })}
                placeholder="e.g., Pimpri-Chinchwad"
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">PIN Code *</label>
              <input
                type="text"
                maxLength={6}
                required
                value={formData.pinCode}
                onChange={(e) => onChange({ pinCode: e.target.value })}
                placeholder="6-digit PIN code"
                className="w-full p-3 border rounded-xl font-mono"
              />
            </div>
          </div>

          {/* Location Coordinates & Map with Geolocation API */}
          <LocationPicker
            latitude={formData.headOfficeLat}
            longitude={formData.headOfficeLng}
            onLocationChange={(lat, lng, geocodedData) => {
              const updates: Partial<TrainingPartnerFormData> = {
                headOfficeLat: lat,
                headOfficeLng: lng,
              };
              if (geocodedData) {
                if (geocodedData.addressLine1 && !formData.registeredAddressLine1) {
                  updates.registeredAddressLine1 = geocodedData.addressLine1;
                }
                if (geocodedData.city && !formData.cityTown) {
                  updates.cityTown = geocodedData.city;
                }
                if (geocodedData.district && !formData.district) {
                  const match = MAHARASHTRA_DISTRICTS.find(
                    (d) => d.toLowerCase() === geocodedData.district?.toLowerCase()
                  );
                  if (match) updates.district = match;
                }
                if (geocodedData.pinCode && !formData.pinCode) {
                  updates.pinCode = geocodedData.pinCode;
                }
              }
              onChange(updates);
            }}
            label="Head Office Geo-Location & Coordinates"
            description="Use your device GPS or interactive map to mark your Training Partner registered office location."
            defaultDistrict={formData.district || 'Pune'}
          />
        </div>
      </div>
    );
  }

  // STEP 02 — LEGAL & REGISTRATION DETAILS
  if (currentStep === 2) {
    const isPvtLtd = formData.legalEntityType === 'Private Limited Company' || formData.legalEntityType === 'Public Limited Company';
    const isLLP = formData.legalEntityType === 'LLP';
    const isNGO = formData.legalEntityType === 'Society' || formData.legalEntityType === 'Trust' || formData.legalEntityType === 'Section 8 Company';

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 02 &bull; Statutory Verification</span>
          <h2 className="text-2xl font-black text-[#102A43]">Legal &amp; Registration Details</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Enter statutory incorporation and tax registration credentials for NSDL / GSTN cross-checks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Legal Entity Type */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Legal Entity Type <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.legalEntityType}
              onChange={(e) => onChange({ legalEntityType: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl bg-white font-medium"
            >
              <option value="">Select Entity Type</option>
              <option value="Proprietorship">Proprietorship</option>
              <option value="Partnership">Partnership</option>
              <option value="LLP">LLP</option>
              <option value="Private Limited Company">Private Limited Company</option>
              <option value="Public Limited Company">Public Limited Company</option>
              <option value="Society">Society</option>
              <option value="Trust">Trust</option>
              <option value="Section 8 Company">Section 8 Company</option>
              <option value="Government Body">Government Body</option>
              <option value="Educational Institution">Educational Institution</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Registration Number */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Registration / Incorporation Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.registrationNumber}
              onChange={(e) => onChange({ registrationNumber: e.target.value })}
              placeholder="e.g., ROC-PUN-309182"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium font-mono"
            />
          </div>

          {/* Registration Date */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Registration Date <span className="text-red-600">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.registrationDate}
              onChange={(e) => onChange({ registrationDate: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* Issuing Authority */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Issuing Authority <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.issuingAuthority}
              onChange={(e) => onChange({ issuingAuthority: e.target.value })}
              placeholder="e.g., Registrar of Companies / Charity Commissioner"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          {/* PAN */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Permanent Account Number (PAN) <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              maxLength={10}
              required
              value={formData.pan}
              onChange={(e) => onChange({ pan: e.target.value.toUpperCase() })}
              placeholder="10-character PAN (e.g. AAACM4821K)"
              className="w-full p-3 border border-slate-300 rounded-xl font-bold font-mono uppercase"
            />
          </div>

          {/* GSTIN */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              GSTIN <span className="text-slate-400 font-normal">(Required if applicable)</span>
            </label>
            <input
              type="text"
              maxLength={15}
              value={formData.gstin}
              onChange={(e) => onChange({ gstin: e.target.value.toUpperCase() })}
              placeholder="15-character GSTIN (e.g. 27AAACM4821K1ZX)"
              className="w-full p-3 border border-slate-300 rounded-xl font-mono uppercase"
            />
          </div>

          {/* Conditional: CIN for Companies */}
          {isPvtLtd && (
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Corporate Identification Number (CIN) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                maxLength={21}
                required
                value={formData.cin}
                onChange={(e) => onChange({ cin: e.target.value.toUpperCase() })}
                placeholder="21-digit CIN (e.g., U80902MH2016PTC309182)"
                className="w-full p-3 border border-slate-300 rounded-xl font-mono uppercase"
              />
            </div>
          )}

          {/* Conditional: LLPIN for LLP */}
          {isLLP && (
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                LLPIN <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.llpin}
                onChange={(e) => onChange({ llpin: e.target.value.toUpperCase() })}
                placeholder="LLP Identification Number"
                className="w-full p-3 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          )}

          {/* Conditional: Darpan ID for NGOs */}
          {isNGO && (
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                NITI Aayog NGO Darpan ID <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.darpanId}
                onChange={(e) => onChange({ darpanId: e.target.value })}
                placeholder="MH/2021/029104"
                className="w-full p-3 border border-slate-300 rounded-xl font-mono"
              />
            </div>
          )}

          {/* Udyam */}
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              MSME Udyam Registration Number <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.udyamNumber}
              onChange={(e) => onChange({ udyamNumber: e.target.value })}
              placeholder="UDYAM-MH-XX-XXXXXXX"
              className="w-full p-3 border border-slate-300 rounded-xl font-mono"
            />
          </div>

          {/* Other Govt Reg */}
          <div className="md:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">
              Other Government Empanelment / Registration Details <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.otherGovtReg}
              onChange={(e) => onChange({ otherGovtReg: e.target.value })}
              placeholder="e.g., MSSDS Empanelled TP ID: MSSDS/TP/2019/148"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>
        </div>
      </div>
    );
  }

  // STEP 03 — AUTHORISED REPRESENTATIVE
  if (currentStep === 3) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 03 &bull; Delegated Authority</span>
          <h2 className="text-2xl font-black text-[#102A43]">Authorised Representative</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Details of the official authorised by the Board of Directors / Governing Body to bind the organisation on KAUSHAL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.repFullName}
              onChange={(e) => onChange({ repFullName: e.target.value })}
              placeholder="e.g., Suhas Manohar Kulkarni"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Designation *
            </label>
            <input
              type="text"
              required
              value={formData.repDesignation}
              onChange={(e) => onChange({ repDesignation: e.target.value })}
              placeholder="e.g., Managing Director / Director of Training"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Department (Optional)
            </label>
            <input
              type="text"
              value={formData.repDepartment}
              onChange={(e) => onChange({ repDepartment: e.target.value })}
              placeholder="e.g., Vocational Training Directorate"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Official Email *
            </label>
            <input
              type="email"
              required
              value={formData.repEmail}
              onChange={(e) => onChange({ repEmail: e.target.value })}
              placeholder="suhas.kulkarni@abcskills.org.in"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              maxLength={10}
              value={formData.repMobile}
              onChange={(e) => onChange({ repMobile: e.target.value })}
              placeholder="10-digit mobile number"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">
              Alternate Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.repAltNumber}
              onChange={(e) => onChange({ repAltNumber: e.target.value })}
              placeholder="Secondary contact"
              className="w-full p-3 border border-slate-300 rounded-xl font-medium font-mono"
            />
          </div>
        </div>

        {/* Identity Information */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-orange-600" />
            <span>Identity &amp; KYC Verification</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-800 block mb-1">Government ID Type *</label>
              <select
                value={formData.repIdType}
                onChange={(e) => onChange({ repIdType: e.target.value })}
                className="w-full p-3 border rounded-xl bg-white"
              >
                <option value="Aadhaar Card">Aadhaar Card</option>
                <option value="PAN Card">PAN Card</option>
                <option value="Passport">Passport</option>
                <option value="Voter ID">Voter ID</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-800 block mb-1">ID Document Number *</label>
              <input
                type="text"
                required
                value={formData.repIdNumber}
                onChange={(e) => onChange({ repIdNumber: e.target.value })}
                placeholder="e.g. XXXX-XXXX-8421"
                className="w-full p-3 border rounded-xl font-mono"
              />
            </div>
          </div>
        </div>

        {/* Authority Declaration */}
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200 space-y-3 text-xs">
          <label className="font-bold text-amber-950 block text-sm">
            Are you authorised to register this organisation on KAUSHAL? *
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="radio"
                name="isAuthorised"
                value="Yes"
                checked={formData.isAuthorisedToRegister === 'Yes'}
                onChange={() => onChange({ isAuthorisedToRegister: 'Yes' })}
                className="w-4 h-4 text-orange-600"
              />
              <span>Yes, authorised by Board Resolution / Power of Attorney</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="radio"
                name="isAuthorised"
                value="No"
                checked={formData.isAuthorisedToRegister === 'No'}
                onChange={() => onChange({ isAuthorisedToRegister: 'No' })}
                className="w-4 h-4 text-orange-600"
              />
              <span>No</span>
            </label>
          </div>

          {formData.isAuthorisedToRegister === 'No' && (
            <div className="p-3 bg-red-100 text-red-800 rounded-xl font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Only authorised representatives may submit registrations. You cannot proceed further without official authorisation.</span>
            </div>
          )}

          {formData.isAuthorisedToRegister === 'Yes' && (
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Authorisation Reference Number (Optional)</label>
                  <input
                    type="text"
                    value={formData.authorisationRefNumber || ''}
                    onChange={(e) => onChange({ authorisationRefNumber: e.target.value })}
                    placeholder="e.g., ABC/BOD/RES/2026/08"
                    className="w-full p-2.5 bg-white border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Authorisation Letter Upload *</label>
                  <div className="p-2.5 bg-white border border-dashed rounded-xl flex items-center justify-between">
                    <span className="font-mono text-emerald-700 font-bold truncate">
                      {formData.authorisationLetterDoc || 'board_resolution_letter.pdf'}
                    </span>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded font-bold">Attached</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // STEP 04 — TRAINING CENTRE DETAILS
  if (currentStep === 4) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 04 &bull; Multi-Centre Operations</span>
            <h2 className="text-2xl font-black text-[#102A43]">Training Centre Details</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              A Training Partner may operate multiple centres across Maharashtra. Each centre maintains its own verifiable premises profile.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newCentre: TrainingCentre = {
                id: `centre-${Date.now()}`,
                centreName: `New Training Centre #${formData.centres.length + 1}`,
                centreCode: `TC-MH-${Math.floor(100 + Math.random() * 900)}`,
                centreType: 'Permanent',
                addressLine1: 'MIDC Phase II',
                state: 'Maharashtra',
                district: 'Pune',
                city: 'Pune',
                pinCode: '411026',
                managerName: 'Centre In-Charge',
                managerDesignation: 'Manager',
                managerMobile: '9822000000',
                managerEmail: 'centre@training.org',
                operationalStatus: 'Active',
                maxTraineesPerBatch: 30,
                maxConcurrentTrainees: 120,
                classroomsCount: 4,
                verificationStatus: 'Pending',
              };
              onAddCentre(newCentre);
            }}
            className="bg-[#0B3C5D] hover:bg-[#102A43] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Training Centre</span>
          </button>
        </div>

        {/* Centre Summary Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Centre Name</th>
                <th className="p-3">District</th>
                <th className="p-3">Type</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verification</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {formData.centres.map((c) => (
                <React.Fragment key={c.id}>
                  <tr className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-[#102A43]">
                      {c.centreName}
                      <span className="block font-mono text-[10px] text-slate-400">{c.centreCode}</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={c.district}
                        onChange={(e) => {
                          const updatedCentres = formData.centres.map((item) =>
                            item.id === c.id ? { ...item, district: e.target.value, state: 'Maharashtra' } : item
                          );
                          onChange({ centres: updatedCentres });
                        }}
                        className="px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-medium text-slate-800 focus:outline-none focus:border-[#0f2e5a]"
                      >
                        {MAHARASHTRA_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <span className="block text-[10px] text-slate-500 font-medium mt-0.5">State: Maharashtra (Locked)</span>
                    </td>
                    <td className="p-3 text-slate-600">{c.centreType}</td>
                    <td className="p-3 font-semibold text-slate-800">{c.maxConcurrentTrainees} Concurrent</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                        {c.operationalStatus}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 font-bold text-[10px] border border-blue-200">
                        {c.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setExpandedCentreId(expandedCentreId === c.id ? null : c.id)}
                        className={`inline-flex items-center gap-1 font-bold text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer ${
                          c.latitude
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                            : 'bg-orange-50 border-orange-300 text-[#ea580c] hover:bg-orange-100'
                        }`}
                        title="Mark or view centre GPS location"
                      >
                        <MapPin className="w-3 h-3 text-[#ea580c]" />
                        <span>{c.latitude ? 'Location Tagged' : 'Mark Location'}</span>
                        {expandedCentreId === c.id ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveCentre(c.id)}
                        className="text-red-600 hover:text-red-800 font-bold text-[11px] cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>

                  {expandedCentreId === c.id && (
                    <tr className="bg-slate-50/90">
                      <td colSpan={7} className="p-4 border-t border-b border-slate-200">
                        <div className="max-w-3xl">
                          <LocationPicker
                            latitude={c.latitude}
                            longitude={c.longitude}
                            onLocationChange={(lat, lng, geocodedData) => {
                              const updatedCentres = formData.centres.map((item) =>
                                item.id === c.id
                                  ? {
                                      ...item,
                                      latitude: lat,
                                      longitude: lng,
                                      addressLine1: geocodedData?.addressLine1 || item.addressLine1,
                                      city: geocodedData?.city || item.city,
                                      district: geocodedData?.district || item.district,
                                      pinCode: geocodedData?.pinCode || item.pinCode,
                                    }
                                  : item
                              );
                              onChange({ centres: updatedCentres });
                            }}
                            label={`Centre Geo-Location: ${c.centreName}`}
                            description="Allow GPS permission or use interactive map to lock exact premises coordinates for this training centre."
                            defaultDistrict={c.district || 'Pune'}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // STEP 05 — CAPACITY & OPERATIONS
  if (currentStep === 5) {
    const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const toggleDay = (day: string) => {
      const exists = formData.operationalDays.includes(day);
      const updated = exists
        ? formData.operationalDays.filter((d) => d !== day)
        : [...formData.operationalDays, day];
      onChange({ operationalDays: updated });
    };

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 05 &bull; Operational Capacity</span>
          <h2 className="text-2xl font-black text-[#102A43]">Capacity &amp; Operations</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Define trainee throughput, batch sizing, operational days and instructional schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Maximum Trainees per Batch *</label>
            <input
              type="number"
              min={10}
              max={50}
              required
              value={formData.maxTraineesPerBatch}
              onChange={(e) => onChange({ maxTraineesPerBatch: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Maximum Concurrent Trainees *</label>
            <input
              type="number"
              min={20}
              required
              value={formData.maxConcurrentTrainees}
              onChange={(e) => onChange({ maxConcurrentTrainees: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Average Batch Size</label>
            <input
              type="number"
              value={formData.avgBatchSize}
              onChange={(e) => onChange({ avgBatchSize: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Number of Classrooms *</label>
            <input
              type="number"
              min={1}
              required
              value={formData.numberOfClassrooms}
              onChange={(e) => onChange({ numberOfClassrooms: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Batches per Year</label>
            <input
              type="number"
              value={formData.batchesPerYear}
              onChange={(e) => onChange({ batchesPerYear: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Training Hours per Day</label>
            <input
              type="number"
              min={4}
              max={10}
              value={formData.trainingHoursPerDay}
              onChange={(e) => onChange({ trainingHoursPerDay: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Training Mode *</label>
            <select
              value={formData.trainingMode}
              onChange={(e) => onChange({ trainingMode: e.target.value as any })}
              className="w-full p-3 border rounded-xl bg-white font-bold"
            >
              <option value="Offline">Offline (Classroom &amp; Lab)</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid (Blended Theory + Physical Labs)</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">Daily Operating Hours</label>
            <input
              type="text"
              value={formData.operatingHours}
              onChange={(e) => onChange({ operatingHours: e.target.value })}
              placeholder="e.g., 08:30 AM - 05:30 PM"
              className="w-full p-3 border rounded-xl"
            />
          </div>
        </div>

        {/* Operational Days Checkboxes */}
        <div className="pt-3 border-t border-slate-200">
          <label className="font-bold text-slate-800 text-xs block mb-2">Operational Days per Week</label>
          <div className="flex flex-wrap gap-2">
            {allDays.map((day) => {
              const checked = formData.operationalDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer border ${
                    checked
                      ? 'bg-[#0B3C5D] text-white border-[#0B3C5D]'
                      : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
