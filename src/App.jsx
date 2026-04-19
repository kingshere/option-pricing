import { useState } from 'react';
import Sidebar from './components/Sidebar';
import PricingForm from './components/PricingForm';
import ResultsPanel from './components/ResultsPanel';
import { blackScholes } from './lib/blackScholes';
import { monteCarlo } from './lib/monteCarlo';
import { binomial } from './lib/binomial';

export default function App() {
  const [method, setMethod]   = useState('montecarlo');
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastParams, setLastParams] = useState(null);

  const handleCalculate = (params) => {
    setLoading(true);
    setLastParams(params);
    // small timeout so UI can update before heavy computation
    setTimeout(() => {
      let res;
      if (method === 'blackscholes') res = blackScholes(params);
      else if (method === 'montecarlo') res = monteCarlo(params);
      else res = binomial(params);
      // attach params for chart generation
      res._spotPrice = params.S;
      res._T = params.T;
      res._r = params.r;
      res._sigma = params.sigma;
      setResult(res);
      setLoading(false);
    }, 50);
  };

  return (
    <div className="app">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner">
            <div className="spin-ring" />
            Running {method === 'montecarlo' ? 'simulations' : 'calculation'}…
          </div>
        </div>
      )}
      <Sidebar method={method} setMethod={setMethod} />
      <main className="main">
        <PricingForm method={method} onCalculate={handleCalculate} loading={loading} />
        <ResultsPanel result={result} method={method} strike={lastParams?.K} />
      </main>
    </div>
  );
}