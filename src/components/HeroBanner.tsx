import React, { useState, useRef } from 'react';
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
  Play,
  Upload,
  Image as ImageIcon,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Sparkles
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
  const [heroImage, setHeroImage] = useState<string | null>(() => {
    try {
      return localStorage.getItem('kaushal_landing_hero_image') || null;
    } catch (e) {
      return null;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP, SVG)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;

      if (file.type === 'image/svg+xml' || file.size < 1024 * 1024) {
        try {
          localStorage.setItem('kaushal_landing_hero_image', rawDataUrl);
          setHeroImage(rawDataUrl);
          setUploadToast('Landing page image saved permanently!');
          setTimeout(() => setUploadToast(null), 3500);
          return;
        } catch (err) {
          console.warn('Direct storage quota exceeded, downscaling...');
        }
      }

      // Canvas downscaling to guarantee permanent localStorage retention
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX_WIDTH = 1200;
        if (width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedUrl = canvas.toDataURL('image/jpeg', 0.85);
          try {
            localStorage.setItem('kaushal_landing_hero_image', optimizedUrl);
            setHeroImage(optimizedUrl);
            setUploadToast('Landing page image saved permanently!');
            setTimeout(() => setUploadToast(null), 3500);
          } catch (storageErr) {
            console.error('Storage error:', storageErr);
            alert('Image could not be saved to local storage. Please select a smaller image.');
          }
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    try {
      localStorage.removeItem('kaushal_landing_hero_image');
    } catch (e) {
      console.error(e);
    }
    setHeroImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadToast('Landing page image removed from permanent storage');
    setTimeout(() => setUploadToast(null), 3000);
  };

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
                {/* Headline 1: "From Skills to Livelihoods" (Orange, bold, smaller without period) */}
                <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#ea580c] leading-[1.18]">
                  From Skills to Livelihoods
                </h1>
                {/* Headline 2: "From Data to Impact" (Dark Blue, bold, smaller without period) */}
                <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold tracking-tight text-[#0B3C5D] leading-[1.18]">
                  From Data to Impact
                </h2>
              </div>

              {/* HIGHLIGHTED "KAUSHAL" BRAND TITLE (Without outer box & without Hindi text) */}
              <div className="pt-1 space-y-1.5">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#ea580c] leading-none drop-shadow-xs">
                  KAUSHAL
                </h3>

                {/* Highlighted Full Acronym Title */}
                <p className="text-xs sm:text-sm lg:text-[15px] font-bold text-[#0B3C5D] tracking-tight leading-snug">
                  <span className="text-[#ea580c] font-black">K</span>nowledge &amp;{' '}
                  <span className="text-[#ea580c] font-black">A</span>nalytics for{' '}
                  <span className="text-[#ea580c] font-black">U</span>pgrading{' '}
                  <span className="text-[#ea580c] font-black">S</span>kills,{' '}
                  <span className="text-[#ea580c] font-black">H</span>iring,{' '}
                  <span className="text-[#ea580c] font-black">A</span>nd{' '}
                  <span className="text-[#ea580c] font-black">L</span>ivelihoods
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-[15px] text-slate-700 max-w-xl leading-relaxed font-normal">
                A unified outcome-driven platform connecting trainees, training institutes, employers, and government to track the complete journey from skill development to sustainable employment and livelihoods across Maharashtra.
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

            {/* RIGHT CONTENT: Persistent Upload Zone or Uploaded Image */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
              {/* Hidden file input for manual file picking */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Toast for Upload Status */}
              {uploadToast && (
                <div className="absolute -top-12 right-0 z-30 bg-slate-900/95 text-white text-xs font-medium py-2 px-3.5 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 backdrop-blur-sm animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{uploadToast}</span>
                </div>
              )}

              {heroImage ? (
                /* Uploaded Image View with Persistent Controls */
                <div className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[620px] group">
                  {/* Soft ambient radial warmth behind the image */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/35 via-amber-100/25 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

                  {/* Top Action Bar */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-2 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-md border border-slate-200/80 transition-opacity">
                    <span className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 pr-1.5 border-r border-slate-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Saved Permanently
                    </span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Upload a different image"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Change</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      title="Remove saved image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  {/* Rendered Uploaded Image */}
                  <div className="rounded-3xl overflow-hidden border border-orange-200/60 shadow-lg bg-white/50 backdrop-blur-sm p-2">
                    <img
                      src={heroImage}
                      alt="Uploaded Landing Page Hero"
                      className="w-full max-h-[380px] sm:max-h-[420px] lg:max-h-[460px] object-contain rounded-2xl block select-none mx-auto"
                    />
                  </div>
                </div>
              ) : (
                /* Empty State: Intuitive Drag & Drop and Click-to-Upload Zone */
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[580px] min-h-[320px] sm:min-h-[360px] rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 sm:p-10 cursor-pointer text-center group ${
                    isDragging
                      ? 'border-orange-500 bg-orange-100/60 scale-[1.01] shadow-xl'
                      : 'border-orange-300/80 hover:border-orange-500 bg-white/70 hover:bg-orange-50/40 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 via-amber-100/20 to-transparent rounded-3xl pointer-events-none -z-10" />

                  {/* Upload Icon with Animated Pulse */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 mb-5 group-hover:scale-105 transition-transform">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    Upload Landing Page Image
                  </h3>

                  {/* Subtitle / Description */}
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-4 leading-relaxed">
                    Drag and drop your hero image or banner here, or click anywhere inside to browse files from your computer.
                  </p>

                  {/* File Support Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                    <span className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-semibold text-slate-600 shadow-2xs">
                      PNG, JPG, WebP, SVG
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      Saves Permanently in Storage
                    </span>
                  </div>

                  {/* Action Button */}
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-600 group-hover:bg-orange-700 text-white text-xs sm:text-sm font-semibold shadow-md group-hover:shadow-lg transition-all">
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose Image from Device</span>
                  </div>
                </div>
              )}
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
