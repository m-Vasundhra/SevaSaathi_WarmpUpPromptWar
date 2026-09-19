import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, PlayCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('/')}
          className="flex cursor-pointer items-center gap-2.5 group"
          id="nav-brand-logo"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 font-sans">SevaSaathi</span>
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-1.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100">Guide</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Your guide to the internet</p>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => navigateTo('/')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${currentRoute === '/' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
          >
            Overview
          </button>
          <button
            onClick={() => navigateTo('/demo')}
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${currentRoute === '/demo' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
          >
            <PlayCircle className="h-4 w-4 text-indigo-500" />
            Interactive Demo
          </button>
          <button
            onClick={() => navigateTo('/app')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${currentRoute.startsWith('/app') ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
          >
            Assistant App
          </button>
          <button
            onClick={() => navigateTo('/help')}
            className={`px-3.5 py-2 rounded-lg transition-colors ${currentRoute === '/help' ? 'text-indigo-600 bg-indigo-50/70 font-semibold' : 'hover:text-slate-900 hover:bg-slate-100/60'}`}
          >
            Help & Safety
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigateTo('/demo')}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition shadow-xs"
            id="nav-see-how-it-works-btn"
          >
            <PlayCircle className="h-4 w-4 text-slate-500" />
            See how it works
          </button>
          
          <button
            onClick={() => navigateTo('/app')}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:bg-indigo-700 transition"
            id="nav-get-sevasaathi-btn"
          >
            <span>Get SevaSaathi</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
