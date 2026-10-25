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
> AI-powered spatio-temporal transit intelligence platform tackling the 1–5 km last-mile transit crisis across Mumbai Metro and Suburban Railway networks. Built on a decluttered, high-polish Bionis dashboard layout architecture with authentic Google Maps geospatial visualization.

---

## 🌐 Live Production Deployment (Render)

LastMileIQ is deployed as a high-performance **Static Site** on **Render** with global Edge CDN distribution:

- **Live URL**: [https://lastmileiq.onrender.com](https://lastmileiq.onrender.com)
- **Hosting Tier**: Render Static Site (Edge CDN, zero cold start latency)
- **Continuous Deployment**: Automated git-triggered builds on every push to `main`
- **Build Specs**:
  - **Runtime**: Node.js / Vite 5
  - **Build Command**: `npm run build`
  - **Publish Directory**: `dist`
  - **SPA Rewrite**: `/*` ➔ `/index.html` (Rewrite)

---

## 1. Executive Summary & Problem Context

Mumbai represents one of the highest-density commuter ecosystems in the world. The Mumbai Suburban Railway ("the Lifeline of Mumbai") transports over 7.5 million daily commuters, while the expanding Mumbai Metro network handles rapid east-west and arterial suburban transfers.

Station exit concourses (such as Andheri, Dadar, Kurla, Ghatkopar, and BKC) experience severe **first/last-mile transit bottlenecks**:
- **Exit Surges**: When local and metro trains discharge 1,200–2,500 passengers at peak hours, exit concourses face acute vehicular deficits and predatory waiting lines.
- **Operator Dead Mileage**: Mumbai auto-rickshaws, EV syndicates, and BEST feeder minibuses waste 35–45% of daily shift time cruising empty or stuck in uncoordinated queues.
- **Municipal Equity Gaps**: Transit bodies (MMRDA, BMC, BEST, Central & Western Railway) require real-time gate-level demand telemetry to evaluate curb lane segregation and feeder electrification ROI.

**LastMileIQ** synchronizes incoming train arrival streams with vehicle supply, dynamic rebalancing, and Last-Mile Stress Index (LMSI) scoring.

---

## 2. Authentic Google Maps Engine with Station Highlighting

LastMileIQ features direct **Google Maps Engine integration** with zero external API key requirements:

- **Dual Google Tile Modes**:
  - 🗺️ **Google Roadmap**: Full road network, coastal terrain (Arabian Sea, Thane Creek), highways, and neighborhood street grids.
  - 🛰️ **Google Satellite Hybrid**: High-resolution aerial satellite imagery layered with street names and landmarks.
- **Prominently Highlighted Stations**:
  - High-visibility glowing station nodes with transit glyphs (🚇 for Metro, 🚆 for Suburban Local).
  - Bold station codes (`AND`, `CSMT`, `CCG`, `DDR`, `VSV`, `GHT`, `TNA`, `BOR`, etc.) and prominent station name pills.
  - Interactive click popups displaying concourse exit gates, alighting commuter volumes, and immediate vehicle shortages.
  - Glowing transit line polylines in official line brand colors with dual core and glow tracks.
  - Dynamic **Last-Mile Stress Index (LMSI)** radial heat halos around each station (Green <5m, Yellow 5-12m, Red >15m wait).

---

## 3. Active Corridors — Mumbai Public Transports (9 Lines)

Corridor selection is placed **exclusively in the sidebar under the logo**:

### 🚇 The 6 Mumbai Metro Lines
1. **Metro Line 1 (Blue Line)**: Versova – D.N. Nagar – Andheri – Saki Naka – Ghatkopar *(Interchange with WR & CR)*
2. **Metro Line 2A (Yellow Line)**: Dahisar East – Borivali West – Kandivali West – Malad West – D.N. Nagar
3. **Metro Line 7 (Red Line)**: Dahisar East – National Park – Dindoshi – Gundavali *(Western Express Highway)*
4. **Metro Line 3 (Aqua Line)**: Aarey JVLR – SEEPZ – CSMIA T2 Airport – BKC *(Underground)*
5. **Metro Line 2B (Yellow Line Ext)**: D.N. Nagar – Bandra National College – BKC MMRDA – Chembur – Mandale
6. **Metro Line 6 (Pink Line)**: Swami Samarth Nagar (Lokhandwala) – JVLR – IIT Bombay Powai – Vikhroli EEH

### 🚆 The 3 Mumbai Suburban Local Lines (Distinct High-Contrast Dot Colors)
7. **Western Railway Local (WR)**: Churchgate – Dadar WR – Bandra – Andheri – Borivali *(Vibrant Crimson Red `#EF4444`)*
8. **Central Railway Local (CR)**: CSMT – Byculla – Dadar CR – Kurla – Ghatkopar – Thane *(Electric Golden Amber `#F59E0B`)*
9. **Harbour Railway Local (HR)**: CSMT – Vadala Road – Kurla Harbour – Vashi – Panvel *(Royal Purple `#8B5CF6`)*

---

## 4. Decluttered, Modern Layout Architecture

In response to user feedback, LastMileIQ features a radically decluttered interface:
- **No Topbar**: The top bar has been completely removed to provide an uninterrupted, full-height command center canvas.
- **Sidebar-Only Line Display**: The active corridor is displayed solely in the sidebar under the brand header, eliminating all duplicate top-of-page displays.
- **Light / Dark Mode Toggle**: A dedicated toggle in the sidebar footer allows seamless switching between **Dark Command Center** and **Light Precision View**.
- **Integrated Surge Stress Injection**: Scenario buttons (🌧️ Monsoon, 🚆 Local Rush, ⚡ Charging Shift) are placed directly inside the Predictive Dispatch Panel where dispatchers need them.

---

## 5. Dual Stakeholder Account System

Instead of artificial mode filters, the platform uses two executive account profiles:

1. **Rohan Mehta — Fleet Dispatch Director**  
   *Mumbai Feeder Syndicate & EV Fleet Alliance*  
   - Real-time station vehicle deficit telemetry, one-click dynamic auto-dispatch, live driver queue (`MH-02-EV-XXXX`), and fleet unit economics.
2. **Dr. Anjali Deshmukh — Transit Planner**  
   *MMRDA Infrastructure & Transit Equity Wing*  
   - Suburban transit equity scores, bottleneck chokepoints (Dadar, Kurla, Andheri), 10-minute feeder isochrones, and dedicated feeder lane ROI.

---

## 6. Self-Contained Architecture (Zero API Keys)

> **Important**: LastMileIQ runs **100% locally with zero external paid API keys**.
- **Maps**: Uses Google Maps tile servers directly (`https://mt{s}.google.com/vt/lyrs=m...` & `lyrs=y...`).
- **Audio Synthesizer**: Pure HTML5 Web Audio API synthesizer for dispatch pings and alerts.
- **Simulation**: Mathematical Poisson egress forecasting, LMSI calculation, and dispatch rebalancing run completely in-browser.

---

## 7. Quickstart & Local Installation

```bash
# 1. Clone repository
git clone https://github.com/akshat-vidyarthi/LastMileIQ.git
cd LastMileIQ

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev

# 4. Production build
npm run build
```

Open `http://localhost:5173` in your browser to launch the Mumbai Last-Mile Command Center.

---

## 8. Authors & Maintainers

- **Akshat Vidyarthi** (`akshatvidyarthi@gmail.com`) — Platform Architecture, Foundation, Multi-Stakeholder Views
- **Ayush Trivedi** (`ayush.ct0406@gmail.com`) — Spatio-temporal Simulation Engine & Google Maps Integration
- **Harsh Thakkar** (`harsht1103@gmail.com`) — B2B Predictive Dispatch Dashboard, Sidebar UX & Theming
