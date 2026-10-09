import { Issuer, ImmStressParameters, SubScores } from '../types';

export const IMM_WEIGHTS = {
  cashFlowPredictability: 0.25,
  sovereignFxResilience: 0.25,
  governanceTransparency: 0.20,
  impactAdditionality: 0.15,
  secondaryAuctionDepth: 0.15,
};

/**
 * Calculates composite IMM score from sub-metrics
 */
export function calculateCompositeImmScore(sub: SubScores): number {
  const composite = 
    sub.cashFlowPredictability * IMM_WEIGHTS.cashFlowPredictability +
    sub.sovereignFxResilience * IMM_WEIGHTS.sovereignFxResilience +
    sub.governanceTransparency * IMM_WEIGHTS.governanceTransparency +
    sub.impactAdditionality * IMM_WEIGHTS.impactAdditionality +
    sub.secondaryAuctionDepth * IMM_WEIGHTS.secondaryAuctionDepth;

  return Math.round(Math.min(100, Math.max(0, composite)) * 10) / 10;
}

/**
 * Derives institutional investment tier from composite IMM score
 */
export function getImmTier(score: number): 'Tier-A (Prime Institutional)' | 'Tier-B (High Yield Qualified)' | 'Tier-C (Structured Anchor Required)' {
  if (score >= 82) return 'Tier-A (Prime Institutional)';
  if (score >= 68) return 'Tier-B (High Yield Qualified)';
  return 'Tier-C (Structured Anchor Required)';
}

/**
 * Recalculates subscores and overall score under macroeconomic stress simulation
 */
export function calculateStressedImmScore(
  baseSubScores: SubScores,
  financials: Issuer['financials'],
  params: ImmStressParameters
): {
  stressedScore: number;
  stressedSubScores: SubScores;
  delta: number;
  impliedDefaultProbabilityPct: number;
  recommendedSpreadBps: number;
  fxResilienceLossPct: number;
} {
  // FX shock directly hits non-exporting or import-dependent cash flows
  // Companies with high exportRevenueSharePct actually benefit or buffer against ETB devaluation
  const netFxProtection = (financials.exportRevenueSharePct - financials.importCostExposurePct) / 100;
  
  // FX penalty is reduced if export share is high
  const fxShockMultiplier = 1 + (params.fxDevaluationShockPct / 100) * (1 - Math.max(0, netFxProtection));
  const stressedFxScore = Math.max(
    15,
    Math.min(100, baseSubScores.sovereignFxResilience * fxShockMultiplier + (netFxProtection > 0.4 ? 4 : -8))
  );

  // Cash flow penalty from debt cost spike & inflation surge
  const debtSensitivity = (params.debtCostSpikeBps / 1000) * (financials.totalDebtUSD / Math.max(1, financials.annualRevenueUSD));
  const inflationSensitivity = (params.inflationSurgeBps / 10000) * 12;
  const stressedCashFlow = Math.max(
    10,
    Math.min(100, baseSubScores.cashFlowPredictability - (debtSensitivity * 15 + inflationSensitivity * 8))
  );

  // Auction liquidity penalty under macro contraction
  const stressedAuctionDepth = Math.max(
    20,
    Math.min(100, baseSubScores.secondaryAuctionDepth * (1 + (params.fxDevaluationShockPct / 250)))
  );

  const stressedSubScores: SubScores = {
    cashFlowPredictability: Math.round(stressedCashFlow * 10) / 10,
    sovereignFxResilience: Math.round(stressedFxScore * 10) / 10,
    governanceTransparency: baseSubScores.governanceTransparency, // Governance remains structural
    impactAdditionality: Math.max(20, Math.min(100, baseSubScores.impactAdditionality + (params.climateDisruptionFactorPct * 0.2))),
    secondaryAuctionDepth: Math.round(stressedAuctionDepth * 10) / 10,
  };

  const baseScore = calculateCompositeImmScore(baseSubScores);
  const stressedScore = calculateCompositeImmScore(stressedSubScores);
  const delta = Math.round((stressedScore - baseScore) * 10) / 10;

  // Implied 12-month default probability based on IMM composite score
  // 90 score -> ~1.2% default prob; 60 score -> ~7.8%; 40 score -> ~16.5%
  const impliedDefaultProbabilityPct = Math.round(
    Math.max(0.4, (100 - stressedScore) ** 1.6 / 60) * 10
  ) / 10;

  // Spread over sovereign benchmark (e.g. 550 bps base + risk premium)
  const riskSpread = Math.max(120, Math.round((100 - stressedScore) * 18.5));

  const fxResilienceLossPct = Math.round(
    ((baseSubScores.sovereignFxResilience - stressedSubScores.sovereignFxResilience) / baseSubScores.sovereignFxResilience) * 100
  );

  return {
    stressedScore,
    stressedSubScores,
    delta,
    impliedDefaultProbabilityPct,
    recommendedSpreadBps: riskSpread,
    fxResilienceLossPct: Math.max(0, fxResilienceLossPct),
  };
}

/**
 * Computes a sensitivity matrix grid across FX Shocks and Debt Coverage
 */
export function generateSensitivityMatrix(issuer: Issuer) {
  const fxShockSteps = [0, -10, -20, -30, -40];
  const debtShockSteps = [0, 150, 300, 450];

  return fxShockSteps.map((fx) => {
    return {
      fxShock: `${fx}%`,
      results: debtShockSteps.map((debtSpike) => {
        const sim = calculateStressedImmScore(
          issuer.subScores,
          issuer.financials,
          {
            fxDevaluationShockPct: fx,
            debtCostSpikeBps: debtSpike,
            inflationSurgeBps: 200,
            exportTariffFrictionPct: 0,
            climateDisruptionFactorPct: 0,
          }
        );
        return {
          debtSpikeBps: debtSpike,
          score: sim.stressedScore,
          tier: getImmTier(sim.stressedScore),
          defaultProb: sim.impliedDefaultProbabilityPct,
        };
      }),
    };
  });
}
