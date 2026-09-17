import React, { useState } from 'react';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Award,
  Trophy,
  Briefcase,
  MessageSquare,
  FileText,
  Bell,
  Headphones,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Download,
  Calendar,
  MapPin,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  Sparkles,
  Building2,
  X,
  Phone,
  Mail,
  ShieldCheck,
  Clock,
  Printer
} from 'lucide-react';

interface TraineeDashboardProps {
  onSignOut: () => void;
  onNavigateHome: () => void;
  onNavigateToCourses?: () => void;
  onNavigateToJobs?: () => void;
}

export const TraineeDashboard: React.FC<TraineeDashboardProps> = ({
  onSignOut,
  onNavigateHome,
  onNavigateToCourses,
  onNavigateToJobs
}) => {
  const [activeNav, setActiveNav] = useState<
    | 'dashboard'
    | 'profile'
    | 'courses'
    | 'certificates'
    | 'achievements'
    | 'placement'
    | 'feedback'
    | 'documents'
    | 'notifications'
  >('dashboard');

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showOfferLetterModal, setShowOfferLetterModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState<string | null>(null);
  const [showRaiseRequestModal, setShowRaiseRequestModal] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  // To-Do interactive checklist state
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: 'Complete practical assessment', done: false },
    { id: 2, text: 'Upload updated resume', done: false },
    { id: 3, text: 'Apply for recommended jobs', done: true },
    { id: 4, text: 'Attend career guidance webinar', done: false }
  ]);

  // Feedback carousel state
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const feedbackList = [
    {
      month: 'August 2026',
      rating: 4.2,
      tag: 'Good Performance',
      quote:
        'Shows good technical understanding and discipline. Needs to improve communication skills. Overall performance is satisfactory.',
      author: 'Training Centre Mentor'
    },
    {
      month: 'July 2026',
      rating: 4.5,
      tag: 'Excellent Progress',
      quote:
        'Demonstrated strong fault-diagnosis ability in EV battery management diagnostics and high workshop safety adherence.',
      author: 'Lead Instructor, MST Institute'
    },
    {
      month: 'June 2026',
      rating: 4.0,
      tag: 'Satisfactory',
      quote:
        'Consistent in practical lab assignments. Great teamwork during rooftop solar cabling demonstration.',
      author: 'Pune Skill Centre Evaluator'
    }
  ];

  const toggleTodo = (id: number) => {
    setTodoItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. Official Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 sm:px-6 py-2.5 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Government of Maharashtra Emblem */}
          <div
            onClick={onNavigateHome}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition"
            title="Return to Main Portal"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
              <img
                src="/images/govt-maharashtra.png"
                alt="Government of Maharashtra"
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] sm:text-xs font-black tracking-wide text-slate-900 uppercase">
                Government of Maharashtra
              </div>
              <div className="text-[9px] sm:text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
                Department of Skill Development &amp; Entrepreneurship
              </div>
            </div>
          </div>

          {/* Center: KAUSHAL Branding Title */}
          <div
            onClick={onNavigateHome}
            className="hidden md:flex flex-col items-center text-center cursor-pointer hover:opacity-95 transition"
            title="Return to Main Portal"
          >
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-[#0B3C5D]">
              KAUSHAL
            </h1>
            <p className="text-[9px] sm:text-[10px] text-slate-500 tracking-tight">
              Knowledge &amp; Analytics for Upgrading Skills, Hiring, And Livelihoods
            </p>
          </div>

          {/* Right: Portal button, Notifications & Aditya Raut Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
              title="Return to Public KAUSHAL Portal"
            >
              <Home className="w-3.5 h-3.5 text-[#103770]" />
              <span className="hidden sm:inline">Main Portal</span>
            </button>

            {/* Notification Bell with Badge 3 */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">Notifications (3 Unread)</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                    <div className="p-3 hover:bg-slate-50 cursor-pointer flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Tata Technologies Offer Letter Released
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Your appointment for Junior Service Engineer is ready to view.
                        </p>
                        <span className="text-[10px] text-slate-400">10 mins ago</span>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          Upcoming Assessment Reminder
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Practical Assessment (EV) is scheduled on 10 Sep 2026.
                        </p>
                        <span className="text-[10px] text-slate-400">2 hours ago</span>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-900">
                          NSDC Certificate Available
                        </p>
                        <p className="text-[11px] text-slate-500">
                          EV Service Technician Certificate signed &amp; verified.
                        </p>
                        <span className="text-[10px] text-slate-400">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Pill: AR Avatar + Aditya Raut + Trainee */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-100 border border-slate-200 transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  AR
                </div>
                <div className="hidden sm:block text-left leading-tight">
                  <div className="text-xs font-bold text-slate-900">Aditya Raut</div>
                  <div className="text-[10px] text-slate-500">Trainee</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-0.5" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Aditya Raut</p>
                    <p className="text-[11px] text-slate-500">KID-8252678014</p>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Status: Placed
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setActiveNav('profile');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile &amp; Bio</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      setShowOfferLetterModal(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span>View Offer Letter</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigateHome();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Home className="w-4 h-4 text-slate-400" />
                    <span>View Public Portal</span>
                  </button>
                  <div className="border-t border-slate-100 my-1" />
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Dashboard Layout (Sidebar + Content) */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col justify-between shrink-0 p-4 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto">
          <div className="space-y-1">
            <button
              onClick={() => setActiveNav('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveNav('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'profile'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setActiveNav('courses')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'courses'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>My Courses</span>
            </button>

            <button
              onClick={() => setActiveNav('certificates')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'certificates'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4 text-slate-500" />
              <span>My Certificates</span>
            </button>

            <button
              onClick={() => setActiveNav('achievements')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'achievements'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Trophy className="w-4 h-4 text-slate-500" />
              <span>My Achievements</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('placement');
                setShowOfferLetterModal(true);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'placement'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span>Placement Details</span>
            </button>

            <button
              onClick={() => setActiveNav('feedback')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'feedback'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-slate-500" />
              <span>Feedback &amp; Reviews</span>
            </button>

            <button
              onClick={() => setActiveNav('documents')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'documents'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>My Documents</span>
            </button>

            <button
              onClick={() => {
                setActiveNav('notifications');
                setShowNotifications(true);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeNav === 'notifications'
                  ? 'bg-blue-50 text-blue-700 font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bell className="w-4 h-4 text-slate-500" />
              <span>Notifications</span>
            </button>
          </div>

          {/* Need Help Card in Sidebar */}
          <div className="pt-4 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-[#103770] flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Need Help?</h4>
                <p className="text-[11px] text-slate-500">Contact KAUSHAL Support</p>
              </div>
              <button
                onClick={() => setShowRaiseRequestModal(true)}
                className="w-full py-2 px-3 border border-slate-300 hover:bg-white bg-white/70 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Raise a Request</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 overflow-x-hidden">
          {/* Welcome Hero Banner */}
          <div className="bg-gradient-to-r from-blue-50/90 via-indigo-50/50 to-slate-50 border border-blue-100/90 rounded-2xl p-5 sm:p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4 sm:gap-5">
              {/* Circular Avatar AR */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#bfdbfe] text-[#1d4ed8] flex items-center justify-center text-xl sm:text-2xl font-black shrink-0 shadow-inner">
                AR
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500">Welcome back,</div>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Aditya Raut
                </h2>
                <p className="text-xs font-medium text-slate-500">
                  Keep Learning. Keep Growing.
                </p>

                {/* Trainee Meta Bar */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                      Trainee ID
                    </span>
                    <span className="font-bold text-slate-800 font-mono">
                      KID-8252678014
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                      Mobile Number
                    </span>
                    <span className="font-bold text-slate-800 font-mono">
                      +91 76679 46913
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                      Location
                    </span>
                    <span className="font-bold text-slate-800">Pune, Maharashtra</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">
                      Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Placed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side quote block with deep navy styling */}
            <div className="hidden lg:flex flex-col justify-center max-w-xs bg-gradient-to-br from-[#0c2f5a] to-[#15467e] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden shrink-0 border border-blue-900/30">
              <div className="text-sm font-medium tracking-wide leading-snug">
                “Skills today
                <br />
                <span className="font-bold text-white">Better opportunities tomorrow”</span>
              </div>
              <div className="w-12 h-1 bg-blue-400 rounded-full mt-3" />
            </div>
          </div>

          {/* Metric Stats Cards Row (5 Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Card 1: Enrolled Courses */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">2</div>
                  <div className="text-xs font-semibold text-slate-500 leading-tight">
                    Enrolled Courses
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveNav('courses')}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>View Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Completed Courses */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">2</div>
                  <div className="text-xs font-semibold text-slate-500 leading-tight">
                    Completed Courses
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveNav('certificates')}
                className="mt-3 text-xs font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>View Certificates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 3: Achievements */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900">3</div>
                  <div className="text-xs font-semibold text-slate-500 leading-tight">
                    Achievements
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveNav('achievements')}
                className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: Placed / Tata Technologies */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-600">Placed</div>
                  <div className="text-xs font-extrabold text-slate-900 truncate">
                    Tata Technologies
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowOfferLetterModal(true)}
                className="mt-3 text-xs font-bold text-orange-600 hover:text-orange-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 5: Current CTC */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">₹4.5 LPA</div>
                  <div className="text-xs font-semibold text-slate-500 leading-tight">
                    Current CTC
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowOfferLetterModal(true)}
                className="mt-3 text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>View Growth</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main 3-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* COLUMN 1 (5 cols): My Courses + Monthly Performance Feedback + Upcoming Activities */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card: My Courses */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">My Courses</h3>
                  <button
                    onClick={onNavigateToCourses}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Course 1: Solar PV Installation Technician */}
                  <div className="border border-slate-200 rounded-xl p-3.5 hover:border-blue-300 transition space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src="https://images.unsplash.com/photo-1509391365360-2e959784a276?w=200&auto=format&fit=crop&q=80"
                          alt="Solar PV Installation"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          Solar PV Installation Technician
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>Provided by Pune Skill Development Centre</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1 h-1 rounded-full bg-emerald-600" />
                            Ongoing
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 text-slate-400" />
                            Jan 2026 – Mar 2026
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            NSQF Level 4
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Continue button */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: '75%' }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8 text-right">
                        75%
                      </span>
                      <button
                        onClick={() => alert('Continuing course: Solar PV Installation Technician')}
                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition border border-blue-200 cursor-pointer"
                      >
                        Continue
                      </button>
                    </div>
                  </div>

                  {/* Course 2: EV Service Technician */}
                  <div className="border border-slate-200 rounded-xl p-3.5 hover:border-emerald-300 transition space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                        <img
                          src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=200&auto=format&fit=crop&q=80"
                          alt="EV Service Technician"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          EV Service Technician
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>Provided by Maharashtra Skill Training Institute</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1 h-1 rounded-full bg-emerald-600" />
                            Completed
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                            <Calendar className="w-2.5 h-2.5 text-slate-400" />
                            Sep 2025 – Dec 2025
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            NSQF Level 4
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & View Details */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-600 h-2 rounded-full transition-all"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-700 w-8 text-right">
                        100%
                      </span>
                      <button
                        onClick={() =>
                          setShowCertificateModal(
                            'EV Service Technician Certification - NSDC & Government of Maharashtra'
                          )
                        }
                        className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-bold transition border border-slate-200 cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Monthly Performance Feedback */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    Monthly Performance Feedback
                  </h3>
                  <button
                    onClick={() => setActiveNav('feedback')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">
                    {feedbackList[feedbackIndex].month}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {feedbackList[feedbackIndex].tag}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-slate-900">
                      {feedbackList[feedbackIndex].rating} / 5
                    </span>
                    <div className="flex text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <Star className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  </div>
                </div>

                {/* Feedback Quote Carousel */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 relative flex items-center gap-2">
                  <button
                    onClick={() =>
                      setFeedbackIndex((prev) =>
                        prev === 0 ? feedbackList.length - 1 : prev - 1
                      )
                    }
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition shrink-0"
                    title="Previous feedback"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <div className="flex-1 text-center px-1">
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      “{feedbackList[feedbackIndex].quote}”
                    </p>
                    <p className="text-[11px] font-semibold text-slate-500 mt-2">
                      — {feedbackList[feedbackIndex].author}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setFeedbackIndex((prev) =>
                        prev === feedbackList.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="p-1 rounded-full hover:bg-slate-200 text-slate-500 transition shrink-0"
                    title="Next feedback"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Dots indicator */}
                <div className="flex justify-center gap-1.5 mt-3">
                  {feedbackList.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFeedbackIndex(i)}
                      className={`w-2 h-2 rounded-full transition ${
                        i === feedbackIndex ? 'bg-blue-600 w-4' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Card: Upcoming Activities */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Upcoming Activities
                  </h3>
                  <button
                    onClick={() => setActiveNav('dashboard')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 w-24 shrink-0">
                      10 Sep 2026
                    </span>
                    <span className="text-slate-700 truncate">
                      Practical Assessment (EV)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 w-24 shrink-0">
                      15 Sep 2026
                    </span>
                    <span className="text-slate-700 truncate">
                      Industry Interaction Session
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 w-24 shrink-0">
                      20 Sep 2026
                    </span>
                    <span className="text-slate-700 truncate">
                      Submit Final Project Report
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2 (4 cols): My Certificates + My Achievements + Career Support */}
            <div className="lg:col-span-4 space-y-6">
              {/* Card: My Certificates */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">My Certificates</h3>
                  <button
                    onClick={() => setActiveNav('certificates')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {/* Certificate 1 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          EV Service Technician
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          NSDC | Issued Dec 2025
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowCertificateModal('EV Service Technician (NSDC)')
                      }
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Certificate 2 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Basics of Electric Vehicles
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          KAUSHAL | Issued Nov 2025
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowCertificateModal('Basics of Electric Vehicles (KAUSHAL)')
                      }
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Certificate 3 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Workplace Safety
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          MSSDS | Issued Oct 2025
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowCertificateModal('Workplace Safety (MSSDS)')
                      }
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Certificate 4 */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          Solar PV Foundation
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          KAUSHAL | Issued Aug 2025
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setShowCertificateModal('Solar PV Foundation (KAUSHAL)')
                      }
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition"
                      title="Download Certificate"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Card: My Achievements */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    My Achievements
                  </h3>
                  <button
                    onClick={() => setActiveNav('achievements')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          Best Project Award
                        </h4>
                        <span className="text-[10px] text-slate-400">Mar 2026</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Pune Skill Development Centre
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          Top Performer (Theory)
                        </h4>
                        <span className="text-[10px] text-slate-400">Dec 2025</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Solar PV Batch – 2025
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Star className="w-4 h-4 fill-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          100% Attendance
                        </h4>
                        <span className="text-[10px] text-slate-400">Nov 2025</span>
                      </div>
                      <p className="text-[11px] text-slate-500">
                        EV Service Technician
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Career Support */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-4">
                  Career Support
                </h3>
                <div className="space-y-3 text-xs">
                  <div
                    onClick={onNavigateToJobs}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900">Apply for Jobs</h4>
                      <p className="text-[11px] text-slate-500">
                        Explore new opportunities
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600 transition" />
                  </div>

                  <div
                    onClick={() => setActiveNav('profile')}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900">Update Profile</h4>
                      <p className="text-[11px] text-slate-500">
                        Keep your profile up to date
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
                  </div>

                  <div
                    onClick={onNavigateToCourses}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 border border-slate-100 cursor-pointer transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900">
                        Access Learning Resources
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Get study material and guides
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 3 (3 cols): Placement Details + Skills Acquired + To Do */}
            <div className="lg:col-span-3 space-y-6">
              {/* Card: Placement Details */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Placement Details
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Placed
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Employer Branding */}
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0 shadow-xs">
                      TATA
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Tata Technologies
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Junior Service Engineer
                      </p>
                    </div>
                  </div>

                  {/* Placement Meta */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          Joining Date
                        </span>
                        <span className="font-semibold text-slate-900">
                          15 Jan 2026
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          Location
                        </span>
                        <span className="font-semibold text-slate-900">
                          Pune, Maharashtra
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600">
                      <TrendingUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          Current CTC
                        </span>
                        <span className="font-bold text-slate-900">₹ 4.5 LPA</span>
                      </div>
                    </div>
                  </div>

                  {/* View Offer Letter Button */}
                  <button
                    onClick={() => setShowOfferLetterModal(true)}
                    className="w-full py-2 px-3 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <FileText className="w-4 h-4 text-[#103770]" />
                    <span>View Offer Letter</span>
                  </button>
                </div>
              </div>

              {/* Card: Skills Acquired */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Skills Acquired
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Solar PV',
                    'EV Maintenance',
                    'Electrical Systems',
                    'Diagnostics',
                    'Teamwork',
                    'Workplace Safety'
                  ].map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card: To Do Checklist */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-slate-900">To Do</h3>
                  <button
                    onClick={() => alert('All active tasks up to date')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {todoItems.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer transition select-none"
                    >
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleTodo(item.id)}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />
                      <span
                        className={`${
                          item.done
                            ? 'line-through text-slate-400'
                            : 'text-slate-700 font-medium'
                        }`}
                      >
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* MODAL 1: Official Offer Letter Modal */}
      {showOfferLetterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0B3C5D] text-white rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Offer of Employment</h3>
                  <p className="text-[11px] text-blue-200">
                    Tata Technologies Ltd. — Reference: TTL/PUN/2026/0491
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOfferLetterModal(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Content */}
            <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed font-sans">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <div className="text-base font-black text-slate-900 tracking-wider">
                    TATA TECHNOLOGIES
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Plot No. 25, Rajiv Gandhi Infotech Park, Hinjawadi, Pune - 411057
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-400 block">Date</span>
                  <span className="font-semibold text-slate-800">15 January 2026</span>
                </div>
              </div>

              <div>
                <p className="font-bold text-slate-900">Dear Aditya Raut,</p>
                <p className="text-slate-500 font-mono text-[11px]">
                  Trainee ID: KID-8252678014 / Roll No: MH-PUN-04532
                </p>
              </div>

              <p>
                We are pleased to offer you the position of{' '}
                <strong className="text-slate-900">Junior Service Engineer</strong> in our
                Automotive &amp; Electric Mobility Division at Tata Technologies Pune. Your
                selection follows your exemplary performance during the Maharashtra State Skill
                Development Board recruitment drive.
              </p>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Designation
                    </span>
                    <p className="font-bold text-slate-900">Junior Service Engineer</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Department
                    </span>
                    <p className="font-bold text-slate-900">EV Fleet Diagnostics</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Gross Compensation (CTC)
                    </span>
                    <p className="font-bold text-emerald-600 text-sm">
                      ₹ 4,50,000 per annum
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      Work Location
                    </span>
                    <p className="font-bold text-slate-900">Hinjawadi Tech Park, Pune</p>
                  </div>
                </div>
              </div>

              <p>
                Please report to the Talent Acquisition team at our Hinjawadi Campus with your
                verified NSQF Level 4 Certificates, Aadhaar Card, and original academic credentials.
              </p>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">For Tata Technologies Limited,</p>
                  <p className="text-[11px] text-slate-500">Authorized Signatory — HR Operations</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Digitally Verified on KAUSHAL
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex items-center justify-between">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowOfferLetterModal(false)}
                  className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Certificate Preview Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Verified Certificate</h3>
              </div>
              <button
                onClick={() => setShowCertificateModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border-4 border-double border-amber-300 bg-amber-50/30 p-6 rounded-xl text-center space-y-3">
              <div className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                National Skill Development Corporation
              </div>
              <h2 className="text-lg font-black text-[#0B3C5D]">{showCertificateModal}</h2>
              <p className="text-xs text-slate-600">This is to certify that</p>
              <h3 className="text-base font-black text-slate-900 underline decoration-amber-500">
                Aditya Raut
              </h3>
              <p className="text-xs text-slate-600">
                has successfully fulfilled all requirements and practical assessments under the
                Government of Maharashtra Skill Mission with an aggregate score of{' '}
                <strong className="text-emerald-700">92% (Grade A+)</strong>.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-400">
                Certificate ID: CERT-MH-2026-948102 • QR Authenticated
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert('Certificate download started.');
                  setShowCertificateModal(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#103770] hover:bg-[#0b2955] text-white text-xs font-semibold transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Raise Support Request Modal */}
      {showRaiseRequestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Contact KAUSHAL Support</h3>
              </div>
              <button
                onClick={() => {
                  setShowRaiseRequestModal(false);
                  setRequestSubmitted(false);
                  setSupportMessage('');
                }}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">Request Registered!</h4>
                <p className="text-xs text-slate-600">
                  Ticket #REQ-84920 has been sent to the District Skill Support Cell. Our team will
                  reach out on your registered mobile +91 76679 46913.
                </p>
                <button
                  onClick={() => {
                    setShowRaiseRequestModal(false);
                    setRequestSubmitted(false);
                    setSupportMessage('');
                  }}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-600">
                  Have a question about your courses, certificates, or stipend disbursement?
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Query Category
                  </label>
                  <select className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Assessment &amp; Certification Query</option>
                    <option>Placement &amp; Offer Letter Confirmation</option>
                    <option>Course Attendance &amp; Batch Shift</option>
                    <option>Aadhaar / Bank Account Verification</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Describe your issue
                  </label>
                  <textarea
                    rows={3}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    placeholder="Briefly state your concern..."
                    className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setRequestSubmitted(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
