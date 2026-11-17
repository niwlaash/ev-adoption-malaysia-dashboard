import React from 'react';
import { Calendar, MapPin, Info, RotateCcw, X } from 'lucide-react';
import { StateCombobox } from './StateCombobox';

interface CivicControlCenterProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  availableStates: string[];
  milestones?: Record<string, string>;
  annualStats?: Record<string, {
    total_cars: number;
    ev_total: number;
    hybrid_total: number;
    ev_share_tiv: number;
    yoy_growth: number;
  }>;
}

export const CivicControlCenter: React.FC<CivicControlCenterProps> = ({
  selectedYear,
  onYearChange,
  selectedRegion,
  onRegionChange,
  selectedState,
  onStateChange,
  availableStates,
  milestones,
  annualStats
}) => {
  const years = [
    { id: 'all', label: 'All (2022–2026)', metric: '103k+' },
    { id: '2026', label: '2026 (YTD)', metric: '7.6%' },
    { id: '2025', label: '2025', metric: '5.2%' },
    { id: '2024', label: '2024', metric: '2.5%' },
    { id: '2023', label: '2023', metric: '1.6%' },
    { id: '2022', label: '2022', metric: '0.4%' }
  ];

  const regions = [
    { id: 'all', label: 'All Malaysia' },
    { id: 'Klang Valley', label: 'Klang Valley' },
    { id: 'Northern', label: 'Northern' },
    { id: 'Southern', label: 'Southern' },
    { id: 'East Coast', label: 'East Coast' },
    { id: 'Borneo', label: 'Borneo' }
  ];

  const activeMilestone = milestones?.[selectedYear] || milestones?.['all'] || 'Official JPJ vehicle registration records.';
  const currentStat = selectedYear !== 'all' && annualStats ? annualStats[selectedYear] : null;
  const hasActiveFilters = selectedYear !== 'all' || selectedRegion !== 'all' || selectedState !== 'all';

  const handleReset = () => {
    onYearChange('all');
    onRegionChange('all');
    onStateChange('all');
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl shadow-xs transition-colors overflow-hidden">
      
      {/* Deck 1: Registration Timeline Horizon */}
      <div className="p-3.5 sm:p-4 border-b border-neutral-100 dark:border-neutral-800">
        
        {/* Header Strip: Section Title & Real-Time Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
            <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
              Registration Year
            </span>
          </div>

          {currentStat ? (
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700/60">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                {currentStat.ev_total.toLocaleString()} Pure EVs
              </span>
              <span className="text-neutral-300 dark:text-neutral-600">/</span>
              <span>{currentStat.ev_share_tiv}% of all cars</span>
              {currentStat.yoy_growth > 0 && (
                <>
                  <span className="text-neutral-300 dark:text-neutral-600">•</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    +{currentStat.yoy_growth}% growth
                  </span>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-md border border-neutral-200/60 dark:border-neutral-700/60">
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">
                103,515 Total Electric Cars
              </span>
              <span className="text-neutral-300 dark:text-neutral-600">•</span>
              <span>2022–2026</span>
            </div>
          )}
        </div>

        {/* Segmented Horizon Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 p-1 bg-neutral-100/80 dark:bg-neutral-950/70 rounded-lg border border-neutral-200/70 dark:border-neutral-800">
          {years.map((y) => {
            const isActive = selectedYear === y.id;
            return (
              <button
                key={y.id}
                type="button"
                onClick={() => onYearChange(y.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-100 shadow-xs font-semibold border border-neutral-900 dark:border-neutral-700 ring-1 ring-neutral-900/10 dark:ring-neutral-600/40'
                    : 'bg-white dark:bg-neutral-900/90 text-neutral-700 dark:text-neutral-300 border border-neutral-200/60 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/60'
                }`}
              >
                <span className="truncate">
                  {y.label}
                </span>
                {y.metric && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ml-1.5 ${
                      isActive
                        ? 'bg-neutral-800 dark:bg-neutral-700 text-neutral-200'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
                    }`}
                  >
                    {y.metric}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Factual Milestone Note */}
        <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {activeMilestone}
          </span>
        </div>

      </div>

      {/* Deck 2: Geographic Territory & Scope Toolbar */}
      <div className="px-3.5 py-2.5 sm:px-4 bg-neutral-50/60 dark:bg-neutral-900/70 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs">
        
        {/* Macro-Region Quick Segment */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="flex items-center gap-1 font-bold text-neutral-500 dark:text-neutral-400 mr-1 text-[11px] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            Region:
          </span>

          <div className="flex flex-wrap items-center gap-1 p-0.5 bg-neutral-200/50 dark:bg-neutral-950/60 rounded-lg border border-neutral-200/70 dark:border-neutral-800">
            {regions.map((reg) => {
              const isActive = selectedRegion === reg.id && selectedState === 'all';
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => {
                    onRegionChange(reg.id);
                    onStateChange('all');
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-neutral-800 text-white dark:text-neutral-100 font-semibold shadow-xs border border-neutral-900 dark:border-neutral-700'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* State Combobox & Inline Active Tag Strip */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-neutral-500 dark:text-neutral-400 font-semibold text-[11px] uppercase tracking-wider">
            State:
          </span>

          <StateCombobox
            value={selectedState}
            onChange={(newState) => {
              onStateChange(newState);
              if (newState !== 'all') {
                onRegionChange('all');
              }
            }}
            availableStates={availableStates}
            placeholder="All States"
            allLabel="All States (16 States)"
            allowAll={true}
            align="right"
          />

          {/* Active Filter Chips & Reset */}
          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 pl-1">
              {selectedYear !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-neutral-300/60 dark:border-neutral-700">
                  Year: {selectedYear}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-rose-500 transition-colors"
                    onClick={() => onYearChange('all')}
                  />
                </span>
              )}

              {selectedState !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium border border-neutral-300/60 dark:border-neutral-700">
                  State: {selectedState}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-rose-500 transition-colors"
                    onClick={() => onStateChange('all')}
                  />
                </span>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-1.5 py-1 rounded hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Reset all filters to default"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default CivicControlCenter;
