import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { year: '2022', Electric: 5, Hybrid: 15, ICE: 80 },
  { year: '2023', Electric: 12, Hybrid: 22, ICE: 66 },
  { year: '2024', Electric: 24, Hybrid: 28, ICE: 48 },
  { year: '2025', Electric: 38, Hybrid: 32, ICE: 30 },
  { year: '2026 (Est)', Electric: 45, Hybrid: 35, ICE: 20 },
];

export default function MarketShareChart() {
  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis dataKey="year" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="top" align="right" height={36}/>
          <Bar dataKey="Electric" fill="#8b5cf6" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="Hybrid" fill="#3b82f6" stackId="a" radius={[0, 0, 0, 0]} />
          <Bar dataKey="ICE" fill="#333" stackId="a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
