import React, { useState } from 'react';
import {
  Briefcase,
  LayoutDashboard,
  PlusCircle,
  FileText,
  Users,
  Bookmark,
  CheckCircle2,
  Building2,
  BarChart3,
  Headphones,
  Bell,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Home,
  TrendingUp,
  User,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  Award,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  LogOut,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export interface EmployerJob {
  id: string;
  title: string;
  requiredSkills: string;
  location: string;
  applications: number;
  status: 'Active' | 'Closed' | 'Draft';
  postedOn: string;
  sector: string;
  vacancies: number;
  stipend: string;
}

export interface CandidateApplicant {
  id: string;
  name: string;
  initials: string;
  appliedFor: string;
  keySkills: string;
  matchScore: number;
  status: 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Hired' | 'Rejected';
  appliedOn: string;
  phone: string;
  email: string;
  location: string;
  education: string;
  nsqfLevel: string;
  experience: string;
}

const INITIAL_JOBS: EmployerJob[] = [
  {
    id: 'job-1',
    title: 'EV Service Technician',
    requiredSkills: 'EV, Electrical, Diagnostics',
    location: 'Pune',
    applications: 48,
    status: 'Active',
    postedOn: '12 Sep 2026',
    sector: 'EV & Automotive',
    vacancies: 20,
    stipend: '₹22,000 - ₹28,000/mo'
  },
  {
    id: 'job-2',
    title: 'Solar Installation Technician',
    requiredSkills: 'Solar PV, Electrical',
    location: 'Nagpur',
    applications: 36,
    status: 'Active',
    postedOn: '08 Sep 2026',
    sector: 'Renewable Energy',
    vacancies: 15,
    stipend: '₹18,000 - ₹24,000/mo'
  },
  {
    id: 'job-3',
    title: 'Full Stack Developer',
    requiredSkills: 'HTML, CSS, JS, React',
    location: 'Pune',
    applications: 62,
    status: 'Active',
    postedOn: '05 Sep 2026',
    sector: 'IT & Software',
    vacancies: 10,
    stipend: '₹35,000 - ₹45,000/mo'
  },
  {
    id: 'job-4',
    title: 'Data Analyst',
    requiredSkills: 'Python, SQL, Data Viz',
    location: 'Mumbai',
    applications: 28,
    status: 'Active',
    postedOn: '01 Sep 2026',
    sector: 'Data & Analytics',
    vacancies: 8,
    stipend: '₹30,000 - ₹40,000/mo'
  },
  {
    id: 'job-5',
    title: 'Production Associate',
    requiredSkills: 'Machine Operation',
    location: 'Aurangabad',
    applications: 14,
    status: 'Closed',
    postedOn: '25 Aug 2026',
    sector: 'Manufacturing',
    vacancies: 25,
    stipend: '₹16,000 - ₹20,000/mo'
  }
];

const INITIAL_CANDIDATES: CandidateApplicant[] = [
  {
    id: 'cand-1',
    name: 'Aditya Patil',
    initials: 'AP',
    appliedFor: 'EV Service Technician',
    keySkills: 'EV, Electrical, IoT',
    matchScore: 92,
    status: 'Shortlisted',
    appliedOn: '12 Sep 2026',
    phone: '+91 98220 14829',
    email: 'aditya.patil.skill@gmail.com',
    location: 'Pune, Maharashtra',
    education: 'Diploma in Electrical Engineering (G.P. Pune)',
    nsqfLevel: 'Level 5 (Automotive Skills Development Council)',
    experience: '6 Months Apprenticeship at ASDC Centre'
  },
  {
    id: 'cand-2',
    name: 'Sneha Kulkarni',
    initials: 'SK',
    appliedFor: 'Data Analyst',
    keySkills: 'Python, SQL, Power BI',
    matchScore: 88,
    status: 'Under Review',
    appliedOn: '11 Sep 2026',
    phone: '+91 97654 32180',
    email: 'sneha.kulkarni.tech@gmail.com',
    location: 'Mumbai, Maharashtra',
    education: 'B.Sc. Computer Science (Mumbai University)',
    nsqfLevel: 'Level 6 (NASSCOM IT-ITeS SSC)',
    experience: '1 Year Academic Projects & Tableau Dashboarding'
  },
  {
    id: 'cand-3',
    name: 'Rohit More',
    initials: 'RM',
    appliedFor: 'Full Stack Developer',
    keySkills: 'React, Node.js, MongoDB',
    matchScore: 84,
    status: 'Interview',
    appliedOn: '10 Sep 2026',
    phone: '+91 91580 99231',
    email: 'rohit.more.dev@gmail.com',
    location: 'Pune, Maharashtra',
    education: 'B.E. Information Technology (Savitribai Phule Pune Univ)',
    nsqfLevel: 'Level 6 (NASSCOM SSC)',
    experience: 'MERN Stack Certified by MSSDS-CoE'
  },
  {
    id: 'cand-4',
    name: 'Pooja Sharma',
    initials: 'PS',
    appliedFor: 'Solar Technician',
    keySkills: 'Solar PV, Electrical',
    matchScore: 78,
    status: 'Under Review',
    appliedOn: '09 Sep 2026',
    phone: '+91 94032 88471',
    email: 'pooja.sharma.solar@gmail.com',
    location: 'Nagpur, Maharashtra',
    education: 'ITI Electrician (Govt ITI Nagpur)',
    nsqfLevel: 'Level 4 (Skill Council for Green Jobs)',
    experience: 'Solar Rooftop Installation Training (Surya Mitra)'
  },
  {
    id: 'cand-5',
    name: 'Aman Tiwari',
    initials: 'AT',
    appliedFor: 'Production Associate',
    keySkills: 'Machine Operation',
    matchScore: 76,
    status: 'Applied',
    appliedOn: '08 Sep 2026',
    phone: '+91 88880 77123',
    email: 'aman.tiwari.ind@gmail.com',
    location: 'Aurangabad, Maharashtra',
    education: 'HSC + Vocational ITI Turner',
    nsqfLevel: 'Level 4 (Capital Goods Skill Council)',
    experience: 'CNC Lathe & Milling Fundamentals'
  }
];

interface EmployerDashboardProps {
  onSignOut: () => void;
  onNavigateHome?: () => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  onSignOut,
  onNavigateHome
}) => {
  const [currentNav, setCurrentNav] = useState<
    'dashboard' | 'create-job' | 'manage-jobs' | 'candidates' | 'shortlisted' | 'hired' | 'company-profile' | 'reports'
  >('dashboard');

  const [jobs, setJobs] = useState<EmployerJob[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<CandidateApplicant[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateApplicant | null>(null);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showHiringModal, setShowHiringModal] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [filterJobSearch, setFilterJobSearch] = useState('');
  const [filterCandidateSearch, setFilterCandidateSearch] = useState('');

  // New Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    requiredSkills: '',
    location: 'Pune',
    sector: 'EV & Automotive',
    vacancies: 10,
    stipend: '₹20,000 - ₹25,000/mo'
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJob.title.trim()) return;

    const created: EmployerJob = {
      id: `job-${Date.now()}`,
      title: newJob.title,
      requiredSkills: newJob.requiredSkills || 'Automotive, Precision',
      location: newJob.location,
      applications: 0,
      status: 'Active',
      postedOn: '17 Sep 2026',
      sector: newJob.sector,
      vacancies: Number(newJob.vacancies) || 5,
      stipend: newJob.stipend
    };

    setJobs([created, ...jobs]);
    setShowCreateJobModal(false);
    setNewJob({
      title: '',
      requiredSkills: '',
      location: 'Pune',
      sector: 'EV & Automotive',
      vacancies: 10,
      stipend: '₹20,000 - ₹25,000/mo'
    });
  };

  const handleUpdateCandidateStatus = (
    id: string,
    newStatus: CandidateApplicant['status']
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedCandidate && selectedCandidate.id === id) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus });
    }
  };

  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;
  const totalApplicationsCount = 246;
  const shortlistedCount = candidates.filter((c) => c.status === 'Shortlisted').length + 30;
  const hiredCount = candidates.filter((c) => c.status === 'Hired').length + 13;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER (Exact pixel-accurate reproduction of screenshot) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 py-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Government of Maharashtra Seal & Department Info */}
          <div
            onClick={onNavigateHome}
            className={`flex items-center gap-3 ${onNavigateHome ? 'cursor-pointer hover:opacity-90 transition' : ''}`}
            title={onNavigateHome ? 'Return to Public KAUSHAL Portal' : undefined}
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <img
                src="/images/govt-maharashtra.png"
                onError={(e) => {
                  e.currentTarget.src = '/govt-maharashtra.png';
                }}
                alt="Government of Maharashtra Seal"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h2 className="text-[11px] sm:text-xs font-black tracking-tight text-slate-900 uppercase leading-none">
                GOVERNMENT OF MAHARASHTRA
              </h2>
              <p className="text-[9px] sm:text-[10px] font-bold text-[#1E3A5F] uppercase tracking-normal mt-0.5">
                DEPARTMENT OF SKILL DEVELOPMENT &amp; ENTREPRENEURSHIP
              </p>
            </div>
          </div>

          {/* Center: KAUSHAL Branding Title */}
          <div
            onClick={onNavigateHome}
            className={`hidden md:flex flex-col items-center text-center ${onNavigateHome ? 'cursor-pointer hover:opacity-95 transition' : ''}`}
            title={onNavigateHome ? 'Return to Public KAUSHAL Portal' : undefined}
          >
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[#0B3C5D]">
              KAUSHAL
            </h1>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">
              Knowledge &amp; Analytics for Upgrading Skills, Hiring, And Livelihoods
            </p>
          </div>

          {/* Right: Notifications & TataTech Industries User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onNavigateHome && (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
                title="Return to Public KAUSHAL Portal"
              >
                <Home className="w-3.5 h-3.5 text-[#103770]" />
                <span className="hidden sm:inline">Main Portal</span>
              </button>
            )}

            {/* Notification Bell with Badge 3 */}
            <div className="relative">
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-bold text-slate-800">Employer Notifications</span>
                    <span className="text-[10px] text-blue-600 cursor-pointer font-semibold">Mark all read</span>
                  </div>
                  <div className="divide-y divide-slate-100 mt-2 space-y-2">
                    <div className="pt-1">
                      <p className="font-semibold text-slate-900">4 New Candidates Applied</p>
                      <p className="text-slate-500 text-[11px]">For EV Service Technician role with 90%+ skill match.</p>
                      <span className="text-[9px] text-slate-400">10 mins ago</span>
                    </div>
                    <div className="pt-2">
                      <p className="font-semibold text-slate-900">MSSDS NAPS Subsidy Disbursed</p>
                      <p className="text-slate-500 text-[11px]">Direct stipend credit verified for 14 active apprentices.</p>
                      <span className="text-[9px] text-slate-400">2 hours ago</span>
                    </div>
                    <div className="pt-2">
                      <p className="font-semibold text-slate-900">Placement Drive in Pune MIDC</p>
                      <p className="text-slate-500 text-[11px]">Invitations sent to 50 certified NSQF Level 5 trainees.</p>
                      <span className="text-[9px] text-slate-400">Yesterday</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown: TT - TataTech Industries */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#0a192f] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  TT
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 hidden sm:inline">
                  TataTech Industries
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3 z-50 text-xs animate-in fade-in">
                  <div className="pb-2.5 border-b border-slate-100">
                    <p className="font-bold text-slate-900 text-sm">TataTech Industries</p>
                    <p className="text-slate-500 text-[11px] font-mono">CIN: U72200PN1994PLC013313</p>
                    <p className="text-slate-500 text-[11px]">Registered ID: 8252678014</p>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                      Active MSSDS Industry Partner
                    </span>
                  </div>
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setCurrentNav('company-profile');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Company Profile &amp; Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentNav('reports');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hiring Analytics &amp; Reports</span>
                    </button>
                    {onNavigateHome && (
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onNavigateHome();
                        }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        <span>View Public Portal Home</span>
                      </button>
                    )}
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={onSignOut}
                      className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out from Employer Portal</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT (Sidebar + Main Workspace) */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* LEFT SIDEBAR (Matching exact screenshot styling) */}
        <aside className="w-full md:w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-4 shrink-0">
          <div>
            {/* Sidebar Brand Header */}
            <div className="flex items-center gap-2.5 pb-5 border-b border-slate-100 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 tracking-tight">Employer Portal</h3>
                <p className="text-[11px] font-medium text-slate-500">Hire Skilled Talent</p>
              </div>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
                { id: 'create-job', label: 'Create Job', icon: PlusCircle, isModalTrigger: true },
                { id: 'manage-jobs', label: 'Manage Jobs', icon: FileText },
                { id: 'candidates', label: 'Candidates', icon: Users },
                { id: 'shortlisted', label: 'Shortlisted', icon: Bookmark },
                { id: 'hired', label: 'Hired', icon: CheckCircle2 },
                { id: 'company-profile', label: 'Company Profile', icon: Building2 },
                { id: 'reports', label: 'Reports', icon: BarChart3 }
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = currentNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.isModalTrigger) {
                        setShowCreateJobModal(true);
                      } else {
                        setCurrentNav(item.id as any);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer text-left ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-extrabold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 ${
                        isActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Need Help? Box at Bottom of Sidebar */}
          <div className="mt-8 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Need Help?</p>
                <p className="text-[10px] text-slate-500">Contact KAUSHAL Support</p>
              </div>
            </div>
            <button
              onClick={() => setShowSupportModal(true)}
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition cursor-pointer shadow-2xs"
            >
              <span>Raise a Request</span>
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl w-full mx-auto space-y-6">
          {/* TAB 1: DASHBOARD VIEW (Pixel Match with Uploaded Image) */}
          {currentNav === 'dashboard' && (
            <div className="space-y-6">
              {/* HERO BANNER: Welcome Back TataTech Industries */}
              <div className="relative overflow-hidden bg-gradient-to-r from-sky-50 via-blue-50/70 to-slate-50 border border-sky-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-1.5 max-w-xl">
                    <p className="text-slate-500 font-medium text-xs sm:text-sm">Welcome back,</p>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#0f2e5a] tracking-tight">
                      TataTech Industries
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium pt-1">
                      Find. Evaluate. Hire. Build a Skilled Tomorrow.
                    </p>
                  </div>

                  {/* Architectural Building Visual & Slogan Card */}
                  <div className="flex items-center gap-4 shrink-0">
                    {/* Modern Building Graphic Representation */}
                    <div className="relative w-44 sm:w-56 h-24 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-[#0a192f] flex items-center justify-center group">
                      {/* Geometric Glass Reflection Aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3C5D] via-[#104e7a] to-[#2563eb] opacity-90" />
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:12px_12px]" />
                      <div className="relative z-10 text-center px-2">
                        <span className="text-[10px] tracking-widest text-sky-200 font-bold uppercase block">
                          INNOVATION CAMPUS
                        </span>
                        <span className="text-sm font-black text-white tracking-wide block">
                          TataTech Industries
                        </span>
                        <span className="text-[9px] text-sky-100/80 font-mono">Pune Tech Park, Hinjawadi</span>
                      </div>
                    </div>

                    {/* Slogan Card */}
                    <div className="hidden sm:block border-l-2 border-slate-300 pl-4 py-1">
                      <p className="text-sm font-extrabold text-[#0B3C5D] leading-tight">
                        Skilled Talent
                      </p>
                      <p className="text-sm font-extrabold text-[#0B3C5D] leading-tight">
                        Stronger Businesses
                      </p>
                      <div className="w-8 h-1 bg-blue-600 rounded-full mt-2" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 METRIC CARDS + "+ Create New Job" Action */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                {/* 1. Active Job Openings */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 leading-none">
                        {activeJobsCount}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Active Job Openings</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2.5">
                    <span>↑ 2 this month</span>
                  </p>
                </div>

                {/* 2. Total Applications */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 leading-none">
                        {totalApplicationsCount}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Total Applications</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2.5">
                    <span>↑ 18% vs last month</span>
                  </p>
                </div>

                {/* 3. Shortlisted Candidates */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 leading-none">
                        {shortlistedCount}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Shortlisted Candidates</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2.5">
                    <span>↑ 12% vs last month</span>
                  </p>
                </div>

                {/* 4. Hired Candidates */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-xs transition">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-slate-900 leading-none">
                        {hiredCount}
                      </p>
                      <p className="text-xs font-semibold text-slate-500 mt-1">Hired Candidates</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2.5">
                    <span>↑ 7 this month</span>
                  </p>
                </div>

                {/* 5. Create New Job Action Button */}
                <button
                  onClick={() => setShowCreateJobModal(true)}
                  className="h-full min-h-[96px] bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-4 font-bold text-sm flex flex-col items-center justify-center gap-1.5 transition shadow-sm cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 text-base">
                    <Plus className="w-5 h-5" />
                    <span>Create New Job</span>
                  </div>
                  <span className="text-[11px] font-medium text-blue-100">Post Vacancy in 2 Mins</span>
                </button>
              </div>

              {/* TWO COLUMN GRID: Left (Recent Jobs & Recent Candidates) & Right (Stages & Quick Actions) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT 2-COLUMN SPAN (Approx 68%) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* TABLE 1: RECENT JOB OPENINGS */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        Recent Job Openings
                      </h3>
                      <button
                        onClick={() => setCurrentNav('manage-jobs')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3">Job Title</th>
                            <th className="px-3 py-3">Required Skills</th>
                            <th className="px-3 py-3">Location</th>
                            <th className="px-3 py-3 text-center">Applications</th>
                            <th className="px-3 py-3 text-center">Status</th>
                            <th className="px-4 py-3 text-right">Posted On</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {jobs.map((job) => (
                            <tr key={job.id} className="hover:bg-slate-50/60 transition">
                              <td className="px-4 py-3.5 font-bold text-slate-900">
                                {job.title}
                              </td>
                              <td className="px-3 py-3.5 text-slate-600">
                                {job.requiredSkills}
                              </td>
                              <td className="px-3 py-3.5 text-slate-700 font-medium">
                                {job.location}
                              </td>
                              <td className="px-3 py-3.5 text-center font-bold text-slate-800">
                                {job.applications}
                              </td>
                              <td className="px-3 py-3.5 text-center">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    job.status === 'Active'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                                  }`}
                                >
                                  {job.status}
                                </span>
                              </td>
                              <td className="px-4 py-3.5 text-right text-slate-500 text-[11px]">
                                {job.postedOn}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* TABLE 2: RECENT CANDIDATES */}
                  <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        Recent Candidates
                      </h3>
                      <button
                        onClick={() => setCurrentNav('candidates')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-3 py-3">Applied For</th>
                            <th className="px-3 py-3">Key Skills</th>
                            <th className="px-3 py-3 text-center">Match</th>
                            <th className="px-3 py-3 text-center">Status</th>
                            <th className="px-3 py-3">Applied On</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {candidates.map((cand) => (
                            <tr key={cand.id} className="hover:bg-slate-50/60 transition">
                              <td className="px-4 py-3.5">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                                    {cand.initials}
                                  </div>
                                  <span className="font-bold text-slate-900">{cand.name}</span>
                                </div>
                              </td>
                              <td className="px-3 py-3.5 text-slate-700">
                                {cand.appliedFor}
                              </td>
                              <td className="px-3 py-3.5 text-slate-600">
                                {cand.keySkills}
                              </td>
                              <td className="px-3 py-3.5 text-center font-black text-emerald-600">
                                {cand.matchScore}%
                              </td>
                              <td className="px-3 py-3.5 text-center">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    cand.status === 'Shortlisted'
                                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                      : cand.status === 'Under Review'
                                      ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                      : cand.status === 'Interview'
                                      ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                      : cand.status === 'Hired'
                                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                                  }`}
                                >
                                  {cand.status}
                                </span>
                              </td>
                              <td className="px-3 py-3.5 text-slate-500 text-[11px]">
                                {cand.appliedOn}
                              </td>
                              <td className="px-4 py-3.5 text-right">
                                <button
                                  onClick={() => setSelectedCandidate(cand)}
                                  className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs transition cursor-pointer"
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN (Approx 32% - Candidates by Stage & Quick Actions) */}
                <div className="space-y-6">
                  {/* CARD 1: CANDIDATES BY STAGE */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base mb-4">
                      Candidates by Stage
                    </h3>

                    <div className="space-y-3 relative">
                      {[
                        { label: 'Applied', count: 246, icon: User, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                        { label: 'Under Review', count: 114, icon: FileText, color: 'text-amber-600 bg-amber-50 border-amber-200' },
                        { label: 'Shortlisted', count: 32, icon: Bookmark, color: 'text-orange-600 bg-orange-50 border-orange-200' },
                        { label: 'Interview Scheduled', count: 18, icon: Calendar, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                        { label: 'Hired', count: 14, icon: Check, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' }
                      ].map((stage, idx, arr) => {
                        const IconComponent = stage.icon;
                        return (
                          <div key={stage.label} className="relative">
                            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center border ${stage.color}`}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-semibold text-slate-700">
                                  {stage.label}
                                </span>
                              </div>
                              <span className="font-extrabold text-sm text-slate-900">
                                {stage.count}
                              </span>
                            </div>

                            {/* Connecting Dotted Line between stages */}
                            {idx < arr.length - 1 && (
                              <div className="w-[1px] h-2 bg-slate-200 ml-6 my-0.5" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* CARD 2: QUICK ACTIONS */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Quick Actions
                    </h3>

                    <div className="space-y-2.5 pt-1">
                      <button
                        onClick={() => setShowCreateJobModal(true)}
                        className="w-full p-3 bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200 rounded-xl text-xs font-bold text-blue-700 flex items-center gap-2.5 transition cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-4 h-4 text-blue-600" />
                        <span>Create New Job</span>
                      </button>

                      <button
                        onClick={() => setCurrentNav('candidates')}
                        className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2.5 transition cursor-pointer shadow-2xs"
                      >
                        <Users className="w-4 h-4 text-slate-500" />
                        <span>View All Candidates</span>
                      </button>

                      <button
                        onClick={() => {
                          const csvContent =
                            'data:text/csv;charset=utf-8,Name,Role,Score,Phone,Email\n' +
                            candidates
                              .map(
                                (c) =>
                                  `"${c.name}","${c.appliedFor}",${c.matchScore}%,"${c.phone}","${c.email}"`
                              )
                              .join('\n');
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement('a');
                          link.setAttribute('href', encodedUri);
                          link.setAttribute('download', 'TataTech_Shortlisted_Candidates.csv');
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2.5 transition cursor-pointer shadow-2xs"
                      >
                        <Download className="w-4 h-4 text-slate-500" />
                        <span>Download Shortlisted List</span>
                      </button>

                      <button
                        onClick={() => setShowHiringModal(true)}
                        className="w-full p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-2.5 transition cursor-pointer shadow-2xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Record Hiring Confirmation</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE JOBS FULL VIEW */}
          {currentNav === 'manage-jobs' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Manage Job Postings</h2>
                  <p className="text-xs text-slate-500">
                    Active &amp; archived employment mandates published on KAUSHAL State Skill Exchange
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateJobModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Post New Job</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by job title, skill or location..."
                    value={filterJobSearch}
                    onChange={(e) => setFilterJobSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Jobs Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Job Title</th>
                      <th className="p-3.5">Sector</th>
                      <th className="p-3.5">Required Skills</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Vacancies</th>
                      <th className="p-3.5">Applications</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {jobs
                      .filter(
                        (j) =>
                          j.title.toLowerCase().includes(filterJobSearch.toLowerCase()) ||
                          j.location.toLowerCase().includes(filterJobSearch.toLowerCase()) ||
                          j.requiredSkills.toLowerCase().includes(filterJobSearch.toLowerCase())
                      )
                      .map((j) => (
                        <tr key={j.id} className="hover:bg-slate-50">
                          <td className="p-3.5 font-bold text-slate-900">{j.title}</td>
                          <td className="p-3.5 text-slate-600">{j.sector}</td>
                          <td className="p-3.5 text-slate-600">{j.requiredSkills}</td>
                          <td className="p-3.5 text-slate-700 font-medium">{j.location}</td>
                          <td className="p-3.5 text-slate-800 font-bold">{j.vacancies}</td>
                          <td className="p-3.5 text-slate-800 font-bold text-blue-600">
                            {j.applications}
                          </td>
                          <td className="p-3.5">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                j.status === 'Active'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {j.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right space-x-2">
                            <button
                              onClick={() => {
                                setJobs(
                                  jobs.map((item) =>
                                    item.id === j.id
                                      ? { ...item, status: item.status === 'Active' ? 'Closed' : 'Active' }
                                      : item
                                  )
                                );
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold cursor-pointer"
                            >
                              {j.status === 'Active' ? 'Close Opening' : 'Reactivate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CANDIDATES / SHORTLISTED / HIRED VIEW */}
          {(currentNav === 'candidates' ||
            currentNav === 'shortlisted' ||
            currentNav === 'hired') && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {currentNav === 'shortlisted'
                      ? 'Shortlisted Talent Pool'
                      : currentNav === 'hired'
                      ? 'Confirmed Apprentices & Hires'
                      : 'Candidate Applications'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Pre-assessed vocational trainees with verified Aadhaar &amp; Skill India credentials
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const csvContent =
                        'data:text/csv;charset=utf-8,Name,Role,Score,Phone,Email,Status\n' +
                        candidates
                          .map(
                            (c) =>
                              `"${c.name}","${c.appliedFor}",${c.matchScore}%,"${c.phone}","${c.email}","${c.status}"`
                          )
                          .join('\n');
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement('a');
                      link.setAttribute('href', encodedUri);
                      link.setAttribute('download', 'TataTech_Candidate_Export.csv');
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Candidate Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter candidates by name, qualification, or skill..."
                  value={filterCandidateSearch}
                  onChange={(e) => setFilterCandidateSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Candidate Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {candidates
                  .filter((c) => {
                    if (currentNav === 'shortlisted') return c.status === 'Shortlisted';
                    if (currentNav === 'hired') return c.status === 'Hired';
                    return true;
                  })
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(filterCandidateSearch.toLowerCase()) ||
                      c.appliedFor.toLowerCase().includes(filterCandidateSearch.toLowerCase()) ||
                      c.keySkills.toLowerCase().includes(filterCandidateSearch.toLowerCase())
                  )
                  .map((c) => (
                    <div
                      key={c.id}
                      className="border border-slate-200 rounded-2xl p-4.5 bg-white hover:border-blue-300 transition shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm flex items-center justify-center">
                            {c.initials}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                            <p className="text-xs text-blue-700 font-semibold">{c.appliedFor}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-black text-emerald-600">
                            {c.matchScore}%
                          </span>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">
                            Match
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <p>
                          <span className="font-semibold text-slate-700">Skills:</span> {c.keySkills}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-700">Qualification:</span> {c.education}
                        </p>
                        <p>
                          <span className="font-semibold text-slate-700">NSQF:</span> {c.nsqfLevel}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            c.status === 'Shortlisted'
                              ? 'bg-amber-50 text-amber-800 border border-amber-200'
                              : c.status === 'Under Review'
                              ? 'bg-blue-50 text-blue-800 border border-blue-200'
                              : c.status === 'Interview'
                              ? 'bg-purple-50 text-purple-800 border border-purple-200'
                              : c.status === 'Hired'
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {c.status}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedCandidate(c)}
                            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-xs transition cursor-pointer"
                          >
                            View Passport
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: COMPANY PROFILE */}
          {currentNav === 'company-profile' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">TataTech Industries Corporate Profile</h2>
                  <p className="text-xs text-slate-500">
                    Official enterprise empanelment under Maharashtra Skill Development Society (MSSDS)
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verified Corporate Empanelment</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">Corporate Name</span>
                    <span className="font-bold text-slate-900 text-sm">Tata Technologies Limited (Automotive &amp; Industrial)</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">Corporate Identification (CIN)</span>
                    <span className="font-bold text-slate-900 font-mono">U72200PN1994PLC013313</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">Registered Mobile (Portal ID)</span>
                    <span className="font-bold text-slate-900 font-mono">8252678014</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">Headquarters Address</span>
                    <span className="font-bold text-slate-900">Plot No. 25, Rajiv Gandhi Infotech Park, Hinjawadi Phase 1, Pune - 411057</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">NAPS / NATS Registration</span>
                    <span className="font-bold text-slate-900 font-mono">NAPS-MH-IND-882103</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 uppercase font-semibold block text-[10px]">State Apprenticeship Advisor MoU</span>
                    <span className="font-bold text-emerald-700">Valid through March 2029 (5-Year Direct Empanelment)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REPORTS & ANALYTICS */}
          {currentNav === 'reports' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
              <div className="pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900">Hiring &amp; Retention Analytics (FY 2026-27)</h2>
                <p className="text-xs text-slate-500">
                  Comprehensive performance breakdown of NSQF trainees and NAPS apprentice cohorts
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <span className="text-xs font-semibold text-blue-900">Avg Skill Match Score</span>
                  <p className="text-2xl font-black text-blue-700 mt-1">86.4%</p>
                  <p className="text-[11px] text-blue-600 mt-1">Top 5% across Maharashtra automotive cluster</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <span className="text-xs font-semibold text-emerald-900">Apprentice Retention Rate</span>
                  <p className="text-2xl font-black text-emerald-700 mt-1">94.2%</p>
                  <p className="text-[11px] text-emerald-600 mt-1">Converted to Full-Time Tech Roles</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
                  <span className="text-xs font-semibold text-purple-900">State Stipend Subsidies</span>
                  <p className="text-2xl font-black text-purple-700 mt-1">₹4.8 Lakhs</p>
                  <p className="text-[11px] text-purple-600 mt-1">Disbursed directly via DBT to apprentices</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: CANDIDATE DETAIL & DIGITAL PASSPORT MODAL */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-800 font-black text-base flex items-center justify-center">
                  {selectedCandidate.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-blue-700 font-semibold">{selectedCandidate.appliedFor}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900">AI Skill Match with Job Spec</span>
                <span className="text-lg font-black text-emerald-700">
                  {selectedCandidate.matchScore}% Match
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-semibold text-[10px] block">Location</span>
                  <span className="font-bold text-slate-800">{selectedCandidate.location}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-slate-400 font-semibold text-[10px] block">Current Status</span>
                  <span className="font-bold text-blue-700">{selectedCandidate.status}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 font-semibold text-[10px] block">Qualifications</span>
                <p className="font-medium text-slate-800">{selectedCandidate.education}</p>
                <p className="text-slate-600">{selectedCandidate.nsqfLevel}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 font-semibold text-[10px] block">Contact Coordinates</span>
                <p className="font-medium text-slate-800">{selectedCandidate.phone}</p>
                <p className="text-slate-600 font-mono">{selectedCandidate.email}</p>
              </div>
            </div>

            {/* Candidate Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  handleUpdateCandidateStatus(selectedCandidate.id, 'Shortlisted');
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs cursor-pointer text-center"
              >
                Shortlist Candidate
              </button>
              <button
                onClick={() => {
                  handleUpdateCandidateStatus(selectedCandidate.id, 'Interview');
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs cursor-pointer text-center"
              >
                Schedule Interview
              </button>
              <button
                onClick={() => {
                  handleUpdateCandidateStatus(selectedCandidate.id, 'Hired');
                  setSelectedCandidate(null);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs cursor-pointer text-center"
              >
                Mark Hired
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE JOB OPENING MODAL */}
      {showCreateJobModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <PlusCircle className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Post New Job Opening</h3>
              </div>
              <button
                onClick={() => setShowCreateJobModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Job Designation / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Battery Assembly Engineer or CNC Operator"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Industry Sector</label>
                  <select
                    value={newJob.sector}
                    onChange={(e) => setNewJob({ ...newJob, sector: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="EV & Automotive">EV &amp; Automotive</option>
                    <option value="Renewable Energy">Renewable Energy</option>
                    <option value="IT & Software">IT &amp; Software</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Logistics">Logistics &amp; Supply Chain</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Maharashtra Location</label>
                  <select
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Pune">Pune (Hinjawadi / Chakan)</option>
                    <option value="Mumbai">Mumbai / Navi Mumbai</option>
                    <option value="Nagpur">Nagpur (MIHAN)</option>
                    <option value="Nashik">Nashik MIDC</option>
                    <option value="Aurangabad">Aurangabad (Shendra)</option>
                    <option value="Kolhapur">Kolhapur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Required Skills (Comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Battery Management, High Voltage Isolation, CAD"
                  value={newJob.requiredSkills}
                  onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. of Vacancies</label>
                  <input
                    type="number"
                    min="1"
                    value={newJob.vacancies}
                    onChange={(e) => setNewJob({ ...newJob, vacancies: Number(e.target.value) })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Stipend / CTC</label>
                  <input
                    type="text"
                    value={newJob.stipend}
                    onChange={(e) => setNewJob({ ...newJob, stipend: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateJobModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs cursor-pointer"
                >
                  Publish Job Mandate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: KAUSHAL SUPPORT / RAISE A REQUEST */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">KAUSHAL Employer Support</h3>
              </div>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-3 text-slate-600">
              <p>
                Connect directly with the Maharashtra State Skill Development Society (MSSDS) Industry Partnership Cell.
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <p className="font-bold text-slate-800">Toll-Free Employer Helpline:</p>
                <p className="text-sm font-mono font-bold text-blue-700">1800-267-1234 / 022-2287 4000</p>
                <p className="text-[11px] text-slate-500">Mon - Sat: 9:30 AM to 6:00 PM</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="font-bold text-slate-800">NAPS Subsidies Helpdesk:</p>
                <p className="text-slate-600">industry.help@kaushal.maharashtra.gov.in</p>
              </div>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* MODAL 4: RECORD HIRING CONFIRMATION */}
      {showHiringModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Record Hiring Confirmation</h3>
              </div>
              <button
                onClick={() => setShowHiringModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <p className="text-slate-600">
                Selecting a candidate will automatically issue their digital NAPS apprenticeship contract and lock their placement record on the KAUSHAL state registry.
              </p>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Candidate from Shortlist</label>
                <select
                  id="hiring-candidate-select"
                  className="w-full p-2.5 border border-slate-300 rounded-xl bg-white focus:outline-none focus:border-blue-600"
                >
                  {candidates.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.appliedFor} ({c.matchScore}% Match)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowHiringModal(false)}
                className="px-4 py-2 border border-slate-300 rounded-xl font-bold text-slate-600 hover:bg-slate-50 cursor-pointer text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const selectEl = document.getElementById('hiring-candidate-select') as HTMLSelectElement;
                  if (selectEl) {
                    handleUpdateCandidateStatus(selectEl.value, 'Hired');
                  }
                  setShowHiringModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs cursor-pointer text-xs"
              >
                Confirm Placement
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
