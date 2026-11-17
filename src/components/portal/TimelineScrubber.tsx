import React from 'react';
import { Calendar, Info } from 'lucide-react';

interface TimelineScrubberProps {
  selectedYear: string;
  onYearChange: (year: string) => void;
  milestones?: Record<string, string>;
  annualStats?: Record<string, {
    total_cars: number;
    ev_total: number;
    hybrid_total: number;
    ev_share_tiv: number;
    yoy_growth: number;
  }>;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  selectedYear,
  onYearChange,
  milestones,
  annualStats
}) => {
  const years = [
    { id: 'all', label: 'All (2022–2026)' },
    { id: '2026', label: '2026 (YTD)', metric: '7.6%' },
    { id: '2025', label: '2025', metric: '5.2%' },
    { id: '2024', label: '2024', metric: '2.5%' },
    { id: '2023', label: '2023', metric: '1.6%' },
    { id: '2022', label: '2022', metric: '0.4%' }
  ];

  const activeMilestone = milestones?.[selectedYear] || milestones?.['all'] || 'Official JPJ vehicle registration records.';
  const currentStat = selectedYear !== 'all' && annualStats ? annualStats[selectedYear] : null;

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-3 sm:p-4 shadow-2xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
            Registration Period
          </span>
        </div>

        {currentStat && (
          <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-neutral-700 dark:text-neutral-300 bg-neutral-100/80 dark:bg-neutral-800 px-2 py-0.5 rounded">
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              {currentStat.ev_total.toLocaleString()} BEVs
            </span>
            <span className="text-neutral-300 dark:text-neutral-600">/</span>
            <span>{currentStat.ev_share_tiv}% of Cars</span>
            {currentStat.yoy_growth > 0 && (
              <>
                <span className="text-neutral-300 dark:text-neutral-600">•</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  +{currentStat.yoy_growth}% YoY
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Segmented Timeline Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {years.map((y) => {
          const isActive = selectedYear === y.id;
          return (
            <button
              key={y.id}
              onClick={() => onYearChange(y.id)}
              className={`flex items-center justify-between px-3 py-2 rounded border text-xs transition-colors cursor-pointer ${isActive
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-2xs font-semibold'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200/80 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
            >
              <span className="truncate">
                {y.label}
              </span>
              {y.metric && (
                <span
                  className={`text-[10px] font-mono px-1 py-0.2 rounded ml-1.5 ${isActive
                    ? 'bg-neutral-700 text-neutral-100 dark:bg-neutral-200 dark:text-neutral-900'
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

      {/* Clean Factual Milestone Note */}
      <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400">
        <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {activeMilestone}
        </span>
      </div>
    </div>
  );
};

export default TimelineScrubber;
