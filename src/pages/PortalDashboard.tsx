import React, { useState, useMemo, useEffect } from 'react';
import { useSummaryStats } from '../hooks/useMetricsData';
import { PortalHeader } from '../components/portal/PortalHeader';
import { CivicControlCenter } from '../components/portal/CivicControlCenter';
import { StateComparator } from '../components/portal/StateComparator';
import { KpiRow } from '../components/portal/KpiRow';
import { RegistrationChart } from '../components/portal/RegistrationChart';
import { StateRankings, type StateRecord } from '../components/portal/StateRankings';
import { TopMakesChart, type MakeRecord } from '../components/portal/TopMakesChart';
import { ChargingSplitChart, type CorridorRecord } from '../components/portal/ChargingSplitChart';
import { OpenDataTable } from '../components/portal/OpenDataTable';
import { PortalFooter } from '../components/portal/PortalFooter';
import { downloadSafeCsv } from '../lib/security';
import { AlertCircle } from 'lucide-react';

export const PortalDashboard: React.FC = () => {
  const { data, isLoading, error } = useSummaryStats();

  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [isDark, setIsDark] = useState<boolean>(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const stats = useMemo(() => data?.stats || {}, [data]);
  const milestones = useMemo(() => data?.milestones || {}, [data]);
  const stateTable: StateRecord[] = useMemo(() => data?.state_table || [], [data]);
  const chargingInfra = useMemo(() => data?.charging_infra || {}, [data]);
  const topMakesByState = useMemo(() => data?.top_makes?.by_state || {}, [data]);

  // Extract clean unique state names for filter dropdown
  const availableStates = useMemo(() => {
    return stateTable
      .map((s: StateRecord) => s.state)
      .filter((name: string) => name && name !== 'Other/Unknown' && name !== 'Corporate Fleet')
      .sort();
  }, [stateTable]);

  // Title suffix indicating active filter context
  const activeContextSuffix = useMemo(() => {
    const parts: string[] = [];
    if (selectedState !== 'all') {
      parts.push(selectedState);
    } else if (selectedRegion !== 'all') {
      parts.push(selectedRegion);
    }
    if (selectedYear !== 'all') {
      parts.push(selectedYear === '2026' ? '2026 YTD' : selectedYear);
    }
    return parts.length > 0 ? `(${parts.join(' • ')})` : '';
  }, [selectedState, selectedRegion, selectedYear]);

  // Dynamic Multi-Dimensional Quarterly Trends
  const activeQuarterlyTrends = useMemo(() => {
    if (!data?.quarterly_trends) return [];

    let series: { period: string; bev: number; hybrid: number; total_ev: number }[];
    
    // 1. State-specific quarterly trend
    if (selectedState !== 'all' && data.quarterly_trends.by_state?.[selectedState]) {
      series = data.quarterly_trends.by_state[selectedState];
    }
    // 2. Region-specific quarterly trend
    else if (selectedRegion !== 'all' && data.quarterly_trends.by_region?.[selectedRegion]) {
      series = data.quarterly_trends.by_region[selectedRegion];
    }
    // 3. National Year-specific trend
    else if (selectedYear !== 'all' && data.quarterly_trends[selectedYear]) {
      return data.quarterly_trends[selectedYear];
    }
    // 4. Default National 2022-2026
    else {
      series = data.quarterly_trends.all || [];
    }

    // Filter by year if year is selected alongside state or region
    if (selectedYear !== 'all') {
      return series.filter((q) => q.period.startsWith(selectedYear));
    }

    return series;
  }, [data, selectedState, selectedRegion, selectedYear]);

  // Dynamic Multi-Dimensional Top EV Makes
  const activeTopMakes: MakeRecord[] = useMemo(() => {
    if (!data?.top_makes) return [];

    // State-specific top brands
    if (selectedState !== 'all' && data.top_makes.by_state?.[selectedState]) {
      return data.top_makes.by_state[selectedState];
    }

    // Region-specific top brands
    if (selectedRegion !== 'all' && data.top_makes.by_region?.[selectedRegion]) {
      return data.top_makes.by_region[selectedRegion];
    }

    // Year-specific national brands
    if (selectedYear !== 'all' && data.top_makes.by_year?.[selectedYear]) {
      return data.top_makes.by_year[selectedYear];
    }

    // All-time top brands (2022-2026)
    return data.top_makes.by_year?.all || [];
  }, [data, selectedState, selectedRegion, selectedYear]);

  // Filtered State Table
  const activeStateTable = useMemo(() => {
    let list = stateTable;
    if (selectedRegion !== 'all') {
      list = list.filter((r) => r.region === selectedRegion);
    }
    if (selectedState !== 'all') {
      list = list.filter((r) => r.state === selectedState);
    }
    return list;
  }, [stateTable, selectedRegion, selectedState]);

  // Dynamic Charging Infrastructure Slices
  const activeCorridors: CorridorRecord[] = useMemo(() => {
    if (!chargingInfra?.corridors) return [];

    // If state is selected, map state charger data
    if (selectedState !== 'all' && chargingInfra.state_chargers?.[selectedState]) {
      const stateCh = chargingInfra.state_chargers[selectedState];
      return [
        {
          corridor: `${selectedState} Public Grid`,
          stations: stateCh.stations,
          bays: stateCh.bays,
          ac: stateCh.ac,
          dc: stateCh.dc,
        },
      ];
    }

    // If region is selected, aggregate stations in that region
    if (selectedRegion !== 'all') {
      const regionalStates = stateTable.filter((s) => s.region === selectedRegion);
      let regAc = 0;
      let regDc = 0;
      let regBays = 0;
      let regStations = 0;

      for (const st of regionalStates) {
        const sc = chargingInfra.state_chargers?.[st.state];
        if (sc) {
          regAc += sc.ac;
          regDc += sc.dc;
          regBays += sc.bays;
          regStations += sc.stations;
        }
      }

      return [
        {
          corridor: `${selectedRegion} Regional Grid`,
          stations: regStations,
          bays: regBays,
          ac: regAc,
          dc: regDc,
        },
      ];
    }

    return chargingInfra.corridors;
  }, [chargingInfra, selectedState, selectedRegion, stateTable]);

  // Dynamic KPI Metric Calculations
  const activeKpis = useMemo(() => {
    // 1. Single State Selected
    if (selectedState !== 'all') {
      const stRecord = stateTable.find((s) => s.state === selectedState);
      if (stRecord) {
        let evCount = stRecord.bev_registrations;
        if (selectedYear !== 'all') {
          const yObj = (stRecord as StateRecord & { yearly_bev?: Record<string, number> }).yearly_bev;
          if (yObj && yObj[selectedYear] !== undefined) {
            evCount = yObj[selectedYear];
          }
        }
        return {
          totalEvs: evCount,
          yoyGrowth: stRecord.growth_rate,
          evShare: 7.6,
          evSharePrevious: 5.2,
          chargingBays: stRecord.charging_bays,
          netrTarget: Math.round(10000 * ((stRecord.charging_bays || 1) / (stats.charging_bays || 2504))),
          netrProgress: Math.min(Math.round(((stRecord.charging_bays || 0) / 1000) * 100), 100),
          evToChargerRatio: stRecord.ev_charger_ratio,
        };
      }
    }

    // 2. Region Selected
    if (selectedRegion !== 'all') {
      const regStates = stateTable.filter((s) => s.region === selectedRegion);
      const regEvs = regStates.reduce((acc, curr) => acc + curr.bev_registrations, 0);
      const regBays = regStates.reduce((acc, curr) => acc + curr.charging_bays, 0);
      const regRatio = regBays > 0 ? Number((regEvs / regBays).toFixed(1)) : 0;
      return {
        totalEvs: regEvs,
        yoyGrowth: 38.4,
        evShare: 7.6,
        evSharePrevious: 5.2,
        chargingBays: regBays,
        netrTarget: Math.round(10000 * (regBays / (stats.charging_bays || 2504))),
        netrProgress: Math.min(Math.round((regBays / (stats.charging_bays || 2504)) * 100), 100),
        evToChargerRatio: regRatio,
      };
    }

    // 3. Year Selected (National)
    if (selectedYear !== 'all' && stats.annual?.[selectedYear]) {
      const yrStat = stats.annual[selectedYear];
      return {
        totalEvs: yrStat.ev_total,
        yoyGrowth: yrStat.yoy_growth,
        evShare: yrStat.ev_share_tiv,
        evSharePrevious: selectedYear === '2026' ? 5.15 : selectedYear === '2025' ? 2.54 : 1.6,
        chargingBays: stats.charging_bays || 2504,
        netrTarget: stats.netr_target || 10000,
        netrProgress: stats.netr_progress || 25.0,
        evToChargerRatio: Number((yrStat.ev_total / (stats.charging_bays || 2504)).toFixed(1)),
      };
    }

    // 4. Default Cumulative (2022-2026 National)
    return {
      totalEvs: stats.total_evs_cumulative || 103515,
      yoyGrowth: stats.annual?.['2026']?.yoy_growth || 38.4,
      evShare: stats.annual?.['2026']?.ev_share_tiv || 7.58,
      evSharePrevious: stats.annual?.['2025']?.ev_share_tiv || 5.15,
      chargingBays: stats.charging_bays || 2504,
      netrTarget: stats.netr_target || 10000,
      netrProgress: stats.netr_progress || 25.0,
      evToChargerRatio: stats.ev_to_charger_ratio || 41.3,
    };
  }, [selectedState, selectedRegion, selectedYear, stateTable, stats]);

  // Export handlers with CWE-1236 Formula Injection Protection
  const handleExportCsv = () => {
    const headers = ['State', 'Region', 'BEVs', 'Hybrids', 'Total Electrified', 'Charging Bays', 'AC Bays', 'DC Bays', 'EV:Charger Ratio'];
    const rows = stateTable.map((s) => [
      s.state,
      s.region || 'Other',
      s.bev_registrations,
      s.hybrid_registrations,
      s.total_electrified,
      s.charging_bays,
      s.ac_bays,
      s.dc_bays,
      s.ev_charger_ratio,
    ]);
    downloadSafeCsv(`malaysia_ev_opendata_${new Date().toISOString().split('T')[0]}.csv`, headers, rows);
  };

  const handleExportJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.setAttribute('download', `malaysia_ev_opendata_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-neutral-900 dark:border-neutral-100 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
          Loading Official Vehicle Registration Feeds...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-neutral-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm text-center">
          <AlertCircle className="w-9 h-9 text-rose-500 mx-auto mb-3" />
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
            Open Data Feed Disconnected
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Unable to load summary statistics. Please verify your connection to the public data store.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded text-xs font-semibold cursor-pointer"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B0F19] text-neutral-900 dark:text-neutral-100 font-sans antialiased transition-colors flex flex-col justify-between">
      
      {/* 1. Header Bar */}
      <div>
        <PortalHeader
          onExportCsv={handleExportCsv}
          onExportJson={handleExportJson}
          lastUpdated={stats.last_updated}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
          
          {/* 2. Unified Civic Control Center (Horizon Scrubber + Scope Toolbar + Active Tags) */}
          <CivicControlCenter
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedState={selectedState}
            onStateChange={setSelectedState}
            availableStates={availableStates}
            milestones={milestones}
            annualStats={stats.annual}
          />

          {/* 4. Interactive Head-to-Head State Comparison Tool */}
          <StateComparator
            stateTable={stateTable}
            topMakesByState={topMakesByState}
          />

          {/* 5. Metric Stat Cards */}
          <KpiRow
            totalEvs={activeKpis.totalEvs}
            yoyGrowth={activeKpis.yoyGrowth}
            evShare={activeKpis.evShare}
            evSharePrevious={activeKpis.evSharePrevious}
            chargingBays={activeKpis.chargingBays}
            netrTarget={activeKpis.netrTarget}
            netrProgress={activeKpis.netrProgress}
            evToChargerRatio={activeKpis.evToChargerRatio}
          />

          {/* 6. Primary Data Grid (60% / 40%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: BEV vs Hybrid Quarterly Registrations (60%) */}
            <div className="lg:col-span-7">
              <RegistrationChart
                data={activeQuarterlyTrends}
                titleSuffix={activeContextSuffix}
              />
            </div>

            {/* Right: State Fleet & Charger Distribution (40%) */}
            <div className="lg:col-span-5">
              <StateRankings
                data={activeStateTable}
                selectedState={selectedState}
                onSelectState={setSelectedState}
              />
            </div>
          </div>

          {/* 7. Secondary Equal Data Grid (50% / 50%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left: Market Share by Manufacturer (50%) */}
            <div className="lg:col-span-6">
              <TopMakesChart
                data={activeTopMakes}
                titleSuffix={activeContextSuffix}
              />
            </div>

            {/* Right: Charging Infrastructure by Location (50%) */}
            <div className="lg:col-span-6">
              <ChargingSplitChart
                data={activeCorridors}
                titleSuffix={activeContextSuffix}
              />
            </div>
          </div>

          {/* 8. State-by-State Open Data Table */}
          <OpenDataTable data={activeStateTable} />

        </main>
      </div>

      {/* 9. Civic Open Data Footer */}
      <PortalFooter />

    </div>
  );
};

export default PortalDashboard;
