# LastMileIQ — B2B Last-Mile Mobility Intelligence & Dynamic Dispatch Platform (Mumbai Public Transit)

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=flat&logo=leaflet)](https://leafletjs.com/)
[![ONDC Enabled](https://img.shields.io/badge/ONDC-Open%20Mobility-10B981?style=flat)](https://ondc.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"The Operating System for Mumbai's Last-Mile Mobility"**  
> AI-powered spatio-temporal transit intelligence platform tackling the 1–5 km last-mile transit crisis across high-density Mumbai Metro and Suburban Railway networks.

---

## 1. Executive Summary & Problem Context

Mumbai represents one of the highest-density commuter ecosystems in the world. The Mumbai Suburban Railway ("the Lifeline of Mumbai") transports over 7.5 million daily commuters, while the expanding Mumbai Metro network handles rapid east-west and arterial suburban transfers.

However, station exit gates (such as Andheri, Dadar, Kurla, Ghatkopar, and BKC) experience severe **first/last-mile transit bottlenecks**:
- **Exit Surges**: When a local train discharges 1,200–2,500 passengers at peak hours, exit concourses face acute vehicular deficits and predatory waiting lines.
- **Operator Dead Mileage**: Mumbai auto-rickshaws, shared syndicates, and BEST feeder minibuses waste 35–45% of daily shift time cruising empty or stuck in uncoordinated queues.
- **Municipal Equity Gaps**: Transit bodies (MMRDA, BMC, BEST, Central & Western Railway) require real-time gate-level demand telemetry to evaluate curb lane segregation and feeder electrification ROI.

**LastMileIQ** synchronizes incoming train arrival streams with vehicle supply, dynamic rebalancing, and Last-Mile Stress Index (LMSI) scoring.

---

## 2. Active Corridors — Mumbai Public Transports (9 Lines)

LastMileIQ is exclusively configured for Mumbai's transit corridors:

### 🚇 The 6 Mumbai Metro Lines
1. **Metro Line 1 (Blue Line)**: Versova – Andheri – Ghatkopar (11.4 km)  
   *Interchanges with Western Railway at Andheri and Central Railway at Ghatkopar.*
2. **Metro Line 2A (Yellow Line)**: Dahisar East – D.N. Nagar (18.6 km)  
   *Western arterial corridor along Link Road (Borivali West, Kandivali West, Malad West).*
3. **Metro Line 7 (Red Line)**: Dahisar East – Gundavali / Andheri East (16.5 km)  
   *Western Express Highway spine connecting Dahisar, National Park, Dindoshi, and Gundavali.*
4. **Metro Line 3 (Aqua Line)**: Aarey JVLR – BKC – Colaba (Underground)  
   *Phase 1 operational connecting Aarey JVLR, SEEPZ, CSMIA Airport T2/T1, and BKC Financial Hub.*
5. **Metro Line 2B (Yellow Line Ext)**: D.N. Nagar – BKC – Mandale (23.6 km)  
   *Cross-suburban link connecting Bandra, BKC, Kurla East, and Chembur.*
6. **Metro Line 6 (Pink Line)**: Swami Samarth Nagar – JVLR – Vikhroli (15.3 km)  
   *Arterial link traversing JVLR, SEEPZ Village, IIT Bombay Powai, and Vikhroli EEH.*

### 🚆 The 3 Mumbai Suburban Local Lines
7. **Western Railway Local (WR)**: Churchgate – Dadar – Andheri – Borivali (34.2 km)  
   *The premier suburban corridor connecting South Mumbai, Bandra, and northern suburbs.*
8. **Central Railway Local (CR)**: CSMT – Dadar – Kurla – Ghatkopar – Thane (33.8 km)  
   *The historic spine connecting CSMT, Dadar super interchange, Kurla, and Thane.*
9. **Harbour Railway Local (HR)**: CSMT – Vadala Road – Kurla – Vashi – Panvel (48.5 km)  
   *Connects island city CSMT, Kurla, across Thane Creek to Navi Mumbai and Panvel.*

---

## 3. Self-Contained Architecture (Zero API Keys)

> **Important**: LastMileIQ runs **100% locally with zero external API key requirements**.
- **Maps**: Uses CartoDB Dark Matter tiles via OpenStreetMap standards. No Mapbox, Google Maps, or external developer tokens are needed.
- **Simulation**: Mathematical Poisson egress forecasting, LMSI calculation, and dispatch rebalancing run completely in-browser via JavaScript Web Audio and Canvas APIs.

---

## 4. Multi-Stakeholder Operational Views

- **B2B Fleet Operator**: Live GIS command center, incoming train radar, 1-click auto-dispatch, and live driver feed with Mumbai registration plates (`MH-02-ER-4192`, `MH-01`, `MH-03`).
- **B2G City Planner**: MMRDA & BMC transit equity score, suburban chokepoint ranking, and BEST feeder minibus lane ROI.
- **B2C ONDC Commuter**: Interactive smartphone preview of Namma Yatri / Chalo app with fixed-fare shared EV seats (₹20) and OTP boarding token.
- **Fleet ROI Economics**: Unit economics simulator calculating daily fuel savings and dead-mileage reduction.

---

## 5. Quickstart & Local Installation

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

## 6. Project Authors & Git Commit Sequence

Strictly structured sequential roadmap:
1. `Akshat Vidyarthi <akshatvidyarthi@gmail.com>`
2. `Ayush Trivedi <ayush.ct0406@gmail.com>`
3. `Harsh Thakkar <harsht1103@gmail.com>`
4. `Akshat Vidyarthi <akshatvidyarthi@gmail.com>`
5. `Ayush Trivedi <ayush.ct0406@gmail.com>`
6. `Harsh Thakkar <harsht1103@gmail.com>`
7. `Akshat Vidyarthi <akshatvidyarthi@gmail.com>`

---

## 7. License

MIT License — see [LICENSE](LICENSE) for details.
