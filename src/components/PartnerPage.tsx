import React, { useState } from 'react';
import {
  Handshake,
  Building2,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  Briefcase,
  TrendingUp,
  FileCheck,
  ChevronRight,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import {
  AshokaEmblem,
  MaharashtraGovtSeal,
  DVETLogo,
  MSSDSLogo,
  MIDCLogo,
  UmeedLogo,
  PWDLogo,
  BARTILogo,
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
import { MAHARASHTRA_DISTRICTS } from './training-partner/maharashtraDistricts';

interface PartnerPageProps {
  onOpenRegisterModal?: () => void;
  onOpenLoginModal?: () => void;
  onOpenTrainingPartnerWizard?: () => void;
  lang: 'en' | 'mr' | 'hi';
}

export const PartnerPage: React.FC<PartnerPageProps> = ({
  onOpenRegisterModal,
  onOpenLoginModal,
  onOpenTrainingPartnerWizard,
  lang
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'govt' | 'training' | 'industry'>('all');
  const [partnerTypeFilter, setPartnerTypeFilter] = useState('all');
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    type: 'Training Provider (VTP)',
    contactPerson: '',
    email: '',
    phone: '',
    district: 'Pune',
    accreditationNo: ''
  });

  const GOVT_PARTNERS = [
    {
      id: 'p-gov-1',
      name: 'Department of Skill Development & Entrepreneurship',
      marathiName: 'कौशल्य विकास आणि उद्योजकता विभाग',
      type: 'Government Department',
      category: 'govt',
      role: 'Nodal Policy & Governance Authority',
      reach: '36 Districts of Maharashtra',
      logo: <AshokaEmblem className="w-12 h-12" />,
      badges: ['Apex State Body', 'Policy Enactment']
    },
    {
      id: 'p-gov-2',
      name: 'Directorate of Vocational Education & Training (DVET)',
      marathiName: 'व्यवसाय शिक्षण व प्रशिक्षण संचालनालय',
      type: 'Government Directorate',
      category: 'govt',
      role: 'Curriculum Standardization & ITI Administration',
      reach: '417+ Government ITIs',
      logo: <DVETLogo className="w-12 h-12" />,
      badges: ['417 ITIs', 'Dual Training System']
    },
    {
      id: 'p-gov-3',
      name: 'Maharashtra State Skill Development Society (MSSDS)',
      marathiName: 'महाराष्ट्र राज्य कौशल्य विकास सोसायटी',
      type: 'Nodal Execution Agency',
      category: 'govt',
      role: 'Pramod Mahajan Skill Scheme (PMKUVA) Execution',
      reach: '150,000+ Annual Trainees',
      logo: <MSSDSLogo className="w-12 h-12" />,
      badges: ['PMKUVA Fund', 'State Schemes']
    },
    {
      id: 'p-gov-4',
      name: 'Maharashtra Industrial Development Corporation (MIDC)',
      marathiName: 'महाराष्ट्र औद्योगिक विकास महामंडळ',
      type: 'Infrastructure Partner',
      category: 'govt',
      role: 'Industrial Cluster Skill Parks & Logistics Labs',
      reach: '289 Industrial Estates',
      logo: <MIDCLogo className="w-12 h-12" />,
      badges: ['Industrial Clusters', 'SEZ Hubs']
    },
    {
      id: 'p-gov-5',
      name: 'Maharashtra State Rural Livelihoods Mission (UMED)',
      marathiName: 'महाराष्ट्र राज्य ग्रामीण जीवनोन्नती अभियान (उमेद)',
      type: 'Livelihood Partner',
      category: 'govt',
      role: 'Rural Women Self-Help Group Skill Incubation',
      reach: '5.2 Million Rural Beneficiaries',
      logo: <UmeedLogo className="w-12 h-12" />,
      badges: ['SHG Incubation', 'Rural Livelihoods']
    },
    {
      id: 'p-gov-6',
      name: 'Dr. Babasaheb Ambedkar Research & Training Institute (BARTI)',
      marathiName: 'डॉ. बाबासाहेब आंबेडकर संशोधन व प्रशिक्षण संस्था (बार्टी)',
      type: 'Autonomous Institute',
      category: 'govt',
      role: 'Specialized Technical Scholarships & Co-Skilling',
      reach: '35,000+ Sponsored Youths',
      logo: <BARTILogo className="w-12 h-12" />,
      badges: ['Scholarship Sponsor', 'Co-Skilling']
    }
  ];

  const TRAINING_INSTITUTIONS = [
    {
      id: 'p-trn-1',
      name: 'National Skill Training Institute (NSTI) Mumbai',
      type: 'Apex Central Training Institute',
      category: 'training',
      role: 'Master Trainer & Advanced Drone Simulation Center',
      reach: '8,000 Master Trainers Certified',
      logo: <AshokaEmblem className="w-12 h-12" />,
      badges: ['MSDE Certified', 'Instructor Training']
    },
    {
      id: 'p-trn-2',
      name: 'Government ITI Aundh (Pune Center of Excellence)',
      type: 'Flagship Center of Excellence',
      category: 'training',
      role: 'EV Powertrain & Robotics Center with ASDC',
      reach: '3,200 Annual EV Technicians',
      logo: <DVETLogo className="w-12 h-12" />,
      badges: ['EV CoE', 'Industry 4.0 Lab']
    },
    {
      id: 'p-trn-3',
      name: 'Tata Institute of Social Sciences (SVE)',
      type: 'University Partner',
      category: 'training',
      role: 'Work-Integrated B.Voc Vocational Degree Programs',
      reach: '12,000 Active Apprentices',
      logo: <TataMotorsLogo className="w-12 h-12" />,
      badges: ['B.Voc Accredited', 'UGC Aligned']
    }
  ];

  const INDUSTRY_PARTNERS = [
    {
      id: 'p-ind-1',
      name: 'Tata Motors EV Division',
      type: 'Automotive & EV Anchor Partner',
      category: 'industry',
      role: 'Curriculum Co-design & Shopfloor Apprenticeship',
      reach: 'Pune & Pimpri Chinchwad Plants',
      logo: <TataMotorsLogo className="w-12 h-12" />,
      badges: ['EV Anchor', '1,400+ Hired']
    },
    {
      id: 'p-ind-2',
      name: 'Larsen & Toubro (L&T) Construction Skills Center',
      type: 'Heavy Engineering & Infrastructure',
      category: 'industry',
      role: 'Certified Heavy Equipment & Solar Rig Training',
      reach: 'Navi Mumbai & Nagpur',
      logo: <LTLogo className="w-12 h-12" />,
      badges: ['Civil & Solar', '92% Placement']
    },
    {
      id: 'p-ind-3',
      name: 'Serum Institute of India Technical Wing',
      type: 'Pharma & Bio-manufacturing',
      category: 'industry',
      role: 'Cleanroom & Sterile Formulations Apprenticeship',
      reach: 'Pune Biopolis Hub',
      logo: <SerumInstituteLogo className="w-12 h-12" />,
      badges: ['Pharma Biotech', 'NAPS Certified']
    }
  ];

  const allPartners = [
    ...GOVT_PARTNERS,
    ...TRAINING_INSTITUTIONS,
    ...INDUSTRY_PARTNERS
  ];

  const filteredPartners = allPartners.filter((p) => {
    if (activeTab === 'govt') return p.category === 'govt';
    if (activeTab === 'training') return p.category === 'training';
    if (activeTab === 'industry') return p.category === 'industry';
    return true;
  });

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setShowApplyModal(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#102A43] via-[#2c1444] to-[#1e1b4b] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider">
              <Handshake className="w-4 h-4" />
              <span>Government & Institutional Partnership Ecosystem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Partner Accreditation & Institutional Network
            </h1>
            <p className="text-slate-200 text-sm max-w-2xl">
              Collaborate with the Government of Maharashtra to deliver accredited NSQF training, establish Centers of Excellence (CoE), and power large-scale state workforce initiatives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (onOpenTrainingPartnerWizard) {
                  onOpenTrainingPartnerWizard();
                } else {
                  setShowApplyModal(true);
                }
              }}
              className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Apply for Partner Empanelment (20 Steps)</span>
            </button>
            <button
              onClick={onOpenLoginModal}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Partner MIS Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Network Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">417+</div>
            <div className="text-xs font-medium text-slate-500">Government ITI Campuses</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Handshake className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">850+</div>
            <div className="text-xs font-medium text-slate-500">Accredited VTP Providers</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">100%</div>
            <div className="text-xs font-medium text-slate-500">NSQF & NCVET Aligned</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">₹450 Cr+</div>
            <div className="text-xs font-medium text-slate-500">Annual Training Outlay</div>
          </div>
        </div>
      </div>

      {/* Categories Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'all'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Empaneled Partners ({allPartners.length})
        </button>
        <button
          onClick={() => setActiveTab('govt')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'govt'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Govt Departments & Boards ({GOVT_PARTNERS.length})
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'training'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Training Centers of Excellence ({TRAINING_INSTITUTIONS.length})
        </button>
        <button
          onClick={() => setActiveTab('industry')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
            activeTab === 'industry'
              ? 'border-[#2c1444] text-[#2c1444]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Industry Anchor Partners ({INDUSTRY_PARTNERS.length})
        </button>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 p-1">
                  {partner.logo}
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {partner.type}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {partner.name}
              </h3>
              {('marathiName' in partner) && (
                <p className="text-xs text-slate-500 mt-0.5">{(partner as any).marathiName}</p>
              )}

              <p className="text-xs text-slate-600 mt-2.5">
                <strong className="text-slate-800">Mandate:</strong> {partner.role}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11.5px] text-slate-500">
                <span className="font-semibold text-slate-700">Footprint:</span> {partner.reach}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {partner.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200/50"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empanelment Process Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">How to Become an Empaneled Training Partner (VTP)</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black text-purple-800">STAGE 1</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">Submit Accreditation Dossier</h4>
            <p className="text-[11.5px] text-slate-600 mt-1">Submit institutional infrastructure credentials, lab specifications, and instructor NSQF certifications.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black text-purple-800">STAGE 2</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">DVET Physical Lab Inspection</h4>
            <p className="text-[11.5px] text-slate-600 mt-1">District Vocational Education Officers verify simulator stations, safety protocols, and biometric attendance.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black text-purple-800">STAGE 3</span>
            <h4 className="text-xs font-bold text-slate-900 mt-1">State Portal Batch Allocation</h4>
            <p className="text-[11.5px] text-slate-600 mt-1">Receive automated PMKUVA candidate batch enrollments and state grant disbursements directly.</p>
          </div>
        </div>
      </div>

      {/* Empanelment Application Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Empanelment Application Form</h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Application Registered!</h4>
                <p className="text-xs text-slate-600">
                  Your tracking token is <span className="font-mono font-bold text-purple-900">MH-VTP-2026-{Math.floor(Math.random() * 9000 + 1000)}</span>. DVET inspection desk will contact you within 3 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Organization / Training Institute Name</label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder="e.g. Pune Technical Skill Academy"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Partner Category</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    >
                      <option>Vocational Training Provider (VTP)</option>
                      <option>Industry Anchor Partner</option>
                      <option>Assessment & Certification Agency</option>
                      <option>University / Technical College</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Headquarter District</label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    >
                      {MAHARASHTRA_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Contact Person Name</label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Director / Authorized Head"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Official Mobile</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nodal@partner.org.in"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 border border-slate-300 rounded-lg font-bold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#ea580c] text-white rounded-lg font-bold hover:bg-[#c2410c]"
                  >
                    Submit Application
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
