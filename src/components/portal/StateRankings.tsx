import React, { useState } from 'react';
import { BarChart2, Scale } from 'lucide-react';

export interface StateRecord {
  state: string;
  region?: string;
  bev_registrations: number;
  hybrid_registrations: number;
  total_electrified: number;
  charging_bays: number;
  charging_stations?: number;
  ac_bays: number;
  dc_bays: number;
  ev_charger_ratio: number;
  ev_share_pct?: number;
  charger_share_pct?: number;
  parity_gap?: number;
  parity_status?: string;
  growth_rate: number;
}

interface StateRankingsProps {
  data: StateRecord[];
  selectedState: string;
  onSelectState: (state: string) => void;
}

export const StateRankings: React.FC<StateRankingsProps> = ({
  data,
  selectedState,
  onSelectState,
}) => {
  const [viewMode, setViewMode] = useState<'density' | 'parity'>('density');

  const regionalStates = (data || [])
    .filter((s) => s.state !== 'Corporate Fleet')
    .slice(0, 6);

  const maxBev = Math.max(...regionalStates.map((s) => s.bev_registrations), 1);
  const maxBays = Math.max(...regionalStates.map((s) => s.charging_bays), 1);

  // States sorted by charger deficit
  const parityStates = (data || [])
    .filter((s) => s.state !== 'Corporate Fleet' && (s.bev_registrations > 0 || s.charging_bays > 0))
    .sort((a, b) => (a.parity_gap ?? 0) - (b.parity_gap ?? 0))
    .slice(0, 6);

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-5 shadow-2xs h-full flex flex-col justify-between transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          EVs and Chargers by State
        </h2>

        {/* View Toggle */}
        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded text-[11px]">
          <button
            onClick={() => setViewMode('density')}
            className={`px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors ${
              viewMode === 'density'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <BarChart2 className="w-3 h-3" />
            Volume
          </button>
          <button
            onClick={() => setViewMode('parity')}
            className={`px-2 py-0.5 rounded font-medium flex items-center gap-1 cursor-pointer transition-colors ${
              viewMode === 'parity'
                ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
            }`}
          >
            <Scale className="w-3 h-3" />
            Adequacy
          </button>
        </div>
      </div>

      {viewMode === 'density' ? (
        <>
          {/* Legend */}
          <div className="flex items-center justify-end gap-3 text-[11px] text-neutral-400 dark:text-neutral-500 pt-2 pb-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-xs bg-[#15803D]" />
              BEVs
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-xs bg-[#1E40AF]" />
              Bays
            </span>
          </div>

          {/* Ranked State List */}
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 my-auto">
            {regionalStates.map((st, idx) => {
              const isSelected = selectedState === st.state;
              const bevWidth = Math.max((st.bev_registrations / maxBev) * 100, 4);
              const bayWidth = Math.max((st.charging_bays / maxBays) * 100, 4);

              return (
                <div
                  key={st.state}
                  onClick={() => onSelectState(isSelected ? 'all' : st.state)}
                  className={`py-2 px-1.5 rounded cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-neutral-400 tabular-nums">
                        #{idx + 1}
                      </span>
                      <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {st.state}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 font-mono tabular-nums text-[11px]">
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                        {st.bev_registrations.toLocaleString()}
                      </span>
                      <span className="text-blue-800 dark:text-blue-400 font-medium">
                        {st.charging_bays.toLocaleString()} bays
                      </span>
                      <span className="px-1 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 text-[10px]">
                        {st.ev_charger_ratio}:1
                      </span>
                    </div>
                  </div>

                  {/* Dual Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#15803D] h-full rounded-full transition-all duration-500"
                        style={{ width: `${bevWidth}%` }}
                      />
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-[#1E40AF] h-full rounded-full transition-all duration-500"
                        style={{ width: `${bayWidth}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* Adequacy / Parity View */}
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800/60 my-auto pt-2">
            {parityStates.map((st) => {
              const isSelected = selectedState === st.state;
              const gap = st.parity_gap ?? 0;
              const isDeficit = gap < -1.5;
              const isSurplus = gap > 1.5;

              return (
                <div
                  key={st.state}
                  onClick={() => onSelectState(isSelected ? 'all' : st.state)}
                  className={`py-2 px-1.5 rounded cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 font-semibold'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {st.state}
                      </div>
                      <div className="text-[10px] text-neutral-400 tabular-nums font-mono">
                        EV: {st.ev_share_pct}% | Bay: {st.charger_share_pct}%
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold tabular-nums ${
                          isDeficit
                            ? 'text-rose-700 dark:text-rose-400'
                            : isSurplus
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-neutral-500'
                        }`}
                      >
                        {gap > 0 ? `+${gap}%` : `${gap}%`}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                          isDeficit
                            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                            : isSurplus
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                        }`}
                      >
                        {isDeficit ? 'Deficit' : isSurplus ? 'Surplus' : 'Balanced'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Clean footer line */}
      <div className="pt-2.5 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 flex justify-between">
        <span>Click row to filter dashboard</span>
        <span>{viewMode === 'density' ? 'By volume' : 'By balance gap'}</span>
      </div>

    </div>
  );
};

export default StateRankings;
