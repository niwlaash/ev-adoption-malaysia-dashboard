import React from 'react';
import { TrendingUp } from 'lucide-react';

interface KpiRowProps {
  totalEvs: number;
  yoyGrowth: number;
  evShare: number;
  evSharePrevious: number;
  chargingBays: number;
  netrTarget: number;
  netrProgress: number;
  evToChargerRatio: number;
}

export const KpiRow: React.FC<KpiRowProps> = ({
  totalEvs,
  yoyGrowth,
  evShare,
  evSharePrevious,
  chargingBays,
  netrProgress,
  evToChargerRatio,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 w-full">
      {/* 1. Total Registered EVs */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Registered Electric Cars
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
            <TrendingUp className="w-3 h-3" />
            +{yoyGrowth}% vs Last Year
          </span>
        </div>
        <div className="mt-2.5">
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tabular-nums tracking-tight">
            {totalEvs.toLocaleString()}
          </div>
        </div>
      </div>

      {/* 2. EV Share of Total Cars */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            EV Market Share
          </span>
          <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 tabular-nums">
            vs {evSharePrevious}% last year
          </span>
        </div>
        <div className="mt-2.5">
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tabular-nums tracking-tight flex items-baseline gap-1.5">
            <span>{evShare}%</span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              (+{(evShare - evSharePrevious).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Public Charging Bays */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Public Charging Points
          </span>
          <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 tabular-nums">
            {netrProgress}% of 10,000 Goal
          </span>
        </div>
        <div className="mt-2.5">
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tabular-nums tracking-tight">
            {chargingBays.toLocaleString()}
          </div>
          <div className="mt-2 w-full bg-neutral-100 dark:bg-neutral-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-neutral-900 dark:bg-neutral-100 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${Math.min(netrProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4. EV-to-Charger Ratio */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-4 sm:p-5 shadow-2xs flex flex-col justify-between transition-colors">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
            Cars Per Charger
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400">
            Target 10 : 1
          </span>
        </div>
        <div className="mt-2.5">
          <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tabular-nums tracking-tight">
            {evToChargerRatio} <span className="text-lg font-medium text-neutral-400">: 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiRow;
