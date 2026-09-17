export type SectorType =
  | 'All'
  | 'Clean Energy & Solar'
  | 'EV & Automotive'
  | 'Advanced Manufacturing & CNC'
  | 'Healthcare & Caregiving'
  | 'Drone Tech & Robotics'
  | 'Artisan & Traditional Crafts'
  | 'Digital & IT Skills';

export interface CourseModule {
  id: string;
  title: string;
  duration: string;
  topics: string[];
  hasPracticalLab?: boolean;
}

export interface SkillCourse {
  id: string;
  title: string;
  hindiTitle: string;
  marathiTitle?: string;
  sector: SectorType;
  nsqfLevel: number; // e.g. 4, 5, 6
  durationWeeks: number;
  totalHours: number;
  practicalHours: number;
  deliveryMode: 'Industry Apprenticeship' | 'Hybrid Workshop' | 'ITI Campus' | 'Center of Excellence';
  provider: string;
  partnerCompany?: string;
  rating: number;
  enrolledCount: number;
  feeType: '100% Free / PMKVY Funded' | 'Stipend Provided' | 'Subsidized Fee';
  stipendAmount?: string;
  eligibility: string;
  description: string;
  modules: CourseModule[];
  careerOutcomes: {
    role: string;
    avgMonthlySalary: string;
    hiringDemand: 'High' | 'Very High' | 'Critical Shortage';
  }[];
  certificationBadge: string;
  image: string;
}

export interface JobListing {
  id: string;
  title: string;
  hindiTitle: string;
  marathiTitle?: string;
  company: string;
  companyLogo?: string;
  location: string;
  sector: SectorType;
  type: 'Apprenticeship (NAPS)' | 'Full-Time Employment' | 'Dual Training Intern';
  stipendOrSalary: string;
  nsqfRequired: number;
  requiredSkills: string[];
  vacancies: number;
  postedDaysAgo: number;
  isVerifiedPartner: boolean;
  benefits: string[];
  description: string;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  hindiQuestion: string;
  marathiQuestion?: string;
  domain: string;
  options: {
    text: string;
    hindiText: string;
    marathiText?: string;
    scoreWeight: Record<string, number>;
  }[];
}

export interface LearnerProfile {
  id: string;
  name: string;
  hindiName?: string;
  marathiName?: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  currentNSQF: number;
  kaushalScore: number;
  practicalHoursLogged: number;
  enrolledCourses: string[];
  completedCourses: string[];
  appliedJobs: string[];
  bookmarkedJobs: string[];
  badges: {
    id: string;
    title: string;
    issuedDate: string;
    sector: string;
    certificateNumber: string;
  }[];
}

export interface AdvisorRecommendation {
  courseId?: string;
  courseTitle?: string;
  nsqfLevel?: number;
  whyRecommended: string;
  estimatedTimeline: string;
  careerPath: string;
}

export interface SimulatorStep {
  id: number;
  instruction: string;
  hint: string;
  targetTool: string;
  targetComponent: string;
  correctReading?: string;
}

export interface PracticalLab {
  id: string;
  title: string;
  marathiTitle?: string;
  sector: string;
  objective: string;
  components: { id: string; name: string; status: 'normal' | 'faulty' | 'adjusted' }[];
  tools: { id: string; name: string; icon: string }[];
  steps: SimulatorStep[];
}

// ==========================================
// Longitudinal Outcomes & Impact Measurement Types
// ==========================================

export type ConsentScope =
  | 'epfo_lookup'
  | 'tracer_surveys'
  | 'employer_validation'
  | 'policy_research'
  | 'longitudinal_analytics';

export interface TraineeConsent {
  granted: boolean;
  consentDate: string;
  consentId: string;
  scopes: ConsentScope[];
  verificationMethod: 'Aadhaar e-KYC' | 'Digital Signature' | 'Signed Form (Biometric)';
  dpdpActComplianceHash: string;
}

export type EmploymentStatusType =
  | 'Formal Wage Employment'
  | 'Apprenticeship (NAPS)'
  | 'Self-Employment / Micro-enterprise'
  | 'Higher Education / Training'
  | 'Unemployed & Seeking'
  | 'Not Seeking / Inactive';

export type VerificationSource =
  | 'EPFO_UAN_VERIFIED'
  | 'UDYAM_GSTN_VERIFIED'
  | 'NAPS_CONTRACT_VERIFIED'
  | 'EMPLOYER_PAYSLIP_AUDITED'
  | 'SELF_REPORTED_PENDING';

