import React, { useState, useEffect } from 'react';
import { X, Save, ArrowLeft, ArrowRight, Sparkles, Check, Building2, FileCheck2, FileText } from 'lucide-react';
import { TrainingPartnerFormData, WizardStepId, CorrectionItem } from './types';
import { emptyFormData, demoFilledFormData } from './initialData';
import { EntryScreen } from './EntryScreen';
import { WizardStepper } from './WizardStepper';
import { StepFormsPart1 } from './StepFormsPart1';
import { StepFormsPart2 } from './StepFormsPart2';
import { StepFormsPart3 } from './StepFormsPart3';
import { StepFormsPart4 } from './StepFormsPart4';
import { PostSubmissionView } from './PostSubmissionView';
import { GovernmentReviewDashboard } from './GovernmentReviewDashboard';
import { ApprovedPartnerDashboard } from './ApprovedPartnerDashboard';
import { TrainingPartnerDashboard } from './TrainingPartnerDashboard';

interface TrainingPartnerModuleProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'entry' | 'wizard' | 'post-submission' | 'government-review' | 'approved-dashboard' | 'partner-dashboard';
}

const STORAGE_KEY = 'kaushal_tp_registration_v2';

export const TrainingPartnerModule: React.FC<TrainingPartnerModuleProps> = ({
  isOpen,
  onClose,
  initialView = 'entry',
}) => {
  const [view, setView] = useState<'entry' | 'wizard' | 'post-submission' | 'government-review' | 'approved-dashboard' | 'partner-dashboard'>(initialView);

  // Sync view when initialView changes from parent
  useEffect(() => {
    setView(initialView);
  }, [initialView, isOpen]);
  const [currentStep, setCurrentStep] = useState<WizardStepId>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1]));
  const [formData, setFormData] = useState<TrainingPartnerFormData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...emptyFormData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse cached TP registration data', e);
    }
    return emptyFormData;
  });
  const [saveToast, setSaveToast] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    } catch (e) {
      console.warn('Failed to persist TP registration data', e);
    }
  }, [formData]);

  if (!isOpen) return null;

  const handleUpdate = (updates: Partial<TrainingPartnerFormData>) => {
    // State is pre-filled and locked to Maharashtra for MSSDS empanelment
    setFormData((prev) => ({ ...prev, ...updates, state: 'Maharashtra' }));
  };

  const handleSaveDraft = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleLoadDemoData = () => {
    setFormData(demoFilledFormData);
    const allStepIds = new Set(Array.from({ length: 20 }, (_, i) => i + 1));
    setCompletedSteps(allStepIds);
    setCurrentStep(1);
    setView('wizard');
  };

  const handleNextStep = () => {
    setCompletedSteps((prev) => new Set([...prev, currentStep]));
    if (currentStep < 20) {
      setCurrentStep((prev) => (prev + 1) as WizardStepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as WizardStepId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = () => {
    const updated = {
      ...formData,
      status: 'Submitted' as const,
      submissionDate: '16 September 2026',
    };
    setFormData(updated);
    setView('post-submission');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col justify-between overflow-y-auto">
      
      {/* Official Tricolor Top Accent & Navigation Header (Shown during Wizard & Post-Submission views) */}
      {view !== 'entry' && view !== 'partner-dashboard' && (
        <>
          <div className="h-1 w-full grid grid-cols-3 shrink-0">
            <div className="bg-[#ea580c]" />
            <div className="bg-white" />
            <div className="bg-[#15803d]" />
          </div>

          <header className="bg-white border-b border-slate-300 px-4 sm:px-8 py-3 sticky top-0 z-40 flex items-center justify-between shadow-2xs shrink-0">
            <div className="flex items-center gap-3">
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
                <span className="text-sm sm:base font-black text-[#0f2e5a]">
                  KAUSHAL Training Partner Registration &amp; Empanelment Portal
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {view === 'wizard' && (
                <button
                  type="button"
                  onClick={handleLoadDemoData}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white border border-slate-700 font-bold text-xs rounded-lg cursor-pointer transition shadow-xs"
                  title="Automatically fill all 20 steps with valid sample dummy data"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Insert Dummy Data (Fill All Details)</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setView('entry')}
                className="flex items-center gap-1 text-xs font-bold text-[#0f2e5a] bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Portal Home</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white border border-red-500 text-xs font-bold transition cursor-pointer shadow-xs ml-1"
                aria-label="Close"
              >
                <span className="hidden sm:inline">Close Portal</span>
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </header>
        </>
      )}

      {/* Confirmation Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f2e5a] text-white px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-xs font-bold border border-slate-700 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>All 20 registration sections have been filled with sample dummy data!</span>
        </div>
      )}

      {/* Dynamic View Body */}
      <main className="flex-1 bg-slate-100/80">
        
        {/* VIEW 1: Official Entry Screen */}
        {view === 'entry' && (
          <EntryScreen
            onStartRegistration={() => setView('wizard')}
            onOpenPartnerLogin={() => setView('partner-dashboard')}
            onClose={onClose}
          />
        )}

        {/* VIEW 2: 20-Step Registration Wizard */}
        {view === 'wizard' && (
          <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
            
            {/* Quick Action: Insert Dummy Data Banner inside Registration */}
            <div className="mb-5 bg-amber-50 border border-amber-300 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-[#b45309] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-950 block">
                    Form Auto-Fill:
                  </span>
                  <span className="text-[11px] text-amber-900 font-medium">
                    Click &ldquo;Insert Dummy Data&rdquo; to automatically populate all 20 sections of this application with verified sample details.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLoadDemoData}
                className="bg-[#0f2e5a] hover:bg-[#1e3a8a] text-white px-4 py-2 rounded-lg text-xs font-bold shrink-0 flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Insert Dummy Data (Fill All Details)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Left Column: Vertical Stepper */}
              <div className="lg:col-span-1">
                <WizardStepper
                  currentStep={currentStep}
                  onSelectStep={(stepId) => setCurrentStep(stepId)}
                  completedSteps={completedSteps}
                />
              </div>

              {/* Right Column: Step Forms Card & Footer Controls */}
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm min-h-[500px]">
                  
                  {/* Step Range 1 to 5 */}
                  {currentStep >= 1 && currentStep <= 5 && (
                    <StepFormsPart1
                      currentStep={currentStep}
                      formData={formData}
                      onChange={handleUpdate}
                      onAddCentre={(centre) => handleUpdate({ centres: [...formData.centres, centre] })}
                      onRemoveCentre={(id) => handleUpdate({ centres: formData.centres.filter((c) => c.id !== id) })}
                    />
                  )}

                  {/* Step Range 6 to 10 */}
                  {currentStep >= 6 && currentStep <= 10 && (
                    <StepFormsPart2
                      currentStep={currentStep}
                      formData={formData}
                      onChange={handleUpdate}
                      onAddCourse={(course) => handleUpdate({ courses: [...formData.courses, course] })}
                      onRemoveCourse={(id) => handleUpdate({ courses: formData.courses.filter((c) => c.id !== id) })}
                      onAddTrainer={(trainer) => handleUpdate({ trainers: [...formData.trainers, trainer] })}
                      onRemoveTrainer={(id) => handleUpdate({ trainers: formData.trainers.filter((t) => t.id !== id) })}
                      onAddAccreditation={(acc) => handleUpdate({ accreditations: [...formData.accreditations, acc] })}
                      onRemoveAccreditation={(id) => handleUpdate({ accreditations: formData.accreditations.filter((a) => a.id !== id) })}
                    />
                  )}

                  {/* Step Range 11 to 15 */}
                  {currentStep >= 11 && currentStep <= 15 && (
                    <StepFormsPart3
                      currentStep={currentStep}
                      formData={formData}
                      onChange={handleUpdate}
                      onAddEmployer={(emp) => handleUpdate({ employerPartners: [...formData.employerPartners, emp] })}
                      onRemoveEmployer={(id) => handleUpdate({ employerPartners: formData.employerPartners.filter((e) => e.id !== id) })}
                    />
                  )}

                  {/* Step Range 16 to 20 */}
                  {currentStep >= 16 && currentStep <= 20 && (
                    <StepFormsPart4
                      currentStep={currentStep}
                      formData={formData}
                      onChange={handleUpdate}
                      onJumpToStep={(step) => setCurrentStep(step as WizardStepId)}
                      onSubmitApplication={handleSubmitApplication}
                    />
                  )}

                </div>

                {/* Bottom Navigation Buttons */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer ${
                      currentStep === 1
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Section</span>
                  </button>

                  <div className="text-xs text-slate-500 font-bold hidden sm:block">
                    Section {currentStep} of 20
                  </div>

                  {currentStep < 20 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-[#0B3C5D] hover:bg-[#102A43] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-98 transition"
                    >
                      <span>Save &amp; Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitApplication}
                      className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer active:scale-98 transition"
                    >
                      <span>Submit Application</span>
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: Post-Submission Verification View */}
        {view === 'post-submission' && (
          <PostSubmissionView
            formData={formData}
            onOpenGovernmentReview={() => setView('government-review')}
            onOpenApprovedDashboard={() => setView('approved-dashboard')}
            onUpdateCorrections={(corrections) => handleUpdate({ corrections })}
          />
        )}

        {/* VIEW 4: Government Review Dashboard */}
        {view === 'government-review' && (
          <GovernmentReviewDashboard
            formData={formData}
            onApprove={() => setView('approved-dashboard')}
            onReject={(reason) => alert(`Application rejected: ${reason}`)}
            onRequestCorrection={(remarks) => {
              const updatedCorrections: CorrectionItem[] = [
                ...formData.corrections,
                {
                  id: `corr-${Date.now()}`,
                  field: 'Government Desk Officer Clarification',
                  reviewerComment: remarks,
                  currentValue: 'Under Review',
                  status: 'Pending Action',
                },
              ];
              handleUpdate({ corrections: updatedCorrections });
              setView('post-submission');
            }}
            onBackToPostSubmission={() => setView('post-submission')}
          />
        )}

        {/* VIEW 5: Post-Approval Dashboard */}
        {view === 'approved-dashboard' && (
          <ApprovedPartnerDashboard
            formData={formData}
            onResetToLanding={onClose}
          />
        )}

        {/* VIEW 6: Training Partner Live Operations Dashboard (Login: 8252678014 / Vanguard@2026) */}
        {view === 'partner-dashboard' && (
          <TrainingPartnerDashboard
            onLogout={onClose}
            partnerInfo={{
              mobile: '8252678014',
              centerName: 'Pune Skill Development Centre',
              centerId: 'KTP-MH-C001',
              managerName: 'Sanjay More'
            }}
          />
        )}

      </main>

    </div>
  );
};
