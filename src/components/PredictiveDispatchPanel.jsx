import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Zap, 
  Train, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  MapPin, 
  Users, 
  Car, 
  BatteryCharging,
  Compass,
  CornerDownRight
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
    stands,
  } = currentStation;

  return (
    <div className="space-y-4">
      {/* Station Selector Bar */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Station Focus:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {computedStations.map((stn) => {
            const isSelected = currentStation.id === stn.id;
            return (
              <button
                key={stn.id}
                onClick={() => setSelectedStationId(stn.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition whitespace-nowrap ${
                  isSelected
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {stn.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Predictive Dispatch Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800/90 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ backgroundColor: lmsi.color }}
        />

        {/* Top Header: Train Arrival Radar & LMSI Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                LIVE TRAIN EGRESS RADAR
              </span>
              <span className="text-xs font-mono text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-400">Station Code: {code}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{name}</span>
            </h3>
          </div>

          {/* LMSI Stress Index Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Last-Mile Stress Index
              </div>
              <div className="text-xl font-black font-mono" style={{ color: lmsi.color }}>
                LMSI {lmsi.score}
              </div>
            </div>
            <div 
              className="px-3 py-1.5 rounded-xl border text-xs font-mono font-bold uppercase shadow-sm"
              style={{ 
                backgroundColor: `${lmsi.color}15`, 
                borderColor: `${lmsi.color}40`, 
                color: lmsi.color 
              }}
            >
              {lmsi.badge}
            </div>
          </div>
        </div>

        {/* Live Train Egress Detection Details */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Train ETA & Commuter Volume */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>INCOMING TRAIN ETA</span>
              <Train className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {trainCountdown.formatted}
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">
              Expected egress: <strong className="text-white">{forecast.baseTrainEgress} commuters</strong>{' '}
              (<strong className="text-emerald-400">{forecast.lastMileSeekers}</strong> needing last-mile rides).
            </div>
          </div>

          {/* Card 2: Current Supply vs Deficit */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>VEHICLE SUPPLY STATUS</span>
              <Car className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
              {forecast.totalSupply} <span className="text-sm font-normal text-slate-400">Available</span>
            </div>
            <div className="text-xs text-slate-300 mt-2 leading-relaxed">
              Target deficit: <strong className="text-rose-400 font-bold">{highDeficitGate.deficit} vehicles</strong> at{' '}
              <strong className="text-white">{highDeficitGate.gateName}</strong>.
            </div>
          </div>

          {/* Card 3: Commuter Wait Time */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
              <span>PROJECTED WAIT TIME</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
              {highDeficitGate.waitTimeMinutes} min
            </div>
            <div className="text-xs text-slate-400 mt-2 leading-relaxed">
              Exceeds 5.0m service SLA without dynamic rebalancing dispatch.
            </div>
          </div>

        </div>

        {/* Dynamic Dispatch Recommendation Output */}
        <div className="mt-6 p-5 rounded-xl bg-slate-950/90 border border-emerald-500/40 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Zap className="w-4 h-4 fill-emerald-400" />
                <span>DYNAMIC REBALANCING RECOMMENDATION</span>
              </div>
              {rebalancingPlan ? (
                <div className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Recommendation: Rebalance <strong className="text-emerald-400 font-bold">{rebalancingPlan.dispatchCount} vehicles</strong> from{' '}
                  <strong className="text-cyan-400">{rebalancingPlan.sourceStand}</strong> to{' '}
                  <strong className="text-white font-semibold">{highDeficitGate.gateName}</strong> to cap wait time at{' '}
                  <strong className="text-emerald-400 font-bold">{rebalancingPlan.projectedWaitTimeDrop.to} mins</strong>.
                </div>
              ) : (
                <div className="text-sm text-slate-300">
                  Vehicle supply across all gates is currently balanced with incoming egress flow.
                </div>
              )}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span>Repositioning ETA: ~2.8 mins</span>
                <span className="text-slate-700">•</span>
                <span>Dead-km: 0.7 km/veh</span>
                <span className="text-slate-700">•</span>
                <span className="text-emerald-400">CO2 Abatement: +22.4 kg</span>
              </div>
            </div>

            {/* Execute Auto-Dispatch Button */}
            {rebalancingPlan && (
              <div className="shrink-0">
                <button
                  onClick={() => executeAutoDispatch(currentStation.id)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-500/25 transition transform active:scale-95 cursor-pointer"
                >
                  <Zap className="w-5 h-5 fill-slate-950" />
                  <span>Execute Auto-Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Gate-Wise Detailed Breakdown */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 font-semibold">
            Station Gate Egress & Telemetry Distribution
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {forecast.gateForecasts.map((g) => {
              const isHighDeficit = g.gateId === highDeficitGate.gateId;
              return (
                <div
                  key={g.gateId}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    isHighDeficit
                      ? 'bg-slate-900/90 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                      : 'bg-slate-950/60 border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white">{g.gateName}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      g.deficit > 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {g.deficit > 0 ? `${g.deficit} VEH DEFICIT` : 'BALANCED'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 mt-2">
                    <div>
                      <span>Commuters: </span>
                      <strong className="text-white">{g.lastMileSeekers}</strong>
                    </div>
                    <div>
                      <span>Supply: </span>
                      <strong className="text-emerald-400">{g.currentSupply}</strong>
                    </div>
                    <div>
                      <span>Req. Fleet: </span>
                      <strong className="text-slate-200">{g.requiredVehicles}</strong>
                    </div>
                    <div>
                      <span>Wait Time: </span>
                      <strong className={g.waitTimeMinutes > 10 ? 'text-rose-400' : 'text-amber-400'}>
                        {g.waitTimeMinutes} min
                      </strong>
                    </div>
                  </div>

                  {/* Wait Time Bar */}
                  <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all"
                      style={{ 
                        width: `${Math.min(100, (g.waitTimeMinutes / 20) * 100)}%`,
                        backgroundColor: g.waitTimeMinutes > 12 ? '#EF4444' : g.waitTimeMinutes > 6 ? '#F59E0B' : '#10B981'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
