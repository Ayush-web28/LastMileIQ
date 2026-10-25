import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function CityPlannerView() {
  const { theme, computedStations } = useSimulation();
  const [activeTab, setActiveTab] = useState('equity'); // 'equity' | 'bottlenecks' | 'policy'

  const bottleneckStations = [...computedStations]
    .sort((a, b) => b.lmsi.score - a.lmsi.score)
    .slice(0, 4);

  return (
    <div className={`p-5 rounded-lg border space-y-4 transition ${
      theme === 'dark'
        ? 'bg-[#11231B] border-[#1E3A2C] text-[#F3F7F4]'
        : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#0B1612]'
    }`}>
      
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
        theme === 'dark' ? 'border-[#1E3A2C]' : 'border-[#D1DDD6]'
      }`}>
        <div>
          <div className="text-xs font-mono text-[#3DB87E] font-bold uppercase">
            MUMBAI MUNICIPAL TRANSIT PLANNING (MMRDA & BMC)
          </div>
          <h3 className={`text-base sm:text-lg font-bold mt-0.5 ${theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'}`}>
            First/Last-Mile Transit Equity & Station Bottlenecks
          </h3>
        </div>

        {/* Sub-tab Navigation */}
        <div className={`flex p-0.5 rounded-md border text-xs font-semibold self-start sm:self-center ${
          theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
        }`}>
          <button
            onClick={() => setActiveTab('equity')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'equity'
                ? 'bg-[#3DB87E] text-[#0B1612] font-bold'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            Transit Equity
          </button>
          <button
            onClick={() => setActiveTab('bottlenecks')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'bottlenecks'
                ? 'bg-[#3DB87E] text-[#0B1612] font-bold'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            Chokepoints
          </button>
          <button
            onClick={() => setActiveTab('policy')}
            className={`px-3 py-1 rounded transition ${
              activeTab === 'policy'
                ? 'bg-[#3DB87E] text-[#0B1612] font-bold'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            BEST Feeder ROI
          </button>
        </div>
      </div>

      {/* Quick KPIs Strip (Divided bar instead of 3 feature cards in a row) */}
      <div className={`rounded-md border flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x ${
        theme === 'dark' ? 'border-[#1E3A2C] divide-[#1E3A2C] bg-[#0B1612]' : 'border-[#D1DDD6] divide-[#D1DDD6] bg-[#E5EDE8]'
      }`}>
        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'
          }`}>
            EQUITY ACCESS SCORE
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#3DB87E] font-mono mt-0.5">
            86.4<span className={`text-xs font-normal ${theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'}`}>/100</span>
          </div>
          <div className="text-[10px] text-[#3DB87E] font-bold mt-0.5">High Suburban Access</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'
          }`}>
            10-MIN FEEDER ISOCHRONE
          </div>
          <div className={`text-xl sm:text-2xl font-bold font-mono mt-0.5 ${
            theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'
          }`}>
            93.8%
          </div>
          <div className="text-[10px] text-[#C4829E] font-bold mt-0.5">Station Area Coverage</div>
        </div>

        <div className="p-3.5 flex-1">
          <div className={`text-[10px] font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'
          }`}>
            CLEAN ELECTRIC FEEDER SHARE
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#3DB87E] font-mono mt-0.5">
            68%
          </div>
          <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
            EV Auto + BEST Electric
          </div>
        </div>
      </div>

      {/* Tab 1: Equity & Modal Split */}
      {activeTab === 'equity' && (
        <div className={`p-4 rounded-md border space-y-3 ${
          theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
        }`}>
          <div className={`text-xs font-mono uppercase font-bold ${
            theme === 'dark' ? 'text-[#6E8277]' : 'text-[#6E8277]'
          }`}>
            Mumbai Station Catchment Modal Split
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>
                  Shared Auto Rickshaws (EV / Retrofit)
                </span>
                <strong className="text-[#3DB87E] font-bold">46%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#183327]' : 'bg-[#D1DDD6]'}`}>
                <div className="bg-[#3DB87E] h-full rounded" style={{ width: '46%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>
                  BEST Metro Feeder Electric Minibuses
                </span>
                <strong className="text-[#C4829E] font-bold">26%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#183327]' : 'bg-[#D1DDD6]'}`}>
                <div className="bg-[#C4829E] h-full rounded" style={{ width: '26%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className={theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#2D483A]'}>
                  Walking / Skywalks (Under 600m)
                </span>
                <strong className="text-[#3DB87E] font-bold">18%</strong>
              </div>
              <div className={`w-full rounded h-2 ${theme === 'dark' ? 'bg-[#183327]' : 'bg-[#D1DDD6]'}`}>
                <div className="bg-[#183327] h-full rounded" style={{ width: '18%' }} />
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
              theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
            }`}>
              <div className="flex items-center justify-between">
                <div className={`text-xs font-bold flex items-center gap-1.5 ${
                  theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'
                }`}>
                  <span className={`w-5 h-5 rounded border flex items-center justify-center font-mono text-[10px] font-bold ${
                    theme === 'dark' ? 'bg-[#183327] border-[#1E3A2C] text-[#3DB87E]' : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#0B1612]'
                  }`}>
                    #{index + 1}
                  </span>
                  <span>{stn.name.split(' (')[0]}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold" style={{ color: stn.lmsi.color, backgroundColor: `${stn.lmsi.color}15` }}>
                  LMSI {stn.lmsi.score}
                </span>
              </div>
              <div className={`text-xs font-mono flex justify-between ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
                <span>Egress: {stn.forecast.baseTrainEgress} pax</span>
                <span>Wait: {stn.highDeficitGate.waitTimeMinutes}m</span>
                <span className="text-[#F43F5E] font-bold">Deficit: {stn.forecast.totalDeficit}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Policy ROI */}
      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`p-3.5 rounded-md border space-y-1.5 ${
            theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
          }`}>
            <div className="text-xs font-mono text-[#3DB87E] font-bold">
              Dedicated Auto & Feeder Bays
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
              Clear curb segregation at Andheri West, Dadar, and Ghatkopar cuts passenger boarding friction by 32%.
            </p>
          </div>
          <div className={`p-3.5 rounded-md border space-y-1.5 ${
            theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
          }`}>
            <div className="text-xs font-mono text-[#C4829E] font-bold">
              Integrated BEST + Metro QR Fare
            </div>
            <p className={`text-xs ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
              Unified Chalo / Namma Yatri ticketing allows commuters to book both metro ride and shared EV seat in 1 tap.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
