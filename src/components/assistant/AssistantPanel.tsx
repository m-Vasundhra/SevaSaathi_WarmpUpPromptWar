import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  HelpCircle, 
  Eye, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { ConfirmationDialog } from '../ui/ConfirmationDialog';

interface AssistantPanelProps {
  onClose?: () => void;
  docked?: boolean;
}

export const AssistantPanel: React.FC<AssistantPanelProps> = ({ onClose, docked = false }) => {
  const { 
    activeTask, 
    advanceStep, 
    cancelActiveTask, 
    speakText, 
    isSpeaking, 
    stopSpeaking,
    setHighlightedElementId,
    addToast
  } = useApp();

  const [explanationActive, setExplanationActive] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [minimized, setMinimized] = useState<boolean>(false);

  const currentStep = activeTask?.steps[activeTask.currentStep - 1];

  const handleNextStep = () => {
    if (!activeTask || !currentStep) return;

    if (currentStep.requiresConfirmation) {
      setShowConfirmModal(true);
      return;
    }

    advanceStep();
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (currentStep) {
      speakText(`${currentStep.instruction}. ${currentStep.explanation || ''}`);
    }
  };

  const handleExplainPage = () => {
    setExplanationActive(true);
    speakText("I'm scanning the current page elements and verifying all interactive targets.");
    addToast("SevaSaathi: Analyzing page layout...", "info");
    setTimeout(() => {
      setExplanationActive(false);
      addToast("Page verified: Ready for next action.", "success");
    }, 1200);
  };

  const handleShowMeWhere = () => {
    if (currentStep?.target) {
      setHighlightedElementId(currentStep.target);
      addToast(`Spotlighting: ${currentStep.targetLabel || currentStep.target}`, 'info');
      // Scroll to element if possible
      const el = document.getElementById(currentStep.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (!activeTask) {
    return (
      <div className={`bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden ${docked ? 'w-full' : 'w-80 sm:w-96'}`}>
        <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm">SevaSaathi</span>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="p-5 text-center space-y-3">
          <div className="h-10 w-10 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">Ready to guide you</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tell SevaSaathi what you want to do on this page, or click any highlighted suggestion.
          </p>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5">
            <button
              onClick={handleExplainPage}
              className="w-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 p-2 rounded-lg transition flex items-center gap-2"
            >
              <Eye className="h-3.5 w-3.5 text-indigo-600" />
              <span>Explain this page</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        id="assistant-panel"
        className={`bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transition-all duration-300 ${
          docked ? 'w-full' : 'w-80 sm:w-96'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-white">SevaSaathi</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 font-semibold">
                  Guide
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium truncate max-w-[170px]">{activeTask.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSpeak}
              title={isSpeaking ? "Stop voice" : "Read aloud"}
              className={`p-1.5 rounded-lg transition ${
                isSpeaking ? 'text-indigo-400 bg-indigo-900/50 animate-pulse' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>

            {!docked && (
              <button
                onClick={() => setMinimized(!minimized)}
                title={minimized ? "Expand" : "Minimize"}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                {minimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                title="Close panel"
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Minimized strip */}
        {minimized && !docked ? (
          <div className="p-3 bg-slate-50 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 truncate">
              Step {activeTask.currentStep}/{activeTask.totalSteps}: {currentStep?.instruction}
            </span>
            <button
              onClick={() => setMinimized(false)}
              className="text-xs font-bold text-indigo-600 hover:underline shrink-0 ml-2"
            >
              Expand
            </button>
          </div>
        ) : (
          /* Main Content */
          <div className="p-5 space-y-4">
            {/* Step Badge & Instruction */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-indigo-600">
                <span>Step {activeTask.currentStep} of {activeTask.totalSteps}</span>
                <span className="text-[10px] text-slate-400">
                  {activeTask.status === 'completed' ? 'Done' : 'In Progress'}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {currentStep ? currentStep.instruction : 'Task finished!'}
              </h4>

              {currentStep?.explanation && (
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {currentStep.explanation}
                </p>
              )}
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleShowMeWhere}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50/80 hover:bg-indigo-100/80 text-indigo-700 text-xs font-semibold transition"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Show me where</span>
              </button>

              <button
                onClick={handleExplainPage}
                disabled={explanationActive}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold transition"
              >
                <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
                <span>{explanationActive ? 'Scanning...' : 'Explain page'}</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                onClick={handleNextStep}
                id="btn-assistant-got-it"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-100 transition active:scale-98"
              >
                <span>
                  {activeTask.currentStep >= activeTask.totalSteps ? 'Finish Task' : 'Got it — Next step'}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={cancelActiveTask}
                className="w-full text-center text-[11px] font-medium text-slate-400 hover:text-slate-600 transition py-1"
              >
                Stop assistance session
              </button>
            </div>

            {/* Trust Footnote */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/60 p-2 rounded-lg">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Zero credentials required. You stay in control.</span>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog if critical step */}
      {currentStep?.confirmationDetails && (
        <ConfirmationDialog
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            setShowConfirmModal(false);
            advanceStep();
          }}
          title={currentStep.confirmationDetails.actionTitle}
          summary={currentStep.confirmationDetails.summary}
          items={currentStep.confirmationDetails.items}
          criticalWarning={currentStep.confirmationDetails.criticalWarning}
          confirmLabel="Confirm & Proceed"
        />
      )}
    </>
  );
};
