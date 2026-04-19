function randn() {
  // Box-Muller transform
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export function monteCarlo({ S, K, T, r, sigma, simulations = 10000 }) {
  let callSum = 0, putSum = 0;
  const paths = [];

  for (let i = 0; i < simulations; i++) {
    const z = randn();
    const ST = S * Math.exp((r - 0.5 * sigma ** 2) * T + sigma * Math.sqrt(T) * z);
    callSum += Math.max(ST - K, 0);
    putSum  += Math.max(K - ST, 0);
    if (i < 200) paths.push(ST); // sample paths for chart
  }

  const discount = Math.exp(-r * T);
  const call = discount * (callSum / simulations);
  const put  = discount * (putSum  / simulations);

  // Build histogram for chart
  const allPrices = [];
  for (let i = 0; i < 2000; i++) {
    const z = randn();
    allPrices.push(S * Math.exp((r - 0.5 * sigma ** 2) * T + sigma * Math.sqrt(T) * z));
  }
  allPrices.sort((a, b) => a - b);

  const bins = 40;
  const min = allPrices[0], max = allPrices[allPrices.length - 1];
  const step = (max - min) / bins;
  const histogram = Array.from({ length: bins }, (_, i) => ({
    price: +(min + i * step + step / 2).toFixed(2),
    count: 0,
  }));
  for (const p of allPrices) {
    const idx = Math.min(Math.floor((p - min) / step), bins - 1);
    histogram[idx].count++;
  }

  return { call, put, histogram, greeks: { delta: 'N/A', gamma: 'N/A', theta: 'N/A', vega: 'N/A', rho: 'N/A' } };
}