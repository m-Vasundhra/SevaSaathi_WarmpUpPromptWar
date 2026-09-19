import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Zap, CreditCard, QrCode, CheckCircle2, Download, ShieldCheck, ArrowRight, HelpCircle, Receipt } from 'lucide-react';
import { ElementHighlight } from '../ElementHighlight';
import { ConfirmationDialog } from '../../ui/ConfirmationDialog';

export const ElectricitySite: React.FC = () => {
  const { 
    activeTask, 
    highlightedElementId, 
    setHighlightedElementId, 
    advanceStep, 
    currentSimulatedPageState, 
    setSimulatedPageState,
    addToast
  } = useApp();

  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);

  // Helper to check if an element is currently spotlighted
  const isTarget = (id: string) => highlightedElementId === id;

  const handlePayBillClick = () => {
    setSimulatedPageState('payment_options');
    if (activeTask && activeTask.steps[0]?.status === 'active') {
      advanceStep();
    }
    addToast('Navigated to payment selection', 'info');
  };

  const handleSelectUpi = () => {
    setPaymentMode('upi');
    setSimulatedPageState('payment_confirm');
    if (activeTask && activeTask.steps[1]?.status === 'active') {
      advanceStep();
    }
  };

  const handleConfirmPayment = () => {
    setShowConfirmModal(false);
    setSimulatedPageState('completed');
    if (activeTask && activeTask.steps[2]?.status === 'active') {
      advanceStep();
    }
    addToast('Payment of ₹2,450 processed successfully!', 'success');
  };

  const handleDownloadReceipt = () => {
    setReceiptDownloaded(true);
    if (activeTask && activeTask.steps[3]?.status === 'active') {
      advanceStep();
    }
    addToast('Receipt #PWR-2026-9081 downloaded as PDF', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-[520px] p-4 sm:p-8 font-sans">
      {/* Website Top Bar */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-amber-300 backdrop-blur-xs">
              <Zap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">PowerGrid Energy Services</h2>
              <p className="text-xs text-amber-200">State Electricity & Utility Board</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-[11px] text-amber-200 uppercase tracking-wider font-semibold">Consumer Account</p>
            <p className="text-xs font-mono font-bold">#123456789</p>
          </div>
        </div>

        {/* State 1: Account & Bill Overview */}
        {(currentSimulatedPageState === 'initial' || !currentSimulatedPageState) && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-800">September 2026 Billing</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-slate-900">₹2,450</span>
                  <span className="text-xs font-medium text-amber-700">Due by Oct 05, 2026</span>
                </div>
              </div>
              
              <div className="relative inline-block">
                {isTarget('btn-pay-bill') && (
                  <ElementHighlight 
                    label="Step 1: Click Pay Bill" 
                    sublabel="₹2,450 due" 
                    position="top" 
                  />
                )}
                <button
                  id="btn-pay-bill"
                  onClick={handlePayBillClick}
                  className={`relative px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 ${
                    isTarget('btn-pay-bill')
                      ? 'bg-amber-600 hover:bg-amber-500 text-white ring-4 ring-amber-300 ai-highlight-target'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  Pay Bill Now
                </button>
              </div>
            </div>

            {/* Bill Details Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tariff Breakdown</h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
                <div className="flex justify-between p-3 bg-white">
                  <span className="text-slate-600">Energy Consumption (340 Units)</span>
                  <span className="font-semibold text-slate-900">₹1,890.00</span>
                </div>
                <div className="flex justify-between p-3 bg-white">
                  <span className="text-slate-600">Fixed Grid & Meter Surcharge</span>
                  <span className="font-semibold text-slate-900">₹360.00</span>
                </div>
                <div className="flex justify-between p-3 bg-white">
                  <span className="text-slate-600">State Electricity Duty (8%)</span>
                  <span className="font-semibold text-slate-900">₹200.00</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 font-bold text-slate-900">
                  <span>Net Amount Payable</span>
                  <span className="text-sm text-amber-700 font-extrabold">₹2,450.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Payment Method Selection */}
        {currentSimulatedPageState === 'payment_options' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Choose Payment Method</h3>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                Amount: ₹2,450
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                {isTarget('opt-pay-upi') && (
                  <ElementHighlight label="Step 2: Select UPI / QR" position="top" />
                )}
                <button
                  id="opt-pay-upi"
                  onClick={handleSelectUpi}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    paymentMode === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  } ${isTarget('opt-pay-upi') ? 'ai-highlight-target' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-2 text-indigo-600">
                    <QrCode className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-wider">Instant UPI</span>
                  </div>
                  <p className="text-xs font-medium text-slate-800">Google Pay, PhonePe, Paytm</p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-1">Zero convenience fee</p>
                </button>
              </div>

              <button
                onClick={() => setPaymentMode('card')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  paymentMode === 'card'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-slate-700">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Debit / Card</span>
                </div>
                <p className="text-xs font-medium text-slate-800">Visa, Mastercard, RuPay</p>
              </button>

              <button
                onClick={() => setPaymentMode('netbanking')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  paymentMode === 'netbanking'
                    ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-200'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 text-slate-700">
                  <Zap className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Net Banking</span>
                </div>
                <p className="text-xs font-medium text-slate-800">All Major Indian Banks</p>
              </button>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => setSimulatedPageState('initial')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back to bill overview
              </button>
              <button
                onClick={() => setSimulatedPageState('payment_confirm')}
                className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 shadow-sm"
              >
                Continue with {paymentMode.toUpperCase()}
              </button>
            </div>
          </div>
        )}

        {/* State 3: Payment Confirmation Review */}
        {currentSimulatedPageState === 'payment_confirm' && (
          <div className="p-6 space-y-6">
            <div className="text-center max-w-md mx-auto space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                Payment Verification
              </span>
              <h3 className="text-xl font-bold text-slate-900">Authorize Bill Payment</h3>
              <p className="text-xs text-slate-500">
                Review your transaction summary before final authorization.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 max-w-md mx-auto space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Consumer Name</span>
                <span className="font-semibold text-slate-900">Primary Resident (Unit 4B)</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Consumer Number</span>
                <span className="font-mono font-semibold text-slate-900">123456789</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Provider</span>
                <span className="font-semibold text-slate-900">PowerGrid Energy Services</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Selected Mode</span>
                <span className="font-semibold text-indigo-700">Instant UPI QR</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Due</span>
                <span className="text-amber-700 text-base">₹2,450.00</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setSimulatedPageState('payment_options')}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Change Payment Mode
              </button>

              <div className="relative w-full sm:w-auto">
                {isTarget('btn-confirm-payment') && (
                  <ElementHighlight label="Step 3: Confirm & Authorize" position="top" />
                )}
                <button
                  id="btn-confirm-payment"
                  onClick={() => setShowConfirmModal(true)}
                  className={`w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md transition active:scale-95 ${
                    isTarget('btn-confirm-payment') ? 'ring-4 ring-emerald-200 ai-highlight-target' : ''
                  }`}
                >
                  Authorize & Pay ₹2,450
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 4: Payment Completed / Receipt */}
        {currentSimulatedPageState === 'completed' && (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Payment Successful
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">₹2,450.00 Paid</h3>
              <p className="text-xs text-slate-500 mt-1">Transaction Ref: #PWR-2026-908129 · Verified</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 max-w-sm mx-auto text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Paid To:</span>
                <span className="font-semibold text-slate-800">PowerGrid Energy Services</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Consumer No:</span>
                <span className="font-mono font-semibold text-slate-800">123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-emerald-600">Settled (0 Balance)</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="relative">
                {isTarget('btn-download-receipt') && (
                  <ElementHighlight label="Step 4: Download Receipt" position="top" />
                )}
                <button
                  id="btn-download-receipt"
                  onClick={handleDownloadReceipt}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition ${
                    receiptDownloaded
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                  } ${isTarget('btn-download-receipt') ? 'ai-highlight-target' : ''}`}
                >
                  <Download className="h-4 w-4" />
                  <span>{receiptDownloaded ? 'Receipt Downloaded ✓' : 'Download Receipt (PDF)'}</span>
                </button>
              </div>

              <button
                onClick={() => setSimulatedPageState('initial')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPayment}
        title="Authorize Utility Bill Payment"
        summary="You are about to authorize payment for PowerGrid Energy Services."
        items={[
          'Consumer No: 123456789',
          'Billing Cycle: September 2026',
          'Total Charge: ₹2,450.00',
          'Payment Mode: Instant UPI'
        ]}
        criticalWarning="Never share your UPI PIN or banking passwords with anyone."
        confirmLabel="Confirm & Pay ₹2,450"
      />
    </div>
  );
};
