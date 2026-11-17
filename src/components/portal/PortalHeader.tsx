import React from 'react';
import { Download, Database, Sun, Moon } from 'lucide-react';

interface PortalHeaderProps {
  onExportCsv: () => void;
  onExportJson: () => void;
  lastUpdated?: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  onExportCsv,
  onExportJson,
  lastUpdated,
  isDark,
  onToggleTheme
}) => {
  return (
    <header className="w-full border-b border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Left branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-900 font-bold text-xs tracking-wider">
            MY
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
                Malaysia EV Open Data Portal
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
                <Database className="w-3 h-3 text-neutral-500" />
                JPJ & OCM Verified
              </span>
            </div>
            {lastUpdated && (
              <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono tabular-nums">
                Synced: {lastUpdated}
              </span>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 shadow-2xs transition-colors cursor-pointer"
            title="Download CSV Dataset"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>CSV</span>
          </button>
          
          <button
            onClick={onExportJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/60 shadow-2xs transition-colors cursor-pointer"
            title="Download JSON Dataset"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer ml-1"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-neutral-600" />}
          </button>
        </div>

      </div>
    </header>
  );
};

export default PortalHeader;
