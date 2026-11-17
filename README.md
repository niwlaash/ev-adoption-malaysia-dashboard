# Malaysia EV Open Data Portal

> **An independent, public-benefit civic analytics platform tracking Malaysia's electric vehicle transition through verified open data.**

[![Live Demo](https://img.shields.io/badge/Live_Portal-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ev-adoption-malaysia-dashboard.vercel.app/)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data_License-CC_BY_4.0-059669?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![Source Code: MIT](https://img.shields.io/badge/Code_License-MIT-1E3A8A?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Coverage Period](https://img.shields.io/badge/Coverage-2022_--_2026_YTD-D97706?style=for-the-badge)](https://data.gov.my/)

---

## 🎯 Why This Dashboard Was Built

Malaysia has set ambitious targets under the **National Energy Transition Roadmap (NETR)** and the **Low Carbon Mobility Blueprint (LCMB)**, including deploying **10,000 public charging points** and accelerating the adoption of clean passenger transport.

However, everyday car buyers, researchers, and journalists face three critical information challenges:

1. **The Range Anxiety & Charger Reality Gap**  
   Drivers considering an electric vehicle often ask: *"Will I be stranded on long trips?"* Marketing materials from car brands rarely address how many chargers are actually available where people live and travel.
   
2. **The Regional Infrastructure Imbalance**  
   While urban centers like Kuala Lumpur and Selangor enjoy high charger density, other regions—such as the East Coast and Borneo—risk being left behind. Without accessible public data, it is difficult to identify where charging stations are needed most.

3. **Inaccessible Government Datasets**  
   Although the Malaysian Government publishes vehicle registration figures on `data.gov.my`, the files are distributed as massive technical **Apache Parquet tables** containing millions of raw rows. Everyday citizens and journalists cannot easily open or explore these files on mobile devices or standard spreadsheets.

### Our Mission
The **Malaysia EV Open Data Portal** solves these problems by transforming raw, complex public records into an open, fast, and neutral dashboard. We provide an independent source of truth—free from automaker marketing spin, subscription paywalls, or personal data tracking.

---

## 📊 Key Insights at a Glance (2022–2026)

Based on official records processed through our pipeline:

| Indicator | Current Figure | Context & Significance |
| :--- | :---: | :--- |
| **Total Electrified Vehicles** | **103,515** | Cumulative pure electric (BEV) and hybrid (PHEV) passenger cars registered in Malaysia since 2022. |
| **Public Charging Bays** | **2,504** | Total active charging points across 818 verified locations nationwide. |
| **National Cars-Per-Charger Ratio** | **41.3 : 1** | Malaysia currently has 41 EVs sharing each public charger (The European Union AFIR safety benchmark recommends **10 : 1**). |
| **NETR 10,000 Target Progress** | **25.0%** | Progress toward Malaysia's national 2025 public charging infrastructure milestone. |
| **Market Share Leader (2026 YTD)** | **Proton e.MAS (53.1%)** | Following the rollout of the e.MAS 7, the national brand captured over half of all new EV registrations in early 2026. |

---

## 🚀 Key Features

* **Interactive Registration Horizon (2022–2026)**  
  Examine market evolution across individual years or the complete cumulative corpus. Track quarterly trends distinguishing **Pure Electric Cars (BEVs)** from **Plug-in Hybrids (PHEVs)**.

* **Bespoke Territory Combobox**  
  Quickly filter by macro-regions (*Klang Valley, Northern, Southern, East Coast, Borneo*) or search specifically across all 16 states and federal territories with keyboard navigation (`↑`, `↓`, `Enter`).

* **Head-to-Head State Comparator**  
  Select any two states to directly compare electric car fleet sizes, total charging points, and the local car-to-charger ratio side-by-side.

* **State Parity Gap Analysis**  
  Identifies infrastructure inequality by calculating:  
  $$\text{Parity Gap} = (\text{State \% of National Chargers}) - (\text{State \% of National EVs})$$  
  States with a negative gap have fewer chargers than their vehicle share demands, highlighting critical investment targets for charging point operators (CPOs).

* **Corridor Charging Infrastructure Breakdown**  
  Visualizes charger distribution across major transit arteries (PLUS Expressway, East Coast LPT, Pan Borneo Highway, and urban hubs) categorized by **AC Destination** vs. **DC Fast** charging bays.

* **Safe Open Data Export**  
  One-click downloads in **CSV** and **JSON** format. All spreadsheets are sanitized against CSV Formula Injection (**CWE-1236**) so they open safely in Excel without security risks.

---

## 🏛️ Data Provenance & Methodology

This portal relies exclusively on authoritative, public open data sources:

1. **Vehicle Registrations — JPJ & DOSM**  
   Ingested from official vehicle registration Parquet datasets published on [`data.gov.my`](https://data.gov.my) by the **Road Transport Department (JPJ)** and the **Department of Statistics Malaysia (DOSM)**.
   * Covers monthly records from **January 2022 through 2026 YTD**.
   * Fuel types are categorized into **Pure Electric (BEV)** and **Hybrid (PHEV)**.

2. **Charging Infrastructure — Open Charge Map (OCM)**  
   Station locations, bay counts, and connector power ratings are aggregated from the verified global open registry at [`openchargemap.org`](https://openchargemap.org).
   * Over **818 verified station locations** mapped to canonical state boundaries.
   * Automated cleaning routines normalize inconsistent location naming, remove trailing spaces, and deduplicate charging records.

3. **Automated Refresh Schedule**  
   An automated **GitHub Actions pipeline** runs on the **1st of every month** to fetch the latest public government releases, recompute summary statistics, and deploy the updated dataset seamlessly.

---

## 🔒 Privacy & Civic Integrity

* **Zero Personal Data Collection**: No cookies, no third-party tracking scripts, no advertisements, and no user accounts. Your browsing activity stays completely private.
* **Zero PII in Underlying Records**: Government datasets contain only technical vehicle specifications (date of registration, manufacturer, model, fuel type, color, and state). They contain **no owner names, no MyKad IC numbers, no home addresses, and no license plate numbers**, fully complying with Malaysia's **Personal Data Protection Act 2010 (PDPA)**.
* **Independent & Non-Partisan**: This portal is an independent civic project created for public benefit and is not affiliated with any automotive manufacturer or political entity.

---

## 💻 Developer & Quick Start Guide

### Prerequisites
* **Node.js**: v18 or later
* **Python**: v3.10 or later (for running data pipeline updates)

### Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/niwlaash/ev-adoption-malaysia-dashboard.git
cd ev-adoption-malaysia-dashboard

# 2. Install frontend dependencies
npm install

# 3. Start the local development server
npm run dev
# The application will be accessible at http://localhost:5173
```

### Verification & Testing

```bash
# Run ESLint across the codebase
npm run lint

# Run TypeScript compiler & production build
npm run build
```

### Running the Data Sync Pipeline (Optional)

```bash
cd data_pipeline
pip install -r requirements.txt
python sync_data.py
```

---

## 📜 Licensing & Open Data Terms

* **Data Content**: All compiled datasets and visual summaries are published under the **[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)** license. You are free to share, copy, analyze, and adapt this data for journalism, policy, research, or commercial applications with appropriate credit.
* **Software Code**: The frontend codebase and data pipeline are licensed under the **[MIT License](https://opensource.org/licenses/MIT)**.

---

**Authored & Maintained by [Alwin Ashraf](https://www.linkedin.com/in/alwin-ashraf-nor-azmil-4628a9223/)**  
*Open Source on [GitHub](https://github.com/niwlaash/ev-adoption-malaysia-dashboard) • Live Deployment at [ev-adoption-malaysia-dashboard.vercel.app](https://ev-adoption-malaysia-dashboard.vercel.app/)*
