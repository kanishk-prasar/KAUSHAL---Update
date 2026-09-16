import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
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

interface GovtPartnerItem {
  id: string;
  name: string;
  marathiName: string;
  subtext: string;
  tag: string;
  logoType: 'ashoka' | 'seal' | 'dvet' | 'mssds' | 'midc' | 'umeed' | 'pwd' | 'barti';
}

interface CorpPartnerItem {
  id: string;
  name: string;
  subtext: string;
  category: string;
  tag: string;
  logoType: 'tata' | 'mahindra' | 'lt' | 'tcs' | 'infosys' | 'serum' | 'reliance' | 'godrej' | 'bajaj' | 'forge' | 'thermax' | 'cipla';
}

// 1. Maharashtra Government Departments & Ministries (Moving Right to Left)
const GOVT_DEPARTMENTS: GovtPartnerItem[] = [
  {
    id: 'gov-1',
    name: 'Dept. of Skill Development & Entrepreneurship',
    marathiName: 'कौशल्य विकास आणि उद्योजकता विभाग',
    subtext: 'Government of Maharashtra • Nodal Authority',
    tag: 'Nodal Authority',
    logoType: 'ashoka'
  },
  {
    id: 'gov-11',
    name: 'Directorate of Vocational Education & Training (DVET)',
    marathiName: 'व्यवसाय शिक्षण व प्रशिक्षण संचालनालय',
    subtext: 'Govt. of Maharashtra • 417+ Government ITIs',
    tag: 'ITI Operations',
    logoType: 'dvet'
  },
  {
    id: 'gov-12',
    name: 'Maharashtra State Skill Development Society (MSSDS)',
    marathiName: 'महाराष्ट्र राज्य कौशल्य विकास सोसायटी',
    subtext: 'Govt. of Maharashtra • PMKUVA Mission',
    tag: 'Scheme Execution',
    logoType: 'mssds'
  },
  {
    id: 'gov-2',
    name: 'Industries, Energy & Labour Department (MIDC)',
    marathiName: 'उद्योग, ऊर्जा व कामगार विभाग',
    subtext: 'Govt. of Maharashtra • Industrial Infrastructure',
    tag: 'Industry Policy',
    logoType: 'midc'
  },
  {
    id: 'gov-3',
    name: 'Higher & Technical Education Department',
    marathiName: 'उच्च व तंत्रशिक्षण विभाग',
    subtext: 'Govt. of Maharashtra • DTE & State Universities',
    tag: 'Polytechnics & ITIs',
    logoType: 'ashoka'
  },
  {
    id: 'gov-5',
    name: 'Rural Development & Panchayati Raj (Umeed Mission)',
    marathiName: 'ग्रामविकास व पंचायतराज विभाग',
    subtext: 'Govt. of Maharashtra • MSRLM Livelihood Mission',
    tag: 'Rural Livelihoods',
    logoType: 'umeed'
  },
  {
    id: 'gov-6',
    name: 'Public Works Department (PWD)',
    marathiName: 'सार्वजनिक बांधकाम विभाग',
    subtext: 'Govt. of Maharashtra • Civil Infrastructure Skills',
    tag: 'Civil & Infra Skills',
    logoType: 'pwd'
  },
  {
    id: 'gov-7',
    name: 'Social Justice & Special Assistance (BARTI)',
    marathiName: 'सामाजिक न्याय व विशेष सहाय्य विभाग',
    subtext: 'Govt. of Maharashtra • Affirmative Upskilling',
    tag: 'Inclusive Skilling',
    logoType: 'barti'
  },
  {
    id: 'gov-4',
    name: 'School Education & Sports Department',
    marathiName: 'शालेय शिक्षण व क्रीडा विभाग',
    subtext: 'Govt. of Maharashtra • Secondary Vocational Stream',
    tag: 'Early Skilling',
    logoType: 'ashoka'
  },
  {
    id: 'gov-8',
    name: 'Medical Education & Drugs Department',
    marathiName: 'वैद्यकीय शिक्षण व औषधी द्रव्ये विभाग',
    subtext: 'Govt. of Maharashtra • Allied Healthcare & Paramedics',
    tag: 'Healthcare Skills',
    logoType: 'ashoka'
  },
  {
    id: 'gov-9',
    name: 'Agriculture & Farmers Welfare Department',
    marathiName: 'कृषी व शेतकरी कल्याण विभाग',
    subtext: 'Govt. of Maharashtra • Agri-Drone & Food Processing',
    tag: 'Agri-Tech Skills',
    logoType: 'ashoka'
  },
  {
    id: 'gov-10',
    name: 'Urban Development Department (NULM)',
    marathiName: 'नगर विकास विभाग',
    subtext: 'Govt. of Maharashtra • Urban Livelihood Mission',
    tag: 'Urban Livelihoods',
    logoType: 'seal'
  }
];

