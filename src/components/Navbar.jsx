import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  MapPin, 
  Clock, 
  Radio, 
  Building2, 
  Smartphone, 
  ChevronDown,
  Activity,
  Sliders
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

  const activeCorridorData = corridors[currentCorridor] || corridors['mumbai-metro-1'];

  // Categorize Mumbai Corridors
  const metroLines = Object.entries(corridors).filter(([_, item]) => item.category === 'metro');
  const localLines = Object.entries(corridors).filter(([_, item]) => item.category === 'local');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0F19]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                LastMile<span className="text-emerald-400">IQ</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                Mumbai
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-mono tracking-wider">
              DYNAMIC DISPATCH OS
            </p>
          </div>
        </div>

        {/* Center: Mumbai Corridor Selector (Categorized Metro & Local) */}
        <div className="relative">
          <button
            onClick={() => setCorridorMenuOpen(!corridorMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-emerald-500/50 transition text-xs font-medium text-slate-200"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <div className="text-left">
              <span className="text-slate-400 block text-[9px] uppercase tracking-wider font-mono">
                {activeCorridorData.categoryLabel}
              </span>
              <span className="font-semibold text-slate-100">{activeCorridorData.shortName}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${corridorMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {corridorMenuOpen && (
            <div className="absolute left-0 mt-2 w-80 rounded-xl bg-[#0F172A] border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 max-h-[480px] overflow-y-auto">
              
              {/* Group 1: 6 Metro Lines */}
              <div className="text-[10px] font-mono text-cyan-400 px-2 py-1 uppercase tracking-wider font-bold">
                🚇 Mumbai Metro (6 Lines)
              </div>
              {metroLines.map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCorridor(key);
                    setCorridorMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-start gap-2 transition text-xs mb-0.5 ${
                    currentCorridor === key
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                      : 'hover:bg-slate-800/70 text-slate-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.stationsCount} Stations • {item.lengthKm} km
                    </div>
                  </div>
                </button>
              ))}

              {/* Group 2: 3 Suburban Local Lines */}
              <div className="text-[10px] font-mono text-emerald-400 px-2 pt-3 py-1 uppercase tracking-wider font-bold border-t border-slate-800 mt-2">
                🚆 Mumbai Suburban Local (3 Lines)
              </div>
              {localLines.map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCorridor(key);
                    setCorridorMenuOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg flex items-start gap-2 transition text-xs mb-0.5 ${
                    currentCorridor === key
                      ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-300'
                      : 'hover:bg-slate-800/70 text-slate-300'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }} />
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.stationsCount} Stations • {item.lengthKm} km
                    </div>
                  </div>
                </button>
              ))}

            </div>
          )}
        </div>

        {/* Stakeholder Modes */}
        <div className="hidden lg:flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <button
            onClick={() => setMode('fleet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'fleet'
                ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Operator Console
          </button>
          <button
            onClick={() => setMode('planner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'planner'
                ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            City Planner
          </button>
          <button
            onClick={() => setMode('commuter')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
              currentMode === 'commuter'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Commuter Preview
          </button>
        </div>

        {/* Right: IST Sim Clock & Jump CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>IST: {simTime ? `${simTime} (Sim)` : currentTimeStr}</span>
          </div>

          <button
            onClick={onLaunchDashboard}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>{isDashboardOpen ? 'Command View' : 'Launch Command'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
