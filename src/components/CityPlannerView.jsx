import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Building2, 
  Map, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3, 
  Compass, 
  CheckCircle2,
  PieChart,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export default function CityPlannerView() {
  const { currentCorridorKey, computedStations } = useSimulation();

  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  // Municipal Transit Metrics
  const transitEquityScore = 84.6;
  const coverageWithin15MinIsochrone = 91.2;
  const femaleCommuterSafetyRating = 4.8;

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Building2 className="w-4 h-4" />
            <span>B2G MUNICIPAL PLANNING & TRANSIT EQUITY LAYER</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Urban Transit Intelligence & Infrastructure ROI
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Designed for DULT, BBMP, BMRCL, HMDA, and municipal authorities to identify first/last-mile transit deserts and evaluate micro-mobility infrastructure ROI.
          </p>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium self-start sm:self-center">
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'equity' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'bottlenecks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Corridor Bottlenecks
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1.5 rounded-lg transition ${
              activeTab === 'policy' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Policy & Infrastructure ROI
          </button>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Transit Equity Index
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
            {transitEquityScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> High Multi-Modal Access
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            15-Min Isochrone Catchment
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {coverageWithin15MinIsochrone}%
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 font-mono">
            +18% via Smart Stands
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Safe Corridor Score
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
            {femaleCommuterSafetyRating}<span className="text-sm font-normal text-slate-400">/5.0</span>
          </div>
          <div className="text-[11px] text-cyan-400 mt-1 font-mono">
            CCTV & Streetlight Verified
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            Active Modal Split
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
            66%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-mono">
            Clean EV Feeder + Bus
          </div>
        </div>
      </div>

      {/* Tab 1: Transit Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Modal Split Bars */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
              Corridor Last-Mile Modal Split Breakdown
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Shared EV Rickshaws (Mahindra / Piaggio)</span>
                  <strong className="text-emerald-400">42% (Optimal)</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '42%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">BMTC / TSRTC Feeder Minibuses</span>
                  <strong className="text-cyan-400">24%</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-cyan-400 h-full rounded-full" style={{ width: '24%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Pedestrian Walking (Within 600m)</span>
                  <strong className="text-amber-400">18%</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300">Private Ride-Hail / Cabs</span>
                  <strong className="text-slate-400">16%</strong>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-slate-600 h-full rounded-full" style={{ width: '16%' }} />
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <strong>Urban Equity Takeaway:</strong> The rapid adoption of shared EV rickshaws (+42%) at ₹25-30 fixed fare has democratized tech park feeder transit for entry-level and support staff, reducing private vehicle road occupancy by 31%.
            </div>
          </div>

          {/* Isochrone & First/Last Mile Accessibility */}
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
              Pedestrian Safety & Feeder Deserts
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <div>
                  <strong className="text-white">ITPL & Bagmane Tech Corridors:</strong>
                  <p className="text-slate-400 mt-0.5">High connectivity (0.4 km avg stand spacing). Zero transit deserts detected during peak egress.</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <div>
                  <strong className="text-white">Kundalahalli Gate to Brookefield:</strong>
                  <p className="text-slate-400 mt-0.5">Moderate footpath bottleneck. Commuters require feeder rickshaws due to heavy ORR road-crossing risk.</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <div>
                  <strong className="text-white">Hoodi Circle to EPIP Zone:</strong>
                  <p className="text-slate-400 mt-0.5">Identified transit desert during rain. Rebalance algorithm auto-routes 12 EVs on priority when rain flag activates.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Corridor Bottlenecks */}
      {activeTab === 'bottlenecks' && (
        <div className="space-y-4">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">
            Prioritized Station Egress Bottlenecks Ranking
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bottleneckStations.map((stn, index) => (
              <div
                key={stn.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                      #{index + 1}
                    </span>
                    <strong className="text-sm font-bold text-white">{stn.name}</strong>
                  </div>
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase"
                    style={{
                      backgroundColor: `${stn.lmsi.color}20`,
                      color: stn.lmsi.color,
                      border: `1px solid ${stn.lmsi.color}40`,
                    }}
                  >
                    LMSI: {stn.lmsi.score}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs font-mono text-slate-400 pt-1">
                  <div>
                    <span>Egress:</span>
                    <strong className="text-white block">{stn.forecast.baseTrainEgress} pax</strong>
                  </div>
                  <div>
                    <span>Wait:</span>
                    <strong className="text-amber-400 block">{stn.highDeficitGate.waitTimeMinutes} mins</strong>
                  </div>
                  <div>
                    <span>Deficit:</span>
                    <strong className="text-rose-400 block">{stn.forecast.totalDeficit} veh</strong>
                  </div>
                </div>

                <div className="text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <strong className="text-cyan-400">Recommended Civil Intervention:</strong> Dedicate 1 curb lane at Gate 2 for EV feeder staging and expand smart charging capacity.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Policy & Infrastructure ROI */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>Dedicated Feeder Lanes</span>
            </div>
            <h4 className="text-base font-bold text-white">ORR & HITEC Transit Corridors</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Carving a 3-meter painted priority lane for electric auto rickshaws and minibuses speeds up round-trip repositioning by 28%, cutting passenger queue times in half.
            </p>
            <div className="pt-2 text-xs font-mono text-emerald-400">
              Est. Cost: ₹42 Lakhs | Benefit: +3,400 daily trips
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>Smart Pick-Up Bays</span>
            </div>
            <h4 className="text-base font-bold text-white">Station Concourse Integration</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Replace chaotic curbside parking with geofenced smart bays equipped with digital driver dispatch screens and high-speed fast chargers.
            </p>
            <div className="pt-2 text-xs font-mono text-cyan-400">
              Est. Cost: ₹85 Lakhs | Benefit: -4.2 min boarding wait
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
              <Lightbulb className="w-4 h-4" />
              <span>ONDC Fare Integration</span>
            </div>
            <h4 className="text-base font-bold text-white">Unified Metro QR Ticket</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Commuters scan a single QR code on WhatsApp / Namma Yatri that covers both the BMRCL/HMR metro train ride and the last-mile shared EV rickshaw.
            </p>
            <div className="pt-2 text-xs font-mono text-amber-400">
              Zero Infrastructure Capex | +45% Feeder Utilization
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
