import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Check, Search, X, MapPin } from 'lucide-react';

export interface StateComboboxProps {
  value: string;
  onChange: (state: string) => void;
  availableStates: string[];
  placeholder?: string;
  className?: string;
  allowAll?: boolean;
  allLabel?: string;
  align?: 'left' | 'right';
}

// Canonical regional groupings for Malaysian states
const REGION_GROUPS: Record<string, string[]> = {
  'Klang Valley': ['Kuala Lumpur', 'Putrajaya', 'Selangor'],
  'Northern': ['Kedah', 'Penang', 'Perak', 'Perlis'],
  'Southern': ['Johor', 'Melaka', 'Negeri Sembilan'],
  'East Coast': ['Kelantan', 'Pahang', 'Terengganu'],
  'Borneo': ['Labuan', 'Sabah', 'Sarawak']
};

export const StateCombobox: React.FC<StateComboboxProps> = ({
  value,
  onChange,
  availableStates,
  placeholder = 'Select State...',
  className = '',
  allowAll = true,
  allLabel = 'All States',
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Focus search input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    } else {
      setSearchQuery('');
      setHighlightedIndex(-1);
    }
  }, [isOpen]);

  // Filtered states grouped by region
  const filteredGroups = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const result: { region: string; states: string[] }[] = [];

    for (const [region, states] of Object.entries(REGION_GROUPS)) {
      const matchingStates = states.filter(
        (st) =>
          availableStates.includes(st) &&
          (st.toLowerCase().includes(query) || region.toLowerCase().includes(query))
      );
      if (matchingStates.length > 0) {
        result.push({ region, states: matchingStates });
      }
    }

    return result;
  }, [availableStates, searchQuery]);

  // Flat list of selectable options for keyboard navigation
  const flatOptions = useMemo(() => {
    const list: { id: string; label: string; region?: string }[] = [];
    if (allowAll) {
      list.push({ id: 'all', label: allLabel });
    }
    filteredGroups.forEach((group) => {
      group.states.forEach((st) => {
        list.push({ id: st, label: st, region: group.region });
      });
    });
    return list;
  }, [allowAll, allLabel, filteredGroups]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev < flatOptions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : flatOptions.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < flatOptions.length) {
          onChange(flatOptions[highlightedIndex].id);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, highlightedIndex, flatOptions, onChange]);

  const displayLabel = value === 'all' || !value ? (allowAll ? allLabel : placeholder) : value;

  const handleSelect = (stateValue: string) => {
    onChange(stateValue);
    setIsOpen(false);
  };

  const popoverPosition = align === 'left' ? 'left-0' : 'right-0';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 text-xs font-semibold text-neutral-900 dark:text-neutral-100 shadow-2xs transition-all cursor-pointer min-w-[150px] focus:outline-none focus:ring-1 focus:ring-neutral-400"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-1.5 truncate">
          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="truncate">
            {displayLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 text-neutral-400">
          {value && value !== 'all' && (
            <X
              className="w-3 h-3 hover:text-neutral-900 dark:hover:text-white"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onChange('all');
              }}
              title="Clear state filter"
            />
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Floating Popover Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute ${popoverPosition} top-full mt-1.5 w-64 max-h-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg z-50 overflow-hidden flex flex-col text-xs transition-colors`}
        >
          {/* Search Header */}
          <div className="p-2 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60">
            <div className="relative flex items-center">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Search state..."
                className="w-full pl-7 pr-2 py-1 text-xs bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400"
              />
            </div>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto py-1 max-h-60 divide-y divide-neutral-100/60 dark:divide-neutral-800/60">
            {allowAll && (!searchQuery || allLabel.toLowerCase().includes(searchQuery.toLowerCase())) && (
              <div className="p-1">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === 'all' || !value}
                  onClick={() => handleSelect('all')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors cursor-pointer ${
                    value === 'all' || !value
                      ? 'bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-neutral-100'
                      : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                  }`}
                >
                  <span>{allLabel}</span>
                  {(value === 'all' || !value) && <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />}
                </button>
              </div>
            )}

            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => (
                <div key={group.region} className="py-1">
                  <div className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {group.region}
                  </div>
                  {group.states.map((st) => {
                    const isSelected = value === st;
                    return (
                      <button
                        key={st}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(st)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-neutral-100 dark:bg-neutral-800 font-bold text-neutral-900 dark:text-neutral-100'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/60 text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <span className="truncate">{st}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />}
                      </button>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-neutral-400 text-xs">
                No matching states
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StateCombobox;
