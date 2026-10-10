# Contributing to PISCES 2.0 — E-PSM Institutional Market Prototype

Thank you for your interest in contributing to **PISCES 2.0 — E-PSM Institutional Market Prototype**!

This project is a public prototype exploring intermittent private-securities market design, issuer analytics, stress scoring, auction workflows, structured-capital allocation, and regulatory-observer UX using synthetic/demo data.

---

## Development Workflow

### 1. Fork & Clone
1. Fork the repository to your GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/PISCES-2.0-E-PSM.git
   cd PISCES-2.0-E-PSM
   ```

### 2. Branch Naming Convention
* `feature/<short-description>`: New functionality (e.g. `feature/auction-depth-graph`)
* `fix/<short-description>`: Bug fixes (e.g. `fix/dscr-rounding-error`)
* `math/<short-description>`: Scoring model adjustments (e.g. `math/fx-stress-damping`)
* `docs/<short-description>`: Documentation improvements

### 3. Local Setup & Testing
Install dependencies and run the local development server:
```bash
npm install
npm run dev
```

Before submitting a PR, ensure code quality and build standards pass:
```bash
npm run lint     # Runs TypeScript type check
npm run build    # Compiles Vite production bundle
```

---

## Code & Design Standards

1. **TypeScript Strictness**: Always use explicit types. Avoid `any`. Standardize models in `/src/types/index.ts`.
2. **Domain-Specific UI**:
   - Tabular figures (`tabular-nums` / `font-mono`) for all monetary values, percentages, and counters.
   - Clean unboxed metadata with subtle typographic separators (`·` or `/`) instead of colored pill chips.
   - High-contrast, WCAG AA compliant color choices with dark slate backgrounds.
3. **Mathematical Invariants**: Any changes to `/src/utils/immScoring.ts` must preserve deterministic output and non-negative composite score clamps.

---

## Submitting a Pull Request

1. Push your branch to your fork.
2. Open a Pull Request against the `main` branch.
3. Fill out the PR template describing your changes and verification steps.
4. The CI pipeline will automatically run build and lint checks on your PR.
