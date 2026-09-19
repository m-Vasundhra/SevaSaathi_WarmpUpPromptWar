import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Task, TaskStep, AppSettings, SimulatedSiteId, PageContext } from '../types';
import { INITIAL_TASKS } from '../data/demoData';
import { assistantEngine } from '../services/assistantEngine';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string) => void;
  currentSiteId: SimulatedSiteId;
  setCurrentSiteId: (siteId: SimulatedSiteId) => void;
  activeTask: Task | null;
  setActiveTask: (task: Task | null) => void;
  highlightedElementId: string | null;
  setHighlightedElementId: (id: string | null) => void;
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  taskHistory: Task[];
  startTask: (goal: string, siteId?: SimulatedSiteId) => Promise<void>;
  advanceStep: (stepId?: string) => void;
  completeTask: () => void;
  cancelActiveTask: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  speakText: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  triggerCelebration: () => void;
  currentSimulatedPageState: string;
  setSimulatedPageState: (stateId: string) => void;
}

const DEFAULT_SETTINGS: AppSettings = {
  guidanceMode: 'guide',
  confirmBeforeActions: true,
  voiceAssistance: false,
  showFloatingHelper: true,
  screenUnderstanding: true,
  activityHistory: true,
  dataRetention: '30days',
  largerText: false,
  highContrast: false,
  reducedMotion: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation state (simulated SPA router matching the requested paths)
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [currentSiteId, setCurrentSiteId] = useState<SimulatedSiteId>('electricity');
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [highlightedElementId, setHighlightedElementId] = useState<string | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(true);
  const [taskHistory, setTaskHistory] = useState<Task[]>(INITIAL_TASKS);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [currentSimulatedPageState, setSimulatedPageState] = useState<string>('initial');

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('ai_helper_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply accessibility settings to document body
  useEffect(() => {
    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (settings.largerText) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }

    if (settings.reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }

    try {
      localStorage.setItem('ai_helper_settings', JSON.stringify(settings));
    } catch {
      // Ignore storage error
    }
  }, [settings]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((route: string) => {
    if (window.location.pathname !== route) {
      window.history.pushState({}, '', route);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    addToast('Preferences updated', 'success');
  }, [addToast]);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const triggerCelebration = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore in environments where canvas is restricted
    }
  }, []);

  // Start a new guided task
  const startTask = useCallback(async (goal: string, targetSiteId?: SimulatedSiteId) => {
    const site = targetSiteId || (
      goal.toLowerCase().includes('bank') ? 'bank' :
      goal.toLowerCase().includes('train') ? 'railway' :
      goal.toLowerCase().includes('return') || goal.toLowerCase().includes('order') ? 'ecommerce' :
      goal.toLowerCase().includes('cert') || goal.toLowerCase().includes('gov') ? 'government' : 'electricity'
    );

    setCurrentSiteId(site);
    setSimulatedPageState('initial');

    const fakePageContext: PageContext = {
      url: site === 'electricity' ? 'https://powergrid.service/portal/billing' :
           site === 'bank' ? 'https://apexbank.com/dashboard' :
           site === 'railway' ? 'https://railway.express/booking' :
           site === 'ecommerce' ? 'https://swiftcart.shop/orders' : 'https://govportal.citizen/services',
      title: site === 'electricity' ? 'PowerGrid Consumer Portal' :
             site === 'bank' ? 'Apex National Bank - Accounts' :
             site === 'railway' ? 'RailWay Express Booking' :
             site === 'ecommerce' ? 'SwiftCart Orders' : 'GovPortal Citizen Hub',
      siteName: site,
      category: 'utility',
      visibleText: goal,
      elements: [],
      pageStateId: 'initial'
    };

    const task = await assistantEngine.createPlan(goal, fakePageContext);
    setActiveTask(task);
    setIsAssistantOpen(true);

    if (task.steps.length > 0 && task.steps[0].target) {
      setHighlightedElementId(task.steps[0].target);
    }

    if (settings.voiceAssistance && task.steps[0]) {
      speakText(task.steps[0].instruction);
    }

    addToast(`AI Helper started: "${task.title}"`, 'info');
  }, [settings.voiceAssistance, speakText, addToast]);

  // Advance to next step in task
  const advanceStep = useCallback((stepId?: string) => {
    if (!activeTask) return;

    setActiveTask((prev) => {
      if (!prev) return null;

      const currentIdx = prev.currentStep - 1;
      const updatedSteps = prev.steps.map((s, idx) => {
        if (idx === currentIdx) {
          return { ...s, status: 'completed' as const };
        }
        if (idx === currentIdx + 1) {
          return { ...s, status: 'active' as const };
        }
        return s;
      });

      const nextStep = updatedSteps[currentIdx + 1];
      const isFinished = currentIdx + 1 >= updatedSteps.length;

      if (isFinished) {
        triggerCelebration();
        addToast('Task completed successfully! 🎉', 'success');
        const completedTask: Task = {
          ...prev,
          status: 'completed',
          currentStep: prev.totalSteps,
          steps: updatedSteps,
          completedAt: 'Just now',
          duration: '1m 20s',
          auditTrail: [
            ...prev.auditTrail,
            {
              id: `audit-${Date.now()}`,
              timestamp: 'Just now',
              description: 'Task successfully completed and verified',
              type: 'completed'
            }
          ]
        };

        // Add to history
        setTaskHistory((h) => [completedTask, ...h]);
        setHighlightedElementId(null);
        return completedTask;
      }

      if (nextStep && nextStep.target) {
        setHighlightedElementId(nextStep.target);
      } else {
        setHighlightedElementId(null);
      }

      if (settings.voiceAssistance && nextStep) {
        speakText(nextStep.instruction);
      }

      return {
        ...prev,
        currentStep: prev.currentStep + 1,
        steps: updatedSteps,
        auditTrail: [
          ...prev.auditTrail,
          {
            id: `audit-${Date.now()}`,
            timestamp: 'Just now',
            description: `Completed step ${prev.currentStep}: ${prev.steps[currentIdx]?.instruction}`,
            type: 'action'
          }
        ]
      };
    });
  }, [activeTask, settings.voiceAssistance, speakText, triggerCelebration, addToast]);

  const completeTask = useCallback(() => {
    if (!activeTask) return;
    triggerCelebration();
    addToast('Task marked as complete!', 'success');
    const completed: Task = {
      ...activeTask,
      status: 'completed',
      currentStep: activeTask.totalSteps,
      steps: activeTask.steps.map((s) => ({ ...s, status: 'completed' as const })),
      completedAt: 'Just now',
      duration: '1m 15s'
    };
    setTaskHistory((h) => [completed, ...h]);
    setActiveTask(completed);
    setHighlightedElementId(null);
  }, [activeTask, triggerCelebration, addToast]);

  const cancelActiveTask = useCallback(() => {
    if (!activeTask) return;
    const cancelled: Task = {
      ...activeTask,
      status: 'cancelled',
      auditTrail: [
        ...activeTask.auditTrail,
        {
          id: `audit-${Date.now()}`,
          timestamp: 'Just now',
          description: 'Task session ended by user',
          type: 'action'
        }
      ]
    };
    setTaskHistory((h) => [cancelled, ...h]);
    setActiveTask(null);
    setHighlightedElementId(null);
    stopSpeaking();
    addToast('Assistance session stopped', 'info');
  }, [activeTask, stopSpeaking, addToast]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        currentSiteId,
        setCurrentSiteId,
        activeTask,
        setActiveTask,
        highlightedElementId,
        setHighlightedElementId,
        isAssistantOpen,
        setIsAssistantOpen,
        settings,
        updateSettings,
        taskHistory,
        startTask,
        advanceStep,
        completeTask,
        cancelActiveTask,
        toasts,
        addToast,
        removeToast,
        speakText,
        isSpeaking,
        stopSpeaking,
        triggerCelebration,
        currentSimulatedPageState,
        setSimulatedPageState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
