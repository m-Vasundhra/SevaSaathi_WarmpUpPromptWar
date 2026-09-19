import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Home, 
  Compass, 
  History, 
  Settings, 
  HelpCircle, 
  PlayCircle,
  Shield,
  Volume2,
  VolumeX,
  ExternalLink
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentRoute, navigateTo, activeTask, settings, updateSettings } = useApp();

  const navItems = [
    { label: 'Home', path: '/app', icon: Home, badge: undefined },
    { 
      label: 'Assistant', 
      path: '/app/assistant', 
      icon: Compass, 
      badge: activeTask && activeTask.status === 'in_progress' ? 'Active' : undefined 
    },
    { label: 'Task History', path: '/app/tasks', icon: History, badge: undefined },
    { label: 'Interactive Demo', path: '/demo', icon: PlayCircle, badge: 'Live' },
    { label: 'Help & Safety', path: '/help', icon: HelpCircle, badge: undefined },
    { label: 'Settings', path: '/app/settings', icon: Settings, badge: undefined },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0">
      {/* Brand header */}
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-sm shadow-indigo-100 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base text-slate-900 tracking-tight">SevaSaathi</span>
              <p className="text-[11px] text-slate-500 font-medium">Browser Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.path || (item.path === '/app' && currentRoute === '/app');
            
            return (
              <button
                key={item.path}
                onClick={() => navigateTo(item.path)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    item.badge === 'Active'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse'
                      : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Task Card mini if in progress */}
        {activeTask && activeTask.status === 'in_progress' && (
          <div className="mx-3 my-2 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100/80">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 mb-1">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-ping"></span>
                Active Guidance
              </span>
              <span>Step {activeTask.currentStep}/{activeTask.totalSteps}</span>
            </div>
            <p className="text-xs text-slate-700 truncate font-medium">{activeTask.title}</p>
            <button
              onClick={() => navigateTo('/app/assistant')}
              className="mt-2.5 w-full text-xs bg-white text-indigo-600 hover:bg-indigo-50 border border-indigo-200 py-1.5 rounded-lg font-semibold transition"
            >
              Resume Workspace
            </button>
          </div>
        )}
      </div>

      {/* Footer controls & user card */}
      <div className="p-3 border-t border-slate-100 space-y-3">
        {/* Quick Voice Assistance toggle */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-medium">
            {settings.voiceAssistance ? (
              <Volume2 className="h-4 w-4 text-indigo-600" />
            ) : (
              <VolumeX className="h-4 w-4 text-slate-400" />
            )}
            <span>Voice guidance</span>
          </div>
          <button
            onClick={() => updateSettings({ voiceAssistance: !settings.voiceAssistance })}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition ${
              settings.voiceAssistance
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
          >
            {settings.voiceAssistance ? 'ON' : 'OFF'}
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
              VS
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-900">Personal Account</p>
              <p className="text-[10px] text-slate-500">Guide Mode Active</p>
            </div>
          </div>
          <span title="Zero-credential security active" className="text-emerald-600">
            <Shield className="h-4 w-4" />
          </span>
        </div>
      </div>
    </aside>
  );
};
