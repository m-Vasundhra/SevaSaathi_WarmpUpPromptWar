import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Landmark, FileText, Download, CheckCircle2, ShieldCheck, Search } from 'lucide-react';
import { ElementHighlight } from '../ElementHighlight';

export const GovernmentSite: React.FC = () => {
  const { 
    activeTask, 
    highlightedElementId, 
    advanceStep, 
    currentSimulatedPageState, 
    setSimulatedPageState,
    addToast 
  } = useApp();

  const [refNumber, setRefNumber] = useState('CIT-2026-90812');
  const [downloaded, setDownloaded] = useState(false);

  const isTarget = (id: string) => highlightedElementId === id;

  const handleDownloadCert = () => {
    setDownloaded(true);
    setSimulatedPageState('cert_ready');
    if (activeTask && activeTask.steps[0]?.status === 'active') {
      advanceStep();
    }
    addToast('Verified & Downloaded: Birth_Residence_Certificate_Digitally_Signed.pdf', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-[520px] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">GovPortal Citizen Hub</h2>
              <p className="text-xs text-blue-200">Ministry of Citizen Affairs & Digital Registry</p>
            </div>
          </div>
          <div className="text-xs text-right text-blue-200">
            <p>Official Public Portal</p>
            <p className="font-bold text-white">SSL Digitally Verified</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Digital Certificate Retrieval</h3>
            <p className="text-xs text-slate-500">Download government-issued birth, residence, or property records.</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Birth & Residence Certificate Record</h4>
                  <p className="text-[11px] text-slate-500">Application Reference: #{refNumber}</p>
                </div>
              </div>

              <div className="relative">
                {isTarget('btn-gov-cert') && (
                  <ElementHighlight label="Step 1: Download Certificate" position="top" />
                )}
                <button
                  id="btn-gov-cert"
                  onClick={handleDownloadCert}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition ${
                    downloaded ? 'bg-emerald-600' : 'bg-blue-900 hover:bg-blue-800'
                  } ${isTarget('btn-gov-cert') ? 'ring-4 ring-blue-300 ai-highlight-target' : ''}`}
                >
                  <Download className="h-4 w-4" />
                  <span>{downloaded ? 'Certificate Downloaded ✓' : 'Download Official Certificate (PDF)'}</span>
                </button>
              </div>
            </div>
          </div>

          {currentSimulatedPageState === 'cert_ready' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-2 font-bold text-emerald-950">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Certificate Verified with Digital QR Stamp</span>
              </div>
              <p className="text-emerald-800">
                The document has been securely downloaded to your device with cryptographic digital signature.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
