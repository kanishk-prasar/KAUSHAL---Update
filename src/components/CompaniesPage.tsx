import React, { useState } from 'react';
import {
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  FileSpreadsheet,
  Award,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  DollarSign
} from 'lucide-react';
import {
  TataMotorsLogo,
  MahindraLogo,
  LTLogo,
  TCSLogo,
  InfosysLogo,
  SerumInstituteLogo,
  RelianceLogo,
  GodrejLogo,
  BajajLogo,
  BharatForgeLogo,
  ThermaxLogo,
  CiplaLogo
} from './PartnerLogos';
import { JOBS_DATA } from '../data/mockData';

interface CompaniesPageProps {
  onOpenRegisterModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenEmployerDashboard?: () => void;
  lang: 'en' | 'mr' | 'hi';
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({
  onOpenRegisterModal,
  onOpenLoginModal,
  onOpenEmployerDashboard,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'directory' | 'post-job' | 'incentives' | 'melava'>('directory');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [showPostModal, setShowPostModal] = useState(false);
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [jobForm, setJobForm] = useState({
    title: '',
    company: '',
    sector: 'EV & Automotive',
    location: 'Pune',
    vacancies: '15',
    stipend: '₹14,000/mo',
    type: 'Full-Time Employment'
  });

  const CORPORATE_EMPLOYERS = [
    {
      id: 'c-tata',
      name: 'Tata Motors EV & Commercial Division',
      sector: 'EV & Automotive',
      locations: ['Pune', 'Pimpri-Chinchwad', 'Sanand'],
      hiredCount: '3,450+ Trainees',
      activeVacancies: 185,
      apprenticeshipProgram: 'Tata Tech Star NAPS dual training',
      logo: <TataMotorsLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 4 to Level 6',
      verified: true
    },
    {
      id: 'c-mahindra',
      name: 'Mahindra & Mahindra Auto & Farm Sector',
      sector: 'Automotive & Precision Engineering',
      locations: ['Nashik', 'Chakan (Pune)', 'Kandivali (Mumbai)'],
      hiredCount: '2,800+ Trainees',
      activeVacancies: 140,
      apprenticeshipProgram: 'Mahindra Pride School Vocational Wing',
      logo: <MahindraLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 4 to Level 6',
      verified: true
    },
    {
      id: 'c-lt',
      name: 'Larsen & Toubro Heavy Engineering & Hydrocarbon',
      sector: 'Advanced Manufacturing & CNC',
      locations: ['Powai (Mumbai)', 'Hazira', 'Nagpur'],
      hiredCount: '2,150+ Trainees',
      activeVacancies: 95,
      apprenticeshipProgram: 'L&T CSTI Certified Riggers & Welders',
      logo: <LTLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 5 to Level 7',
      verified: true
    },
    {
      id: 'c-serum',
      name: 'Serum Institute of India Pvt. Ltd.',
      sector: 'Healthcare & Caregiving',
      locations: ['Pune (Hadapsar & Manjari Campuses)'],
      hiredCount: '1,200+ Trainees',
      activeVacancies: 60,
      apprenticeshipProgram: 'Biopharma Cleanroom Technical Cadre',
      logo: <SerumInstituteLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 5 & 6',
      verified: true
    },
    {
      id: 'c-forge',
      name: 'Bharat Forge Limited',
      sector: 'Advanced Manufacturing & CNC',
      locations: ['Mundhwa (Pune)', 'Baramati', 'Satara'],
      hiredCount: '1,950+ Trainees',
      activeVacancies: 110,
      apprenticeshipProgram: 'Kalyani Center for Precision Forging',
      logo: <BharatForgeLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 4 to Level 6',
      verified: true
    },
    {
      id: 'c-tcs',
      name: 'Tata Consultancy Services (TCS iON)',
      sector: 'Digital & IT Skills',
      locations: ['Thane', 'Pune Hinjewadi', 'Nagpur MIHAN'],
      hiredCount: '4,800+ Trainees',
      activeVacancies: 320,
      apprenticeshipProgram: 'TCS Youth Employment Program (YEP)',
      logo: <TCSLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 5 to Level 7',
      verified: true
    },
    {
      id: 'c-reliance',
      name: 'Reliance Industries & New Energy Solar Gigafactory',
      sector: 'Clean Energy & Solar',
      locations: ['Navi Mumbai', 'Tarapur', 'Nagothane'],
      hiredCount: '2,600+ Trainees',
      activeVacancies: 210,
      apprenticeshipProgram: 'Solar Microgrid Dual Apprentice Cadre',
      logo: <RelianceLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 4 to Level 6',
      verified: true
    },
    {
      id: 'c-bajaj',
      name: 'Bajaj Auto & Chetak Technology Ltd.',
      sector: 'EV & Automotive',
      locations: ['Akurdi (Pune)', 'Waluj (Chhatrapati Sambhajinagar)'],
      hiredCount: '2,300+ Trainees',
      activeVacancies: 130,
      apprenticeshipProgram: 'Bajaj BEST Center of Excellence',
      logo: <BajajLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 4 & 5',
      verified: true
    },
    {
      id: 'c-thermax',
      name: 'Thermax Clean Energy & Green Hydrogen',
      sector: 'Clean Energy & Solar',
      locations: ['Chinchwad (Pune)', 'Shirwal'],
      hiredCount: '950+ Trainees',
      activeVacancies: 45,
      apprenticeshipProgram: 'Green Boiler & Fuel Cell Technicians',
      logo: <ThermaxLogo className="w-12 h-12" />,
      nsqfAccepted: 'Level 5 to Level 7',
      verified: true
    }
  ];

  const filteredEmployers = CORPORATE_EMPLOYERS.filter((emp) => {
    if (sectorFilter === 'All') return true;
    return emp.sector === sectorFilter;
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    setPostSubmitted(true);
    setTimeout(() => {
      setPostSubmitted(false);
      setShowPostModal(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#2A0845] via-[#102A43] to-[#0f3542] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-400/20 text-orange-200 border border-orange-400/30 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Corporate & Industrial Hiring Wing</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Companies & Industry Employer Hub
            </h1>
            <p className="text-slate-200 text-sm max-w-2xl">
              Source verified NSQF-certified technicians, host state-sponsored Apprenticeships under NAPS/NATS, and benefit from Maharashtra State Corporate Hiring subsidies.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPostModal(true)}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Vacancy / Apprenticeship</span>
            </button>
            <button
              onClick={onOpenEmployerDashboard || onOpenLoginModal}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>Employer Recruiter Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Corporate Hiring Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">1,400+</div>
            <div className="text-xs font-medium text-slate-500">Registered Companies</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">5,200+</div>
            <div className="text-xs font-medium text-slate-500">Live Active Vacancies</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">84,000+</div>
            <div className="text-xs font-medium text-slate-500">Youths Hired in 2025-26</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">₹4,500/mo</div>
            <div className="text-xs font-medium text-slate-500">Govt Stipend Subsidy/Trainee</div>
          </div>
        </div>
      </div>

      {/* Tabs Sub-Navigation */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('directory')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'directory'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Company Directory & Employers ({CORPORATE_EMPLOYERS.length})
        </button>
        <button
          onClick={() => setActiveTab('incentives')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'incentives'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Corporate Hiring Incentives & NAPS Subsidies
        </button>
        <button
          onClick={() => setActiveTab('melava')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'melava'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          MahaJobs Rozgar Melava (Mega Job Fairs)
        </button>
      </div>

      {/* Tab 1: Company Directory */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Sector Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">Filter by Sector:</span>
            {['All', 'EV & Automotive', 'Advanced Manufacturing & CNC', 'Clean Energy & Solar', 'Healthcare & Caregiving', 'Digital & IT Skills'].map((sec) => (
              <button
                key={sec}
                onClick={() => setSectorFilter(sec)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition cursor-pointer ${
                  sectorFilter === sec
                    ? 'bg-[#2c1444] text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Employers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEmployers.map((emp) => (
              <div
                key={emp.id}
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1">
                      {emp.logo}
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {emp.activeVacancies} Openings
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {emp.name}
                  </h3>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700">
                    {emp.sector}
                  </span>

                  <p className="text-xs text-slate-600 mt-2.5">
                    <strong className="text-slate-800">Program:</strong> {emp.apprenticeshipProgram}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11.5px] text-slate-500 flex items-center justify-between">
                    <span>Locations:</span>
                    <span className="font-semibold text-slate-700">{emp.locations.join(', ')}</span>
                  </div>
                  <div className="text-[11.5px] text-slate-500 flex items-center justify-between">
                    <span>Total Hired:</span>
                    <span className="font-bold text-emerald-700">{emp.hiredCount}</span>
                  </div>
                  <div className="text-[11.5px] text-slate-500 flex items-center justify-between">
                    <span>NSQF Accepted:</span>
                    <span className="font-mono font-semibold text-slate-700">{emp.nsqfAccepted}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Corporate Incentives */}
      {activeTab === 'incentives' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Government of Maharashtra Corporate Co-Funding Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">NAPS STATE STIPEND CO-PAY</span>
                <h4 className="text-sm font-bold text-slate-900">25% Stipend Reimbursement</h4>
                <p className="text-xs text-slate-600">State Govt reimburses up to ₹1,500/month per apprentice directly, reducing your shop-floor workforce acquisition costs.</p>
              </div>

              <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-blue-200 text-blue-900">CSR TAX RECOGNITION</span>
                <h4 className="text-sm font-bold text-slate-900">100% CSR Tax Exemption</h4>
                <p className="text-xs text-slate-600">Company investments into ITI modernizations and Centers of Excellence qualify under Section 135 CSR mandate and Section 35CCD tax exemptions.</p>
              </div>

              <div className="p-5 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-purple-200 text-purple-900">ZERO RECRUITMENT FEES</span>
                <h4 className="text-sm font-bold text-slate-900">Pre-Screened Candidates</h4>
                <p className="text-xs text-slate-600">Access thousands of pre-tested, Aadhaar-verified ITI & polytechnic graduates with hands-on lab hours logged in their Digital Passports.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: MahaJobs Melava */}
      {activeTab === 'melava' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Upcoming Maharashtra Mega Rozgar Melava Schedule</h3>
                <p className="text-xs text-slate-500">Reserve your employer stall to interview 1,000+ candidates on the spot in single-day recruitment drives.</p>
              </div>
              <button
                onClick={() => setShowPostModal(true)}
                className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Register Employer Stall</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-800">22 September 2026</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Confirmed</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">Pune Auto-EV & Engineering Mega Melava</h4>
                <p className="text-xs text-slate-600 mt-1">Venue: Government Polytechnic Ground, Shivajinagar, Pune</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Target: 4,000+ Technicians</span>
                  <span className="font-bold text-slate-700">65+ Employers Attending</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-800">28 September 2026</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Confirmed</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mt-1">Chhatrapati Sambhajinagar Industrial Job Fair</h4>
                <p className="text-xs text-slate-600 mt-1">Venue: ITI Campus, Railway Station Road, Chhatrapati Sambhajinagar</p>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>Target: 2,500+ Technicians</span>
                  <span className="font-bold text-slate-700">42+ Employers Attending</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Post Corporate Job / Apprenticeship</h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {postSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Job Published Successfully!</h4>
                <p className="text-xs text-slate-600">
                  Your vacancy listing has been published to the KAUSHAL job board and broadcasted to eligible ITI candidates across Maharashtra.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePostJob} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation / Role Title</label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. EV Battery Diagnostics Junior Technician"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company / Entity Name</label>
                    <input
                      type="text"
                      required
                      value={jobForm.company}
                      onChange={(e) => setJobForm({ ...jobForm, company: e.target.value })}
                      placeholder="e.g. Mahindra Precision Tech"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Industry Sector</label>
                    <select
                      value={jobForm.sector}
                      onChange={(e) => setJobForm({ ...jobForm, sector: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    >
                      <option>EV & Automotive</option>
                      <option>Advanced Manufacturing & CNC</option>
                      <option>Clean Energy & Solar</option>
                      <option>Healthcare & Caregiving</option>
                      <option>Digital & IT Skills</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Work Location</label>
                    <input
                      type="text"
                      required
                      value={jobForm.location}
                      onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                      placeholder="e.g. Chakan, Pune"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Vacancies</label>
                    <input
                      type="number"
                      required
                      value={jobForm.vacancies}
                      onChange={(e) => setJobForm({ ...jobForm, vacancies: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Monthly Pay</label>
                    <input
                      type="text"
                      required
                      value={jobForm.stipend}
                      onChange={(e) => setJobForm({ ...jobForm, stipend: e.target.value })}
                      placeholder="₹18,000/mo"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPostModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#ea580c] text-white rounded-lg font-bold hover:bg-[#c2410c]"
                  >
                    Publish Opportunity
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
