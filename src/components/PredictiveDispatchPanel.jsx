import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Zap, 
  Train, 
  Clock, 
  Car, 
  MapPin, 
  ArrowRight,
  Flame,
  CloudRain,
  BatteryCharging
} from 'lucide-react';

export default function PredictiveDispatchPanel() {
  const {
    theme,
    currentStation,
    computedStations,
    setSelectedStationId,
    executeAutoDispatch,
    scenarios,
    toggleScenario,
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

  const formatCountdown = (secs) => {
    if (typeof secs !== 'number') return '2m 15s';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  return (
    <div className="space-y-3">
      {/* Top Strip: Scenario Injections & Quick Stress Test */}
      <div className={`p-2 sm:px-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs transition ${
        theme === 'dark' 
          ? 'bg-[#111C38]/90 border-[#1E2F5B] text-slate-300' 
          : 'bg-white border-slate-200 text-slate-700 shadow-sm'
      }`}>
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
            Surge Stress Injection:
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition flex items-center gap-1 border ${
              scenarios.monsoon
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B132B] border-[#1E2F5B] text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-black'
            }`}
            title="Spikes commuter demand +50% due to rain"
          >
            <span>🌧️</span>
            <span>Monsoon (+50%)</span>
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition flex items-center gap-1 border ${
              scenarios.doubleTrain
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/50 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B132B] border-[#1E2F5B] text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-black'
            }`}
            title="Simulates dual trains discharging concurrently"
          >
            <span>🚆</span>
            <span>Local Rush (2x)</span>
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition flex items-center gap-1 border ${
              scenarios.evChargingSurge
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold'
                : theme === 'dark'
                  ? 'bg-[#0B132B] border-[#1E2F5B] text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-black'
            }`}
            title="Removes 25% fleet to charging depot"
          >
            <span>⚡</span>
            <span>EV Shift (-25%)</span>
          </button>
        </div>
      </div>

      {/* Station Selector Chip Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className={`text-[10px] font-mono uppercase font-bold shrink-0 mr-1 ${
          theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
        }`}>
          Select Station:
        </span>
        {computedStations.map((stn) => {
          const isSelected = currentStation.id === stn.id;
          return (
            <button
              key={stn.id}
              onClick={() => setSelectedStationId(stn.id)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition whitespace-nowrap border ${
                isSelected
                  ? 'bg-sky-600 text-white font-bold border-sky-400 shadow-md'
                  : theme === 'dark'
                    ? 'bg-[#0B132B] border-[#1E2F5B] text-slate-300 hover:text-white hover:border-sky-500/50'
                    : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm'
              }`}
            >
              {stn.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Streamlined Predictive Dispatch Card */}
      <div className={`p-4 sm:p-5 rounded-2xl border backdrop-blur-xl shadow-xl space-y-4 transition ${
        theme === 'dark'
          ? 'bg-[#111C38]/95 border-[#1E2F5B] text-slate-100 shadow-2xl shadow-black/40'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header: Station & Status */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${
          theme === 'dark' ? 'border-[#1E2F5B]' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {name}
              </span>
              <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                theme === 'dark' ? 'bg-[#0B132B] text-slate-400 border border-[#1E2F5B]' : 'bg-slate-100 text-slate-600'
              }`}>
                {code}
              </span>
            </div>
            <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              High-deficit concourse exit:{' '}
              <strong className="text-amber-400 font-bold">{highDeficitGate.gateName}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold"
              style={{
                backgroundColor: `${lmsi.color}20`,
                color: lmsi.color,
                border: `1.5px solid ${lmsi.color}50`,
              }}
            >
              LMSI {lmsi.score} • {lmsi.level} STRESS
            </span>
          </div>
        </div>

        {/* 3 Vital Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className={`p-3 rounded-xl border text-left ${
            theme === 'dark' ? 'bg-[#0B132B]/70 border-[#1E2F5B]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[10px] font-mono uppercase font-bold ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              NEXT TRAIN ARRIVAL
            </div>
            <div className={`text-xl sm:text-2xl font-black font-mono mt-0.5 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              {formatCountdown(trainCountdown)}
            </div>
            <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              ~{forecast.baseTrainEgress} alighting passengers
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-left ${
            theme === 'dark' ? 'bg-[#0B132B]/70 border-[#1E2F5B]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[10px] font-mono uppercase font-bold ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              VEHICLE SHORTAGE
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-rose-500 mt-0.5">
              {highDeficitGate.deficit} Vehicles
            </div>
            <div className={`text-[10px] mt-0.5 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              {forecast.totalSupply} available at gate
            </div>
          </div>

          <div className={`p-3 rounded-xl border text-left ${
            theme === 'dark' ? 'bg-[#0B132B]/70 border-[#1E2F5B]' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`text-[10px] font-mono uppercase font-bold ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              PROJECTED COMMUTER WAIT
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-amber-500 mt-0.5">
              {highDeficitGate.waitTimeMinutes} min
            </div>
            <div className="text-[10px] text-sky-400 font-bold mt-0.5">
              SLA Cap: &lt;5.0 mins
            </div>
          </div>
        </div>

        {/* Actionable Dispatch Recommendation */}
        {rebalancingPlan && (
          <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
            theme === 'dark' 
              ? 'bg-[#0B132B] border-sky-500/40 text-slate-300' 
              : 'bg-sky-50/60 border-sky-500/40 text-slate-800'
          }`}>
            <div className="text-xs">
              <span className="text-amber-400 font-black font-mono mr-1.5 uppercase">DISPATCH ACTION:</span>
              Rebalance <strong className={theme === 'dark' ? 'text-white' : 'text-slate-950'}>{rebalancingPlan.dispatchCount} EV feeder vehicles</strong> from{' '}
              <strong className="text-sky-400">{rebalancingPlan.sourceStand}</strong> to{' '}
              <strong className={theme === 'dark' ? 'text-white' : 'text-slate-950'}>{highDeficitGate.gateName}</strong>. Wait time drops to{' '}
              <strong className="text-sky-400 font-bold">{rebalancingPlan.projectedWaitTimeDrop.to} mins</strong>.
            </div>

            <button
              onClick={() => executeAutoDispatch(currentStation.id)}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition active:scale-95 shrink-0 shadow-lg shadow-amber-500/25"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Execute Dynamic Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}