import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

export interface MakeRecord {
  make: string;
  count: number;
  share?: number;
}

interface TopMakesChartProps {
  data: MakeRecord[];
  titleSuffix?: string;
}

export const TopMakesChart: React.FC<TopMakesChartProps> = ({ data, titleSuffix }) => {
  const topMakes = (data || []).slice(0, 7);
  const totalTopCount = topMakes.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-5 shadow-2xs h-full flex flex-col justify-between transition-colors">

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Top EV Car Brands {titleSuffix && <span className="text-neutral-400 font-normal">{titleSuffix}</span>}
        </h2>
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[10px]">
          Top 7
        </span>
      </div>

      {/* Horizontal Bar Chart */}
      <div className="h-[280px] w-full pt-3">
        {topMakes.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topMakes}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
              <XAxis
                type="number"
                stroke="#9CA3AF"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
                className="tabular-nums"
              />
              <YAxis
                type="category"
                dataKey="make"
                stroke="#374151"
                fontSize={11}
                fontWeight={600}
                tickLine={false}
                axisLine={false}
                width={85}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const entry = payload[0];
                    const count = Number(entry.value);
                    const share = totalTopCount > 0 ? ((count / totalTopCount) * 100).toFixed(1) : 0;
                    return (
                      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded p-2.5 shadow-md text-xs">
                        <p className="font-bold text-neutral-900 dark:text-neutral-100">{entry.payload.make}</p>
                        <p className="text-neutral-600 dark:text-neutral-400 mt-1 tabular-nums font-mono">
                          Registrations: <strong className="text-neutral-900 dark:text-neutral-100">{count.toLocaleString()}</strong>
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-medium tabular-nums font-mono">
                          Segment Share: {share}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="count"
                name="Registrations"
                fill="#15803D"
                radius={[0, 2, 2, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-xs text-neutral-400">
            No brand records for selected filter
          </div>
        )}
      </div>

      {/* Clean footer line */}
      <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex justify-between font-mono">
        <span>Verified JPJ unit counts</span>
        <span>Relative OEM share</span>
      </div>

    </div>
  );
};

export default TopMakesChart;
