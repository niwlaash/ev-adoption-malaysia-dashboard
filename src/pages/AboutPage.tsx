import LegalLayout from '../layouts/LegalLayout';
import { Database, Zap, ShieldCheck, RefreshCw, BarChart3, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <LegalLayout title="Methodology & Data Sources">
      
      {/* Overview Intro */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 sm:p-6 shadow-xs">
        <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          About This Project
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          The <strong>Malaysia EV Open Data Portal</strong> is a public-benefit, independent analytics platform. It tracks Malaysia&apos;s transition toward electric vehicles (EVs) using official government registration datasets and verified public charging network records.
        </p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3 leading-relaxed">
          The dashboard supports Malaysia&apos;s National Energy Transition Roadmap (NETR) target of achieving 10,000 public charging points and encourages open civic data transparency.
        </p>
      </div>

      {/* 2 Main Data Feeds */}
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 pt-4">
        Primary Data Sources
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Source 1: JPJ / DOSM */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Vehicle Registrations
                </h3>
                <span className="text-[11px] text-neutral-500 font-mono">
                  JPJ & DOSM Open Data
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              Vehicle data is ingested from official government Parquet datasets published by the <strong>Road Transport Department (JPJ)</strong> and the <strong>Department of Statistics Malaysia (DOSM)</strong> via data.gov.my.
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc list-inside">
              <li>Covers all registrations from <strong>2022 through 2026 YTD</strong>.</li>
              <li>Filters by fuel category: <strong>Electric (BEV)</strong> and <strong>Hybrid (PHEV)</strong>.</li>
              <li>Broken down across all 16 states and federal territories.</li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
            Source: <a href="https://data.gov.my" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">data.gov.my</a>
          </div>
        </div>

        {/* Source 2: Open Charge Map */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-blue-700 dark:text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                  Charging Infrastructure
                </h3>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Open Charge Map (OCM)
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
              Charging station data is aggregated through Open Charge Map, the global public registry of EV charging locations.
            </p>
            <ul className="text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5 list-disc list-inside">
              <li>Over <strong>818 verified locations</strong> and <strong>2,504 public bays</strong>.</li>
              <li>Differentiates between <strong>AC Destination</strong> and <strong>DC Fast</strong> chargers.</li>
              <li>Mapped across highway corridors (PLUS, LPT, Pan Borneo) and city hubs.</li>
            </ul>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400">
            Source: <a href="https://openchargemap.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-700 dark:hover:text-neutral-300">openchargemap.org</a>
          </div>
        </div>

      </div>

      {/* Metrics Explained */}
      <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 pt-4">
        How Metrics Are Calculated
      </h2>

      <div className="space-y-3">
        
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              1. Cars Per Charger Ratio
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Calculated as: <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">Total Registered Pure EVs ÷ Verified Public Charging Bays</code>.
            The European Union (AFIR benchmark) recommends a ratio of <strong>10:1</strong> (1 charger for every 10 EVs). Malaysia currently stands at approximately <strong>41.3:1</strong>, showing significant room for charger expansion.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              2. State Parity Gap
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Measures fairness of charger distribution across states. Calculated as: <code className="bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-neutral-800 dark:text-neutral-200">State % of National Chargers − State % of National EVs</code>.
            A negative gap indicates that a state has more EVs than its share of charging infrastructure, signaling an urgent need for more local charging stations.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200/90 dark:border-neutral-800 rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <RefreshCw className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
              3. Automated Refresh Schedule
            </h3>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Our automated data pipeline runs on the <strong>1st of every month</strong> via GitHub Actions. It pulls newly released Parquet tables from DOSM, performs data cleaning (such as correcting misspelled state names and trimming trailing spaces), updates charging POIs, and generates fresh summary statistics.
          </p>
        </div>

      </div>

      {/* Licensing */}
      <div className="bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-xs text-neutral-600 dark:text-neutral-400">
        <div className="flex items-center gap-2 mb-2 text-neutral-900 dark:text-neutral-100 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Open Access & Creative Commons License</span>
        </div>
        <p className="leading-relaxed">
          All aggregated datasets produced by this project are released under the <strong>Creative Commons Attribution 4.0 International (CC BY 4.0)</strong> license. You are free to share, copy, analyze, or adapt this data for any purpose, including public policy research, journalism, and commercial analysis, provided proper credit is given to the portal.
        </p>
      </div>

    </LegalLayout>
  );
}
