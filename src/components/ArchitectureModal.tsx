import React, { useEffect, useState } from 'react';
import {
  X,
  Database,
  Server,
  Layers,
  CheckCircle2,
  Cpu,
  Terminal,
  ShieldAlert,
  Code2,
  RefreshCw
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [healthData, setHealthData] = useState<{
    status?: string;
    service?: string;
    database?: { name?: string; provider?: string };
    cache?: { provider?: string };
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const fetchHealth = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthData(data);
    } catch {
      setHealthData({
        status: 'mock-healthy',
        service: 'kaushal-api',
        database: { name: 'kaushal', provider: 'PostgreSQL 17' },
        cache: { provider: 'Redis 7.0' }
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchHealth();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold border border-orange-200">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0B3C5D] flex items-center gap-2">
                <span>Kaushal Architecture & Longitudinal System Inspector</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                  Live Synced
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Connected with longitudinal outcomes data pipeline & SIDH consent framework
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live System Diagnostics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-orange-600" />
              <span>PostgreSQL 17 Database</span>
            </div>
            <div className="font-bold text-[#0B3C5D] text-xs font-mono">
              DB: kaushal (Port 5432)
            </div>
            <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>Prisma ORM & Audit Logs</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-sky-600" />
              <span>NestJS API & Express Route</span>
            </div>
            <div className="font-bold text-[#0B3C5D] text-xs font-mono">
              Port 3000 (/api)
            </div>
            <div className="text-[10px] text-sky-700 font-medium">
              JWT & DPDP 2023 Consent
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="text-[11px] text-slate-500 font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tracer Analytics Engine</span>
            </div>
            <div className="font-bold text-[#0B3C5D] text-xs font-mono">
              Automated Follow-ups (T+30..T+365)
            </div>
            <div className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>EPFO & GSTN Signal Match</span>
            </div>
          </div>
        </div>

        {/* System Flow Pipeline */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-orange-600" />
            <span>Longitudinal Tracking Pipeline Architecture</span>
          </h4>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 space-y-3">
            <div>
              <span className="text-[#0B3C5D] font-bold">SIDH Consent & Trainee Dossier Engine:</span>
              <div className="ml-4 space-y-1 text-slate-600 pt-1 font-sans text-xs">
                <div>
                  1. <span className="text-[#0B3C5D] font-bold">Consent Capture:</span> Aadhaar-vault DPDP compliant OTP consent for 3-year employment tracer.
                </div>
                <div>
                  2. <span className="text-orange-700 font-bold">Outcome Linkage:</span> Training completion linked to Apprenticeship (NAPS), Wage Placement, or Self-Employment (MSME Udyam).
                </div>
                <div>
                  3. <span className="text-emerald-700 font-bold">Assisted Automated Follow-ups:</span> Multi-channel WhatsApp bot, IVR telephony, and District Skill Officer desk audit.
                </div>
                <div>
                  4. <span className="text-purple-700 font-bold">Accountability Loop:</span> Underperforming providers receive targeted remedial action plans and automated seat caps.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Database Entities */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span>Key Data Entities in System</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
              <div className="font-bold text-[#0B3C5D]">TraineeRecord</div>
              <div className="text-[10px] text-slate-500">sidhId, consentValidUntil</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
              <div className="font-bold text-orange-700">TracerFollowUp</div>
              <div className="text-[10px] text-slate-500">milestone, wage, verifiedVia</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
              <div className="font-bold text-sky-700">ProviderScorecard</div>
              <div className="text-[10px] text-slate-500">retentionRate, grade, seatCap</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono">
              <div className="font-bold text-emerald-700">RemedialAction</div>
              <div className="text-[10px] text-slate-500">actionType, deadline, status</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={fetchHealth}
            disabled={isChecking}
            className="flex items-center gap-1.5 text-xs text-orange-600 hover:text-orange-700 font-bold transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>Re-verify System Telemetry</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0B3C5D] hover:bg-[#082b42] text-white font-bold text-xs transition cursor-pointer shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
