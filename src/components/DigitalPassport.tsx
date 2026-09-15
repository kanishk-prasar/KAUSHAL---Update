import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  Clock,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Building2,
  Zap,
  Printer
} from 'lucide-react';
import { LearnerProfile } from '../types';
import { COURSES_DATA, JOBS_DATA } from '../data/mockData';

interface DigitalPassportProps {
  profile: LearnerProfile;
  lang: 'en' | 'mr' | 'hi';
}

export const DigitalPassport: React.FC<DigitalPassportProps> = ({ profile, lang }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const completedCoursesList = COURSES_DATA.filter((c) =>
    profile.completedCourses.includes(c.id)
  );
  const enrolledCoursesList = COURSES_DATA.filter((c) =>
    profile.enrolledCourses.includes(c.id)
  );
  const appliedJobsList = JOBS_DATA.filter((j) => profile.appliedJobs.includes(j.id));

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
            <span>Verifiable Skill India & NSQF Digital Credential</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-orange-600" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Credential'}</span>
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#0B3C5D] hover:bg-[#082b42] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Verify QR</span>
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#0B3C5D]">
          {lang !== 'en' ? 'डिजिटल कौशल्य पासपोर्ट' : 'Kaushal Digital Skill Passport'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
          An official, tamper-evident digital vocational credential recognized by the Ministry of Skill
          Development, Sector Skill Councils, and 4,000+ certified manufacturing and technology
          employers.
        </p>
      </div>

      {/* Main Passport Card (Official Government Certificate Aesthetic) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-white border-2 border-[#0B3C5D]/20 shadow-md overflow-hidden">
        {/* Decorative Tricolor Top Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-slate-100 to-emerald-600" />

        <div className="relative z-10 space-y-6 pt-2">
          {/* Passport Header with Emblems */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0B3C5D] text-white font-black text-2xl flex items-center justify-center shadow-md">
                कौ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B3C5D] tracking-tight">
                    {lang !== 'en' && (profile.marathiName || profile.hindiName) ? (profile.marathiName || profile.hindiName) : profile.name}
                  </h3>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-xs font-mono text-slate-500 font-bold">
                  ID: {profile.id} • {profile.district}, {profile.state}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Accredited Level
                </div>
                <div className="text-lg font-black text-orange-600 font-mono">
                  NSQF Level {profile.currentNSQF}
                </div>
              </div>

              <div
                onClick={() => setShowQrModal(true)}
                className="w-14 h-14 rounded-xl bg-slate-50 p-1.5 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-[#0B3C5D] transition border border-slate-300"
                title="Click to view QR code"
              >
                <div className="w-full h-full border border-slate-400 border-dashed rounded-lg flex items-center justify-center bg-white">
                  <QrCode className="w-7 h-7 text-[#0B3C5D]" />
                </div>
              </div>
            </div>
          </div>

          {/* Key Metric Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-500 font-bold">Kaushal Competency Score</div>
              <div className="text-2xl font-black text-[#0B3C5D] font-mono">
                {profile.kaushalScore}{' '}
                <span className="text-xs font-normal text-slate-500">/ 1000</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full"
                  style={{ width: `${(profile.kaushalScore / 1000) * 100}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-500 font-bold">Verified Workshop Hours</div>
              <div className="text-2xl font-black text-emerald-700 font-mono">
                {profile.practicalHoursLogged}{' '}
                <span className="text-xs font-normal text-slate-500">Hours</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full"
                  style={{ width: `${Math.min(100, (profile.practicalHoursLogged / 200) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-500 font-bold">Industry Badges</div>
              <div className="text-2xl font-black text-[#0B3C5D] font-mono">
                {profile.badges.length}{' '}
                <span className="text-xs font-normal text-slate-500">Issued</span>
              </div>
              <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3 h-3" />
                <span>Sector Council Verified</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="text-[11px] text-slate-500 font-bold">Job Applications</div>
              <div className="text-2xl font-black text-purple-700 font-mono">
                {profile.appliedJobs.length}{' '}
                <span className="text-xs font-normal text-slate-500">Active</span>
              </div>
              <div className="text-[10px] text-purple-600 font-bold">Under Review by HR</div>
            </div>
          </div>

          {/* Verified Certifications Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-600" />
              <span>Official Government & SSC Certifications</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profile.badges.map((badge) => (
                <div
                  key={badge.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3.5 shadow-2xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 border border-orange-200">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {badge.title}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                      <span>{badge.sector}</span>
                      <span>•</span>
                      <span>Issued: {badge.issuedDate}</span>
                    </div>
                    <div className="text-[10px] font-mono font-bold text-emerald-700">
                      Cert No: {badge.certificateNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Training & Apprenticeship Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            {/* Enrolled Courses */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-600" />
                <span>Active Enrolled Programs</span>
              </h4>
              {enrolledCoursesList.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{c.title}</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">{c.provider}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-100 text-orange-800 font-bold border border-orange-200">
                    In Progress
                  </span>
                </div>
              ))}
            </div>

            {/* Active Applications */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                <span>Submitted Apprenticeship Applications</span>
              </h4>
              {appliedJobsList.map((j) => (
                <div
                  key={j.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{j.title}</div>
                    <div className="text-[11px] text-slate-500 font-medium mt-0.5">{j.company}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    Interview Shortlisted
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Verification Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0B3C5D]">Official Credential QR</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Employers scan this QR code to verify live credentials against the National Skill India
                Registry.
              </p>
            </div>

            {/* High-Res QR display */}
            <div className="bg-slate-50 p-4 rounded-2xl inline-block shadow-xs mx-auto border border-slate-300">
              <div className="w-48 h-48 bg-[#0B3C5D] flex flex-col items-center justify-center rounded-lg p-2 relative overflow-hidden">
                {/* SVG QR Code Pattern */}
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2 opacity-90">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 7 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-white'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="px-2 py-1 bg-[#F37021] text-white font-black text-xs rounded shadow-xs">
                    कौशल्य
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[11px] font-mono font-bold text-emerald-700">
              HASH: SHA-256 #8F9A-4C2E-7B01-98E3
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0B3C5D] hover:bg-[#082b42] text-white font-bold text-xs transition cursor-pointer shadow-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
