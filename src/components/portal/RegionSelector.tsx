import React from 'react';
import { MapPin, RotateCcw } from 'lucide-react';
import { StateCombobox } from './StateCombobox';

interface RegionSelectorProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  availableStates: string[];
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onRegionChange,
  selectedState,
  onStateChange,
  availableStates
}) => {
  const regions = [
    { id: 'all', label: 'All Malaysia' },
    { id: 'Klang Valley', label: 'Klang Valley' },
    { id: 'Northern', label: 'Northern' },
    { id: 'Southern', label: 'Southern' },
    { id: 'East Coast', label: 'East Coast' },
    { id: 'Borneo', label: 'Borneo' }
  ];

  const hasFilter = selectedRegion !== 'all' || selectedState !== 'all';

  const handleReset = () => {
    onRegionChange('all');
    onStateChange('all');
  };

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs">
      {/* Macro-Region Filter */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400 mr-1 text-[11px] uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
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
              className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-2xs font-semibold'
                  : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {reg.label}
            </button>
          );
        })}
      </div>

      {/* Custom State Combobox & Reset */}
      <div className="flex items-center gap-2">
        <span className="text-neutral-500 dark:text-neutral-400 font-medium text-[11px] uppercase tracking-wider">
          State:
        </span>
        <StateCombobox
          value={selectedState}
          onChange={(newVal) => {
            onStateChange(newVal);
            if (newVal !== 'all') {
              onRegionChange('all');
            }
          }}
          availableStates={availableStates}
          placeholder="All States"
          allLabel="All States"
          allowAll={true}
        />

        {hasFilter && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white px-1.5 py-1 transition-colors cursor-pointer ml-1"
            title="Reset to All Malaysia"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;
