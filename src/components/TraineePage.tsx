import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Building2,
  FileCheck,
  TrendingUp,
  Search,
  Filter,
  Calendar,
  Sparkles,
  ArrowRight,
  Printer
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { COURSES_DATA, JOBS_DATA } from '../data/mockData';

interface TraineePageProps {
  profile: LearnerProfile;
  onNavigateToCourses: () => void;
  onNavigateToJobs: () => void;
  onNavigateToSimulator: () => void;
  lang: 'en' | 'mr' | 'hi';
}

export const TraineePage: React.FC<TraineePageProps> = ({
  profile,
  onNavigateToCourses,
  onNavigateToJobs,
  onNavigateToSimulator,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'passport' | 'enrolled' | 'applications'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  const enrolledCoursesList = COURSES_DATA.filter((c) =>
    profile.enrolledCourses.includes(c.id)
  );
  const completedCoursesList = COURSES_DATA.filter((c) =>
    profile.completedCourses.includes(c.id)
  );
  const appliedJobsList = JOBS_DATA.filter((j) =>
    profile.appliedJobs.includes(j.id)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#2c1444] via-[#3b1959] to-[#102A43] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400 via-white to-transparent" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Trainee & Candidate Services Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Trainee Development Portal
            </h1>
            <p className="text-slate-200 text-sm max-w-2xl">
              Access government-recognized NSQF certifications, live apprenticeship tracking, Skill India Digital Passport, and direct placement opportunities across Maharashtra.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToCourses}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore NSQF Courses</span>
            </button>
            <button
              onClick={onNavigateToSimulator}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Virtual Lab Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trainee Stats Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{profile.kaushalScore}</div>
            <div className="text-xs font-medium text-slate-500">Kaushal Merit Score</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{profile.practicalHoursLogged} hrs</div>
            <div className="text-xs font-medium text-slate-500">Verified Workshop Hours</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">Level {profile.currentNSQF}</div>
            <div className="text-xs font-medium text-slate-500">Current NSQF Qualification</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{profile.appliedJobs.length}</div>
            <div className="text-xs font-medium text-slate-500">Active Job Applications</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'overview'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Trainee Roadmap & Schemes
        </button>
        <button
          onClick={() => setActiveTab('passport')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'passport'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Digital Skills Passport ({profile.badges.length} Badges)
        </button>
        <button
          onClick={() => setActiveTab('enrolled')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'enrolled'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Registered Courses ({profile.enrolledCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'applications'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Applied Jobs & Apprenticeships ({profile.appliedJobs.length})
        </button>
      </div>

      {/* Tab 1: Roadmap & Govt Schemes */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Candidate Profile Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#2c1444] text-white flex items-center justify-center font-bold text-xl shadow-sm">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                  <p className="text-xs text-slate-500">
                    Candidate ID: <span className="font-mono font-bold text-slate-800">MH-KAUSHAL-{profile.id.toUpperCase()}</span> • {profile.district}, {profile.state}
                  </p>
                  <p className="text-xs text-slate-500">{profile.email} • {profile.phone}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Aadhaar e-KYC Verified Trainee</span>
              </div>
            </div>

            {/* Step-by-step Progression */}
            <div className="pt-6">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Maharashtra Skill Progression Roadmap</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700">STEP 1</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Enrolment & e-KYC</h5>
                  <p className="text-[11px] text-slate-600 mt-1">Verified with Aadhaar & Mahaswayam Portal registration.</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-700">STEP 2</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Practical Lab Training</h5>
                  <p className="text-[11px] text-slate-600 mt-1">Logged {profile.practicalHoursLogged} hours in certified DVET workshops.</p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-700">STEP 3 (ACTIVE)</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Assessment & Certification</h5>
                  <p className="text-[11px] text-slate-600 mt-1">Preparing for Level 6 NSQF Practical Trade Evaluation.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-500">STEP 4</span>
                    <Briefcase className="w-4 h-4 text-slate-400" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-700">Industrial Placement</h5>
                  <p className="text-[11px] text-slate-500 mt-1">Direct interview matching through MahaJobs Rozgar Melava.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Government Candidate Schemes */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Available Trainee Support Schemes in Maharashtra</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-xs transition">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800">PMKVY 4.0</span>
                <h5 className="text-sm font-bold text-slate-900 mt-2">100% Fee Waiver & DBT Allowance</h5>
                <p className="text-xs text-slate-600 mt-1">Govt of Maharashtra provides free course enrollment and direct bank transfer allowances for eligible candidates.</p>
                <button
                  onClick={onNavigateToCourses}
                  className="mt-3 text-xs font-bold text-orange-600 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Browse Approved Centers <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-xs transition">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">NAPS Scheme</span>
                <h5 className="text-sm font-bold text-slate-900 mt-2">Monthly Apprenticeship Stipend</h5>
                <p className="text-xs text-slate-600 mt-1">Receive ₹8,500 - ₹14,000 monthly stipend co-funded by State Govt & corporate industry partners during dual-training.</p>
                <button
                  onClick={onNavigateToJobs}
                  className="mt-3 text-xs font-bold text-sky-600 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  View Apprenticeships <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-xs transition">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">Chief Minister Internship</span>
                <h5 className="text-sm font-bold text-slate-900 mt-2">Ladki Bahin & Yuva Karya Prashikshan</h5>
                <p className="text-xs text-slate-600 mt-1">Maharashtra State Youth Training Scheme offering on-job skill incubation with guaranteed monthly financial support.</p>
                <button
                  onClick={onNavigateToJobs}
                  className="mt-3 text-xs font-bold text-purple-600 flex items-center gap-1 hover:underline cursor-pointer"
                >
                  Explore Schemes <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Digital Skills Passport */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Verifiable Digital Skills Credentials</h3>
                <p className="text-xs text-slate-500">Tamper-proof blockchain credentials secured under National Skill Development Corporation (NSDC) & Govt of Maharashtra.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Passport</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              {profile.badges.map((badge) => (
                <div key={badge.id} className="p-5 rounded-xl border border-amber-200/80 bg-gradient-to-br from-amber-50/50 to-orange-50/30 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/60 text-amber-900">
                      {badge.sector}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{badge.title}</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Issued: {badge.issuedDate}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                      Certificate ID: {badge.certificateNumber}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" /> Digitally Verified
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Enrolled Courses */}
      {activeTab === 'enrolled' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCoursesList.map((course) => (
              <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                      NSQF Level {course.nsqfLevel}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{course.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{course.provider}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-600 line-clamp-2">{course.description}</div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Practical Hours: {course.practicalHours} hrs</span>
                  <button
                    onClick={onNavigateToSimulator}
                    className="text-[#ea580c] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Launch Lab <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Applied Jobs */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appliedJobsList.map((job) => (
              <div key={job.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Application Submitted
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{job.title}</h4>
                    <p className="text-xs text-slate-600 font-semibold">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700">{job.stipendOrSalary}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500">Required Skills: {job.requiredSkills.join(', ')}</div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Status: Under Employer Review</span>
                  <span className="font-bold text-slate-700">{job.vacancies} Openings</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
