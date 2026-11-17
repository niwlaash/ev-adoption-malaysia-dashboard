import React from 'react';
import { PeriodCombobox } from './PeriodCombobox';
import { StateCombobox } from './StateCombobox';
import { MapPin, RotateCcw } from 'lucide-react';

interface PortalFilterBarProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  availableStates: string[];
  annualStats?: Record<string, {
    total_cars: number;
    ev_total: number;
    hybrid_total: number;
    ev_share_tiv: number;
    yoy_growth: number;
  }>;
}

export const PortalFilterBar: React.FC<PortalFilterBarProps> = ({
  selectedYear,
  onYearChange,
  selectedRegion,
  onRegionChange,
  selectedState,
  onStateChange,
  availableStates,
  annualStats
}) => {
  const regions = [
    { id: 'all', label: 'All Malaysia' },
    { id: 'Klang Valley', label: 'Klang Valley' },
    { id: 'Northern', label: 'Northern' },
    { id: 'Southern', label: 'Southern' },
    { id: 'East Coast', label: 'East Coast' },
    { id: 'Borneo', label: 'Borneo' }
  ];

  const hasFilter = selectedYear !== 'all' || selectedRegion !== 'all' || selectedState !== 'all';

  const handleReset = () => {
    onYearChange('all');
    onRegionChange('all');
    onStateChange('all');
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-2.5 sm:p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 shadow-2xs transition-colors">
      
      {/* Left: Twin Impeccable Custom Comboboxes (Period & State) */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* 1. Period Selector (Replaces OS native select) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider shrink-0">
            Period:
          </span>
          <PeriodCombobox
            value={selectedYear}
            onChange={onYearChange}
            annualStats={annualStats}
          />
        </div>

        {/* Subtle Vertical Divider */}
        <div className="hidden sm:block h-5 w-px bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800" />

        {/* 2. State Selector (Replaces OS native select) */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider shrink-0">
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
            placeholder="All Territories"
            allLabel="All Territories (16 States)"
            allowAll={true}
            align="left"
          />
        </div>

      </div>

      {/* Right: Macro-Region Quick Segment Pills & Reset */}
      <div className="flex flex-wrap items-center gap-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
        <span className="flex items-center gap-1 font-semibold text-neutral-400 dark:text-neutral-500 text-[10px] uppercase tracking-wider mr-1">
          <MapPin className="w-3 h-3 text-neutral-400" />
          Region:
        </span>

        {regions.map((reg) => {
          const isActive = selectedRegion === reg.id && selectedState === 'all';
          return (
            <button
              key={reg.id}
              onClick={() => {
                onRegionChange(reg.id);
                onStateChange('all');
              }}
              className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs font-semibold'
                  : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700/60'
              }`}
            >
              {reg.label}
            </button>
          );
        })}

        {hasFilter && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-2 py-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ml-1"
            title="Reset all filters to default"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

    </div>
  );
};

export default PortalFilterBar;
