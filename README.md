# Malaysia EV Open Data Portal

> **An independent, public-benefit civic analytics platform tracking Malaysia's electric vehicle transition through verified open data.**

[![Live Demo](https://img.shields.io/badge/Live_Portal-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ev-adoption-malaysia-dashboard.vercel.app/)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data_License-CC_BY_4.0-059669?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![Source Code: MIT](https://img.shields.io/badge/Code_License-MIT-1E3A8A?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Coverage Period](https://img.shields.io/badge/Coverage-2022_--_2026_YTD-D97706?style=for-the-badge)](https://data.gov.my/)

---

## 🎯 Why This Dashboard Was Built

Malaysia has set ambitious targets under the **National Energy Transition Roadmap (NETR)** and the **Low Carbon Mobility Blueprint (LCMB)**, including deploying **10,000 public charging points** and accelerating the adoption of clean passenger transport.

However, researchers, journalists, policymakers, and prospective car buyers face critical information challenges that this dashboard directly solves:

1. **The "Hype vs. Reality" Gap (Tracking Actual Registrations vs. Marketing Claims)**  
   Automakers, dealerships, and media headlines frequently promote soaring sales projections, making it difficult to discern how many electric vehicles are genuinely being adopted by drivers on Malaysian roads. This dashboard grounds the conversation in **official JPJ road transport records**, tracking exact quarterly volume for pure electric cars (BEVs) and hybrids (PHEVs) from 2022 to 2026.

2. **Accountability for National Policy (Tracking the NETR 10,000 Charger Target)**  
   Under the National Energy Transition Roadmap (NETR), Malaysia set a target of deploying **10,000 public chargers**. Until now, the public lacked a unified, independent scoreboard to verify whether infrastructure deployment is on schedule or falling behind. This portal provides an objective tracking metric: **2,504 verified bays (25.0% progress)** and calculates Malaysia's national **Cars-Per-Charger ratio (41.3:1 vs. the international 10:1 safety benchmark)**.

3. **Unlocking Inaccessible Government Big Data (Democratizing Parquet Files)**  
   Although the Malaysian Government publishes vehicle records on `data.gov.my`, the datasets are distributed as heavy **Apache Parquet database files** containing millions of rows. Ordinary citizens, students, and journalists cannot open `.parquet` files without writing Python/Pandas code or using specialized database software. This portal automatically processes these heavy files into an interactive, fast web view with safe one-click CSV and JSON exports.

4. **Demystifying the "Corporate Fleet" Skew (Understanding Commercial Registrations)**  
   Over 74% of all electric cars in Malaysia are registered under `Rakan Niaga` (JPJ's commercial business partner gateway). Without statistical context, state-level figures appear distorted or confusing. This dashboard explicitly separates commercial fleet leasing and dealer e-Daftar registrations from retail branch counts, providing transparent clarity on where EVs are actually registered.

### Our Mission
The **Malaysia EV Open Data Portal** is an analytical civic scoreboard. It is not a turn-by-turn navigation app—it is a macro-level transparency tool that gives the public, media, and policymakers verified facts on Malaysia's electrification trajectory, free from commercial bias or paywalls.

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

## 💡 Four Structural Trends Revealed by the Data

By analyzing 5 years of official vehicle registration and charging records, the portal reveals four major real-world shifts:

### 1. The "Hybrid to Pure EV" Tipping Point (17.5% → 70.2%)
In early 2022, hybrids were the cautious stepping stone, accounting for **82.5%** of all green car registrations while pure electric cars (BEVs) made up only 17.5%. By mid-2024, pure electric vehicles crossed 50%, and by the final quarter of 2025, pure battery electric cars hit an all-time peak of **70.2%** of all new electrified registrations. Malaysian drivers have largely bypassed hybrids as an interim technology, moving directly to 100% electric.

### 2. The Three Eras of Market Leadership (2022 → 2026)
* **2022 (The Luxury Niche)**: BMW dominated with **43.6%** market share. EVs were luxury toys for affluent drivers buying the BMW iX and i4.
* **2023–2024 (The Challenger Duel)**: BYD and Tesla entered. By 2024, BYD (45.8%) and Tesla (27.4%) together captured an astonishing **73.2% duopoly** of all electric cars sold in Malaysia.
* **2025–2026 (The Domestic Disruption)**: Proton introduced the e.MAS 7. In 2026 YTD, Proton surged to **53.1% market share**, marking the first time in history that a domestic Malaysian automaker captured the majority of national EV registrations.

### 3. The Urban Infrastructure Crunch (KL at 74.5:1 vs. Perak at 8.5:1)
Charging bottlenecks are heavily concentrated in high-density urban areas. While Kuala Lumpur has the highest number of registered EVs (12,671 cars), it has only 170 public charging bays—a severe bottleneck of **74.5 cars per charger** (7.5x worse than the EU 10:1 safety target!). Penang faces a similar crunch at **45.4:1**. Conversely, Perak actually meets the global benchmark at **8.5 cars per charger**, thanks to public charging hubs installed along PLUS North-South Expressway rest areas (R&Rs).

### 4. The 2025 Q4 Policy Rush (21,742 Pure EVs in One Quarter)
The final quarter of 2025 recorded an all-time high of **21,742 pure EV registrations** in a single quarter—more than all of 2022 and 2023 combined. This surge was driven by consumers and corporate fleets rushing to take advantage of the final months of the complete road tax and import duty exemptions before the government's revised JPJ EV road tax framework took effect in 2026.

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

### 🏢 Why is "Corporate Fleet" (Rakan Niaga) in the Dataset?

In the official JPJ vehicle registration dataset, **over 74% (77,252+ vehicles)** of all pure electric cars are recorded under **"Corporate Fleet"** (originally tagged as *Rakan Niaga*). Here is why this category exists and why it matters:

1. **The JPJ e-Daftar Commercial Partner Channel**  
   Authorized automotive dealerships (e.g., Proton, BYD, Tesla authorized dealers), distributors, and fleet leasing companies do not register vehicles at physical state counter branches. Instead, they register cars in bulk online through JPJ's electronic business partner gateway (*Sistem Pendaftaran Kenderaan Atas Talian / Rakan Niaga*). In government records, these are logged centrally under the commercial partner gateway rather than a specific geographic branch.

2. **Corporate Tax Incentives & ESG Fleets**  
   Malaysian businesses heavily drive EV adoption to claim **Green Technology Tax Incentives** and **Accelerated Capital Allowances (ACA)**. Companies lease electric vehicles for executive perks, company fleets, and commercial delivery operations, creating a massive concentration of enterprise-registered EVs.

3. **Why Does It Show 0 Public Chargers?**  
   Public charging stations are installed in physical geographic states (e.g., Selangor, Penang, Johor, Kuala Lumpur). *Corporate Fleet* is a nationwide registration channel—not a geographic territory. Vehicles registered under this channel operate on roads and use chargers across all 16 states.

> **Dashboard Note:** To prevent distorting local state infrastructure ratios, our State Comparison and Ranking tools focus on physical territory registrations (Selangor, KL, Johor, etc.), while the Open Data Table includes the full Corporate Fleet row for 100% mathematical completeness.

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
