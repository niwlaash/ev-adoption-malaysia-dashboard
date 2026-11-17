import React, { useState } from 'react';
import { Lightbulb, TrendingUp, Award, BatteryCharging, Clock, MapPin, Zap, ChevronDown, ChevronUp } from 'lucide-react';

interface InsightItem {
  id: string;
  tag: string;
  title: string;
  headline: string;
  statBadge: string;
  description: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
}

export const CivicInsightsDeck: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('era-shift');

  const insights: InsightItem[] = [
    {
      id: 'era-shift',
      tag: 'Car Choice',
      title: 'Malaysians Skipped Hybrids for Pure EVs',
      headline: 'From 17% pure electric in 2022 to over 70% in late 2025',
      statBadge: '70.2% Pure Electric Peak',
      description: 'When electric cars first arrived, over 80% of buyers chose hybrids because they were worried about battery range. But by late 2025, pure battery electric cars jumped to 70.2% of all green car registrations.',
      detail: 'Malaysians did not treat hybrids as a slow middle step. As soon as reliable fast chargers appeared along the PLUS highway and tax-free car prices kicked in, buyers felt confident enough to buy 100% electric cars right away.',
      icon: TrendingUp,
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      id: 'brand-wars',
      tag: 'Brand Race',
      title: 'How Proton Took the #1 Spot in 2026',
      headline: 'BMW in 2022 → BYD & Tesla in 2024 → Proton in 2026',
      statBadge: 'Proton: 53.1% in 2026',
      description: 'In 2022, electric cars were mostly luxury toys for the rich, with BMW holding 43.6% of the market. BYD and Tesla dominated 2024 with 73% of sales. But in 2026, Proton launched the e.MAS 7 and immediately captured more than half of all new EV sales.',
      detail: 'Bringing the starting price under RM100,000 changed everything. Electric cars stopped being an expensive luxury symbol and became affordable family cars that regular Malaysians can buy.',
      icon: Award,
      iconColor: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60'
    },
    {
      id: 'urban-bottleneck',
      tag: 'City Squeeze',
      title: 'The Big City Charger Crunch',
      headline: 'KL averages 74 cars per charger, while Perak has only 8',
      statBadge: 'KL: 74.5 to 1 Ratio',
      description: 'Kuala Lumpur has the most electric cars in the country (over 12,600 pure EVs), but only 170 public chargers. That means roughly 74 cars are competing for every single public plug—far worse than the global 10-to-1 safety recommendation.',
      detail: 'Condo and apartment drivers in KL and Penang feel this every evening because they cannot plug in at home. In contrast, Perak has only 8.5 cars per charger because energy companies built stations at busy highway rest stops (R&Rs).',
      icon: BatteryCharging,
      iconColor: 'text-amber-700 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60'
    },
    {
      id: 'policy-rush',
      tag: 'Tax Deadline',
      title: 'The End-of-2025 Buying Rush',
      headline: '21,742 electric cars registered in just 3 months',
      statBadge: '21,742 in Q4 2025',
      description: 'In the last three months of 2025, Malaysians registered over 21,700 pure electric cars in just 90 days—more than all of 2022 and 2023 combined! Drivers rushed to buy before government road tax exemptions ended.',
      detail: 'This massive jump shows how closely Malaysian car buyers watch government policies. Even though revised road tax rates began in 2026, the pre-tax rush pushed the total number of electrified cars on Malaysian roads past 100,000.',
      icon: Clock,
      iconColor: 'text-purple-700 dark:text-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-950/60'
    },
    {
      id: 'east-malaysia',
      tag: 'Regional Gap',
      title: 'The East Malaysia Charging Divide',
      headline: 'Sabah has 944 electric cars, but 0 open public chargers',
      statBadge: 'Sabah: 0 Open Bays',
      description: 'Sabah has 944 pure electric cars on the road, but verified public directories show zero open public charging bays. Owners have to rely almost entirely on home wallboxes or car showroom plugs.',
      detail: 'Sarawak is further ahead with 61 public charging bays for its 817 electric cars (about 13 cars per charger). Sabah urgently needs public charging infrastructure so drivers are not stuck charging only at home.',
      icon: MapPin,
      iconColor: 'text-rose-700 dark:text-rose-400',
      iconBg: 'bg-rose-50 dark:bg-rose-950/60'
    },
    {
      id: 'highway-vs-city',
      tag: 'Charging Locations',
      title: 'Malls Have Plenty, Highways Need More',
      headline: 'Over 2,300 chargers in cities, but only 51 on main expressways',
      statBadge: '93% in Urban Malls',
      description: 'Out of Malaysia’s 2,504 public chargers, over 93% are installed in shopping malls, office towers, and hotels. While weekend mall charging is easy, only around 50 public bays are located directly on the PLUS highway and East Coast Expressway.',
      detail: 'City drivers have plenty of places to top up while shopping or dining. But when thousands of families travel interstate for holidays or balik kampung trips, the small number of highway rest-stop chargers quickly leads to long queues.',
      icon: Zap,
      iconColor: 'text-cyan-700 dark:text-cyan-400',
      iconBg: 'bg-cyan-50 dark:bg-cyan-950/60'
    }
  ];

  const toggleInsight = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-neutral-100 dark:border-neutral-800 gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              Real Data Insights from Malaysian Roads
            </h2>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Six real-world findings uncovered from 5 years of official vehicle registration and charging records (2022–2026).
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider self-start sm:self-auto bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
          JPJ & OCM Verified
        </span>
      </div>

      {/* 6 Interactive Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {insights.map((item) => {
          const isExpanded = expandedId === item.id;
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-50/70 dark:bg-neutral-800/40 shadow-xs'
                  : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-900'
              }`}
            >
              {/* Collapsed Header / Trigger */}
              <div
                onClick={() => toggleInsight(item.id)}
                className="p-3.5 flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center ${item.iconColor} shrink-0 mt-0.5`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                        {item.tag}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {item.statBadge}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 mt-1 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                      {item.headline}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white shrink-0 mt-1 p-0.5"
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? 'Collapse insight' : 'Expand insight'}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expandable Body */}
              <div className="px-3.5 pb-3.5">
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  {item.description}
                </p>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-neutral-200/70 dark:border-neutral-700/60 text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed bg-white/60 dark:bg-neutral-900/60 p-2.5 rounded">
                    <strong className="text-neutral-800 dark:text-neutral-200 block mb-1">
                      Why this matters:
                    </strong>
                    {item.detail}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CivicInsightsDeck;