export interface TracerFollowUp {
  id: string;
  milestone: 'Day-30' | 'Day-90' | 'Day-180' | 'Day-365';
  conductedDate: string;
  channel: 'Automated WhatsApp Bot' | 'Automated IVR' | 'Assisted Counselor Call' | 'In-Person Field Tracer';
  status: 'Completed' | 'Unreachable' | 'Rescheduled';
  isEmployed: boolean;
  monthlyWage: number;
  employerOrEnterprise: string;
  skillRelevanceScore: number; // 1 to 5
  jobSatisfactionScore: number; // 1 to 5
  attritionReason?: string;
  verifiedByCounselor?: string;
  notes?: string;
}

export interface TraineeLongitudinalRecord {
  id: string; // e.g. "TRN-MH-2024-8841"
  name: string;
  hindiName?: string;
  phone: string;
  email: string;
  gender: 'Female' | 'Male' | 'Non-Binary';
  age: number;
  socialCategory: 'SC' | 'ST' | 'OBC' | 'General' | 'EWS';
  isPwD: boolean;
  district: string;
  state: string;
  locationType: 'Rural' | 'Semi-Urban' | 'Urban';
  
  // Consent
  consent: TraineeConsent;

  // Training & Provider details
  providerId: string;
  providerName: string;
  centerType: 'Government ITI' | 'National Skill Training Institute (NSTI)' | 'Private Training Partner' | 'Industry Captive Center';
  courseId: string;
  courseName: string;
  sector: SectorType;
  nsqfLevel: number;
  batchId: string;
  enrollmentDate: string;
  completionDate: string;
  assessmentScore: number; // out of 100

  // Economic Baseline & Current Trajectory
  preTrainingMonthlyWage: number;
  initialPlacementWage: number;
  currentMonthlyWage: number;
  wageGrowthPercent: number; // e.g. +145%

  // Placement & Employment Signal
  employmentStatus: EmploymentStatusType;
  employerName?: string;
  employerCinOrGst?: string;
  employerVerified: boolean;
  verificationSource: VerificationSource;
  uanNumber?: string; // masked e.g. "1012****8821"
  pfContributionActive?: boolean;
  napsContractId?: string;
  udyamNumber?: string;
  selfEmploymentType?: string;
  mudraLoanAmount?: number;
  placementDate?: string;
  retentionMonths: number; // e.g. 12 months

  // Non-Placement or Attrition Root-Cause
  nonPlacementReason?: string;
  attritionReason?: string;
  skillGapReportedByEmployer?: string;

  // Longitudinal Follow-up timeline
  tracerLogs: TracerFollowUp[];
}

export interface ProviderScorecard {
  id: string;
  name: string;
  type: 'Government ITI' | 'National Skill Training Institute (NSTI)' | 'Private Training Partner' | 'Industry Captive Center';
  district: string;
  state: string;
  totalTrained: number;
  certifiedCount: number;
  verifiedPlacementRate: number; // %
  sixMonthRetentionRate: number; // %
  twelveMonthRetentionRate: number; // %
  epfoVerificationRate: number; // %
  medianWage: number;
  rating: 'A+ (Exemplary)' | 'A (Standard)' | 'B (Watchlist)' | 'C (Remedial Action Required)';
  identifiedDeficiencies: string[];
}

export interface RemedialActionPlan {
  id: string;
  targetType: 'Provider' | 'District' | 'Curriculum / Sector';
  targetName: string;
  sector: SectorType;
  problemSummary: string;
  rootCause: string;
  actionRequired: string;
  priority: 'Critical' | 'High' | 'Medium';
  status: 'Under Implementation' | 'Audited & Resolved' | 'Proposed';
  allocatedBudgetChange: string;
  impactTarget: string;
}

export interface SkillGapAnalysis {
  sector: SectorType;
  competencyArea: string;
  gapSeverity: 'Critical' | 'Moderate' | 'Emerging';
  percentEmployersReporting: number;
  trainingCurriculumDeficit: string;
  industryRecommendedTooling: string;
}

export type AppTab =
  | 'home'
  | 'outcomes'
  | 'courses'
  | 'jobs'
  | 'advisor'
  | 'simulator'
  | 'passport'
  | 'trainee'
  | 'partner'
  | 'companies'
  | 'employer-dashboard'
  | 'trainee-dashboard';

