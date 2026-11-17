import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Download, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import type { StateRecord } from './StateRankings';
import { downloadSafeCsv } from '../../lib/security';

interface OpenDataTableProps {
  data: StateRecord[];
}

export const OpenDataTable: React.FC<OpenDataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof StateRecord>('total_electrified');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleSort = (field: keyof StateRecord) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSorted = useMemo(() => {
    const result = [...(data || [])].filter((item) =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      (item.region && item.region.toLowerCase().includes(searchTerm.toLowerCase().trim()))
    );

    result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      const numA = Number(valA) || 0;
      const numB = Number(valB) || 0;
      return sortDirection === 'asc' ? numA - numB : numB - numA;
    });

    return result;
  }, [data, searchTerm, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize) || 1;
  const paginatedData = filteredAndSorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const exportTableCsv = () => {
    const headers = [
      'State',
      'Region',
      'Registered BEVs',
      'Registered Hybrids',
      'Total Electrified Fleet',
      'AC Destination Bays',
      'DC Fast Bays',
      'Total Public Bays',
      'EV/Charger Ratio',
      'Adequacy Gap (%)',
      'Infrastructure Balance',
      'YoY Growth (%)'
    ];
    const rows = filteredAndSorted.map((r) => [
      r.state,
      r.region || 'Other',
      r.bev_registrations,
      r.hybrid_registrations,
      r.total_electrified,
      r.ac_bays,
      r.dc_bays,
      r.charging_bays,
      r.ev_charger_ratio,
      r.parity_gap ?? 0,
      r.parity_status || 'Balanced',
      r.growth_rate,
    ]);

    downloadSafeCsv(
      `malaysia_ev_state_data_${new Date().toISOString().split('T')[0]}.csv`,
      headers,
      rows
    );
  };

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 rounded-lg p-5 shadow-2xs w-full transition-colors">
      
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800 gap-3">
        <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          State Data Table
        </h2>

        <div className="flex items-center gap-2">
          {/* Search box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search territory..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 text-xs bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 w-44"
            />
          </div>

          {/* Export button */}
          <button
            onClick={exportTableCsv}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded border border-neutral-200 dark:border-neutral-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-neutral-400" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto mt-1">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-neutral-200/80 dark:border-neutral-800 text-neutral-400 dark:text-neutral-500 font-semibold uppercase tracking-wider text-[10px]">
              <th
                onClick={() => handleSort('state')}
                className="py-2.5 px-3 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  State
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('region')}
                className="py-2.5 px-3 cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center gap-1">
                  Region
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('bev_registrations')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  BEVs
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('hybrid_registrations')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  Hybrids
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('total_electrified')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  Total Fleet
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ac_bays')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  AC Bays
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('dc_bays')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  DC Bays
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('charging_bays')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  Total Bays
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ev_charger_ratio')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  EV/Bay
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('parity_gap')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  Gap
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('growth_rate')}
                className="py-2.5 px-3 text-right cursor-pointer hover:text-neutral-900 dark:hover:text-white"
              >
                <div className="flex items-center justify-end gap-1">
                  YoY
                  <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row.state}
                  className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
                >
                  <td className="py-2 px-3 font-semibold text-neutral-900 dark:text-neutral-100">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span>{row.state}</span>
                      {row.state === 'Corporate Fleet' && (
                        <span 
                          className="px-1.5 py-0.2 rounded text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-normal"
                          title="Registered centrally via JPJ Rakan Niaga / e-Daftar partner channel"
                        >
                          e-Daftar / Commercial
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-3 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                    {row.region || 'Other'}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-emerald-800 dark:text-emerald-400 font-medium">
                    {row.bev_registrations.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-neutral-600 dark:text-neutral-300">
                    {row.hybrid_registrations.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-bold text-neutral-900 dark:text-neutral-100">
                    {row.total_electrified.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-neutral-500">
                    {row.ac_bays.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-neutral-500">
                    {row.dc_bays.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums font-semibold text-blue-900 dark:text-blue-400">
                    {row.charging_bays.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums text-neutral-700 dark:text-neutral-300">
                    {row.ev_charger_ratio} : 1
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums">
                    {row.parity_gap !== undefined ? (
                      <span
                        className={`text-[11px] font-semibold ${
                          row.parity_gap < -1.5
                            ? 'text-rose-700 dark:text-rose-400'
                            : row.parity_gap > 1.5
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : 'text-neutral-400'
                        }`}
                      >
                        {row.parity_gap > 0 ? `+${row.parity_gap}%` : `${row.parity_gap}%`}
                      </span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-2 px-3 text-right font-mono tabular-nums">
                    <span
                      className={`inline-block px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        row.growth_rate >= 0
                          ? 'text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                          : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                      }`}
                    >
                      {row.growth_rate >= 0 ? `+${row.growth_rate}%` : `${row.growth_rate}%`}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11} className="py-8 text-center text-neutral-400 text-xs">
                  No records match search &ldquo;{searchTerm}&rdquo;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Attribution */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 mt-1 border-t border-neutral-100 dark:border-neutral-800 gap-2 text-xs text-neutral-400">
        <div className="flex items-center gap-1.5 text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
          <span>License: <strong>CC BY 4.0 International</strong></span>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto text-[11px]">
          <span>
            Page <strong className="text-neutral-800 dark:text-neutral-200">{currentPage}</strong> of{' '}
            <strong className="text-neutral-800 dark:text-neutral-200">{totalPages}</strong> ({filteredAndSorted.length} entries)
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-neutral-200 dark:border-neutral-700 disabled:opacity-30 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-neutral-200 dark:border-neutral-700 disabled:opacity-30 hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OpenDataTable;
