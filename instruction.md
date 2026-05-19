# EV Adoption Dashboard Malaysia — Complete Project Instruction

## Project Overview

Build a modern, production-ready analytics web application that visualizes Electric Vehicle (EV), Hybrid, and Petrol vehicle registration adoption trends in Malaysia using official DOSM open datasets.

The application must provide:
- Interactive analytics dashboards
- Vehicle registration comparisons
- EV adoption insights
- Trend forecasting visuals
- Market share analysis
- Vehicle type analysis
- Model and manufacturer comparison

The final product should look and feel like a premium modern analytics platform similar to:
- Bloomberg Terminal dashboards
- Tesla analytics portals
- Government open data platforms
- Modern SaaS intelligence dashboards

---

# Tech Stack

Use the following technologies:

## Frontend
- React + Vite
- TypeScript
- TailwindCSS
- shadcn/ui
- Recharts
- Framer Motion
- Lucide React

---

## State Management
Use one of:
- Zustand
- Context API

---

## Data Fetching & Caching
Use:
- TanStack Query

---

## Data Parsing
Use:
- apache-arrow
- parquet-wasm

---

## Utility Libraries
Suggested:
- date-fns
- clsx
- tailwind-merge

---

# Core Application Requirements

The application must support:

- Dark mode and light mode
- Responsive mobile-first design
- Desktop optimization
- Tablet responsiveness
- Fast loading speed
- Optimized rendering
- Smooth transitions
- Accessibility support
- Semantic HTML
- Scalable architecture
- Clean reusable components
- Easy deployment
- Easy maintenance
- Easy updates
- Easy testing
- Easy debugging
- Easy scaling
- Easy monitoring

---

# Official Data Sources

Use parquet datasets directly from the following URLs.

---

## EV Registration Datasets

### 2025 Dataset
https://storage.data.gov.my/transportation/cars_2025.parquet

### 2026 Dataset
https://storage.data.gov.my/transportation/cars_2026.parquet

---

## Fuel Type Dataset

https://storage.data.gov.my/transportation/registrations_type_fuel.parquet

---

# Application Structure

The application must contain:

1. Landing Page
2. Interactive Dashboard
3. Insights Page
4. About Page

---

# Landing Page Requirements

Create a modern, polished landing page before entering the dashboard.

---

# Landing Page Sections

## 1. Hero Section

Include:
- Large modern headline
- Subtitle
- Description paragraph
- CTA button to open dashboard
- Background gradient
- Animated visual elements
- Floating statistics cards

---

## 2. Overview Statistics Cards

Display:
- Total EV registrations
- Total Hybrid registrations
- Total Petrol registrations
- EV growth percentage
- Hybrid growth percentage
- Most popular EV model
- Most popular Hybrid model

---

## 3. Quick Insights Section

Automatically generate insights such as:
- Fastest growing EV brand
- Most adopted vehicle category
- Highest growth month
- EV market share increase
- Hybrid market trends

---

## 4. Features Section

Explain platform capabilities:
- EV trend tracking
- Vehicle registration analysis
- Market share analysis
- Interactive comparisons
- Data filtering
- Historical trend analysis
- Real-time dashboard interaction

---

## 5. Dashboard Preview Section

Include:
- Mock dashboard preview
- Animated chart previews
- Device responsive previews

---

## 6. Footer

Include:
- Data source attribution
- GitHub repository placeholder
- About section
- Contact placeholder
- License placeholder

---

# Landing Page Design Requirements

The landing page should be:

- Modern
- Minimalist
- Premium
- Professional
- Fast
- Interactive
- Visually impressive

---

# UI Style Guide

Use:
- Smooth animations
- Soft shadows
- Large rounded corners
- Glassmorphism effects
- Clean spacing
- Elegant typography
- Responsive grids
- Hover interactions
- Animated gradients

---

# Interactive Dashboard Requirements

Build a professional analytics dashboard.

---

# Dashboard Layout

The dashboard must include:

- Sidebar navigation
- Top navigation bar
- Breadcrumb navigation
- Search bar
- Theme switcher
- Filter controls
- Main analytics content area
- Responsive grid system

---

# Dashboard Navigation Sections

## Sidebar Navigation Items

