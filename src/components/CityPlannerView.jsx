import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Building2, 
  CheckCircle2, 
  Lightbulb
} from 'lucide-react';

export default function CityPlannerView() {
  const { theme, computedStations } = useSimulation();
  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-xl shadow-xl space-y-4 transition ${
      theme === 'dark'
        ? 'bg-slate-900/90 border-cyan-500/30 text-slate-100'
        : 'bg-white border-cyan-500/40 text-slate-900 shadow-md'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-500 font-bold uppercase">
            <Building2 className="w-4 h-4" />
            <span>MUMBAI MUNICIPAL TRANSIT PLANNING (MMRDA & BMC)</span>
          </div>
          <h3 className={`text-base sm:text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            First/Last-Mile Transit Equity & Station Bottlenecks
          </h3>
        </div>

        {/* Sub-tab Navigation */}
        <div className={`flex p-1 rounded-xl border text-xs font-semibold self-start sm:self-center ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'equity'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'bottlenecks'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Chokepoints
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'policy'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            BEST Feeder ROI
          </button>
        </div>
      </div>

      {/* 3 Quick KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`p-3 rounded-xl border ${
          theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            EQUITY ACCESS SCORE
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-500 font-mono mt-0.5">
            86.4<span className={`text-xs font-normal ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>/100</span>
          </div>
          <div className="text-[10px] text-emerald-500 font-semibold mt-0.5">High Suburban Access</div>
        </div>

        <div className={`p-3 rounded-xl border ${
          theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            10-MIN FEEDER ISOCHRONE
          </div>
          <div className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            93.8%
          </div>
          <div className="text-[10px] text-cyan-500 font-semibold mt-0.5">Station Area Coverage</div>
        </div>

        <div className={`p-3 rounded-xl border ${
          theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            CLEAN ELECTRIC FEEDER SHARE
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-500 font-mono mt-0.5">
            68%
          </div>
          <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            EV Auto + BEST Electric
          </div>
        </div>
      </div>

      {/* Tab 1: Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className={`p-4 rounded-xl border space-y-3 ${
          theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className={`text-xs font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Mumbai Station Catchment Modal Split
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  Shared Auto Rickshaws (EV / Retrofit)
                </span>
                <strong className="text-emerald-500">46%</strong>
              </div>
              <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '46%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  BEST Metro Feeder Electric Minibuses
                </span>
                <strong className="text-cyan-500">26%</strong>
              </div>
              <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                  Walking / Skywalks (Under 600m)
                </span>
                <strong className="text-amber-500">18%</strong>
              </div>
              <div className={`w-full rounded-full h-2.5 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`}>
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chokepoints */}
      {activeTab === 'bottlenecks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bottleneckStations.map((stn, index) => (
            <div key={stn.id} className={`p-3.5 rounded-xl border space-y-2 ${
              theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`text-xs font-bold flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  <span className={`w-5 h-5 rounded border flex items-center justify-center font-mono text-[10px] font-bold ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                  }`}>
                    #{index + 1}
                  </span>
                  <span>{stn.name.split(' (')[0]}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: stn.lmsi.color, backgroundColor: `${stn.lmsi.color}20` }}>
                  LMSI {stn.lmsi.score}
                </span>
              </div>
              <div className={`text-xs font-mono flex justify-between ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Egress: {stn.forecast.baseTrainEgress} pax</span>
                <span>Wait: {stn.highDeficitGate.waitTimeMinutes}m</span>
                <span className="text-rose-500 font-bold">Deficit: {stn.forecast.totalDeficit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Policy ROI */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-xl border space-y-1.5 ${
            theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-xs font-mono text-emerald-500 font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Dedicated Auto & Feeder Bays</span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Clear curb segregation at Andheri West, Dadar, and Ghatkopar cuts passenger boarding friction by 32%.
            </p>
          </div>
          <div className={`p-3.5 rounded-xl border space-y-1.5 ${
            theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="text-xs font-mono text-cyan-500 font-bold flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Integrated BEST + Metro QR Fare</span>
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
              Unified Chalo / Namma Yatri ticketing allows commuters to book both metro ride and shared EV seat in 1 tap.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}