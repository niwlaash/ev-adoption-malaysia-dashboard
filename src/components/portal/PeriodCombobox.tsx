import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

export interface PeriodComboboxProps {
  value: string;
  onChange: (year: string) => void;
  className?: string;
  annualStats?: Record<string, {
    total_cars: number;
    ev_total: number;
    hybrid_total: number;
    ev_share_tiv: number;
    yoy_growth: number;
  }>;
}

interface PeriodOption {
  id: string;
  label: string;
  badge?: string;
  sublabel: string;
}

export const PeriodCombobox: React.FC<PeriodComboboxProps> = ({
  value,
  onChange,
  className = '',
  annualStats
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const periods: PeriodOption[] = useMemo(() => [
    {
      id: 'all',
      label: '2022 – 2026 (All Records)',
      badge: 'Cumulative',
      sublabel: '103k+ Registered Electrified Vehicles'
    },
    {
      id: '2026',
      label: '2026 (YTD)',
      badge: annualStats?.['2026'] ? `${annualStats['2026'].ev_share_tiv}% TIV` : '7.6% TIV',
      sublabel: 'Proton e.MAS surges to #1 market share'
    },
    {
      id: '2025',
      label: '2025',
      badge: annualStats?.['2025'] ? `${annualStats['2025'].ev_share_tiv}% TIV` : '5.2% TIV',
      sublabel: 'BYD mass expansion & e.MAS 7 preview'
    },
    {
      id: '2024',
      label: '2024',
      badge: annualStats?.['2024'] ? `${annualStats['2024'].ev_share_tiv}% TIV` : '2.5% TIV',
      sublabel: 'Tesla enters & BYD Seal launch'
    },
    {
      id: '2023',
      label: '2023',
      badge: annualStats?.['2023'] ? `${annualStats['2023'].ev_share_tiv}% TIV` : '1.6% TIV',
      sublabel: 'BYD Atto 3 entry; import duty exemption'
    },
    {
      id: '2022',
      label: '2022',
      badge: annualStats?.['2022'] ? `${annualStats['2022'].ev_share_tiv}% TIV` : '0.4% TIV',
      sublabel: 'Early adopter phase (BMW iX, Hyundai Ioniq 5)'
    }
  ], [annualStats]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        const idx = periods.findIndex((p) => p.id === value);
        setHighlightedIndex(idx >= 0 ? idx : 0);
      } else {
        setHighlightedIndex(-1);
      }
      return next;
    });
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < periods.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : periods.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < periods.length) {
          onChange(periods[highlightedIndex].id);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, periods, onChange]);

  const currentOption = periods.find((p) => p.id === value) || periods[0];

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center justify-between gap-2.5 px-3 py-1.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-xs font-semibold text-neutral-900 dark:text-neutral-100 shadow-2xs transition-all cursor-pointer min-w-[170px] focus:outline-none focus:ring-1 focus:ring-neutral-400"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5 truncate">
          <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="truncate">
            {currentOption.label}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Floating Popover Menu */}
      {isOpen && (
        <div
          ref={listRef}
          role="listbox"
          className="absolute left-0 top-full mt-1.5 w-72 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 overflow-hidden flex flex-col text-xs transition-colors"
        >
          <div className="px-3 py-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Select Registration Horizon
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">
              JPJ Records
            </span>
          </div>

          <div className="py-1 divide-y divide-neutral-100/60 dark:divide-neutral-800/60">
            {periods.map((item, idx) => {
              const isSelected = value === item.id;
              const isHighlighted = idx === highlightedIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(item.id);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={`w-full flex flex-col items-start px-3 py-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-neutral-100 dark:bg-neutral-800 font-medium'
                      : isHighlighted
                      ? 'bg-neutral-50 dark:bg-neutral-800/60'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <div className="w-full flex items-center justify-between gap-2">
                    <span className={`text-xs font-semibold ${isSelected ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-800 dark:text-neutral-200'}`}>
                      {item.label}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-700/80 text-neutral-600 dark:text-neutral-300">
                          {item.badge}
                        </span>
                      )}
                      {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white shrink-0" />}
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-0.5 line-clamp-1">
                    {item.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PeriodCombobox;
