 ### Option Pricing 
 A high-performance financial dashboard built with React and Vite. This terminal allows users to calculate theoretical option prices and Greeks using three industry-standard mathematical models.
 
 ### 🚀Features
 ### Three Pricing Engines:Black-Scholes: 
 Analytical model for European options.
 ### Monte Carlo Simulation: 
 Path-based simulation using the Box-Muller transform.
 ### Binomial Model: 
 Discrete-time Cox-Ross-Rubinstein tree implementation.
 
 ### Real-time Greeks: 
 Computes Delta, Gamma, Theta, Vega, and Rho (model dependent).Dynamic Visualizations: Responsive charts using recharts to display terminal price distributions or price-vs-strike profiles.Live-style Pricing: Integrated mock ticker lookup for major assets like AAPL, TSLA, and NVDA.
 
 ### 🛠️ Tech StackFramework: React 18.3 Build Tool: Vite Data Viz: Recharts Styling: Custom CSS with CSS Variables for theme management 
 
 ### 📂 Project Structure
├── src/
│   ├── components/
│   │   ├── PricingForm.jsx      # Parameter inputs (Strike, Vol, etc.) [cite: 82]
│   │   ├── ResultsPanel.jsx     # Option price and Greeks display [cite: 107]
│   │   ├── Sidebar.jsx          # Model selection navigation [cite: 116]
│   │   └── SimulationChart.jsx  # Recharts implementation [cite: 119]
│   ├── lib/
│   │   ├── blackScholes.js      # Analytical pricing logic [cite: 146]
│   │   ├── monteCarlo.js        # Simulation logic [cite: 160]
│   │   └── binomial.js          # Tree-based logic 
│   └── App.jsx                  # Main state and calculation orchestrator [cite: 60]


### ⚙️ Mathematical EnginesBlack-ScholesCalculates European option prices using the standard normal cumulative distribution function.
$$d_1 = \frac{\ln(S/K) + (r + \frac{\sigma^2}{2})T}{\sigma\sqrt{T}}$$Monte CarloSimulates price paths based on Geometric Brownian Motion. It supports up to 100,000 simulations for increased accuracy.Binomial ModelUses a 200-step tree approach. Greeks like Delta and Gamma are approximated via finite difference methods (S ± 1%).
