# System & Financial Architecture: Berhane OS (PISCES 2.0)

## 1. Context & Purpose

The **Ethiopian Private Intermittent Securities Capital Exchange System (PISCES 2.0)** addresses the structural bottleneck facing emerging market private enterprises: the "missing middle" between restrictive commercial bank collateral lending and premature public IPO listings on exchanges.

Berhane OS provides the institutional software infrastructure that enables:
1. Systematic, quantitative risk underwriting via **Predictive IMM Scoring**.
2. Price discovery without continuous liquidity fragmentation via **Intermittent Call Auctions**.
3. Sovereign risk mitigation via **Multi-Tranche Capital Structuring**.
4. Statutory compliance verification under **ECMA Proclamation 1248/2021**.

---

## 2. Mathematical IMM Scoring Model

### 2.1 Dimensional Weights
The composite IMM Score $S \in [0, 100]$ is computed as:

$$S = \sum_{i=1}^{5} w_i \cdot s_i$$

Where:
* $w_{\text{CFP}} = 0.25$: Cash Flow Predictability
* $w_{\text{SFR}} = 0.25$: Sovereign & FX Resilience
* $w_{\text{GTQ}} = 0.20$: Governance & Transparency
* $w_{\text{IAM}} = 0.15$: Impact & Additionality
* $w_{\text{SLAV}} = 0.15$: Secondary Liquidity & Auction Depth

### 2.2 Macroeconomic Stress Recalibration
When macroeconomic stress parameters $(\Delta_{\text{FX}}, \Delta_{\text{Debt}}, \Delta_{\text{Inf}})$ are applied:

$$\text{NetFX}_{\text{Protection}} = \frac{\text{ExportShare} - \text{ImportCostExposure}}{100}$$

$$s'_{\text{SFR}} = \text{clamp}\left(15, 100, s_{\text{SFR}} \cdot \left(1 + \frac{\Delta_{\text{FX}}}{100} \cdot (1 - \max(0, \text{NetFX}_{\text{Protection}}))\right) + \delta_{\text{export}}\right)$$

$$s'_{\text{CFP}} = \text{clamp}\left(10, 100, s_{\text{CFP}} - \left( \frac{\Delta_{\text{Debt}}}{1000} \cdot \frac{\text{TotalDebt}}{\text{AnnualRevenue}} \cdot 15 + \frac{\Delta_{\text{Inf}}}{10000} \cdot 96 \right)\right)$$

### 2.3 Implied Default Probability & Coupon Spread
The 12-month forward default probability $P_{\text{def}}$ is modeled non-linearly:

$$P_{\text{def}}(S') = \max\left(0.4\%, \frac{(100 - S')^{1.6}}{60}\right)$$

Recommended spread over sovereign risk-free baseline:

$$\text{Spread}_{\text{bps}}(S') = \max\left(120\text{ bps}, (100 - S') \cdot 18.5\right)$$

---

## 3. Capital Structure Waterfall

Berhane OS structures each issuance into four complementary tranches:

```
[Senior Secured Tranche: 50% - 65%]  ---> Targeted at Pension Funds & Commercial Banks
       │
[Mezzanine Yield Tranche: 20% - 30%] ---> Targeted at Regional DFIs & Private Credit
       │
[First-Loss Sovereign Backstop: 10%]  ---> Funded by Ethiopian Investment Holdings (EIH)
       │
[Sponsor / Anchor Equity: 5% - 10%]  ---> Retained by Founders & Enterprise Sponsors
```

### 3.1 Blended Cost of Capital (WACC)

$$\text{WACC} = \sum_{k} \phi_k \cdot r_k$$

Where $\phi_k$ is the tranche percentage allocation and $r_k$ is the respective cost of capital. By incorporating a low-cost sovereign First-Loss Guarantee, the blended borrowing cost for productive Ethiopian enterprises is reduced from commercial rates ($\sim 18-22\%$) down to institutional ranges ($10-12\%$).

---

## 4. Intermittent Call Auction Mechanism

Instead of continuous continuous limit order books (CLOBs) that suffer from wide bid-ask spreads in illiquid emerging markets, PISCES utilizes periodic **Call Auctions**:
1. **Order Accumulation Period**: Qualified institutional buyers submit blind limit bids and offers over a 14-day window.
2. **Clearing Price Optimization**: At auction call, the clearing price $P^*$ is discovered where cumulative matched volume is maximized:

$$P^* = \arg\max_P \min(V_{\text{bid}}(P), V_{\text{ask}}(P))$$

3. **Settlement**: Execution settles on a Delivery-versus-Payment (DvP) basis through Central Securities Depository (CSD) accounts.

---

## 5. Regulatory Compliance Invariants (ECMA)

Under Ethiopian Capital Market Authority Directives:
* **Accredited Investor Moat**: All participants must satisfy QIB statutory criteria ($2M+ USD net investable assets).
* **Automated Audit Logs**: Every order, pricing run, and tranche adjustment generates an immutable compliance record.
* **Dual-Currency Integrity**: Transactions maintain matched onshore ETB and offshore hard-currency settlement vaults.
