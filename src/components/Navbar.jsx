import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Layers, 
  Clock, 
  Radio, 
  Building2, 
  Smartphone, 
  BarChart3,
  ChevronDown,
  Navigation,
  ShieldCheck,
  Activity
} from 'lucide-react';

export default function Navbar({ 
  currentCorridor, 
  setCorridor, 
  corridors, 
  currentMode, 
  setMode, 
  onLaunchDashboard, 
  isDashboardOpen,
  simTime
}) {
  const [corridorMenuOpen, setCorridorMenuOpen] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeStr(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeCorridorData = corridors[currentCorridor] || corridors['bengaluru-purple'];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
            <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0B0F19] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                LastMile<span className="text-emerald-400">IQ</span>
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                v2.4 B2B
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono">
              DYNAMIC DISPATCH OS
            </p>
          </div>
        </div>

        {/* Center: Corridor Selector */}
        <div className="relative">
          <button
            onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 hover:bg-slate-800/80 transition text-xs font-medium text-slate-200"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <div className="text-left">
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Active Corridor</span>
              <span className="font-semibold text-slate-100">{activeCorridorData.shortName}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {corridorMenuOpen && (
            <div className="absolute left-0 mt-2 w-72 rounded-xl bg-[#0F172A] border border-slate-700/90 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="text-[10px] font-mono text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Transit Catchment
              </div>
              {Object.entries(corridors).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCorridor(key);
                    setCorridorMenuOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg flex items-start gap-2.5 transition text-xs ${
                    currentCorridor === key
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                      : 'hover:bg-slate-800/70 text-slate-300'
                  }`}
                >
                  <Navigation className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {item.stationsCount} Metro Stations • {item.lengthKm} km • {item.primaryHub}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Multi-Stakeholder Mode Switcher */}
        <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
          <button
            onClick={() => setMode('fleet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'fleet'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            B2B Fleet Operator
          </button>
          <button
            onClick={() => setMode('planner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'planner'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            B2G City Planner
          </button>
          <button
            onClick={() => setMode('commuter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'commuter'
                ? 'bg-amber-400 text-slate-950 shadow-md font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            B2C ONDC Preview
          </button>
        </div>

        {/* Right: Live Telemetry Status & Jump CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900/70 border border-slate-800 font-mono text-[11px] text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>IST: {simTime ? `${simTime} (Sim)` : currentTimeStr}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-emerald-400 font-medium hidden md:inline">
              LIVE SYNC
            </span>
          </div>

          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-xs hover:from-emerald-400 hover:to-teal-300 transition shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <Radio className="w-3.5 h-3.5" />
            {isDashboardOpen ? 'Command View' : 'Launch Command Center'}
          </button>
        </div>

      </div>
    </header>
  );
}
