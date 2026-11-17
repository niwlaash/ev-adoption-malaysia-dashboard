import React, { useState } from 'react';
import { Building2, ChevronDown, ChevronUp, Info, ShieldCheck, Zap } from 'lucide-react';

export const FleetInsightCard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
      
      {/* Header Banner */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                Data Insight: Understanding &ldquo;Corporate Fleet&rdquo; (JPJ Rakan Niaga)
              </h3>
              <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                74.6% of EV Registrations
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 line-clamp-1">
              Why over 77,000 electric cars are recorded under corporate and commercial partner gateways rather than individual states.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:hover:text-white shrink-0 p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? 'Less' : 'Learn Why'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* Reason 1 */}
            <div className="bg-neutral-50 dark:bg-neutral-850 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 rounded-lg p-3.5">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <h4>1. JPJ e-Daftar Channel</h4>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Authorized automotive dealerships (e.g., Proton, BYD, Tesla) register new vehicles electronically via JPJ&apos;s commercial partner portal (<em>Rakan Niaga</em>). In government databases, these are tagged under the central business gateway rather than walk-in state branches.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 rounded-lg p-3.5">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h4>2. Corporate Tax Write-Offs</h4>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Malaysian enterprises heavily adopt EVs for company executives and operations to claim Green Technology Tax Incentives and Accelerated Capital Allowances (ACA), driving bulk company registrations.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/60 dark:border-neutral-800 rounded-lg p-3.5">
              <div className="flex items-center gap-2 mb-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <h4>3. Why 0 Local Chargers?</h4>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Public charging points are installed in physical states (Selangor, Johor, Penang, etc.). &ldquo;Corporate Fleet&rdquo; is a national registration channel, not a geographic state, so its vehicles use physical chargers located throughout the country.
              </p>
            </div>

          </div>

          <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 p-3 rounded-lg text-[11px] text-blue-900 dark:text-blue-200 flex items-start gap-2">
            <span className="font-bold shrink-0">Dashboard Note:</span>
            <span>
              To prevent skewing local state infrastructure ratios, our State Comparison and Ranking tools analyze physical territory registrations (Selangor, KL, Johor, etc.), while the Open Data Table includes the full Corporate Fleet row for 100% mathematical completeness.
            </span>
          </div>

        </div>
      )}

    </div>
  );
};

export default FleetInsightCard;
