import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  Menu, 
  MapPin, 
  UserCheck, 
  Activity, 
  AlertTriangle,
  CloudRain,
  Train,
  BatteryCharging
} from 'lucide-react';

export default function Topbar({ isCollapsed, setIsCollapsed }) {
  const { 
    activeCorridor, 
    currentAccount, 
    scenarios, 
    toggleScenario,
    computedStations 
  } = useSimulation();

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 transition-all">
      
      {/* Left: Sidebar Collapse Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition text-xs shadow-sm"
          title="Toggle Sidebar"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-500">Mumbai Transit</span>
          <span className="text-slate-700">/</span>
          <span className="text-white font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeCorridor.color }} />
            <span>{activeCorridor.name}</span>
          </span>
          <span className="text-slate-700">/</span>
          <span className="text-emerald-400 font-medium">
            {computedStations.length} Stations Active
          </span>
        </div>
      </div>

      {/* Right: Scenario Stress Injections & Account Role Pill */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Scenario Pills */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <button
            onClick={() => toggleScenario('monsoon')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition flex items-center gap-1 ${
              scenarios.monsoon
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Spikes ride demand +50% and drops traffic speed"
          >
            <span>🌧️</span>
            <span>Monsoon</span>
          </button>

          <button
            onClick={() => toggleScenario('doubleTrain')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition flex items-center gap-1 ${
              scenarios.doubleTrain
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Simulates dual local trains discharging simultaneously"
          >
            <span>🚆</span>
            <span>Local Rush</span>
          </button>

          <button
            onClick={() => toggleScenario('evChargingSurge')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition flex items-center gap-1 ${
              scenarios.evChargingSurge
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Removes 25% fleet to charging bays"
          >
            <span>⚡</span>
            <span>Charging Shift</span>
          </button>
        </div>

        {/* Active Account Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-bold text-white hidden sm:inline">{currentAccount.name}</span>
          <span 
            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold"
            style={{ 
              backgroundColor: `${currentAccount.badgeColor}20`, 
              color: currentAccount.badgeColor 
            }}
          >
            {currentAccount.title.split(' ')[0]}
          </span>
        </div>

      </div>

    </header>
  );
}
