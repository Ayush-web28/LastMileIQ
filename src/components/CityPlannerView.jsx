import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Building2, 
  CheckCircle2, 
  Lightbulb
} from 'lucide-react';

export default function CityPlannerView() {
  const { computedStations } = useSimulation();
  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-bold uppercase">
            <Building2 className="w-4 h-4" />
            <span>MUMBAI MUNICIPAL TRANSIT PLANNING (MMRDA & BMC)</span>
          </div>
          <h3 className="text-lg font-bold text-white">
            First/Last-Mile Transit Equity & Station Bottlenecks
          </h3>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium self-start sm:self-center">
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'equity' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'bottlenecks' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Chokepoints
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'policy' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            BEST Feeder ROI
          </button>
        </div>
      </div>

      {/* 3 Quick KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400">EQUITY SCORE</div>
          <div className="text-xl sm:text-2xl font-black text-cyan-400 font-mono mt-0.5">
            86.4<span className="text-xs font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">High Suburban Access</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400">10-MIN ISOCHRONE</div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-0.5">
            93.8%
          </div>
          <div className="text-[10px] text-cyan-400 mt-0.5">Station Coverage</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="text-[10px] font-mono text-slate-400">CLEAN EV SHARE</div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-0.5">
            68%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">EV Auto + BEST Electric</div>
        </div>
      </div>

      {/* Tab 1: Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase font-bold">
            Mumbai Station Catchment Modal Split
          </div>
          
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Shared Auto Rickshaws (EV / Retrofit)</span>
                <strong className="text-emerald-400">46%</strong>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: '46%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">BEST Metro Feeder Electric Minibuses</span>
                <strong className="text-cyan-400">26%</strong>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-300">Walking / Skywalks (Under 600m)</span>
                <strong className="text-amber-400">18%</strong>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chokepoints */}
      {activeTab === 'bottlenecks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bottleneckStations.map((stn, index) => (
            <div key={stn.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded bg-slate-900 border border-slate-700 flex items-center justify-center font-mono text-[10px]">
                    #{index + 1}
                  </span>
                  <span>{stn.name.split(' (')[0]}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: stn.lmsi.color, backgroundColor: `${stn.lmsi.color}20` }}>
                  LMSI {stn.lmsi.score}
                </span>
              </div>
              <div className="text-xs text-slate-400 font-mono flex justify-between">
                <span>Egress: {stn.forecast.baseTrainEgress} pax</span>
                <span>Wait: {stn.highDeficitGate.waitTimeMinutes}m</span>
                <span className="text-rose-400">Deficit: {stn.forecast.totalDeficit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Policy ROI */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Dedicated Auto & Feeder Bays</span>
            </div>
            <p className="text-xs text-slate-300">
              Clear curb segregation at Andheri West, Dadar, and Ghatkopar cuts passenger boarding friction by 32%.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Integrated BEST + Metro QR Fare</span>
            </div>
            <p className="text-xs text-slate-300">
              Unified Chalo / Namma Yatri ticketing allows commuters to book both metro ride and shared EV seat in 1 tap.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
