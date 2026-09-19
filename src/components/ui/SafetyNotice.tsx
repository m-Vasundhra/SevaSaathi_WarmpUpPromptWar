import React from 'react';
import { ShieldCheck, Lock, Eye, AlertCircle } from 'lucide-react';

interface SafetyNoticeProps {
  compact?: boolean;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-xs text-emerald-900">
        <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
        <span className="font-medium">
          <strong className="font-semibold text-emerald-950">Zero-Credential Guarantee:</strong> SevaSaathi will never ask for your passwords, OTPs, PINs, or CVV numbers.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-base">You Stay in Complete Control</h3>
          <p className="text-xs text-slate-500 font-medium">Privacy, consent, and user authority first</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Lock className="h-3.5 w-3.5 text-indigo-600" />
            <span>Zero Credentials</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            We never ask for passwords, OTPs, ATM PINs, or CVVs. Sensitive data remains strictly yours.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <Eye className="h-3.5 w-3.5 text-indigo-600" />
            <span>Visible Action Plan</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            AI highlights the next step on screen and explains why before you click or proceed.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-slate-800">
            <AlertCircle className="h-3.5 w-3.5 text-indigo-600" />
            <span>Explicit Confirmations</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Payments, ticket bookings, or submissions require your clear review before completion.
          </p>
        </div>
      </div>
    </div>
  );
};
