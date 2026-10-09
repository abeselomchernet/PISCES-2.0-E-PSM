import React, { useState } from 'react';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { ImmScoringConsole } from './components/ImmScoringConsole';
import { IssuerDirectory } from './components/IssuerDirectory';
import { AuctionDesk } from './components/AuctionDesk';
import { TrancheCapitalAllocation } from './components/TrancheCapitalAllocation';
import { EcmaRegulatoryConsole } from './components/EcmaRegulatoryConsole';
import { IssuerDetailModal } from './components/IssuerDetailModal';
import { Issuer } from './types';
import { ISSUERS_DATA } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scoring' | 'issuers' | 'auction' | 'tranches' | 'ecma'>('scoring');
  const [selectedIssuer, setSelectedIssuer] = useState<Issuer | null>(null);

  const handleOpenStressTestForIssuer = (issuer: Issuer) => {
    setActiveTab('scoring');
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Bar following Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenStressTest={() => setActiveTab('scoring')}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Summary Cards */}
        <MetricCards />

        {/* Dynamic Tab Views */}
        {activeTab === 'scoring' && (
          <ImmScoringConsole
            onSelectIssuer={(issuer) => setSelectedIssuer(issuer)}
          />
        )}

        {activeTab === 'issuers' && (
          <IssuerDirectory
            onSelectIssuer={(issuer) => setSelectedIssuer(issuer)}
            onOpenStressTestForIssuer={handleOpenStressTestForIssuer}
          />
        )}

        {activeTab === 'auction' && <AuctionDesk />}

        {activeTab === 'tranches' && <TrancheCapitalAllocation />}

        {activeTab === 'ecma' && <EcmaRegulatoryConsole />}
      </main>

      {/* Prospectus & Underwriting Detail Modal */}
      <IssuerDetailModal
        issuer={selectedIssuer}
        onClose={() => setSelectedIssuer(null)}
        onOpenStressTest={handleOpenStressTestForIssuer}
      />

      {/* Subtle Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-2">
            <span>BERHANE OS // PISCES 2.0</span>
            <span>·</span>
            <span>PROCLAMATION 1248/2021 COMPLIANT</span>
          </div>
          <div>
            Ethiopian Capital Market Authority (ECMA) Observer Terminal
          </div>
        </div>
      </footer>
    </div>
  );
}
