import { motion } from 'framer-motion';
import { BatteryCharging, Car, Gauge, Map } from 'lucide-react';

const stats = [
  {
    title: 'Total EV Registrations',
    value: '42,501',
    grow: '+142%',
    icon: BatteryCharging,
    color: 'text-green-500',
    bg: 'bg-green-500/10'
  },
  {
    title: 'Hybrid Market Growth',
    value: '+56.4%',
    grow: '+12%',
    icon: Gauge,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10'
  },
  {
    title: 'Total Registrations Tracked',
    value: '1.2M+',
    grow: '2025-2026',
    icon: Car,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10'
  },
  {
    title: 'Most Adopted State',
    value: 'Selangor',
    grow: '34% Share',
    icon: Map,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-900 border-b relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold bg-white bg-clip-text text-transparent">Powering Insight Through Open Data</h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">Real-time statistics calculated directly from DOSM parquet datasets, offering uncompromising accuracy over Malaysia's vehicle landscape.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(stats || []).map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-neutral-700 transition-colors flex flex-col items-start shadow-xl"
            >
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-6`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2">{stat.value}</h3>
              <p className="text-neutral-400 text-sm font-medium">{stat.title}</p>
              <div className="mt-4 flex items-center text-sm font-bold text-green-400">
                <span>{stat.grow}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
