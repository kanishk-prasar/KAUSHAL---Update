import React from 'react';
import {
  ArrowRight,
  GraduationCap,
  Users,
  TrendingUp,
  Target,
  Building2,
  Briefcase,
  Award,
  BarChart3,
  Play
} from 'lucide-react';

interface HeroBannerProps {
  onExploreJobs?: () => void;
  onExploreSkills?: () => void;
  onExploreOutcomes?: () => void;
  onOpenHowItWorks?: () => void;
  onExploreTrainee?: () => void;
  onExplorePartner?: () => void;
  onExploreCompanies?: () => void;
  lang?: 'en' | 'mr' | 'hi';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreJobs,
  onExploreSkills,
  onExploreOutcomes,
  onOpenHowItWorks,
  onExploreTrainee,
  onExplorePartner,
  onExploreCompanies,
  lang: _lang
}) => {
  return (
    <div className="w-full">
      {/* 5. HERO SECTION (Subtle Cream/Peach Gradient Background matching official portal) */}
      <section className="relative w-full bg-gradient-to-b from-[#FFF9F3] via-[#FFF3EB] to-[#FFF8F2] pt-6 sm:pt-8 lg:pt-10 pb-10 sm:pb-12 border-b border-orange-200/40">

        {/* Main Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
            
            {/* LEFT CONTENT (Text & CTA) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 text-left">
              {/* Display Headlines */}
              <div className="space-y-0.5 sm:space-y-1">
                {/* Headline 1: "From Skills to Livelihoods." (Orange, bold) */}
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#ea580c] leading-[1.12]">
                  From Skills to Livelihoods.
                </h1>
                {/* Headline 2: "From Data to Impact." (Dark Blue, bold) */}
                <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#102A43] leading-[1.12]">
                  From Data to Impact.
                </h2>
              </div>

              {/* Main Title: "KAUSHAL" with distinct accent & sub-definition */}
              <div className="pt-1 border-l-3 border-[#ea580c] pl-4 sm:pl-5 space-y-1">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102A43] tracking-tight leading-none">
                  KAUSHAL
                </h3>
                {/* Subtitle */}
                <p className="text-sm sm:text-base font-bold text-[#102A43] tracking-tight">
                  Knowledge &amp; Analytics for Upgrading Skills, Hiring, And Livelihoods
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-slate-600 max-w-xl leading-relaxed font-normal">
                A unified outcome-driven platform connecting trainees, training institutes, employers, and government to track the journey from skill development to sustainable employment and livelihoods.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Button 1: "Explore KAUSHAL ->" */}
                <button
                  onClick={onExploreSkills}
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-orange-600/20 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  <span>Explore KAUSHAL</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Button 2: "How It Works" */}
                <button
                  onClick={onOpenHowItWorks}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white hover:bg-slate-50 text-[#102A43] font-bold text-xs sm:text-sm flex items-center gap-2.5 border border-slate-300 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-5 h-5 rounded-full bg-[#102A43] text-white flex items-center justify-center text-[9px] shadow-xs">
                    <Play className="w-2.5 h-2.5 fill-current ml-0.5 text-white" />
                  </div>
                  <span>How It Works</span>
                </button>
              </div>

              {/* Sub-alignment trust indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-slate-600 border-t border-orange-200/60 pt-3 max-w-xl">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  36 Districts Active
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  Outcome Tracking
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  Employer Aligned
                </span>
              </div>
            </div>

            {/* RIGHT CONTENT (Borderless image faded softly from left and right edges into the background) */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[620px] overflow-hidden">
                {/* Soft ambient radial warmth behind the image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/35 via-amber-100/25 to-transparent rounded-full blur-2xl pointer-events-none -z-10" />

                {/* Left Edge Fade Vignette Overlay */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-20 bg-gradient-to-r from-[#FFF6EE] via-[#FFF6EE]/80 to-transparent z-10" />

                {/* Right Edge Fade Vignette Overlay */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#FFF6EE] via-[#FFF6EE]/80 to-transparent z-10" />

                <img
                  src="/images/hero-composite.png"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.endsWith('/images/hero-composite.png')) {
                      target.src = '/hero-composite.png';
                    } else if (target.src.endsWith('/hero-composite.png')) {
                      target.src = '/images/hero-composite.svg';
                    }
                  }}
                  alt="KAUSHAL - Skilled Maharashtra, Stronger Futures"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 3%, rgba(0,0,0,0.85) 8%, black 14%, black 86%, rgba(0,0,0,0.85) 92%, rgba(0,0,0,0.15) 97%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 3%, rgba(0,0,0,0.85) 8%, black 14%, black 86%, rgba(0,0,0,0.85) 92%, rgba(0,0,0,0.15) 97%, transparent 100%), linear-gradient(to bottom, black 85%, transparent 100%)',
                    maskComposite: 'intersect',
                    WebkitMaskComposite: 'source-in'
                  }}
                  className="w-full max-h-[380px] sm:max-h-[420px] lg:max-h-[460px] object-contain block select-none pointer-events-none border-none outline-none shadow-none drop-shadow-sm"
                />
              </div>
            </div>

          </div>

          {/* 6. QUICK ACTION CARDS (4-Column Grid) - Full cards without bottom cut-off */}
          <div className="mt-10 sm:mt-12 mb-2 sm:mb-4 relative z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Card 1: UPGRADE: Light orange tint, graduation cap icon, text "Skills & Training", right arrow button */}
            <div
              onClick={onExploreSkills}
              className="bg-[#FFF5ED] border border-orange-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-orange-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#FFE5D3] flex items-center justify-center text-[#ea580c] shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6 text-[#ea580c]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-black text-[#ea580c] uppercase tracking-wider">
                    UPGRADE
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-slate-800 mt-0.5">
                    Skills &amp; Training
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-orange-100 text-[#ea580c] flex items-center justify-center group-hover:bg-[#ea580c] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 2: CONNECT: Light blue tint, people icon, text "Talent & Opportunities", right arrow button */}
            <div
              onClick={onExploreJobs}
              className="bg-[#F0F7FF] border border-sky-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-sky-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#DCEBFE] flex items-center justify-center text-[#0284c7] shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-6 h-6 text-[#0284c7]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-black text-[#0284c7] uppercase tracking-wider">
                    CONNECT
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-slate-800 mt-0.5">
                    Talent &amp; Opportunities
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center group-hover:bg-[#0284c7] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 3: TRACK: Light green tint, chart icon, text "Employment & Retention", right arrow button */}
            <div
              onClick={onExploreOutcomes}
              className="bg-[#F0FDF4] border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#059669] shrink-0 group-hover:scale-105 transition-transform">
                  <TrendingUp className="w-6 h-6 text-[#059669]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-black text-[#059669] uppercase tracking-wider">
                    TRACK
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-slate-800 mt-0.5">
                    Employment &amp; Retention
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center group-hover:bg-[#059669] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Card 4: MEASURE: Light purple tint, target icon, text "Impact & Livelihoods", right arrow button */}
            <div
              onClick={onExploreOutcomes}
              className="bg-[#FAF5FF] border border-purple-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm hover:shadow-md hover:border-purple-300 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#F3E8FF] flex items-center justify-center text-[#7c3aed] shrink-0 group-hover:scale-105 transition-transform">
                  <Target className="w-6 h-6 text-[#7c3aed]" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-black text-[#7c3aed] uppercase tracking-wider">
                    MEASURE
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-slate-800 mt-0.5">
                    Impact &amp; Livelihoods
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-purple-100 text-[#7c3aed] flex items-center justify-center group-hover:bg-[#7c3aed] group-hover:text-white transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. STATISTICS SECTION (White Background, Bottom) */}
      <section className="w-full bg-white border-b border-slate-200/90 py-8 sm:py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            
            {/* 1. Icon (People) | 12.5 L+ | Trainees Tracked */}
            <button
              onClick={onExploreTrainee}
              className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3 text-left hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#ea580c] shrink-0">
                <Users className="w-6 h-6 text-[#ea580c]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                  12.5 L+
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Trainees Tracked
                </div>
              </div>
            </button>

            {/* 2. Icon (Building) | 3,800+ | Training Institutes */}
            <button
              onClick={onExplorePartner}
              className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3 text-left hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#1e40af] shrink-0">
                <Building2 className="w-6 h-6 text-[#1e40af]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                  3,800+
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Training Institutes & Partners
                </div>
              </div>
            </button>

            {/* 3. Icon (Briefcase) | 8,700+ | Employers */}
            <button
              onClick={onExploreCompanies}
              className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3 text-left hover:bg-slate-50 p-2 rounded-xl transition cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#ea580c] shrink-0">
                <Briefcase className="w-6 h-6 text-[#ea580c]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                  8,700+
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Companies & Employers
                </div>
              </div>
            </button>

            {/* 4. Icon (Certificate) | 11.2 L+ | Certificates Issued */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-[#2563eb] shrink-0">
                <Award className="w-6 h-6 text-[#2563eb]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                  11.2 L+
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Certificates Issued
                </div>
              </div>
            </div>

            {/* 5. Icon (Bar Chart) | 68% | Employment Rate */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 sm:px-3 col-span-2 md:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-[#ea580c] shrink-0">
                <BarChart3 className="w-6 h-6 text-[#ea580c]" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-2xl sm:text-3xl font-black text-[#102A43] tracking-tight">
                  68%
                </div>
                <div className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1">
                  Employment Rate
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
