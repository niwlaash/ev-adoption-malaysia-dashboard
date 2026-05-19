import { Trophy, TrendingUp, Minus, Users } from 'lucide-react';

const models = [
  { rank: 1, name: 'Tesla Model 3', share: '18.2%', growth: '+12%', color: 'bg-purple-500' },
  { rank: 2, name: 'BYD Atto 3', share: '15.4%', growth: '+8%', color: 'bg-blue-500' },
  { rank: 3, name: 'Tesla Model Y', share: '12.8%', growth: '+15%', color: 'bg-indigo-500' },
  { rank: 4, name: 'BMW iX', share: '9.2%', growth: '+4%', color: 'bg-cyan-500' },
  { rank: 5, name: 'GWM Ora Good Cat', share: '7.5%', growth: '-2%', color: 'bg-emerald-500' },
];

export default function TopModels() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Top Models Leaderboard</h2>
        <p className="text-neutral-500">Ranking the most popular EV and Hybrid models by registration volume.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
           <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex bg-items-center justify-between">
              <h3 className="font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Current Rankings
              </h3>
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-widest">Q1 2026</span>
           </div>
           
           <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
             {models.map((m) => (
               <div key={m.rank} className="p-6 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/10`}>
                     {m.rank}
                   </div>
                   <div>
                     <h4 className="font-bold text-neutral-900 dark:text-white">{m.name}</h4>
                     <p className="text-xs text-neutral-500">{m.share} Market Share</p>
                   </div>
                 </div>
                 <div className={`flex items-center gap-1 font-bold text-sm ${m.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                   {m.growth.startsWith('+') ? <TrendingUp className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
                   {m.growth}
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Consumer Preference</h3>
              <p className="text-neutral-500 mb-8">Detailed breakdown of why specific models are leading the adoption curve in the current climate.</p>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="font-medium">Price/Performance Ratio</span>
                       <span className="text-blue-500 font-bold">High</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full">
                       <div className="bg-blue-500 h-full w-[90%] rounded-full"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="font-medium">Charging Infrastructure Accessibility</span>
                       <span className="text-purple-500 font-bold">Medium</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full">
                       <div className="bg-purple-500 h-full w-[65%] rounded-full"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                       <span className="font-medium">Second-hand Resale Confidence</span>
                       <span className="text-green-500 font-bold">Stable</span>
                    </div>
                    <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full">
                       <div className="bg-green-500 h-full w-[45%] rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl text-white flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                 </div>
                 <div>
                    <h4 className="font-bold">Model Comparison Tool</h4>
                    <p className="text-xs text-neutral-400 italic">Compare specs side-by-side</p>
                 </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors">Try Now</button>
           </div>
        </div>
      </div>
    </div>
  );
}
