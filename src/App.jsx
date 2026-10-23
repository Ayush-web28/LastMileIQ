import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TimeSimulationControls from './components/TimeSimulationControls';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import FleetEconomicsCalculator from './components/FleetEconomicsCalculator';
import CityPlannerView from './components/CityPlannerView';
import CommuterPreviewModal from './components/CommuterPreviewModal';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { CORRIDORS } from './data/corridors';
import { 
  Activity, 
  Building2, 
  Smartphone, 
  Calculator,
  CheckCircle2
} from 'lucide-react';

function DashboardContent({ currentMode, setCurrentMode }) {
  const {
    activeCorridor,
    corridorTelemetry,
    activeToast,
  } = useSimulation();

  return (
    <div id="command-center-root" className="relative z-20 border-t border-slate-800/80 bg-[#0B0F19] pt-6 pb-20">
      {/* Toast Alert */}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm p-3.5 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-2xl text-white animate-in slide-in-from-bottom-5">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white">{activeToast.title}</div>
              <div className="text-[11px] text-slate-300 mt-0.5">{activeToast.message}</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Section Header & View Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MUMBAI DISPATCH CONSOLE</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
              {activeCorridor.name}
            </h2>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs self-start sm:self-center">
            <button
              onClick={() => setCurrentMode('fleet')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                currentMode === 'fleet' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Dispatch Console
            </button>
            <button
              onClick={() => setCurrentMode('planner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                currentMode === 'planner' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              City Planner
            </button>
            <button
              onClick={() => setCurrentMode('commuter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                currentMode === 'commuter' ? 'bg-amber-400 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Commuter
            </button>
            <button
              onClick={() => setCurrentMode('economics')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                currentMode === 'economics' ? 'bg-teal-500 text-slate-950 font-bold shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Fleet ROI
            </button>
          </div>
        </div>

        {/* Compact Time & Scenario Simulation Controls */}
        <TimeSimulationControls />

        {/* Streamlined 3-Metric KPI Ribbon */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">FLEET UTILIZATION</div>
            <div className="text-xl sm:text-2xl font-black text-white mt-0.5">{corridorTelemetry.utilizationRate}%</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Active Rotation</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">AVG COMMUTER WAIT</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">
              {corridorTelemetry.avgWaitTime} min
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Baseline: 16.4 min
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-left">
            <div className="text-[10px] font-mono text-slate-400 uppercase">DEAD-KM ELIMINATED</div>
            <div className="text-xl sm:text-2xl font-black text-cyan-400 mt-0.5">-34%</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
              +₹{corridorTelemetry.economics.dailyRevenueUpliftPerVehicle} / veh / day
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Stakeholder Views */}
        {currentMode === 'fleet' && (
          <div className="space-y-4 animate-fade-in">
            {/* Interactive GIS Command Center Map */}
            <CommandCenterMap />

            {/* Predictive Dispatch Action Panel */}
            <PredictiveDispatchPanel />

            {/* Driver Queue Feed */}
            <DriverDispatchQueue />
          </div>
        )}

        {currentMode === 'planner' && (
          <div className="space-y-4 animate-fade-in">
            <CityPlannerView />
            <CommandCenterMap />
          </div>
        )}

        {currentMode === 'commuter' && (
          <div className="space-y-4 animate-fade-in">
            <CommuterPreviewModal />
            <CommandCenterMap />
          </div>
        )}

        {currentMode === 'economics' && (
          <div className="space-y-4 animate-fade-in">
            <FleetEconomicsCalculator />
          </div>
        )}

      </div>
    </div>
  );
}

export default function App() {
  const [currentMode, setCurrentMode] = useState('fleet');
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
        onSelectMode={(mode) => {
          setCurrentMode(mode);
          handleLaunchDashboard();
        }}
      />

      <DashboardContent
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />

      {/* Clean Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-semibold">LastMileIQ Mumbai Transit Dispatch OS</span>
            <span className="text-slate-600">|</span>
            <span>6 Metro Lines + 3 Suburban Local Lines</span>
          </div>
          <div className="text-slate-400">
            CartoDB Open Tiles • Zero Paid API Keys Required
          </div>
        </div>
      </footer>
    </div>
  );
}
