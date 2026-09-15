import React from 'react';
import {
  X,
  Clock,
  Award,
  Building2,
  CheckCircle,
  Briefcase,
  Wrench,
  GraduationCap,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SkillCourse, LearnerProfile } from '../types';

interface CourseModalProps {
  course: SkillCourse | null;
  onClose: () => void;
  profile: LearnerProfile;
  onEnroll: (courseId: string) => void;
  lang: 'en' | 'mr' | 'hi';
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
  profile,
  onEnroll,
  lang
}) => {
  if (!course) return null;

  const isEnrolled = profile.enrolledCourses.includes(course.id);
  const isCompleted = profile.completedCourses.includes(course.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-slate-900">
        {/* Modal Header */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-800">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-slate-200 hover:text-white border border-white/20 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0B3C5D] text-white font-bold text-xs border border-sky-400">
                NSQF Level {course.nsqfLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-700 text-white text-xs font-bold shadow-xs">
                {course.feeType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur border border-white/30 text-xs font-medium">
                {course.deliveryMode}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
              {lang === 'hi' ? course.hindiTitle : course.title}
            </h2>
          </div>
        </div>

        {/* Modal Content Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-600" />
                <span>Duration</span>
              </div>
              <div className="font-bold text-slate-900 text-xs mt-0.5">
                {course.durationWeeks} Weeks ({course.totalHours} hrs)
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                <span>Hands-on Lab</span>
              </div>
              <div className="font-bold text-emerald-700 text-xs mt-0.5">
                {course.practicalHours} Practical Hours
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#0B3C5D]" />
                <span>Industry Partner</span>
              </div>
              <div className="font-bold text-slate-900 text-xs mt-0.5 truncate">
                {course.partnerCompany || 'MSDE Certified Hub'}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-orange-600" />
                <span>Certification</span>
              </div>
              <div className="font-bold text-orange-600 text-xs mt-0.5">
                Govt. Accredited
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-[#0B3C5D] mb-1.5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>{lang !== 'en' ? 'अभ्यासक्रमाचा तपशील' : 'Overview & Industrial Significance'}</span>
            </h3>
            <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-medium">
              {course.description}
            </p>
          </div>

          {/* Eligibility & Stipend Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="text-xs font-bold text-orange-700 mb-1 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                <span>Eligibility Requirements</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">{course.eligibility}</p>
            </div>

            {course.stipendAmount && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Apprenticeship Stipend Support</span>
                </div>
                <p className="text-xs text-emerald-800 font-bold">{course.stipendAmount}</p>
              </div>
            )}
          </div>

          {/* Detailed Syllabus / Modules */}
          <div>
            <h3 className="font-bold text-[#0B3C5D] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>{lang !== 'en' ? 'मॉड्यूल आणि प्रात्यक्षिक प्रयोगशाळा' : 'Curriculum & Hands-on Workbenches'}</span>
            </h3>
            <div className="space-y-2.5">
              {course.modules.map((module, idx) => (
                <div
                  key={module.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#0B3C5D] text-white text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {module.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2 ml-7">
                      {module.topics.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-7 sm:ml-0 self-start sm:self-center shrink-0">
                    {module.hasPracticalLab && (
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
                        Live Lab
                      </span>
                    )}
                    <span className="text-xs text-slate-500 font-mono font-semibold">{module.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Career Outcomes & Salaries */}
          <div>
            <h3 className="font-bold text-[#0B3C5D] mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              <span>{lang !== 'en' ? 'करिअरच्या संधी आणि वेतन' : 'Target Job Roles & Industry Wages'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.careerOutcomes.map((career, cIdx) => (
                <div
                  key={cIdx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">{career.role}</div>
                    <div className="text-[11px] text-emerald-700 font-black font-mono mt-0.5">
                      {career.avgMonthlySalary}
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 font-bold border border-orange-200">
                    {career.hiringDemand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <span>Registration automatically updates your Kaushal Digital Passport</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer border border-slate-200"
            >
              Close
            </button>
            {isCompleted ? (
              <div className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Certified & Completed</span>
              </div>
            ) : isEnrolled ? (
              <div className="px-5 py-2.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-300 font-bold text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Currently Enrolled</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  onEnroll(course.id);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                Enroll in Track Free
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
