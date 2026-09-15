import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  MapPin,
  Building2,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  Users,
  ShieldCheck,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { JobListing, LearnerProfile, SectorType } from '../types';
import { JOBS_DATA } from '../data/mockData';

interface JobMarketplaceProps {
  profile: LearnerProfile;
  onApplyJob: (jobId: string) => void;
  onToggleBookmark: (jobId: string) => void;
  onNavigateToPassport: () => void;
  lang: 'en' | 'mr' | 'hi';
}

export const JobMarketplace: React.FC<JobMarketplaceProps> = ({
  profile,
  onApplyJob,
  onToggleBookmark,
  onNavigateToPassport,
  lang
}) => {
  const [typeFilter, setTypeFilter] = useState<'All' | 'Apprenticeship' | 'Full-Time'>('All');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSector, setSelectedSector] = useState<SectorType | 'All'>('All');
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return JOBS_DATA.filter((job) => {
      const matchesType =
        typeFilter === 'All' ||
        (typeFilter === 'Apprenticeship' && job.type.includes('Apprenticeship')) ||
        (typeFilter === 'Full-Time' && job.type.includes('Full-Time'));
      const matchesSector = selectedSector === 'All' || job.sector === selectedSector;
      const matchesSearch =
        job.title.toLowerCase().includes(searchLocation.toLowerCase()) ||
        job.company.toLowerCase().includes(searchLocation.toLowerCase()) ||
        job.location.toLowerCase().includes(searchLocation.toLowerCase());

      return matchesType && matchesSector && matchesSearch;
    });
  }, [typeFilter, selectedSector, searchLocation]);

  const handleApply = (jobId: string, jobTitle: string) => {
    onApplyJob(jobId);
    setAppliedNotification(`Application successfully submitted for "${jobTitle}"!`);
    setTimeout(() => {
      setAppliedNotification(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Info */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs text-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>National Apprenticeship Promotion Scheme (NAPS) Verified</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B3C5D]">
            {lang !== 'en' ? 'उद्योग अप्रेंटिसशिप आणि रोजगार मंच' : 'Industry Apprenticeships & Skilled Careers'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-medium">
            {lang !== 'en'
              ? 'प्रमाणित टाटा, महिंद्रा, अदानी आणि भारत फोर्ज सारख्या अग्रगण्य कंपन्यांमध्ये अर्ज करा. तुमचा डिजिटल कौशल्य पासपोर्ट थेट एचआर टीमकडे सुरक्षित पाठवला जातो.'
              : 'Apply with one click using your verified Kaushal Skill Passport. Employers verify your NSQF Level, practical workshop hours, and credentials instantly.'}
          </p>
        </div>

        <button
          onClick={onNavigateToPassport}
          className="px-4 py-2 rounded-xl bg-[#0B3C5D] hover:bg-[#082a42] text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shrink-0 shadow-xs"
        >
          <span>View My Passport</span>
          <ArrowRight className="w-4 h-4 text-orange-400" />
        </button>
      </div>

      {/* Applied Toast Alert */}
      {appliedNotification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{appliedNotification}</span>
          </div>
          <span className="text-[11px] text-emerald-700 uppercase">Logged in Passport</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                lang !== 'en'
                  ? 'कंपनी, ठिकाण किंवा पद शोधा (उदा. पुणे, महिंद्रा, सोलर, सीएनसी)...'
                  : 'Search by role, company, or industrial city (e.g. Pune, Tata, Solar, CNC)...'
              }
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B3C5D] transition"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Type Filter */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs">
              {(['All', 'Apprenticeship', 'Full-Time'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    typeFilter === t
                      ? 'bg-[#0B3C5D] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {t === 'All' ? 'All Types' : t}
                </button>
              ))}
            </div>

            {/* Sector Selector */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value as SectorType | 'All')}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#0B3C5D] transition"
            >
              <option value="All">All Sectors</option>
              <option value="EV & Automotive">EV & Automotive</option>
              <option value="Clean Energy & Solar">Clean Energy & Solar</option>
              <option value="Advanced Manufacturing & CNC">Advanced Manufacturing & CNC</option>
              <option value="Drone Tech & Robotics">Drone Tech & Robotics</option>
              <option value="Healthcare & Caregiving">Healthcare & Caregiving</option>
              <option value="Artisan & Traditional Crafts">Artisan & Traditional Crafts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Cards Listing */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
          <div>
            Showing <span className="font-bold text-[#0B3C5D]">{filteredJobs.length}</span> verified
            industrial openings
          </div>
          <div>All listings offer direct placement assistance & ESI health coverage</div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl p-8 space-y-2 shadow-xs">
            <Briefcase className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-bold text-slate-800">No openings match your criteria</div>
            <p className="text-xs text-slate-600">
              Clear your search or sector filter to browse all active opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job) => {
              const isApplied = profile.appliedJobs.includes(job.id);
              const isBookmarked = profile.bookmarkedJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white border border-slate-200 hover:border-[#0B3C5D] rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-5 group"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold ${
                          job.type.includes('Apprenticeship')
                            ? 'bg-orange-50 text-orange-800 border border-orange-200'
                            : 'bg-sky-50 text-sky-800 border border-sky-200'
                        }`}
                      >
                        {job.type}
                      </span>

                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                        NSQF Level {job.nsqfRequired}+
                      </span>

                      {job.isVerifiedPartner && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified Employer</span>
                        </span>
                      )}

                      <span className="text-[11px] text-slate-500 ml-auto md:ml-0 font-mono">
                        Posted {job.postedDaysAgo}d ago
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0B3C5D] transition">
                        {lang === 'hi' ? job.hindiTitle : job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 mt-1 font-medium">
                        <div className="flex items-center gap-1.5 font-bold text-[#0B3C5D]">
                          <Building2 className="w-3.5 h-3.5 text-orange-600" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>{job.vacancies} Openings</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed max-w-3xl font-medium">
                      {job.description}
                    </p>

                    {/* Required Skills Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.requiredSkills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Perks */}
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 pt-1 font-medium">
                      {job.benefits.map((b, bIdx) => (
                        <span key={bIdx} className="flex items-center gap-1 text-emerald-800">
                          <Sparkles className="w-3 h-3 text-orange-600" />
                          <span>{b}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Stipend & CTA */}
                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-200 shrink-0">
                    <div className="text-left md:text-right">
                      <div className="text-[11px] text-slate-500 font-bold uppercase">Monthly Pay / Stipend</div>
                      <div className="text-sm sm:text-base font-black text-emerald-700 font-mono">
                        {job.stipendOrSalary}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleBookmark(job.id)}
                        className="p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition cursor-pointer shadow-2xs"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-orange-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>

                      {isApplied ? (
                        <div className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Applied</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleApply(job.id, job.title)}
                          className="px-5 py-2 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Apply with Passport</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
