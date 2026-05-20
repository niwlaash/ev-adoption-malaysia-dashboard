import { Search, Filter, Download, Activity, TrendingUp } from 'lucide-react';
import { useSummaryStats } from '../hooks/useMetricsData';

export default function VehicleSearch() {
  const { data: summaryData } = useSummaryStats();

  const displayData = summaryData?.top_ev_models?.map((v: any) => ({
    make: v.model.split(' ')[0],
    model: v.model.split(' ').slice(1).join(' '),
    regs: v.count,
    type: 'Electric'
  })) || [];

  const handleExport = () => {
    const headers = ['Make', 'Model', 'Registrations'];
    const rows = displayData.map(v => [v.make, v.model, v.regs]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "ev_comparison_malaysia_2026.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Vehicle Leaderboard</h2>
          <p className="text-neutral-500">Real-time adoption rankings based on official 2025-2026 registration data.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative text-neutral-500 text-sm py-2">
          Search and detailed filtering available in the Full Inspector (ParquetPrototype)
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Make & Model</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Registry Year</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Total Registrations</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Market Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {displayData.map((v: any, i: number) => (
                <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-tight">{v.make}</span>
                      <span className="text-xs text-neutral-500 uppercase">{v.model}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                      {v.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-neutral-500">2025-2026</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-neutral-900 dark:text-white">{v.regs.toLocaleString()}</span>
                      <span className="text-[10px] text-neutral-400 uppercase font-bold">Total Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-green-500 font-bold uppercase">
                      <TrendingUp className="w-3 h-3" />
                      Top Performer
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
