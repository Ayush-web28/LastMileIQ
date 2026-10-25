import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function CityPlannerView() {
  const { theme, computedStations } = useSimulation();
  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className={`p-5 rounded-md border space-y-4 transition ${
      theme === 'dark'
        ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]'
        : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'
      }`}>
        <div>
          <div className="text-xs font-mono text-[#2563EB] font-bold uppercase">
            MUMBAI MUNICIPAL TRANSIT PLANNING (MMRDA & BMC)
          </div>
          <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'}`}>
            First/Last-Mile Transit Equity & Station Bottlenecks
          </h3>
        </div>

        {/* Sub-tab Navigation */}
        <div className={`flex p-0.5 rounded-md border text-xs font-semibold self-start sm:self-center ${
          theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#DFE2E7] border-[#CED2DA]'
        }`}>
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'equity'
                ? 'bg-[#2563EB] text-white font-bold'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'bottlenecks'
                ? 'bg-[#2563EB] text-white font-bold'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Chokepoints
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'policy'
                ? 'bg-[#2563EB] text-white font-bold'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            BEST Feeder ROI
          </button>
        </div>
      </div>

      {/* Quick KPIs Strip */}
      <div className={`rounded-md border flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x ${
        theme === 'dark' ? 'border-[#2A2F3D] divide-[#2A2F3D] bg-[#0E1015]' : 'border-[#CED2DA] divide-[#CED2DA] bg-[#EBECEF]'
      }`}>
        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
          }`}>
            EQUITY ACCESS SCORE
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#2563EB] font-mono mt-0.5">
            86.4<span className={`text-xs font-normal ${theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'}`}>/100</span>
          </div>
          <div className="text-[10px] text-[#2563EB] font-bold mt-0.5">High Suburban Access</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
          }`}>
            10-MIN FEEDER ISOCHRONE
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono mt-0.5 ${
            theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'
          }`}>
            93.8%
          </div>
          <div className="text-[10px] text-[#F59E0B] font-bold mt-0.5">Station Area Coverage</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
          }`}>
            CLEAN ELECTRIC FEEDER SHARE
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#10B981] font-mono mt-0.5">
            68%
          </div>
          <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
            EV Auto + BEST Electric
          </div>
        </div>
      </div>

      {/* Tab 1: Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className={`p-4 rounded-md border space-y-3 ${
          theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#EBECEF] border-[#CED2DA]'
        }`}>
          <div className={`text-xs font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6B7280]' : 'text-[#6B7280]'
          }`}>
            Mumbai Station Catchment Modal Split
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}>
                  Shared Auto Rickshaws (EV / Retrofit)
                </span>
                <strong className="text-[#DC2626] font-bold">46%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#151820]' : 'bg-[#CED2DA]'}`}>
                <div className="bg-[#DC2626] h-full rounded" style={{ width: '46%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}>
                  BEST Metro Feeder Electric Minibuses
                </span>
                <strong className="text-[#2563EB] font-bold">26%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#151820]' : 'bg-[#CED2DA]'}`}>
                <div className="bg-[#2563EB] h-full rounded" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}>
                  Walking / Skywalks (Under 600m)
                </span>
                <strong className="text-[#6B7280] font-bold">18%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#151820]' : 'bg-[#CED2DA]'}`}>
                <div className="bg-[#6B7280] h-full rounded" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chokepoints */}
      {activeTab === 'bottlenecks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bottleneckStations.map((stn, index) => (
            <div key={stn.id} className={`p-3.5 rounded-md border space-y-2 ${
              theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#EBECEF] border-[#CED2DA]'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`text-xs font-bold flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'
                }`}>
                  <span className={`w-5 h-5 rounded border flex items-center justify-center font-mono text-[10px] font-bold ${
                    theme === 'dark' ? 'bg-[#151820] border-[#2A2F3D] text-[#DC2626]' : 'bg-[#F4F5F7] border-[#CED2DA] text-[#DC2626]'
                  }`}>
                    #{index + 1}
                  </span>
                  <span>{stn.name.split(' (')[0]}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: stn.lmsi.color, backgroundColor: `${stn.lmsi.color}15` }}>
                  LMSI {stn.lmsi.score}
                </span>
              </div>
              <div className={`text-xs font-mono flex justify-between ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
                <span>Egress: {stn.forecast.baseTrainEgress} pax</span>
                <span>Wait: {stn.highDeficitGate.waitTimeMinutes}m</span>
                <span className="text-[#DC2626] font-bold">Deficit: {stn.forecast.totalDeficit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Policy ROI */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-md border space-y-1.5 ${
            theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#EBECEF] border-[#CED2DA]'
          }`}>
            <div className="text-xs font-mono text-[#2563EB] font-bold">
              Dedicated Auto & Feeder Bays
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Clear curb segregation at Andheri West, Dadar, and Ghatkopar cuts passenger boarding friction by 32%.
            </p>
          </div>
          <div className={`p-3.5 rounded-md border space-y-1.5 ${
            theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#EBECEF] border-[#CED2DA]'
          }`}>
            <div className="text-xs font-mono text-[#D97706] font-bold">
              Integrated BEST + Metro QR Fare
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
              Unified Chalo / Namma Yatri ticketing allows commuters to book both metro ride and shared EV seat in 1 tap.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
