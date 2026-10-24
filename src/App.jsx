import React, { useState } from 'react';
import Sidebar from './components/bionis/Sidebar';
import Topbar from './components/bionis/Topbar';
import DashboardMetrics from './components/bionis/DashboardMetrics';
import CommandCenterMap from './components/CommandCenterMap';
import PredictiveDispatchPanel from './components/PredictiveDispatchPanel';
import DriverDispatchQueue from './components/DriverDispatchQueue';
import FleetEconomicsCalculator from './components/FleetEconomicsCalculator';
import CityPlannerView from './components/CityPlannerView';
import CommuterPreviewModal from './components/CommuterPreviewModal';
import { SimulationProvider, useSimulation } from './context/SimulationContext';
import { CORRIDORS } from './data/corridors';
import { CheckCircle2 } from 'lucide-react';

function DashboardLayout() {
  const { 
    activeAccountRole, 
    activeToast 
  } = useSimulation();

  // Active navigation view (default synced with account role)
  const [activeView, setActiveView] = useState('dispatch'); // 'dispatch' | 'map' | 'analytics' | 'planner' | 'commuter'
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
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

      {/* Bionis-style Sidebar */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        corridors={CORRIDORS}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Bionis-style Topbar */}
        <Topbar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />

        {/* Scrollable Dashboard Canvas */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          
          {/* Executive KPI Metric Cards (Bionis template pattern) */}
          <DashboardMetrics />

          {/* View 1: Live Dispatch Command Center (Default Operator View) */}
          {activeView === 'dispatch' && (
            <div className="space-y-6 animate-fade-in">
              {/* Interactive GIS Command Center Map */}
              <CommandCenterMap />

              {/* Actionable Predictive Dispatch Panel */}
              <PredictiveDispatchPanel />

              {/* Live Driver Telemetry Queue */}
              <DriverDispatchQueue />
            </div>
          )}

          {/* View 2: Pure Map Inspector */}
          {activeView === 'map' && (
            <div className="space-y-6 animate-fade-in">
              <CommandCenterMap />
              <PredictiveDispatchPanel />
            </div>
          )}

          {/* View 3: Fleet Analytics & Unit Economics */}
          {activeView === 'analytics' && (
            <div className="space-y-6 animate-fade-in">
              <FleetEconomicsCalculator />
              <CommandCenterMap />
            </div>
          )}

          {/* View 4: City Planning & Transit Equity (MMRDA/BMC) */}
          {activeView === 'planner' && (
            <div className="space-y-6 animate-fade-in">
              <CityPlannerView />
              <CommandCenterMap />
            </div>
          )}

          {/* View 5: Commuter ONDC Concourse & Booking */}
          {activeView === 'commuter' && (
            <div className="space-y-6 animate-fade-in">
              <CommuterPreviewModal />
              <CommandCenterMap />
            </div>
          )}

        </main>

        {/* Minimal Clean Footer */}
        <footer className="border-t border-slate-800/80 bg-[#0B0F19] py-4 px-6 text-xs text-slate-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-semibold">LastMileIQ Mumbai Transit Dispatch OS</span>
            <span className="text-slate-600">|</span>
            <span>6 Metro Lines + 3 Suburban Local Lines</span>
          </div>
          <div>
            CartoDB Open Tiles • 100% Self-Contained Local Execution
          </div>
        </footer>

      </div>

    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <DashboardLayout />
    </SimulationProvider>
  );
}
