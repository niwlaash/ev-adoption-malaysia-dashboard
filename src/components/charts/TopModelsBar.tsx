import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const mockModelData = [
  { model: 'Tesla Model 3', count: 4200 },
  { model: 'Tesla Model Y', count: 3800 },
  { model: 'BYD Atto 3', count: 3500 },
  { model: 'BYD Seal', count: 2900 },
  { model: 'smart #1', count: 1800 },
];

export default function TopModelsBar() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart layout="vertical" data={mockModelData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#333" opacity={0.2} />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
          <YAxis type="category" dataKey="model" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
          <Tooltip 
            cursor={{fill: 'rgba(255,255,255,0.05)'}}
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
          />
          <Bar dataKey="count" fill="#6366f1" radius={[0, 4, 4, 0]} name="Registrations" barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
