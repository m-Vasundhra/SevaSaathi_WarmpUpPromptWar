import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, Mic, MicOff, Lightbulb } from 'lucide-react';
import { SimulatedSiteId } from '../../types';

interface AssistantInputProps {
  onStart?: (goal: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const AssistantInput: React.FC<AssistantInputProps> = ({
  onStart,
  placeholder = "Tell me what you're trying to do...",
  autoFocus = false
}) => {
  const { startTask, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const suggestions = [
    { label: 'Pay my electricity bill', icon: '💡', site: 'electricity' as SimulatedSiteId },
    { label: 'Download my bank statement', icon: '🏦', site: 'bank' as SimulatedSiteId },
    { label: 'Help me book a train', icon: '🚆', site: 'railway' as SimulatedSiteId },
    { label: 'Track or return my order', icon: '🛒', site: 'ecommerce' as SimulatedSiteId },
    { label: 'Download government certificate', icon: '🏛', site: 'government' as SimulatedSiteId },
    { label: 'Explain this webpage', icon: '🔍', site: 'electricity' as SimulatedSiteId },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    if (onStart) {
      onStart(query.trim());
    } else {
      await startTask(query.trim());
      navigateTo('/app/assistant');
    }
  };

  const handleSuggestionClick = async (suggestion: typeof suggestions[0]) => {
    setQuery(suggestion.label);
    if (onStart) {
      onStart(suggestion.label);
    } else {
      await startTask(suggestion.label, suggestion.site);
      navigateTo('/app/assistant');
    }
  };

  // Voice recognition simulation / Web Speech API
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Simulation for browsers without SpeechRecognition
      setIsListening(true);
      setTimeout(() => {
        setQuery('Pay my electricity bill');
        setIsListening(false);
      }, 1500);
      return;
    }

    try {
      // @ts-expect-error webkitSpeechRecognition fallback
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      // @ts-expect-error speech event
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);

      if (isListening) {
        recognition.stop();
        setIsListening(false);
      } else {
        recognition.start();
      }
    } catch {
      setIsListening(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative rounded-2xl border-2 border-indigo-200/80 bg-white p-2 sm:p-3 shadow-lg shadow-indigo-100/50 transition-all focus-within:border-indigo-600 focus-within:shadow-xl focus-within:shadow-indigo-100">
          <div className="flex items-start gap-3 px-2 pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4 animate-pulse" />
            </div>
            
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              rows={2}
              placeholder={isListening ? "Listening... Speak your goal" : placeholder}
              autoFocus={autoFocus}
              className="w-full resize-none bg-transparent text-sm sm:text-base text-slate-800 placeholder:text-slate-400 focus:outline-hidden font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-2 px-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 hidden sm:inline-block font-medium">
              Press Enter or click arrow to begin step-by-step guidance
            </span>
            
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={toggleVoiceInput}
                title={isListening ? "Stop listening" : "Speak your goal"}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isListening
                    ? 'bg-rose-100 text-rose-600 animate-pulse border border-rose-300'
                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>

              <button
                type="submit"
                disabled={!query.trim()}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition shadow-xs ${
                  query.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white cursor-pointer'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Quick Suggestions Chips */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 px-1">
          <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
          <span>Suggested Tasks</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(s)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-700 shadow-2xs transition-all active:scale-98"
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
