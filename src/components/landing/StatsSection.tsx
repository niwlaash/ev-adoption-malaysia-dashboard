import { motion } from 'framer-motion';
import { BatteryCharging, Car, Gauge, Map } from 'lucide-react';
import { useSummaryStats } from '../../hooks/useMetricsData';

export default function StatsSection() {
  const { data, isLoading } = useSummaryStats();

  if (isLoading) {
    return (
      <section className="py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-900 border-b">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 bg-neutral-900 animate-pulse rounded-2xl border border-neutral-800" />
          ))}
        </div>
      </section>
    );
  }

  const statsData = data?.stats || {};
  const evTotal = statsData.ev_total_2025 || 0;
  const evShare = statsData.total_2025 ? ((evTotal / statsData.total_2025) * 100).toFixed(1) : 0;
  const totalMarket = statsData.total_2025 ? (statsData.total_2025 / 1000).toFixed(0) + 'K' : '...';
  const topState = data?.state_dist?.[0]?.state || '...';
  const topStatePercent = data?.state_dist?.[0]?.count ? ((data.state_dist[0].count / evTotal) * 100).toFixed(0) + '%' : '';

  const displayStats = [
    {
      title: 'Electric Vehicles (2025)',
      value: evTotal.toLocaleString(),
      grow: 'Clean Registration',
      icon: BatteryCharging,
      color: 'text-green-500',
      bg: 'bg-green-500/10'
    },
    {
      title: 'EV Market Share',
      value: `${evShare}%`,
      grow: 'of Total Sales',
      icon: Gauge,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Overall Market Size',
      value: totalMarket,
      grow: 'Units Tracked',
      icon: Car,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Leading EV Hub',
      value: topState,
      grow: `${topStatePercent} Adoption`,
      icon: Map,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    }
  ];

  return (
    <section className="py-20 bg-neutral-950 px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-900 border-b relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">Powering Insight Through Open Data</h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
            Real-time statistics calculated directly from DOSM parquet datasets, offering uncompromising accuracy over Malaysia's vehicle landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-neutral-950 rounded-2xl p-6 border border-neutral-900 hover:border-neutral-800 transition-colors flex flex-col items-start shadow-xl group"
            >
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2 tracking-tighter">{stat.value}</h3>
              <p className="text-neutral-400 text-sm font-medium">{stat.title}</p>
              <div className="mt-4 flex items-center text-sm font-bold text-neutral-600">
                <span>{stat.grow}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
