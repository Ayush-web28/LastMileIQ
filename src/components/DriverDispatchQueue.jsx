import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Car, 
  BatteryCharging, 
  Navigation, 
  Clock, 
  MapPin, 
  Radio, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall,
  RotateCw,
  Zap,
  TrendingUp
} from 'lucide-react';

export default function DriverDispatchQueue() {
  const { dispatchEvents, executeAutoDispatch, currentStation } = useSimulation();
  const [filterType, setFilterType] = useState('ALL');
  const [pingedDriverId, setPingedDriverId] = useState(null);

  const filteredEvents = dispatchEvents.filter((item) => {
    if (filterType === 'ALL') return true;
    if (filterType === 'EV') return item.type.includes('EV') || item.type.includes('Piaggio') || item.type.includes('Mahindra');
    if (filterType === 'BUS') return item.type.includes('Bus') || item.type.includes('Minibus');
    return true;
  });

  const handlePingDriver = (id) => {
    setPingedDriverId(id);
    setTimeout(() => {
      setPingedDriverId(null);
    }, 2000);
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>REAL-TIME B2B TELEMETRY FEED</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Active Driver Dispatch Queue
          </h3>
          <p className="text-xs text-slate-400">
            Live simulated feeder units repositioned across metro concourses and corporate campuses.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'ALL'
                ? 'bg-slate-800 text-cyan-400 font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            All Fleets ({dispatchEvents.length})
          </button>
          <button
            onClick={() => setFilterType('EV')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'EV'
                ? 'bg-slate-800 text-emerald-400 font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            EV Rickshaws
          </button>
          <button
            onClick={() => setFilterType('BUS')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              filterType === 'BUS'
                ? 'bg-slate-800 text-amber-400 font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Minibuses
          </button>
        </div>
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredEvents.map((driver) => {
          const isPinged = pingedDriverId === driver.id;
          const batteryColor =
            driver.battery >= 75 ? 'text-emerald-400' : driver.battery >= 40 ? 'text-amber-400' : 'text-rose-400';

          return (
            <div
              key={driver.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition flex flex-col justify-between space-y-3"
            >
              {/* Top: License Plate & Battery */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono text-xs font-bold text-white tracking-wider">
                    {driver.plate}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                    {driver.status}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono">
                  <BatteryCharging className={`w-3.5 h-3.5 ${batteryColor}`} />
                  <span className={`font-bold ${batteryColor}`}>{driver.battery}%</span>
                </div>
              </div>

              {/* Mid: Driver Name & Vehicle Type */}
              <div>
                <div className="text-sm font-bold text-white flex items-center justify-between">
                  <span>{driver.driver}</span>
                  <span className="text-xs font-mono text-emerald-400">{driver.fareEstimate}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{driver.type}</div>
              </div>

              {/* Destination Gate & ETA */}
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/60 text-xs font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {driver.stationName} • {driver.targetGate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Repositioning ETA:</span>
                  <span className="text-amber-400 font-bold">{Math.round(driver.etaSec / 60)}m {driver.etaSec % 60}s</span>
                </div>
              </div>

              {/* Bottom: Quick Actions */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] font-mono text-slate-500">{driver.timestamp}</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePingDriver(driver.id)}
                    className={`px-2.5 py-1 rounded text-[10px] font-mono font-medium transition flex items-center gap-1 ${
                      isPinged
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
                    }`}
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>{isPinged ? 'Ping Sent!' : 'Ping Driver'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span>Active In-Fleet: <strong className="text-white">{dispatchEvents.length} Units</strong></span>
          <span>Avg Battery: <strong className="text-emerald-400">82.4%</strong></span>
          <span>ON-TIME SLA: <strong className="text-cyan-400">98.2%</strong></span>
        </div>
        <div className="text-[11px] text-slate-500">
          Auto-dispatches execute via ONDC Transport Protocol
        </div>
      </div>
    </div>
  );
}
