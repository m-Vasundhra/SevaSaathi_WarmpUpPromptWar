import { PageContext, PageUnderstanding, Task, TaskStep, AuditEvent } from '../types';

export interface AssistantEngine {
  understandPage(page: PageContext): Promise<PageUnderstanding>;
  createPlan(goal: string, page: PageContext): Promise<Task>;
  getNextStep(task: Task, page: PageContext): Promise<TaskStep | null>;
  verifyStep(step: TaskStep, page: PageContext): Promise<boolean>;
}

export class MockAssistantEngine implements AssistantEngine {
  async understandPage(page: PageContext): Promise<PageUnderstanding> {
    // Artificial slight realistic delay to feel responsive yet thoughtful
    await new Promise((resolve) => setTimeout(resolve, 250));

    if (page.siteName.toLowerCase().includes('electricity') || page.url.includes('powergrid')) {
      return {
        summary: 'Electricity consumer portal showing outstanding billing info (₹2,450 due).',
        detectedIntent: 'Pay pending utility bill',
        keyEntities: {
          'Consumer No.': '123456789',
          'Amount Due': '₹2,450',
          'Due Date': 'Oct 05, 2026',
          'Provider': 'PowerGrid Energy Services'
        },
        recommendedNextAction: 'Click "Pay Bill" to proceed to the secure payment breakdown.',
        targetElementId: 'btn-pay-bill',
        isSensitiveForm: false,
        containsSecretFields: false
      };
    }

    if (page.siteName.toLowerCase().includes('bank') || page.url.includes('apexbank')) {
      return {
        summary: 'Online banking overview for Savings Account (*4092) with balance of ₹84,520.',
        detectedIntent: 'Download bank statement or review transactions',
        keyEntities: {
          'Account': 'Savings Account (*4092)',
          'Available Balance': '₹84,520.00',
          'Recent Activity': '3 transactions this month'
        },
        recommendedNextAction: 'Click "Statements" tab to view and download monthly PDF reports.',
        targetElementId: 'tab-statements',
        isSensitiveForm: false,
        containsSecretFields: false
      };
    }

    if (page.siteName.toLowerCase().includes('rail') || page.url.includes('railway')) {
      return {
        summary: 'Train booking search portal with departure and destination inputs.',
        detectedIntent: 'Book train journey from New Delhi to Mumbai',
        keyEntities: {
          'Origin': 'New Delhi (NDLS)',
          'Destination': 'Mumbai Central (MMCT)',
          'Class': 'AC 2 Tier (2A)'
        },
        recommendedNextAction: 'Click "Find Trains" to view available departures.',
        targetElementId: 'btn-search-trains',
        isSensitiveForm: false,
        containsSecretFields: false
      };
    }

    if (page.siteName.toLowerCase().includes('cart') || page.url.includes('swiftcart')) {
      return {
        summary: 'Order history list showing delivered items eligible for return/replacement.',
        detectedIntent: 'Return item from recent purchase #SC-8921',
        keyEntities: {
          'Order ID': '#SC-8921',
          'Item': 'Studio Pro Noise-Cancelling Headphones',
          'Eligible Until': 'Oct 12, 2026'
        },
        recommendedNextAction: 'Click "Return or Replace Item" next to Order #SC-8921.',
        targetElementId: 'btn-return-sc8921',
        isSensitiveForm: false,
        containsSecretFields: false
      };
    }

    if (page.siteName.toLowerCase().includes('gov') || page.url.includes('govportal')) {
      return {
        summary: 'Citizen digital services directory with official certificates & permits.',
        detectedIntent: 'Download Birth or Residence Certificate',
        keyEntities: {
          'Department': 'Ministry of Citizen Affairs',
          'Service': 'Digital Certificate Retrieval'
        },
        recommendedNextAction: 'Click "Download Birth / Residence Certificate".',
        targetElementId: 'btn-gov-cert',
        isSensitiveForm: false,
        containsSecretFields: false
      };
    }

    return {
      summary: `Currently viewing ${page.title}. Looking for relevant actions.`,
      keyEntities: {},
      recommendedNextAction: 'Click any highlighted option to proceed.',
      isSensitiveForm: false,
      containsSecretFields: false
    };
  }

  async createPlan(goal: string, page: PageContext): Promise<Task> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const normalizedGoal = goal.toLowerCase();
    const now = new Date().toISOString();

