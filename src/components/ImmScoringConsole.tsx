import React, { useState } from 'react';
import { Issuer, ImmStressParameters } from '../types';
import { ISSUERS_DATA } from '../data/mockData';
import { calculateStressedImmScore, generateSensitivityMatrix, getImmTier, IMM_WEIGHTS } from '../utils/immScoring';
import { Sliders, RefreshCw, AlertTriangle, TrendingDown, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ImmScoringConsoleProps {
  onSelectIssuer: (issuer: Issuer) => void;
}

export const ImmScoringConsole: React.FC<ImmScoringConsoleProps> = ({ onSelectIssuer }) => {
  const [selectedIssuerId, setSelectedIssuerId] = useState<string>(ISSUERS_DATA[0].id);
  const [stressParams, setStressParams] = useState<ImmStressParameters>({
    fxDevaluationShockPct: -20,
    debtCostSpikeBps: 200,
    inflationSurgeBps: 300,
    exportTariffFrictionPct: 0,
    climateDisruptionFactorPct: 0,
  });

  const activeIssuer = ISSUERS_DATA.find((i) => i.id === selectedIssuerId) || ISSUERS_DATA[0];

  const simulation = calculateStressedImmScore(
    activeIssuer.subScores,
    activeIssuer.financials,
    stressParams
  );

  const sensitivityMatrix = generateSensitivityMatrix(activeIssuer);

  const applyPreset = (preset: 'baseline' | 'devaluation' | 'monetary' | 'boom') => {
    switch (preset) {
      case 'baseline':
        setStressParams({
          fxDevaluationShockPct: 0,
          debtCostSpikeBps: 0,
          inflationSurgeBps: 0,
          exportTariffFrictionPct: 0,
          climateDisruptionFactorPct: 0,
        });
        break;
      case 'devaluation':
        setStressParams({
          fxDevaluationShockPct: -35,
          debtCostSpikeBps: 150,
          inflationSurgeBps: 550,
          exportTariffFrictionPct: -5,
          climateDisruptionFactorPct: 0,
        });
        break;
      case 'monetary':
        setStressParams({
          fxDevaluationShockPct: -10,
          debtCostSpikeBps: 450,
          inflationSurgeBps: 400,
          exportTariffFrictionPct: 0,
          climateDisruptionFactorPct: 0,
        });
        break;
      case 'boom':
        setStressParams({
          fxDevaluationShockPct: 5,
          debtCostSpikeBps: -100,
          inflationSurgeBps: -150,
          exportTariffFrictionPct: 0,
          climateDisruptionFactorPct: 0,
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Selection Zone */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-emerald-400 tracking-wider">
            ARDI ANALYTICAL ENGINE // SCENARIO ALLOCATION PROTOTYPE
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
            IMM Stress Scenario & Issuer Analysis
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Simulate macroeconomic shocks across currency devaluation, domestic inflation, and debt service 
            coverage to observe modelled score migration across illustrative institutional tranches.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <label className="text-xs text-slate-400 self-center">Target Issuer:</label>
          <select
            value={selectedIssuerId}
            onChange={(e) => setSelectedIssuerId(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-emerald-500 font-medium"
          >
            {ISSUERS_DATA.map((iss) => (
              <option key={iss.id} value={iss.id}>
                {iss.name} ({iss.ticker}) - Base: {iss.immScore}
              </option>
            ))}
          </select>

          <button
            onClick={() => onSelectIssuer(activeIssuer)}
            className="px-3.5 py-2.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            View Prospectus
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset Macro Scenarios */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 font-mono mr-2">Macro Scenarios:</span>
        <button
          onClick={() => applyPreset('baseline')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            stressParams.fxDevaluationShockPct === 0 && stressParams.debtCostSpikeBps === 0
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Baseline Steady State
        </button>
        <button
          onClick={() => applyPreset('devaluation')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            stressParams.fxDevaluationShockPct === -35
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Severe Currency Shock (-35% ETB)
        </button>
        <button
          onClick={() => applyPreset('monetary')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            stressParams.debtCostSpikeBps === 450
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Monetary Tightening (+450 bps)
        </button>
        <button
          onClick={() => applyPreset('boom')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            stressParams.fxDevaluationShockPct === 5
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          Export Expansion (+5% Hard FX)
        </button>
        <button
          onClick={() => applyPreset('baseline')}
          className="ml-auto px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          title="Reset to Baseline"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Main Grid: Parameters vs Outcome */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Stress Sliders */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Stress Parameters
            </div>
            <span className="text-xs text-slate-400 font-mono">STRESS-GRID v2.4</span>
          </div>

          {/* Slider 1: FX Devaluation */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">ETB/USD Devaluation Shock</span>
              <span className="font-mono tabular-nums text-emerald-400 font-medium">
                {stressParams.fxDevaluationShockPct}%
              </span>
            </div>
            <input
              type="range"
              min="-50"
              max="10"
              step="5"
              value={stressParams.fxDevaluationShockPct}
              onChange={(e) =>
                setStressParams({
                  ...stressParams,
                  fxDevaluationShockPct: Number(e.target.value),
                })
              }
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-50% (Acute Deval)</span>
              <span>0% (Parity)</span>
              <span>+10% (Apprec)</span>
            </div>
          </div>

          {/* Slider 2: Debt Cost Spike */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Local Debt Cost Surge (BPS)</span>
              <span className="font-mono tabular-nums text-emerald-400 font-medium">
                +{stressParams.debtCostSpikeBps} bps
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="600"
              step="50"
              value={stressParams.debtCostSpikeBps}
              onChange={(e) =>
                setStressParams({
                  ...stressParams,
                  debtCostSpikeBps: Number(e.target.value),
                })
              }
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 bps</span>
              <span>+300 bps</span>
              <span>+600 bps</span>
            </div>
          </div>

          {/* Slider 3: Domestic Inflation Surge */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Domestic CPI Acceleration</span>
              <span className="font-mono tabular-nums text-emerald-400 font-medium">
                +{stressParams.inflationSurgeBps} bps
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="800"
              step="50"
              value={stressParams.inflationSurgeBps}
              onChange={(e) =>
                setStressParams({
                  ...stressParams,
                  inflationSurgeBps: Number(e.target.value),
                })
              }
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 bps</span>
              <span>+400 bps</span>
              <span>+800 bps</span>
            </div>
          </div>

          {/* Slider 4: Climate/Agricultural Friction */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300">Supply Chain / Climate Friction</span>
              <span className="font-mono tabular-nums text-emerald-400 font-medium">
                {stressParams.climateDisruptionFactorPct}%
              </span>
            </div>
            <input
              type="range"
              min="-25"
              max="0"
              step="5"
              value={stressParams.climateDisruptionFactorPct}
              onChange={(e) =>
                setStressParams({
                  ...stressParams,
                  climateDisruptionFactorPct: Number(e.target.value),
                })
              }
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>-25% (Extreme Drought)</span>
              <span>0% (Nominal Harvest)</span>
            </div>
          </div>

          {/* Issuer Profile Card */}
          <div className="pt-4 border-t border-slate-800 text-xs space-y-2">
            <div className="font-semibold text-slate-300">Issuer Vulnerability Profile:</div>
            <div className="grid grid-cols-2 gap-2 text-slate-400 font-mono tabular-nums">
              <div>Export Share: <span className="text-white">{activeIssuer.financials.exportRevenueSharePct}%</span></div>
              <div>Import Exposure: <span className="text-white">{activeIssuer.financials.importCostExposurePct}%</span></div>
              <div>DSCR Ratio: <span className="text-white">{activeIssuer.financials.debtServiceCoverageRatio}x</span></div>
              <div>Runway: <span className="text-white">{activeIssuer.financials.workingCapitalRunwayMonths} mos</span></div>
            </div>
          </div>
        </div>

        {/* Right Column: Scenario Scoring Outcome */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div className="text-xs text-slate-400 font-medium">Base IMM Score</div>
              <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-white">
                {activeIssuer.immScore}
              </div>
              <div className="mt-2 text-xs text-slate-400">
                {getImmTier(activeIssuer.immScore)}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div className="text-xs text-slate-400 font-medium">Stressed IMM Score</div>
              <div className={`mt-2 text-3xl font-bold font-mono tabular-nums ${
                simulation.stressedScore >= 80 ? 'text-emerald-400' : simulation.stressedScore >= 68 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {simulation.stressedScore}
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs font-mono tabular-nums">
                {simulation.delta >= 0 ? (
                  <span className="text-emerald-400">+{simulation.delta} pts</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1">
                    <TrendingDown className="w-3 h-3" />
                    {simulation.delta} pts delta
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between">
              <div className="text-xs text-slate-400 font-medium">12-Mo Implied Default</div>
              <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-slate-200">
                {simulation.impliedDefaultProbabilityPct}%
              </div>
              <div className="mt-2 text-xs text-slate-400 font-mono tabular-nums">
                Spread: +{simulation.recommendedSpreadBps} bps
              </div>
            </div>
          </div>

          {/* Sub-Metric Decomposition */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Analytical Sub-Dimension Trajectory</h3>
              <span className="text-xs text-slate-400 font-mono">Weighted Model Architecture</span>
            </div>

            <div className="space-y-3">
              {/* Cash Flow */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Cash Flow Predictability (25% Wgt)</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    {simulation.stressedSubScores.cashFlowPredictability} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulation.stressedSubScores.cashFlowPredictability}%` }}
                  />
                </div>
              </div>

              {/* Sovereign FX */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Sovereign & FX Resilience (25% Wgt)</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    {simulation.stressedSubScores.sovereignFxResilience} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulation.stressedSubScores.sovereignFxResilience}%` }}
                  />
                </div>
              </div>

              {/* Governance */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Governance & Disclosure Quality (20% Wgt)</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    {simulation.stressedSubScores.governanceTransparency} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulation.stressedSubScores.governanceTransparency}%` }}
                  />
                </div>
              </div>

              {/* Impact Additionality */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Impact & Additionality (15% Wgt)</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    {simulation.stressedSubScores.impactAdditionality} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulation.stressedSubScores.impactAdditionality}%` }}
                  />
                </div>
              </div>

              {/* Auction Depth */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300">Secondary Auction Viability (15% Wgt)</span>
                  <span className="font-mono tabular-nums text-slate-300">
                    {simulation.stressedSubScores.secondaryAuctionDepth} / 100
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${simulation.stressedSubScores.secondaryAuctionDepth}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Analytical Scenario Memo */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 text-xs space-y-2">
            <div className="flex items-center gap-2 font-semibold text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Analytical Scenario Memo
            </div>
            <p className="text-slate-400 leading-relaxed">
              {simulation.stressedScore >= 80 ? (
                <>
                  <strong className="text-emerald-300">Model Tier A Anchor Eligible:</strong> {activeIssuer.name} maintains a robust buffer against ETB devaluation due to its {activeIssuer.financials.exportRevenueSharePct}% hard-currency export earnings. Senior tranche placement is modelled at {simulation.recommendedSpreadBps} bps spread over the sovereign baseline with an illustrative 10% First-Loss Guarantee backstop.
                </>
              ) : simulation.stressedScore >= 68 ? (
                <>
                  <strong className="text-amber-300">Mezzanine Conditional:</strong> Macro stress triggers subscore compression down to {simulation.stressedScore}. It is modelled that QIBs require an expanded 15% first-loss illustrative tranche or hard-currency indexed coupon step-up if ETB depreciates beyond {stressParams.fxDevaluationShockPct}%.
                </>
              ) : (
                <>
                  <strong className="text-rose-300">Special Structuring Required:</strong> Severe macro stress pushes the issuer into Model Tier C with an implied default probability of {simulation.impliedDefaultProbabilityPct}%. Direct senior placement must be paired with structured warehouse liquidity or risk-sharing enhancement.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Sensitivity Heatmap Matrix */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-white">Dual-Factor Sensitivity Heatmap</h3>
            <p className="text-xs text-slate-400">
              Cross-impact of FX Devaluation vs. Domestic Debt Cost Surge on {activeIssuer.ticker} IMM Score
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80 inline-block"></span> $\ge 82$ Tier A</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500/80 inline-block"></span> $68-81$ Tier B</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500/80 inline-block"></span> $&lt; 68$ Tier C</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 px-3">FX Shock \ Debt Surge</th>
                <th className="py-2.5 px-3 text-center">+0 bps</th>
                <th className="py-2.5 px-3 text-center">+150 bps</th>
                <th className="py-2.5 px-3 text-center">+300 bps</th>
                <th className="py-2.5 px-3 text-center">+450 bps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sensitivityMatrix.map((row) => (
                <tr key={row.fxShock} className="hover:bg-slate-800/20">
                  <td className="py-2.5 px-3 font-semibold text-slate-300">{row.fxShock} ETB Shock</td>
                  {row.results.map((res) => {
                    const scoreBg =
                      res.score >= 82
                        ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                        : res.score >= 68
                        ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                        : 'bg-rose-950/60 text-rose-300 border border-rose-800/50';

                    return (
                      <td key={res.debtSpikeBps} className="py-2 px-3 text-center">
                        <div className={`py-1.5 px-2 rounded-lg font-bold tabular-nums inline-block min-w-16 ${scoreBg}`}>
                          {res.score}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
