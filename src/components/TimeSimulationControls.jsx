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
    <div className="p-3.5 sm:p-4 rounded-lg bg-[#11231B] border border-[#1E3A2C]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Clock & Play/Pause */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#3DB87E] font-bold">TIME:</span>
            <span className="text-lg font-bold font-mono text-[#F3F7F4] tracking-tight">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-md font-bold text-xs transition ${
              isPlaying
                ? 'bg-[#183327] hover:bg-[#1E3A2C] text-[#3DB87E] border border-[#3DB87E]/40'
                : 'bg-[#3DB87E] hover:bg-[#34A074] text-[#0B1612]'
            }`}
          >
            {isPlaying ? 'Pause' : 'Simulate'}
          </button>

          <div className="flex items-center p-0.5 rounded-md bg-[#0B1612] border border-[#1E3A2C]">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition ${
                  playSpeed === spd ? 'bg-[#183327] text-[#3DB87E]' : 'text-[#6E8277] hover:text-[#A0B0A6]'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Center: Quick Time Slider */}
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <span className="text-[10px] font-mono text-[#6E8277]">6 AM</span>
          <input
            type="range"
            min="6.0"
            max="23.5"
            step="0.25"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#183327] rounded-md appearance-none cursor-pointer accent-[#3DB87E]"
          />
          <span className="text-[10px] font-mono text-[#6E8277]">11 PM</span>
        </div>

        {/* Right: Quick Scenario Pills */}
        <div className="flex items-center gap-1.5 self-start md:self-center">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.monsoon
                ? 'bg-[#183327] border-[#3DB87E] text-[#3DB87E]'
                : 'bg-[#0B1612] border-[#1E3A2C] text-[#A0B0A6] hover:text-[#F3F7F4]'
            }`}
          >
            Monsoon Surge
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.doubleTrain
                ? 'bg-[#843A5D]/20 border-[#C4829E] text-[#C4829E]'
                : 'bg-[#0B1612] border-[#1E3A2C] text-[#A0B0A6] hover:text-[#F3F7F4]'
            }`}
          >
            Peak Local Rush
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold border transition ${
              scenarios.evChargingSurge
                ? 'bg-[#183327] border-[#3DB87E] text-[#3DB87E]'
                : 'bg-[#0B1612] border-[#1E3A2C] text-[#A0B0A6] hover:text-[#F3F7F4]'
            }`}
          >
            Charging Shift
          </button>
        </div>

      </div>
    </div>
  );
}