    if (normalizedGoal.includes('electricity') || normalizedGoal.includes('bill') || page.siteName.includes('PowerGrid')) {
      const steps: TaskStep[] = [
        {
          id: 'elec-step-1',
          instruction: 'Click "Pay Bill" to open your payment breakdown.',
          explanation: 'I verified your account number (123456789) and current unpaid invoice of ₹2,450.',
          target: 'btn-pay-bill',
          targetLabel: 'Pay Bill (₹2,450)',
          status: 'active'
        },
        {
          id: 'elec-step-2',
          instruction: 'Select your preferred payment method (UPI or Debit Card).',
          explanation: 'Choose how you want to pay. We will review the final amount before anything is charged.',
          target: 'opt-pay-upi',
          targetLabel: 'UPI / QR Code',
          status: 'pending'
        },
        {
          id: 'elec-step-3',
          instruction: 'Confirm and authorize payment of ₹2,450.',
          explanation: 'Review the details in the confirmation dialog. AI Helper ensures you stay in full control before any funds move.',
          target: 'btn-confirm-payment',
          targetLabel: 'Confirm & Pay ₹2,450',
          status: 'pending',
          requiresConfirmation: true,
          confirmationDetails: {
            actionTitle: 'Authorize Utility Bill Payment',
            summary: 'You are about to authorize payment for PowerGrid Energy Services.',
            items: [
              'Consumer No: 123456789',
              'Billing Cycle: September 2026',
              'Total Charge: ₹2,450.00',
              'Payment Mode: Instant UPI'
            ],
            criticalWarning: 'Never share your UPI PIN or banking passwords with anyone.'
          }
        },
        {
          id: 'elec-step-4',
          instruction: 'Download your official receipt for your records.',
          explanation: 'Your transaction was successful. Save your digital acknowledgment.',
          target: 'btn-download-receipt',
          targetLabel: 'Download Receipt (PDF)',
          status: 'pending'
        }
      ];

      return {
        id: `task-${Date.now()}`,
        title: 'Pay electricity bill',
        goal: goal || 'Pay my electricity bill',
        category: 'money',
        siteId: 'electricity',
        status: 'in_progress',
        currentStep: 1,
        totalSteps: 4,
        steps,
        startedAt: now,
        auditTrail: [
          {
            id: `audit-${Date.now()}-1`,
            timestamp: 'Just now',
            description: 'Opened PowerGrid Energy Portal',
            type: 'navigation'
          },
          {
            id: `audit-${Date.now()}-2`,
            timestamp: 'Just now',
            description: 'Identified outstanding bill: ₹2,450 due',
            type: 'explanation'
          }
        ]
      };
    }

    if (normalizedGoal.includes('bank') || normalizedGoal.includes('statement') || page.siteName.includes('Bank')) {
      const steps: TaskStep[] = [
        {
          id: 'bank-step-1',
          instruction: 'Click "Statements" in the navigation menu.',
          explanation: 'This will take you to your monthly financial records without digging through settings.',
          target: 'tab-statements',
          targetLabel: 'Statements',
          status: 'active'
        },
        {
          id: 'bank-step-2',
          instruction: 'Select "Last 3 Months" statement duration.',
          explanation: 'Choose the date range for the transactions you wish to download.',
          target: 'btn-period-3m',
          targetLabel: 'Last 3 Months',
          status: 'pending'
        },
        {
          id: 'bank-step-3',
          instruction: 'Click "Download PDF Statement".',
          explanation: 'Your bank will securely generate an encrypted PDF statement for your device.',
          target: 'btn-download-statement',
          targetLabel: 'Download PDF Statement',
          status: 'pending'
        }
      ];

      return {
        id: `task-${Date.now()}`,
        title: 'Download bank statement',
        goal: goal || 'Download my bank statement',
        category: 'money',
        siteId: 'bank',
        status: 'in_progress',
        currentStep: 1,
        totalSteps: 3,
        steps,
        startedAt: now,
        auditTrail: [
          {
            id: `audit-${Date.now()}-1`,
            timestamp: 'Just now',
            description: 'Opened Apex National Bank Portal',
            type: 'navigation'
          },
          {
            id: `audit-${Date.now()}-2`,
            timestamp: 'Just now',
            description: 'Located Savings Account (*4092) and navigation bar',
            type: 'explanation'
          }
        ]
      };
    }

