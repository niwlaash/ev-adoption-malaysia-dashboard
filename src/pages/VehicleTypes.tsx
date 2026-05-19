import VehicleTypeTreemap from '../components/charts/VehicleTypeTreemap';
import { Layers, Info } from 'lucide-react';

export default function VehicleTypes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Vehicle Types Distribution</h2>
        <p className="text-neutral-500">Categorical breakdown of registered vehicles by body type and usage.</p>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold">Registration Volume by Category</h3>
            <p className="text-sm text-neutral-500">Visualizing the scale of different vehicle segments in Malaysia.</p>
          </div>
          <Layers className="w-6 h-6 text-neutral-400" />
        </div>
        <VehicleTypeTreemap />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-neutral-50 dark:bg-neutral-800/30 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h4 className="font-bold flex items-center gap-2 mb-4">
              <Info className="w-4 h-4 text-blue-500" />
              Segment Insights
            </h4>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex justify-between"><span>SUV Segment Growth</span> <span className="font-bold text-neutral-900 dark:text-white">+24%</span></li>
              <li className="flex justify-between"><span>Sedan Market Retention</span> <span className="font-bold text-neutral-900 dark:text-white">High</span></li>
              <li className="flex justify-between"><span>Electric Micro-mobility</span> <span className="font-bold text-neutral-900 dark:text-white">Emerging</span></li>
            </ul>
         </div>
      </div>
    </div>
  );
}
