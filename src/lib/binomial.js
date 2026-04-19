export function binomial({ S, K, T, r, sigma, steps = 200 }) {
  const dt = T / steps;
  const u  = Math.exp(sigma * Math.sqrt(dt));
  const d  = 1 / u;
  const p  = (Math.exp(r * dt) - d) / (u - d);
  const disc = Math.exp(-r * dt);

  // Terminal prices
  let prices = Array.from({ length: steps + 1 }, (_, i) =>
    S * Math.pow(u, steps - i) * Math.pow(d, i)
  );

  // Terminal payoffs
  let callVals = prices.map(price => Math.max(price - K, 0));
  let putVals  = prices.map(price => Math.max(K - price, 0));

  // Backward induction
  for (let i = steps - 1; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      callVals[j] = disc * (p * callVals[j] + (1 - p) * callVals[j + 1]);
      putVals[j]  = disc * (p * putVals[j]  + (1 - p) * putVals[j + 1]);
    }
  }

  // Approx greeks via finite diff
  const eps = S * 0.01;
  const up = binomialPrice(S + eps, K, T, r, sigma, steps);
  const dn = binomialPrice(S - eps, K, T, r, sigma, steps);
  const delta = (up.call - dn.call) / (2 * eps);
  const gamma = (up.call - 2 * callVals[0] + dn.call) / (eps ** 2);

  return {
    call: callVals[0],
    put:  putVals[0],
    greeks: {
      delta: delta.toFixed(4),
      gamma: gamma.toFixed(6),
      theta: 'N/A',
      vega:  'N/A',
      rho:   'N/A',
    }
  };
}

function binomialPrice(S, K, T, r, sigma, steps) {
  const dt = T / steps;
  const u  = Math.exp(sigma * Math.sqrt(dt));
  const d  = 1 / u;
  const p  = (Math.exp(r * dt) - d) / (u - d);
  const disc = Math.exp(-r * dt);
  let callVals = Array.from({ length: steps + 1 }, (_, i) =>
    Math.max(S * Math.pow(u, steps - i) * Math.pow(d, i) - K, 0)
  );
  for (let i = steps - 1; i >= 0; i--)
    for (let j = 0; j <= i; j++)
      callVals[j] = disc * (p * callVals[j] + (1 - p) * callVals[j + 1]);
  return { call: callVals[0] };
}