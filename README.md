# LastMileIQ — B2B Last-Mile Mobility Intelligence & Dynamic Dispatch Platform (Mumbai Public Transit)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![Google Maps Engine](https://img.shields.io/badge/Google%20Maps-Roadmap%20%26%20Satellite-4285F4?style=flat&logo=googlemaps)](https://maps.google.com/)
[![Deployed on Render](https://img.shields.io/badge/Render-Static%20Site-46E3B7?style=flat&logo=render)](https://lastmileiq.onrender.com)
[![ONDC Enabled](https://img.shields.io/badge/ONDC-Open%20Mobility-10B981?style=flat)](https://ondc.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"The Operating System for Mumbai's Last-Mile Mobility"**  
> AI-powered spatio-temporal transit intelligence platform tackling the 1–5 km first/last-mile transit crisis across Mumbai Metro and Suburban Railway networks. Built on a high-density Swiss International Command Center architecture with authentic Google Maps geospatial telemetry.

---

## Live Production Deployment (Render)

LastMileIQ is deployed as a high-performance **Static Site** on **Render** with global Edge CDN distribution:

- **Live URL**: [https://lastmileiq.onrender.com](https://lastmileiq.onrender.com)
- **Hosting Tier**: Render Static Site (Edge CDN, 0ms cold start latency, 100% uptime)
- **Continuous Deployment**: Automated git-triggered pipeline on every push to `main`
- **Build Specs**:
  - **Runtime**: Node.js / Vite 5
  - **Build Command**: `npm run build`
  - **Publish Directory**: `dist`
  - **SPA Rewrite Rule**: `/*` -> `/index.html` (Rewrite)

---

## 1. Executive Summary & Problem Context

Mumbai represents one of the highest-density commuter ecosystems in the world. The Mumbai Suburban Railway ("the Lifeline of Mumbai") transports over 7.5 million daily commuters, while the expanding Mumbai Metro network handles rapid east-west and arterial suburban transfers.

Station exit concourses (such as Andheri, Dadar, Kurla, Ghatkopar, and BKC) experience severe **first/last-mile transit bottlenecks**:
- **Exit Surges**: When local and metro trains discharge 1,200–2,500 passengers at peak hours, exit concourses face acute vehicular deficits and predatory waiting lines.
- **Operator Dead Mileage**: Mumbai auto-rickshaws, EV syndicates, and BEST feeder minibuses waste 35–45% of daily shift time cruising empty or stuck in uncoordinated queues.
- **Municipal Equity Gaps**: Transit bodies (MMRDA, BMC, BEST, Central & Western Railway) require real-time gate-level demand telemetry to evaluate curb lane segregation and feeder electrification ROI.

**LastMileIQ** bridges this gap by synchronizing incoming train arrival streams with vehicle supply, dynamic 4-vehicle rebalancing batches, and Last-Mile Stress Index (LMSI) scoring.

---

## 2. Core Functional Modules

### A. Active Driver Dispatch Queue (Lazy Column & Ledger Modal)
- **Dedicated Lazy Column View**: Constrained within a dedicated scroll area (`max-h-[380px] overflow-y-auto`) so dispatchers can scroll exclusively through live feeder vehicles without shifting map viewports or page metrics.
- **Category Filters**: Real-time category filtering (`All`, `EV Rickshaws`, `Feeder Buses`) with high-contrast active state indicators.
- **Telematics "Ping Gate" Action**: Dispatches an instant concourse bay assignment to approaching drivers, accelerates vehicle progression from *Dispatched* to *En Route*, chirps an audio telematics confirmation tone via the Web Audio API, and displays a temporary acknowledgment state.
- **"View All Dispatches" Ledger Modal**: Clicking opens an exhaustive 2-column card grid displaying all rerouted units, complete with battery percentages, vehicle registration plates, driver names, and color-coded status badges:
  - **Dispatched**: Blue (`#2563EB`)
  - **En Route**: Amber (`#D97706`)
  - **Arrived**: Emerald (`#059669`)

### B. Dynamic 4-Vehicle Auto-Dispatch Engine
- **Synchronized Fleet Rebalancing**: Triggers an automated reroute batch staging 4 distinct EV feeder vehicles (rickshaws and electric minibuses) across critical concourse exit gates (e.g., Gate 2 East, Skywalk Concourse, West Bus Bay).
- **Under-5-Minute Wait Cap**: Dynamically compresses passenger egress queue times under 5 minutes during train discharge spikes.

### C. Predictive Dispatch & Scenario Stress Testing
- **Poisson Arrival Modeling**: Real-time calculation of commuter volume based on train headways and scheduled alighting rates.
- **Unified Amber Stress Injection Pills**: Instant scenario toggles calibrated for Mumbai operating conditions:
  - **Monsoon (+50%)**: Simulated deluge conditions causing auto-rickshaw shortages and flooded road speeds.
  - **Local Rush (2x)**: Simultaneous arrival of fast suburban local rakes discharging mega crowds.
  - **EV Shift (-25%)**: Fleet reduction due to mid-day battery charging rotations at EV depot hubs.

### D. MMRDA City Planner Analytics
- **Suburban Transit Equity Scores**: Live 0–100 equity ratings across western, central, and underground transit corridors.
- **Catchment Modal Splits**: Distinct analytical tracking of Shared Autos, BEST Electric Minibuses, and Walking/Skywalks.
- **Dedicated Feeder Curb ROI**: Cost-benefit analysis for municipal bus lane segregation and charging bay installation.

---

## 3. Authentic Google Maps Engine

LastMileIQ integrates directly with the **Google Maps Engine** without requiring external paid API keys:
- **Dual Tile Modes**:
  - **Google Roadmap**: Full arterial road network, coastal terrain (Arabian Sea, Thane Creek), and street grids.
  - **Google Satellite Hybrid**: High-resolution aerial satellite imagery layered with street names and landmarks.
- **Highlighted Station Nodes & Visual Tracks**:
  - High-visibility glowing station nodes with distinct codes (`AND`, `CSMT`, `CCG`, `DDR`, `VSV`, `GHT`, `TNA`, `BOR`, etc.).
  - Polylines tracing authentic alignment paths for all 9 transit corridors in official line colors.
  - Interactive click popups displaying concourse exit gates, passenger volumes, and immediate vehicle shortages.
  - Dynamic **Last-Mile Stress Index (LMSI)** radial halos (Green <5m, Yellow 5–12m, Red >15m wait).

---

## 4. Active Corridors — Mumbai Public Transports (9 Lines)

Corridor selection is managed via the **Sidebar Network Mode Slider** (Swiss Signal Red `#DC2626` active state):

### The 6 Mumbai Metro Lines
1. **Metro Line 1 (Blue Line)**: Versova – D.N. Nagar – Andheri – Saki Naka – Ghatkopar *(Interchange with WR & CR)*
2. **Metro Line 2A (Yellow Line)**: Dahisar East – Borivali West – Kandivali West – Malad West – D.N. Nagar
3. **Metro Line 7 (Red Line)**: Dahisar East – National Park – Dindoshi – Gundavali *(Western Express Highway)*
4. **Metro Line 3 (Aqua Line)**: Aarey JVLR – SEEPZ – CSMIA T2 Airport – BKC *(Underground)*
5. **Metro Line 2B (Yellow Line Ext)**: D.N. Nagar – Bandra National College – BKC MMRDA – Chembur – Mandale
6. **Metro Line 6 (Pink Line)**: Swami Samarth Nagar (Lokhandwala) – JVLR – IIT Bombay Powai – Vikhroli EEH

### The 3 Mumbai Suburban Local Lines
7. **Western Railway Local (WR)**: Churchgate – Dadar WR – Bandra – Andheri – Borivali *(Vibrant Crimson Red `#EF4444`)*
8. **Central Railway Local (CR)**: CSMT – Byculla – Dadar CR – Kurla – Ghatkopar – Thane *(Electric Golden Amber `#F59E0B`)*
9. **Harbour Railway Local (HR)**: CSMT – Vadala Road – Kurla Harbour – Vashi – Panvel *(Royal Purple `#8B5CF6`)*

---

## 5. Swiss International Design System

The application strictly follows a clean, functional **Light Mode Swiss Command Center** design language:
- **Primary Canvas**: Warm neutral slate paper background (`#F4F5F7` / `#EBECEF`) with crisp delineation borders (`#CED2DA`).
- **Primary Accent**: Swiss Signal Red (`#DC2626`) on active network toggles, key actions, and line indicators.
- **Controls & Tabs**: High-contrast Solid Carbon Black (`#0E1015`) for active filter states and primary headers.
- **Navigation Badges**: Royal Purple (`#7C3AED`) on view tabs (`Fleet Operations`, `MMRDA Policy`) and live telemetry status pills.
- **Scenario Stress Pills**: Unified Amber/Yellow (`#D97706`).
- **Zero Decorative Noise**: No harsh gradients, no emojis, no dropshadows, no radial glow orbs, and no distracting decorative cards.

---

## 6. Self-Contained Architecture (Zero API Keys)

> **Important**: LastMileIQ runs **100% in-browser with zero paid external API dependencies**.
- **Maps**: Direct Google tile layer rendering (`https://mt{s}.google.com/vt/lyrs=m...` & `lyrs=y...`).
- **Audio Synthesizer**: Native HTML5 Web Audio API frequency oscillator (`587 Hz → 880 Hz`) for driver telematics pings and alerts.
- **Simulation**: Mathematical Poisson egress forecasting, LMSI scoring, and vehicle dispatching execute client-side.

---

## 7. Quickstart & Local Installation

```bash
# 1. Clone repository
git clone https://github.com/akshat-vidyarthi/LastMileIQ.git
cd LastMileIQ

# 2. Install dependencies
npm install

# 3. Launch local development server (Port 3000)
npm run dev

# 4. Production build
npm run build
```

Open `http://localhost:3000` in your browser to launch the Mumbai Last-Mile Command Center.

---

## 8. Authors & Maintainers

- **Akshat Vidyarthi** (`akshatvidyarthi@gmail.com`) — Platform Architecture, Foundation, Multi-Stakeholder Views
- **Ayush Trivedi** (`ayush.ct0406@gmail.com`) — Spatio-temporal Simulation Engine & Google Maps Integration
- **Harsh Thakkar** (`harsht1103@gmail.com`) — B2B Predictive Dispatch Dashboard, Sidebar UX & Theming
