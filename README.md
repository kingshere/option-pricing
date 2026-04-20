# Option Pricing Terminal

> A professional-grade options pricing calculator built with React + Vite, implementing three industry-standard pricing models with real-time Greeks computation and simulation visualizations.

![Option Pricing Terminal](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![Recharts](https://img.shields.io/badge/Recharts-2-22B5BF?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Features

- **Three Pricing Models** — Black-Scholes, Monte Carlo Simulation, Binomial Tree
- **Live Option Greeks** — Delta, Gamma, Theta, Vega, Rho (where analytically available)
- **Distribution Chart** — Visualize simulated terminal price distributions (Monte Carlo) or intrinsic payoff profiles
- **Interactive Controls** — Sliders for volatility, risk-free rate, and simulation count; stepper buttons for strike price
- **Dark Terminal UI** — Professional financial terminal aesthetic built with Space Mono + DM Sans
- **Put-Call Parity Check** — Automatic |Call − Put| difference display for model sanity checking
- **Responsive Design** — Works on desktop and tablet

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite 5 |
| Charting | Recharts 2 |
| Fonts | Google Fonts (Space Mono, DM Sans) |
| Styling | Vanilla CSS with CSS Variables |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/option-pricing.git
cd option-pricing

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview    # preview the production build locally
```

---

## Project Structure

```
option-pricing/
├── index.html                  # Entry HTML, loads Google Fonts
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Top-level state, model dispatch
    ├── App.css                 # Global styles, CSS variables, layout
    ├── components/
    │   ├── Sidebar.jsx         # Model selector panel
    │   ├── PricingForm.jsx     # Input controls (ticker, strike, sliders)
    │   ├── ResultsPanel.jsx    # Prices, Greeks cards, chart wrapper
    │   └── SimulationChart.jsx # Recharts bar chart component
    └── lib/
        ├── blackScholes.js     # Analytical BS formula + Greeks
        ├── monteCarlo.js       # Box-Muller GBM simulation + histogram
        └── binomial.js         # CRR binomial tree + finite-diff Greeks
```

---

## Pricing Models

### Black-Scholes Model
Closed-form analytical solution for European option pricing. Assumes constant volatility, continuous trading, and log-normal price distribution. Provides exact Delta, Gamma, Theta, Vega, and Rho.

### Monte Carlo Simulation
Simulates thousands of random price paths using Geometric Brownian Motion (Box-Muller transform). Accuracy improves with more simulations (configurable from 100 to 100,000). Best for visualizing the terminal price distribution.

### Binomial Tree (CRR)
Cox-Ross-Rubinstein discrete lattice model. Builds a recombining price tree and works backwards to compute the option price. Greeks are estimated via finite differences on the tree.

---

## Usage Guide

1. **Select a pricing method** from the left sidebar
2. **Enter a ticker symbol** — the app auto-fills a reference spot price
3. **Set the strike price** using the input field or ± steppers
4. **Adjust the sliders** for risk-free rate, volatility, and (for Monte Carlo) number of simulations
5. **Pick an exercise date** using the date picker
6. **Click "Calculate Price"** to compute call/put prices, Greeks, and render the chart

---

## Variable Reference

| Symbol | Name | Description |
|---|---|---|
| S | Spot Price | Current market price of the underlying asset |
| K | Strike Price | Price at which the option can be exercised |
| T | Time to Expiry | Years remaining until the option expires |
| r | Risk-Free Rate | Annualized rate of return on a risk-free investment |
| σ (sigma) | Volatility | Annualized standard deviation of the asset's log-returns |
| N(·) | Normal CDF | Cumulative distribution function of the standard normal |
| Δ | Delta | Rate of change of option price with respect to S |
| Γ | Gamma | Rate of change of Delta with respect to S |
| Θ | Theta | Rate of change of option price with respect to time |
| ν (Vega) | Vega | Sensitivity of option price to volatility |
| ρ | Rho | Sensitivity of option price to the risk-free rate |

---




