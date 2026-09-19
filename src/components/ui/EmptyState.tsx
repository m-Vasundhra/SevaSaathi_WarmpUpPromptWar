import React from 'react';
import { Sparkles, Compass, History, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-active-task' | 'no-history' | 'waiting-for-user' | 'error';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  title,
  description,
  actionLabel,
  onAction
}) => {
  let defaultIcon = Sparkles;
  let defaultTitle = 'Ready when you are.';
  let defaultDescription = "Tell me what you're trying to accomplish on this page.";

  if (type === 'no-history') {
    defaultIcon = History;
    defaultTitle = 'No tasks yet';
    defaultDescription = 'Your completed tasks, step summaries, and receipts will appear here.';
  } else if (type === 'waiting-for-user') {
    defaultIcon = Compass;
    defaultTitle = 'Waiting for your action';
    defaultDescription = "I'm waiting for you to complete or click the highlighted element on screen.";
  } else if (type === 'error') {
    defaultIcon = AlertCircle;
    defaultTitle = "I couldn't identify the next step.";
    defaultDescription = 'The page layout or state might have changed. Let me take another look.';
  }

  const Icon = defaultIcon;
  const finalTitle = title || defaultTitle;
  const finalDesc = description || defaultDescription;

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
      <div className="h-12 w-12 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-indigo-600 mb-3.5">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-1">{finalTitle}</h3>
      <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-4">{finalDesc}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
