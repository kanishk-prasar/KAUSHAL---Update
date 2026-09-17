import React from 'react';
import {
  Building2,
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { TrainingPartnerFormData, CourseProgram, TrainerFaculty, Accreditation } from './types';

interface StepFormsPart2Props {
  currentStep: number;
  formData: TrainingPartnerFormData;
  onChange: (updates: Partial<TrainingPartnerFormData>) => void;
  onAddCourse: (course: CourseProgram) => void;
  onRemoveCourse: (id: string) => void;
  onAddTrainer: (trainer: TrainerFaculty) => void;
  onRemoveTrainer: (id: string) => void;
  onAddAccreditation: (acc: Accreditation) => void;
  onRemoveAccreditation: (id: string) => void;
}

export const StepFormsPart2: React.FC<StepFormsPart2Props> = ({
  currentStep,
  formData,
  onChange,
  onAddCourse,
  onRemoveCourse,
  onAddTrainer,
  onRemoveTrainer,
  onAddAccreditation,
  onRemoveAccreditation,
}) => {
  // STEP 06 — INFRASTRUCTURE & FACILITIES
  if (currentStep === 6) {
    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 06 &bull; Physical Verification Criteria</span>
          <h2 className="text-2xl font-black text-[#102A43]">Infrastructure &amp; Facilities</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Physical parameters subject to District Skill Committee (DSC) geo-tagged premises audit.
          </p>
        </div>

        {/* Carpet Area Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Total Carpet Area (sq ft) *</label>
            <input
              type="number"
              required
              value={formData.totalCarpetAreaSqFt}
              onChange={(e) => onChange({ totalCarpetAreaSqFt: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Classroom Area (sq ft) *</label>
            <input
              type="number"
              required
              value={formData.classroomAreaSqFt}
              onChange={(e) => onChange({ classroomAreaSqFt: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Practical Lab Area (sq ft) *</label>
            <input
              type="number"
              required
              value={formData.practicalLabAreaSqFt}
              onChange={(e) => onChange({ practicalLabAreaSqFt: Number(e.target.value) })}
              className="w-full p-3 border rounded-xl font-mono font-bold"
            />
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="pt-4 border-t border-slate-200">
          <h3 className="text-sm font-bold text-[#102A43] mb-3">Facility Checklist &amp; Statutory Compliance</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            
            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">Biometric Attendance Facility *</label>
              <select
                value={formData.biometricAttendance ? 'Yes' : 'No'}
                onChange={(e) => onChange({ biometricAttendance: e.target.value === 'Yes' })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="Yes">Yes (Aadhaar AEBAS Compliant)</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">Power Backup Available *</label>
              <select
                value={formData.powerBackup ? 'Yes' : 'No'}
                onChange={(e) => onChange({ powerBackup: e.target.value === 'Yes' })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="Yes">Yes (Dedicated Generator / UPS)</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">CCTV Surveillance with IP Stream *</label>
              <select
                value={formData.cctvMonitoring ? 'Yes' : 'No'}
                onChange={(e) => onChange({ cctvMonitoring: e.target.value === 'Yes' })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="Yes">Yes (30-day recording backup)</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">Internet Connectivity Speed *</label>
              <input
                type="text"
                value={formData.internetSpeed}
                onChange={(e) => onChange({ internetSpeed: e.target.value })}
                placeholder="e.g., 100 Mbps Dedicated Fiber"
                className="w-full p-2 border rounded-lg bg-white"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">Fire Safety Certificate Available *</label>
              <select
                value={formData.fireSafety ? 'Yes' : 'No'}
                onChange={(e) => onChange({ fireSafety: e.target.value === 'Yes' })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="Yes">Yes (NOC Issued by Municipal Corp)</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border space-y-2">
              <label className="font-bold text-slate-800 block">First Aid &amp; Medical Room *</label>
              <select
                value={formData.firstAidFacility ? 'Yes' : 'No'}
                onChange={(e) => onChange({ firstAidFacility: e.target.value === 'Yes' })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // STEP 07 — COURSES & PROGRAMMES
  if (currentStep === 7) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 07 &bull; Curriculum Catalogue</span>
            <h2 className="text-2xl font-black text-[#102A43]">Courses &amp; Programmes</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Add NSQF-aligned job role courses offered across your centres.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newCourse: CourseProgram = {
                id: `course-${Date.now()}`,
                courseName: 'Smart Agriculture Drone Pilot',
                courseCode: `KC-AGRI-00${formData.courses.length + 1}`,
                sector: 'Agriculture & Aerospace',
                jobRole: 'Remote Pilot & Spraying Technician',
                nsqfLevel: 'NSQF Level 4',
                durationHours: 240,
                theoryHours: 80,
                practicalHours: 120,
                ojtHours: 40,
                eligibilityCriteria: '12th Pass or ITI in Electronics',
                targetBatchCapacity: 30,
                certificationType: 'Government (NCVET / DGCA)',
                courseFeeType: 'Government Funded',
                status: 'Proposed',
                curriculumAlignment: 'NSQF Aligned',
                learningObjectives: 'Operate precision agricultural drones, navigate autonomous flight paths, and handle battery telemetry.',
                skillsCovered: ['Drone Flight Control', 'Battery Safety', 'Sensor Calibration', 'GIS Mapping'],
                internalAssessmentFrequency: 'Weekly quizzes and module lab tests',
                thirdPartyAssessmentAgency: 'Aerospace & Aviation Sector Skill Council',
                passCriteriaPercent: 70,
              };
              onAddCourse(newCourse);
            }}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Course</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.courses.map((crs, idx) => (
            <div key={crs.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#102A43]">{crs.courseName}</span>
                  <span className="font-mono text-[11px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">
                    {crs.courseCode}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-orange-100 text-[#ea580c] font-bold">
                    {crs.nsqfLevel}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveCourse(crs.id)}
                    className="text-red-600 hover:text-red-800 font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-slate-600 pt-1 font-medium">
                <div>Sector: <strong>{crs.sector}</strong></div>
                <div>Job Role: <strong>{crs.jobRole}</strong></div>
                <div>Total Hours: <strong className="font-mono text-slate-900">{crs.durationHours} hrs</strong></div>
                <div>Fee: <strong>{crs.courseFeeType}</strong></div>
              </div>

              <div className="text-slate-500 text-[11px] pt-1">
                Hours breakdown: {crs.theoryHours}h Theory + {crs.practicalHours}h Lab + {crs.ojtHours}h On-Job Training
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 08 — CURRICULUM & ASSESSMENT
  if (currentStep === 8) {
    const selectedCourse = formData.courses[0];

    return (
      <div className="space-y-6">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 08 &bull; Pedagogy &amp; Evaluation</span>
          <h2 className="text-2xl font-black text-[#102A43]">Curriculum &amp; Assessment</h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Define syllabus alignment, practical/OJT ratio, internal evaluation and third-party assessment agencies.
          </p>
        </div>

        {selectedCourse && (
          <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 text-xs">
            <span className="font-bold text-[#ea580c] uppercase text-[10px] tracking-wider block">Primary Programme Evaluated</span>
            <strong className="text-sm text-[#102A43]">{selectedCourse.courseName}</strong> ({selectedCourse.nsqfLevel})
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="font-bold text-slate-800 block mb-1">Curriculum Alignment *</label>
            <select
              value={formData.courses[0]?.curriculumAlignment || 'NSQF Aligned'}
              onChange={(e) => {
                const updated = [...formData.courses];
                if (updated[0]) updated[0].curriculumAlignment = e.target.value as any;
                onChange({ courses: updated });
              }}
              className="w-full p-3 border rounded-xl bg-white font-medium"
            >
              <option value="NSQF Aligned">NSQF Aligned (National Qualifications)</option>
              <option value="Model Curriculum">Model Curriculum (SSC Approved)</option>
              <option value="Industry Designed">Industry Designed (MoU Backed)</option>
              <option value="Custom">Custom State Curriculum</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Third-Party Assessment Agency *</label>
            <input
              type="text"
              required
              value={formData.courses[0]?.thirdPartyAssessmentAgency || ''}
              onChange={(e) => {
                const updated = [...formData.courses];
                if (updated[0]) updated[0].thirdPartyAssessmentAgency = e.target.value;
                onChange({ courses: updated });
              }}
              placeholder="e.g., Automotive Skills Development Council (ASDC)"
              className="w-full p-3 border rounded-xl font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Minimum Pass Percentage *</label>
            <input
              type="number"
              min={50}
              max={100}
              value={formData.courses[0]?.passCriteriaPercent || 70}
              onChange={(e) => {
                const updated = [...formData.courses];
                if (updated[0]) updated[0].passCriteriaPercent = Number(e.target.value);
                onChange({ courses: updated });
              }}
              className="w-full p-3 border rounded-xl font-bold font-mono"
            />
          </div>

          <div>
            <label className="font-bold text-slate-800 block mb-1">Internal Assessment Frequency *</label>
            <input
              type="text"
              value={formData.courses[0]?.internalAssessmentFrequency || ''}
              onChange={(e) => {
                const updated = [...formData.courses];
                if (updated[0]) updated[0].internalAssessmentFrequency = e.target.value;
                onChange({ courses: updated });
              }}
              placeholder="e.g., Bi-weekly module quizzes &amp; practical viva"
              className="w-full p-3 border rounded-xl font-medium"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-bold text-slate-800 block mb-1">Key Learning Objectives &amp; Practical Competencies</label>
            <textarea
              rows={3}
              value={formData.courses[0]?.learningObjectives || ''}
              onChange={(e) => {
                const updated = [...formData.courses];
                if (updated[0]) updated[0].learningObjectives = e.target.value;
                onChange({ courses: updated });
              }}
              placeholder="Describe practical tasks the student must independently execute upon course completion..."
              className="w-full p-3 border rounded-xl outline-hidden focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>
    );
  }

  // STEP 09 — TRAINERS / FACULTY
  if (currentStep === 9) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 09 &bull; Instructional Staff</span>
            <h2 className="text-2xl font-black text-[#102A43]">Trainers / Faculty</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              Registered instructors delivering theory &amp; practical classes. TOT certification is prioritized.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newTr: TrainerFaculty = {
                id: `trainer-${Date.now()}`,
                fullName: 'Dr. Rahul S. Patwardhan',
                trainerId: `TR-MH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                highestQualification: 'M.Tech (Robotics)',
                yearsOfExperience: 9,
                specialisation: 'Industrial Automation & Mechatronics',
                trainerCertification: 'SSC Certified Master Trainer (TOT-ASDC-2024-819)',
                status: 'Active',
                mobile: '9822188291',
                email: 'rahul.patwardhan@abcskills.org.in',
                assignedCentres: ['KTP-MH-C001'],
                assignedCourses: ['KC-EV-001'],
              };
              onAddTrainer(newTr);
            }}
            className="bg-[#0B3C5D] hover:bg-[#102A43] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Trainer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.trainers.map((tr) => (
            <div key={tr.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-[#102A43]">{tr.fullName}</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">
                  {tr.status}
                </span>
              </div>
              <div className="text-slate-500 font-mono text-[11px]">{tr.trainerId}</div>
              <div className="space-y-1 text-slate-700 font-medium">
                <div>Qualification: <strong>{tr.highestQualification}</strong> ({tr.yearsOfExperience} yrs exp)</div>
                <div>Specialisation: <strong>{tr.specialisation}</strong></div>
                <div className="text-emerald-700 font-semibold">{tr.trainerCertification}</div>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => onRemoveTrainer(tr.id)}
                  className="text-red-600 hover:text-red-800 font-bold text-[11px]"
                >
                  Remove Trainer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // STEP 10 — ACCREDITATION & RECOGNITION
  if (currentStep === 10) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">Step 10 &bull; Regulatory Accreditations</span>
            <h2 className="text-2xl font-black text-[#102A43]">Accreditation &amp; Recognition</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              National and state affiliations (NCVET, NSDC, SSC, MSSDS, DGT, ISO).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const newAcc: Accreditation = {
                id: `acc-${Date.now()}`,
                body: 'MSSDS (Maharashtra State Skill Development Society)',
                certificateNumber: `MSSDS-TP-MH-2024-${Math.floor(100 + Math.random() * 900)}`,
                validFrom: '2024-04-01',
                validTo: '2027-03-31',
                status: 'Active',
              };
              onAddAccreditation(newAcc);
            }}
            className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Accreditation</span>
          </button>
        </div>

        <div className="space-y-3">
          {formData.accreditations.map((acc) => (
            <div key={acc.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-sm text-[#102A43] block">{acc.body}</span>
                <span className="font-mono text-slate-600 text-[11px]">Ref: {acc.certificateNumber}</span>
                <span className="block text-slate-500 mt-0.5">Valid: {acc.validFrom} to {acc.validTo}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase text-[10px]">
                  {acc.status}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveAccreditation(acc.id)}
                  className="text-red-600 hover:text-red-800 font-bold text-[11px]"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
