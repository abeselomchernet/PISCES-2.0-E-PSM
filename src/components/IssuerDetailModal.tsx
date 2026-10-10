import React from 'react';
import { Issuer } from '../types';
import { X, Download, ShieldCheck, CheckCircle2, TrendingUp, DollarSign, Globe, Award } from 'lucide-react';
import { getImmTier } from '../utils/immScoring';

interface IssuerDetailModalProps {
  issuer: Issuer | null;
  onClose: () => void;
  onOpenStressTest: (issuer: Issuer) => void;
}

export const IssuerDetailModal: React.FC<IssuerDetailModalProps> = ({
  issuer,
  onClose,
  onOpenStressTest,
}) => {
  if (!issuer) return null;

  const handleDownloadProspectus = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(issuer, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `${issuer.ticker}_PROSPECTUS_PROTOTYPE_PISCES.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full my-8 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span>{issuer.ticker}</span>
              <span>·</span>
              <span>{issuer.sector}</span>
              <span>·</span>
              <span>{issuer.region}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              {issuer.name}
            </h2>
            <div className="text-xs text-slate-400 mt-1">
              Eligibility Status (Modelled): <span className="text-slate-200 font-medium">{issuer.ecmaStatus}</span> · Audited by <span className="text-slate-200">{issuer.auditPartner}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadProspectus}
              className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Download Term Sheet"
            >
              <Download className="w-3.5 h-3.5" />
              Prospectus JSON
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed text-sm">
            {issuer.summary}
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40">
              <div className="text-slate-400 text-[11px]">Composite IMM Score</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                {issuer.immScore}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{getImmTier(issuer.immScore)}</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40">
              <div className="text-slate-400 text-[11px]">Target Raise (USD)</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                ${(issuer.targetRaiseUSD / 1000000).toFixed(1)}M
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">ETB {(issuer.targetRaiseETB / 1000000000).toFixed(2)}B</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40">
              <div className="text-slate-400 text-[11px]">Export Revenue Backing</div>
              <div className="text-2xl font-bold text-white mt-1 tabular-nums">
                {issuer.financials.exportRevenueSharePct}%
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Hard Currency Buffer</div>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-950/40">
              <div className="text-slate-400 text-[11px]">Debt Service Coverage</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
                {issuer.financials.debtServiceCoverageRatio}x
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">DSCR Invariant Satisfied</div>
            </div>
          </div>

          {/* Subscore Decomposition */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
            <h3 className="font-semibold text-white text-sm">Analytical Sub-Score Evaluation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Cash Flow Predictability (25%)</span>
                  <span className="font-mono tabular-nums text-white font-medium">
                    {issuer.subScores.cashFlowPredictability} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${issuer.subScores.cashFlowPredictability}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Sovereign & FX Resilience (25%)</span>
                  <span className="font-mono tabular-nums text-white font-medium">
                    {issuer.subScores.sovereignFxResilience} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${issuer.subScores.sovereignFxResilience}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Governance & Transparency (20%)</span>
                  <span className="font-mono tabular-nums text-white font-medium">
                    {issuer.subScores.governanceTransparency} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${issuer.subScores.governanceTransparency}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Impact & Additionality (15%)</span>
                  <span className="font-mono tabular-nums text-white font-medium">
                    {issuer.subScores.impactAdditionality} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-1.5 rounded-full"
                    style={{ width: `${issuer.subScores.impactAdditionality}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Historical & Projected IMM Scores */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3 font-mono">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white font-sans text-sm">
                IMM Score Trajectory & Illustrative Projection
              </h3>
              <span className="text-slate-400 text-[11px]">6 Quarters Real + 4 Quarters Projected</span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 text-center">
              {issuer.historicalScores.map((h) => (
                <div key={h.quarter} className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-[10px] text-slate-400">{h.quarter}</div>
                  <div className="text-xs font-bold text-slate-200 mt-1 tabular-nums">{h.score}</div>
                  <div className="text-[9px] text-emerald-400">Actual</div>
                </div>
              ))}
              {issuer.projectedScores.map((p) => (
                <div key={p.quarter} className="p-2 bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                  <div className="text-[10px] text-emerald-400">{p.quarter}</div>
                  <div className="text-xs font-bold text-emerald-300 mt-1 tabular-nums">{p.score}</div>
                  <div className="text-[9px] text-emerald-500">Model</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quantitative Impact Additionality */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-3">
            <h3 className="font-semibold text-white text-sm">Additionality & ESG Metrics (Demo Data)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-lg">
                <div className="text-[11px] text-slate-400">Direct Jobs</div>
                <div className="text-lg font-bold text-white mt-1 tabular-nums">
                  {issuer.impactMetrics.directJobsSupported.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <div className="text-[11px] text-slate-400">Smallholder Outgrowers</div>
                <div className="text-lg font-bold text-white mt-1 tabular-nums">
                  {issuer.impactMetrics.smallholderSourcingCount.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <div className="text-[11px] text-slate-400">Annual CO2 Offset (Tons)</div>
                <div className="text-lg font-bold text-emerald-400 mt-1 tabular-nums">
                  {issuer.impactMetrics.co2OffsetTonsPerYear.toLocaleString()}
                </div>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <div className="text-[11px] text-slate-400">Annual USD FX Inflow</div>
                <div className="text-lg font-bold text-white mt-1 tabular-nums">
                  ${(issuer.impactMetrics.fxInflowGeneratedUSD / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Next Intermittent Auction: <span className="text-white font-mono">{issuer.nextAuctionDate}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenStressTest(issuer);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
            >
              Launch Stress Test Simulation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
