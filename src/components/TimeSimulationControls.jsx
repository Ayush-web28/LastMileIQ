import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Play, 
  Pause, 
  Clock
} from 'lucide-react';

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
    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#11231B]/95 border border-[#1E3A2C] backdrop-blur-xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Clock & Play/Pause */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#3DB87E]" />
            <span className="text-lg font-black font-mono text-white tracking-tight">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition ${
              isPlaying
                ? 'bg-[#2D6A4F] hover:bg-[#3DB87E] text-white'
                : 'bg-gradient-to-r from-[#3DB87E] to-[#34A074] hover:from-[#4EBA86] hover:to-[#3DB87E] text-[#0B1612] font-black'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate</span>
              </>
            )}
          </button>

          <div className="flex items-center p-0.5 rounded-lg bg-[#0B1612] border border-[#1E3A2C]">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold transition ${
                  playSpeed === spd ? 'bg-[#183327] text-[#3DB87E]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Center: Quick Time Slider */}
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <span className="text-[10px] font-mono text-slate-500">6 AM</span>
          <input
            type="range"
            min="6.0"
            max="23.5"
            step="0.25"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-[#1E3A2C] rounded-lg appearance-none cursor-pointer accent-[#3DB87E]"
          />
          <span className="text-[10px] font-mono text-slate-500">11 PM</span>
        </div>

        {/* Right: Quick Scenario Pills */}
        <div className="flex items-center gap-1.5 self-start md:self-center">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              scenarios.monsoon
                ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                : 'bg-[#0B1612] border-[#1E3A2C] text-slate-400 hover:text-slate-200'
            }`}
          >
            🌧️ Monsoon Surge
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              scenarios.doubleTrain
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-[#0B1612] border-[#1E3A2C] text-slate-400 hover:text-slate-200'
            }`}
          >
            🚆 Peak Local Rush
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
              scenarios.evChargingSurge
                ? 'bg-[#3DB87E]/20 border-[#3DB87E] text-[#3DB87E]'
                : 'bg-[#0B1612] border-[#1E3A2C] text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Charging Shift
          </button>
        </div>

      </div>
    </div>
  );
}