// 2. Major Private Companies from Various Sectors (Moving Left to Right)
const PRIVATE_COMPANIES: CorpPartnerItem[] = [
  {
    id: 'pvt-1',
    name: 'Tata Motors',
    subtext: 'Automotive & EV Mobility • Pune & Chakan Plants',
    category: 'Automotive & EV',
    tag: 'Tier-1 Employer',
    logoType: 'tata'
  },
  {
    id: 'pvt-2',
    name: 'Mahindra & Mahindra',
    subtext: 'Automotive, Farm & Aerospace • Nashik & Kandivali',
    category: 'Auto & Heavy Engg',
    tag: 'Apprenticeship Partner',
    logoType: 'mahindra'
  },
  {
    id: 'pvt-3',
    name: 'Larsen & Toubro (L&T)',
    subtext: 'Infra, Defence & Construction Skills • Powai & Hazira',
    category: 'Infra & Defence',
    tag: 'CSTI Training Partner',
    logoType: 'lt'
  },
  {
    id: 'pvt-4',
    name: 'Tata Consultancy Services (TCS)',
    subtext: 'IT Systems & Cloud • Mumbai, Pune & Nagpur Hubs',
    category: 'IT & Digital AI',
    tag: 'Digital Upskilling',
    logoType: 'tcs'
  },
  {
    id: 'pvt-5',
    name: 'Infosys',
    subtext: 'Enterprise Cloud & Cyber Systems • Pune Hinjawadi',
    category: 'IT Services',
    tag: 'Springboard Partner',
    logoType: 'infosys'
  },
  {
    id: 'pvt-6',
    name: 'Serum Institute of India',
    subtext: 'Biotech & Vaccine Formulation • Hadapsar, Pune',
    category: 'Biotech & Health',
    tag: 'Pharma Lab Hires',
    logoType: 'serum'
  },
  {
    id: 'pvt-7',
    name: 'Reliance Industries',
    subtext: 'Clean Green Energy & Jio Digital • Navi Mumbai',
    category: 'Conglomerate & Tech',
    tag: 'Mega Livelihoods',
    logoType: 'reliance'
  },
  {
    id: 'pvt-8',
    name: 'Godrej & Boyce',
    subtext: 'Precision Tooling & Manufacturing • Vikhroli, Mumbai',
    category: 'Manufacturing',
    tag: 'Dual Training Partner',
    logoType: 'godrej'
  },
  {
    id: 'pvt-9',
    name: 'Bajaj Auto',
    subtext: 'EV Powertrain & Robotics • Akurdi & Waluj',
    category: 'Automotive',
    tag: 'NAPS Apprenticeship',
    logoType: 'bajaj'
  },
  {
    id: 'pvt-10',
    name: 'Bharat Forge',
    subtext: 'Advanced Metallurgy & Aerospace • Mundhwa, Pune',
    category: 'Forging & Defence',
    tag: 'Industry 4.0 Center',
    logoType: 'forge'
  },
  {
    id: 'pvt-11',
    name: 'Thermax Global',
    subtext: 'Clean Energy & Water Treatment • Bhosari, Pune',
    category: 'Clean Energy',
    tag: 'Thermal Engineering',
    logoType: 'thermax'
  },
  {
    id: 'pvt-12',
    name: 'Cipla Pharmaceuticals',
    subtext: 'Formulations & Sterile Quality QA • Patalganga',
    category: 'Life Sciences',
    tag: 'Quality Control Hires',
    logoType: 'cipla'
  }
];

