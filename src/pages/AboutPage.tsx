import { Globe, Shield, Database } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1 items-center text-center py-12">
        <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">About EV Analytics</h2>
        <p className="text-neutral-500 text-xl max-w-2xl">Visualizing the silent revolution of Malaysia's transportation landscape through data-first storytelling.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-10 border-t border-neutral-200 dark:border-neutral-800">
         <div className="space-y-6">
            <h3 className="text-3xl font-bold">Our Mission</h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-lg">
              We believe that transparency in public data accelerates societal change. By making complex vehicle registration datasets from DOSM accessible and interactive, we help stakeholders, investors, and citizens understand the momentum behind green energy in Malaysia.
            </p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">100%</div>
                  <div className="text-xs text-neutral-500 uppercase">Open Data Sourced</div>
               </div>
               <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                  <div className="text-2xl font-bold text-neutral-900 dark:text-white">20ms</div>
                  <div className="text-xs text-neutral-500 uppercase">Parsing Latency</div>
               </div>
            </div>
         </div>
         <div className="grid grid-cols-1 gap-6">
            <div className="flex gap-4 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
               <Globe className="w-10 h-10 text-blue-500 shrink-0" />
               <div>
                  <h4 className="font-bold mb-1">Global Standards</h4>
                  <p className="text-sm text-neutral-500">Built using international Apache Arrow standards for lightning-fast cross-platform data compatibility.</p>
               </div>
            </div>
            <div className="flex gap-4 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
               <Database className="w-10 h-10 text-purple-500 shrink-0" />
               <div>
                  <h4 className="font-bold mb-1">Pure Client-side</h4>
                  <p className="text-sm text-neutral-500">No backend required. We process millions of rows directly in your browser using WebAssembly technology.</p>
               </div>
            </div>
            <div className="flex gap-4 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm">
               <Shield className="w-10 h-10 text-green-500 shrink-0" />
               <div>
                  <h4 className="font-bold mb-1">Data Sovereignty</h4>
                  <p className="text-sm text-neutral-500">All analytics are computed on the fly from official Malaysia government open data repositories.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
