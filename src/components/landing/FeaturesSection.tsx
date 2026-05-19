import { motion } from 'framer-motion';
import { BarChart, Layers, LineChart, PieChart } from 'lucide-react';

const features = [
  {
    title: 'EV Trend Tracking',
    description: 'Track electric vehicle adoption curves with precise monthly and quarterly aggregations.',
    icon: LineChart
  },
  {
    title: 'Vehicle Type Analysis',
    description: 'Analyze adoption based on vehicle categories including Motokar, Jip, and Motorcycles.',
    icon: Layers
  },
  {
    title: 'Market Share Comparison',
    description: 'Compare adoption rates between Electric, Hybrid, and traditional Petrol variants.',
    icon: PieChart
  },
  {
    title: 'Interactive Filtering',
    description: 'Deep dive into data with interactive sorting, date filtering, and granular segmentations.',
    icon: BarChart
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-neutral-950 px-4 sm:px-6 lg:px-8 w-full relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-6"
            >
              Comprehensive Analytics at Your Fingertips
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-neutral-400 mb-8"
            >
              Our dashboard transforms millions of raw rows into intuitive, beautiful charts. Built with Apache Arrow and WASM to parse datasets locally at blazing fast speeds.
            </motion.p>
            <ul className="space-y-6">
              {(features || []).map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  className="flex gap-4"
                >
                  <div className="mt-1 bg-neutral-900 border border-neutral-800 p-2 rounded-lg text-neutral-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-neutral-500 text-sm mt-1">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-full min-h-[500px] border border-neutral-800 bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center"
          >
            {/* Minimal Dashboard Mockup inside Card */}
            <div className="absolute inset-x-4 inset-y-4 rounded-2xl border border-neutral-800 bg-neutral-950 flex flex-col overflow-hidden">
               <div className="h-12 border-b border-neutral-800 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                 <div className="w-3 h-3 rounded-full bg-green-500"></div>
                 <div className="ml-4 h-4 w-32 bg-neutral-800 rounded"></div>
               </div>
               <div className="flex-1 p-4 grid grid-cols-2 gap-4">
                 <div className="col-span-2 h-32 bg-neutral-900 border border-neutral-800 rounded-xl relative overflow-hidden flex items-end">
                    <div className="absolute top-4 left-4 h-4 w-24 bg-neutral-800 rounded"></div>
                    <div className="w-full h-1/2 bg-gradient-to-t from-blue-500/20 to-transparent"></div>
                 </div>
                 <div className="h-40 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center relative">
                    <div className="w-20 h-20 rounded-full border-4 border-neutral-800 border-t-purple-500"></div>
                 </div>
                 <div className="h-40 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col justify-end p-4 gap-2">
                    <div className="h-4 w-full bg-neutral-800 rounded"></div>
                    <div className="h-4 w-2/3 bg-neutral-800 rounded"></div>
                    <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
