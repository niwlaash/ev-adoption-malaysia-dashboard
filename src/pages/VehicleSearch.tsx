import { Download, TrendingUp, Trophy, Award, Medal } from 'lucide-react';
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
    const headers = ['Rank', 'Make', 'Model', 'Registrations'];
    const rows = displayData.map((v: any, i: number) => [i + 1, v.make, v.model, v.regs]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "malaysia_ev_leaderboard_2026.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-neutral-400" />;
      case 2: return <Award className="w-5 h-5 text-amber-700" />;
      default: return <span className="text-sm font-bold text-neutral-500 w-5 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-4xl font-black tracking-tight uppercase">EV Leaderboard</h2>
          <p className="text-neutral-500 font-medium">Official registration rankings for 2025 - Present.</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-neutral-800 rounded-xl text-sm font-bold hover:bg-neutral-800 transition-all active:scale-95"
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 p-6 rounded-2xl">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/20 rounded-xl text-blue-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Market Dynamics</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">This leaderboard is dynamically generated from DOSM registration data. Rankings are calculated based on the cumulative volume since January 2025.</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[32px] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/50">
                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Rank</th>
                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Model Identity</th>
                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Fuel Type</th>
                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Volume (Units)</th>
                <th className="px-8 py-6 text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em]">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
              {displayData.map((v: any, i: number) => (
                <tr key={i} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-all cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-neutral-100 dark:bg-neutral-800/50 rounded-xl group-hover:scale-110 transition-transform">
                      {getRankIcon(i)}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-neutral-900 dark:text-white uppercase tracking-tight text-lg">{v.make}</span>
                      <span className="text-xs font-bold text-neutral-400 uppercase">{v.model}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/10">
                      {v.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-neutral-900 dark:text-white tabular-nums tracking-tighter">{v.regs.toLocaleString()}</span>
                      <span className="text-[10px] text-neutral-400 uppercase font-black">Verified Regs</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-[10px] text-green-500 font-black uppercase tracking-widest bg-green-500/10 px-3 py-1.5 rounded-lg w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      Outperforming
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
