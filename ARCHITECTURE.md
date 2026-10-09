# Technical & Financial Architecture: PISCES 2.0 // Berhane OS

## 1. Statutory Context & Institutional Design

Under the **Ethiopian Capital Market Authority (ECMA) Proclamation No. 1248/2021**, private capital formation in Ethiopia requires a structured architecture that protects qualified market participants while enabling capital mobilization for non-listed enterprises. 

**PISCES 2.0 (Ethiopian Private Intermittent Securities Capital Exchange System)** replaces continuous public order books with an **Intermittent Market Mechanism (IMM)**:
* High-frequency and retail speculation are eliminated through discrete, scheduled call auctions.
* Sovereign and multilateral balance sheets are integrated as **First-Loss Guarantees (WALTB)**, de-risking senior debt for institutional pension and commercial bank reserves.
* Cross-border foreign exchange frictions are mitigated through the **Bi-currency Treasury Liquidity Facility (BTLF)** and **Cross-Currency Asset Settlement (CCAS)** protocol.

---

## 2. Platform Component Matrix

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PISCES 2.0 CORE RUNTIME                         │
├────────────────────────────────┬───────────────────────────────────────┤
│ Pillar                         │ Specification & Responsibility        │
├────────────────────────────────┼───────────────────────────────────────┤
│ Ardi Engine                    │ Tri-Alpha credit scoring & predictive │
│                                │ IMM stress-testing models             │
├────────────────────────────────┼───────────────────────────────────────┤
│ BPAS                           │ Bilateral Private Asset Syndication:  │
│                                │ term sheet structuring & underwriting │
├────────────────────────────────┼───────────────────────────────────────┤
│ WALTB                          │ Warehouse Asset-Backed Liquidity &    │
│                                │ Tranche Backstop: first-loss cushion  │
├────────────────────────────────┼───────────────────────────────────────┤
│ BTLF                           │ Bi-currency Treasury Liquidity        │
│                                │ Facility: ETB/USD custody & hedging   │
├────────────────────────────────┼───────────────────────────────────────┤
│ SGFC                           │ Sovereign Guaranteed Financial        │
│                                │ Corridor: regional DFI coordination   │
├────────────────────────────────┼───────────────────────────────────────┤
│ BGC                            │ Berhane Governance Council: sovereign │
│                                │ treasury & budget oversight           │
├────────────────────────────────┼───────────────────────────────────────┤
│ CCAS                           │ Cross-Currency Asset Settlement:      │
│                                │ dual-vault Delivery-versus-Payment    │
└────────────────────────────────┴───────────────────────────────────────┘
```

---

## 3. Mathematical Models & Invariants

### 3.1 Ardi Tri-Alpha Formulation
The Ardi Intelligence Engine computes a comprehensive Tri-Alpha score for every syndicated asset or issuer vector:

$$\alpha_{\text{total}} = 0.40 \cdot \alpha_{\text{operational}} + 0.30 \cdot \alpha_{\text{resilience}} + 0.30 \cdot \alpha_{\text{behavioral}}$$

* $\alpha_{\text{operational}}$: Cash flow velocity, debt service coverage ratio (DSCR), and audited operational margins.
* $\alpha_{\text{resilience}}$: Macroeconomic stress tolerance, export hard-currency generation, and climate/input supply buffers.
* $\alpha_{\text{behavioral}}$: Historical covenant adherence, governance transparency, and reporting timeliness.

### 3.2 Predictive IMM Composite Scoring
Issuance viability is derived from five standardized, weighted dimensions:

$$S_{\text{IMM}} = \sum_{k=1}^5 w_k \cdot s_k$$

$$\begin{aligned}
S_{\text{IMM}} = \; & 0.25 \cdot \text{CashFlowPredictability} \\
                  + \; & 0.25 \cdot \text{SovereignFxResilience} \\
                  + \; & 0.20 \cdot \text{GovernanceTransparency} \\
                  + \; & 0.15 \cdot \text{ImpactAdditionality} \\
                  + \; & 0.15 \cdot \text{SecondaryAuctionDepth}
\end{aligned}$$

### 3.3 Dynamic Macroeconomic Stress Engine
When stress parameters (FX devaluation shock $\Delta_{\text{FX}}$, local debt cost surge $\Delta_{\text{Debt}}$, inflation surge $\Delta_{\text{Inf}}$) are simulated:

$$s'_{\text{SFR}} = \text{clamp}\left(15, 100, s_{\text{SFR}} \cdot \left(1 + \frac{\Delta_{\text{FX}}}{100} \cdot (1 - \max(0, \text{NetFX}_{\text{Protection}}))\right) + \delta_{\text{export}}\right)$$

$$s'_{\text{CFP}} = \text{clamp}\left(10, 100, s_{\text{CFP}} - \left(\frac{\Delta_{\text{Debt}}}{1000} \cdot \frac{\text{TotalDebt}}{\text{AnnualRevenue}} \cdot 15 + \frac{\Delta_{\text{Inf}}}{10000} \cdot 96 \right)\right)$$

### 3.4 WALTB Tranche Waterfall & WACC Optimization
To crowd private capital into productive syndications, WALTB deploys structured capital waterfalls:

$$\text{WACC} = \sum_{j} \phi_j \cdot r_j$$

$$\begin{aligned}
\text{WACC} = \; & \phi_{\text{Senior}} \cdot r_{\text{Senior}} \\
               + \; & \phi_{\text{Mezzanine}} \cdot r_{\text{Mezzanine}} \\
               + \; & \phi_{\text{FirstLoss}} \cdot r_{\text{GuaranteeFee}} \\
               + \; & \phi_{\text{Equity}} \cdot r_{\text{EquityCost}}
\end{aligned}$$

**Private Capital Multiplier**:
$$M_{\text{crowd-in}} = \frac{\phi_{\text{Senior}} + \phi_{\text{Mezzanine}}}{\phi_{\text{FirstLoss}}}$$

A 10% sovereign first-loss backstop enables a mobilization multiplier of $8.5\times$ in qualified private institutional debt.

---

## 4. Intermittent Call Auction Mechanics

Instead of continuous limit order books that suffer from thin liquidity and price manipulation in emerging private markets, PISCES executes discrete call auctions:

1. **Order Accumulation Phase**: Accredited QIBs place blind limit orders (BIDs and ASKs) during an open window.
2. **Clearing Price Maximization**: The auction engine discovers the uniform clearing price $P^*$ maximizing executed volume:

$$P^* = \arg\max_P \min\left(\sum_{i: P_i^{\text{bid}} \ge P} V_i^{\text{bid}}, \sum_{j: P_j^{\text{ask}} \le P} V_j^{\text{ask}}\right)$$

3. **DvP Settlement**: Cash and security legs settle simultaneously across the Central Securities Depository (CSD) and National Bank clearing accounts.

---

## 5. Security & Regulatory Invariants

1. **ECMA Certification Moat**: Every transaction, quote, or syndication term sheet requires an active ECMA accreditation certificate.
2. **Privacy-Preserving DID Vectors**: Sovereign credit queries operate on zero-knowledge hashed identifiers pursuant to PDPP Proclamation 1321/2024.
3. **Immutable Audit Logs**: Every pricing run, order match, and tranche adjustment writes to the ECMA supervisory audit trail.
