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
    <div className="p-3.5 sm:p-4 rounded-md bg-[#151820] border border-[#2A2F3D]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Clock & Play/Pause */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#DC2626] font-bold">TIME:</span>
            <span className="text-lg font-bold font-mono text-[#F4F5F7] tracking-tight">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-md font-bold text-xs transition ${
              isPlaying
                ? 'bg-[#1D212C] hover:bg-[#2A2F3D] text-[#F4F5F7] border border-[#2A2F3D]'
                : 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
            }`}
          >
            {isPlaying ? 'Pause' : 'Simulate'}
          </button>

          <div className="flex items-center p-0.5 rounded-md bg-[#0E1015] border border-[#2A2F3D]">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                  playSpeed === spd ? 'bg-[#1D212C] text-[#DC2626]' : 'text-[#6B7280] hover:text-[#949AA8]'
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
            className="w-full h-1.5 bg-[#2A2F3D] rounded-md appearance-none cursor-pointer accent-[#DC2626]"
          />
          <span className="text-[10px] font-mono text-[#6B7280]">11 PM</span>
        </div>

        {/* Right: Quick Scenario Pills */}
        <div className="flex items-center gap-1.5 self-start md:self-center">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.monsoon
                ? 'bg-[#2563EB]/15 border-[#2563EB] text-[#60A5FA]'
                : 'bg-[#0E1015] border-[#2A2F3D] text-[#949AA8] hover:text-[#F4F5F7]'
            }`}
          >
            Monsoon Surge
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.doubleTrain
                ? 'bg-[#DC2626]/15 border-[#DC2626] text-[#DC2626]'
                : 'bg-[#0E1015] border-[#2A2F3D] text-[#949AA8] hover:text-[#F4F5F7]'
            }`}
          >
            Peak Local Rush
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.evChargingSurge
                ? 'bg-[#F59E0B]/15 border-[#F59E0B] text-[#F59E0B]'
                : 'bg-[#0E1015] border-[#2A2F3D] text-[#949AA8] hover:text-[#F4F5F7]'
            }`}
          >
            Charging Shift
          </button>
        </div>

      </div>
    </div>
  );
}
