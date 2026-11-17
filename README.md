# Malaysia EV Open Data Portal

> **A free, open website that turns official Malaysian government vehicle records into clear charts, state comparisons, and verified charging data.**

[![Live Demo](https://img.shields.io/badge/Live_Portal-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://ev-adoption-malaysia-dashboard.vercel.app/)
[![Data License: CC BY 4.0](https://img.shields.io/badge/Data_License-CC_BY_4.0-059669?style=for-the-badge)](https://creativecommons.org/licenses/by/4.0/)
[![Source Code: MIT](https://img.shields.io/badge/Code_License-MIT-1E3A8A?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Coverage Period](https://img.shields.io/badge/Coverage-2022_--_2026_YTD-D97706?style=for-the-badge)](https://data.gov.my/)

---

## 🎯 Why This Dashboard Was Built

Electric vehicles (EVs) are growing fast in Malaysia. Between government road tax exemptions, new car brands entering the country, and national clean energy plans, there is a lot of buzz in the news.

However, anyone trying to understand what is actually happening faces several big roadblocks:
* Car companies announce thousands of "bookings" in press releases, but how many cars are **actually registered and driving on our roads**?
* The government set a national goal of **10,000 public charging bays**, but are we on track or falling behind?
* Government data on `data.gov.my` is stored in heavy database files that ordinary citizens and students cannot easily open.
* Over 74% of electric cars are listed under **"Corporate Fleet"**, leaving many people confused about whether the data is broken.

This dashboard was created to solve these exact problems. It takes official government records from the **Road Transport Department (JPJ)**, the **Department of Statistics Malaysia (DOSM)**, and **Open Charge Map (OCM)**, crunches the numbers, and puts everything in simple charts and one-click Excel downloads that anyone can use for free.

---

## 🧭 The Project at a Glance

* **Who is this for?** Malaysian car buyers, drivers, journalists, students, researchers, and planners who want verified facts about electric cars in Malaysia without any sales talk or advertising.
* **What does it do?** It tracks pure electric cars (BEVs), plug-in hybrids (PHEVs), and public charging bays across Malaysia, showing growth trends, brand rankings, and state comparisons.
* **Where does it cover?** All 16 Malaysian states and federal territories, plus major travel routes like the North-South Expressway (PLUS) and the East Coast Expressway (LPT).
* **When is it updated?** It covers data from January 2022 through 2026, updating automatically at the start of every month when new government data is published.
* **Why was it built?** To replace marketing rumors and unreadable database files with clear, open, verified facts for the Malaysian public.
* **How does it work?** An automated data pipeline pulls official `.parquet` files from the government, cleans and groups the records, and serves fast interactive charts and safe CSV downloads.

---

## 🔍 The Real Problems This Dashboard Solves

### 1. Separating Showroom Hype from Real Cars on the Road
Car dealerships and brand executives often brag about huge sales numbers or thousands of bookings. But a booking is not a car on the road—many bookings get cancelled or delayed. This dashboard pulls official JPJ registration records, showing the exact number of pure electric and hybrid cars that have been inspected, registered, and are actively driving on Malaysian roads.

### 2. Checking Malaysia's 10,000 Public Charger Target
Under the National Energy Transition Roadmap (NETR), Malaysia set a target of 10,000 public chargers by 2025. Before this portal, there was no simple public scoreboard to see how the country was doing. The dashboard tracks verified charging bays (currently **2,504 bays**, or **25.0% of the goal**) and calculates Malaysia's national **Cars-Per-Charger ratio (41.3 cars per charger vs. the recommended 10:1 safety guide)**.

### 3. Making Government Big Data Easy for Anyone to Read
The Malaysian government publishes vehicle data on `data.gov.my`, but the files are delivered as massive **Apache Parquet files** with millions of rows. Ordinary car buyers, students, and news reporters cannot open `.parquet` files on their computers without writing Python code or using database tools. This dashboard converts those huge files into simple charts, rankings, and clean CSV and JSON files that open instantly in Microsoft Excel.

### 4. Explaining the "Corporate Fleet" Mystery (74.6% of EVs)
When people look at raw JPJ records, over 77,000 electric cars are listed under **"Corporate Fleet"** (*Rakan Niaga*) instead of an individual state. Many people assumed the data was glitched. This portal explains that authorized dealers (Proton, BYD, Tesla) register cars online in bulk through JPJ's commercial system, and companies buy EVs for green tax deductions.

### 5. Comparing States Side-by-Side
It is hard to tell whether your home state has enough chargers for the cars on its roads. The dashboard includes a side-by-side comparison tool that lets you pick any two states (like Penang vs Johor, or Selangor vs Perak) and immediately compare their car counts, charger counts, and charger ratios.

### 6. Showing Where Chargers Are Placed (Malls vs Highways)
Rather than guessing where public chargers are, the portal reveals that **over 93% of public chargers are in city shopping malls and hotels**, while only around 50 public bays are located directly along major expressways like PLUS and LPT. This explains why weekend mall charging is simple, but festive holiday trips still cause long charging queues.

*(Note: This dashboard is a data and policy tracking tool, not a live turn-by-turn navigation app. For live charger availability or turn-by-turn GPS routing while driving, drivers should use specialized driver apps like PlugShare or Google Maps).*

---

## 📊 Key Numbers at a Glance (2022–2026)

| What We Track | Current Number | What It Means |
| :--- | :---: | :--- |
| **Total Electrified Cars** | **103,515** | Total pure electric cars (BEVs) and hybrids (PHEVs) registered in Malaysia since 2022. |
| **Public Charging Bays** | **2,504** | Total active public charging plugs across 818 verified locations nationwide. |
| **National Cars Per Charger** | **41.3 to 1** | Malaysia currently averages 41 electric cars sharing each public charger (Global safety recommendation is **10 to 1**). |
| **NETR 10,000 Target Progress** | **25.0%** | Progress toward Malaysia's national public charging infrastructure target. |
| **#1 Car Brand in 2026** | **Proton (53.1%)** | With the launch of the e.MAS 7, Proton captured more than half of all new EV sales in early 2026. |

---

## 💡 Six Real Discoveries from the Data

By analyzing 5 years of official vehicle registration and charging records, the portal highlights six real-world findings:

### 1. Malaysians Skipped Hybrids for Pure EVs
In early 2022, hybrids made up **82.5%** of green car sales while pure electric cars were only 17.5%. Drivers bought hybrids because they were worried about electric range. But by late 2025, pure battery electric cars jumped to an all-time peak of **70.2%** of all green car registrations. Fast highway chargers and duty-free car prices gave buyers the confidence to go straight to 100% electric.

### 2. How the Car Brand Race Changed (Proton Takes #1)
* **2022 (Luxury Toys)**: BMW held **43.6%** of the market. Electric cars were expensive status symbols for wealthy buyers (BMW iX, i4).
* **2023–2024 (The New Challengers)**: BYD and Tesla entered Malaysia. By 2024, BYD (45.8%) and Tesla (27.4%) together captured **73.2%** of all electric car sales.
* **2025–2026 (Proton's Big Win)**: Proton launched the e.MAS 7. In 2026, Proton jumped to **53.1% market share**—marking the first time a Malaysian national car brand took the #1 spot in electric cars.

### 3. The Big City Charger Crunch (KL vs Perak)
Kuala Lumpur has the most electric cars in the country (12,671 pure EVs), but only 170 public chargers. That is a heavy bottleneck of **74.5 cars per charger** (over 7 times higher than the international 10:1 safety benchmark). High-rise condo dwellers in KL and Penang (45.4:1) feel this crunch every day. In contrast, Perak actually meets the global benchmark at **8.5 cars per charger**, because energy companies built charging hubs at rest stops along the PLUS highway.

### 4. The End-of-2025 Tax Rush (21,742 Cars in 3 Months)
In the final three months of 2025, Malaysians registered **21,742 pure electric cars** in just 90 days—more than all of 2022 and 2023 combined! Car buyers and company fleets rushed to buy before the government's full road tax holiday expired and new road tax rules began in 2026.

### 5. The East Malaysia Divide (Sabah vs Sarawak)
Sabah already has 944 pure electric cars on the road, but verified public directories show **zero open public charging bays**. Sabah EV owners have to rely almost entirely on home wallboxes or car showroom chargers. Meanwhile, Sarawak is further ahead with 61 public charging bays for its 817 electric cars (about 13 cars per charger).

### 6. Malls Have Plenty, Highways Need More
Over **93% (2,335 bays)** of Malaysia's 2,504 public chargers are located at urban shopping malls, office buildings, and hotels. While weekend mall charging is easy, only around 50 public bays are installed directly along major expressways like PLUS and LPT. This explains why drivers still face charging queues when heading out on holiday road trips.

---

## 🏢 Why is "Corporate Fleet" (Rakan Niaga) in the Data?

In official JPJ records, **74.6% (over 77,000 vehicles)** of all pure electric cars are recorded under **"Corporate Fleet"** (originally called *Rakan Niaga*). Here is why this exists:

1. **Dealerships Register Cars Online (JPJ e-Daftar)**  
   Authorized car dealers (such as Proton, BYD, and Tesla) don't queue up at local JPJ state counters. Instead, they register new cars in bulk online through JPJ's electronic partner system (*Rakan Niaga*). In government records, these get logged under the central partner gateway rather than an individual state counter.

2. **Big Company Tax Savings**  
   Companies in Malaysia get substantial tax benefits (Green Technology Tax Incentives and Capital Allowances) when buying or leasing electric cars. Many businesses bought electric cars for executive perks and company operations to lower their corporate tax bill.

3. **Why Does It Show 0 Public Chargers?**  
   "Corporate Fleet" is an online registration system, not an actual physical state on a map. Charging stations are built in real physical states like Selangor, KL, Johor, and Penang. The cars registered through this system drive and charge across all 16 states.

> **How this dashboard handles it:** To keep state comparisons fair, our State Rankings and comparisons look at cars registered at physical state branches. We keep the full Corporate Fleet row in the Open Data Table so all 103,500+ electric cars are accounted for.

---

## ⚡ Key Dashboard Features

* **Interactive Timeline (2022–2026)**: Look at quarterly registration numbers, compare pure electric cars against hybrids, or view any specific year.
* **State & Region Filter**: Filter by region (*Klang Valley, Northern, Southern, East Coast, Borneo*) or search specifically for any state.
* **Head-to-Head State Comparator**: Pick any two states to compare their electric car counts, charger counts, and charger ratios side by side.
* **Charger Gap Analysis**: Shows which states have fewer chargers than their share of electric cars demands, highlighting where new chargers are needed most.
* **Highway vs City Breakdown**: See charger numbers across the PLUS Expressway, East Coast Expressway, and city destinations.
* **Safe One-Click Data Download**: Export clean data in **CSV** or **JSON** format. All files are cleaned and protected against formula injection (**CWE-1236**) so they open safely in Microsoft Excel.

---

## 🏛️ Where the Data Comes From

This portal uses only verified, publicly available open data:

1. **Vehicle Registrations — JPJ & DOSM**  
   Downloaded from official government datasets published on [`data.gov.my`](https://data.gov.my) by the **Road Transport Department (JPJ)** and the **Department of Statistics Malaysia (DOSM)**. Covers monthly records from January 2022 through 2026.
2. **Charging Stations — Open Charge Map (OCM)**  
   Aggregated from verified public records at [`openchargemap.org`](https://openchargemap.org). Covers over 818 verified locations and 2,504 charging bays nationwide.
3. **Monthly Automated Updates**  
   A GitHub Actions pipeline runs on the 1st of every month to pull new government releases, refresh summary statistics, and keep the portal up to date.

---

## 🔒 Privacy & Civic Integrity

* **No Tracking or Cookies**: No personal data is collected, no cookies are used, no third-party tracking scripts are installed, and there are no ads or user logins.
* **No Private Personal Info in the Data**: The government records contain only general vehicle specs (registration date, car make, model, fuel type, color, and state). There are **no names, no IC numbers, no home addresses, and no license plate numbers**, fully respecting Malaysia's **Personal Data Protection Act 2010 (PDPA)**.
* **Independent Civic Project**: This portal is an independent public-benefit project. It has no affiliation with any car brand or political party.

---

## 💻 How to Run It on Your Computer

### Prerequisites
* **Node.js**: v18 or later
* **Python**: v3.10 or later (only needed if running the data update script)

### 1. Clone & Install
```bash
git clone https://github.com/niwlaash/ev-adoption-malaysia-dashboard.git
cd ev-adoption-malaysia-dashboard
npm install
```

### 2. Start the Development Server
```bash
npm run dev
# The website will open at http://localhost:5173
```

### 3. Check for Errors & Build
```bash
# Check code style and rules
npm run lint

# Check TypeScript and build production bundle
npm run build
```

### 4. Running the Data Pipeline (Optional)
```bash
cd data_pipeline
pip install -r requirements.txt
python sync_data.py
```

---

## 📜 Licenses

* **Data**: Released under the **[Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)** license. You are free to share, copy, analyze, and adapt this data for journalism, research, or commercial use with credit to the portal.
* **Source Code**: Released under the **[MIT License](https://opensource.org/licenses/MIT)**.

---

**Built by [Alwin Ashraf](https://www.linkedin.com/in/alwin-ashraf-nor-azmil-4628a9223/)**  
*Source code on [GitHub](https://github.com/niwlaash/ev-adoption-malaysia-dashboard) • Live website at [ev-adoption-malaysia-dashboard.vercel.app](https://ev-adoption-malaysia-dashboard.vercel.app/)*
