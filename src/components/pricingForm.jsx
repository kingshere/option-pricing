import { useState, useEffect } from 'react';

const METHOD_LABELS = {
  blackscholes: 'Black-Scholes Model',
  montecarlo:   'Monte Carlo Simulation',
  binomial:     'Binomial Model',
};

// Simulated stock prices (static lookup for demo)
const MOCK_PRICES = {
  AAPL: 228.70, TSLA: 245.30, MSFT: 415.60, GOOGL: 178.40,
  AMZN: 205.80, META: 548.90, NVDA: 875.20, SPY: 532.10,
};

export default function PricingForm({ method, onCalculate, loading }) {
  const [ticker, setTicker]         = useState('AAPL');
  const [spotPrice, setSpotPrice]   = useState(228.70);
  const [strike, setStrike]         = useState(190);
  const [rfRate, setRfRate]         = useState(10);
  const [sigma, setSigma]           = useState(20);
  const [exerciseDate, setExerciseDate] = useState('2025-08-30');
  const [simulations, setSimulations]   = useState(10000);

  useEffect(() => {
    const p = MOCK_PRICES[ticker.toUpperCase()];
    if (p) setSpotPrice(p);
  }, [ticker]);

  const T = (() => {
    const ms = new Date(exerciseDate) - new Date();
    return Math.max(ms / (1000 * 60 * 60 * 24 * 365), 0.001);
  })();

  const handleSubmit = () => {
    onCalculate({
      S: spotPrice, K: strike, T,
      r: rfRate / 100, sigma: sigma / 100,
      simulations,
    });
  };

  const strikeMin = +(spotPrice * 0.5).toFixed(2);
  const strikeMax = +(spotPrice * 2).toFixed(2);

  return (
    <div>
      <div className="main-title">Option Pricing</div>
      <div className="main-subtitle">Pricing method: {METHOD_LABELS[method]}</div>

      <div className="form-grid">
        {/* Ticker */}
        <div className="field">
          <label>Ticker Symbol</label>
          <input
            type="text"
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            placeholder="e.g. AAPL"
          />
          <span className="field-hint">Enter the stock symbol (e.g., AAPL for Apple Inc.)</span>
          {MOCK_PRICES[ticker] && (
            <span className="live-badge">
              <span className="live-dot" />
              Current price of {ticker}: ${MOCK_PRICES[ticker].toFixed(2)}
            </span>
          )}
        </div>

        {/* Strike Price */}
        <div className="field">
          <label>Strike Price</label>
          <div className="price-row">
            <input
              type="number"
              value={strike}
              onChange={e => setStrike(+e.target.value)}
              min={strikeMin} max={strikeMax} step={0.5}
            />
            <button className="stepper-btn" onClick={() => setStrike(s => +(s - 1).toFixed(2))}>−</button>
            <button className="stepper-btn" onClick={() => setStrike(s => +(s + 1).toFixed(2))}>+</button>
          </div>
          <span className="field-hint">The price at which the option can be exercised. Range: ${strikeMin}–${strikeMax}</span>
        </div>

        {/* Risk-free Rate */}
        <div className="field">
          <label>Risk-free Rate (%)</label>
          <div className="slider-wrap">
            <div className="slider-val">{rfRate}</div>
            <input type="range" min={0} max={100} step={1} value={rfRate} onChange={e => setRfRate(+e.target.value)} />
            <div className="slider-labels"><span>0</span><span>100</span></div>
          </div>
          <span className="field-hint">The theoretical rate of return of an investment with zero risk. Usually based on government bonds.</span>
        </div>

        {/* Sigma */}
        <div className="field">
          <label>Sigma (Volatility) (%)</label>
          <div className="slider-wrap">
            <div className="slider-val">{sigma}</div>
            <input type="range" min={0} max={100} step={1} value={sigma} onChange={e => setSigma(+e.target.value)} />
            <div className="slider-labels"><span>0</span><span>100</span></div>
          </div>
          <span className="field-hint">A measure of the stock's price variability. Higher values indicate more volatile stocks.</span>
        </div>

        {/* Exercise Date */}
        <div className="field">
          <label>Exercise Date</label>
          <input
            type="date"
            value={exerciseDate}
            onChange={e => setExerciseDate(e.target.value)}
          />
          <span className="field-hint">The date when the option can be exercised</span>
        </div>

        {/* Simulations (only Monte Carlo) */}
        {method === 'montecarlo' && (
          <div className="field">
            <label>Number of Simulations</label>
            <div className="slider-wrap">
              <div className="slider-val">{simulations.toLocaleString()}</div>
              <input type="range" min={100} max={100000} step={100} value={simulations} onChange={e => setSimulations(+e.target.value)} />
              <div className="slider-labels"><span>100</span><span>100,000</span></div>
            </div>
            <span className="field-hint">The number of price paths to simulate. More simulations increase accuracy but take longer to compute.</span>
          </div>
        )}
      </div>

      <button className="calc-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Calculating…' : 'Calculate Price'}
      </button>
    </div>
  );
}