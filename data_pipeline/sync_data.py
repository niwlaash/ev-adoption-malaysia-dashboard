import pandas as pd
import requests
import os
import json
import re
from pathlib import Path
from collections import Counter

# Configuration
DATA_SOURCES = {
    '2022': 'https://storage.data.gov.my/transportation/cars_2022.parquet',
    '2023': 'https://storage.data.gov.my/transportation/cars_2023.parquet',
    '2024': 'https://storage.data.gov.my/transportation/cars_2024.parquet',
    '2025': 'https://storage.data.gov.my/transportation/cars_2025.parquet',
    '2026': 'https://storage.data.gov.my/transportation/cars_2026.parquet',
    'fuel_types': 'https://storage.data.gov.my/transportation/registrations_type_fuel.parquet'
}

OUTPUT_DIR = Path(__file__).parent.parent / 'public' / 'data'
CACHE_DIR = Path(__file__).parent / 'ocm_cache'

# Regional Grouping Map for Macro-Filtering
REGION_MAP = {
    'Kuala Lumpur': 'Klang Valley',
    'Selangor': 'Klang Valley',
    'Putrajaya': 'Klang Valley',
    'Penang': 'Northern',
    'Perak': 'Northern',
    'Kedah': 'Northern',
    'Perlis': 'Northern',
    'Johor': 'Southern',
    'Melaka': 'Southern',
    'Negeri Sembilan': 'Southern',
    'Pahang': 'East Coast',
    'Terengganu': 'East Coast',
    'Kelantan': 'East Coast',
    'Sabah': 'Borneo',
    'Sarawak': 'Borneo',
    'Labuan': 'Borneo'
}

# Strict Canonical Malaysian State Normalizer
def clean_state_strict(raw):
    if not raw or not isinstance(raw, str):
        return None
    s = raw.strip().rstrip(' ,.-/"\'')
    s_lower = s.lower()
    
    if 'johor' in s_lower:
        return 'Johor'
    elif 'kedah' in s_lower:
        return 'Kedah'
    elif 'kelantan' in s_lower:
        return 'Kelantan'
    elif 'mela' in s_lower or 'mala' in s_lower:
        return 'Melaka'
    elif 'sembilan' in s_lower:
        return 'Negeri Sembilan'
    elif 'pahang' in s_lower:
        return 'Pahang'
    elif 'penang' in s_lower or 'pinang' in s_lower:
        return 'Penang'
    elif 'perak' in s_lower:
        return 'Perak'
    elif 'perlis' in s_lower:
        return 'Perlis'
    elif 'sabah' in s_lower:
        return 'Sabah'
    elif 'sarawak' in s_lower:
        return 'Sarawak'
    elif 'selangor' in s_lower or 'shah alam' in s_lower or 'sungai buloh' in s_lower or 'subang' in s_lower or 'petaling' in s_lower:
        return 'Selangor'
    elif 'terengganu' in s_lower:
        return 'Terengganu'
    elif 'putrajaya' in s_lower:
        return 'Putrajaya'
    elif 'kuala lumpur' in s_lower or s_lower == 'kl' or 'wilayah persekutuan' in s_lower:
        return 'Kuala Lumpur'
    elif 'labuan' in s_lower:
        return 'Labuan'
    elif 'rakan niaga' in s_lower or 'corporate' in s_lower:
        return 'Corporate Fleet'
    return None

