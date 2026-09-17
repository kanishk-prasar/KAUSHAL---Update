export type RegistrationStep =
  | 'entry'
  | 'wizard'
  | 'submitted'
  | 'correction'
  | 'government-review'
  | 'approved-dashboard';

export type WizardStepId =
  | 1  // Organisation Details
  | 2  // Legal & Registration
  | 3  // Authorised Representative
  | 4  // Training Centre Details
  | 5  // Capacity & Operations
  | 6  // Infrastructure & Facilities
  | 7  // Courses & Programmes
  | 8  // Curriculum & Assessment
  | 9  // Trainers / Faculty
  | 10 // Accreditation & Recognition
  | 11 // Training Experience
  | 12 // Placement & Employment Outcomes
  | 13 // Employer Partnerships
  | 14 // Apprenticeship & Self-Employment
  | 15 // Data & Technology Capability
  | 16 // Government Programme Association
  | 17 // Financial & Bank Details
  | 18 // Documents
  | 19 // Compliance & Consent
  | 20; // Review & Submit

export interface TrainingCentre {
  id: string;
  centreName: string;
  centreCode?: string;
  centreType: 'Permanent' | 'Temporary' | 'Mobile' | 'Community Centre' | 'Institutional Centre' | 'Other';
  addressLine1: string;
  addressLine2?: string;
  state: string;
  district: string;
  city: string;
  tehsil?: string;
  pinCode: string;
  latitude?: string;
  longitude?: string;
  managerName: string;
  managerDesignation: string;
  managerMobile: string;
  managerEmail: string;
  operationalStatus: 'Active' | 'Temporarily Closed' | 'Under Setup';
  maxTraineesPerBatch: number;
  maxConcurrentTrainees: number;
  classroomsCount: number;
  verificationStatus: 'Pending' | 'Verified' | 'Inspection Required';
}

export interface CourseModule {
  id: string;
  moduleNumber: number;
  moduleTitle: string;
  durationHours: number;
  description: string;
  skillsCovered: string[];
}

export interface TrainingCourse {
  id: string;
  courseName: string;
  courseCode?: string;
  sector: string;
  subSector?: string;
  jobRole: string;
  courseCategory?: 'Short-Term' | 'Long-Term' | 'Upskilling' | 'Reskilling' | 'Apprenticeship' | 'Bridge Course' | 'Other';
  durationHours: number;
  theoryHours?: number;
  practicalHours?: number;
  ojtHours?: number;
  nsqfLevel?: number | string;
  eligibilityCriteria?: string;
  targetBatchCapacity?: number;
  certificationType?: string;
  courseFeeType?: string;
  status?: string;
  curriculumAlignment?: string;
  internalAssessmentFrequency?: string;
  thirdPartyAssessmentAgency?: string;
  passCriteriaPercent?: number;
  trainingMode?: 'Offline' | 'Online' | 'Hybrid';
  qualificationRequired?: string;
  minAge?: number;
  maxAge?: number;
  targetBeneficiaryGroup?: string;
  learningObjectives?: string;
  learningOutcomes?: string;
  skillsCovered?: string[];
  modules?: CourseModule[];
  assessmentMethod?: string;
  passingCriteria?: string;
  certificateIssuingAuthority?: string;
}

export type CourseProgram = TrainingCourse;

export interface TrainerFaculty {
  id: string;
  fullName: string;
  trainerId?: string;
  email: string;
  mobile: string;
  highestQualification: string;
  specialisation: string;
  yearsOfExperience: number;
  industryExperienceYears?: number;
  teachingExperienceYears?: number;
  coursesAssigned?: string[];
  assignedCourses?: string[];
  assignedCentres?: string[];
  trainerCertification?: string;
  accreditationId?: string;
  status: 'Active' | 'Inactive' | 'Under Verification';
  resumeName?: string;
}

export interface LabEquipment {
  id: string;
  labName: string;
  labType: string;
  capacity: number;
  workstations: number;
  equipmentList: {
    name: string;
    quantity: number;
    condition: 'Operational' | 'Partially Operational' | 'Under Maintenance' | 'Non-Operational';
    lastMaintenanceDate?: string;
  }[];
}

export interface AccreditationRecord {
  id: string;
  body: string;
  accreditationBody?: string;
  name?: string;
  number?: string;
  certificateNumber?: string;
  validFrom?: string;
  validTo?: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'Active' | 'Expired' | 'Under Renewal' | 'Under Review';
  certificateFile?: string;
}

