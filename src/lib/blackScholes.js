// Standard normal CDF approximation
function normalCDF(x) {
  const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);
  return 0.5 * (1.0 + sign * y);
}

function normalPDF(x) {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

export function blackScholes({ S, K, T, r, sigma }) {
  if (T <= 0) return { call: Math.max(S - K, 0), put: Math.max(K - S, 0), greeks: {} };
  const d1 = (Math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  const call = S * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
  const put  = K * Math.exp(-r * T) * normalCDF(-d2) - S * normalCDF(-d1);

  const delta_call = normalCDF(d1);
  const delta_put  = delta_call - 1;
  const gamma = normalPDF(d1) / (S * sigma * Math.sqrt(T));
  const theta_call = (-(S * normalPDF(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normalCDF(d2)) / 365;
  const theta_put  = (-(S * normalPDF(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normalCDF(-d2)) / 365;
  const vega  = S * normalPDF(d1) * Math.sqrt(T) / 100;
  const rho_call = K * T * Math.exp(-r * T) * normalCDF(d2) / 100;
  const rho_put  = -K * T * Math.exp(-r * T) * normalCDF(-d2) / 100;

  return {
    call, put,
    greeks: {
      delta: delta_call.toFixed(4),
      gamma: gamma.toFixed(6),
      theta: theta_call.toFixed(4),
      vega:  vega.toFixed(4),
      rho:   rho_call.toFixed(4),
    }
  };
}