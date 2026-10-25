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

  const renderStatusBadge = (status) => {
    if (status === 'En Route') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border bg-[#D97706]/15 text-[#D97706] border-[#D97706]/30">
          En Route
        </span>
      );
    }
    if (status === 'Arrived') {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border bg-[#059669]/10 text-[#059669] border-[#059669]/30">
          Arrived
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/30">
        Dispatched
      </span>
    );
  };

  const getBatteryColor = (battery) => {
    return battery >= 75 ? 'text-[#059669]' : battery >= 40 ? 'text-[#D97706]' : 'text-[#DC2626]';
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

        {/* Filter Tabs (All 3 Black when active) */}
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
                ? 'bg-[#0E1015] text-[#F4F5F7]'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1 rounded font-bold transition cursor-pointer ${
              filterType === 'BUS'
                ? 'bg-[#0E1015] text-[#F4F5F7]'
                : 'text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Feeder Buses
          </button>
        </div>
      </div>

      {/* Lazy Column View: Scrollable only through dispatches without scrolling the entire screen */}
      <div className="max-h-[380px] overflow-y-auto space-y-2.5 pr-1.5 scrollbar-thin">
        {filteredEvents.length === 0 ? (
          <div className="p-6 text-center text-xs font-mono text-[#6B7280] border border-dashed border-[#CED2DA] rounded-md bg-[#EBECEF]">
            No active feeder vehicles matching selected filter.
          </div>
        ) : (
          filteredEvents.map((driver) => {
            const isPinged = pingedDriverId === driver.id;
            const battery = driver.batteryPct || driver.battery || 82;
            const batteryColor = getBatteryColor(battery);
            const driverName = driver.driverName || driver.driver || 'Mumbai Driver';
            const vehicleType = driver.vehicleType || driver.type || 'EV Feeder Auto';
            const fare = driver.surgeFare || driver.fareEstimate || '₹30 flat ONDC';

            return (
              <div
                key={driver.id}
                className="p-3 rounded-md border border-[#CED2DA] bg-[#EBECEF] transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#475060]"
              >
                {/* Vehicle & Driver Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-bold border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] shrink-0">
                    {driver.plate}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-[#0E1015] flex items-center gap-2">
                      <span className="truncate">{driverName}</span>
                      <span className="text-[11px] font-mono text-[#475060] font-normal shrink-0">{fare}</span>
                    </div>
                    <div className="text-[11px] text-[#475060] truncate mt-0.5">
                      <span>{vehicleType}</span>
                      <span className="mx-1 text-[#CED2DA]">•</span>
                      <span className="font-mono text-[#6B7280]">{driver.stationName}</span>
                    </div>
                  </div>
                </div>

                {/* Telemetry, Status & Ping Button */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#CED2DA]">
                  <span className={`text-xs font-mono font-bold ${batteryColor}`}>
                    {battery}% BATT
                  </span>
                  {renderStatusBadge(driver.status)}
                  <button
                    onClick={() => handlePingDriver(driver.id)}
                    title="Broadcasts telematics dispatch ping to driver terminal"
                    className={`px-3 py-1.5 rounded-md border text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                      isPinged
                        ? 'bg-[#059669] text-white border-[#059669]'
                        : 'bg-[#F4F5F7] border-[#CED2DA] text-[#0E1015] hover:bg-[#DFE2E7]'
                    }`}
                  >
                    {isPinged ? 'Pinged' : 'Ping Gate'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#475060] font-mono border-t border-[#CED2DA]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#059669]" />
          <span>Active scroll queue • <strong>{filteredEvents.length}</strong> vehicles</span>
        </div>
        <span className="text-[11px] text-[#6B7280]">Scroll to browse dispatches</span>
      </div>

    </div>
  );
}
