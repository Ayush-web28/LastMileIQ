import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import { 
  Play, 
  Pause, 
  FastForward, 
  CloudRain, 
  Train, 
  BatteryCharging, 
  Flame, 
  Clock, 
  Sparkles,
  RotateCcw,
  AlertTriangle
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

  const presets = [
    { label: '07:00 AM', value: 7.0, sub: 'Early Rush' },
    { label: '09:15 AM', value: 9.25, sub: 'Morning Peak' },
    { label: '02:00 PM', value: 14.0, sub: 'Afternoon Lull' },
    { label: '06:30 PM', value: 18.5, sub: 'Evening Tech Rush' },
    { label: '11:00 PM', value: 23.0, sub: 'Night Decline' },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800/90 backdrop-blur-xl shadow-xl">
      {/* Top Header: Clock & Playback */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        
        {/* Current Time Readout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Time-Machine Simulation Clock
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight flex items-center gap-2">
              <span>{formattedTime}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold uppercase ${
                isPlaying ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
              }`}>
                {isPlaying ? `${playSpeed}x Active` : 'Paused'}
              </span>
            </div>
          </div>
        </div>

        {/* Play / Pause & Speed Multipliers */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition shadow-md ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Simulate</span>
              </>
            )}
          </button>

          <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
            {[1, 2, 5].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaySpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition ${
                  playSpeed === spd
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Time-of-Day Slider */}
      <div className="mt-4">
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
          <span>06:00 AM (First Metro)</span>
          <span className="text-emerald-400 font-bold">DRAG SLIDER TO TEST COMMUTER SURGES</span>
          <span>11:30 PM (Terminal Run)</span>
        </div>
        <input
          type="range"
          min="6.0"
          max="23.5"
          step="0.25"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
        />

        {/* Preset Hour Buttons */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {presets.map((p) => {
            const isSelected = Math.abs(timeOfDay - p.value) < 0.2;
            return (
              <button
                key={p.label}
                onClick={() => setTimeOfDay(p.value)}
                className={`p-2 rounded-xl text-left border transition ${
                  isSelected
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold font-mono text-white">{p.label}</div>
                <div className="text-[10px] text-slate-400 truncate">{p.sub}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scenario Injections Grid */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Real-Time Stress Scenario Injections</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Click to stress test platform resilience
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          
          {/* Scenario 1: Monsoon */}
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
              scenarios.monsoon
                ? 'bg-blue-950/50 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">🌧️</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                scenarios.monsoon ? 'bg-blue-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {scenarios.monsoon ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-xs font-bold text-white">Monsoon Downpour</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-snug">
              +50% ride demand • Walk share drops to ~0% • Traffic -35%
            </div>
          </button>

          {/* Scenario 2: Double Train Arrival */}
          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
              scenarios.doubleTrain
                ? 'bg-rose-950/50 border-rose-500 shadow-lg shadow-rose-500/20'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">🚆</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                scenarios.doubleTrain ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {scenarios.doubleTrain ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-xs font-bold text-white">Double Train Arrival</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-snug">
              Dual train exit in &lt;90s • Immediate red LMSI spike
            </div>
          </button>

          {/* Scenario 3: Fleet EV Charging Surge */}
          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
              scenarios.evChargingSurge
                ? 'bg-amber-950/50 border-amber-500 shadow-lg shadow-amber-500/20'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">⚡</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                scenarios.evChargingSurge ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {scenarios.evChargingSurge ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-xs font-bold text-white">EV Charging Surge</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-snug">
              25% fleet shifts to chargers • Tests standby rebalance
            </div>
          </button>

          {/* Scenario 4: Tech Summit / Mega Event */}
          <button
            onClick={() => toggleScenario('megaEvent')}
            className={`p-3 rounded-xl border text-left transition relative overflow-hidden ${
              scenarios.megaEvent
                ? 'bg-purple-950/50 border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-lg">🏢</span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                scenarios.megaEvent ? 'bg-purple-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                {scenarios.megaEvent ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>
            <div className="text-xs font-bold text-white">Tech Park Summit</div>
            <div className="text-[10px] text-slate-400 mt-1 leading-snug">
              2.1x egress spike at ITPL / HITEC tech hubs
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
