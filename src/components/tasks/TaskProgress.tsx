import React from 'react';
import { Check, Clock, ShieldCheck } from 'lucide-react';
import { Task } from '../../types';

interface TaskProgressProps {
  task: Task;
  compact?: boolean;
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ task, compact = false }) => {
  if (compact) {
    const progressPercent = Math.round((task.currentStep / task.totalSteps) * 100);
    return (
      <div className="space-y-1.5 w-full">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
            Step {task.currentStep} of {task.totalSteps}
          </span>
          <span className="text-slate-400 font-mono text-[11px]">{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
            Current Task Progress
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-1">{task.title}</h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>Step {task.currentStep} / {task.totalSteps}</span>
        </div>
      </div>

      {/* Stepper list */}
      <div className="space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 before:z-0">
        {task.steps.map((step, idx) => {
          const isCompleted = step.status === 'completed';
          const isActive = step.status === 'active';
          const stepNumber = idx + 1;

          return (
            <div key={step.id} className="relative z-10 flex items-start gap-3.5 group">
              <div 
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all shrink-0 ${
                  isCompleted
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isActive
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 shadow-xs'
                    : 'bg-white border-2 border-slate-300 text-slate-400'
                }`}
              >
                {isCompleted ? <Check className="h-4 w-4 stroke-[3]" /> : stepNumber}
              </div>

              <div className="flex-1 pt-0.5">
                <p 
                  className={`text-xs font-semibold leading-snug ${
                    isActive
                      ? 'text-indigo-950 font-bold'
                      : isCompleted
                      ? 'text-slate-600 line-through decoration-slate-300'
                      : 'text-slate-400'
                  }`}
                >
                  {step.instruction}
                </p>

                {isActive && step.explanation && (
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed bg-indigo-50/50 p-2 rounded-lg border border-indigo-100/50">
                    {step.explanation}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
