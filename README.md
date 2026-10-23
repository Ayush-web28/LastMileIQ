# LastMileIQ — B2B Last-Mile Mobility Intelligence & Dynamic Dispatch Platform

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![ONDC Enabled](https://img.shields.io/badge/ONDC-Open%20Mobility-10B981?style=flat)](https://ondc.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"The Operating System for India's Last-Mile Mobility"**  
> AI-powered spatio-temporal transit intelligence platform tackling the 1–5 km last-mile transit crisis across high-density Indian metro corridors.

---

## 1. Executive Summary & Problem Context

In Indian tier-1 metro catchments (such as Bengaluru's Outer Ring Road / Whitefield and Hyderabad's HITEC City / Mindspace corridors), metro rail systems efficiently transport hundreds of thousands of commuters along trunk lines. However, the system fractures during the **first and last 1–5 km**:

- **Severe Commuter Deficits**: When a 6-coach train discharges 600–1,100 commuters at a station, exit gates experience sudden, acute surges. Commuters face 15–25 minute waiting queues for feeder transit or face predatory surge fares.
- **Operator Dead Mileage**: Private auto-rickshaw syndicates, EV feeder fleets (e-rickshaws, e-bikes), and minibuses waste 35–45% of their daily runtime cruising empty or queuing blindly at the wrong station gates.
- **Municipal Equity Blindspots**: Transit authorities (DULT, BBMP, BMRCL, HMDA) lack granular gate-level spatio-temporal telemetry to identify transit deserts, bottlenecks, and micro-mobility infrastructure ROI.

**LastMileIQ** solves this mismatch with predictive demand modeling and real-time dynamic rebalancing. It synchronizes incoming metro train timetables with feeder vehicle supply, repositioning idle electric fleets to exit gates *before* commuters step off the concourse.

---

## 2. Key Capabilities & Architecture

```
                    ┌──────────────────────────────────────────────┐
                    │      Metro Telemetry & Timetable Stream      │
                    └──────────────────────┬───────────────────────┘
                                           │
                                           ▼
                    ┌──────────────────────────────────────────────┐
                    │  Spatio-Temporal Egress Forecast (Poisson)   │
                    └──────────────────────┬───────────────────────┘
                                           │
                        ┌──────────────────┴──────────────────┐
                        ▼                                     ▼
      ┌──────────────────────────────────┐  ┌──────────────────────────────────┐
      │  Last-Mile Stress Index (LMSI)   │  │   Dynamic Rebalance Optimizer    │
      │   Demand/Supply x Wait-Time^0.8  │  │  Min-Cost Repositioning Engine   │
      └─────────────────┬────────────────┘  └─────────────────┬────────────────┘
                        │                                     │
                        └──────────────────┬──────────────────┘
                                           │
                                           ▼
      ┌────────────────────────────────────────────────────────────────────────┐
      │                      Multi-Stakeholder Interfaces                      │
      ├──────────────────────┬─────────────────────────┬───────────────────────┤
      │  B2B Fleet Operator  │   B2G City Planner      │   B2C ONDC Commuter   │
      │  • GIS Command Map   │   • Transit Equity Index│   • Concourse Guide   │
      │  • 1-Click Rebalance │   • Bottleneck Ranking  │   • Live Feeder Wait  │
      │  • Driver Queue Feed │   • Policy Lane ROI     │   • Fixed-Fare Token  │
      └──────────────────────┴─────────────────────────┴───────────────────────┘
```

### A. Spatio-Temporal Train Egress Forecasting
Predicts passenger egress volume per station gate 4–8 minutes before train arrival using Poisson arrival rate modeling, historical alighting distributions, and tech-park shift schedules.

### B. Last-Mile Stress Index (LMSI)
A real-time operational metric calculated continuously across all corridor stations:
$$\text{LMSI} = \left( \frac{\text{Demand Rate}}{\text{Supply Rate}} \right) \times \left( \frac{\text{Current Wait Time}}{\text{Target Wait Time (5 min)}} \right)^{0.8}$$
- **Green ($\text{LMSI} < 1.2$)**: Optimal supply, $< 5$ min average commuter wait time.
- **Electric Amber ($1.2 \le \text{LMSI} \le 2.4$)**: Approaching capacity, $5 - 12$ min wait time.
- **Coral Red ($\text{LMSI} > 2.4$)**: Transit desert / acute vehicle shortage, $> 15$ min wait time.

### C. Dynamic Vehicle Rebalancing Algorithm
Matches gate-level passenger deficits with nearby standby stands (within a 0.5–2.0 km radius). Reallocates available EV autos and feeder shuttles with minimal dead-km, capping commuter wait times below 6 minutes.

### D. B2B Fleet Economics Calculator
Models unit economics and ESG impacts for fleet syndicates:
- **Daily Revenue Uplift**: $+₹420$ per vehicle per day via $+2.4$ additional peak trips.
- **Dead Mileage Eliminated**: $-34\%$ reduction in uncoordinated cruising.
- **Emissions Abated**: Audited CO2 reduction metrics for fleet electrification.

---

## 3. Real Indian Metro Corridors

LastMileIQ features detailed topological and geospatial datasets for two of India's most critical transit spines:

1. **Bengaluru: Indiranagar - Whitefield Metro Corridor (Purple Line)**
   - 16 Stations | 22.4 km | High-density tech corridor (ITPL, Bagmane WTC, EPIP Zone).
   - Coordinates, concourse gates, and smart stands mapped for Baiyappanahalli, Benniganahalli, KR Pura, Garudacharpalya, Hoodi, Kundalahalli, Pattandur Agrahara (ITPL), and Whitefield.
2. **Hyderabad: HITEC City Cyber Towers Corridor (Blue Line)**
   - 9 Stations | 14.8 km | Financial & technology corridor.
   - Coordinates, concourse gates, and feeder stands mapped for Ameerpet Interchange, Madhapur, Durgam Cheruvu, HITEC City (Cyber Towers), and Raidurg (Mindspace / Knowledge City).

---

## 4. Multi-Stakeholder Operational Views

- **B2B Fleet Operator Mode (Default)**: Full telemetry, incoming train radar, one-click "Execute Auto-Dispatch", interactive CartoDB dark GIS map with glowing SVG markers, driver queue with Indian registration plates (`KA-03-ER-4821`), and ROI calculator.
- **B2G City Planner Mode**: Aggregated Transit Equity Index (84.6/100), 15-minute isochrone coverage maps, modal split breakdown, prioritized bottleneck rankings, and infrastructure investment ROI.
- **B2C ONDC Commuter Preview**: High-fidelity smartphone mockup demonstrating what a commuter exiting the metro gate sees on an ONDC-enabled app (fixed-fare shared EV rickshaws at ₹25, route safety rating, OTP boarding confirmation).

---

## 5. Technology Stack & Design System

- **Frontend Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS with custom glassmorphism utilities and responsive typography
- **Mapping**: Leaflet with CartoDB Dark Matter tile layer (100% free, zero external API keys)
- **Icons**: Lucide React
- **Audio & Animations**: Synthesized Web Audio API sound effects, HTML5 Canvas streaming particle engine, and canvas-confetti
- **Design Tokens**:
  - Background: `#0B0F19` Deep Slate
  - Primary Status: Cyber Emerald `#10B981`
  - Warning/Surge: Electric Amber `#F59E0B`
  - Transit Desert / Deficit: Coral Red `#EF4444`
  - Telemetry: Neon Cyan `#06B6D4`

---

## 6. Quickstart & Local Installation

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/akshat-vidyarthi/LastMileIQ.git
cd LastMileIQ

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:3000` (or the port specified by Vite) in your browser.

### Production Build

```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 7. Project Authors & Git Commit History

The project followed a strictly structured 4-phase sequential engineering roadmap:

1. **Phase 1: Foundation, Design System & Hero Experience**
   - Author: `Akshat Vidyarthi <akshatvidyarthi@gmail.com>`
   - Commit: `feat: initialize LastMileIQ platform with cinematic hero and design system`
2. **Phase 2: Simulation Engine & Mathematical Models**
   - Author: `Ayush Trivedi <ayush.ct0406@gmail.com>`
   - Commit: `feat: implement spatio-temporal transit simulation engine and gap detection logic`
3. **Phase 3: Interactive Geospatial Command Center & B2B Dispatch UI**
   - Author: `Harsh Thakkar <harsht1103@gmail.com>`
   - Commit: `feat: integrate interactive dark-mode GIS map with real-time B2B dispatch dashboard`
4. **Phase 4: Fleet ROI Analytics, Multi-Stakeholder Views & Polish**
   - Author: `Akshat Vidyarthi <akshatvidyarthi@gmail.com>`
   - Commit: `feat: complete fleet telemetry analytics, multi-stakeholder views and production polish`

---

## 8. License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
