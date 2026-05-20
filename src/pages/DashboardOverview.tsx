import { useMemo } from 'react';
import { useSummaryStats } from '../hooks/useMetricsData';
import AdoptionChart from '../components/charts/AdoptionChart.tsx';
import TopModelsBar from '../components/charts/TopModelsBar.tsx';
import TopEVModelsBar from '../components/charts/TopEVModelsBar.tsx';
import EVBrandTrend from '../components/charts/EVBrandTrend.tsx';
import FuelTypeDonut from '../components/charts/FuelTypeDonut.tsx';
import ElectricByCategory from '../components/charts/ElectricByCategory.tsx';

export default function DashboardOverview() {
  const { data, error, isLoading } = useSummaryStats();

  const kpis = useMemo(() => {
    if (!data) return [
      { title: 'Total Regs (2025)', value: '...', change: '...', positive: true },
      { title: 'Electric Vehicles', value: '...', change: '...', positive: true },
      { title: 'Hybrid Adoption', value: '...', change: '...', positive: true },
      { title: 'Market Sentiment', value: 'Live', change: 'Synced', positive: true },
    ];

    const stats = data.stats;

    return [
      { title: 'Total Regs (2025)', value: stats.total_2025.toLocaleString(), change: '+14%', positive: true },
      { title: 'EV Registrations', value: stats.ev_total_2025.toLocaleString(), change: 'Clean', positive: true },
      { title: 'Hybrid Count', value: stats.hybrid_total_2025.toLocaleString(), change: 'Verified', positive: true },
      { title: 'Total 2026 (YTD)', value: stats.total_2026.toLocaleString(), change: 'Growth', positive: true },
    ];
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-sm text-neutral-500">Official DOSM Vehicle Registration Analytics</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-xs">
          <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-md flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-500 animate-pulse' : error ? 'bg-red-500' : 'bg-green-500'}`}></div>
            {isLoading ? 'Fetching fresh monthly data...' : error ? `Error: ${error.message}` : 'Status: Data Cached (30-day sync active)'}
          </div>
          {!isLoading && !error && (
            <span className="text-neutral-500 italic">Next scheduled sync: 1st of next month</span>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(kpis || []).map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm flex flex-col justify-between">
            <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{kpi.title}</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">{kpi.value}</span>
              <span className={`text-sm font-bold ${kpi.positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Area Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg">EV Adoption Comparison</h3>
              <p className="text-sm text-neutral-500">Monthly registrations 2025 vs 2026</p>
            </div>
          </div>
          <AdoptionChart />
        </div>

        {/* Donut Chart */}
        <div className="col-span-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div>
            <h3 className="font-semibold text-lg">Fuel Type Distribution</h3>
            <p className="text-sm text-neutral-500">Market share by powertrain</p>
          </div>
          <FuelTypeDonut />
        </div>

        {/* Overall Market Rankings */}
        <div className="col-span-1 lg:col-span-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Top Make & Model (Overall)</h3>
              <p className="text-sm text-neutral-500 mb-4">Highest cumulative registrations (All Types)</p>
              <TopModelsBar />
            </div>
            <div className="w-px h-full bg-neutral-200 dark:bg-neutral-800 hidden md:block" />
            <div className="flex-1 pt-6 md:pt-0">
              <h3 className="font-semibold text-lg">Top EV Make & Model</h3>
              <p className="text-sm text-neutral-500 mb-4">Electric-only market leaders</p>
              <TopEVModelsBar />
            </div>
          </div>
        </div>

        {/* Brand Popularity Trend */}
        <div className="col-span-1 lg:col-span-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div>
            <h3 className="font-semibold text-lg">EV Brand Popularity Trend (2025-Present)</h3>
            <p className="text-sm text-neutral-500 mb-4">Monthly adoption velocity for Top 5 Electric Brands</p>
          </div>
          <EVBrandTrend />
        </div>

        {/* Electric by Category */}
        <div className="col-span-1 lg:col-span-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-sm">
          <div>
            <h3 className="font-semibold text-lg">Electric Breakdown by Category</h3>
            <p className="text-sm text-neutral-500">Comparing Electric adoption across Cars, Motorcycles, Busses, etc.</p>
          </div>
          <ElectricByCategory />
        </div>
      </div>
    </div>
  );
}
