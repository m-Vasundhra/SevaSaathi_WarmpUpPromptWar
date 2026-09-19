import React, { ReactNode } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Lock, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck,
  Globe,
  SlidersHorizontal
} from 'lucide-react';
import { SimulatedSiteId } from '../../types';

interface BrowserFrameProps {
  children: ReactNode;
  url?: string;
  title?: string;
  onSiteChange?: (siteId: SimulatedSiteId) => void;
  showSiteSelector?: boolean;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
  children,
  url,
  title,
  onSiteChange,
  showSiteSelector = true
}) => {
  const { currentSiteId, setCurrentSiteId, activeTask, isAssistantOpen, setIsAssistantOpen } = useApp();

  const sites = [
    { id: 'electricity' as SimulatedSiteId, name: '⚡ PowerGrid Energy', url: 'https://powergrid.service/billing' },
    { id: 'bank' as SimulatedSiteId, name: '🏦 Apex National Bank', url: 'https://apexbank.com/dashboard' },
    { id: 'railway' as SimulatedSiteId, name: '🚆 RailWay Express', url: 'https://railway.express/booking' },
    { id: 'ecommerce' as SimulatedSiteId, name: '🛒 SwiftCart Orders', url: 'https://swiftcart.shop/orders' },
    { id: 'government' as SimulatedSiteId, name: '🏛 GovPortal Services', url: 'https://govportal.citizen/services' },
  ];

  const currentSite = sites.find((s) => s.id === currentSiteId) || sites[0];
  const displayUrl = url || currentSite.url;
  const displayTitle = title || currentSite.name;

  const handleSelectSite = (siteId: SimulatedSiteId) => {
    setCurrentSiteId(siteId);
    onSiteChange?.(siteId);
  };

  return (
    <div className="rounded-2xl border border-slate-300/80 bg-slate-900 text-slate-100 shadow-2xl overflow-hidden flex flex-col w-full">
      {/* Top Browser Chrome Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between gap-3">
        {/* Window controls (mac style dots) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>

          {/* Nav arrows */}
          <div className="hidden sm:flex items-center gap-1 ml-3 text-slate-400">
            <button className="p-1 hover:text-white rounded-md transition" title="Back">
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 hover:text-white rounded-md transition" title="Forward">
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 hover:text-white rounded-md transition" title="Refresh">
              <RotateCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 border border-slate-700/80 rounded-xl text-xs text-slate-300 font-mono shadow-inner">
          <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
          <span className="truncate text-slate-200">{displayUrl}</span>
          <span className="ml-auto text-[10px] px-1.5 py-0.2 rounded-sm bg-slate-700 text-slate-300 shrink-0 font-sans hidden sm:inline-block">
            Simulated Webpage
          </span>
        </div>

        {/* Extension Badge & Site Quick Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAssistantOpen(!isAssistantOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              isAssistantOpen
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Toggle SevaSaathi overlay"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-200" />
            <span className="hidden md:inline">SevaSaathi</span>
          </button>
        </div>
      </div>

      {/* Optional Quick Site Switcher Tabs */}
      {showSiteSelector && (
        <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/70 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 hidden sm:inline">Simulated Site:</span>
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSelectSite(site.id)}
                className={`px-3 py-1 rounded-lg font-medium transition shrink-0 ${
                  currentSiteId === site.id
                    ? 'bg-slate-900 text-white shadow-xs font-bold border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {site.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Webpage Content Viewport */}
      <div className="relative bg-white text-slate-900 min-h-[500px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
