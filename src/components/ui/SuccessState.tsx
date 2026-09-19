import React from 'react';
import { CheckCircle2, Sparkles, ArrowRight, Download, RefreshCw, Check } from 'lucide-react';
import { Task } from '../../types';

interface SuccessStateProps {
  task: Task;
  onStartAnother: () => void;
  onViewHistory?: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({
  task,
  onStartAnother,
  onViewHistory
}) => {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 text-center shadow-xs">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-200 mb-4 animate-in zoom-in-75 duration-300">
        <Check className="h-8 w-8 stroke-[3]" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
        <Sparkles className="h-3.5 w-3.5" />
        Task Completed Successfully
      </span>

      <h3 className="text-xl font-bold text-slate-900 mb-1">{task.title}</h3>
      <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
        All {task.totalSteps} steps completed and verified. Safe and sound.
      </p>

      {/* Steps recap */}
      <div className="bg-white rounded-xl border border-emerald-100 p-4 max-w-md mx-auto mb-6 text-left space-y-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Completed Steps</p>
        <ul className="space-y-1.5">
          {task.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span className="font-medium">{step.instruction}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onViewHistory && (
          <button
            onClick={onViewHistory}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            View in Task History
          </button>
        )}
        <button
          onClick={onStartAnother}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <span>Help me with another task</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
