import { useMemo, useState } from 'react';
import { useSummaryStats } from '../hooks/useMetricsData';
import TrendLineChart from '../components/charts/TrendLineChart.tsx';
import { TrendingUp, ArrowUpRight, Calendar, Users } from 'lucide-react';

export default function EVTrends() {
  const { data } = useSummaryStats();
  const evStats = data?.stats || {};
  const [timeRange, setTimeRange] = useState<'12m' | 'ytd'>('12m');

  const { chartData, cumulativeEV, evGrowthRate } = useMemo(() => {
    if (!data?.ev_trends) return { chartData: [], cumulativeEV: 0, evGrowthRate: 0 };

    let total2025 = 0;
    let total2026 = 0;

    const mapped = data.ev_trends.map((item: any) => {
      const val25 = item['2025'] || 0;
      const val26 = item['2026'] || 0;
      total2025 += val25;
      total2026 += val26;

      return {
        month: item.month,
        previous: val25,
        current: val26,
      };
    });

    const filtered = timeRange === 'ytd'
      ? mapped.filter((d: any) => d.current > 0)
      : mapped;

    return {
      chartData: filtered,
      cumulativeEV: total2025 + total2026,
      evGrowthRate: total2025 > 0 ? (((total2026 - total2025) / total2025) * 100).toFixed(1) : "0"
    };
  }, [data, timeRange]);

  const marketShare2025 = evStats.total_2025 ? ((evStats.ev_total_2025 / evStats.total_2025) * 100).toFixed(1) : "0";
  const milestoneGoal = 100000;
  const milestoneProgress = Math.min((cumulativeEV / milestoneGoal) * 100, 100);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">EV Adoption Trends</h2>
        <p className="text-neutral-500">Real-time growth analysis and adoption velocity for the Malaysian market.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Market Impact</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-neutral-900 dark:text-white">{marketShare2025}%</span>
            <span className="text-green-500 text-sm font-medium">Market Share</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">EV vs Total registrations (2025 Full Year).</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Cumulative EV</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-neutral-900 dark:text-white">
              {cumulativeEV.toLocaleString()}
            </span>
            <span className="text-purple-500 text-sm font-medium">Units</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">Total BEVs registered across 2025-2026 YTD.</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Growth Index</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-neutral-900 dark:text-white">
              {Number(evGrowthRate) > 0 ? `+${evGrowthRate}%` : `${evGrowthRate}%`}
            </span>
            <span className="text-green-500 text-sm font-medium">YoY</span>
          </div>
          <p className="mt-2 text-sm text-neutral-500">Comparative velocity between registration cycles.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-xl font-bold">Monthly Registration Velocity</h3>
            <p className="text-sm text-neutral-500">Tracking daily averages per month across 2025 and 2026.</p>
          </div>
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-lg">
            <button
              onClick={() => setTimeRange('12m')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === '12m' ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
            >
              Full Cycle
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${timeRange === 'ytd' ? 'bg-white dark:bg-neutral-700 shadow-sm text-neutral-900 dark:text-white' : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'}`}
            >
              Year-to-Date
            </button>
          </div>
        </div>
        <TrendLineChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-blue-600 p-8 rounded-2xl text-white">
          <Users className="w-8 h-8 mb-4 opacity-80" />
          <h4 className="text-2xl font-bold mb-2">Social Proof Trends</h4>
          <p className="text-blue-100 mb-6">Malaysia's EV market is rapidly transitioning from early adopters to the early majority stage. Early 2026 data shows that EV registration growth is significantly higher than the same period in 2025.</p>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 px-4 py-2 rounded-lg">
              <span className="text-sm block opacity-70">Adoption Phase</span>
              <span className="font-bold">Early Majority</span>
            </div>
          </div>
        </div>
        <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 text-white">
          <TrendingUp className="w-8 h-8 mb-4 text-purple-500" />
          <h3 className="text-2xl font-bold mb-2">Sustainable Milestones</h3>
          <p className="text-neutral-400 mb-6">Malaysia is on track to hit 100,000 cumulative EV registrations based on 2025 and 2026 growth trajectories.</p>
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${milestoneProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-neutral-500">
            <span>Current: {cumulativeEV.toLocaleString()}</span>
            <span>Goal: {milestoneGoal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
