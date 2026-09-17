import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  Layers,
  GraduationCap,
  Users,
  CheckSquare,
  Award,
  Briefcase,
  BarChart3,
  FileText,
  Bell,
  Settings,
  Search,
  ChevronDown,
  MapPin,
  Calendar,
  Sparkles,
  TrendingUp,
  Clock,
  Plus,
  UserPlus,
  CalendarPlus,
  ClipboardCheck,
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Phone,
  X
} from 'lucide-react';

interface TrainingPartnerDashboardProps {
  onLogout: () => void;
  partnerInfo?: {
    mobile?: string;
    centerName?: string;
    centerId?: string;
    managerName?: string;
  };
}

export const TrainingPartnerDashboard: React.FC<TrainingPartnerDashboardProps> = ({
  onLogout,
  partnerInfo = {
    mobile: '8252678014',
    centerName: 'Pune Skill Development Centre',
    centerId: 'KTP-MH-C001',
    managerName: 'Sanjay More'
  }
}) => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Todo tasks state
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'Update September attendance', completed: false },
    { id: 2, text: 'Submit August assessment marks', completed: false },
    { id: 3, text: 'Upload placement data (Q2)', completed: true },
    { id: 4, text: 'Renew fire safety certificate', completed: true },
    { id: 5, text: 'Complete trainer verification', completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodoList(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const triggerAction = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  // Nav items from the reference UI
  const navItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Centre Profile', label: 'Centre Profile', icon: Building2 },
    { id: 'Training Programmes', label: 'Training Programmes', icon: BookOpen },
    { id: 'Batches', label: 'Batches', icon: Layers },
    { id: 'Trainees', label: 'Trainees', icon: GraduationCap },
    { id: 'Trainers', label: 'Trainers', icon: Users },
    { id: 'Assessments', label: 'Assessments', icon: CheckSquare },
    { id: 'Certification', label: 'Certification', icon: Award },
    { id: 'Placement & Outcomes', label: 'Placement & Outcomes', icon: Briefcase },
    { id: 'Reports', label: 'Reports', icon: BarChart3 },
    { id: 'Documents', label: 'Documents', icon: FileText },
    { id: 'Notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  // Ongoing programmes
  const programmes = [
    {
      id: 'p1',
      title: 'Full Stack Web Development',
      sector: 'IT & ITES',
      hours: '500 Hours',
      nsqf: 'NSQF Level 5',
      batches: '4 Batches',
      icon: '💻',
      status: 'Ongoing'
    },
    {
      id: 'p2',
      title: 'Solar PV Installation Technician',
      sector: 'Renewable Energy',
      hours: '300 Hours',
      nsqf: 'NSQF 4',
      batches: '3 Batches',
      icon: '⚙️',
      status: 'Ongoing'
    },
    {
      id: 'p3',
      title: 'Retail Sales Associate',
      sector: 'Retail',
      hours: '200 Hours',
      nsqf: 'NSQF 3',
      batches: '3 Batches',
      icon: '🛒',
      status: 'Ongoing'
    },
    {
      id: 'p4',
      title: 'Electric Vehicle Service Technician',
      sector: 'Automotive',
      hours: '300 Hours',
      nsqf: 'NSQF 4',
      batches: '2 Batches',
      icon: '🚗',
      status: 'Ongoing'
    },
  ];

  // Trainers at this centre
  const trainers = [
    { initials: 'PS', name: 'Prashant Shinde', domain: 'EV & Automotive', status: 'Active' },
    { initials: 'RK', name: 'Ritika Kulkarni', domain: 'IT & Digital Skills', status: 'Active' },
    { initials: 'AM', name: 'Amol More', domain: 'Renewable Energy', status: 'Active' },
    { initials: 'SP', name: 'Sneha Patil', domain: 'Soft Skills & Employability', status: 'Active' },
  ];

  // Recent Batches
  const recentBatches = [
    { id: 'PDC-FSW-2026-03', programme: 'Full Stack Web Development', start: '01 Sep 2026', end: '28 Feb 2027', trainees: '28/30', status: 'Ongoing' },
    { id: 'PDC-SPV-2026-02', programme: 'Solar PV Technician', start: '15 Aug 2026', end: '15 Feb 2027', trainees: '25/25', status: 'Completed' },
    { id: 'PDC-RSA-2026-01', programme: 'Retail Sales Associate', start: '01 Jul 2026', end: '31 Dec 2026', trainees: '30/30', status: 'Completed' },
    { id: 'PDC-EV-2026-01', programme: 'EV Service Technician', start: '10 Aug 2026', end: '10 Feb 2027', trainees: '27/30', status: 'Ongoing' },
  ];

  // Announcements
  const announcements = [
    {
      id: 'a1',
      title: 'Quarterly Placement Drive',
      desc: 'Placement drive with Tech Mahindra on 20 Sep 2026.',
      date: '16 Sep 2026',
      iconBg: 'bg-orange-100 text-orange-600',
      icon: '📢'
    },
    {
      id: 'a2',
      title: 'NSQF Guidelines Updated',
      desc: 'Revised assessment guidelines released.',
      date: '12 Sep 2026',
      iconBg: 'bg-blue-100 text-blue-600',
      icon: '📄'
    },
    {
      id: 'a3',
      title: 'Fire Safety Certificate Renewal',
      desc: 'Please ensure fire safety certificate is valid.',
      date: '10 Sep 2026',
      iconBg: 'bg-amber-100 text-amber-700',
      icon: '🧯'
    },
    {
      id: 'a4',
      title: 'MSSDS Review Visit',
      desc: 'Training centre review scheduled on 25 Sep 2026.',
      date: '08 Sep 2026',
      iconBg: 'bg-purple-100 text-purple-700',
      icon: '🏛️'
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f4f6] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#ea580c] selection:text-white">
      
      {/* 1. TOP HEADER BAR matching reference */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: KAUSHAL Logo & Portal Name */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="h-10 shrink-0 flex items-center justify-center">
              <img
                src="/images/kaushal-logo.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src.endsWith('/images/kaushal-logo.png')) {
                    target.src = '/kaushal-logo.png';
                  } else if (target.src.endsWith('/kaushal-logo.png')) {
                    target.src = '/images/kaushal-logo.svg';
                  }
                }}
                alt="KAUSHAL Logo"
                className="h-8 sm:h-9 w-auto object-contain select-none"
              />
            </div>
            <div>
              <div className="text-base sm:text-lg font-black tracking-wider text-[#0f2e5a] leading-none">
                KAUSHAL
              </div>
              <div className="text-[10px] text-slate-500 font-semibold tracking-tight mt-0.5">
                Knowledge &amp; Analytics for Upgrading Skills, Hiring, And Livelihoods
              </div>
            </div>
          </div>

          {/* Right: Search, Notifications & User profile */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Box */}
            <div className="relative hidden sm:block w-64 lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search (trainees, batches, reports...)"
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 relative cursor-pointer transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9.5px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Centre Alerts</span>
                    <span className="text-[10px] font-bold text-[#ea580c]">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="px-4 py-2.5 text-xs hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">Quarterly Placement Drive on 20 Sep</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Tech Mahindra drive registrations closing</p>
                    </div>
                    <div className="px-4 py-2.5 text-xs hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">NSQF Rev 2.0 Guidelines Released</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Please review module hours for Solar PV</p>
                    </div>
                    <div className="px-4 py-2.5 text-xs hover:bg-slate-50 cursor-pointer">
                      <p className="font-semibold text-slate-800">Fire Safety Audit Expiring Soon</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Renewal required before 30 Sep 2026</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile avatar & dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 cursor-pointer transition"
              >
                <div className="w-8 h-8 rounded-full bg-[#2c1444] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  SM
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {partnerInfo.managerName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium leading-tight">
                    Centre Manager &bull; {partnerInfo.mobile}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 text-xs">
                    <span className="font-bold text-slate-900 block">{partnerInfo.centerName}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">ID: {partnerInfo.centerId}</span>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">● Active Empanelled Centre</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      triggerAction('Opening Centre Settings...');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Manage Centre</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Action toast */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2e5a] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-bold flex items-center gap-2 border border-slate-700 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionToast}</span>
        </div>
      )}

      {/* 2. BODY LAYOUT: LEFT SIDEBAR + RIGHT DASHBOARD CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR NAVIGATION matching reference dark navy palette */}
        <aside className="w-60 bg-[#1e293b] text-slate-300 flex flex-col shrink-0 border-r border-slate-800">
          <div className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id !== 'Dashboard') {
                      triggerAction(`Navigated to ${item.label}`);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-[#ea580c] text-white font-bold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Need Help Box */}
          <div className="p-3 border-t border-slate-800">
            <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                <HelpCircle className="w-4 h-4 text-[#ea580c]" />
                <span>Need Help?</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-2.5">
                Contact Support &bull; Toll Free 1800-120-8040
              </p>
              <button
                type="button"
                onClick={() => triggerAction('Support ticket form initiated. Desk agent assigned: MSSDS Helpdesk.')}
                className="w-full py-1.5 px-2 bg-white text-slate-900 rounded-lg text-[11px] font-bold hover:bg-slate-100 flex items-center justify-center gap-1 cursor-pointer transition"
              >
                <span>Raise a Request</span>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          
          {/* A. CENTRE HERO CARD WITH IMAGE & MAHARASHTRA PIN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              
              {/* Left side: Building image + details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-2xs relative">
                  <img
                    src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"
                    alt="Skill Development Centre"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-black uppercase text-center py-0.5 rounded px-1">
                    SKILL DEVELOPMENT CENTRE
                  </div>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-black bg-emerald-100 text-emerald-700 uppercase tracking-wide">
                      Active
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 font-mono">
                      MSSDS Empanelled TP
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {partnerInfo.centerName}
                  </h1>
                  <p className="text-xs font-semibold text-slate-600">
                    Shakti Skill Academy Pvt. Ltd. &bull; Registered TP
                  </p>

                  {/* Metadata Chips matching reference */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Centre ID</span>
                      <span className="font-bold text-slate-800 font-mono">{partnerInfo.centerId}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Location</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                        Hinjawadi, Pune
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Centre Type</span>
                      <span className="font-bold text-slate-800">Permanent</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Established</span>
                      <span className="font-bold text-slate-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                        2021
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Training Capacity</span>
                      <span className="font-bold text-slate-800">300 per batch</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side: Maharashtra stylized map badge */}
              <div className="hidden lg:flex items-center gap-4 pl-6 border-l border-slate-200 shrink-0">
                <div className="w-32 h-24 bg-amber-50 rounded-xl border border-amber-200/80 p-2 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="text-3xl select-none opacity-80">🗺️</div>
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75" />
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-red-600 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-900 mt-1">Pune, Maharashtra</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Pune, Maharashtra</div>
                  <button
                    type="button"
                    onClick={() => triggerAction('Opening Geo-Location coordinates: 18.5912° N, 73.7389° E')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1 cursor-pointer"
                  >
                    <span>View on Map</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* B. FIVE KEY STAT METRIC CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            
            {/* 1. Enrolled Trainees */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  286
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Enrolled Trainees
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 12% vs last quarter</span>
                </div>
              </div>
            </div>

            {/* 2. Completed Trainees */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  198
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Completed Trainees
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 15% vs last quarter</span>
                </div>
              </div>
            </div>

            {/* 3. Certified Trainees */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Award className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  176
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Certified Trainees
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 18% vs last quarter</span>
                </div>
              </div>
            </div>

            {/* 4. Placed Trainees */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  124
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Placed Trainees
                </div>
                <div className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3 h-3" />
                  <span>↑ 22% vs last quarter</span>
                </div>
              </div>
            </div>

            {/* 5. Active Batches */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs col-span-2 sm:col-span-1">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <Layers className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
                  12
                </div>
                <div className="text-xs font-semibold text-slate-600 mt-1">
                  Active Batches
                </div>
                <div className="text-[10.5px] font-semibold text-slate-500 mt-2">
                  8 Ongoing &bull; 4 Upcoming
                </div>
              </div>
            </div>

          </div>

          {/* C. THREE-COLUMN SECTION: TRAINEE PROGRESS CHART | ONGOING PROGRAMMES | TRAINERS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Trainee Progress Chart (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Trainee Progress</h2>
                    <p className="text-[11px] text-slate-500">Cumulative performance trend</p>
                  </div>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="text-xs border border-slate-300 rounded-lg px-2.5 py-1 bg-slate-50 text-slate-700 font-medium focus:outline-none"
                  >
                    <option>Last 6 Months</option>
                    <option>Year 2026</option>
                    <option>All Time</option>
                  </select>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <span>Enrolled</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Certified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                    <span>Placed</span>
                  </div>
                </div>

                {/* SVG Line Graph */}
                <div className="w-full h-48 sm:h-52 relative pt-2">
                  <svg viewBox="0 0 400 180" className="w-full h-full overflow-visible">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="390" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="60" x2="390" y2="60" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="100" x2="390" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="40" y1="140" x2="390" y2="140" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Y Axis text */}
                    <text x="10" y="24" fontSize="9" fill="#94a3b8" fontWeight="600">300</text>
                    <text x="10" y="64" fontSize="9" fill="#94a3b8" fontWeight="600">200</text>
                    <text x="10" y="104" fontSize="9" fill="#94a3b8" fontWeight="600">100</text>
                    <text x="25" y="144" fontSize="9" fill="#94a3b8" fontWeight="600">0</text>

                    {/* Line 1: Enrolled (Blue) */}
                    <path
                      d="M 60 130 Q 120 95 180 82 T 300 48 T 370 28"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.5"
                    />
                    <circle cx="60" cy="130" r="3.5" fill="#2563eb" />
                    <circle cx="120" cy="102" r="3.5" fill="#2563eb" />
                    <circle cx="180" cy="85" r="3.5" fill="#2563eb" />
                    <circle cx="240" cy="76" r="3.5" fill="#2563eb" />
                    <circle cx="300" cy="48" r="3.5" fill="#2563eb" />
                    <circle cx="370" cy="28" r="4" fill="#2563eb" />
                    <text x="375" y="32" fontSize="10" fontWeight="bold" fill="#1e40af">286</text>

                    {/* Line 2: Completed (Green) */}
                    <path
                      d="M 60 145 Q 120 125 180 110 T 300 80 T 370 65"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                    <circle cx="60" cy="145" r="3" fill="#10b981" />
                    <circle cx="180" cy="110" r="3" fill="#10b981" />
                    <circle cx="370" cy="65" r="3.5" fill="#10b981" />
                    <text x="375" y="69" fontSize="10" fontWeight="bold" fill="#047857">198</text>

                    {/* Line 3: Certified (Amber) */}
                    <path
                      d="M 60 152 Q 120 135 180 120 T 300 95 T 370 78"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                    />
                    <circle cx="370" cy="78" r="3" fill="#f59e0b" />
                    <text x="375" y="82" fontSize="10" fontWeight="bold" fill="#b45309">176</text>

                    {/* Line 4: Placed (Purple) */}
                    <path
                      d="M 60 160 Q 120 148 180 135 T 300 115 T 370 102"
                      fill="none"
                      stroke="#9333ea"
                      strokeWidth="2"
                    />
                    <circle cx="370" cy="102" r="3" fill="#9333ea" />
                    <text x="375" y="106" fontSize="10" fontWeight="bold" fill="#7e22ce">124</text>

                    {/* X Axis Months */}
                    <text x="55" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">Apr</text>
                    <text x="115" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">May</text>
                    <text x="175" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">Jun</text>
                    <text x="235" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">Jul</text>
                    <text x="295" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">Aug</text>
                    <text x="355" y="165" fontSize="9" fill="#94a3b8" fontWeight="600">Sep</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Ongoing Training Programmes (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900">Ongoing Training Programmes</h2>
                  <button
                    type="button"
                    onClick={() => triggerAction('Opening all 4 approved training programmes...')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {programmes.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between gap-3 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-lg shrink-0 shadow-2xs">
                          {p.icon}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 leading-tight">
                            {p.title}
                          </h4>
                          <div className="text-[10.5px] text-slate-500 mt-0.5">
                            {p.sector} &bull; {p.hours} &bull; {p.nsqf}
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-700">
                          {p.status}
                        </span>
                        <div className="text-[10px] text-slate-500 font-medium mt-1">
                          {p.batches}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trainers at This Centre (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900">Trainers at This Centre</h2>
                  <button
                    type="button"
                    onClick={() => triggerAction('Opening certified ToT trainers directory...')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  {trainers.map((tr, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                          {tr.initials}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 leading-tight">
                            {tr.name}
                          </div>
                          <div className="text-[10.5px] text-slate-500">
                            {tr.domain}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                        {tr.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerAction('Opening form to nominate & onboard new ToT trainer...')}
                className="mt-4 w-full py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition"
              >
                <Plus className="w-3.5 h-3.5 text-slate-500" />
                <span>Add Trainer</span>
              </button>
            </div>

          </div>

          {/* D. FIVE QUICK ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <button
              type="button"
              onClick={() => triggerAction('Opening Trainee Enrollment & Aadhaar verification modal...')}
              className="p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 text-blue-900 border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-blue-600" />
              <span>+ Add Trainee</span>
            </button>

            <button
              type="button"
              onClick={() => triggerAction('Opening Batch Creation wizard with NSQF hours scheduler...')}
              className="p-3 rounded-xl bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 border border-amber-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-amber-600" />
              <span>+ Create New Batch</span>
            </button>

            <button
              type="button"
              onClick={() => triggerAction('Opening AEBAS biometric & daily attendance log sheet...')}
              className="p-3 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/70 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <ClipboardCheck className="w-4 h-4 text-emerald-600" />
              <span>+ Mark Attendance</span>
            </button>

            <button
              type="button"
              onClick={() => triggerAction('Opening Assessment Result upload window (SSC / NCVET)...')}
              className="p-3 rounded-xl bg-purple-50/70 hover:bg-purple-100/70 text-purple-900 border border-purple-200 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <Upload className="w-4 h-4 text-purple-600" />
              <span>Upload Assessment Marks</span>
            </button>

            <button
              type="button"
              onClick={() => triggerAction('Generating QR-verifiable KAUSHAL state certificates...')}
              className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer col-span-2 sm:col-span-1"
            >
              <Award className="w-4 h-4 text-slate-700" />
              <span>Generate Certificates</span>
            </button>
          </div>

          {/* E. THREE BOTTOM PANELS: RECENT BATCHES | ANNOUNCEMENTS | TO DO */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Recent Batches (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">Recent Batches</h2>
                <button
                  type="button"
                  onClick={() => triggerAction('Opening all active & archived batches...')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold text-[10.5px]">
                      <th className="pb-2">Batch ID</th>
                      <th className="pb-2">Programme</th>
                      <th className="pb-2">Start Date</th>
                      <th className="pb-2">End Date</th>
                      <th className="pb-2">Trainees</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentBatches.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 font-bold font-mono text-slate-900 text-[11px]">{b.id}</td>
                        <td className="py-2.5 font-medium text-slate-700 max-w-[120px] truncate">{b.programme}</td>
                        <td className="py-2.5 text-slate-500">{b.start}</td>
                        <td className="py-2.5 text-slate-500">{b.end}</td>
                        <td className="py-2.5 font-semibold text-slate-700">{b.trainees}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              b.status === 'Ongoing'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Announcements (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900">Announcements</h2>
                <button
                  type="button"
                  onClick={() => triggerAction('Opening Directorate circulars and notifications...')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3.5">
                {announcements.map((an) => (
                  <div key={an.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 ${an.iconBg}`}>
                      {an.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {an.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0 font-medium">{an.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {an.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* To Do (3 cols) */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-bold text-slate-900">To Do</h2>
                  <button
                    type="button"
                    onClick={() => triggerAction('Viewing all compliance tasks...')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {todoList.map((td) => (
                    <label
                      key={td.id}
                      className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer select-none group"
                    >
                      <input
                        type="checkbox"
                        checked={td.completed}
                        onChange={() => toggleTodo(td.id)}
                        className="mt-0.5 w-4 h-4 rounded text-[#ea580c] focus:ring-[#ea580c] border-slate-300 cursor-pointer accent-[#ea580c]"
                      />
                      <span className={`leading-tight ${td.completed ? 'line-through text-slate-400' : 'font-medium group-hover:text-slate-900'}`}>
                        {td.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{todoList.filter(t => t.completed).length} of {todoList.length} completed</span>
                <span className="font-bold text-emerald-600">
                  {Math.round((todoList.filter(t => t.completed).length / todoList.length) * 100)}%
                </span>
              </div>
            </div>

          </div>

        </main>
      </div>

    </div>
  );
};
