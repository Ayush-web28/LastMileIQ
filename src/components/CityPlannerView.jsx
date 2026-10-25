import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function CityPlannerView() {
  const { computedStations } = useSimulation();
  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className="p-5 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] space-y-4 transition">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#CED2DA]">
        <div>
          <div className="text-xs font-mono text-[#2563EB] font-bold uppercase">
            MUMBAI MUNICIPAL TRANSIT PLANNING (MMRDA & BMC)
          </div>
          <h3 className="text-base sm:text-lg font-bold mt-0.5 text-[#0E1015]">
            First/Last-Mile Transit Equity & Station Bottlenecks
          </h3>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex p-0.5 rounded-md border border-[#CED2DA] bg-[#DFE2E7] text-xs font-semibold self-start sm:self-center">
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded transition cursor-pointer ${
              activeTab === 'equity'
                ? 'bg-[#0E1015] text-[#F4F5F7] font-bold'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1 rounded transition cursor-pointer ${
              activeTab === 'bottlenecks'
                ? 'bg-[#0E1015] text-[#F4F5F7] font-bold'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Chokepoints
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1 rounded transition cursor-pointer ${
              activeTab === 'policy'
                ? 'bg-[#0E1015] text-[#F4F5F7] font-bold'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            BEST Feeder ROI
          </button>
        </div>
      </div>

      {/* Quick KPIs Strip */}
      <div className="rounded-md border border-[#CED2DA] divide-y sm:divide-y-0 sm:divide-x divide-[#CED2DA] bg-[#EBECEF] flex flex-col sm:flex-row">
        <div className="p-3.5 flex-1">
          <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
            EQUITY ACCESS SCORE
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono mt-0.5 text-[#0E1015]">
            86.4<span className="text-xs font-normal text-[#6B7280]">/100</span>
          </div>
          <div className="text-[10px] text-[#475060] font-mono mt-0.5">High Suburban Access</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
            10-MIN FEEDER ISOCHRONE
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono mt-0.5 text-[#0E1015]">
            93.8%
          </div>
          <div className="text-[10px] text-[#475060] font-mono mt-0.5">Station Area Coverage</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
            CLEAN ELECTRIC FEEDER SHARE
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono mt-0.5 text-[#0E1015]">
            68%
          </div>
          <div className="text-[10px] text-[#475060] font-mono mt-0.5">
            EV Auto + BEST Electric
          </div>
        </div>
      </div>

      {/* Tab 1: Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className="p-4 rounded-md border border-[#CED2DA] bg-[#EBECEF] space-y-3">
          <div className="text-xs font-mono uppercase font-bold text-[#6B7280]">
            Mumbai Station Catchment Modal Split
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#475060]">
                  Shared Auto Rickshaws (EV / Retrofit)
                </span>
                <strong className="text-[#0E1015] font-bold">46%</strong>
              </div>
              <div className="w-full rounded h-2 bg-[#CED2DA]">
                <div className="bg-[#0E1015] h-full rounded" style={{ width: '46%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#475060]">
                  BEST Metro Feeder Electric Minibuses
                </span>
                <strong className="text-[#DC2626] font-bold">26%</strong>
              </div>
              <div className="w-full rounded h-2 bg-[#CED2DA]">
                <div className="bg-[#DC2626] h-full rounded" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[#475060]">
                  Walking / Skywalks (Under 600m)
                </span>
                <strong className="text-[#059669] font-bold">18%</strong>
              </div>
              <div className="w-full rounded h-2 bg-[#CED2DA]">
                <div className="bg-[#059669] h-full rounded" style={{ width: '18%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Chokepoints */}
      {activeTab === 'bottlenecks' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bottleneckStations.map((stn, index) => (
            <div key={stn.id} className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold flex items-center gap-1.5 text-[#0E1015]">
                  <span className="w-5 h-5 rounded border border-[#CED2DA] bg-[#F4F5F7] text-[#DC2626] flex items-center justify-center font-mono text-[10px] font-bold">
                    #{index + 1}
                  </span>
                  <span>{stn.name.split(' (')[0]}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: stn.lmsi.color, backgroundColor: `${stn.lmsi.color}15` }}>
                  LMSI {stn.lmsi.score}
                </span>
              </div>
              <div className="text-xs font-mono flex justify-between text-[#475060]">
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
          <div className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] space-y-1.5">
            <div className="text-xs font-mono text-[#2563EB] font-bold">
              Dedicated Auto & Feeder Bays
            </div>
            <p className="text-xs text-[#475060]">
              Clear curb segregation at Andheri West, Dadar, and Ghatkopar cuts passenger boarding friction by 32%.
            </p>
          </div>
          <div className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] space-y-1.5">
            <div className="text-xs font-mono text-[#D97706] font-bold">
              Integrated BEST + Metro QR Fare
            </div>
            <p className="text-xs text-[#475060]">
              Unified Chalo / Namma Yatri ticketing allows commuters to book both metro ride and shared EV seat in 1 tap.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
