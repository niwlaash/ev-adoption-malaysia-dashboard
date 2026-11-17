# ⚡ Malaysia EV Open Data Portal
> **Making Malaysia's Electric Vehicle Transition Honest, Transparent, and Easy to Understand.**

[![Live Demo](https://img.shields.io/badge/Live%20Portal-Vercel-emerald?style=for-the-badge&logo=vercel)](https://ev-adoption-malaysia-dashboard.vercel.app/)
[![License: CC BY 4.0](https://img.shields.io/badge/Data_License-CC_BY_4.0-blue?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![License: MIT](https://img.shields.io/badge/Code_License-MIT-neutral?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Data Status](https://img.shields.io/badge/Data_Period-2022--2026_YTD-amber?style=for-the-badge)](https://data.gov.my/)

---

## 📌 The Problem We Solve

Buying an electric vehicle in Malaysia can feel like a gamble. Drivers face common concerns:
* *"Are there actually enough public chargers where I live and travel?"*
* *"Is EV adoption really growing, or is it just marketing hype?"*
* *"Which states have enough charging stations, and which are being left behind?"*

While the Malaysian Government publishes vehicle data on `data.gov.my`, the information is trapped in massive, technical **Parquet database files** that ordinary citizens cannot easily open or read on their phones.

The **Malaysia EV Open Data Portal** takes millions of raw, complicated government rows, cleans out the errors, and turns them into a fast, interactive public dashboard that anyone can use for free.

---

## 🧭 The 5W1H Framework: Understanding the Portal

### 1. WHO is this for?
* **Everyday Car Buyers**: Check how many EVs are on the road in your state and whether your local charging infrastructure is keeping up before making a purchase.
* **Policymakers & Town Planners**: Track Malaysia's progress toward the **10,000 public charger target** set under the National Energy Transition Roadmap (NETR).
* **Charging Operators (CPOs)**: Identify "charging deserts" (states and highway stretches that desperately need more fast chargers).
* **Journalists & University Researchers**: Download clean, verified datasets with one click for research, news articles, and academic papers.

### 2. WHAT does this portal do?
* **Tracks Real Registrations**: Compares **Pure Electric Cars (BEVs)** against **Plug-in Hybrids (PHEVs)** across every quarter from 2022 to 2026.
* **Maps Charging Infrastructure**: Visualizes 2,504 public charging bays across 818 locations, showing the split between **AC destination chargers** and **DC fast chargers**.
* **Calculates the State Parity Gap**: Measures charger inequality by comparing each state's share of electric cars against its share of public chargers.
* **Shows Real Brand Market Share**: Reveals which car brands are truly being registered by Malaysian drivers (e.g. Proton e.MAS, BYD, Tesla, BMW), based on official road transport records rather than press releases.

### 3. WHEN is it updated & what timeline does it cover?
* **Coverage**: Tracks the complete national transition timeline from **January 2022 through 2026 Year-to-Date (YTD)**.
* **Refresh Schedule**: An automated GitHub Actions pipeline runs on the **1st of every month** to pull newly published government data and update the portal without human intervention.

### 4. WHERE does the data come from?
* **Vehicle Registrations**: Official public records from the **Road Transport Department (JPJ)** and the **Department of Statistics Malaysia (DOSM)** via `data.gov.my`.
* **Charging Stations**: Verified point-of-interest geospatial records from the **Open Charge Map (OCM)** global registry, cleaned and mapped across highway corridors (PLUS, LPT, Pan Borneo) and city hubs.

### 5. WHY was this built?
* **Democratizing Public Data**: Public records paid for by taxpayers should be easy for all citizens to see, explore, and benefit from.
* **Measuring Infrastructure Safety**: The European Union recommends an international benchmark of **10 electric cars per public charger (10:1)**. Malaysia currently stands at **41.3:1**, proving that charger installation must accelerate rapidly to keep pace with EV adoption.

### 6. HOW does it solve the problem?
* **Zero Technical Barrier**: No database tools or spreadsheets required. Users can filter by Year (`2022` to `2026`) or State (`Selangor`, `Johor`, `Penang`, `Sarawak`, etc.) with instant, sub-second responses.
* **Head-to-Head State Comparison**: Select any two states to see how their fleet sizes, charger counts, and charger ratios compare side-by-side.
* **Zero-PII Privacy & Security**:
  * 100% static client-side web application (no tracking cookies, no user accounts, no login required).
  * Underlying government data contains **zero personal data** (no owner names, no MyKad IC numbers, no addresses, and no license plate numbers).
  * Built-in protection against Spreadsheet Formula Injection (**CWE-1236**) so all CSV downloads open safely in Excel without security warnings.

---

## 🔍 Key Findings from the Portal (2022–2026)

| Metric | Current Value | What It Means |
| :--- | :---: | :--- |
| **Total Registered Electric Vehicles** | **103,515** | Cumulative BEVs and Hybrids registered in Malaysia since 2022. |
| **Verified Public Charging Bays** | **2,504** | Total active charging points across 818 verified locations nationwide. |
| **National Cars-Per-Charger Ratio** | **41.3 : 1** | Malaysia has 41 EVs sharing every 1 public charger (Ideal global target is 10:1). |
| **NETR 2025 Target Progress** | **25.0%** | 2,504 out of the 10,000 public chargers planned under the National Energy Transition Roadmap. |
| **#1 EV Brand in 2026 (YTD)** | **Proton e.MAS (53.1%)** | Local brand leads national sales volume following the e.MAS 7 rollout. |

---

## 🛠️ How It Works (For Developers & Civic Hackers)

### Architecture Overview
* **Frontend**: React 19, TypeScript, Tailwind CSS, Vite.
* **Charts**: Recharts with dark/light mode responsive themes.
* **Data Processing**: Python pipeline (`data_pipeline/sync_data.py`) that ingests government Parquet files and generates optimized, lightweight summary datasets (`summary_stats.json`).
* **Hosting**: Vercel with single-page application (SPA) routing and strict production security headers.

### Running Locally

```bash
# 1. Clone repository
git clone https://github.com/niwlaash/ev-adoption-malaysia-dashboard.git
cd ev-adoption-malaysia-dashboard

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
# Open http://localhost:5173

# 4. Run automated code verification
npm run lint
npm run build
```

### Running the Data Pipeline (Optional)

```bash
cd data_pipeline
pip install -r requirements.txt
python sync_data.py
```

---

## 📄 Licensing & Open Data Terms

* **Data License**: All aggregated statistics and summaries are released under **[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)**. You are free to share, copy, analyze, and build applications upon this data with attribution.
* **Source Code**: Released under the **[MIT License](https://opensource.org/licenses/MIT)**.
* **Disclaimer**: This is an independent public-benefit civic initiative. It is not an official portal of the Road Transport Department (JPJ) or the Ministry of Transport Malaysia.

---

**Built with care by [Alwin Ashraf](https://www.linkedin.com/in/alwin-ashraf-nor-azmil-4628a9223/)**  
*Source code on [GitHub](https://github.com/niwlaash/ev-adoption-malaysia-dashboard) • Live at [ev-adoption-malaysia-dashboard.vercel.app](https://ev-adoption-malaysia-dashboard.vercel.app/)*
