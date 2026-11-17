import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';

export interface CorridorRecord {
  corridor: string;
  stations: number;
  bays: number;
  ac: number;
  dc: number;
}

interface ChargingSplitChartProps {
  data: CorridorRecord[];
  titleSuffix?: string;
}

export const ChargingSplitChart: React.FC<ChargingSplitChartProps> = ({ data, titleSuffix }) => {
  const chartData = (data || [])
    .filter((c) => c.bays > 0)
    .map((c) => {
      let label = c.corridor;
      if (label.includes('PLUS')) label = 'PLUS Expressway';
      else if (label.includes('East Coast')) label = 'East Coast (LPT)';
      else if (label.includes('Pan Borneo')) label = 'Pan Borneo';
      else if (label.includes('Other Highway')) label = 'Highway / R&R';
      else if (label.includes('Urban')) label = 'Urban Hubs';

      return {
        ...c,
        displayLabel: label,
      };
    });

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-5 shadow-2xs h-full flex flex-col justify-between transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Charging Stations by Location {titleSuffix && <span className="text-neutral-400 font-normal">{titleSuffix}</span>}
        </h2>
        <span className="text-[11px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[10px]">
          AC vs DC
        </span>
      </div>

      {/* Stacked Horizontal Bar Chart */}
      <div className="h-[280px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              dataKey="displayLabel"
              stroke="#374151"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={115}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const acVal = payload.find((p) => p.dataKey === 'ac')?.value || 0;
                  const dcVal = payload.find((p) => p.dataKey === 'dc')?.value || 0;
                  const total = Number(acVal) + Number(dcVal);
                  const dcPercent = total > 0 ? ((Number(dcVal) / total) * 100).toFixed(0) : 0;
                  return (
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded p-2.5 shadow-md text-xs">
                      <p className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">{label}</p>
                      <div className="space-y-1 text-neutral-600 dark:text-neutral-400 tabular-nums font-mono">
                        <p className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-neutral-500">
                            <span className="w-2 h-2 rounded-xs bg-[#1E40AF]" />
                            AC Connectors:
                          </span>
                          <strong className="text-neutral-900 dark:text-neutral-100">{Number(acVal).toLocaleString()}</strong>
                        </p>
                        <p className="flex items-center justify-between gap-3">
                          <span className="flex items-center gap-1.5 text-neutral-500">
                            <span className="w-2 h-2 rounded-xs bg-[#D97706]" />
                            DC Fast Connectors:
                          </span>
                          <strong className="text-neutral-900 dark:text-neutral-100">{Number(dcVal).toLocaleString()}</strong>
                        </p>
                        <p className="pt-1 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-amber-700 dark:text-amber-400 font-semibold">
                          DC Fast Ratio: {dcPercent}%
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="square"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingBottom: '8px' }}
            />
            <Bar dataKey="ac" name="AC Destination" stackId="a" fill="#1E40AF" radius={[0, 0, 0, 0]} />
            <Bar dataKey="dc" name="DC Fast Charger" stackId="a" fill="#D97706" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Clean footer line */}
      <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex justify-between font-mono">
        <span>Open Charge Map verified</span>
        <span>Highways vs urban hubs</span>
      </div>

    </div>
  );
};

export default ChargingSplitChart;
