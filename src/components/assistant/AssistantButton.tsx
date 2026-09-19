import React from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AssistantButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const AssistantButton: React.FC<AssistantButtonProps> = ({ onClick, isOpen }) => {
  const { activeTask } = useApp();
  const hasActiveTask = activeTask && activeTask.status === 'in_progress';

  return (
    <button
      onClick={onClick}
      id="floating-assistant-trigger"
      aria-label="Toggle SevaSaathi Assistant"
      className={`group relative flex items-center gap-2 rounded-full px-4 py-2.5 font-bold shadow-xl transition-all duration-300 active:scale-95 ${
        isOpen
          ? 'bg-slate-900 text-white hover:bg-slate-800'
          : 'bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white hover:shadow-indigo-500/25 hover:shadow-2xl'
      }`}
    >
      {/* Animated ping ring */}
      {hasActiveTask && !isOpen && (
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500 border-2 border-white"></span>
        </span>
      )}

      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white">
        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
      </div>

      <span className="text-xs tracking-wide">SevaSaathi</span>

      {hasActiveTask && (
        <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px] font-semibold text-white">
          Step {activeTask.currentStep}/{activeTask.totalSteps}
        </span>
      )}
    </button>
  );
};
