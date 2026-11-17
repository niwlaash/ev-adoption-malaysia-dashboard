import React, { useState } from 'react';
import { ArrowLeftRight, ChevronDown, ChevronUp } from 'lucide-react';
import type { StateRecord } from './StateRankings';
import type { MakeRecord } from './TopMakesChart';
import { StateCombobox } from './StateCombobox';

interface StateComparatorProps {
  stateTable: StateRecord[];
  topMakesByState: Record<string, MakeRecord[]>;
}

export const StateComparator: React.FC<StateComparatorProps> = ({
  stateTable,
  topMakesByState,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stateA, setStateA] = useState<string>('Selangor');
  const [stateB, setStateB] = useState<string>('Johor');

  const validStates = stateTable
    .filter((s) => s.state !== 'Corporate Fleet' && s.state !== 'Other/Unknown')
    .map((s) => s.state)
    .sort();

  const recordA = stateTable.find((s) => s.state === stateA);
  const recordB = stateTable.find((s) => s.state === stateB);

  const makesA = (topMakesByState[stateA] || []).slice(0, 3);
  const makesB = (topMakesByState[stateB] || []).slice(0, 3);

  // Generate factual comparative takeaway
  const getComparativeSummary = () => {
    if (!recordA || !recordB) return '';
    const evRatio = recordB.bev_registrations > 0
      ? (recordA.bev_registrations / recordB.bev_registrations).toFixed(1)
      : 'N/A';

    return `${stateA} has ${evRatio}x the registered BEVs of ${stateB} (${recordA.bev_registrations.toLocaleString()} vs ${recordB.bev_registrations.toLocaleString()}). In charging infrastructure, ${recordA.charging_bays.toLocaleString()} public bays operate in ${stateA} (${recordA.dc_bays} DC fast chargers) compared to ${recordB.charging_bays.toLocaleString()} bays (${recordB.dc_bays} DC fast chargers) in ${stateB}.`;
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg shadow-2xs transition-colors overflow-hidden">
      {/* Header bar / Toggle */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Compare Any Two States
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
          <span>{isOpen ? 'Close' : 'Compare States'}</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-neutral-100 dark:border-neutral-800 space-y-3.5">
          {/* State Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Primary:
              </span>
              <StateCombobox
                value={stateA}
                onChange={setStateA}
                availableStates={validStates}
                allowAll={false}
                placeholder="Select State A"
                className="flex-1"
                align="left"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">
                Compare:
              </span>
              <StateCombobox
                value={stateB}
                onChange={setStateB}
                availableStates={validStates}
                allowAll={false}
                placeholder="Select State B"
                className="flex-1"
                align="right"
              />
            </div>
          </div>

          {/* Side-by-Side Comparison Grid */}
          {recordA && recordB && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* State A Column */}
              <div className="bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700 rounded p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    {recordA.state}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {recordA.region}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">Registered BEVs</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordA.bev_registrations.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">Charging Bays</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordA.charging_bays.toLocaleString()} ({recordA.dc_bays} DC)
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">EV/Bay Ratio</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordA.ev_charger_ratio} : 1
                    </span>
                  </div>

                  <div className="pt-0.5">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {makesA.map((m, idx) => (
                        <span
                          key={m.make}
                          className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-[10px] font-medium"
                        >
                          #{idx + 1} {m.make} ({m.count.toLocaleString()})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* State B Column */}
              <div className="bg-neutral-50/70 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-700 rounded p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100">
                    {recordB.state}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-400">
                    {recordB.region}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">Registered BEVs</span>
                    <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordB.bev_registrations.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">Charging Bays</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordB.charging_bays.toLocaleString()} ({recordB.dc_bays} DC)
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-0.5 border-b border-neutral-100 dark:border-neutral-800">
                    <span className="text-neutral-500 dark:text-neutral-400">EV/Bay Ratio</span>
                    <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
                      {recordB.ev_charger_ratio} : 1
                    </span>
                  </div>

                  <div className="pt-0.5">
                    <div className="flex flex-wrap gap-1 mt-1">
                      {makesB.map((m, idx) => (
                        <span
                          key={m.make}
                          className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-[10px] font-medium"
                        >
                          #{idx + 1} {m.make} ({m.count.toLocaleString()})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Takeaway Insight */}
          <div className="p-2.5 bg-neutral-100/60 dark:bg-neutral-800/60 rounded border border-neutral-200/80 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {getComparativeSummary()}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateComparator;
