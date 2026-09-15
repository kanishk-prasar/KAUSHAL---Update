import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Clock,
  Wrench,
  Building2,
  Star,
  CheckCircle,
  ArrowUpRight,
  Zap,
  Layers,
  Award
} from 'lucide-react';
import { SkillCourse, SectorType, LearnerProfile } from '../types';
import { COURSES_DATA } from '../data/mockData';
import { CourseModal } from './CourseModal';

interface SkillCatalogueProps {
  profile: LearnerProfile;
  onEnrollCourse: (courseId: string) => void;
  lang: 'en' | 'mr' | 'hi';
}

const SECTORS: SectorType[] = [
  'All',
  'EV & Automotive',
  'Clean Energy & Solar',
  'Advanced Manufacturing & CNC',
  'Drone Tech & Robotics',
  'Healthcare & Caregiving',
  'Artisan & Traditional Crafts'
];

export const SkillCatalogue: React.FC<SkillCatalogueProps> = ({
  profile,
  onEnrollCourse,
  lang
}) => {
  const [selectedSector, setSelectedSector] = useState<SectorType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [nsqfFilter, setNsqfFilter] = useState<number | 'all'>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'free' | 'stipend'>('all');
  const [selectedCourse, setSelectedCourse] = useState<SkillCourse | null>(null);

  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((c) => {
      const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.provider.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesNsqf = nsqfFilter === 'all' || c.nsqfLevel === nsqfFilter;
      const matchesFee =
        feeFilter === 'all' ||
        (feeFilter === 'free' && c.feeType.includes('Free')) ||
        (feeFilter === 'stipend' && c.feeType.includes('Stipend'));

      return matchesSector && matchesSearch && matchesNsqf && matchesFee;
    });
  }, [selectedSector, searchQuery, nsqfFilter, feeFilter]);

  return (
    <div className="space-y-6">
      {/* Top Search & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                lang !== 'en'
                  ? 'व्यावसायिक कौशल्ये, ट्रेड किंवा कंपनीनुसार शोधा (उदा. EV, Solar, CNC, Drone)...'
                  : 'Search vocational skills, trades, or partners (e.g. EV, Solar, 5-Axis CNC, Drone, EMT)...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0B3C5D] transition"
            />
          </div>

          {/* NSQF & Stipend Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* NSQF level filter */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs">
              <span className="text-slate-600 px-2 font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-orange-600" />
                <span>NSQF:</span>
              </span>
              {(['all', 4, 5, 6] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setNsqfFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    nsqfFilter === lvl
                      ? 'bg-[#0B3C5D] text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'all' ? 'All' : `L${lvl}`}
                </button>
              ))}
            </div>

            {/* Fee filter */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl text-xs">
              {(
                [
                  { id: 'all', label: 'All Costs' },
                  { id: 'free', label: 'PMKVY Free' },
                  { id: 'stipend', label: 'Stipend Included' }
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFeeFilter(f.id)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition cursor-pointer ${
                    feeFilter === f.id
                      ? 'bg-emerald-700 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sector Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {SECTORS.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedSector === sec
                  ? 'bg-[#0B3C5D] text-white border-[#0B3C5D] shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold text-[#0B3C5D]">
            {lang !== 'en' ? 'उपलब्ध अभ्यासक्रम' : 'Certified Vocational Programs'}{' '}
            <span className="text-orange-600 font-mono">({filteredCourses.length})</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Aligned with National Skills Qualifications Framework (NSQF)
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 space-y-3 shadow-xs">
            <Filter className="w-10 h-10 text-slate-400 mx-auto" />
            <div className="text-base font-bold text-slate-800">No matching skill tracks found</div>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Try adjusting your sector filter, NSQF level, or search keyword to discover more
              opportunities.
            </p>
            <button
              onClick={() => {
                setSelectedSector('All');
                setSearchQuery('');
                setNsqfFilter('all');
                setFeeFilter('all');
              }}
              className="px-4 py-2 bg-[#0B3C5D] text-white rounded-xl text-xs font-bold transition hover:bg-[#082a42] cursor-pointer shadow-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => {
              const isEnrolled = profile.enrolledCourses.includes(course.id);
              const isCompleted = profile.completedCourses.includes(course.id);

              return (
                <div
                  key={course.id}
                  className="bg-white border border-slate-200 hover:border-[#0B3C5D] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
                >
                  {/* Card Image Banner */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Sector & Level Chips */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-[#0B3C5D] font-bold text-[11px] shadow-xs">
                        NSQF {course.nsqfLevel}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold backdrop-blur shadow-xs ${
                          course.feeType.includes('Stipend')
                            ? 'bg-emerald-700 text-white border border-emerald-600'
                            : 'bg-orange-600 text-white border border-orange-500'
                        }`}
                      >
                        {course.feeType.includes('Stipend') ? 'Stipend Included' : 'Free Funded'}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
                        {course.sector}
                      </span>
                      <div className="flex items-center gap-1 text-amber-300 font-bold text-xs bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-700">
                        <Star className="w-3 h-3 fill-amber-300" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-[#0B3C5D] transition">
                        {lang === 'hi' ? course.hindiTitle : course.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-medium">
                        {course.description}
                      </p>

                      {/* Partner company */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
                        <Building2 className="w-3.5 h-3.5 text-[#0B3C5D] shrink-0" />
                        <span className="truncate">{course.provider}</span>
                      </div>
                    </div>

                    {/* Hours and Practical Breakdown */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          <span>{course.durationWeeks} Weeks</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700">
                          <Wrench className="w-3.5 h-3.5 shrink-0" />
                          <span>{course.practicalHours} hrs Practical</span>
                        </div>
                      </div>

                      {/* Salary Potential Indicator */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-medium">
                        <span className="text-slate-500 text-[11px] font-bold uppercase">Salary Benchmark</span>
                        <span className="font-mono font-black text-emerald-700 text-xs">
                          {course.careerOutcomes[0]?.avgMonthlySalary.split('-')[0]} /mo
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="flex-1 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0B3C5D] font-bold text-xs transition flex items-center justify-center gap-1 cursor-pointer border border-slate-300 shadow-2xs"
                        >
                          <span>Curriculum</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-orange-600" />
                        </button>

                        {isCompleted ? (
                          <div className="px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Done</span>
                          </div>
                        ) : isEnrolled ? (
                          <div className="px-3 py-2 rounded-xl bg-orange-50 border border-orange-300 text-orange-800 text-xs font-bold flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 text-orange-600" />
                            <span>Enrolled</span>
                          </div>
                        ) : (
                          <button
                            onClick={() => onEnrollCourse(course.id)}
                            className="px-4 py-2 rounded-xl bg-[#F37021] hover:bg-[#E05F12] text-white font-bold text-xs transition cursor-pointer shadow-xs"
                          >
                            Enroll Free
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Selected Course Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          profile={profile}
          onEnroll={onEnrollCourse}
          lang={lang}
        />
      )}
    </div>
  );
};
