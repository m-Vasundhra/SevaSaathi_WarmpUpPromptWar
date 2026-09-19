import React from 'react';
import { Sparkles, ArrowDown, ArrowUp } from 'lucide-react';

interface ElementHighlightProps {
  label?: string;
  sublabel?: string;
  position?: 'top' | 'bottom';
  className?: string;
}

export const ElementHighlight: React.FC<ElementHighlightProps> = ({
  label = 'Click here next',
  sublabel,
  position = 'top',
  className = ''
}) => {
  return (
    <div className={`absolute z-30 pointer-events-none transition-all duration-300 ${className} ${
      position === 'top' ? '-top-12 left-1/2 -translate-x-1/2' : '-bottom-12 left-1/2 -translate-x-1/2'
    }`}>
      <div className="flex flex-col items-center">
        {position === 'bottom' && (
          <div className="flex items-center justify-center text-indigo-600 mb-0.5 animate-bounce">
            <ArrowUp className="h-4 w-4 stroke-[3]" />
          </div>
        )}

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-900 text-white rounded-xl shadow-lg shadow-indigo-500/30 text-xs font-bold whitespace-nowrap border border-indigo-400/40 animate-pulse">
          <Sparkles className="h-3.5 w-3.5 text-indigo-300 shrink-0" />
          <span>{label}</span>
          {sublabel && <span className="text-[10px] text-indigo-200 font-normal">({sublabel})</span>}
        </div>

        {position === 'top' && (
          <div className="flex items-center justify-center text-indigo-600 mt-0.5 animate-bounce">
            <ArrowDown className="h-4 w-4 stroke-[3]" />
          </div>
        )}
      </div>
    </div>
  );
};
