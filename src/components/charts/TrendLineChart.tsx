import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function TrendLineChart({ data }: { data?: any[] }) {
  const chartData = (data && data.length > 0) ? data : [
    { month: 'Jan', current: 1200, previous: 800 },
    { month: 'Feb', current: 1500, previous: 900 },
    { month: 'Mar', current: 1800, previous: 1100 },
    { month: 'Apr', current: 2200, previous: 1300 },
    { month: 'May', current: 2800, previous: 1600 },
    { month: 'Jun', current: 3300, previous: 1900 },
    { month: 'Jul', current: 4100, previous: 2200 },
  ];

  return (
    <div className="h-[400px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="top" align="right" height={36}/>
          <Line 
            type="monotone" 
            dataKey="current" 
            name="2026 (Current)"
            stroke="#8b5cf6" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line 
            type="monotone" 
            dataKey="previous" 
            name="2025 (Previous)"
            stroke="#3b82f6" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
