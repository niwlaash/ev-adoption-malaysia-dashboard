import React, { useState } from 'react';
import { Lightbulb, TrendingUp, Award, BatteryCharging, Clock, ChevronDown, ChevronUp } from 'lucide-react';

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
      tag: 'Market Transformation',
      title: 'The Hybrid-to-Pure-EV Flip',
      headline: 'From 17.5% in 2022 to 70.2% in 2025',
      statBadge: '70.2% Pure Electric Peak',
      description: 'In early 2022, hybrids were the cautious stepping stone, taking 82.5% of green car sales while pure EVs were just 17.5%. By late 2025, pure battery electric cars completely overtook hybrids, surging to 70.2% of all new electrified registrations.',
      detail: 'Malaysian drivers have largely bypassed hybrids as an interim technology. The expansion of 150kW+ DC fast charging along the PLUS highway and duty-free pricing pushed consumer confidence straight into 100% battery electric vehicles.',
      icon: TrendingUp,
      iconColor: 'text-emerald-700 dark:text-emerald-400',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60'
    },
    {
      id: 'brand-wars',
      tag: 'Brand Dynasties',
      title: 'Three Eras of EV Leadership',
      headline: 'BMW (2022) → BYD/Tesla (2024) → Proton e.MAS (2026)',
      statBadge: 'Proton e.MAS 53.1% in 2026',
      description: 'The market underwent three distinct phases: In 2022, BMW led with 43.6% in a luxury niche. By 2024, BYD (45.8%) and Tesla (27.4%) formed a 73.2% duopoly. In 2026, Proton e.MAS captured 53.1%, making a domestic badge #1 for the first time.',
      detail: 'The entry of affordable mass-market models under RM100,000 permanently broke the foreign luxury monopoly, transitioning electric vehicles from an executive status symbol to mainstream household mobility.',
      icon: Award,
      iconColor: 'text-blue-700 dark:text-blue-400',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60'
    },
    {
      id: 'urban-bottleneck',
      tag: 'Infrastructure Reality',
      title: 'The Urban Charger Crunch',
      headline: 'KL averages 74.5 EVs per bay vs Perak’s 8.5',
      statBadge: 'KL: 74.5 to 1 Ratio',
      description: 'Kuala Lumpur has the most electric cars (12,671 BEVs) but only 170 public bays—a severe bottleneck of 74.5 cars per charger (7.5x worse than the EU 10:1 target). Meanwhile, Perak meets the EU benchmark (8.5:1) thanks to highway R&R stations.',
      detail: 'Urban density is the primary pressure point. High-rise condominium dwellers in KL and Penang face overnight charging deficits, whereas Peninsular inter-city highway corridors have received the bulk of initial fast-charger private investments.',
      icon: BatteryCharging,
      iconColor: 'text-amber-700 dark:text-amber-400',
      iconBg: 'bg-amber-50 dark:bg-amber-950/60'
    },
    {
      id: 'policy-rush',
      tag: 'Policy Dynamics',
      title: 'The 2025 Q4 Pre-Tax Rush',
      headline: '21,742 Pure EVs registered in a single quarter',
      statBadge: '+132% YoY Surge',
      description: 'The final quarter of 2025 saw an all-time record of 21,742 pure EV registrations—more than all of 2022 and 2023 combined. Buyers and corporate fleets rushed to beat the expiration of the full road tax and duty exemption window.',
      detail: 'This dramatic acceleration illustrates how sensitive Malaysian consumers are to fiscal policy. Even with revised JPJ EV road tax tiers introduced for 2026, the volume created an enduring baseline of over 100,000 electrified cars on road.',
      icon: Clock,
      iconColor: 'text-purple-700 dark:text-purple-400',
      iconBg: 'bg-purple-50 dark:bg-purple-950/60'
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
              Curated Civic Data Insights
            </h2>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Four key structural shifts uncovered from 5 years of official vehicle registration records (2022–2026).
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-wider self-start sm:self-auto bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
          JPJ & OCM Corpus
        </span>
      </div>

      {/* 4 Interactive Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expandable Body */}
              {isExpanded && (
                <div className="px-3.5 pb-3.5 pt-1 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/80 mt-1 space-y-2">
                  <p>{item.description}</p>
                  <div className="p-2.5 rounded bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400">
                    <strong className="text-neutral-800 dark:text-neutral-200 font-semibold block mb-0.5">
                      Civic Takeaway:
                    </strong>
                    {item.detail}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CivicInsightsDeck;
