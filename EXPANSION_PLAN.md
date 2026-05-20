# [EXPANSION] Full Malaysian Car Market Analytics

Transition the dashboard from an EV-centric view to a comprehensive car registration overview, providing context on how EV adoption compares to the broader automotive market.

## Proposed Changes

### [Data Pipeline]
#### [MODIFY] `data_pipeline/sync_data.py`
- Aggregate monthly trends for **ALL** fuel types (Petrol, Diesel, Hybrid, Electric).
- **NEW**: Process `registrations_type_fuel.parquet` to compare fuel adoption across different vehicle categories (Motorcycles, Cars, Busses, etc.).
- Calculate total market share percentages.
- Identify the true Top 10 Manufacturers overall.

### [Frontend Components]
#### [MODIFY] `src/pages/DashboardOverview.tsx`
- **New KPIs**: 
  - Total Market Size (2025/2026)
  - EV Penetration Rate (% of total market)
  - Leading Fuel Type
- **Market Share Chart**: Updated donut chart to show the full breakdown of Petrol vs. Others.
- **Overall Leaderboard**: Brands chart will show actual top best-sellers in Malaysia.

## Verification Plan
1. Run updated `sync_data.py` script.
2. Verify `summary_stats.json` contains full market categories.
3. Confirm Dashboard correctly displays the context of EV vs the total market.
