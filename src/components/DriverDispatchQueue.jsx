import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  BatteryCharging, 
  MapPin, 
  Radio,
  Send,
  CheckCircle2
} from 'lucide-react';

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
    <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl shadow-xl space-y-3.5 transition ${
      theme === 'dark'
        ? 'bg-[#11231B]/95 border-[#1E3A2C] text-[#F2F7F4] shadow-2xl shadow-black/40'
        : 'bg-white border-[#D1E0D6] text-[#132A1C] shadow-md'
    }`}>
      {/* Header & Category Filters */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b ${
        theme === 'dark' ? 'border-[#1E3A2C]' : 'border-[#D1E0D6]'
      }`}>
        <div>
          <h3 className={`text-sm sm:base font-black flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-[#132A1C]'
          }`}>
            <Radio className="w-4 h-4 text-[#3DB87E] animate-pulse" />
            <span>Active Driver Dispatch Queue (Mumbai Feeders)</span>
          </h3>
          <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
            Live telemetry of rerouted EV autos, syndicates, and station gate assignments
          </p>
        </div>

        {/* Filter Tabs */}
        <div className={`flex items-center p-1 rounded-xl border text-xs ${
          theme === 'dark' ? 'bg-[#0B1612] border-[#1E3A2C]' : 'bg-[#EBF2EE] border-[#D1E0D6]'
        }`}>
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'ALL'
                ? 'bg-[#3DB87E] text-white shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            All ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'EV'
                ? 'bg-[#C4829E] text-white shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterType === 'BUS'
                ? 'bg-[#2D6A4F] text-white shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-black'
            }`}
          >
            Feeder Buses
          </button>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredEvents.slice(0, 6).map((driver) => {
          const isPinged = pingedDriverId === driver.id;
          const battery = driver.batteryPct || driver.battery || 82;
          const batteryColor =
            battery >= 75 ? 'text-[#3DB87E]' : battery >= 40 ? 'text-[#C4829E]' : 'text-rose-500';
          const driverName = driver.driverName || driver.driver || 'Mumbai Driver';
          const vehicleType = driver.vehicleType || driver.type || 'EV Feeder Auto';
          const fare = driver.surgeFare || driver.fareEstimate || '₹30 flat ONDC';

          return (
            <div
              key={driver.id}
              className={`p-3.5 rounded-xl border transition flex flex-col justify-between space-y-2.5 ${
                theme === 'dark'
                  ? 'bg-[#0B1612]/85 border-[#1E3A2C] hover:border-[#3DB87E]/50'
                  : 'bg-slate-50 border-[#D1E0D6] hover:border-slate-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded font-mono text-xs font-bold border ${
                  theme === 'dark' ? 'bg-[#11231B] border-[#1E3A2C] text-[#3DB87E]' : 'bg-white border-[#D1E0D6] text-slate-900'
                }`}>
                  {driver.plate}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <BatteryCharging className={`w-3.5 h-3.5 ${batteryColor}`} />
                  <span className={`font-black ${batteryColor}`}>{battery}%</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold flex items-center justify-between">
                  <span className={theme === 'dark' ? 'text-white' : 'text-[#132A1C]'}>{driverName}</span>
                  <span className="text-[11px] font-mono text-[#C4829E] font-bold">{fare}</span>
                </div>
                <div className={`text-[11px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {vehicleType}
                </div>
              </div>

              <div className={`text-[11px] font-mono flex items-center justify-between pt-2 border-t gap-2 ${
                theme === 'dark' ? 'border-[#1E3A2C] text-slate-300' : 'border-[#D1E0D6] text-slate-600'
              }`}>
                <span className="truncate" title={driver.stationName}>{driver.stationName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 border ${
                  driver.status === 'Dispatched'
                    ? 'bg-[#3DB87E]/15 text-[#3DB87E] border-[#3DB87E]/30'
                    : driver.status === 'En Route'
                      ? 'bg-[#C4829E]/15 text-[#C4829E] border-[#C4829E]/30'
                      : 'bg-[#3DB87E]/15 text-[#3DB87E] border-[#3DB87E]/30'
                }`}>
                  {driver.status || 'Dispatched'}
                </span>
              </div>

              <button
                onClick={() => handlePingDriver(driver.id)}
                title="Broadcasts telematics dispatch ping to driver terminal and concourse gate beacon"
                className={`w-full py-1.5 rounded-lg border text-xs font-mono font-semibold transition flex items-center justify-center gap-1.5 ${
                  isPinged
                    ? 'bg-[#C4829E] text-white border-[#C4829E] font-bold shadow-md shadow-[#C4829E]/30'
                    : theme === 'dark'
                      ? 'bg-[#183327] border-[#1E3A2C] text-[#3DB87E] hover:text-white hover:bg-[#1E3A2C]'
                      : 'bg-white border-[#D1E0D6] text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isPinged ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Telemetry Ping Acked</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3 text-[#3DB87E]" />
                    <span>Ping Concourse Gate</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}