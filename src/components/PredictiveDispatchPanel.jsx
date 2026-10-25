import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function PredictiveDispatchPanel() {
  const {
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
      <div className="p-2 sm:px-3 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] flex flex-wrap items-center justify-between gap-2 text-xs transition">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#475060]">
            Surge Stress Injection:
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition border cursor-pointer ${
              scenarios.monsoon
                ? 'bg-[#D97706]/15 text-[#D97706] border-[#D97706] font-bold'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
            title="Spikes commuter demand +50% due to rain"
          >
            <span>Monsoon (+50%)</span>
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition border cursor-pointer ${
              scenarios.doubleTrain
                ? 'bg-[#D97706]/15 text-[#D97706] border-[#D97706] font-bold'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
            title="Simulates dual trains discharging concurrently"
          >
            <span>Local Rush (2x)</span>
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded text-[10px] font-mono transition border cursor-pointer ${
              scenarios.evChargingSurge
                ? 'bg-[#D97706]/15 text-[#D97706] border-[#D97706] font-bold'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
            title="Removes 25% fleet to charging depot"
          >
            <span>EV Shift (-25%)</span>
          </button>
        </div>
      </div>

      {/* Station Selector Chip Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-mono uppercase font-bold shrink-0 mr-1 text-[#6B7280]">
          Select Station:
        </span>
        {computedStations.map((stn) => {
          const isSelected = currentStation.id === stn.id;
          return (
            <button
              key={stn.id}
              onClick={() => setSelectedStationId(stn.id)}
              className={`px-3 py-1 rounded-md text-xs font-mono transition whitespace-nowrap border ${
                isSelected
                  ? 'bg-[#DC2626] text-white font-bold border-[#DC2626]'
                  : 'bg-[#F4F5F7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
              }`}
            >
              {stn.name.split(' (')[0]}
            </button>
          );
        })}
      </div>

      {/* Streamlined Predictive Dispatch Card */}
      <div className="p-4 sm:p-5 rounded-md border border-[#CED2DA] bg-[#F4F5F7] text-[#0E1015] space-y-4 transition">
        
        {/* Header: Station & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#CED2DA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#0E1015]">
                {name}
              </span>
              <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-[#DFE2E7] text-[#475060] border border-[#CED2DA]">
                {code}
              </span>
            </div>
            <div className="text-xs mt-0.5 text-[#475060]">
              High-deficit concourse exit:{' '}
              <strong className="text-[#2563EB] font-bold">{highDeficitGate.gateName}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span
              className="px-2.5 py-1 rounded text-xs font-mono font-bold"
              style={{
                backgroundColor: `${lmsi.color}15`,
                color: lmsi.color,
                border: `1px solid ${lmsi.color}40`,
              }}
            >
              LMSI {lmsi.score} | {lmsi.level} STRESS
            </span>
          </div>
        </div>

        {/* Vital Stats Strip */}
        <div className="rounded-md border border-[#CED2DA] divide-y md:divide-y-0 md:divide-x divide-[#CED2DA] bg-[#EBECEF] flex flex-col md:flex-row">
          <div className="p-3.5 flex-1 text-left">
            <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
              NEXT TRAIN ARRIVAL
            </div>
            <div className="text-xl font-bold font-mono text-[#0E1015] mt-0.5">
              {formatCountdown(trainCountdown)}
            </div>
            <div className="text-[10px] text-[#475060] mt-0.5">
              ~{forecast.baseTrainEgress} alighting passengers
            </div>
          </div>

          <div className="p-3.5 flex-1 text-left">
            <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
              VEHICLE SHORTAGE
            </div>
            <div className="text-xl font-bold font-mono text-[#DC2626] mt-0.5">
              {highDeficitGate.deficit} Vehicles
            </div>
            <div className="text-[10px] text-[#475060] mt-0.5">
              {forecast.totalSupply} available at gate
            </div>
          </div>

          <div className="p-3.5 flex-1 text-left">
            <div className="text-[10px] font-mono uppercase font-bold text-[#6B7280]">
              PROJECTED COMMUTER WAIT
            </div>
            <div className="text-xl font-bold font-mono text-[#D97706] mt-0.5">
              {highDeficitGate.waitTimeMinutes} min
            </div>
            <div className="text-[10px] font-bold text-[#059669] mt-0.5">
              SLA Cap: &lt;5.0 mins
            </div>
          </div>
        </div>

        {/* Actionable Dispatch Recommendation */}
        {rebalancingPlan && (
          <div className="p-3.5 rounded-md border border-[#CED2DA] bg-[#EBECEF] text-[#0E1015] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="text-[#2563EB] font-bold font-mono mr-1.5 uppercase">DISPATCH ACTION:</span>
              Rebalance <strong className="text-[#0E1015]">{rebalancingPlan.dispatchCount} EV feeder vehicles</strong> from{' '}
              <strong className="text-[#2563EB]">{rebalancingPlan.sourceStand}</strong> to{' '}
              <strong className="text-[#0E1015]">{highDeficitGate.gateName}</strong>. Wait time drops to{' '}
              <strong className="text-[#059669] font-bold">{rebalancingPlan.projectedWaitTimeDrop.to} mins</strong>.
            </div>

            <button
              onClick={() => executeAutoDispatch(currentStation.id)}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs transition shrink-0 cursor-pointer"
            >
              Execute Dynamic Dispatch
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
