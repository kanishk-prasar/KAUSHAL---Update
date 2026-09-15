import React, { useState } from 'react';
import {
  Wrench,
  ShieldCheck,
  Zap,
  Lock,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight
} from 'lucide-react';
import { EV_SIMULATOR_LAB } from '../data/mockData';
import { LearnerProfile } from '../types';

interface PracticalSimulatorProps {
  profile: LearnerProfile;
  onLogPracticalHours: (hours: number) => void;
  lang: 'en' | 'mr' | 'hi';
}

export const PracticalSimulator: React.FC<PracticalSimulatorProps> = ({
  profile,
  onLogPracticalHours,
  lang
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedToolId, setSelectedToolId] = useState<string | null>(null);
  const [multimeterVoltage, setMultimeterVoltage] = useState<number | null>(412.5); // initially live 412.5V!
  const [glovesEquipped, setGlovesEquipped] = useState(false);
  const [lotoApplied, setLotoApplied] = useState(false);
  const [capacitorsDischarged, setCapacitorsDischarged] = useState(false);
  const [voltageVerifiedSafe, setVoltageVerifiedSafe] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const lab = EV_SIMULATOR_LAB;
  const currentStep = lab.steps[currentStepIndex];

  const handleSelectTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setFeedbackMessage(null);
  };

  const handleComponentClick = (componentId: string) => {
    if (!selectedToolId) {
      setFeedbackMessage('Please select a tool from your safety workbench first.');
      return;
    }

    // Step 1: Equip Gloves
    if (currentStepIndex === 0) {
      if (selectedToolId === 'insulation-gloves') {
        setGlovesEquipped(true);
        setFeedbackMessage('Class 0 (1000V) Insulating Gloves equipped and integrity checked.');
        setCurrentStepIndex(1);
        setSelectedToolId(null);
      } else {
        setFeedbackMessage('Safety Violation! You must put on Class 0 Insulating Gloves first before touching the high-voltage bay.');
      }
      return;
    }

    // Step 2: Lockout MSD
    if (currentStepIndex === 1) {
      if (selectedToolId === 'lockout-tag' && componentId === 'safety-plug') {
        setLotoApplied(true);
        setFeedbackMessage('Manual Service Disconnect (MSD) pulled and secured with LOTO padlock.');
        setCurrentStepIndex(2);
        setSelectedToolId(null);
      } else {
        setFeedbackMessage('Apply the Lockout Padlock to the Manual Service Disconnect (MSD) Orange Plug.');
      }
      return;
    }

    // Step 3: Discharge Resistor Probe
    if (currentStepIndex === 2) {
      if (selectedToolId === 'discharge-resistor' && componentId === 'dc-bus') {
        setCapacitorsDischarged(true);
        setMultimeterVoltage(0.4);
        setFeedbackMessage('Residual inverter capacitor energy successfully dissipated through high-power discharge probe.');
        setCurrentStepIndex(3);
        setSelectedToolId(null);
      } else {
        setFeedbackMessage('Touch the DC Bus Discharge Probe across the Inverter Terminals.');
      }
      return;
    }

    // Step 4: Multimeter Verification
    if (currentStepIndex === 3) {
      if (selectedToolId === 'fluke-multimeter' && componentId === 'dc-bus') {
        setVoltageVerifiedSafe(true);
        setIsCompleted(true);
        setFeedbackMessage('Voltage Verified Safe: 0.4V DC (< 5V Threshold). Safe for mechanical servicing!');
        onLogPracticalHours(20);
        setSelectedToolId(null);
      } else {
        setFeedbackMessage('Use the CAT-IV 1000V Digital Multimeter on the Inverter DC Bus Terminals.');
      }
      return;
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setSelectedToolId(null);
    setMultimeterVoltage(412.5);
    setGlovesEquipped(false);
    setLotoApplied(false);
    setCapacitorsDischarged(false);
    setVoltageVerifiedSafe(false);
    setIsCompleted(false);
    setFeedbackMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Vocational Lab • NSQF Level 5 Competency</span>
          </div>

          <div className="text-xs text-slate-500 font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-orange-600" />
            <span>Earns +20 Practical Workshop Hours</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-[#0B3C5D]">
          {lang !== 'en'
            ? 'इलेक्ट्रिक वाहन (EV) हाय-व्होल्टेज आयसोलेशन आणि मल्टीमीटर लॅब'
            : lab.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed font-medium">
          {lab.objective}
        </p>
      </div>

      {/* Simulator Main Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Workbench (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          {/* Active Step Banner */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#0B3C5D] text-white">
                  Step {isCompleted ? '4' : currentStepIndex + 1} of 4
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  {isCompleted ? 'Lab Complete' : 'Procedure in Progress'}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {isCompleted
                  ? 'Isolation Verified & Cleared for Servicing'
                  : currentStep?.instruction}
              </div>
              {!isCompleted && currentStep?.hint && (
                <div className="text-xs text-orange-600 font-medium">Hint: {currentStep.hint}</div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-center shrink-0 border border-slate-300 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-orange-600" />
              <span>Reset Lab</span>
            </button>
          </div>

          {/* Feedback message */}
          {feedbackMessage && (
            <div
              className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                feedbackMessage.includes('Violation')
                  ? 'bg-rose-50 border border-rose-300 text-rose-800'
                  : 'bg-emerald-50 border border-emerald-300 text-emerald-800'
              }`}
            >
              {feedbackMessage.includes('Violation') ? (
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <span>{feedbackMessage}</span>
            </div>
          )}

          {/* Interactive Vehicle Bay Stage Graphic */}
          <div className="relative h-80 sm:h-96 w-full rounded-xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col justify-between overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Top Status Bar in Stage */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-slate-300 font-semibold font-mono">
                  EV POWERTRAIN TEST RIG #4
                </span>
              </div>

              {/* Multimeter HUD Display */}
              <div className="bg-slate-950 border-2 border-slate-700 rounded-lg p-2.5 shadow-lg flex items-center gap-3">
                <Gauge className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider">
                    CAT-IV 1000V DC BUS
                  </div>
                  <div className="text-lg font-mono font-black text-amber-400 tracking-wider">
                    {multimeterVoltage !== null ? `${multimeterVoltage.toFixed(1)} V DC` : '---.- V'}
                  </div>
                </div>
                <div
                  className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    multimeterVoltage && multimeterVoltage < 5
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                  }`}
                >
                  {multimeterVoltage && multimeterVoltage < 5 ? 'SAFE VOLTAGE' : 'HIGH VOLTAGE'}
                </div>
              </div>
            </div>

            {/* Center Industrial Bay Visual Assembly */}
            <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
              {/* Component 1: MSD Orange Plug */}
              <button
                onClick={() => handleComponentClick('safety-plug')}
                className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  lotoApplied
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 border-amber-500/60 hover:border-amber-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    lotoApplied ? 'bg-emerald-600 text-white' : 'bg-orange-500 text-slate-950'
                  }`}
                >
                  <Lock className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-100">MSD Plug</div>
                <div className="text-[10px] font-mono text-slate-400">
                  {lotoApplied ? 'Locked Out (LOTO)' : 'Engaged (400V)'}
                </div>
              </button>

              {/* Component 2: 400V Inverter Bus */}
              <button
                onClick={() => handleComponentClick('dc-bus')}
                className={`p-4 rounded-xl border-2 transition-all text-center flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  voltageVerifiedSafe
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800/80 border-rose-500/60 hover:border-rose-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    voltageVerifiedSafe
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white animate-pulse'
                  }`}
                >
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-100">Inverter DC Bus</div>
                <div className="text-[10px] font-mono text-slate-400">
                  {voltageVerifiedSafe
                    ? '0.4V Verified Safe'
                    : capacitorsDischarged
                    ? 'Discharged'
                    : '400V Live'}
                </div>
              </button>

              {/* Component 3: Chassis Ground */}
              <button
                onClick={() => handleComponentClick('chassis-ground')}
                className="p-4 rounded-xl border-2 bg-slate-800/80 border-slate-700 hover:border-slate-500 text-center flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-700 text-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-100">Chassis Ground</div>
                <div className="text-[10px] font-mono text-slate-400">0.02 Ohm Bonded</div>
              </button>

              {/* Component 4: HVIL Loop */}
              <button
                onClick={() => handleComponentClick('safety-interlock')}
                className="p-4 rounded-xl border-2 bg-slate-800/80 border-slate-700 hover:border-slate-500 text-center flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-700 text-amber-300 flex items-center justify-center">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-100">HVIL Loop</div>
                <div className="text-[10px] font-mono text-slate-400">12V Control Signal</div>
              </button>
            </div>

            {/* Bottom Bay Indicators */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      glovesEquipped ? 'bg-emerald-400' : 'bg-slate-600'
                    }`}
                  />
                  <span>PPE Gloves: {glovesEquipped ? 'Equipped' : 'Not Worn'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      lotoApplied ? 'bg-emerald-400' : 'bg-slate-600'
                    }`}
                  />
                  <span>LOTO: {lotoApplied ? 'Secured' : 'Open'}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      capacitorsDischarged ? 'bg-emerald-400' : 'bg-slate-600'
                    }`}
                  />
                  <span>Caps: {capacitorsDischarged ? 'Bled' : 'Charged'}</span>
                </span>
              </div>

              <div className="text-[11px] text-amber-400 font-mono">
                Selected Tool:{' '}
                <span className="font-bold text-white">
                  {lab.tools.find((t) => t.id === selectedToolId)?.name || 'None'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Toolbox & Certification Status (4 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="font-bold text-[#0B3C5D] text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-orange-600" />
                <span>Certified Tool Rack</span>
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Select a tool, then click the target component on the workstation.
              </p>
            </div>

            {/* Tool Selection Grid */}
            <div className="space-y-2.5">
              {lab.tools.map((tool) => {
                const isSelected = selectedToolId === tool.id;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelectTool(tool.id)}
                    className={`w-full text-left p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#0B3C5D] text-white font-bold border-[#0B3C5D] shadow-xs'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        {tool.id === 'fluke-multimeter' && <Gauge className="w-4 h-4" />}
                        {tool.id === 'insulation-gloves' && <ShieldCheck className="w-4 h-4" />}
                        {tool.id === 'lockout-tag' && <Lock className="w-4 h-4" />}
                        {tool.id === 'discharge-resistor' && <Zap className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold">{tool.name}</span>
                    </div>

                    {isSelected && (
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-white text-[#0B3C5D]">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Success Award State */}
          {isCompleted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <span>Competency Verified!</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                You successfully verified zero energy state according to NFPA 70E / ASDC Automotive
                standards. +20 practical training hours have been stamped to your Kaushal Digital
                Passport.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-emerald-700">
                Certificate Hash: #EV-ISO-{Math.floor(Math.random() * 90000 + 10000)}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-[#0B3C5D]">Vocational Standards Note</div>
              <div className="font-medium">
                Always follow the 3-step test: Test multimeter on known live source, verify circuit
                de-energized, re-test multimeter on live source.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
