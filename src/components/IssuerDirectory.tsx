import React, { useState } from 'react';
import { Issuer, Sector } from '../types';
import { ISSUERS_DATA } from '../data/mockData';
import { Search, ArrowUpRight, ArrowUpDown, Filter } from 'lucide-react';
import { exportToCsv, exportToJson } from '../utils/exportUtils';
import { ExportDropdown } from './ExportDropdown';

interface IssuerDirectoryProps {
  onSelectIssuer: (issuer: Issuer) => void;
  onOpenStressTestForIssuer: (issuer: Issuer) => void;
}

export const IssuerDirectory: React.FC<IssuerDirectoryProps> = ({
  onSelectIssuer,
  onOpenStressTestForIssuer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'immScore' | 'targetRaiseUSD' | 'exportShare'>('immScore');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredIssuers = ISSUERS_DATA.filter((issuer) => {
    const matchesSearch =
      issuer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issuer.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issuer.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector =
      selectedSector === 'all' || issuer.sector === selectedSector;
    return matchesSearch && matchesSector;
  }).sort((a, b) => {
    let valA = 0;
    let valB = 0;
    if (sortBy === 'immScore') {
      valA = a.immScore;
      valB = b.immScore;
    } else if (sortBy === 'targetRaiseUSD') {
      valA = a.targetRaiseUSD;
      valB = b.targetRaiseUSD;
    } else if (sortBy === 'exportShare') {
      valA = a.financials.exportRevenueSharePct;
      valB = b.financials.exportRevenueSharePct;
    }
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const toggleSort = (field: 'immScore' | 'targetRaiseUSD' | 'exportShare') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleExportIssuersCsv = () => {
    const headers = [
      'Issuer ID',
      'Legal Entity Name',
      'Security Ticker',
      'Sector',
      'Region',
      'Vintage Year',
      'Target Raise (USD)',
      'Target Raise (ETB)',
      'IMM Score',
      'Rating Tier',
      'DSCR Coverage Ratio',
      'Export Revenue Share (%)',
      'Annual Revenue (USD)',
      'Revenue Growth YoY (%)',
      'EBITDA Margin (%)',
      'Working Capital Runway (Months)',
      'Total Debt (USD)',
      'Eligibility Status (Modelled)',
      'Audit Partner',
      'Next Auction Date',
    ];

    const rows = filteredIssuers.map((issuer) => [
      issuer.id,
      issuer.name,
      issuer.ticker,
      issuer.sector,
      issuer.region,
      issuer.vintageYear,
      issuer.targetRaiseUSD,
      issuer.targetRaiseETB,
      issuer.immScore,
      issuer.immTier,
      issuer.financials.debtServiceCoverageRatio,
      issuer.financials.exportRevenueSharePct,
      issuer.financials.annualRevenueUSD,
      issuer.financials.revenueGrowthYoY,
      issuer.financials.ebitdaMarginPct,
      issuer.financials.workingCapitalRunwayMonths,
      issuer.financials.totalDebtUSD,
      issuer.eligibilityStatus,
      issuer.auditPartner,
      issuer.nextAuctionDate,
    ]);

    const dateStr = new Date().toISOString().slice(0, 10);
    const filterSuffix = selectedSector !== 'all' ? `_${selectedSector.replace(/\s+/g, '_')}` : '';
    exportToCsv(`PISCES_Issuers_Pipeline${filterSuffix}_${dateStr}.csv`, headers, rows);
  };

  const handleExportIssuersJson = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const filterSuffix = selectedSector !== 'all' ? `_${selectedSector.replace(/\s+/g, '_')}` : '';
    exportToJson(`PISCES_Issuers_Pipeline${filterSuffix}_${dateStr}.json`, {
      exchange: 'PISCES 2.0 (E-PSM Institutional Prototype)',
      regulatoryContext: 'Designed with reference to Proclamation 1248/2021',
      exportedAt: new Date().toISOString(),
      currentFilters: {
        sector: selectedSector,
        searchQuery: searchQuery || null,
        sortBy,
        sortOrder,
      },
      totalRecordsInView: filteredIssuers.length,
      issuers: filteredIssuers,
    });
  };

  const sectors: Sector[] = [
    'Agro-Industrial',
    'Renewable Energy',
    'Cross-Border Logistics',
    'Financial Infrastructure',
    'Pharmaceutical & Healthcare',
    'Specialty Export',
  ];

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">
            Institutional Issuer Pipeline (Demo Data)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Synthetic issuer dossiers illustrating private debt & structured asset profiles in intermittent auction design
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search ticker, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg pl-9 pr-3 py-2 w-56 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
          <ExportDropdown
            label="Export Data"
            count={filteredIssuers.length}
            onExportCsv={handleExportIssuersCsv}
            onExportJson={handleExportIssuersJson}
          />
        </div>
      </div>

      {/* Sector Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <button
          onClick={() => setSelectedSector('all')}
          className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
            selectedSector === 'all'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          All Sectors ({ISSUERS_DATA.length})
        </button>
        {sectors.map((sec) => (
          <button
            key={sec}
            onClick={() => setSelectedSector(sec)}
            className={`px-3 py-1.5 font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedSector === sec
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* High-Density Data Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40 font-mono">
                <th className="py-3 px-4">Issuer & Ticker</th>
                <th className="py-3 px-4">Sector & Vintage</th>
                <th
                  onClick={() => toggleSort('immScore')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center gap-1">
                    <span>IMM Score</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('targetRaiseUSD')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center gap-1">
                    <span>Target Raise</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('exportShare')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200"
                >
                  <div className="flex items-center gap-1">
                    <span>Export FX</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">DSCR Coverage</th>
                <th className="py-3 px-4">Eligibility / Audit Status</th>
                <th className="py-3 px-4">Next Auction</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredIssuers.map((issuer) => {
                const scoreColor =
                  issuer.immScore >= 82
                    ? 'text-emerald-400'
                    : issuer.immScore >= 70
                    ? 'text-amber-400'
                    : 'text-rose-400';

                return (
                  <tr
                    key={issuer.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-100 group-hover:text-emerald-300 transition-colors">
                        {issuer.name}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {issuer.ticker} · {issuer.region}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div>{issuer.sector}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Est. {issuer.vintageYear}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      <div className={`font-bold text-sm ${scoreColor}`}>
                        {issuer.immScore}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {issuer.immScore >= 82 ? 'Prime A' : 'Yield B'}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      <div className="font-semibold text-slate-200">
                        ${(issuer.targetRaiseUSD / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-[10px] text-slate-400">
                        ETB {(issuer.targetRaiseETB / 1000000000).toFixed(1)}B
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums">
                      <div className="text-slate-200 font-medium">
                        {issuer.financials.exportRevenueSharePct}%
                      </div>
                      <div className="text-[10px] text-slate-400">
                        USD Inflows
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono tabular-nums text-slate-300">
                      {issuer.financials.debtServiceCoverageRatio}x
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium text-xs">
                        {issuer.eligibilityStatus}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-32">
                        {issuer.auditPartner}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-300 text-xs">
                      {issuer.nextAuctionDate}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenStressTestForIssuer(issuer)}
                          className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Stress Test
                        </button>
                        <button
                          onClick={() => onSelectIssuer(issuer)}
                          className="px-2.5 py-1.5 text-xs text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/40 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          Prospectus
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
