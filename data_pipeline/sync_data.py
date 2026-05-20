import pandas as pd
import requests
import os
import json
from pathlib import Path

# Configuration
DATA_SOURCES = {
    '2025': 'https://storage.data.gov.my/transportation/cars_2025.parquet',
    '2026': 'https://storage.data.gov.my/transportation/cars_2026.parquet',
    'fuel_types': 'https://storage.data.gov.my/transportation/registrations_type_fuel.parquet'
}

OUTPUT_DIR = Path(__file__).parent.parent / 'public' / 'data'

def sync_data():
    print("Starting Malaysia EV Data Sync...")
    
    if not OUTPUT_DIR.exists():
        print(f"Creating output directory: {OUTPUT_DIR}")
        OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    all_years_data = []

    for year, url in DATA_SOURCES.items():
        print(f"\nProcessing {year} registration data...")
        try:
            df = pd.read_parquet(url)
            print(f"  Columns found: {list(df.columns)}")
            
            # Standardize column naming
            df.columns = [c.lower() for c in df.columns]
            if 'date_reg' in df.columns:
                df = df.rename(columns={'date_reg': 'date'})
            
            if 'date' in df.columns:
                df['date'] = pd.to_datetime(df['date'])
            else:
                print(f"  Warning: No date column found in {year} data!")
                
            if 'fuel' in df.columns:
                df['is_ev'] = df['fuel'].str.contains('Electric', case=False, na=False)
                df['is_hybrid'] = df['fuel'].str.contains('Hybrid', case=False, na=False)
            else:
                df['is_ev'] = False
                df['is_hybrid'] = False

            # Save full clean data for the Vehicle Search/Vault
            output_file = OUTPUT_DIR / f"cars_{year}_clean.parquet"
            df.to_parquet(output_file, engine='pyarrow', compression='snappy', index=False)
            print(f"  Saved full clean data to: {output_file.name}")

            # Keep reference for aggregation
            df['year'] = year
            all_years_data.append(df)

        except Exception as e:
            print(f"  Error processing {year} data: {str(e)}")

    if all_years_data:
        print("\nGenerating aggregated summaries...")
        combined_df = pd.concat(all_years_data)
        
        # 1. Monthly Trends (Total Market)
        monthly_trends = combined_df.groupby([combined_df['date'].dt.month, 'year']).size().unstack(fill_value=0)
        monthly_trends.index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][:len(monthly_trends)]
        trends_json = monthly_trends.reset_index().rename(columns={'index': 'month'}).to_dict(orient='records')
        
        # 1b. Monthly EV Trends
        ev_only = combined_df[combined_df['is_ev']]
        if not ev_only.empty:
            ev_monthly = ev_only.groupby([ev_only['date'].dt.month, 'year']).size().unstack(fill_value=0)
            ev_monthly.index = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][:len(ev_monthly)]
            ev_trends_json = ev_monthly.reset_index().rename(columns={'index': 'month'}).to_dict(orient='records')
        else:
            ev_trends_json = []
        
        # 2. KPI Totals
        stats = {
            'total_2025': int(len(combined_df[combined_df['year'] == '2025'])),
            'total_2026': int(len(combined_df[combined_df['year'] == '2026'])),
            'ev_total_2025': int(combined_df[(combined_df['year'] == '2025') & (combined_df['is_ev'])].shape[0]),
            'hybrid_total_2025': int(combined_df[(combined_df['year'] == '2025') & (combined_df['is_hybrid'])].shape[0]),
            'last_updated': pd.Timestamp.now().strftime('%Y-%m-%d %H:%M:%S')
        }

        # 3. Fuel Distribution (2025 Data)
        fuel_dist = combined_df[combined_df['year'] == '2025']['fuel'].value_counts().head(5).to_dict()
        
        def clean_label(label):
            if not label: return "Other"
            # Special manual mapping for known technical names
            mapping = {
                'greendiesel': 'Green Diesel',
                'hybrid_petrol': 'Hybrid Petrol',
                'petrol': 'Petrol',
                'diesel': 'Diesel',
                'electric': 'Electric',
                'car': 'Passenger Car',
                'motorcycle': 'Motorcycle',
                'van': 'Van/Commercial',
                'bus': 'Bus',
                'lorry': 'Lorry/Truck',
                'other': 'Special Purpose'
            }
            
            lower_label = label.lower()
            if lower_label in mapping:
                return mapping[lower_label]
                
            # Fallback to general cleaning
            cleaned = label.replace('_', ' ').title()
            if cleaned.lower() == 'ev': return 'EV'
            return cleaned

        fuel_json = [{"name": clean_label(k), "value": v} for k, v in fuel_dist.items()]

        # 4. Top Models (Overall)
        combined_df['full_model'] = (combined_df['maker'].astype(str) + " " + combined_df['model'].astype(str)).str.title()
        top_models = combined_df['full_model'].value_counts().head(8).to_dict()
        models_json = [{"model": k, "count": v} for k, v in top_models.items()]

        # 4b. Top EV Models (Electric Only)
        ev_only_models = combined_df[combined_df['is_ev']].copy().reset_index(drop=True)
        ev_only_models['full_model'] = (ev_only_models['maker'].astype(str) + " " + ev_only_models['model'].astype(str)).str.title()
        top_ev_models = ev_only_models['full_model'].value_counts().head(8).to_dict()
        ev_models_json = [{"model": k, "count": v} for k, v in top_ev_models.items()]

        # 4c. Top EV Makes (Electric Only)
        top_ev_makes = ev_only_models['maker'].astype(str).str.title().value_counts().head(8).to_dict()
        ev_makes_json = [{"make": k, "count": v} for k, v in top_ev_makes.items()]

        # 4d. Trend of Top 5 EV Makes (Monthly)
        top_5_makes_idx = ev_only_models['maker'].value_counts().head(5).index.tolist()
        make_trends = []
        if top_5_makes_idx:
            make_monthly = ev_only_models[ev_only_models['maker'].isin(top_5_makes_idx)].copy()
            # Clean maker name before grouping
            make_monthly['maker'] = make_monthly['maker'].astype(str).str.title()
            
            make_monthly = make_monthly.groupby(
                [make_monthly['date'].dt.month.rename('month_idx'), 'year', 'maker']
            ).size().unstack(level=2, fill_value=0).reset_index()
            
            month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            
            for _, row in make_monthly.iterrows():
                m_idx = int(row['month_idx'])
                y = row['year']
                entry = {
                    "month": month_names[m_idx-1],
                    "year": y,
                    "date_sort": f"{y}-{m_idx:02d}"
                }
                maker_counts = row.drop(['month_idx', 'year']).to_dict()
                maker_counts = {k: int(v) for k, v in maker_counts.items()}
                entry.update(maker_counts)
                make_trends.append(entry)
            
            make_trends.sort(key=lambda x: x['date_sort'])

        # 4e. State-wise EV Distribution (2025)
        def clean_state(s):
            if not s: return "Unknown"
            if s == "Rakan Niaga": return "Corporate Fleet"
            return s.replace('W.P. ', '').title()

        if 'state' in ev_only_models.columns:
            state_ev = ev_only_models[ev_only_models['year'] == '2025']['state'].value_counts().head(10).to_dict()
            state_json = [{"state": clean_state(k), "count": v} for k, v in state_ev.items()]
        else:
            state_json = []

        # 5. Category-based Fuel Distribution
        category_json = []
        try:
            fuel_df = next(df for df in all_years_data if 'type' in df.columns and 'registrations' in df.columns)
            electric_by_type = fuel_df[fuel_df['fuel'].str.contains('Electric', case=False, na=False)]
            
            if 'registrations' in electric_by_type.columns:
                cat_summary = electric_by_type.groupby('type')['registrations'].sum().sort_values(ascending=False).head(8).to_dict()
            else:
                cat_summary = electric_by_type['type'].value_counts().head(8).to_dict()
            
            category_json = [{"type": clean_label(k), "count": int(v)} for k, v in cat_summary.items()]
        except Exception as e:
            print(f"  Warning: Could not process category distribution: {str(e)}")

        # Write summaries
        with open(OUTPUT_DIR / 'summary_stats.json', 'w') as f:
            json.dump({
                'trends': trends_json,
                'ev_trends': ev_trends_json,
                'make_trends': make_trends,
                'stats': stats,
                'fuel_dist': fuel_json,
                'top_models': models_json,
                'top_ev_models': ev_models_json,
                'top_ev_makes': ev_makes_json,
                'state_dist': state_json,
                'category_dist': category_json
            }, f, indent=2)
        
        print("  Summaries generated: summary_stats.json")

    print("\nSync complete!")

if __name__ == "__main__":
    sync_data()
