# LastMileIQ — B2B Last-Mile Mobility Intelligence & Dynamic Dispatch Platform (Mumbai Public Transit)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![ONDC Enabled](https://img.shields.io/badge/ONDC-Open%20Mobility-10B981?style=flat)](https://ondc.org/)
[![Template Reference](https://img.shields.io/badge/Template-Bionis%20Dashboard-8B5CF6?style=flat)](https://registry.watermelon.sh/r/bionis-dashboard.json)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"The Operating System for Mumbai's Last-Mile Mobility"**  
> AI-powered spatio-temporal transit intelligence platform tackling the 1–5 km last-mile transit crisis across Mumbai Metro and Suburban Railway networks. Built on the modern Bionis Dashboard layout architecture.

---

## 1. Executive Summary & Problem Context

Mumbai represents one of the highest-density commuter ecosystems in the world. The Mumbai Suburban Railway ("the Lifeline of Mumbai") transports over 7.5 million daily commuters, while the expanding Mumbai Metro network handles rapid east-west and arterial suburban transfers.

Station exit gates (such as Andheri, Dadar, Kurla, Ghatkopar, and BKC) experience severe **first/last-mile transit bottlenecks**:
- **Exit Surges**: When a local train discharges 1,200–2,500 passengers at peak hours, exit concourses face acute vehicular deficits and predatory waiting lines.
- **Operator Dead Mileage**: Mumbai auto-rickshaws, shared syndicates, and BEST feeder minibuses waste 35–45% of daily shift time cruising empty or stuck in uncoordinated queues.
- **Municipal Equity Gaps**: Transit bodies (MMRDA, BMC, BEST, Central & Western Railway) require real-time gate-level demand telemetry to evaluate curb lane segregation and feeder electrification ROI.

**LastMileIQ** synchronizes incoming train arrival streams with vehicle supply, dynamic rebalancing, and Last-Mile Stress Index (LMSI) scoring.

---

## 2. Active Corridors — Mumbai Public Transports (9 Lines)

LastMileIQ is exclusively configured for Mumbai's transit corridors:

### 🚇 The 6 Mumbai Metro Lines
1. **Metro Line 1 (Blue Line)**: Versova – D.N. Nagar – Andheri – Saki Naka – Ghatkopar *(Interchange with WR & CR)*
2. **Metro Line 2A (Yellow Line)**: Dahisar East – Borivali West – Kandivali West – Malad West – D.N. Nagar
3. **Metro Line 7 (Red Line)**: Dahisar East – National Park – Dindoshi – Gundavali *(Western Express Highway)*
4. **Metro Line 3 (Aqua Line)**: Aarey JVLR – SEEPZ – CSMIA T2 Airport – BKC *(Underground)*
5. **Metro Line 2B (Yellow Line Ext)**: D.N. Nagar – Bandra National College – BKC MMRDA – Chembur – Mandale
6. **Metro Line 6 (Pink Line)**: Swami Samarth Nagar (Lokhandwala) – JVLR – IIT Bombay Powai – Vikhroli EEH

### 🚆 The 3 Mumbai Suburban Local Lines (Distinct Dot Colors in Dropdown)
7. **Western Railway Local (WR)**: Churchgate – Dadar WR – Bandra – Andheri – Borivali *(Vibrant Crimson Red `#EF4444`)*
8. **Central Railway Local (CR)**: CSMT – Byculla – Dadar CR – Kurla – Ghatkopar – Thane *(Electric Golden Amber `#F59E0B`)*
9. **Harbour Railway Local (HR)**: CSMT – Vadala Road – Kurla Harbour – Vashi – Panvel *(Royal Purple `#8B5CF6`)*

---

## 3. Bionis Dashboard Template Architecture

Adopted from the clean, modern Bionis layout reference (`https://registry.watermelon.sh/r/bionis-dashboard.json`):

- **Collapsible Modern Sidebar (`src/components/bionis/Sidebar.jsx`)**:
  - Brand identity with live Mumbai transit pulse
  - Categorized corridor selector dropdown with distinct color dots
  - Navigation links: Live Dispatch, Geospatial Map, Fleet Analytics, City Planning, Commuter ONDC
  - Account Profile Card with 1-click Role Switcher at the bottom
- **Streamlined Topbar (`src/components/bionis/Topbar.jsx`)**:
  - Sidebar collapse toggle
  - Active line breadcrumbs and station count badge
  - Quick Scenario Stress Injection pills (🌧️ Monsoon, 🚆 Local Rush, ⚡ Charging Shift)
  - Active account persona indicator
  - **Zero clutter**: No time box, no command view button
- **Refined KPI Cards (`src/components/bionis/DashboardMetrics.jsx`)**:
  - Fleet Utilization Rate (+14.2% trend)
  - Avg Commuter Wait Time (-74% drop)
  - Dead-Mileage Cut (-34% eliminated)
  - Revenue Uplift (+₹420 / day per vehicle)

---

## 4. Account-Driven Multi-Stakeholder System

Rather than cluttered tab filters, LastMileIQ uses a realistic, executive **Account & Role Profile Switcher** located in the sidebar & topbar:

1. **Rohan Mehta (B2B Fleet Operator)**  
   *Apex Mobility / Maha-EV Feeder Syndicate*  
   - Dedicated B2B command view with live GIS map, incoming train radar, 1-click auto-dispatch, driver queue, and fleet economics.
2. **Dr. Anjali Deshmukh (B2G Municipal Planner)**  
   *MMRDA Urban Transit & Infrastructure Directorate*  
   - Suburban transit equity scores, bottleneck chokepoints (Dadar, Kurla, Andheri), and BEST feeder lane ROI.
3. **Aditya Sharma (B2C Commuter)**  
   *ONDC / Chalo Daily Rider*  
   - Live mobile concourse exit guide, shared EV auto seat reservation (fixed ₹20 fare), and OTP boarding confirmation.

---

## 5. Self-Contained Architecture (Zero API Keys)

> **Important**: LastMileIQ runs **100% locally with zero external API key requirements**.
- **Maps**: Uses CartoDB Dark Matter tiles via OpenStreetMap standards (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`), which do not require any tokens or API keys.
- **Simulation**: Mathematical Poisson egress forecasting, LMSI calculation, and dispatch rebalancing run completely in-browser via JavaScript Web Audio and Canvas APIs.

---

## 6. Quickstart & Local Installation

```bash
# 1. Clone repository
git clone https://github.com/akshat-vidyarthi/LastMileIQ.git
cd LastMileIQ

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle
npm run build
```

---

## 7. License

MIT License — see [LICENSE](LICENSE) for details.
