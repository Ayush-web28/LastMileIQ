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
    <div className={`p-4 sm:p-5 rounded-lg border space-y-3.5 transition ${
      theme === 'dark'
        ? 'bg-[#11231B] border-[#1E3A2C] text-[#F3F7F4]'
        : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#0B1612]'
    }`}>
      {/* Header & Category Filters */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${
        theme === 'dark' ? 'border-[#1E3A2C]' : 'border-[#D1DDD6]'
      }`}>
        <div>
          <h3 className={`text-sm sm:base font-bold flex items-center gap-2 ${
            theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'
          }`}>
            <span>Active Driver Dispatch Queue (Mumbai Feeders)</span>
          </h3>
          <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
            Live telemetry of rerouted EV autos, syndicates, and station gate assignments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex items-center p-0.5 rounded-md border text-xs ${
          theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#E5EDE8] border-[#D1DDD6]'
        }`}>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'ALL'
                ? 'bg-[#3DB87E] text-[#0B1612]'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            All ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'EV'
                ? 'bg-[#3DB87E] text-[#0B1612]'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1 rounded font-bold transition ${
              filterType === 'BUS'
                ? 'bg-[#3DB87E] text-[#0B1612]'
                : theme === 'dark' ? 'text-[#A0B0A6] hover:text-[#F3F7F4]' : 'text-[#6E8277] hover:text-[#0B1612]'
            }`}
          >
            Feeder Buses
          </button>
        </div>
      </div>

      {/* Driver Cards Grid (2 columns to avoid 3 feature cards in a row) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredEvents.slice(0, 6).map((driver) => {
          const isPinged = pingedDriverId === driver.id;
          const battery = driver.batteryPct || driver.battery || 82;
          const batteryColor =
            battery >= 75 ? 'text-[#3DB87E]' : battery >= 40 ? 'text-[#C4829E]' : 'text-[#F43F5E]';
          const driverName = driver.driverName || driver.driver || 'Mumbai Driver';
          const vehicleType = driver.vehicleType || driver.type || 'EV Feeder Auto';
          const fare = driver.surgeFare || driver.fareEstimate || '₹30 flat ONDC';

          return (
            <div
              key={driver.id}
              className={`p-3.5 rounded-md border transition flex flex-col justify-between space-y-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0B1612] border-[#1E3A2C]'
                  : 'bg-[#E5EDE8] border-[#D1DDD6]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                  theme === 'dark' ? 'bg-[#11231B] border-[#1E3A2C] text-[#3DB87E]' : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#0B1612]'
                }`}>
                  {driver.plate}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className={`font-bold ${batteryColor}`}>{battery}% BATT</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-[#F3F7F4]' : 'text-[#0B1612]'}>{driverName}</span>
                  <span className="text-[11px] font-mono text-[#C4829E] font-bold">{fare}</span>
                </div>
                <div className={`text-[11px] ${theme === 'dark' ? 'text-[#A0B0A6]' : 'text-[#6E8277]'}`}>
                  {vehicleType}
                </div>
              </div>

              <div className={`text-[11px] font-mono flex items-center justify-between pt-2 border-t gap-2 ${
                theme === 'dark' ? 'border-[#1E3A2C] text-[#A0B0A6]' : 'border-[#D1DDD6] text-[#6E8277]'
              }`}>
                <span className="truncate" title={driver.stationName}>{driver.stationName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                  driver.status === 'Dispatched'
                    ? 'bg-[#183327] text-[#3DB87E] border-[#3DB87E]/30'
                    : driver.status === 'En Route'
                      ? 'bg-[#843A5D]/20 text-[#C4829E] border-[#C4829E]/30'
                      : 'bg-[#183327] text-[#3DB87E] border-[#3DB87E]/30'
                }`}>
                  {driver.status || 'Dispatched'}
                </span>
              </div>

              <button
                onClick={() => handlePingDriver(driver.id)}
                title="Broadcasts telematics dispatch ping to driver terminal and concourse gate beacon"
                className={`w-full py-1.5 rounded-md border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 ${
                  isPinged
                    ? 'bg-[#C4829E] text-[#0B1612] border-[#C4829E]'
                    : theme === 'dark'
                      ? 'bg-[#183327] border-[#1E3A2C] text-[#3DB87E] hover:bg-[#1E3A2C]'
                      : 'bg-[#F3F7F4] border-[#D1DDD6] text-[#183327] hover:bg-[#D1DDD6]'
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
