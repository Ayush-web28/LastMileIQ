import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function DriverDispatchQueue() {
  const { theme, dispatchEvents, pingConcourseGate } = useSimulation();
  const [filterType, setFilterType] = useState('ALL');
  const [pingedDriverId, setPingedDriverId] = useState(null);

  const filteredEvents = dispatchEvents.filter((item) => {
    const vType = (item.vehicleType || item.type || '').toUpperCase();
    if (filterType === 'ALL') return true;
    if (filterType === 'EV') return vType.includes('EV') || vType.includes('ELECTRIC') || vType.includes('RICKSHAW');
    if (filterType === 'BUS') return vType.includes('BUS') || vType.includes('SHUTTLE');
    return true;
  });

  const handlePingDriver = (id) => {
    setPingedDriverId(id);
    if (pingConcourseGate) {
      pingConcourseGate(id);
    }
    setTimeout(() => {
      setPingedDriverId(null);
    }, 2200);
  };

  return (
    <div className={`p-4 sm:p-5 rounded-md border space-y-3.5 transition ${
      theme === 'dark'
        ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]'
        : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
    }`}>
      {/* Header & Category Filters */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${
        theme === 'dark' ? 'border-[#2A2F3D]' : 'border-[#CED2DA]'
      }`}>
        <div>
          <h3 className={`text-sm sm:base font-bold flex items-center gap-2 ${
            theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'
          }`}>
            <span>Active Driver Dispatch Queue (Mumbai Feeders)</span>
          </h3>
          <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
            Live telemetry of rerouted EV autos, syndicates, and station gate assignments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex items-center p-0.5 rounded-md border text-xs ${
          theme === 'dark' ? 'bg-[#0E1015] border-[#2A2F3D]' : 'bg-[#DFE2E7] border-[#CED2DA]'
        }`}>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'ALL'
                ? 'bg-[#DC2626] text-white'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            All ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'EV'
                ? 'bg-[#DC2626] text-white'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'BUS'
                ? 'bg-[#DC2626] text-white'
                : theme === 'dark' ? 'text-[#949AA8] hover:text-[#F4F5F7]' : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Feeder Buses
          </button>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredEvents.slice(0, 6).map((driver) => {
          const isPinged = pingedDriverId === driver.id;
          const battery = driver.batteryPct || driver.battery || 82;
          const batteryColor =
            battery >= 75 ? 'text-[#10B981]' : battery >= 40 ? 'text-[#F59E0B]' : 'text-[#DC2626]';
          const driverName = driver.driverName || driver.driver || 'Mumbai Driver';
          const vehicleType = driver.vehicleType || driver.type || 'EV Feeder Auto';
          const fare = driver.surgeFare || driver.fareEstimate || '₹30 flat ONDC';

          return (
            <div
              key={driver.id}
              className={`p-3.5 rounded-md border transition flex flex-col justify-between space-y-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0E1015] border-[#2A2F3D]'
                  : 'bg-[#EBECEF] border-[#CED2DA]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                  theme === 'dark' ? 'bg-[#151820] border-[#2A2F3D] text-[#F4F5F7]' : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015]'
                }`}>
                  {driver.plate}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className={`font-bold ${batteryColor}`}>{battery}% BATT</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-[#F4F5F7]' : 'text-[#0E1015]'}>{driverName}</span>
                  <span className="text-[11px] font-mono text-[#DC2626] font-bold">{fare}</span>
                </div>
                <div className={`text-[11px] ${theme === 'dark' ? 'text-[#949AA8]' : 'text-[#475060]'}`}>
                  {vehicleType}
                </div>
              </div>

              <div className={`text-[11px] font-mono flex items-center justify-between pt-2 border-t gap-2 ${
                theme === 'dark' ? 'border-[#2A2F3D] text-[#949AA8]' : 'border-[#CED2DA] text-[#475060]'
              }`}>
                <span className="truncate" title={driver.stationName}>{driver.stationName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                  driver.status === 'Dispatched'
                    ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                    : driver.status === 'En Route'
                      ? theme === 'dark' ? 'bg-[#2563EB]/15 text-[#60A5FA] border-[#2563EB]/30' : 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30'
                      : 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30'
                }`}>
                  {driver.status || 'Dispatched'}
                </span>
              </div>

              <button
                onClick={() => handlePingDriver(driver.id)}
                title="Broadcasts telematics dispatch ping to driver terminal and concourse gate beacon"
                className={`w-full py-1.5 rounded-md border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 ${
                  isPinged
                    ? 'bg-[#DC2626] text-white border-[#DC2626]'
                    : theme === 'dark'
                      ? 'bg-[#1D212C] border-[#2A2F3D] text-[#F4F5F7] hover:bg-[#2A2F3D]'
                      : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015] hover:bg-[#DFE2E7]'
                }`}
              >
                {isPinged ? 'Telemetry Ping Acked' : 'Ping Concourse Gate'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
