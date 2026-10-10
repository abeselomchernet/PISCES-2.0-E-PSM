export type EligibilityStatus = 'Prototype Eligibility — Cleared' | 'Provisional Review' | 'Audit Review Complete';
export type EcmaStatus = EligibilityStatus; // Backwards-compatibility alias

export type ImmTier = 'Model Tier A' | 'Model Tier B' | 'Model Tier C';

export type Sector = 
  | 'Agro-Industrial'
  | 'Renewable Energy'
  | 'Cross-Border Logistics'
  | 'Financial Infrastructure'
  | 'Specialty Export'
  | 'Pharmaceutical & Healthcare';

export interface SubScores {
  cashFlowPredictability: number; // 0 - 100 (Weight: 25%)
  sovereignFxResilience: number;   // 0 - 100 (Weight: 25%)
  governanceTransparency: number;  // 0 - 100 (Weight: 20%)
  impactAdditionality: number;     // 0 - 100 (Weight: 15%)
  secondaryAuctionDepth: number;   // 0 - 100 (Weight: 15%)
}

export interface IssuerFinancials {
  annualRevenueUSD: number;
  revenueGrowthYoY: number;
  ebitdaMarginPct: number;
  debtServiceCoverageRatio: number;
  exportRevenueSharePct: number;
  importCostExposurePct: number;
  workingCapitalRunwayMonths: number;
  totalDebtUSD: number;
}

export interface TrancheBreakdown {
  seniorSecuredPct: number;
  seniorCouponRate: number;
  mezzaninePct: number;
  mezzanineCouponRate: number;
  firstLossGuaranteePct: number;
  sovereignAnchorPct: number;
}

export interface Issuer {
  id: string;
  name: string;
  ticker: string;
  sector: Sector;
  region: string;
  vintageYear: number;
  targetRaiseUSD: number;
  targetRaiseETB: number;
  preMoneyValuationUSD: number;
  eligibilityStatus: EligibilityStatus;
  ecmaStatus?: EligibilityStatus; // Optional alias for compatibility
  immScore: number; // composite 0 - 100
  immTier: ImmTier;
  subScores: SubScores;
  financials: IssuerFinancials;
  tranches: TrancheBreakdown;
  summary: string;
  impactMetrics: {
    directJobsSupported: number;
    smallholderSourcingCount: number;
    co2OffsetTonsPerYear: number;
    fxInflowGeneratedUSD: number;
  };
  auditPartner: string;
  nextAuctionDate: string;
  historicalScores: { quarter: string; score: number }[];
  projectedScores: { quarter: string; score: number }[];
}

export interface ImmStressParameters {
  fxDevaluationShockPct: number; // e.g. -25%
  inflationSurgeBps: number;     // e.g. +350 bps
  exportTariffFrictionPct: number; // e.g. -5%
  debtCostSpikeBps: number;      // e.g. +200 bps
  climateDisruptionFactorPct: number; // e.g. -10%
}

export interface AuctionOrder {
  id: string;
  investorName: string;
  investorType: 'QIB Pension' | 'Sovereign Wealth' | 'Regional DFI' | 'Private Equity Syndication';
  type: 'BID' | 'ASK';
  securityTicker: string;
  unitPriceUSD: number;
  volumeUnits: number;
  totalValueUSD: number;
  timestamp: string;
  status: 'Matched' | 'Pending Call' | 'Simulated DvP';
}

export interface RegulatoryObserverLog {
  id: string;
  directiveCode: string;
  subject: string;
  entityName: string;
  auditScope: string;
  timestamp: string;
  complianceRating: 'COMPLIANT' | 'FLAGGED_EXCESS_FX' | 'UNDER_REVIEW' | 'RE-AUDIT_CLEARED';
  auditorId: string;
}

export type EcmaAuditLog = RegulatoryObserverLog; // Backwards-compatibility alias
