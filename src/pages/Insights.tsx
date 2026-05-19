import { Lightbulb, Rocket, Target, ShieldCheck } from 'lucide-react';

const insights = [
  {
    title: 'Surge in Commercial EVs',
    description: 'B2B adoption of electric vans and pickup trucks is outpacing personal vehicle growth in suburban logistics hubs.',
    icon: Rocket,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Infrastructure Correlation',
    description: 'Registration density in Penang and Johor shows a 92% correlation with newly commissioned DC fast-charging sites.',
    icon: Target,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'Hybrid Market Resilience',
    description: 'Toyota and Honda hybrids continue to dominate the mid-tier segment, acting as a gateway for first-time electrified buyers.',
    icon: ShieldCheck,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
];

export default function Insights() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 text-center max-w-2xl mx-auto py-10">
        <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lightbulb className="w-8 h-8" />
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight">Market Insights</h2>
        <p className="text-neutral-500 text-lg">Automated intelligence and behavioral trends derived from the latest vehicle registration cycles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {insights.map((ins, i) => (
          <div key={i} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className={`w-12 h-12 ${ins.bg} ${ins.color} rounded-xl flex items-center justify-center mb-6`}>
               <ins.icon className="w-6 h-6" />
             </div>
             <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">{ins.title}</h3>
             <p className="text-neutral-500 text-sm leading-relaxed">{ins.description}</p>
             <button className="mt-8 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Read Full Report →</button>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-neutral-950 rounded-[40px] p-12 text-white relative overflow-hidden border border-neutral-800">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent"></div>
         <div className="relative z-10 max-w-xl">
           <h3 className="text-3xl font-bold mb-4">Subscribe to Data Updates</h3>
           <p className="text-neutral-400 mb-8">Receive monthly snapshots of the Malaysian EV landscape directly in your inbox. No spam, just pure data-driven insights.</p>
           <div className="flex gap-2">
             <input type="email" placeholder="Enter your email" className="bg-neutral-900 border border-neutral-800 rounded-xl px-6 py-3 flex-1 outline-none focus:border-blue-500" />
             <button className="bg-white text-black font-bold px-8 py-3 rounded-xl hover:bg-neutral-200 transition-colors">Join Now</button>
           </div>
         </div>
      </div>
    </div>
  );
}
