export type AssistantMode = 'guide' | 'explain' | 'act';

export type TaskStatus = 'idle' | 'in_progress' | 'waiting_for_user' | 'completed' | 'cancelled';

export type StepStatus = 'pending' | 'active' | 'completed';

export interface TaskStep {
  id: string;
  instruction: string;
  explanation?: string;
  target?: string; // element ID or selector
  targetLabel?: string;
  status: StepStatus;
  requiresConfirmation?: boolean;
  confirmationDetails?: {
    actionTitle: string;
    summary: string;
    items: string[];
    criticalWarning?: string;
  };
}

export interface Task {
  id: string;
  title: string;
  goal: string;
  category: 'money' | 'shopping' | 'travel' | 'government' | 'work' | 'education' | 'general';
  siteId: string;
  status: TaskStatus;
  currentStep: number;
  totalSteps: number;
  steps: TaskStep[];
  startedAt: string;
  completedAt?: string;
  duration?: string;
  auditTrail: AuditEvent[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  description: string;
  type: 'action' | 'navigation' | 'explanation' | 'confirmation' | 'completed';
}

export interface PageElement {
  id: string;
  type: 'button' | 'link' | 'input' | 'select' | 'text' | 'card' | 'tab';
  label: string;
  description?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  interactive: boolean;
}

export interface PageContext {
  url: string;
  title: string;
  siteName: string;
  category: string;
  visibleText: string;
  elements: PageElement[];
  pageStateId: string;
  screenshot?: string;
}

export interface PageUnderstanding {
  summary: string;
  detectedIntent?: string;
  keyEntities: Record<string, string>;
  recommendedNextAction: string;
  targetElementId?: string;
  isSensitiveForm: boolean;
  containsSecretFields: boolean;
}

export interface BrowserContext {
  url: string;
  title: string;
  visibleText: string;
  elements: PageElement[];
  screenshot?: string;
}

export type SimulatedSiteId = 'electricity' | 'bank' | 'railway' | 'ecommerce' | 'government';

export interface AppSettings {
  guidanceMode: AssistantMode;
  confirmBeforeActions: boolean;
  voiceAssistance: boolean;
  showFloatingHelper: boolean;
  screenUnderstanding: boolean;
  activityHistory: boolean;
  dataRetention: '7days' | '30days' | 'forever';
  largerText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
}

export interface HelpTopic {
  id: string;
  question: string;
  category: string;
  answer: string;
}
