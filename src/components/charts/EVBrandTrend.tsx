import { useSummaryStats } from '../../hooks/useMetricsData';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'];

export default function EVBrandTrend() {
    const { data } = useSummaryStats();
    const trendData = data?.make_trends || [];

    // Get unique keys that are not month, year, or date_sort
    const brands = trendData.length > 0
        ? Object.keys(trendData[0]).filter(k => !['month', 'year', 'date_sort'].includes(k))
        : [];

    return (
        <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
                    <XAxis
                        dataKey="date_sort"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        tickFormatter={(val) => {
                            const [y, m] = val.split('-');
                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                            return `${months[parseInt(m) - 1]} ${y}`;
                        }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    {brands.map((brand, index) => (
                        <Line
                            key={brand}
                            type="monotone"
                            dataKey={brand}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                            name={brand}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