export type Accreditation = AccreditationRecord;

export interface EmployerPartnerRecord {
  id: string;
  companyName?: string;
  employerName?: string;
  industry?: string;
  industrySector?: string;
  partnershipType: 'Placement' | 'Apprenticeship' | 'Internship' | 'Curriculum Support' | 'Industry Visit' | 'Assessment' | 'Hiring Partnership' | 'Other' | string;
  agreementType?: string;
  startDate?: string;
  endDate?: string;
  documentName?: string;
  contactPerson?: string;
  designation?: string;
  mobile?: string;
  email?: string;
  annualHiringCapacity?: number;
  mouDocument?: string;
}

export type EmployerPartner = EmployerPartnerRecord;

export interface GovtProgrammeRecord {
  id: string;
  programmeName: string;
  department: string;
  schemeCode: string;
  approvalNumber: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Completed' | 'Suspended' | 'Under Review' | 'Expired';
}

export interface UploadedDocRecord {
  id: string;
  documentType: string;
  documentNumber: string;
  issueDate?: string;
  expiryDate?: string;
  issuingAuthority?: string;
  fileName: string;
  fileUrl?: string;
  fileSizeMb: number;
  status: 'Uploaded' | 'Under Review' | 'Verified' | 'Rejected' | 'Correction Required' | string;
  reviewerRemark?: string;
  isMandatory?: boolean;
  mandatory?: boolean;
}

export type PartnerDocument = UploadedDocRecord;

export interface AuditLogEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
  previousValue?: string;
  newValue?: string;
  reason?: string;
  ipAddress?: string;
}

export interface CorrectionItem {
  id: string;
  field: string;
  currentValue: string;
  reviewerComment: string;
  correctionType: 'document' | 'field';
  status: 'Pending Action' | 'Resubmitted' | 'Resolved';
}

export interface TrainingPartnerFormData {
  // Application Meta
  applicationId: string;
  status: 'Draft' | 'Under Government Verification' | 'Correction Required' | 'Approved' | 'Rejected';
  lastSaved: string;

  // Step 01: Organisation Details
  orgName: string;
  orgShortName: string;
  orgType: string;
  otherOrgType?: string;
  yearOfEstablishment: string;
  officialWebsite: string;
  officialEmail: string;
  officialMobile: string;
  altMobile: string;
  registeredAddressLine1: string;
  registeredAddressLine2: string;
  state: string;
  district: string;
  cityTown: string;
  blockTehsil: string;
  pinCode: string;
  headOfficeLat: string;
  headOfficeLng: string;

  // Step 02: Legal & Registration
  legalEntityType: string;
  registrationNumber: string;
  registrationDate: string;
  issuingAuthority: string;
  pan: string;
  gstin: string;
  cin: string;
  llpin: string;
  udyamNumber: string;
  darpanId: string;
  otherGovtReg: string;

  // Step 03: Authorised Representative
  repFullName: string;
  repDesignation: string;
  repDepartment: string;
  repEmail: string;
  repMobile: string;
  repAltNumber: string;
  repIdType: string;
  repIdNumber: string;
  repIdDocName?: string;
  isAuthorisedToRegister: 'Yes' | 'No' | '';
  authorisationLetterDoc?: string;
  authorisationRefNumber?: string;

  // Step 04: Training Centres
  centres: TrainingCentre[];

  // Step 05: Capacity & Operations (Overall)
  maxTraineesPerBatch: number;
  maxConcurrentTrainees: number;
  avgBatchSize: number;
  numberOfClassrooms: number;
  batchesPerYear: number;
  trainingHoursPerDay: number;
  trainingDaysPerWeek: number;
  operatingHours: string;
  trainingMode: 'Offline' | 'Online' | 'Hybrid';
  operationalDays: string[];

  // Step 06: Infrastructure & Facilities
  classroomFacilities: string[];
  accessibilityFacilities: string[];
  safetyFacilities: string[];
  labs: LabEquipment[];

  // Step 07: Courses
  courses: TrainingCourse[];

  // Step 08: Curriculum & Assessment (General policy)
  assessmentMethod: string;
  assessmentFrequency: string;
  passingCriteriaPercentage: number;
  isReassessmentAvailable: 'Yes' | 'No';
  maxReassessmentAttempts: number;
  assessmentAuthority: string;
  certificateIssuingAuthority: string;
  certificateType: string;
  certificateValidityYears: string;
  isDigitalCertificateAvailable: 'Yes' | 'No';
  certificateVerificationMethod: string;
  certificateTemplateName?: string;

