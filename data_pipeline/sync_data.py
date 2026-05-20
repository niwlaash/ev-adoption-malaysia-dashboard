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
        fuel_json = [{"name": k, "value": v} for k, v in fuel_dist.items()]

        # 4. Top Models (Combined)
        combined_df['full_model'] = combined_df['maker'] + " " + combined_df['model']
        top_models = combined_df['full_model'].value_counts().head(8).to_dict()
        models_json = [{"model": k, "count": v} for k, v in top_models.items()]

        # 5. Category-based Fuel Distribution (from fuel_types dataset)
        category_json = []
        try:
            # Find the fuel_df in all_years_data (it might be the last one or have fuel_types in url)
            fuel_df = next(df for df in all_years_data if 'type' in df.columns and 'registrations' in df.columns)
            
            # Aggregate counts for Electric fuel specifically across all types
            electric_by_type = fuel_df[fuel_df['fuel'].str.contains('Electric', case=False, na=False)]
            
            # Sum up 'registrations' per vehicle 'type'
            if 'registrations' in electric_by_type.columns:
                cat_summary = electric_by_type.groupby('type')['registrations'].sum().sort_values(ascending=False).head(8).to_dict()
            else:
                cat_summary = electric_by_type['type'].value_counts().head(8).to_dict()
            
            category_json = [{"type": k, "count": int(v)} for k, v in cat_summary.items()]
        except Exception as e:
            print(f"  Warning: Could not process category distribution: {str(e)}")

        # Write summaries
        with open(OUTPUT_DIR / 'summary_stats.json', 'w') as f:
            json.dump({
                'trends': trends_json,
                'ev_trends': ev_trends_json,
                'stats': stats,
                'fuel_dist': fuel_json,
                'top_models': models_json,
                'category_dist': category_json
            }, f, indent=2)
        
        print("  Summaries generated: summary_stats.json")

    print("\nSync complete!")

if __name__ == "__main__":
    sync_data()
