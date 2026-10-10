import React, { useState } from 'react';
import { ISSUERS_DATA } from '../data/mockData';
import { Layers, ShieldCheck, PieChart, TrendingUp } from 'lucide-react';
import { InfoTooltip } from './InfoTooltip';

export const TrancheCapitalAllocation: React.FC = () => {
  const [selectedIssuerId, setSelectedIssuerId] = useState<string>(ISSUERS_DATA[0].id);
  const [seniorShare, setSeniorShare] = useState<number>(60);
  const [mezzanineShare, setMezzanineShare] = useState<number>(25);
  const [firstLossShare, setFirstLossShare] = useState<number>(10);

  const issuer = ISSUERS_DATA.find((i) => i.id === selectedIssuerId) || ISSUERS_DATA[0];
  const sovereignAnchorShare = Math.max(0, 100 - (seniorShare + mezzanineShare + firstLossShare));

  const seniorCoupon = issuer.tranches.seniorCouponRate;
  const mezzanineCoupon = issuer.tranches.mezzanineCouponRate;
  const firstLossFee = 2.5; // illustrative first-loss guarantee fee
  const sovereignEquityCost = 18.0;

  // Blended WACC calculation
  const blendedWACC = (
    (seniorShare * seniorCoupon +
      mezzanineShare * mezzanineCoupon +
      firstLossShare * firstLossFee +
      sovereignAnchorShare * sovereignEquityCost) /
    100
  ).toFixed(2);

  // Private Capital Mobilization Multiplier: (Senior + Mezzanine) / FirstLoss
  const privateCapitalMultiplier = (
    (seniorShare + mezzanineShare) /
    Math.max(1, firstLossShare)
  ).toFixed(1);

  const totalRaiseUSD = issuer.targetRaiseUSD;
  const seniorAmount = (totalRaiseUSD * seniorShare) / 100;
  const mezzanineAmount = (totalRaiseUSD * mezzanineShare) / 100;
  const firstLossAmount = (totalRaiseUSD * firstLossShare) / 100;
  const sovereignEquityAmount = (totalRaiseUSD * sovereignAnchorShare) / 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-mono text-emerald-400">
            CAPITAL ARCHITECTURE // ILLUSTRATIVE TRANCHE MODELLING
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-white mt-1">
            Tranche Structuring & Blended Yield Modelling
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Explore conceptual first-loss credit enhancements and their illustrative impact on blended financing costs 
            for productive enterprise credit structures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400">Issuer:</label>
          <select
            value={selectedIssuerId}
            onChange={(e) => setSelectedIssuerId(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2.5 font-medium"
          >
            {ISSUERS_DATA.map((iss) => (
              <option key={iss.id} value={iss.id}>
                {iss.name} (${(iss.targetRaiseUSD / 1000000).toFixed(1)}M)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400 flex items-center">
            <span>Weighted Average Cost of Capital (WACC)</span>
            <InfoTooltip text="Weighted Average Cost of Capital (WACC): the blended financing cost across the capital structure." />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-emerald-400">
            {blendedWACC}%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            vs 18.5% Standalone Commercial Rate
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Private Capital Multiplier</div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-white">
            {privateCapitalMultiplier}x
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Modelled Private Capital Ratio per $1 First-Loss
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400 flex items-center">
            <span>First-Loss Cushion</span>
            <InfoTooltip text="First-Loss Cushion: an illustrative junior risk layer designed to absorb losses before senior tranches." />
          </div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-slate-200">
            ${(firstLossAmount / 1000000).toFixed(2)}M
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Absorption capacity before Senior default
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="text-xs text-slate-400">Senior Tranche Profile (Modelled)</div>
          <div className="mt-2 text-3xl font-bold font-mono tabular-nums text-emerald-400">
            Indicative Senior Profile
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Modelled Benchmark for Institutional Discussion
          </div>
        </div>
      </div>

      {/* Structuring Sliders & Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-semibold text-white">Tranche Ratio Sliders</h3>
            <span className="text-xs text-slate-400 font-mono">Total Allocation: 100%</span>
          </div>

          {/* Senior Tranche */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Senior Secured Debt</span>
              <span className="font-mono tabular-nums text-emerald-400 font-bold">
                {seniorShare}% (${(seniorAmount / 1000000).toFixed(2)}M)
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="80"
              step="5"
              value={seniorShare}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSeniorShare(val);
                if (val + mezzanineShare + firstLossShare > 100) {
                  setMezzanineShare(Math.max(10, 100 - val - firstLossShare));
                }
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Coupon: {seniorCoupon}% p.a.</span>
              <span>Local Pension Eligible</span>
            </div>
          </div>

          {/* Mezzanine Tranche */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Mezzanine Subordinated</span>
              <span className="font-mono tabular-nums text-blue-400 font-bold">
                {mezzanineShare}% (${(mezzanineAmount / 1000000).toFixed(2)}M)
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="40"
              step="5"
              value={mezzanineShare}
              onChange={(e) => {
                const val = Number(e.target.value);
                setMezzanineShare(val);
                if (seniorShare + val + firstLossShare > 100) {
                  setSeniorShare(Math.max(40, 100 - val - firstLossShare));
                }
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Coupon: {mezzanineCoupon}% p.a.</span>
              <span>Pan-African DFI / Credit Funds</span>
            </div>
          </div>

          {/* First Loss Guarantee */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">First-Loss Guarantee Tranche</span>
              <span className="font-mono tabular-nums text-amber-400 font-bold">
                {firstLossShare}% (${(firstLossAmount / 1000000).toFixed(2)}M)
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="5"
              value={firstLossShare}
              onChange={(e) => {
                const val = Number(e.target.value);
                setFirstLossShare(val);
                if (seniorShare + mezzanineShare + val > 100) {
                  setSeniorShare(Math.max(40, 100 - mezzanineShare - val));
                }
              }}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Fee: {firstLossFee}%</span>
              <span>Illustrative Sovereign / DFI First-Loss Concept</span>
            </div>
          </div>

          {/* Residual Sovereign Anchor Equity */}
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Residual Sponsor / Anchor Equity:</span>
            <span className="font-mono font-bold text-slate-200">
              {sovereignAnchorShare}% (${(sovereignEquityAmount / 1000000).toFixed(2)}M)
            </span>
          </div>
        </div>

        {/* Stacked Waterfall Visualization */}
        <div className="lg:col-span-7 p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-white">Capital Structure Waterfall</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Loss absorption seniority from left to right (Equity/First-Loss absorbs first)
            </p>
          </div>

          {/* Visual Stacked Bar */}
          <div className="h-10 w-full rounded-xl overflow-hidden flex font-mono text-xs font-bold text-slate-950">
            {seniorShare > 0 && (
              <div
                style={{ width: `${seniorShare}%` }}
                className="bg-emerald-400 flex items-center justify-center transition-all px-2 truncate"
                title={`Senior Secured: ${seniorShare}%`}
              >
                Senior {seniorShare}%
              </div>
            )}
            {mezzanineShare > 0 && (
              <div
                style={{ width: `${mezzanineShare}%` }}
                className="bg-blue-400 flex items-center justify-center transition-all px-2 truncate"
                title={`Mezzanine: ${mezzanineShare}%`}
              >
                Mezz {mezzanineShare}%
              </div>
            )}
            {firstLossShare > 0 && (
              <div
                style={{ width: `${firstLossShare}%` }}
                className="bg-amber-400 flex items-center justify-center transition-all px-2 truncate"
                title={`First-Loss: ${firstLossShare}%`}
              >
                FL {firstLossShare}%
              </div>
            )}
            {sovereignAnchorShare > 0 && (
              <div
                style={{ width: `${sovereignAnchorShare}%` }}
                className="bg-rose-400 flex items-center justify-center transition-all px-2 truncate"
                title={`Sponsor Equity: ${sovereignAnchorShare}%`}
              >
                Eq {sovereignAnchorShare}%
              </div>
            )}
          </div>

          {/* Tranche Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
                Senior Secured Tranche
              </div>
              <div className="text-slate-300">
                Principal: ${(seniorAmount / 1000000).toFixed(2)}M USD
              </div>
              <div className="text-slate-400">
                Coupon: {seniorCoupon}% fixed quarterly cash distributions
              </div>
              <div className="text-slate-400">
                Security: 1st lien on industrial fixed assets & export dollar accounts
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="font-semibold text-blue-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 inline-block"></span>
                Mezzanine Yield Tranche
              </div>
              <div className="text-slate-300">
                Principal: ${(mezzanineAmount / 1000000).toFixed(2)}M USD
              </div>
              <div className="text-slate-400">
                Coupon: {mezzanineCoupon}% subordinated with equity kicker
              </div>
              <div className="text-slate-400">
                Security: 2nd lien + dividend blockage rights
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                Illustrative First-Loss Backstop
              </div>
              <div className="text-slate-300">
                Principal: ${(firstLossAmount / 1000000).toFixed(2)}M USD
              </div>
              <div className="text-slate-400">
                Concept: Illustrative credit enhancement mechanism (simulated)
              </div>
              <div className="text-slate-400">
                Condition: Absorbs initial {firstLossShare}% losses prior to Senior impairment
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
              <div className="font-semibold text-rose-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span>
                Sponsor / Anchor Equity
              </div>
              <div className="text-slate-300">
                Principal: ${(sovereignEquityAmount / 1000000).toFixed(2)}M USD
              </div>
              <div className="text-slate-400">
                Return Target: 18-22% IRR at liquidity event
              </div>
              <div className="text-slate-400">
                Voting: Board representation & negative covenant vetoes
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
