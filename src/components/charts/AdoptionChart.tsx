import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const mockAdoptionData = [
  { month: 'Jan', y2025: 1200, y2026: 2800 },
  { month: 'Feb', y2025: 1400, y2026: 3100 },
  { month: 'Mar', y2025: 1600, y2026: 3400 },
  { month: 'Apr', y2025: 1800, y2026: 3900 },
  { month: 'May', y2025: 2200, y2026: 4200 },
  { month: 'Jun', y2025: 2400, y2026: 4800 },
  { month: 'Jul', y2025: 2800, y2026: 5200 },
];

export default function AdoptionChart() {
  return (
    <div className="h-[300px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockAdoptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="color2025" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="color2026" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area type="monotone" dataKey="y2025" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#color2025)" name="2025 Registrations" />
          <Area type="monotone" dataKey="y2026" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#color2026)" name="2026 Registrations" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
