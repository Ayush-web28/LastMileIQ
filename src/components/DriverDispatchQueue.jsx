import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  BatteryCharging, 
  MapPin, 
  PhoneCall,
  Radio
} from 'lucide-react';

export default function DriverDispatchQueue() {
  const { dispatchEvents } = useSimulation();
  const [filterType, setFilterType] = useState('ALL');
  const [pingedDriverId, setPingedDriverId] = useState(null);

  const filteredEvents = dispatchEvents.filter((item) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'EV') return item.type.includes('EV') || item.type.includes('Piaggio') || item.type.includes('Mahindra');
    if (filterType === 'BUS') return item.type.includes('Bus') || item.type.includes('BEST');
    return true;
  });

  const handlePingDriver = (id) => {
    setPingedDriverId(id);
    setTimeout(() => {
      setPingedDriverId(null);
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Active Driver Dispatches (Mumbai Fleets)</span>
          </h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-lg bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              filterType === 'ALL' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-500'
            }`}
          >
            All ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              filterType === 'EV' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-500'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-2.5 py-1 rounded font-medium transition ${
              filterType === 'BUS' ? 'bg-slate-800 text-amber-400 font-bold' : 'text-slate-500'
            }`}
          >
            BEST Minibuses
          </button>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {filteredEvents.slice(0, 6).map((driver) => {
          const isPinged = pingedDriverId === driver.id;
          const batteryColor =
            driver.battery >= 75 ? 'text-emerald-400' : driver.battery >= 40 ? 'text-amber-400' : 'text-rose-400';

          return (
            <div
              key={driver.id}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white">
                  {driver.plate}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono">
                  <BatteryCharging className={`w-3.5 h-3.5 ${batteryColor}`} />
                  <span className={`font-bold ${batteryColor}`}>{driver.battery}%</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>{driver.driver}</span>
                  <span className="text-[11px] font-mono text-emerald-400">{driver.fareEstimate}</span>
                </div>
                <div className="text-[11px] text-slate-400">{driver.type}</div>
              </div>

              <div className="text-[11px] font-mono text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800/60">
                <span className="truncate">{driver.stationName}</span>
                <button
                  onClick={() => handlePingDriver(driver.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                    isPinged ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {isPinged ? 'Pinged!' : 'Ping'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
