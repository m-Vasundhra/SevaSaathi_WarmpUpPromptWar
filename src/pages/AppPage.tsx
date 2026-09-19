import React from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/navigation/Navbar';
import { Sidebar } from '../components/navigation/Sidebar';
import { AssistantInput } from '../components/assistant/AssistantInput';
import { AssistantPanel } from '../components/assistant/AssistantPanel';
import { BrowserFrame } from '../components/browser/BrowserFrame';
import { ElectricitySite } from '../components/browser/simulated/ElectricitySite';
import { BankSite } from '../components/browser/simulated/BankSite';
import { RailwaySite } from '../components/browser/simulated/RailwaySite';
import { EcommerceSite } from '../components/browser/simulated/EcommerceSite';
import { GovernmentSite } from '../components/browser/simulated/GovernmentSite';
import { TaskHistory } from '../components/tasks/TaskHistory';
import { SafetyNotice } from '../components/ui/SafetyNotice';
import { CategoryCard } from '../components/ui/CategoryCard';
import { CATEGORIES, QUICK_EXAMPLES } from '../data/demoData';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';
import { SimulatedSiteId } from '../types';

export const AppPage: React.FC = () => {
  const {
    currentRoute,
    navigateTo,
    activeTask,
    startTask,
    currentSiteId,
    settings,
    updateSettings
  } = useApp();

  const handleStartQuickTask = async (taskText: string, siteId?: SimulatedSiteId) => {
    await startTask(taskText, siteId);
    navigateTo('/app/assistant');
  };

  // Determine which sub-view to show based on currentRoute
  const isAssistantView = currentRoute === '/app/assistant';
  const isTasksView = currentRoute === '/app/tasks';
  const isSettingsView = currentRoute === '/app/settings';
  const isDashboardView = currentRoute === '/app' || currentRoute === '';

  // Render the active simulated website
  const renderSimulatedSite = () => {
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

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Active Guidance Alert Banner if task in progress on non-assistant view */}
          {activeTask && !isAssistantView && (
            <div className="p-4 bg-indigo-900 text-white rounded-2xl flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-200">Active Task in Progress</p>
                  <h4 className="text-sm font-bold text-white">{activeTask.title} (Step {activeTask.currentStep} of {activeTask.totalSteps})</h4>
                </div>
              </div>

              <button
                onClick={() => navigateTo('/app/assistant')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Resume Guidance</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* VIEW 1: Main Dashboard (/app) */}
          {isDashboardView && (
            <div className="space-y-8">
              {/* Central Ask Box */}
              <div className="rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl space-y-6 relative overflow-hidden">
                <div className="max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                    <span>AI Assistant Engine</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                    Tell me what you want to do.
                  </h1>
                  <p className="text-xs sm:text-sm text-indigo-200 font-medium">
                    I'll understand the website you're on and guide you step by step.
                  </p>
                </div>

                {/* Input box */}
                <div className="pt-2">
                  <AssistantInput
                    placeholder="e.g. Help me pay my electricity bill, download statement, book a train..."
                    onStart={(goal) => handleStartQuickTask(goal)}
                  />
                </div>

                {/* Quick chip suggestions */}
                <div className="pt-2">
                  <p className="text-xs text-indigo-300 font-semibold mb-2">Try a quick example:</p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_EXAMPLES.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleStartQuickTask(item.text, item.siteId)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition border border-white/10 cursor-pointer"
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Zero-Credential Safety Box */}
              <SafetyNotice />

              {/* Browse by Category */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">Explore Guidance Scenarios</h2>
                  <span className="text-xs text-slate-500 font-medium">6 Categories Available</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      onSelectExample={(ex: string) => handleStartQuickTask(ex)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: Interactive Browser Assistant View (/app/assistant) */}
          {isAssistantView && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Interactive Assistant Simulator</h2>
                  <p className="text-xs text-slate-500">
                    Watch the AI guide your clicks on the simulated webpage in real time.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartQuickTask('Help me pay my electricity bill', 'electricity')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Electricity Flow</span>
                  </button>
                </div>
              </div>

              {/* Main Simulated Browser Frame */}
              <div className="relative">
                <BrowserFrame>
                  {renderSimulatedSite()}
                </BrowserFrame>

                {/* Overlaid Assistant Panel on bottom right */}
                <div className="mt-4 lg:mt-0 lg:fixed lg:bottom-6 lg:right-6 lg:z-50 max-w-sm w-full">
                  <AssistantPanel />
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: Tasks History & Audit Log (/app/tasks) */}
          {isTasksView && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Task Activity & Audit History</h2>
                <p className="text-xs text-slate-500">
                  Inspect completed sessions, verified timestamps, and step-by-step audit timelines.
                </p>
              </div>

              <TaskHistory />
            </div>
          )}

          {/* VIEW 4: Assistant Settings & Accessibility (/app/settings) */}
          {isSettingsView && (
            <div className="max-w-2xl space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h2 className="text-xl font-bold text-slate-900">Assistant Preferences</h2>
                <p className="text-xs text-slate-500">
                  Customize speech speed, contrast, accessibility, and guidance modes.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">Accessibility & Visuals</h3>

                <div className="space-y-4 text-xs divide-y divide-slate-100">
                  {/* High Contrast */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">High Contrast Mode</p>
                      <p className="text-slate-500">Boost border and text contrast across all guidance prompts</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ highContrast: !settings.highContrast })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.highContrast ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Large Text */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Large Typography Size</p>
                      <p className="text-slate-500">Enlarge instructions and on-screen tooltip labels for readability</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ largerText: !settings.largerText })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.largerText ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.largerText ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Voice Guidance */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Voice Assistance (Spoken Readout)</p>
                      <p className="text-slate-500">Speak each instruction aloud automatically using Speech Synthesis</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ voiceAssistance: !settings.voiceAssistance })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.voiceAssistance ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.voiceAssistance ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reduced Motion */}
                  <div className="pt-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">Reduced Motion</p>
                      <p className="text-slate-500">Minimize animations and pulsing spotlights</p>
                    </div>
                    <button
                      onClick={() => updateSettings({ reducedMotion: !settings.reducedMotion })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Zero-Credential Compliance Notice */}
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 text-xs text-emerald-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-950">
                  <ShieldCheck className="h-5 w-5 text-emerald-700" />
                  <span>Verified Safe Browser Protocol</span>
                </div>
                <p className="leading-relaxed text-emerald-800">
                  SevaSaathi runs in a sandboxed assist-layer. It cannot access password vaults, inspect banking PIN fields, or execute financial transactions without explicit user biometric or button confirmation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