  // Step 09: Trainers
  trainers: TrainerFaculty[];
  overallTrainerRatio: string;
  practicalTrainerRatio: string;

  // Step 10: Accreditation
  accreditations: AccreditationRecord[];
  recognitionName?: string;
  recognitionAuthority?: string;
  recognitionYear?: string;

  // Step 11: Training Experience
  yearsOfExperience: number;
  totalTraineesTrainedHistorically: number;
  totalCoursesDelivered: number;
  totalCentresOperated: number;
  majorProgrammesSummary: string;
  historicalEnrolled: number;
  historicalCompleted: number;
  historicalCertified: number;
  historicalPlaced: number;
  historicalSelfEmployed: number;
  historicalApprenticeship: number;
  historicalCurrentlyEmployed: number;
  historicalNoLongerEmployed: number;

  // Step 12: Outcomes & Follow-up
  conductsPostTrainingFollowUp: 'Yes' | 'No';
  followUpMethods: string[];
  followUpPeriod: string;
  avgMonthlySalary?: number;
  retention3Month?: number;
  retention6Month?: number;
  retention12Month?: number;

  // Step 13: Employer Partnerships
  hasEmployerPartnerships: 'Yes' | 'No';
  employerPartnerships: EmployerPartnerRecord[];
  employerPartners: EmployerPartnerRecord[];
  hasDedicatedPlacementCell: 'Yes' | 'No';
  placementOfficerName?: string;
  placementOfficerContact?: string;
  connectedEmployersCount?: number;
  jobOpportunitiesGeneratedLastYear?: number;
  placementDrivesConducted?: number;
  avgPlacementTimeDays?: number;

  // Step 14: Apprenticeship & Self-Employment
  supportsSelfEmployment: 'Yes' | 'No';
  selfEmploymentSupportTypes: string[];
  selfEmploymentDetails?: string;
  facilitatesApprenticeships: 'Yes' | 'No';
  apprenticeshipSectors?: string;
  apprenticeshipStipendRange?: string;
  apprenticeshipsCount?: number;
  apprenticeshipConversionRate?: string;

  // Step 15: Data & Tech Capability
  maintainsDigitalTraineeRecords: 'Yes' | 'No';
  existingMisErpName?: string;
  hasApiAvailable: 'Yes' | 'No';
  apiType?: string;
  integrationContact?: string;
  hasBulkUploadCapability: 'Yes' | 'No';
  hasDigitalAttendance: 'Yes' | 'No';
  hasDigitalAssessment: 'Yes' | 'No';
  internetAvailability: 'Reliable' | 'Moderate' | 'Limited';

  // Step 16: Government Programmes
  hasGovtProgrammeAssociation: 'Yes' | 'No';
  govtProgrammes: GovtProgrammeRecord[];
  associatedGovtSchemes: string[];

  // Step 17: Bank & Financial
  accountHolderName: string;
  bankName: string;
  branch: string;
  branchName?: string;
  accountNumber: string;
  confirmAccountNumber?: string;
  ifsc: string;
  ifscCode?: string;
  accountType: 'Current' | 'Savings' | 'Escrow' | 'Current Account' | 'Dedicated Escrow Account';
  cancelledChequeDocName?: string;
  turnoverYear1?: number;
  turnoverYear2?: number;
  turnoverYear3?: number;
  netWorth?: number;

  // Step 18: Documents
  documents: UploadedDocRecord[];

  // Step 19: Compliance & Consent
  confirmAccurate: boolean;
  confirmAuthority: boolean;
  confirmGenuineDocs: boolean;
  agreeGovtVerification: boolean;
  agreeMaintainRecords: boolean;
  agreeReportOutcomes: boolean;
  agreeUpdateInfo: boolean;
  agreePrivacyData: boolean;
  agreeRevocationTerms: boolean;
  dataProcessingConsent: boolean;
  consentDeclarationAccurate: boolean;
  consentGuidelinesAdherence: boolean;
  consentFeeRules: boolean;
  consentPremisesInspection: boolean;
  consentBiometricAttendance: boolean;
  consentNotBlacklisted: boolean;
  digitalSignatureName: string;
  digitalSignatureDesignation: string;
  placeOfDeclaration: string;

  // Audit
  auditLogs: AuditLogEntry[];
  corrections: CorrectionItem[];
}
