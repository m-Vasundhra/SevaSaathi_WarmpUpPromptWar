import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Navbar } from '../components/navigation/Navbar';
import { 
  Sparkles, 
  ArrowRight, 
  PlayCircle, 
  ShieldCheck, 
  Lock, 
  Eye, 
  CheckCircle2, 
  MousePointerClick, 
  Layers, 
  Zap, 
  Check,
  ChevronRight,
  ShieldAlert,
  Search,
  MessageSquare
} from 'lucide-react';
import { CATEGORIES } from '../data/demoData';
import { CategoryCard } from '../components/ui/CategoryCard';

export const LandingPage: React.FC = () => {
  const { navigateTo, startTask } = useApp();
  const [beforeAfterActive, setBeforeAfterActive] = useState<'after' | 'before'>('after');

  const handleStartWithTask = async (taskGoal: string) => {
    await startTask(taskGoal);
    navigateTo('/app/assistant');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFC] text-slate-900 flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Soft background glow decoration */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-100/60 to-purple-100/40 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/70 px-4 py-1.5 text-xs font-bold text-indigo-800 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-pulse" />
            <span>Universal AI Browser Assistant</span>
          </div>

          {/* Headline & Subheadline */}
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Your guide to the internet.
            </h1>
            <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Tell SevaSaathi what you're trying to do. It understands the page you're on and guides you, step by step.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => navigateTo('/app')}
              id="hero-get-sevasaathi"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 active:bg-indigo-700 transition active:scale-98"
            >
              <span>Get SevaSaathi</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => navigateTo('/demo')}
              id="hero-see-how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition"
            >
              <PlayCircle className="h-4 w-4 text-indigo-600" />
              <span>See how it works</span>
            </button>
          </div>

          {/* Trust badges strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Zero-Credential Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-indigo-600" />
              No technical knowledge needed
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-indigo-600" />
              Visual on-screen spotlight
            </span>
          </div>

          {/* Hero Visual: Realistic Browser with Floating AI Assistant Card */}
          <div className="pt-10 max-w-5xl mx-auto">
            <div className="relative rounded-2xl border border-slate-300/80 bg-slate-900 shadow-2xl overflow-hidden text-left">
              {/* Browser Header Bar */}
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono ml-3 hidden sm:inline-block">https://powergrid.service/billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-medium">
                    ⚡ PowerGrid Energy Portal
                  </span>
                </div>
              </div>

              {/* Webpage Content */}
              <div className="bg-white p-6 sm:p-10 relative text-slate-900 min-h-[380px]">
                <div className="max-w-lg space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded">
                      Electricity Bill
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 mt-2">September Invoice</h2>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Consumer Number</label>
                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-800">
                      123456789
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-baseline justify-between">
                    <div>
                      <p className="text-xs text-amber-900 font-medium">Amount Due</p>
                      <p className="text-2xl font-extrabold text-slate-900">₹2,450</p>
                    </div>
                    <span className="text-xs font-semibold text-amber-800">Due Oct 05, 2026</span>
                  </div>

                  {/* Target Pay Bill Button with Highlight */}
                  <div className="relative inline-block">
                    {/* Pulsing Arrow Pointer */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
                      <span className="bg-indigo-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md animate-pulse whitespace-nowrap">
                        AI Highlight: Click here
                      </span>
                      <span className="h-2 w-2 border-r-2 border-b-2 border-indigo-900 rotate-45 -mt-1 bg-indigo-900"></span>
                    </div>

                    <button className="px-6 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-lg ring-4 ring-indigo-400/80 ai-highlight-target">
                      Pay Bill
                    </button>
                  </div>
                </div>

                {/* Floating Assistant Panel Overlaid */}
                <div className="absolute bottom-6 right-6 w-72 sm:w-80 rounded-2xl bg-slate-900 text-white p-5 shadow-2xl border border-indigo-500/30 transform hover:-translate-y-1 transition-transform animate-in fade-in slide-in-from-bottom-5 duration-300">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-600 text-white">
                        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                      </div>
                      <span className="font-bold text-xs">SevaSaathi</span>
                    </div>
                    <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                      Step 3 of 4
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white">You're ready to pay.</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Click <strong className="text-amber-300">"Pay Bill"</strong>. I'll guide you through the next payment step.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button 
                      onClick={() => navigateTo('/demo')}
                      className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
                    >
                      Got it → Next step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: How It Works */}
      <section className="py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">How it works</h2>
            <p className="text-sm sm:text-base text-slate-600">
              No complicated tools or tech jargon. Just tell SevaSaathi what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-4 hover:border-slate-300 hover:bg-white transition-all shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-sm shadow-indigo-100">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tell it what you need</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "Help me download my bank statement" or "Pay my electricity bill". Speak or type in plain language.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700 italic">
                💬 "Help me book a train ticket to Mumbai."
              </div>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-4 hover:border-slate-300 hover:bg-white transition-all shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-sm shadow-indigo-100">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI understands the page</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                SevaSaathi scans the visible webpage, recognizes where your goal is located, and prepares the next single step.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-slate-700">
                🔍 Identified: IRCTC Booking Portal (Route & Berth form)
              </div>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 space-y-4 hover:border-slate-300 hover:bg-white transition-all shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-sm shadow-indigo-100">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Follow the guidance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                SevaSaathi highlights what to click, explains why, and continues alongside you until the task is complete.
              </p>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs font-medium text-indigo-700 font-bold">
                ✨ Highlighted: "Select 12952 Rajdhani (2A)"
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section: "It doesn't just answer. It shows you." */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/80 px-3 py-1 rounded-full border border-indigo-800">
                Visual Spotlight Technology
              </span>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                It doesn't just answer. <span className="text-indigo-400">It shows you.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
                Traditional chatbots give you walls of confusing text. SevaSaathi puts a glowing spotlight directly on the webpage button you need to click.
              </p>

              {/* Before / After toggle tabs */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-800 rounded-xl max-w-xs border border-slate-700">
                <button
                  onClick={() => setBeforeAfterActive('before')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    beforeAfterActive === 'before'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Standard Chatbots
                </button>
                <button
                  onClick={() => setBeforeAfterActive('after')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                    beforeAfterActive === 'after'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SevaSaathi Spotlight
                </button>
              </div>
            </div>

            {/* Right Interactive Visual Demonstration */}
            <div className="lg:col-span-7">
              {beforeAfterActive === 'before' ? (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <MessageSquare className="h-4 w-4 text-slate-500" />
                    <span>Typical Generic Chatbot Experience:</span>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 space-y-2">
                    <p className="font-semibold text-slate-100">User: "What do I click to download my bank statement?"</p>
                    <p className="text-slate-400 leading-relaxed">
                      "To retrieve your statement, first navigate to the top-level navigational menu, locate the accounts header, open the sub-menu, locate document retrieval protocols, configure the date range selector parameters, and initiate the binary download trigger..."
                    </p>
                    <p className="text-rose-400 text-[11px] font-semibold pt-2">
                      ⚠️ Confusing, technical, and leaves the user lost on the page.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-indigo-500/40 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs font-bold text-white">Live Webpage Spotlight</span>
                    </div>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                      Active Navigation
                    </span>
                  </div>

                  {/* Simulated Bank Bar */}
                  <div className="bg-white rounded-xl p-4 text-slate-900 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs font-bold">
                      <span>Apex National Bank</span>
                      <span className="text-slate-400 font-mono">Savings *4092</span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
                      <span>Accounts</span>
                      <span>Cards</span>

                      {/* Spotlighted Tab */}
                      <div className="relative">
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-indigo-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-md animate-bounce whitespace-nowrap">
                          Click here
                        </div>
                        <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border-2 border-indigo-600 ai-highlight-target inline-block">
                          Statements
                        </span>
                      </div>

                      <span>Transfers</span>
                    </div>
                  </div>

                  {/* AI Helper Next Step Explanation Card */}
                  <div className="p-4 rounded-xl bg-indigo-950/70 border border-indigo-500/50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-indigo-300">
                      <span>Next Step</span>
                      <span>Step 1 of 3</span>
                    </div>
                    <p className="text-sm font-bold text-white">
                      Click <span className="text-indigo-300 underline">Download Statement</span>.
                    </p>
                    <p className="text-xs text-slate-300">
                      I'll check the next screen when you're done.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-[#FBFBFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              Universal Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Help with almost anything online.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              From utilities and train tickets to government registries and returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectExample={(example) => handleStartWithTask(example)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section: Safety ("You stay in control") */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Safety & Privacy Standard
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                You stay in control.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                SevaSaathi is your assistant, not your replacement. You see every step and make the final decisions.
              </p>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span><strong>AI guides you before acting:</strong> You always know what is about to happen.</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Important actions require confirmation:</strong> Payments, transfers, and submissions are never automated silently.</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Zero passwords or OTPs:</strong> SevaSaathi will never ask for your passwords, OTP codes, PINs, or CVVs.</span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <span><strong>Stop anytime:</strong> Cancel or pause guidance with a single click.</span>
                </div>
              </div>
            </div>

            {/* Right: Visual "You are in control" Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <ShieldAlert className="h-5 w-5 text-indigo-600" />
                    <span>SevaSaathi wants to:</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    Verification Pending
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Navigate to payment gateway</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Select electricity bill #123456789</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Prepare payment review of ₹2,450</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <p className="text-xs font-bold text-slate-800">Before payment:</p>
                  <div className="flex items-center gap-3">
                    <button className="flex-1 py-2 px-4 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 transition">
                      Cancel
                    </button>
                    <button className="flex-1 py-2 px-4 rounded-xl bg-indigo-600 text-xs font-bold text-white shadow-xs hover:bg-indigo-500 transition">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white text-center">
        <div className="mx-auto max-w-4xl px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to explore the internet with confidence?</h2>
          <p className="text-sm sm:text-base text-indigo-200 max-w-xl mx-auto">
            Try the interactive demonstration or launch the assistant application now.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('/demo')}
              className="px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm shadow-md hover:bg-indigo-50 transition"
            >
              Launch Interactive Demo
            </button>
            <button
              onClick={() => navigateTo('/app')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition"
            >
              Open SevaSaathi App
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span>SevaSaathi</span>
            <span className="font-normal text-slate-400">· Your guide to the internet</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('/')} className="hover:text-slate-800 transition">Overview</button>
            <button onClick={() => navigateTo('/demo')} className="hover:text-slate-800 transition">Demo</button>
            <button onClick={() => navigateTo('/help')} className="hover:text-slate-800 transition">Safety & Help</button>
            <button onClick={() => navigateTo('/app/settings')} className="hover:text-slate-800 transition">Settings</button>
          </div>

          <p className="text-[11px] text-slate-400">Zero-Credential Security Standards</p>
        </div>
      </footer>
    </div>
  );
};
