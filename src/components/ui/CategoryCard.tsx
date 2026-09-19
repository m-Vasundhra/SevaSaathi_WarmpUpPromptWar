import React from 'react';
import { CategoryInfo } from '../../data/demoData';
import { CreditCard, ShoppingBag, Train, Landmark, Briefcase, GraduationCap, ArrowUpRight } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
  onSelectExample?: (example: string) => void;
}

const ICONS_MAP: Record<string, React.FC<{ className?: string }>> = {
  CreditCard,
  ShoppingBag,
  Train,
  Landmark,
  Briefcase,
  GraduationCap
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelectExample }) => {
  const Icon = ICONS_MAP[category.icon] || CreditCard;

  return (
    <div className={`flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${category.borderColor}`}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.badgeBg} border`}>
            <Icon className={`h-5 w-5 ${category.color}`} />
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {category.examples.length} Tasks
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1">{category.name}</h3>
        <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{category.tagline}</p>

        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Examples</p>
          <ul className="space-y-1">
            {category.examples.map((example, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onSelectExample?.(example)}
                  className="w-full text-left text-xs font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 px-2 py-1.5 rounded-lg transition flex items-center justify-between group"
                >
                  <span className="truncate">{example}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-500 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