export const OurPartnersSection: React.FC = () => {
  // Render corresponding official government logo
  const renderGovtLogo = (type: GovtPartnerItem['logoType']) => {
    switch (type) {
      case 'ashoka':
        return <AshokaEmblem className="w-9 h-12 shrink-0 drop-shadow-xs" color="#1e293b" />;
      case 'seal':
        return <MaharashtraGovtSeal className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'dvet':
        return <DVETLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'mssds':
        return <MSSDSLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'midc':
        return <MIDCLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'umeed':
        return <UmeedLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'pwd':
        return <PWDLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'barti':
        return <BARTILogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      default:
        return <AshokaEmblem className="w-9 h-12 shrink-0 drop-shadow-xs" color="#1e293b" />;
    }
  };

  // Render corresponding corporate logo
  const renderCorpLogo = (type: CorpPartnerItem['logoType']) => {
    switch (type) {
      case 'tata':
        return <TataMotorsLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'mahindra':
        return <MahindraLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'lt':
        return <LTLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'tcs':
        return <TCSLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'infosys':
        return <InfosysLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'serum':
        return <SerumInstituteLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'reliance':
        return <RelianceLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'godrej':
        return <GodrejLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'bajaj':
        return <BajajLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'forge':
        return <BharatForgeLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'thermax':
        return <ThermaxLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      case 'cipla':
        return <CiplaLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
      default:
        return <TataMotorsLogo className="w-11 h-11 shrink-0 drop-shadow-xs" />;
    }
  };

  return (
    <section id="our-partners" className="w-full bg-[#fbfcfd] border-t border-b border-slate-200/90 py-12 sm:py-16 overflow-hidden relative select-none">
      
      {/* Decorative background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-40 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-40 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 sm:mb-10 relative z-10">
        
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/80 text-[11px] font-bold text-orange-700 uppercase tracking-wider mb-2.5 shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
          <span>Ecosystem Synergy • 36 Districts</span>
        </div>

        {/* Section Heading matching user screenshot */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#102A43] tracking-tight">
          Our Partners
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto mt-2 font-normal leading-relaxed">
          Uniting Maharashtra Government ministries, statutory directorates, and leading private sector employers to translate accredited skills into sustainable career pathways.
        </p>
      </div>

      {/* MARQUEE TRACK 1: Government of Maharashtra Departments & Ministries (Moving Right to Left) */}
      <div className="mb-6 sm:mb-8">
        
        {/* Row Header Label */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Maharashtra Government Departments &amp; Ministries</span>
          </div>
        </div>

        {/* Outer Marquee Container with Left and Right Edge Fade Vignettes */}
        <div className="relative w-full overflow-hidden group-marquee">
          {/* Edge Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#fbfcfd] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#fbfcfd] to-transparent z-20" />

          {/* Animated Track: Right to Left (Slow 95s) */}
          <div className="animate-marquee-left py-2 flex items-center gap-4">
            {[...GOVT_DEPARTMENTS, ...GOVT_DEPARTMENTS].map((dept, idx) => (
              <div
                key={`dept-${dept.id}-${idx}`}
                className="bg-white border border-slate-200/90 hover:border-orange-300 rounded-xl px-4 py-3 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 shrink-0 min-w-[320px] sm:min-w-[360px] max-w-[380px] h-[86px] cursor-default text-left group"
              >
                {/* Government Official Emblem / Logo Container */}
                <div className="w-12 h-14 bg-slate-50/70 border border-slate-200/80 rounded-lg flex items-center justify-center shrink-0 p-1 group-hover:bg-white group-hover:border-orange-200 transition-colors">
                  {renderGovtLogo(dept.logoType)}
                </div>

                {/* Text Details in official bilingual letterhead styling */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-orange-700/90 truncate leading-tight">
                    {dept.marathiName}
                  </div>
                  <div className="text-[12px] font-bold text-slate-900 group-hover:text-orange-600 transition-colors truncate leading-snug mt-0.5">
                    {dept.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                    {dept.subtext}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200/70">
                      {dept.tag}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MARQUEE TRACK 2: Major Private Companies from Various Sectors (Moving Left to Right) */}
      <div>
        
        {/* Row Header Label */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse" />
            <span>Major Private Sector &amp; Industry Placement Partners</span>
          </div>
        </div>

        {/* Outer Marquee Container with Left and Right Edge Fade Vignettes */}
        <div className="relative w-full overflow-hidden group-marquee">
          {/* Edge Fade Masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#fbfcfd] to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#fbfcfd] to-transparent z-20" />

          {/* Animated Track: Left to Right (Slow 95s) */}
          <div className="animate-marquee-right py-2 flex items-center gap-4">
            {[...PRIVATE_COMPANIES, ...PRIVATE_COMPANIES].map((company, idx) => (
              <div
                key={`comp-${company.id}-${idx}`}
                className="bg-white border border-slate-200/90 hover:border-sky-300 rounded-xl px-4 py-3 shadow-xs hover:shadow-md transition-all flex items-center gap-3.5 shrink-0 min-w-[320px] sm:min-w-[360px] max-w-[380px] h-[86px] cursor-default text-left group"
              >
                {/* Corporate Logo Container */}
                <div className="w-12 h-14 bg-slate-50/70 border border-slate-200/80 rounded-lg flex items-center justify-center shrink-0 p-1 group-hover:bg-white group-hover:border-sky-200 transition-colors">
                  {renderCorpLogo(company.logoType)}
                </div>

                {/* Text Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[12px] font-bold text-slate-900 group-hover:text-sky-600 transition-colors truncate leading-snug">
                      {company.name}
                    </span>
                    <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-600 shrink-0">
                      {company.category}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                    {company.subtext}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-800 border border-sky-200/70">
                      <CheckCircle2 className="w-2.5 h-2.5 text-sky-600" />
                      <span>{company.tag}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
