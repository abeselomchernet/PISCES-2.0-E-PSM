# Berhane OS: Predictive IMM Scoring & Capital Terminal
### PISCES 2.0 // Ethiopian & Pan-African Private Intermittent Securities Platform

[![ECMA Compliant](https://img.shields.io/badge/Regulatory-ECMA%20Proclamation%201248%2F2021-emerald)](https://ecma.gov.et)
[![Platform](https://img.shields.io/badge/Platform-PISCES%202.0-blue)](#)
[![License](https://img.shields.io/badge/License-Apache%202.0-slate)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](#)
[![Vite](https://img.shields.io/badge/Bundler-Vite%206-purple)](#)

---

## 🏛️ Executive Summary

**Berhane OS** is an institutional financial analytics and capital allocation terminal engineered for the **Ethiopian Private Intermittent Securities Capital Exchange System (PISCES 2.0)** and broader emerging capital markets. 

Operating under the statutory framework of the **Ethiopian Capital Market Authority (ECMA Proclamation 1248/2021)**, Berhane OS bridges high-growth productive private enterprises with Qualified Institutional Buyers (QIBs), Sovereign Wealth Funds (Ethiopian Investment Holdings), and Development Finance Institutions (DFIs) through **Predictive Impact Measurement & Management (IMM) Scoring** and structured **Intermittent Call Auctions**.

---

## 🎯 Key Innovation Modules

### 1. Predictive IMM Scoring Engine (`Ardi Engine`)
Evaluates enterprise issuance viability across five mathematically weighted dimensions:
* **Cash Flow Predictability (CFP - 25% wgt)**: Revenue trajectory, EBITDA margins, and Debt Service Coverage Ratio (DSCR).
* **Sovereign & FX Resilience (SFR - 25% wgt)**: Hard-currency export ratios, import substitution buffers, and tolerance to ETB/USD devaluation.
* **Governance & Transparency (GTQ - 20% wgt)**: Tier-1 statutory audit standards, board independence, and continuous disclosure compliance.
* **Impact & Additionality (IAM - 15% wgt)**: Quantifiable ESG additionality, smallholder outgrower integration, and domestic direct employment multipliers.
* **Secondary Intermittent Auction Depth (SLAV - 15% wgt)**: Projected bid-ask depth and clearing viability in scheduled call auctions.

$$\text{IMM Composite} = 0.25 \cdot \text{CFP} + 0.25 \cdot \text{SFR} + 0.20 \cdot \text{GTQ} + 0.15 \cdot \text{IAM} + 0.15 \cdot \text{SLAV}$$

### 2. Macro Stress-Testing & Sensitivity Heatmap
* **Real-Time Shock Simulation**: Model currency devaluation (0% to -50%), domestic debt interest surges (+0 to +600 bps), and inflation acceleration.
* **Dynamic Rating Migration**: Visualizes credit tier migration (Prime Institutional Tier-A $\ge 82$, High-Yield Tier-B $68-81$, Structured Anchor Required Tier-C $<68$).
* **Dual-Factor Heatmap**: Multi-scenario sensitivity grid mapping currency stress against interest rate spikes.

### 3. Intermittent Call Auction Trading Desk
* **Discrete Call Auctions**: Eliminates predatory continuous trading and high-frequency volatility for unlisted securities by aggregating institutional orders into scheduled bi-weekly clearing windows.
* **Order Book & DvP Settlement**: Matched bid-ask clearing protocol with Delivery-versus-Payment (DvP) integration backed by National Bank custody reserves.

### 4. Sovereign Crowd-In Tranche Structuring
* **Multi-Tranche Waterfall**: Senior Secured Debt, Mezzanine Yield, First-Loss Sovereign Backstop, and Anchor Equity.
* **Blended Cost of Capital Optimizer**: Calculates dynamic WACC and private capital mobilization multipliers (unlocking 5x–9x private institutional dollars per $1 of sovereign first-loss guarantee).

### 5. ECMA Regulatory Moat & Supervisory Console
* **Rule 144A Equivalent Restrictions**: Mandatory institutional accreditation enforcing minimum investable net worth thresholds ($2M+ USD).
* **Automated Audit Logging**: Real-time surveillance tracking FX surrender ratios, unhedged balance sheet liabilities, and intermittent auction clearing invariants.

---

## 📂 Project Architecture

```
/
├── src/
│   ├── components/
│   │   ├── Header.tsx                   # Top Bar Contract navigation
│   │   ├── MetricCards.tsx              # Pipeline KPI telemetry strip
│   │   ├── ImmScoringConsole.tsx        # Predictive IMM scoring & stress simulator
│   │   ├── IssuerDirectory.tsx          # High-density institutional pipeline grid
│   │   ├── AuctionDesk.tsx              # Intermittent call auction trading desk
│   │   ├── TrancheCapitalAllocation.tsx # Sovereign crowd-in WACC optimizer
│   │   ├── EcmaRegulatoryConsole.tsx    # Statutory compliance audit console
│   │   └── IssuerDetailModal.tsx        # Prospectus dossier & downloadable memorandum
│   ├── data/
│   │   └── mockData.ts                  # Institutional issuers, orders, and audit trail
│   ├── types/
│   │   └── index.ts                     # Strong TypeScript domain contracts
│   ├── utils/
│   │   └── immScoring.ts                # Mathematical stress engine & sensitivity logic
│   ├── App.tsx                          # Primary terminal container
│   ├── index.css                        # Tailwind v4 custom theme & typography
│   └── main.tsx                         # React entry point
├── metadata.json                        # Applet identity & permissions
├── index.html                           # Entry HTML & Plus Jakarta Sans / JetBrains Mono
├── package.json                         # Dependencies & build scripts
├── vite.config.ts                       # Vite configuration
├── ARCHITECTURE.md                      # Detailed technical architecture guide
└── README.md                            # Documentation
```

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/abeselomchernet/PISCES-2.0-E-PSM-Unity-Interface.git

# Navigate to the workspace
cd PISCES-2.0-E-PSM-Unity-Interface

# Install dependencies
npm install
```

### Running Locally

```bash
# Start Vite development server on port 3000
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview build locally
npm run preview
```

---

## 📊 Sector Pipeline Coverage

| Sector | Representative Issuer | Target Raise | FX Export Backing |
| :--- | :--- | :--- | :--- |
| **Agro-Industrial** | Awash Valley Agro-Industrial PLC | $24.5M USD | 78.5% |
| **Renewable Energy** | Rift Solar Grid & Storage Corp | $45.0M USD | 42.0% |
| **Cross-Border Logistics** | Red Sea Corridor Freight & Dry Port | $32.0M USD | 65.0% |
| **Financial Infrastructure** | Habesha Switch & Settlement Infrastructure | $18.0M USD | 22.0% |
| **Pharmaceuticals** | Horizon Active Pharma Ingredients (API) | $28.0M USD | 54.0% |
| **Specialty Export** | Yirgacheffe Single-Origin Highlands Co. | $15.5M USD | 94.0% |

---

## 📜 Regulatory Standard & Compliance

Berhane OS adheres to:
1. **Ethiopian Capital Market Authority (ECMA)** Proclamation No. 1248/2021.
2. **National Bank of Ethiopia (NBE)** Foreign Exchange Directives on export revenue retention.
3. **PISCES Intermittent Auction Standards**: Uniform price call auction discovery to mitigate illiquidity discounts.

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for details.
