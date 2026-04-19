const METHODS = [
  { id: 'blackscholes', label: 'Black-Scholes Model' },
  { id: 'montecarlo',   label: 'Monte Carlo Simulation' },
  { id: 'binomial',     label: 'Binomial Model' },
];

export default function Sidebar({ method, setMethod }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Pricing Method</div>
      {METHODS.map(m => (
        <button
          key={m.id}
          className={`sidebar-btn ${method === m.id ? 'active' : ''}`}
          onClick={() => setMethod(m.id)}
        >
          <span className="dot" />
          {m.label}
        </button>
      ))}
    </aside>
  );
}