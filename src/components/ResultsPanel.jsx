import SimulationChart from './SimulationChart';

export default function ResultsPanel({ result, method, strike }) {
  if (!result) return null;
  const { call, put, greeks, histogram } = result;

  // Build chart data for BS / Binomial: call price across strike range
  let chartData = histogram || [];
  if (!histogram && result._spotPrice) {
    const S = result._spotPrice, T = result._T, r = result._r, sigma = result._sigma;
    // Simple payoff profile
    chartData = Array.from({ length: 40 }, (_, i) => {
      const k = S * (0.6 + i * 0.02);
      const intrinsic = Math.max(S - k, 0);
      return { price: +k.toFixed(0), count: +intrinsic.toFixed(2) };
    });
  }

  return (
    <div className="results">
      <div className="results-header">── Pricing Results</div>

      <div className="results-cards">
        <div className="card call">
          <div className="card-label">Call Option Price</div>
          <div className="card-val">${call.toFixed(4)}</div>
          <div className="card-sub">Right to buy at strike</div>
        </div>
        <div className="card put">
          <div className="card-label">Put Option Price</div>
          <div className="card-val">${put.toFixed(4)}</div>
          <div className="card-sub">Right to sell at strike</div>
        </div>
        <div className="card">
          <div className="card-label">Put-Call Parity Check</div>
          <div className="card-val" style={{ color: 'var(--warn)', fontSize: 18 }}>
            ${Math.abs(call - put).toFixed(4)}
          </div>
          <div className="card-sub">|Call − Put| difference</div>
        </div>
      </div>

      {greeks && Object.keys(greeks).length > 0 && greeks.delta !== 'N/A' && (
        <>
          <div className="results-header" style={{ marginBottom: 12 }}>── Option Greeks</div>
          <div className="greeks-grid">
            {Object.entries(greeks).map(([name, val]) => (
              <div key={name} className="greek-chip">
                <div className="greek-name">{name.toUpperCase()}</div>
                <div className="greek-val">{val}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <SimulationChart data={chartData} strike={strike} method={method} />
    </div>
  );
}