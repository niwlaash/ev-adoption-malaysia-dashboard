import { Search, Filter, Download } from 'lucide-react';

const mockCompareData = [
  { make: 'Tesla', model: 'Model 3', type: 'BEV', range: '438km', price: 'RM 181,000', sales: 4201 },
  { make: 'BYD', model: 'Atto 3', type: 'BEV', range: '410km', price: 'RM 149,000', sales: 3850 },
  { make: 'BMW', model: 'iX', type: 'BEV', range: '425km', price: 'RM 403,000', sales: 1240 },
  { make: 'GWM', model: 'Ora Good Cat', type: 'BEV', range: '400km', price: 'RM 139,000', sales: 980 },
  { make: 'Honda', model: 'City RS', type: 'HEV', range: '800km+', price: 'RM 108,000', sales: 12400 },
];

export default function VehicleSearch() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold tracking-tight">Vehicle Comparison</h2>
          <p className="text-neutral-500">Search and compare specific models by performance and adoption rate.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-xl shadow-sm flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search by make or model..." 
            className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg pl-10 pr-4 py-2 outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Filter className="w-4 h-4" /> All Fuel Types
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400">
            2025-2026
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Make & Model</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Est. Range</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">MSRP (Starting)</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">2026 Regs</th>
                <th className="px-6 py-4 text-xs font-bold text-neutral-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {mockCompareData.map((v, i) => (
                <tr key={i} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-neutral-900 dark:text-white">{v.make}</span>
                      <span className="text-xs text-neutral-500">{v.model}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      v.type === 'BEV' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400'
                    }`}>
                      {v.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{v.range}</td>
                  <td className="px-6 py-4 text-sm font-medium">{v.price}</td>
                  <td className="px-6 py-4 text-sm font-bold text-neutral-900 dark:text-white">{v.sales.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                      Rising
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
