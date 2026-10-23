import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TimeSimulationControls from './components/TimeSimulationControls';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
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
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

function DashboardContent({ currentMode, setCurrentMode }) {
  const {
    currentCorridorKey,
    setCurrentCorridorKey,
    formattedTime,
    activeCorridor,
    corridorTelemetry,
    activeToast,
  } = useSimulation();

  return (
    <div id="command-center-root" className="relative z-20 border-t border-slate-800/80 bg-[#0B0F19] pt-8 pb-24">
      {/* Toast Alert */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md p-4 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl shadow-emerald-500/20 text-white animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-white">{activeToast.title}</div>
              <div className="text-xs text-slate-300 mt-1">{activeToast.message}</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
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
              Real-time spatio-temporal transit prediction, dynamic fleet rebalancing, and Last-Mile Stress Index (LMSI) command.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500">VIEW:</span>
            <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setCurrentMode('fleet')}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  currentMode === 'fleet' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Fleet Operator
              </button>
              <button
                onClick={() => setCurrentMode('planner')}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  currentMode === 'planner' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                City Planner
              </button>
              <button
                onClick={() => setCurrentMode('commuter')}
                className={`px-3 py-1.5 rounded-lg font-medium transition ${
                  currentMode === 'commuter' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                ONDC Commuter
              </button>
            </div>
          </div>
        </div>

        {/* Time-Machine Simulation & Stress Controls */}
        <TimeSimulationControls />

        {/* Live Operator Telemetry Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400">FLEET UTILIZATION</div>
            <div className="text-2xl font-black text-white mt-1">{corridorTelemetry.utilizationRate}%</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Optimal Fleet Rotation</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400">AVG WAIT TIME</div>
            <div className="text-2xl font-black text-white mt-1">
              {corridorTelemetry.avgWaitTime} min
            </div>
            <div className="text-[10px] text-amber-400 font-mono mt-0.5">
              Down from 17.8 min baseline
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400">DAILY REVENUE UPLIFT</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Per vehicle / day
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400">DEAD MILEAGE CUT</div>
            <div className="text-2xl font-black text-cyan-400 mt-1">-34%</div>
            <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
              {corridorTelemetry.economics.deadKmSavedDaily} km saved/day
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-slate-900/70 border border-slate-800">
            <div className="text-[11px] font-mono text-slate-400">CORRIDOR STATUS</div>
            <div className="text-2xl font-black text-white mt-1">
              {corridorTelemetry.criticalStationsCount === 0 ? 'HEALTHY' : `${corridorTelemetry.criticalStationsCount} DEFICIT`}
            </div>
            <div className={`text-[10px] font-mono mt-0.5 ${corridorTelemetry.criticalStationsCount === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {corridorTelemetry.criticalStationsCount === 0 ? 'Zero transit deserts' : 'High egress alert'}
            </div>
          </div>
        </div>

        {/* Interactive GIS Command Center Map (Centerpiece) */}
        <CommandCenterMap />

        {/* Dynamic Predictive Dispatch Engine Panel */}
        <PredictiveDispatchPanel />

        {/* Live Driver Dispatch Queue & Telemetry */}
        <DriverDispatchQueue />

      </div>
    </div>
  );
}

export default function App() {
  const [currentMode, setCurrentMode] = useState('fleet'); // 'fleet' | 'planner' | 'commuter'
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleLaunchDashboard = () => {
    setIsDashboardOpen(true);
    setTimeout(() => {
      const el = document.getElementById('command-center-root');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <SimulationProvider>
      <AppShell
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
        isDashboardOpen={isDashboardOpen}
        handleLaunchDashboard={handleLaunchDashboard}
      />
    </SimulationProvider>
  );
}

function AppShell({ currentMode, setCurrentMode, isDashboardOpen, handleLaunchDashboard }) {
  const { currentCorridorKey, setCurrentCorridorKey, formattedTime } = useSimulation();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        currentCorridor={currentCorridorKey}
        setCorridor={setCurrentCorridorKey}
        corridors={CORRIDORS}
        currentMode={currentMode}
        setMode={setCurrentMode}
        onLaunchDashboard={handleLaunchDashboard}
        isDashboardOpen={isDashboardOpen}
        simTime={formattedTime}
      />

      <Hero
        onLaunchDashboard={handleLaunchDashboard}
        currentCorridor={currentCorridorKey}
        setCorridor={setCurrentCorridorKey}
        corridors={CORRIDORS}
        onSelectMode={(mode) => setCurrentMode(mode)}
      />

      <DashboardContent
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

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
