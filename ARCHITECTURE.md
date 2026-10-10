# Technical & Financial Architecture: PISCES 2.0 (E-PSM)

This document delineates the market-design rationale, current software implementation, mathematical formulations, target architecture, and evidentiary boundaries of the **PISCES 2.0 — E-PSM Institutional Market Prototype**.

---

## 1. Market-Design Rationale

Under the framework of emerging capital markets—such as Ethiopia's regulatory environment referencing the **Capital Market Proclamation No. 1248/2021**—private enterprises and institutional investors face a structural dual-sided failure:

1. **Continuous Trading Fragility**: Continuous limit order book (CLOB) models require deep, high-frequency liquidity, market makers, and dense order flow. In nascent markets, continuous trading produces fragmented books, excessive bid-ask spreads, and heightened vulnerability to price distortion.
2. **The Intermittent Alternative**: The **Intermittent Market Mechanism (IMM)** aggregates liquidity into concentrated, periodic clearing windows (e.g., bi-weekly or monthly). Order flow is pooled, order books remain unrevealed during accumulation, and a uniform price discovery mechanism clears all overlapping volume simultaneously.
3. **Credit Enhancement via Structured Waterfalls**: To crowd risk-averse domestic capital (pension funds, insurance reserves) into productive private debt, capital structures can incorporate first-loss cushions and development finance guarantees to insulate senior secured tranches.

---

## 2. Current Implemented Prototype

