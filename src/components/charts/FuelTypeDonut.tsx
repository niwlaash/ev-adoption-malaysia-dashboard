import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const mockFuelData = [
  { name: 'Petrol', value: 850000, color: '#f43f5e' },
  { name: 'Hybrid', value: 125000, color: '#3b82f6' },
  { name: 'Electric', value: 42500, color: '#8b5cf6' },
  { name: 'Diesel', value: 95000, color: '#f59e0b' },
];

export default function FuelTypeDonut() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={mockFuelData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={110}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {mockFuelData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
            formatter={(value) => new Intl.NumberFormat('en-MY').format(value as number)}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