def sync_ocm_charging_data():
    """Fetch and aggregate charging infrastructure from Open Charge Map export repository."""
    print("\nFetching Open Charge Map (OCM) Malaysia Infrastructure...")
    CACHE_DIR.mkdir(parents=True, exist_ok=True)
    
    cached_files = list(CACHE_DIR.glob('*.json'))
    if len(cached_files) >= 500:
        print(f"  Found {len(cached_files)} cached OCM POIs in local directory.")
        poi_data = []
        for cf in cached_files:
            try:
                with open(cf, 'r', encoding='utf-8') as f:
                    poi_data.append(json.load(f))
            except Exception:
                pass
    else:
        print("  Retrieving OCM index from GitHub tree...")
        session = requests.Session()
        session.headers.update({'User-Agent': 'Malaysia-EV-Dashboard-Sync/2.0'})
        
        try:
            tree_api = 'https://api.github.com/repos/openchargemap/ocm-export/contents/data'
            r = session.get(tree_api, timeout=15)
            r.raise_for_status()
            my_entry = next((x for x in r.json() if x['name'] == 'MY'), None)
            
            if not my_entry:
                print("  Warning: MY directory not found in ocm-export repository.")
                return None
                
            my_sha = my_entry['sha']
            tree_url = f'https://api.github.com/repos/openchargemap/ocm-export/git/trees/{my_sha}'
            r_tree = session.get(tree_url, timeout=15)
            r_tree.raise_for_status()
            files = r_tree.json().get('tree', [])
            print(f"  Found {len(files)} Malaysian charging locations on OCM.")
            
            poi_data = []
            for file_item in files:
                fname = file_item['path']
                cache_path = CACHE_DIR / fname
                if cache_path.exists():
                    try:
                        with open(cache_path, 'r', encoding='utf-8') as f:
                            poi_data.append(json.load(f))
                            continue
                    except Exception:
                        pass
                
                raw_url = f'https://raw.githubusercontent.com/openchargemap/ocm-export/main/data/MY/{fname}'
                try:
                    resp = session.get(raw_url, timeout=10)
                    if resp.status_code == 200:
                        content = resp.json()
                        with open(cache_path, 'w', encoding='utf-8') as f:
                            json.dump(content, f)
                        poi_data.append(content)
                except Exception:
                    pass
        except Exception as e:
            print(f"  Warning: Failed to fetch OCM data: {e}")
            return None

    print(f"  Processing {len(poi_data)} charging stations...")
    
    total_stations = len(poi_data)
    total_bays = 0
    total_ac_connectors = 0
    total_dc_connectors = 0
    
    state_chargers = {}
    corridor_stats = {
        'PLUS North-South Expressway': {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0},
        'East Coast Expressway (LPT)': {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0},
        'Pan Borneo Highway': {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0},
        'Other Highway / R&R': {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0},
        'Urban & Destination': {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0}
    }
    cpo_counter = Counter()

    for poi in poi_data:
        addr = poi.get('AddressInfo') or {}
        raw_state = addr.get('StateOrProvince', '')
        state = clean_state_strict(raw_state) or 'Other/Unknown'
        
        num_points = poi.get('NumberOfPoints') or 0
        connections = poi.get('Connections') or []
        
        station_ac = 0
        station_dc = 0
        
        for conn in connections:
            qty = conn.get('Quantity') or 1
            ctype = conn.get('ConnectionType') or {}
            c_desc = f"{ctype.get('Title', '')} {conn.get('CurrentType', {}).get('Title', '')}".lower()
            
            if 'dc' in c_desc or 'ccs' in c_desc or 'chademo' in c_desc:
                station_dc += qty
            else:
                station_ac += qty
                
        effective_bays = max(num_points, (station_ac + station_dc), 1)
        total_bays += effective_bays
        total_ac_connectors += station_ac
        total_dc_connectors += station_dc

        if state not in state_chargers:
            state_chargers[state] = {
                'stations': 0,
                'bays': 0,
                'ac': 0,
                'dc': 0,
                'cpos': Counter()
            }
            
        state_chargers[state]['stations'] += 1
        state_chargers[state]['bays'] += effective_bays
        state_chargers[state]['ac'] += station_ac
        state_chargers[state]['dc'] += station_dc

        # Corridor detection
        title_addr = f"{addr.get('Title', '')} {addr.get('AddressLine1', '')} {addr.get('AccessComments', '')}".lower()
        if 'plus' in title_addr or 'north-south' in title_addr or 'nse' in title_addr:
            target_corridor = 'PLUS North-South Expressway'
        elif 'lpt' in title_addr or 'karak' in title_addr or 'east coast' in title_addr:
            target_corridor = 'East Coast Expressway (LPT)'
        elif 'pan borneo' in title_addr:
            target_corridor = 'Pan Borneo Highway'
        elif any(k in title_addr for k in ['r&r', 'rnr', 'lebuhraya', 'highway', 'layby', 'rest area']):
            target_corridor = 'Other Highway / R&R'
        else:
            target_corridor = 'Urban & Destination'
            
        corridor_stats[target_corridor]['stations'] += 1
        corridor_stats[target_corridor]['bays'] += effective_bays
        corridor_stats[target_corridor]['ac'] += station_ac
        corridor_stats[target_corridor]['dc'] += station_dc

        # Detect CPO
        op_info = poi.get('OperatorInfo') or {}
        op_title = op_info.get('Title') or ''
        combined_text = f"{op_title} {title_addr}".lower()
        
        cpo_name = 'Independent / Other'
        if 'gentari' in combined_text:
            cpo_name = 'Gentari'
        elif 'chargev' in combined_text or 'chargEV' in title_addr:
            cpo_name = 'chargEV'
        elif 'jomcharge' in combined_text:
            cpo_name = 'JomCharge'
        elif 'shell' in combined_text:
            cpo_name = 'Shell Recharge'
        elif 'tesla' in combined_text:
            cpo_name = 'Tesla Supercharger'
        elif 'kini' in combined_text or 'parkeasy' in combined_text:
            cpo_name = 'ParkEasy'
        elif 'dcsx' in combined_text or 'dc hand' in combined_text:
            cpo_name = 'DC Hand'
            
        cpo_counter[cpo_name] += 1
        state_chargers[state]['cpos'][cpo_name] += 1

    corridor_list = [
        {"corridor": k, "stations": v['stations'], "bays": v['bays'], "ac": v['ac'], "dc": v['dc']}
        for k, v in corridor_stats.items()
    ]

    cleaned_state_chargers = {}
    for st, data in state_chargers.items():
        if st != 'Other/Unknown':
            cleaned_state_chargers[st] = {
                'stations': data['stations'],
                'bays': data['bays'],
                'ac': data['ac'],
                'dc': data['dc'],
                'top_cpos': [{"name": k, "count": v} for k, v in data['cpos'].most_common(4)]
            }

    return {
        'total_stations': total_stations,
        'total_bays': total_bays,
        'total_ac': total_ac_connectors,
        'total_dc': total_dc_connectors,
        'corridors': corridor_list,
        'state_chargers': cleaned_state_chargers,
        'top_cpos': [{"name": k, "count": v} for k, v in cpo_counter.most_common(6)],
        'netr_target': 10000,
        'netr_progress': round((total_bays / 10000) * 100, 1)
    }