The current software repository is a **client-side interactive React/TypeScript prototype** mounted in `src/App.tsx`. It provides five functional workspace views:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PISCES 2.0 WORKSPACE                              │
├──────────────────────────┬──────────────────────────────────────────────────┤
│ Module                   │ Implementation Nature & Current Role             │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ IMM Scoring Console      │ Deterministic weighted multi-factor calculation  │
│                          │ and interactive macroeconomic stress simulator   │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Issuer Directory         │ Searchable, filterable synthetic pipeline of     │
│                          │ private debt and asset-backed issuance dossiers  │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Intermittent Auction Desk│ Local client-side order staging and order book   │
│                          │ interface with simulated call execution          │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Tranche Capital Waterfall│ Interactive WACC and leverage simulator for      │
│                          │ multi-tiered institutional debt structures       │
├──────────────────────────┼──────────────────────────────────────────────────┤
│ Regulatory Observer UX   │ Surveillance console demonstrating compliance    │
│                          │ event logs, invariant alerts, and review statuses│
└──────────────────────────┴──────────────────────────────────────────────────┘
```

---

## 3. Analytical & Scoring Logic

The scoring engine evaluates issuers using transparent, deterministic arithmetic implemented in `src/utils/immScoring.ts`.

### 3.1 Composite IMM Score (Implemented Formula)

Issuers are scored across five standardized dimensions:

$$\text{Composite Score } S_{\text{IMM}} = \sum_{k=1}^5 w_k \cdot s_k$$

$$\begin{aligned}
S_{\text{IMM}} = \; & 0.25 \cdot s_{\text{CFP}} & \text{(Cash Flow Predictability)} \\
                  + \; & 0.25 \cdot s_{\text{SFR}} & \text{(Sovereign \& FX Resilience)} \\
                  + \; & 0.20 \cdot s_{\text{GTQ}} & \text{(Governance \& Disclosure Quality)} \\
                  + \; & 0.15 \cdot s_{\text{IAM}} & \text{(Impact \& Additionality)} \\
                  + \; & 0.15 \cdot s_{\text{SLAV}} & \text{(Secondary Auction Viability)}
\end{aligned}$$

*Status: **IMPLEMENTED***. Evaluated deterministically in `calculateCompositeImmScore()`.

### 3.2 Macroeconomic Stress Scenario Calculation (Prototype Calculation)

When user-controlled macroeconomic shocks are applied, sub-dimension scores are recalculated dynamically:

- **Net Foreign Exchange Protection**:
  $$\text{NetFX} = \frac{\text{ExportShare}_{\%} - \text{ImportExposure}_{\%}}{100}$$

- **Stressed Sovereign & FX Resilience**:
  $$s'_{\text{SFR}} = \text{clamp}\left(15, 100, s_{\text{SFR}} \cdot \left(1 + \frac{\Delta_{\text{FX}}}{100} \cdot (1 - \max(0, \text{NetFX}))\right) + \delta_{\text{export}}\right)$$

- **Stressed Cash Flow Predictability**:
  $$s'_{\text{CFP}} = \text{clamp}\left(10, 100, s_{\text{CFP}} - \left(\frac{\Delta_{\text{Debt}}}{1000} \cdot \frac{\text{TotalDebt}}{\text{AnnualRevenue}} \cdot 15 + \frac{\Delta_{\text{Inf}}}{10000} \cdot 96 \right)\right)$$

*Status: **IMPLEMENTED PROTOTYPE***. Implemented in `calculateStressedImmScore()`.

### 3.3 Conceptual Tri-Alpha Formulation (Illustrative Equation / Research Concept)

The research paper outlines a high-level conceptual formulation for long-term multi-dimensional alpha:

$$\alpha_{\text{total}} = 0.40 \cdot \alpha_{\text{operational}} + 0.30 \cdot \alpha_{\text{resilience}} + 0.30 \cdot \alpha_{\text{behavioral}}$$

*Status: **CONCEPTUAL***. Represents foundational research intent; not explicitly computed as an isolated runtime variable in the prototype.

---

## 4. Current Auction Implementation

In the current code (`src/components/AuctionDesk.tsx`):
- Users can review a pre-populated order book containing mock bids and asks.
- Users can stage new limit orders via a modal form, updating local component state.
- Clicking **"Simulate Auction Call"** updates pending orders to `'Matched'` status and triggers an informational banner.
- Order books can be exported as structured CSV or JSON files.

*Status: **SIMULATED / PARTIAL***. The current desk demonstrates order staging and workflow states; it does not run a live market-clearing algorithm across order books.

---

## 5. Target Auction Architecture (Proposed / Research)

The target market architecture described in the research paper envisions an automated intermittent call auction mechanism:

### 5.1 Order Accumulation
Accredited buyers and sellers submit blind limit orders into an unrevealed book during a multi-day accumulation window, eliminating predatory front-running and flash liquidity withdrawal.

### 5.2 Uniform Clearing-Price Discovery (Target Architecture Equation)
At the scheduled auction close, the engine solves for the single clearing price $P^*$ that maximizes total executable volume:

$$P^* = \arg\max_P \min\left(\sum_{i: P_i^{\text{bid}} \ge P} V_i^{\text{bid}}, \sum_{j: P_j^{\text{ask}} \le P} V_j^{\text{ask}}\right)$$

All matched trades execute at this single uniform clearing price $P^*$, ensuring fair price treatment across all participants within the window.

*Status: **PROPOSED / TARGET ARCHITECTURE***.

---

## 6. Structured Capital & Tranche Concepts

In `src/components/TrancheCapitalAllocation.tsx`, the prototype models how blended finance can lower the weighted average cost of capital (WACC) for productive enterprises:

### 6.1 Blended WACC (Implemented Prototype Calculation)

$$\text{WACC} = \phi_{\text{Senior}} \cdot r_{\text{Senior}} + \phi_{\text{Mezz}} \cdot r_{\text{Mezz}} + \phi_{\text{FirstLoss}} \cdot r_{\text{FLFee}} + \phi_{\text{Equity}} \cdot r_{\text{Equity}}$$

Where:
- $\phi_j$ is the allocation percentage for tranche $j$.
- $r_j$ is the respective coupon rate or fee.

### 6.2 Modelled Private Capital Ratio (Implemented Prototype Calculation)

$$M_{\text{crowd-in}} = \frac{\phi_{\text{Senior}} + \phi_{\text{Mezzanine}}}{\max(1, \phi_{\text{FirstLoss}})}$$

*Status: **IMPLEMENTED PROTOTYPE***. Provides interactive visual exploration of credit enhancement economics. It models conceptual first-loss structures; it does not reflect actual capital allocations or sovereign guarantees.

---

## 7. Regulatory-Observer Design

In `src/components/EcmaRegulatoryConsole.tsx`, the prototype models a regulatory observer terminal:
- Displays simulated compliance audit logs linked to reference directives.
- Features mock supervisory alerts for invariant breaches (e.g., minimum cash flow coverage or stress score degradation).
- Allows triggering synthetic audit records to observe event log workflows.

*Status: **SIMULATED***. Designed with reference to the regulatory context of Ethiopia's capital market frameworks, but operates entirely client-side without regulatory authority integration.

---

## 8. Proposed Future Integrations

The research blueprint outlines several external infrastructure integrations that are **not implemented** in the current prototype:

1. **Central Securities Depository (CSD)**: Electronic security ledger for ownership transfer and primary registrar confirmation.
2. **National Bank of Ethiopia (NBE) & Clearing Systems**: Dual-currency Delivery-versus-Payment (DvP) settlement reconciling ETB and offshore USD accounts.
3. **Decentralized Identifier (DID) / Institutional Accreditation**: Zero-knowledge or cryptographic accreditation credentials verifying QIB status.
4. **Direct API Regulatory Surveillance**: Live regulatory audit ingestion feed.

---

## 9. Capability & Status Matrix

| Concept / Pillar | Classification | Current Implementation Status |
| :--- | :--- | :--- |
| **IMM Composite Scoring** | IMPLEMENTED | Deterministic weighted formula in `src/utils/immScoring.ts`. |
| **Macro Stress Simulation** | IMPLEMENTED | Sensitivity formulas and 2D matrix calculation. |
| **Issuer Directory** | IMPLEMENTED | Synthetic data search, sector filter, sorting, and modal view. |
| **Tranche Waterfall Modeller**| IMPLEMENTED | Dynamic WACC and crowd-in ratio calculator. |
| **Data Export (CSV/JSON)** | IMPLEMENTED | Native browser download utilities in `src/utils/exportUtils.ts`. |
| **Order Staging Desk** | PARTIAL | Client-side order book and staged order submission. |
| **Auction Call Matching** | SIMULATED | Static demonstration of clearing state transition. |
| **Regulatory Observer Console**| SIMULATED | Mock compliance log viewer and synthetic event generator. |
| **Uniform Price Engine ($P^*$)**| PROPOSED | Mathematical formulation documented; engine not implemented. |
| **BPAS Syndication Facility** | CONCEPTUAL | Represented by synthetic term sheets and financial profiles. |
| **WALTB First-Loss Backstop**| CONCEPTUAL | Modelled in tranche sliders; no live sovereign facility. |
| **BTLF Dual-Currency Vault** | CONCEPTUAL | Simulated in mock profiles; no live currency accounts. |
| **SGFC Logistics Corridor** | CONCEPTUAL | Modelled as synthetic issuer dossier. |
| **BGC Governance Oversight** | CONCEPTUAL | Research institutional design concept. |
| **CCAS DvP Settlement Protocol**| NOT IMPLEMENTED | Research settlement design; no live banking connection. |
| **Central Securities Depository**| NOT IMPLEMENTED | No connection to any depository or ledger. |
| **Distributed Ledger / ZK Proofs**| NOT IMPLEMENTED | Pure React SPA without blockchain or cryptographic proofs. |

---

## 10. Evidence Boundaries

1. **No Production Claims**: This repository is a research prototype. It must never be described as a live trading platform, licensed exchange, or production clearing house.
2. **No Institutional Endorsement**: The prototype does not operate under an official mandate from the Ethiopian Capital Market Authority (ECMA) or the National Bank of Ethiopia (NBE).
3. **Deterministic Logic**: All scoring models are deterministic and rule-based; they do not utilize black-box machine learning, trained neural networks, or empirical credit default ratings.
4. **Illustrative Data**: All figures, company names, tickers, financial metrics, and transaction values are synthetic demonstration data.
