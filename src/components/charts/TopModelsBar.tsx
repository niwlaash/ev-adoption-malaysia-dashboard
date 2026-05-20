import { useSummaryStats } from '../../hooks/useMetricsData';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function TopModelsBar() {
  const { data } = useSummaryStats();
  const modelData = data?.top_models || [];
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={modelData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" opacity={0.2} />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
          <YAxis type="category" dataKey="model" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ color: '#fff' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Registrations" barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
