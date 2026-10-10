import React, { useState } from 'react';
import { X, ExternalLink, BookOpen, Compass, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quickstart' | 'glossary' | 'boundary'>('quickstart');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="guide-title" className="text-lg font-semibold text-white tracking-tight">
                  Prototype Orientation & Architecture Guide
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                PISCES 2.0 — E-PSM Institutional Market Prototype
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close guide"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 px-6 bg-slate-950/30 text-xs font-medium">
          <button
            onClick={() => setActiveTab('quickstart')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'quickstart'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Quick Start
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'glossary'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Glossary & Terminology
          </button>
          <button
            onClick={() => setActiveTab('boundary')}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'boundary'
                ? 'border-emerald-400 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Prototype Boundary
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed text-slate-300">
          {/* TAB 1: QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-5">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-400 text-xs">
                This guide describes the five interactive modules available in the prototype. All calculations, orders, and audits run client-side on synthetic demo records.
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center">1</span>
                    IMM Scoring Console
                  </div>
                  <p className="text-slate-300 pl-7">
                    Select any synthetic issuer and adjust macroeconomic stress sliders (ETB foreign exchange devaluation, debt service spikes, and domestic CPI inflation). The console recalculates the deterministic 5-factor weighted IMM score and generates a sensitivity heatmap in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center">2</span>
                    Issuer Directory
                  </div>
                  <p className="text-slate-300 pl-7">
                    Search, filter by sector, and sort the pipeline of synthetic private issuers. Inspect financial ratios (such as Debt Service Coverage Ratio and export revenue shares), review audit partners, and open complete term sheet dossiers.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center">3</span>
                    Auction Desk
                  </div>
                  <p className="text-slate-300 pl-7">
                    Inspect a synthetic order book across qualified investor types (such as pension funds and DFIs) and stage new simulated bid or ask orders. The desk executes an illustrative uniform clearing-price matching routine on local demo orders.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center">4</span>
                    Tranche Structuring
                  </div>
                  <p className="text-slate-300 pl-7">
                    Model structured capital waterfalls across Senior Secured, Mezzanine, and First-Loss Guarantee layers. Adjust tranche allocation sliders to observe the blended Weighted Average Cost of Capital (WACC) and the private capital mobilization multiplier.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-950/30 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-white">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs flex items-center justify-center">5</span>
                    Regulatory Observer
                  </div>
                  <p className="text-slate-300 pl-7">
                    Explore a simulated supervisory-observer interface with synthetic surveillance logs, eligibility controls, and prototype invariant checks designed with reference to Ethiopian Capital Market Authority (ECMA) private placement context.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <p className="text-slate-400 text-xs">
                Key terms and abbreviations used in this market-design prototype. Architecture concepts that are conceptual or proposed are explicitly labeled.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">PISCES</div>
                  <div className="text-[11px] text-slate-300">
                    Private Intermittent Securities and Capital Exchange System. UK-origin market concept adapted here for intermittent emerging-market private equity/debt auctions.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">E-PSM</div>
                  <div className="text-[11px] text-slate-300">
                    Ethiopian Private Securities Market. Research concept for intermittent auction liquidity in unlisted growth and productive enterprises.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">IMM</div>
                  <div className="text-[11px] text-slate-300">
                    Intermittent Market Mechanism. A periodic call-auction market design combining multi-factor stress analysis with batch clearing instead of continuous trading.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">BPAS</div>
                  <div className="text-[11px] text-slate-300">
                    Bi-currency Preference Allocation Structure. A structured debt/equity concept explored in the prototype; not an active market facility.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-amber-400 font-mono text-xs">WALTB (Conceptual Architecture)</div>
                  <div className="text-[11px] text-slate-300">
                    Warehouse Asset-Backed Liquidity & Tranche Backstop. A structured-capital concept used in the prototype architecture; not a live sovereign or institutional facility.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-amber-400 font-mono text-xs">BTLF (Proposed Architecture)</div>
                  <div className="text-[11px] text-slate-300">
                    Bi-currency Treasury Liquidity Facility. A proposed architecture concept exploring ETB and foreign-currency liquidity structures; not deployed infrastructure.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-amber-400 font-mono text-xs">SGFC (Conceptual Architecture)</div>
                  <div className="text-[11px] text-slate-300">
                    Sovereign Guaranteed Financial Corridor (SGFC). A conceptual architecture term exploring a structured institutional/cross-border financial corridor. No sovereign guarantee, government commitment, live corridor, or institutional deployment is represented by this prototype.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-amber-400 font-mono text-xs">CCAS (Proposed Architecture)</div>
                  <div className="text-[11px] text-slate-300">
                    Cross-Currency Asset Settlement. A proposed settlement architecture concept; no live settlement rail or clearinghouse is connected.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">QIB</div>
                  <div className="text-[11px] text-slate-300">
                    Qualified Institutional Buyer (QIB). A U.S.-origin institutional-investor classification used here as market-design shorthand/reference for sophisticated institutional participation. It should not be interpreted as an ECMA-issued Ethiopian legal classification or accreditation.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">DFI</div>
                  <div className="text-[11px] text-slate-300">
                    Development Finance Institution. Multilateral or bilateral finance institutions modelled as illustrative junior risk absorbers or mezzanine investors.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-rose-400 font-mono text-xs">ECMA (Regulatory Context Only)</div>
                  <div className="text-[11px] text-slate-300">
                    Ethiopian Capital Market Authority. Referenced as statutory regulatory context (Proclamation No. 1248/2021). This prototype is not operated, approved, certified, or endorsed by ECMA.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-rose-400 font-mono text-xs">NBE (Context Only)</div>
                  <div className="text-[11px] text-slate-300">
                    National Bank of Ethiopia. Central banking context referenced for foreign exchange and monetary parameters. No NBE integration exists.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-rose-400 font-mono text-xs">CSD (External Concept)</div>
                  <div className="text-[11px] text-slate-300">
                    Central Securities Depository. External market infrastructure concept for electronic securities registration; not connected to this prototype.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">DvP (Simulated)</div>
                  <div className="text-[11px] text-slate-300">
                    Delivery versus Payment. A securities settlement principle where securities transfer occurs only if payment occurs. In this prototype, DvP states are entirely simulated.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">DSCR</div>
                  <div className="text-[11px] text-slate-300">
                    Debt Service Coverage Ratio. Measure of annual operational cash flow available to service principal and interest obligations (EBITDA / Total Debt Service).
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">WACC</div>
                  <div className="text-[11px] text-slate-300">
                    Weighted Average Cost of Capital. Blended financing cost across senior debt, mezzanine, and first-loss equity or guarantee tranches.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">FX & ETB</div>
                  <div className="text-[11px] text-slate-300">
                    Foreign Exchange & Ethiopian Birr. Used in dual-currency pipeline raise targets and macroeconomic devaluation stress simulations.
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-1">
                  <div className="font-semibold text-emerald-400 font-mono text-xs">Model Tier A / B / C</div>
                  <div className="text-[11px] text-slate-300">
                    Internal prototype score thresholds based on the deterministic IMM algorithm; not external credit ratings or credit agency opinions.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROTOTYPE BOUNDARY */}
          {activeTab === 'boundary' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-sm text-rose-300">
                  <ShieldAlert className="w-4 h-4" />
                  Prototype & Evidence Boundary Notice
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  PISCES 2.0 is an academic and product-design prototype demonstrating market design concepts for unlisted enterprise finance. The following technical and legal boundaries apply unconditionally:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">100% Synthetic / Demo Data</div>
                    <div className="text-slate-400 text-[11px]">All issuer financials, order entries, and surveillance logs are mock records created for simulation.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">No Live Securities or Issuance</div>
                    <div className="text-slate-400 text-[11px]">No real securities are offered, listed, registered, or issued through this system.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">No Live Capital Allocation</div>
                    <div className="text-slate-400 text-[11px]">No capital is committed, escrowed, or transferred. Orders represent simulated inputs only.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">No Live DvP Settlement</div>
                    <div className="text-slate-400 text-[11px]">Order settlement is simulated locally; no clearinghouse, RTGS, or payment gateway is integrated.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">No Regulatory Integrations</div>
                    <div className="text-slate-400 text-[11px]">No active API or operational integration exists with ECMA, NBE, or any banking authority.</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-200">No External Institutional Endorsement</div>
                    <div className="text-slate-400 text-[11px]">Participant categories (e.g., pension funds, DFIs) are illustrative generic types; no real entity participates.</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/30 text-slate-400 text-[11px]">
                <strong className="text-slate-200">Analytical Disclaimer:</strong> IMM scores are deterministic prototype model calculations derived from user-configured weighted parameters. They do not constitute investment advice, credit ratings, underwriting decisions, or regulatory accreditations.
              </div>
            </div>
          )}

          {/* Section 7: External Documentation Links */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Reference & Documentation Links
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <a
                href="https://github.com/abeselomchernet/PISCES-2.0-E-PSM"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-800 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900 transition-colors flex items-center justify-between text-xs text-slate-300 hover:text-emerald-300 group"
              >
                <span>Full Technical Documentation</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
              </a>

              <a
                href="https://www.academia.edu/167307737/Architecting_Alpha_Through_Illiquidity_A_Dual_Sided_Failure_Diagnosis_and_Innovation_Bridge_Blueprint_for_an_Ethiopian_Private_Securities_Exchange_E_PSM_?source=swp_share"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-800 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900 transition-colors flex items-center justify-between text-xs text-slate-300 hover:text-emerald-300 group"
              >
                <span>Research Foundation</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
              </a>

              <a
                href="https://abeselomchernet.github.io/abeselom-source-of-truth/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg border border-slate-800 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900 transition-colors flex items-center justify-between text-xs text-slate-300 hover:text-emerald-300 group"
              >
                <span>Professional Source of Truth</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>PUBLIC PROTOTYPE · SYNTHETIC DATA ONLY</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
