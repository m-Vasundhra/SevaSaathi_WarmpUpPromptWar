import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/navigation/Navbar';
import { 
  ShieldCheck, 
  Lock, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  MessageSquare,
  FileText,
  KeyRound,
  EyeOff
} from 'lucide-react';
import { SafetyNotice } from '../components/ui/SafetyNotice';

export const HelpPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does SevaSaathi work on my browser?',
      a: 'SevaSaathi scans the active webpage visual elements, identifies navigation menus, form inputs, and buttons relevant to your goal, and displays a non-intrusive glowing spotlight over the specific button you should click next, along with a plain-language explanation.'
    },
    {
      q: 'Will SevaSaathi ever ask for my password or bank PIN?',
      a: 'NEVER. SevaSaathi is built on the strict Zero-Credential Principle. The AI will never ask for, inspect, or store passwords, one-time SMS passwords (OTPs), ATM PINs, or card CVVs. You enter sensitive authentication credentials directly on the original bank or service provider website.'
    },
    {
      q: 'Does SevaSaathi make payments automatically without my permission?',
      a: 'No. SevaSaathi is strictly an assistant and guide, not an automated bot. For critical transactions like payments or form submissions, the application presents a confirmation summary for you to explicitly review and authorize.'
    },
    {
      q: 'Can I stop or pause guidance at any time?',
      a: 'Yes. You can cancel or pause any ongoing task by clicking the close (X) or "Stop Guidance" button in the SevaSaathi panel, or by pressing the Escape key.'
    },
    {
      q: 'Is my personal browsing activity tracked or sold?',
      a: 'No. SevaSaathi operates in a sandboxed assist-layer. Webpage text is processed strictly to identify element selectors relevant to your explicit task and is not saved or monetized.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Trust & Security Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Safety, Privacy & Help Center
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Everything you need to know about how SevaSaathi keeps you safe and in control on the web.
          </p>
        </div>

        {/* The Zero-Credential Standard Card */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="h-10 w-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">The Zero-Credential Principle</h2>
              <p className="text-xs text-slate-500">Our foundational security architecture</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 font-bold">
                <EyeOff className="h-4 w-4" />
                <span>What SevaSaathi NEVER does:</span>
              </div>
              <ul className="space-y-1.5 text-slate-600">
                <li>• Never asks for your passwords or master keys</li>
                <li>• Never asks for OTP codes or SMS verification numbers</li>
                <li>• Never reads CVV security codes or ATM PINs</li>
                <li>• Never executes money transfers without approval</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>What SevaSaathi DOES for you:</span>
              </div>
              <ul className="space-y-1.5 text-emerald-800">
                <li>• Highlights the exact next button or tab on screen</li>
                <li>• Explains confusing fees, tariffs, and form fields</li>
                <li>• Breaks complex multi-step processes into 1-by-1 steps</li>
                <li>• Summarizes actions before you confirm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="p-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm text-slate-900 hover:text-indigo-600 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Threat Model & Auditing Summary */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 text-xs text-slate-600">
          <h3 className="text-sm font-bold text-slate-900">Security Architecture & Auditing Standard</h3>
          <p>
            All guidance tasks maintain an end-to-end audit trail stored with cryptographic timestamps. Input parameters are sanitized against prompt injection and cross-site scripting (XSS).
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => navigateTo('/demo')}
              className="px-4 py-2 bg-white border border-slate-300 rounded-xl font-bold text-slate-800 hover:bg-slate-50 transition"
            >
              Test Live Security in Demo
            </button>
            <button
              onClick={() => navigateTo('/app/tasks')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition"
            >
              View Task Audit Trails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
