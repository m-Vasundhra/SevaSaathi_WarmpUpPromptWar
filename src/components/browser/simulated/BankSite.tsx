import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Landmark, FileText, Download, Calendar, Shield, CreditCard, ArrowDownRight, ArrowUpRight, Search } from 'lucide-react';
import { ElementHighlight } from '../ElementHighlight';

export const BankSite: React.FC = () => {
  const { 
    activeTask, 
    highlightedElementId, 
    advanceStep, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'accounts' | 'statements' | 'cards'>('accounts');
  const [statementPeriod, setStatementPeriod] = useState<'1m' | '3m' | '6m' | '1y'>('1m');
  const [downloaded, setDownloaded] = useState(false);

  const isTarget = (id: string) => highlightedElementId === id;

  const handleTabClick = (tab: 'accounts' | 'statements' | 'cards') => {
    setActiveTab(tab);
    if (tab === 'statements' && activeTask && activeTask.steps[0]?.status === 'active') {
      advanceStep();
      addToast('Opened Statements & Tax Documents', 'info');
    }
  };

  const handleSelectPeriod = (period: '1m' | '3m' | '6m' | '1y') => {
    setStatementPeriod(period);
    if (period === '3m' && activeTask && activeTask.steps[1]?.status === 'active') {
      advanceStep();
      addToast('Selected Last 3 Months date range', 'info');
    }
  };

  const handleDownload = () => {
    setDownloaded(true);
    if (activeTask && activeTask.steps[2]?.status === 'active') {
      advanceStep();
    }
    addToast('Statement PDF downloaded: Apex_Savings_Q3_2026.pdf', 'success');
  };

  return (
    <div className="bg-slate-50 min-h-[520px] p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-300">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-base font-bold">Apex National Bank</h2>
              <p className="text-xs text-blue-200">Online NetBanking Portal</p>
            </div>
          </div>
          <div className="text-right text-xs">
            <p className="text-blue-200 font-medium">Welcome back, User</p>
            <p className="text-white font-mono font-bold">Savings A/c: *4092</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50/70 text-xs font-semibold gap-4">
          <button
            onClick={() => handleTabClick('accounts')}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'accounts' ? 'border-blue-700 text-blue-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Accounts Overview
          </button>

          <div className="relative">
            {isTarget('tab-statements') && (
              <ElementHighlight label="Step 1: Click Statements" position="bottom" />
            )}
            <button
              id="tab-statements"
              onClick={() => handleTabClick('statements')}
              className={`py-3.5 border-b-2 transition flex items-center gap-1.5 ${
                activeTab === 'statements' ? 'border-blue-700 text-blue-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
              } ${isTarget('tab-statements') ? 'ai-highlight-target' : ''}`}
            >
              <FileText className="h-4 w-4" />
              <span>Statements & Reports</span>
            </button>
          </div>

          <button
            onClick={() => handleTabClick('cards')}
            className={`py-3.5 border-b-2 transition ${
              activeTab === 'cards' ? 'border-blue-700 text-blue-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Debit & Credit Cards
          </button>
        </div>

        {/* Tab 1: Accounts Dashboard */}
        {activeTab === 'accounts' && (
          <div className="p-6 space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Available Balance</p>
                <div className="text-3xl font-extrabold text-slate-900 mt-1">₹84,520.00</div>
                <p className="text-xs text-slate-500 mt-1">Savings Account · Branch IFSC: APEX00012</p>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleTabClick('statements')}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs transition"
                >
                  View Statements
                </button>
              </div>
            </div>

            {/* Transactions */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Transactions</h4>
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ArrowDownRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Monthly Salary Deposit</p>
                      <p className="text-[10px] text-slate-400">Sep 28, 2026 · NEFT Ref: #SAL9082</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-600">+₹75,000.00</span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Supermarket Grocery Mart</p>
                      <p className="text-[10px] text-slate-400">Sep 25, 2026 · UPI Ref: #UPI2918</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">-₹1,420.00</span>
                </div>

                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">PowerGrid Electricity Utility</p>
                      <p className="text-[10px] text-slate-400">Sep 20, 2026 · Auto-debit</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">-₹2,450.00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Statements & PDF Generation */}
        {activeTab === 'statements' && (
          <div className="p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Download Account Statement</h3>
              <p className="text-xs text-slate-500">Select the period for your official bank statement PDF.</p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Duration Period</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => handleSelectPeriod('1m')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                    statementPeriod === '1m' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  Last 1 Month
                </button>

                <div className="relative">
                  {isTarget('btn-period-3m') && (
                    <ElementHighlight label="Step 2: Choose 3 Months" position="top" />
                  )}
                  <button
                    id="btn-period-3m"
                    onClick={() => handleSelectPeriod('3m')}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold text-center transition ${
                      statementPeriod === '3m'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 ring-2 ring-blue-200'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    } ${isTarget('btn-period-3m') ? 'ai-highlight-target' : ''}`}
                  >
                    Last 3 Months (Q3)
                  </button>
                </div>

                <button
                  onClick={() => handleSelectPeriod('6m')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                    statementPeriod === '6m' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  Last 6 Months
                </button>

                <button
                  onClick={() => handleSelectPeriod('1y')}
                  className={`p-3 rounded-xl border text-xs font-semibold text-center transition ${
                    statementPeriod === '1y' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  Financial Year
                </button>
              </div>
            </div>

            {/* Generated Document Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Apex_Savings_Statement_{statementPeriod.toUpperCase()}.pdf</h4>
                  <p className="text-[11px] text-slate-500">Includes all debits, credits, and interest certificates</p>
                </div>
              </div>

              <div className="relative">
                {isTarget('btn-download-statement') && (
                  <ElementHighlight label="Step 3: Click Download PDF" position="top" />
                )}
                <button
                  id="btn-download-statement"
                  onClick={handleDownload}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition shadow-sm ${
                    downloaded
                      ? 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-blue-700 hover:bg-blue-600'
                  } ${isTarget('btn-download-statement') ? 'ai-highlight-target' : ''}`}
                >
                  <Download className="h-4 w-4" />
                  <span>{downloaded ? 'Statement Downloaded ✓' : 'Download PDF Statement'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Cards */}
        {activeTab === 'cards' && (
          <div className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Your Active Cards</h3>
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white max-w-sm space-y-4 shadow-md">
              <div className="flex justify-between items-center text-xs">
                <span>Apex Platinum Debit</span>
                <Landmark className="h-4 w-4 text-blue-300" />
              </div>
              <p className="font-mono text-sm tracking-widest">•••• •••• •••• 4092</p>
              <div className="flex justify-between text-[10px] text-slate-300">
                <span>VALID THRU: 12/29</span>
                <span>CHIP & PIN</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
