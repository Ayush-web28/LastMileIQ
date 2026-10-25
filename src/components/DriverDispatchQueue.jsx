import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function DriverDispatchQueue() {
  const { dispatchEvents, pingConcourseGate } = useSimulation();
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
    <div className="p-4 sm:p-5 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] space-y-3.5 transition">
      {/* Header & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#CED2DA]">
        <div>
          <h3 className="text-sm sm:text-base font-bold flex items-center gap-2 text-[#0E1015]">
            <span>Active Driver Dispatch Queue (Mumbai Feeders)</span>
          </h3>
          <p className="text-xs mt-0.5 text-[#475060]">
            Live telemetry of rerouted EV autos, syndicates, and station gate assignments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-0.5 rounded-md border border-[#CED2DA] bg-[#DFE2E7] text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-[#0E1015] text-[#F4F5F7]'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            All ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
              filterType === 'EV'
                ? 'bg-[#059669] text-white'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
              filterType === 'BUS'
                ? 'bg-[#2563EB] text-white'
                : 'text-[#475060] hover:text-[#0E1015]'
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
            battery >= 75 ? 'text-[#059669]' : battery >= 40 ? 'text-[#D97706]' : 'text-[#DC2626]';
          const driverName = driver.driverName || driver.driver || 'Mumbai Driver';
          const vehicleType = driver.vehicleType || driver.type || 'EV Feeder Auto';
          const fare = driver.surgeFare || driver.fareEstimate || '₹30 flat ONDC';

          return (
            <div
              key={driver.id}
              className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] transition flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded font-mono text-xs font-bold border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015]">
                  {driver.plate}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className={`font-bold ${batteryColor}`}>{battery}% BATT</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold flex items-center justify-between">
                  <span className="text-[#0E1015]">{driverName}</span>
                  <span className="text-[11px] font-mono text-[#475060] font-bold">{fare}</span>
                </div>
                <div className="text-[11px] text-[#475060]">
                  {vehicleType}
                </div>
              </div>

              <div className="text-[11px] font-mono flex items-center justify-between pt-2 border-t border-[#CED2DA] text-[#475060] gap-2">
                <span className="truncate" title={driver.stationName}>{driver.stationName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                  driver.status === 'Dispatched'
                    ? 'bg-[#059669]/10 text-[#059669] border-[#059669]/30'
                    : driver.status === 'En Route'
                      ? 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30'
                      : 'bg-[#059669]/10 text-[#059669] border-[#059669]/30'
                }`}>
                  {driver.status || 'Dispatched'}
                </span>
              </div>

              <button
                onClick={() => handlePingDriver(driver.id)}
                title="Broadcasts telematics dispatch ping to driver terminal and concourse gate beacon"
                className={`w-full py-1.5 rounded-md border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  isPinged
                    ? 'bg-[#059669] text-white border-[#059669]'
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
