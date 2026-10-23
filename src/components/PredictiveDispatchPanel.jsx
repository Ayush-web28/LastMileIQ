import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Zap, 
  Train, 
  Clock, 
  Car, 
  MapPin, 
  ArrowRight
} from 'lucide-react';

export default function PredictiveDispatchPanel() {
  const {
    currentStation,
    computedStations,
    setSelectedStationId,
    executeAutoDispatch,
  } = useSimulation();

  if (!currentStation) return null;

  const {
    name,
    code,
    forecast,
    highDeficitGate,
    lmsi,
    rebalancingPlan,
    trainCountdown,
  } = currentStation;

  return (
    <div className="space-y-3">
      {/* Station Selector Chip Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-mono text-slate-500 uppercase font-bold shrink-0 mr-1">
          Select Station:
        </span>
        {computedStations.map((stn) => {
          const isSelected = currentStation.id === stn.id;
          return (
            <button
              key={stn.id}
              onClick={() => setSelectedStationId(stn.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition whitespace-nowrap ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {stn.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Streamlined Predictive Dispatch Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl space-y-4">
        
        {/* Header: Station & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{name}</span>
              <span className="text-xs font-mono text-slate-500">({code})</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Target exit:{' '}
              <strong className="text-emerald-400">{highDeficitGate.gateName}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
              style={{
                backgroundColor: `${lmsi.color}20`,
                color: lmsi.color,
                border: `1px solid ${lmsi.color}40`,
              }}
            >
              LMSI {lmsi.score} • {lmsi.badge}
            </span>
          </div>
        </div>

        {/* 3 Vital Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400">NEXT ARRIVAL</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white mt-0.5">
              {trainCountdown.formatted}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {forecast.baseTrainEgress} alighting
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400">VEHICLE DEFICIT</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-rose-400 mt-0.5">
              {highDeficitGate.deficit} Units
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {forecast.totalSupply} available
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400">PROJECTED WAIT</div>
            <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-0.5">
              {highDeficitGate.waitTimeMinutes} min
            </div>
            <div className="text-[10px] text-emerald-400 mt-0.5">
              Target: &lt;5 mins
            </div>
          </div>
        </div>

        {/* One-Click Action Dispatch Strip */}
        {rebalancingPlan && (
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-300">
              <span className="text-emerald-400 font-bold font-mono mr-1">ACTION:</span>
              Rebalance <strong className="text-white">{rebalancingPlan.dispatchCount} EV rickshaws</strong> from{' '}
              <strong className="text-cyan-400">{rebalancingPlan.sourceStand}</strong> to{' '}
              <strong className="text-white">{highDeficitGate.gateName}</strong>. Wait time drops to{' '}
              <strong className="text-emerald-400">{rebalancingPlan.projectedWaitTimeDrop.to} mins</strong>.
            </div>

            <button
              onClick={() => executeAutoDispatch(currentStation.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition active:scale-95 shrink-0 shadow-md shadow-emerald-500/20"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Execute Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
