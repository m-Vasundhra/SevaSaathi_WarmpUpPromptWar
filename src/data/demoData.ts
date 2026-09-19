import { Task, HelpTopic } from '../types';

export interface CategoryInfo {
  id: 'money' | 'shopping' | 'travel' | 'government' | 'work' | 'education';
  name: string;
  tagline: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  examples: string[];
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'money',
    name: 'Money & Utilities',
    tagline: 'Bills, statements, banking, and payment navigation',
    icon: 'CreditCard',
    color: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    borderColor: 'hover:border-emerald-300',
    examples: [
      'Pay electricity bill',
      'Download bank statement',
      'Understand transaction charge',
      'Check account balance',
      'Understand bank SMS'
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping & Orders',
    tagline: 'Tracking shipments, invoice downloads, and hassle-free returns',
    icon: 'ShoppingBag',
    color: 'text-indigo-700 dark:text-indigo-400',
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    borderColor: 'hover:border-indigo-300',
    examples: [
      'Track online delivery',
      'Return a defective product',
      'Download tax invoice',
      'Understand warranty terms'
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Commute',
    tagline: 'Booking tickets, checking PNR status, and journey planning',
    icon: 'Train',
    color: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    borderColor: 'hover:border-amber-300',
    examples: [
      'Book train ticket',
      'Check PNR confirmation',
      'Find flight options',
      'Cancel reservation'
    ]
  },
  {
    id: 'government',
    name: 'Government Services',
    tagline: 'Official portals, certificate downloads, and form assistance',
    icon: 'Landmark',
    color: 'text-blue-700 dark:text-blue-400',
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    borderColor: 'hover:border-blue-300',
    examples: [
      'Download birth certificate',
      'Find passport application',
      'Understand tax form',
      'Apply for citizen permit'
    ]
  },
  {
    id: 'work',
    name: 'Work & Software',
    tagline: 'Expense claims, reports, business portals, and document filing',
    icon: 'Briefcase',
    color: 'text-purple-700 dark:text-purple-400',
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    borderColor: 'hover:border-purple-300',
    examples: [
      'Submit expense receipt',
      'Generate monthly report',
      'Find shared team document',
      'Navigate HR portal'
    ]
  },
  {
    id: 'education',
    name: 'Education & Study',
    tagline: 'Course portals, assignments, applications, and grading records',
    icon: 'GraduationCap',
    color: 'text-rose-700 dark:text-rose-400',
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    borderColor: 'hover:border-rose-300',
    examples: [
      'Find course assignment',
      'Submit college application',
      'Check semester grades',
      'Register for exam'
    ]
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-hist-1',
    title: 'Electricity bill payment',
    goal: 'Pay September electricity invoice',
    category: 'money',
    siteId: 'electricity',
    status: 'completed',
    currentStep: 4,
    totalSteps: 4,
    startedAt: 'Today, 09:15 AM',
    completedAt: 'Today, 09:18 AM',
    duration: '2m 45s',
    steps: [
      {
        id: 's1',
        instruction: 'Opened PowerGrid Energy Portal and located Consumer #123456789',
        status: 'completed'
      },
      {
        id: 's2',
        instruction: 'Verified outstanding amount ₹2,450 due on Oct 05',
        status: 'completed'
      },
      {
        id: 's3',
        instruction: 'User confirmed ₹2,450 payment via Instant UPI',
        status: 'completed'
      },
      {
        id: 's4',
        instruction: 'Downloaded official payment receipt PDF',
        status: 'completed'
      }
    ],
    auditTrail: [
      {
        id: 'a1',
        timestamp: '09:15:10 AM',
        description: 'User initiated "Help me pay my electricity bill"',
        type: 'action'
      },
      {
        id: 'a2',
        timestamp: '09:15:32 AM',
        description: 'AI detected PowerGrid billing overview page',
        type: 'explanation'
      },
      {
        id: 'a3',
        timestamp: '09:16:15 AM',
        description: 'AI spotlighted "Pay Bill" button and explained charges',
        type: 'navigation'
      },
      {
        id: 'a4',
        timestamp: '09:17:40 AM',
        description: 'Safety confirmation modal approved by user',
        type: 'confirmation'
      },
      {
        id: 'a5',
        timestamp: '09:18:00 AM',
        description: 'Payment verified successfully; invoice archived',
        type: 'completed'
      }
    ]
  },
  {
    id: 'task-hist-2',
    title: 'Download bank statement',
    goal: 'Retrieve Q3 PDF bank statements for Apex Savings Account',
    category: 'money',
    siteId: 'bank',
    status: 'completed',
    currentStep: 3,
    totalSteps: 3,
    startedAt: 'Yesterday, 04:30 PM',
    completedAt: 'Yesterday, 04:32 PM',
    duration: '1m 50s',
    steps: [
      {
        id: 's1',
        instruction: 'Navigated to Statements tab on Apex Banking Portal',
        status: 'completed'
      },
      {
        id: 's2',
        instruction: 'Selected "Last 3 Months" statement duration',
        status: 'completed'
      },
      {
        id: 's3',
        instruction: 'Downloaded statement PDF to local downloads folder',
        status: 'completed'
      }
    ],
    auditTrail: [
      {
        id: 'a1',
        timestamp: '04:30:12 PM',
        description: 'Goal: "Where do I download my bank statement?"',
        type: 'action'
      },
      {
        id: 'a2',
        timestamp: '04:31:05 PM',
        description: 'Highlighted "Statements" menu tab in top navigation',
        type: 'navigation'
      },
      {
        id: 'a3',
        timestamp: '04:32:02 PM',
        description: 'PDF generated and downloaded successfully',
        type: 'completed'
      }
    ]
  },
  {
    id: 'task-hist-3',
    title: 'Train ticket reservation',
    goal: 'Book New Delhi to Mumbai AC 2-Tier Rajdhani express',
    category: 'travel',
    siteId: 'railway',
    status: 'in_progress',
    currentStep: 2,
    totalSteps: 3,
    startedAt: 'Monday, 11:20 AM',
    steps: [
      {
        id: 's1',
        instruction: 'Searched NDLS → MMCT route for Friday departure',
        status: 'completed'
      },
      {
        id: 's2',
        instruction: 'Selected 12952 Rajdhani Superfast AC 2A Berth',
        status: 'active'
      },
      {
        id: 's3',
        instruction: 'Confirm passenger details and reserve berth',
        status: 'pending'
      }
    ],
    auditTrail: [
      {
        id: 'a1',
        timestamp: '11:20:00 AM',
        description: 'Started train search on RailWay portal',
        type: 'action'
      },
      {
        id: 'a2',
        timestamp: '11:21:15 AM',
        description: 'Found 18 confirmed berths available on Train 12952',
        type: 'explanation'
      }
    ]
  },
  {
    id: 'task-hist-4',
    title: 'Defective product return',
    goal: 'Initiate return for SwiftCart order #SC-8921 (Headphones)',
    category: 'shopping',
    siteId: 'ecommerce',
    status: 'completed',
    currentStep: 3,
    totalSteps: 3,
    startedAt: 'Monday, 02:10 PM',
    completedAt: 'Monday, 02:14 PM',
    duration: '3m 20s',
    steps: [
      {
        id: 's1',
        instruction: 'Located Order #SC-8921 in purchase history',
        status: 'completed'
      },
      {
        id: 's2',
        instruction: 'Selected return reason "Defective audio / crackling sound"',
        status: 'completed'
      },
      {
        id: 's3',
        instruction: 'Scheduled free home pickup and received return QR code',
        status: 'completed'
      }
    ],
    auditTrail: [
      {
        id: 'a1',
        timestamp: '02:10:05 PM',
        description: 'Initiated return assistance',
        type: 'action'
      },
      {
        id: 'a2',
        timestamp: '02:13:55 PM',
        description: 'Pickup scheduled with courier for tomorrow morning',
        type: 'completed'
      }
    ]
  }
];

export const QUICK_EXAMPLES = [
  { text: 'Pay my electricity bill', icon: '⚡', siteId: 'electricity' as const },
  { text: 'Download bank statement', icon: '🏦', siteId: 'bank' as const },
  { text: 'Book a train ticket', icon: '🚆', siteId: 'railway' as const },
  { text: 'Return a defective item', icon: '🛒', siteId: 'ecommerce' as const },
  { text: 'Download citizen certificate', icon: '🏛', siteId: 'government' as const }
];

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: 'h1',
    category: 'Getting Started',
    question: 'How does SevaSaathi work?',
    answer: 'SevaSaathi acts like a smart, friendly guide sitting beside you. When you visit a website and tell SevaSaathi what you want to do (like "Pay this bill" or "Download my statement"), it scans the page visually, understands what is on the screen, and puts a glowing spotlight on the exact button or field you need to click next.'
  },
  {
    id: 'h2',
    category: 'Privacy & Trust',
    question: 'Does SevaSaathi ever ask for my password, OTP, or PIN?',
    answer: 'NEVER. SevaSaathi is designed with a strict zero-credential principle. We will NEVER ask you to enter passwords, banking PINs, OTP codes, or credit card CVVs. You always type sensitive information yourself directly into your bank or official portal.'
  },
  {
    id: 'h3',
    category: 'Safety & Control',
    question: 'Can SevaSaathi make purchases or payments without my permission?',
    answer: 'No. SevaSaathi operates primarily in "Guide" mode. It shows you what to click, explains what each step means, and requires your explicit authorization through a clear confirmation dialog before any consequential action (such as submitting a payment or finalizing a ticket).'
  },
  {
    id: 'h4',
    category: 'Future Browser Extension',
    question: 'How will I use SevaSaathi on any website?',
    answer: 'Soon, you will be able to install the lightweight SevaSaathi browser extension for Chrome, Edge, Safari, and Firefox. When you visit any website, a subtle floating spark icon appears at the bottom corner. Click it anytime you need guidance!'
  },
  {
    id: 'h5',
    category: 'Accessibility',
    question: 'What accessibility features are available?',
    answer: 'SevaSaathi includes spoken voice guidance, high contrast mode, enlarged typography, reduced motion options, and full keyboard navigation. You can toggle these anytime in the Settings menu.'
  }
];
