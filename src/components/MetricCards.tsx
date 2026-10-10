import React from 'react';
import { ISSUERS_DATA } from '../data/mockData';

export const MetricCards: React.FC = () => {
  const totalRaiseUSD = ISSUERS_DATA.reduce((acc, curr) => acc + curr.targetRaiseUSD, 0);
  const totalRaiseETB = ISSUERS_DATA.reduce((acc, curr) => acc + curr.targetRaiseETB, 0);
  const avgImmScore = (
    ISSUERS_DATA.reduce((acc, curr) => acc + curr.immScore, 0) / ISSUERS_DATA.length
  ).toFixed(1);
  const avgExportPct = (
    ISSUERS_DATA.reduce((acc, curr) => acc + curr.financials.exportRevenueSharePct, 0) /
    ISSUERS_DATA.length
  ).toFixed(1);
  const totalFirstLossUSD = ISSUERS_DATA.reduce(
    (acc, curr) => acc + (curr.targetRaiseUSD * curr.tranches.firstLossGuaranteePct) / 100,
    0
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div className="text-xs text-slate-400 font-medium">Pipeline Target (Illustrative)</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-white font-mono tabular-nums">
          ${(totalRaiseUSD / 1000000).toFixed(1)}M
        </div>
        <div className="mt-1 text-xs text-slate-400 font-mono tabular-nums">
          ETB {(totalRaiseETB / 1000000000).toFixed(2)}B Equivalent
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div className="text-xs text-slate-400 font-medium">Composite IMM Benchmark</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-emerald-400 font-mono tabular-nums">
          {avgImmScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">
          Prototype Score Classification
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div className="text-xs text-slate-400 font-medium">Hard-Currency FX Cushion</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-white font-mono tabular-nums">
          {avgExportPct}%
        </div>
        <div className="mt-1 text-xs text-slate-400">
          Weighted Export Revenue Share
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div className="text-xs text-slate-400 font-medium">Illustrative First-Loss Cushion</div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-emerald-400 font-mono tabular-nums">
          ${(totalFirstLossUSD / 1000000).toFixed(2)}M
        </div>
        <div className="mt-1 text-xs text-slate-400">
          Illustrative First-Loss Backstop
        </div>
      </div>
    </div>
  );
};
