import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { CORRIDORS } from './data/corridors';
import { 
  Radio, 
  MapPin, 
  Activity, 
  Layers, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function App() {
  const [currentCorridor, setCurrentCorridor] = useState('bengaluru-purple');
  const [currentMode, setCurrentMode] = useState('fleet'); // 'fleet' | 'planner' | 'commuter'
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [simTime, setSimTime] = useState('08:45 AM');

  const activeCorridor = CORRIDORS[currentCorridor] || CORRIDORS['bengaluru-purple'];

  const handleLaunchDashboard = () => {
    setIsDashboardOpen(true);
    // Smooth scroll down to command center container
    setTimeout(() => {
      const el = document.getElementById('command-center-root');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Universal Command Center Navbar */}
      <Navbar
        currentCorridor={currentCorridor}
        setCorridor={setCurrentCorridor}
        corridors={CORRIDORS}
        currentMode={currentMode}
        setMode={setCurrentMode}
        onLaunchDashboard={handleLaunchDashboard}
        isDashboardOpen={isDashboardOpen}
        simTime={simTime}
      />

      {/* Cinematic Opening Hero Experience */}
      <Hero
        onLaunchDashboard={handleLaunchDashboard}
        currentCorridor={currentCorridor}
        setCorridor={setCurrentCorridor}
        corridors={CORRIDORS}
        onSelectMode={(mode) => setCurrentMode(mode)}
      />

      {/* Interactive Command Center Workspace Root */}
      <div id="command-center-root" className="relative z-20 border-t border-slate-800/80 bg-[#0B0F19] pt-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>COMMAND DISPATCH CONSOLE • ACTIVE SESSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeCorridor.name}
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                {activeCorridor.description}
              </p>
            </div>

            {/* Mode Indicator Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">OPERATIONAL MODE:</span>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full uppercase ${
                currentMode === 'fleet' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                  : currentMode === 'planner'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {currentMode === 'fleet' ? 'B2B Fleet Operator' : currentMode === 'planner' ? 'B2G City Planner' : 'B2C Commuter Preview'}
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">CORRIDOR STATIONS</div>
              <div className="text-2xl font-bold text-white mt-1">{activeCorridor.stationsCount} Active Stations</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-mono">100% Telemetry Online</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">ACTIVE FEEDER FLEET</div>
              <div className="text-2xl font-bold text-white mt-1">
                {activeCorridor.fleetSummary.activeRickshaws + activeCorridor.fleetSummary.activeEVAutos} Vehicles
              </div>
              <div className="text-[11px] text-cyan-400 mt-1 font-mono">
                {activeCorridor.fleetSummary.activeEVAutos} Zero-Emission EVs
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">FEEDER BUS SHUTTLES</div>
              <div className="text-2xl font-bold text-white mt-1">
                {activeCorridor.fleetSummary.activeFeederBuses} Minibuses
              </div>
              <div className="text-[11px] text-amber-400 mt-1 font-mono">
                {activeCorridor.fleetSummary.activeCampusShuttles} Campus Shuttles
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-xs font-mono text-slate-400">PEAK CATCHMENT DEMAND</div>
              <div className="text-2xl font-bold text-white mt-1">1,840 pax/hr</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-mono">Synced with Metro Timetable</div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-semibold">LastMileIQ Dynamic Dispatch Platform</span>
            <span className="text-slate-600">|</span>
            <span>B2B Mobility Intelligence</span>
          </div>
          <div className="text-slate-400">
            Self-contained Indian Metro Simulation • Zero External Keys Required
          </div>
        </div>
      </footer>
    </div>
  );
}
