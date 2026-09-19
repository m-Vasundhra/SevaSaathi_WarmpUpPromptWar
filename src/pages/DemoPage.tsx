import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/navigation/Navbar';
import { BrowserFrame } from '../components/browser/BrowserFrame';
import { ElectricitySite } from '../components/browser/simulated/ElectricitySite';
import { BankSite } from '../components/browser/simulated/BankSite';
import { RailwaySite } from '../components/browser/simulated/RailwaySite';
import { EcommerceSite } from '../components/browser/simulated/EcommerceSite';
import { GovernmentSite } from '../components/browser/simulated/GovernmentSite';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { TaskProgress } from '../components/tasks/TaskProgress';
import { SafetyNotice } from '../components/ui/SafetyNotice';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Info,
  Check
} from 'lucide-react';
import { SimulatedSiteId } from '../types';

export const DemoPage: React.FC = () => {
  const { 
    activeTask, 
    startTask, 
    currentSiteId, 
    setCurrentSiteId, 
    navigateTo 
  } = useApp();

  const [selectedDemoIndex, setSelectedDemoIndex] = useState(0);

  const demoScenarios = [
    {
      id: 'electricity' as SimulatedSiteId,
      title: 'Pay Electricity Bill',
      description: 'Find due bill (₹2,450), choose UPI payment, and download payment receipt.',
      goal: 'Help me pay my electricity bill',
      siteName: 'PowerGrid Energy Services',
      stepsCount: 4
    },
    {
      id: 'bank' as SimulatedSiteId,
      title: 'Download Bank Statement',
      description: 'Navigate to Statements tab, select 3-month range, and export PDF file.',
      goal: 'Where do I download my bank statement?',
      siteName: 'Apex National Bank',
      stepsCount: 3
    },
    {
      id: 'railway' as SimulatedSiteId,
      title: 'Book Train Ticket',
      description: 'Search NDLS → MMCT route, choose Rajdhani 2A, and confirm berth.',
      goal: 'Help me book a train ticket',
      siteName: 'RailWay Express',
      stepsCount: 3
    },
    {
      id: 'ecommerce' as SimulatedSiteId,
      title: 'Return Defective Item',
      description: 'Open recent order, select defect reason, and book free doorstep pickup.',
      goal: 'Help me return this product',
      siteName: 'SwiftCart Orders',
      stepsCount: 3
    },
    {
      id: 'government' as SimulatedSiteId,
      title: 'Download Citizen Certificate',
      description: 'Verify digital record and download digitally signed birth certificate.',
      goal: 'Show me how to download my birth certificate',
      siteName: 'GovPortal Citizen Hub',
      stepsCount: 1
    }
  ];

  const currentScenario = demoScenarios[selectedDemoIndex];

  const handleLaunchScenario = (index: number) => {
    setSelectedDemoIndex(index);
    const scenario = demoScenarios[index];
    startTask(scenario.goal, scenario.id);
  };

  const renderCurrentSite = () => {
    switch (currentSiteId) {
      case 'electricity':
        return <ElectricitySite />;
      case 'bank':
        return <BankSite />;
      case 'railway':
        return <RailwaySite />;
      case 'ecommerce':
        return <EcommerceSite />;
      case 'government':
        return <GovernmentSite />;
      default:
        return <ElectricitySite />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
          <div className="space-y-1.5 max-w-xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-white/10 px-3 py-1 rounded-full inline-block">
              Interactive Product Showcase
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Try the SevaSaathi Experience
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200">
              Select any real-world workflow below and watch the spotlight guide your actions step by step.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchScenario(selectedDemoIndex)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-950 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <RotateCcw className="h-4 w-4 text-indigo-700" />
              <span>Restart Scenario</span>
            </button>
            <button
              onClick={() => navigateTo('/app')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              <span>Launch Full App</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {demoScenarios.map((scenario, idx) => {
            const isSelected = selectedDemoIndex === idx;
            return (
              <button
                key={scenario.id}
                onClick={() => handleLaunchScenario(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-indigo-600 shadow-md ring-2 ring-indigo-100'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {scenario.stepsCount} Steps
                  </span>
                  {isSelected && <Sparkles className="h-3.5 w-3.5 text-indigo-600" />}
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{scenario.title}</h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{scenario.siteName}</p>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Demo Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Demo Guide & Stepper */}
          <div className="lg:col-span-4 space-y-6">
            {activeTask ? (
              <TaskProgress task={activeTask} />
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">Current Scenario: {currentScenario.title}</h3>
                <p className="text-xs text-slate-600">{currentScenario.description}</p>
                <button
                  onClick={() => handleLaunchScenario(selectedDemoIndex)}
                  className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer"
                >
                  Start Guided Walkthrough
                </button>
              </div>
            )}

            {/* How to interact hint box */}
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 space-y-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 font-bold text-indigo-950">
                <Info className="h-4 w-4 text-indigo-600" />
                <span>How to use this demo</span>
              </div>
              <p className="leading-relaxed">
                1. Look for the glowing <strong className="text-indigo-900">spotlight badge</strong> on the simulated webpage.
              </p>
              <p className="leading-relaxed">
                2. Click the highlighted button or press <strong className="text-indigo-900">"Next Step"</strong> in the floating SevaSaathi panel.
              </p>
              <p className="leading-relaxed">
                3. The AI detects the new screen state and explains the next action.
              </p>
            </div>

            <SafetyNotice compact={true} />
          </div>

          {/* Right Column: Live Simulated Browser Frame + SevaSaathi Panel */}
          <div className="lg:col-span-8 space-y-6">
            <BrowserFrame showSiteSelector={false}>
              {renderCurrentSite()}
            </BrowserFrame>

            {/* In-page AI Assistant panel */}
            <div className="max-w-md ml-auto">
              <AssistantPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
