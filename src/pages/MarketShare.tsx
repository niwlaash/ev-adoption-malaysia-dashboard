import MarketShareChart from '../components/charts/MarketShareChart';
import { Zap, Activity, Info } from 'lucide-react';

export default function MarketShare() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Market Share Analysis</h2>
        <p className="text-neutral-500">Comparing Electric, Hybrid, and Internal Combustion Engine (ICE) registration shares.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm">
           <div className="flex items-center justify-between mb-8">
             <div>
               <h3 className="text-xl font-bold">Powertrain Evolution (%)</h3>
               <p className="text-sm text-neutral-500">Historical shift from 2022 to 2026 projections.</p>
             </div>
             <div className="bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs font-bold text-neutral-500 uppercase tracking-wider">Historical Data</div>
           </div>
           <MarketShareChart />
        </div>

        <div className="flex flex-col gap-6">
           <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl text-white">
              <Zap className="w-6 h-6 mb-4 fill-white" />
              <h4 className="font-bold mb-1">EV Dominance</h4>
              <p className="text-sm text-purple-100">Electric vehicles now account for nearly 40% of all new high-end registrations in West Malaysia.</p>
           </div>
           
           <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-blue-500" />
                <h4 className="font-bold text-neutral-900 dark:text-white">Fuel Efficiency Impact</h4>
              </div>
              <p className="text-sm text-neutral-500 leading-relaxed">The shift to electrified powertrains is estimated to reduce total transportation carbon footprint by 12.5% by end of 2026.</p>
           </div>

           <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 mb-2 font-medium">
                <Info className="w-4 h-4" />
                <span className="text-xs">Methodology</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-tight">Data aggregated from DOSM registrars. ICE include Petrol and Diesel variants not including plugin hybrids.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
