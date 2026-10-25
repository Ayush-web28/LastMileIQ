import React from 'react';
import { useSimulation } from '../context/SimulationContext';

export default function TimeSimulationControls() {
  const {
    timeOfDay,
    setTimeOfDay,
    formattedTime,
    isPlaying,
    setIsPlaying,
    playSpeed,
    setPlaySpeed,
    scenarios,
    toggleScenario,
  } = useSimulation();

  return (
    <div className="p-3.5 sm:p-4 rounded-md bg-[#F4F5F7] border border-[#CED2DA] text-[#0E1015]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Clock & Play/Pause */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#475060] font-bold">TIME:</span>
            <span className="text-lg font-bold font-mono text-[#0E1015] tracking-tight">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-md font-bold text-xs transition cursor-pointer ${
              isPlaying
                ? 'bg-[#DFE2E7] hover:bg-[#CED2DA] text-[#0E1015] border border-[#CED2DA]'
                : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
            }`}
          >
            {isPlaying ? 'Pause' : 'Simulate'}
          </button>

          <div className="flex items-center p-0.5 rounded-md bg-[#DFE2E7] border border-[#CED2DA]">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition cursor-pointer ${
                  playSpeed === spd ? 'bg-[#F4F5F7] text-[#0E1015] border border-[#CED2DA]' : 'text-[#6B7280] hover:text-[#0E1015]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Center: Quick Time Slider */}
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <span className="text-[10px] font-mono text-[#6B7280]">6 AM</span>
          <input
            type="range"
            min="6.0"
            max="23.5"
            step="0.25"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#CED2DA] rounded-md appearance-none cursor-pointer accent-[#2563EB]"
          />
          <span className="text-[10px] font-mono text-[#6B7280]">11 PM</span>
        </div>

        {/* Right: Quick Scenario Pills */}
        <div className="flex items-center gap-1.5 self-start md:self-center">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition cursor-pointer ${
              scenarios.monsoon
                ? 'bg-[#D97706]/15 border-[#D97706] text-[#D97706]'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Monsoon Surge
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition cursor-pointer ${
              scenarios.doubleTrain
                ? 'bg-[#D97706]/15 border-[#D97706] text-[#D97706]'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Peak Local Rush
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition cursor-pointer ${
              scenarios.evChargingSurge
                ? 'bg-[#D97706]/15 border-[#D97706] text-[#D97706]'
                : 'bg-[#DFE2E7] border-[#CED2DA] text-[#475060] hover:text-[#0E1015]'
            }`}
          >
            Charging Shift
          </button>
        </div>

      </div>
    </div>
  );
}