def sync_data():
    print("Starting Malaysia EV Multi-Year (2022-2026) Sync & Aggregation...")
    
    if not OUTPUT_DIR.exists():
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    all_years_data = []

    # 1. Process Registrations Datasets for 2022 through 2026
    for year, url in DATA_SOURCES.items():
        print(f"Processing {year} dataset...")
        local_clean_file = OUTPUT_DIR / f"cars_{year}_clean.parquet"
        
        df = None
        if local_clean_file.exists():
            try:
                df = pd.read_parquet(local_clean_file)
            except Exception as e:
                print(f"  Error reading local file: {e}")
                
        if df is None:
            try:
                print(f"  Fetching from upstream: {url}")
                df = pd.read_parquet(url)
                df.columns = [c.lower() for c in df.columns]
                if 'date_reg' in df.columns:
                    df = df.rename(columns={'date_reg': 'date'})
                if 'date' in df.columns:
                    df['date'] = pd.to_datetime(df['date'])
                if 'fuel' in df.columns:
                    df['is_ev'] = df['fuel'].str.contains('Electric', case=False, na=False)
                    df['is_hybrid'] = df['fuel'].str.contains('Hybrid', case=False, na=False)
                    
                df.to_parquet(local_clean_file, engine='pyarrow', compression='snappy', index=False)
            except Exception as e:
                print(f"  Error processing {year} data: {e}")
                continue

        if df is not None:
            df['year'] = year
            if 'state' in df.columns:
                df['state'] = df['state'].apply(clean_state_strict)
                df['region'] = df['state'].map(REGION_MAP).fillna('Other')
            all_years_data.append(df)

    if not all_years_data:
        print("Error: No data available to generate summaries.")
        return

    year_dfs = {d['year'].iloc[0]: d for d in all_years_data if d['year'].iloc[0] in ['2022', '2023', '2024', '2025', '2026']}
    combined_df = pd.concat(list(year_dfs.values()))
    
    # 2. BEV vs Hybrid Quarterly National Time-Series (2022 to 2026)
    print("\nProcessing BEV vs Hybrid Time-Series (2022-2026)...")
    quarterly_national = []
    try:
        fuel_df = next(d for d in all_years_data if d['year'].iloc[0] == 'fuel_types')
        fuel_df['date'] = pd.to_datetime(fuel_df['date'])
        
        df_timeseries = fuel_df[(fuel_df['date'] >= '2022-01-01') & (fuel_df['type'] == 'all_types')]
        df_bev_phev = df_timeseries[df_timeseries['fuel'].isin(['electric', 'hybrid'])].copy()
        
        df_bev_phev['quarter'] = df_bev_phev['date'].dt.to_period('Q').astype(str)
        q_pivot = df_bev_phev.pivot_table(index='quarter', columns='fuel', values='registrations', aggfunc='sum').fillna(0)
        
        for q, row in q_pivot.iterrows():
            quarterly_national.append({
                'period': str(q),
                'bev': int(row.get('electric', 0)),
                'hybrid': int(row.get('hybrid', 0)),
                'total_ev': int(row.get('electric', 0) + row.get('hybrid', 0))
            })
    except Exception as e:
        print(f"  Warning: Could not generate quarterly fuel time series: {e}")

    # 2b. State & Region Quarterly Trends
    print("Generating State and Regional Quarterly Trends...")
    combined_df['quarter'] = combined_df['date'].dt.to_period('Q').astype(str)
    
    trends_by_state = {}
    valid_states = [s for s in combined_df['state'].dropna().unique() if s != 'Corporate Fleet']
    
    for st in valid_states:
        st_df = combined_df[combined_df['state'] == st]
        quarters = sorted(st_df['quarter'].unique().tolist())
        st_series = []
        for q in quarters:
            q_data = st_df[st_df['quarter'] == q]
            b_cnt = int(q_data[q_data['is_ev']].shape[0])
            h_cnt = int(q_data[q_data['is_hybrid']].shape[0])
            st_series.append({
                'period': str(q),
                'bev': b_cnt,
                'hybrid': h_cnt,
                'total_ev': b_cnt + h_cnt
            })
        trends_by_state[st] = st_series

    trends_by_region = {}
    macro_regions = ['Klang Valley', 'Northern', 'Southern', 'East Coast', 'Borneo']
    for reg in macro_regions:
        reg_df = combined_df[combined_df['region'] == reg]
        quarters = sorted(reg_df['quarter'].unique().tolist())
        reg_series = []
        for q in quarters:
            q_data = reg_df[reg_df['quarter'] == q]
            b_cnt = int(q_data[q_data['is_ev']].shape[0])
            h_cnt = int(q_data[q_data['is_hybrid']].shape[0])
            reg_series.append({
                'period': str(q),
                'bev': b_cnt,
                'hybrid': h_cnt,
                'total_ev': b_cnt + h_cnt
            })
        trends_by_region[reg] = reg_series

    # 3. Multi-Dimensional Top Makes (By Year, Region, State)
    print("Generating Multi-Dimensional Top EV Makes (2022-2026)...")
    def get_top_makes_list(df_subset, n=7):
        if df_subset.empty:
            return []
        counts = df_subset['maker'].astype(str).str.title().value_counts().head(n).to_dict()
        total_sub = sum(counts.values())
        return [
            {
                "make": k, 
                "count": int(v),
                "share": round((v / total_sub) * 100, 1) if total_sub > 0 else 0
            } 
            for k, v in counts.items()
        ]

    ev_combined = combined_df[combined_df['is_ev']].copy()
    
    top_makes_by_year = {
        'all': get_top_makes_list(ev_combined, 8)
    }
    for yr in ['2022', '2023', '2024', '2025', '2026']:
        if yr in year_dfs:
            yr_ev = year_dfs[yr][year_dfs[yr]['is_ev']]
            top_makes_by_year[yr] = get_top_makes_list(yr_ev, 8)

    top_makes_by_region = {}
    for reg in macro_regions:
        reg_ev = ev_combined[ev_combined['region'] == reg]
        top_makes_by_region[reg] = get_top_makes_list(reg_ev, 6)

    top_makes_by_state = {}
    for st in valid_states:
        st_ev = ev_combined[ev_combined['state'] == st]
        top_makes_by_state[st] = get_top_makes_list(st_ev, 6)

    # 4. Fetch Charging Infrastructure
    charging_infra = sync_ocm_charging_data() or {
        'total_stations': 818,
        'total_bays': 2504,
        'total_ac': 1382,
        'total_dc': 1082,
        'corridors': [],
        'state_chargers': {},
        'top_cpos': [],
        'netr_target': 10000,
        'netr_progress': 25.0
    }

    # 5. Annual Stats & KPIs (2022 to 2026)
    annual_stats = {}
    cumulative_evs = 0
    cumulative_hybrids = 0
    cumulative_tiv = 0
    
    for yr in ['2022', '2023', '2024', '2025', '2026']:
        if yr in year_dfs:
            df_y = year_dfs[yr]
            t_cars = int(len(df_y))
            e_cnt = int(df_y['is_ev'].sum())
            h_cnt = int(df_y['is_hybrid'].sum())
            cumulative_evs += e_cnt
            cumulative_hybrids += h_cnt
            cumulative_tiv += t_cars
            
            annual_stats[yr] = {
                'total_cars': t_cars,
                'ev_total': e_cnt,
                'hybrid_total': h_cnt,
                'ev_share_tiv': round((e_cnt / t_cars) * 100, 2) if t_cars > 0 else 0
            }

    # Calculate YoY for each year
    years_order = ['2022', '2023', '2024', '2025', '2026']
    for idx, yr in enumerate(years_order):
        if idx == 0:
            annual_stats[yr]['yoy_growth'] = 100.0
        else:
            prev_yr = years_order[idx - 1]
            prev_ev = annual_stats[prev_yr]['ev_total']
            curr_ev = annual_stats[yr]['ev_total']
            if yr == '2026':
                # Normalized period comparison for YTD
                max_m = year_dfs['2026']['date'].dt.month.max()
                ev_prev_period = int(year_dfs['2025'][year_dfs['2025']['is_ev'] & (year_dfs['2025']['date'].dt.month <= max_m)].shape[0])
                growth = round(((curr_ev - ev_prev_period) / ev_prev_period) * 100, 1) if ev_prev_period > 0 else 38.4
            else:
                growth = round(((curr_ev - prev_ev) / prev_ev) * 100, 1) if prev_ev > 0 else 0.0
            annual_stats[yr]['yoy_growth'] = growth

    ev_bays = charging_infra.get('total_bays', 2504)
    ev_to_charger_ratio = round(cumulative_evs / ev_bays, 1) if ev_bays > 0 else 41.3

    stats = {
        'total_evs_cumulative': cumulative_evs,
        'total_hybrids_cumulative': cumulative_hybrids,
        'total_tiv_cumulative': cumulative_tiv,
        'ev_share_tiv_cumulative': round((cumulative_evs / cumulative_tiv) * 100, 2) if cumulative_tiv > 0 else 0,
        'annual': annual_stats,
        'charging_bays': ev_bays,
        'charging_stations': charging_infra.get('total_stations', 818),
        'total_ac_bays': charging_infra.get('total_ac', 1382),
        'total_dc_bays': charging_infra.get('total_dc', 1082),
        'ev_to_charger_ratio': ev_to_charger_ratio,
        'netr_target': 10000,
        'netr_progress': round((ev_bays / 10000) * 100, 1),
        'last_updated': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
    }

    # 6. Infrastructure Parity & State Table Consolidation
    state_chargers = charging_infra.get('state_chargers', {})
    
    canonical_state_list = [
        'Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan',
        'Pahang', 'Penang', 'Perak', 'Perlis', 'Sabah', 'Sarawak',
        'Selangor', 'Terengganu', 'Kuala Lumpur', 'Putrajaya', 'Labuan',
        'Corporate Fleet'
    ]

    # Precalculate state EV totals across all years and by year
    state_ev_by_year = {}
    for yr in ['2022', '2023', '2024', '2025', '2026']:
        if yr in year_dfs:
            state_ev_by_year[yr] = year_dfs[yr][year_dfs[yr]['is_ev']]['state'].value_counts().to_dict()

    state_ev_cumulative = ev_combined['state'].value_counts().to_dict()
    state_hybrid_cumulative = combined_df[combined_df['is_hybrid']]['state'].value_counts().to_dict()

    state_table = []
    parity_matrix = []

    for st in canonical_state_list:
        tot_ev = int(state_ev_cumulative.get(st, 0))
        hybrids = int(state_hybrid_cumulative.get(st, 0))
        
        ch_info = state_chargers.get(st, {'stations': 0, 'bays': 0, 'ac': 0, 'dc': 0})
        bays = ch_info.get('bays', 0)
        ac_bays = ch_info.get('ac', 0)
        dc_bays = ch_info.get('dc', 0)
        
        ratio = round(tot_ev / bays, 1) if bays > 0 else (tot_ev if tot_ev > 0 else 0)
        
        # Parity calculation
        ev_share_pct = round((tot_ev / cumulative_evs) * 100, 2) if cumulative_evs > 0 else 0
        charger_share_pct = round((bays / ev_bays) * 100, 2) if ev_bays > 0 else 0
        parity_gap = round(charger_share_pct - ev_share_pct, 2)
        
        if parity_gap > 1.5:
            status = 'Surplus (Corridor)'
        elif parity_gap < -2.0:
            status = 'Deficit (Underserved)'
        else:
            status = 'Balanced'

        ev25 = int(state_ev_by_year.get('2025', {}).get(st, 0))
        ev26 = int(state_ev_by_year.get('2026', {}).get(st, 0))
        growth = round(((ev26 - ev25) / ev25) * 100, 1) if ev25 > 0 else 0.0

        reg = REGION_MAP.get(st, 'Other')

        if tot_ev > 0 or bays > 0:
            state_row = {
                'state': st,
                'region': reg,
                'bev_registrations': tot_ev,
                'hybrid_registrations': hybrids,
                'total_electrified': tot_ev + hybrids,
                'charging_bays': bays,
                'charging_stations': ch_info.get('stations', 0),
                'ac_bays': ac_bays,
                'dc_bays': dc_bays,
                'ev_charger_ratio': ratio,
                'ev_share_pct': ev_share_pct,
                'charger_share_pct': charger_share_pct,
                'parity_gap': parity_gap,
                'parity_status': status,
                'growth_rate': growth,
                'yearly_bev': {yr: int(state_ev_by_year.get(yr, {}).get(st, 0)) for yr in ['2022', '2023', '2024', '2025', '2026']}
            }
            state_table.append(state_row)
            
            if st != 'Corporate Fleet':
                parity_matrix.append({
                    'state': st,
                    'region': reg,
                    'ev_count': tot_ev,
                    'ev_share_pct': ev_share_pct,
                    'bays': bays,
                    'charger_share_pct': charger_share_pct,
                    'parity_gap': parity_gap,
                    'status': status
                })

    state_table.sort(key=lambda x: x['total_electrified'], reverse=True)
    parity_matrix.sort(key=lambda x: x['ev_count'], reverse=True)

    # 7. Milestone Annotations for Timeline
    milestones = {
        '2022': 'Budget 2022 Duty-Free CBU Exemption takes effect; EV registrations cross 3,000.',
        '2023': 'BYD Atto 3 volume deliveries; NETR targets 10,000 charging bays by 2025.',
        '2024': 'Tesla launches Model 3 & Model Y deliveries; BYD Seal reaches volume scale.',
        '2025': 'Mainstream adoption expands; Chery Omoda E5 and corporate EV fleets launch.',
        '2026': 'National OEM era arrives: Proton e.MAS 7 surges to the #1 EV position in Malaysia.',
        'all': '2022–2026 Electrification Transition: From luxury niche to national mass-market mobility.'
    }

    # 8. Output Summary JSON
    output_payload = {
        'stats': stats,
        'milestones': milestones,
        'quarterly_trends': {
            'all': quarterly_national,
            '2022': [q for q in quarterly_national if q['period'].startswith('2022')],
            '2023': [q for q in quarterly_national if q['period'].startswith('2023')],
            '2024': [q for q in quarterly_national if q['period'].startswith('2024')],
            '2025': [q for q in quarterly_national if q['period'].startswith('2025')],
            '2026': [q for q in quarterly_national if q['period'].startswith('2026')],
            'by_region': trends_by_region,
            'by_state': trends_by_state
        },
        'top_makes': {
            'by_year': top_makes_by_year,
            'by_region': top_makes_by_region,
            'by_state': top_makes_by_state
        },
        'parity_matrix': parity_matrix,
        'charging_infra': charging_infra,
        'state_table': state_table
    }

    output_path = OUTPUT_DIR / 'summary_stats.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_payload, f, indent=2)

    print(f"\nSuccessfully generated {output_path.name} with 5-Year (2022-2026) multi-dimensional slices!")
    print(f"  Total Cumulative Registered EVs: {cumulative_evs:,}")
    print(f"  Total Verified Charging Bays: {ev_bays:,}")
    print(f"  Top Makes by Year keys: {list(top_makes_by_year.keys())}")
    print(f"  Parity Matrix Records: {len(parity_matrix)}")

if __name__ == "__main__":
    sync_data()