Include:
- Overview
- EV Trends
- Vehicle Comparison
- Market Share
- Vehicle Types
- Top Models
- Insights
- About

---

# Dashboard Features

---

# A. EV Adoption Comparison (2025 vs 2026)

Compare EV registrations between years.

---

## Requirements

Display:
- Monthly EV registrations
- Quarterly registrations
- Annual comparison
- Growth percentages
- Cumulative registrations
- Adoption trend analysis

---

## Charts Required

Use:
- Line charts
- Area charts
- KPI statistic cards
- Animated counters

---

## Additional Features

Add:
- Date range filtering
- Monthly/yearly toggle
- Export chart button

---

# B. Top Make & Model Comparison

Compare cumulative registrations between 2025 and 2026.

---

## Requirements

Display:
- Top 10 by default
- Dynamic Top N selection
- Search functionality
- Sort functionality

---

## Filters

Allow filtering by:
- Make
- Model
- Year
- Fuel type

---

## Charts Required

Use:
- Horizontal bar charts
- Stacked bar charts
- Ranking cards
- Interactive tooltips

---

# C. EV / Hybrid vs Petrol Adoption

Compare:
- Electric vehicles
- Hybrid petrol vehicles
- Petrol vehicles

---

## Requirements

Display:
- Percentage share
- Historical trends
- Growth comparison
- Market adoption rate

---

## Charts Required

Use:
- Pie charts
- Donut charts
- Multi-line charts
- Stacked area charts

---

# D. Vehicle Type Analysis

Analyze EV and Hybrid adoption based on vehicle category.

---

## Vehicle Categories

Examples:
- Motokar
- Jip
- Pickup
- Bus
- Lorry
- Motorcycle
- Van

---

## Requirements

Display:
- Distribution analysis
- Category growth trends
- Market comparison
- Registration trends over time

---

## Charts Required

Use:
- Treemap charts
- Heatmap-style visuals
- Bar charts
- Stacked charts

---

# E. Best Models in Last 3 Months

Identify top-performing EV and Hybrid models in the latest rolling 3 months.

---

## Requirements

Display:
- Top EV models
- Top Hybrid models
- Growth indicators
- Registration count trends

---

## Charts Required

Use:
- Leaderboards
- Animated ranking cards
- Trend indicators
- Mini sparkline charts

---

# F. EV Adoption vs All Vehicle Types

Using:
https://storage.data.gov.my/transportation/registrations_type_fuel.parquet

Compare EV adoption against all vehicle categories.

---

## Compare Against

- Car
- Bus
- Motorcycle
- Lorry
- Van
- Pickup

---

## Requirements

Display:
- Historical trends
- Market share comparison
- Adoption growth
- Percentage contribution

---

## Charts Required

Use:
- Multi-line charts
- Stream graphs
- Area charts
- Trend charts

---

# Insights & Analytics Features

Generate automatic insights such as:
- Fastest growing EV brand
- Highest growth month
- Top vehicle category
- EV market penetration
- Hybrid growth analysis

---

# Data Processing Requirements

---

# Parquet File Handling

The application must:
- Fetch parquet files directly from URLs
- Parse parquet efficiently
- Cache responses
- Handle loading states
- Handle network errors
- Handle empty datasets gracefully

---

# Data Optimization

Implement:
- Memoization
- Derived data caching
- Lazy computation
- Query caching

---

# UI / UX Requirements

The application must be:
- Fast
- Smooth
- Interactive
- Clean
- Mobile-first
- Easy to understand
- Easy to navigate

---

# Required UI Enhancements

Use:
- Skeleton loaders
- Hover effects
- Animated transitions
- Animated counters
- Tooltips
- Interactive legends
- Responsive charts
- Sticky filters
- Sticky navbar

---

# Accessibility Requirements

Ensure:
- Keyboard navigation support
- Proper contrast ratios
- Screen reader compatibility
- Semantic HTML usage

---

# Performance Requirements

Optimize:
- Lazy loading
- Route-based code splitting
- Memoization
- Efficient chart rendering
- Minimal re-renders
- Dynamic imports

---

# Suggested Folder Structure

```bash
src/
├── assets/
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── landing/
│   ├── shared/
│   └── ui/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── services/
├── store/
├── styles/
├── types/
├── utils/
└── main.tsx