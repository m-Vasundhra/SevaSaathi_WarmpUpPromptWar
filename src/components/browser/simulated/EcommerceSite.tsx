import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ShoppingBag, Package, RefreshCw, CheckCircle2, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { ElementHighlight } from '../ElementHighlight';
import { ConfirmationDialog } from '../../ui/ConfirmationDialog';

export const EcommerceSite: React.FC = () => {
  const { 
    activeTask, 
    highlightedElementId, 
    advanceStep, 
    currentSimulatedPageState, 
    setSimulatedPageState,
    addToast 
  } = useApp();

  const [returnReason, setReturnReason] = useState('defective');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isTarget = (id: string) => highlightedElementId === id;

  const handleStartReturn = () => {
    setSimulatedPageState('return_reason');
    if (activeTask && activeTask.steps[0]?.status === 'active') {
      advanceStep();
    }
    addToast('Initiating return for Order #SC-8921', 'info');
  };

  const handleSelectReason = () => {
    setReturnReason('defective');
    setSimulatedPageState('pickup_confirm');
    if (activeTask && activeTask.steps[1]?.status === 'active') {
      advanceStep();
    }
    addToast('Reason recorded: Defective audio / crackling sound', 'info');
  };

  const handleConfirmReturn = () => {
    setShowConfirmModal(false);
    setSimulatedPageState('return_scheduled');
    if (activeTask && activeTask.steps[2]?.status === 'active') {
      advanceStep();
    }
    addToast('Return pickup scheduled for tomorrow!', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-[520px] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-purple-300">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">SwiftCart Store</h2>
              <p className="text-xs text-purple-200">Customer Orders & Support Portal</p>
            </div>
          </div>
          <div className="text-xs text-right text-purple-200">
            <p>14-Day Hassle-Free Returns</p>
            <p className="font-bold text-white">Prime Member</p>
          </div>
        </div>

        {/* State 1: Order List */}
        {(currentSimulatedPageState === 'initial' || !currentSimulatedPageState) && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Your Recent Orders</h3>
              <p className="text-xs text-slate-500">Track shipments or request replacements.</p>
            </div>

            {/* Order Card 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs text-slate-500">
                <div className="flex gap-4">
                  <div>
                    <p className="font-bold uppercase text-[10px] text-slate-400">Order Placed</p>
                    <p className="text-slate-800 font-semibold">Sep 24, 2026</p>
                  </div>
                  <div>
                    <p className="font-bold uppercase text-[10px] text-slate-400">Total Paid</p>
                    <p className="text-slate-800 font-semibold">₹4,999.00</p>
                  </div>
                </div>
                <div>
                  <p className="font-bold uppercase text-[10px] text-slate-400">Order #</p>
                  <p className="font-mono text-slate-800 font-bold">SC-8921</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
                    🎧
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Studio Pro Noise-Cancelling Headphones</h4>
                    <p className="text-xs text-emerald-600 font-medium">Delivered Sep 26 · Return window open</p>
                  </div>
                </div>

                <div className="relative">
                  {isTarget('btn-return-sc8921') && (
                    <ElementHighlight label="Step 1: Click Return Item" position="top" />
                  )}
                  <button
                    id="btn-return-sc8921"
                    onClick={handleStartReturn}
                    className={`px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-xs font-bold border border-purple-200 transition ${
                      isTarget('btn-return-sc8921') ? 'ring-4 ring-purple-200 ai-highlight-target' : ''
                    }`}
                  >
                    Return or Replace Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Select Reason */}
        {currentSimulatedPageState === 'return_reason' && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Why are you returning this item?</h3>
              <p className="text-xs text-slate-500">Studio Pro Noise-Cancelling Headphones (#SC-8921)</p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                {isTarget('opt-reason-defective') && (
                  <ElementHighlight label="Step 2: Select Defective Reason" position="top" />
                )}
                <button
                  id="opt-reason-defective"
                  onClick={handleSelectReason}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                    returnReason === 'defective'
                      ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-200'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${isTarget('opt-reason-defective') ? 'ai-highlight-target' : ''}`}
                >
                  <p className="font-bold text-slate-900">Item defective or sound glitch</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Left speaker has audio crackling</p>
                </button>
              </div>

              <button
                onClick={() => handleSelectReason()}
                className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 text-left text-xs text-slate-700"
              >
                <p className="font-bold">Missing parts or accessories</p>
              </button>
            </div>
          </div>
        )}

        {/* State 3: Pickup Confirmation */}
        {currentSimulatedPageState === 'pickup_confirm' && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Confirm Return & Pickup Details</h3>
              <p className="text-xs text-slate-500">Free home pickup with instant refund once collected.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Refund Amount:</span>
                <span className="font-bold text-slate-900">₹4,999.00 to original payment method</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Address:</span>
                <span className="font-semibold text-slate-800">Flat 4B, Silicon Heights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled Time:</span>
                <span className="font-semibold text-purple-700">Tomorrow, 10 AM – 2 PM</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSimulatedPageState('return_reason')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back
              </button>

              <div className="relative">
                {isTarget('btn-submit-return') && (
                  <ElementHighlight label="Step 3: Submit Return Request" position="top" />
                )}
                <button
                  id="btn-submit-return"
                  onClick={() => setShowConfirmModal(true)}
                  className={`px-6 py-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold shadow-md transition ${
                    isTarget('btn-submit-return') ? 'ring-4 ring-purple-200 ai-highlight-target' : ''
                  }`}
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 4: Return Scheduled */}
        {currentSimulatedPageState === 'return_scheduled' && (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                Return Authorized
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">Pickup Scheduled</h3>
              <p className="text-xs text-slate-500 mt-1">Return ID: #RTN-9021 · Courier will arrive tomorrow</p>
            </div>

            <button
              onClick={() => setSimulatedPageState('initial')}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Back to Orders
            </button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmReturn}
        title="Authorize Product Return"
        summary="Courier will inspect and collect the item."
        items={[
          'Item: Studio Pro Headphones (#SC-8921)',
          'Refund Amount: ₹4,999.00',
          'Pickup Date: Tomorrow, 10 AM – 2 PM'
        ]}
        confirmLabel="Submit Return"
      />
    </div>
  );
};
