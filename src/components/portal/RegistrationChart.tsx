import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RegistrationDataPoint {
  period: string; // e.g. "2022Q1"
  bev: number;
  hybrid: number;
  total_ev: number;
}

interface RegistrationChartProps {
  data: RegistrationDataPoint[];
  titleSuffix?: string;
}

export const RegistrationChart: React.FC<RegistrationChartProps> = ({ data, titleSuffix }) => {
  const [chartType, setChartType] = useState<'stacked' | 'lines'>('stacked');

  const formattedData = (data || []).map((item) => ({
    ...item,
    formattedPeriod: item.period.replace('Q', ' Q'),
  }));

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-5 shadow-2xs h-full flex flex-col justify-between transition-colors">

      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Electric vs. Hybrid Cars {titleSuffix && <span className="text-neutral-400 font-normal">{titleSuffix}</span>}
        </h2>
        <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded text-xs">
          <button
            onClick={() => setChartType('stacked')}
            className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer text-[11px] ${chartType === 'stacked'
              ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
          >
            Stacked Area
          </button>
          <button
            onClick={() => setChartType('lines')}
            className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer text-[11px] ${chartType === 'lines'
              ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
          >
            Comparative
          </button>
        </div>
      </div>

      {/* 2D Flat Chart */}
      <div className="h-[320px] w-full pt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" className="dark:stroke-neutral-800" />
            <XAxis
              dataKey="formattedPeriod"
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#E5E7EB' }}
              dy={8}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
              className="tabular-nums"
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded p-2.5 shadow-md text-xs">
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1.5 border-b border-neutral-100 dark:border-neutral-800 pb-1">
                        {label} Registrations
                      </p>
                      <div className="space-y-1">
                        {payload.map((entry) => (
                          <div key={entry.name} className="flex items-center justify-between gap-4">
                            <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400">
                              <span
                                className="w-2 h-2 rounded-xs"
                                style={{ backgroundColor: entry.color }}
                              />
                              {entry.name}:
                            </span>
                            <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                              {Number(entry.value).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="bev"
              name="Battery Electric (BEV)"
              stackId={chartType === 'stacked' ? '1' : undefined}
              stroke="#15803D"
              strokeWidth={2}
              fill="#15803D"
              fillOpacity={chartType === 'stacked' ? 0.35 : 0.08}
            />
            <Area
              type="monotone"
              dataKey="hybrid"
              name="Hybrid (HEV/PHEV)"
              stackId={chartType === 'stacked' ? '1' : undefined}
              stroke="#1E40AF"
              strokeWidth={2}
              fill="#1E40AF"
              fillOpacity={chartType === 'stacked' ? 0.3 : 0.05}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Legend */}
      <div className="flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400 pt-2.5 border-t border-neutral-100 dark:border-neutral-800">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-[#15803D]" />
          Battery Electric (BEV)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-xs bg-[#1E40AF]" />
          Hybrid (HEV/PHEV)
        </span>
      </div>

    </div>
  );
};

export default RegistrationChart;
