import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scoring' | 'issuers' | 'auction' | 'tranches' | 'ecma';
  setActiveTab: (tab: 'scoring' | 'issuers' | 'auction' | 'tranches' | 'ecma') => void;
  onOpenStressTest: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenStressTest }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white whitespace-nowrap">
            BERHANE OS
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 border-l border-slate-800 pl-3">
            PISCES 2.0 // IMM CAPITAL TERMINAL
          </span>
        </div>

        {/* Zone 2: Single-line Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('scoring')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'scoring'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            IMM Scoring Engine
          </button>
          <button
            onClick={() => setActiveTab('issuers')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'issuers'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Issuer Pipeline
          </button>
          <button
            onClick={() => setActiveTab('auction')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'auction'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Intermittent Auctions
          </button>
          <button
            onClick={() => setActiveTab('tranches')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'tranches'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Tranche Structuring
          </button>
          <button
            onClick={() => setActiveTab('ecma')}
            className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
              activeTab === 'ecma'
                ? 'border-emerald-400 text-white font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ECMA Oversight
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenStressTest}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-emerald-500/10 cursor-pointer"
          >
            Simulate Macro Shock
          </button>
        </div>
      </div>
      
      {/* Mobile nav bar for small viewports */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-800/80 px-4 py-2 gap-4 text-xs font-medium text-slate-400 no-scrollbar">
        <button
          onClick={() => setActiveTab('scoring')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'scoring' ? 'text-emerald-400 font-semibold' : ''}`}
        >
          IMM Scoring
        </button>
        <button
          onClick={() => setActiveTab('issuers')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'issuers' ? 'text-emerald-400 font-semibold' : ''}`}
        >
          Pipeline
        </button>
        <button
          onClick={() => setActiveTab('auction')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'auction' ? 'text-emerald-400 font-semibold' : ''}`}
        >
          Auctions
        </button>
        <button
          onClick={() => setActiveTab('tranches')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'tranches' ? 'text-emerald-400 font-semibold' : ''}`}
        >
          Tranches
        </button>
        <button
          onClick={() => setActiveTab('ecma')}
          className={`whitespace-nowrap shrink-0 py-1 ${activeTab === 'ecma' ? 'text-emerald-400 font-semibold' : ''}`}
        >
          ECMA Rules
        </button>
      </div>
    </header>
  );
};
