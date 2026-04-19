import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function SimulationChart({ data, strike, method }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="chart-section">
      <div className="chart-title">
        {method === 'montecarlo' ? 'Simulated Terminal Price Distribution' : 'Option Price vs Strike (±40%)'}
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }}>
          <CartesianGrid stroke="#252a38" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="price" tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} interval={Math.floor(data.length / 6)} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 10, fontFamily: 'Space Mono' }} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{ background: '#13161e', border: '1px solid #252a38', borderRadius: 6, fontFamily: 'Space Mono', fontSize: 12 }}
            labelStyle={{ color: '#4cc9f0' }}
            itemStyle={{ color: '#e8eaf0' }}
          />
          <ReferenceLine x={strike} stroke="#e63946" strokeDasharray="4 3" label={{ value: 'K', fill: '#e63946', fontSize: 11, fontFamily: 'Space Mono' }} />
          <Bar dataKey="count" fill="#4cc9f0" fillOpacity={0.7} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}