    if (normalizedGoal.includes('train') || normalizedGoal.includes('ticket') || page.siteName.includes('RailWay')) {
      const steps: TaskStep[] = [
        {
          id: 'train-step-1',
          instruction: 'Click "Find Trains" to view available routes from New Delhi to Mumbai.',
          explanation: 'I verified your travel route and date for next Friday.',
          target: 'btn-search-trains',
          targetLabel: 'Find Trains',
          status: 'active'
        },
        {
          id: 'train-step-2',
          instruction: 'Select Rajdhani Superfast (12952) AC 2-Tier berth.',
          explanation: 'This train has 18 confirmed seats available with complimentary meals.',
          target: 'btn-select-train-12952',
          targetLabel: 'Book 2A — ₹2,840',
          status: 'pending'
        },
        {
          id: 'train-step-3',
          instruction: 'Confirm passenger details and reserve seat.',
          explanation: 'Double check passenger name and berth preference before locking the booking.',
          target: 'btn-confirm-train-booking',
          targetLabel: 'Confirm Reservation',
          status: 'pending',
          requiresConfirmation: true,
          confirmationDetails: {
            actionTitle: 'Confirm Train Reservation',
            summary: 'You are reserving a confirmed train seat.',
            items: [
              'Train: 12952 Rajdhani Superfast',
              'Route: New Delhi (NDLS) → Mumbai (MMCT)',
              'Passenger: Primary Traveler (Age 32)',
              'Berth: Lower Berth (2A)'
            ]
          }
        }
      ];

      return {
        id: `task-${Date.now()}`,
        title: 'Book train ticket',
        goal: goal || 'Help me book a train ticket',
        category: 'travel',
        siteId: 'railway',
        status: 'in_progress',
        currentStep: 1,
        totalSteps: 3,
        steps,
        startedAt: now,
        auditTrail: [
          {
            id: `audit-${Date.now()}-1`,
            timestamp: 'Just now',
            description: 'Opened RailWay Express Booking Portal',
            type: 'navigation'
          }
        ]
      };
    }

    if (normalizedGoal.includes('return') || normalizedGoal.includes('order') || page.siteName.includes('SwiftCart')) {
      const steps: TaskStep[] = [
        {
          id: 'cart-step-1',
          instruction: 'Click "Return or Replace" next to the Headphones order.',
          explanation: 'Order #SC-8921 is within its 14-day replacement window.',
          target: 'btn-return-sc8921',
          targetLabel: 'Return or Replace Item',
          status: 'active'
        },
        {
          id: 'cart-step-2',
          instruction: 'Select "Defective / Sound Glitch" as the return reason.',
          explanation: 'Providing a reason enables pre-paid doorstep courier pickup.',
          target: 'opt-reason-defective',
          targetLabel: 'Item defective or sound glitch',
          status: 'pending'
        },
        {
          id: 'cart-step-3',
          instruction: 'Confirm pickup address and submit return request.',
          explanation: 'A delivery executive will arrive tomorrow between 10 AM – 2 PM.',
          target: 'btn-submit-return',
          targetLabel: 'Submit Return Request',
          status: 'pending',
          requiresConfirmation: true,
          confirmationDetails: {
            actionTitle: 'Authorize Product Return',
            summary: 'Courier will inspect and collect the item.',
            items: [
              'Item: Studio Pro Headphones (#SC-8921)',
              'Refund Amount: ₹4,999.00',
              'Pickup Date: Tomorrow, 10 AM – 2 PM'
            ]
          }
        }
      ];

      return {
        id: `task-${Date.now()}`,
        title: 'Return online order',
        goal: goal || 'Help me return this product',
        category: 'shopping',
        siteId: 'ecommerce',
        status: 'in_progress',
        currentStep: 1,
        totalSteps: 3,
        steps,
        startedAt: now,
        auditTrail: [
          {
            id: `audit-${Date.now()}-1`,
            timestamp: 'Just now',
            description: 'Opened SwiftCart Order History',
            type: 'navigation'
          }
        ]
      };
    }

    // Default fallback task
    const defaultSteps: TaskStep[] = [
      {
        id: 'gen-step-1',
        instruction: 'Review the current page items highlighted by AI Helper.',
        explanation: 'I have analyzed the page structure to find the most direct path to your goal.',
        target: 'main-action',
        targetLabel: 'Primary Action',
        status: 'active'
      },
      {
        id: 'gen-step-2',
        instruction: 'Complete the highlighted form step.',
        explanation: 'Follow the glowing prompt to progress.',
        status: 'pending'
      }
    ];

    return {
      id: `task-${Date.now()}`,
      title: goal || 'Online assistance',
      goal: goal || 'Assist with webpage',
      category: 'general',
      siteId: 'electricity',
      status: 'in_progress',
      currentStep: 1,
      totalSteps: 2,
      steps: defaultSteps,
      startedAt: now,
      auditTrail: [
        {
          id: `audit-${Date.now()}-1`,
          timestamp: 'Just now',
          description: 'Started online assistance session',
          type: 'action'
        }
      ]
    };
  }

  async getNextStep(task: Task, page: PageContext): Promise<TaskStep | null> {
    const nextStepIndex = task.steps.findIndex((s) => s.status === 'pending');
    if (nextStepIndex === -1) {
      return null;
    }
    return task.steps[nextStepIndex];
  }

  async verifyStep(step: TaskStep, page: PageContext): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return true;
  }
}

export const assistantEngine = new MockAssistantEngine();
