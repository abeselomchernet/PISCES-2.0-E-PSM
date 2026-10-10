# PISCES 2.0 — E-PSM Institutional Market Prototype

**PISCES 2.0 (Ethiopian Private Intermittent Securities Capital Exchange System)** is a public software prototype exploring intermittent private-securities market design, issuer analytics, macroeconomic stress scoring, auction workflows, structured-capital allocation, and regulatory-observer user experience using synthetic/demo data.

> **PUBLIC PROTOTYPE / SIMULATION**  
> This repository demonstrates selected market-design and analytical workflows using synthetic/demo data. It is not a licensed securities exchange, live settlement infrastructure, regulator-operated platform, or production financial service.

---

## Live Prototype

Interactive demonstration deployment:  
👉 **https://pisces-2-0-e-psm-hazel.vercel.app/**

---

## Research Foundation

This prototype represents downstream software exploration grounded in the independent research manuscript:

> **“Architecting Alpha Through Illiquidity: A Dual-Sided Failure Diagnosis and Innovation Bridge Blueprint for an Ethiopian Private Securities Exchange (E-PSM)”**  
> Author: Abeselom Chernet  
> Public Research Working Paper: [Academia.edu Repository](https://www.academia.edu/167307737/Architecting_Alpha_Through_Illiquidity_A_Dual_Sided_Failure_Diagnosis_and_Innovation_Bridge_Blueprint_for_an_Ethiopian_Private_Securities_Exchange_E_PSM_?source=swp_share)  
> *(Note: This working paper represents independent market-design research; it is not peer-reviewed or journal-published, and academic exploration of economic mechanisms does not constitute proof or validation of production software functionality).*

The underlying research analyzes:
- **Dual-Sided Market Failure**: Why early-stage capital formation in emerging economies simultaneously starves private enterprises of long-term funding while depriving institutional capital of viable, de-risked unlisted assets.
- **Innovation Bridge**: How structured private-market mechanisms can bridge the gap between bank loans and a full public stock exchange.
- **Intermittent Market Mechanism (IMM)**: Replacing continuous public order books—which suffer from illiquidity, wide spreads, and volatility in emerging markets—with discrete, periodic trading windows.
- **Data Asymmetry Flywheel**: Standardized disclosures and structured scoring models to mitigate private-market information opacity.

---

## Problem Being Explored

1. **Private Market Illiquidity & Governance**: Institutional investors (such as pension reserves and regional development finance institutions) require governance transparency, standardized risk assessments, and defined exit windows before allocating capital to unlisted private enterprises.
2. **Public Market Listing Burdens**: Growth-stage enterprises in emerging economies often lack the multi-year public track record or scale required for continuous public listing on an exchange.
3. **Market Structure Intermediate**: E-PSM explores whether concentrated, intermittent auction windows combined with structured first-loss credit enhancements can provide an intermediate private capital venue.

---

## What This Prototype Demonstrates

The codebase implements a functional, client-side institutional interface demonstrating:

1. **Institutional Issuer Directory**: Search, sector filtering, and multi-factor sorting across synthetic enterprise dossiers.
2. **Issuer Dossier & Prospectus Modal**: Detailed drill-down into financial metrics, debt service coverage, export earnings share, and synthetic ESG metrics with JSON prospectus export.
3. **IMM Analytical Scoring Prototype**: Deterministic weighted composite scoring across five core dimensions (Cash Flow Predictability, Sovereign FX Resilience, Governance & Transparency, Impact Additionality, Secondary Auction Depth).
4. **Macroeconomic Scenario Stress Simulator**: Interactive stress parameter sliders (ETB currency devaluation shocks, domestic interest rate surges, CPI acceleration, climate/supply friction) computing stressed scores, score deltas, and indicative spread adjustments.
5. **Dual-Factor Sensitivity Heatmap**: Dynamic 2D matrix evaluating issuer score resilience across combinations of foreign exchange shocks and debt cost spikes.
6. **Intermittent Auction Order Desk (Simulation)**: Staging interface for institutional limit orders (BIDs/ASKs) with simulated periodic clearing status and order book export (CSV/JSON).
7. **Tranche Structuring & Blended Yield Modelling**: Interactive capital waterfall simulator calculating blended WACC and illustrative private capital crowd-in ratios for senior, mezzanine, first-loss, and sponsor equity tranches.
8. **Regulatory Observer UX (Prototype)**: Supervisory dashboard illustrating disclosure surveillance logs, compliance ratings, and simulated invariant verification records.

---

## Implementation Status

| Capability | Status | Evidence Boundary |
| :--- | :--- | :--- |
| **Issuer Directory** | IMPLEMENTED | Uses synthetic/demo issuer datasets; no real companies or securities. |
| **IMM Analytical Scoring** | IMPLEMENTED PROTOTYPE | Deterministic weighted arithmetic model; not an accredited credit rating or predictive ML model. |
| **Macro Stress Scenarios** | IMPLEMENTED PROTOTYPE | Deterministic scenario stress formulas; scenario exploration, not economic forecasting. |
| **Sensitivity Grid** | IMPLEMENTED | Client-side 2D calculation grid across FX and debt cost parameters. |
| **Auction Order Desk** | PARTIAL / SIMULATED | Order staging and order book UI with local client state; auction call execution is simulated demonstration (fixed clearing message), not algorithmic matching engine. |
| **Uniform Clearing-Price Engine** | PROPOSED / TARGET ARCHITECTURE | Algorithmic maximization of executable volume ($P^*$) is described in research; not implemented in current code. |
| **Tranche Waterfall Modelling** | IMPLEMENTED PROTOTYPE | Client-side mathematical WACC and leverage formula; does not represent actual investor commitments or sovereign guarantees. |
| **Regulatory Observer UX** | SIMULATED | Client-side mock surveillance log; no API or integration with Ethiopian Capital Market Authority (ECMA). |
| **CSD / Central Depository Settlement** | NOT IMPLEMENTED (TARGET ARCHITECTURE) | No integration with Central Securities Depository (CSD), National Bank of Ethiopia (NBE), or commercial clearing accounts. |
| **DLT / Cryptographic Verification** | NOT IMPLEMENTED (TARGET ARCHITECTURE) | Client-side React state; no blockchain, smart contracts, or cryptographic proofs. |

---

## Current Application Architecture

The application is structured as a unified institutional single-page console in `src/App.tsx`:

```
src/App.tsx (Master Layout & State)
├── Header.tsx (Navigation & Public Prototype Status Badge)
├── MetricCards.tsx (Illustrative Aggregate KPI Overview)
├── Dynamic Tab Views:
│   ├── ImmScoringConsole.tsx (Analytical Scoring & Macroeconomic Stress Grid)
│   ├── IssuerDirectory.tsx (Pipeline Directory, Filters & Search)
│   ├── AuctionDesk.tsx (Order Staging & Simulated Clearing Workflow)
│   ├── TrancheCapitalAllocation.tsx (Interactive Capital Waterfall & Blended Yield)
│   └── RegulatoryObserverConsole.tsx (Regulatory Observer UX & Simulated Surveillance Log)
├── IssuerDetailModal.tsx (Detailed Term Sheet Dossier & Prospectus Download)
└── Footer (Regulatory Context Reference & Prototype Notice)
```

---

## Target / Research Architecture

The broader E-PSM research blueprint explores several advanced infrastructure components that are designated as **Proposed / Target Architecture** beyond the current prototype:

1. **Algorithmic Call Auction Matching**: Discrete uniform clearing price discovery maximizing executed volume ($P^* = \arg\max_P \min(V_{\text{bid}}, V_{\text{ask}})$) without dealer front-running.
2. **DvP Settlement Interfacing**: Bilateral Delivery-versus-Payment integration with national banking switches and central securities depositories.
3. **Dual-Currency Custody Rails**: Formal foreign exchange custody accounts separating offshore USD investor capital from local ETB operational currency.
4. **Institutional Accreditation Gate**: Formal cryptographic verification of Qualified Institutional Buyer (QIB) accreditation prior to order entry.

---

## Evidence Boundaries

To maintain strict evidentiary integrity, all users and reviewers should note:

- **Synthetic Data**: All issuers, financial statements, tickers, order books, and surveillance records are purely illustrative mock data.
- **No Live Venues**: PISCES 2.0 is not a licensed exchange, alternative trading system (ATS), or multilateral trading facility (MTF).
- **No Real Transactions**: No actual capital is committed, transferred, cleared, or settled through this software.
- **No Regulatory Endorsement**: References to the Ethiopian Capital Market Authority (ECMA Proclamation 1248/2021) and National Bank of Ethiopia (NBE) describe the legal and economic context being studied; they do not imply approval, endorsement, deployment, or operation by any authority.
- **Deterministic Math**: Scoring models are rule-based weighted calculations designed for transparent scenario inspection, not predictive artificial intelligence or validated credit ratings.

---

## Technology Stack

- **Runtime & Bundler**: Vite 8, Node.js, TypeScript ^7.0.2 (ES2022)
- **UI Framework**: React 19, Tailwind CSS v4
- **Icons & Motion**: Lucide React, Motion
- **Data Export**: Native client-side CSV / JSON generators (RFC 4180 compliant)

---

## Run Locally

```bash
# Clone the repository
git clone https://github.com/abeselomchernet/PISCES-2.0-E-PSM.git

# Navigate to workspace
cd PISCES-2.0-E-PSM

# Install clean dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

To verify type safety and production build:

```bash
npm run lint     # Strict TypeScript type check (tsc --noEmit)
npm run build    # Compiles production distribution bundle
```

---

## Research & Project Links

- **E-PSM Research Working Paper**: [Academia.edu Repository](https://www.academia.edu/167307737/Architecting_Alpha_Through_Illiquidity_A_Dual_Sided_Failure_Diagnosis_and_Innovation_Bridge_Blueprint_for_an_Ethiopian_Private_Securities_Exchange_E_PSM_?source=swp_share)
- **Live Prototype Deployment**: [Vercel Deployment](https://pisces-2-0-e-psm-hazel.vercel.app/)
- **Broader BERHANE OS Architecture Laboratory**: [GitHub Repository](https://github.com/abeselomchernet/FMI-Proof-BERHANE-OS-Sovereign-Studio-V9.1.0)
- **Professional Source of Truth**: [Abeselom Chernet — Source of Truth](https://abeselomchernet.github.io/abeselom-source-of-truth/)

---

## License

This project is licensed under the [Apache License 2.0](LICENSE).
