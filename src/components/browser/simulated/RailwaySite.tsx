import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Train, Search, Users, Calendar, ArrowRight, CheckCircle2, ShieldCheck, Ticket } from 'lucide-react';
import { ElementHighlight } from '../ElementHighlight';
import { ConfirmationDialog } from '../../ui/ConfirmationDialog';

export const RailwaySite: React.FC = () => {
  const { 
    activeTask, 
    highlightedElementId, 
    advanceStep, 
    currentSimulatedPageState, 
    setSimulatedPageState,
    addToast 
  } = useApp();

  const [fromStation, setFromStation] = useState('New Delhi (NDLS)');
  const [toStation, setToStation] = useState('Mumbai Central (MMCT)');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isTarget = (id: string) => highlightedElementId === id;

  const handleSearchTrains = () => {
    setSimulatedPageState('train_results');
    if (activeTask && activeTask.steps[0]?.status === 'active') {
      advanceStep();
    }
    addToast('Found 3 direct express trains for NDLS → MMCT', 'info');
  };

  const handleSelectTrain = () => {
    setSimulatedPageState('passenger_details');
    if (activeTask && activeTask.steps[1]?.status === 'active') {
      advanceStep();
    }
    addToast('Selected 12952 Rajdhani Superfast (AC 2A)', 'info');
  };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    setSimulatedPageState('ticket_confirmed');
    if (activeTask && activeTask.steps[2]?.status === 'active') {
      advanceStep();
    }
    addToast('PNR #8920194021 Confirmed! Seat B2-34 (Lower Berth)', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-[520px] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-emerald-300">
              <Train className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">RailWay Express</h2>
              <p className="text-xs text-emerald-200">National Passenger Reservation System</p>
            </div>
          </div>
          <div className="text-xs text-right text-emerald-200">
            <p>IRCTC Partner Portal</p>
            <p className="font-bold text-white">Live Booking Active</p>
          </div>
        </div>

        {/* State 1: Search Trains Form */}
        {(currentSimulatedPageState === 'initial' || !currentSimulatedPageState) && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Book Train Journey</h3>
              <p className="text-xs text-slate-500">Search route and check live berth availability.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">From Origin</label>
                <input
                  type="text"
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">To Destination</label>
                <input
                  type="text"
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Date of Travel</label>
                <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                  Oct 10, 2026 (Friday)
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Travel Class</label>
                <div className="mt-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700">
                  AC 2 Tier (2A)
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <div className="relative">
                {isTarget('btn-search-trains') && (
                  <ElementHighlight label="Step 1: Click Find Trains" position="top" />
                )}
                <button
                  id="btn-search-trains"
                  onClick={handleSearchTrains}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-sm transition ${
                    isTarget('btn-search-trains')
                      ? 'bg-emerald-700 hover:bg-emerald-600 ring-4 ring-emerald-200 ai-highlight-target'
                      : 'bg-emerald-700 hover:bg-emerald-600'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Find Trains</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 2: Train Results List */}
        {currentSimulatedPageState === 'train_results' && (
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Available Trains</h3>
                <p className="text-xs text-slate-500">NDLS → MMCT on Oct 10, 2026</p>
              </div>
              <button onClick={() => setSimulatedPageState('initial')} className="text-xs text-indigo-600 font-bold hover:underline">
                Modify Search
              </button>
            </div>

            {/* Train Card 1 (Rajdhani) */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    Superfast Express
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">12952 NDLS-MMCT Rajdhani</h4>
                  <p className="text-xs text-slate-600">Dep: 16:55 (NDLS) → Arr: 08:35 (MMCT) · 15h 40m</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900">₹2,840</span>
                  <p className="text-[10px] text-emerald-700 font-bold">18 Berths Confirmed</p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100 flex justify-end">
                <div className="relative">
                  {isTarget('btn-select-train-12952') && (
                    <ElementHighlight label="Step 2: Select Rajdhani 2A" position="top" />
                  )}
                  <button
                    id="btn-select-train-12952"
                    onClick={handleSelectTrain}
                    className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition ${
                      isTarget('btn-select-train-12952')
                        ? 'bg-emerald-700 hover:bg-emerald-600 ring-4 ring-emerald-200 ai-highlight-target'
                        : 'bg-emerald-700 hover:bg-emerald-600'
                    }`}
                  >
                    Book 2A Berth (₹2,840)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* State 3: Passenger Confirmation */}
        {currentSimulatedPageState === 'passenger_details' && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Review Passenger & Booking Details</h3>
              <p className="text-xs text-slate-500">Train: 12952 Rajdhani Superfast · Class: AC 2-Tier (2A)</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Passenger:</span>
                <span className="font-semibold text-slate-800">Primary Traveler (Age 32, Male)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Berth Preference:</span>
                <span className="font-semibold text-slate-800">Lower Berth</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Fare Amount:</span>
                <span className="font-bold text-slate-900">₹2,840.00 (Meals Included)</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={() => setSimulatedPageState('train_results')}
                className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
              >
                ← Back
              </button>

              <div className="relative">
                {isTarget('btn-confirm-train-booking') && (
                  <ElementHighlight label="Step 3: Confirm Ticket" position="top" />
                )}
                <button
                  id="btn-confirm-train-booking"
                  onClick={() => setShowConfirmModal(true)}
                  className={`px-6 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md transition ${
                    isTarget('btn-confirm-train-booking') ? 'ring-4 ring-emerald-200 ai-highlight-target' : ''
                  }`}
                >
                  Confirm & Lock Ticket
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 4: Confirmed Ticket */}
        {currentSimulatedPageState === 'ticket_confirmed' && (
          <div className="p-8 text-center space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ticket Confirmed (CNF)
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">PNR: 8920-1940-21</h3>
              <p className="text-xs text-slate-500 mt-1">Coach B2 · Berth 34 (Lower) · 12952 Rajdhani</p>
            </div>

            <button
              onClick={() => setSimulatedPageState('initial')}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Back to Train Search
            </button>
          </div>
        )}
      </div>

      <ConfirmationDialog
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmBooking}
        title="Confirm Train Reservation"
        summary="You are reserving a confirmed train seat."
        items={[
          'Train: 12952 Rajdhani Superfast',
          'Route: New Delhi (NDLS) → Mumbai (MMCT)',
          'Passenger: Primary Traveler (Age 32)',
          'Berth: Lower Berth (2A)'
        ]}
        confirmLabel="Confirm Reservation"
      />
    </div>
  );
};
